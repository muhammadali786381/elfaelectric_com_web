import Image from "next/image";
import type { ProductAdvancedFeature } from "@/data/products/types";
import { STORE_BADGES } from "@/data/products/types";

export default function ProductAdvancedFeatures({
  features,
}: {
  features: ProductAdvancedFeature[];
}) {
  return (
    <section className="bg-bg-primary py-[70px]">
      <div className="mx-auto w-full max-w-[980px] px-4 sm:px-6">
        {/* Live: Montserrat 50px / 800 */}
        <h2 className="font-montserrat text-center text-[32px] font-extrabold leading-[1.1] text-text-primary sm:text-[40px] sm:leading-[40px] lg:text-[50px] lg:leading-[50px]">
          Advanced Features That We Offer
        </h2>

        {/* Live row gap = 20px */}
        <div className="mt-5 flex flex-col gap-5">
          {features.map((feat, i) => {
            const reverse = i % 2 === 1;
            return (
              <div
                key={feat.title}
                className={`grid grid-cols-1 items-center gap-5 lg:grid-cols-2 ${
                  reverse ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                {/* Live image ~465×217, radius 5px */}
                <div className="relative aspect-[800/373] w-full overflow-hidden rounded-[5px]">
                  <Image
                    src={feat.image}
                    alt={feat.title}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 465px, 100vw"
                  />
                </div>

                <div>
                  {/* Live: Montserrat 28px / 700 / lh 34 */}
                  <h3 className="font-montserrat text-[22px] font-bold capitalize leading-[28px] text-text-primary sm:text-[28px] sm:leading-[34px]">
                    {feat.title}
                  </h3>

                  {/* Live body: Roboto 20px / 400 / lh 23 / #212121 */}
                  {feat.bullets?.length ? (
                    <div className="font-roboto mt-2 space-y-0 text-[16px] font-normal leading-[23px] text-text-primary sm:text-[20px]">
                      {feat.bullets.map((b) => (
                        <p key={b.label}>
                          <strong className="font-bold">{b.label}:</strong> {b.text}
                        </p>
                      ))}
                    </div>
                  ) : null}

                  {feat.description ? (
                    <p className="font-roboto mt-2 text-[16px] font-normal leading-[23px] text-text-primary sm:text-[20px]">
                      {feat.description}
                    </p>
                  ) : null}

                  {feat.showStoreBadges ? (
                    <div className="mt-3 flex flex-wrap items-center gap-3">
                      <a
                        href="https://play.google.com/store"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative h-[48px] w-[163px]"
                      >
                        <Image
                          src={STORE_BADGES.googlePlay}
                          alt="Get it on Google Play"
                          fill
                          className="object-contain"
                          sizes="163px"
                        />
                      </a>
                      <a
                        href="https://apps.apple.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative h-[48px] w-[163px]"
                      >
                        <Image
                          src={STORE_BADGES.appStore}
                          alt="Download on the App Store"
                          fill
                          className="object-contain"
                          sizes="163px"
                        />
                      </a>
                    </div>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
