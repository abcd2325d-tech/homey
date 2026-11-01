// Money is always an integer number of minor units (cents). Never use
// floating-point arithmetic on money — only these helpers, or integer
// +, -, * by an integer.

export function dollarsToCents(amount: number): number {
  if (!Number.isFinite(amount)) {
    throw new RangeError(`Invalid money amount: ${amount}`);
  }
  return Math.round(amount * 100);
}

export function centsToDollars(cents: number): number {
  assertIsInteger(cents);
  return cents / 100;
}

export function formatMoney(cents: number, currencyCode = "USD", locale = "en-US"): string {
  assertIsInteger(cents);
  return new Intl.NumberFormat(locale, { style: "currency", currency: currencyCode }).format(
    cents / 100
  );
}

export function sumCents(values: number[]): number {
  return values.reduce((total, value) => {
    assertIsInteger(value);
    return total + value;
  }, 0);
}

function assertIsInteger(value: number): void {
  if (!Number.isInteger(value)) {
    throw new RangeError(`Money values must be integer cents, got: ${value}`);
  }
}
