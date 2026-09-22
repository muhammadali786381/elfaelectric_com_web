import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductPage from "@/components/product/ProductPage";
import { ev125 } from "@/data/products/ev-125";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: ev125.metaTitle,
  description: ev125.metaDescription,
};

export default function Ev125Page() {
  return (
    <>
      <Header />
      <ProductPage product={ev125} />
      <Footer />
    </>
  );
}
