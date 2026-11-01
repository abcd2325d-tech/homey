import type { NextFunction, Request, RequestHandler, Response } from "express";
import type { Role } from "@pos/shared";
import { verifyAccessToken } from "../lib/jwt.js";
import { Errors } from "../lib/errors.js";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: { id: string; role: Role; name: string };
    }
  }
}

export const requireAuth: RequestHandler = (req: Request, _res: Response, next: NextFunction) => {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    next(Errors.unauthorized());
    return;
  }

  try {
    const payload = verifyAccessToken(header.slice("Bearer ".length));
    req.user = { id: payload.sub, role: payload.role, name: payload.name };
    next();
  } catch {
    next(Errors.unauthorized("Invalid or expired token"));
  }
};

export function requireRole(...roles: Role[]): RequestHandler {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) {
      next(Errors.unauthorized());
      return;
    }
    if (!roles.includes(req.user.role)) {
      next(Errors.forbidden(`This action requires one of: ${roles.join(", ")}`));
      return;
    }
    next();
  };
}
