import { Router } from "express";
import { z } from "zod";
import { requireAuth, requireRole } from "../../middleware/auth.js";
import { validate } from "../../middleware/validate.js";
import { prisma } from "../../lib/prisma.js";
import { Errors } from "../../lib/errors.js";

export const suppliersRouter = Router();
suppliersRouter.use(requireAuth);

suppliersRouter.get("/", async (_req, res) => {
  res.json({ data: await prisma.supplier.findMany({ orderBy: { name: "asc" } }) });
});

const upsertSchema = z.object({
  name: z.string().min(1).max(200),
  contactName: z.string().max(200).nullable().optional(),
  email: z.string().email().max(200).nullable().optional(),
  phone: z.string().max(50).nullable().optional(),
  address: z.string().max(500).nullable().optional()
});

suppliersRouter.post(
  "/",
  requireRole("ADMIN", "MANAGER"),
  validate({ body: upsertSchema }),
  async (req, res) => {
    const supplier = await prisma.supplier.create({ data: req.body });
    res.status(201).json({ data: supplier });
  }
);

const paramsSchema = z.object({ id: z.string().min(1) });

suppliersRouter.patch(
  "/:id",
  requireRole("ADMIN", "MANAGER"),
  validate({ params: paramsSchema, body: upsertSchema.partial() }),
  async (req, res) => {
    const existing = await prisma.supplier.findUnique({ where: { id: req.params.id } });
    if (!existing) throw Errors.notFound("Supplier", req.params.id);
    const supplier = await prisma.supplier.update({ where: { id: req.params.id }, data: req.body });
    res.json({ data: supplier });
  }
);

suppliersRouter.delete(
  "/:id",
  requireRole("ADMIN", "MANAGER"),
  validate({ params: paramsSchema }),
  async (req, res) => {
    const inUse = await prisma.product.findFirst({ where: { supplierId: req.params.id } });
    if (inUse) throw Errors.conflict("Cannot delete a supplier that still has products");
    await prisma.supplier.delete({ where: { id: req.params.id } });
    res.status(204).send();
  }
);
