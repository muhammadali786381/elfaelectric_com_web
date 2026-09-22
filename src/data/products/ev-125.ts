import type { Product } from "./types";

const IMG = "/assets/images/products/ev-125";

export const ev125: Product = {
  slug: "ev-125",
  name: "EV-125 BIKE",
  shortName: "EV-125",
  title: "EV-125 bike",
  subtitle: "Designed to perform on rough and\nchallenging roads!",
  metaTitle: "ELFA EV125 – Best electric bike in Pakistan",
  metaDescription:
    "ELFA EV-125 electric bike with 2,000W motor, 100+ km range, LiFePO4 battery. Limited offer — only PKR 335,000.",
  offerBadge: "Limited Time Offer Save 10K",
  priceOriginal: "PKR 345,000",
  priceCurrent: "PKR 335,000",
  priceTaxNote: "+ Tax Rs. 3,350",
  priceTagline: "Luxury Living, Smartly Priced",
  heroBackground: "/assets/images/Hero-Banner-Background.webp",
  heroImage: `${IMG}/bike.png`,
  heroSpecs: [
    { label: "Motor Power", value: "2,000 W", icon: `${IMG}/motor-icon.png` },
    { label: "Top Speed", value: "Up To 75 Km/h", icon: `${IMG}/speed-icon.png` },
    { label: "Range", value: "100+ KM", icon: `${IMG}/meter.png` },
  ],
  bookHref: "/book-a-test-ride",
  buyHref: "/product/elfaev125",
  colorTitle: "Upgrade Your Ride with Electric Energy",
  // 3 images → slider with arrows (rule: >2 enables slide)
  colorImages: [
    `${IMG}/black-bike.png`,
    `${IMG}/red-bike.png`,
    `${IMG}/silver-bike.png`,
  ],
  calculatorId: "ev125",
  coreFeatureImage: `${IMG}/core-bike.png`,
  // Left: Motor / Range / Top Speed — Right: Capacity / Charging / Frame
  coreFeatures: [
    { title: "Motor Power", description: "2,000 W", icon: `${IMG}/motor-icon.png` },
    {
      title: "Range",
      description: "100+ KM of real-world range per charge",
      icon: `${IMG}/meter.png`,
    },
    { title: "Top Speed", description: "Up To 75 Km/h", icon: `${IMG}/speed-icon.png` },
    { title: "Capacity", description: "72V/30Ah", icon: `${IMG}/batter-icon.png` },
    { title: "Charging", description: "Time: 2-3 Hours", icon: `${IMG}/battery-icon.png` },
    { title: "Frame", description: "Durable High-Frame", icon: `${IMG}/frame-icon.png` },
  ],
  advancedFeatures: [
    {
      title: "3 Different Speed Modes",
      image: `${IMG}/speed-modes.webp`,
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
      image: `${IMG}/battery-feature.webp`,
      description:
        "With 3,000 battery cycles, 2-3 hours fast charging, and 100+ Km of real-world range per charge, enjoy longer rides with less time spent charging, making it easy for anyone to sustain economic pressure, as ELFA EV-125 covers 1 Km for just 1 rupee.",
    },
    {
      title: "Tubeless Tyres",
      image: `${IMG}/tire.webp`,
      description:
        "Optimized for stability and smooth handling, our bikes feature an 18-inch front wheel and 17-inch rear wheel diameter, ensuring a comfortable ride on challenging roads.",
    },
    {
      title: "Mobile App",
      image: `${IMG}/app.webp`,
      description:
        "Track the performance of your bike’s range, speed mode, distance, carbon emissions reduction, fuel savings, battery status, driver statistics, and much more.",
      showStoreBadges: true,
    },
  ],
  specs: [
    {
      title: "Motor",
      icon: `${IMG}/spec-motor.webp`,
      items: ["Motor: 2,000 Watt", "Maximum Range: 100+ Km"],
    },
    {
      title: "Performance",
      icon: `${IMG}/spec-performance.webp`,
      items: ["Top Speed: Up to 75 Km/h", "Speed Modes: Eco, City, Sports & Reverse"],
    },
    {
      title: "Body",
      icon: `${IMG}/spec-body.webp`,
      items: [
        "Tyres: Tubeless",
        "Alloy Rims: Front & Rear",
        "Brakes: Front Drum & Rear Disc",
      ],
    },
    {
      title: "Battery",
      icon: `${IMG}/spec-battery.webp`,
      items: [
        "Battery: Lithium Iron Phosphate (LiFePO4) Battery",
        "Battery Capacity: 72V/30Ah",
        "Charging Time: 2-3 Hours",
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
