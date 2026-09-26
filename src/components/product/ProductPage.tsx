import type { Product } from "@/data/products/types";
import ProductHero from "@/components/product/ProductHero";
import ProductColorCarousel from "@/components/product/ProductColorCarousel";
import ProductCoreFeatures from "@/components/product/ProductCoreFeatures";
import ProductAdvancedFeatures from "@/components/product/ProductAdvancedFeatures";
import ProductSpecs from "@/components/product/ProductSpecs";
import ProductGallery from "@/components/product/ProductGallery";
import ReelsCarousel from "@/components/sections/ReelsCarousel";
import SavingsCalculator from "@/components/sections/SavingsCalculator";
import { dummyVideoLinks } from "@/data/video-links";
import Testimonials from "@/components/sections/Testimonials";
import AdventureCTA from "@/components/sections/AdventureCTA";

import FinalCTA from "../sections/FinalCTA";

/** Shared product page layout — pass EV-125 / EV-1 (etc.) data. */
export default function ProductPage({ product }: { product: Product }) {
  return (
    <main className="flex-1">
      <ProductHero product={product} />
      <ProductColorCarousel title={product.colorTitle} images={product.colorImages} />
      <SavingsCalculator productId={product.calculatorId} />
      <ProductCoreFeatures
        features={product.coreFeatures}
        centerImage={product.coreFeatureImage}
        productName={product.name}
      />
      <ProductAdvancedFeatures features={product.advancedFeatures} />
      <ProductSpecs groups={product.specs} />
      {/* <FinalCTA/> */}
      <ProductGallery
        shortName={product.shortName}
        buyHref={product.buyHref}
        images={product.galleryImages}
      />
      <ReelsCarousel reels={dummyVideoLinks} />
      <Testimonials />
      <AdventureCTA />
      
    </main>
  );
}
