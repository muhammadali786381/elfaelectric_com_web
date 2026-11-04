import CartShell from "@/components/cart/CartShell";
import Click2Connect from "@/components/layout/Click2Connect";
import OriginalHeader from "@/components/layout/Header";
import HeaderTransparent from "@/components/layout/HeaderTransparent";
import Footer from "@/components/layout/Footer";
import SmoothFollower from "@/components/ui/SmoothFollower";

// Set to "original" to restore the liquid glass header.
const headerVariant: "original" | "transparent" = "transparent";
const Header = { original: OriginalHeader, transparent: HeaderTransparent }[headerVariant];

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartShell>
      <SmoothFollower />
      <Header />
      {children}
      <Footer />
      <Click2Connect />
    </CartShell>
  );
}
