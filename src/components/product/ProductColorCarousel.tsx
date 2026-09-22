"use client";

import Image from "next/image";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";

type Props = {
  title: string;
  images: string[];
};

/**
 * Color / variant strip under the hero.
 * ≤2 images: static row, no arrows, no sliding.
 * >2 images: Swiper (2-up desktop) + black chevron arrows — matches live EV-125.
 */
export default function ProductColorCarousel({ title, images }: Props) {
  const swiperRef = useRef<SwiperType | null>(null);
  const canSlide = images.length > 2;

  return (
    <section className="bg-white py-[60px]">
      <div className="mx-auto w-full max-w-[1150px] px-4 sm:px-6">
        <h2 className="font-montserrat text-center text-[28px] font-bold leading-[1.2] text-[#212121] sm:text-[36px] lg:text-[42px] lg:leading-[51px]">
          {title}
        </h2>

        {!canSlide ? (
          <div className="mt-[60px] flex flex-wrap items-end justify-center gap-[27px]">
            {images.map((src) => (
              <div
                key={src}
                className="relative h-[280px] w-full max-w-[560px] sm:h-[380px] lg:h-[500px]"
              >
                <Image src={src} alt="" fill className="object-contain object-bottom" sizes="560px" />
              </div>
            ))}
          </div>
        ) : (
          <div className="relative mt-[60px] px-10 sm:px-12 lg:px-14">
            <Swiper
              modules={[Autoplay, Navigation]}
              onSwiper={(s) => {
                swiperRef.current = s;
              }}
              loop
              autoplay={{ delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: true }}
              speed={500}
              spaceBetween={27}
              slidesPerView={1}
              breakpoints={{
                768: { slidesPerView: 2 },
              }}
              className="w-full [&_.swiper-wrapper]:items-end"
            >
              {images.map((src) => (
                <SwiperSlide key={src}>
                  <div className="relative mx-auto h-[300px] w-full sm:h-[400px] lg:h-[500px]">
                    <Image
                      src={src}
                      alt=""
                      fill
                      className="object-contain object-bottom"
                      sizes="(min-width: 768px) 560px, 90vw"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Live: 46px black chevrons, no circle fill */}
            <button
              type="button"
              aria-label="Previous color"
              onClick={() => swiperRef.current?.slidePrev()}
              className="absolute top-[55%] left-0 z-10 flex h-[46px] w-[46px] -translate-y-1/2 items-center justify-center text-[#212121]"
            >
              <ChevronLeft className="h-[46px] w-[46px]" strokeWidth={1.25} />
            </button>
            <button
              type="button"
              aria-label="Next color"
              onClick={() => swiperRef.current?.slideNext()}
              className="absolute top-[55%] right-0 z-10 flex h-[46px] w-[46px] -translate-y-1/2 items-center justify-center text-[#212121]"
            >
              <ChevronRight className="h-[46px] w-[46px]" strokeWidth={1.25} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
