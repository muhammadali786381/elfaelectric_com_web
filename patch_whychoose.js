const fs = require('fs');
let code = fs.readFileSync('src/components/sections/WhyChooseUs.tsx', 'utf8');

code = code.replace(
  'import { FadeIn } from "@/components/motion/FadeIn";',
  `import { FadeIn } from "@/components/motion/FadeIn";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";`
);

code = code.replace(
  'export default function WhyChooseUs() {',
  `export default function WhyChooseUs() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);`
);

code = code.replace(
  '<section className="relative overflow-hidden bg-bg-primary py-16 lg:py-24">',
  '<section ref={containerRef} className="relative z-10 overflow-hidden bg-bg-primary py-16 lg:py-24">'
);

code = code.replace(
  '<div className="absolute inset-0 z-0">',
  '<motion.div style={{ y }} className="absolute inset-0 z-0 h-[130%] -top-[15%]">'
);

code = code.replace(
  '</div>\n\n      {/* Content overlaid on top */}',
  '</motion.div>\n\n      {/* Content overlaid on top */}'
);

fs.writeFileSync('src/components/sections/WhyChooseUs.tsx', code);
