import type { Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma.js";
import { Errors } from "../../lib/errors.js";
import { detectBarcodeType, isValidBarcode, type BarcodeType } from "../../lib/barcode.js";
import { parseCsvRecords, toCsv } from "../../lib/csv.js";
import { recordAudit } from "../auditLog/auditLog.service.js";
import { dollarsToCents } from "../../lib/money.js";

export interface BarcodeInput {
  code: string;
  type?: BarcodeType;
  isPrimary?: boolean;
}

export interface ProductInput {
  sku: string;
  name: string;
  description?: string | null;
  categoryId?: string | null;
  supplierId?: string | null;
  costPriceCents: number;
  sellPriceCents: number;
  taxRateId?: string | null;
  priceIncludesTax?: boolean;
  unit?: string;
  imageUrl?: string | null;
  isActive?: boolean;
  barcodes?: BarcodeInput[];
}

export interface VariantInput {
  sku: string;
  name?: string;
  costPriceCents: number;
  sellPriceCents: number;
  categoryId?: string | null;
  supplierId?: string | null;
  taxRateId?: string | null;
  priceIncludesTax?: boolean;
  unit?: string;
  isActive?: boolean;
  /** Free-form, e.g. { color: "Red", size: "15ml" } — stored as JSON, shown in the UI. */
  variantAttributes?: Record<string, string>;
  barcodes?: BarcodeInput[];
}

function validateBarcodes(barcodes: BarcodeInput[] = []): { code: string; type: BarcodeType; isPrimary: boolean }[] {
  return barcodes.map((b, index) => {
    const type = b.type ?? detectBarcodeType(b.code);
    if (!isValidBarcode(b.code, type)) {
      throw Errors.badRequest(`Barcode "${b.code}" fails the ${type} check digit`);
    }
    return { code: b.code, type, isPrimary: b.isPrimary ?? index === 0 };
  });
}

export interface ListProductsParams {
  search?: string;
  categoryId?: string;
  supplierId?: string;
  isActive?: boolean;
  take?: number;
  skip?: number;
}

export async function listProducts(params: ListProductsParams) {
  const where: Prisma.ProductWhereInput = {
    isActive: params.isActive,
    categoryId: params.categoryId,
    supplierId: params.supplierId,
    ...(params.search
      ? {
          OR: [
            { name: { contains: params.search } },
            { sku: { contains: params.search } },
            { barcodes: { some: { code: { contains: params.search } } } }
          ]
        }
      : {})
  };

  const [items, total] = await Promise.all([
    prisma.product.findMany({
      where,
      include: { barcodes: true, category: true, supplier: true, taxRate: true, _count: { select: { variants: true } } },
      orderBy: { name: "asc" },
      take: params.take ?? 50,
      skip: params.skip ?? 0
    }),
    prisma.product.count({ where })
  ]);

  return { items, total };
}

export async function getProduct(id: string) {
  const product = await prisma.product.findUnique({
    where: { id },
    include: { barcodes: true, category: true, supplier: true, taxRate: true, variants: { include: { barcodes: true } }, parent: true }
  });
  if (!product) throw Errors.notFound("Product", id);
  return product;
}

export async function listVariants(parentId: string) {
  const parent = await prisma.product.findUnique({ where: { id: parentId } });
  if (!parent) throw Errors.notFound("Product", parentId);
  return prisma.product.findMany({ where: { parentProductId: parentId }, include: { barcodes: true }, orderBy: { name: "asc" } });
}

export async function createVariant(parentId: string, input: VariantInput, actingUserId: string) {
  const parent = await prisma.product.findUnique({ where: { id: parentId } });
  if (!parent) throw Errors.notFound("Product", parentId);
  if (parent.parentProductId) {
    throw Errors.badRequest("Cannot add a variant to a variant — add it to the top-level group product instead");
  }

  const existingSku = await prisma.product.findUnique({ where: { sku: input.sku } });
  if (existingSku) throw Errors.conflict(`SKU "${input.sku}" is already in use`);

  const barcodes = validateBarcodes(input.barcodes);
  await assertBarcodesAvailable(barcodes.map((b) => b.code));

  const variant = await prisma.product.create({
    data: {
      sku: input.sku,
      name: input.name ?? parent.name,
      parentProductId: parent.id,
      variantAttributes: input.variantAttributes ? JSON.stringify(input.variantAttributes) : null,
      categoryId: input.categoryId ?? parent.categoryId,
      supplierId: input.supplierId ?? parent.supplierId,
      costPriceCents: input.costPriceCents,
      sellPriceCents: input.sellPriceCents,
      taxRateId: input.taxRateId ?? parent.taxRateId,
      priceIncludesTax: input.priceIncludesTax ?? parent.priceIncludesTax,
      unit: input.unit ?? parent.unit,
      isActive: input.isActive ?? true,
      barcodes: { create: barcodes }
    },
    include: { barcodes: true }
  });

  await recordAudit({
    userId: actingUserId,
    action: "VARIANT_CREATED",
    entityType: "Product",
    entityId: variant.id,
    after: { parentProductId: parent.id, sku: variant.sku, variantAttributes: input.variantAttributes }
  });

  return variant;
}

export async function findByBarcode(code: string) {
  const barcode = await prisma.productBarcode.findUnique({
    where: { code },
    include: { product: { include: { barcodes: true, taxRate: true } } }
  });
  return barcode?.product ?? null;
}

export async function createProduct(input: ProductInput, actingUserId: string) {
  const existing = await prisma.product.findUnique({ where: { sku: input.sku } });
  if (existing) throw Errors.conflict(`SKU "${input.sku}" is already in use`);

  const barcodes = validateBarcodes(input.barcodes);
  await assertBarcodesAvailable(barcodes.map((b) => b.code));

  const product = await prisma.product.create({
    data: {
      sku: input.sku,
      name: input.name,
      description: input.description,
      categoryId: input.categoryId,
      supplierId: input.supplierId,
      costPriceCents: input.costPriceCents,
      sellPriceCents: input.sellPriceCents,
      taxRateId: input.taxRateId,
      priceIncludesTax: input.priceIncludesTax ?? false,
      unit: input.unit ?? "EACH",
      imageUrl: input.imageUrl,
      isActive: input.isActive ?? true,
      barcodes: { create: barcodes }
    },
    include: { barcodes: true }
  });

  await recordAudit({
    userId: actingUserId,
    action: "PRODUCT_CREATED",
    entityType: "Product",
    entityId: product.id,
    after: { sku: product.sku, name: product.name, sellPriceCents: product.sellPriceCents }
  });

  return product;
}

async function assertBarcodesAvailable(codes: string[], excludeProductId?: string) {
  if (codes.length === 0) return;
  const conflict = await prisma.productBarcode.findFirst({
    where: { code: { in: codes }, productId: excludeProductId ? { not: excludeProductId } : undefined }
  });
  if (conflict) throw Errors.conflict(`Barcode "${conflict.code}" is already assigned to another product`);
}

export async function updateProduct(id: string, input: Partial<ProductInput>, actingUserId: string) {
  const before = await prisma.product.findUnique({ where: { id } });
  if (!before) throw Errors.notFound("Product", id);

  if (input.sku && input.sku !== before.sku) {
    const skuTaken = await prisma.product.findUnique({ where: { sku: input.sku } });
    if (skuTaken) throw Errors.conflict(`SKU "${input.sku}" is already in use`);
  }

  const product = await prisma.product.update({
    where: { id },
    data: {
      sku: input.sku,
      name: input.name,
      description: input.description,
      categoryId: input.categoryId,
      supplierId: input.supplierId,
      costPriceCents: input.costPriceCents,
      sellPriceCents: input.sellPriceCents,
      taxRateId: input.taxRateId,
      priceIncludesTax: input.priceIncludesTax,
      unit: input.unit,
      imageUrl: input.imageUrl,
      isActive: input.isActive
    },
    include: { barcodes: true }
  });

  const priceChanged =
    (input.costPriceCents !== undefined && input.costPriceCents !== before.costPriceCents) ||
    (input.sellPriceCents !== undefined && input.sellPriceCents !== before.sellPriceCents);

  if (priceChanged) {
    await recordAudit({
      userId: actingUserId,
      action: "PRICE_CHANGED",
      entityType: "Product",
      entityId: id,
      before: { costPriceCents: before.costPriceCents, sellPriceCents: before.sellPriceCents },
      after: { costPriceCents: product.costPriceCents, sellPriceCents: product.sellPriceCents }
    });
  }

  return product;
}

export async function addBarcode(productId: string, input: BarcodeInput, actingUserId: string) {
  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product) throw Errors.notFound("Product", productId);

  const [validated] = validateBarcodes([input]);
  await assertBarcodesAvailable([validated.code]);

  const barcode = await prisma.productBarcode.create({
    data: { ...validated, productId }
  });

  await recordAudit({
    userId: actingUserId,
    action: "BARCODE_ADDED",
    entityType: "Product",
    entityId: productId,
    after: { code: barcode.code, type: barcode.type }
  });

  return barcode;
}

