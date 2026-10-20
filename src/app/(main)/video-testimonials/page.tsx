import type { Metadata } from "next";
import ZigzagGallery from "@/components/sections/ZigzagGallery";
import SecondaryHero from "@/components/sections/SecondaryHero";

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
        <SecondaryHero
          titleLine1={
            <span className="max-[400px]:text-[46px]">
              Customer <span className="text-brand-primary">Stories.</span>
            </span>
          }
          description="Real ELFA riders share their experience — from daily commutes to zero fuel bills. Watch and be inspired."
          imageSrc="/assets/images/hero4.jpeg"
          imageAlt="ELFA Customer Stories"
        />
        <ZigzagGallery
          videoLinks={Object.values(videolinks)}
          showHeading={false}
        />
      </main>
    </>
  );
}
