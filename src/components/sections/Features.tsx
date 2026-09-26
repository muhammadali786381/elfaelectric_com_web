import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/motion/FadeIn";
import FlipButton from "@/components/ui/FlipButton";

const solutions = [
  {
    title: "Lithium iron phosphate battery",
    desc: "Tested and proven technology with fast charging and exceptional durability, offering higher capacity and long-lasting performance.",
  },
  {
    title: "Efficient Motor Power",
    desc: "Delivering optimized performance for extended range, efficient torque, and enhanced energy efficiency.",
  },
  {
    title: "App Tracking",
    desc: "Monitor your bike's location, overall statistics, and the kill switch to disable the engine in case of theft or emergencies.",
  },
  {
    title: "Advance Features",
    desc: "A high-build body, alloy rims, and tubeless tyres, providing an optimized riding experience on challenging roads.",
  },
];

export default function Features() {
  return (
    <>
      {/* Solutions that we offer — spark gradient + right-pinned scooty (live match) */}
      <section
        className="relative flex min-h-[560px] items-center overflow-hidden py-16 lg:min-h-[720px] lg:py-20"
        style={{
          backgroundImage: "linear-gradient(135deg, #00C853 -80%, #000000 50%, #00C853 290%)",
        }}
      >
        {/* Live uses ::before with contain + right-top — same treatment here */}
        <div
          className="pointer-events-none absolute inset-0 hidden bg-contain bg-right-top bg-no-repeat lg:block"
          style={{ backgroundImage: "url('/assets/images/solutions.webp')" }}
          aria-hidden
        />

        <div className="relative z-10 mx-auto flex w-full max-w-container flex-col justify-center px-4 sm:px-6">
          <div className="mb-8 flex justify-center lg:hidden">
            <Image
              src="/assets/images/solutions.webp"
              alt="ELFA EV-1 Scooty"
              width={1311}
              height={1784}
              className="h-auto w-full max-w-[280px] object-contain"
            />
          </div>

          {/* Text block ~70% width, vertically centered via section flex */}
          <div className="w-full lg:max-w-[70%]">
            <FadeIn variant="fadeInUp" speed="slow">
              <h2 className="font-montserrat mb-8 text-[32px] font-bold leading-tight text-text-inverse sm:text-[41px]">
                Solutions that we offer
              </h2>
            </FadeIn>

            <div className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2">
              {solutions.map((s) => (
                <div key={s.title}>
                  <h3 className="font-montserrat mb-2 text-[19px] font-bold text-text-inverse sm:text-[20px]">
                    {s.title}
                  </h3>
                  <p className="font-roboto text-[15px] leading-relaxed text-text-inverse/75">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About ELFA Electric Motorcycle */}
      <section className="bg-bg-primary py-16 lg:pb-20">
        <FadeIn variant="fadeIn" speed="slow">
        <div className="mx-auto w-full max-w-container px-4 sm:px-6">
          <div className="relative overflow-hidden rounded-[19px] border border-brand-primary bg-bg-inverse px-6 py-12 text-center sm:px-12 lg:px-16 lg:py-16">
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.15]"
              style={{
                backgroundImage: "url('/assets/images/solutions.webp')",
                backgroundSize: "auto 140%",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            />
            <div className="relative z-10">
              <h2 className="font-montserrat mb-8 text-[32px] font-bold leading-tight text-text-inverse sm:text-[38px] lg:text-[45px]">
                About
                <br />
                ELFA Electric Motorcycle
              </h2>
              <p className="font-roboto mx-auto mb-4 max-w-[820px] text-[15px] leading-relaxed text-text-inverse sm:text-[16px]">
                ELFA Electric, born under EV Technologies at Wavetec, is driven by a passion for building
                an electric future with sustainable, affordable, and innovative solutions powered by clean
                technology.
              </p>
              <p className="font-roboto mx-auto mb-8 max-w-[820px] text-[15px] leading-relaxed text-text-inverse sm:text-[16px]">
                At ELFA Electric, we believe that every person and every detail matters. Our electric
                motorcycles are meticulously designed, engineered, and rigorously tested for the local
                rider, using top-quality components.
              </p>
              <FlipButton
                href="/about-us"
                variant="primary"
                icon={<ArrowRight className="h-4 w-4" strokeWidth={2.5} />}
                className="font-roboto h-[41px] rounded-[3px] px-6 text-[17px] font-semibold tracking-[1px]"
              >
                About us
              </FlipButton>
            </div>
          </div>
        </div>
        </FadeIn>
      </section>
    </>
  );
}
