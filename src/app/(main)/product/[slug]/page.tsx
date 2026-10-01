import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductPurchasePage from "@/components/product-purchase/ProductPurchasePage";
import {
  getAllPurchaseSlugs,
  getPurchaseProduct,
} from "@/data/products/purchase-index";

export const dynamic = "force-static";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllPurchaseSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getPurchaseProduct(slug);
  if (!product) return {};
  return {
    title: product.metaTitle,
    description: product.metaDescription,
  };
}

export default async function PurchaseProductRoute({ params }: Props) {
  const { slug } = await params;
  const product = getPurchaseProduct(slug);
  if (!product) notFound();

  return (
    <>
            <ProductPurchasePage product={product} />
          </>
  );
}
