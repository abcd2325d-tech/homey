import { prisma } from "../../src/lib/prisma.js";

/** Wipes all tables, in FK-safe order, so each integration test starts clean. */
export async function resetDb() {
  await prisma.refundLine.deleteMany();
  await prisma.refund.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.saleLine.deleteMany();
  await prisma.sale.deleteMany();
  await prisma.receiptSequence.deleteMany();
  await prisma.stockCountLine.deleteMany();
  await prisma.stockCountSession.deleteMany();
  await prisma.purchaseOrderLine.deleteMany();
  await prisma.purchaseOrder.deleteMany();
  await prisma.costLayer.deleteMany();
  await prisma.stockMovement.deleteMany();
  await prisma.stockItem.deleteMany();
  await prisma.productBarcode.deleteMany();
  await prisma.product.deleteMany();
  await prisma.taxRate.deleteMany();
  await prisma.supplier.deleteMany();
  await prisma.category.deleteMany();
  await prisma.location.deleteMany();
  await prisma.auditLog.deleteMany();
  await prisma.refreshToken.deleteMany();
  await prisma.user.deleteMany();
  await prisma.barcodeLookupCache.deleteMany();
  await prisma.storeSettings.deleteMany();
}
