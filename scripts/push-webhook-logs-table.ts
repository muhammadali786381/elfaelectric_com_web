/**
 * One-shot: create WebhookDeliveryLog via IPv4 local pool.
 * Usage: npx tsx --env-file=.env scripts/push-webhook-logs-table.ts
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
CREATE TABLE IF NOT EXISTS "WebhookDeliveryLog" (
  "id" TEXT NOT NULL,
  "orderId" TEXT NOT NULL,
  "endpointId" TEXT,
  "endpointUrl" TEXT NOT NULL,
  "endpointLabel" TEXT NOT NULL DEFAULT '',
  "event" "WebhookEvent" NOT NULL,
  "success" BOOLEAN NOT NULL,
  "httpStatus" INTEGER,
  "error" TEXT NOT NULL DEFAULT '',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "WebhookDeliveryLog_pkey" PRIMARY KEY ("id")
);
`);
    await pool.query(`
DO $$ BEGIN
  ALTER TABLE "WebhookDeliveryLog"
    ADD CONSTRAINT "WebhookDeliveryLog_endpointId_fkey"
    FOREIGN KEY ("endpointId") REFERENCES "WebhookEndpoint"("id")
    ON DELETE SET NULL ON UPDATE CASCADE;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
`);
    await pool.query(
      `CREATE INDEX IF NOT EXISTS "WebhookDeliveryLog_orderId_idx" ON "WebhookDeliveryLog"("orderId");`,
    );
    await pool.query(
      `CREATE INDEX IF NOT EXISTS "WebhookDeliveryLog_createdAt_idx" ON "WebhookDeliveryLog"("createdAt");`,
    );
    await pool.query(
      `CREATE INDEX IF NOT EXISTS "WebhookDeliveryLog_success_idx" ON "WebhookDeliveryLog"("success");`,
    );
    await pool.query(
      `CREATE INDEX IF NOT EXISTS "WebhookDeliveryLog_endpointId_idx" ON "WebhookDeliveryLog"("endpointId");`,
    );
    console.log("WebhookDeliveryLog table ready");
  } finally {
    await pool.end();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
