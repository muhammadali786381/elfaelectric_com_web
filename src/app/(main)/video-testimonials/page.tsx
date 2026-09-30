import type { Metadata } from "next";
import ZigzagGallery from "@/components/sections/ZigzagGallery";
import Marquee from "@/components/sections/Marquee";

export const metadata: Metadata = {
  title: "Video Testimonials – ELFA Electric | Real Rider Stories",
  description:
    "Watch real ELFA Electric customers share their experiences — from zero fuel bills to smooth daily commutes. Pakistan's most trusted electric bike brand.",
};

const videolinks = {
  tetimonial1: "https://youtube.com/shorts/RkFVIILXdBY?si=O1v5w3PXcJsXgBfe",
  tetimonial2: "https://youtube.com/shorts/2wgJnUKDVKo?si=z-AKltByDgtRb15S",
  tetimonial3: "https://youtube.com/shorts/S7PqYgzrkdg?si=7_fHGn66FlgZcmXO",
  tetimonial4: "https://youtube.com/shorts/am2yJ9Crt_U?si=cG-QDVbVlEglsOx4",
  tetimonial5: "https://youtube.com/shorts/Kpaw8TmkFsk?si=6e0GSGq2kjBoWd4k",
  tetimonial6: "https://youtube.com/shorts/Ac4toR009lM?si=GWU_kXvD-pdRtJ81",
}

export default function VideoTestimonialsPage() {
  return (
    <>
      <main className="flex-1 bg-[#050505]">
        <ZigzagGallery videoLinks={Object.values(videolinks)} />

      </main>
    </>
  );
}
