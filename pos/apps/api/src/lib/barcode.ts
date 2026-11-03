export type BarcodeType = "UPC_A" | "UPC_E" | "EAN_13" | "EAN_8" | "CODE128" | "OTHER";

function digitsOf(code: string): number[] {
  return code.split("").map((c) => {
    const d = Number(c);
    if (!Number.isInteger(d)) throw new RangeError(`Non-digit character in barcode: ${code}`);
    return d;
  });
}

/** GS1 check-digit algorithm: weights alternate 3,1,3,1... or 1,3,1,3... from the left. */
function gs1CheckDigit(dataDigits: number[], firstWeight: 3 | 1): number {
  const secondWeight = firstWeight === 3 ? 1 : 3;
  const sum = dataDigits.reduce((total, digit, index) => {
    const weight = index % 2 === 0 ? firstWeight : secondWeight;
    return total + digit * weight;
  }, 0);
  return (10 - (sum % 10)) % 10;
}

/** UPC-A: 12 digits, first 11 are data (odd positions weight 3), 12th is the check digit. */
export function isValidUpcA(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  const digits = digitsOf(code);
  const check = gs1CheckDigit(digits.slice(0, 11), 3);
  return check === digits[11];
}

/** EAN-13: 13 digits, first 12 are data (odd positions weight 1), 13th is the check digit. */
export function isValidEan13(code: string): boolean {
  if (!/^\d{13}$/.test(code)) return false;
  const digits = digitsOf(code);
  const check = gs1CheckDigit(digits.slice(0, 12), 1);
  return check === digits[12];
}

/** EAN-8: 8 digits, first 7 are data (odd positions weight 3), 8th is the check digit. */
export function isValidEan8(code: string): boolean {
  if (!/^\d{8}$/.test(code)) return false;
  const digits = digitsOf(code);
  const check = gs1CheckDigit(digits.slice(0, 7), 3);
  return check === digits[7];
}

/**
 * Validates a barcode against the check-digit algorithm implied by its
 * declared type. CODE128 and OTHER have no universal check digit, so they're
 * accepted as long as they're non-empty.
 */
export function isValidBarcode(code: string, type: BarcodeType): boolean {
  switch (type) {
    case "UPC_A":
      return isValidUpcA(code);
    case "EAN_13":
      return isValidEan13(code);
    case "EAN_8":
      return isValidEan8(code);
    case "UPC_E":
      return /^\d{8}$/.test(code);
    case "CODE128":
    case "OTHER":
      return code.trim().length > 0;
    default:
      return false;
  }
}

/** Best-effort type detection from length, for scanned input of unknown type. */
export function detectBarcodeType(code: string): BarcodeType {
  if (/^\d{8}$/.test(code)) return "EAN_8";
  if (/^\d{12}$/.test(code)) return "UPC_A";
  if (/^\d{13}$/.test(code)) return "EAN_13";
  return "OTHER";
}
