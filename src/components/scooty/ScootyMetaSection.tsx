"use client";

import { useRef, useState } from "react";
import { motion } from "motion/react";
import { Play, ChevronLeft, ChevronRight, TrendingUp } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

const META_POSTS = [
  {
    id: 1,
    platform: "Facebook",
    views: "2.1M Views",
    likes: "18.4K",
    label: "EV-1 City Commute — Zero Traffic Stress",
    thumbnail: "/assets/images/gallery/meta-thumb-1.jpg",
    fallbackBg: "from-[#1877f2]/20 to-[#050505]",
    icon: "📱",
  },
  {
    id: 2,
    platform: "Instagram Reels",
    views: "1.4M Views",
    likes: "22.1K",
    label: "Scooty EV-1 — The Urban Classic",
    thumbnail: "/assets/images/gallery/meta-thumb-2.jpg",
    fallbackBg: "from-[#e1306c]/20 to-[#050505]",
    icon: "🎬",
  },
  {
    id: 3,
    platform: "Facebook",
    views: "980K Views",
    likes: "9.7K",
    label: "EV-1 vs Fuel — Real Cost Savings",
    thumbnail: "/assets/images/gallery/meta-thumb-3.jpg",
    fallbackBg: "from-[#1877f2]/20 to-[#050505]",
    icon: "💡",
  },
  {
    id: 4,
    platform: "Instagram",
    views: "730K Views",
    likes: "14.3K",
    label: "60Km/h Top Speed — Feel the Difference",
    thumbnail: "/assets/images/gallery/meta-thumb-4.jpg",
    fallbackBg: "from-[#e1306c]/20 to-[#050505]",
    icon: "⚡",
  },
];

function MetaCard({ post }: { post: typeof META_POSTS[0] }) {
  return (
    <div className="relative shrink-0 w-[280px] sm:w-[320px] overflow-hidden rounded-[4px] border border-white/10 bg-[#111] group cursor-pointer select-none">
      {/* Gradient bg thumbnail placeholder */}
      <div className={`relative h-[200px] sm:h-[220px] w-full bg-gradient-to-b ${post.fallbackBg} flex items-center justify-center`}>
        <div className="absolute inset-0 bg-black/40" />
        {/* Play button overlay */}
        <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm transition-all duration-300 group-hover:border-brand-primary/50 group-hover:bg-brand-primary/20">
          <Play className="h-5 w-5 fill-white text-white ml-0.5" />
        </div>
        {/* Platform badge */}
        <span className="absolute top-3 left-3 font-roboto text-[10px] font-bold uppercase tracking-widest text-white/60">
          {post.platform}
        </span>
        {/* Views */}
        <span className="absolute top-3 right-3 font-montserrat text-[11px] font-bold text-white/80">
          {post.views}
        </span>
      </div>
      {/* Content */}
      <div className="p-4">
        <p className="font-montserrat text-[14px] font-bold leading-tight text-white group-hover:text-brand-primary transition-colors duration-300">
          {post.label}
        </p>
        <p className="font-roboto mt-2 text-[12px] text-white/40">
          {post.likes} Likes
        </p>
      </div>
    </div>
  );
}

export default function ScootyMetaSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 340;
    scrollRef.current.scrollBy({ left: dir === "right" ? amount : -amount, behavior: "smooth" });
  };

  const onScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
  };

  return (
    <section className="bg-[#050505] py-20 lg:py-28">
      <div className="mx-auto w-full max-w-[1400px] px-6">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease }}
          className="mb-12 flex flex-col items-start gap-3 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <div className="mb-3 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-brand-primary" strokeWidth={2} />
              <span className="font-roboto text-[11px] font-semibold uppercase tracking-[2px] text-brand-primary">
                Top Performing on Meta
              </span>
            </div>
            <h2 className="font-montserrat text-[32px] font-black italic uppercase leading-tight tracking-tighter text-white sm:text-[40px] lg:text-[52px]">
              People Are<br />Talking
            </h2>
          </div>
          {/* Navigation */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className="flex h-10 w-10 items-center justify-center border border-white/10 text-white/40 transition-all hover:border-brand-primary hover:text-brand-primary disabled:opacity-20"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className="flex h-10 w-10 items-center justify-center border border-brand-primary/30 bg-brand-primary/5 text-brand-primary transition-all hover:bg-brand-primary/20 disabled:opacity-20"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </motion.div>

        {/* Scrollable Cards */}
        <div
          ref={scrollRef}
          onScroll={onScroll}
          className="flex gap-4 overflow-x-auto pb-4 scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {META_POSTS.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease, delay: i * 0.1 }}
            >
              <MetaCard post={post} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
