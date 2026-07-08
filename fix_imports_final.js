const fs = require('fs');
const path = require('path');

function walkDir(dir) {
    fs.readdirSync(dir).forEach(file => {
        let fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walkDir(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts') || fullPath.endsWith('.css')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let original = content;
            
            content = content.replace(/(import|from)\s+(["'])\.\.\/\.\.\//g, "$1 $2../../../../");
            content = content.replace(/url\((["']?)\.\.\/\.\.\//g, "url($1../../../../");

            content = content.replace(/(import|from)\s+(["'])\.\.\/(?!\.\.\/)/g, "$1 $2../../../");
            content = content.replace(/url\((["']?)\.\.\/(?!\.\.\/)/g, "url($1../../../");
            
            if (content !== original) {
                fs.writeFileSync(fullPath, content, 'utf8');
            }
        }
    });
}

walkDir('i:/KMTI_MG_APP_DEVELOPMENT/kmti-icad-hub/frontend/src/components/ICAD/Manual');
