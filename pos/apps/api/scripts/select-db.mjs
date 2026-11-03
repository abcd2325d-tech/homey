// Copies the right datasource-specific Prisma schema into prisma/schema.prisma
// before generate/migrate, based on DATABASE_PROVIDER ("sqlite" | "postgresql").
// Prisma's `datasource` provider can't be set from an env var, so this is the
// standard workaround for "one schema, two databases".
import { copyFileSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { config } from "dotenv";

const here = dirname(fileURLToPath(import.meta.url));
const apiRoot = resolve(here, "..");

config({ path: resolve(apiRoot, ".env") });

const provider = (process.env.DATABASE_PROVIDER || "sqlite").toLowerCase();
if (provider !== "sqlite" && provider !== "postgresql") {
  console.error(`Unknown DATABASE_PROVIDER "${provider}". Use "sqlite" or "postgresql".`);
  process.exit(1);
}

const source = resolve(apiRoot, "prisma", `schema.${provider}.prisma`);
const dest = resolve(apiRoot, "prisma", "schema.prisma");

if (!existsSync(source)) {
  console.error(`Missing schema file: ${source}`);
  process.exit(1);
}

copyFileSync(source, dest);
console.log(`[select-db] Using ${provider} -> prisma/schema.prisma`);
