import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScootyPage from "@/components/scooty/ScootyPage";
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
      <ScootyPage product={scootyEv1} />
      <Footer />
    </>
  );
}

