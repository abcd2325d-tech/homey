import { afterAll, beforeEach, describe, expect, it } from "vitest";
import request from "supertest";
import { buildApp } from "../src/app.js";
import { prisma } from "../src/lib/prisma.js";
import { resetDb } from "./helpers/db.js";
import { createTestUser } from "./helpers/factories.js";

const app = buildApp();

beforeEach(async () => {
  await resetDb();
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("categories/suppliers/tax rates", () => {
  it("manager can create a category; cashier cannot", async () => {
    const { accessToken: managerToken } = await createTestUser({ role: "MANAGER" });
    const { accessToken: cashierToken } = await createTestUser({ role: "CASHIER" });

    const created = await request(app)
      .post("/api/categories")
      .set("Authorization", `Bearer ${managerToken}`)
      .send({ name: "Beverages" });
    expect(created.status).toBe(201);

    const blocked = await request(app)
      .post("/api/categories")
      .set("Authorization", `Bearer ${cashierToken}`)
      .send({ name: "Snacks" });
    expect(blocked.status).toBe(403);

    const list = await request(app).get("/api/categories").set("Authorization", `Bearer ${cashierToken}`);
    expect(list.status).toBe(200);
    expect(list.body.data.some((c: { name: string }) => c.name === "Beverages")).toBe(true);
  });

  it("only one tax rate can be default at a time", async () => {
    const { accessToken } = await createTestUser({ role: "ADMIN" });
    const a = await request(app)
      .post("/api/tax-rates")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ name: "Standard", rateBasisPoints: 825, isDefault: true });
    const b = await request(app)
      .post("/api/tax-rates")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ name: "Grocery", rateBasisPoints: 0, isDefault: true });

    const refreshedA = await prisma.taxRate.findUnique({ where: { id: a.body.data.id } });
    expect(refreshedA?.isDefault).toBe(false);
    expect(b.body.data.isDefault).toBe(true);
  });
});

describe("products", () => {
  it("creates a product with a valid barcode and rejects a bad check digit", async () => {
    const { accessToken } = await createTestUser({ role: "MANAGER" });

    const good = await request(app)
      .post("/api/products")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        sku: "SKU-1",
        name: "Coke Can",
        costPriceCents: 50,
        sellPriceCents: 150,
        barcodes: [{ code: "049000028911", type: "UPC_A" }]
      });
    expect(good.status).toBe(201);
    expect(good.body.data.barcodes[0].code).toBe("049000028911");

    const bad = await request(app)
      .post("/api/products")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        sku: "SKU-2",
        name: "Bad Barcode",
        costPriceCents: 50,
        sellPriceCents: 150,
        barcodes: [{ code: "049000028912", type: "UPC_A" }]
      });
    expect(bad.status).toBe(400);
  });

  it("rejects a duplicate SKU and a barcode already used by another product", async () => {
    const { accessToken } = await createTestUser({ role: "MANAGER" });
    await request(app)
      .post("/api/products")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ sku: "DUPE", name: "First", costPriceCents: 100, sellPriceCents: 200, barcodes: [{ code: "40170725", type: "EAN_8" }] });

    const dupeSku = await request(app)
      .post("/api/products")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ sku: "DUPE", name: "Second", costPriceCents: 100, sellPriceCents: 200 });
    expect(dupeSku.status).toBe(409);

    const dupeBarcode = await request(app)
      .post("/api/products")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ sku: "OTHER", name: "Third", costPriceCents: 100, sellPriceCents: 200, barcodes: [{ code: "40170725", type: "EAN_8" }] });
    expect(dupeBarcode.status).toBe(409);
  });

  it("finds a product by barcode", async () => {
    const { accessToken } = await createTestUser({ role: "MANAGER" });
    await request(app)
      .post("/api/products")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ sku: "FIND-ME", name: "Findable", costPriceCents: 100, sellPriceCents: 200, barcodes: [{ code: "4006381333931", type: "EAN_13" }] });

    const found = await request(app)
      .get("/api/products/by-barcode/4006381333931")
      .set("Authorization", `Bearer ${accessToken}`);
    expect(found.status).toBe(200);
    expect(found.body.data.sku).toBe("FIND-ME");

    const notFound = await request(app)
      .get("/api/products/by-barcode/0000000000000")
      .set("Authorization", `Bearer ${accessToken}`);
    expect(notFound.status).toBe(404);
  });

  it("logs an audit entry when sell price changes", async () => {
    const { accessToken } = await createTestUser({ role: "MANAGER" });
    const created = await request(app)
      .post("/api/products")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ sku: "PRICE-TEST", name: "Priced", costPriceCents: 100, sellPriceCents: 200 });

    await request(app)
      .patch(`/api/products/${created.body.data.id}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ sellPriceCents: 250 });

    const { accessToken: adminToken } = await createTestUser({ role: "ADMIN" });
    const audit = await request(app)
      .get("/api/audit-log?entityType=Product")
      .set("Authorization", `Bearer ${adminToken}`);
    expect(audit.body.data.some((e: { action: string }) => e.action === "PRICE_CHANGED")).toBe(true);
  });

  it("filters by search term", async () => {
    const { accessToken } = await createTestUser({ role: "MANAGER" });
    await request(app)
      .post("/api/products")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ sku: "ABC-1", name: "Blue Widget", costPriceCents: 100, sellPriceCents: 200 });
    await request(app)
      .post("/api/products")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ sku: "XYZ-2", name: "Red Gadget", costPriceCents: 100, sellPriceCents: 200 });

    const res = await request(app)
      .get("/api/products?search=Widget")
      .set("Authorization", `Bearer ${accessToken}`);
    expect(res.body.data).toHaveLength(1);
    expect(res.body.data[0].sku).toBe("ABC-1");
  });

  it("imports products from CSV, upserting by SKU", async () => {
    const { accessToken } = await createTestUser({ role: "MANAGER" });
    const csv = [
      "sku,name,description,category,supplier,costPrice,sellPrice,taxRateName,priceIncludesTax,unit,barcodes,isActive",
      "IMP-1,Imported Widget,,Hardware,,1.50,3.00,,false,EACH,049000028911,true"
    ].join("\n");

    const res = await request(app)
      .post("/api/products/import")
      .set("Authorization", `Bearer ${accessToken}`)
      .set("Content-Type", "text/csv")
      .send(csv);

    expect(res.status).toBe(200);
    expect(res.body.data.created).toBe(1);

    const product = await prisma.product.findUnique({ where: { sku: "IMP-1" }, include: { barcodes: true, category: true } });
    expect(product?.sellPriceCents).toBe(300);
    expect(product?.category?.name).toBe("Hardware");
    expect(product?.barcodes[0].code).toBe("049000028911");
  });

  it("round-trips export -> import", async () => {
    const { accessToken } = await createTestUser({ role: "MANAGER" });
    await request(app)
      .post("/api/products")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ sku: "RT-1", name: "Round Trip", costPriceCents: 125, sellPriceCents: 399 });

    const exported = await request(app)
      .get("/api/products/export.csv")
      .set("Authorization", `Bearer ${accessToken}`);
    expect(exported.status).toBe(200);
    expect(exported.text).toContain("RT-1");

    await prisma.product.delete({ where: { sku: "RT-1" } });

    const reimported = await request(app)
      .post("/api/products/import")
      .set("Authorization", `Bearer ${accessToken}`)
      .set("Content-Type", "text/csv")
      .send(exported.text);
    expect(reimported.body.data.created).toBe(1);
    const product = await prisma.product.findUnique({ where: { sku: "RT-1" } });
    expect(product?.sellPriceCents).toBe(399);
  });
});
