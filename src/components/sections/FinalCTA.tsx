import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="bg-white py-8 lg:py-10">
      <div className="mx-auto w-full max-w-[1150px] px-4 sm:px-6">
        <div
          className="flex flex-col items-center justify-between gap-5 rounded-[12px] px-6 py-8 sm:flex-row sm:px-10"
          style={{ backgroundImage: "linear-gradient(135deg, #00C853 -110%, #000000 50%, #00C853 190%)" }}
        >
          <h2 className="font-montserrat text-center text-[22px] font-bold leading-tight text-white sm:text-left sm:text-[26px] lg:text-[30px]">
            Boost-up your adventure with Electric Motorcycle
          </h2>
          <Link
            href="/products"
            className="font-roboto inline-flex h-11 shrink-0 items-center gap-2 rounded-[3px] bg-[#61ce70] px-7 text-[14px] font-semibold uppercase tracking-[1.2px] text-white transition-colors hover:bg-[#4fbf5f]"
          >
            Buy Now
            <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
          </Link>
        </div>
      </div>
    </section>
  );
}
