"use client";

import FloatingActions from "@/components/layout/FloatingActions";
import CartDrawer from "@/components/cart/CartDrawer";
import CartFlyAnimation from "@/components/cart/CartFlyAnimation";
import { CartProvider } from "@/components/cart/CartContext";
import SmoothFollower from "@/components/ui/SmoothFollower";

/** Client shell so cart state is available site-wide. */
export default function CartShell({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      {children}
      <FloatingActions />
      <CartDrawer />
      <CartFlyAnimation />
      <SmoothFollower />
    </CartProvider>
  );
}
