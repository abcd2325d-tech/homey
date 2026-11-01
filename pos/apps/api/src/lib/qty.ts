// Quantities are stored as integers in "milli-units" (value * 1000), the same
// trick as money-in-cents, so weighed/bulk items (0.001 kg precision) don't
// suffer floating-point drift. SQLite's Prisma connector has no Decimal type,
// so this is the portable option across SQLite and PostgreSQL.

const SCALE = 1000;

export function toMilliUnits(displayQuantity: number): number {
  if (!Number.isFinite(displayQuantity)) {
    throw new RangeError(`Invalid quantity: ${displayQuantity}`);
  }
  return Math.round(displayQuantity * SCALE);
}

export function fromMilliUnits(milli: number): number {
  assertIsInteger(milli);
  return milli / SCALE;
}

export function formatQuantity(milli: number, unit: string): string {
  const display = fromMilliUnits(milli);
  const decimals = unit === "EACH" ? 0 : 3;
  return `${display.toFixed(decimals)} ${unit}`;
}

function assertIsInteger(value: number): void {
  if (!Number.isInteger(value)) {
    throw new RangeError(`Quantity values must be integer milli-units, got: ${value}`);
  }
}
