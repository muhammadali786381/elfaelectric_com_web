import type { Metadata } from "next";
import ZigzagGallery from "@/components/sections/ZigzagGallery";
import SecondaryHero from "@/components/sections/SecondaryHero";

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
      <SecondaryHero
        titleLine1={
          <span className="max-[400px]:text-[46px]">
            EV <span className="text-brand-primary">Education</span>
          </span>
        }
        description="Learn everything you need to know about charging, maintenance, and the future of electric mobility with ELFA."
        imageSrc="/assets/images/hero4.jpeg"
        imageAlt="ELFA EV Education"
      />
      {/* ── Scroll-linked zigzag horizontal gallery ── */}
      <ZigzagGallery
        videoLinks={Object.values(videolinks)}
        showHeading={false}
      />
    </main>
  );
}
