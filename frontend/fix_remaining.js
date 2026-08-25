const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

function fixFile(file, replacers) {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        let original = content;
        replacers.forEach(r => content = content.replace(r.search, r.replace));
        if (content !== original) {
            fs.writeFileSync(file, content, 'utf8');
            console.log(`Fixed ${path.basename(file)}`);
        }
    }
}

// 1. PasswordResetView.tsx
fixFile(
    path.join(srcDir, 'views', 'PasswordReset', 'PasswordResetView.tsx'),
    [
        { search: /import ["']\.\/RegistrationView\.css["'];?/, replace: "import '../Registration/RegistrationView.css';" }
    ]
);

// 2. PracticalAssessment.tsx
// wait, the error was: Could not resolve './CourseLesson.css' in src/views/mentor/components/PracticalAssessment.tsx
// I should see what the actual import should be. Let's just fix anything with `import './CourseLesson.css'` in mentor components to point to the correct one if it exists, or just `import '../../../components/2D_Drawing/CourseLesson.css'`? Actually, I don't know if it's 2D or 3D. I'll just change it to `../../../components/2D_Drawing/CourseLesson.css` or I'll change it back to the exact relative path if I can find it. Wait, I'll search for it first, or just `import '../../../components/2D_Drawing/CourseLesson.css'`. Let's replace `./CourseLesson.css` with `../../../components/2D_Drawing/CourseLesson.css` (or whichever it is). Let's use `../../../components/3D_Modeling/CourseLesson.css` and if there's an issue we'll fix it. Actually, wait. I will just replace `../assets` with `../../assets` in all view files since they moved deeper.

const topLevelViews = ['Login', 'Landing', 'Registration', 'AccountCenter', 'PasswordReset', 'InvitationAcceptance'];
topLevelViews.forEach(view => {
    fixFile(
        path.join(srcDir, 'views', view, `${view}View.tsx`),
        [
            { search: /from\s+["']\.\.\/assets/g, replace: "from '../../assets" },
            { search: /from\s+["']\.\.\/config/g, replace: "from '../../config" },
            { search: /import\s+([A-Za-z0-9]+)\s+from\s+["']\.\.\/assets/g, replace: "import $1 from '../../assets" }
        ]
    );
});

// For PracticalAssessment, let's fix the CourseLesson.css import
fixFile(
    path.join(srcDir, 'views', 'mentor', 'components', 'PracticalAssessment.tsx'),
    [
        { search: /import ["']\.\/CourseLesson\.css["'];?/, replace: "import '../../../components/3D_Modeling/CourseLesson.css';" }
    ]
);
