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

async function createCustomer(accessToken: string, overrides: Partial<{ name: string; phone: string }> = {}) {
  const res = await request(app)
    .post("/api/customers")
    .set("Authorization", `Bearer ${accessToken}`)
    .send({ name: overrides.name ?? "Jamie Loyal", phone: overrides.phone ?? `555-${Math.floor(Math.random() * 1e7)}` });
  return res.body.data;
}

describe("customers", () => {
  it("creates, searches, and rejects a duplicate phone number", async () => {
    const { accessToken } = await createTestUser({ role: "CASHIER" });
    const customer = await createCustomer(accessToken, { phone: "555-1234" });
    expect(customer.loyaltyPoints).toBe(0);

    const search = await request(app).get("/api/customers?search=Jamie").set("Authorization", `Bearer ${accessToken}`);
    expect(search.body.data.some((c: { id: string }) => c.id === customer.id)).toBe(true);

    const dupe = await request(app)
      .post("/api/customers")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ name: "Someone Else", phone: "555-1234" });
    expect(dupe.status).toBe(409);
  });
});

describe("loyalty points", () => {
  it("earns points on a completed sale attached to a customer", async () => {
    const { accessToken } = await createTestUser({ role: "CASHIER" });
    const location = await createTestLocation();
    const product = await createTestProduct({ sellPriceCents: 2500 }); // $25.00
    const customer = await createCustomer(accessToken);

    const sale = await request(app)
      .post("/api/sales")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ locationId: location.id, customerId: customer.id });
    const added = await request(app)
      .post(`/api/sales/${sale.body.data.id}/lines`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ productId: product.id, quantityMilliUnits: 1000 });
    await request(app)
      .post(`/api/sales/${sale.body.data.id}/payments`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ method: "CASH", amountCents: added.body.data.totalCents });

    const completed = await request(app).post(`/api/sales/${sale.body.data.id}/complete`).set("Authorization", `Bearer ${accessToken}`);
    expect(completed.body.data.loyaltyPointsEarned).toBe(25); // default: 1 point per dollar

    const refreshed = await request(app).get(`/api/customers/${customer.id}`).set("Authorization", `Bearer ${accessToken}`);
    expect(refreshed.body.data.loyaltyPoints).toBe(25);
  });

  it("redeems points as a payment method and blocks redeeming more than the balance", async () => {
    const { accessToken } = await createTestUser({ role: "CASHIER" });
    const location = await createTestLocation();
    const product = await createTestProduct({ sellPriceCents: 1000 });
    const customer = await createCustomer(accessToken);
    await prisma.customer.update({ where: { id: customer.id }, data: { loyaltyPoints: 500 } });

    const sale = await request(app)
      .post("/api/sales")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ locationId: location.id, customerId: customer.id });
    await request(app)
      .post(`/api/sales/${sale.body.data.id}/lines`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ productId: product.id, quantityMilliUnits: 1000 });

    // Default loyaltyPointValueCents = 1, so 500 points = 500 cents = $5.00.
    const redeemTooMuch = await request(app)
      .post(`/api/sales/${sale.body.data.id}/payments`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ method: "LOYALTY", amountCents: 600 });
    expect(redeemTooMuch.status).toBe(400);

    const redeem = await request(app)
      .post(`/api/sales/${sale.body.data.id}/payments`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ method: "LOYALTY", amountCents: 500 });
    expect(redeem.status).toBe(201);

    const afterRedeem = await request(app).get(`/api/customers/${customer.id}`).set("Authorization", `Bearer ${accessToken}`);
    expect(afterRedeem.body.data.loyaltyPoints).toBe(0);

    await request(app)
      .post(`/api/sales/${sale.body.data.id}/payments`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ method: "CASH", amountCents: 500 });

    const completed = await request(app).post(`/api/sales/${sale.body.data.id}/complete`).set("Authorization", `Bearer ${accessToken}`);
    expect(completed.body.data.loyaltyPointsRedeemed).toBe(500);
    // Only the $5.00 paid in cash earns points (the $5.00 paid in points doesn't), so 5 points earned.
    expect(completed.body.data.loyaltyPointsEarned).toBe(5);
  });

  it("rejects redeeming loyalty points on a sale with no customer attached", async () => {
    const { accessToken } = await createTestUser({ role: "CASHIER" });
    const location = await createTestLocation();
    const product = await createTestProduct({ sellPriceCents: 1000 });
    const sale = await request(app).post("/api/sales").set("Authorization", `Bearer ${accessToken}`).send({ locationId: location.id });
    await request(app)
      .post(`/api/sales/${sale.body.data.id}/lines`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ productId: product.id, quantityMilliUnits: 1000 });

    const redeem = await request(app)
      .post(`/api/sales/${sale.body.data.id}/payments`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ method: "LOYALTY", amountCents: 100 });
    expect(redeem.status).toBe(400);
  });

  it("can attach a customer to an already-open sale", async () => {
    const { accessToken } = await createTestUser({ role: "CASHIER" });
    const location = await createTestLocation();
    const customer = await createCustomer(accessToken);
    const sale = await request(app).post("/api/sales").set("Authorization", `Bearer ${accessToken}`).send({ locationId: location.id });

    const attached = await request(app)
      .post(`/api/sales/${sale.body.data.id}/customer`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ customerId: customer.id });
    expect(attached.body.data.customerId).toBe(customer.id);
  });
});
