import type { Product } from "./types";

const IMG = "/assets/images/products/scooty-ev-1";

/** Live: https://elfaelectric.com/scooty-ev-1/ */
export const scootyEv1: Product = {
  slug: "scooty-ev-1",
  name: "EV-1 Scooty",
  shortName: "Scooty EV-1",
  title: "EV-1 Scooty",
  subtitle: "Engineered to Thrive on Challenging Local Roads!",
  metaTitle: "EV-1 Scooty – 2,000 W Electric Scooter in Pakistan",
  metaDescription:
    "Buy EV-1 Scooty: 2,000 W electric scooter with up to 80 km range, a top speed of 60 km/h, and a 72V/30Ah battery. Book a test ride.",
  offerBadge: "Limited-Time Offer – Save Rs. 10,000",
  priceOriginal: "PKR 270,000",
  priceCurrent: "PKR 260,000",
  priceTaxNote: "+ Tax Rs. 2,600",
  priceTagline: "Luxury Living, Smartly Priced",
  heroBackground: "/assets/images/Hero-Banner-Background.webp",
  heroImage: `${IMG}/newscoottyhero.png`,
  heroHoverImages: [`${IMG}/redscootyhero.png`, `${IMG}/silverscootyhero2.png`],
  heroAspect: 1536 / 1024,
  heroSpecs: [
    { label: "Motor Power", value: "2,000 W", icon: `${IMG}/motor-icon.png` },
    { label: "Top Speed", value: "60 km/h", icon: `${IMG}/speed-icon.png` },
    { label: "Range", value: "Up to 80 km", icon: `${IMG}/meter.png` },
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
    { title: "Motor Power", description: "2,000 W", icon: `${IMG}/motor-icon.png` },
    { title: "Range", description: "80 km", icon: `${IMG}/meter.png` },
    { title: "Top Speed", description: "Up to 60 km/h", icon: `${IMG}/speed-icon.png` },
    { title: "Capacity", description: "72V/30Ah", icon: `${IMG}/batter-icon.png` },
    { title: "Charging", description: "2–3 Hours", icon: `${IMG}/battery-icon.png` },
    { title: "Frame", description: "Durable High-Frame\nDesign", icon: `${IMG}/frame-icon.png` },
  ],
  // Live EV-1 has 3 advanced blocks (no Mobile App)
  advancedFeatures: [
    {
      title: "3 Different Speed Modes",
      image: `${IMG}/scootycontrols.png`,
      bullets: [
        {
          label: "Eco",
          text: "Maximise energy efficiency and extend battery life for longer, more economical rides.",
        },
        {
          label: "City",
          text: "Ideal for daily commutes, offering balanced speed and performance for navigating traffic.",
        },
        {
          label: "Sports",
          text: "Experience responsive acceleration and enhanced performance for a more dynamic ride.",
        },
      ],
    },
    {
      title: "Advanced LFP Battery",
      image: `${IMG}/scootybattery.png`,
      description:
        "Powered by Lithium Iron Phosphate (LiFePO4) technology, the battery offers over 3,000 charging cycles and fast charging in just 2–3 hours, delivering reliable performance and a range of up to 80 km.",
    },
    {
      title: "Tubeless Tyres",
      image: `${IMG}/scootywheel.png`,
      description:
        "Designed for stability and smooth handling, the EV-1 features 12-inch front and rear tubeless tyres for a comfortable riding experience across challenging road conditions.",
    },
  ],
  specs: [
    {
      title: "Motor",
      icon: `${IMG}/spec-motor.webp`,
      items: ["Motor: 2,000 Watt", "Maximum Range: 80 km"],
    },
    {
      title: "Performance",
      icon: `${IMG}/spec-performance.webp`,
      items: [
        "Top Speed: 60 km/h",
        "Speed Modes: Eco, City, Sports",
        "Reverse Mode",
        "Cruise Control: Available",
      ],
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
        "Battery: Lithium Iron Phosphate (LiFePO4)",
        "Battery Capacity: 72V/30Ah",
        "Charging Time: 2–3 Hours",
        "Charger: 10A",
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
