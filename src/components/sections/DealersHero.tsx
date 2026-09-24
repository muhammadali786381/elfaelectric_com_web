import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/motion/FadeIn";

const FEATURES = [
  {
    label: (
      <>
        Digital
        <br />
        METer
      </>
    ),
    src: "/assets/images/dealers/digital-meter.webp",
    alt: "Digital meter",
  },
  {
    label: (
      <>
        Halogen
        <br />
        HEADLAMPS
      </>
    ),
    src: "/assets/images/dealers/halogen-headlamps.png",
    alt: "Halogen headlamps",
  },
  {
    label: (
      <>
        Halogen
        <br />
        TAIL LAMP
      </>
    ),
    src: "/assets/images/dealers/halogen-tail-lamp.png",
    alt: "Halogen tail lamp",
  },
  {
    label: (
      <>
        TUBELESS
        <br />
        TYREs
      </>
    ),
    src: "/assets/images/dealers/tubeless-tyres.png",
    alt: "Tubeless tyres",
  },
] as const;

/**
 * Matches live elfaelectric.com/our-dealers hero (~535px tall @1440):
 * inner pad ~30/16, feature→bike gap 0, bike ~575×372–389.
 */
export default function DealersHero() {
  return (
    <section className="relative flex items-center overflow-hidden lg:min-h-[535px]">
      <Image
        src="/assets/images/blog-hero-bg.jpg"
        alt=""
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-bg-inverse/25" />

      <div className="relative z-10 mx-auto w-full max-w-container px-4 py-8 sm:px-6 lg:py-0 lg:pt-[30px] lg:pb-4">
        {/* Mobile: text → bike → features. Desktop: text left | features + bike right */}
        <div className="flex flex-col items-center gap-5 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
          <div className="w-full max-w-[560px] text-center lg:max-w-[575px] lg:text-left">
            <h1 className="font-montserrat text-[22px] font-bold uppercase leading-[30px] text-text-inverse sm:text-[32px] sm:leading-[42px] lg:text-[35px] lg:leading-[46px]">
              Authorized
              <br />
              <span className="text-brand-primary">ELFA Electric Motorcycle</span>
              <br />
              Dealers Across Pakistan
            </h1>
            <p className="font-roboto mt-3 text-[16px] font-medium capitalize leading-[24px] text-text-inverse sm:mt-4 sm:text-[24px] sm:leading-[30px]">
              Find Your Nearest Showroom
            </p>
            <div className="font-roboto mt-3 flex items-center justify-center gap-2 text-[16px] text-text-inverse sm:mt-4 sm:text-[21px] lg:justify-start">
              <Link href="/" className="transition-colors hover:text-brand-primary">
                Home
              </Link>
              <span className="text-text-inverse/70">|</span>
              <span>Our Dealers</span>
            </div>
          </div>

          {/* Ref right col: features then bike, gap 0 */}
          <div className="flex w-full flex-col items-center gap-3 lg:max-w-[575px] lg:flex-1 lg:items-stretch lg:gap-0">
            {/* Bike first on mobile, under features on desktop */}
            <div className="relative order-1 mx-auto h-[200px] w-full max-w-[420px] sm:h-[260px] lg:order-2 lg:mx-0 lg:h-[372px] lg:max-w-none">
              <FadeIn variant="fadeIn" speed="slow" className="absolute inset-0" immediate>
                <Image
                  src="/assets/images/dealers/black-bike.png"
                  alt="ELFA EV-125 electric motorcycle"
                  fill
                  priority
                  className="object-contain object-bottom"
                  sizes="(max-width: 1024px) 90vw, 575px"
                />
              </FadeIn>
            </div>

            {/* Features — 4-up; ref gap 10px between cards */}
            <div className="order-2 grid w-full grid-cols-4 gap-1.5 sm:gap-2.5 lg:order-1 lg:gap-2.5">
              {FEATURES.map((f) => (
                <div key={f.alt} className="flex flex-col gap-1 text-center sm:gap-1.5">
                  <h2 className="font-montserrat text-[8px] font-bold uppercase leading-[1] text-text-inverse sm:text-[12px] lg:text-[18px] lg:leading-[18px]">
                    {f.label}
                  </h2>
                  <div className="relative mx-auto aspect-[136/73] w-full overflow-hidden rounded-[10px] border border-bg-primary/80">
                    <Image
                      src={f.src}
                      alt={f.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 22vw, 136px"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
