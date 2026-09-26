import type { ProductPurchase } from "@/data/products/purchase-types";
import ProductPurchaseDetail from "@/components/product-purchase/ProductPurchaseDetail";
import ProductPurchaseFeatures from "@/components/product-purchase/ProductPurchaseFeatures";
import ProductGallery from "@/components/product/ProductGallery";
import ReelsCarousel from "@/components/sections/ReelsCarousel";
import Testimonials from "@/components/sections/Testimonials";
import { dummyVideoLinks } from "@/data/video-links";


/** Shared buy / product-detail page — gallery + testimonials reused from marketing pages. */
export default function ProductPurchasePage({ product }: { product: ProductPurchase }) {
  return (
    <main className="flex-1">
      <ProductPurchaseDetail product={product} />
      <ProductPurchaseFeatures features={product.features} />
      <ProductGallery shortName={product.galleryShortName} images={product.galleryImages} />
      <ReelsCarousel reels={dummyVideoLinks} />
      <Testimonials />
    </main>
  );
}
