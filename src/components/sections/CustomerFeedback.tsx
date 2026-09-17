"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Play, ChevronLeft, ChevronRight, X } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// Real videos + thumbnails pulled directly from the live site's carousel
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
      className="relative overflow-hidden"
      style={{
        backgroundImage: "url('/assets/images/Customer-Feedback-Background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "50% 50%",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Floating social icons — live ::before; keep on all breakpoints */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-[length:364px] bg-center bg-no-repeat md:bg-cover"
        style={{ backgroundImage: "url('/assets/images/Customer-feedback-icon.webp')" }}
        aria-hidden
      />

      {/* Mobile (<768): carousel top, image bottom. md+: image | carousel */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1150px] flex-col items-center md:grid md:min-h-[443px] md:grid-cols-[1.15fr_1fr] md:items-center lg:min-h-[569px]">
        {/* Customer cutout — bottom on mobile, left on md+ */}
        <div className="relative order-2 mx-auto w-full max-w-[400px] md:order-1 md:mx-0 md:max-w-none md:self-stretch">
          <div className="relative aspect-[644/569] w-full overflow-hidden md:absolute md:inset-0 md:aspect-auto">
            <Image
              src="/assets/images/feedback.webp"
              alt="ELFA customer"
              fill
              className="object-cover object-left md:object-fill"
              sizes="(min-width: 768px) 50vw, 400px"
              priority={false}
            />
          </div>
        </div>

        {/* Carousel + heading — top on mobile, right on md+ */}
        <div className="relative order-1 w-full px-3 py-8 sm:px-4 md:order-2 md:max-w-[486px] md:justify-self-end md:px-2 md:py-6 lg:py-8">
          {/* Arrows tight against the slider (live overlaps slightly) */}
          <div className="relative mx-auto flex max-w-[360px] items-center sm:max-w-[380px]">
            <button
              type="button"
              onClick={() => swiperRef.current?.slidePrev()}
              aria-label="Previous"
              className="absolute left-0 z-20 -translate-x-1/2 text-white transition-opacity hover:opacity-80"
            >
              <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2.5} />
            </button>

            <Swiper
              modules={[Autoplay, EffectCoverflow, Pagination]}
              effect="coverflow"
              grabCursor
              /* Live Elementor: 3 / 2 / 3 with spaceBetween 10 — no extra gap */
              slidesPerView={3}
              spaceBetween={10}
              breakpoints={{
                0: { slidesPerView: 3, spaceBetween: 10 },
                767: { slidesPerView: 2, spaceBetween: 10 },
                1024: { slidesPerView: 3, spaceBetween: 10 },
              }}
              loop
              speed={500}
              autoplay={{ delay: 2000, disableOnInteraction: false, pauseOnMouseEnter: false }}
              coverflowEffect={{ rotate: 50, stretch: 0, depth: 100, modifier: 1, slideShadows: true }}
              pagination={{ clickable: true }}
              onSwiper={(s) => {
                swiperRef.current = s;
              }}
              className="feedback-swiper w-full !pb-8"
            >
              {[...videos, ...videos, ...videos].map((v, i) => (
                <SwiperSlide key={`${v.youtubeId}-${i}`}>
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
              className="absolute right-0 z-20 translate-x-1/2 text-white transition-opacity hover:opacity-80"
            >
              <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2.5} />
            </button>
          </div>

          <h2 className="font-anton mt-4 text-center text-[40px] italic uppercase leading-[0.95] text-white sm:text-[64px] lg:text-[95px]">
            CUSTOMER
            <br />
            FEEDBACK
          </h2>
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
