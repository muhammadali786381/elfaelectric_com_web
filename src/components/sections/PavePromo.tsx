import Image from "next/image";
import { ArrowRight, Bike, Clock } from "lucide-react";
import FlipButton from "@/components/ui/FlipButton";

const PAVE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSdxnx9J7GDgtDHg3_jnbsRfdYb_dR79s9VJc0xZ4kKxqcsA1w/viewform";

const products = [
  { label: "EV125 MOTORBIKE", image: "/assets/images/ev125-hero.webp" },
  { label: "EV1 SCOOTER", image: "/assets/images/scooty-hero.webp" },
];

export default function PavePromo() {
  return (
    <section className="bg-bg-primary py-10 lg:py-14">
      <div className="mx-auto w-full max-w-container px-4 sm:px-6">
        <div className="grid grid-cols-1 overflow-hidden rounded-[16px] shadow-xl md:grid-cols-2">
          {/* Left — dark panel */}
          <div className="flex flex-col justify-center bg-bg-inverse p-8 sm:p-10 lg:p-12">
            <div className="mb-4 flex items-center gap-2">
              <span className="text-[13px] font-bold uppercase tracking-[1.5px] text-text-inverse/70">
                PAVE Pre-Booking
              </span>
            </div>
            <div className="mb-4 h-[2px] w-12 bg-brand-primary" />
            <p className="font-montserrat text-[16px] font-semibold uppercase text-text-inverse">Get</p>
            <p className="font-montserrat text-[38px] font-extrabold leading-tight text-brand-primary sm:text-[44px]">
              Rs. 80,000
            </p>
            <p className="font-montserrat text-[22px] font-bold uppercase leading-tight text-text-inverse sm:text-[26px]">
              Government Subsidy
            </p>
          </div>

          {/* Right — product picker */}
          <div className="flex flex-col justify-center bg-bg-primary p-8 sm:p-10 lg:p-12">
            <h3 className="font-montserrat mb-5 text-[24px] font-bold text-text-primary sm:text-[28px]">
              Choose your ELFA
            </h3>
            <div className="mb-5 flex flex-col gap-3">
              {products.map((p) => (
                <a
                  key={p.label}
                  href={PAVE_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-[8px] border border-gray-200 px-4 py-3 transition-colors hover:border-brand-primary"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-[6px] bg-gray-50">
                      <Image src={p.image} alt="" fill className="object-cover" sizes="40px" />
                    </div>
                    <div>
                      <p className="font-montserrat text-[15px] font-bold text-text-primary">{p.label}</p>
                      <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-brand-primary px-2 py-0.5 text-[10px] font-bold uppercase text-text-inverse">
                        <Bike className="h-3 w-3" /> Pave Eligible
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 shrink-0 text-gray-400" />
                </a>
              ))}
            </div>
            <p className="font-roboto mb-4 text-[13px] text-gray-500">
              Pre-book today and be first in line for priority delivery.
            </p>
            <div className="mb-5 flex items-center gap-2 rounded-[6px] bg-[#ffece5] px-3 py-2 text-[13px] font-semibold text-[#ff4d2e]">
              <Clock className="h-4 w-4 shrink-0" />
              Book now before stocks run out
            </div>
            <FlipButton
              href={PAVE_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              variant="dark"
              icon={<ArrowRight className="h-4 w-4" strokeWidth={2.5} />}
              className="font-roboto h-[48px] w-full rounded-[6px] bg-bg-inverse text-[14px] font-semibold tracking-[1px] text-text-inverse hover:bg-bg-inverse"
            >
              Pre-book now
            </FlipButton>
          </div>
        </div>
      </div>
    </section>
  );
}
