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
      layout: "center";
      background: string;
      title: string;
      subtitle: string;
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
    id: "battery",
    layout: "center",
    // Live site uses a single flat background photo for this slide — no
    // separate floating product cutout.
    background: "/assets/images/home-page.jpg",
    title: "Advanced Lithium Iron Phosphate\nBatteries",
    subtitle: "Safer and longer-lasting than graphene.",
  },
];
