import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartPageContent from "@/components/cart/CartPageContent";
import Marquee from "@/components/sections/Marquee";

export const metadata: Metadata = {
  title: "Cart - ELFA Electric",
  description: "Review your ELFA electric bike or scooty cart and proceed to checkout.",
};

export default function CartPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <CartPageContent />
        {/* <Marquee /> */}
      </main>
      <Footer />
    </>
  );
}
