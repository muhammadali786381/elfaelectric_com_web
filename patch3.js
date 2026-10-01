const fs = require("fs");
const path = "src/components/product/ProductAdvancedFeatures.tsx";
let code = fs.readFileSync(path, "utf8");

// We want to remove the special case for "Mobile App"
const startStr = '            if (feat.title === "Mobile App") {';
const endStr = '            return (\n              <motion.div\n                key={feat.title}\n                initial={{ opacity: 0, y: 40 }}';

const startIndex = code.indexOf(startStr);
const endIndex = code.indexOf(endStr);

if (startIndex !== -1 && endIndex !== -1) {
  code = code.slice(0, startIndex) + code.slice(endIndex);
  fs.writeFileSync(path, code);
  console.log("Patched successfully");
} else {
  console.log("Could not find start or end string");
}
