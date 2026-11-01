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
import { categoriesRouter } from "./modules/catalog/categories.routes.js";
import { suppliersRouter } from "./modules/catalog/suppliers.routes.js";
import { taxRatesRouter } from "./modules/catalog/taxRates.routes.js";
import { productsRouter } from "./modules/catalog/products.routes.js";

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
  app.use("/api/categories", categoriesRouter);
  app.use("/api/suppliers", suppliersRouter);
  app.use("/api/tax-rates", taxRatesRouter);
  app.use("/api/products", productsRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
