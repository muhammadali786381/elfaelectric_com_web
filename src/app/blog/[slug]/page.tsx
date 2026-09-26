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
                    className="group block relative w-full h-[320px] rounded-[16px] overflow-hidden"
                  >
                    <Image
                      src={relatedPost.imageUrl}
                      alt={relatedPost.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/20" />
                    
                    <div className="absolute top-6 left-6 z-10">
                      <span className="inline-flex px-2 py-1 bg-white text-black text-[10px] font-bold uppercase tracking-wide rounded-sm">
                        {relCat}
                      </span>
                    </div>

                    <div className="absolute inset-0 p-6 flex flex-col justify-end z-10">
                      <h3 className="font-montserrat text-[14px] sm:text-[16px] font-bold leading-snug text-white mb-2 line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      <p className="text-white/55 text-[12px] font-roboto font-medium">
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
