const fs = require('fs');
let code = fs.readFileSync('src/components/sections/hero/index.tsx', 'utf8');

code = code.replace(
  'import { motion } from "framer-motion";',
  'import { motion, useScroll, useTransform } from "framer-motion";'
);

code = code.replace(
  'const ease = [0.16, 1, 0.3, 1] as const;',
  `const ease = [0.16, 1, 0.3, 1] as const;
  
  const { scrollY } = useScroll();
  const scale = useTransform(scrollY, [0, 800], [1, 0.95]);
  const opacity = useTransform(scrollY, [0, 800], [1, 0.4]);`
);

code = code.replace(
  '<section className="relative flex min-h-[100dvh] w-full flex-col overflow-hidden bg-[#050505] pt-20 lg:flex-row lg:items-center lg:pt-0">',
  `<section className="sticky top-0 -z-10 flex h-[100dvh] w-full flex-col overflow-hidden bg-[#050505]">
    <motion.div style={{ scale, opacity }} className="relative flex h-full w-full flex-col pt-20 lg:flex-row lg:items-center lg:pt-0 transform-origin-top">`
);

// We need to add the closing </motion.div> right before </section>
const sectionEnd = code.lastIndexOf('</section>');
code = code.substring(0, sectionEnd) + '    </motion.div>\n  ' + code.substring(sectionEnd);

fs.writeFileSync('src/components/sections/hero/index.tsx', code);
