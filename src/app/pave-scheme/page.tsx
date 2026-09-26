import type { ReactNode } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, ChevronRight, Download, Info, Mail, MapPin, Phone, CreditCard, Truck, FileText, Landmark } from "lucide-react";
import JoinRevolutionCTA from "@/components/sections/JoinRevolutionCTA";
import { FadeIn } from "@/components/motion/FadeIn";
import SecondaryHero from "@/components/sections/SecondaryHero";
import FlipButton from "@/components/ui/FlipButton";

export const metadata: Metadata = {
  title: "PAVE Scheme | ELFA Electric Bike Instructions & Delivery",
  description:
    "Details for applicants selected under the PAVE Scheme (Self-Finance): pay order instructions, courier address, delivery timeline, and government subsidy transfer.",
};

const INFO_VIDEO = "https://youtu.be/AB-iP7vWQtk?si=moPN1gQnP_8B4t8P";

const overviewSteps = [
  { n: 1, label: "Pay Order Instructions" },
  { n: 2, label: "Courier Your Pay Order" },
  { n: 3, label: "Delivery Process" },
  { n: 4, label: "Delivery Timeline" },
  { n: 5, label: "Government Subsidy Transfer" },
  { n: 6, label: "Submission of Deposit Slip" },
];

const pricing = [
  { model: "EV-125", price: "Rs. 250,000/-" },
  { model: "EV-1", price: "Rs. 207,050/-" },
  { model: "EV-500", price: "Rs. 554,490/-" },
];

const requiredDetails = [
  "Full Name",
  "Email Address",
  "Active Contact Number",
  "CNIC Number",
];

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.5 3.5A11 11 0 0 0 2.1 17.8L1 23l5.3-1.1A11 11 0 0 0 12 23a11 11 0 0 0 8.5-19.5zM12 21a9 9 0 0 1-4.6-1.3l-.3-.2-3.1.7.7-3-.2-.3A9 9 0 1 1 12 21zm5-6.7c-.3-.1-1.6-.8-1.8-.9s-.4-.1-.6.1-.7.9-.8 1-.3.2-.6.1a7.4 7.4 0 0 1-2.2-1.4 8.2 8.2 0 0 1-1.5-1.9c-.2-.3 0-.4.1-.6l.4-.5.2-.3a.5.5 0 0 0 0-.5c0-.1-.6-1.4-.8-1.9s-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.8 11.8 0 0 0 4.5 4 15 15 0 0 0 1.5.6 3.6 3.6 0 0 0 1.7.1 2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .2-1.2c-.1-.1-.3-.2-.6-.3z" />
    </svg>
  );
}

function StepSection({ number, title, children }: { number: string, title: string, children: ReactNode }) {
  return (
    <div className="flex gap-6 lg:gap-10">
      <div className="hidden sm:flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-brand-primary/10 border border-brand-primary/30 flex items-center justify-center font-montserrat text-[24px] font-black text-brand-primary shrink-0">
          {number}
        </div>
        <div className="w-px h-full bg-white/10 mt-6" />
      </div>
      <div className="flex-1 pb-16 lg:pb-24">
        <div className="flex items-center gap-4 mb-6 sm:hidden">
          <div className="w-12 h-12 rounded-full bg-brand-primary/10 border border-brand-primary/30 flex items-center justify-center font-montserrat text-[18px] font-black text-brand-primary shrink-0">
            {number}
          </div>
          <h2 className="font-montserrat text-[24px] font-bold text-white tracking-tight">{title}</h2>
        </div>
        <h2 className="hidden sm:block font-montserrat text-[32px] font-bold text-white tracking-tight mb-8">
          {title}
        </h2>
        <div className="font-roboto text-white/70 text-[16px] leading-relaxed space-y-6">
          {children}
        </div>
      </div>
    </div>
  );
}

