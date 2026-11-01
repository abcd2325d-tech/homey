import { computeDiscount, type DiscountType } from "./discount.js";
import { computeTax } from "./tax.js";

export interface ComputeSaleLineInput {
  unitPriceCents: number;
  quantityMilliUnits: number;
  discountType?: DiscountType | null;
  discountValue?: number | null;
  taxRateBasisPoints: number;
  priceIncludesTax: boolean;
}

export interface ComputeSaleLineResult {
  grossBeforeDiscountCents: number;
  discountCents: number;
  netCents: number; // pre-tax, post-discount
  taxCents: number;
  lineTotalCents: number; // what the customer pays for this line
}

/** Composes discount.ts + tax.ts into the full per-line calculation used by the cart. */
export function computeSaleLine(input: ComputeSaleLineInput): ComputeSaleLineResult {
  const grossBeforeDiscountCents = Math.round((input.unitPriceCents * input.quantityMilliUnits) / 1000);

  const discountCents = input.discountType
    ? computeDiscount(grossBeforeDiscountCents, input.discountType, input.discountValue ?? 0)
    : 0;

  const baseAfterDiscount = grossBeforeDiscountCents - discountCents;
  const tax = computeTax(baseAfterDiscount, input.taxRateBasisPoints, input.priceIncludesTax);

  return {
    grossBeforeDiscountCents,
    discountCents,
    netCents: tax.netCents,
    taxCents: tax.taxCents,
    lineTotalCents: tax.grossCents
  };
}
