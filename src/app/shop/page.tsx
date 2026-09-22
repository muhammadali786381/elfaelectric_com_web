import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/sections/PageHero";
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
    <>
      <Header />
      <main className="flex-1">
        {/* Same hero stack as Newsroom / live shop */}
        <PageHero
          title="Shop"
          breadcrumb="Shop"
          withBikes
          bigTitle
          backgroundSrc="/assets/images/blog-hero-bg.jpg"
          bikesSrc="/assets/images/blog-page.png"
        />
        <ShopCatalog products={SHOP_PRODUCTS} />
      </main>
      <Footer />
    </>
  );
}
