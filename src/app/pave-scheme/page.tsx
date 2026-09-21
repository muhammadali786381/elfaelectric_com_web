import type { ReactNode } from "react";
import type { Metadata } from "next";
import { ArrowRight, ChevronRight, Download, Info, Mail, MailIcon, MapPin, Phone, Upload } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/sections/PageHero";
import Marquee from "@/components/sections/Marquee";

export const metadata: Metadata = {
  title: "PAVE Scheme | ELFA Electric Bike Instructions & Delivery",
  description:
    "Details for applicants selected under the PAVE Scheme (Self-Finance): pay order instructions, courier address, delivery timeline, and government subsidy transfer.",
};

const SPARK =
  "linear-gradient(135deg, #00C853 -110%, #000000 50%, #00C853 190%)";

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

const cardClass = "rounded-[15px] p-[30px]";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.5 3.5A11 11 0 0 0 2.1 17.8L1 23l5.3-1.1A11 11 0 0 0 12 23a11 11 0 0 0 8.5-19.5zM12 21a9 9 0 0 1-4.6-1.3l-.3-.2-3.1.7.7-3-.2-.3A9 9 0 1 1 12 21zm5-6.7c-.3-.1-1.6-.8-1.8-.9s-.4-.1-.6.1-.7.9-.8 1-.3.2-.6.1a7.4 7.4 0 0 1-2.2-1.4 8.2 8.2 0 0 1-1.5-1.9c-.2-.3 0-.4.1-.6l.4-.5.2-.3a.5.5 0 0 0 0-.5c0-.1-.6-1.4-.8-1.9s-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.8 11.8 0 0 0 4.5 4 15 15 0 0 0 1.5.6 3.6 3.6 0 0 0 1.7.1 2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .2-1.2c-.1-.1-.3-.2-.6-.3z" />
    </svg>
  );
}

