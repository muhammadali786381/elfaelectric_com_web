/**
 * One-shot admin upsert for local/production.
 *
 * Usage:
 *   npm run admin:create -- --email you@example.com --password 'StrongPass!' --name "Ops Admin"
 *
 * Options:
 *   --email       required
 *   --password    required (min 12 chars)
 *   --name        optional (default: "ELFA Admin")
 */
import bcrypt from "bcryptjs";
import { prisma } from "../src/lib/db";

function argValue(flag: string): string | undefined {
  const idx = process.argv.indexOf(flag);
  if (idx === -1) return undefined;
  return process.argv[idx + 1];
}

function usage(): never {
  console.error(`
Usage:
  npm run admin:create -- --email <email> --password <password> [--name "Display Name"]

Example:
  npm run admin:create -- --email admindigi@gmail.com --password 'YourStrongPass!' --name "DIGI Admin"
`);
  process.exit(1);
}

async function main() {
  const emailRaw = argValue("--email");
  const password = argValue("--password");
  const name = argValue("--name")?.trim() || "ELFA Admin";

  if (!emailRaw || !password) usage();

  const email = emailRaw.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    console.error("Invalid --email");
    process.exit(1);
  }
  if (password.length < 12) {
    console.error("Password must be at least 12 characters.");
    process.exit(1);
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const user = await prisma.adminUser.upsert({
    where: { email },
    update: { passwordHash, name },
    create: { email, passwordHash, name },
  });

  console.log(`Admin ready: ${user.email} (${user.name}) id=${user.id}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
