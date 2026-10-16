"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Battery, Cog, Gauge, Route } from "lucide-react";
import FlipButton from "@/components/ui/FlipButton";
import { productCardData } from "./ProductShowcase";
import styles from "./InteractiveProductShowcase.module.css";

const products = productCardData.map(product => ({
  ...product,
  image: product.id === "ev125"
    ? "/assets/images/hero/ELFA EV-125 motorcycle with soft ground shadow-1.png"
    : "/assets/images/hero/White ELFA EV-1 Side Profile-2.png",
}));

const icons = { battery: Battery, speed: Gauge, motor: Cog, road: Route };
const imageSizes = "(min-width: 1280px) 700px, (min-width: 960px) 50vw, 90vw";
const swapDuration = 0.72;
const moveEase = [0.77, 0, 0.175, 1] as const;
const fadeEase = [0.23, 1, 0.32, 1] as const;
type Product = (typeof products)[number];
type Origin = { x: number; y: number; scale: number };

function ProductDetails({ product }: { product: Product }) {
  return (
    <>
      <h3 className={styles.name}>{product.name}</h3>
      <p className={styles.category}>{product.type}</p>
      <dl className={styles.specs}>
        {product.specs.map(spec => {
          const Icon = icons[spec.icon];
          return (
            <div className={styles.spec} key={spec.label}>
              <Icon size={20} strokeWidth={1.5} aria-hidden="true" />
              <div>
                <dt>{spec.label}</dt>
                <dd>{spec.value}</dd>
              </div>
            </div>
          );
        })}
      </dl>
    </>
  );
}

function ProductPricing({ product }: { product: Product }) {
  return (
    <>
      {product.oldPrice && <del className={styles.oldPrice}>{product.oldPrice}</del>}
      <p className={styles.price}>{product.price}</p>
      <p className={styles.tax}>+ tax</p>
      <p className={styles.savings}>{product.savings}</p>
      <div className={styles.actions}>
        <FlipButton href={product.exploreHref} shape="cut" className={styles.explore}>
          Explore model
        </FlipButton>
        <Link href={product.buyHref} className={styles.testRide}>
          Book a test ride <ArrowUpRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </>
  );
}

export default function InteractiveProductShowcase() {
  const [selected, setSelected] = useState(0);
  const [origin, setOrigin] = useState<Origin | null>(null);
  const [switching, setSwitching] = useState(false);
  const switchingRef = useRef(false);
  const mainRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLSpanElement>(null);
  const reducedMotion = useReducedMotion();
  const active = products[selected];
  const next = products[(selected + 1) % products.length];

  const finishSwitch = () => {
    switchingRef.current = false;
    setSwitching(false);
  };

  useEffect(() => {
    if (!switching) return;
    // Release the switch even if an animation is interrupted or the tab sleeps.
    const fallback = window.setTimeout(() => {
      switchingRef.current = false;
      setSwitching(false);
    }, 1100);
    return () => window.clearTimeout(fallback);
  }, [switching]);

  const switchProduct = () => {
    if (switchingRef.current) return;
    const main = mainRef.current?.getBoundingClientRect();
    const preview = previewRef.current?.getBoundingClientRect();
    setOrigin(main && preview ? {
      x: preview.left + preview.width / 2 - (main.left + main.width / 2),
      y: preview.top + preview.height / 2 - (main.top + main.height / 2),
      scale: preview.width / main.width,
    } : null);
    switchingRef.current = true;
    setSwitching(true);
    setSelected(index => (index + 1) % products.length);
  };

  const infoMotion = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: reducedMotion ? 0.1 : 0.18, ease: fadeEase },
  };

  return (
    <section className={styles.section} aria-labelledby="interactive-products-heading" data-product-showcase>
      <div className={styles.container}>
        <h2 id="interactive-products-heading" className="section-heading text-center">
          Our Products
        </h2>
        <div id="interactive-product-display" className={styles.showcase} data-active-product={active.id}>
          <div className={styles.details}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={active.id} {...infoMotion}>
                <ProductDetails product={active} />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className={styles.visual}>
            <div className={styles.imageSlot} ref={mainRef}>
              <AnimatePresence initial={false}>
                <motion.div
                  className={styles.productImage}
                  key={active.id}
                  initial={reducedMotion || !origin ? { opacity: 0 } : {
                    opacity: 1,
                    transform: `translate3d(${origin.x}px, ${origin.y}px, 0) scale(${origin.scale})`,
                  }}
                  animate={{ opacity: 1, transform: "translate3d(0px, 0px, 0) scale(1)" }}
                  exit={reducedMotion ? { opacity: 0 } : {
                    opacity: 0, transform: "translate3d(0px, -85%, 0) scale(0.9)",
                  }}
                  transition={{ duration: reducedMotion ? 0.15 : swapDuration, ease: moveEase }}
                  onAnimationComplete={finishSwitch}
                >
                  <Image src={active.image} alt={active.name} fill sizes={imageSizes} className={styles.image} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className={styles.pricing}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={active.id} {...infoMotion}>
                <ProductPricing product={active} />
              </motion.div>
            </AnimatePresence>
          </div>

          <button type="button" className={styles.preview} onClick={switchProduct}
            aria-label={`Show ${next.name}`} aria-disabled={switching} aria-controls="interactive-product-display">
            <span className={styles.previewImage} ref={previewRef} aria-hidden="true">
              <motion.span key={next.id} className={styles.previewImageInner}
                initial={origin ? { opacity: 0, transform: reducedMotion ? "none" : "translateY(12px)" } : false}
                animate={{ opacity: 1, transform: "translateY(0px)" }}
                transition={{ duration: 0.2, delay: switching && !reducedMotion ? 0.45 : 0, ease: fadeEase }}>
                <Image src={next.image} alt="" fill sizes={imageSizes} className={styles.image} />
              </motion.span>
            </span>
            <span className={styles.previewLabel}>
              <span><span className={styles.switchLabel}>Switch to</span><span className={styles.previewName}>{next.name}</span></span>
              <ArrowRight size={20} strokeWidth={1.5} aria-hidden="true" />
            </span>
          </button>
        </div>
        <p className="sr-only" role="status" aria-live="polite">Showing {active.name}.</p>
      </div>
    </section>
  );
}
