/**
 * One-shot: create WebhookEndpoint via IPv4 local pool (Prisma CLI may fail on IPv6).
 * Usage: npx tsx --env-file=.env scripts/push-webhooks-table.ts
 */
import { createRequire } from "node:module";
import { join } from "node:path";

const require = createRequire(import.meta.url);
const { createPool } = require(
  join(process.cwd(), "src/lib/db/pool.local.cjs"),
) as { createPool: (opts: object) => import("pg").Pool };

async function main() {
  const pool = createPool({});
  try {
    await pool.query(`
DO $$ BEGIN
  CREATE TYPE "WebhookEvent" AS ENUM ('ORDER_CREATED');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
`);
    await pool.query(`
CREATE TABLE IF NOT EXISTS "WebhookEndpoint" (
  "id" TEXT NOT NULL,
  "url" TEXT NOT NULL,
  "label" TEXT NOT NULL DEFAULT '',
  "event" "WebhookEvent" NOT NULL DEFAULT 'ORDER_CREATED',
  "enabled" BOOLEAN NOT NULL DEFAULT true,
  "lastStatus" TEXT,
  "lastError" TEXT NOT NULL DEFAULT '',
  "lastDeliveredAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "WebhookEndpoint_pkey" PRIMARY KEY ("id")
);
`);
    await pool.query(`
CREATE INDEX IF NOT EXISTS "WebhookEndpoint_enabled_event_idx"
  ON "WebhookEndpoint"("enabled", "event");
`);
    console.log("WebhookEndpoint table ready");
  } finally {
    await pool.end();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
