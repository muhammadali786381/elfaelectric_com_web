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
      <section
        className="relative overflow-hidden py-16 lg:min-h-[680px] lg:py-20"
        style={{ backgroundImage: "linear-gradient(135deg, #1a1a1a 0%, #010404 55%, #103d1e 100%)" }}
      >
        {/* Real live-site asset — scooty + green bolt graphic are baked into
            this one image. Sized large and pinned to the right, matching the
            live site's bleed-off-the-edge treatment. */}
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[55%] lg:block">
          <Image
            src="/assets/images/solutions.webp"
            alt="ELFA EV-1 Scooty"
            fill
            className="object-cover object-[70%_center]"
            sizes="55vw"
          />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1150px] px-4 sm:px-6">
          <div className="flex justify-center lg:hidden">
            <Image
              src="/assets/images/solutions.webp"
              alt="ELFA EV-1 Scooty"
              width={753}
              height={1024}
              className="mb-10 h-auto w-full max-w-[300px] object-contain"
            />
          </div>

          <div className="lg:max-w-[55%]">
            <h2 className="font-montserrat mb-8 text-[32px] font-bold leading-tight text-white sm:text-[41px]">
              Solutions that we offer
            </h2>
            <div className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2">
              {solutions.map((s) => (
                <div key={s.title}>
                  <h3 className="font-montserrat mb-2 text-[19px] font-bold text-white sm:text-[20px]">
                    {s.title}
                  </h3>
                  <p className="font-roboto text-[15px] leading-relaxed text-white/75">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About ELFA Electric Motorcycle */}
      <section className="bg-white pb-16 lg:pb-20">
        <div className="mx-auto w-full max-w-[1150px] px-4 sm:px-6">
          <div className="relative overflow-hidden rounded-[19px] border border-[#61ce70] bg-black px-6 py-12 text-center sm:px-12 lg:px-16 lg:py-16">
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage: "url('/assets/images/solutions.webp')",
                backgroundSize: "auto 140%",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            />
            <div className="relative z-10">
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
        </div>
      </section>
    </>
  );
}
