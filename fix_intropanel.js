const fs = require('fs');
let code = fs.readFileSync('frontend/src/components/3D_Modeling/3D_BasicOperation.tsx', 'utf-8');
const introPanelStr = ' introPanel={{ icon: Play, eyebrow: "Interactive Video", title: "Watch Video Demonstration", description: "See this tool in action in the workspace." }}';
code = code.replace(/<VideoTutorialViewer steps=\{mapSteps\((.*?)\)\} \/>/g, '<VideoTutorialViewer' + introPanelStr + ' steps={mapSteps($1)} />');
if (!code.includes('Play')) {
    code = code.replace(/import \{ /, 'import { Play, ');
}
fs.writeFileSync('frontend/src/components/3D_Modeling/3D_BasicOperation.tsx', code);
console.log('Added introPanels to 3D_BasicOperation.tsx');
