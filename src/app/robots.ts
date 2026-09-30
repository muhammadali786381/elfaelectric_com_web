import type { MetadataRoute } from "next";

const SITE = "https://elfaelectric.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/cart", "/checkout", "/login"],
    },
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}
