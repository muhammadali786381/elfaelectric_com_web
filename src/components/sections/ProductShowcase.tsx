import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/motion/FadeIn";
import FlipButton from "@/components/ui/FlipButton";

type Spec = { value: string; label: string; icon: string };

const products = [
  {
    id: "ev125",
    nameHighlight: "EV-125",
    nameRest: " BIKE",
    image: "/assets/images/EV-125-BIKE-1-1.webp",
    specs: [
      { value: "72V / 30Ah", label: "BATTERY", icon: "/assets/images/battery.webp" },
      { value: "Up to 75 Km/h", label: "Top speed", icon: "/assets/images/untitled-2.webp" },
      { value: "2,000 Watt", label: "motor power", icon: "/assets/images/motor-power.webp" },
      { value: "100+ km", label: "range", icon: "/assets/images/range.webp" },
    ] as Spec[],
    oldPrice: "PKR 345,000",
    price: "PKR 335,000 + tax",
    savings: "Save PKR 10,000 and Buy now",
    exploreHref: "/ev-125",
    buyHref: "/ev-125",
  },
  {
    id: "ev1",
    nameHighlight: "EV-1",
    nameRest: " Scooty",
    image: "/assets/images/ne-a.webp",
    specs: [
      { value: "64V / 30Ah", label: "BATTERY", icon: "/assets/images/battery.webp" },
      { value: "Up to 60 Km/h", label: "Top speed", icon: "/assets/images/untitled-2.webp" },
      { value: "1,500 Watt", label: "motor power", icon: "/assets/images/motor-power.webp" },
      { value: "75 Km", label: "range", icon: "/assets/images/range.webp" },
    ] as Spec[],
    oldPrice: "PKR 270,000",
    price: "PKR 260,000 + tax",
    savings: "Save PKR 10,000 and Buy now",
    exploreHref: "/scooty-ev-1",
    buyHref: "/scooty-ev-1",
  },
];

export default function ProductShowcase() {
  return (
    <section className="bg-bg-primary py-16 lg:py-20">
      <FadeIn variant="fadeIn" speed="slow">
        <h2 className="font-montserrat mb-5 text-center text-[36px] font-bold text-text-primary sm:text-[42px] lg:text-[50px]">
          Our Products
        </h2>

        <div className="mx-auto w-full max-w-[950px] px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {products.map((product) => (
              <article key={product.id} className="overflow-hidden rounded-[20px] bg-[#1a1a1a] border border-white/5">
                {/* Photo — shared gradient background + product cutout, matching the live site exactly */}
                <div className="relative h-[260px] w-full sm:h-[300px] lg:h-[337px] overflow-hidden">
                  <Image
                    src="/assets/images/hero5.jpeg"
                    alt=""
                    fill
                    className="object-cover object-center scale-[1.2]"
                    sizes="(min-width: 640px) 440px, 100vw"
                  />
                  {/* Heavy dark overlay so text and product pop */}
                  <div className="absolute inset-0 bg-black/70 mix-blend-multiply" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                  
                  <Image
                    src={product.image}
                    alt={`${product.nameHighlight}${product.nameRest}`}
                    width={330}
                    height={312}
                    className="absolute inset-0 m-auto h-[85%] w-[85%] object-contain drop-shadow-2xl"
                  />
                </div>

                <div className="px-6 pb-7 pt-6 sm:px-6 text-center ">
                  <h3 className="font-montserrat mb-4 text-[36px] font-bold leading-none sm:text-[44px] lg:text-[52px]">
                    <span className="text-brand-primary">{product.nameHighlight}</span>
                    <span className="text-text-primary">{product.nameRest}</span>
                  </h3>

                  <div className="mb-6 grid grid-cols-4 gap-2">
                    {product.specs.map((spec) => (
                      <div key={spec.label} className="flex flex-col items-center gap-2 text-center">
                        <span className="font-montserrat text-[10px] font-medium leading-tight text-text-secondary sm:text-[11px]">
                          {spec.value}
                        </span>
                        <div className="relative h-7 w-7 sm:h-9 sm:w-9">
                          <Image
                            src={spec.icon}
                            alt=""
                            fill
                            className="object-contain brightness-0 invert opacity-70"
                            sizes="36px"
                          />
                        </div>
                        <span className="font-montserrat text-[10px] font-semibold uppercase leading-tight text-text-secondary sm:text-[11px]">
                          {spec.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="relative mb-1 inline-block">
                    <p className="font-montserrat text-[16px] font-medium text-text-secondary sm:text-[18px]">
                      {product.oldPrice}
                    </p>
                    {/* Diagonal slash */}
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(to top right, transparent calc(50% - 1px), #ff4d2e calc(50% - 1px), #ff4d2e calc(50% + 1px), transparent calc(50% + 1px))",
                      }}
                    />
                  </div>
                  <p className="font-montserrat mb-4 text-[28px] font-bold text-text-primary sm:text-[34px]">
                    {product.price}
                  </p>

                  <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1.5 shadow-sm">
                    <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                    <span className="font-roboto text-[11px] font-bold tracking-wide text-red-400 uppercase">
                      Limited time offer
                    </span>
                  </span>

                  <p className="font-roboto mb-5 text-[14px] font-semibold text-brand-primary">{product.savings}</p>

                  <div className="flex flex-col gap-3">
                    <FlipButton
                      href={product.exploreHref}
                      variant="primary"
                      className="rounded-[3px] w-full h-10 text-[14px]"
                    >
                      Explore more
                    </FlipButton>
                    <FlipButton
                      href={product.buyHref}
                      variant="primary"
                      className="rounded-[3px] w-full h-10 text-[14px]"
                    >
                      Buy Now
                    </FlipButton>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
