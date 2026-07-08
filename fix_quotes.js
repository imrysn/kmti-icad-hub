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
            
            // Fix mismatched quotes
            // e.g., "../../../../services/api' -> '../../../../services/api'
            // or "../../../services/api' -> '../../../services/api'
            content = content.replace(/"(\.\.\/)+([^"'\n]+)'/g, "''");
            
            if (content !== original) {
                fs.writeFileSync(fullPath, content, 'utf8');
            }
        }
    });
}

walkDir('i:/KMTI_MG_APP_DEVELOPMENT/kmti-icad-hub/frontend/src/components/ICAD/Manual');
