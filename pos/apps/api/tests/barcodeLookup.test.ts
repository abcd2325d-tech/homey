import { afterAll, beforeEach, describe, expect, it, vi } from "vitest";
import request from "supertest";

const openFoodFactsLookup = vi.fn();
const upcItemDbLookup = vi.fn();

vi.mock("../src/modules/barcodeLookup/providers/index.js", async () => {
  const actual = await vi.importActual<typeof import("../src/modules/barcodeLookup/providers/index.js")>(
    "../src/modules/barcodeLookup/providers/index.js"
  );
  return {
    ...actual,
    getProviderByKey: (key: string) => {
      if (key === "upcitemdb") return { key: "upcitemdb", isConfigured: () => true, lookup: upcItemDbLookup };
      if (key === "openfoodfacts")
        return { key: "openfoodfacts", isConfigured: () => true, lookup: openFoodFactsLookup };
      return actual.getProviderByKey(key);
    }
  };
});

// Import after the mock is registered (vitest hoists vi.mock automatically).
const { buildApp } = await import("../src/app.js");
const { prisma } = await import("../src/lib/prisma.js");
const { resetDb } = await import("./helpers/db.js");
const { createTestUser } = await import("./helpers/factories.js");

const app = buildApp();

beforeEach(async () => {
  await resetDb();
  openFoodFactsLookup.mockReset();
  upcItemDbLookup.mockReset();
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("barcode lookup", () => {
  it("returns a hit from the first provider that finds it and caches it", async () => {
    upcItemDbLookup.mockResolvedValue(null);
    openFoodFactsLookup.mockResolvedValue({
      name: "Test Soda",
      brand: "TestCo",
      category: "Beverages",
      imageUrl: "https://example.com/img.jpg",
      description: "A fizzy drink"
    });

    const { accessToken } = await createTestUser({ role: "CASHIER" });
    const res = await request(app)
      .get("/api/barcode-lookup/0123456789012")
      .set("Authorization", `Bearer ${accessToken}`);

    expect(res.status).toBe(200);
    expect(res.body.data.found).toBe(true);
    expect(res.body.data.provider).toBe("openfoodfacts");
    expect(res.body.data.name).toBe("Test Soda");
    expect(res.body.data.cached).toBe(false);

    const cached = await prisma.barcodeLookupCache.findUnique({ where: { barcode: "0123456789012" } });
    expect(cached?.found).toBe(true);
    expect(cached?.provider).toBe("openfoodfacts");
  });

  it("falls through to the next provider when the first errors", async () => {
    upcItemDbLookup.mockRejectedValue(new Error("timeout"));
    openFoodFactsLookup.mockResolvedValue({
      name: "Fallback Product",
      brand: null,
      category: null,
      imageUrl: null,
      description: null
    });

    const { accessToken } = await createTestUser({ role: "CASHIER" });
    const res = await request(app)
      .get("/api/barcode-lookup/9999999999999")
      .set("Authorization", `Bearer ${accessToken}`);

    expect(res.status).toBe(200);
    expect(res.body.data.found).toBe(true);
    expect(res.body.data.name).toBe("Fallback Product");
    expect(upcItemDbLookup).toHaveBeenCalled();
    expect(openFoodFactsLookup).toHaveBeenCalled();
  });

  it("caches a miss and never calls providers again for the same barcode", async () => {
    upcItemDbLookup.mockResolvedValue(null);
    openFoodFactsLookup.mockResolvedValue(null);

    const { accessToken } = await createTestUser({ role: "CASHIER" });
    const first = await request(app)
      .get("/api/barcode-lookup/0000000000000")
      .set("Authorization", `Bearer ${accessToken}`);
    expect(first.body.data.found).toBe(false);
    expect(upcItemDbLookup).toHaveBeenCalledTimes(1);

    const second = await request(app)
      .get("/api/barcode-lookup/0000000000000")
      .set("Authorization", `Bearer ${accessToken}`);
    expect(second.body.data.found).toBe(false);
    expect(second.body.data.cached).toBe(true);
    // Still only called once total: the second request used the cache.
    expect(upcItemDbLookup).toHaveBeenCalledTimes(1);
  });

  it("forceRefresh bypasses a cached miss and queries providers again", async () => {
    upcItemDbLookup.mockResolvedValue(null);
    openFoodFactsLookup.mockResolvedValue(null);

    const { accessToken } = await createTestUser({ role: "CASHIER" });
    await request(app).get("/api/barcode-lookup/1111111111111").set("Authorization", `Bearer ${accessToken}`);
    expect(upcItemDbLookup).toHaveBeenCalledTimes(1);

    openFoodFactsLookup.mockResolvedValue({ name: "Now Found", brand: null, category: null, imageUrl: null, description: null });
    const refreshed = await request(app)
      .get("/api/barcode-lookup/1111111111111?forceRefresh=true")
      .set("Authorization", `Bearer ${accessToken}`);
    expect(refreshed.body.data.found).toBe(true);
    expect(upcItemDbLookup).toHaveBeenCalledTimes(2);
  });
});
