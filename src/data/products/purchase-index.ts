import type { ProductPurchase } from "./purchase-types";
import { purchaseEv125 } from "./purchase-ev125";
import { purchaseEv1 } from "./purchase-ev1";

const PURCHASE_BY_SLUG: Record<string, ProductPurchase> = {
  [purchaseEv125.slug]: purchaseEv125,
  [purchaseEv1.slug]: purchaseEv1,
};

export function getPurchaseProduct(slug: string): ProductPurchase | undefined {
  return PURCHASE_BY_SLUG[slug];
}

export function getAllPurchaseSlugs(): string[] {
  return Object.keys(PURCHASE_BY_SLUG);
}
