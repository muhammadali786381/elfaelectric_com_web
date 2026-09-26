import {
  BLOG_PER_PAGE,
  BLOG_REVALIDATE_SECONDS,
  type BlogListResult,
  type BlogPost,
  type BlogPostCard,
} from "./types";

const WP_API_BASE =
  process.env.WORDPRESS_API_URL ?? "https://elfaelectric.com/wp-json/wp/v2";

const FALLBACK_IMAGE = "/assets/images/blog-hero-bg.jpg";

type WpRendered = { rendered: string };

type WpMediaSize = { source_url?: string };
type WpMediaDetails = {
  sizes?: {
    large?: WpMediaSize;
    medium_large?: WpMediaSize;
    medium?: WpMediaSize;
    full?: WpMediaSize;
  };
};

type WpEmbeddedMedia = {
  source_url?: string;
  media_details?: WpMediaDetails;
  alt_text?: string;
};

type WpTerm = { name: string; taxonomy: string };

type WpPost = {
  id: number;
  slug: string;
  date: string;
  link: string;
  title: WpRendered;
  excerpt: WpRendered;
  content?: WpRendered;
  _embedded?: {
    "wp:featuredmedia"?: WpEmbeddedMedia[];
    "wp:term"?: WpTerm[][];
  };
};

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#8211;/gi, "-")
    .replace(/&#8212;/gi, "-")
    .replace(/&#8216;/gi, "'")
    .replace(/&#8217;/gi, "'")
    .replace(/&#8220;/gi, '"')
    .replace(/&#8221;/gi, '"')
    .replace(/&#8230;/gi, "...")
    .replace(/&hellip;/gi, "...")
    .replace(/&#\d+;/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function formatDisplayDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "Asia/Karachi",
  });
}

function pickFeaturedImage(post: WpPost): string {
  const media = post._embedded?.["wp:featuredmedia"]?.[0];
  if (!media) return FALLBACK_IMAGE;
  const sizes = media.media_details?.sizes;
  return (
    sizes?.large?.source_url ||
    sizes?.medium_large?.source_url ||
    sizes?.medium?.source_url ||
    sizes?.full?.source_url ||
    media.source_url ||
    FALLBACK_IMAGE
  );
}

function pickCategory(post: WpPost): string {
  const terms = post._embedded?.["wp:term"]?.[0] ?? [];
  const category = terms.find((t) => t.taxonomy === "category");
  if (category?.name) return category.name;
  return "EV Guide";
}

function toCard(post: WpPost): BlogPostCard {
  return {
    id: post.id,
    slug: post.slug,
    title: stripHtml(post.title.rendered),
    excerpt: stripHtml(post.excerpt.rendered),
    date: formatDisplayDate(post.date),
    dateISO: post.date,
    imageUrl: pickFeaturedImage(post),
    href: `/blog/${post.slug}`,
    category: pickCategory(post),
  };
}

function toPost(post: WpPost): BlogPost {
  return {
    ...toCard(post),
    contentHtml: post.content?.rendered ?? "",
  };
}

async function wpFetch(path: string, init?: RequestInit): Promise<Response> {
  const url = `${WP_API_BASE}${path}`;
  return fetch(url, {
    ...init,
    next: { revalidate: BLOG_REVALIDATE_SECONDS },
    headers: {
      Accept: "application/json",
      ...(init?.headers ?? {}),
    },
  });
}

export async function getBlogPosts(
  page = 1,
  perPage = BLOG_PER_PAGE,
): Promise<BlogListResult> {
  const safePage = Math.max(1, page);
  const safePerPage = Math.min(100, Math.max(1, perPage));

  const res = await wpFetch(
    `/posts?per_page=${safePerPage}&page=${safePage}&_embed=1&status=publish`,
  );

  if (!res.ok) {
    throw new Error(`WordPress posts fetch failed: ${res.status}`);
  }

  const data = (await res.json()) as WpPost[];
  const total = Number(res.headers.get("X-WP-Total") ?? data.length);
  const totalPages = Number(
    res.headers.get("X-WP-TotalPages") ??
      Math.max(1, Math.ceil(total / safePerPage)),
  );

  return {
    posts: data.map(toCard),
    page: safePage,
    perPage: safePerPage,
    total,
    totalPages,
  };
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const res = await wpFetch(
    `/posts?slug=${encodeURIComponent(slug)}&_embed=1&status=publish`,
  );

  if (!res.ok) {
    throw new Error(`WordPress post fetch failed: ${res.status}`);
  }

  const data = (await res.json()) as WpPost[];
  if (!data.length) return null;
  return toPost(data[0]);
}

export async function getAllBlogSlugs(): Promise<string[]> {
  const slugs: string[] = [];
  let page = 1;
  let totalPages = 1;

  while (page <= totalPages) {
    const res = await wpFetch(
      `/posts?per_page=100&page=${page}&_fields=slug&status=publish`,
    );
    if (!res.ok) break;
    totalPages = Number(res.headers.get("X-WP-TotalPages") ?? 1);
    const data = (await res.json()) as { slug: string }[];
    slugs.push(...data.map((p) => p.slug));
    page += 1;
  }

  return slugs;
}
