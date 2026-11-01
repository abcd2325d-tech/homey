import { afterAll, beforeEach, describe, expect, it } from "vitest";
import request from "supertest";
import { buildApp } from "../src/app.js";
import { prisma } from "../src/lib/prisma.js";
import { resetDb } from "./helpers/db.js";
import { createTestLocation, createTestProduct, createTestTaxRate, createTestUser } from "./helpers/factories.js";

const app = buildApp();

beforeEach(async () => {
  await resetDb();
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("full sale-to-receipt flow", () => {
  it("rings up two items, pays cash with change, completes, decrements stock, and assigns a receipt number", async () => {
    const { accessToken: managerToken } = await createTestUser({ role: "MANAGER" });
    const { accessToken: cashierToken, user: cashier } = await createTestUser({ role: "CASHIER" });
    const location = await createTestLocation();
    const taxRate = await createTestTaxRate(1000); // 10%
    const product = await createTestProduct({ sellPriceCents: 1000, costPriceCents: 400, taxRateId: taxRate.id });

    // Stock the shelf first.
    await request(app)
      .post("/api/stock/adjustments")
      .set("Authorization", `Bearer ${managerToken}`)
      .send({ productId: product.id, locationId: location.id, deltaMilliUnits: 10_000, unitCostCents: 400, reason: "initial stock" });

    const sale = await request(app)
      .post("/api/sales")
      .set("Authorization", `Bearer ${cashierToken}`)
      .send({ locationId: location.id });
    expect(sale.status).toBe(201);
    expect(sale.body.data.status).toBe("OPEN");
    const saleId = sale.body.data.id;

    const added = await request(app)
      .post(`/api/sales/${saleId}/lines`)
      .set("Authorization", `Bearer ${cashierToken}`)
      .send({ productId: product.id, quantityMilliUnits: 2000 });
    expect(added.status).toBe(201);
    // 2 units @ $10.00 = $20.00, 10% tax = $2.00, total $22.00
    expect(added.body.data.subtotalCents).toBe(2000);
    expect(added.body.data.taxCents).toBe(200);
    expect(added.body.data.totalCents).toBe(2200);

    const payment = await request(app)
      .post(`/api/sales/${saleId}/payments`)
      .set("Authorization", `Bearer ${cashierToken}`)
      .send({ method: "CASH", amountCents: 2200, tenderedCents: 2500 });
    expect(payment.status).toBe(201);
    expect(payment.body.data.changeCents).toBe(300);

    const completed = await request(app)
      .post(`/api/sales/${saleId}/complete`)
      .set("Authorization", `Bearer ${cashierToken}`);
    expect(completed.status).toBe(200);
    expect(completed.body.data.status).toBe("COMPLETED");
    expect(completed.body.data.receiptNumber).toMatch(/-\d{6}$/);
    expect(completed.body.data.cashierId).toBe(cashier.id);

    const stockItem = await prisma.stockItem.findUnique({
      where: { productId_locationId: { productId: product.id, locationId: location.id } }
    });
    expect(stockItem?.quantityOnHand).toBe(8_000);

    const movement = await prisma.stockMovement.findFirst({ where: { productId: product.id, type: "SALE" } });
    expect(movement?.quantity).toBe(-2_000);

    // Fetching the completed sale gives everything a receipt needs.
    const fetched = await request(app).get(`/api/sales/${saleId}`).set("Authorization", `Bearer ${cashierToken}`);
    expect(fetched.body.data.lines).toHaveLength(1);
    expect(fetched.body.data.payments).toHaveLength(1);
    expect(fetched.body.data.lines[0].product.sku).toBe(product.sku);
  });

  it("rejects completing a sale that isn't fully paid", async () => {
    const { accessToken } = await createTestUser({ role: "CASHIER" });
    const location = await createTestLocation();
    const product = await createTestProduct({ sellPriceCents: 1000 });
    const sale = await request(app).post("/api/sales").set("Authorization", `Bearer ${accessToken}`).send({ locationId: location.id });
    await request(app)
      .post(`/api/sales/${sale.body.data.id}/lines`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ productId: product.id, quantityMilliUnits: 1000 });

    const completed = await request(app)
      .post(`/api/sales/${sale.body.data.id}/complete`)
      .set("Authorization", `Bearer ${accessToken}`);
    expect(completed.status).toBe(400);
  });

  it("supports split payments (cash + card)", async () => {
    const { accessToken } = await createTestUser({ role: "CASHIER" });
    const location = await createTestLocation();
    const product = await createTestProduct({ sellPriceCents: 1000 });
    const sale = await request(app).post("/api/sales").set("Authorization", `Bearer ${accessToken}`).send({ locationId: location.id });
    await request(app)
      .post(`/api/sales/${sale.body.data.id}/lines`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ productId: product.id, quantityMilliUnits: 1000 });

    await request(app)
      .post(`/api/sales/${sale.body.data.id}/payments`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ method: "CASH", amountCents: 400 });
    const cardPayment = await request(app)
      .post(`/api/sales/${sale.body.data.id}/payments`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ method: "CARD", amountCents: 600 });
    expect(cardPayment.status).toBe(201);
    expect(cardPayment.body.data.providerRef).toMatch(/^MOCK-/);

    const completed = await request(app)
      .post(`/api/sales/${sale.body.data.id}/complete`)
      .set("Authorization", `Bearer ${accessToken}`);
    expect(completed.status).toBe(200);
  });

  it("holds and recalls a cart", async () => {
    const { accessToken } = await createTestUser({ role: "CASHIER" });
    const location = await createTestLocation();
    const product = await createTestProduct();
    const sale = await request(app).post("/api/sales").set("Authorization", `Bearer ${accessToken}`).send({ locationId: location.id });
    await request(app)
      .post(`/api/sales/${sale.body.data.id}/lines`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ productId: product.id, quantityMilliUnits: 1000 });

    const held = await request(app)
      .post(`/api/sales/${sale.body.data.id}/hold`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ label: "Customer getting wallet" });
    expect(held.body.data.status).toBe("HELD");

    const list = await request(app).get(`/api/sales/held?locationId=${location.id}`).set("Authorization", `Bearer ${accessToken}`);
    expect(list.body.data.some((s: { id: string }) => s.id === sale.body.data.id)).toBe(true);

    const recalled = await request(app).post(`/api/sales/${sale.body.data.id}/recall`).set("Authorization", `Bearer ${accessToken}`);
    expect(recalled.body.data.status).toBe("OPEN");
  });
});

