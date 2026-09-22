import type { ProductPurchase } from "./purchase-types";

const IMG = "/assets/images/products/ev-125";
const P = `${IMG}/purchase`;

export const purchaseEv125: ProductPurchase = {
  slug: "elfaev125",
  metaTitle: "ELFA EV-125 - ELFA Electric",
  metaDescription:
    "Buy ELFA EV-125 electric bike. Limited offer PKR 335,000. Choose color, view specs, and explore installment plans.",
  title: "ELFA EV-125",
  subtitle: "Designed to perform on rough and challenging roads!",
  offerBadge: "Limited Time Offer Save 10K",
  priceOriginal: "PKR 345,000",
  priceCurrent: "PKR 335,000",
  priceTaxNote: "+ Tax Rs. 3,350",
  variantLabel: "Color",
  variants: [
    {
      id: "black-ev-125-bike",
      label: "Black EV-125 bike",
      thumb: `${P}/thumb-black.png`,
      image: `${P}/black.png`,
    },
    {
      id: "red-ev-125-bike",
      label: "Red EV-125 bike",
      thumb: `${P}/thumb-red.png`,
      image: `${P}/red.png`,
    },
    {
      id: "silver-ev-125-bike",
      label: "Silver EV-125 bike",
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
        "Eco: Unlock the maximum efficiency and extended battery life of the bike.",
        "City: Ideal for daily commutes, providing you optimal speed for navigating through traffic and stops.",
        "Sports: With its uninterrupted acceleration, reach the bike’s highest speed.",
      ],
    },
    {
      title: "Lithium Power Cell Battery",
      description:
        "With 2,000 battery cycles, 2-hour fast charging, and a range of up to 100 KM, you can enjoy longer rides with less time spent charging. Our bikes make it easy for anyone to sustain economic pressure, as they cover 1 KM for just 1 rupee.",
    },
    {
      title: "Tubeless Tyres",
      description:
        "Optimized for stability and smooth handling, our bikes feature an 18-inch front wheel and 17-inch rear wheel diameter, ensuring a comfortable ride on challenging roads.",
    },
  ],
  galleryShortName: "EV-125",
  galleryImages: [
    `${IMG}/gallery-1.jpg`,
    `${IMG}/gallery-2.jpg`,
    `${IMG}/gallery-3.jpg`,
    `${IMG}/gallery-4.jpg`,
    `${IMG}/gallery-5.jpg`,
    `${IMG}/gallery-6.jpg`,
  ],
};
