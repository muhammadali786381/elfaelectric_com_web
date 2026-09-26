import type { ProductPurchaseFeature } from "@/data/products/purchase-types";

export default function ProductPurchaseFeatures({
  features,
}: {
  features: ProductPurchaseFeature[];
}) {
  return (
    <section className="bg-[#050505] text-white pb-20 lg:pb-32 relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-primary/5 blur-[120px]" />

      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="font-montserrat text-[32px] font-bold text-white sm:text-[42px]">
            Engineered for <span className="text-brand-primary">Excellence</span>
          </h2>
          <p className="font-roboto mt-4 text-[16px] text-white/50">
            Discover the cutting-edge features that set our rides apart.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feat, i) => (
            <div
              key={feat.title}
              className={`group relative overflow-hidden rounded-[32px] border border-white/5 bg-white/[0.02] backdrop-blur-xl p-8 transition-all hover:bg-white/[0.04] hover:border-white/10 ${
                features.length % 3 !== 0 && i === features.length - 1
                  ? "md:col-span-2 lg:col-span-1"
                  : ""
              }`}
            >
              {/* Subtle top-right glow in each card */}
              <div className="absolute -right-20 -top-20 -z-10 h-40 w-40 rounded-full bg-brand-primary/10 blur-[50px] transition-all group-hover:bg-brand-primary/20" />

              <h3 className="font-montserrat text-[22px] font-bold leading-tight text-white sm:text-[24px]">
                {feat.title}
              </h3>

              {feat.bullets?.length ? (
                <ul className="font-roboto mt-6 space-y-4 text-[15px] leading-relaxed text-white/70">
                  {feat.bullets.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-1 flex h-1.5 w-1.5 shrink-0 rounded-full bg-brand-primary" />
                      <span>
                        {item.includes(":") ? (
                          <>
                            <strong className="font-semibold text-white">
                              {item.slice(0, item.indexOf(":") + 1)}
                            </strong>
                            {item.slice(item.indexOf(":") + 1)}
                          </>
                        ) : (
                          item
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : null}

              {feat.description ? (
                <p className="font-roboto mt-6 text-[15px] leading-relaxed whitespace-pre-line text-white/70">
                  {feat.description}
                </p>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
