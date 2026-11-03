import { execSync } from "node:child_process";
import { existsSync, rmSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const apiRoot = path.resolve(__dirname, "../../api");
const dbPath = path.join(apiRoot, "prisma", "e2e.db");
const dbUrl = `file:${dbPath}`;

export default async function globalSetup() {
  for (const suffix of ["", "-journal", "-wal", "-shm"]) {
    const file = dbPath + suffix;
    if (existsSync(file)) rmSync(file);
  }

  const env = { ...process.env, DATABASE_URL: dbUrl, DATABASE_PROVIDER: "sqlite" };
  execSync("npx prisma migrate deploy --schema prisma/schema.prisma", { cwd: apiRoot, env, stdio: "inherit" });
  execSync("npx tsx prisma/seed.ts", { cwd: apiRoot, env, stdio: "inherit" });
}
