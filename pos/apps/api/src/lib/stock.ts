// Pure stock-movement math for the weighted-average costing method.
// StockMovement is the ledger; this is how a single movement folds into the
// cached StockItem totals. Quantities are milli-units (see qty.ts).

export interface StockCostState {
  quantityOnHand: number; // milli-units
  averageCostCents: number; // cost per whole unit
}

export interface ApplyMovementResult extends StockCostState {
  /** Only non-zero for an outflow (delta < 0): the cost basis of the units removed. */
  costOfGoodsCents: number;
}

/**
 * Folds a signed quantity delta into the current stock state.
 *
 * - Inflow (delta > 0): recomputes the weighted-average cost using
 *   `unitCostCents` for the incoming units (falls back to the current
 *   average if the movement doesn't carry a cost, e.g. a transfer-in).
 * - Outflow (delta < 0): quantity drops, the average cost is untouched, and
 *   the cost of the removed units is reported for margin/COGS reporting.
 */
export function applyStockMovement(
  current: StockCostState,
  deltaMilliUnits: number,
  unitCostCents?: number
): ApplyMovementResult {
  if (!Number.isInteger(deltaMilliUnits)) {
    throw new RangeError(`deltaMilliUnits must be an integer, got: ${deltaMilliUnits}`);
  }

  if (deltaMilliUnits === 0) {
    return { ...current, costOfGoodsCents: 0 };
  }

  if (deltaMilliUnits > 0) {
    const newQty = current.quantityOnHand + deltaMilliUnits;
    const incomingCost = unitCostCents ?? current.averageCostCents;
    const averageCostCents =
      newQty === 0
        ? 0
        : Math.round(
            (current.quantityOnHand * current.averageCostCents + deltaMilliUnits * incomingCost) / newQty
          );
    return { quantityOnHand: newQty, averageCostCents, costOfGoodsCents: 0 };
  }

  const outQty = -deltaMilliUnits;
  const costOfGoodsCents = Math.round((outQty * current.averageCostCents) / 1000);
  return {
    quantityOnHand: current.quantityOnHand - outQty,
    averageCostCents: current.averageCostCents,
    costOfGoodsCents
  };
}

/** Inventory value of a weighted-average stock position, in cents. */
export function weightedAverageValueCents(state: StockCostState): number {
  return Math.round((state.quantityOnHand * state.averageCostCents) / 1000);
}
