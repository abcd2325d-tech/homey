import jwt from "jsonwebtoken";
import crypto from "node:crypto";
import { env } from "./env.js";
import type { Role } from "@pos/shared";

export interface AccessTokenPayload {
  sub: string;
  role: Role;
  name: string;
}

export function signAccessToken(payload: AccessTokenPayload): string {
  const options: jwt.SignOptions = { expiresIn: env.jwtAccessTtl as jwt.SignOptions["expiresIn"] };
  return jwt.sign(payload, env.jwtAccessSecret, options);
}

export function verifyAccessToken(token: string): AccessTokenPayload {
  return jwt.verify(token, env.jwtAccessSecret) as unknown as AccessTokenPayload;
}

export interface RefreshTokenPayload {
  sub: string;
  jti: string;
}

export function signRefreshToken(userId: string, jti: string): string {
  const options: jwt.SignOptions = { expiresIn: env.jwtRefreshTtl as jwt.SignOptions["expiresIn"] };
  return jwt.sign({ sub: userId, jti }, env.jwtRefreshSecret, options);
}

export function verifyRefreshToken(token: string): RefreshTokenPayload {
  return jwt.verify(token, env.jwtRefreshSecret) as unknown as RefreshTokenPayload;
}

/** Refresh tokens are stored hashed (SHA-256 is fine here: high-entropy random token, not a password). */
export function hashRefreshToken(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export function newTokenId(): string {
  return crypto.randomUUID();
}
