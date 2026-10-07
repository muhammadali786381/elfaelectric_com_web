"use client";

import * as React from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  useMotionValueEvent,
  type PanInfo,
  type MotionValue,
} from "motion/react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface Slide {
  image: string;
  title?: string;
  description?: string;
  badge?: string;
}

interface CarouselConfig {
  distanceDivisor: number;
  velocityDivisor: number;
  sensitivity: number;
  xMultiplier: number;
  yMultiplier: number;
  rotationMultiplier: number;
  scaleReduction: number;
}

const getCarouselConfig = (width: number): CarouselConfig => {
  if (width < 640) {
    return {
      distanceDivisor: 120,
      velocityDivisor: 500,
      sensitivity: 180,
      xMultiplier: 90,
      yMultiplier: 20,
      rotationMultiplier: 8,
      scaleReduction: 0.06,
    };
  }
  if (width < 1024) {
    return {
      distanceDivisor: 160,
      velocityDivisor: 650,
      sensitivity: 220,
      xMultiplier: 130,
      yMultiplier: 30,
      rotationMultiplier: 10,
      scaleReduction: 0.09,
    };
  }
  return {
    distanceDivisor: 200,
    velocityDivisor: 800,
    sensitivity: 250,
    xMultiplier: 170,
    yMultiplier: 40,
    rotationMultiplier: 12,
    scaleReduction: 0.12,
  };
};

