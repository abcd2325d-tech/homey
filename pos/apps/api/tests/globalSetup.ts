import { execSync } from "node:child_process";
import { existsSync, rmSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const apiRoot = path.resolve(here, "..");
export const TEST_DB_PATH = path.join(here, "test.db");
export const TEST_DB_URL = `file:${TEST_DB_PATH}`;

// Runs once before the whole test suite, in its own process: builds a fresh
// SQLite test database from the current schema so integration tests run
// against real migrations rather than a hand-rolled fixture DB.
export default async function globalSetup() {
  for (const suffix of ["", "-journal", "-wal", "-shm"]) {
    const file = TEST_DB_PATH + suffix;
    if (existsSync(file)) rmSync(file);
  }

  execSync("npx prisma migrate deploy --schema prisma/schema.prisma", {
    cwd: apiRoot,
    env: { ...process.env, DATABASE_URL: TEST_DB_URL },
    stdio: "inherit"
  });
}
