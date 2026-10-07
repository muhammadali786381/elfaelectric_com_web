import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { MapPin, Phone, Mail, Headphones, ChevronRight, ShoppingCart, CalendarCheck, MessageSquare } from "lucide-react";
import SecondaryHero from "@/components/sections/SecondaryHero";
import FAQ from "@/components/sections/FAQ";

import { FadeIn } from "@/components/motion/FadeIn";
import FlipButton from "@/components/ui/FlipButton";
import BuyNowTrigger from "./BuyNowTrigger";

export const metadata: Metadata = {
  title: "Contact ELFA Electric Motorcycle Pakistan",
  description:
    "Get in touch with ELFA Electric for product inquiries, test ride bookings, after-sales support, or dealership partnerships.",
};

const SPARK =
  "linear-gradient(135deg, #00C853 -110%, #000000 50%, #00C853 190%)";

const getInTouchItems = [
  "Product inquiries about ELFA EV125 and EV-1 Scooty.",
  "Test ride bookings at our electric bike showroom.",
  "After-sales support and maintenance services.",
  "Dealership partnerships and referral programs.",
];

const dealerCities = [
  "Karachi: DHA, Gulshan-e-Iqbal, Saddar.",
  "Hyderabad: Jamshoro Road.",
  "Lahore: Shalimar Link Road",
];

const faqs = [
  {
    q: "How do I book a test ride?",
    a: (
      <>
        Contact ELFA Electric Pakistan via phone, WhatsApp, or visit our{" "}
        <Link href="/book-a-test-ride" className="text-[#cc3366] underline hover:no-underline">
          electric bike showroom.
        </Link>
      </>
    ),
  },
  {
    q: "Do you offer after-sales service?",
    a: "Yes! All our EV bike service centers provide maintenance and support.",
  },
  {
    q: "Can I become an ELFA dealer?",
    a: (
      <>
        Absolutely!{" "}
        <Link href="/our-locations" className="text-[#cc3366] underline hover:no-underline">
          Learn more about our dealership program.
        </Link>
      </>
    ),
  },
];

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61565976712052&mibextid=ZbWKwL",
    path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/elfaelectric?igsh=MWl6bXRuczN1Mmd2MQ==",
    path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/evtechglobal/",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
  {
    label: "TikTok",
    href: "#",
    path: "M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z",
  },
  {
    label: "YouTube",
    href: "#",
    path: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.016 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
  },
];

