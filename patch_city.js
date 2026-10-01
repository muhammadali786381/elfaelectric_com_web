const fs = require('fs');
let code = fs.readFileSync('src/components/sections/CityMarquee.tsx', 'utf8');

code = code.replace(
  '<section className="relative z-10 overflow-hidden bg-bg-primary py-8 lg:py-12">',
  `<section className="relative z-10 overflow-hidden bg-bg-primary py-8 lg:py-12 shadow-[0_-30px_60px_rgba(0,0,0,0.9)]">`
);

fs.writeFileSync('src/components/sections/CityMarquee.tsx', code);

let aboutCode = fs.readFileSync('src/components/sections/AboutUs.tsx', 'utf8');
aboutCode = aboutCode.replace(
  '<section className="relative z-10 bg-bg-primary py-16 lg:py-24 shadow-[0_-20px_50px_rgba(0,0,0,0.8)]">',
  '<section className="relative z-10 bg-bg-primary py-16 lg:py-24">'
);
fs.writeFileSync('src/components/sections/AboutUs.tsx', aboutCode);

