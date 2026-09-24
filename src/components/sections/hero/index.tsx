"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "swiper/css";

import { slides } from "./hero.data";
import { heroSwiperConfig } from "./hero.config";
import { SplitSlide, BannerSlide } from "./HeroSlide";

export default function Hero() {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section className="relative w-full overflow-hidden">
      {/*
       * Mobile matches the PAVE art (1:2) so it fills edge to edge.
       * Desktop keeps the live 1920/684 ratio.
       */}
      {/* Mobile/tablet: fill viewport below nav (~70px). Desktop lg+: 1920/684 aspect ratio. */}
      <div className="relative h-[calc(100dvh-70px)] max-h-[800px] min-h-[600px] w-full lg:aspect-[1920/684] lg:h-auto lg:max-h-none lg:min-h-0">
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
              {slide.layout === "split" ? (
                <SplitSlide slide={slide} />
              ) : (
                <BannerSlide slide={slide} />
              )}
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
