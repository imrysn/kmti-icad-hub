const fs = require('fs');
const path = require('path');

const tsFilePath = path.join(__dirname, 'frontend/src/config/translations.ts');
const configDir = path.join(__dirname, 'frontend/src/config');
const translationsDir = path.join(configDir, 'translations');
const enDir = path.join(translationsDir, 'en');
const jaDir = path.join(translationsDir, 'ja');
const dirsToCreate = [
    translationsDir,
    enDir, path.join(enDir, '3d'), path.join(enDir, '2d'), path.join(enDir, 'components'),
    jaDir, path.join(jaDir, '3d'), path.join(jaDir, '2d'), path.join(jaDir, 'components')
];

dirsToCreate.forEach(d => {
    if (!fs.existsSync(d)) {
        fs.mkdirSync(d, { recursive: true });
    }
});

const content = fs.readFileSync(tsFilePath, 'utf8');

const mapping = {
    'Navigation / Common': 'common.ts',
    'Common additions': 'common.ts',
    'Shared': 'common.ts',
    'Connection Diagnostics': 'components/diagnostics.ts',
    'Login': 'components/login.ts',
    'KMTI Sensei': 'components/sensei.ts',
    'Course Selector': 'components/course_selector.ts',
    'Quotation Lobby (QuotationEntryModal)': 'components/quotation.ts',
    'Quotation Print Preview (PrintPreviewModal)': 'components/quotation.ts',
    'Notifications Modal': 'components/notifications.ts',
    'Time Record Modal': 'components/time_record.ts',
    'Quiz Modal': 'components/quiz.ts',
    'Roadmap Modal': 'components/roadmap.ts',
    'Folder Upload Modal (PracticalAssessment)': 'components/practical.ts',
    'Trash Bin Modal (PracticalAssessment)': 'components/practical.ts',
    'Submission Review Modal (PracticalTrainerDashboard)': 'components/practical.ts',
    'Bulk Review Modal (PracticalTrainerDashboard)': 'components/practical.ts',
    'Lesson Viewer': 'components/lesson_viewer.ts',
    'Practical Assessment': 'components/practical.ts',
    'iCad Interface': '3d/icad_interface.ts',
    'iCAD Tutorial (VideoTutorialViewer)': '3d/icad_tutorial.ts',
    'ToolBars Tutorial (VideoTutorialViewer)': '3d/toolbars.ts',
    '3D Origin Lesson': '3d/origin.ts',
    'Basic Operation 1': '3d/basic_operation.ts',
    'Basic Operation 2': '3d/basic_operation.ts',
    'Basic Operation 3': '3d/basic_operation.ts',
    'Basic Operation 4': '3d/basic_operation.ts',
    'Component': '3d/component.ts',
    'Table': '3d/table.ts',
};

// Simple parser for the object
function parseTranslations(objStr) {
    const lines = objStr.split('\n');
    let currentCategory = 'common.ts';
    const result = {};

    for (let line of lines) {
        line = line.trim();
        if (!line) continue;

        if (line.startsWith('//')) {
            const comment = line.substring(2).trim();
            if (mapping[comment]) {
                currentCategory = mapping[comment];
            } else {
                console.warn(`Unmapped comment: ${comment}`);
                // fallback to common
            }
            continue;
        }

        // key: "value", or "key": "value",
        const match = line.match(/^"?([a-zA-Z0-9_.-]+)"?\s*:\s*(.*)/);
        if (match) {
            let key = match[1];
            let val = match[2];
            // remove trailing comma if present
            if (val.endsWith(',')) {
                val = val.substring(0, val.length - 1);
            }
            if (!result[currentCategory]) {
                result[currentCategory] = [];
            }
            result[currentCategory].push(`  "${key}": ${val},`);
        }
    }
    return result;
}

const enMatch = content.match(/export const enTranslations: Record<string, string> = {([\s\S]*?)\n};\n\nexport const jaTranslations/);
const jaMatch = content.match(/export const jaTranslations: Record<string, string> = {([\s\S]*?)\n};\n\nexport const dictionaries/);

if (!enMatch || !jaMatch) {
    console.error('Regex match failed');
    process.exit(1);
}

const enParsed = parseTranslations(enMatch[1]);
const jaParsed = parseTranslations(jaMatch[1]);

// Write files
const indexImports = [];
const enExports = [];
const jaExports = [];

const allFiles = new Set([...Object.keys(enParsed), ...Object.keys(jaParsed)]);

for (const file of allFiles) {
    const enContentLines = enParsed[file] || [];
    const jaContentLines = jaParsed[file] || [];
    
    // Generate a variable name
    // e.g., '3d/basic_operation.ts' -> 'en_3d_basic_operation'
    const varNameBase = file.replace('.ts', '').replace(/\//g, '_');
    const enVarName = `en_${varNameBase}`;
    const jaVarName = `ja_${varNameBase}`;
    
    const enFileContent = `export const ${enVarName} = {\n${enContentLines.join('\n')}\n};\n`;
    const jaFileContent = `export const ${jaVarName} = {\n${jaContentLines.join('\n')}\n};\n`;
    
    fs.writeFileSync(path.join(enDir, file), enFileContent);
    fs.writeFileSync(path.join(jaDir, file), jaFileContent);
    
    // For index.ts
    const importPath = file.replace('.ts', '');
    indexImports.push(`import { ${enVarName} } from './en/${importPath}';`);
    indexImports.push(`import { ${jaVarName} } from './ja/${importPath}';`);
    
    enExports.push(`  ...${enVarName},`);
    jaExports.push(`  ...${jaVarName},`);
}

const indexContent = `export type Language = 'en' | 'ja';

${indexImports.join('\n')}

export const enTranslations: Record<string, string> = {
${enExports.join('\n')}
};

export const jaTranslations: Record<string, string> = {
${jaExports.join('\n')}
};

export const dictionaries = {
  en: enTranslations,
  ja: jaTranslations,
};
`;

fs.writeFileSync(path.join(translationsDir, 'index.ts'), indexContent);

// Update old translations.ts to just re-export
const oldTranslationsContent = `export * from './translations/index';\n`;
fs.writeFileSync(tsFilePath, oldTranslationsContent);

console.log('Successfully refactored translations!');
