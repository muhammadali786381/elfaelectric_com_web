"use client";

import { useState, useEffect, useMemo, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { FaLinkedinIn, FaTiktok } from "react-icons/fa6";
import PlayButton from "@/components/ui/PlayButton";
import VideoModal from "@/components/ui/VideoModal";
import { resolveSocialReel, type ReelPlatform, type SocialReel, type VideoLink } from "@/lib/social-reels";
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const platformPresentation: Record<ReelPlatform, { label: string; icon?: ReactNode }> = {
  youtube: { label: "YouTube" },
  instagram: { label: "Instagram", icon: <InstagramIcon className="h-6 w-6 text-white" /> },
  linkedin: { label: "LinkedIn", icon: <FaLinkedinIn className="h-6 w-6 text-white" /> },
  tiktok: { label: "TikTok", icon: <FaTiktok className="h-6 w-6 text-white" /> },
  other: { label: "Social" },
};

interface ReelsCarouselProps {
  reels: readonly VideoLink[];
}

export default function ReelsCarousel({ reels }: ReelsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeVideo, setActiveVideo] = useState<SocialReel | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const items = useMemo(
    () => reels.map(resolveSocialReel).filter((item): item is SocialReel => item !== null),
    [reels],
  );

  const next = () => setCurrentIndex((prev) => (prev + 1) % items.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);

  const getDiff = (i: number) => {
    let diff = i - (currentIndex % items.length);
    const n = items.length;
    if (diff > n / 2) diff -= n;
    if (diff < -n / 2) diff += n;
    return diff;
  };

  useEffect(() => {
    if (activeVideo || isHovered || items.length < 2) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [activeVideo, items.length, isHovered]);

  const variants = {
    center: { x: "0%", scale: 1, zIndex: 10, opacity: 1 },
    left: { x: "-70%", scale: 0.8, zIndex: 5, opacity: 0.4 },
    right: { x: "70%", scale: 0.8, zIndex: 5, opacity: 0.4 },
    hiddenLeft: { x: "-100%", scale: 0.6, zIndex: 0, opacity: 0 },
    hiddenRight: { x: "100%", scale: 0.6, zIndex: 0, opacity: 0 },
  };

  const getVariant = (diff: number) => {
    if (diff === 0) return "center";
    if (diff === -1) return "left";
    if (diff === 1) return "right";
    if (diff < -1) return "hiddenLeft";
    return "hiddenRight";
  };

  if (items.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-[#050505] py-5">
      <div className="mx-auto max-w-[1400px] px-6 text-center">
        <h2 className="mb-4 font-montserrat text-3xl font-bold tracking-tight text-white sm:text-5xl">
          Explore Our <span className="text-[#00E573]">Socials</span>
        </h2>
        <p className="mx-auto mb-16 max-w-2xl font-roboto text-sm text-white/50 sm:text-base">
          See how audiences are engaging with ELFA across YouTube, Instagram, LinkedIn and TikTok.
        </p>

        <div
          className="relative mx-auto flex h-[220px] w-full max-w-[1200px] items-center justify-center sm:h-[350px] lg:h-[450px]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <AnimatePresence initial={false}>
            {items.map((item, i) => {
              const diff = getDiff(i);
              const variant = getVariant(diff);
              const isCenter = diff === 0;
              const presentation = platformPresentation[item.platform];

              return (
                <motion.div
                  key={`${item.url}-${i}`}
                  data-platform={item.platform}
                  animate={variant}
                  variants={variants}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute aspect-video w-[85%] sm:w-[65%] lg:w-[55%] overflow-hidden rounded-[20px] border border-white/5 bg-neutral-900 shadow-2xl cursor-pointer"
                  style={{ originX: 0.5, originY: 0.5 }}
                  onClick={() => {
                    if (isCenter) {
                      if (item.embedUrl) {
                        setActiveVideo(item);
                      } else {
                        window.open(item.url, "_blank", "noopener,noreferrer");
                      }
                    }
                    else if (diff > 0) setCurrentIndex((prev) => (prev + diff) % items.length);
                    else if (diff < 0) setCurrentIndex((prev) => (prev + diff + items.length) % items.length);
                  }}
                >
                  {item.thumbnail ? (
                    <img
                      src={item.thumbnail}
                      alt=""
                      className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                      style={{ objectPosition: item.thumbnailPosition ?? "center" }}
                      onError={(e) => {
                        // Fallback to hqdefault if maxresdefault doesn't exist for this video
                        if (item.thumbnailFallback && e.currentTarget.src !== item.thumbnailFallback) {
                          e.currentTarget.src = item.thumbnailFallback;
                        }
                      }}
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-neutral-900 text-white/60">
                      {presentation.icon || <Play className="h-12 w-12" />}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/0" />

                  {isCenter && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <PlayButton
                        ariaLabel={
                          item.embedUrl ? `Play ${presentation.label} video`
                            : `Open ${presentation.label} post (opens in a new tab)`
                        }
                        icon={presentation.icon}
                      />
                    </div>
                  )}


                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Navigation Controls */}
          <button
            type="button"
            aria-label="Previous post"
            onClick={prev}
            className="absolute left-0 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white backdrop-blur-xl transition-colors hover:bg-white/10 top-1/2 sm:left-4"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            type="button"
            aria-label="Next post"
            onClick={next}
            className="absolute right-0 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white backdrop-blur-xl transition-colors hover:bg-white/10 top-1/2 sm:right-4"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

      </div>

      {/* Video Modal */}
      <AnimatePresence>
        <VideoModal
          isOpen={activeVideo !== null}
          onClose={() => setActiveVideo(null)}
          videoUrl={activeVideo?.embedUrl ?? null}
          sourceUrl={activeVideo?.url}
          sourceLabel={activeVideo ? platformPresentation[activeVideo.platform].label : undefined}
        />
      </AnimatePresence>
    </section>
  );
}
