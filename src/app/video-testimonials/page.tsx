import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ZigzagGallery from "@/components/sections/ZigzagGallery";
import Marquee from "@/components/sections/Marquee";

export const metadata: Metadata = {
  title: "Video Testimonials – ELFA Electric | Real Rider Stories",
  description:
    "Watch real ELFA Electric customers share their experiences — from zero fuel bills to smooth daily commutes. Pakistan's most trusted electric bike brand.",
};

export default function VideoTestimonialsPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-[#050505]">



        {/* ── Scroll-linked zigzag horizontal gallery ── */}
        <ZigzagGallery />



      </main>
      <Footer />
    </>
  );
}
