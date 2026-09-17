import Link from "next/link";
import { MapPin, Calendar, Palette } from "lucide-react";
import Container from "@/components/ui/Container";

const columns = [
  {
    icon: MapPin,
    title: "Meet Us",
    body: "Locate us today to enjoy a unique and personalized experience.",
    href: "/our-dealers",
  },
  {
    icon: Calendar,
    title: "Book A Test Ride",
    body: "Experience the journey from your doorstep by booking a Test Ride.",
    href: "/book-a-test-ride",
  },
  {
    icon: Palette,
    title: "Discover Your Perfect Ride",
    body: "Available in a range of striking colors to match your style.",
    href: "/products",
  },
];

export default function FeatureColumns() {
  return (
    <section className="section-padding bg-white">
      <Container>
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
          {columns.map(({ icon: Icon, title, body, href }) => (
            <Link
              key={title}
              href={href}
              className="group flex flex-col items-center gap-4 text-center"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#61ce70]/10 text-[#61ce70] transition-colors group-hover:bg-[#61ce70] group-hover:text-white">
                <Icon className="h-7 w-7" strokeWidth={1.75} />
              </div>
              <h3 className="font-montserrat text-[19px] font-bold text-[#212121]">{title}</h3>
              <p className="font-roboto max-w-[260px] text-[14px] leading-relaxed text-gray-500">{body}</p>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
