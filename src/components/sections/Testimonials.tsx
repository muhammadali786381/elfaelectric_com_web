"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, Play, ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { motion } from "framer-motion";
import FlipButton from "@/components/ui/FlipButton";

const testimonials = [
  {
    name: "Umer Farooq",
    city: "Karachi",
    model: "EV-125 BIKE",
    img: "/assets/images/customer-1a.jpg",
    rating: 5,
    text: "ELFA bike teen maheene se chala raha hoon. Excellent fuel savings — hisaab lagaya to PKR 10,000 per month bach rahe hain. Ye bike apna paisa khud wasool kar leti hai!",
  },
  {
    name: "Muhammad Nawab",
    city: "Lahore",
    model: "EV-125 BIKE",
    img: "/assets/images/customer-1-1.jpg",
    rating: 5,
    text: "ELFA EV bike teen maheene se use kar raha hoon, bohot achi performance hai aur petrol ka kharcha bilkul khatam ho gaya hai. Maintenance bhi na ke barabar hai.",
  },
  {
    name: "Muhammad Hussain",
    city: "Islamabad",
    model: "EV-125 BIKE",
    img: "/assets/images/customer-4-1.jpg",
    rating: 5,
    text: "ELFA bike January 2025 mein khareedi thi ab 10 maheene ho gaye hain. Aaj tak koi complaint nahi aayi, baarish aur paani mein bhi perfect chalti hai. Main is se bohot mutma'in aur khush hoon!",
  },
  {
    name: "Farzan Raza",
    city: "Karachi",
    model: "EV-125 BIKE",
    img: "/assets/images/customer-8.jpg",
    rating: 5,
    text: "ELFA EV-125 6 maheenon se chala raha hoon. Pehle petrol wali 125 par roz ka 500-1000 rupay lagta tha, ab petrol ka kharcha zero hai. Maintenance bhi zero ke barabar hai.",
  },
  {
    name: "Haji Zareen",
    city: "Quetta",
    model: "EV-1 Scooty",
    img: "/assets/images/customer-10.jpg",
    rating: 5,
    text: "ELFA Scooty 7-8 maheene se use kar raha hoon. Do dafa ise Quetta bus ke zariye le gaya hoon, bohot kaamyab aur aaraam deh ride hai. Yeh buzurg aur bari umar walon ke liye perfect ride hai!",
  },
  {
    name: "Ghareebo Khan Baloch",
    city: "Karachi",
    model: "EV-125 BIKE",
    img: "/assets/images/customer-9.jpg",
    rating: 5,
    text: "ELFA EV-125 use karte hue 9 maheene ho gaye hain. Har mahine paise bachte hain — na petrol ka kharcha, bohot aramdeh aur support bhi zabardast raha hai. Sab se zyada doston ko recommend kiya hai!",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1 mb-4" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={`h-4 w-4 ${s <= rating ? "fill-[#ffc107] text-[#ffc107]" : "fill-transparent text-white/20"}`}
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="bg-[#050505] py-16 lg:py-24 overflow-hidden">
      <style>{`
        .testimonials-swiper .swiper-pagination {
          position: absolute;
          bottom: 0px !important;
        }
        .testimonials-swiper .swiper-pagination-bullet {
          width: 6px;
          height: 6px;
          background: rgba(255,255,255,0.2);
          opacity: 1;
          border-radius: 9999px;
          transition: all 0.3s ease;
        }
        .testimonials-swiper .swiper-wrapper {
          align-items: stretch;
        }
        .testimonials-swiper .swiper-slide {
          height: auto;
        }
        .testimonials-swiper .swiper-pagination-bullet-active {
          width: 24px;
          background: var(--color-brand-primary);
          border-radius: 9999px;
        }
        .swiper-button-disabled {
          opacity: 0.35 !important;
          cursor: not-allowed !important;
          background: rgba(255,255,255,0.05) !important;
          color: white !important;
        }
      `}</style>

      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 relative">
        {/* Header section with split layout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6"
        >
          <h2 className="font-montserrat text-[32px] font-bold text-white sm:text-[40px] lg:text-[48px] leading-tight">
            Happy Customers
          </h2>

          <FlipButton
            href="/video-testimonials"
            variant="outline"
            icon={<Play className="h-5 w-5 fill-current" strokeWidth={2} />}
            className="font-roboto h-[48px] rounded-full px-6 text-[13px] tracking-[1px] uppercase font-bold border-white/20 hover:border-brand-primary shrink-0"
          >
            Watch Video Testimonials
          </FlipButton>
        </motion.div>

        {/* Swiper Container */}
        <div className="relative mx-auto w-full">
          {/* Custom Navigation Arrows */}
          <button className="swiper-button-prev-custom absolute left-0 sm:-left-4 lg:-left-6 top-1/2 z-10 -translate-y-1/2 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-white/10 bg-black/50 text-white backdrop-blur-md transition-all hover:bg-brand-primary hover:text-black hover:border-brand-primary shadow-xl">
            <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>

          <button className="swiper-button-next-custom absolute right-0 sm:-right-4 lg:-right-6 top-1/2 z-10 -translate-y-1/2 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-white/10 bg-black/50 text-white backdrop-blur-md transition-all hover:bg-brand-primary hover:text-black hover:border-brand-primary shadow-xl">
            <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>

          <Swiper
            modules={[Pagination, Autoplay, Navigation]}
            pagination={{ clickable: true }}
            navigation={{
              nextEl: ".swiper-button-next-custom",
              prevEl: ".swiper-button-prev-custom",
            }}
            autoplay={{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }}
            loop={true}
            speed={600}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="testimonials-swiper !pb-16 px-2"
          >
            {testimonials.map((t, index) => (
              <SwiperSlide key={index} className="h-auto">
                <div className="flex h-full flex-col max-w-[360px] mx-auto bg-[#0a0a0c] text-white rounded-[24px] border border-white/5 transition-all duration-300 hover:border-brand-primary/30 group shadow-lg">
                  {/* Image Container */}
                  <div className="relative overflow-hidden rounded-t-[24px]">
                    <Image
                      src={t.img}
                      alt={t.name}
                      width={400}
                      height={300}
                      className="h-[270px] w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Gradient overlay from bottom */}
                    <div className="absolute bottom-0 z-10 h-32 w-full bg-gradient-to-t from-[#0a0a0c] to-transparent pointer-events-none"></div>
                  </div>

                  {/* Content Container */}
                  <div className="flex flex-1 flex-col px-6 pb-8 pt-2">
                    <StarRating rating={t.rating} />

                    <p className="font-roboto text-[15px] font-medium leading-relaxed text-white/90 border-b border-white/10 pb-6 flex-1">
                      "{t.text}"
                    </p>

                    <div className="mt-6">
                      <p className="font-montserrat text-[16px] font-semibold text-white">
                        — {t.name}
                      </p>
                      <p className="font-roboto mt-1 text-[13px] font-normal text-white/50">
                        {t.city}
                      </p>
                      {/* <p className="font-roboto mt-3 inline-block rounded-full bg-brand-primary/10 border border-brand-primary/20 px-3 py-1 text-[12px] font-semibold text-brand-primary uppercase tracking-wide">
                        {t.model}
                      </p> */}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
