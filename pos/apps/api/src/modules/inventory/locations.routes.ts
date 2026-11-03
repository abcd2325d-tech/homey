import { Router } from "express";
import { z } from "zod";
import { requireAuth, requireRole } from "../../middleware/auth.js";
import { validate } from "../../middleware/validate.js";
import { prisma } from "../../lib/prisma.js";
import { Errors } from "../../lib/errors.js";

export const locationsRouter = Router();
locationsRouter.use(requireAuth);

locationsRouter.get("/", async (_req, res) => {
  res.json({ data: await prisma.location.findMany({ orderBy: { name: "asc" } }) });
});

const upsertSchema = z.object({
  name: z.string().min(1).max(200),
  address: z.string().max(500).nullable().optional(),
  isActive: z.boolean().optional()
});

locationsRouter.post(
  "/",
  requireRole("ADMIN"),
  validate({ body: upsertSchema }),
  async (req, res) => {
    const location = await prisma.location.create({
      data: { ...req.body, receiptSequence: { create: { nextNumber: 1 } } }
    });
    res.status(201).json({ data: location });
  }
);

const paramsSchema = z.object({ id: z.string().min(1) });

locationsRouter.patch(
  "/:id",
  requireRole("ADMIN"),
  validate({ params: paramsSchema, body: upsertSchema.partial() }),
  async (req, res) => {
    const existing = await prisma.location.findUnique({ where: { id: req.params.id } });
    if (!existing) throw Errors.notFound("Location", req.params.id);
    const location = await prisma.location.update({ where: { id: req.params.id }, data: req.body });
    res.json({ data: location });
  }
);
