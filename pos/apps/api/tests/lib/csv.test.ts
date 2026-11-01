import { describe, expect, it } from "vitest";
import { parseCsv, parseCsvRecords, toCsv } from "../../src/lib/csv.js";

describe("csv", () => {
  it("parses simple rows", () => {
    expect(parseCsv("a,b,c\n1,2,3\n")).toEqual([
      ["a", "b", "c"],
      ["1", "2", "3"]
    ]);
  });

  it("handles quoted fields with commas and escaped quotes", () => {
    const text = 'name,note\n"Smith, John","he said ""hi"""\n';
    expect(parseCsv(text)).toEqual([
      ["name", "note"],
      ["Smith, John", 'he said "hi"']
    ]);
  });

  it("parses records keyed by header", () => {
    const records = parseCsvRecords("sku,name\nA1,Widget\nA2,Gadget\n");
    expect(records).toEqual([
      { sku: "A1", name: "Widget" },
      { sku: "A2", name: "Gadget" }
    ]);
  });

  it("round-trips through toCsv", () => {
    const csv = toCsv(["sku", "name"], [["A1", "Widget, Deluxe"]]);
    expect(parseCsvRecords(csv)).toEqual([{ sku: "A1", name: "Widget, Deluxe" }]);
  });
});
