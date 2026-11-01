import { describe, expect, it } from "vitest";
import { computeDiscount, discountRequiresApproval } from "../../src/lib/discount.js";

describe("computeDiscount", () => {
  it("computes a percent discount from basis points", () => {
    // 15% off $20.00 -> $3.00
    expect(computeDiscount(2000, "PERCENT", 1500)).toBe(300);
  });

  it("computes a fixed discount in cents", () => {
    expect(computeDiscount(2000, "FIXED", 500)).toBe(500);
  });

  it("clamps a fixed discount to the base amount", () => {
    expect(computeDiscount(500, "FIXED", 999)).toBe(500);
  });

  it("clamps a 100% percent discount to the base amount", () => {
    expect(computeDiscount(1234, "PERCENT", 10000)).toBe(1234);
  });

  it("rejects a percent discount over 100%", () => {
    expect(() => computeDiscount(1000, "PERCENT", 10001)).toThrow();
  });

  it("rejects negative base or value", () => {
    expect(() => computeDiscount(-100, "FIXED", 10)).toThrow();
    expect(() => computeDiscount(100, "FIXED", -10)).toThrow();
  });
});

describe("discountRequiresApproval", () => {
  it("does not require approval under the threshold", () => {
    // 10% discount, threshold 20% (2000 bps)
    expect(discountRequiresApproval(1000, "PERCENT", 1000, 2000)).toBe(false);
  });

  it("requires approval over the threshold", () => {
    // 25% discount, threshold 20% (2000 bps)
    expect(discountRequiresApproval(1000, "PERCENT", 2500, 2000)).toBe(true);
  });

  it("requires approval for a fixed discount that exceeds the threshold proportionally", () => {
    // $6 off a $10 line = 60%, threshold 20%
    expect(discountRequiresApproval(1000, "FIXED", 600, 2000)).toBe(true);
  });

  it("never requires approval on a zero-value line", () => {
    expect(discountRequiresApproval(0, "FIXED", 0, 0)).toBe(false);
  });
});