export async function removeBarcode(productId: string, barcodeId: string) {
  const barcode = await prisma.productBarcode.findUnique({ where: { id: barcodeId } });
  if (!barcode || barcode.productId !== productId) throw Errors.notFound("Barcode", barcodeId);
  await prisma.productBarcode.delete({ where: { id: barcodeId } });
}

// ── CSV import/export ────────────────────────────────────────────────────

const CSV_HEADER = [
  "sku",
  "name",
  "description",
  "category",
  "supplier",
  "costPrice",
  "sellPrice",
  "taxRateName",
  "priceIncludesTax",
  "unit",
  "barcodes",
  "isActive"
];

export async function exportProductsCsv(): Promise<string> {
  const products = await prisma.product.findMany({
    include: { barcodes: true, category: true, supplier: true, taxRate: true },
    orderBy: { sku: "asc" }
  });

  const rows = products.map((p) => [
    p.sku,
    p.name,
    p.description ?? "",
    p.category?.name ?? "",
    p.supplier?.name ?? "",
    (p.costPriceCents / 100).toFixed(2),
    (p.sellPriceCents / 100).toFixed(2),
    p.taxRate?.name ?? "",
    p.priceIncludesTax ? "true" : "false",
    p.unit,
    p.barcodes.map((b) => b.code).join(";"),
    p.isActive ? "true" : "false"
  ]);

  return toCsv(CSV_HEADER, rows);
}

