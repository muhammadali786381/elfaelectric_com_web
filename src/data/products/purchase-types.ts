export type ProductPurchaseVariant = {
  id: string;
  label: string;
  thumb: string;
  image: string;
};

export type ProductPurchaseFeature = {
  title: string;
  /** Bullet lines (Eco/City or battery points) */
  bullets?: string[];
  /** Paragraph body (e.g. EV-125 lithium / tyres) */
  description?: string;
};

/** WooCommerce-style single product / buy page */
export type ProductPurchase = {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  title: string;
  subtitle: string;
  offerBadge?: string;
  priceOriginal?: string;
  priceCurrent: string;
  priceTaxNote?: string;
  variantLabel: string;
  variants: ProductPurchaseVariant[];
  installmentHref: string;
  /** Primary purchase CTA — contact until cart exists */
  buyHref: string;
  features: ProductPurchaseFeature[];
  /** Reused by ProductGallery */
  galleryShortName: string;
  galleryImages: string[];
};
