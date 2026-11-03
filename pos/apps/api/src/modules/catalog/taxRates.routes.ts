import { Router } from "express";
import { z } from "zod";
import { requireAuth, requireRole } from "../../middleware/auth.js";
import { validate } from "../../middleware/validate.js";
import { prisma } from "../../lib/prisma.js";
import { Errors } from "../../lib/errors.js";

export const taxRatesRouter = Router();
taxRatesRouter.use(requireAuth);

taxRatesRouter.get("/", async (_req, res) => {
  res.json({ data: await prisma.taxRate.findMany({ orderBy: { name: "asc" } }) });
});

const upsertSchema = z.object({
  name: z.string().min(1).max(100),
  rateBasisPoints: z.number().int().min(0).max(10000),
  isDefault: z.boolean().optional()
});

async function clearOtherDefaults(excludeId?: string) {
  await prisma.taxRate.updateMany({
    where: { isDefault: true, ...(excludeId ? { id: { not: excludeId } } : {}) },
    data: { isDefault: false }
  });
}

taxRatesRouter.post(
  "/",
  requireRole("ADMIN", "MANAGER"),
  validate({ body: upsertSchema }),
  async (req, res) => {
    const taxRate = await prisma.$transaction(async (tx) => {
      if (req.body.isDefault) {
        await tx.taxRate.updateMany({ where: { isDefault: true }, data: { isDefault: false } });
      }
      return tx.taxRate.create({ data: req.body });
    });
    res.status(201).json({ data: taxRate });
  }
);

const paramsSchema = z.object({ id: z.string().min(1) });

taxRatesRouter.patch(
  "/:id",
  requireRole("ADMIN", "MANAGER"),
  validate({ params: paramsSchema, body: upsertSchema.partial() }),
  async (req, res) => {
    const existing = await prisma.taxRate.findUnique({ where: { id: req.params.id } });
    if (!existing) throw Errors.notFound("TaxRate", req.params.id);
    const taxRate = await prisma.$transaction(async (tx) => {
      if (req.body.isDefault) {
        await clearOtherDefaults(req.params.id);
      }
      return tx.taxRate.update({ where: { id: req.params.id }, data: req.body });
    });
    res.json({ data: taxRate });
  }
);

taxRatesRouter.delete(
  "/:id",
  requireRole("ADMIN", "MANAGER"),
  validate({ params: paramsSchema }),
  async (req, res) => {
    const inUse = await prisma.product.findFirst({ where: { taxRateId: req.params.id } });
    if (inUse) throw Errors.conflict("Cannot delete a tax rate that is still assigned to products");
    await prisma.taxRate.delete({ where: { id: req.params.id } });
    res.status(204).send();
  }
);
