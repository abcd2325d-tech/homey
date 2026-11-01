import { defineConfig } from "@playwright/test";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const apiRoot = path.resolve(__dirname, "../api");
const e2eDbUrl = `file:${path.join(apiRoot, "prisma", "e2e.db")}`;

export default defineConfig({
  testDir: "./e2e",
  timeout: 30_000,
  fullyParallel: false,
  workers: 1,
  reporter: "list",
  use: {
    baseURL: "http://localhost:5174",
    trace: "retain-on-failure",
    // This container ships a pinned Chromium build at a fixed path; use it
    // directly instead of the version @playwright/test would try to download.
    launchOptions: { executablePath: "/opt/pw-browsers/chromium", args: ["--no-sandbox"] }
  },
  globalSetup: "./e2e/globalSetup.ts",
  webServer: [
    {
      command: "npx prisma migrate deploy --schema prisma/schema.prisma && node --import tsx src/server.ts",
      cwd: apiRoot,
      port: 4001,
      env: { DATABASE_URL: e2eDbUrl, DATABASE_PROVIDER: "sqlite", PORT: "4001", NODE_ENV: "test" },
      reuseExistingServer: false,
      timeout: 30_000
    },
    {
      command: "npx vite --port 5174",
      cwd: __dirname,
      port: 5174,
      env: { VITE_PROXY_TARGET: "http://localhost:4001" },
      reuseExistingServer: false,
      timeout: 30_000
    }
  ]
});
