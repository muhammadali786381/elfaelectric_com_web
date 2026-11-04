import type { Metadata } from "next";
import SecondaryHero from "@/components/sections/SecondaryHero";
import JoinRevolutionCTA from "@/components/sections/JoinRevolutionCTA";

export const metadata: Metadata = {
  title: "ELFA Referral Program Pakistan | Earn PKR 10,000 Per Friend",
  description:
    "Refer a friend to ELFA Electric and earn PKR 10,000 when they buy an EV-125. Unlimited earnings, fast payouts.",
};

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
    <ul className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
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
    <div className="grid grid-cols-1 gap-5 border-t border-white/10 py-7 lg:grid-cols-[minmax(180px,280px)_1fr] lg:gap-12">
      <h3 className="font-montserrat text-[20px] font-semibold leading-snug tracking-tight text-white sm:text-[22px]">
        {title}
      </h3>
      <BulletList items={items} />
    </div>
  );
}

export default function ReferralPage() {
  return (
    <>
      <main className="flex-1 bg-[#050505]">
        <SecondaryHero
          titleLine1="Referral"
          titleLine2="Program"
          imageSrc="/assets/images/hero4.jpeg"
          imageAlt="ELFA Referral Program"
          compact
        />

        <section className="bg-[#050505] pt-4">
          <div className="mx-auto w-full max-w-container px-4 sm:px-6">
            <div className="grid grid-cols-1 gap-5 border-t border-white/10 py-7 lg:grid-cols-[minmax(180px,280px)_1fr] lg:items-start lg:gap-12">
              <div>
                <h2 className="font-montserrat text-[28px] font-black italic uppercase leading-[0.95] text-brand-primary sm:text-[32px]">
                  Earn PKR 10,000
                </h2>
                <p className="font-roboto mt-2 text-[15px] leading-snug text-white/60">
                  For every friend who purchases an ELFA EV-125.
                </p>
              </div>
              <div className="flex max-w-3xl flex-col gap-3 font-roboto text-[13px] leading-snug text-white/70 sm:text-[14px]">
                <p>
                  Welcome to the ELFA referral program Pakistan – your chance to earn PKR 10,000 for every
                  friend who purchases an ELFA EV125!
                </p>
                <p>
                  Refer a friend electric bike and enjoy unlimited rewards with instant payouts. Whether
                  you’re a customer, fan, or influencer, our electric bike referral rewards program lets you
                  earn while promoting sustainable mobility Pakistan.
                </p>
                <p>
                  Be a part of our mission and get rewarded for it. You are promoting a good cause—sustainable
                  transport—and the reward is a bonus.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#050505] pb-6 pt-2 lg:pb-8">
          <div className="mx-auto w-full max-w-container px-4 sm:px-6">
            <TermBlock title="How It Works" items={howItWorks} />
            <TermBlock title="Why Join?" items={benefits} />
          </div>
        </section>

        <section className="bg-[#050505] py-10 lg:py-14">
          <div className="mx-auto w-full max-w-container px-4 sm:px-6">
            <h2 className="font-montserrat mb-2 text-[32px] font-black uppercase tracking-tight text-brand-primary sm:text-[40px] lg:text-[48px]">
              Terms & Details
            </h2>

            <div>
              <TermBlock title="General Rules" items={generalRules} />
              <TermBlock title="Eligibility Criteria" items={eligibility} />
              <TermBlock title="Terms and Conditions" items={terms} />
              <TermBlock title="Program Terms" items={programTerms} />
            </div>
          </div>
        </section>

        <JoinRevolutionCTA
          title={
            <>
              Ready to Start
              <br />
              Referring?
            </>
          }
          subtitle="Message us on WhatsApp at +92 3114863532, call us, or email info@elfaelectric.com to get your referral code."
          primaryButtonText="Contact Us Now"
          primaryButtonHref="/contact-us"
          secondaryButtonText=""
        />
      </main>
    </>
  );
}
