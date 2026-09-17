"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "swiper/css";

import { slides } from "./hero.data";
import { heroSwiperConfig } from "./hero.config";
import { SplitSlide, CenterSlide } from "./HeroSlide";

export default function Hero() {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section className="relative w-full overflow-hidden">
      {/*
       * Live site's hero holds a constant ~0.3561 height/width ratio (684px
       * tall at a 1920px viewport, 512.8px at 1440px, 911.6px at 2560px —
       * verified directly against elfaelectric.com) rather than a fixed
       * pixel height, so it's replicated here with aspect-ratio instead of
       * a flat md:h-[495px].
       */}
      <div className="relative h-[min(78vh,640px)] min-h-[520px] w-full md:aspect-[1920/684] md:h-auto md:min-h-0">
        <Swiper
          modules={[Autoplay, Navigation]}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          className="absolute inset-0 z-10 h-full w-full"
          {...heroSwiperConfig}
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id} className="h-full w-full">
              {slide.layout === "split" ? <SplitSlide slide={slide} /> : <CenterSlide slide={slide} />}
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          type="button"
          onClick={() => swiperRef.current?.slidePrev()}
          aria-label="Previous"
          className="absolute left-3 top-1/2 z-30 flex h-[35px] w-[35px] -translate-y-1/2 items-center justify-center rounded-full bg-[#61ce70] text-white transition-colors hover:bg-[#4fbf5f] sm:left-5"
        >
          <ChevronLeft className="h-[22px] w-[22px]" strokeWidth={2.5} />
        </button>
        <button
          type="button"
          onClick={() => swiperRef.current?.slideNext()}
          aria-label="Next"
          className="absolute right-3 top-1/2 z-30 flex h-[35px] w-[35px] -translate-y-1/2 items-center justify-center rounded-full bg-[#61ce70] text-white transition-colors hover:bg-[#4fbf5f] sm:right-5"
        >
          <ChevronRight className="h-[22px] w-[22px]" strokeWidth={2.5} />
        </button>
      </div>
    </section>
  );
}
