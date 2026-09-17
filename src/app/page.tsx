import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/hero";
import ProductShowcase from "@/components/sections/ProductShowcase";
import SavingsCalculator from "@/components/sections/SavingsCalculator";
import Welcome from "@/components/sections/Welcome";
import Features from "@/components/sections/Features";
import RideFeatures from "@/components/sections/RideFeatures";
import HeadlineBanner from "@/components/sections/HeadlineBanner";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";
import Marquee from "@/components/sections/Marquee";

// Static page — fully pre-rendered at build time for maximum performance
export const dynamic = "force-static";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <ProductShowcase />
        <SavingsCalculator />
        <Welcome />
        <Features />
        {/* Live site repeats this CTA banner twice — once here, once near the footer */}
        <FinalCTA />
        <RideFeatures />
        <HeadlineBanner />
        <WhyChooseUs />
        <Testimonials />
        <FAQ />
        <FinalCTA />
        <Marquee />
      </main>
      <Footer />
    </>
  );
}
