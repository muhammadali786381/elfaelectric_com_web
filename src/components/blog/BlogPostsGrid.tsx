"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/motion/FadeIn";
import FlipButton from "@/components/ui/FlipButton";
import type { BlogListResult, BlogPostCard } from "@/lib/blog/types";

type Props = {
  initialPosts: BlogPostCard[];
  initialPage: number;
  totalPages: number;
};

/** Mock tabs for UI — wire to WP categories later */
const MOCK_CATEGORIES = [
  "All",
  "Safety Tips",
  "Financing",
  "Industry News",
  "Maintenance Tips",
  "Buyer's Guide",
] as const;

const MOCK_TAGS = MOCK_CATEGORIES.slice(1);

function mockCategoryForPost(post: BlogPostCard): string {
  return MOCK_TAGS[post.id % MOCK_TAGS.length];
}

export default function BlogPostsGrid({
  initialPosts,
  initialPage,
  totalPages,
}: Props) {
  const [posts, setPosts] = useState(initialPosts);
  const [page, setPage] = useState(initialPage);
  const [hasMore, setHasMore] = useState(initialPage < totalPages);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const loadMore = async () => {
    if (isLoading || !hasMore) return;
    setError(null);
    setIsLoading(true);

    try {
      const nextPage = page + 1;
      const res = await fetch(`/api/blogs?page=${nextPage}&perPage=12`);
      if (!res.ok) throw new Error("Failed to load more posts");

      const data = (await res.json()) as BlogListResult;
      setPosts((prev) => {
        const seen = new Set(prev.map((p) => p.id));
        const next = data.posts.filter((p) => !seen.has(p.id));
        return [...prev, ...next];
      });
      setPage(data.page);
      setHasMore(data.page < data.totalPages);
    } catch {
      setError("Could not load more posts. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const filteredPosts = useMemo(() => {
    if (activeCategory === "All") return posts;
    return posts.filter((post) => mockCategoryForPost(post) === activeCategory);
  }, [posts, activeCategory]);

  const featuredPost = filteredPosts[0] ?? null;
  const gridPosts = filteredPosts.slice(1);

  return (
    <div className="w-full bg-[#050505] text-white">
      <div className="mx-auto w-full max-w-[1200px] px-4 pb-24 pt-6 sm:px-6 sm:pb-28 sm:pt-8">
        {/* Featured */}
        {featuredPost && (
          <FadeIn variant="fadeInUp" speed="slow" className="mb-16 sm:mb-20 lg:mb-24">
            <Link
              href={featuredPost.href}
              className="group flex flex-col w-full cursor-pointer overflow-hidden rounded-[20px] bg-[#050505] border border-white/5 hover:border-white/10 transition-colors"
            >
              <div className="relative h-[360px] w-full overflow-hidden shrink-0 sm:h-[440px] lg:h-[520px] border-b border-white/10">
                <Image
                  src={featuredPost.imageUrl}
                  alt={featuredPost.title}
                  fill
                  priority
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  sizes="(min-width: 1200px) 1200px, 100vw"
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-[#050505] via-[#050505]/95 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] flex flex-col justify-end p-6 sm:p-8 lg:p-10 z-10">
                  <div className="transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100 flex flex-col justify-end">
                    <p className="font-roboto text-[14px] sm:text-[15px] text-white/80 line-clamp-4">
                      {featuredPost.excerpt}
                    </p>
                  </div>
                </div>

                <span className="absolute left-6 top-6 z-20 inline-flex rounded-md bg-white px-2.5 py-1 font-roboto text-[11px] font-semibold tracking-[0.02em] text-black sm:left-8 sm:top-8">
                  {mockCategoryForPost(featuredPost)}
                </span>
              </div>

              {/* Title Container (Bottom) */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-start relative z-0">
                <h2 className="font-montserrat text-[18px] font-semibold leading-[1.2] tracking-[-0.02em] text-white sm:text-[24px] lg:text-[28px] group-hover:text-brand-primary transition-colors">
                  {featuredPost.title}
                </h2>
                <p className="font-roboto mt-2.5 text-[12px] font-normal text-white/60 sm:text-[13px]">
                  {featuredPost.date}
                </p>
              </div>
            </Link>
          </FadeIn>
        )}

        {/* Section header + mock category tabs */}
        <FadeIn
          variant="fadeInUp"
          speed="normal"
          className="mb-10 flex flex-col gap-6 lg:mb-12 lg:flex-row lg:items-end lg:justify-between"
        >
          <h2 className="font-anton text-[32px] uppercase leading-[0.95] tracking-[0.02em] text-white sm:text-[40px] lg:text-[48px]">
            Our Latest
            <br />
            News & Article
          </h2>
          <nav
            aria-label="Blog categories"
            className="flex flex-wrap items-center gap-x-5 gap-y-2 lg:gap-x-7"
          >
            {MOCK_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`font-roboto cursor-pointer whitespace-nowrap border-b pb-1 text-[13px] font-medium transition-colors duration-200 ${
                    isActive
                      ? "border-white text-white"
                      : "border-transparent text-white/45 hover:text-white/80"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </nav>
        </FadeIn>

        {/* Overlay cards — full-bleed image, badge top-left, title + date bottom */}
        {gridPosts.length > 0 && (
          <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2">
            {gridPosts.map((post, i) => {
              const tag = mockCategoryForPost(post);
              return (
                <FadeIn
                  key={post.id}
                  variant="fadeInUp"
                  speed="normal"
                  delay={Math.min(i * 0.05, 0.2)}
                >
                  <Link
                    href={post.href}
                    className="group flex flex-col w-full cursor-pointer overflow-hidden rounded-[16px] bg-[#050505] border border-white/5 hover:border-white/10 transition-colors"
                  >
                    <div className="relative aspect-[16/11] w-full overflow-hidden shrink-0 border-b border-white/10">
                      <Image
                        src={post.imageUrl}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                        sizes="(min-width: 768px) 50vw, 100vw"
                      />
                      
                      {/* Hover Overlay */}
                      <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-[#050505] via-[#050505]/95 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] flex flex-col justify-end p-5 sm:p-6 z-10">
                        <div className="transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100 flex flex-col justify-end">
                          <p className="font-roboto text-[12px] sm:text-[13px] text-white/80 line-clamp-4">
                            {post.excerpt}
                          </p>
                        </div>
                      </div>

                      <span className="absolute left-5 top-5 z-20 inline-flex rounded-md bg-white px-2.5 py-1 font-roboto text-[11px] font-semibold tracking-[0.02em] text-black sm:left-6 sm:top-6">
                        {tag}
                      </span>
                    </div>

                    <div className="p-5 sm:p-6 flex-1 flex flex-col justify-start relative z-0">
                      <h3 className="font-montserrat text-[14px] font-semibold leading-snug tracking-[-0.01em] text-white sm:text-[16px] group-hover:text-brand-primary transition-colors">
                        {post.title}
                      </h3>
                      <p className="font-roboto mt-2 text-[12px] font-normal text-white/55">
                        {post.date}
                      </p>
                    </div>
                  </Link>
                </FadeIn>
              );
            })}
          </div>
        )}

        {filteredPosts.length === 0 && (
          <div className="py-20 text-center">
            <p className="font-roboto text-[16px] text-white/50">
              No articles found in this category.
            </p>
          </div>
        )}

        {error && (
          <p className="font-roboto mt-8 text-center text-[14px] text-red-400">
            {error}
          </p>
        )}

        {hasMore && activeCategory === "All" && (
          <div className="mt-14 flex justify-center sm:mt-16">
            <FlipButton
              type="button"
              onClick={loadMore}
              disabled={isLoading}
              variant="outline"
              className="font-roboto h-12 min-w-[140px] text-[13px] font-semibold tracking-[0.12em] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? "Loading..." : "Load More"}
            </FlipButton>
          </div>
        )}
      </div>
    </div>
  );
}
