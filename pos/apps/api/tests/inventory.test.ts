import { afterAll, beforeEach, describe, expect, it } from "vitest";
import request from "supertest";
import { buildApp } from "../src/app.js";
import { prisma } from "../src/lib/prisma.js";
import { resetDb } from "./helpers/db.js";
import { createTestLocation, createTestProduct, createTestUser } from "./helpers/factories.js";

const app = buildApp();

beforeEach(async () => {
  await resetDb();
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("stock adjustments", () => {
  it("cashier is blocked; manager can adjust stock up and down", async () => {
    const { accessToken: cashierToken } = await createTestUser({ role: "CASHIER" });
    const { accessToken: managerToken } = await createTestUser({ role: "MANAGER" });
    const location = await createTestLocation();
    const product = await createTestProduct({ costPriceCents: 400 });

    const blocked = await request(app)
      .post("/api/stock/adjustments")
      .set("Authorization", `Bearer ${cashierToken}`)
      .send({ productId: product.id, locationId: location.id, deltaMilliUnits: 1000, reason: "test" });
    expect(blocked.status).toBe(403);

    const up = await request(app)
      .post("/api/stock/adjustments")
      .set("Authorization", `Bearer ${managerToken}`)
      .send({ productId: product.id, locationId: location.id, deltaMilliUnits: 10_000, unitCostCents: 400, reason: "initial stock" });
    expect(up.status).toBe(201);
    expect(up.body.data.quantityOnHand).toBe(10_000);

    const down = await request(app)
      .post("/api/stock/adjustments")
      .set("Authorization", `Bearer ${managerToken}`)
      .send({ productId: product.id, locationId: location.id, deltaMilliUnits: -3_000, reason: "damaged" });
    expect(down.status).toBe(201);
    expect(down.body.data.quantityOnHand).toBe(7_000);
    expect(down.body.data.costOfGoodsCents).toBe(1200); // 3 units @ $4.00

    const audit = await request(app)
      .get("/api/audit-log?entityType=Product")
      .set("Authorization", `Bearer ${managerToken}`);
    expect(audit.status).toBe(403); // audit log is ADMIN-only
  });

  it("flags low stock once quantity drops to the reorder point", async () => {
    const { accessToken } = await createTestUser({ role: "MANAGER" });
    const location = await createTestLocation();
    const product = await createTestProduct();

    await request(app)
      .post("/api/stock/adjustments")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ productId: product.id, locationId: location.id, deltaMilliUnits: 5_000, unitCostCents: 300, reason: "init" });

    await prisma.stockItem.update({
      where: { productId_locationId: { productId: product.id, locationId: location.id } },
      data: { reorderPoint: 10_000 }
    });

    const lowStock = await request(app)
      .get(`/api/stock/low-stock?locationId=${location.id}`)
      .set("Authorization", `Bearer ${accessToken}`);
    expect(lowStock.body.data.some((i: { productId: string }) => i.productId === product.id)).toBe(true);
  });
});

describe("purchase orders", () => {
  it("creates, sends, partially receives, then fully receives", async () => {
    const { accessToken } = await createTestUser({ role: "MANAGER" });
    const location = await createTestLocation();
    const product = await createTestProduct({ costPriceCents: 100 });
    const supplier = await prisma.supplier.create({ data: { name: "Acme Supply" } });

    const created = await request(app)
      .post("/api/purchase-orders")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        supplierId: supplier.id,
        locationId: location.id,
        lines: [{ productId: product.id, quantityOrdered: 10_000, unitCostCents: 150 }]
      });
    expect(created.status).toBe(201);
    const poId = created.body.data.id;
    const lineId = created.body.data.lines[0].id;

    const sent = await request(app)
      .post(`/api/purchase-orders/${poId}/send`)
      .set("Authorization", `Bearer ${accessToken}`);
    expect(sent.body.data.status).toBe("SENT");

    const partial = await request(app)
      .post(`/api/purchase-orders/${poId}/receive`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ lines: [{ lineId, quantityReceivedDelta: 6_000 }] });
    expect(partial.body.data.status).toBe("PARTIALLY_RECEIVED");

    const stockAfterPartial = await prisma.stockItem.findUnique({
      where: { productId_locationId: { productId: product.id, locationId: location.id } }
    });
    expect(stockAfterPartial?.quantityOnHand).toBe(6_000);

    const productAfterPartial = await prisma.product.findUnique({ where: { id: product.id } });
    expect(productAfterPartial?.costPriceCents).toBe(150);

    const full = await request(app)
      .post(`/api/purchase-orders/${poId}/receive`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ lines: [{ lineId, quantityReceivedDelta: 4_000 }] });
    expect(full.body.data.status).toBe("RECEIVED");

    const stockAfterFull = await prisma.stockItem.findUnique({
      where: { productId_locationId: { productId: product.id, locationId: location.id } }
    });
    expect(stockAfterFull?.quantityOnHand).toBe(10_000);
  });

  it("rejects receiving more than was ordered", async () => {
    const { accessToken } = await createTestUser({ role: "MANAGER" });
    const location = await createTestLocation();
    const product = await createTestProduct();
    const supplier = await prisma.supplier.create({ data: { name: "Acme Supply" } });

    const created = await request(app)
      .post("/api/purchase-orders")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ supplierId: supplier.id, locationId: location.id, lines: [{ productId: product.id, quantityOrdered: 1000, unitCostCents: 100 }] });
    const lineId = created.body.data.lines[0].id;
    await request(app).post(`/api/purchase-orders/${created.body.data.id}/send`).set("Authorization", `Bearer ${accessToken}`);

    const overReceive = await request(app)
      .post(`/api/purchase-orders/${created.body.data.id}/receive`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ lines: [{ lineId, quantityReceivedDelta: 5000 }] });
    expect(overReceive.status).toBe(400);
  });
});