export interface ImportSummary {
  created: number;
  updated: number;
  errors: { row: number; sku: string; message: string }[];
}

/**
 * Upserts products by SKU. Category/supplier are looked up or created by
 * name; an unknown tax-rate name is left unset and reported as a warning
 * (we don't want an import typo silently inventing a new tax rate).
 */
export async function importProductsCsv(csvText: string, actingUserId: string): Promise<ImportSummary> {
  const records = parseCsvRecords(csvText);
  const summary: ImportSummary = { created: 0, updated: 0, errors: [] };

  for (let i = 0; i < records.length; i++) {
    const row = records[i];
    const rowNumber = i + 2; // +1 for header, +1 for 1-indexing
    try {
      if (!row.sku) throw new Error("Missing sku");

      const categoryId = row.category ? (await findOrCreateCategory(row.category)).id : null;
      const supplierId = row.supplier ? (await findOrCreateSupplier(row.supplier)).id : null;
      let taxRateId: string | null = null;
      if (row.taxRateName) {
        const taxRate = await prisma.taxRate.findFirst({ where: { name: row.taxRateName } });
        if (!taxRate) {
          summary.errors.push({
            row: rowNumber,
            sku: row.sku,
            message: `Tax rate "${row.taxRateName}" not found; left unset`
          });
        } else {
          taxRateId = taxRate.id;
        }
      }

      const barcodeCodes = row.barcodes ? row.barcodes.split(";").map((c) => c.trim()).filter(Boolean) : [];
      const existing = await prisma.product.findUnique({ where: { sku: row.sku }, include: { barcodes: true } });

      const data = {
        name: row.name || row.sku,
        description: row.description || null,
        categoryId,
        supplierId,
        costPriceCents: dollarsToCents(Number(row.costPrice || 0)),
        sellPriceCents: dollarsToCents(Number(row.sellPrice || 0)),
        taxRateId,
        priceIncludesTax: row.priceIncludesTax?.toLowerCase() === "true",
        unit: row.unit || "EACH",
        isActive: row.isActive ? row.isActive.toLowerCase() !== "false" : true
      };

      if (existing) {
        await prisma.product.update({ where: { id: existing.id }, data });
        const existingCodes = new Set(existing.barcodes.map((b) => b.code));
        for (const code of barcodeCodes) {
          if (!existingCodes.has(code)) {
            const type = detectBarcodeType(code);
            if (isValidBarcode(code, type)) {
              await prisma.productBarcode.create({ data: { code, type, productId: existing.id } }).catch(() => {
                summary.errors.push({ row: rowNumber, sku: row.sku, message: `Barcode "${code}" already in use` });
              });
            } else {
              summary.errors.push({ row: rowNumber, sku: row.sku, message: `Barcode "${code}" invalid check digit, skipped` });
            }
          }
        }
        summary.updated++;
      } else {
        const barcodes = barcodeCodes
          .map((code) => ({ code, type: detectBarcodeType(code) }))
          .filter((b) => isValidBarcode(b.code, b.type));
        await prisma.product.create({ data: { sku: row.sku, ...data, barcodes: { create: barcodes } } });
        summary.created++;
      }
    } catch (err) {
      summary.errors.push({ row: rowNumber, sku: row.sku ?? "", message: err instanceof Error ? err.message : String(err) });
    }
  }

  await recordAudit({
    userId: actingUserId,
    action: "PRODUCTS_IMPORTED",
    entityType: "Product",
    entityId: "bulk",
    metadata: { created: summary.created, updated: summary.updated, errorCount: summary.errors.length }
  });

  return summary;
}

async function findOrCreateCategory(name: string) {
  const existing = await prisma.category.findUnique({ where: { name } });
  if (existing) return existing;
  return prisma.category.create({ data: { name } });
}

async function findOrCreateSupplier(name: string) {
  const existing = await prisma.supplier.findFirst({ where: { name } });
  if (existing) return existing;
  return prisma.supplier.create({ data: { name } });
}
