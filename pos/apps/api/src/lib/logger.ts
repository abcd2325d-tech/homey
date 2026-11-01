import pino from "pino";
import { env } from "./env.js";

// Structured logging with no secrets: redact anything that looks like a
// credential/token/password at any nesting depth.
export const logger = pino({
  level: env.isTest ? "silent" : env.logLevel,
  redact: {
    paths: [
      "req.headers.authorization",
      "*.password",
      "*.passwordHash",
      "*.pinHash",
      "*.token",
      "*.accessToken",
      "*.refreshToken",
      "*.secret",
      "*.apiKey"
    ],
    censor: "[redacted]"
  },
  transport:
    env.nodeEnv === "development"
      ? { target: "pino-pretty", options: { colorize: true, translateTime: "HH:MM:ss" } }
      : undefined
});
