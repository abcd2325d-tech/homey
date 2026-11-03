export interface TaxResult {
  /** Pre-tax amount, in cents */
  netCents: number;
  /** Tax amount, in cents */
  taxCents: number;
  /** Amount including tax, in cents */
  grossCents: number;
}

/**
 * Computes tax on a base amount.
 *
 * - `priceIncludesTax = false` (US sales-tax style): `baseCents` is the
 *   pre-tax price; tax is added on top.
 * - `priceIncludesTax = true` (VAT style): `baseCents` already includes tax;
 *   tax is backed out of it.
 *
 * Rounds to the nearest cent at the point tax is computed (not on sub-cent
 * intermediate values), which is the behavior most POS/tax authorities expect
 * for a single line.
 */
export function computeTax(
  baseCents: number,
  rateBasisPoints: number,
  priceIncludesTax: boolean
): TaxResult {
  if (!Number.isInteger(baseCents)) {
    throw new RangeError(`baseCents must be an integer, got: ${baseCents}`);
  }
  if (rateBasisPoints < 0) {
    throw new RangeError(`rateBasisPoints cannot be negative, got: ${rateBasisPoints}`);
  }

  if (rateBasisPoints === 0) {
    return { netCents: baseCents, taxCents: 0, grossCents: baseCents };
  }

  if (priceIncludesTax) {
    const netCents = Math.round((baseCents * 10000) / (10000 + rateBasisPoints));
    const taxCents = baseCents - netCents;
    return { netCents, taxCents, grossCents: baseCents };
  }

  const taxCents = Math.round((baseCents * rateBasisPoints) / 10000);
  return { netCents: baseCents, taxCents, grossCents: baseCents + taxCents };
}
