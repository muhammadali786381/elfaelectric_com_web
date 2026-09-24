import Image from "next/image";
import type { ProductSpecGroup } from "@/data/products/types";

/**
 * Live Specs cards use `.spark-12`:
 * linear-gradient(135deg, rgb(0,200,83) -110%, rgb(0,0,0) 50%, rgb(0,200,83) 190%)
 */
export default function ProductSpecs({ groups }: { groups: ProductSpecGroup[] }) {
  return (
    <section className="bg-bg-primary py-[70px]">
      <div className="mx-auto flex w-full max-w-[1150px] flex-col items-center px-4 sm:px-6">
        {/* Live: Montserrat 50px / 700 */}
        <h2 className="font-montserrat text-center text-[32px] font-bold leading-[1.1] text-text-primary sm:text-[40px] lg:text-[50px] lg:leading-[50px]">
          Specifications
        </h2>

        {/* Live: 4 cards, 15px gap, mt ~20px */}
        <div className="mt-5 grid w-full grid-cols-1 gap-[15px] sm:grid-cols-2 lg:grid-cols-4">
          {groups.map((g) => (
            <div
              key={g.title}
              className="flex flex-col items-start gap-[5px] rounded-[15px] border border-[rgba(33,33,33,0.14)] px-5 py-[15px] shadow-[0_0_20px_-10px_rgba(0,0,0,0.5)] transition-colors duration-300 hover:bg-[rgba(97,206,112,0.07)]"
              style={{
                background:
                  "linear-gradient(135deg, rgb(0, 200, 83) -110%, rgb(0, 0, 0) 50%, rgb(0, 200, 83) 190%)",
              }}
            >
              <div className="relative h-[68px] w-[70px] shrink-0 mx-auto">
                <Image src={g.icon} alt="" fill className="object-contain" sizes="70px" />
              </div>

              {/* Live: Montserrat 20px / 700 / white */}
              <h3 className="font-montserrat text-[20px] font-bold leading-[20px] text-text-inverse  mx-auto">
                {g.title}
              </h3>

              {/* Live: Roboto 14px / 400 / white, green circle bullets */}
              <ul className="font-roboto w-full space-y-0 text-[14px] font-normal leading-[21px] text-text-inverse">
                {g.items.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span
                      className="mt-[5.5px] h-[10px] w-[10px] shrink-0 rounded-full bg-brand-primary"
                      aria-hidden
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
