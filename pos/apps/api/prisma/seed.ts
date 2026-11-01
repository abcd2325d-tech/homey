// Demo data for local development: users, locations, categories, suppliers,
// tax rates, and a small product catalog with real, check-digit-valid
// barcodes and opening stock. Safe to re-run against a fresh database;
// it does not try to be idempotent against a partially-seeded one.
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
      storeName: "Corner Market",
      address: "123 Main St, Springfield, USA",
      taxId: "12-3456789",
      currencyCode: "USD",
      locale: "en-US",
      receiptFooterText: "Thank you for shopping with us!",
      costingMethod: "WEIGHTED_AVERAGE",
      discountApprovalThresholdBasisPoints: 2000
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
    create: { id: "seed-main-store", name: "Main Store", address: "123 Main St", receiptSequence: { create: {} } },
    update: {}
  });
  const downtown = await prisma.location.upsert({
    where: { id: "seed-downtown" },
    create: { id: "seed-downtown", name: "Downtown Store", address: "456 Market Ave", receiptSequence: { create: {} } },
    update: {}
  });

  const [beverages, snacks, grocery, household] = await Promise.all(
    ["Beverages", "Snacks", "Grocery", "Household"].map((name) =>
      prisma.category.upsert({ where: { name }, create: { name }, update: {} })
    )
  );

  const supplier = await prisma.supplier.create({
    data: { name: "Acme Wholesale", contactName: "Sam Sales", email: "orders@acmewholesale.example", phone: "555-0100" }
  });

  const [standardTax, groceryExempt] = await Promise.all([
    prisma.taxRate.create({ data: { name: "Standard", rateBasisPoints: 825, isDefault: true } }),
    prisma.taxRate.create({ data: { name: "Grocery Exempt", rateBasisPoints: 0 } })
  ]);

  const products = [
    { sku: "BEV-COKE-12OZ", name: "Cola 12oz Can", categoryId: beverages.id, costPriceCents: 35, sellPriceCents: 125, taxRateId: standardTax.id, barcode: "049000028911" },
    { sku: "SNK-CHIPS-REG", name: "Potato Chips, Regular", categoryId: snacks.id, costPriceCents: 120, sellPriceCents: 299, taxRateId: standardTax.id, barcode: "4006381333931" },
    { sku: "GRO-MILK-1GAL", name: "Whole Milk, 1 Gallon", categoryId: grocery.id, costPriceCents: 250, sellPriceCents: 399, taxRateId: groceryExempt.id, barcode: "40170725" },
    { sku: "GRO-BREAD-WHT", name: "White Bread Loaf", categoryId: grocery.id, costPriceCents: 150, sellPriceCents: 329, taxRateId: groceryExempt.id, barcode: null },
    { sku: "HH-PAPTOWEL-6PK", name: "Paper Towels, 6-Pack", categoryId: household.id, costPriceCents: 450, sellPriceCents: 899, taxRateId: standardTax.id, barcode: null },
    { sku: "HH-DISHSOAP", name: "Dish Soap, 25oz", categoryId: household.id, costPriceCents: 180, sellPriceCents: 379, taxRateId: standardTax.id, barcode: null },
    { sku: "SNK-GRANOLA-BAR", name: "Granola Bar, Box of 6", categoryId: snacks.id, costPriceCents: 210, sellPriceCents: 449, taxRateId: standardTax.id, barcode: null },
    { sku: "BEV-WATER-1L", name: "Spring Water 1L", categoryId: beverages.id, costPriceCents: 25, sellPriceCents: 99, taxRateId: standardTax.id, barcode: null }
  ];

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
        barcodes: p.barcode ? { create: [{ code: p.barcode, type: "UPC_A", isPrimary: true }] } : undefined
      }
    });

    for (const location of [mainStore, downtown]) {
      await prisma.$transaction((tx) =>
        recordStockMovement(tx, {
          productId: product.id,
          locationId: location.id,
          type: "PURCHASE_RECEIPT",
          deltaMilliUnits: 50_000, // 50 units
          unitCostCents: p.costPriceCents,
          userId: admin.id,
          reference: "seed"
        })
      );
    }

    // Give one item a low-stock alert out of the box so the dashboard has something to show.
    if (p.sku === "GRO-MILK-1GAL") {
      await prisma.stockItem.update({
        where: { productId_locationId: { productId: product.id, locationId: mainStore.id } },
        data: { reorderPoint: 60_000, reorderQuantity: 50_000 }
      });
    }
  }

  console.log("Seed complete:");
  console.log(`  Admin:    admin@example.com / password123`);
  console.log(`  Manager:  manager@example.com / password123 (PIN 1234)`);
  console.log(`  Cashier:  cashier@example.com / password123`);
  console.log(`  Locations: ${mainStore.name}, ${downtown.name}`);
  console.log(`  Products: ${products.length}`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