export default function CarouselStacked({ slides }: { slides: Slide[] }) {
  const scrollProgress = useMotionValue(0);
  const startProgress = React.useRef(0);
  const [windowWidth, setWindowWidth] = React.useState(0);
  const [activeIndex, setActiveIndex] = React.useState(0);

  const total = slides.length;

  useMotionValueEvent(scrollProgress, "change", (latest) => {
    const normalized = Math.round(latest) % total;
    setActiveIndex(normalized < 0 ? normalized + total : normalized);
  });

  React.useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const config = React.useMemo(
    () => getCarouselConfig(windowWidth),
    [windowWidth],
  );

  const scrollToTarget = React.useCallback((target: number) => {
    animate(scrollProgress, target, {
      type: "spring",
      stiffness: 200,
      damping: 30,
      mass: 1,
    });
  }, [scrollProgress]);

  const nextSlide = React.useCallback(() => {
    scrollToTarget(Math.round(scrollProgress.get()) + 1);
  }, [scrollProgress, scrollToTarget]);

  const prevSlide = React.useCallback(() => {
    scrollToTarget(Math.round(scrollProgress.get()) - 1);
  }, [scrollProgress, scrollToTarget]);

  React.useEffect(() => {
    const interval = setInterval(nextSlide, 3500); // 3.5 seconds
    return () => clearInterval(interval);
  }, [nextSlide]);

  const handleDragStart = () => {
    startProgress.current = scrollProgress.get();
  };

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    const dragDistance = info.offset.x;
    const velocity = info.velocity.x;

    const distanceShift = -dragDistance / config.distanceDivisor;
    const velocityShift = -velocity / config.velocityDivisor;

    let totalShift = Math.round(distanceShift + velocityShift);
    totalShift = Math.max(-3, Math.min(3, totalShift));

    const target = Math.round(startProgress.current) + totalShift;

    scrollToTarget(target);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full py-10 overflow-hidden select-none">
      <div className="relative w-full max-w-7xl h-80 sm:h-112 lg:h-128 flex items-center justify-center mb-10">

        {/* Transparent Drag Surface */}
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragStart={handleDragStart}
          onDrag={(_, info) => {
            const delta = -info.delta.x / config.sensitivity;
            scrollProgress.set(scrollProgress.get() + delta);
          }}
          onDragEnd={handleDragEnd}
          className="absolute inset-0 z-50 cursor-grab active:cursor-grabbing"
        />

        {slides.map((slide, i) => (
          <Card
            key={i}
            slide={slide}
            index={i}
            total={total}
            progress={scrollProgress}
            config={config}
          />
        ))}
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-center gap-4 sm:gap-6 z-[60]">
        <div className="group relative flex items-center justify-center p-1.5 rounded-full border border-white/10 hover:border-white/20 transition-all">
          <button
            onClick={prevSlide}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#161616] border border-white/5 text-white/80 transition-all group-hover:bg-[#222] group-hover:text-white active:scale-95 pointer-events-auto"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-4 w-4" strokeWidth={2.5} />
          </button>
        </div>

        {/* Dots */}
        <div className="flex items-center gap-3 mx-2">
          {Array.from({ length: total }).map((_, i) => (
            <button
              key={i}
              onClick={() => {
                const current = Math.round(scrollProgress.get());
                const currentMod = ((current % total) + total) % total;
                let diff = i - currentMod;
                if (diff > total / 2) diff -= total;
                if (diff < -total / 2) diff += total;
                scrollToTarget(current + diff);
              }}
              className={cn(
                "h-2 w-2 rounded-full transition-all duration-300 pointer-events-auto",
                activeIndex === i ? "bg-white scale-125" : "bg-white/20 hover:bg-white/40"
              )}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        <div className="group relative flex items-center justify-center p-1.5 rounded-full border border-white/10 hover:border-white/20 transition-all">
          <button
            onClick={nextSlide}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#161616] border border-white/5 text-white/80 transition-all group-hover:bg-[#222] group-hover:text-white active:scale-95 pointer-events-auto"
            aria-label="Next slide"
          >
            <ChevronRight className="h-4 w-4" strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
}

interface CardProps {
  slide: Slide;
  index: number;
  total: number;
  progress: MotionValue<number>;
  config: CarouselConfig;
}

const Card = ({ slide, index, total, progress, config }: CardProps) => {
  const offset = useTransform(progress, (p) => {
    let diff = (index - p) % total;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  });

  const x = useTransform(offset, (o) => o * config.xMultiplier);
  const rotate = useTransform(offset, (o) => {
    const absO = Math.abs(o);
    if (absO < 0.05) return 0;
    return o * config.rotationMultiplier;
  });
  const y = useTransform(offset, (o) => {
    const absO = Math.abs(o);
    if (absO < 0.05) return 0;
    return absO * config.yMultiplier;
  });
  const scale = useTransform(
    offset,
    (o) => 1 - Math.abs(o) * config.scaleReduction,
  );
  
  const opacity = useTransform(
    offset,
    [-total / 2, -total / 2 + 0.5, 0, total / 2 - 0.5, total / 2],
    [0, 1, 1, 1, 0],
  );
  const zIndex = useTransform(offset, (o) =>
    Math.round(30 - Math.abs(o) * 5),
  );

  return (
    <motion.div
      style={{
        x,
        rotate,
        y,
        scale,
        opacity,
        zIndex,
      }}
      className={cn(
        "absolute rounded-2xl overflow-hidden bg-[#050505] group pointer-events-none",
        "w-48 h-64 sm:w-64 sm:h-80 lg:w-80 lg:h-[24rem]",
      )}
    >
      <img
        src={slide.image}
        alt={slide.title || "Gallery image"}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none transition-transform duration-700 group-hover:scale-110"
      />

      <motion.div
        style={{
          opacity: useTransform(
            offset,
            [-2, -0.5, 0, 0.5, 2],
            [0.5, 0.2, 0, 0.2, 0.5],
          ),
        }}
        className="absolute inset-0 bg-black pointer-events-none"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {slide.badge && (
        <Badge className="absolute top-3 right-3 sm:top-5 sm:right-5 lg:top-6 lg:right-6 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-white/95 backdrop-blur-md text-xs font-bold uppercase tracking-widest text-black">
          {slide.badge}
        </Badge>
      )}

      {(slide.title || slide.description) && (
        <div className="absolute bottom-5 left-3 right-3 sm:bottom-8 sm:left-5 sm:right-5 lg:bottom-10 lg:left-6 lg:right-6 text-white text-center sm:text-left">
          {slide.title && (
            <motion.p
              style={{
                opacity: useTransform(offset, [-0.5, 0, 0.5], [0, 1, 0]),
              }}
              className="text-sm sm:text-lg lg:text-xl font-bold leading-tight mb-0.5 sm:mb-1 drop-shadow-md"
            >
              {slide.title}
            </motion.p>
          )}
          {slide.description && (
            <motion.p
              style={{
                opacity: useTransform(offset, [-0.5, 0, 0.5], [0, 1, 0]),
              }}
              className="hidden sm:block text-xs text-white/70 line-clamp-2 italic font-medium"
            >
              {slide.description}
            </motion.p>
          )}
        </div>
      )}
    </motion.div>
  );
}
