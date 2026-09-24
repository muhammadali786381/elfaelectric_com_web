import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Mail } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/sections/PageHero";
import { FadeIn } from "@/components/motion/FadeIn";

export const metadata: Metadata = {
  title: "ELFA Referral Program Pakistan | Earn PKR 10,000 Per Friend",
  description:
    "Refer a friend to ELFA Electric and earn PKR 10,000 when they buy an EV-125. Unlimited earnings, fast payouts.",
};

const SPARK =
  "linear-gradient(135deg, #00C853 -110%, #000000 50%, #00C853 190%)";

/** Scraped from https://elfaelectric.com/referral/ */
const HERO_SUBTITLE =
  "Welcome to the ELFA referral program Pakistan – your chance to earn PKR 10,000 for every friend who purchases an ELFA EV125! Refer a friend electric bike and enjoy unlimited rewards with instant payouts. Whether you’re a customer, fan, or influencer, our electric bike referral rewards program lets you earn while promoting sustainable mobility Pakistan. Be a part of our mission and get rewarded for it. You are promoting a good cause—sustainable transport—and the reward is a bonus";

const howItWorks = [
  "Share a lead with us via WhatsApp, email, or phone",
  "Get a referral code from our team.",
  "Earn PKR 10,000 when your referral purchases an ELFA EV125.",
  "There’s no limit to how much you can earn—refer a friend electric bike and start earning today!",
];

const benefits = [
  "Unlimited Earnings: No cap on referrals or bonuses.",
  "Instant Payouts: Receive your PKR 10,000 referral bonus within 15 business days.",
  "Flexible Rewards: Choose cash, cheque, or bank transfer.",
  "Easy Process: Simple lead sharing and tracking.",
  "Promote Sustainability: Help Pakistan go green with electric bikes.",
];

const generalRules = [
  "Identify Potential Referrals: Friends, family, or colleagues interested in electric bikes.",
  "Share Their Details: Message us on WhatsApp or email info@elfaelectric.com",
  "Get Your Code: Receive a unique referral code from our team.",
  "Track Progress: Stay updated on your referral’s purchase status.",
  "Get Paid: Receive PKR 10,000 after successful purchase.",
];

const terms = [
  "The ELFA referral program Pakistan is open to everyone.",
  "Referral bonuses are paid within 15 business days.",
  "The program cannot be combined with other offers.",
  "EV Technologies reserves the right to verify all transactions",
  "ELFA EV125 referral bonus applies only to new bike purchases.",
];

const eligibility = [
  "The referrer must have a valid referral code, which can be generated via ELFA WhatsApp.",
  "The referee is allowed to buy multiple bikes.",
];

const programTerms = [
  "The referral program cannot be combined with other promotional offers or discounts.",
  "If multiple referrers refer to the same person, the reward will be given to the referrer whose code was used first.",
  "EV Technologies reserves the right to verify all transactions and reject any fraudulent or ineligible referrals.",
  "The program terms and conditions are subject to change at the sole discretion of EV Technologies.",
];

function ChevronList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-2.5">
      {items.map((item) => (
        <li key={item} className="font-roboto flex items-start gap-2 text-[15px] leading-relaxed text-text-inverse sm:text-[16px]">
          <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-brand-primary" strokeWidth={2.5} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function SectionTitle({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <h3 className={`font-montserrat mb-4 text-[24px] font-semibold text-brand-primary sm:text-[28px] ${className}`}>
      {children}
    </h3>
  );
}

export default function ReferralPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <PageHero
          title="ELFA Referral Program Pakistan – Earn PKR 10,000 Per Friend Referred"
          subtitle={HERO_SUBTITLE}
          breadcrumb="Referral"
          withBikes
          bodySubtitle
          backgroundSrc="/assets/images/blog-hero-bg.jpg"
          bikesSrc="/assets/images/blog-page.png"
        />

        {/* Exciting News */}
        <section className="bg-bg-primary pt-12 pb-8 lg:pt-16 lg:pb-10">
          <div className="mx-auto w-full max-w-container px-4 text-center sm:px-6">
            <h2 className="font-montserrat text-[32px] font-bold uppercase leading-tight text-brand-primary sm:text-[42px] lg:text-[52px]">
              Exciting News from ELFA Electric!
            </h2>
            <p className="font-roboto mt-4 text-[16px] leading-relaxed text-text-secondary">
              We are excited to launch our <strong><em>Referral Program</em></strong>, open to everyone!
            </p>
          </div>
        </section>

        {/* How it works + Why join — fade from left */}
        <section className="bg-bg-primary pb-10 lg:pb-12">
          <div className="mx-auto grid w-full max-w-container items-stretch gap-5 px-4 sm:px-6 lg:grid-cols-2">
            <FadeIn
              variant="fadeInLeft"
              speed="normal"
              className="h-full rounded-[19px] border border-brand-primary p-[30px]"
              style={{ backgroundImage: SPARK }}
            >
              <SectionTitle>How the ELFA Referral Program Pakistan Works</SectionTitle>
              <p className="font-roboto mb-5 text-[15px] leading-relaxed text-text-inverse">
                Participating in the ELFA referral program Pakistan is simple and rewarding:
              </p>
              <ChevronList items={howItWorks} />
            </FadeIn>

            <FadeIn
              variant="fadeInLeft"
              speed="normal"
              delay={0.12}
              className="h-full rounded-[19px] border border-brand-primary p-[30px]"
              style={{ backgroundImage: SPARK }}
            >
              <SectionTitle>Why Join Our Electric Bike Referral Rewards?</SectionTitle>
              <ChevronList items={benefits} />
            </FadeIn>
          </div>
        </section>

        {/* Step-by-step + single big spark panel */}
        <section className="bg-bg-primary pb-14 lg:pb-20">
          <div className="mx-auto w-full max-w-container px-4 sm:px-6">
            <h2 className="font-montserrat mb-8 text-center text-[28px] font-bold text-brand-primary sm:text-[35px]">
              Step-by-Step Guide to Earn PKR 10,000 Per Referral
            </h2>

            <div
              className="rounded-[20px] border border-brand-primary p-[30px] sm:p-10"
              style={{ backgroundImage: SPARK }}
            >
              <SectionTitle>1. General Rules</SectionTitle>
              <ChevronList items={generalRules} />

              <SectionTitle className="mt-10">Terms and Conditions: What You Need to Know</SectionTitle>
              <ChevronList items={terms} />

              <SectionTitle className="mt-10">3. Eligibility Criteria</SectionTitle>
              <ChevronList items={eligibility} />

              <SectionTitle className="mt-10">4. Program Terms</SectionTitle>
              <ChevronList items={programTerms} />

              <SectionTitle className="mt-12">Ready to Start Referring? Contact Us Now!</SectionTitle>
              <p className="font-roboto mb-6 max-w-[720px] text-[15px] leading-relaxed text-text-inverse sm:text-[16px]">
                Don’t wait—join the ELFA referral program Pakistan today! Message us on WhatsApp at{" "}
                <strong>+92 3114863532</strong>, call us, or email{" "}
                <strong>info@elfaelectric.com</strong> to get your referral code and start earning PKR
                10,000 per referral.
              </p>
              <Link
                href="/contact-us"
                className="font-roboto inline-flex items-center gap-2 rounded-[3px] bg-brand-primary px-6 py-3 text-[14px] font-semibold uppercase tracking-[1px] text-text-inverse transition-colors hover:bg-brand-secondary"
              >
                <Mail className="h-4 w-4" strokeWidth={2} />
                Contact us
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
