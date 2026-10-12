"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useMotionValue, useAnimationFrame, animate, AnimatePresence } from "framer-motion";
import { Play, X, ChevronLeft, ChevronRight } from "lucide-react";
import PlayButton from "@/components/ui/PlayButton";

interface VideoCard {
  id: number;
  title: string;
  customer: string;
  city: string;
  model: string;
  duration: string;
  thumbnail: string;
  thumbnailUrl?: string;
  videoSrc: string;
  originalUrl?: string;
}

const videoTestimonials: VideoCard[] = [
  {
    id: 1,
    title: "Changed My Daily Commute Forever",
    customer: "Umer Farooq",
    city: "Karachi",
    model: "EV-125 Bike",
    duration: "2:14",
    thumbnail: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
    videoSrc: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: 2,
    title: "Saving PKR 10K Every Month",
    customer: "Muhammad Nawab",
    city: "Lahore",
    model: "EV-125 Bike",
    duration: "1:58",
    thumbnail: "linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)",
    videoSrc: "https://www.w3schools.com/html/movie.mp4",
  },
  {
    id: 3,
    title: "Best Decision of My Life",
    customer: "Bilal Ahmed",
    city: "Islamabad",
    model: "EV-1 Scooty",
    duration: "3:02",
    thumbnail: "linear-gradient(135deg, #0d0d0d, #1a1a00, #003300)",
    videoSrc: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: 4,
    title: "Zero Fuel Bills Since 6 Months",
    customer: "Arsalan Khan",
    city: "Rawalpindi",
    model: "EV-125 Bike",
    duration: "2:45",
    thumbnail: "linear-gradient(135deg, #0a0a0a, #1c1c2e, #16213e)",
    videoSrc: "https://www.w3schools.com/html/movie.mp4",
  },
  {
    id: 5,
    title: "Smooth Ride, Smooth Savings",
    customer: "Hamza Siddiqui",
    city: "Hyderabad",
    model: "EV-1 Scooty",
    duration: "1:37",
    thumbnail: "linear-gradient(135deg, #050505, #002200, #00451a)",
    videoSrc: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: 6,
    title: "ELFA is the Future of Pakistan",
    customer: "Saad Rehman",
    city: "Faisalabad",
    model: "EV-125 Bike",
    duration: "2:28",
    thumbnail: "linear-gradient(135deg, #111827, #1f2937, #374151)",
    videoSrc: "https://www.w3schools.com/html/movie.mp4",
  },
];

// Auto-slide speed (px per second)
const AUTO_SPEED = 60;
// Zig-zag Y amplitude (px above/below baseline)
const ZZ_AMP = 0;

interface ZigzagGalleryProps {
  headingLine1?: string;
  headingLine2?: string;
  subtitle?: string;
  videoLinks?: string[];
}

