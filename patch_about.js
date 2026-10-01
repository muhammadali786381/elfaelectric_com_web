const fs = require('fs');
let code = fs.readFileSync('src/components/sections/AboutUs.tsx', 'utf8');

code = code.replace(
  '<section className="relative z-10 bg-bg-primary py-16 lg:py-24">',
  `<section className="relative z-10 bg-bg-primary py-16 lg:py-24 shadow-[0_-20px_50px_rgba(0,0,0,0.8)]">`
);

fs.writeFileSync('src/components/sections/AboutUs.tsx', code);
