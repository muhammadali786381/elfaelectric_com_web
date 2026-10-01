import type { Metadata } from "next";
import CartPageContent from "@/components/cart/CartPageContent";
import SecondaryHero from "@/components/sections/SecondaryHero";

export const metadata: Metadata = {
  title: "Cart - ELFA Electric",
  description: "Review your ELFA electric bike or scooty cart and proceed to checkout.",
};

export default function CartPage() {
  return (
    <main className="flex-1 bg-[#050505]  ">
      <CartPageContent />
    </main>
  );
}
