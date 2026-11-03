import { describe, expect, it } from "vitest";
import { computeSaleLine } from "../../src/lib/saleLine.js";

describe("computeSaleLine", () => {
  it("computes a plain line with no discount, tax-exclusive", () => {
    // 2 units @ $5.00, 8.25% tax
    const result = computeSaleLine({
      unitPriceCents: 500,
      quantityMilliUnits: 2000,
      taxRateBasisPoints: 825,
      priceIncludesTax: false
    });
    expect(result.grossBeforeDiscountCents).toBe(1000);
    expect(result.discountCents).toBe(0);
    expect(result.netCents).toBe(1000);
    expect(result.taxCents).toBe(83);
    expect(result.lineTotalCents).toBe(1083);
  });

  it("applies a percent discount before computing tax", () => {
    // 1 unit @ $20.00, 10% discount -> $18.00 taxable, 10% tax -> $1.80
    const result = computeSaleLine({
      unitPriceCents: 2000,
      quantityMilliUnits: 1000,
      discountType: "PERCENT",
      discountValue: 1000,
      taxRateBasisPoints: 1000,
      priceIncludesTax: false
    });
    expect(result.discountCents).toBe(200);
    expect(result.netCents).toBe(1800);
    expect(result.taxCents).toBe(180);
    expect(result.lineTotalCents).toBe(1980);
  });

  it("handles tax-inclusive pricing with a fixed discount", () => {
    // 1 unit @ $11.50 gross (15% VAT included), $1.50 fixed discount off the gross
    const result = computeSaleLine({
      unitPriceCents: 1150,
      quantityMilliUnits: 1000,
      discountType: "FIXED",
      discountValue: 150,
      taxRateBasisPoints: 1500,
      priceIncludesTax: true
    });
    expect(result.discountCents).toBe(150);
    // Remaining gross 1000 at 15% VAT -> net ~869.57 rounds to 870, tax 130
    expect(result.netCents + result.taxCents).toBe(1000);
    expect(result.lineTotalCents).toBe(1000);
  });

  it("handles fractional (weighed) quantities", () => {
    // 1.5 kg @ $3.00/kg
    const result = computeSaleLine({
      unitPriceCents: 300,
      quantityMilliUnits: 1500,
      taxRateBasisPoints: 0,
      priceIncludesTax: false
    });
    expect(result.grossBeforeDiscountCents).toBe(450);
    expect(result.lineTotalCents).toBe(450);
  });
});
