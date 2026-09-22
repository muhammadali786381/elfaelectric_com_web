import Image from "next/image";
import type { ProductCoreFeature } from "@/data/products/types";

type Props = {
  features: ProductCoreFeature[];
  /** Center product image (live ~529×500) */
  centerImage: string;
  productName: string;
};

function FeatureRow({
  feature,
  mirror,
}: {
  feature: ProductCoreFeature;
  /** Right column: text first, icon on the outside */
  mirror?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-3 sm:gap-4 ${mirror ? "flex-row-reverse text-right" : "text-left"}`}
    >
      <div className="relative h-[52px] w-[52px] shrink-0 sm:h-[60px] sm:w-[60px]">
        <Image src={feature.icon} alt="" fill className="object-contain" sizes="60px" />
      </div>
      <div className="min-w-0">
        <h3 className="font-montserrat text-[18px] font-bold leading-tight text-[#212121] sm:text-[22px]">
          {feature.title}
        </h3>
        <p className="font-roboto mt-0.5 text-[14px] font-normal leading-snug text-[#212121] sm:text-[16px]">
          {feature.description}
        </p>
      </div>
    </div>
  );
}

/** Mobile cell: icon above title + desc, centered — matches live mobile ref */
function FeatureCell({ feature }: { feature: ProductCoreFeature }) {
  return (
    <div className="flex flex-col items-center px-1 text-center">
      <div className="relative mb-2 h-[44px] w-[44px] sm:h-[52px] sm:w-[52px]">
        <Image src={feature.icon} alt="" fill className="object-contain" sizes="52px" />
      </div>
      <h3 className="font-montserrat text-[14px] font-bold leading-tight text-[#212121] sm:text-[15px]">
        {feature.title}
      </h3>
      <p className="font-roboto mt-1 text-[11px] font-normal leading-snug text-[#212121] sm:text-[12px]">
        {feature.description}
      </p>
    </div>
  );
}

/**
 * Live layout:
 * - Desktop: left | bike | right (mirrored)
 * - Mobile: 2-col icon-top grid, then center bike
 */
export default function ProductCoreFeatures({ features, centerImage, productName }: Props) {
  const left = features.slice(0, 3);
  const right = features.slice(3, 6);
  // Pair left[i] with right[i] for 2-col mobile rows
  const mobileRows = left.map((l, i) => [l, right[i]] as const).filter(([, r]) => r);

  return (
    <section className="bg-[#eeeeee] py-10 lg:py-16">
      <div className="mx-auto w-full max-w-[1150px] px-3 sm:px-6">
        <h2 className="font-montserrat text-center text-[28px] font-bold leading-none text-black sm:text-[36px] lg:text-[51px]">
          Core Features
        </h2>

        {/* Mobile: 2-col grid (icon above text), then bike */}
        <div className="mt-8 lg:hidden">
          <div className="mx-auto grid max-w-[400px] grid-cols-2 gap-x-4 gap-y-6">
            {mobileRows.flatMap(([l, r]) => [
              <FeatureCell key={l.title} feature={l} />,
              <FeatureCell key={r.title} feature={r} />,
            ])}
          </div>

          <div className="relative mx-auto mt-8 h-[280px] w-full max-w-[360px] sm:h-[320px]">
            <Image
              src={centerImage}
              alt={productName}
              fill
              className="object-contain"
              sizes="360px"
            />
          </div>
        </div>

        {/* Desktop: left | bike | right */}
        <div className="mt-12 hidden items-center lg:grid lg:grid-cols-[1fr_minmax(420px,529px)_1fr] lg:gap-6 xl:gap-8">
          <div className="flex flex-col justify-center gap-[30px]">
            {left.map((f) => (
              <FeatureRow key={f.title} feature={f} />
            ))}
          </div>

          <div className="relative mx-auto h-[500px] w-full max-w-[529px]">
            <Image
              src={centerImage}
              alt={productName}
              fill
              className="object-contain"
              sizes="529px"
              priority
            />
          </div>

          <div className="flex flex-col justify-center gap-[30px]">
            {right.map((f) => (
              <FeatureRow key={f.title} feature={f} mirror />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
