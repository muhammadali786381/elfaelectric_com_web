import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";

export default function AdventureCTA() {
  return (
    <section className="bg-white py-10 lg:py-14">
      <div className="mx-auto w-full max-w-container px-4 ">
        <div
          className="flex flex-col items-center rounded-[16px]  py-12 text-center  "
          style={{
            backgroundImage: "linear-gradient(135deg, #00C853 -110%, #000000 50%, #00C853 190%)",
          }}
        >
          <h2 className="font-montserrat  text-[26px] font-bold leading-tight text-white sm:text-[32px] lg:text-[38px]">
            Boost-Up Your Adventure With Electric Motorcycle
          </h2>

          <p className="font-roboto mt-5 px-10 text-[15px] leading-relaxed text-white sm:text-[18px]">
            Enjoy every ride like never before! Our powerful, eco-friendly Electric Motorcycle offer
            smooth, exciting drives — perfect for city trips or outdoor adventures. Take your journey
            to the next level!
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <Link
              href="/contact-us"
              className="font-roboto inline-flex h-[44px] items-center gap-2 rounded-[4px] bg-[#61ce70] px-5 text-[14px] font-semibold uppercase tracking-[1px] text-white transition-colors hover:bg-[#4fbf5f]"
            >
              <Calendar className="h-4 w-4" strokeWidth={2} />
              Book A Test Ride
            </Link>
            <Link
              href="/products"
              className="font-roboto inline-flex h-[44px] items-center gap-2 rounded-[4px] bg-[#61ce70] px-5 text-[14px] font-semibold uppercase tracking-[1px] text-white transition-colors hover:bg-[#4fbf5f]"
            >
              Buy Now
              <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
