import { afterAll, beforeEach, describe, expect, it } from "vitest";
import request from "supertest";
import { buildApp } from "../src/app.js";
import { prisma } from "../src/lib/prisma.js";
import { resetDb } from "./helpers/db.js";
import { createTestLocation, createTestProduct, createTestUser } from "./helpers/factories.js";

const app = buildApp();

function binaryParser(res: NodeJS.ReadableStream & { setEncoding: (enc: string) => void }, callback: (err: Error | null, body: Buffer) => void) {
  const chunks: Buffer[] = [];
  res.setEncoding("binary");
  (res as unknown as NodeJS.EventEmitter).on("data", (chunk: string) => chunks.push(Buffer.from(chunk, "binary")));
  (res as unknown as NodeJS.EventEmitter).on("end", () => callback(null, Buffer.concat(chunks)));
}

beforeEach(async () => {
  await resetDb();
});

afterAll(async () => {
  await prisma.$disconnect();
});

async function ringUpSale(accessToken: string, locationId: string, productId: string, qty: number) {
  const sale = await request(app).post("/api/sales").set("Authorization", `Bearer ${accessToken}`).send({ locationId });
  const added = await request(app)
    .post(`/api/sales/${sale.body.data.id}/lines`)
    .set("Authorization", `Bearer ${accessToken}`)
    .send({ productId, quantityMilliUnits: qty });
  await request(app)
    .post(`/api/sales/${sale.body.data.id}/payments`)
    .set("Authorization", `Bearer ${accessToken}`)
    .send({ method: "CASH", amountCents: added.body.data.totalCents });
  const completed = await request(app).post(`/api/sales/${sale.body.data.id}/complete`).set("Authorization", `Bearer ${accessToken}`);
  return completed.body.data;
}

describe("reports", () => {
  it("summarizes today's completed sales and payment breakdown", async () => {
    const { accessToken: cashierToken } = await createTestUser({ role: "CASHIER" });
    const { accessToken: managerToken } = await createTestUser({ role: "MANAGER" });
    const location = await createTestLocation();
    const product = await createTestProduct({ sellPriceCents: 1000 });

    await ringUpSale(cashierToken, location.id, product.id, 2000);
    await ringUpSale(cashierToken, location.id, product.id, 1000);

    const res = await request(app)
      .get(`/api/reports/daily-sales?locationId=${location.id}`)
      .set("Authorization", `Bearer ${managerToken}`);
    expect(res.status).toBe(200);
    expect(res.body.data.transactionCount).toBe(2);
    expect(res.body.data.grossSalesCents).toBe(3000);
    expect(res.body.data.paymentBreakdown.CASH).toBe(3000);
  });

  it("ranks top-selling products by revenue", async () => {
    const { accessToken: cashierToken } = await createTestUser({ role: "CASHIER" });
    const { accessToken: managerToken } = await createTestUser({ role: "MANAGER" });
    const location = await createTestLocation();
    const popular = await createTestProduct({ sellPriceCents: 500 });
    const rare = await createTestProduct({ sellPriceCents: 100 });

    await ringUpSale(cashierToken, location.id, popular.id, 10_000);
    await ringUpSale(cashierToken, location.id, rare.id, 1000);

    const res = await request(app)
      .get(`/api/reports/top-products?locationId=${location.id}`)
      .set("Authorization", `Bearer ${managerToken}`);
    expect(res.body.data[0].productId).toBe(popular.id);
  });

  it("blocks cashiers from reports", async () => {
    const { accessToken } = await createTestUser({ role: "CASHIER" });
    const res = await request(app).get("/api/reports/dashboard").set("Authorization", `Bearer ${accessToken}`);
    expect(res.status).toBe(403);
  });
});

describe("settings", () => {
  it("admin can read and update store settings; audit logs a costing-method change", async () => {
    const { accessToken } = await createTestUser({ role: "ADMIN" });
    const read = await request(app).get("/api/settings").set("Authorization", `Bearer ${accessToken}`);
    expect(read.status).toBe(200);
    expect(read.body.data.costingMethod).toBe("WEIGHTED_AVERAGE");

    const updated = await request(app)
      .patch("/api/settings")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ storeName: "New Name", costingMethod: "FIFO" });
    expect(updated.body.data.storeName).toBe("New Name");
    expect(updated.body.data.costingMethod).toBe("FIFO");

    const audit = await request(app).get("/api/audit-log?entityType=StoreSettings").set("Authorization", `Bearer ${accessToken}`);
    expect(audit.body.data.some((e: { action: string }) => e.action === "SETTINGS_CHANGED")).toBe(true);
  });

  it("blocks non-admins", async () => {
    const { accessToken } = await createTestUser({ role: "MANAGER" });
    const res = await request(app).get("/api/settings").set("Authorization", `Bearer ${accessToken}`);
    expect(res.status).toBe(403);
  });

  it("lets any authenticated role read the public settings subset", async () => {
    const { accessToken } = await createTestUser({ role: "CASHIER" });
    const res = await request(app).get("/api/settings/public").set("Authorization", `Bearer ${accessToken}`);
    expect(res.status).toBe(200);
    expect(res.body.data.loyaltyPointValueCents).toBe(1);
    expect(res.body.data.taxId).toBeUndefined();
  });
});

describe("receipts", () => {
  it("generates HTML, PDF, and ESC/POS receipts only for completed sales", async () => {
    const { accessToken } = await createTestUser({ role: "CASHIER" });
    const location = await createTestLocation();
    const product = await createTestProduct({ sellPriceCents: 1000 });

    const sale = await request(app).post("/api/sales").set("Authorization", `Bearer ${accessToken}`).send({ locationId: location.id });
    const notReady = await request(app).get(`/api/sales/${sale.body.data.id}/receipt.html`).set("Authorization", `Bearer ${accessToken}`);
    expect(notReady.status).toBe(409);

    const completed = await ringUpSale(accessToken, location.id, product.id, 1000);

    const html = await request(app).get(`/api/sales/${completed.id}/receipt.html`).set("Authorization", `Bearer ${accessToken}`);
    expect(html.status).toBe(200);
    expect(html.text).toContain(completed.receiptNumber);

    const pdf = await request(app)
      .get(`/api/sales/${completed.id}/receipt.pdf`)
      .set("Authorization", `Bearer ${accessToken}`)
      .buffer()
      .parse(binaryParser);
    expect(pdf.status).toBe(200);
    expect(pdf.headers["content-type"]).toBe("application/pdf");
    expect((pdf.body as Buffer).slice(0, 4).toString()).toBe("%PDF");

    const escpos = await request(app)
      .get(`/api/sales/${completed.id}/receipt.escpos`)
      .set("Authorization", `Bearer ${accessToken}`)
      .buffer()
      .parse(binaryParser);
    expect(escpos.status).toBe(200);
    const bytes = escpos.body as Buffer;
    expect(bytes[0]).toBe(0x1b); // ESC init byte
  });
});
