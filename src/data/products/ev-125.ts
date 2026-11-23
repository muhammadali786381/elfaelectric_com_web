  import type { Product } from "./types";

const IMG = "/assets/images/products/ev-125";

export const ev125: Product = {
  slug: "ev-125",
  name: "EV-125 BIKE",
  shortName: "EV-125",
  title: "EV-125 bike",
  subtitle: "Designed to perform on rough and challenging roads!",
  metaTitle: "ELFA EV125 – Best electric bike in Pakistan",
  metaDescription:
    "ELFA EV-125 electric bike with 3,000W motor, 100+ km range, LiFePO4 battery. Limited offer — only PKR 335,000.",
  offerBadge: "Limited Time Offer: Save Rs. 10,000",
  priceOriginal: "PKR 345,000",
  priceCurrent: "PKR 335,000",
  priceTaxNote: "+ Tax Rs. 3,350",
  priceTagline: "Luxury Living, Smartly Priced",
  heroBackground: "/assets/images/Hero-Banner-Background.webp",
  heroImage: `${IMG}/newbikehero.png`,
  heroHoverImage: `${IMG}/125heroelfared.png`,
  heroAspect: 1642 / 958,
  heroSpecs: [
    { label: "Motor Power", value: "3,000 W", icon: `${IMG}/motor-icon.png` },
    { label: "Top Speed", value: "75 km/h", icon: `${IMG}/speed-icon.png` },
    { label: "Range", value: "100+ km", icon: `${IMG}/meter.png` },
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
  coreFeatureImage: "/assets/images/corefeatures.png",
  // Left: Motor / Range / Top Speed — Right: Capacity / Charging / Frame
  coreFeatures: [
    { title: "Motor Power", description: "3,000 W", icon: `${IMG}/motor-icon.png` },
    { title: "Battery Capacity", description: "72V / 30Ah", icon: `${IMG}/batter-icon.png` },
    {
      title: "Range",
      description: "100+ km\nper charge",
      icon: `${IMG}/meter.png`,
    },
    { title: "Charging Time", description: "2–3 hours", icon: `${IMG}/battery-icon.png` },
    { title: "Top Speed", description: "75 km/h", icon: `${IMG}/speed-icon.png` },
    { title: "Frame", description: "High-frame\nbuilt for durability", icon: `${IMG}/frame-icon.png` },
  ],
  advancedFeatures: [
    {
      title: "3 Different Speed Modes",
      image: `/assets/images/products/ev-125/bikespeedcontrols.png`,
      bullets: [
        {
          label: "Eco",
          text: "Unlock maximum efficiency and extended battery life.",
        },
        {
          label: "City",
          text: "Ideal for daily commutes, providing optimal speed for navigating traffic and frequent stops.",
        },
        {
          label: "Sports",
          text: "Enjoy uninterrupted acceleration and reach the bike’s highest speed.",
        },
      ],
    },
    {
      title: "Lithium Iron Phosphate (LiFePO4) Battery",
      image: `${IMG}/batterybike.png`,
      description:
        "With 3,000+ battery cycles, 2–3 hours of fast charging, and 100+ km of real-world range per charge, enjoy longer rides with less time spent charging. The EV-125 covers 1 km for just Rs. 1.",
    },
    {
      title: "Tubeless Tyres",
      image: `${IMG}/bikechromewheel.png`,
      description:
        "Optimised for stability and smooth handling, with an 18-inch front wheel and 17-inch rear wheel, ensuring a comfortable ride on challenging roads.",
    },
    {
      title: "Mobile App",
      image: "/assets/images/bikeapp/bikeapp4.png",
      description:
        "Track the performance of your bike’s range, speed mode, distance, fuel savings, battery status, carbon emissions reduction, driver statistics, and much more.\n\nEnjoy 3 months of free tracking with the ELFA App, followed by a one-time activation fee and subscription charges.",
      showStoreBadges: true,
    },
  ],
  specs: [
    {
      title: "Motor",
      icon: `${IMG}/spec-motor.webp`,
      items: ["Motor: 3,000 Watt", "Maximum Range: 100+ km"],
    },
    {
      title: "Performance",
      icon: `${IMG}/spec-performance.webp`,
      items: ["Top Speed: 75 km/h", "Speed Modes: Eco, City, Sports", "Reverse Mode", "Cruise Control: Available"],
    },
    {
      title: "Body",
      icon: `${IMG}/spec-body.webp`,
      items: [
        "Tyres: Tubeless",
        "Alloy Rims: Front and Rear",
        "Brakes: Front Drum and Rear Disc",
      ],
    },
    {
      title: "Battery",
      icon: `${IMG}/spec-battery.webp`,
      items: [
        "Battery: Lithium Iron Phosphate (LiFePO4)",
        "Battery Capacity: 72V / 30Ah",
        "Charging Time: 2–3 hours",
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
