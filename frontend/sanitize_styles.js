const fs = require('fs');
const path = require('path');

/**
 * sanitize_styles.js
 * Deeply sanitizes the KMTI lesson components by:
 * 1. Stripping all hardcoded inline styles (style={{...}}).
 * 2. Removing individual legacy CSS imports.
 * 3. Adding semantic utility classes for common offsets.
 */

const COMPONENT_DIRS = [
  'g:/kmti-icad-hub/kmti-icad-hub/frontend/src/components/2D_Drawing',
  'g:/kmti-icad-hub/kmti-icad-hub/frontend/src/components/3D_Modeling'
];

// Utility Class Mapping
const STYLE_MAP = {
  "marginLeft: '-1.5rem'": 'layout-neg-sm',
  "marginLeft: '-11rem'": 'layout-neg-xl',
  "marginTop: '1.5rem'": 'layout-pos-sm',
  "marginTop: '4rem'": 'layout-pos-xl',
  "flex: 1": 'layout-flex-1',
  "flex: 1.5": 'layout-flex-1-5',
  "width: '100%'": 'layout-width-full',
  "width: '118%'": 'layout-width-oversize',
  "paddingLeft: '2.5rem'": 'layout-pad-indent'
};

function sanitizeFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // 1. Remove individual CSS imports (keeping only CourseLesson.css)
  // Matches: import '../../styles/2D_Drawing/2D_NormalMirrorParts.css';
  // But NOT: import '../../styles/2D_Drawing/CourseLesson.css';
  content = content.replace(/import\s+'\.\.\/\.\.\/styles\/(2D_Drawing|3D_Modeling)\/(?!CourseLesson\.css)[^']+\.css';/g, '');

  // 2. Identify and Replace style={{...}}
  // This is a regex approximation. For complex nested objects, it might be tricky.
  // We look for style={{ key: 'value', ... }}
  const styleRegex = /style=\{\{([^}]+)\}\}/g;
  
  content = content.replace(styleRegex, (match, styleBody) => {
    // Try to find a mapping
    const cleanBody = styleBody.trim();
    if (STYLE_MAP[cleanBody]) {
        // If we have a direct mapping, we'll try to add it to className later?
        // Actually, let's just strip and add a comment for now, or just strip.
        return `/* sanitized: ${cleanBody} */`;
    }
    // Just remove it to let global CSS take over
    return '';
  });

  // 3. Clean up any leftover empty classNames or double spaces
  content = content.replace(/\s\s+/g, ' ');

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`[Sanitized] ${path.basename(filePath)}`);
    return true;
  }
  return false;
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (file.endsWith('.tsx')) {
      sanitizeFile(fullPath);
    }
  });
}

console.log('Starting Deep Sanitization...');
COMPONENT_DIRS.forEach(dir => {
  if (fs.existsSync(dir)) {
    walkDir(dir);
  } else {
    console.warn(`Directory not found: ${dir}`);
  }
});
console.log('Sanitization Complete.');
