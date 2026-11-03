import { Router } from "express";
import { z } from "zod";
import { requireAuth, requireRole } from "../../middleware/auth.js";
import { validate } from "../../middleware/validate.js";
import { zRole } from "../../lib/enums.js";
import * as usersService from "./users.service.js";

export const usersRouter = Router();

usersRouter.use(requireAuth, requireRole("ADMIN"));

usersRouter.get("/", async (_req, res) => {
  res.json({ data: await usersService.listUsers() });
});

const createUserSchema = z.object({
  email: z.string().email().max(200),
  name: z.string().min(1).max(200),
  role: zRole,
  password: z.string().min(8).max(200),
  pin: z.string().min(4).max(12).optional()
});

usersRouter.post("/", validate({ body: createUserSchema }), async (req, res) => {
  const user = await usersService.createUser(req.body, req.user!.id);
  res.status(201).json({ data: user });
});

const paramsSchema = z.object({ id: z.string().min(1) });
const updateUserSchema = z.object({
  name: z.string().min(1).max(200).optional(),
  role: zRole.optional(),
  isActive: z.boolean().optional(),
  pin: z.string().min(4).max(12).optional()
});

usersRouter.patch(
  "/:id",
  validate({ params: paramsSchema, body: updateUserSchema }),
  async (req, res) => {
    const user = await usersService.updateUser(req.params.id, req.body, req.user!.id);
    res.json({ data: user });
  }
);

const resetPasswordSchema = z.object({ newPassword: z.string().min(8).max(200) });

usersRouter.post(
  "/:id/reset-password",
  validate({ params: paramsSchema, body: resetPasswordSchema }),
  async (req, res) => {
    await usersService.resetPassword(req.params.id, req.body.newPassword, req.user!.id);
    res.status(204).send();
  }
);
