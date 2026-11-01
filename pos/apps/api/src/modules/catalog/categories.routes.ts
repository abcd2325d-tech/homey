import { Router } from "express";
import { z } from "zod";
import { requireAuth, requireRole } from "../../middleware/auth.js";
import { validate } from "../../middleware/validate.js";
import { prisma } from "../../lib/prisma.js";
import { Errors } from "../../lib/errors.js";

export const categoriesRouter = Router();
categoriesRouter.use(requireAuth);

categoriesRouter.get("/", async (_req, res) => {
  const categories = await prisma.category.findMany({ orderBy: { name: "asc" } });
  res.json({ data: categories });
});

const upsertSchema = z.object({
  name: z.string().min(1).max(200),
  parentId: z.string().min(1).max(100).nullable().optional()
});

categoriesRouter.post(
  "/",
  requireRole("ADMIN", "MANAGER"),
  validate({ body: upsertSchema }),
  async (req, res) => {
    const category = await prisma.category.create({ data: req.body });
    res.status(201).json({ data: category });
  }
);

const paramsSchema = z.object({ id: z.string().min(1) });

categoriesRouter.patch(
  "/:id",
  requireRole("ADMIN", "MANAGER"),
  validate({ params: paramsSchema, body: upsertSchema.partial() }),
  async (req, res) => {
    const existing = await prisma.category.findUnique({ where: { id: req.params.id } });
    if (!existing) throw Errors.notFound("Category", req.params.id);
    const category = await prisma.category.update({ where: { id: req.params.id }, data: req.body });
    res.json({ data: category });
  }
);

categoriesRouter.delete(
  "/:id",
  requireRole("ADMIN", "MANAGER"),
  validate({ params: paramsSchema }),
  async (req, res) => {
    const inUse = await prisma.product.findFirst({ where: { categoryId: req.params.id } });
    if (inUse) throw Errors.conflict("Cannot delete a category that still has products");
    await prisma.category.delete({ where: { id: req.params.id } });
    res.status(204).send();
  }
);
