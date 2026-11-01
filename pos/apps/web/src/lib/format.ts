export function formatCents(cents: number, currency = "USD", locale = "en-US"): string {
  return new Intl.NumberFormat(locale, { style: "currency", currency }).format(cents / 100);
}

export function toMilliUnits(displayQuantity: number): number {
  return Math.round(displayQuantity * 1000);
}

export function fromMilliUnits(milli: number): number {
  return milli / 1000;
}

export function formatQuantity(milli: number, unit = "EACH"): string {
  const value = fromMilliUnits(milli);
  return unit === "EACH" ? String(value) : value.toFixed(3);
}
