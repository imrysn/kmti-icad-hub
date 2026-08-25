const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

function getAllFiles(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath);
    arrayOfFiles = arrayOfFiles || [];

    files.forEach(function (file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
        } else {
            if (file.endsWith('.ts') || file.endsWith('.tsx')) {
                arrayOfFiles.push(path.join(dirPath, "/", file));
            }
        }
    });
    return arrayOfFiles;
}

const files = getAllFiles(srcDir);

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    // 1. Fix CSS imports
    // Most CSS imports look like: import '../../styles/3D_Modeling/CourseLesson.css';
    // Since we colocated them, they should just be import './CourseLesson.css';
    content = content.replace(/import\s+['"](?:\.\.\/)+styles\/(?:[^'"]+\/)*([^'"]+\.css)['"];?/g, "import './$1';");
    content = content.replace(/import\s+['"](?:\.\/)+styles\/(?:[^'"]+\/)*([^'"]+\.css)['"];?/g, "import './$1';");

    // Fix views import in App.tsx or router
    // import LoginView from './views/LoginView' -> import LoginView from './views/Login/LoginView'
    const topLevelViews = ['Login', 'Landing', 'Registration', 'AccountCenter', 'PasswordReset', 'InvitationAcceptance'];
    topLevelViews.forEach(view => {
        const viewFile = `${view}View`;
        // Match import './views/LoginView' or import from '../views/LoginView'
        // Regex needs to be careful not to match when it's already fixed.
        const regex = new RegExp(`(['"])(\\.\\/views\\/|\\.\\.\\/views\\/)${viewFile}(['"])`, 'g');
        content = content.replace(regex, `$1$2${view}/${viewFile}$3`);
        
        // Also match relative imports if they are in the same directory (which shouldn't happen for views unless router is there)
        const regex2 = new RegExp(`(['"])(\\.\\/)${viewFile}(['"])`, 'g');
        content = content.replace(regex2, `$1$2${view}/${viewFile}$3`);
    });

    // Asset paths: 2D_Image_File -> 2d-images
    content = content.replace(/2D_Image_File/g, '2d-images');
    content = content.replace(/3D_Image_File/g, '3d-images');

    // Fix main.tsx import for index.css (wait, index.css wasn't moved, App.css was)
    if (file.endsWith('main.tsx')) {
        content = content.replace(/import '\.\/index\.css'/, "import './index.css'");
    }

    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated imports in ${path.relative(__dirname, file)}`);
    }
});

console.log("Import fixes complete.");
