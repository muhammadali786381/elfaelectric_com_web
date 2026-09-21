import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/sections/PageHero";
import PavePromo from "@/components/sections/PavePromo";
import FAQAccordion from "./FAQAccordion";

export const metadata: Metadata = {
  title: "ELFA Electric FAQs | Electric Bike Questions Answered",
  description:
    "Answers to common questions about ELFA electric bikes and scooties — charging, range, warranty, maintenance, and more.",
};

/** Copy scraped from https://elfaelectric.com/faqs/ */
export const faqs = [
  {
    q: "How do I maintain my EV bike?",
    a: "Maintaining an EV bike is simple and hassle-free. Keep your bike clean, ensure the battery is charged, and avoid exposing it to wet areas while charging. Unlike traditional engine bikes that need regular maintenance of the engine, brakes, clutch, and gears, EV bikes have fewer moving parts and require minimal care. Just check your tyre pressure, brake condition, and battery health periodically to ensure optimal performance and a smooth ride. If you have any questions or need assistance, feel free to call our customer service center.",
  },
  {
    q: "How long is the battery warranty?",
    a: "The battery warranty for ELFA electric bikes in Pakistan is 3 years or 50,000 KM, whichever comes first. This warranty applies to issues specified by the company in the warranty booklet. Any breach of the regulations not covered under the warranty terms will not be eligible for coverage.",
  },
  {
    q: "How long do I need to charge my electric bike?",
    a: "Our current EV-125 variant has a battery capacity of 72V/30Ah, which requires approximately 2 units of electricity to fully charge. It can be charged in 2-3 hours using the company-provided charging plug.",
  },
  {
    q: "Is driving an EV bike easy?",
    a: "Yes, riding an EV bike is really easy, as it doesn’t have a gear or clutch to adjust whenever you change speeds. Our electric bike offers three speed modes—Eco, City, and Sports—that you can switch between with the push of a button.",
  },
  {
    q: "What special arrangements do I need to make to charge my EV bike?",
    a: "Electric vehicles can be charged at home using a standard electrical outlet or a dedicated home charging station. Just ensure the outlet is properly grounded and avoid using extension cords for safety. Additionally, it’s best to keep the charging area dry and well-ventilated to protect the battery and charging equipment.",
  },
  {
    q: "What if I have issues with my battery?",
    a: "If your battery encounters any issues during the warranty period, simply call our helpline, and our customer service team will guide you through the battery replacement process. To ensure prompt assistance, our customer service team is on high alert. Once we receive your query, we will notify our remote team, stationed at various locations in the city. Our trained remote team will visit you at your location to conduct an initial inspection. If the issue can be resolved on-site, we will do so immediately. Otherwise, we will transport your bike to our showroom, make the necessary repairs, and deliver it back to you within 24 hours.",
  },
  {
    q: "What if my rear tyre gets punctured?",
    a: "Our battery is located near the rear tyre, which can make it tricky to replace the tyre if it gets punctured. To assist you, we have created a tutorial to help you change the tyres.",
  },
  {
    q: "Is the electric EV 125 water resistance?",
    a: "Our electric EV 125 is water-resistant and designed to handle light rain and wet conditions, but we recommend avoiding submerging the bike or battery in water.",
  },
  {
    q: "Can I take my EV bike out when it's raining?",
    a: "Yes, you can easily ride your bike in the rain or other challenging conditions, as it features a waterproof battery box and a robust body. Additionally, our tubeless 17-inch tyres and alloy rims enhance the bike's performance on difficult terrains, improving maneuverability and control.",
  },
  {
    q: "How far can electric vehicles travel on a single charge?",
    a: "Our EV-125 provides a maximum range of 100 KM on a single charge when riding in Eco mode. The range may vary based on the bike’s battery capacity, speed, and tyre pressure.",
  },
  {
    q: "What are the key features of your electric scooty?",
    a: "Our electric scooty features a powerful electric motor of 1500W, a long-lasting lithium iron phosphate (LiFePO4) battery. It also includes tubeless tyres, front and rear alloy rims, a battery capacity of 64V/30Ah, a meter LED display. Our electric motor bike is able to provide you a range of 70-80Km with a top speed of 60Km/h",
  },
  {
    q: "What is the range of electric scooty on a single charge?",
    a: "The range of our electric scooty is approximately 70 - 80Km, depending on riding mode, weight on scooty and terrain.",
  },
  {
    q: "What is the charging time for the scooty?",
    a: "Using the standard charger included with your purchase, charging the battery from 0% to 100% takes approximately 03 hours.",
  },
  {
    q: "Is the electric scooty water resistance?",
    a: "Our electric scooty is water-resistant and designed to handle light rain and wet conditions, but we recommend avoiding submerging the bike or battery in water.",
  },
  {
    q: "What is the total weight of the electric scooty?",
    a: "The scooty weighs approximately 100Kg, making it easy to handle while still providing robust performance.",
  },
  {
    q: "What is the maximum speed of the electric scooty?",
    a: "The top speed of our electric bike is 60 Km/h, depending on the rider’s weight and terrain.",
  },
];

export default function FAQsPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <PageHero
          title="Frequently Asked Questions"
          breadcrumb="FAQs"
          withBikes
          backgroundSrc="/assets/images/blog-hero-bg.jpg"
          bikesSrc="/assets/images/blog-page.png"
        />

        <section className="bg-white py-12 lg:py-16">
          <div className="mx-auto w-full max-w-[954px] px-4 sm:px-6">
            <FAQAccordion faqs={faqs} />
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
