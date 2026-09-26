import type { Metadata } from "next";
import SecondaryHero from "@/components/sections/SecondaryHero";
import BlogPostsGrid from "@/components/blog/BlogPostsGrid";
import { BLOG_PER_PAGE } from "@/lib/blog/types";
import { getBlogPosts } from "@/lib/blog/wordpress";

/** ISR: refresh blog listing HTML every 1 hour */
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "ELFA Electric Blog | News, Tips, Insights on EVs in Pakistan",
  description:
    "Insights, stories, and trends from the world of electric mobility in Pakistan.",
};

export default async function BlogPage() {
  let posts: Awaited<ReturnType<typeof getBlogPosts>>["posts"] = [];
  let totalPages = 1;

  try {
    const result = await getBlogPosts(1, BLOG_PER_PAGE);
    posts = result.posts;
    totalPages = result.totalPages;
  } catch (error) {
    console.error("[blog] Failed to fetch posts:", error);
  }

  return (
    <main className="flex-1 bg-[#050505]">
      <SecondaryHero
        layout="split"
        titleLine1="Automotive"
        titleLine2="Insights & Tips"
        description="Insights, stories, and trends from the world of electric mobility."
      />

      {posts.length > 0 ? (
        <BlogPostsGrid
          initialPosts={posts}
          initialPage={1}
          totalPages={totalPages}
        />
      ) : (
        <p className="font-roboto mx-auto max-w-[1200px] px-4 py-20 text-center text-[15px] text-white/60 sm:px-6">
          Blog posts are temporarily unavailable. Please check back soon.
        </p>
      )}
    </main>
  );
}
