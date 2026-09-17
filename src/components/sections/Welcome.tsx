import Image from "next/image";
import Container from "@/components/ui/Container";

const features = [
  {
    title: "Meet Us",
    body: "Locate us today to enjoy a unique and personalized experience.",
  },
  {
    title: "Book A Test Ride",
    body: "Experience the journey from your doorstep by booking a Test Ride.",
  },
  {
    title: "Discover Your Perfect Ride",
    body: "Available in a range of striking colors to match your style.",
  },
];

export default function Welcome() {
  return (
    <section className="bg-white py-16 lg:py-20">
      <Container>
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="flex justify-center">
            <Image
              src="/assets/images/EV-125-BIKE-1.webp"
              alt="ELFA EV-125"
              width={565}
              height={534}
              className="h-auto w-full max-w-[565px] object-contain"
            />
          </div>

          <div>
            <span className="font-montserrat block text-[24px] font-bold text-[#61ce70] sm:text-[30px]">
              Welcome
            </span>
            <h2 className="font-montserrat mb-8 max-w-[565px] text-[32px] font-bold leading-tight text-[#212121] sm:text-[38px] lg:text-[44px]">
              Explore, Experience, And Connect With Us
            </h2>

            <div className="grid grid-cols-1 gap-x-[20px] gap-y-8 sm:grid-cols-2">
              {features.map((f) => (
                <div key={f.title} className="max-w-[273px]">
                  <h3 className="font-montserrat mb-2 text-[18px] font-bold text-[#61ce70] sm:text-[20px]">
                    {f.title}
                  </h3>
                  <p className="font-roboto text-[14px] leading-relaxed text-[#212121]">{f.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
