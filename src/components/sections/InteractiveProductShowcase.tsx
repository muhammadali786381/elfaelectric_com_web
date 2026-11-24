"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight, ArrowUpRight, Battery, Cog, Gauge, Route } from "lucide-react";
import FlipButton from "@/components/ui/FlipButton";
import { productCardData } from "./ProductShowcase";
import styles from "./InteractiveProductShowcase.module.css";

const products = productCardData.map(product => ({
  ...product,
  description: product.id === "ev125"
    ? "Built for everyday performance, comfort and challenging local roads."
    : "A convenient and comfortable electric ride designed for everyday mobility.",
  purchaseHref: product.id === "ev125" ? "/product/elfaev125" : "/product/ev1-scooty",
  specs: [
    { label: "Battery", value: "72V / 30Ah", icon: "battery" },
    { label: "Top Speed", value: product.id === "ev125" ? "Up to 75 km/h" : "Up to 60 km/h", icon: "speed" },
    { label: "Motor Power", value: product.id === "ev125" ? "3,000W" : "2,000W", icon: "motor" },
    { label: "Range", value: product.id === "ev125" ? "100+ km" : "Up to 80 km", icon: "road" },
  ] as const,
  colors: product.id === "ev125" ? [
    { name: "Black", swatch: "#202222", image: "/assets/images/hero/ELFA EV-125 motorcycle with soft ground shadow-1.png" },
    { name: "Red", swatch: "#c61b23", image: "/assets/images/hero/Metallic red ELFA EV-125 motorcycle.png" },
    { name: "Silver", swatch: "#a6acb1", image: "/assets/images/hero/Silver EV-125 electric bike.png" },
  ] : [
    { name: "White", swatch: "#f3f4f5", image: "/assets/images/hero/whitescootyheromain.png" },
    { name: "Red", swatch: "#c61b23", image: "/assets/images/redscootyheromain.png" },
    { name: "Silver", swatch: "#a6acb1", image: "/assets/images/hero/silverscootyhero.png" },
  ],
}));

const icons = { battery: Battery, speed: Gauge, motor: Cog, road: Route };
const imageSizes = "(min-width: 1280px) 700px, (min-width: 960px) 50vw, 90vw";
const swapDuration = 0.72;
const moveEase = [0.77, 0, 0.175, 1] as const;
const fadeEase = [0.23, 1, 0.32, 1] as const;
type Product = (typeof products)[number];
type Origin = { x: number; y: number; scale: number };
type ProductTextProps = { product: Product; itemVariants: Variants };

function TextReveal({ children, variants }: { children: ReactNode; variants: Variants }) {
  return (
    <div className={styles.revealMask}>
      <motion.div variants={variants} data-product-text-item>{children}</motion.div>
    </div>
  );
}

function ProductDetails({ product, itemVariants }: ProductTextProps) {
  return (
    <>
      <TextReveal variants={itemVariants}>
        <h3 className={styles.name}>
          {product.name.split(/(\d+)/).map((part, index) => index % 2
            ? <span className="text-brand-primary" key={index}>{part}</span>
            : part)}
        </h3>
      </TextReveal>
      <TextReveal variants={itemVariants}><p className={styles.description}>{product.description}</p></TextReveal>
      <dl className={styles.specs}>
        {product.specs.map(spec => {
          const Icon = icons[spec.icon];
          return (
            <div className={styles.revealMask} key={spec.label}>
              <motion.div className={styles.spec} variants={itemVariants} data-product-text-item>
                <Icon size={20} strokeWidth={1.5} aria-hidden="true" />
                <div>
                  <dt>{spec.label}</dt>
                  <dd>{spec.value}</dd>
                </div>
              </motion.div>
            </div>
          );
        })}
      </dl>
    </>
  );
}

function ColorPicker({
  product,
  color,
  onColorChange,
  switching,
}: {
  product: Product;
  color: number;
  onColorChange: (index: number) => void;
  switching: boolean;
}) {
  return (
    <div className={styles.colors}>
      <div className={styles.swatches} role="group" aria-label={`${product.name} color`}>
        {product.colors.map((option, index) => (
          <button
            key={option.name}
            type="button"
            className={styles.swatch}
            aria-label={option.name}
            aria-pressed={color === index}
            disabled={switching}
            onClick={() => onColorChange(index)}
          >
            <span style={{ backgroundColor: option.swatch }} />
          </button>
        ))}
      </div>
    </div>
  );
}

function ProductPricing({ product, itemVariants }: ProductTextProps) {
  return (
    <>
      {product.oldPrice && <TextReveal variants={itemVariants}><del className={styles.oldPrice}>{product.oldPrice}</del></TextReveal>}
      <TextReveal variants={itemVariants}>
        <p className={styles.price}>{product.price}</p>
        <p className={styles.tax}>+ tax</p>
      </TextReveal>
      <motion.div className={styles.actions} variants={itemVariants}>
        <FlipButton href={product.purchaseHref} shape="cut" className={styles.buy}>
          Buy Now
        </FlipButton>
        <Link href={product.exploreHref} className={styles.actionLink}>
          Explore Model <ArrowUpRight size={16} aria-hidden="true" />
        </Link>
        <Link href={product.buyHref} className={styles.actionLink}>
          Book a Test Ride <ArrowUpRight size={16} aria-hidden="true" />
        </Link>
      </motion.div>
    </>
  );
}

