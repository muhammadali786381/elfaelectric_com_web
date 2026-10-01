import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar } from "lucide-react";
import FlipButton from "@/components/ui/FlipButton";
import { getAllBlogSlugs, getBlogPostBySlug, getBlogPosts } from "@/lib/blog/wordpress";

/** ISR: refresh post HTML every 1 hour */
export const revalidate = 3600;
export const dynamicParams = true;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  try {
    const slugs = await getAllBlogSlugs();
    return slugs.map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug).catch(() => null);
  if (!post) return { title: "Blog | ELFA Electric" };

  return {
    title: `${post.title} | ELFA Electric`,
    description: post.excerpt.slice(0, 160),
    openGraph: {
      title: post.title,
      description: post.excerpt.slice(0, 160),
      images: post.imageUrl ? [{ url: post.imageUrl }] : undefined,
      type: "article",
      publishedTime: post.dateISO,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug).catch(() => null);
  if (!post) notFound();

  // Fetch some posts for "More Articles"
  const { posts: recentPosts } = await getBlogPosts(1, 3);
  const relatedPosts = recentPosts.filter(p => p.id !== post.id).slice(0, 2);

  // Helper for category (since WP doesn't have it natively in our types)
  const cats = ["EV Guide", "Charging", "Maintenance", "Ownership"];
  const category = cats[post.id % cats.length];

  return (
    <main className="flex-1 bg-[#050505] text-white">
      
      {/* Full Width Hero Image */}
      {post.imageUrl && (
        <div className="relative w-full h-[50vh] sm:h-[60vh] lg:h-[70vh] max-h-[800px] overflow-hidden">
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/50" />
          {/* Navbar height (80px) + 20px so white nav/CTAs stay readable */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-[100px] bg-gradient-to-b from-black via-black/85 to-transparent"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/95" />
        </div>
      )}

      <article className="mx-auto w-full max-w-[900px] px-4 sm:px-6 relative z-10 -mt-20 sm:-mt-32 pb-24">
        <header className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <span className="inline-flex px-3 py-1 rounded-sm bg-white text-black text-[11px] font-bold uppercase tracking-wide">
              {category}
            </span>
            <div className="flex items-center gap-2 text-[13px] text-white/60 font-roboto font-medium">
              <Calendar className="h-4 w-4" />
              <time dateTime={post.dateISO}>{post.date}</time>
            </div>
          </div>
          
          <h1 className="font-montserrat text-[32px] sm:text-[44px] lg:text-[56px] font-black leading-tight text-white mb-8">
            {post.title}
          </h1>

          <div className="w-full h-px bg-white/10" />
        </header>

        <div
          className="blog-content font-roboto prose prose-invert prose-neutral max-w-none text-[16px] sm:text-[18px] leading-[1.8] text-white/80 [&_a]:text-brand-primary hover:[&_a]:text-white [&_a]:transition-colors [&_h2]:font-montserrat [&_h2]:mt-12 [&_h2]:mb-6 [&_h2]:text-[28px] [&_h2]:font-bold [&_h2]:text-white [&_h3]:font-montserrat [&_h3]:mt-8 [&_h3]:mb-4 [&_h3]:text-[22px] [&_h3]:font-bold [&_h3]:text-white [&_img]:rounded-[16px] [&_img]:my-10 [&_p]:mb-6 [&_strong]:text-white [&_strong]:font-bold [&_blockquote]:border-l-brand-primary [&_blockquote]:bg-white/5 [&_blockquote]:p-6 [&_blockquote]:rounded-r-xl [&_blockquote]:not-italic"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
      </article>

      {/* More Articles Section */}
      {relatedPosts.length > 0 && (
        <section className="w-full bg-[#050505] border-t border-white/10 py-24">
          <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6">
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-12">
              <h2 className="font-montserrat text-[32px] sm:text-[40px] font-black uppercase tracking-tight text-white leading-none">
                More Articles
              </h2>
              <FlipButton
                href="/blog"
                variant="outline"
                className="h-[40px] rounded-none px-6 text-[11px] font-bold tracking-widest"
              >
                View All Articles
              </FlipButton>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedPosts.map((relatedPost) => {
                const relCat = cats[relatedPost.id % cats.length];
                return (
                  <Link
                    key={relatedPost.id}
                    href={relatedPost.href}
                    className="group flex flex-col w-full cursor-pointer overflow-hidden rounded-[16px] bg-[#050505] border border-white/5 hover:border-white/10 transition-colors"
                  >
                    <div className="relative aspect-[1024/536] w-full overflow-hidden shrink-0 border-b border-white/10 bg-[#050505]">
                      <Image
                        src={relatedPost.imageUrl}
                        alt={relatedPost.title}
                        fill
                        className="object-contain transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                        sizes="(min-width: 768px) 50vw, 100vw"
                      />
                      
                      {/* Hover Overlay */}
                      <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-[#050505] via-[#050505]/95 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] flex flex-col justify-end p-5 sm:p-6 z-10">
                        <div className="transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100 flex flex-col justify-end">
                          <p className="font-roboto text-[12px] sm:text-[13px] text-white/80 line-clamp-4">
                            {relatedPost.excerpt}
                          </p>
                        </div>
                      </div>

                      <span className="absolute left-5 top-5 z-20 inline-flex rounded-md bg-white px-2.5 py-1 font-roboto text-[11px] font-semibold tracking-[0.02em] text-black sm:left-6 sm:top-6">
                        {relCat}
                      </span>
                    </div>

                    <div className="p-5 sm:p-6 flex-1 flex flex-col justify-start relative z-0">
                      <h3 className="font-montserrat text-[14px] font-semibold leading-snug tracking-[-0.01em] text-white sm:text-[16px] group-hover:text-brand-primary transition-colors">
                        {relatedPost.title}
                      </h3>
                      <p className="font-roboto mt-2 text-[12px] font-normal text-white/55">
                        {relatedPost.date}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

    </main>
  );
}
