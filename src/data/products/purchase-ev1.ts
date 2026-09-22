import type { ProductPurchase } from "./purchase-types";

const IMG = "/assets/images/products/scooty-ev-1";
const P = `${IMG}/purchase`;

export const purchaseEv1: ProductPurchase = {
  slug: "ev1-scooty",
  metaTitle: "EV 1 Scooty - ELFA Electric",
  metaDescription:
    "Buy EV 1 Scooty electric scooter. Limited offer PKR 260,000. Choose color, view features, and explore installment plans.",
  title: "EV 1 Scooty",
  subtitle: "Engineered To Thrive On Challenging Local Roads!",
  offerBadge: "Limited Time Offer Save 10K",
  priceOriginal: "PKR 270,000",
  priceCurrent: "PKR 260,000",
  priceTaxNote: "+ Tax Rs. 2,600",
  variantLabel: "Scooty Color",
  variants: [
    {
      id: "ev-1-scooty-silver",
      label: "EV-1 Scooty Silver",
      thumb: `${P}/thumb-silver.png`,
      image: `${P}/silver.png`,
    },
  ],
  installmentHref: "/installment-plans",
  buyHref: "/contact-us",
  features: [
    {
      title: "3 Different Speed Modes",
      bullets: [
        "Eco: Unlock maximum efficiency and extend battery life.",
        "City: Perfect for daily commutes, providing optimal speed for navigating through traffic.",
        "Sports: With uninterrupted acceleration, reach the bike’s highest speed.",
      ],
    },
    {
      title: "Lithium Power Cell Battery",
      bullets: [
        "1,500 battery cycles for long-lasting performance.",
        "2-hour fast charging.",
        "Range of up to 75 KM on a single charge.",
        "Cost-effective: covers 1 KM for just 1 rupee.",
      ],
    },
    {
      title: "Tubeless Tyres",
      bullets: [
        "12-inch front and rear wheel diameter.",
        "Optimized for stability and smooth handling.",
        "Ensures a comfortable ride on challenging roads.",
      ],
    },
  ],
  galleryShortName: "Scooty EV-1",
  galleryImages: [
    `${IMG}/gallery-1.jpg`,
    `${IMG}/gallery-2.jpg`,
    `${IMG}/gallery-3.jpg`,
    `${IMG}/gallery-4.jpg`,
    `${IMG}/gallery-5.jpg`,
    `${IMG}/gallery-6.jpg`,
  ],
};
