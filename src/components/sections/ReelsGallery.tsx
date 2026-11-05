"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, useInView, useReducedMotion } from "framer-motion";
import { ExternalLink, Play } from "lucide-react";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay, EffectCoverflow } from "swiper/modules";
import type { Swiper as SwiperInstance } from "swiper";
import VideoModal from "@/components/ui/VideoModal";
import { resolveSocialReel, type ReelPlatform, type SocialReel, type VideoLink } from "@/lib/social-reels";
import "swiper/css";
import "swiper/css/effect-coverflow";
import styles from "./ReelsGallery.module.css";

const platformLabels: Record<ReelPlatform, string> = {
  youtube: "YouTube", instagram: "Instagram", linkedin: "LinkedIn", tiktok: "TikTok", other: "Social",
};

export default function ReelsGallery({ reels }: { reels: readonly VideoLink[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const inView = useInView(sectionRef, { amount: 0.2 });
  const reducedMotion = useReducedMotion();
  const [swiper, setSwiper] = useState<SwiperInstance | null>(null);
  const [activeVideo, setActiveVideo] = useState<SocialReel | null>(null);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const items = useMemo(() => reels.map(resolveSocialReel).filter((item): item is SocialReel => item !== null), [reels]);
  // Enough slides to loop a full-width ribbon without an empty edge.
  const slides = items.length > 1 ? Array.from({ length: Math.max(2, Math.ceil(24 / items.length)) }, () => items).flat() : items;

  useEffect(() => {
    if (!swiper || swiper.destroyed) return;
    if (inView && !reducedMotion && !hovered && !focused && !activeVideo && items.length > 1) {
      swiper.autoplay.start();
    } else {
      const position = swiper.getTranslate();
      const transforms = swiper.slides.map((slide) => getComputedStyle(slide).transform);
      swiper.autoplay.stop();
      // Freeze the current frame too, rather than finishing a long glide on hover.
      swiper.setTransition(0);
      swiper.setTranslate(position);
      swiper.animating = false;
      swiper.updateActiveIndex();
      swiper.updateSlidesClasses();
      swiper.slides.forEach((slide, index) => { slide.style.transform = transforms[index]; });
    }
  }, [swiper, inView, reducedMotion, hovered, focused, activeVideo, items.length]);

  if (!items.length) return null;

  return (
    <section ref={sectionRef} className={styles.section} aria-labelledby="reels-gallery-heading" aria-roledescription="carousel">
      <div className={styles.heading}>
        <h2 id="reels-gallery-heading">Explore Our <span>Socials</span></h2>
        <p>See how audiences are engaging with ELFA across YouTube, Instagram, LinkedIn and TikTok.</p>
      </div>

      <div
        className={styles.gallery}
        onFocusCapture={() => setFocused(true)}
        onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}
      >
        <Swiper
          modules={[A11y, Autoplay, EffectCoverflow]}
          onSwiper={setSwiper}
          effect={reducedMotion ? "slide" : "coverflow"}
          coverflowEffect={{ rotate: 12, depth: -65, stretch: 0, scale: 1, modifier: (offset) => Math.max(-3.5, Math.min(3.5, offset)), slideShadows: false }}
          autoplay={{ delay: 0, disableOnInteraction: false }}
          speed={reducedMotion ? 0 : 3200}
          slidesPerView="auto"
          centeredSlides
          spaceBetween={20}
          loop={items.length > 1}
          loopAdditionalSlides={items.length > 1 ? 4 : 0}
          watchSlidesProgress
          grabCursor
          className={styles.slider}
        >
          {slides.map((item, index) => (
            <SwiperSlide key={`${item.url}-${index}`} className={styles.slide}>
              {({ isVisible }) => (
                <button
                  type="button"
                  className={styles.card}
                  tabIndex={isVisible ? 0 : -1}
                  aria-label={`${item.embedUrl ? "Play" : "Open"} ${platformLabels[item.platform]} ${item.embedUrl ? "video" : "post (opens in a new tab)"}`}
                  onPointerEnter={(event) => { if (event.pointerType === "mouse") setHovered(true); }}
                  onPointerLeave={(event) => { if (event.pointerType === "mouse") setHovered(false); }}
                  onClick={(event) => {
                    if (swiper && !swiper.allowClick) return;
                    if (item.embedUrl) {
                      triggerRef.current = event.currentTarget;
                      setActiveVideo(item);
                    } else window.open(item.url, "_blank", "noopener,noreferrer");
                  }}
                >
                  {item.thumbnail && (
                    // Social thumbnails can be remote and have a platform-specific fallback.
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={item.thumbnail} alt="" loading="lazy" draggable={false}
                      style={{ objectPosition: item.thumbnailPosition ?? "center" }}
                      onError={(event) => {
                        if (item.thumbnailFallback && event.currentTarget.src !== item.thumbnailFallback) event.currentTarget.src = item.thumbnailFallback;
                        else event.currentTarget.style.visibility = "hidden";
                      }}
                    />
                  )}
                  <span className={styles.play} aria-hidden="true">
                    {item.platform === "instagram" ? <FaInstagram size={22} />
                      : item.platform === "linkedin" ? <FaLinkedinIn size={20} />
                        : item.embedUrl ? <Play size={20} fill="currentColor" /> : <ExternalLink size={20} />}
                  </span>
                  <span className={styles.platform}>{platformLabels[item.platform]}</span>
                </button>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <AnimatePresence>
        <VideoModal isOpen={activeVideo !== null} videoUrl={activeVideo?.embedUrl ?? null}
          sourceUrl={activeVideo?.url} sourceLabel={activeVideo ? platformLabels[activeVideo.platform] : undefined}
          onClose={() => { setActiveVideo(null); triggerRef.current?.focus({ preventScroll: true }); }} />
      </AnimatePresence>
    </section>
  );
}
