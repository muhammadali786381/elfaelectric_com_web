export type Spec = {
  value: string;
  label: string;
  icon: string;
};

export type Slide =
  | {
      id: string;
      layout: "split";
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
      title: string;
      subtitle: string;
      productImage: string;
      productAlt: string;
    };

export const slides: Slide[] = [
  {
    id: "ev125",
    layout: "split",
    title: "EV-125 BIKE",
    subtitle: "Designed to perform on rough and\nchallenging roads!",
    productImage: "/assets/images/ev125-hero.webp",
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
    title: "Advanced Lithium Iron Phosphate\nBatteries",
    subtitle: "Safer and longer-lasting than graphene.",
    productImage: "/assets/images/bike-red.png",
    productAlt: "ELFA bike with LiFePO4 battery",
  },
];
