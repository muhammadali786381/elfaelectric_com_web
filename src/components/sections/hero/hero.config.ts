/**
 * Mirrors the live site's Elementor nested-carousel `data-settings` for the
 * hero widget: autoplay_speed 5000, speed 500, infinite/loop true,
 * pause_on_hover/pause_on_interaction true, slides_to_show 1, arrows yes.
 */
export const heroSwiperConfig = {
  loop: true,
  speed: 500,
  slidesPerView: 1,
  autoplay: {
    delay: 5000,
    pauseOnMouseEnter: true,
    disableOnInteraction: true,
  },
} as const;
