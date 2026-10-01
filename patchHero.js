const fs = require("fs");
const path = "src/components/sections/hero/index.tsx";
let code = fs.readFileSync(path, "utf8");

// Remove useScroll, useTransform
code = code.replace(/import \{ motion, useScroll, useTransform \} from "framer-motion";/, 'import { motion } from "framer-motion";');

// Remove hooks
const hookRegex = /const \{ scrollY \} = useScroll\(\);\s*const scale = useTransform\(scrollY, \[0, 800\], \[1, 0\.95\]\);\s*const opacity = useTransform\(scrollY, \[0, 800\], \[1, 0\.4\]\);/;
code = code.replace(hookRegex, '');

// Fix section class
code = code.replace(/<section className="sticky top-0 -z-10 flex h-\[100dvh\] w-full flex-col overflow-hidden bg-\[\#050505\]">/, '<section className="relative flex min-h-[100dvh] w-full flex-col overflow-hidden bg-[#050505] pt-20 lg:flex-row lg:items-center lg:pt-0">');

// Fix motion.div
code = code.replace(/<motion\.div style=\{\{ scale, opacity \}\} className="relative flex h-full w-full flex-col pt-20 lg:flex-row lg:items-center lg:pt-0 transform-origin-top">/, '<div>');

// Notice that the replacement of <section className="..."> changed the structure to match what I think is a non-parallax version. Let's do it cleaner.
