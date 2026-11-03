import type { Metadata } from "next";
import { Mail } from "lucide-react";
import SecondaryHero from "@/components/sections/SecondaryHero";
import { FadeIn } from "@/components/motion/FadeIn";
import FlipButton from "@/components/ui/FlipButton";

export const metadata: Metadata = {
  title: "ELFA Referral Program Pakistan | Earn PKR 10,000 Per Friend",
  description:
    "Refer a friend to ELFA Electric and earn PKR 10,000 when they buy an EV-125. Unlimited earnings, fast payouts.",
};

const offerPoints = [
  {
    title: "Unlimited rewards",
    body: "Instant payouts. Refer as many friends as you like.",
  },
  {
    title: "Open to everyone",
    body: "Customers, fans, and influencers can earn.",
  },
  {
    title: "A good cause",
    body: "Promote sustainable transport. The reward is a bonus.",
  },
];

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

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-2.5">
      {items.map((item) => (
        <li
          key={item}
          className="font-roboto flex items-start gap-3 text-[15px] leading-snug text-white/85 sm:text-[16px]"
        >
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-primary" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function TermBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="font-montserrat mb-3 text-[15px] font-semibold uppercase tracking-[0.08em] text-white/40 sm:text-[16px]">
        {title}
      </h3>
      <BulletList items={items} />
    </div>
  );
}

export default function ReferralPage() {
  return (
    <>
            <main className="flex-1">
        <SecondaryHero
          titleLine1="Referral"
          titleLine2="Program"
          imageSrc="/assets/images/hero4.jpeg"
          imageAlt="ELFA Referral Program"
          compact
        />

        <section className="border-b border-white/5 bg-bg-primary pb-12 pt-10 lg:pb-16 lg:pt-14">
          <div className="mx-auto w-full max-w-container px-4 sm:px-6">
            <h2 className="font-montserrat text-center text-[36px] font-black italic uppercase leading-none text-brand-primary sm:text-[48px] lg:text-[60px]">
              Earn PKR 10,000
            </h2>
            <p className="font-roboto mx-auto mt-3 max-w-xl text-center text-[16px] leading-snug text-white/70 sm:text-[18px]">
              For every friend who purchases an ELFA EV-125.
            </p>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:mt-10 sm:grid-cols-3 sm:gap-10">
              {offerPoints.map((point) => (
                <div key={point.title} className="border-t border-white/10 pt-4 text-center sm:text-left">
                  <p className="font-roboto text-[11px] font-medium uppercase tracking-[0.14em] text-white/35">
                    {point.title}
                  </p>
                  <p className="font-roboto mt-1.5 text-[15px] leading-snug text-white/85 sm:text-[16px]">
                    {point.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works + Why join — text heavy editorial layout */}
        <section className="bg-bg-primary py-16 lg:py-24">
          <div className="mx-auto grid w-full max-w-container items-start gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20">
            <FadeIn variant="fadeInUp" speed="normal">
              <h3 className="font-montserrat mb-8 text-[32px] font-bold tracking-tight text-white lg:text-[40px]">
                How It Works
              </h3>
              <ul className="flex flex-col gap-6">
                {howItWorks.map((item) => (
                  <li key={item} className="flex items-start gap-5">
                    <div className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand-primary" />
                    <p className="font-roboto text-[16px] leading-relaxed text-text-inverse sm:text-[18px]">
                      {item}
                    </p>
                  </li>
                ))}
              </ul>
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

        <section className="bg-[#070707] py-14 lg:py-20">
          <div className="mx-auto w-full max-w-container px-4 sm:px-6">
            <h2 className="font-montserrat mb-8 text-center text-[32px] font-black uppercase tracking-tight text-brand-primary sm:mb-10 sm:text-[40px] lg:text-[48px]">
              Terms & Details
            </h2>

            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-x-16 lg:gap-y-0">
              <div className="flex flex-col gap-10">
                <TermBlock title="General Rules" items={generalRules} />
                <TermBlock title="Eligibility Criteria" items={eligibility} />
              </div>
              <div className="flex flex-col gap-10">
                <TermBlock title="Terms and Conditions" items={terms} />
                <TermBlock title="Program Terms" items={programTerms} />
              </div>
            </div>

            <div className="mx-auto mt-12 flex max-w-2xl flex-col items-center border-t border-brand-primary/20 pt-10 text-center lg:mt-14 lg:pt-12">
              <h3 className="font-montserrat mb-3 text-[28px] font-black uppercase tracking-tight text-brand-primary sm:text-[36px]">
                Ready to Start Referring?
              </h3>
              <p className="font-roboto mb-7 text-[16px] leading-relaxed text-white/70 sm:text-[18px]">
                Message us on WhatsApp at <strong className="text-white">+92 3114863532</strong>, call us, or email{" "}
                <strong className="text-white">info@elfaelectric.com</strong> to get your referral code and start
                earning PKR 10,000 per referral.
              </p>
              <FlipButton
                shape="cut"
                href="/contact-us"
                variant="primary"
                icon={<Mail className="h-5 w-5" strokeWidth={2} />}
                className="font-roboto h-[54px] rounded-none px-8 text-[14px] font-bold uppercase tracking-[1px]"
              >
                Contact Us Now
              </FlipButton>
            </div>
          </div>
        </section>
      </main>
          </>
  );
}
