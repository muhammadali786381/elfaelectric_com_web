"use client";

import { useState } from "react";
import ProductSelectModal from "@/components/ui/ProductSelectModal";

export default function BuyNowTrigger() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button 
        type="button"
        onClick={() => setOpen(true)} 
        className="text-[15px] font-semibold text-brand-primary hover:text-white transition-colors"
      >
        Shop now &gt;
      </button>
      <ProductSelectModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
