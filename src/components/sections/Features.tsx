import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

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
      {/* Solutions that we offer */}
      <section className="overflow-hidden bg-white py-16 lg:py-20">
        <div className="mx-auto w-full max-w-[1150px] px-4 sm:px-6">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="font-montserrat mb-8 text-[32px] font-bold leading-tight text-[#212121] sm:text-[41px]">
                Solutions that we offer
              </h2>
              <div className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2">
                {solutions.map((s) => (
                  <div key={s.title}>
                    <h3 className="font-montserrat mb-2 text-[19px] font-bold text-[#212121] sm:text-[20px]">
                      {s.title}
                    </h3>
                    <p className="font-roboto text-[15px] leading-relaxed text-[#212121]/80">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative flex justify-center">
              <div className="absolute right-0 top-1/2 h-[420px] w-[260px] -translate-y-1/2 -rotate-[18deg] bg-[#61ce70]/25" />
              <Image
                src="/assets/images/scooty-hero.webp"
                alt="ELFA EV-1 Scooty"
                width={520}
                height={624}
                className="relative z-10 h-auto w-full max-w-[420px] object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About ELFA Electric Motorcycle */}
      <section className="bg-white pb-16 lg:pb-20">
        <div className="mx-auto w-full max-w-[1150px] px-4 sm:px-6">
          <div className="rounded-[19px] bg-black px-6 py-12 text-center sm:px-12 lg:px-16 lg:py-16">
            <h2 className="font-montserrat mb-8 text-[32px] font-bold leading-tight text-white sm:text-[38px] lg:text-[45px]">
              About
              <br />
              ELFA Electric Motorcycle
            </h2>
            <p className="font-roboto mx-auto mb-4 max-w-[820px] text-[15px] leading-relaxed text-white sm:text-[16px]">
              ELFA Electric, born under EV Technologies at Wavetec, is driven by a passion for building
              an electric future with sustainable, affordable, and innovative solutions powered by clean
              technology.
            </p>
            <p className="font-roboto mx-auto mb-8 max-w-[820px] text-[15px] leading-relaxed text-white sm:text-[16px]">
              At ELFA Electric, we believe that every person and every detail matters. Our electric
              motorcycles are meticulously designed, engineered, and rigorously tested for the local
              rider, using top-quality components.
            </p>
            <Link
              href="/about-us"
              className="font-roboto inline-flex h-[41px] items-center gap-2 rounded-[3px] bg-[#61ce70] px-6 text-[17px] font-semibold uppercase tracking-[1px] text-white transition-colors hover:bg-[#4fbf5f]"
            >
              About us
              <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
