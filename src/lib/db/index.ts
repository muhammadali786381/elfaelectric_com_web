import { existsSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const require = createRequire(import.meta.url);
const dir = dirname(fileURLToPath(import.meta.url));

type LocalPoolModule = {
  createPool: (defaults: ConstructorParameters<typeof Pool>[0]) => Pool;
};

function tryCreateLocalPool(): Pool | null {
  const localPath = join(dir, "pool.local.cjs");
  if (!existsSync(localPath)) return null;

  // Absolute path + turbopackIgnore: optional machine-only file (gitignored).
  // Other environments never have this file and use the standard Pool below.
  const local = require(
    /* turbopackIgnore: true */ localPath,
  ) as LocalPoolModule;
  return local.createPool({});
}

function createPgPool() {
  const local = tryCreateLocalPool();
  if (local) return local;

  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not set");
  }

  const needsSsl =
    connectionString.includes("sslmode=require") ||
    process.env.NODE_ENV === "production";

  // Prefer verified TLS. Set DATABASE_SSL_INSECURE=1 only as a temporary escape hatch.
  const insecure = process.env.DATABASE_SSL_INSECURE === "1";

  return new Pool({
    connectionString,
    ssl: needsSsl
      ? { rejectUnauthorized: !insecure }
      : undefined,
  });
}

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
  pgPool?: Pool;
};

function createPrismaClient() {
  const pool = globalForPrisma.pgPool ?? createPgPool();
  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.pgPool = pool;
  }

  const adapter = new PrismaPg(pool);
  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
