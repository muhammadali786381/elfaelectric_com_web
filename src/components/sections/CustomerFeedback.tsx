"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Heart, ThumbsUp, Play, ChevronLeft, ChevronRight, X } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// Real videos + thumbnails pulled directly from the live site's carousel
// (each slide is a lightbox link with a YouTube embed src).
const videos = [
  { title: "End_Frame", thumb: "/assets/images/End_Frame.jpg", youtubeId: "C3-GxOpgu_4" },
  { title: "Thumbnail", thumb: "/assets/images/Thumbnail.jpg", youtubeId: "HLvrKI3gR5U" },
  { title: "End_Frame-1", thumb: "/assets/images/End_Frame-1.jpg", youtubeId: "SSH8M8xy64k" },
  { title: "End_Frame-2", thumb: "/assets/images/End_Frame-2.jpg", youtubeId: "qWajE9foGCE" },
];

export default function CustomerFeedback() {
  const swiperRef = useRef<SwiperType | null>(null);
  const [openVideo, setOpenVideo] = useState<string | null>(null);

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
            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => swiperRef.current?.slidePrev()}
                aria-label="Previous"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#61ce70] text-white transition-colors hover:bg-[#4fbf5f]"
              >
                <ChevronLeft className="h-5 w-5" strokeWidth={2.5} />
              </button>

              {/* Matches the live site's Elementor "coverflow" carousel
                  (skin:coverflow, loop, 5s autoplay, 500ms speed) using
                  Swiper's own effect-coverflow demo pattern. */}
              <Swiper
                modules={[Autoplay, EffectCoverflow, Navigation, Pagination]}
                effect="coverflow"
                grabCursor
                centeredSlides
                slidesPerView="auto"
                loop
                speed={500}
                autoplay={{ delay: 2000, disableOnInteraction: false, pauseOnMouseEnter: false }}
                coverflowEffect={{ rotate: 50, stretch: 0, depth: 100, modifier: 1, slideShadows: true }}
                pagination={{ clickable: true }}
                onSwiper={(s) => {
                  swiperRef.current = s;
                }}
                className="w-full max-w-[380px] !pb-10"
              >
                {[...videos, ...videos, ...videos].map((v, i) => (
                  <SwiperSlide key={`${v.youtubeId}-${i}`} className="!w-[130px]">
                    <button
                      type="button"
                      onClick={() => setOpenVideo(v.youtubeId)}
                      aria-label={`Play video: ${v.title}`}
                      className="relative block aspect-[2/3] w-full overflow-hidden rounded-[10px] border-2 border-[#61ce70] bg-black shadow-xl"
                    >
                      <Image src={v.thumb} alt={v.title} fill className="object-cover" sizes="130px" />
                      <div className="absolute inset-0 bg-black/25" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-black/30">
                          <Play className="h-3.5 w-3.5 fill-white text-white" />
                        </div>
                      </div>
                    </button>
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

      {openVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
          onClick={() => setOpenVideo(null)}
        >
          <button
            type="button"
            onClick={() => setOpenVideo(null)}
            aria-label="Close video"
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <X className="h-6 w-6" />
          </button>
          <div
            className="aspect-video w-full max-w-3xl overflow-hidden rounded-[12px] bg-black"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={`https://www.youtube.com/embed/${openVideo}?autoplay=1&rel=0`}
              title="Customer feedback video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="h-full w-full"
            />
          </div>
        </div>
      )}
    </section>
  );
}
