import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { FadeIn } from "@/components/motion/FadeIn";

export const metadata: Metadata = {
  title: "Newsroom – ELFA Electric",
  description: "ELFA Electric in the press — coverage and mentions from Pakistan's leading media outlets.",
};

type NewsItem = {
  title: string;
  link: string;
  date?: string;
  excerpt: string;
  imagePath: string;
  external?: boolean;
};

// Title / image / excerpt scraped from https://elfaelectric.com/newsroom/
const newsItems: NewsItem[] = [
  {
    title: "ELFA Partners with Wasl Mobility Modaraba to Make Electric Motorcycle More Accessible in Pakistan",
    link: "https://elfaelectric.com/elfa-wasl-partnership-electric-motorcycle-pakistan/",
    date: "October 8, 2025",
    excerpt:
      "ELFA Electric, a brand of EV Technologies Pvt. Ltd. (a Wavetec company), has partnered with Wasl Mobility Modaraba to make",
    imagePath: "/assets/images/newsroom/WhatsApp-Image-2025-10-07-at-10.53.19-PM-1024x536.jpeg",
  },
  {
    title: "The Economic Opportunity Behind Pakistan’s EV Transition",
    link: "https://www.techjuice.pk/the-economic-opportunity-behind-pakistans-ev-transition/",
    excerpt:
      "Pakistan’s electric vehicle conversation is often reduced to one question: when will people start buying EVs? As a CEO working in Pakistan’s EV industry, I believe we are asking the question too narrowly.",
    imagePath: "/assets/images/newsroom/WhatsApp-Image-2026-09-10-at-9.01.48-PM-1024x536.jpeg",
    external: true,
  },
  {
    title: "Interview with Huma Yahya Khattak",
    link: "https://www.brecorder.com/news/40438213",
    excerpt:
      "Huma Yahya Khattak is the Chief Executive Officer of EV Technologies, the Pakistani electric mobility company behind the ELFA Electric brand. She is Pakistan’s first female CEO leading an electric vehicle manufacturing c",
    imagePath: "/assets/images/newsroom/WhatsApp-Image-2026-09-09-at-10.10.01-PM-1024x536.jpeg",
    external: true,
  },
  {
    title: "Cities on two wheels",
    link: "https://www.thenews.pk/tns/detail/1428244-cities-on-two-wheels",
    excerpt:
      "No city grows faster than it moves. and Pakistan moves on 30 million motorcycles. Electrifying them is among the most economically significant transport opportunities available to the country……",
    imagePath: "/assets/images/newsroom/WhatsApp-Image-2026-07-27-at-5.35.57-PM-1024x766.jpeg",
    external: true,
  },
  {
    title: "Leading the charge on two wheels",
    link: "https://www.dawn.com/news/2025870",
    excerpt:
      "On a Sunday, a family of five can climb onto a Honda CD 70 in North Nazimabad and head to the beach. On weekdays, the same bike can carry a commuter to work, a child to school and a delivery ride through an entire shift.",
    imagePath: "/assets/images/newsroom/WhatsApp-Image-2026-09-01-at-11.16.54-PM-1024x536.jpeg",
    external: true,
  },
  {
    title: "Pakistan’s Electric Future",
    link: "https://runwaypakistan.com/how-elfa-is-building-pakistans-electric-future/",
    excerpt:
      "Every day, millions of Pakistanis begin their morning with the same questions: How much will today’s commute cost? How much time will traffic add to the journey? As fuel prices continue to rise and congestion becomes a par",
    imagePath: "/assets/images/newsroom/WhatsApp-Image-2026-08-01-at-3.49.07-PM-1024x536.jpeg",
    external: true,
  },
  {
    title: "Doubling down on lithium",
    link: "https://www.dawn.com/news/1997180",
    excerpt:
      "and EV Technologies The future of energy is closely tied to efficient batteries, not only for e-bikes and electric vehicles (EVs) but also for domestic and commercial solar power banks. The current game-changer is the li",
    imagePath: "/assets/images/newsroom/News-Room-Banner-11-2026-05.jpg-1024x536.jpeg",
    external: true,
  },
  {
    title: "Government of Pakistan Extends Subsidy on ELFA Electric Bikes...",
    link: "https://southasia.com.pk/2025/09/10/government-of-pakistan-extends-subsidy-on-elfa-electric-bikes-under-pave-program/",
    excerpt:
      "The Government of Pakistan, under its Pakistan Accelerated Vehicle Electrification (PAVE) Program, has announced a subsidy of up…",
    imagePath: "/assets/images/newsroom/News-Room-Banner-01.jpg-1024x536.jpeg",
    external: true,
  },
  {
    title: "Empowering Generations: ELFA and Atom Power Partner with NED...",
    link: "https://startuppakistan.com.pk/empowering-generations-elfa-and-atom-power-partner-with-ned-to-promote-green-tech/",
    excerpt:
      "In a landmark collaboration to promote sustainable mobility and energy independence, ELFA and Atom Power (both Wavetec Subsidiaries)…",
    imagePath: "/assets/images/newsroom/News-Room-Banner-03.jpg-1024x536.jpeg",
    external: true,
  },
  {
    title: "Introducing ELFA: Wavetec’s Locally Engineered Electric Bike for Pakistan...",
    link: "https://autopower.com.pk/elfa-electric-bike-pakistan/",
    excerpt:
      "With rising fuel prices and socio-economic challenges mounting, Pakistan is in urgent need of sustainable, innovative solutions…",
    imagePath: "/assets/images/newsroom/News-Room-Banner-02.jpg-1-1024x536.jpeg",
    external: true,
  },
  {
    title: "ELFA and Bykea: powering Pakistan’s gig economy with electric mobility...",
    link: "https://www.brecorder.com/news/40371429/elfa-and-bykea-powering-pakistans-gig-economy-with-electric-mobility",
    excerpt:
      "In a landmark collaboration to help accelerate Pakistan’s transition toward electric mobility, ELFA Electric motorcycles…",
    imagePath: "/assets/images/newsroom/News-Room-Banner-06.jpg-1-1024x536.jpeg",
    external: true,
  },
  {
    title: "Accelerating progress’: ELFA partners with Bykea to empower riders with...",
    link: "https://www.dawn.com/news/1922047",
    excerpt:
      "The partnership brings affordable electric mobility to Pakistan’s roads, helping Bykea drivers cut costs, boost earnings and support a cleaner urban future…",
    imagePath: "/assets/images/newsroom/News-Room-Banner-10.jpg-1024x536.jpeg",
    external: true,
  },
  {
    title: "ELFA and Atom Power partner with NED to promote green technology...",
    link: "https://www.dawn.com/news/1937364",
    excerpt:
      "This partnership will raise awareness of new technologies by offering special financing for ELFA and Atom Power products to NED…",
    imagePath: "/assets/images/newsroom/News-Room-Banner-09.jpg-1024x536.jpeg",
    external: true,
  },
  {
    title: "Everything You Need to Know About ELFA EV-125: Pakistan’s Top Electric Bike...",
    link: "https://asaanghar.com/everything-you-need-to-know-about-elfa-ev-125-pakistans-top-electric-bike/",
    excerpt:
      "Electric bikes are quickly becoming the go-to solution for commuters in Pakistan, offering a more sustainable, affordable, and efficient…",
    imagePath: "/assets/images/newsroom/News-Room-Banner-07.jpg-1024x536.jpeg",
    external: true,
  },
  {
    title: "We want to make Pakistan a hub of innovation for EVs",
    link: "https://aurora.dawn.com/news/1145602/we-want-to-make-pakistan-a-hub-of-innovation-for-evs",
    excerpt:
      "Huma Yahya Khattak, CEO, EV Technologies, speaks to Mamun M. Adil about the introduction of ELFA e-bikes and the future of the e-bike sector…",
    imagePath: "/assets/images/newsroom/News-Room-Banner-08.jpg-1024x536.jpeg",
    external: true,
  },
  {
    title: "Empowering generations: ELFA and Atom Power partner with NED to promote...",
    link: "https://www.brecorder.com/news/40379889/empowering-generations-elfa-and-atom-power-partner-with-ned-to-promote-green-tech",
    excerpt:
      "KARACHI: In a landmark collaboration to promote sustainable mobility and energy independence, ELFA and Atom Power…",
    imagePath: "/assets/images/newsroom/News-Room-Banner-11-2026-03.jpg-1024x536.jpeg",
    external: true,
  },
];

