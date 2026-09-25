import type { Product } from "@/data/products/types";
import ScootyHero from "@/components/scooty/ScootyHero";
import ScootyShowcase from "@/components/scooty/ScootyShowcase";
import ProductCoreFeatures from "@/components/product/ProductCoreFeatures";
import ProductAdvancedFeatures from "@/components/product/ProductAdvancedFeatures";
import ProductSpecs from "@/components/product/ProductSpecs";
import ProductGallery from "@/components/product/ProductGallery";
import SavingsCalculator from "@/components/sections/SavingsCalculator";
import Testimonials from "@/components/sections/Testimonials";
import AdventureCTA from "@/components/sections/AdventureCTA";
import Marquee from "@/components/sections/Marquee";
import ScootyMetaSection from "@/components/scooty/ScootyMetaSection";

/** EV-1 Scooty dedicated page — lighter, modern personality vs EV-125 */
export default function ScootyPage({ product }: { product: Product }) {
  return (
    <main className="flex-1">
      {/* Hero: larger scooty, no partition, urban grid bg */}
      <ScootyHero product={product} />

      {/* Scooty Showcase: clean full-width view, replaces color comparison slider */}
      <ScootyShowcase
        image={product.colorImages[0]}
        title={product.colorTitle}
        productName={product.name}
      />

      {/* Savings Calculator */}
      <SavingsCalculator productId={product.calculatorId} />

      {/* Core Features: animated emerge from scooty */}
      <ProductCoreFeatures
        features={product.coreFeatures}
        centerImage={product.coreFeatureImage}
        productName={product.name}
      />

      {/* Advanced Features */}
      <ProductAdvancedFeatures features={product.advancedFeatures} />

      {/* Specifications */}
      <ProductSpecs groups={product.specs} />

      {/* Product Gallery */}
      <ProductGallery
        shortName={product.shortName}
        buyHref={product.buyHref}
        images={product.galleryImages}
      />

      {/* Top Performing on Meta
      <ScootyMetaSection /> */}

      {/* Testimonials */}
      <Testimonials />

      {/* CTA */}
      <AdventureCTA />

      {/* Marquee */}
      <Marquee />
    </main>
  );
}
