"use client";

import { useRef } from "react";
import Image from "next/image";
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
      <div className="relative h-[min(78vh,640px)] min-h-[520px] w-full md:h-[495px] md:min-h-0">
        <div className="absolute inset-0">
          <Image
            src="/assets/images/Hero-Banner-Background.webp"
            alt=""
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

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
