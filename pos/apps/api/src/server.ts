import { buildApp } from "./app.js";
import { env } from "./lib/env.js";
import { logger } from "./lib/logger.js";

const app = buildApp();

app.listen(env.port, () => {
  logger.info(`API listening on http://localhost:${env.port}`);
});
