import Image from "next/image";
import Link from "next/link";

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

export default function DealersHero() {
  return (
    <section className="relative flex min-h-[480px] items-center overflow-hidden sm:min-h-[520px] lg:min-h-[620px]">
      <Image
        src="/assets/images/blog-hero-bg.jpg"
        alt=""
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/25" />

      <div className="relative z-10 mx-auto w-full max-w-container px-4 py-10 sm:px-6 sm:py-12 lg:py-14">
        {/* Mobile: text → bike → features (all centered). Desktop: text left | features + bike right */}
        <div className="flex flex-col items-center gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
          <div className="w-full max-w-[560px] text-center lg:text-left">
            <h1 className="font-montserrat text-[22px] font-bold uppercase leading-[30px] text-white sm:text-[32px] sm:leading-[42px] lg:text-[35px] lg:leading-[46px]">
              Authorized
              <br />
              <span className="text-[#61ce70]">ELFA Electric Motorcycle</span>
              <br />
              Dealers Across Pakistan
            </h1>
            <p className="font-roboto mt-3 text-[16px] font-medium capitalize leading-[24px] text-white sm:mt-4 sm:text-[24px] sm:leading-[30px]">
              Find Your Nearest Showroom
            </p>
            <div className="font-roboto mt-3 flex items-center justify-center gap-2 text-[16px] text-white sm:mt-4 sm:text-[21px] lg:justify-start">
              <Link href="/" className="transition-colors hover:text-[#61ce70]">
                Home
              </Link>
              <span className="text-white/70">|</span>
              <span>Our Dealers</span>
            </div>
          </div>

          <div className="flex w-full flex-col items-center gap-5 lg:max-w-[620px] lg:flex-1 lg:items-stretch">
            {/* Bike first on mobile, second on desktop */}
            <div className="relative order-1 mx-auto h-[180px] w-full max-w-[420px] sm:h-[240px] lg:order-2 lg:h-[300px] lg:max-w-none">
              <Image
                src="/assets/images/dealers/black-bike.png"
                alt="ELFA EV-125 electric motorcycle"
                fill
                priority
                className="object-contain object-bottom"
                sizes="(max-width: 1024px) 90vw, 520px"
              />
            </div>

            {/* Features below bike on mobile, above bike on desktop — 4 in a row */}
            <div className="order-2 grid w-full grid-cols-4 gap-1.5 sm:gap-3 lg:order-1 lg:gap-4">
              {FEATURES.map((f) => (
                <div key={f.alt} className="text-center">
                  <h2 className="font-montserrat mb-1 text-[8px] font-bold uppercase leading-tight text-white sm:mb-1.5 sm:text-[12px] lg:text-[18px]">
                    {f.label}
                  </h2>
                  <div className="relative mx-auto aspect-[958/492] w-full overflow-hidden rounded-[3px] border border-white/80 sm:rounded-[4px]">
                    <Image
                      src={f.src}
                      alt={f.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 22vw, 160px"
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
