import { describe, expect, it } from "vitest";
import { computeTax } from "../../src/lib/tax.js";

describe("computeTax", () => {
  it("adds tax on top for tax-exclusive pricing (US sales tax)", () => {
    // $10.00 at 8.25% -> $0.83 tax (825 * 1000 / 10000 = 82.5 -> rounds to 83)
    const result = computeTax(1000, 825, false);
    expect(result.netCents).toBe(1000);
    expect(result.taxCents).toBe(83);
    expect(result.grossCents).toBe(1083);
  });

  it("backs tax out of a tax-inclusive price (VAT style)", () => {
    // $11.50 gross at 15% VAT -> net = 1150 * 10000 / 11500 = 1000, tax = 150
    const result = computeTax(1150, 1500, true);
    expect(result.netCents).toBe(1000);
    expect(result.taxCents).toBe(150);
    expect(result.grossCents).toBe(1150);
  });

  it("returns zero tax for a zero rate", () => {
    const result = computeTax(500, 0, false);
    expect(result).toEqual({ netCents: 500, taxCents: 0, grossCents: 500 });
  });

  it("rounds to the nearest cent", () => {
    // $0.01 at 8.25% -> 0.000825 -> rounds to 0
    expect(computeTax(1, 825, false).taxCents).toBe(0);
    // $1.00 at 6% -> 6 cents exactly
    expect(computeTax(100, 600, false).taxCents).toBe(6);
  });

  it("rejects negative rates", () => {
    expect(() => computeTax(100, -1, false)).toThrow();
  });

  it("rejects non-integer base amounts", () => {
    expect(() => computeTax(10.5, 825, false)).toThrow();
  });
});