function ChevronList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-2.5">
      {items.map((item) => (
        <li
          key={item}
          className="font-roboto flex items-start gap-2 text-[15px] leading-relaxed text-text-inverse sm:text-[16px]"
        >
          <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-brand-primary" strokeWidth={2.5} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/**
 * Animations use opacity + px translate only.
 */
export default function ContactUsPage() {
  return (
    <>
      <main className="flex-1 bg-[#050505]">
        <SecondaryHero
          titleLine1="Contact"
          titleLine2="Us"
          description="Get in touch with ELFA Electric for product inquiries, test ride bookings, or dealership partnerships."
          imageSrc="/assets/images/hero4.jpeg"
          imageAlt="Contact ELFA"
        />

        {/* Action Cards */}
        <section className="bg-[#050505] py-16 lg:py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#050505]/80 to-[#050505]" />
          <div className="mx-auto grid w-full max-w-[1200px] gap-6 px-4 sm:px-6 md:grid-cols-3 relative z-10">
            <FadeIn variant="fadeInUp" speed="normal" className="flex flex-col items-center text-center p-10 rounded-[24px] border border-white/10 bg-white/5 backdrop-blur-xl transition-transform hover:-translate-y-2 transform-gpu">
              <ShoppingCart className="w-8 h-8 text-white mb-6" />
              <h3 className="font-montserrat text-[22px] font-bold text-white mb-3">Buy Now</h3>
              <p className="font-roboto text-white/70 text-[15px] mb-8 flex-1">
                Ready to switch to sustainable mobility? Explore our range of ELFA electric bikes and scooties.
              </p>
              <BuyNowTrigger />
            </FadeIn>

            <FadeIn variant="fadeInUp" speed="normal" delay={0.1} className="flex flex-col items-center text-center p-10 rounded-[24px] border border-white/10 bg-white/5 backdrop-blur-xl transition-transform hover:-translate-y-2 transform-gpu">
              <CalendarCheck className="w-8 h-8 text-white mb-6" />
              <h3 className="font-montserrat text-[22px] font-bold text-white mb-3">Book a Test Ride</h3>
              <p className="font-roboto text-white/70 text-[15px] mb-8 flex-1">
                Experience the thrill of electric riding. Schedule a free test ride at our authorized showrooms.
              </p>
              <Link href="/book-a-test-ride" className="text-[15px] font-semibold text-brand-primary hover:text-white transition-colors">
                Book now &gt;
              </Link>
            </FadeIn>

            <FadeIn variant="fadeInUp" speed="normal" delay={0.2} className="flex flex-col items-center text-center p-10 rounded-[24px] border border-white/10 bg-white/5 backdrop-blur-xl transition-transform hover:-translate-y-2 transform-gpu">
              <MessageSquare className="w-8 h-8 text-white mb-6" />
              <h3 className="font-montserrat text-[22px] font-bold text-white mb-3">Contact Us</h3>
              <p className="font-roboto text-white/70 text-[15px] mb-8 flex-1">
                Have questions? Need after-sales support? Our dedicated team is here to assist you.
              </p>
              <a href="#contact-form" className="text-[15px] font-semibold text-brand-primary hover:text-white transition-colors">
                Get in touch &gt;
              </a>
            </FadeIn>
          </div>
        </section>

        {/* Form block */}
        <section id="contact-form" className="bg-[#050505] pb-16 lg:pb-24 relative overflow-hidden">
          <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6">
            <FadeIn variant="fadeInUp" speed="slow" className="text-center mb-16">
              <h2 className="font-montserrat mb-4 text-[36px] font-black italic uppercase tracking-tighter text-white sm:text-[48px] lg:text-[55px]">
                Reach Our <span className="text-brand-primary">Experts</span>
              </h2>
              <p className="font-roboto mx-auto max-w-[720px] text-[16px] leading-relaxed text-white/60">
                Whether you have a question, a suggestion, or just want to say hello, this is the place
                to do it. We typically respond within 24 hours.
              </p>
            </FadeIn>

            <FadeIn
              variant="fadeInUp"
              speed="slow"
              className="grid grid-cols-1 gap-10 rounded-[24px] border border-white/10 bg-white/5 backdrop-blur-2xl p-8 sm:p-10 lg:grid-cols-[1.2fr_1fr] items-start"
            >
              <div className="flex flex-col w-full overflow-hidden rounded-[6px]">
                <iframe
                  src="https://app.digistartup.io/widget/form/3zEOWjB4U2tcRStsYXTH"
                  style={{ width: "100%", height: "100%", border: "none", borderRadius: "0px" }}
                  id="inline-3zEOWjB4U2tcRStsYXTH"
                  data-layout="{'id':'INLINE'}"
                  data-trigger-type="alwaysShow"
                  data-trigger-value=""
                  data-activation-type="alwaysActivated"
                  data-activation-value=""
                  data-deactivation-type="neverDeactivate"
                  data-deactivation-value=""
                  data-form-name="Contact Us"
                  data-height="460"
                  data-layout-iframe-id="inline-3zEOWjB4U2tcRStsYXTH"
                  data-form-id="3zEOWjB4U2tcRStsYXTH"
                  data-cookie-consent="true"
                  data-cookie-consent-provider="auto"
                  title="Contact Us"
                />
                <Script src="https://app.digistartup.io/js/form_embed.js" strategy="lazyOnload" />
              </div>

              <div className="flex flex-col justify-start pt-3 sm:pt-5">
                <h3 className="font-montserrat mb-8 text-[22px] font-bold text-white sm:text-[28px]">
                  Contact Information
                </h3>
                <ul className="flex flex-col gap-3 text-[15px] text-white/80">
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center shrink-0">
                      <MapPin className="h-5 w-5 text-brand-primary" />
                    </div>
                    <span className="font-roboto pt-2">
                      C3i GA-70-A3, Korangi Creek Industrial Park Korangi, Karachi, Sindh
                    </span>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center shrink-0">
                      <svg className="h-5 w-5 text-brand-primary" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                    </div>
                    <a
                      href="https://wa.me/923114863532"
                      className="font-roboto pt-2 hover:text-brand-primary transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      +(92) 311-486-3532
                    </a>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center shrink-0">
                      <Phone className="h-5 w-5 text-brand-primary" />
                    </div>
                    <a href="tel:02137173532" className="font-roboto pt-2 hover:text-brand-primary transition-colors">
                      021-37173532
                    </a>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center shrink-0">
                      <Mail className="h-5 w-5 text-brand-primary" />
                    </div>
                    <a href="mailto:info@elfaelectric.com" className="font-roboto pt-2 hover:text-brand-primary transition-colors">
                      info@elfaelectric.com
                    </a>
                  </li>
                </ul>

                <div className="mt-4 flex gap-4">
                  {socialLinks.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 border border-white/10 text-white transition-all hover:bg-brand-primary hover:border-brand-primary hover:text-black"
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d={s.path} />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Map */}
        <section className="w-full bg-[#050505]">
          <FadeIn variant="fadeInUp" speed="slow" className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8 pb-16 lg:pb-24">
            <div className="rounded-[24px] overflow-hidden border border-white/10 relative z-10 bg-white/5">
              <iframe
                title="ELFA Electric office location"
                src="https://maps.google.com/maps?q=C3i%20GA-70-A3%2C%20Korangi%20Creek%20Industrial%20Park%20Korangi%2C%20Karachi%2C%20Sindh&t=m&z=14&output=embed&iwloc=near"
                className="h-[350px] w-full border-0 sm:h-[420px] lg:h-[520px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </FadeIn>
        </section>

        {/* FAQ */}
        <FAQ items={faqs} className="bg-[#050505] py-20 lg:py-28" />


      </main>
    </>
  );
}
