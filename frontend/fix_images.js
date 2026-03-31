const fs = require('fs');
const path = require('path');

const compDir = path.resolve('d:/kmti-icad-hub/kmti-icad-hub/frontend/src/components/3D_Modeling');
const assetsDir = path.resolve('d:/kmti-icad-hub/kmti-icad-hub/frontend/src/assets/3D_Image_File');

const validFiles = fs.readdirSync(assetsDir);
const validBases = {};
validFiles.forEach(f => {
  const parsed = path.parse(f);
  // Remove special characters like '_' and ' ' for fuzzy matching
  const normalized = parsed.name.toLowerCase().replace(/[^a-z0-9]/g, '');
  validBases[normalized] = f;
  validBases[f.toLowerCase()] = f;
  validBases[parsed.name.toLowerCase()] = f;
});

let fixedCount = 0;

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      walk(filePath);
    } else if (filePath.endsWith('.tsx')) {
      let content = fs.readFileSync(filePath, 'utf-8');
      
      const pattern = /(import\s+.*?from\s+['"].*?assets\/3D_Image_File\/)([^'"]+)(['"])/g;
      
      const newContent = content.replace(pattern, (match, prefix, imgName, suffix) => {
        if (validFiles.includes(imgName)) {
          return match;
        }
        
        const parsed = path.parse(imgName);
        const baseLower = parsed.name.toLowerCase();
        const normalized = baseLower.replace(/[^a-z0-9]/g, '');
        
        if (validBases[baseLower]) {
          fixedCount++;
          console.log(`[FIXED] ${imgName} -> ${validBases[baseLower]} in ${file}`);
          return prefix + validBases[baseLower] + suffix;
        } else if (validBases[normalized]) {
          fixedCount++;
          console.log(`[FUZZY FIXED] ${imgName} -> ${validBases[normalized]} in ${file}`);
          return prefix + validBases[normalized] + suffix;
        }
        
        console.log(`[MISSING] Could not find match for: ${imgName} in ${file}`);
        return match;
      });
      
      if (newContent !== content) {
        fs.writeFileSync(filePath, newContent, 'utf-8');
      }
    }
  }
}

walk(compDir);
console.log(`\nSuccess! Fixed ${fixedCount} incorrect image extensions and mismatches!`);
