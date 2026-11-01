import { describe, expect, it } from "vitest";
import { consumeFifo, fifoValueCents } from "../../src/lib/fifo.js";

describe("consumeFifo", () => {
  it("consumes the oldest layer first", () => {
    const layers = [
      { id: "L1", quantityRemaining: 5000, unitCostCents: 400 },
      { id: "L2", quantityRemaining: 5000, unitCostCents: 600 }
    ];
    const result = consumeFifo(layers, 3000);
    expect(result.costOfGoodsCents).toBe(1200); // 3 units @ $4.00
    expect(result.updates).toEqual([{ id: "L1", quantityRemaining: 2000 }]);
    expect(result.shortfallMilliUnits).toBe(0);
  });

  it("spans multiple layers when the first is exhausted", () => {
    const layers = [
      { id: "L1", quantityRemaining: 2000, unitCostCents: 400 },
      { id: "L2", quantityRemaining: 5000, unitCostCents: 600 }
    ];
    const result = consumeFifo(layers, 5000);
    // 2 units @ $4.00 + 3 units @ $6.00 = $8 + $18 = $26
    expect(result.costOfGoodsCents).toBe(2600);
    expect(result.updates).toEqual([
      { id: "L1", quantityRemaining: 0 },
      { id: "L2", quantityRemaining: 2000 }
    ]);
  });

  it("reports a shortfall when layers run out", () => {
    const layers = [{ id: "L1", quantityRemaining: 1000, unitCostCents: 400 }];
    const result = consumeFifo(layers, 3000);
    expect(result.shortfallMilliUnits).toBe(2000);
    expect(result.updates).toEqual([{ id: "L1", quantityRemaining: 0 }]);
  });

  it("is a no-op for zero quantity", () => {
    const result = consumeFifo([{ id: "L1", quantityRemaining: 1000, unitCostCents: 400 }], 0);
    expect(result).toEqual({ costOfGoodsCents: 0, updates: [], shortfallMilliUnits: 0 });
  });

  it("rejects a negative quantity", () => {
    expect(() => consumeFifo([], -1)).toThrow();
  });
});

describe("fifoValueCents", () => {
  it("sums remaining quantity * cost across layers", () => {
    const layers = [
      { id: "L1", quantityRemaining: 2000, unitCostCents: 400 },
      { id: "L2", quantityRemaining: 1000, unitCostCents: 600 }
    ];
    // 2*$4.00 + 1*$6.00 = $8 + $6 = $14
    expect(fifoValueCents(layers)).toBe(1400);
  });
});
