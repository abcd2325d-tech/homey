import type { Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma.js";
import { Errors } from "../../lib/errors.js";
import { computeSaleLine } from "../../lib/saleLine.js";
import { discountRequiresApproval, type DiscountType } from "../../lib/discount.js";
import { recordStockMovement, getOrCreateStockItem, getStoreSettings } from "../inventory/stock.service.js";
import { recordAudit } from "../auditLog/auditLog.service.js";
import { assertManagerApprover } from "../auth/auth.service.js";
import { cardProvider } from "./paymentProviders.js";
import type { PaymentMethod, SaleStatus } from "@pos/shared";

type Tx = Prisma.TransactionClient;

const SALE_INCLUDE = {
  lines: { include: { product: true } },
  payments: true,
  refunds: { include: { lines: true } },
  customer: true
} satisfies Prisma.SaleInclude;

export async function createSale(locationId: string, cashierId: string, customerId?: string) {
  if (customerId) {
    const customer = await prisma.customer.findUnique({ where: { id: customerId } });
    if (!customer) throw Errors.notFound("Customer", customerId);
  }
  return prisma.sale.create({ data: { locationId, cashierId, customerId, status: "OPEN" }, include: SALE_INCLUDE });
}

export async function attachCustomer(saleId: string, customerId: string | null) {
  const sale = await prisma.sale.findUnique({ where: { id: saleId } });
  if (!sale) throw Errors.notFound("Sale", saleId);
  if (sale.status !== "OPEN" && sale.status !== "HELD") {
    throw Errors.conflict(`Cannot change the customer on a sale in status ${sale.status}`);
  }
  if (customerId) {
    const customer = await prisma.customer.findUnique({ where: { id: customerId } });
    if (!customer) throw Errors.notFound("Customer", customerId);
  }
  return prisma.sale.update({ where: { id: saleId }, data: { customerId }, include: SALE_INCLUDE });
}

export async function getSale(id: string, db: Tx | typeof prisma = prisma) {
  const sale = await db.sale.findUnique({ where: { id }, include: SALE_INCLUDE });
  if (!sale) throw Errors.notFound("Sale", id);
  return sale;
}

export async function listSales(filters: { status?: SaleStatus; locationId?: string; cashierId?: string; from?: Date; to?: Date }) {
  return prisma.sale.findMany({
    where: {
      status: filters.status,
      locationId: filters.locationId,
      cashierId: filters.cashierId,
      createdAt: filters.from || filters.to ? { gte: filters.from, lte: filters.to } : undefined
    },
    include: SALE_INCLUDE,
    orderBy: { createdAt: "desc" }
  });
}

export async function listHeldSales(locationId?: string) {
  return prisma.sale.findMany({
    where: { status: "HELD", locationId },
    include: SALE_INCLUDE,
    orderBy: { createdAt: "desc" }
  });
}

function assertEditable(status: SaleStatus) {
  if (status !== "OPEN" && status !== "HELD") {
    throw Errors.conflict(`Cannot modify a sale in status ${status}`);
  }
}

async function recalcTotals(tx: Tx, saleId: string) {
  const lines = await tx.saleLine.findMany({ where: { saleId, isVoided: false } });
  const subtotalCents = lines.reduce((sum, l) => sum + (l.lineTotalCents - l.taxCents), 0);
  const discountCents = lines.reduce((sum, l) => sum + l.discountCents, 0);
  const taxCents = lines.reduce((sum, l) => sum + l.taxCents, 0);
  const totalCents = lines.reduce((sum, l) => sum + l.lineTotalCents, 0);
  return tx.sale.update({
    where: { id: saleId },
    data: { subtotalCents, discountCents, taxCents, totalCents },
    include: SALE_INCLUDE
  });
}

export interface AddLineInput {
  productId: string;
  quantityMilliUnits: number;
}

export async function addLine(saleId: string, input: AddLineInput) {
  return prisma.$transaction(async (tx) => {
    const sale = await tx.sale.findUnique({ where: { id: saleId } });
    if (!sale) throw Errors.notFound("Sale", saleId);
    assertEditable(sale.status as SaleStatus);
    if (input.quantityMilliUnits <= 0) throw Errors.badRequest("Quantity must be positive");

    const product = await tx.product.findUnique({ where: { id: input.productId }, include: { taxRate: true } });
    if (!product) throw Errors.notFound("Product", input.productId);
    if (!product.isActive) throw Errors.badRequest("Cannot sell an inactive product");

    const stockItem = await getOrCreateStockItem(tx, product.id, sale.locationId);
    const unitCostCents = stockItem.quantityOnHand > 0 ? stockItem.averageCostCents : product.costPriceCents;

    const calc = computeSaleLine({
      unitPriceCents: product.sellPriceCents,
      quantityMilliUnits: input.quantityMilliUnits,
      taxRateBasisPoints: product.taxRate?.rateBasisPoints ?? 0,
      priceIncludesTax: product.priceIncludesTax
    });

    await tx.saleLine.create({
      data: {
        saleId,
        productId: product.id,
        quantity: input.quantityMilliUnits,
        unitPriceCents: product.sellPriceCents,
        unitCostCents,
        taxRateBasisPoints: product.taxRate?.rateBasisPoints ?? 0,
        taxCents: calc.taxCents,
        lineTotalCents: calc.lineTotalCents
      }
    });

    return recalcTotals(tx, saleId);
  });
}

export async function updateLineQuantity(saleId: string, lineId: string, quantityMilliUnits: number) {
  if (quantityMilliUnits <= 0) throw Errors.badRequest("Quantity must be positive");

  return prisma.$transaction(async (tx) => {
    const sale = await tx.sale.findUnique({ where: { id: saleId } });
    if (!sale) throw Errors.notFound("Sale", saleId);
    assertEditable(sale.status as SaleStatus);

    const line = await tx.saleLine.findUnique({ where: { id: lineId } });
    if (!line || line.saleId !== saleId) throw Errors.notFound("SaleLine", lineId);

    const product = await tx.product.findUnique({ where: { id: line.productId }, include: { taxRate: true } });
    if (!product) throw Errors.notFound("Product", line.productId);

    // A discount's absolute cents amount doesn't carry over to a new quantity
    // (we only persist the computed discountCents, not the original percent/
    // fixed value) — changing quantity clears any discount; the cashier
    // re-applies it if still wanted.
    const calc = computeSaleLine({
      unitPriceCents: line.unitPriceCents,
      quantityMilliUnits,
      taxRateBasisPoints: line.taxRateBasisPoints,
      priceIncludesTax: product.priceIncludesTax
    });

    await tx.saleLine.update({
      where: { id: lineId },
      data: {
        quantity: quantityMilliUnits,
        discountType: null,
        discountCents: calc.discountCents,
        taxCents: calc.taxCents,
        lineTotalCents: calc.lineTotalCents
      }
    });

    return recalcTotals(tx, saleId);
  });
}

export interface ApplyDiscountInput {
  discountType: DiscountType;
  discountValue: number;
  approverId?: string;
}

export async function applyLineDiscount(saleId: string, lineId: string, input: ApplyDiscountInput, actingUserId: string) {
  return prisma.$transaction(async (tx) => {
    const sale = await tx.sale.findUnique({ where: { id: saleId } });
    if (!sale) throw Errors.notFound("Sale", saleId);
    assertEditable(sale.status as SaleStatus);

    const line = await tx.saleLine.findUnique({ where: { id: lineId } });
    if (!line || line.saleId !== saleId) throw Errors.notFound("SaleLine", lineId);

    const product = await tx.product.findUnique({ where: { id: line.productId }, include: { taxRate: true } });
    if (!product) throw Errors.notFound("Product", line.productId);

    const settings = await getStoreSettings(tx);
    const grossBeforeDiscountCents = Math.round((line.unitPriceCents * line.quantity) / 1000);
    const needsApproval = discountRequiresApproval(
      grossBeforeDiscountCents,
      input.discountType,
      input.discountValue,
      settings.discountApprovalThresholdBasisPoints
    );

    if (needsApproval) {
      if (!input.approverId) {
        throw Errors.forbidden("This discount requires manager approval (verify a manager PIN first)");
      }
      await assertManagerApprover(input.approverId);
    }

    const calc = computeSaleLine({
      unitPriceCents: line.unitPriceCents,
      quantityMilliUnits: line.quantity,
      discountType: input.discountType,
      discountValue: input.discountValue,
      taxRateBasisPoints: line.taxRateBasisPoints,
      priceIncludesTax: product.priceIncludesTax
    });

    await tx.saleLine.update({
      where: { id: lineId },
      data: {
        discountType: input.discountType,
        discountCents: calc.discountCents,
        taxCents: calc.taxCents,
        lineTotalCents: calc.lineTotalCents
      }
    });

    if (needsApproval) {
      await recordAudit(
        {
          userId: actingUserId,
          action: "DISCOUNT_APPROVED",
          entityType: "Sale",
          entityId: saleId,
          after: { lineId, discountType: input.discountType, discountValue: input.discountValue, approverId: input.approverId }
        },
        tx
      );
    }

    return recalcTotals(tx, saleId);
  });
}

export async function removeLine(saleId: string, lineId: string) {
  return prisma.$transaction(async (tx) => {
    const sale = await tx.sale.findUnique({ where: { id: saleId } });
    if (!sale) throw Errors.notFound("Sale", saleId);
    assertEditable(sale.status as SaleStatus);

    const line = await tx.saleLine.findUnique({ where: { id: lineId } });
    if (!line || line.saleId !== saleId) throw Errors.notFound("SaleLine", lineId);

    await tx.saleLine.delete({ where: { id: lineId } });
    return recalcTotals(tx, saleId);
  });
}

export async function holdSale(saleId: string, label?: string) {
  const sale = await prisma.sale.findUnique({ where: { id: saleId } });
  if (!sale) throw Errors.notFound("Sale", saleId);
  assertEditable(sale.status as SaleStatus);
  return prisma.sale.update({ where: { id: saleId }, data: { status: "HELD", heldLabel: label }, include: SALE_INCLUDE });
}

export async function recallSale(saleId: string) {
  const sale = await prisma.sale.findUnique({ where: { id: saleId } });
  if (!sale) throw Errors.notFound("Sale", saleId);
  if (sale.status !== "HELD") throw Errors.conflict(`Sale is not held (status ${sale.status})`);
  return prisma.sale.update({ where: { id: saleId }, data: { status: "OPEN" }, include: SALE_INCLUDE });
}

export interface AddPaymentInput {
  method: PaymentMethod;
  amountCents: number;
  tenderedCents?: number;
}

export async function addPayment(saleId: string, input: AddPaymentInput) {
  const sale = await prisma.sale.findUnique({ where: { id: saleId }, include: { payments: true } });
  if (!sale) throw Errors.notFound("Sale", saleId);
  if (sale.status !== "OPEN") throw Errors.conflict(`Sale must be open to take payment (status ${sale.status})`);
  if (input.amountCents <= 0) throw Errors.badRequest("Payment amount must be positive");

  const alreadyPaid = sale.payments.reduce((sum, p) => sum + p.amountCents, 0);
  const remaining = sale.totalCents - alreadyPaid;

  if (input.method === "CASH") {
    const tendered = input.tenderedCents ?? input.amountCents;
    if (tendered < input.amountCents) throw Errors.badRequest("Tendered amount is less than the payment amount");
    const changeCents = tendered - input.amountCents;
    return prisma.payment.create({
      data: { saleId, method: "CASH", amountCents: input.amountCents, tenderedCents: tendered, changeCents }
    });
  }

  if (input.amountCents > Math.max(remaining, 0)) {
    throw Errors.badRequest(`Payment of ${input.amountCents} exceeds the remaining balance of ${remaining}`);
  }

  if (input.method === "CARD") {
    const result = await cardProvider.charge(input.amountCents);
    if (!result.success) {
      throw Errors.badRequest(result.declineReason ?? "Card declined");
    }
    return prisma.payment.create({
      data: { saleId, method: "CARD", amountCents: input.amountCents, providerRef: result.providerRef }
    });
  }

  if (input.method === "LOYALTY") {
    if (!sale.customerId) throw Errors.badRequest("Attach a customer to the sale before redeeming loyalty points");

    return prisma.$transaction(async (tx) => {
      const [customer, settings] = await Promise.all([
        tx.customer.findUniqueOrThrow({ where: { id: sale.customerId! } }),
        getStoreSettings(tx)
      ]);
      const pointValue = Math.max(settings.loyaltyPointValueCents, 1);
      const pointsNeeded = Math.ceil(input.amountCents / pointValue);
      if (pointsNeeded > customer.loyaltyPoints) {
        throw Errors.badRequest(
          `Customer has ${customer.loyaltyPoints} points, which isn't enough to cover ${input.amountCents} cents (needs ${pointsNeeded})`
        );
      }

      await tx.customer.update({ where: { id: customer.id }, data: { loyaltyPoints: { decrement: pointsNeeded } } });
      await tx.sale.update({ where: { id: saleId }, data: { loyaltyPointsRedeemed: { increment: pointsNeeded } } });
      return tx.payment.create({ data: { saleId, method: "LOYALTY", amountCents: input.amountCents } });
    });
  }

  return prisma.payment.create({ data: { saleId, method: "OTHER", amountCents: input.amountCents } });
}

async function nextReceiptNumber(tx: Tx, locationId: string): Promise<string> {
  await tx.receiptSequence.upsert({ where: { locationId }, create: { locationId, nextNumber: 1 }, update: {} });
  const updated = await tx.receiptSequence.update({ where: { locationId }, data: { nextNumber: { increment: 1 } } });
  const numberToUse = updated.nextNumber - 1;
  return `${locationId.slice(-6).toUpperCase()}-${String(numberToUse).padStart(6, "0")}`;
}

export async function completeSale(saleId: string, userId: string) {
  return prisma.$transaction(async (tx) => {
    const sale = await tx.sale.findUnique({ where: { id: saleId }, include: { lines: true, payments: true } });
    if (!sale) throw Errors.notFound("Sale", saleId);
    if (sale.status !== "OPEN") throw Errors.conflict(`Sale must be open to complete (status ${sale.status})`);
    if (sale.lines.length === 0) throw Errors.badRequest("Cannot complete a sale with no items");

    const totalPaid = sale.payments.reduce((sum, p) => sum + p.amountCents, 0);
    if (totalPaid < sale.totalCents) {
      throw Errors.badRequest(`Sale is not fully paid: ${totalPaid} of ${sale.totalCents} cents received`);
    }

    for (const line of sale.lines) {
      if (line.isVoided) continue;
      const { costOfGoodsCents } = await recordStockMovement(tx, {
        productId: line.productId,
        locationId: sale.locationId,
        type: "SALE",
        deltaMilliUnits: -line.quantity,
        userId,
        reference: sale.id
      });
      const perUnitCostCents = line.quantity > 0 ? Math.round((costOfGoodsCents * 1000) / line.quantity) : line.unitCostCents;
      await tx.saleLine.update({ where: { id: line.id }, data: { unitCostCents: perUnitCostCents } });
    }

    const receiptNumber = await nextReceiptNumber(tx, sale.locationId);

    // Earn points on what was actually paid with cash/card/other — not on
    // the portion covered by redeeming points, which would otherwise let a
    // customer mint points by redeeming points.
    let loyaltyPointsEarned = 0;
    if (sale.customerId) {
      const settings = await getStoreSettings(tx);
      const loyaltyPaidCents = sale.payments.filter((p) => p.method === "LOYALTY").reduce((sum, p) => sum + p.amountCents, 0);
      const earnableCents = Math.max(sale.totalCents - loyaltyPaidCents, 0);
      loyaltyPointsEarned = Math.floor(earnableCents / 100) * settings.loyaltyPointsPerDollar;
      if (loyaltyPointsEarned > 0) {
        await tx.customer.update({ where: { id: sale.customerId }, data: { loyaltyPoints: { increment: loyaltyPointsEarned } } });
      }
    }

    return tx.sale.update({
      where: { id: saleId },
      data: { status: "COMPLETED", completedAt: new Date(), receiptNumber, loyaltyPointsEarned },
      include: SALE_INCLUDE
    });
  });
}

export interface VoidSaleInput {
  reason: string;
  approverId?: string;
}

export async function voidSale(saleId: string, input: VoidSaleInput, actingUserId: string) {
  return prisma.$transaction(async (tx) => {
    const sale = await tx.sale.findUnique({ where: { id: saleId } });
    if (!sale) throw Errors.notFound("Sale", saleId);
    if (sale.status !== "OPEN" && sale.status !== "HELD") {
      throw Errors.conflict(`Cannot void a sale in status ${sale.status} — use a refund instead`);
    }
    if (!input.approverId) throw Errors.forbidden("Voiding a sale requires manager approval");
    await assertManagerApprover(input.approverId);

    const updated = await tx.sale.update({
      where: { id: saleId },
      data: { status: "VOIDED", voidReason: input.reason, voidedById: input.approverId },
      include: SALE_INCLUDE
    });

    await recordAudit(
      {
        userId: actingUserId,
        action: "SALE_VOIDED",
        entityType: "Sale",
        entityId: saleId,
        metadata: { reason: input.reason, approverId: input.approverId }
      },
      tx
    );

    return updated;
  });
}

export interface RefundLineInput {
  saleLineId: string;
  quantityMilliUnits: number;
}

export interface RefundSaleInput {
  reason: string;
  approverId: string;
  lines: RefundLineInput[];
}

export async function refundSale(saleId: string, input: RefundSaleInput, actingUserId: string) {
  if (input.lines.length === 0) throw Errors.badRequest("Specify at least one line to refund");

  return prisma.$transaction(async (tx) => {
    const sale = await tx.sale.findUnique({ where: { id: saleId }, include: { lines: true, refunds: { include: { lines: true } } } });
    if (!sale) throw Errors.notFound("Sale", saleId);
    if (sale.status !== "COMPLETED" && sale.status !== "PARTIALLY_REFUNDED") {
      throw Errors.conflict(`Cannot refund a sale in status ${sale.status}`);
    }
    await assertManagerApprover(input.approverId);

    const alreadyRefundedByLine = new Map<string, number>();
    for (const refund of sale.refunds) {
      for (const rl of refund.lines) {
        alreadyRefundedByLine.set(rl.saleLineId, (alreadyRefundedByLine.get(rl.saleLineId) ?? 0) + rl.quantity);
      }
    }

    let totalRefundCents = 0;
    const refundLinesData: { saleLineId: string; quantity: number; amountCents: number }[] = [];

    for (const input_ of input.lines) {
      const line = sale.lines.find((l) => l.id === input_.saleLineId);
      if (!line) throw Errors.notFound("SaleLine", input_.saleLineId);

      const alreadyRefunded = alreadyRefundedByLine.get(line.id) ?? 0;
      const refundable = line.quantity - alreadyRefunded;
      if (input_.quantityMilliUnits <= 0 || input_.quantityMilliUnits > refundable) {
        throw Errors.badRequest(`Cannot refund more than the ${refundable} remaining units on line ${line.id}`);
      }

      const amountCents = Math.round((line.lineTotalCents * input_.quantityMilliUnits) / line.quantity);
      totalRefundCents += amountCents;
      refundLinesData.push({ saleLineId: line.id, quantity: input_.quantityMilliUnits, amountCents });

      await recordStockMovement(tx, {
        productId: line.productId,
        locationId: sale.locationId,
        type: "REFUND",
        deltaMilliUnits: input_.quantityMilliUnits,
        unitCostCents: line.unitCostCents,
        userId: actingUserId,
        reference: sale.id
      });
    }

    const refund = await tx.refund.create({
      data: {
        saleId,
        reason: input.reason,
        approvedById: input.approverId,
        amountCents: totalRefundCents,
        lines: { create: refundLinesData }
      },
      include: { lines: true }
    });

    const totalRefundedSoFar = [...sale.refunds.flatMap((r) => r.lines), ...refundLinesData].reduce(
      (sum, rl) => sum + rl.quantity,
      0
    );
    const totalSaleQuantity = sale.lines.reduce((sum, l) => sum + l.quantity, 0);
    const newStatus: SaleStatus = totalRefundedSoFar >= totalSaleQuantity ? "REFUNDED" : "PARTIALLY_REFUNDED";

    await tx.sale.update({ where: { id: saleId }, data: { status: newStatus } });

    await recordAudit(
      {
        userId: actingUserId,
        action: "REFUND_APPROVED",
        entityType: "Sale",
        entityId: saleId,
        after: { refundId: refund.id, amountCents: totalRefundCents, approverId: input.approverId, reason: input.reason }
      },
      tx
    );

    return getSale(saleId, tx);
  });
}
