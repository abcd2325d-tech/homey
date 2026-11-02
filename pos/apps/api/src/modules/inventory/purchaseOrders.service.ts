import { prisma } from "../../lib/prisma.js";
import { Errors } from "../../lib/errors.js";
import { recordStockMovement } from "./stock.service.js";
import { recordAudit } from "../auditLog/auditLog.service.js";
import type { PurchaseOrderStatus } from "@pos/shared";

function generatePoNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).slice(2, 5).toUpperCase();
  return `PO-${timestamp}-${random}`;
}

export interface CreatePurchaseOrderInput {
  supplierId: string;
  locationId: string;
  expectedDate?: string;
  notes?: string;
  lines: { productId: string; quantityOrdered: number; unitCostCents: number }[];
}

export async function createPurchaseOrder(input: CreatePurchaseOrderInput, userId: string) {
  if (input.lines.length === 0) throw Errors.badRequest("A purchase order needs at least one line");

  return prisma.purchaseOrder.create({
    data: {
      poNumber: generatePoNumber(),
      supplierId: input.supplierId,
      locationId: input.locationId,
      createdById: userId,
      expectedDate: input.expectedDate ? new Date(input.expectedDate) : null,
      notes: input.notes,
      status: "DRAFT",
      lines: { create: input.lines.map((l) => ({ productId: l.productId, quantityOrdered: l.quantityOrdered, unitCostCents: l.unitCostCents })) }
    },
    include: { lines: true, supplier: true, location: true }
  });
}

export async function listPurchaseOrders(filters: { status?: PurchaseOrderStatus; locationId?: string }) {
  return prisma.purchaseOrder.findMany({
    where: filters,
    include: { lines: true, supplier: true, location: true },
    orderBy: { createdAt: "desc" }
  });
}

export async function getPurchaseOrder(id: string) {
  const po = await prisma.purchaseOrder.findUnique({
    where: { id },
    include: { lines: { include: { product: true } }, supplier: true, location: true }
  });
  if (!po) throw Errors.notFound("PurchaseOrder", id);
  return po;
}

export async function sendPurchaseOrder(id: string) {
  const po = await getPurchaseOrder(id);
  if (po.status !== "DRAFT") throw Errors.conflict(`Cannot send a purchase order in status ${po.status}`);
  return prisma.purchaseOrder.update({ where: { id }, data: { status: "SENT" } });
}

export interface ReceiveLineInput {
  lineId: string;
  quantityReceivedDelta: number;
  lotNumber?: string;
  expirationDate?: Date;
}

export async function receivePurchaseOrder(id: string, lines: ReceiveLineInput[], userId: string) {
  if (lines.length === 0) throw Errors.badRequest("Specify at least one line to receive");

  return prisma.$transaction(async (tx) => {
    const po = await tx.purchaseOrder.findUnique({ where: { id }, include: { lines: true } });
    if (!po) throw Errors.notFound("PurchaseOrder", id);
    if (po.status !== "SENT" && po.status !== "PARTIALLY_RECEIVED") {
      throw Errors.conflict(`Cannot receive a purchase order in status ${po.status}`);
    }

    const lineById = new Map(po.lines.map((l) => [l.id, l]));

    for (const input of lines) {
      const line = lineById.get(input.lineId);
      if (!line || line.purchaseOrderId !== id) throw Errors.notFound("PurchaseOrderLine", input.lineId);
      if (input.quantityReceivedDelta <= 0) throw Errors.badRequest("quantityReceivedDelta must be positive");
      const newReceived = line.quantityReceived + input.quantityReceivedDelta;
      if (newReceived > line.quantityOrdered) {
        throw Errors.badRequest(
          `Receiving ${input.quantityReceivedDelta} would exceed the ordered quantity for line ${line.id}`
        );
      }

      await tx.purchaseOrderLine.update({ where: { id: line.id }, data: { quantityReceived: newReceived } });

      await recordStockMovement(tx, {
        productId: line.productId,
        locationId: po.locationId,
        type: "PURCHASE_RECEIPT",
        deltaMilliUnits: input.quantityReceivedDelta,
        unitCostCents: line.unitCostCents,
        lotNumber: input.lotNumber,
        expirationDate: input.expirationDate,
        userId,
        reference: po.id
      });

      const product = await tx.product.findUnique({ where: { id: line.productId } });
      if (product && product.costPriceCents !== line.unitCostCents) {
        await tx.product.update({ where: { id: line.productId }, data: { costPriceCents: line.unitCostCents } });
        await recordAudit(
          {
            userId,
            action: "PRICE_CHANGED",
            entityType: "Product",
            entityId: line.productId,
            before: { costPriceCents: product.costPriceCents },
            after: { costPriceCents: line.unitCostCents },
            metadata: { reason: "purchase_order_receipt", purchaseOrderId: po.id }
          },
          tx
        );
      }
    }

    const refreshedLines = await tx.purchaseOrderLine.findMany({ where: { purchaseOrderId: id } });
    const allReceived = refreshedLines.every((l) => l.quantityReceived >= l.quantityOrdered);
    const anyReceived = refreshedLines.some((l) => l.quantityReceived > 0);
    const status: PurchaseOrderStatus = allReceived ? "RECEIVED" : anyReceived ? "PARTIALLY_RECEIVED" : po.status as PurchaseOrderStatus;

    return tx.purchaseOrder.update({
      where: { id },
      data: { status },
      include: { lines: true, supplier: true, location: true }
    });
  });
}

export async function cancelPurchaseOrder(id: string) {
  const po = await getPurchaseOrder(id);
  if (po.status === "RECEIVED" || po.status === "PARTIALLY_RECEIVED") {
    throw Errors.conflict("Cannot cancel a purchase order that has already received stock");
  }
  return prisma.purchaseOrder.update({ where: { id }, data: { status: "CANCELLED" } });
}