describe("discounts requiring manager approval", () => {
  it("lets a cashier apply a small discount without approval", async () => {
    const { accessToken } = await createTestUser({ role: "CASHIER" });
    const location = await createTestLocation();
    const product = await createTestProduct({ sellPriceCents: 1000 });
    const sale = await request(app).post("/api/sales").set("Authorization", `Bearer ${accessToken}`).send({ locationId: location.id });
    const added = await request(app)
      .post(`/api/sales/${sale.body.data.id}/lines`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ productId: product.id, quantityMilliUnits: 1000 });
    const lineId = added.body.data.lines[0].id;

    // 10% discount, under the default 20% threshold.
    const discounted = await request(app)
      .post(`/api/sales/${sale.body.data.id}/lines/${lineId}/discount`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ discountType: "PERCENT", discountValue: 1000 });
    expect(discounted.status).toBe(200);
    expect(discounted.body.data.discountCents).toBe(100);
  });

  it("blocks a cashier from a large discount without an approver, then allows it with one", async () => {
    const { accessToken } = await createTestUser({ role: "CASHIER" });
    await createTestUser({ role: "MANAGER", pin: "9999" });
    const location = await createTestLocation();
    const product = await createTestProduct({ sellPriceCents: 1000 });
    const sale = await request(app).post("/api/sales").set("Authorization", `Bearer ${accessToken}`).send({ locationId: location.id });
    const added = await request(app)
      .post(`/api/sales/${sale.body.data.id}/lines`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ productId: product.id, quantityMilliUnits: 1000 });
    const lineId = added.body.data.lines[0].id;

    const blocked = await request(app)
      .post(`/api/sales/${sale.body.data.id}/lines/${lineId}/discount`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ discountType: "PERCENT", discountValue: 5000 });
    expect(blocked.status).toBe(403);

    const pinCheck = await request(app)
      .post("/api/auth/verify-pin")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ pin: "9999" });
    expect(pinCheck.status).toBe(200);
    const approverId = pinCheck.body.data.approverId;

    const approved = await request(app)
      .post(`/api/sales/${sale.body.data.id}/lines/${lineId}/discount`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ discountType: "PERCENT", discountValue: 5000, approverId });
    expect(approved.status).toBe(200);
    expect(approved.body.data.discountCents).toBe(500);

    const audit = await request(app)
      .get("/api/audit-log?entityType=Sale")
      .set("Authorization", `Bearer ${(await createTestUser({ role: "ADMIN" })).accessToken}`);
    expect(audit.body.data.some((e: { action: string }) => e.action === "DISCOUNT_APPROVED")).toBe(true);
  });

  it("lets a manager self-approve a large discount with no PIN step", async () => {
    const { accessToken } = await createTestUser({ role: "MANAGER" });
    const location = await createTestLocation();
    const product = await createTestProduct({ sellPriceCents: 1000 });
    const sale = await request(app).post("/api/sales").set("Authorization", `Bearer ${accessToken}`).send({ locationId: location.id });
    const added = await request(app)
      .post(`/api/sales/${sale.body.data.id}/lines`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ productId: product.id, quantityMilliUnits: 1000 });
    const lineId = added.body.data.lines[0].id;

    const approved = await request(app)
      .post(`/api/sales/${sale.body.data.id}/lines/${lineId}/discount`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ discountType: "PERCENT", discountValue: 5000 });
    expect(approved.status).toBe(200);
  });
});