export default function ZigzagGallery({
  headingLine1 = "Customer",
  headingLine2 = "Stories.",
  subtitle = "Real ELFA riders share their experience — from daily commutes to zero fuel bills. Watch and be inspired.",
  videoLinks,
}: ZigzagGalleryProps = {}) {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [screenSize, setScreenSize] = useState({ w: 1200, h: 800 });

  useEffect(() => {
    const handleResize = () => setScreenSize({ w: window.innerWidth, h: window.innerHeight });
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = screenSize.w < 640;
  
  // Base targets
  const targetH = isMobile ? 420 : 500;
  
  // Cap at ~65% of screen height so it doesn't overwhelm short screens
  const maxH = Math.max(320, screenSize.h * 0.65);
  const CARD_H = Math.min(targetH, maxH);
  
  // Maintain aspect ratio
  const aspectRatio = isMobile ? (300 / 420) : (380 / 500);
  const CARD_W = CARD_H * aspectRatio;
  
  const CARD_GAP = isMobile ? 16 : 24;
  const CARD_STRIDE = CARD_W + CARD_GAP;

  // Build card list from props or defaults
  const baseCards: VideoCard[] = videoLinks
    ? videoLinks.map((url, i) => {
        let embedUrl = url;
        let thumbUrl: string | undefined;

        if (url.includes("youtube.com") || url.includes("youtu.be")) {
          const videoId =
            url.match(/[?&]v=([^&]+)/)?.[1] ||
            url.match(/youtu\.be\/([^?]+)/)?.[1] ||
            url.match(/shorts\/([^?]+)/)?.[1];
          if (videoId) {
            embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
            if (url.includes("shorts/")) embedUrl += "&isShort=1";
            thumbUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
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
          title: `Rider Story ${i + 1}`,
          customer: "ELFA Rider",
          city: "Pakistan",
          model: "EV Bike",
          duration: "Shorts",
          thumbnail: `linear-gradient(135deg, #050505, #002200, #00451a)`,
          thumbnailUrl: thumbUrl,
          videoSrc: embedUrl,
          originalUrl: url,
        };
      })
    : videoTestimonials;

  // Triplicate for seamless infinite loop
  const cards = [...baseCards, ...baseCards, ...baseCards];
  const totalW = baseCards.length * CARD_STRIDE;

  // Motion value drives the entire strip
  const x = useMotionValue(-totalW); // start at the middle copy
  const isPausedRef = useRef(false);
  const isAnimatingRef = useRef(false);
  const lastTimeRef = useRef<number | null>(null);

  // Adjust x when totalW changes (e.g. resize between mobile/desktop)
  useEffect(() => {
    x.set(-totalW);
  }, [totalW, x]);

  // Auto-advance
  useAnimationFrame((t) => {
    if (isPausedRef.current || activeVideo || isAnimatingRef.current) {
      lastTimeRef.current = null;
      return;
    }
    if (lastTimeRef.current === null) {
      lastTimeRef.current = t;
      return;
    }
    const delta = (t - lastTimeRef.current) / 1000;
    lastTimeRef.current = t;

    let next = x.get() - AUTO_SPEED * delta;

    // Wrap: once we've scrolled one full copy, reset to the middle copy start
    if (next < -totalW * 2) next += totalW;

    x.set(next);
  });

  // Pause on hover
  useEffect(() => {
    isPausedRef.current = isHovered;
  }, [isHovered]);

  // Button: slide left/right by one card
  const slide = useCallback(
    (dir: 1 | -1) => {
      if (isAnimatingRef.current) return;
      isAnimatingRef.current = true;
      
      let current = x.get();
      
      // Before animating, check boundaries to maintain infinite illusion
      // Middle block is between -totalW*2 and -totalW
      if (dir === 1 && current <= -totalW * 2 + 1) {
         current += totalW;
         x.set(current);
      } else if (dir === -1 && current >= -totalW - 1) {
         current -= totalW;
         x.set(current);
      }

      const target = current - dir * CARD_STRIDE;
      animate(x, target, { 
        type: "tween", 
        duration: 0.45, 
        ease: [0.4, 0, 0.2, 1],
        onComplete: () => {
          isAnimatingRef.current = false;
        }
      });
    },
    [x, totalW]
  );

  // Compute zig-zag Y for each card based on its absolute index
  const zigzagY = (absIdx: number) => (absIdx % 2 === 0 ? -ZZ_AMP : ZZ_AMP);

  const renderCard = (card: VideoCard, absIdx: number) => {
    const baseX = absIdx * CARD_STRIDE;
    const yTarget = zigzagY(absIdx);

    return (
      <motion.div
        key={`${card.id}-${absIdx}`}
        className="absolute top-0"
        style={{
          left: baseX,
          width: CARD_W,
          y: yTarget,
        }}
        transition={{ duration: 0 }}
      >
        <div
          onClick={() => setActiveVideo(card.videoSrc)}
          className="group relative cursor-pointer overflow-hidden rounded-2xl border border-neutral-800 shadow-2xl"
          style={{ width: CARD_W, height: CARD_H }}
        >
          {/* Thumbnail / gradient bg */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ background: card.thumbnail }}
          >
            {card.thumbnailUrl ? (
              <img
                src={card.thumbnailUrl}
                alt=""
                className="h-full w-full object-cover"
              />
            ) : card.videoSrc.includes("instagram.com") ||
              card.videoSrc.includes("tiktok.com") ? (
              <iframe
                src={card.videoSrc}
                className="pointer-events-none h-full w-full border-0 object-cover"
                allow="autoplay; encrypted-media; fullscreen"
                tabIndex={-1}
              />
            ) : null}
          </div>

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/30 transition-opacity duration-300 group-hover:bg-black/10" />

          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <PlayButton />
          </div>

          {/* Duration badge */}
          <div className="absolute top-4 right-4 rounded-full bg-black/60 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
            {card.duration}
          </div>

          {/* Card number */}
          <div className="absolute top-4 left-4 font-black text-[60px] leading-none text-white/5 select-none">
            {String((card.id % baseCards.length) + 1).padStart(2, "0")}
          </div>

          {/* Bottom info */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent px-4 pb-4 pt-12">
            <h3 className="font-montserrat font-bold text-[14px] leading-tight text-white mb-2">
              {card.title}
            </h3>
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-[#00E573]/20 flex items-center justify-center border border-[#00E573]/30 shrink-0">
                <span className="text-[9px] font-bold text-[#00E573]">
                  {card.customer.charAt(0)}
                </span>
              </div>
              <div className="font-roboto min-w-0">
                <p className="text-[11px] font-semibold text-white truncate">{card.customer}</p>
                <p className="text-[10px] text-white/50 truncate">
                  {card.city} · {card.model}
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <>
      <div className="relative mt-8 mb-12 overflow-hidden">
        {/* Heading */}
        <div className="flex items-start justify-between px-8 pt-16 pb-0 sm:px-12 lg:px-20 mb-10">
          <h2
            className="max-w-[520px] font-black leading-[0.92] tracking-tighter text-white"
            style={{ fontSize: "clamp(1.4rem, 4vw, 4.5rem)" }}
          >
            {headingLine1}
            <br />
            <span className="text-[#00E573]">{headingLine2}</span>
          </h2>
          <p className="max-w-[280px] pt-3 text-[15px] leading-relaxed text-white/50 hidden sm:block">
            {subtitle}
          </p>
        </div>

        {/* Carousel viewport */}
        <div
          className="relative"
          style={{ height: CARD_H + ZZ_AMP * 2 + 40 }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Sliding strip */}
          <motion.div
            className="absolute inset-0"
            style={{ x, paddingTop: ZZ_AMP + 20 }}
          >
            <div className="relative" style={{ height: CARD_H + ZZ_AMP * 2 }}>
              {cards.map((card, i) => renderCard(card, i))}
            </div>
          </motion.div>

          {/* LEFT blurred edge + button */}
          <div
            className="absolute left-0 top-0 bottom-0 z-20 flex items-center"
            style={{ width: 100 }}
          >
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to right, rgba(5,5,5,0.95) 30%, rgba(5,5,5,0) 100%)",
                backdropFilter: "blur(2px)",
                WebkitBackdropFilter: "blur(2px)",
                maskImage: "linear-gradient(to right, black 40%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to right, black 40%, transparent 100%)",
              }}
            />
            <button
              onClick={() => slide(-1)}
              className="relative z-10 ml-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white backdrop-blur-md transition-all duration-200 hover:bg-[#00E573] hover:text-black hover:border-[#00E573] hover:scale-110 shadow-xl"
              aria-label="Previous"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          </div>

          {/* RIGHT blurred edge + button */}
          <div
            className="absolute right-0 top-0 bottom-0 z-20 flex items-center justify-end"
            style={{ width: 100 }}
          >
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to left, rgba(5,5,5,0.95) 30%, rgba(5,5,5,0) 100%)",
                backdropFilter: "blur(2px)",
                WebkitBackdropFilter: "blur(2px)",
                maskImage: "linear-gradient(to left, black 40%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to left, black 40%, transparent 100%)",
              }}
            />
            <button
              onClick={() => slide(1)}
              className="relative z-10 mr-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white backdrop-blur-md transition-all duration-200 hover:bg-[#00E573] hover:text-black hover:border-[#00E573] hover:scale-110 shadow-xl"
              aria-label="Next"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Pause indicator */}
        {isHovered && (
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-center gap-1.5 py-1 px-3 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 text-[10px] text-white/40 tracking-widest uppercase">
            <span className="w-1 h-2.5 bg-white/40 rounded-sm" />
            <span className="w-1 h-2.5 bg-white/40 rounded-sm" />
            <span className="ml-1">paused</span>
          </div>
        )}
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
                activeVideo.includes("youtube.com/embed") && activeVideo.includes("isShort")
                  ? "aspect-[9/16] max-w-[400px] max-h-[85vh]"
                  : activeVideo.includes("instagram.com") || activeVideo.includes("tiktok.com")
                  ? "aspect-[9/16] max-w-[400px] max-h-[85vh]"
                  : "aspect-video max-w-[900px]"
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
    </>
  );
}
