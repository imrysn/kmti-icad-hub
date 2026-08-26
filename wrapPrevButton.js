const fs = require('fs');
const path = require('path');

const dirsToSearch = [
  'frontend/src/components/3D_Modeling',
  'frontend/src/components/2D_Drawing',
  'frontend/src/components/InteractiveVideoLesson'
];

dirsToSearch.forEach(dir => {
  const fullDirPath = path.join(__dirname, dir);
  if (!fs.existsSync(fullDirPath)) return;
  const files = fs.readdirSync(fullDirPath);
  
  files.forEach(file => {
    if (file.endsWith('.tsx')) {
      const filePath = path.join(fullDirPath, file);
      let content = fs.readFileSync(filePath, 'utf-8');
      let changed = false;

      // Regex matches any button with className="nav-button" that calls handlePrev
      // or similar, but ONLY if it's not already wrapped.
      // Easiest is to replace ALL `<button className="nav-button" onClick={handlePrev}>` 
      // but wait, some are `onClick={() => handlePrev()}` or `onClick={() => { if (onPrevLesson) ... }}`
      
      const lines = content.split('\n');
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes('className="nav-button"') && lines[i].includes('onClick') && lines[i].includes('ChevronLeft')) {
          // Check if previous line or current line already has onPrevLesson &&
          if (!lines[i].includes('onPrevLesson &&') && (i === 0 || !lines[i-1].includes('onPrevLesson &&'))) {
            // Found an unprotected Previous button
            lines[i] = lines[i].replace(/(<button.*?className="nav-button".*?onClick=\{.*?\}.*?<\/button>)/g, "{onPrevLesson && (\n  $1\n)}");
            changed = true;
          }
        }
      }

      if (changed) {
        fs.writeFileSync(filePath, lines.join('\n'));
        console.log(`Refactored Previous button in ${file}`);
      }
    }
  });
});
