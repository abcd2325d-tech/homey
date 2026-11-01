export type DiscountType = "PERCENT" | "FIXED";

/**
 * Computes the discount amount (in cents) to subtract from `baseCents`.
 *
 * - PERCENT: `value` is basis points, e.g. 1500 = 15.00%.
 * - FIXED: `value` is cents.
 *
 * The result is clamped to [0, baseCents] so a discount can never make a
 * line negative or exceed its own price.
 */
export function computeDiscount(baseCents: number, type: DiscountType, value: number): number {
  if (!Number.isInteger(baseCents) || baseCents < 0) {
    throw new RangeError(`baseCents must be a non-negative integer, got: ${baseCents}`);
  }
  if (!Number.isInteger(value) || value < 0) {
    throw new RangeError(`discount value must be a non-negative integer, got: ${value}`);
  }

  let amount: number;
  if (type === "PERCENT") {
    if (value > 10000) {
      throw new RangeError(`percent discount cannot exceed 100% (10000 bps), got: ${value}`);
    }
    amount = Math.round((baseCents * value) / 10000);
  } else {
    amount = value;
  }

  return Math.min(Math.max(amount, 0), baseCents);
}

/** Manager-PIN approval is required when a discount exceeds this configured limit. */
export function discountRequiresApproval(
  baseCents: number,
  type: DiscountType,
  value: number,
  approvalThresholdBasisPoints: number
): boolean {
  const discountCents = computeDiscount(baseCents, type, value);
  if (baseCents === 0) return false;
  const effectiveBasisPoints = Math.round((discountCents * 10000) / baseCents);
  return effectiveBasisPoints > approvalThresholdBasisPoints;
}
