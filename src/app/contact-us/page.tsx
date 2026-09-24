import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Mail, Headphones, ChevronRight, ChevronDown } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/sections/PageHero";
import Marquee from "@/components/sections/Marquee";
import { FadeIn } from "@/components/motion/FadeIn";
import FlipButton from "@/components/ui/FlipButton";

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
        <Link href="/our-dealers" className="text-[#cc3366] underline hover:no-underline">
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
 * FadeIn IS the card (same classes) — no extra wrapper that breaks grid height.
 */
export default function ContactUsPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <PageHero
          title={
            <>
              <span className="text-text-inverse">CONTACT</span> ELFA ELECTRIC MOTORCYCLE{" "}
              <span className="text-text-inverse">PAKISTAN</span>
            </>
          }
          subtitle="Get In Touch With Our Team"
          breadcrumb="Contact us"
          withBikes
          greenTitle
          backgroundSrc="/assets/images/contact/contact-hero-bg.webp"
          bikesSrc="/assets/images/blog-page.png"
        />

        {/* Looking to contact (from left) + bike fade */}
        <section className="bg-bg-primary py-10 lg:py-14">
          <div className="mx-auto grid w-full max-w-container items-center gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:gap-10">
            <FadeIn
              variant="fadeInLeft"
              speed="slow"
              className="rounded-[10px] border-2 border-brand-primary px-5 py-10 sm:px-5 sm:py-[60px] sm:pr-5"
              style={{ backgroundImage: SPARK }}
            >
              <h2 className="font-montserrat mb-3 text-[26px] font-semibold capitalize leading-tight text-brand-primary sm:text-[32px] sm:leading-[41px]">
                Looking to contact ELFA Electric Pakistan?
              </h2>
              <p className="font-roboto mb-3 text-[16px] font-medium text-text-inverse">We are here to help!</p>
              <p className="font-roboto text-[15px] leading-relaxed text-text-inverse sm:text-[16px]">
                Whether you want to buy an electric bike, schedule a test ride, or need customer
                support, we are here to help! Reach out to our electric bike team via phone, WhatsApp,
                or email — or visit our nearest EV bike service center. Your journey toward sustainable
                mobility in Pakistan starts here!
              </p>
            </FadeIn>
            <FadeIn variant="fadeIn" speed="slow" className="relative mx-auto aspect-square w-full max-w-[480px]">
              <Image
                src="/assets/images/contact/EV-125-BIKE-1.png"
                alt="ELFA EV-125 electric motorcycle"
                fill
                className="object-contain"
                sizes="480px"
              />
            </FadeIn>
          </div>
        </section>

        {/* Scooty fade + Get in Touch from right */}
        <section className="bg-bg-primary pb-10 lg:pb-14">
          <div className="mx-auto grid w-full max-w-container items-center gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:gap-10">
            <FadeIn
              variant="fadeIn"
              speed="slow"
              className="relative mx-auto aspect-[624/753] w-full max-w-[420px] order-2 lg:order-1"
            >
              <Image
                src="/assets/images/contact/new-bike-scooty.png"
                alt="ELFA EV-1 Scooty and EV-125"
                fill
                className="object-contain"
                sizes="420px"
              />
            </FadeIn>
            <FadeIn
              variant="fadeInRight"
              speed="slow"
              className="order-1 rounded-[10px] border-2 border-brand-primary px-5 py-10 sm:px-10 sm:py-10 sm:pl-5 lg:order-2"
              style={{ backgroundImage: SPARK }}
            >
              <h2 className="font-montserrat mb-4 text-[26px] font-semibold capitalize leading-tight text-brand-primary sm:text-[32px] sm:leading-[41px]">
                Get in Touch with ELFA Electric Motorcycle
              </h2>
              <p className="font-roboto mb-5 text-[15px] leading-relaxed text-text-inverse sm:text-[16px]">
                Contact ELFA Electric Pakistan for all your electric bike and electric scooter needs.
                Our friendly team is ready to assist you with:
              </p>
              <ChevronList items={getInTouchItems} />
              <p className="font-roboto mt-5 text-[15px] leading-relaxed text-text-inverse sm:text-[16px]">
                Do not hesitate to reach out—we are just a call or click away!
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Email + Dealers — both from left; h-full keeps equal card height */}
        <section className="bg-bg-primary pb-12 lg:pb-16">
          <div className="mx-auto grid w-full max-w-container items-stretch gap-5 px-4 sm:px-6 lg:grid-cols-2">
            <FadeIn
              variant="fadeInLeft"
              speed="slow"
              className="h-full rounded-[20px] border-2 border-brand-primary p-[30px]"
              style={{ backgroundImage: SPARK }}
            >
              <h2 className="font-montserrat mb-4 text-[22px] font-semibold text-brand-primary sm:text-[25px] sm:leading-[33px]">
                Email Us for Detailed Inquiries
              </h2>
              <p className="font-roboto mb-3 text-[15px] leading-relaxed text-text-inverse sm:text-[16px]">
                For detailed questions about electric bikes, dealerships, or referral programs, email
                us at:
              </p>
              <p className="font-roboto mb-3 text-[15px] text-text-inverse sm:text-[16px]">
                Email:{" "}
                <a href="mailto:info@elfaelectric.com" className="text-brand-primary hover:underline">
                  info@elfaelectric.com
                </a>
              </p>
              <p className="font-roboto text-[15px] leading-relaxed text-text-inverse sm:text-[16px]">
                We typically respond within 24 hours. For urgent matters, please call or WhatsApp us.
              </p>
            </FadeIn>

            <FadeIn
              variant="fadeInLeft"
              speed="slow"
              delay={0.12}
              className="h-full rounded-[20px] border-2 border-brand-primary p-[30px]"
              style={{ backgroundImage: SPARK }}
            >
              <h2 className="font-montserrat mb-4 text-[22px] font-semibold text-brand-primary sm:text-[25px] sm:leading-[33px]">
                Find an ELFA Electric Dealer Near You
              </h2>
              <p className="font-roboto mb-4 text-[15px] leading-relaxed text-text-inverse sm:text-[16px]">
                Can’t visit our flagship showroom? Find an ELFA Electric dealer near you:
              </p>
              <ChevronList items={dealerCities} />
              <p className="font-roboto mt-5 text-[15px] leading-relaxed text-text-inverse sm:text-[16px]">
                <Link href="/our-dealers" className="text-brand-primary underline hover:no-underline">
                  View all dealers
                </Link>{" "}
                and locate the nearest electric bike dealer near me!
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Form block — heading L/R, form fade */}
        <section className="bg-bg-primary pb-10 lg:pb-14">
          <div className="mx-auto w-full max-w-container px-4 sm:px-6">
            <FadeIn variant="fadeInLeft" speed="slow">
              <p className="font-montserrat mb-1 text-center text-[16px] font-semibold text-text-secondary sm:text-[18px]">
                Contact Us
              </p>
            </FadeIn>
            <FadeIn variant="fadeInRight" speed="slow" delay={0.1}>
              <h2 className="font-montserrat mb-3 text-center text-[28px] font-semibold leading-tight text-brand-primary sm:text-[40px] lg:text-[55px] lg:leading-[55px]">
                Reach Our Experts For Support
              </h2>
            </FadeIn>
            <FadeIn variant="fadeInLeft" speed="slow" delay={0.2}>
              <p className="font-roboto mx-auto mb-8 max-w-[720px] text-center text-[15px] leading-relaxed text-text-primary">
                Whether you have a question, a suggestion, or just want to say hello, this is the place
                to do it. Please fill out the form below with your details and message, and we will get
                back to you as soon as possible.
              </p>
            </FadeIn>

            <FadeIn
              variant="fadeIn"
              speed="slow"
              className="grid grid-cols-1 gap-8 rounded-[15px] border border-black/[0.06] p-5 sm:p-8 lg:grid-cols-[1.2fr_1fr] lg:gap-10"
              style={{ backgroundImage: SPARK }}
            >
              <form className="flex flex-col gap-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    required
                    className="font-roboto h-[48px] w-full rounded-[6px] border-0 bg-bg-primary px-4 text-[15px] text-text-secondary outline-none ring-1 ring-black/10 focus:ring-2 focus:ring-brand-primary"
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    required
                    className="font-roboto h-[48px] w-full rounded-[6px] border-0 bg-bg-primary px-4 text-[15px] text-text-secondary outline-none ring-1 ring-black/10 focus:ring-2 focus:ring-brand-primary"
                  />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  required
                  className="font-roboto h-[48px] w-full rounded-[6px] border-0 bg-bg-primary px-4 text-[15px] text-text-secondary outline-none ring-1 ring-black/10 focus:ring-2 focus:ring-brand-primary"
                />
                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows={5}
                  required
                  className="font-roboto w-full resize-none rounded-[6px] border-0 bg-bg-primary px-4 py-3 text-[15px] text-text-secondary outline-none ring-1 ring-black/10 focus:ring-2 focus:ring-brand-primary"
                />
                <FlipButton
                  type="submit"
                  variant="primary"
                  className="w-full mt-1 rounded-[6px] h-[48px] text-[15px]"
                >
                  Submit Now
                </FlipButton>
              </form>

              <div className="flex flex-col justify-center">
                <h3 className="font-montserrat mb-5 text-[22px] font-medium text-text-inverse sm:text-[28px]">
                  Contact information
                </h3>
                <ul className="flex flex-col gap-4 text-[15px] text-text-inverse">
                  <li className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-primary" />
                    <span className="font-roboto">
                      C3i GA-70-A3, Korangi Creek Industrial Park Korangi, Karachi, Sindh
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Phone className="mt-0.5 h-5 w-5 shrink-0 text-brand-primary" />
                    <a
                      href="https://wa.me/923114863532"
                      className="font-roboto hover:text-brand-primary"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      +(92) 311-486-3532
                    </a>
                  </li>
                  <li className="flex items-start gap-3">
                    <Headphones className="mt-0.5 h-5 w-5 shrink-0 text-brand-primary" />
                    <a href="tel:02137173532" className="font-roboto hover:text-brand-primary">
                      021-37173532
                    </a>
                  </li>
                  <li className="flex items-start gap-3">
                    <Mail className="mt-0.5 h-5 w-5 shrink-0 text-brand-primary" />
                    <a href="mailto:info@elfaelectric.com" className="font-roboto hover:text-brand-primary">
                      info@elfaelectric.com
                    </a>
                  </li>
                </ul>

                <div className="mt-6 flex flex-wrap gap-3">
                  {socialLinks.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-bg-primary/10 text-text-inverse transition-colors hover:bg-brand-primary hover:text-text-inverse"
                    >
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d={s.path} />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Map fade in — fixed iframe height unchanged */}
        <section className="w-full p-10 lg:p-16">
          <FadeIn variant="fadeIn" speed="slow">
            <iframe
              title="ELFA Electric office location"
              src="https://maps.google.com/maps?q=C3i%20GA-70-A3%2C%20Korangi%20Creek%20Industrial%20Park%20Korangi%2C%20Karachi%2C%20Sindh&t=m&z=14&output=embed&iwloc=near"
              className="h-[250px] w-full border-0 sm:h-[420px] lg:h-[520px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </FadeIn>
        </section>

        {/* FAQ — title fade up only */}
        <section className="bg-bg-primary py-14 lg:py-20">
          <div className="mx-auto w-full max-w-container px-4 sm:px-6">
            <FadeIn variant="fadeInUp" speed="slow">
              <p className="font-montserrat text-center text-[20px] font-bold leading-[18px] text-brand-primary sm:text-[24px]">
                Do you have
              </p>
              <h2 className="font-montserrat my-3 text-center text-[32px] font-bold text-text-primary sm:text-[42px] lg:text-[50px] lg:leading-[50px]">
                Frequently Asked Questions
              </h2>
            </FadeIn>
            <div className="mx-auto flex max-w-[700px] flex-col gap-[10px]">
              {faqs.map((f) => (
                <details
                  key={f.q}
                  className="group overflow-hidden rounded-[10px]"
                  style={{ backgroundImage: SPARK }}
                >
                  <summary className="font-montserrat flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 text-left text-[16px] font-semibold text-text-inverse sm:px-6 sm:text-[18px] [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <ChevronDown className="h-5 w-5 shrink-0 transition-transform duration-300 group-open:rotate-180" />
                  </summary>
                  <div className="bg-bg-primary px-5 py-4 sm:px-6">
                    <p className="font-roboto text-[15px] leading-relaxed text-text-secondary">{f.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <Marquee />
      </main>
      <Footer />
    </>
  );
}
