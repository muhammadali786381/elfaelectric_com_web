import type { Product } from "./types";

const IMG = "/assets/images/products/scooty-ev-1";

/** Live: https://elfaelectric.com/scooty-ev-1/ */
export const scootyEv1: Product = {
  slug: "scooty-ev-1",
  name: "EV-1 Scooty",
  shortName: "Scooty EV-1",
  title: "EV-1 Scooty",
  subtitle: "Engineered To Thrive On Challenging\nLocal Roads!",
  metaTitle: "EV-1 Scooty – 1500W Electric Scooter in Pakistan",
  metaDescription:
    "Buy EV-1 Scooty: Pakistan’s best 1500W electric scooter. 75km range, 60km/h, 60V battery. Affordable and eco-friendly. Book test ride now!",
  offerBadge: "Limited Time Offer Save 10K",
  priceOriginal: "PKR 270,000",
  priceCurrent: "PKR 260,000",
  priceTaxNote: "+ Tax Rs. 2,600",
  priceTagline: "Luxury Living, Smartly Priced",
  heroBackground: "/assets/images/Hero-Banner-Background.webp",
  heroImage: `${IMG}/hero-scooty.png`,
  heroSpecs: [
    { label: "Motor Power", value: "1,500 W", icon: `${IMG}/motor-icon.png` },
    { label: "Top Speed", value: "Up To 60 Km/h", icon: `${IMG}/speed-icon.png` },
    { label: "Range", value: "75 Km", icon: `${IMG}/meter.png` },
  ],
  bookHref: "/book-a-test-ride",
  buyHref: "/product/ev1-scooty",
  colorTitle: "Upgrade Your Ride with Electric Energy",
  // 1 image → static (≤2 = no arrows / no slide)
  colorImages: [`${IMG}/color-scooty.png`],
  calculatorId: "ev1",
  coreFeatureImage: `${IMG}/core-scooty.png`,
  // Left: Motor / Range / Top Speed — Right: Capacity / Charging / Frame
  coreFeatures: [
    { title: "Motor Power", description: "1,500 W", icon: `${IMG}/motor-icon.png` },
    { title: "Range", description: "75 Km", icon: `${IMG}/meter.png` },
    { title: "Top Speed", description: "Up To 60 Km/h", icon: `${IMG}/speed-icon.png` },
    { title: "Capacity", description: "64V/30Ah", icon: `${IMG}/batter-icon.png` },
    { title: "Charging", description: "Time: 2-3 Hours", icon: `${IMG}/battery-icon.png` },
    { title: "Frame", description: "Durable High-Frame", icon: `${IMG}/frame-icon.png` },
  ],
  // Live EV-1 has 3 advanced blocks (no Mobile App)
  advancedFeatures: [
    {
      title: "3 Different Speed Modes",
      image: `${IMG}/speed-modes.png`,
      bullets: [
        {
          label: "Eco",
          text: "Unlock the maximum efficiency and extended battery life of the bike.",
        },
        {
          label: "City",
          text: "Ideal for daily commutes, providing you optimal speed for navigating through traffic and stops.",
        },
        {
          label: "Sports",
          text: "With its uninterrupted acceleration, reach the bike’s highest speed.",
        },
      ],
    },
    {
      title: "lithium iron phosphate (LiFePO4) battery",
      image: `${IMG}/battery-feature.png`,
      description:
        "With 2,000 battery cycles, 2-3 hours fast charging, and a range of 75 Km, enjoy longer rides with less time spent charging, making it easy for anyone to sustain economic pressure.",
    },
    {
      title: "Tubeless Tyres",
      image: `${IMG}/tire.png`,
      description:
        "Optimized for stability and smooth handling, our bikes feature an 12-inch front wheel and 12-inch rear wheel diameter, ensuring a comfortable ride on challenging roads.",
    },
  ],
  specs: [
    {
      title: "Motor",
      icon: `${IMG}/spec-motor.webp`,
      items: ["Motor: 1,500 W", "Maximum Range: 75 Km"],
    },
    {
      title: "Performance",
      icon: `${IMG}/spec-performance.webp`,
      items: ["Top Speed: 60 Km/h", "Speed Modes: Eco, City & Sports"],
    },
    {
      title: "Body",
      icon: `${IMG}/spec-body.webp`,
      items: [
        "Tyres: Tubeless",
        "Alloy Rims: Front & Rear",
        "Brakes: Front Disc, Rear Drum",
      ],
    },
    {
      title: "Battery",
      icon: `${IMG}/spec-battery.webp`,
      items: [
        "Battery: Lithium Iron Phosphate (LiFePO4) Battery",
        "Battery Capacity: 64V/30Ah",
        "Charging Time: 2-3 Hours",
        "Charger: 8A",
      ],
    },
  ],
  galleryImages: [
    `${IMG}/gallery-1.jpg`,
    `${IMG}/gallery-2.jpg`,
    `${IMG}/gallery-3.jpg`,
    `${IMG}/gallery-4.jpg`,
    `${IMG}/gallery-5.jpg`,
    `${IMG}/gallery-6.jpg`,
  ],
};
