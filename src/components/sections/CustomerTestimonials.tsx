"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Play, Star } from "lucide-react";
import { useInView, useReducedMotion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay, EffectCoverflow } from "swiper/modules";
import type { Swiper as SwiperInstance } from "swiper";
import BookmarkButton from "@/components/ui/BookmarkButton";
import "swiper/css";
import "swiper/css/effect-coverflow";
import styles from "./CustomerTestimonials.module.css";

const customers = [
  { name: "Umer Farooq", city: "Karachi", model: "EV-125 BIKE", img: "/assets/images/customer-1a.jpg", text: "ELFA bike teen maheene se chala raha hoon. Excellent fuel savings — hisaab lagaya to PKR 10,000 per month bach rahe hain. Ye bike apna paisa khud wasool kar leti hai!" },
  { name: "Muhammad Nawab", city: "Lahore", model: "EV-125 BIKE", img: "/assets/images/customer-1-1.jpg", text: "ELFA EV bike teen maheene se use kar raha hoon, bohot achi performance hai aur petrol ka kharcha bilkul khatam ho gaya hai. Maintenance bhi na ke barabar hai." },
  { name: "Muhammad Hussain", city: "Islamabad", model: "EV-125 BIKE", img: "/assets/images/customer-4-1.jpg", text: "ELFA bike January 2025 mein khareedi thi ab 10 maheene ho gaye hain. Aaj tak koi complaint nahi aayi, baarish aur paani mein bhi perfect chalti hai. Main is se bohot mutma'in aur khush hoon!" },
  { name: "Farzan Raza", city: "Karachi", model: "EV-125 BIKE", img: "/assets/images/customer-8.jpg", text: "ELFA EV-125 6 maheenon se chala raha hoon. Pehle petrol wali 125 par roz ka 500-1000 rupay lagta tha, ab petrol ka kharcha zero hai. Maintenance bhi zero ke barabar hai." },
  { name: "Haji Zareen", city: "Quetta", model: "EV-1 Scooty", img: "/assets/images/customer-10.jpg", text: "ELFA Scooty 7-8 maheene se use kar raha hoon. Do dafa ise Quetta bus ke zariye le gaya hoon, bohot kaamyab aur aaraam deh ride hai. Yeh buzurg aur bari umar walon ke liye perfect ride hai!" },
  { name: "Ghareebo Khan Baloch", city: "Karachi", model: "EV-125 BIKE", img: "/assets/images/customer-9.jpg", text: "ELFA EV-125 use karte hue 9 maheene ho gaye hain. Har mahine paise bachte hain — na petrol ka kharcha, bohot aramdeh aur support bhi zabardast raha hai. Sab se zyada doston ko recommend kiya hai!" },
];

export default function CustomerTestimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { amount: 0.25 });
  const reducedMotion = useReducedMotion();
  const [swiper, setSwiper] = useState<SwiperInstance | null>(null);
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (!swiper || swiper.destroyed) return;
    if (inView && !reducedMotion && !hovered && !focused) swiper.autoplay.start();
    else swiper.autoplay.stop();
  }, [swiper, inView, reducedMotion, hovered, focused]);

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-labelledby="customer-testimonials-heading"
      aria-roledescription="carousel"
      onMouseEnter={() => { if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) setHovered(true); }}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}
    >
      <div className={styles.heading}>
        <h2 id="customer-testimonials-heading">Happy Customers</h2>
      </div>

      <Swiper
        modules={[A11y, Autoplay, EffectCoverflow]}
        onSwiper={setSwiper}
        onSlideChange={(instance) => setActive(instance.realIndex)}
        effect={reducedMotion ? "slide" : "coverflow"}
        coverflowEffect={{ rotate: 0, stretch: 80, depth: 0, scale: 0.7, slideShadows: false }}
        autoplay={{ delay: 4800, disableOnInteraction: false }}
        speed={reducedMotion ? 0 : 700}
        slidesPerView="auto"
        centeredSlides
        spaceBetween={24}
        loop
        grabCursor
        className={styles.slider}
      >
        {customers.map((customer, index) => (
          <SwiperSlide key={customer.name} className={styles.slide}>
            <article className={styles.card} aria-label={`Review ${index + 1} of ${customers.length}`}>
              <div className={styles.portrait}>
                <Image src={customer.img} alt={customer.name} fill sizes="88px" className={styles.photo} />
              </div>
              <h3>{customer.name}</h3>
              <p className={styles.details}>{customer.city}<span aria-hidden="true"> · </span>{customer.model}</p>
              <div className={styles.stars} aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }, (_, star) => <Star key={star} size={14} fill="currentColor" aria-hidden="true" />)}
              </div>
              <blockquote>“{customer.text}”</blockquote>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className={styles.footer}>
      <div className={styles.controls}>
        <button type="button" onClick={() => swiper?.slidePrev()} aria-label="Previous customer review"><ChevronLeft size={18} /></button>
        <div className={styles.dots} aria-label="Choose customer review">
          {customers.map((customer, index) => (
            <button type="button" key={customer.name} onClick={() => swiper?.slideToLoop(index)} aria-label={`Show review by ${customer.name}`} aria-current={active === index ? "true" : undefined} />
          ))}
        </div>
        <button type="button" onClick={() => swiper?.slideNext()} aria-label="Next customer review"><ChevronRight size={18} /></button>
      </div>
        <BookmarkButton className={styles.videoLink} href="/video-testimonials" icon={<Play className="icon fill-current" strokeWidth={0} />}>
          Watch Video Testimonials
        </BookmarkButton>
      </div>
    </section>
  );
}
