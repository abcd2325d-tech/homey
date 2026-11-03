import { Router } from "express";
import { z } from "zod";
import { requireAuth, requireRole } from "../../middleware/auth.js";
import { validate } from "../../middleware/validate.js";
import { listAuditLogs } from "./auditLog.service.js";

export const auditLogRouter = Router();

const listQuerySchema = z.object({
  entityType: z.string().max(100).optional(),
  entityId: z.string().max(100).optional(),
  userId: z.string().max(100).optional(),
  take: z.coerce.number().int().min(1).max(500).default(100),
  skip: z.coerce.number().int().min(0).default(0)
});

auditLogRouter.get(
  "/",
  requireAuth,
  requireRole("ADMIN"),
  validate({ query: listQuerySchema }),
  async (req, res) => {
    const logs = await listAuditLogs(req.query as unknown as z.infer<typeof listQuerySchema>);
    res.json({ data: logs });
  }
);
