import { prisma } from "../../lib/prisma.js";
import { hashSecret, verifySecret } from "../../lib/hash.js";
import {
  hashRefreshToken,
  newTokenId,
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken
} from "../../lib/jwt.js";
import { env } from "../../lib/env.js";
import { Errors } from "../../lib/errors.js";
import type { Role } from "@pos/shared";

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

function ttlToMs(ttl: string): number {
  const match = /^(\d+)(ms|s|m|h|d)$/.exec(ttl);
  if (!match) return 30 * 24 * 60 * 60 * 1000;
  const value = Number(match[1]);
  const unitMs = { ms: 1, s: 1000, m: 60_000, h: 3_600_000, d: 86_400_000 }[match[2]]!;
  return value * unitMs;
}

async function issueTokenPair(user: { id: string; role: Role; name: string }): Promise<TokenPair> {
  const accessToken = signAccessToken({ sub: user.id, role: user.role, name: user.name });
  const jti = newTokenId();
  const refreshToken = signRefreshToken(user.id, jti);

  await prisma.refreshToken.create({
    data: {
      id: jti,
      userId: user.id,
      tokenHash: hashRefreshToken(refreshToken),
      expiresAt: new Date(Date.now() + ttlToMs(env.jwtRefreshTtl))
    }
  });

  return { accessToken, refreshToken };
}

export async function login(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
  if (!user || !user.isActive) {
    throw Errors.unauthorized("Invalid email or password");
  }
  const valid = await verifySecret(password, user.passwordHash);
  if (!valid) {
    throw Errors.unauthorized("Invalid email or password");
  }

  const tokens = await issueTokenPair({ id: user.id, role: user.role as Role, name: user.name });
  return { user: toPublicUser(user), tokens };
}

export async function refresh(refreshToken: string): Promise<TokenPair> {
  let payload;
  try {
    payload = verifyRefreshToken(refreshToken);
  } catch {
    throw Errors.unauthorized("Invalid or expired refresh token");
  }

  const stored = await prisma.refreshToken.findUnique({ where: { id: payload.jti } });
  if (
    !stored ||
    stored.revokedAt ||
    stored.expiresAt.getTime() < Date.now() ||
    stored.tokenHash !== hashRefreshToken(refreshToken)
  ) {
    throw Errors.unauthorized("Invalid or expired refresh token");
  }

  const user = await prisma.user.findUnique({ where: { id: stored.userId } });
  if (!user || !user.isActive) {
    throw Errors.unauthorized("Invalid or expired refresh token");
  }

  // Rotate: revoke the used token and issue a fresh pair.
  await prisma.refreshToken.update({ where: { id: stored.id }, data: { revokedAt: new Date() } });
  return issueTokenPair({ id: user.id, role: user.role as Role, name: user.name });
}

export async function logout(refreshToken: string): Promise<void> {
  try {
    const payload = verifyRefreshToken(refreshToken);
    await prisma.refreshToken.updateMany({
      where: { id: payload.jti, revokedAt: null },
      data: { revokedAt: new Date() }
    });
  } catch {
    // Already invalid/expired: logout is idempotent, nothing to do.
  }
}

export async function changePassword(userId: string, currentPassword: string, newPassword: string) {
  const user = await prisma.user.findUniqueOrThrow({ where: { id: userId } });
  const valid = await verifySecret(currentPassword, user.passwordHash);
  if (!valid) throw Errors.unauthorized("Current password is incorrect");

  const passwordHash = await hashSecret(newPassword);
  await prisma.user.update({ where: { id: userId }, data: { passwordHash } });
  // Invalidate all existing sessions on a password change.
  await prisma.refreshToken.updateMany({
    where: { userId, revokedAt: null },
    data: { revokedAt: new Date() }
  });
}

/**
 * Looks for an active MANAGER/ADMIN whose PIN matches, for register-side
 * approval flows (discount overrides, voids, refunds) without logging the
 * cashier out. Returns the approving user or null.
 */
export async function verifyManagerPin(pin: string) {
  const candidates = await prisma.user.findMany({
    where: { isActive: true, role: { in: ["MANAGER", "ADMIN"] }, pinHash: { not: null } }
  });

  for (const candidate of candidates) {
    if (candidate.pinHash && (await verifySecret(pin, candidate.pinHash))) {
      return { id: candidate.id, name: candidate.name, role: candidate.role as Role };
    }
  }
  return null;
}

/** Re-validates an already-PIN-verified approver at the point of use (defense in depth). */
export async function assertManagerApprover(approverId: string) {
  const approver = await prisma.user.findUnique({ where: { id: approverId } });
  if (!approver || !approver.isActive || !["MANAGER", "ADMIN"].includes(approver.role)) {
    throw Errors.forbidden("A manager or admin must approve this action");
  }
  return approver;
}

export function toPublicUser(user: { id: string; email: string; name: string; role: string; isActive: boolean }) {
  return { id: user.id, email: user.email, name: user.name, role: user.role as Role, isActive: user.isActive };
}
