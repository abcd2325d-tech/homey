import { Router, type Request } from "express";
import { z } from "zod";
import { requireAuth } from "../../middleware/auth.js";
import { validate } from "../../middleware/validate.js";
import { zDiscountType, zPaymentMethod, zSaleStatus } from "../../lib/enums.js";
import { Errors } from "../../lib/errors.js";
import * as salesService from "./sales.service.js";
import { getStoreSettings } from "../inventory/stock.service.js";
import { renderReceiptEscPos, renderReceiptHtml, renderReceiptPdf } from "../receipts/receipt.service.js";

export const salesRouter = Router();
salesRouter.use(requireAuth);

/** A manager/admin acting on their own authority is their own approver; a cashier must supply one verified via /auth/verify-pin. */
function resolveApproverId(req: Request, explicitApproverId?: string): string | undefined {
  if (explicitApproverId) return explicitApproverId;
  if (req.user!.role === "MANAGER" || req.user!.role === "ADMIN") return req.user!.id;
  return undefined;
}

function requireApprover(req: Request, explicitApproverId?: string): string {
  const approverId = resolveApproverId(req, explicitApproverId);
  if (!approverId) throw Errors.forbidden("This action requires manager approval");
  return approverId;
}

const listQuerySchema = z.object({
  status: zSaleStatus.optional(),
  locationId: z.string().max(100).optional(),
  cashierId: z.string().max(100).optional(),
  from: z.coerce.date().optional(),
  to: z.coerce.date().optional()
});

salesRouter.get("/", validate({ query: listQuerySchema }), async (req, res) => {
  res.json({ data: await salesService.listSales(req.query as unknown as z.infer<typeof listQuerySchema>) });
});

salesRouter.get("/held", validate({ query: z.object({ locationId: z.string().max(100).optional() }) }), async (req, res) => {
  res.json({ data: await salesService.listHeldSales(req.query.locationId as string | undefined) });
});

const createSaleSchema = z.object({ locationId: z.string().min(1), customerId: z.string().min(1).optional() });

salesRouter.post("/", validate({ body: createSaleSchema }), async (req, res) => {
  const sale = await salesService.createSale(req.body.locationId, req.user!.id, req.body.customerId);
  res.status(201).json({ data: sale });
});

const paramsSchema = z.object({ id: z.string().min(1) });

salesRouter.get("/:id", validate({ params: paramsSchema }), async (req, res) => {
  res.json({ data: await salesService.getSale(req.params.id) });
});

const customerSchema = z.object({ customerId: z.string().min(1).nullable() });

salesRouter.post("/:id/customer", validate({ params: paramsSchema, body: customerSchema }), async (req, res) => {
  res.json({ data: await salesService.attachCustomer(req.params.id, req.body.customerId) });
});

const addLineSchema = z.object({
  productId: z.string().min(1),
  quantityMilliUnits: z.number().int().positive()
});

salesRouter.post("/:id/lines", validate({ params: paramsSchema, body: addLineSchema }), async (req, res) => {
  const sale = await salesService.addLine(req.params.id, req.body);
  res.status(201).json({ data: sale });
});

const lineParamsSchema = z.object({ id: z.string().min(1), lineId: z.string().min(1) });
const updateLineSchema = z.object({ quantityMilliUnits: z.number().int().positive() });

salesRouter.patch(
  "/:id/lines/:lineId",
  validate({ params: lineParamsSchema, body: updateLineSchema }),
  async (req, res) => {
    const sale = await salesService.updateLineQuantity(req.params.id, req.params.lineId, req.body.quantityMilliUnits);
    res.json({ data: sale });
  }
);

const discountSchema = z.object({
  discountType: zDiscountType,
  discountValue: z.number().int().min(0),
  approverId: z.string().min(1).optional()
});