export default function NewsroomPage() {
  return (
    <main className="flex-1 bg-[#050505] text-white">
      {/* Massive Hero Section */}
      <section className="relative flex min-h-[60dvh] items-center justify-center overflow-hidden border-b border-white/10 pt-28 pb-20 lg:min-h-[70dvh] lg:pt-32">
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/images/hero4.jpeg"
            alt="News Hero Background"
            fill
            priority
            className="object-cover opacity-60"
          />
          {/* Pinkish/reddish dark overlay to match Joresx */}
          <div className="absolute inset-0 bg-rose-950/40 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/80 via-transparent to-[#050505]" />
          <div className="absolute inset-0 bg-[#050505]/40" />
        </div>

        <div className="relative z-10 w-full text-center px-4">
          <FadeIn variant="fadeInUp" speed="slow">
            <h1 className="font-montserrat text-[80px] sm:text-[120px] md:text-[160px] lg:text-[200px] font-normal leading-none tracking-tighter text-white">
              NEWS©
            </h1>
          </FadeIn>
        </div>
      </section>

      {/* Wireframe Grid Layout */}
      <section className="w-full py-16 sm:py-24">
        <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6">
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 border border-white/10">
            {newsItems.map((item, i) => (
              <div key={i} className="bg-[#050505] flex flex-col h-full">
                <FadeIn variant="fadeInUp" speed="normal" delay={i * 0.1} className="flex-1 flex flex-col h-full">
                  <Link
                    href={item.link}
                    target={item.external ? "_blank" : "_self"}
                    className="group flex flex-col h-full"
                  >
                    {/* Image Container */}
                    <div className="relative aspect-[4/3] sm:aspect-square md:aspect-[4/3] w-full overflow-hidden border-b border-white/10 shrink-0">
                      <Image
                        src={item.imagePath}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />

                      {/* Hover Overlay (Slides up from bottom) */}
                      <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-[#050505] via-[#050505]/95 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] flex flex-col justify-end p-6 sm:p-8">
                        <div className="transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100 flex flex-col justify-end">
                          <p className="font-roboto text-[13px] sm:text-[14px] text-white/80 line-clamp-4">
                            {item.excerpt}
                          </p>
                        </div>
                      </div>

                      {/* Top Right Arrow Icon */}
                      <div className="absolute top-4 right-4 w-10 h-10 bg-black/60 backdrop-blur-md flex items-center justify-center transition-colors duration-300 group-hover:bg-white group-hover:text-black text-white/80 border border-white/10 group-hover:border-white z-10">
                        <ArrowUpRight className="w-5 h-5" />
                      </div>
                    </div>

                    {/* Title Container (Bottom) */}
                    <div className="p-6 sm:p-8 flex-1 flex flex-col justify-start bg-[#050505] relative z-0">
                      <h3 className="font-roboto text-[16px] sm:text-[20px] font-bold text-white leading-snug group-hover:text-brand-primary transition-colors">
                        {item.title}
                      </h3>
                    </div>
                  </Link>
                </FadeIn>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
