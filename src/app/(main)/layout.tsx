import CartShell from "@/components/cart/CartShell";
import Click2Connect from "@/components/layout/Click2Connect";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SmoothFollower from "@/components/ui/SmoothFollower";

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
