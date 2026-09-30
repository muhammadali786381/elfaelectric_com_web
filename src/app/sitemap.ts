import type { MetadataRoute } from "next";
import { getAllPurchaseSlugs } from "@/data/products/purchase-index";
import { getAllBlogSlugs } from "@/lib/blog/wordpress";

const SITE = "https://elfaelectric.com";

/** Utility routes — not for search indexes */
const EXCLUDED = new Set(["/cart", "/checkout", "/login"]);

type Entry = {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
};

const STATIC_ROUTES: Entry[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/ev-125", priority: 0.9, changeFrequency: "weekly" },
  { path: "/scooty-ev-1", priority: 0.9, changeFrequency: "weekly" },
  { path: "/shop", priority: 0.9, changeFrequency: "weekly" },
  { path: "/electric-bike-prices", priority: 0.9, changeFrequency: "weekly" },
  { path: "/product/elfaev125", priority: 0.9, changeFrequency: "weekly" },
  { path: "/product/ev1-scooty", priority: 0.9, changeFrequency: "weekly" },
  { path: "/pave-scheme", priority: 0.8, changeFrequency: "monthly" },
  { path: "/financing-partners", priority: 0.8, changeFrequency: "monthly" },
  { path: "/installment-plans", priority: 0.8, changeFrequency: "monthly" },
  { path: "/scooty-instalment", priority: 0.8, changeFrequency: "monthly" },
  { path: "/about-us", priority: 0.7, changeFrequency: "monthly" },
  { path: "/our-locations", priority: 0.7, changeFrequency: "weekly" },
  { path: "/contact-us", priority: 0.7, changeFrequency: "monthly" },
  { path: "/book-a-test-ride", priority: 0.7, changeFrequency: "monthly" },
  { path: "/blog", priority: 0.7, changeFrequency: "daily" },
  { path: "/newsroom", priority: 0.6, changeFrequency: "weekly" },
  { path: "/faqs", priority: 0.6, changeFrequency: "monthly" },
  { path: "/ev-education", priority: 0.6, changeFrequency: "monthly" },
  { path: "/video-testimonials", priority: 0.5, changeFrequency: "monthly" },
  { path: "/referral", priority: 0.5, changeFrequency: "monthly" },
  { path: "/certified-mechanics", priority: 0.5, changeFrequency: "monthly" },
  { path: "/privacy-policy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/consent-policy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/return-and-exchange-policy", priority: 0.3, changeFrequency: "yearly" },
];

function toUrl(path: string) {
  return path === "/" ? `${SITE}/` : `${SITE}${path}`;
}

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.filter(
    (r) => !EXCLUDED.has(r.path),
  ).map((r) => ({
    url: toUrl(r.path),
    lastModified,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  const productEntries: MetadataRoute.Sitemap = getAllPurchaseSlugs()
    .map((slug) => `/product/${slug}`)
    .filter((path) => !STATIC_ROUTES.some((r) => r.path === path))
    .map((path) => ({
      url: toUrl(path),
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

  let blogEntries: MetadataRoute.Sitemap = [];
  try {
    const slugs = await getAllBlogSlugs();
    blogEntries = slugs.map((slug) => ({
      url: toUrl(`/blog/${slug}`),
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));
  } catch {
    blogEntries = [];
  }

  return [...staticEntries, ...productEntries, ...blogEntries];
}
