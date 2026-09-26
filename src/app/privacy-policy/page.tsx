import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";

export const metadata: Metadata = {
  title: "Privacy Policy | ELFA Electric",
  description: "Privacy Policy for ELFA Electric.",
};

const policySections = [
  {
    title: "Information Collection & Use",
    content:
      "ELFA is the exclusive owner of information collected on this site. We collect information at various points, strictly for contacting users and improving our services. We do not sell, share, or rent this information to others outside the disclosed practices.",
  },
  {
    title: "Cookies",
    content:
      "We use cookies to enhance your experience, enabling you to avoid repeated logins and to access full functionality. You can disable cookies through your browser settings, though some features may be affected.",
  },
  {
    title: "Data Sharing",
    content:
      "Aggregate demographic information may be shared with partners to secure funding for continued service. This data is anonymous and does not identify any individual.",
  },
  {
    title: "Links to Other Sites",
    content:
      "Our website contains links to other websites. We are not responsible for the privacy practices of other sites and encourage you to read their privacy statements.",
  },
  {
    title: "Security",
    content: "We take precautions to protect your information with appropriate security measures.",
  },
  {
    title: "User Surveys",
    content:
      "Occasionally, we may request information via surveys. Participation is voluntary and used to improve our services.",
  },
  {
    title: "Data Correction/Updating",
    content:
      "You can update or remove your personal information via your account settings on our site.",
  },
  {
    title: "Choice/Opt-In",
    content:
      "You can opt in to receive newsletters and updates from us and can unsubscribe at any time.",
  },
  {
    title: "Policy Updates",
    content:
      "We reserve the right to update this policy and will post changes on our site. You will be notified of significant changes via email.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
            <main className="flex-1 bg-bg-primary">
        <PageHero
          title="Privacy Policy"
          breadcrumb="Privacy Policy"
          withBikes
          largeTitle
          backgroundSrc="/assets/images/blog-hero-bg.jpg"
          bikesSrc="/assets/images/blog-page.png"
        />

        <section className="mx-auto w-full max-w-container px-4 py-12 sm:px-6 lg:py-16">
          <div className="mx-auto flex max-w-container flex-col gap-8">
            <p className="font-roboto text-[15px] font-normal leading-[22.5px] text-text-primary">
              ELFA respects your privacy. This policy outlines our practices regarding the
              collection, use, and protection of personal information on our website.
            </p>

            {policySections.map((section) => (
              <div key={section.title} className="flex flex-col gap-[7px]">
                <h3 className="font-montserrat text-[25px] font-semibold leading-[30px] text-text-primary">
                  {section.title}
                </h3>
                <p className="font-roboto text-[15px] font-normal leading-[22.5px] text-text-primary">
                  {section.content}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
          </>
  );
}
