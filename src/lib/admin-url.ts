/**
 * Safe post-login redirect helpers — prevent open redirects.
 */

export function sanitizeAdminCallbackUrl(
  raw: string | null | undefined,
  fallback = "/admin",
): string {
  if (!raw) return fallback;

  let candidate = raw.trim();
  try {
    candidate = decodeURIComponent(candidate);
  } catch {
    return fallback;
  }

  // Absolute URLs, protocol-relative, backslashes, or encoded tricks
  if (
    !candidate.startsWith("/") ||
    candidate.startsWith("//") ||
    candidate.includes("://") ||
    candidate.includes("\\") ||
    candidate.includes("@")
  ) {
    return fallback;
  }

  // Must stay under /admin (not /administrator phishing path alone is ok,
  // but require exact prefix `/admin` or `/admin/...`)
  if (candidate !== "/admin" && !candidate.startsWith("/admin/")) {
    return fallback;
  }

  // Block path traversal segments
  if (candidate.split("/").some((part) => part === ".." || part === ".")) {
    return fallback;
  }

  return candidate;
}
