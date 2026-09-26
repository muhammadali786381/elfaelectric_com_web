import type { Metadata } from "next";
import ZigzagGallery from "@/components/sections/ZigzagGallery";
import ReelsCarousel from "@/components/sections/ReelsCarousel";

export const metadata: Metadata = {
  title: "EV Education – ELFA Electric | Learn About Electric Bikes",
  description:
    "Learn everything you need to know about EV bikes, charging, maintenance, and the future of electric mobility with ELFA Electric.",
};


const videolinks = {
  eveducation1: "https://youtube.com/shorts/rq5yBKq9z78?si=XJHFmXkBG9hZnlcn",
  eveducation2: "https://youtube.com/shorts/k28JtO6T0Jg?si=atD9AYMMlBeLnrxM",
  eveducation3: "https://youtube.com/shorts/ObLfaHpB0No?si=FCrpp44d-bIoA1i6",
  eveducation4: "https://youtube.com/shorts/gMJZWXSy9pE?si=dUHkDGAOxYCHflWB",
  eveducation5: "https://youtube.com/shorts/Ey00pZEDZ9E?si=Nz6S_yfbPjTEruBR",
  eveducation6: "https://youtube.com/shorts/jh2bhqdPu0I?si=xoIUJbyRshbGHx0f",
  eveducation7: "https://youtube.com/shorts/r_r9oB9SWzo?si=F1kdQNEHzkOYrlHU",
}




export default function EVEducationPage() {
  return (
    <main className="flex-1 bg-[#050505]">
      {/* ── Scroll-linked zigzag horizontal gallery ── */}
      <ZigzagGallery
        videoLinks={Object.values(videolinks)}
        headingLine1="EV"
        headingLine2="Education."
        subtitle="Learn everything you need to know about charging, maintenance, and the future of electric mobility with ELFA."
      />
      <ReelsCarousel reels={Object.values(videolinks)} />
    </main>
  );
}
