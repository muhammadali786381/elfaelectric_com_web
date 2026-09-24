"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Play } from "lucide-react";

interface VideoCard {
  id: number;
  title: string;
  customer: string;
  city: string;
  model: string;
  duration: string;
  thumbnail: string; // gradient fallback
  videoSrc: string;
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

export default function ZigzagGallery() {
  const trackRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  // Smooth spring for buttery scroll feel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 20,
    restDelta: 0.001,
  });

  // Map vertical scroll → horizontal translation
  const x = useTransform(smoothProgress, [0, 1], ["0%", "-62%"]);

  // Stagger effect: cards slowly stagger apart over the entire scroll
  const yEven = useTransform(smoothProgress, [0, 1], [0, -60]);
  const yOdd = useTransform(smoothProgress, [0, 1], [0, 60]);

  return (
    <div ref={trackRef} className="relative h-[320vh]  mt-8 mb-48 ">
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* ── Section header ── */}
        <div className="flex items-start justify-between px-8 pt-24 pb-0 sm:px-12 lg:px-20">
          <h2
            className=" max-w-[520px] font-black leading-[0.92] tracking-tighter text-white"
            style={{ fontSize: "clamp(1.4rem, 4vw, 4.5rem)" }}
          >
            Customer
            <br />
            <span className="text-[#00E573]">Stories.</span>
          </h2>
          <p className=" hidden max-w-[280px] pt-3 text-[15px] leading-relaxed text-white/50 lg:block">
            Real ELFA riders share their experience — from daily commutes to
            zero fuel bills. Watch and be inspired.
          </p>
        </div>

        {/* ── Horizontal scroll track ── */}
        <motion.div
          style={{ x }}
          className="mt-10 flex items-center gap-6 px-8 sm:px-12 lg:px-20 will-change-transform"
        >
          {videoTestimonials.map((card, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <motion.div
                key={card.id}
                style={{ y: isEven ? yEven : yOdd }}
                className="group relative shrink-0 w-[300px] sm:w-[360px] lg:w-[400px] h-[440px] sm:h-[500px] rounded-2xl border border-neutral-800 overflow-hidden cursor-pointer"
              >
                {/* Thumbnail / gradient bg */}
                <div
                  className="absolute inset-0"
                  style={{ background: card.thumbnail }}
                />

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/30 transition-opacity duration-300 group-hover:bg-black/10" />

                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#00E573]/90 shadow-[0_0_40px_rgba(0,229,115,0.5)] transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_60px_rgba(0,229,115,0.7)]">
                    <Play className="ml-1 h-6 w-6 fill-zinc-950 text-zinc-950" />
                  </div>
                </div>

                {/* Duration badge */}
                <div className="absolute top-4 right-4 rounded-full bg-black/60 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
                  {card.duration}
                </div>

                {/* Card number */}
                <div className="absolute top-4 left-4 font-black text-[64px] leading-none text-white/5 select-none">
                  {String(idx + 1).padStart(2, "0")}
                </div>

                {/* Bottom info */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent px-5 pb-5 pt-14">
                  <h3 className="font-montserrat font-bold text-[16px] leading-tight text-white mb-2">
                    {card.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    <div className="h-7 w-7 rounded-full bg-[#00E573]/20 flex items-center justify-center border border-[#00E573]/30">
                      <span className="text-[10px] font-bold text-[#00E573]">
                        {card.customer.charAt(0)}
                      </span>
                    </div>
                    <div className="font-roboto">
                      <p className="text-[12px] font-semibold text-white">
                        {card.customer}
                      </p>
                      <p className="text-[10px] text-white/50">
                        {card.city} · {card.model}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30">
          <div className="h-10 w-px bg-gradient-to-b from-transparent to-white/20" />
          <span className="text-[10px] uppercase tracking-[3px]">Scroll</span>
        </div>
      </div>
    </div>
  );
}
