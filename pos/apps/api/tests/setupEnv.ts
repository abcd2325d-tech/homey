import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));

// Must run before anything imports src/lib/env.ts (which loads dotenv and
// would otherwise point the Prisma client at the dev database).
process.env.DATABASE_URL = `file:${path.join(here, "test.db")}`;
process.env.DATABASE_PROVIDER = "sqlite";
process.env.NODE_ENV = "test";
