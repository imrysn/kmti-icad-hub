const fs = require('fs');
const path = require('path');

const COMPONENT_DIRS = [
  'g:/kmti-icad-hub/kmti-icad-hub/frontend/src/components/2D_Drawing',
  'g:/kmti-icad-hub/kmti-icad-hub/frontend/src/components/3D_Modeling'
];

function recoverFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // 1. Critical: Convert // comments to /* */ block comments
  // In the squashed code, // will comment out everything until a literal \n.
  // We want to find // and the text following it, but stop before keywords.
  const keywords = ['import ', 'interface ', 'const ', 'export ', 'return ', 'if ', 'useEffect', 'useState', 'ref=', 'className=', '<div', '</div', '<section', '</section', '<h3', '</h3', '<p', '</p', '<img', 'onClick=', '};', '})', ' {', ' )'];
  
  // Try to find // followed by text, then a keyword.
  // Regex: // (anything not a keyword) (keyword)
  // This is hard with pure regex. 
  
  // Alternative: split by \n (from previous recovery) and then check each line.
  let lines = content.split('\n');
  let newLines = lines.map(line => {
    if (line.includes('//')) {
        let parts = line.split('//');
        // parts[0] is code before //
        // parts[1] is the comment text possibly merged with code
        let commentBody = parts[1];
        let foundKeyword = false;
        
        // Check if a keyword is submerged in the commentBody
        for (let kw of keywords) {
            if (commentBody.includes(kw)) {
                let kwIndex = commentBody.indexOf(kw);
                let actualComment = commentBody.substring(0, kwIndex);
                let followUpCode = commentBody.substring(kwIndex);
                return `${parts[0]} /* ${actualComment.trim()} */ ${followUpCode}`;
            }
        }
        // If no keyword found, just wrap the whole thing to be safe
        return `${parts[0]} /* ${commentBody.trim()} */`;
    }
    return line;
  });

  content = newLines.join('\n');

  // 2. Re-insert newlines more aggressively for clarity
  keywords.forEach(kw => {
    content = content.split(kw).join(`\n${kw}`);
  });

  fs.writeFileSync(filePath, content, 'utf8');
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (file.endsWith('.tsx')) {
      recoverFile(fullPath);
    }
  });
}

COMPONENT_DIRS.forEach(dir => {
  if (fs.existsSync(dir)) walkDir(dir);
});
console.log('Robust Recovery Complete.');