describe("void and refund", () => {
  it("voids an open cart with manager approval and rejects voiding a completed sale", async () => {
    const { accessToken } = await createTestUser({ role: "CASHIER" });
    const { user: manager } = await createTestUser({ role: "MANAGER" });
    const location = await createTestLocation();
    const product = await createTestProduct({ sellPriceCents: 1000 });
    const sale = await request(app).post("/api/sales").set("Authorization", `Bearer ${accessToken}`).send({ locationId: location.id });
    await request(app)
      .post(`/api/sales/${sale.body.data.id}/lines`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ productId: product.id, quantityMilliUnits: 1000 });

    const blocked = await request(app)
      .post(`/api/sales/${sale.body.data.id}/void`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ reason: "customer changed mind" });
    expect(blocked.status).toBe(403);

    const voided = await request(app)
      .post(`/api/sales/${sale.body.data.id}/void`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ reason: "customer changed mind", approverId: manager.id });
    expect(voided.status).toBe(200);
    expect(voided.body.data.status).toBe("VOIDED");
  });

  it("refunds part of a completed sale and restocks the returned item", async () => {
    const { accessToken } = await createTestUser({ role: "CASHIER" });
    const { user: manager } = await createTestUser({ role: "MANAGER" });
    const location = await createTestLocation();
    const product = await createTestProduct({ sellPriceCents: 1000, costPriceCents: 400 });

    await request(app)
      .post("/api/stock/adjustments")
      .set("Authorization", `Bearer ${(await createTestUser({ role: "ADMIN" })).accessToken}`)
      .send({ productId: product.id, locationId: location.id, deltaMilliUnits: 10_000, unitCostCents: 400, reason: "init" });

    const sale = await request(app).post("/api/sales").set("Authorization", `Bearer ${accessToken}`).send({ locationId: location.id });
    const added = await request(app)
      .post(`/api/sales/${sale.body.data.id}/lines`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ productId: product.id, quantityMilliUnits: 2000 });
    const lineId = added.body.data.lines[0].id;

    await request(app)
      .post(`/api/sales/${sale.body.data.id}/payments`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ method: "CASH", amountCents: added.body.data.totalCents });
    await request(app).post(`/api/sales/${sale.body.data.id}/complete`).set("Authorization", `Bearer ${accessToken}`);

    const stockBefore = await prisma.stockItem.findUnique({
      where: { productId_locationId: { productId: product.id, locationId: location.id } }
    });
    expect(stockBefore?.quantityOnHand).toBe(8_000);

    const refund = await request(app)
      .post(`/api/sales/${sale.body.data.id}/refund`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ reason: "one item damaged", approverId: manager.id, lines: [{ saleLineId: lineId, quantityMilliUnits: 1000 }] });
    expect(refund.status).toBe(200);
    expect(refund.body.data.status).toBe("PARTIALLY_REFUNDED");
    expect(refund.body.data.refunds[0].amountCents).toBe(1000); // 1 of the 2 units refunded, no tax rate on this product

    const stockAfter = await prisma.stockItem.findUnique({
      where: { productId_locationId: { productId: product.id, locationId: location.id } }
    });
    expect(stockAfter?.quantityOnHand).toBe(9_000);

    const audit = await request(app)
      .get("/api/audit-log?entityType=Sale")
      .set("Authorization", `Bearer ${(await createTestUser({ role: "ADMIN" })).accessToken}`);
    expect(audit.body.data.some((e: { action: string }) => e.action === "REFUND_APPROVED")).toBe(true);
  });

  it("rejects refunding more than was sold", async () => {
    const { accessToken } = await createTestUser({ role: "CASHIER" });
    const { user: manager } = await createTestUser({ role: "MANAGER" });
    const location = await createTestLocation();
    const product = await createTestProduct({ sellPriceCents: 1000 });

    const sale = await request(app).post("/api/sales").set("Authorization", `Bearer ${accessToken}`).send({ locationId: location.id });
    const added = await request(app)
      .post(`/api/sales/${sale.body.data.id}/lines`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ productId: product.id, quantityMilliUnits: 1000 });
    const lineId = added.body.data.lines[0].id;
    await request(app)
      .post(`/api/sales/${sale.body.data.id}/payments`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ method: "CASH", amountCents: added.body.data.totalCents });
    await request(app).post(`/api/sales/${sale.body.data.id}/complete`).set("Authorization", `Bearer ${accessToken}`);

    const overRefund = await request(app)
      .post(`/api/sales/${sale.body.data.id}/refund`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ reason: "test", approverId: manager.id, lines: [{ saleLineId: lineId, quantityMilliUnits: 2000 }] });
    expect(overRefund.status).toBe(400);
  });
});
