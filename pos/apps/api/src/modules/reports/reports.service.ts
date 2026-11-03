import { prisma } from "../../lib/prisma.js";
import { toCsv } from "../../lib/csv.js";

export interface DailySalesSummary {
  from: string;
  to: string;
  grossSalesCents: number;
  discountCents: number;
  taxCents: number;
  refundsCents: number;
  netSalesCents: number;
  transactionCount: number;
  paymentBreakdown: Record<string, number>;
  cashierBreakdown: { cashierId: string; name: string; salesCents: number; transactionCount: number }[];
}

export async function dailySalesSummary(from: Date, to: Date, locationId?: string): Promise<DailySalesSummary> {
  const sales = await prisma.sale.findMany({
    where: {
      locationId,
      status: { in: ["COMPLETED", "PARTIALLY_REFUNDED", "REFUNDED"] },
      completedAt: { gte: from, lte: to }
    },
    include: { payments: true, cashier: true, refunds: true }
  });

  const grossSalesCents = sales.reduce((sum, s) => sum + s.subtotalCents + s.taxCents, 0);
  const discountCents = sales.reduce((sum, s) => sum + s.discountCents, 0);
  const taxCents = sales.reduce((sum, s) => sum + s.taxCents, 0);
  const refundsCents = sales.reduce((sum, s) => sum + s.refunds.reduce((rs, r) => rs + r.amountCents, 0), 0);

  const paymentBreakdown: Record<string, number> = {};
  for (const sale of sales) {
    for (const payment of sale.payments) {
      paymentBreakdown[payment.method] = (paymentBreakdown[payment.method] ?? 0) + payment.amountCents;
    }
  }

  const cashierMap = new Map<string, { cashierId: string; name: string; salesCents: number; transactionCount: number }>();
  for (const sale of sales) {
    const entry = cashierMap.get(sale.cashierId) ?? {
      cashierId: sale.cashierId,
      name: sale.cashier.name,
      salesCents: 0,
      transactionCount: 0
    };
    entry.salesCents += sale.totalCents;
    entry.transactionCount += 1;
    cashierMap.set(sale.cashierId, entry);
  }

  return {
    from: from.toISOString(),
    to: to.toISOString(),
    grossSalesCents,
    discountCents,
    taxCents,
    refundsCents,
    netSalesCents: grossSalesCents - refundsCents,
    transactionCount: sales.length,
    paymentBreakdown,
    cashierBreakdown: [...cashierMap.values()]
  };
}

export interface ProductPerformanceLine {
  productId: string;
  sku: string;
  name: string;
  quantitySold: number;
  revenueCents: number;
}

export async function topSellingProducts(from: Date, to: Date, locationId: string | undefined, limit = 10): Promise<ProductPerformanceLine[]> {
  const lines = await prisma.saleLine.findMany({
    where: {
      isVoided: false,
      sale: { locationId, status: { in: ["COMPLETED", "PARTIALLY_REFUNDED", "REFUNDED"] }, completedAt: { gte: from, lte: to } }
    },
    include: { product: true }
  });

  const byProduct = new Map<string, ProductPerformanceLine>();
  for (const line of lines) {
    const entry = byProduct.get(line.productId) ?? {
      productId: line.productId,
      sku: line.product.sku,
      name: line.product.name,
      quantitySold: 0,
      revenueCents: 0
    };
    entry.quantitySold += line.quantity;
    entry.revenueCents += line.lineTotalCents;
    byProduct.set(line.productId, entry);
  }

  return [...byProduct.values()].sort((a, b) => b.revenueCents - a.revenueCents).slice(0, limit);
}

/** Products with the least sales velocity in the window — useful for spotting dead stock. */
export async function slowMovingProducts(from: Date, to: Date, locationId: string | undefined, limit = 10): Promise<ProductPerformanceLine[]> {
  const allSold = await topSellingProducts(from, to, locationId, Number.MAX_SAFE_INTEGER);
  const soldIds = new Set(allSold.map((p) => p.productId));

  const allProducts = await prisma.product.findMany({ where: { isActive: true }, select: { id: true, sku: true, name: true } });
  const neverSold: ProductPerformanceLine[] = allProducts
    .filter((p) => !soldIds.has(p.id))
    .map((p) => ({ productId: p.id, sku: p.sku, name: p.name, quantitySold: 0, revenueCents: 0 }));

  const slowest = [...allSold].sort((a, b) => a.quantitySold - b.quantitySold);
  return [...neverSold, ...slowest].slice(0, limit);
}

export async function dashboardSnapshot(locationId?: string) {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  const [today, recentSales, stockItems] = await Promise.all([
    dailySalesSummary(startOfDay, endOfDay, locationId),
    prisma.sale.findMany({
      where: { locationId, status: "COMPLETED" },
      orderBy: { completedAt: "desc" },
      take: 10,
      include: { cashier: { select: { name: true } } }
    }),
    // Comparing two columns of the same row isn't expressible as a Prisma
    // filter (no raw SQL needed here), so filter in JS.
    prisma.stockItem.findMany({ where: { locationId }, select: { quantityOnHand: true, reorderPoint: true } })
  ]);
  const lowStockCount = stockItems.filter((i) => i.quantityOnHand <= i.reorderPoint).length;

  return { today, recentSales, lowStockCount };
}

export function salesSummaryToCsv(summary: DailySalesSummary): string {
  const rows = [
    ["Gross sales", (summary.grossSalesCents / 100).toFixed(2)],
    ["Discounts", (summary.discountCents / 100).toFixed(2)],
    ["Tax", (summary.taxCents / 100).toFixed(2)],
    ["Refunds", (summary.refundsCents / 100).toFixed(2)],
    ["Net sales", (summary.netSalesCents / 100).toFixed(2)],
    ["Transactions", String(summary.transactionCount)],
    ...Object.entries(summary.paymentBreakdown).map(([method, cents]) => [`Payments: ${method}`, (cents / 100).toFixed(2)])
  ];
  return toCsv(["Metric", "Value"], rows);
}
