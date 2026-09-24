export type Spec = {
  value: string;
  label: string;
  icon: string;
};

export type Slide =
  | {
      id: string;
      layout: "split";
      background: string;
      title: string;
      subtitle: string;
      productImage: string;
      productAlt: string;
      specs: Spec[];
      exploreHref: string;
    }
  | {
      id: string;
      layout: "banner";
      /** Full-bleed composed banner (desktop). */
      image: string;
      /** Optional taller crop for small screens. */
      imageMobile?: string;
      alt: string;
      href: string;
    };

export const slides: Slide[] = [
  {
    id: "ev125",
    layout: "split",
    // Full-bleed product photo — live site uses this as the left-column
    // image itself (edge-to-edge, cropped), not a floating cutout.
    background: "/assets/images/Hero-Banner-Background.webp",
    title: "EV-125 BIKE",
    subtitle: "Designed to perform on rough and\nchallenging roads!",
    productImage: "/assets/images/removed-ppr.webp",
    productAlt: "ELFA EV-125 electric bike",
    exploreHref: "/ev-125",
    specs: [
      { value: "72V / 30Ah", label: "BATTERY\nCAPACITY", icon: "/assets/images/battery.webp" },
      { value: "Up to 75 Km/h", label: "TOP SPEED", icon: "/assets/images/untitled-2.webp" },
      { value: "2,000 Watt", label: "MOTOR POWER", icon: "/assets/images/motor-power.webp" },
      { value: "100+ Km", label: "RANGE", icon: "/assets/images/range.webp" },
    ],
  },
  {
    id: "scooty",
    layout: "split",
    background: "/assets/images/Hero-Banner-Background.webp",
    title: "EV-1 Scooty",
    subtitle: "Ready to handle every local\nroad challenge.",
    productImage: "/assets/images/scooty-hero.webp",
    productAlt: "ELFA EV-1 Scooty",
    exploreHref: "/scooty-ev-1",
    specs: [
      { value: "64V / 30Ah", label: "BATTERY\nCAPACITY", icon: "/assets/images/battery.webp" },
      { value: "Up to 60 Km/h", label: "TOP SPEED", icon: "/assets/images/untitled-2.webp" },
      { value: "1,500 Watt", label: "MOTOR POWER", icon: "/assets/images/motor-power.webp" },
      { value: "75 Km", label: "RANGE", icon: "/assets/images/range.webp" },
    ],
  },
  {
    id: "pave",
    layout: "banner",
    image: "/assets/images/hero-pave-gr.webp",
    imageMobile: "/assets/images/hero-pave-gr-vertical.webp",
    alt: "PAVE pre-booking — get Rs. 80,000 government subsidy on ELFA EV125 and EV1",
    href: "https://docs.google.com/forms/d/e/1FAIpQLSdxnx9J7GDgtDHg3_jnbsRfdYb_dR79s9VJc0xZ4kKxqcsA1w/viewform",
  },
];