export default function PaveSchemePage() {
  return (
    <>
            <main className="flex-1 bg-bg-primary">
        <SecondaryHero 
          titleLine1="PAVE"
          titleLine2="SCHEME"
          description="Complete details for applicants selected under the PAVE Scheme (Self-Finance) to receive your ELFA Electric Bike."
          imageSrc="/assets/images/hero4.jpeg"
          imageAlt="PAVE Scheme"
        />

        {/* Content Flow */}
        <section className="relative z-10 w-full max-w-[900px] mx-auto px-4 sm:px-6 py-16 lg:py-24">
          
          {/* Intro Information Card */}
          <FadeIn variant="fadeInUp" speed="normal" className="mb-20 overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-md">
            <div className="p-8 sm:p-12 text-center relative z-10">
              <h2 className="font-montserrat text-[28px] sm:text-[36px] font-bold text-white mb-4 tracking-tight">
                Information for Selected <span className="text-brand-primary">Applicants</span>
              </h2>
              <p className="font-roboto text-white/90 text-[16px] sm:text-[18px] mb-6 font-medium">
                For assistance, please reach out to:
              </p>
              <p className="font-roboto text-white/70 text-[15px] sm:text-[16px] max-w-3xl mx-auto mb-8 leading-relaxed">
                This page contains all the details for applicants selected under the PAVE Scheme (Self-Finance) on how to receive their ELFA Electric Bike.
              </p>
              
              <div className="flex flex-col gap-4">
                <a href={INFO_VIDEO} target="_blank" rel="noopener noreferrer" className="font-roboto text-white/90 text-[15px] sm:text-[16px] hover:text-white transition-colors">
                  For further information for Self Finance applicants, <span className="text-brand-primary hover:text-white transition-colors underline underline-offset-4">click here</span>
                </a>
                <a href={INFO_VIDEO} target="_blank" rel="noopener noreferrer" className="font-roboto text-white/90 text-[15px] sm:text-[16px] hover:text-white transition-colors">
                  For further information for Bank Lease applicants, <span className="text-brand-primary hover:text-white transition-colors underline underline-offset-4">click here</span>
                </a>
              </div>
            </div>
          </FadeIn>

          {/* Steps Flow */}
          <div className="relative">
            
            <FadeIn variant="fadeInUp" speed="slow">
              <StepSection number="01" title="Pay Order Instructions">
                <p>
                  Please prepare a Pay Order for the amount of the ELFA Electric Bike you are receiving
                  through the PAVE program. The Pay Order should be made in the name of{" "}
                  <strong className="text-white">EV Technologies Private Limited</strong> and can be issued at any branch of
                  the <strong className="text-white">UBL bank</strong>.
                </p>
                
                <div className="mt-8 rounded-2xl border border-white/10 overflow-hidden bg-black/20">
                  <div className="grid grid-cols-2 bg-white/5 border-b border-white/10">
                    <div className="px-6 py-4 font-montserrat text-[14px] font-bold text-white uppercase tracking-wider">Model</div>
                    <div className="px-6 py-4 font-montserrat text-[14px] font-bold text-white uppercase tracking-wider text-right">Price (PKR)</div>
                  </div>
                  {pricing.map((row) => (
                    <div key={row.model} className="grid grid-cols-2 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                      <div className="px-6 py-4 text-[15px] text-white/80">{row.model}</div>
                      <div className="px-6 py-4 text-[15px] font-medium text-white text-right">{row.price}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-6 rounded-2xl border border-white/10 bg-white/5">
                  <h4 className="font-montserrat text-[16px] font-bold text-white mb-4 flex items-center gap-2">
                    <Info className="w-5 h-5 text-brand-primary" /> Bank Details (Account Title Verification)
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex justify-between border-b border-white/10 pb-3">
                      <span className="text-white/60">Bank</span>
                      <span className="text-white font-medium text-right">United Bank Limited</span>
                    </li>
                    <li className="flex justify-between border-b border-white/10 pb-3">
                      <span className="text-white/60">Account Title</span>
                      <span className="text-white font-medium text-right">EV Technologies Private Limited</span>
                    </li>
                    <li className="flex justify-between pt-1">
                      <span className="text-white/60">IBAN #</span>
                      <span className="text-white font-medium text-right text-[13px] sm:text-[15px]">PK11 UNIL 0109 0003 1662 3238</span>
                    </li>
                  </ul>
                </div>
              </StepSection>
            </FadeIn>

            <FadeIn variant="fadeInUp" speed="slow">
              <StepSection number="02" title="Courier Your Pay Order">
                <p>
                  Please send your pay order via courier to the address mentioned below. Once we receive the payment, we will immediately share the receipt with you.
                </p>
                <div className="mt-6 flex items-start gap-4 p-6 rounded-2xl border border-white/10 bg-white/5">
                  <MapPin className="w-6 h-6 text-brand-primary shrink-0 mt-1" />
                  <div>
                    <h4 className="font-montserrat text-[16px] font-bold text-white mb-2">Shipping Address</h4>
                    <p className="text-white/70 leading-relaxed">
                      Wavetec C3i, GA-70-A3, Korangi Creek Industrial Park,<br className="hidden sm:block" /> Korangi, Karachi, Sindh.
                    </p>
                  </div>
                </div>
              </StepSection>
            </FadeIn>

            <FadeIn variant="fadeInUp" speed="slow">
              <StepSection number="03" title="Delivery Process">
                <p>
                  Motorcycle delivery will be facilitated by ELFA. The applicable delivery charges, which depend on your location, will be communicated to you by our representative.
                </p>
              </StepSection>
            </FadeIn>

            <FadeIn variant="fadeInUp" speed="slow">
              <StepSection number="04" title="Delivery Timeline">
                <p>
                  Delivery of the motorcycle is expected within <strong>60 days</strong> after the payment is received and verified by the ELFA Team (EV Technologies).
                </p>
              </StepSection>
            </FadeIn>

            <FadeIn variant="fadeInUp" speed="slow">
              <StepSection number="05" title="Government Subsidy Transfer">
                <p>
                  After your motorcycle is delivered and all formalities are completed, the Government of Pakistan (EDB) will transfer the eligible subsidy amount directly to your bank account.
                </p>
                <div className="mt-6 flex items-center gap-4 p-6 rounded-2xl border border-white/10 bg-white/5">
                  <Landmark className="w-6 h-6 text-brand-primary shrink-0" />
                  <div>
                    <p className="text-white/70">
                      For more information, visit the official PAVE website at{" "}
                      <a href="https://www.pave.gov.pk" target="_blank" rel="noopener noreferrer" className="text-white font-medium hover:text-brand-primary transition-colors underline underline-offset-4">
                        www.pave.gov.pk
                      </a>
                    </p>
                  </div>
                </div>
              </StepSection>
            </FadeIn>

            <FadeIn variant="fadeInUp" speed="slow">
              <StepSection number="06" title="Submission of Deposit Slip">
                <p>
                  After submitting your Pay Order, you must share a copy of your deposit slip or proof of payment for verification. Please include the following details:
                </p>
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {requiredDetails.map((detail) => (
                    <div key={detail} className="flex items-center gap-3 p-4 rounded-xl border border-white/5 bg-black/20">
                      <ChevronRight className="w-4 h-4 text-brand-primary" />
                      <span className="text-white/80">{detail}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <FlipButton
                    href="https://www.pave.gov.pk"
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="primary"
                    icon={<Download className="w-5 h-5" />}
                    className="flex-1 h-auto rounded-xl p-4 text-[14px] hover:bg-white hover:text-black"
                  >
                    Upload to PAVE Portal
                  </FlipButton>
                  <FlipButton
                    href="https://wa.me/923114863532"
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="outline"
                    icon={<WhatsAppIcon className="w-5 h-5" />}
                    className="flex-1 h-auto rounded-xl border-white/20 p-4 text-[14px] hover:border-brand-primary hover:bg-transparent"
                  >
                    Send via WhatsApp
                  </FlipButton>
                </div>
              </StepSection>
            </FadeIn>

          </div>

          {/* Contact Us Card */}
          <FadeIn variant="fadeInUp" speed="slow" className="mt-16">
            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-md p-8 sm:p-12 relative z-10">
              <h2 className="font-montserrat text-[28px] sm:text-[32px] font-bold text-white mb-2 tracking-tight">
                Contact Us
              </h2>
              <p className="font-roboto text-white/70 text-[15px] sm:text-[16px] mb-8">
                For any queries or questions, please reach out to our support team:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Phone Box */}
                <a href="https://wa.me/923114863532" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-5 p-6 rounded-2xl border border-white/10 bg-black/20 hover:bg-white/5 hover:border-brand-primary/30 transition-all duration-300">
                  <div className="w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center shrink-0 group-hover:bg-brand-primary/20 transition-colors">
                    <Phone className="w-5 h-5 text-brand-primary" />
                  </div>
                  <div>
                    <h3 className="font-montserrat text-[18px] font-bold text-white transition-colors">Phone / WhatsApp</h3>
                    <p className="font-roboto text-white/70 text-[15px] mt-1">+(92) 311-486-3532</p>
                  </div>
                </a>
                
                {/* Email Box */}
                <a href="mailto:info@elfaelectric.com" className="group flex items-center gap-5 p-6 rounded-2xl border border-white/10 bg-black/20 hover:bg-white/5 hover:border-brand-primary/30 transition-all duration-300">
                  <div className="w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center shrink-0 group-hover:bg-brand-primary/20 transition-colors">
                    <Mail className="w-5 h-5 text-brand-primary" />
                  </div>
                  <div>
                    <h3 className="font-montserrat text-[18px] font-bold text-white transition-colors">Email</h3>
                    <p className="font-roboto text-white/70 text-[15px] mt-1">info@elfaelectric.com</p>
                  </div>
                </a>
              </div>
            </div>
          </FadeIn>

        </section>

        {/* Unified CTA */}
        <JoinRevolutionCTA />

      </main>
          </>
  );
}
