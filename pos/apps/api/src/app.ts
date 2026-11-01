import express from "express";
import "express-async-errors";
import cors from "cors";
import helmet from "helmet";
import { pinoHttp } from "pino-http";
import { env } from "./lib/env.js";
import { logger } from "./lib/logger.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";
import { authRouter } from "./modules/auth/auth.routes.js";
import { usersRouter } from "./modules/users/users.routes.js";
import { auditLogRouter } from "./modules/auditLog/auditLog.routes.js";

export function buildApp() {
  const app = express();

  app.use(helmet());
  app.use(cors({ origin: env.clientOrigin, credentials: true }));
  app.use(express.json({ limit: "2mb" }));
  if (!env.isTest) {
    app.use(pinoHttp({ logger }));
  }

  app.get("/api/health", (_req, res) => {
    res.json({ data: { status: "ok", time: new Date().toISOString() } });
  });

  app.use("/api/auth", authRouter);
  app.use("/api/users", usersRouter);
  app.use("/api/audit-log", auditLogRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
