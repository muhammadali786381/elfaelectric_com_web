import type { Product } from "@/data/products/types";
import ProductHero from "@/components/product/ProductHero";
import ProductColorCarousel from "@/components/product/ProductColorCarousel";
import ProductCoreFeatures from "@/components/product/ProductCoreFeatures";
import ProductAdvancedFeatures from "@/components/product/ProductAdvancedFeatures";
import ProductSpecs from "@/components/product/ProductSpecs";
import ProductGallery from "@/components/product/ProductGallery";
import SavingsCalculator from "@/components/sections/SavingsCalculator";
import CustomerFeedback from "@/components/sections/CustomerFeedback";
import Testimonials from "@/components/sections/Testimonials";
import AdventureCTA from "@/components/sections/AdventureCTA";
import Marquee from "@/components/sections/Marquee";
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
      <CustomerFeedback />
      <FinalCTA/>
      <ProductGallery
        shortName={product.shortName}
        buyHref={product.buyHref}
        images={product.galleryImages}
      />
      <Testimonials />
      <AdventureCTA />
      <Marquee />
    </main>
  );
}
