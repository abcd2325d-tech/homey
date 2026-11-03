import { afterAll, beforeEach, describe, expect, it } from "vitest";
import request from "supertest";
import { buildApp } from "../src/app.js";
import { prisma } from "../src/lib/prisma.js";
import { resetDb } from "./helpers/db.js";
import { createTestLocation, createTestUser } from "./helpers/factories.js";

const app = buildApp();

beforeEach(async () => {
  await resetDb();
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("product variants", () => {
  it("creates variants under a parent group product, each independently sellable", async () => {
    const { accessToken } = await createTestUser({ role: "MANAGER" });

    const parent = await request(app)
      .post("/api/products")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ sku: "NAIL-POLISH", name: "OPI Nail Polish", costPriceCents: 300, sellPriceCents: 999, isActive: false });
    expect(parent.status).toBe(201);

    const red = await request(app)
      .post(`/api/products/${parent.body.data.id}/variants`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        sku: "NAIL-POLISH-RED",
        costPriceCents: 300,
        sellPriceCents: 999,
        variantAttributes: { color: "Red", size: "15ml" },
        barcodes: [{ code: "049000028911", type: "UPC_A" }]
      });
    expect(red.status).toBe(201);
    expect(red.body.data.parentProductId).toBe(parent.body.data.id);
    expect(JSON.parse(red.body.data.variantAttributes)).toEqual({ color: "Red", size: "15ml" });
    // Inherited from parent since not overridden.
    expect(red.body.data.name).toBe("OPI Nail Polish");

    const blue = await request(app)
      .post(`/api/products/${parent.body.data.id}/variants`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ sku: "NAIL-POLISH-BLUE", name: "OPI Nail Polish — Blue", costPriceCents: 300, sellPriceCents: 999 });
    expect(blue.status).toBe(201);

    const list = await request(app)
      .get(`/api/products/${parent.body.data.id}/variants`)
      .set("Authorization", `Bearer ${accessToken}`);
    expect(list.body.data).toHaveLength(2);

    const fetchedParent = await request(app)
      .get(`/api/products/${parent.body.data.id}`)
      .set("Authorization", `Bearer ${accessToken}`);
    expect(fetchedParent.body.data.variants).toHaveLength(2);
  });

  it("rejects adding a variant under another variant", async () => {
    const { accessToken } = await createTestUser({ role: "MANAGER" });
    const parent = await request(app)
      .post("/api/products")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ sku: "GROUP", name: "Group", costPriceCents: 100, sellPriceCents: 200 });
    const child = await request(app)
      .post(`/api/products/${parent.body.data.id}/variants`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ sku: "CHILD", costPriceCents: 100, sellPriceCents: 200 });

    const grandchild = await request(app)
      .post(`/api/products/${child.body.data.id}/variants`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ sku: "GRANDCHILD", costPriceCents: 100, sellPriceCents: 200 });
    expect(grandchild.status).toBe(400);
  });
});

describe("lot/expiration tracking", () => {
  it("records lot number and expiration on a stock adjustment and surfaces it in expiring-soon", async () => {
    const { accessToken } = await createTestUser({ role: "MANAGER" });
    const location = await createTestLocation();
    const product = await request(app)
      .post("/api/products")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ sku: "SERUM", name: "Vitamin C Serum", costPriceCents: 500, sellPriceCents: 1500 });

    const soon = new Date(Date.now() + 10 * 24 * 60 * 60 * 1000);
    const far = new Date(Date.now() + 300 * 24 * 60 * 60 * 1000);

    await request(app)
      .post("/api/stock/adjustments")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        productId: product.body.data.id,
        locationId: location.id,
        deltaMilliUnits: 5_000,
        unitCostCents: 500,
        lotNumber: "LOT-SOON",
        expirationDate: soon.toISOString(),
        reason: "received batch 1"
      });
    await request(app)
      .post("/api/stock/adjustments")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        productId: product.body.data.id,
        locationId: location.id,
        deltaMilliUnits: 5_000,
        unitCostCents: 500,
        lotNumber: "LOT-FAR",
        expirationDate: far.toISOString(),
        reason: "received batch 2"
      });

    const expiringSoon = await request(app)
      .get(`/api/stock/expiring-soon?locationId=${location.id}&withinDays=30`)
      .set("Authorization", `Bearer ${accessToken}`);
    expect(expiringSoon.status).toBe(200);
    expect(expiringSoon.body.data).toHaveLength(1);
    expect(expiringSoon.body.data[0].lotNumber).toBe("LOT-SOON");

    const expiringLong = await request(app)
      .get(`/api/stock/expiring-soon?locationId=${location.id}&withinDays=400`)
      .set("Authorization", `Bearer ${accessToken}`);
    expect(expiringLong.body.data).toHaveLength(2);
  });

  it("consumes the oldest batch first on an outflow, under weighted-average costing", async () => {
    const { accessToken } = await createTestUser({ role: "MANAGER" });
    const location = await createTestLocation();
    const product = await request(app)
      .post("/api/products")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ sku: "LOTION", name: "Body Lotion", costPriceCents: 200, sellPriceCents: 800 });

    await request(app)
      .post("/api/stock/adjustments")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ productId: product.body.data.id, locationId: location.id, deltaMilliUnits: 3_000, unitCostCents: 200, lotNumber: "A", reason: "batch A" });
    await request(app)
      .post("/api/stock/adjustments")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ productId: product.body.data.id, locationId: location.id, deltaMilliUnits: 3_000, unitCostCents: 300, lotNumber: "B", reason: "batch B" });

    await request(app)
      .post("/api/stock/adjustments")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ productId: product.body.data.id, locationId: location.id, deltaMilliUnits: -2_000, reason: "sold" });

    const layers = await prisma.costLayer.findMany({ where: { productId: product.body.data.id }, orderBy: { receivedAt: "asc" } });
    expect(layers[0].lotNumber).toBe("A");
    expect(layers[0].quantityRemaining).toBe(1_000); // batch A: 3 - 2 consumed first
    expect(layers[1].lotNumber).toBe("B");
    expect(layers[1].quantityRemaining).toBe(3_000); // untouched
  });
});
