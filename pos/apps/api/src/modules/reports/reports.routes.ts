import { Router } from "express";
import { z } from "zod";
import { requireAuth, requireRole } from "../../middleware/auth.js";
import { validate } from "../../middleware/validate.js";
import * as reportsService from "./reports.service.js";
import { inventoryValuation } from "../inventory/stock.service.js";

export const reportsRouter = Router();
reportsRouter.use(requireAuth, requireRole("ADMIN", "MANAGER"));

function startOfDay(d: Date) {
  const copy = new Date(d);
  copy.setHours(0, 0, 0, 0);
  return copy;
}
function endOfDay(d: Date) {
  const copy = new Date(d);
  copy.setHours(23, 59, 59, 999);
  return copy;
}

const rangeQuerySchema = z.object({
  from: z.coerce.date().optional(),
  to: z.coerce.date().optional(),
  locationId: z.string().max(100).optional()
});

reportsRouter.get("/dashboard", validate({ query: z.object({ locationId: z.string().max(100).optional() }) }), async (req, res) => {
  res.json({ data: await reportsService.dashboardSnapshot(req.query.locationId as string | undefined) });
});

reportsRouter.get("/daily-sales", validate({ query: rangeQuerySchema }), async (req, res) => {
  const { from, to, locationId } = req.query as unknown as z.infer<typeof rangeQuerySchema>;
  const summary = await reportsService.dailySalesSummary(
    from ? startOfDay(from) : startOfDay(new Date()),
    to ? endOfDay(to) : endOfDay(new Date()),
    locationId
  );
  res.json({ data: summary });
});

reportsRouter.get("/daily-sales/export.csv", validate({ query: rangeQuerySchema }), async (req, res) => {
  const { from, to, locationId } = req.query as unknown as z.infer<typeof rangeQuerySchema>;
  const summary = await reportsService.dailySalesSummary(
    from ? startOfDay(from) : startOfDay(new Date()),
    to ? endOfDay(to) : endOfDay(new Date()),
    locationId
  );
  res.setHeader("Content-Type", "text/csv");
  res.setHeader("Content-Disposition", 'attachment; filename="daily-sales.csv"');
  res.send(reportsService.salesSummaryToCsv(summary));
});

const topProductsQuerySchema = rangeQuerySchema.extend({ limit: z.coerce.number().int().min(1).max(100).default(10) });

reportsRouter.get("/top-products", validate({ query: topProductsQuerySchema }), async (req, res) => {
  const { from, to, locationId, limit } = req.query as unknown as z.infer<typeof topProductsQuerySchema>;
  const data = await reportsService.topSellingProducts(
    from ? startOfDay(from) : startOfDay(new Date(0)),
    to ? endOfDay(to) : endOfDay(new Date()),
    locationId,
    limit
  );
  res.json({ data });
});

reportsRouter.get("/slow-moving", validate({ query: topProductsQuerySchema }), async (req, res) => {
  const { from, to, locationId, limit } = req.query as unknown as z.infer<typeof topProductsQuerySchema>;
  const data = await reportsService.slowMovingProducts(
    from ? startOfDay(from) : startOfDay(new Date(0)),
    to ? endOfDay(to) : endOfDay(new Date()),
    locationId,
    limit
  );
  res.json({ data });
});

reportsRouter.get("/inventory-valuation", validate({ query: z.object({ locationId: z.string().max(100).optional() }) }), async (req, res) => {
  res.json({ data: await inventoryValuation(req.query.locationId as string | undefined) });
});
