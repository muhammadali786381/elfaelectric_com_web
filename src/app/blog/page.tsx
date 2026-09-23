import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/sections/PageHero";
import ContentCard, { type ContentCardItem } from "@/components/sections/ContentCard";
import { FadeIn } from "@/components/motion/FadeIn";

export const metadata: Metadata = {
  title: "ELFA Electric Blog | News, Tips, Insights on EVs in Pakistan",
  description:
    "Let us review our recent posts to ensure you stay informed and connected with all the latest updates from ELFA E-bike.",
};

const posts: ContentCardItem[] = [
  {
    title: "Electric Bike Water Resistance & IP Rating Guide",
    link: "https://elfaelectric.com/electric-bike-water-resistance-ip-rating-guide/",
    date: "August 31, 2026",
    excerpt:
      "Rain is a part of life in Pakistan, and if you’re riding an electric bike, you’ve probably wondered whether a",
    imagePath: "/assets/images/blog/ip-ratings-guide-3rd-1024x536.png",
  },
  {
    title: "Best Electric Scooty in Pakistan for Daily Travel 2026",
    link: "https://elfaelectric.com/best-electric-scooty-in-pakistan-for-daily-travel-2026/",
    date: "August 15, 2026",
    excerpt:
      "Pakistan’s roads tell a story every commuter knows by heart: long fuel queues, rising petrol prices, and the daily grind",
    imagePath: "/assets/images/blog/best-electric-scooty-pakistan-2026-elfa-ev1-1024x536.jpeg",
  },
  {
    title: "Why Riders Prefer Electric Scooters Over Petrol Bikes",
    link: "https://elfaelectric.com/why-riders-prefer-electric-scooters-over-petrol-bikes/",
    date: "July 26, 2026",
    excerpt:
      "Petrol prices in Pakistan keep climbing, traffic keeps getting heavier, and maintenance bills for old bikes keep piling up. It’s",
    imagePath: "/assets/images/blog/WhatsApp-Image-2026-07-22-at-10.02.46-PM-1024x536.jpeg",
  },
  {
    title: "Top Reasons Why Electric Bikes Are Perfect for Pakistani Cities",
    link: "https://elfaelectric.com/top-reasons-why-electric-bikes-are-perfect-for-pakistani-cities/",
    date: "July 7, 2026",
    excerpt:
      "If you live in Lahore, Karachi, Islamabad, Peshawar, or any major Pakistani city, you already know the daily reality: gridlocked",
    imagePath: "/assets/images/blog/ev-cover-4th-1-1024x536.png",
  },
  {
    title: "How Much Electricity Does an Electric Bike Consume in Pakistan?",
    link: "https://elfaelectric.com/how-much-electricity-does-an-electric-bike-consume-in-pakistan/",
    date: "June 22, 2026",
    excerpt:
      "The Real Cost of Charging an Electric Bike in Pakistan Every Pakistani rider asks the same question first: what will",
    imagePath: "/assets/images/blog/WhatsApp-Image-2026-06-20-at-2.38.25-PM-1024x536.jpeg",
  },
  {
    title: "Electric Bike vs Traditional Petrol Bike – Which Saves More?",
    link: "https://elfaelectric.com/electric-bike-vs-traditional-petrol-bike-which-saves-more/",
    date: "June 10, 2026",
    excerpt:
      "Pakistan’s two-wheeler market is one of the most active transport systems in the region, where millions of riders depend on",
    imagePath: "/assets/images/blog/WhatsApp-Image-2026-06-09-at-11.28.19-PM-1024x536.jpeg",
  },
  {
    title: "Electric Bike Battery Life Explained – How Long Do They Really Last?",
    link: "https://elfaelectric.com/electric-bike-battery-life-explained/",
    date: "May 16, 2026",
    excerpt:
      "Electric bikes are rapidly gaining popularity across Pakistan, but one of the most common concerns among buyers is battery life",
    imagePath: "/assets/images/blog/WhatsApp-Image-2026-05-12-at-7.04.01-PM-1024x536.jpeg",
  },
  {
    title: "Future of Electric Bikes in Pakistan – Trends to Watch in 2026 & Beyond",
    link: "https://elfaelectric.com/future-of-electric-bikes-in-pakistan-trends-to-watch-in-2026-beyond/",
    date: "May 6, 2026",
    excerpt:
      "The transportation sector in Pakistan is undergoing a major transformation, and the future of electric bikes in Pakistan 2026 is",
    imagePath: "/assets/images/blog/WhatsApp-Image-2026-05-04-at-4.34.02-PM-1024x536.jpeg",
  },
  {
    title: "Electric Bike Registration Process in Pakistan – Complete Guide 2026",
    link: "https://elfaelectric.com/electric-bike-registration-process-in-pakistan-complete-guide-2026/",
    date: "April 30, 2026",
    excerpt:
      "The rise of electric vehicles has transformed the transportation landscape across Pakistan, and many riders are now switching to eco-friendly",
    imagePath: "/assets/images/blog/WhatsApp-Image-2026-04-28-at-6.45.09-PM-1024x536.jpeg",
  },
  {
    title: "Are Electric Bikes Safe in Pakistan? Safety Features & Road Reality",
    link: "https://elfaelectric.com/are-electric-bikes-safe-in-pakistan/",
    date: "April 20, 2026",
    excerpt:
      "The growing popularity of electric vehicles has sparked an important question among commuters: Are electric bikes safe in Pakistan? As",
    imagePath: "/assets/images/blog/WhatsApp-Image-2026-04-20-at-11.48.24-PM-1024x537.jpeg",
  },
  {
    title: "Best Electric Bikes for Students in Pakistan – Budget & Practical Options",
    link: "https://elfaelectric.com/best-electric-bikes-for-students-in-pakistan/",
    date: "April 14, 2026",
    excerpt:
      "The rising cost of fuel and increasing daily commuting challenges have made students across Pakistan rethink their transportation choices. From",
    imagePath: "/assets/images/blog/Best-Electric-Bikes-for-Students-in-Pakistan-1024x535.jpeg",
  },
  {
    title: "Why More Pakistanis Are Switching to ELFA Electric Bikes in 2026",
    link: "https://elfaelectric.com/why-more-pakistanis-are-switching-to-elfa-electric-bikes-in-2026/",
    date: "March 19, 2026",
    excerpt:
      "The transportation landscape in Pakistan is evolving rapidly. Rising fuel prices, heavy traffic congestion, and growing environmental awareness are prompting",
    imagePath: "/assets/images/blog/WhatsApp-Image-2026-03-18-at-12.36.26-AM-1024x536.jpeg",
  },
];

