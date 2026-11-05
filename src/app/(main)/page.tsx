import Hero from "@/components/sections/hero";
import CityMarquee from "@/components/sections/CityMarquee";
import SpinningBolt from "@/components/sections/SpinningBolt";
import AboutUs from "@/components/sections/AboutUs";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import InteractiveProductShowcase from "@/components/sections/InteractiveProductShowcase";
import Solutions from "@/components/sections/Solutions";
import SavingsCalculator from "@/components/sections/SavingsCalculator";
import OriginalTestimonials from "@/components/sections/Testimonials";
import CustomerTestimonials from "@/components/sections/CustomerTestimonials";
import Welcome from "@/components/sections/Welcome";
import FAQ from "@/components/sections/FAQ";
import AdventureCTA from "@/components/sections/AdventureCTA";
import { videoLinks } from "@/data/video-links";
import OriginalReelsCarousel from "@/components/sections/ReelsCarousel";
import ReelsGallery from "@/components/sections/ReelsGallery";

// Static page — fully pre-rendered at build time for maximum performance
export const dynamic = "force-static";

// Set to "original" to restore the previous customer section.
const testimonialsVariant: "original" | "slider" = "slider";
const Testimonials = { original: OriginalTestimonials, slider: CustomerTestimonials }[testimonialsVariant];

// Set to "original" to restore the previous reels carousel.
const reelsVariant: "original" | "gallery" = "gallery";
const ReelsCarousel = { original: OriginalReelsCarousel, gallery: ReelsGallery }[reelsVariant];

export default function Home() {
  return (
    <>
      <main className="flex-1">
        <Hero />
        <CityMarquee />
        <SpinningBolt />
        <AboutUs />
        <WhyChooseUs />
        <InteractiveProductShowcase />
        <Solutions />
        <SavingsCalculator />
        <Testimonials />
        <ReelsCarousel reels={videoLinks} />
        {/* <Welcome /> */}
        <FAQ />
        <AdventureCTA />
      </main>
    </>
  );
}
