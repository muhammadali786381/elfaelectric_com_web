import type { Metadata } from "next";
import CheckoutPageContent from "@/components/checkout/CheckoutPageContent";

export const metadata: Metadata = {
  title: "Checkout - ELFA Electric",
  description: "Complete your ELFA electric bike or scooty purchase securely.",
};

export default function CheckoutPage() {
  return (
    <main className="flex-1 bg-[#050505]">
      <CheckoutPageContent />
    </main>
  );
}
