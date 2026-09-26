import type { Metadata } from "next";
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
            <ProductPage product={ev125} />
          </>
  );
}
