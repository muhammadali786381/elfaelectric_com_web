import Image from "next/image";
import { FadeIn } from "@/components/motion/FadeIn";

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

export default function Solutions() {
  return (
    <section
      className="relative flex min-h-[560px] items-center overflow-hidden py-16 lg:min-h-[720px] lg:py-20"
      style={{
        backgroundImage: "linear-gradient(135deg, #00C853 -80%, #000000 50%, #00C853 290%)",
      }}
    >
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

        <div className="w-full lg:max-w-[70%]">
          <FadeIn variant="fadeInUp" speed="slow">
            <h2 className="font-montserrat mb-8 text-[32px] font-bold leading-tight text-text-inverse sm:text-[41px]">
              Solutions We Offer
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
  );
}
