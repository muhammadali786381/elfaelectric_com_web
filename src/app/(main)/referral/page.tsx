import type { Metadata } from "next";
import { ChevronRight, Mail } from "lucide-react";
import SecondaryHero from "@/components/sections/SecondaryHero";
import { FadeIn } from "@/components/motion/FadeIn";
import FlipButton from "@/components/ui/FlipButton";

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
            <main className="flex-1">
        <SecondaryHero
          titleLine1="Referral"
          titleLine2="Program"
          description={HERO_SUBTITLE}
          imageSrc="/assets/images/hero4.jpeg"
          imageAlt="ELFA Referral Program"
        />

        {/* Exciting News */}
        <section className="bg-bg-primary border-b border-white/5 pb-12 pt-16 lg:pb-16 lg:pt-24">
          <div className="mx-auto w-full max-w-container px-4 text-center sm:px-6">
            <h2 className="font-montserrat text-[36px] font-black italic uppercase leading-tight text-brand-primary sm:text-[48px] lg:text-[64px]">
              Earn PKR 10,000!
            </h2>
            <p className="font-roboto mx-auto mt-4 max-w-2xl text-[18px] leading-relaxed text-text-secondary lg:text-[20px]">
              We are excited to launch our <strong><em>Referral Program</em></strong>, open to everyone. Help Pakistan go green and get rewarded instantly.
            </p>
          </div>
        </section>

        {/* How it works + Why join — text heavy editorial layout */}
        <section className="bg-bg-primary py-16 lg:py-24">
          <div className="mx-auto grid w-full max-w-container items-start gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20">
            <FadeIn variant="fadeInUp" speed="normal">
              <h3 className="font-montserrat mb-8 text-[32px] font-bold tracking-tight text-white lg:text-[40px]">
                How It Works
              </h3>
              <div className="flex flex-col gap-6">
                {howItWorks.map((item, i) => (
                  <div key={i} className="flex gap-5 border-t border-white/10 pt-6">
                    <span className="font-montserrat text-[24px] font-black text-brand-primary/50">
                      {(i + 1).toString().padStart(2, "0")}
                    </span>
                    <p className="font-roboto text-[16px] leading-relaxed text-text-inverse sm:text-[18px]">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn variant="fadeInUp" speed="normal" delay={0.12}>
              <h3 className="font-montserrat mb-8 text-[32px] font-bold tracking-tight text-white lg:text-[40px]">
                Why Join?
              </h3>
              <ul className="flex flex-col gap-6">
                {benefits.map((item) => (
                  <li key={item} className="flex items-start gap-5">
                    <div className="mt-2 flex h-2 w-2 shrink-0 rounded-full bg-brand-primary" />
                    <span className="font-roboto text-[16px] leading-relaxed text-text-inverse sm:text-[18px]">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>
        </section>

        {/* Terms & Details - Box-free editorial flow */}
        <section className="bg-[#070707] py-16 lg:py-24">
          <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
            <h2 className="font-montserrat mb-12 text-center text-[32px] font-black uppercase tracking-tight text-brand-primary sm:text-[40px] lg:text-[48px]">
              Terms & Details
            </h2>

            <div className="flex flex-col gap-12">
              <div>
                <h3 className="font-montserrat mb-6 text-[22px] font-bold text-white sm:text-[26px]">
                  1. General Rules
                </h3>
                <ChevronList items={generalRules} />
              </div>

              <div className="border-t border-white/5 pt-12">
                <h3 className="font-montserrat mb-6 text-[22px] font-bold text-white sm:text-[26px]">
                  2. Terms and Conditions
                </h3>
                <ChevronList items={terms} />
              </div>

              <div className="border-t border-white/5 pt-12">
                <h3 className="font-montserrat mb-6 text-[22px] font-bold text-white sm:text-[26px]">
                  3. Eligibility Criteria
                </h3>
                <ChevronList items={eligibility} />
              </div>

              <div className="border-t border-white/5 pt-12">
                <h3 className="font-montserrat mb-6 text-[22px] font-bold text-white sm:text-[26px]">
                  4. Program Terms
                </h3>
                <ChevronList items={programTerms} />
              </div>

              <div className="border-t border-brand-primary/20 pt-16">
                <h3 className="font-montserrat mb-4 text-[28px] font-black uppercase tracking-tight text-brand-primary sm:text-[36px]">
                  Ready to Start Referring?
                </h3>
                <p className="font-roboto mb-8 max-w-2xl text-[16px] leading-relaxed text-text-inverse/70 sm:text-[18px]">
                  Message us on WhatsApp at <strong className="text-white">+92 3114863532</strong>, call us, or email <strong className="text-white">info@elfaelectric.com</strong> to get your referral code and start earning PKR 10,000 per referral.
                </p>
                <div className="flex">
                  <FlipButton
                    href="/contact-us"
                    variant="primary"
                    icon={<Mail className="h-5 w-5" strokeWidth={2} />}
                    className="font-roboto h-[54px] rounded-none px-8 text-[14px] font-bold uppercase tracking-[1px]"
                  >
                    Contact Us Now
                  </FlipButton>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
          </>
  );
}