/** Live Elementor inset: green #61ce70 overlay at 10% opacity + 4px left accent */
function Inset({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-r-[10px] border-l-4 border-[#61ce70] bg-[#61ce70]/10 py-5 pl-[30px] pr-4">
      {children}
    </div>
  );
}

function ContactPill({
  href,
  icon,
  title,
  detail,
}: {
  href: string;
  icon: ReactNode;
  title: string;
  detail: string;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className="flex min-h-[98px] min-w-0 flex-1 items-center gap-4 rounded-[10px] border border-[#61ce70] bg-transparent px-[15px] py-[15px] transition-colors hover:bg-[#61ce70]/10"
    >
      <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#61ce70] text-white [&>svg]:h-8 [&>svg]:w-8">
        {icon}
      </span>
      <span className="min-w-0 text-left">
        <span className="font-montserrat block text-[22px] font-semibold leading-tight text-white">
          {title}
        </span>
        <span className="font-roboto mt-1 block text-[16px] font-normal leading-snug text-white">
          {detail}
        </span>
      </span>
    </a>
  );
}

export default function PaveSchemePage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <PageHero
          title="PAVE Scheme"
          breadcrumb="PAVE Scheme"
          withBikes
          backgroundSrc="/assets/images/blog-hero-bg.jpg"
          bikesSrc="/assets/images/blog-page.png"
        />

        {/* Information for Selected Applicants — live: ~800px wide, border, 18px body */}
        <section className="relative z-10 -mt-10 bg-transparent pb-0 pt-0">
          <div className="mx-auto w-full max-w-[800px] px-4 sm:px-6">
            <div
              className="rounded-[15px] border border-[#61ce70] px-5 py-[30px] text-center sm:px-10"
              style={{ backgroundImage: SPARK }}
            >
              <h2 className="font-montserrat mb-4 text-[28px] font-bold leading-[1] text-[#61ce70] sm:text-[36px] lg:text-[45px]">
                Information for Selected Applicants
              </h2>
              <p className="font-roboto mx-auto mb-3 max-w-[720px] text-[18px] font-normal text-white">
                For assistance, please reach out to:
              </p>
              <p className="font-roboto mx-auto mb-5 max-w-[720px] text-[18px] font-normal leading-[1.5] text-white">
                This page contains all the details for applicants selected under the PAVE Scheme
                (Self-Finance) on how to receive their ELFA Electric Bike.
              </p>
              <div className="font-roboto mx-auto flex max-w-[640px] flex-col gap-2 text-[18px] font-normal text-white">
                <p>
                  For further information for Self Finance applicants,{" "}
                  <a
                    href={INFO_VIDEO}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-normal text-[#cc3366] underline hover:no-underline"
                  >
                    click here
                  </a>
                </p>
                <p>
                  For further information for Bank Lease applicants,{" "}
                  <a
                    href={INFO_VIDEO}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-normal text-[#cc3366] underline hover:no-underline"
                  >
                    click here
                  </a>
                </p>
              </div>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
                <a
                  href="mailto:info@elfaelectric.com"
                  className="font-roboto inline-flex items-center gap-2 text-[18px] font-normal text-white transition-colors hover:text-[#61ce70]"
                >
                  <Mail className="h-5 w-5 fill-[#61ce70] text-[#61ce70]" strokeWidth={0} />
                  info@elfaelectric.com
                </a>
                <a
                  href="https://wa.me/923114863532"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-roboto inline-flex items-center gap-2 text-[18px] font-normal text-white transition-colors hover:text-[#61ce70]"
                >
                  <WhatsAppIcon className="h-5 w-5 text-[#61ce70]" />
                  +(92) 311-486-3532
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* How to Receive — live: padding 100px 0, gap 20px, 60px filled circles, 35px arrows */}
        <section className="bg-white py-[60px] lg:py-[100px]">
          <div className="mx-auto flex w-full max-w-container flex-col items-center gap-5 px-4 sm:px-6">
            <h2 className="font-montserrat text-center text-[28px] font-bold leading-[1] text-[#61ce70] sm:text-[36px] lg:text-[45px]">
              How to Receive Your ELFA Bike
            </h2>
            <p className="font-roboto mx-auto max-w-[720px] text-center text-[14px] leading-relaxed text-[#212121]">
              To confirm your selection and approval for the ELFA electric bike, you can check the
              PAVE portal or wait for a confirmation call from ELFA. Once you receive confirmation,
              please follow the instructions to receive your bike.
            </p>
            <div className="h-[2px] w-[128px] bg-[#61ce70] sm:w-[182px]" />

            <div className="mt-2 flex w-full flex-wrap items-start justify-center gap-x-2 gap-y-8 lg:mt-4 lg:flex-nowrap lg:justify-between lg:gap-x-0">
              {overviewSteps.map((s, i) => (
                <div key={s.n} className="contents">
                  <div className="flex w-[117px] flex-col items-center text-center sm:w-[140px] lg:w-[160px]">
                    <span className="font-montserrat flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-[55px] bg-[#212121] text-[45px] font-bold leading-none text-[#fcfcfc]">
                      {s.n}
                    </span>
                    <span className="font-roboto mt-3 text-[15px] leading-snug text-[#212121]">
                      {s.label}
                    </span>
                  </div>
                  {i < overviewSteps.length - 1 && (
                    <ArrowRight
                      className="mt-[12px] hidden h-[35px] w-[35px] shrink-0 text-[#212121] lg:block"
                      strokeWidth={2}
                      aria-hidden
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 1 — Pay Order */}
        <section className="bg-white pb-6 pt-4 lg:pb-8">
          <div className="mx-auto w-full max-w-container px-4 sm:px-6">
            <div className={cardClass} style={{ backgroundImage: SPARK }}>
              <h2 className="font-montserrat mb-3 text-[28px] font-bold leading-[1.5] text-white">
                Pay Order Instructions – PAVE Program
              </h2>
              <p className="font-roboto mb-5 text-[16px] font-normal leading-6 text-white">
                Please prepare a Pay Order for the amount of the ELFA Electric Bike you are receiving
                through the PAVE program.
              </p>

              <Inset>
                <p className="font-montserrat mb-2 flex items-center gap-2 text-[16px] font-bold text-white">
                  <Info className="h-4 w-4 fill-[#61ce70] text-[#61ce70]" />
                  Important Payment Details
                </p>
                <p className="font-roboto text-[16px] font-normal leading-6 text-white">
                  The Pay Order should be made in the name of{" "}
                  <strong className="font-bold">EV Technologies Private Limited</strong> and can be
                  issued at any branch of the <strong className="font-bold">UBL bank</strong>.
                </p>
              </Inset>

              <div className="my-6 overflow-hidden rounded-[8px]">
                <div className="grid grid-cols-2 bg-[#61ce70]">
                  <div className="font-montserrat px-4 py-3 text-[23px] font-bold text-white">
                    Model
                  </div>
                  <div className="font-montserrat px-4 py-3 text-[23px] font-bold text-white">
                    Price (PKR)
                  </div>
                </div>
                {pricing.map((row, i) => {
                  const light = i === 1;
                  return (
                    <div
                      key={row.model}
                      className={`grid grid-cols-2 ${light ? "bg-white text-[#212121]" : "bg-black/35 text-white"}`}
                    >
                      <div className="font-montserrat px-4 py-3 text-[20px] font-bold">{row.model}</div>
                      <div className="font-montserrat px-4 py-3 text-right text-[20px] font-bold">
                        {row.price}
                      </div>
                    </div>
                  );
                })}
              </div>

              <h3 className="font-montserrat mb-3 text-[24px] font-bold leading-none text-white">
                Bank Details (For Account Title Verification Only)
              </h3>
              <Inset>
                <ul className="font-roboto space-y-2 text-[16px] font-normal text-white">
                  {[
                    ["Bank:", "United Bank Limited"],
                    ["Account Title:", "EV Technologies Private Limited"],
                    ["IBAN #:", "PK11 UNIL 0109 0003 1662 3238"],
                  ].map(([label, value]) => (
                    <li key={label} className="flex items-start gap-2">
                      <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-[#61ce70]" strokeWidth={2.5} />
                      <span>
                        <strong className="font-bold">{label}</strong> {value}
                      </span>
                    </li>
                  ))}
                </ul>
              </Inset>
            </div>
          </div>
        </section>

        {/* 2 — Courier */}
        <section className="bg-white py-4 lg:py-6">
          <div className="mx-auto w-full max-w-container px-4 sm:px-6">
            <div className={cardClass} style={{ backgroundImage: SPARK }}>
              <h2 className="font-montserrat mb-3 text-[28px] font-bold leading-[1.5] text-white">
                Courier your Pay order
              </h2>
              <p className="font-roboto mb-5 text-[16px] font-normal leading-6 text-white">
                Please send your pay order via courier to the address mentioned below:
              </p>
              <Inset>
                <p className="font-montserrat mb-2 flex items-center gap-2 text-[16px] font-bold text-white">
                  <MapPin className="h-4 w-4 fill-[#61ce70] text-[#61ce70]" />
                  Address mentioned
                </p>
                <p className="font-roboto text-[16px] font-normal leading-6 text-white">
                  Wavetec C3i, GA-70-A3, Korangi Creek Industrial Park, Korangi, Karachi, Sindh.
                </p>
              </Inset>
              <p className="font-roboto mt-5 text-[16px] font-normal leading-6 text-white">
                Once we receive the payment, we will immediately share the receipt with you.
              </p>
              <p className="font-roboto mt-3 text-[16px] font-normal text-white">
                In case of any query, please feel free to reach out to us:
              </p>
              <div className="mt-4 max-w-[540px]">
                <ContactPill
                  href="https://wa.me/923114863532"
                  icon={<Phone className="fill-white" strokeWidth={0} />}
                  title="Phone / WhatsApp"
                  detail="+(92) 311-486-3532"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Delivery + subsidy */}
        <section className="bg-white py-4 lg:py-6">
          <div className="mx-auto flex w-full max-w-container flex-col gap-6 px-4 sm:px-6">
            <div className={cardClass} style={{ backgroundImage: SPARK }}>
              <h2 className="font-montserrat mb-4 text-[28px] font-bold leading-[1.5] text-white">
                Delivery Information
              </h2>
              <h3 className="font-montserrat mb-2 text-[24px] font-bold leading-none text-white">
                Motorcycle Delivery Process
              </h3>
              <p className="font-roboto mb-5 text-[16px] font-normal leading-6 text-white">
                Motorcycle delivery will be facilitated by ELFA. The applicable delivery charges,
                which depend on your location, will be communicated to you by our representative.
              </p>
              <h3 className="font-montserrat mb-2 text-[24px] font-bold leading-none text-white">
                Delivery Timeline
              </h3>
              <p className="font-roboto text-[16px] font-normal leading-6 text-white">
                Delivery of the motorcycle is expected within 60 days after the payment is received
                and verified by ELFA Team (EV Technologies).
              </p>
            </div>

            <div className={cardClass} style={{ backgroundImage: SPARK }}>
              <h2 className="font-montserrat mb-3 text-[28px] font-bold leading-[1.5] text-white">
                Government Subsidy Transfer
              </h2>
              <p className="font-roboto mb-5 text-[16px] font-normal leading-6 text-white">
                After your motorcycle is delivered and all formalities are completed, the Government
                of Pakistan (EDB) will transfer the eligible subsidy amount directly to your bank
                account.
              </p>
              <Inset>
                <p className="font-montserrat mb-2 flex items-center gap-2 text-[16px] font-bold text-white">
                  <Download className="h-4 w-4 text-[#61ce70]" strokeWidth={2.5} />
                  For More Information
                </p>
                <p className="font-roboto text-[16px] font-normal text-white">
                  Visit the official PAVE website:{" "}
                  <a
                    href="https://www.pave.gov.pk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-normal text-[#cc3366] underline hover:no-underline"
                  >
                    www.pave.gov.pk
                  </a>
                </p>
              </Inset>
            </div>
          </div>
        </section>

        {/* 6 — Deposit slip + contact */}
        <section className="bg-white py-4 pb-12 lg:py-6 lg:pb-16">
          <div className="mx-auto flex w-full max-w-container flex-col gap-6 px-4 sm:px-6">
            <div className={cardClass} style={{ backgroundImage: SPARK }}>
              <h2 className="font-montserrat mb-3 text-[28px] font-bold leading-[1.5] text-white">
                Submission of Deposit Slip
              </h2>
              <p className="font-roboto mb-4 text-[16px] font-normal leading-6 text-white">
                After submitting your Pay Order, you must share a copy of your deposit slip/proof of
                payment for verification. Include the following details:
              </p>
              <h3 className="font-montserrat mb-3 text-[24px] font-bold leading-none text-white">
                Required Details
              </h3>
              <ul className="font-roboto mb-6 space-y-2 text-[16px] font-normal text-white">
                {requiredDetails.map((d) => (
                  <li key={d} className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 shrink-0 text-[#61ce70]" strokeWidth={2.5} />
                    {d}
                  </li>
                ))}
              </ul>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <ContactPill
                  href="https://wa.me/923114863532"
                  icon={<WhatsAppIcon />}
                  title="WhatsApp"
                  detail="+(92) 311-486-3532"
                />
                <ContactPill
                  href="https://www.pave.gov.pk"
                  icon={<Upload strokeWidth={2.5} />}
                  title="PAVE Portal"
                  detail="Upload a copy of your payorder on your PAVA portal"
                />
              </div>
            </div>

            <div className={cardClass} style={{ backgroundImage: SPARK }}>
              <h2 className="font-montserrat mb-3 text-[28px] font-bold leading-[1.5] text-white">
                Contact Us
              </h2>
              <p className="font-roboto mb-5 text-[16px] font-normal text-white">
                For any queries or questions, please reach out to our support team:
              </p>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <ContactPill
                  href="https://wa.me/923114863532"
                  icon={<Phone className="fill-white" strokeWidth={0} />}
                  title="Phone / WhatsApp"
                  detail="+(92) 311-486-3532"
                />
                <ContactPill
                  href="mailto:info@elfaelectric.com"
                  icon={<MailIcon  color="white" strokeWidth={2.5} />}
                  title="Email"
                  detail="info@elfaelectric.com"
                />
              </div>
            </div>
          </div>
        </section>

        <Marquee />

      </main>
      <Footer />
    </>
  );
}
