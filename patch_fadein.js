const fs = require('fs');
let code = fs.readFileSync('src/components/motion/FadeIn.tsx', 'utf8');

code = code.replace(
  'export const ease = [0.25, 0.1, 0.25, 1] as const;',
  'export const ease = [0.16, 1, 0.3, 1] as const;'
);

code = code.replace(
  'fadeInLeft: { initial: { opacity: 0, x: -96 }, animate: { opacity: 1, x: 0 } },',
  'fadeInLeft: { initial: { opacity: 0, x: -40 }, animate: { opacity: 1, x: 0 } },'
);
code = code.replace(
  'fadeInRight: { initial: { opacity: 0, x: 96 }, animate: { opacity: 1, x: 0 } },',
  'fadeInRight: { initial: { opacity: 0, x: 40 }, animate: { opacity: 1, x: 0 } },'
);
code = code.replace(
  'fadeInUp: { initial: { opacity: 0, y: 72 }, animate: { opacity: 1, y: 0 } },',
  'fadeInUp: { initial: { opacity: 0, y: 40 }, animate: { opacity: 1, y: 0 } },'
);

fs.writeFileSync('src/components/motion/FadeIn.tsx', code);
