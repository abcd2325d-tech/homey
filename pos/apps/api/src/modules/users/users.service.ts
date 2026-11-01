import { prisma } from "../../lib/prisma.js";
import { hashSecret } from "../../lib/hash.js";
import { Errors } from "../../lib/errors.js";
import { recordAudit } from "../auditLog/auditLog.service.js";
import { toPublicUser } from "../auth/auth.service.js";
import type { Role } from "@pos/shared";

export async function listUsers() {
  const users = await prisma.user.findMany({ orderBy: { createdAt: "asc" } });
  return users.map(toPublicUser);
}

export interface CreateUserInput {
  email: string;
  name: string;
  role: Role;
  password: string;
  pin?: string;
}

export async function createUser(input: CreateUserInput, actingUserId: string) {
  const existing = await prisma.user.findUnique({ where: { email: input.email.toLowerCase() } });
  if (existing) throw Errors.conflict("A user with this email already exists");

  const passwordHash = await hashSecret(input.password);
  const pinHash = input.pin ? await hashSecret(input.pin) : null;

  const user = await prisma.user.create({
    data: {
      email: input.email.toLowerCase(),
      name: input.name,
      role: input.role,
      passwordHash,
      pinHash
    }
  });

  await recordAudit({
    userId: actingUserId,
    action: "USER_CREATED",
    entityType: "User",
    entityId: user.id,
    after: { email: user.email, name: user.name, role: user.role }
  });

  return toPublicUser(user);
}

export interface UpdateUserInput {
  name?: string;
  role?: Role;
  isActive?: boolean;
  pin?: string;
}

export async function updateUser(id: string, input: UpdateUserInput, actingUserId: string) {
  const before = await prisma.user.findUnique({ where: { id } });
  if (!before) throw Errors.notFound("User", id);

  const pinHash = input.pin ? await hashSecret(input.pin) : undefined;
  const user = await prisma.user.update({
    where: { id },
    data: { name: input.name, role: input.role, isActive: input.isActive, pinHash }
  });

  if (input.role && input.role !== before.role) {
    await recordAudit({
      userId: actingUserId,
      action: "USER_ROLE_CHANGED",
      entityType: "User",
      entityId: id,
      before: { role: before.role },
      after: { role: user.role }
    });
  }
  if (input.isActive !== undefined && input.isActive !== before.isActive) {
    await recordAudit({
      userId: actingUserId,
      action: input.isActive ? "USER_REACTIVATED" : "USER_DEACTIVATED",
      entityType: "User",
      entityId: id
    });
  }

  return toPublicUser(user);
}

export async function resetPassword(id: string, newPassword: string, actingUserId: string) {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) throw Errors.notFound("User", id);

  const passwordHash = await hashSecret(newPassword);
  await prisma.user.update({ where: { id }, data: { passwordHash } });
  await prisma.refreshToken.updateMany({ where: { userId: id, revokedAt: null }, data: { revokedAt: new Date() } });
  await recordAudit({
    userId: actingUserId,
    action: "USER_PASSWORD_RESET",
    entityType: "User",
    entityId: id
  });
}
