import { describe, expect, it } from "vitest";
import { applyStockMovement, weightedAverageValueCents } from "../../src/lib/stock.js";

describe("applyStockMovement (weighted average)", () => {
  it("initializes average cost on the first receipt", () => {
    const result = applyStockMovement({ quantityOnHand: 0, averageCostCents: 0 }, 10_000, 500);
    expect(result).toEqual({ quantityOnHand: 10_000, averageCostCents: 500, costOfGoodsCents: 0 });
  });

  it("blends average cost on a second receipt at a different price", () => {
    // 10 units @ $5.00, then 10 more @ $7.00 -> new average $6.00
    const after1 = applyStockMovement({ quantityOnHand: 0, averageCostCents: 0 }, 10_000, 500);
    const after2 = applyStockMovement(after1, 10_000, 700);
    expect(after2.quantityOnHand).toBe(20_000);
    expect(after2.averageCostCents).toBe(600);
  });

  it("leaves average cost unchanged on an outflow and reports cost of goods", () => {
    const stock = { quantityOnHand: 20_000, averageCostCents: 600 };
    const afterSale = applyStockMovement(stock, -5_000, undefined);
    expect(afterSale.quantityOnHand).toBe(15_000);
    expect(afterSale.averageCostCents).toBe(600);
    // 5 units @ $6.00 = $30.00
    expect(afterSale.costOfGoodsCents).toBe(3000);
  });

  it("falls back to the current average cost when an inflow carries no cost (e.g. transfer-in)", () => {
    const stock = { quantityOnHand: 10_000, averageCostCents: 400 };
    const afterTransfer = applyStockMovement(stock, 5_000, undefined);
    expect(afterTransfer.averageCostCents).toBe(400);
    expect(afterTransfer.quantityOnHand).toBe(15_000);
  });

  it("is a no-op for a zero delta", () => {
    const stock = { quantityOnHand: 1000, averageCostCents: 250 };
    expect(applyStockMovement(stock, 0)).toEqual({ ...stock, costOfGoodsCents: 0 });
  });

  it("handles fractional (weighed) quantities via milli-units", () => {
    // 1.5 kg @ $2.00/kg, then sell 0.5 kg
    const afterReceipt = applyStockMovement({ quantityOnHand: 0, averageCostCents: 0 }, 1500, 200);
    expect(afterReceipt.quantityOnHand).toBe(1500);
    const afterSale = applyStockMovement(afterReceipt, -500);
    expect(afterSale.quantityOnHand).toBe(1000);
    expect(afterSale.costOfGoodsCents).toBe(100); // 0.5kg * $2.00
  });

  it("rejects a non-integer delta", () => {
    expect(() => applyStockMovement({ quantityOnHand: 0, averageCostCents: 0 }, 1.5)).toThrow();
  });
});

describe("weightedAverageValueCents", () => {
  it("computes qty * avgCost converted from milli-units", () => {
    expect(weightedAverageValueCents({ quantityOnHand: 2500, averageCostCents: 400 })).toBe(1000);
  });
});