describe("stock counts", () => {
  it("generates a variance report and reconciles stock on completion", async () => {
    const { accessToken } = await createTestUser({ role: "MANAGER" });
    const location = await createTestLocation();
    const product = await createTestProduct({ costPriceCents: 200 });

    await request(app)
      .post("/api/stock/adjustments")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ productId: product.id, locationId: location.id, deltaMilliUnits: 10_000, unitCostCents: 200, reason: "init" });

    const session = await request(app)
      .post("/api/stock-counts")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ locationId: location.id });
    const sessionId = session.body.data.id;

    // Physically counted 8 instead of the expected 10 -> shrinkage of 2
    await request(app)
      .post(`/api/stock-counts/${sessionId}/lines`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ productId: product.id, countedQuantity: 8_000 });

    const completed = await request(app)
      .post(`/api/stock-counts/${sessionId}/complete`)
      .set("Authorization", `Bearer ${accessToken}`);
    expect(completed.status).toBe(200);
    expect(completed.body.data.variance[0].varianceQuantity).toBe(-2_000);

    const stockItem = await prisma.stockItem.findUnique({
      where: { productId_locationId: { productId: product.id, locationId: location.id } }
    });
    expect(stockItem?.quantityOnHand).toBe(8_000);

    const movements = await prisma.stockMovement.findMany({ where: { productId: product.id, type: "COUNT_ADJUSTMENT" } });
    expect(movements).toHaveLength(1);
    expect(movements[0].quantity).toBe(-2_000);
  });
});

describe("inventory valuation", () => {
  it("values stock by weighted average by default", async () => {
    const { accessToken } = await createTestUser({ role: "MANAGER" });
    const location = await createTestLocation();
    const product = await createTestProduct();

    await request(app)
      .post("/api/stock/adjustments")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ productId: product.id, locationId: location.id, deltaMilliUnits: 10_000, unitCostCents: 300, reason: "init" });

    const report = await request(app)
      .get(`/api/stock/valuation?locationId=${location.id}`)
      .set("Authorization", `Bearer ${accessToken}`);
    expect(report.body.data.method).toBe("WEIGHTED_AVERAGE");
    expect(report.body.data.totalCents).toBe(3000); // 10 units @ $3.00
  });

  it("values stock by FIFO when configured", async () => {
    await prisma.storeSettings.create({ data: { id: 1, costingMethod: "FIFO" } });
    const { accessToken } = await createTestUser({ role: "MANAGER" });
    const location = await createTestLocation();
    const product = await createTestProduct();

    await request(app)
      .post("/api/stock/adjustments")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ productId: product.id, locationId: location.id, deltaMilliUnits: 5_000, unitCostCents: 200, reason: "batch 1" });
    await request(app)
      .post("/api/stock/adjustments")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ productId: product.id, locationId: location.id, deltaMilliUnits: 5_000, unitCostCents: 400, reason: "batch 2" });

    // Sell 3 units: should consume from the $2.00 layer first.
    await request(app)
      .post("/api/stock/adjustments")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ productId: product.id, locationId: location.id, deltaMilliUnits: -3_000, reason: "test sale" });

    const report = await request(app)
      .get(`/api/stock/valuation?locationId=${location.id}`)
      .set("Authorization", `Bearer ${accessToken}`);
    expect(report.body.data.method).toBe("FIFO");
    // Remaining: 2 units @ $2.00 + 5 units @ $4.00 = $4 + $20 = $24
    expect(report.body.data.totalCents).toBe(2400);
  });
});
