import { Router } from "express";
import { z } from "zod";
import { requireAuth, requireRole } from "../../middleware/auth.js";
import { validate } from "../../middleware/validate.js";
import * as stockCountsService from "./stockCounts.service.js";

export const stockCountsRouter = Router();
stockCountsRouter.use(requireAuth, requireRole("ADMIN", "MANAGER"));

const startSchema = z.object({ locationId: z.string().min(1) });

stockCountsRouter.post("/", validate({ body: startSchema }), async (req, res) => {
  const session = await stockCountsService.startStockCount(req.body.locationId, req.user!.id);
  res.status(201).json({ data: session });
});

const paramsSchema = z.object({ id: z.string().min(1) });

stockCountsRouter.get("/:id", validate({ params: paramsSchema }), async (req, res) => {
  res.json({ data: await stockCountsService.getStockCount(req.params.id) });
});

const scanSchema = z.object({
  productId: z.string().min(1),
  countedQuantity: z.number().int().min(0)
});

stockCountsRouter.post(
  "/:id/lines",
  validate({ params: paramsSchema, body: scanSchema }),
  async (req, res) => {
    const line = await stockCountsService.scanStockCountLine(req.params.id, req.body.productId, req.body.countedQuantity);
    res.status(201).json({ data: line });
  }
);

stockCountsRouter.post("/:id/complete", validate({ params: paramsSchema }), async (req, res) => {
  const result = await stockCountsService.completeStockCount(req.params.id, req.user!.id);
  res.json({ data: result });
});

stockCountsRouter.post("/:id/cancel", validate({ params: paramsSchema }), async (req, res) => {
  res.json({ data: await stockCountsService.cancelStockCount(req.params.id) });
});
