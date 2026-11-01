import { Router } from "express";
import { z } from "zod";
import { requireAuth, requireRole } from "../../middleware/auth.js";
import { validate } from "../../middleware/validate.js";
import { zPurchaseOrderStatus } from "../../lib/enums.js";
import * as poService from "./purchaseOrders.service.js";

export const purchaseOrdersRouter = Router();
purchaseOrdersRouter.use(requireAuth, requireRole("ADMIN", "MANAGER"));

const listQuerySchema = z.object({
  status: zPurchaseOrderStatus.optional(),
  locationId: z.string().max(100).optional()
});

purchaseOrdersRouter.get("/", validate({ query: listQuerySchema }), async (req, res) => {
  res.json({ data: await poService.listPurchaseOrders(req.query as unknown as z.infer<typeof listQuerySchema>) });
});

const lineInputSchema = z.object({
  productId: z.string().min(1),
  quantityOrdered: z.number().int().positive(),
  unitCostCents: z.number().int().min(0)
});

const createSchema = z.object({
  supplierId: z.string().min(1),
  locationId: z.string().min(1),
  expectedDate: z.string().datetime().optional(),
  notes: z.string().max(2000).optional(),
  lines: z.array(lineInputSchema).min(1).max(200)
});

purchaseOrdersRouter.post("/", validate({ body: createSchema }), async (req, res) => {
  const po = await poService.createPurchaseOrder(req.body, req.user!.id);
  res.status(201).json({ data: po });
});

const paramsSchema = z.object({ id: z.string().min(1) });

purchaseOrdersRouter.get("/:id", validate({ params: paramsSchema }), async (req, res) => {
  res.json({ data: await poService.getPurchaseOrder(req.params.id) });
});

purchaseOrdersRouter.post("/:id/send", validate({ params: paramsSchema }), async (req, res) => {
  res.json({ data: await poService.sendPurchaseOrder(req.params.id) });
});

const receiveSchema = z.object({
  lines: z
    .array(z.object({ lineId: z.string().min(1), quantityReceivedDelta: z.number().int().positive() }))
    .min(1)
    .max(200)
});

purchaseOrdersRouter.post(
  "/:id/receive",
  validate({ params: paramsSchema, body: receiveSchema }),
  async (req, res) => {
    const po = await poService.receivePurchaseOrder(req.params.id, req.body.lines, req.user!.id);
    res.json({ data: po });
  }
);

purchaseOrdersRouter.post("/:id/cancel", validate({ params: paramsSchema }), async (req, res) => {
  res.json({ data: await poService.cancelPurchaseOrder(req.params.id) });
});
