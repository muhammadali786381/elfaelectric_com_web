import type { Metadata } from "next";
import SecondaryHero from "@/components/sections/SecondaryHero";
import ShopCatalog from "@/components/shop/ShopCatalog";
import { purchaseEv125 } from "@/data/products/purchase-ev125";
import { purchaseEv1 } from "@/data/products/purchase-ev1";

export const metadata: Metadata = {
  title: "Shop Electric Bikes & Scooties | ELFA Electric",
  description:
    "Shop ELFA EV-125 electric bike and EV 1 Scooty. Choose color options and add to cart.",
};

const SHOP_PRODUCTS = [
  {
    product: purchaseEv125,
    /** Live shop loop thumb: https://elfaelectric.com/wp-content/uploads/2025/08/13d.png */
    catalogImage: "/assets/images/shop/ev-125-catalog.png",
    href: "/product/elfaev125",
  },
  {
    product: purchaseEv1,
    /** Live shop loop thumb (faces left): https://elfaelectric.com/wp-content/uploads/2025/09/sdvh-1.png */
    catalogImage: "/assets/images/shop/ev1-scooty-catalog.png",
    href: "/product/ev1-scooty",
  },
];

export default function ShopPage() {
  return (
    <main className="flex-1 bg-[#050505]">
      <SecondaryHero
        titleLine1="Our"
        titleLine2="Shop"
        description="Choose your perfect ELFA electric bike or scooty and step into the future of mobility."
        imageSrc="/assets/images/hero4.jpeg"
        imageAlt="Shop ELFA Electric"
      />
      <ShopCatalog products={SHOP_PRODUCTS} />
    </main>
  );
}
