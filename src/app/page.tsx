import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import ProductShowcase from "@/components/sections/ProductShowcase";
import SavingsCalculator from "@/components/sections/SavingsCalculator";
import Features from "@/components/sections/Features";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";

// Static page — fully pre-rendered at build time for maximum performance
export const dynamic = "force-static";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <ProductShowcase />
        <Features />
        <SavingsCalculator />
        <WhyChooseUs />
        <Testimonials />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