export default function InteractiveProductShowcase() {
  const [selected, setSelected] = useState(0);
  const [colors, setColors] = useState<Record<string, number>>({ ev125: 0, ev1: 0 });
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

  const textGroupVariants: Variants = {
    hidden: {},
    visible: { transition: { delayChildren: reducedMotion ? 0 : 0.02, staggerChildren: reducedMotion ? 0 : 0.045 } },
    exit: { transition: { staggerChildren: 0 } },
  };
  const textItemVariants: Variants = {
    hidden: { opacity: 0, transform: reducedMotion ? "none" : "translate3d(0, 100%, 0)" },
    visible: {
      opacity: 1, transform: reducedMotion ? "none" : "translate3d(0, 0%, 0)",
      transition: { duration: reducedMotion ? 0.1 : 0.36, ease: fadeEase },
    },
    exit: {
      opacity: 0, transform: reducedMotion ? "none" : "translate3d(0, -25%, 0)",
      transition: { duration: reducedMotion ? 0.1 : 0.12, ease: fadeEase },
    },
  };

  return (
    <section className={styles.section} aria-labelledby="interactive-products-heading" data-product-showcase>
      <div className={styles.container}>
        <h2 id="interactive-products-heading" className={styles.heading}>
          A Ride That Fits Your Lifestyle
        </h2>
        <div id="interactive-product-display" className={styles.showcase} data-active-product={active.id}>
          <div className={styles.details}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={active.id} variants={textGroupVariants} initial="hidden" animate="visible" exit="exit">
                <ProductDetails product={active} itemVariants={textItemVariants} />
              </motion.div>
            </AnimatePresence>
            <ColorPicker
              product={active}
              color={colors[active.id]}
              switching={switching}
              onColorChange={color => {
                if (!switchingRef.current) setColors(current => ({ ...current, [active.id]: color }));
              }}
            />
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
                    opacity: 0, transform: "translate3d(-28%, -80%, 0) scale(0.32)",
                  }}
                  transition={{ duration: reducedMotion ? 0.15 : swapDuration, ease: moveEase }}
                  onAnimationComplete={finishSwitch}
                >
                  {active.colors.map((color, index) => (
                    <motion.div key={color.name} className={styles.colorImage} initial={false}
                      animate={{ opacity: colors[active.id] === index ? 1 : 0 }}
                      transition={{ duration: reducedMotion ? 0.1 : 0.45, ease: fadeEase }}
                      aria-hidden={colors[active.id] !== index}>
                      <Image src={color.image} alt={`${active.name} in ${color.name}`} fill sizes={imageSizes}
                        loading="eager" className={styles.image} />
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className={styles.pricing}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={active.id} variants={textGroupVariants} initial="hidden" animate="visible" exit="exit">
                <ProductPricing product={active} itemVariants={textItemVariants} />
              </motion.div>
            </AnimatePresence>
            <dl className={styles.warranty}>
              <dt>Warranty</dt>
              <dd>Battery &amp; motor: 3 years or 50,000 km, whichever occurs first.</dd>
              <dd>Controller: 6 months.</dd>
            </dl>
          </div>

          <button type="button" className={styles.preview} onClick={switchProduct}
            aria-label={`Show ${next.name}`} aria-disabled={switching} aria-controls="interactive-product-display">
            <span className={styles.previewImage} ref={previewRef} aria-hidden="true">
              <motion.span key={next.id} className={styles.previewImageInner}
                initial={origin ? { opacity: 0, transform: reducedMotion ? "none" : "translateY(12px)" } : false}
                animate={{ opacity: 1, transform: "translateY(0px)" }}
                transition={{ duration: 0.2, delay: switching && !reducedMotion ? 0.45 : 0, ease: fadeEase }}>
                {next.colors.map((color, index) => (
                  <span key={color.name} className={styles.colorImage} style={{ opacity: colors[next.id] === index ? 1 : 0 }}>
                    <Image src={color.image} alt="" fill sizes={imageSizes} loading="eager" className={styles.image} />
                  </span>
                ))}
              </motion.span>
            </span>
            <span className={styles.previewLabel}>
              <span><span className={styles.switchLabel}>Switch to</span><span className={styles.previewName}>{next.name}</span></span>
              <ArrowRight size={20} strokeWidth={1.5} aria-hidden="true" />
            </span>
          </button>
        </div>
        <p className="sr-only" role="status" aria-live="polite">Showing {active.name} in {active.colors[colors[active.id]].name}.</p>
      </div>
    </section>
  );
}
