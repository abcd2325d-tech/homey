import { Router } from "express";
import { z } from "zod";
import { requireAuth, requireRole } from "../../middleware/auth.js";
import { validate } from "../../middleware/validate.js";
import { zCostingMethod } from "../../lib/enums.js";
import { prisma } from "../../lib/prisma.js";
import { getStoreSettings } from "../inventory/stock.service.js";
import { recordAudit } from "../auditLog/auditLog.service.js";

export const settingsRouter = Router();
settingsRouter.use(requireAuth);

// A safe subset any authenticated role can read — the register needs
// currency/locale for formatting and the loyalty point value to let a
// cashier know how much a redemption is worth; everything else (admin
// contact info, tax ID, discount threshold) stays admin-only below.
settingsRouter.get("/public", async (_req, res) => {
  const settings = await getStoreSettings();
  res.json({
    data: {
      storeName: settings.storeName,
      currencyCode: settings.currencyCode,
      locale: settings.locale,
      loyaltyPointsPerDollar: settings.loyaltyPointsPerDollar,
      loyaltyPointValueCents: settings.loyaltyPointValueCents
    }
  });
});

settingsRouter.use(requireRole("ADMIN"));

settingsRouter.get("/", async (_req, res) => {
  res.json({ data: await getStoreSettings() });
});

const updateSchema = z.object({
  storeName: z.string().min(1).max(200).optional(),
  address: z.string().max(500).nullable().optional(),
  taxId: z.string().max(100).nullable().optional(),
  logoUrl: z.string().url().max(1000).nullable().optional(),
  currencyCode: z.string().length(3).optional(),
  locale: z.string().max(20).optional(),
  defaultTaxRateId: z.string().max(100).nullable().optional(),
  receiptFooterText: z.string().max(1000).nullable().optional(),
  costingMethod: zCostingMethod.optional(),
  lowStockGlobalAlert: z.boolean().optional(),
  discountApprovalThresholdBasisPoints: z.number().int().min(0).max(10000).optional(),
  loyaltyPointsPerDollar: z.number().int().min(0).max(1000).optional(),
  loyaltyPointValueCents: z.number().int().min(1).max(100000).optional()
});

settingsRouter.patch("/", validate({ body: updateSchema }), async (req, res) => {
  const before = await getStoreSettings();
  const updated = await prisma.storeSettings.update({ where: { id: 1 }, data: req.body });

  if (req.body.costingMethod && req.body.costingMethod !== before.costingMethod) {
    await recordAudit({
      userId: req.user!.id,
      action: "SETTINGS_CHANGED",
      entityType: "StoreSettings",
      entityId: "1",
      before: { costingMethod: before.costingMethod },
      after: { costingMethod: updated.costingMethod }
    });
  }

  res.json({ data: updated });
});
