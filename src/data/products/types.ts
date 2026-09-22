export type ProductHeroSpec = {
  label: string;
  value: string;
  icon: string;
};

export type ProductCoreFeature = {
  title: string;
  description: string;
  icon: string;
};

export type ProductAdvancedFeature = {
  title: string;
  image: string;
  description?: string;
  /** Optional bullet lines (e.g. Eco / City / Sports) */
  bullets?: { label: string; text: string }[];
  /** Show App Store / Play badges under this block */
  showStoreBadges?: boolean;
};

export type ProductSpecGroup = {
  title: string;
  icon: string;
  items: string[];
};

export type Product = {
  slug: string;
  name: string;
  /** Short name for gallery title etc. */
  shortName: string;
  title: string;
  subtitle: string;
  metaTitle: string;
  metaDescription: string;
  offerBadge?: string;
  priceOriginal?: string;
  priceCurrent: string;
  priceTaxNote?: string;
  priceTagline?: string;
  heroBackground: string;
  /** Single product photo in the hero (no slider). */
  heroImage: string;
  heroSpecs: ProductHeroSpec[];
  bookHref: string;
  buyHref: string;
  /** Color / variant carousel under hero. ≤2 = static; >2 = slider with arrows */
  colorTitle: string;
  colorImages: string[];
  calculatorId: "ev125" | "ev1";
  /** Center bike image in Core Features (live ~529×500) */
  coreFeatureImage: string;
  /** First 3 = left column, next 3 = right column */
  coreFeatures: ProductCoreFeature[];
  advancedFeatures: ProductAdvancedFeature[];
  specs: ProductSpecGroup[];
  galleryImages: string[];
};

export const STORE_BADGES = {
  googlePlay: "/assets/images/products/ev-125/google-play.webp",
  appStore: "/assets/images/products/ev-125/app-store.webp",
} as const;
