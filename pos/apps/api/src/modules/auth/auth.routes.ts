import { Router } from "express";
import { z } from "zod";
import { requireAuth } from "../../middleware/auth.js";
import { validate } from "../../middleware/validate.js";
import * as authService from "./auth.service.js";
import { prisma } from "../../lib/prisma.js";
import { Errors } from "../../lib/errors.js";

export const authRouter = Router();

const loginSchema = z.object({
  email: z.string().email().max(200),
  password: z.string().min(1).max(200)
});

authRouter.post("/login", validate({ body: loginSchema }), async (req, res) => {
  const { user, tokens } = await authService.login(req.body.email, req.body.password);
  res.json({ data: { user, ...tokens } });
});

const refreshSchema = z.object({ refreshToken: z.string().min(1) });

authRouter.post("/refresh", validate({ body: refreshSchema }), async (req, res) => {
  const tokens = await authService.refresh(req.body.refreshToken);
  res.json({ data: tokens });
});

authRouter.post("/logout", validate({ body: refreshSchema }), async (req, res) => {
  await authService.logout(req.body.refreshToken);
  res.status(204).send();
});

authRouter.get("/me", requireAuth, async (req, res) => {
  const user = await prisma.user.findUnique({ where: { id: req.user!.id } });
  if (!user) throw Errors.notFound("User", req.user!.id);
  res.json({ data: authService.toPublicUser(user) });
});

const changePasswordSchema = z.object({
  currentPassword: z.string().min(1).max(200),
  newPassword: z.string().min(8).max(200)
});

authRouter.post(
  "/change-password",
  requireAuth,
  validate({ body: changePasswordSchema }),
  async (req, res) => {
    await authService.changePassword(req.user!.id, req.body.currentPassword, req.body.newPassword);
    res.status(204).send();
  }
);

const verifyPinSchema = z.object({ pin: z.string().min(4).max(12) });

// Called from the register UI (cashier is logged in) to get manager
// sign-off on a discount/void/refund without a full role switch.
authRouter.post(
  "/verify-pin",
  requireAuth,
  validate({ body: verifyPinSchema }),
  async (req, res) => {
    const approver = await authService.verifyManagerPin(req.body.pin);
    if (!approver) throw Errors.unauthorized("PIN not recognized");
    res.json({ data: { approverId: approver.id, approverName: approver.name, role: approver.role } });
  }
);
