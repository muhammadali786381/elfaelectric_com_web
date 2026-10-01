const fs = require('fs');
let code = fs.readFileSync('src/components/sections/ProductShowcase.tsx', 'utf8');

code = code.replace(
  '<section className="bg-bg-primary py-16 lg:py-20">',
  '<section className="relative z-20 bg-transparent -mt-16 pt-16 pb-16 lg:-mt-24 lg:pt-24 lg:pb-20">'
);

// We want to make sure the background gradient isn't just solid, or we let the cards float.
// Wait, if ProductShowcase is bg-transparent, the cards will float over the WhyChooseUs radial edge! That's EXACTLY what Visual Bleed means.

fs.writeFileSync('src/components/sections/ProductShowcase.tsx', code);
