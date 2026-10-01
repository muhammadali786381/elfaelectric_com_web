import { prisma } from "../src/lib/db";

/**
 * Optional DB seed — no default coupons or admins.
 * Create coupons in /admin/coupons.
 * Create admins with: npm run admin:create -- --email ... --password ...
 */
async function main() {
  console.log("Seed is a no-op (no static coupons/admins).");
  console.log("  Coupons → /admin/coupons");
  console.log("  Admins  → npm run admin:create -- --email ... --password ...");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
