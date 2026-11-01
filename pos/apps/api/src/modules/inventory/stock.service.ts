import type { Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma.js";
import { Errors } from "../../lib/errors.js";
import { applyStockMovement, weightedAverageValueCents } from "../../lib/stock.js";
import { consumeFifo, fifoValueCents } from "../../lib/fifo.js";
import { recordAudit } from "../auditLog/auditLog.service.js";
import type { StockMovementType } from "@pos/shared";

type Tx = Prisma.TransactionClient;

export async function getStoreSettings(db: Tx | typeof prisma = prisma) {
  const existing = await db.storeSettings.findUnique({ where: { id: 1 } });
  if (existing) return existing;
  return db.storeSettings.create({ data: { id: 1 } });
}

export async function getOrCreateStockItem(db: Tx, productId: string, locationId: string) {
  const existing = await db.stockItem.findUnique({ where: { productId_locationId: { productId, locationId } } });
  if (existing) return existing;
  return db.stockItem.create({ data: { productId, locationId } });
}

export interface RecordMovementInput {
  productId: string;
  locationId: string;
  type: StockMovementType;
  deltaMilliUnits: number; // signed: positive = stock in, negative = stock out
  unitCostCents?: number;
  userId: string;
  reference?: string;
  note?: string;
}

export interface RecordMovementResult {
  movementId: string;
  quantityOnHand: number;
  costOfGoodsCents: number;
}

/** The single entry point every module uses to move stock. Must run inside a transaction. */
export async function recordStockMovement(db: Tx, input: RecordMovementInput): Promise<RecordMovementResult> {
  const settings = await getStoreSettings(db);
  const stockItem = await getOrCreateStockItem(db, input.productId, input.locationId);

  let quantityOnHand = stockItem.quantityOnHand;
  let averageCostCents = stockItem.averageCostCents;
  let costOfGoodsCents = 0;

  if (settings.costingMethod === "FIFO") {
    if (input.deltaMilliUnits > 0) {
      await db.costLayer.create({
        data: {
          productId: input.productId,
          locationId: input.locationId,
          quantityRemaining: input.deltaMilliUnits,
          unitCostCents: input.unitCostCents ?? averageCostCents
        }
      });
      quantityOnHand += input.deltaMilliUnits;
      // Keep a weighted-average field too, for quick display without joining cost layers.
      averageCostCents = applyStockMovement(stockItem, input.deltaMilliUnits, input.unitCostCents).averageCostCents;
    } else if (input.deltaMilliUnits < 0) {
      const layers = await db.costLayer.findMany({
        where: { productId: input.productId, locationId: input.locationId, quantityRemaining: { gt: 0 } },
        orderBy: { receivedAt: "asc" }
      });
      const consumption = consumeFifo(layers, -input.deltaMilliUnits);
      costOfGoodsCents = consumption.costOfGoodsCents;
      for (const update of consumption.updates) {
        await db.costLayer.update({ where: { id: update.id }, data: { quantityRemaining: update.quantityRemaining } });
      }
      quantityOnHand += input.deltaMilliUnits;
    }
  } else {
    const result = applyStockMovement(stockItem, input.deltaMilliUnits, input.unitCostCents);
    quantityOnHand = result.quantityOnHand;
    averageCostCents = result.averageCostCents;
    costOfGoodsCents = result.costOfGoodsCents;
  }

  await db.stockItem.update({ where: { id: stockItem.id }, data: { quantityOnHand, averageCostCents } });

  const movement = await db.stockMovement.create({
    data: {
      productId: input.productId,
      locationId: input.locationId,
      type: input.type,
      quantity: input.deltaMilliUnits,
      unitCostCents: input.unitCostCents ?? null,
      userId: input.userId,
      reference: input.reference,
      note: input.note
    }
  });

  return { movementId: movement.id, quantityOnHand, costOfGoodsCents };
}

export interface ListStockParams {
  locationId?: string;
  productId?: string;
  lowStockOnly?: boolean;
}

export async function listStock(params: ListStockParams) {
  const items = await prisma.stockItem.findMany({
    where: { locationId: params.locationId, productId: params.productId },
    include: { product: true, location: true }
  });
  if (!params.lowStockOnly) return items;
  return items.filter((item) => item.quantityOnHand <= item.reorderPoint);
}

export interface AdjustStockInput {
  productId: string;
  locationId: string;
  deltaMilliUnits: number;
  unitCostCents?: number;
  reason: string;
  userId: string;
}

export async function adjustStock(input: AdjustStockInput) {
  if (input.deltaMilliUnits === 0) throw Errors.badRequest("Adjustment quantity cannot be zero");

  const result = await prisma.$transaction(async (tx) => {
    const movement = await recordStockMovement(tx, {
      productId: input.productId,
      locationId: input.locationId,
      type: "ADJUSTMENT",
      deltaMilliUnits: input.deltaMilliUnits,
      unitCostCents: input.unitCostCents,
      userId: input.userId,
      note: input.reason
    });
    await recordAudit(
      {
        userId: input.userId,
        action: "STOCK_ADJUSTED",
        entityType: "Product",
        entityId: input.productId,
        after: { locationId: input.locationId, deltaMilliUnits: input.deltaMilliUnits, reason: input.reason }
      },
      tx
    );
    return movement;
  });

  return result;
}

export interface ValuationLine {
  productId: string;
  sku: string;
  name: string;
  locationId: string;
  quantityOnHand: number;
  valueCents: number;
}

export async function inventoryValuation(locationId?: string): Promise<{ method: string; lines: ValuationLine[]; totalCents: number }> {
  const settings = await getStoreSettings();
  const stockItems = await prisma.stockItem.findMany({
    where: { locationId, quantityOnHand: { not: 0 } },
    include: { product: true }
  });

  let lines: ValuationLine[];
  if (settings.costingMethod === "FIFO") {
    const layers = await prisma.costLayer.findMany({
      where: { locationId, quantityRemaining: { gt: 0 } }
    });
    const layersByKey = new Map<string, typeof layers>();
    for (const layer of layers) {
      const key = `${layer.productId}:${layer.locationId}`;
      layersByKey.set(key, [...(layersByKey.get(key) ?? []), layer]);
    }
    lines = stockItems.map((item) => {
      const key = `${item.productId}:${item.locationId}`;
      const value = fifoValueCents(layersByKey.get(key) ?? []);
      return {
        productId: item.productId,
        sku: item.product.sku,
        name: item.product.name,
        locationId: item.locationId,
        quantityOnHand: item.quantityOnHand,
        valueCents: value
      };
    });
  } else {
    lines = stockItems.map((item) => ({
      productId: item.productId,
      sku: item.product.sku,
      name: item.product.name,
      locationId: item.locationId,
      quantityOnHand: item.quantityOnHand,
      valueCents: weightedAverageValueCents(item)
    }));
  }

  return {
    method: settings.costingMethod,
    lines,
    totalCents: lines.reduce((sum, line) => sum + line.valueCents, 0)
  };
}
