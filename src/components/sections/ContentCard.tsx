import Image from "next/image";
import Link from "next/link";
import { Calendar, ChevronRight } from "lucide-react";
import FlipButton from "@/components/ui/FlipButton";

export const SPARK_GRADIENT =
  "linear-gradient(135deg, #00C853 -110%, #000000 50%, #00C853 190%)";

export type ContentCardItem = {
  title: string;
  link: string;
  imagePath: string;
  excerpt: string;
  date?: string;
  external?: boolean;
};

export default function ContentCard({ item }: { item: ContentCardItem }) {
  return (
    <article
      className="group flex min-h-[450px] flex-col overflow-hidden rounded-[15px]"
      style={{ backgroundImage: SPARK_GRADIENT }}
    >
      <Link
        href={item.link}
        target={item.external ? "_blank" : undefined}
        rel={item.external ? "noopener noreferrer" : undefined}
        className="relative block h-[210px] w-full shrink-0 overflow-hidden"
      >
        <Image
          src={item.imagePath}
          alt={item.title}
          fill
          className="rounded-t-[15px] object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(min-width: 1024px) 352px, (min-width: 768px) 50vw, 100vw"
        />
      </Link>

      <div className="flex flex-1 flex-col px-4 pb-6 pt-4 sm:px-[14px]">
        {item.date && (
          <div className="font-roboto mb-3 flex items-center gap-2 text-[14px] font-normal text-brand-primary sm:text-[15px]">
            <Calendar className="h-4 w-4 shrink-0" strokeWidth={2} />
            <span>{item.date}</span>
          </div>
        )}

        <Link
          href={item.link}
          target={item.external ? "_blank" : undefined}
          rel={item.external ? "noopener noreferrer" : undefined}
        >
          <h3 className="font-montserrat text-[18px] font-bold leading-[1.25] text-text-inverse transition-colors group-hover:text-brand-primary sm:text-[21px] sm:leading-[25px]">
            {item.title}
          </h3>
        </Link>
       <div className="flex flex-col gap-2">
        <p className="font-roboto mt-3 line-clamp-3 text-[14px] font-normal leading-[21px] text-text-inverse/90">
          {item.excerpt}
        </p>

        <FlipButton
          href={item.link}
          target={item.external ? "_blank" : undefined}
          rel={item.external ? "noopener noreferrer" : undefined}
          variant="outline"
          icon={<ChevronRight className="h-4 w-4" strokeWidth={2.5} />}
          className="font-roboto mt-auto h-auto rounded-none border-0 bg-transparent px-0 py-0 pt-5 text-[16px] font-semibold normal-case tracking-normal text-text-inverse hover:bg-transparent hover:text-brand-primary"
        >
          Read More
        </FlipButton>
        </div>
      </div>
    </article>
  );
}