export default function BlogPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <PageHero
          title="Latest Blog"
          subtitle="Read the latest trends around the world"
          breadcrumb="Blog"
          withBikes
          bigTitle
          backgroundSrc="/assets/images/blog-hero-bg.jpg"
          bikesSrc="/assets/images/blog-page.png"
        />

        <FadeIn variant="fadeInUp" speed="normal" className="bg-white px-4 pb-8 pt-12 text-center sm:px-6 sm:pt-14">
          <h2 className="font-montserrat text-[24px] font-bold leading-[18px] text-[#61ce70] sm:text-[28px]">
            Our Blog
          </h2>
          <h3 className="font-montserrat mt-5 text-[32px] font-bold leading-tight text-[#212121] sm:mt-6 sm:text-[44px] sm:leading-[50px] lg:text-[50px]">
            Latest Blogs & Articles
          </h3>
          <p className="font-roboto mx-auto mt-4 max-w-[720px] text-[15px] font-normal leading-[25.5px] text-[#212121] sm:text-[17px]">
            Let us review our recent posts to ensure you stay informed and connected with all the
            latest updates from ELFA E-bike.
          </p>
        </FadeIn>

        <section className="bg-white pb-16 pt-2 sm:pb-20">
          <div className="mx-auto w-full max-w-container px-4 sm:px-6">
            <div className="grid grid-cols-1 gap-[30px] md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <ContentCard key={post.title} item={post} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
