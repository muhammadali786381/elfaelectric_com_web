"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, X, Video } from "lucide-react";

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const YoutubeIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M2.25 8.6014C2.25 8.6014 2.115 12.0128 2.25 15.3986C2.385 18.7844 3.75 19.5 3.75 19.5C5.25 20.25 12 20.25 12 20.25C12 20.25 18.75 20.25 20.25 19.5C20.25 19.5 21.615 18.7844 21.75 15.3986C21.885 12.0128 21.75 8.6014 21.75 8.6014C21.75 8.6014 21.615 5.2156 20.25 4.5C18.75 3.75 12 3.75 12 3.75C12 3.75 5.25 3.75 3.75 4.5C3.75 4.5 2.385 5.2156 2.25 8.6014Z"/>
    <path d="M9.75 15.75L15.75 12L9.75 8.25V15.75Z" fill="currentColor"/>
  </svg>
);

interface Reel {
  id: number;
  url: string;
  thumbnail: string;
}

interface ReelsCarouselProps {
  reels: (string | { url: string; thumbnail?: string })[];
}

export default function ReelsCarousel({ reels }: ReelsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  // Parse thumbnails and IDs
  const items: Reel[] = reels.map((reelItem, i) => {
    const url = typeof reelItem === 'string' ? reelItem : reelItem.url;
    let embedUrl = url;
    let thumb = typeof reelItem === 'string' ? "" : (reelItem.thumbnail || "");

    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      let videoId = "";
      if (url.includes("shorts/")) videoId = url.split("shorts/")[1]?.split("?")[0];
      else if (url.includes("v=")) videoId = url.split("v=")[1]?.split("&")[0];
      else if (url.includes("youtu.be/")) videoId = url.split("youtu.be/")[1]?.split("?")[0];

      if (videoId) {
        embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
        if (!thumb) thumb = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
      }
    } else if (url.includes("instagram.com/reel/")) {
      const id = url.split("reel/")[1]?.split("/")[0];
      if (id) embedUrl = `https://www.instagram.com/p/${id}/embed/`;
    } else if (url.includes("tiktok.com")) {
      const id = url.split("video/")[1]?.split("?")[0];
      if (id) embedUrl = `https://www.tiktok.com/embed/v2/${id}`;
    }

    return {
      id: i,
      url: embedUrl,
      thumbnail: thumb,
    };
  });

  const next = () => setCurrentIndex((prev) => (prev + 1) % items.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);

  const getDiff = (i: number) => {
    let diff = i - currentIndex;
    const n = items.length;
    if (diff > n / 2) diff -= n;
    if (diff < -n / 2) diff += n;
    return diff;
  };

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

  if (!items || items.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-[#050505] py-20 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-6 text-center">
        <h2 className="mb-4 font-montserrat text-3xl font-bold tracking-tight text-white sm:text-5xl">
          Top Performing on <span className="text-[#00E573]">Meta</span>
        </h2>
        <p className="mx-auto mb-16 max-w-2xl font-roboto text-sm text-white/50 sm:text-base">
          See how audiences are engaging with ELFA across Instagram and TikTok.
        </p>

        <div className="relative mx-auto flex h-[220px] w-full max-w-[1200px] items-center justify-center sm:h-[350px] lg:h-[450px]">
          <AnimatePresence initial={false}>
            {items.map((item, i) => {
              const diff = getDiff(i);
              const variant = getVariant(diff);
              const isCenter = diff === 0;

              return (
                <motion.div
                  key={item.id}
                  animate={variant}
                  variants={variants}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute aspect-video w-[85%] sm:w-[65%] lg:w-[55%] overflow-hidden rounded-[20px] border border-white/5 bg-neutral-900 shadow-2xl cursor-pointer"
                  style={{ originX: 0.5, originY: 0.5 }}
                  onClick={() => {
                    if (isCenter) setActiveVideo(item.url);
                    else if (diff > 0) setCurrentIndex((prev) => (prev + diff) % items.length);
                    else if (diff < 0) setCurrentIndex((prev) => (prev + diff + items.length) % items.length);
                  }}
                >
                  {item.thumbnail ? (
                    <img
                      src={item.thumbnail}
                      alt=""
                      className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                      onError={(e) => {
                        // Fallback to hqdefault if maxresdefault doesn't exist for this video
                        if (e.currentTarget.src.includes("maxresdefault")) {
                          e.currentTarget.src = item.thumbnail.replace("maxresdefault", "hqdefault");
                        }
                      }}
                    />
                  ) : item.url.includes("instagram.com") || item.url.includes("tiktok.com") ? (
                    <iframe
                      src={item.url}
                      className="pointer-events-none h-full w-full border-0 object-cover"
                      allow="autoplay; encrypted-media; fullscreen"
                      tabIndex={-1}
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-neutral-800 to-black text-white/20">
                      <Play className="h-12 w-12 opacity-50" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/0" />

                  {isCenter && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="flex h-16 w-16 items-center justify-center rounded-full bg-[#00E573]/90 shadow-[0_0_40px_rgba(0,229,115,0.4)] backdrop-blur-md transition-transform hover:scale-110"
                      >
                        {item.url.includes("instagram.com") ? (
                          <InstagramIcon className="h-7 w-7 text-black" />
                        ) : item.url.includes("youtube.com") || item.url.includes("youtu.be") ? (
                          <YoutubeIcon className="h-7 w-7 text-black" />
                        ) : (
                          <Video className="h-7 w-7 text-black" />
                        )}
                      </motion.div>
                    </div>
                  )}


                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Navigation Controls */}
          <button
            onClick={prev}
            className="absolute left-0 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white backdrop-blur-xl transition-colors hover:bg-white/10 top-1/2 sm:left-4"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={next}
            className="absolute right-0 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white backdrop-blur-xl transition-colors hover:bg-white/10 top-1/2 sm:right-4"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
        
        <div className="mt-8 text-center sm:mt-12">
          {(() => {
            const centerItem = items[currentIndex];
            let ctaText = "Follow ELFA on Instagram";
            let ctaLink = "https://www.instagram.com/elfaelectric";
            
            if (centerItem?.url.includes("youtube") || centerItem?.url.includes("youtu.be")) {
              ctaText = "Subscribe on YouTube";
              ctaLink = "https://www.youtube.com/@ElfaElectric";
            } else if (centerItem?.url.includes("tiktok")) {
              ctaText = "Follow ELFA on TikTok";
              ctaLink = "https://www.tiktok.com/@elfaelectric";
            }

            return (
              <a
                href={ctaLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#00E573] px-8 py-3.5 font-montserrat text-sm font-bold text-black shadow-[0_0_20px_rgba(0,229,115,0.3)] transition-all hover:scale-105 hover:bg-[#00c965] hover:shadow-[0_0_30px_rgba(0,229,115,0.5)]"
              >
                {ctaText}
                <ChevronRight className="h-5 w-5" />
              </a>
            );
          })()}
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveVideo(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className={`relative w-full overflow-hidden rounded-2xl bg-black shadow-2xl ${
                activeVideo.includes("youtube.com/embed") && activeVideo.includes("shorts")
                  ? "aspect-[9/16] max-h-[85vh] max-w-[400px]"
                  : activeVideo.includes("instagram.com") || activeVideo.includes("tiktok.com")
                  ? "aspect-[9/16] max-h-[85vh] max-w-[400px]"
                  : "aspect-video max-w-[1000px]"
              }`}
            >
              <button
                onClick={() => setActiveVideo(null)}
                className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/80"
              >
                <X className="h-6 w-6" />
              </button>
              <iframe
                src={activeVideo}
                className="h-full w-full border-0"
                allow="autoplay; encrypted-media; fullscreen"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
