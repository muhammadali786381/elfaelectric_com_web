import type { Metadata } from "next";
import Image from "next/image";
import { FadeIn } from "@/components/motion/FadeIn";
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
      {/* Standardized Blog Hero */}
      <section className="relative flex min-h-[55dvh] items-end justify-center overflow-hidden pb-16 pt-32 lg:min-h-[60dvh] lg:pb-24 lg:pt-40">
        <Image
          src="/assets/images/hero4.jpeg"
          alt="Blog Hero Background"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/90 via-[#050505]/60 to-[#050505]" />

        <div className="relative z-10 w-full max-w-[1200px] px-4 text-center sm:px-6 lg:px-8 mt-10">
          <FadeIn variant="fadeInUp" speed="slow">
            <h1 className="font-montserrat mb-4 text-[56px] font-black italic uppercase leading-[0.9] tracking-tighter text-white sm:text-[72px] lg:text-[92px]">
              Automotive <span className="text-brand-primary">Insights</span>
            </h1>
            <p className="font-roboto mx-auto max-w-2xl text-[16px] font-medium leading-relaxed text-white/70 sm:text-[20px]">
              Insights, stories, and trends from the world of electric mobility
            </p>
          </FadeIn>
        </div>
      </section>

      <div className="pt-8 sm:pt-12">

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
      </div>
    </main>
  );
}
