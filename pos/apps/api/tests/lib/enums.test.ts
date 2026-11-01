import { describe, expect, it } from "vitest";
import { zRole, zPaymentMethod, ROLES } from "../../src/lib/enums.js";

describe("shared enum wiring", () => {
  it("resolves @pos/shared through the workspace link", () => {
    expect(ROLES).toEqual(["ADMIN", "MANAGER", "CASHIER"]);
  });

  it("validates with zod enums built from shared literal unions", () => {
    expect(zRole.parse("ADMIN")).toBe("ADMIN");
    expect(() => zRole.parse("SUPERADMIN")).toThrow();
    expect(zPaymentMethod.parse("CASH")).toBe("CASH");
  });
});
