import { Router } from "express";
import { z } from "zod";
import { requireAuth, requireRole } from "../../middleware/auth.js";
import { validate } from "../../middleware/validate.js";
import * as stockService from "./stock.service.js";

export const stockRouter = Router();
stockRouter.use(requireAuth);

const listQuerySchema = z.object({
  locationId: z.string().max(100).optional(),
  productId: z.string().max(100).optional(),
  lowStockOnly: z.coerce.boolean().optional()
});

stockRouter.get("/", validate({ query: listQuerySchema }), async (req, res) => {
  const items = await stockService.listStock(req.query as unknown as z.infer<typeof listQuerySchema>);
  res.json({ data: items });
});

stockRouter.get("/low-stock", validate({ query: listQuerySchema }), async (req, res) => {
  const items = await stockService.listStock({
    ...(req.query as unknown as z.infer<typeof listQuerySchema>),
    lowStockOnly: true
  });
  res.json({ data: items });
});

const valuationQuerySchema = z.object({ locationId: z.string().max(100).optional() });

stockRouter.get("/valuation", requireRole("ADMIN", "MANAGER"), validate({ query: valuationQuerySchema }), async (req, res) => {
  const report = await stockService.inventoryValuation(req.query.locationId as string | undefined);
  res.json({ data: report });
});

const adjustmentSchema = z.object({
  productId: z.string().min(1),
  locationId: z.string().min(1),
  deltaMilliUnits: z.number().int().refine((v) => v !== 0, "deltaMilliUnits cannot be zero"),
  unitCostCents: z.number().int().min(0).optional(),
  reason: z.string().min(1).max(500)
});

stockRouter.post(
  "/adjustments",
  requireRole("ADMIN", "MANAGER"),
  validate({ body: adjustmentSchema }),
  async (req, res) => {
    const result = await stockService.adjustStock({ ...req.body, userId: req.user!.id });
    res.status(201).json({ data: result });
  }
);
