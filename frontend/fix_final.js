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

fixFile(
    path.join(srcDir, 'components', 'PublicCourses', 'Foundations', 'DynamicFoundationsLesson.tsx'),
    [
        { search: /import ["']\.\/CourseLesson\.css["'];?/, replace: "import '../../2D_Drawing/CourseLesson.css';" },
        { search: /import ["']\.\.\/\.\.\/styles\/2D_Drawing\/CourseLesson\.css["'];?/, replace: "import '../../2D_Drawing/CourseLesson.css';" }
    ]
);

fixFile(
    path.join(srcDir, 'components', '3D_Modeling', '3D_iCadInterface.tsx'),
    [
        { search: /import ["']\.\/LessonIntroPanel\.css["'];?/, replace: "import '../LessonIntroPanel.css';" }
    ]
);

fixFile(
    path.join(srcDir, 'components', 'InteractiveVideoLesson', 'InteractiveVideoLesson.tsx'),
    [
        { search: /import ["']\.\/LessonIntroPanel\.css["'];?/, replace: "import '../LessonIntroPanel.css';" }
    ]
);