salesRouter.post(
  "/:id/lines/:lineId/discount",
  validate({ params: lineParamsSchema, body: discountSchema }),
  async (req, res) => {
    const approverId = resolveApproverId(req, req.body.approverId);
    const sale = await salesService.applyLineDiscount(
      req.params.id,
      req.params.lineId,
      { ...req.body, approverId },
      req.user!.id
    );
    res.json({ data: sale });
  }
);

salesRouter.delete("/:id/lines/:lineId", validate({ params: lineParamsSchema }), async (req, res) => {
  const sale = await salesService.removeLine(req.params.id, req.params.lineId);
  res.json({ data: sale });
});

const holdSchema = z.object({ label: z.string().max(200).optional() });

salesRouter.post("/:id/hold", validate({ params: paramsSchema, body: holdSchema }), async (req, res) => {
  res.json({ data: await salesService.holdSale(req.params.id, req.body.label) });
});

salesRouter.post("/:id/recall", validate({ params: paramsSchema }), async (req, res) => {
  res.json({ data: await salesService.recallSale(req.params.id) });
});

const paymentSchema = z.object({
  method: zPaymentMethod,
  amountCents: z.number().int().positive(),
  tenderedCents: z.number().int().positive().optional()
});

salesRouter.post("/:id/payments", validate({ params: paramsSchema, body: paymentSchema }), async (req, res) => {
  const payment = await salesService.addPayment(req.params.id, req.body);
  res.status(201).json({ data: payment });
});

salesRouter.post("/:id/complete", validate({ params: paramsSchema }), async (req, res) => {
  const sale = await salesService.completeSale(req.params.id, req.user!.id);
  res.json({ data: sale });
});

const voidSchema = z.object({
  reason: z.string().min(1).max(500),
  approverId: z.string().min(1).optional()
});

salesRouter.post("/:id/void", validate({ params: paramsSchema, body: voidSchema }), async (req, res) => {
  const approverId = requireApprover(req, req.body.approverId);
  const sale = await salesService.voidSale(req.params.id, { ...req.body, approverId }, req.user!.id);
  res.json({ data: sale });
});

const refundSchema = z.object({
  reason: z.string().min(1).max(500),
  approverId: z.string().min(1).optional(),
  lines: z
    .array(z.object({ saleLineId: z.string().min(1), quantityMilliUnits: z.number().int().positive() }))
    .min(1)
    .max(200)
});

salesRouter.post("/:id/refund", validate({ params: paramsSchema, body: refundSchema }), async (req, res) => {
  const approverId = requireApprover(req, req.body.approverId);
  const sale = await salesService.refundSale(req.params.id, { ...req.body, approverId }, req.user!.id);
  res.json({ data: sale });
});

async function loadReceiptData(saleId: string) {
  const sale = await salesService.getSale(saleId);
  if (sale.status !== "COMPLETED" && sale.status !== "PARTIALLY_REFUNDED" && sale.status !== "REFUNDED") {
    throw Errors.conflict("A receipt is only available for a completed sale");
  }
  const settings = await getStoreSettings();
  return { sale, settings };
}

salesRouter.get("/:id/receipt.html", validate({ params: paramsSchema }), async (req, res) => {
  const { sale, settings } = await loadReceiptData(req.params.id);
  res.setHeader("Content-Type", "text/html");
  res.send(renderReceiptHtml(sale, settings));
});

salesRouter.get("/:id/receipt.pdf", validate({ params: paramsSchema }), async (req, res) => {
  const { sale, settings } = await loadReceiptData(req.params.id);
  const pdf = await renderReceiptPdf(sale, settings);
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `inline; filename="receipt-${sale.receiptNumber ?? sale.id}.pdf"`);
  res.send(pdf);
});

salesRouter.get("/:id/receipt.escpos", validate({ params: paramsSchema }), async (req, res) => {
  const { sale, settings } = await loadReceiptData(req.params.id);
  const bytes = renderReceiptEscPos(sale, settings);
  res.setHeader("Content-Type", "application/octet-stream");
  res.setHeader("Content-Disposition", `attachment; filename="receipt-${sale.receiptNumber ?? sale.id}.bin"`);
  res.send(bytes);
});
