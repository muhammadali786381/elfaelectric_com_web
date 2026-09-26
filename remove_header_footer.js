const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

let modified = 0;

walkDir('/mnt/Maindata/Elfanextjs/src/app', function(filePath) {
  if (filePath.endsWith('page.tsx')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // Remove imports
    content = content.replace(/import\s+Header\s+from\s+["']@\/components\/layout\/Header["'];?\n?/g, '');
    content = content.replace(/import\s+Footer\s+from\s+["']@\/components\/layout\/Footer["'];?\n?/g, '');

    // Remove <Header /> and <Footer /> components
    content = content.replace(/<Header\s*\/>\n?/g, '');
    content = content.replace(/<Footer\s*\/>\n?/g, '');

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      modified++;
      console.log(`Updated ${filePath}`);
    }
  }
});

console.log(`Total files modified: ${modified}`);
