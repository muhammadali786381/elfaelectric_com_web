import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductPage from "@/components/product/ProductPage";
import { scootyEv1 } from "@/data/products/scooty-ev-1";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: scootyEv1.metaTitle,
  description: scootyEv1.metaDescription,
};

export default function ScootyEv1Page() {
  return (
    <>
      <Header />
      <ProductPage product={scootyEv1} />
      <Footer />
    </>
  );
}
