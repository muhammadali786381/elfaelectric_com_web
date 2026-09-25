"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, Play } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { FadeIn } from "@/components/motion/FadeIn";
import FlipButton from "@/components/ui/FlipButton";
import { motion } from "motion/react";

const testimonials = [
  {
    name: "Umer Farooq",
    city: "Karachi",
    model: "EV-125 BIKE",
    ownership: "3 months",
    img: "/assets/images/customer-1a.jpg",
    rating: 5,
    text: "ELFA bike teen maheene se chala raha hoon. Excellent fuel savings — hisaab lagaya to PKR 10,000 per month bach rahe hain. Ye bike apna paisa khud wasool kar leti hai!",
  },
  {
    name: "Muhammad Nawab",
    city: "Lahore",
    model: "EV-125 BIKE",
    ownership: "3 months",
    img: "/assets/images/customer-1-1.jpg",
    rating: 5,
    text: "ELFA EV bike teen maheene se use kar raha hoon, bohot achi performance hai aur petrol ka kharcha bilkul khatam ho gaya hai. Maintenance bhi na ke barabar hai.",
  },
  {
    name: "Muhammad Hussain",
    city: "Islamabad",
    model: "EV-125 BIKE",
    ownership: "10 months",
    img: "/assets/images/customer-4-1.jpg",
    rating: 5,
    text: "ELFA bike January 2025 mein khareedi thi ab 10 maheene ho gaye hain. Aaj tak koi complaint nahi aayi, baarish aur paani mein bhi perfect chalti hai. Main is se bohot mutma'in aur khush hoon!",
  },
  {
    name: "Farzan Raza",
    city: "Karachi",
    model: "EV-125 BIKE",
    ownership: "6 months",
    img: "/assets/images/customer-8.jpg",
    rating: 5,
    text: "ELFA EV-125 6 maheenon se chala raha hoon. Pehle petrol wali 125 par roz ka 500-1000 rupay lagta tha, ab petrol ka kharcha zero hai. Maintenance bhi zero ke barabar hai.",
  },
  {
    name: "Haji Zareen",
    city: "Quetta",
    model: "EV-1 Scooty",
    ownership: "7–8 months",
    img: "/assets/images/customer-10.jpg",
    rating: 5,
    text: "ELFA Scooty 7-8 maheene se use kar raha hoon. Do dafa ise Quetta bus ke zariye le gaya hoon, bohot kaamyab aur aaraam deh ride hai. Yeh buzurg aur bari umar walon ke liye perfect ride hai!",
  },
  {
    name: "Ghareebo Khan Baloch",
    city: "Karachi",
    model: "EV-125 BIKE",
    ownership: "9 months",
    img: "/assets/images/customer-9.jpg",
    rating: 5,
    text: "ELFA EV-125 use karte hue 9 maheene ho gaye hain. Har mahine paise bachte hain — na petrol ka kharcha, bohot aramdeh aur support bhi zabardast raha hai. Sab se zyada doston ko recommend kiya hai!",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1" aria-label={`${rating} out of 5 stars`}>
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
    <section className="bg-[#050505] py-8 lg:py-12">
      <style>{`
        .testimonials-swiper .swiper-pagination {
          position: static;
          margin-top: 2rem;
        }
        .testimonials-swiper .swiper-pagination-bullet {
          width: 6px;
          height: 6px;
          background: rgba(255,255,255,0.2);
          opacity: 1;
          border-radius: 9999px;
          transition: all 0.3s ease;
        }
        .testimonials-swiper .swiper-pagination-bullet-active {
          width: 32px;
          background: var(--color-brand-primary);
          border-radius: 9999px;
        }
      `}</style>

      <div className="mx-auto w-full max-w-container px-4 sm:px-6">

        {/* Heading */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 text-center"
        >
          <p className="font-roboto mb-3 text-[12px] font-semibold uppercase tracking-[2px] text-brand-primary">
            Real riders, real results
          </p>
          <h2 className="font-montserrat text-[32px] font-bold text-text-primary sm:text-[40px] lg:text-[48px]">
            Our Happy Customers
          </h2>
        </motion.div>

          {/* Swiper */}
          <div className="mx-auto max-w-[900px]">
            <Swiper
              modules={[Pagination, Autoplay]}
              pagination={{ clickable: true }}
              autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
              loop
              speed={600}
              className="testimonials-swiper"
            >
              {testimonials.map((t) => (
                <SwiperSlide key={t.name}>
                  <div className="grid h-[600px] grid-cols-1 overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] sm:h-[340px] sm:grid-cols-[260px_1fr] lg:h-[360px] lg:grid-cols-[320px_1fr]">

                    {/* Photo panel */}
                    <div className="relative h-[260px] w-full sm:h-full">
                      <Image
                        src={t.img}
                        alt={t.name}
                        fill
                        className="object-cover object-top"
                        sizes="(max-width: 640px) 100vw, 320px"
                      />
                      {/* Gradient fade right on desktop */}
                      <div className="absolute inset-0 hidden sm:block" style={{ background: "linear-gradient(to right, transparent 60%, #0a0a0c)" }} />
                      {/* Bottom fade on mobile */}
                      <div className="absolute inset-0 sm:hidden" style={{ background: "linear-gradient(to top, #0a0a0c 10%, transparent)" }} />
                    </div>

                    {/* Content panel */}
                    <div className="flex flex-col justify-center gap-5 px-6 py-8 sm:px-10 lg:px-12 lg:py-12">
                      <StarRating rating={t.rating} />

                      <blockquote className="font-roboto text-[15px] leading-relaxed text-white/80 sm:text-[16px] lg:text-[17px]">
                        "{t.text}"
                      </blockquote>

                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <p className="font-montserrat text-[17px] font-bold text-text-primary">
                          {t.name}
                        </p>
                        <span className="h-1 w-1 rounded-full bg-white/20" />
                        <p className="font-roboto text-[13px] text-white/40">{t.city}</p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <span className="font-roboto rounded-full border border-brand-primary/30 bg-brand-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[1px] text-brand-primary">
                          {t.model}
                        </span>
                        <span className="font-roboto rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-white/40">
                          Owner · {t.ownership}
                        </span>
                      </div>
                    </div>

                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Video Testimonials CTA */}
          <div className="mt-10 text-center">
            <FlipButton
              href="/video-testimonials"
              variant="primary"
              icon={<Play className="h-4 w-4 fill-zinc-950 text-zinc-950" />}
              className="h-14 border-2 border-[#00c965] shadow-[0_0_20px_rgba(0,229,115,0.2)]"
            >
              Watch Video Testimonials
            </FlipButton>
          </div>

        </div>
    </section>
  );
}
