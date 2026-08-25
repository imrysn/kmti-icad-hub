const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');
const topLevelViews = ['Login', 'Landing', 'Registration', 'AccountCenter', 'PasswordReset', 'InvitationAcceptance'];

// Fix relative imports in View files since they moved one level deeper
topLevelViews.forEach(view => {
    const viewFile = path.join(srcDir, 'views', view, `${view}View.tsx`);
    if (fs.existsSync(viewFile)) {
        let content = fs.readFileSync(viewFile, 'utf8');
        let original = content;

        // Change '../' to '../../' for all imports that are outside views, like hooks, services, utils, components, context
        // Wait, any import starting with '../' should become '../../' EXCEPT for sibling files which shouldn't have '../' anyway
        // For example: import { useAuth } from '../hooks/useAuth' -> '../../hooks/useAuth'
        
        content = content.replace(/from\s+['"]\.\.\/hooks/g, "from '../../hooks");
        content = content.replace(/from\s+['"]\.\.\/services/g, "from '../../services");
        content = content.replace(/from\s+['"]\.\.\/utils/g, "from '../../utils");
        content = content.replace(/from\s+['"]\.\.\/components/g, "from '../../components");
        content = content.replace(/from\s+['"]\.\.\/context/g, "from '../../context");
        content = content.replace(/from\s+['"]\.\.\/types/g, "from '../../types");
        
        if (content !== original) {
            fs.writeFileSync(viewFile, content, 'utf8');
            console.log(`Fixed imports in ${viewFile}`);
        }
    }

    const testFile = path.join(srcDir, 'views', view, `${view}View.test.tsx`);
    if (fs.existsSync(testFile)) {
        let content = fs.readFileSync(testFile, 'utf8');
        let original = content;

        // Fix import '../LoginView' -> './LoginView'
        content = content.replace(new RegExp(`from\\s+['"]\\.\\.\\/${view}View['"]`, 'g'), `from './${view}View'`);
        
        // Also fix any other '../' to '../../'
        content = content.replace(/from\s+['"]\.\.\/hooks/g, "from '../../hooks");
        content = content.replace(/from\s+['"]\.\.\/services/g, "from '../../services");
        content = content.replace(/from\s+['"]\.\.\/utils/g, "from '../../utils");
        content = content.replace(/from\s+['"]\.\.\/components/g, "from '../../components");
        content = content.replace(/from\s+['"]\.\.\/context/g, "from '../../context");
        content = content.replace(/from\s+['"]\.\.\/types/g, "from '../../types");

        if (content !== original) {
            fs.writeFileSync(testFile, content, 'utf8');
            console.log(`Fixed imports in ${testFile}`);
        }
    }
});
