// Demo data for local development: users, locations, categories, suppliers,
// tax rates, a beauty-supply product catalog (including a variant group and
// a lot/expiration-tracked item), demo loyalty customers, and opening stock.
// Safe to re-run against a fresh database; it does not try to be idempotent
// against a partially-seeded one.
import { PrismaClient } from "@prisma/client";
import { hashSecret } from "../src/lib/hash.js";
import { recordStockMovement } from "../src/modules/inventory/stock.service.js";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding...");

  await prisma.storeSettings.upsert({
    where: { id: 1 },
    create: {
      id: 1,
      storeName: "Bella's Beauty Supply",
      address: "789 Glow Ave, Springfield, USA",
      taxId: "12-3456789",
      currencyCode: "USD",
      locale: "en-US",
      receiptFooterText: "Thank you for shopping with us! Follow @bellasbeauty",
      costingMethod: "WEIGHTED_AVERAGE",
      discountApprovalThresholdBasisPoints: 2000,
      loyaltyPointsPerDollar: 1,
      loyaltyPointValueCents: 1
    },
    update: {}
  });

  const [admin, manager, cashier] = await Promise.all([
    prisma.user.upsert({
      where: { email: "admin@example.com" },
      create: {
        email: "admin@example.com",
        name: "Alex Admin",
        role: "ADMIN",
        passwordHash: await hashSecret("password123")
      },
      update: {}
    }),
    prisma.user.upsert({
      where: { email: "manager@example.com" },
      create: {
        email: "manager@example.com",
        name: "Morgan Manager",
        role: "MANAGER",
        passwordHash: await hashSecret("password123"),
        pinHash: await hashSecret("1234")
      },
      update: {}
    }),
    prisma.user.upsert({
      where: { email: "cashier@example.com" },
      create: {
        email: "cashier@example.com",
        name: "Casey Cashier",
        role: "CASHIER",
        passwordHash: await hashSecret("password123")
      },
      update: {}
    })
  ]);

  const mainStore = await prisma.location.upsert({
    where: { id: "seed-main-store" },
    create: { id: "seed-main-store", name: "Main Store", address: "789 Glow Ave", receiptSequence: { create: {} } },
    update: {}
  });
  const downtown = await prisma.location.upsert({
    where: { id: "seed-downtown" },
    create: { id: "seed-downtown", name: "Downtown Store", address: "12 Shine Blvd", receiptSequence: { create: {} } },
    update: {}
  });

  const [hairCare, skinCare, nails, makeup, tools] = await Promise.all(
    ["Hair Care", "Skin Care", "Nails", "Makeup", "Tools & Accessories"].map((name) =>
      prisma.category.upsert({ where: { name }, create: { name }, update: {} })
    )
  );

  const supplier = await prisma.supplier.create({
    data: { name: "Beauty Wholesale Co.", contactName: "Robin Vendor", email: "orders@beautywholesale.example", phone: "555-0100" }
  });

  const [standardTax, taxExempt] = await Promise.all([
    prisma.taxRate.create({ data: { name: "Standard", rateBasisPoints: 825, isDefault: true } }),
    prisma.taxRate.create({ data: { name: "Tax Exempt", rateBasisPoints: 0 } })
  ]);

  const products = [
    { sku: "HC-SHAMPOO-ARGAN", name: "Argan Oil Shampoo 16oz", categoryId: hairCare.id, costPriceCents: 450, sellPriceCents: 1299, taxRateId: standardTax.id, barcode: "041500001012" },
    { sku: "HC-COND-ARGAN", name: "Argan Oil Conditioner 16oz", categoryId: hairCare.id, costPriceCents: 475, sellPriceCents: 1399, taxRateId: standardTax.id, barcode: "041500002026" },
    { sku: "SC-SERUM-VITC", name: "Vitamin C Serum 1oz", categoryId: skinCare.id, costPriceCents: 600, sellPriceCents: 2499, taxRateId: standardTax.id, barcode: "041500003030" },
    { sku: "SC-CREAM-HYDRA", name: "Hydrating Face Cream 2oz", categoryId: skinCare.id, costPriceCents: 550, sellPriceCents: 1999, taxRateId: standardTax.id, barcode: "041500004044" },
    { sku: "MK-LIPSTICK-MATTE", name: "Matte Liquid Lipstick", categoryId: makeup.id, costPriceCents: 250, sellPriceCents: 899, taxRateId: standardTax.id, barcode: "041500005058" },
    { sku: "MK-EYESHADOW-12", name: "Eyeshadow Palette, 12 Shades", categoryId: makeup.id, costPriceCents: 700, sellPriceCents: 2299, taxRateId: standardTax.id, barcode: "041500006062" },
    { sku: "TL-HAIRDRYER-PRO", name: "Professional Hair Dryer", categoryId: tools.id, costPriceCents: 1800, sellPriceCents: 4999, taxRateId: standardTax.id, barcode: "4006381000109" },
    { sku: "TL-NAILCLIP-SET", name: "Nail Clipper Set", categoryId: tools.id, costPriceCents: 200, sellPriceCents: 799, taxRateId: taxExempt.id, barcode: "4006381000208" }
  ];

  const seededProducts: { id: string; sku: string; costPriceCents: number }[] = [];

  for (const p of products) {
    const product = await prisma.product.create({
      data: {
        sku: p.sku,
        name: p.name,
        categoryId: p.categoryId,
        supplierId: supplier.id,
        costPriceCents: p.costPriceCents,
        sellPriceCents: p.sellPriceCents,
        taxRateId: p.taxRateId,
        unit: "EACH",
        barcodes: { create: [{ code: p.barcode, type: "UPC_A", isPrimary: true }] }
      }
    });
    seededProducts.push({ id: product.id, sku: product.sku, costPriceCents: product.costPriceCents });
  }

  // A variant group: the parent itself isn't sellable (isActive: false) — it
  // just holds the shared name/category for its variants, same as the
  // frontend's "Active (sellable)" checkbox unchecked.
  const nailPolishGroup = await prisma.product.create({
    data: {
      sku: "NL-POLISH-GROUP",
      name: "OPI Nail Polish",
      categoryId: nails.id,
      supplierId: supplier.id,
      costPriceCents: 300,
      sellPriceCents: 999,
      taxRateId: standardTax.id,
      unit: "EACH",
      isActive: false
    }
  });

  const nailPolishVariants = [
    { sku: "NL-POLISH-RED", attrs: { color: "Red", size: "15ml" }, barcode: "041500007076" },
    { sku: "NL-POLISH-BLUE", attrs: { color: "Blue", size: "15ml" }, barcode: "041500008080" },
    { sku: "NL-POLISH-NUDE", attrs: { color: "Nude", size: "15ml" }, barcode: "041500009094" }
  ];

  for (const v of nailPolishVariants) {
    const variant = await prisma.product.create({
      data: {
        sku: v.sku,
        name: `OPI Nail Polish — ${v.attrs.color}`,
        parentProductId: nailPolishGroup.id,
        variantAttributes: JSON.stringify(v.attrs),
        categoryId: nails.id,
        supplierId: supplier.id,
        costPriceCents: 300,
        sellPriceCents: 999,
        taxRateId: standardTax.id,
        unit: "EACH",
        barcodes: { create: [{ code: v.barcode, type: "UPC_A", isPrimary: true }] }
      }
    });
    seededProducts.push({ id: variant.id, sku: variant.sku, costPriceCents: variant.costPriceCents });
  }

  // Opening stock at both locations for every sellable product.
  for (const product of seededProducts) {
    for (const location of [mainStore, downtown]) {
      await prisma.$transaction((tx) =>
        recordStockMovement(tx, {
          productId: product.id,
          locationId: location.id,
          type: "PURCHASE_RECEIPT",
          deltaMilliUnits: 50_000, // 50 units
          unitCostCents: product.costPriceCents,
          userId: admin.id,
          reference: "seed"
        })
      );
    }
  }

  // Demonstrate expiration tracking: a fresh batch of serum expiring in 60
  // days, received with a lot number.
  const serum = seededProducts.find((p) => p.sku === "SC-SERUM-VITC")!;
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 60);
  await prisma.$transaction((tx) =>
    recordStockMovement(tx, {
      productId: serum.id,
      locationId: mainStore.id,
      type: "PURCHASE_RECEIPT",
      deltaMilliUnits: 20_000,
      unitCostCents: serum.costPriceCents,
      lotNumber: "LOT-2026-A",
      expirationDate,
      userId: admin.id,
      reference: "seed"
    })
  );

  // Low-stock demo: set the hydrating cream's reorder point above what's on hand.
  const faceCreamId = seededProducts.find((p) => p.sku === "SC-CREAM-HYDRA")!.id;
  await prisma.stockItem.update({
    where: { productId_locationId: { productId: faceCreamId, locationId: mainStore.id } },
    data: { reorderPoint: 60_000, reorderQuantity: 50_000 }
  });

  // Demo loyalty customers.
  await prisma.customer.createMany({
    data: [
      { name: "Priya Patel", phone: "555-0101", email: "priya@example.com", loyaltyPoints: 150 },
      { name: "Jordan Lee", phone: "555-0102", email: "jordan@example.com", loyaltyPoints: 0 },
      { name: "Morgan Diaz", phone: "555-0103", email: "morgan@example.com", loyaltyPoints: 500 }
    ]
  });

  console.log("Seed complete:");
  console.log(`  Admin:    admin@example.com / password123`);
  console.log(`  Manager:  manager@example.com / password123 (PIN 1234)`);
  console.log(`  Cashier:  cashier@example.com / password123`);
  console.log(`  Locations: ${mainStore.name}, ${downtown.name}`);
  console.log(`  Products: ${seededProducts.length} (incl. 1 variant group with 3 color variants)`);
  console.log(`  Demo customers: Priya Patel (150 pts), Jordan Lee (0 pts), Morgan Diaz (500 pts)`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
