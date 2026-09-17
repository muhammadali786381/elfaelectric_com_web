import Link from "next/link";
import { Calendar, ShoppingBag } from "lucide-react";
import Container from "@/components/ui/Container";

export default function FinalCTA() {
  return (
    <section className="bg-[#212121] py-16 lg:py-20">
      <Container size="narrow" className="flex flex-col items-center text-center">
        <h2 className="font-montserrat text-[28px] font-extrabold leading-tight text-white sm:text-[36px] lg:text-[42px]">
          Boost-up your adventure with Electric Motorcycle
        </h2>
        <p className="font-roboto mt-4 max-w-xl text-[15px] leading-relaxed text-gray-400 sm:text-[16px]">
          Enjoy every ride like never before! Our powerful, eco-friendly Electric Motorcycle offer
          smooth, exciting drives — perfect for city trips or outdoor adventures. Take your journey
          to the next level!
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-5">
          <Link
            href="/products"
            className="font-roboto inline-flex h-11 items-center gap-2 rounded-[3px] bg-[#61ce70] px-7 text-[14px] font-normal uppercase leading-none tracking-[1.2px] text-white transition-colors hover:bg-[#4fbf5f]"
          >
            <ShoppingBag className="h-4 w-4" strokeWidth={2} />
            Buy Now
          </Link>
          <Link
            href="/book-a-test-ride"
            className="font-roboto inline-flex h-11 items-center gap-2 rounded-[3px] border border-[#61ce70] bg-transparent px-7 text-[14px] font-normal uppercase leading-none tracking-[1.2px] text-white transition-colors hover:bg-[#61ce70]"
          >
            <Calendar className="h-4 w-4" strokeWidth={2} />
            Book a Test Ride
          </Link>
        </div>
      </Container>
    </section>
  );
}
