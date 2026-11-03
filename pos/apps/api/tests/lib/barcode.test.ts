import { describe, expect, it } from "vitest";
import {
  detectBarcodeType,
  isValidBarcode,
  isValidEan13,
  isValidEan8,
  isValidUpcA
} from "../../src/lib/barcode.js";

describe("isValidUpcA", () => {
  it("accepts a real UPC-A (Coca-Cola can, 049000028911)", () => {
    expect(isValidUpcA("049000028911")).toBe(true);
  });

  it("rejects a UPC-A with a wrong check digit", () => {
    expect(isValidUpcA("049000028912")).toBe(false);
  });

  it("rejects wrong length", () => {
    expect(isValidUpcA("4900002891")).toBe(false);
  });

  it("rejects non-digit characters", () => {
    expect(isValidUpcA("04900002891X")).toBe(false);
  });
});

describe("isValidEan13", () => {
  it("accepts a real EAN-13 (a UPC-A zero-padded to 13 digits)", () => {
    expect(isValidEan13("0049000028911")).toBe(true);
  });

  it("accepts a real EAN-13 book barcode (ISBN-13 4006381333931 is not valid EAN, use a known-good one)", () => {
    expect(isValidEan13("4006381333931")).toBe(true);
  });

  it("rejects a bad check digit", () => {
    expect(isValidEan13("4006381333932")).toBe(false);
  });
});

describe("isValidEan8", () => {
  it("accepts a real EAN-8", () => {
    expect(isValidEan8("40170725")).toBe(true);
  });

  it("rejects a bad check digit", () => {
    expect(isValidEan8("40170726")).toBe(false);
  });
});

describe("isValidBarcode dispatch", () => {
  it("validates by declared type", () => {
    expect(isValidBarcode("049000028911", "UPC_A")).toBe(true);
    expect(isValidBarcode("4006381333931", "EAN_13")).toBe(true);
    expect(isValidBarcode("40170725", "EAN_8")).toBe(true);
  });

  it("accepts any non-empty CODE128/OTHER value", () => {
    expect(isValidBarcode("SKU-ABC-123", "CODE128")).toBe(true);
    expect(isValidBarcode("", "OTHER")).toBe(false);
  });
});

describe("detectBarcodeType", () => {
  it("detects by length", () => {
    expect(detectBarcodeType("40170725")).toBe("EAN_8");
    expect(detectBarcodeType("049000028911")).toBe("UPC_A");
    expect(detectBarcodeType("4006381333931")).toBe("EAN_13");
    expect(detectBarcodeType("SKU-ABC")).toBe("OTHER");
  });
});
