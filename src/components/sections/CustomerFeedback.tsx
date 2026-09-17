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
    <section className="relative overflow-hidden py-16 lg:py-20">
      <div className="absolute inset-0">
        <Image
          src="/assets/images/Customer-Feedback-Background.jpg"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1150px] px-4 sm:px-6">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div className="relative flex justify-center">
            <Heart className="absolute -left-2 top-2 h-10 w-10 -rotate-12 fill-[#ff4d2e] text-[#ff4d2e]" />
            <ThumbsUp className="absolute right-4 top-0 h-9 w-9 fill-[#2f7cf6] text-[#2f7cf6]" />
            <div className="relative h-[380px] w-[300px] overflow-hidden rounded-[16px]">
              <Image
                src="/assets/images/customer-5-1.jpg"
                alt="ELFA customer"
                fill
                className="object-cover"
                sizes="300px"
              />
            </div>
          </div>

          <div className="relative">
            <Swiper
              modules={[Autoplay]}
              slidesPerView={2.4}
              centeredSlides
              spaceBetween={16}
              loop
              speed={500}
              autoplay={{ delay: 5000, pauseOnMouseEnter: true, disableOnInteraction: true }}
              onSwiper={(s) => {
                swiperRef.current = s;
              }}
              className="!pb-2"
            >
              {videos.map((v) => (
                <SwiperSlide key={v.name}>
                  {({ isActive }) => (
                    <div
                      className={`relative aspect-[3/5] overflow-hidden rounded-[16px] border-2 border-[#61ce70] bg-black transition-transform duration-300 ${
                        isActive ? "scale-105" : "scale-90 opacity-70"
                      }`}
                    >
                      <Image src={v.img} alt={v.name} fill className="object-cover" sizes="200px" />
                      <div className="absolute inset-0 bg-black/20" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white bg-black/30">
                          <Play className="h-5 w-5 fill-white text-white" />
                        </div>
                      </div>
                    </div>
                  )}
                </SwiperSlide>
              ))}
            </Swiper>

            <h2 className="font-montserrat mt-8 text-center text-[42px] font-black italic leading-[0.95] tracking-tight text-white sm:text-[56px]">
              CUSTOMER
              <br />
              FEEDBACK
            </h2>

            <div className="mt-6 flex justify-center gap-4">
              <button
                type="button"
                onClick={() => swiperRef.current?.slidePrev()}
                aria-label="Previous"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#61ce70] text-white transition-colors hover:bg-[#4fbf5f]"
              >
                <ChevronLeft className="h-5 w-5" strokeWidth={2.5} />
              </button>
              <button
                type="button"
                onClick={() => swiperRef.current?.slideNext()}
                aria-label="Next"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#61ce70] text-white transition-colors hover:bg-[#4fbf5f]"
              >
                <ChevronRight className="h-5 w-5" strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
