import express, { Router } from "express";
import { z } from "zod";
import { requireAuth, requireRole } from "../../middleware/auth.js";
import { validate } from "../../middleware/validate.js";
import { zBarcodeType } from "../../lib/enums.js";
import { Errors } from "../../lib/errors.js";
import { assertManagerApprover } from "../auth/auth.service.js";
import * as productsService from "./products.service.js";

export const productsRouter = Router();
productsRouter.use(requireAuth);

const listQuerySchema = z.object({
  search: z.string().max(200).optional(),
  categoryId: z.string().max(100).optional(),
  supplierId: z.string().max(100).optional(),
  isActive: z.coerce.boolean().optional(),
  take: z.coerce.number().int().min(1).max(200).default(50),
  skip: z.coerce.number().int().min(0).default(0)
});

productsRouter.get("/", validate({ query: listQuerySchema }), async (req, res) => {
  const { items, total } = await productsService.listProducts(
    req.query as unknown as z.infer<typeof listQuerySchema>
  );
  res.json({ data: items, meta: { total } });
});

productsRouter.get("/export.csv", requireRole("ADMIN", "MANAGER"), async (_req, res) => {
  const csv = await productsService.exportProductsCsv();
  res.setHeader("Content-Type", "text/csv");
  res.setHeader("Content-Disposition", 'attachment; filename="products.csv"');
  res.send(csv);
});

productsRouter.post(
  "/import",
  requireRole("ADMIN", "MANAGER"),
  express.text({ type: ["text/csv", "text/plain"], limit: "5mb" }),
  async (req, res) => {
    const body = typeof req.body === "string" ? req.body : req.body?.csv;
    if (!body || typeof body !== "string") {
      throw Errors.badRequest("Send the CSV as raw text/csv, or JSON { csv: \"...\" }");
    }
    const summary = await productsService.importProductsCsv(body, req.user!.id);
    res.json({ data: summary });
  }
);

const barcodeParamsSchema = z.object({ code: z.string().min(1).max(64) });

productsRouter.get(
  "/by-barcode/:code",
  validate({ params: barcodeParamsSchema }),
  async (req, res) => {
    const product = await productsService.findByBarcode(req.params.code);
    if (!product) {
      res.status(404).json({ error: { message: "No product for this barcode", code: "NOT_FOUND" } });
      return;
    }
    res.json({ data: product });
  }
);

const idParamsSchema = z.object({ id: z.string().min(1) });

productsRouter.get("/:id", validate({ params: idParamsSchema }), async (req, res) => {
  res.json({ data: await productsService.getProduct(req.params.id) });
});

const barcodeInputSchema = z.object({
  code: z.string().min(1).max(64),
  type: zBarcodeType.optional(),
  isPrimary: z.boolean().optional()
});

const productInputSchema = z.object({
  sku: z.string().min(1).max(64),
  name: z.string().min(1).max(300),
  description: z.string().max(2000).nullable().optional(),
  categoryId: z.string().max(100).nullable().optional(),
  supplierId: z.string().max(100).nullable().optional(),
  costPriceCents: z.number().int().min(0),
  sellPriceCents: z.number().int().min(0),
  taxRateId: z.string().max(100).nullable().optional(),
  priceIncludesTax: z.boolean().optional(),
  unit: z.string().max(10).optional(),
  imageUrl: z.string().url().max(1000).nullable().optional(),
  isActive: z.boolean().optional(),
  barcodes: z.array(barcodeInputSchema).max(20).optional(),
  // Only read for a CASHIER caller: lets the register's "unknown barcode"
  // flow create a product on the spot with a manager's PIN-verified
  // approval, the same pattern sales discounts/voids use.
  approverId: z.string().min(1).optional()
});

productsRouter.post(
  "/",
  validate({ body: productInputSchema }),
  async (req, res) => {
    if (req.user!.role === "CASHIER") {
      if (!req.body.approverId) throw Errors.forbidden("Creating a new product requires manager approval");
      await assertManagerApprover(req.body.approverId);
    }
    const product = await productsService.createProduct(req.body, req.user!.id);
    res.status(201).json({ data: product });
  }
);

productsRouter.patch(
  "/:id",
  requireRole("ADMIN", "MANAGER"),
  validate({ params: idParamsSchema, body: productInputSchema.partial() }),
  async (req, res) => {
    const product = await productsService.updateProduct(req.params.id, req.body, req.user!.id);
    res.json({ data: product });
  }
);

productsRouter.post(
  "/:id/barcodes",
  requireRole("ADMIN", "MANAGER"),
  validate({ params: idParamsSchema, body: barcodeInputSchema }),
  async (req, res) => {
    const barcode = await productsService.addBarcode(req.params.id, req.body, req.user!.id);
    res.status(201).json({ data: barcode });
  }
);

const barcodeIdParamsSchema = z.object({ id: z.string().min(1), barcodeId: z.string().min(1) });

productsRouter.delete(
  "/:id/barcodes/:barcodeId",
  requireRole("ADMIN", "MANAGER"),
  validate({ params: barcodeIdParamsSchema }),
  async (req, res) => {
    await productsService.removeBarcode(req.params.id, req.params.barcodeId);
    res.status(204).send();
  }
);
