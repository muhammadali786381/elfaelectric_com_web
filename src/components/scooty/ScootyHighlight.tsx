import Image from "next/image";
import { FadeIn } from "@/components/motion/FadeIn";

export default function ScootyHighlight() {
  return (
    <section className="relative w-full overflow-hidden bg-[#050505] py-16 md:py-10  md:min-h-[520px]">
      <div className="relative mx-auto flex max-w-[1400px] flex-col items-center justify-between md:flex-row md:min-h-[520px]">
        {/* Text Content — top on mobile, left on desktop */}
        <div className="relative z-10 flex w-full flex-col justify-center px-8 md:w-1/2 lg:px-16 md:py-20">
          <FadeIn variant="fadeInUp">
            <span className="font-montserrat mb-3 block text-[11px] font-bold tracking-[3px] uppercase text-[#CC5500]">
              ELFA EV-1
            </span>
            <h2 className="font-montserrat text-[36px] font-black italic uppercase leading-[0.92] tracking-tighter text-white sm:text-[46px] lg:text-[68px]">
              UPGRADE YOUR <br className="hidden sm:block" />
              RIDE WITH <br />
              <span className="text-brand-primary">ELECTRIC ENERGY</span>
            </h2>
          </FadeIn>
        </div>

        {/* Image — bottom on mobile, right on desktop */}
        <div className="relative mt-8 flex w-full items-end justify-center md:absolute md:bottom-0 md:right-0 md:top-0 md:mt-0 md:w-1/2 md:justify-end">
          <FadeIn variant="fadeInUp" delay={0.15} className="w-full h-full flex justify-center md:block">
            <div className="relative h-[280px] w-[90%] sm:h-[350px] sm:w-[80%] md:h-full md:w-full md:min-h-[520px]">
              <Image
                src="/assets/images/products/scooty-ev-1/highlightnew.png"
                alt="ELFA EV-1"
                fill
                className="object-contain object-center md:object-right-bottom"
                sizes="(max-width: 768px) 90vw, 50vw"
                priority
              />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
