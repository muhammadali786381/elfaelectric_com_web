"use client";

import Image from "next/image";
import { Heart, ThumbsUp, Play, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";

const videos = [
  { name: "Muhammad Hussain", img: "/assets/images/customer-4-1.jpg" },
  { name: "Agay Bashir", img: "/assets/images/customer-3-1.jpg" },
  { name: "Umer Farooq", img: "/assets/images/customer-1a.jpg" },
  { name: "Zia", img: "/assets/images/customer-2-1.jpg" },
];

export default function CustomerFeedback() {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section
      className="relative overflow-hidden py-16 lg:py-20"
      style={{ backgroundImage: "linear-gradient(135deg, #1a1a1a 0%, #010404 55%, #103d1e 100%)" }}
    >
      <div className="relative z-10 mx-auto w-full max-w-[1150px] px-4 sm:px-6">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          {/* Customer photo + floating decorative icons */}
          <div className="relative mx-auto w-full max-w-[400px] lg:max-w-none">
            <Heart className="absolute -left-4 -top-4 z-20 h-12 w-12 -rotate-12 fill-[#ff4d2e] text-[#ff4d2e] drop-shadow-lg" />
            <ThumbsUp className="absolute -top-6 right-8 z-20 h-11 w-11 fill-[#2f7cf6] text-[#2f7cf6] drop-shadow-lg" />
            <div className="relative aspect-[644/569] w-full overflow-hidden rounded-[16px]">
              <Image
                src="/assets/images/feedback.webp"
                alt="ELFA customer"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 560px, 400px"
              />
            </div>
          </div>

          {/* Video testimonial carousel + heading */}
          <div className="relative">
            <div className="flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => swiperRef.current?.slidePrev()}
                aria-label="Previous"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#61ce70] text-white transition-colors hover:bg-[#4fbf5f]"
              >
                <ChevronLeft className="h-5 w-5" strokeWidth={2.5} />
              </button>

              <Swiper
                modules={[Autoplay]}
                slidesPerView={3}
                centeredSlides
                spaceBetween={14}
                speed={500}
                autoplay={{ delay: 5000, pauseOnMouseEnter: true, disableOnInteraction: true }}
                onSwiper={(s) => {
                  swiperRef.current = s;
                }}
                className="w-full max-w-[380px] !overflow-visible [&_.swiper-slide]:transition-transform [&_.swiper-slide]:duration-300 [&_.swiper-slide-active]:z-10 [&_.swiper-slide-active]:scale-125"
              >
                {videos.map((v) => (
                  <SwiperSlide key={v.name} className="!h-auto">
                    <div className="relative aspect-[2/3] overflow-hidden rounded-[10px] border-2 border-[#61ce70] bg-black shadow-xl">
                      <Image src={v.img} alt={v.name} fill className="object-cover" sizes="120px" />
                      <div className="absolute inset-0 bg-black/25" />
                      <Image
                        src="/assets/images/logo.png"
                        alt=""
                        width={60}
                        height={11}
                        className="absolute left-1.5 top-1.5 h-auto w-[38px] brightness-0 invert"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-black/30">
                          <Play className="h-3 w-3 fill-white text-white" />
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              <button
                type="button"
                onClick={() => swiperRef.current?.slideNext()}
                aria-label="Next"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#61ce70] text-white transition-colors hover:bg-[#4fbf5f]"
              >
                <ChevronRight className="h-5 w-5" strokeWidth={2.5} />
              </button>
            </div>

            <div className="relative mt-10 flex items-center justify-center gap-4 lg:justify-start">
              <h2 className="font-anton text-[48px] italic leading-[0.95] text-white sm:text-[64px] lg:text-[72px]">
                CUSTOMER
                <br />
                FEEDBACK
              </h2>
              <div className="hidden shrink-0 sm:block">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#ff1414] shadow-lg">
                  <Play className="h-7 w-7 fill-white text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
