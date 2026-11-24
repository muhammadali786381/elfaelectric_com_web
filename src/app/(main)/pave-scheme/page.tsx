import type { ReactNode } from "react";
import type { Metadata } from "next";
import { ChevronRight, Clock, Download, Info, Mail, MapPin, Phone, Landmark } from "lucide-react";
import { FadeIn } from "@/components/motion/FadeIn";
import FlipButton from "@/components/ui/FlipButton";
import SecondaryHero from "@/components/sections/SecondaryHero";

export const metadata: Metadata = {
  title: "PAVE Scheme 2.0 | ELFA Electric Bike Instructions & Delivery",
  description:
    "Apply for PAVE 2.0 and take the first step towards securing your ELFA electric bike through pre-booking. Subsidised pricing details and applicant instructions.",
};

const PAVE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSdxnx9J7GDgtDHg3_jnbsRfdYb_dR79s9VJc0xZ4kKxqcsA1w/viewform?usp=publish-editor";

const INFO_VIDEO = "https://youtu.be/AB-iP7vWQtk?si=moPN1gQnP_8B4t8P";

const pricing = [
  { model: "EV-125", price: "Rs. 245,000/-" },
  { model: "EV-1", price: "Rs. 170,000/-" },
];

const processOverviewSteps = [
  "Pay Order Instructions",
  "Courier Your Pay Order",
  "Delivery Process",
  "Delivery Timeline",
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
          titleLine2="SCHEME 2.0"
          description="Apply for PAVE 2.0 and take the first step towards securing your ELFA electric bike through pre-booking."
          imageSrc="/assets/images/hero4.jpeg"
          imageAlt="PAVE Scheme 2.0"
        >
          <FlipButton
            href={PAVE_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
            shape="cut"
            className="rounded-none h-12 sm:h-[50px] px-8 sm:px-10 text-[13px] sm:text-[14px] w-full sm:w-auto font-bold tracking-wider"
          >
            Apply Through the Form
          </FlipButton>
        </SecondaryHero>

        {/* Content Flow */}
        <section className="relative z-10 w-full max-w-[1050px] mx-auto px-4 sm:px-6 pt-12 pb-16 lg:pb-24">
          {/* Scheme Comparison Cards - Both Highlighted */}
          <div className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {/* PAVE II Scheme Card (Highlighted) */}
            <FadeIn variant="fadeInUp" speed="normal">
              <div className="relative h-full flex flex-col rounded-[24px] border-2 border-brand-primary bg-[#061209]/85 backdrop-blur-xl p-8 sm:p-10 shadow-[0_0_35px_rgba(0,200,83,0.22),inset_0_0_20px_rgba(0,200,83,0.06)] transition-all duration-300 hover:shadow-[0_0_45px_rgba(0,200,83,0.35)]">
                <h2 className="font-montserrat text-[24px] sm:text-[28px] font-black text-brand-primary tracking-tight mb-4 drop-shadow-[0_0_12px_rgba(0,200,83,0.5)]">
                  PAVE II Scheme
                </h2>
                <p className="font-roboto text-[15px] sm:text-[16px] leading-relaxed text-white/80">
                  Under PAVE II, the{" "}
                  <span className="font-bold text-brand-primary">
                    government provides the subsidy directly to the OEM
                  </span>
                  , so customers{" "}
                  <span className="font-bold text-white">
                    only pay the subsidised price
                  </span>{" "}
                  when purchasing their bike.
                </p>
              </div>
            </FadeIn>

            {/* Previous Scheme Card (Also Highlighted) */}
            <FadeIn variant="fadeInUp" speed="normal" delay={0.1}>
              <div className="relative h-full flex flex-col rounded-[24px] border-2 border-brand-primary bg-[#061209]/85 backdrop-blur-xl p-8 sm:p-10 shadow-[0_0_35px_rgba(0,200,83,0.22),inset_0_0_20px_rgba(0,200,83,0.06)] transition-all duration-300 hover:shadow-[0_0_45px_rgba(0,200,83,0.35)]">
                <h2 className="font-montserrat text-[24px] sm:text-[28px] font-black text-brand-primary tracking-tight mb-4 drop-shadow-[0_0_12px_rgba(0,200,83,0.5)]">
                  Previous Scheme
                </h2>
                <p className="font-roboto text-[15px] sm:text-[16px] leading-relaxed text-white/80">
                  Customers had to pay the{" "}
                  <span className="font-bold text-white">
                    full amount upfront
                  </span>{" "}
                  and receive the subsidy as a{" "}
                  <span className="font-bold text-brand-primary">
                    reimbursement
                  </span>{" "}
                  after completing the required documentation and taking delivery of their bike.
                </p>
              </div>
            </FadeIn>
          </div>

          {/* Intro Information Card */}
          <FadeIn variant="fadeInUp" speed="normal" className="mb-16 overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-md">
            <div className="p-8 sm:p-12 text-center relative z-10">
              <h2 className="font-montserrat text-[28px] sm:text-[36px] font-bold text-white mb-4 tracking-tight">
                Information for Selected <span className="text-brand-primary">Applicants</span>
              </h2>
              <p className="font-roboto text-white/90 text-[16px] sm:text-[18px] mb-3 font-medium">
                For assistance, please reach out to:
              </p>
              <p className="font-roboto text-white/70 text-[15px] sm:text-[16px] max-w-3xl mx-auto mb-6 leading-relaxed">
                This page contains all the details for applicants selected under the PAVE Scheme (Self-Finance) on how to receive their ELFA Electric Bike.
              </p>

              <div className="flex flex-col gap-3 mb-8">
                <a href={INFO_VIDEO} target="_blank" rel="noopener noreferrer" className="font-roboto text-white/90 text-[15px] sm:text-[16px] hover:text-white transition-colors">
                  For further information for Self Finance applicants, <span className="text-brand-primary hover:text-white transition-colors underline underline-offset-4">Click Here</span>
                </a>
                <a href={INFO_VIDEO} target="_blank" rel="noopener noreferrer" className="font-roboto text-white/90 text-[15px] sm:text-[16px] hover:text-white transition-colors">
                  For further information for Bank Lease applicants, <span className="text-brand-primary hover:text-white transition-colors underline underline-offset-4">Click Here</span>
                </a>
              </div>

              {/* Contact Details inline */}
              <div className="pt-6 border-t border-white/10 flex flex-wrap justify-center items-center gap-6 sm:gap-10 text-[15px]">
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-brand-primary shrink-0" />
                  <span className="text-white/60">Email:</span>
                  <a href="mailto:info@elfaelectric.com" className="text-white font-medium hover:text-brand-primary transition-colors">
                    info@elfaelectric.com
                  </a>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-brand-primary shrink-0" />
                  <span className="text-white/60">Phone:</span>
                  <a href="tel:021111113532" className="text-white font-medium hover:text-brand-primary transition-colors">
                    021-111-113-532
                  </a>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* 3. SELF Finance Scheme: */}
          <FadeIn variant="fadeInUp" speed="normal" className="mb-14">
            <div className="rounded-[2rem] border border-white/10 bg-black/40 backdrop-blur-xl p-8 sm:p-10">
              <h3 className="font-montserrat text-[22px] sm:text-[26px] font-bold text-white mb-2 tracking-tight">
                SELF Finance Scheme:
              </h3>
              <h4 className="font-montserrat text-[18px] sm:text-[20px] font-semibold text-brand-primary mb-4 tracking-tight">
                How to Receive Your ELFA Bike
              </h4>
              <p className="font-roboto text-white/80 text-[15px] sm:text-[16px] leading-relaxed mb-6">
                To confirm your selection and approval for the ELFA electric bike, you can check the PAVE portal or wait for a confirmation call from ELFA. Once you receive confirmation, please follow the instructions to receive your bike.
              </p>

              <div>
                <h5 className="font-montserrat text-[14px] font-bold uppercase tracking-wider text-white/90 mb-3">
                  Process Overview:
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {processOverviewSteps.map((step, idx) => (
                    <div
                      key={step}
                      className="flex items-center gap-3 p-3.5 rounded-xl border border-white/10 bg-white/5"
                    >
                      <span className="font-montserrat text-[14px] font-bold text-brand-primary shrink-0">
                        {idx + 1}.
                      </span>
                      <span className="font-roboto text-[14px] font-medium text-white/90">
                        {step}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Steps Flow */}
          <div className="relative">

            {/* Step 01: Pay Order Instructions */}
            <FadeIn variant="fadeInUp" speed="slow">
              <StepSection number="01" title="Pay Order Instructions – PAVE Program">
                <p>
                  Please prepare a Pay Order for the amount of the ELFA Electric Bike you are receiving through the PAVE program.
                </p>

                <div className="mt-4 p-5 rounded-xl border border-brand-primary/30 bg-brand-primary/10 text-white/90 text-[15px]">
                  <strong className="text-white block font-montserrat text-[16px] mb-1">Important Payment Details</strong>
                  The Pay Order should be made in the name of <strong className="text-brand-primary">EV Technologies Private Limited</strong> and can be issued at any branch across Pakistan.
                </div>

                <div className="mt-8 rounded-2xl border border-white/10 overflow-hidden bg-black/20">
                  <div className="grid grid-cols-2 bg-white/5 border-b border-white/10">
                    <div className="px-6 py-4 font-montserrat text-[14px] font-bold text-white uppercase tracking-wider">Model</div>
                    <div className="px-6 py-4 font-montserrat text-[14px] font-bold text-white uppercase tracking-wider text-right">Price (PKR)</div>
                  </div>
                  {pricing.map((row) => (
                    <div key={row.model} className="grid grid-cols-2 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                      <div className="px-6 py-4 text-[15px] font-medium text-white/90">{row.model}</div>
                      <div className="px-6 py-4 text-[15px] font-bold text-brand-primary text-right">{row.price}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-6 rounded-2xl border border-white/10 bg-white/5">
                  <h4 className="font-montserrat text-[16px] font-bold text-white mb-4 flex items-center gap-2">
                    <Info className="w-5 h-5 text-brand-primary" /> Bank Details (For Account Title Verification Only)
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

            {/* Step 02: Courier Your Pay Order */}
            <FadeIn variant="fadeInUp" speed="slow">
              <StepSection number="02" title="Courier Your Pay Order">
                <p>
                  Please send your pay order via courier to the address mentioned below:
                </p>
                <div className="mt-6 flex items-start gap-4 p-6 rounded-2xl border border-white/10 bg-white/5">
                  <MapPin className="w-6 h-6 text-brand-primary shrink-0 mt-1" />
                  <div>
                    <h4 className="font-montserrat text-[16px] font-bold text-white mb-2">Address:</h4>
                    <p className="text-white/90 leading-relaxed font-medium">
                      Plot No. GJ-08-A3, Korangi Creek Industrial Park Korangi Creek, Karachi, Pakistan
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-white/70">
                  Once we receive the payment, we will immediately share the receipt with you.
                </p>
                <div className="mt-4 flex items-center gap-3 p-4 rounded-xl border border-white/10 bg-black/30 text-[15px]">
                  <Phone className="w-4 h-4 text-brand-primary shrink-0" />
                  <span className="text-white/70">
                    In case of any query, please feel free to reach out to us:{" "}
                    <a href="tel:021111113532" className="text-brand-primary font-bold hover:underline">
                      021-111-113-532
                    </a>
                  </span>
                </div>
              </StepSection>
            </FadeIn>

            {/* Step 03: Delivery Information */}
            <FadeIn variant="fadeInUp" speed="slow">
              <StepSection number="03" title="Delivery Information">
                <div className="space-y-6">
                  <div>
                    <h4 className="font-montserrat text-[18px] font-bold text-white mb-2">
                      Motorcycle Delivery Process
                    </h4>
                    <p className="text-white/70 leading-relaxed">
                      Motorcycle delivery will be facilitated by ELFA. The applicable delivery charges, which depend on your location, will be communicated to you by our representative.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl border border-brand-primary/30 bg-brand-primary/10">
                    <h4 className="font-montserrat text-[18px] font-bold text-white mb-2 flex items-center gap-2">
                      <Clock className="w-5 h-5 text-brand-primary" /> Delivery Timeline
                    </h4>
                    <p className="text-white/90 leading-relaxed">
                      Delivery of the motorcycle is expected within <strong className="text-brand-primary font-bold">15 days</strong> after the payment is received and verified by ELFA Team (EV Technologies).
                    </p>
                  </div>

                  <div className="flex items-center gap-4 p-5 rounded-2xl border border-white/10 bg-white/5">
                    <Landmark className="w-6 h-6 text-brand-primary shrink-0" />
                    <div>
                      <h4 className="font-montserrat text-[16px] font-bold text-white mb-1">
                        For More Information
                      </h4>
                      <p className="text-white/70 text-[14px]">
                        Visit the official PAVE website at{" "}
                        <a href="https://www.pave.gov.pk" target="_blank" rel="noopener noreferrer" className="text-white font-medium hover:text-brand-primary transition-colors underline underline-offset-4">
                          www.pave.gov.pk
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </StepSection>
            </FadeIn>

            {/* Step 04: Submission of Deposit Slip */}
            <FadeIn variant="fadeInUp" speed="slow">
              <StepSection number="04" title="Submission of Deposit Slip">
                <p>
                  After submitting your Pay Order, you must share a copy of your deposit slip/proof of payment for verification.
                </p>
                <div className="mt-6">
                  <h4 className="font-montserrat text-[15px] font-bold uppercase tracking-wider text-white mb-3">
                    Required Details:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {requiredDetails.map((detail) => (
                      <div key={detail} className="flex items-center gap-3 p-4 rounded-xl border border-white/5 bg-black/20">
                        <ChevronRight className="w-4 h-4 text-brand-primary" />
                        <span className="text-white/80">{detail}</span>
                      </div>
                    ))}
                  </div>
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
                    className="flex-1 h-auto rounded-xl border-white/20 p-4 text-[14px] hover:border-[#CC5500] hover:bg-[#CC5500] hover:text-white"
                  >
                    Send via WhatsApp (+92 311-486-3532)
                  </FlipButton>
                </div>
              </StepSection>
            </FadeIn>

          </div>

          {/* Contact Us Card */}
          <FadeIn variant="fadeInUp" speed="slow" className="mt-14 mb-10">
            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-black/40 backdrop-blur-xl p-8 sm:p-12 relative z-10">
              <h2 className="font-montserrat text-[28px] sm:text-[32px] font-bold text-white mb-2 tracking-tight">
                Contact Us
              </h2>
              <p className="font-roboto text-white/70 text-[15px] sm:text-[16px] mb-8">
                For any queries or questions, please reach out to our support team:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Phone Box */}
                <a href="tel:021111113532" className="group flex items-center gap-5 p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-brand-primary/30 transition-all duration-300">
                  <div className="w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center shrink-0 group-hover:bg-brand-primary/20 transition-colors">
                    <Phone className="w-5 h-5 text-brand-primary" />
                  </div>
                  <div>
                    <h3 className="font-montserrat text-[18px] font-bold text-white transition-colors">Phone Support</h3>
                    <p className="font-roboto text-white/70 text-[15px] mt-1">021-111-113-532</p>
                  </div>
                </a>

                {/* Email Box */}
                <a href="mailto:info@elfaelectric.com" className="group flex items-center gap-5 p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-brand-primary/30 transition-all duration-300">
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

          {/* For Bank Cases (Last) */}
          <FadeIn variant="fadeInUp" speed="slow" className="mt-8 mb-10">
            <div className="rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-md p-8 sm:p-10">
              <h3 className="font-montserrat text-[22px] sm:text-[26px] font-bold text-brand-primary mb-3 tracking-tight">
                For Bank Cases
              </h3>
              <p className="font-roboto text-white/80 text-[15px] sm:text-[16px] leading-relaxed">
                Apply via portal with selection of the bank and provide all the required documents. Once it gets approved from the bank, Bank will send the payorder to EV Technologies. EV technologies will share the invoice with the bank and after receiving the delivery order from the bank will deliver the bike to the address mentioned in the booking on the PAVE Portal.
              </p>
            </div>
          </FadeIn>

        </section>

      </main>
    </>
  );
}
