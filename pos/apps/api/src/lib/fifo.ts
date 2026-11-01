// Pure FIFO cost-layer consumption. The caller (inventory.service) is
// responsible for loading layers oldest-first and persisting the returned
// updates inside a transaction.

export interface FifoLayer {
  id: string;
  quantityRemaining: number; // milli-units
  unitCostCents: number;
}

export interface ConsumeFifoResult {
  costOfGoodsCents: number;
  updates: { id: string; quantityRemaining: number }[];
  /** Milli-units that couldn't be matched to a layer (stock went negative / layers are short). */
  shortfallMilliUnits: number;
}

export function consumeFifo(layers: FifoLayer[], quantityToConsumeMilliUnits: number): ConsumeFifoResult {
  if (quantityToConsumeMilliUnits < 0) {
    throw new RangeError(`quantityToConsumeMilliUnits must be non-negative, got: ${quantityToConsumeMilliUnits}`);
  }

  let remaining = quantityToConsumeMilliUnits;
  let costOfGoodsCents = 0;
  const updates: { id: string; quantityRemaining: number }[] = [];

  for (const layer of layers) {
    if (remaining <= 0) break;
    const take = Math.min(layer.quantityRemaining, remaining);
    if (take <= 0) continue;
    costOfGoodsCents += Math.round((take * layer.unitCostCents) / 1000);
    updates.push({ id: layer.id, quantityRemaining: layer.quantityRemaining - take });
    remaining -= take;
  }

  return { costOfGoodsCents, updates, shortfallMilliUnits: remaining };
}

export function fifoValueCents(layers: FifoLayer[]): number {
  return layers.reduce((total, layer) => total + Math.round((layer.quantityRemaining * layer.unitCostCents) / 1000), 0);
}
