import type { Metadata } from "next";
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
            <ScootyPage product={scootyEv1} />
          </>
  );
}

