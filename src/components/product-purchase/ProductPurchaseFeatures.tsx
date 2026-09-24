import type { ProductPurchaseFeature } from "@/data/products/purchase-types";

export default function ProductPurchaseFeatures({
  features,
}: {
  features: ProductPurchaseFeature[];
}) {
  return (
    <section className="bg-bg-primary pb-12 lg:pb-16">
      <div className="mx-auto flex w-full max-w-[1150px] flex-col gap-8 px-4 sm:px-6 lg:gap-10">
        {features.map((feat) => (
          <div key={feat.title}>
            <h2 className="font-montserrat text-[22px] font-semibold leading-[1.2] text-text-primary sm:text-[26px] sm:leading-[31px]">
              {feat.title}
            </h2>

            {feat.bullets?.length ? (
              <ul className="font-roboto mt-3 list-disc space-y-2 pl-5 text-[15px] font-normal leading-relaxed text-text-secondary sm:text-[16px]">
                {feat.bullets.map((item) => (
                  <li key={item}>
                    {item.includes(":") ? (
                      <>
                        <strong className="font-semibold text-text-primary">
                          {item.slice(0, item.indexOf(":") + 1)}
                        </strong>
                        {item.slice(item.indexOf(":") + 1)}
                      </>
                    ) : (
                      item
                    )}
                  </li>
                ))}
              </ul>
            ) : null}

            {feat.description ? (
              <p className="font-roboto mt-3 max-w-[900px] text-[15px] font-normal leading-relaxed whitespace-pre-line text-text-secondary sm:text-[16px]">
                {feat.description}
              </p>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}
