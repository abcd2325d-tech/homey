import { prisma } from "../../lib/prisma.js";
import { Errors } from "../../lib/errors.js";
import { recordStockMovement, getOrCreateStockItem } from "./stock.service.js";

export async function startStockCount(locationId: string, userId: string) {
  return prisma.stockCountSession.create({
    data: { locationId, startedById: userId, status: "OPEN" },
    include: { lines: true, location: true }
  });
}

export async function getStockCount(id: string) {
  const session = await prisma.stockCountSession.findUnique({
    where: { id },
    include: { lines: { include: { product: true } }, location: true }
  });
  if (!session) throw Errors.notFound("StockCountSession", id);
  return session;
}

/**
 * Records a scanned count for a product. Scanning the same product again
 * in the same session overwrites its counted quantity (the cashier re-scans
 * if they miscounted) rather than accumulating duplicate lines.
 */
export async function scanStockCountLine(sessionId: string, productId: string, countedQuantity: number) {
  const session = await prisma.stockCountSession.findUnique({ where: { id: sessionId } });
  if (!session) throw Errors.notFound("StockCountSession", sessionId);
  if (session.status !== "OPEN") throw Errors.conflict(`Cannot scan into a ${session.status} count session`);

  const stockItem = await getOrCreateStockItem(prisma, productId, session.locationId);
  const expectedQuantity = stockItem.quantityOnHand;
  const varianceQuantity = countedQuantity - expectedQuantity;

  const existingLine = await prisma.stockCountLine.findFirst({ where: { sessionId, productId } });
  if (existingLine) {
    return prisma.stockCountLine.update({
      where: { id: existingLine.id },
      data: { countedQuantity, expectedQuantity, varianceQuantity },
      include: { product: true }
    });
  }

  return prisma.stockCountLine.create({
    data: { sessionId, productId, countedQuantity, expectedQuantity, varianceQuantity },
    include: { product: true }
  });
}

export interface VarianceReportLine {
  productId: string;
  sku: string;
  name: string;
  expectedQuantity: number;
  countedQuantity: number;
  varianceQuantity: number;
}

export async function completeStockCount(sessionId: string, userId: string): Promise<{
  session: Awaited<ReturnType<typeof getStockCount>>;
  variance: VarianceReportLine[];
}> {
  const session = await prisma.$transaction(async (tx) => {
    const current = await tx.stockCountSession.findUnique({ where: { id: sessionId }, include: { lines: true } });
    if (!current) throw Errors.notFound("StockCountSession", sessionId);
    if (current.status !== "OPEN") throw Errors.conflict(`Cannot complete a ${current.status} count session`);

    for (const line of current.lines) {
      if (line.varianceQuantity !== 0) {
        await recordStockMovement(tx, {
          productId: line.productId,
          locationId: current.locationId,
          type: "COUNT_ADJUSTMENT",
          deltaMilliUnits: line.varianceQuantity,
          userId,
          reference: current.id,
          note: "Stock count reconciliation"
        });
      }
    }

    return tx.stockCountSession.update({
      where: { id: sessionId },
      data: { status: "COMPLETED", completedAt: new Date() }
    });
  });

  const full = await getStockCount(session.id);
  const variance: VarianceReportLine[] = full.lines.map((line) => ({
    productId: line.productId,
    sku: line.product.sku,
    name: line.product.name,
    expectedQuantity: line.expectedQuantity,
    countedQuantity: line.countedQuantity,
    varianceQuantity: line.varianceQuantity
  }));

  return { session: full, variance };
}

export async function cancelStockCount(sessionId: string) {
  const session = await prisma.stockCountSession.findUnique({ where: { id: sessionId } });
  if (!session) throw Errors.notFound("StockCountSession", sessionId);
  if (session.status !== "OPEN") throw Errors.conflict(`Cannot cancel a ${session.status} count session`);
  return prisma.stockCountSession.update({ where: { id: sessionId }, data: { status: "CANCELLED" } });
}
