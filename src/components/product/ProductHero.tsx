"use client";

import Image from "next/image";
import { Calendar } from "lucide-react";
import type { Product } from "@/data/products/types";
import FlipButton from "@/components/ui/FlipButton";
import styles from "./ProductHero.module.css";

export default function ProductHero({ product }: { product: Product }) {
  const model = product.title.replace(/\s+(bike|scooty)$/i, "");

  return (
    <section className={styles.hero} aria-label={`${model} overview`}>
      <div className={styles.inner}>
        <div className={styles.stage}>
          <span className={styles.backdropTitle} aria-hidden="true">{model}</span>
          <div className={styles.vehicle}>
            <Image
              src={product.heroImage}
              alt={product.name}
              fill
              priority
              className="object-contain object-bottom"
              sizes="(max-width: 767px) 94vw, (max-width: 1599px) 68vw, 1176px"
            />
          </div>
        </div>

        <div className={styles.details}>
          <div className={styles.intro}>
            <h1 className={styles.title}>{model}</h1>
            <p className={styles.subtitle}>{product.subtitle}</p>
          </div>
          <div className={styles.actions}>
            {product.offerBadge && <p className={styles.offer}>{product.offerBadge}</p>}
            <div className={styles.buttons}>
              <FlipButton
                shape="cut"
                href={product.buyHref}
                variant="primary"
                className="h-12 rounded-none px-7 text-xs focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-primary"
              >
                Buy Now
              </FlipButton>
              <FlipButton
                shape="cut"
                href={product.bookHref}
                variant="outline"
                icon={<Calendar className="h-3.5 w-3.5" strokeWidth={2} />}
                className="h-12 rounded-none px-6 text-xs hover:border-brand-primary hover:bg-brand-primary hover:text-bg-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-primary"
              >
                Book a Test Ride
              </FlipButton>
            </div>
          </div>
        </div>

        <div className={styles.specs}>
          <div className={styles.price}>
            <span className={styles.label}>Price</span>
            <div className={styles.priceValues}>
              <span className={styles.currentPrice}>{product.priceCurrent}</span>
              {product.priceOriginal && <s>{product.priceOriginal}</s>}
            </div>
          </div>
          {product.heroSpecs.map((spec) => (
            <div key={spec.label} className={styles.spec}>
              <Image src={spec.icon} alt="" width={32} height={32} className="h-8 w-8 shrink-0 object-contain opacity-75" />
              <div>
                <p className={styles.label}>{spec.label}</p>
                <p className={styles.value}>{spec.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
