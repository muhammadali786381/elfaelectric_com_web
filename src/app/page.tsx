import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/hero";
import CityMarquee from "@/components/sections/CityMarquee";
import Marquee from "@/components/sections/Marquee";
import AboutUs from "@/components/sections/AboutUs";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import ProductShowcase from "@/components/sections/ProductShowcase";
import Solutions from "@/components/sections/Solutions";
import SavingsCalculator from "@/components/sections/SavingsCalculator";
import Testimonials from "@/components/sections/Testimonials";
import Welcome from "@/components/sections/Welcome";
import FAQ from "@/components/sections/FAQ";
import AdventureCTA from "@/components/sections/AdventureCTA";

// Static page — fully pre-rendered at build time for maximum performance
export const dynamic = "force-static";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <CityMarquee />
        {/* <Marquee /> */}
        <AboutUs />
        <WhyChooseUs />
        <ProductShowcase />
        <Solutions />
        <SavingsCalculator />
        <Testimonials />
        {/* <Welcome /> */}
        <FAQ />
        <AdventureCTA />
      </main>
      <Footer />
    </>
  );
}
