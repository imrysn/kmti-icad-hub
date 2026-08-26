const fs = require('fs');
let code = fs.readFileSync('frontend/src/components/3D_Modeling/3D_BasicOperation.tsx', 'utf-8');

// 1. Replace activeTab
code = code.replace(/const \[activeTab, setActiveTab\] = useState(?:<.*?>)?\(\(\) => \{[\s\S]*?\}\);/g, "const activeTab = subLessonId ? subLessonId.replace('basic-op-', '') : '';");

// 2. Remove localStorage useEffect
code = code.replace(/useEffect\(\(\) => \{\s*localStorage\.setItem\(`\$\{subLessonId\}-tab`, activeTab\);\s*\}, \[subLessonId, activeTab\]\);/g, '');

// 3. Remove lesson-tabs divs completely
code = code.replace(/<div className="lesson-tabs">[\s\S]*?<\/div>/g, '');

// 4. Remove tabs arrays
code = code.replace(/const tabs = \[\s*\{ id:.*?[\s\S]*?\];/g, '');

// 5. Fix handleNext and handlePrev
code = code.replace(/const handleNext = \(.*?\) => \{[\s\S]*?const i = tabs\.findIndex.*?;\s*if \(i < tabs\.length - 1\) \{ setActiveTab.*? \} else if \(onNextLesson\) onNextLesson\(\);\s*window\.scrollTo\(\{ top: 0, behavior: 'smooth' \}\);\s*\};/g, "const handleNext = () => { if (onNextLesson) onNextLesson(); window.scrollTo({ top: 0, behavior: 'smooth' }); };");
code = code.replace(/const handlePrev = \(.*?\) => \{[\s\S]*?const i = tabs\.findIndex.*?;\s*if \(i > 0\) \{ setActiveTab.*? \} else if \(onPrevLesson\) onPrevLesson\(\);\s*window\.scrollTo\(\{ top: 0, behavior: 'smooth' \}\);\s*\};/g, "const handlePrev = () => { if (onPrevLesson) onPrevLesson(); window.scrollTo({ top: 0, behavior: 'smooth' }); };");

// 6. Fix BasicOperationLesson export
const oldExport = /const BasicOperationLesson: React\.FC<BasicOperationLessonProps> = \(\{ subLessonId, onNextLesson, onPrevLesson, nextLabel \}\) => \{[\s\S]*?\};/;
const newExport = `const BasicOperationLesson: React.FC<BasicOperationLessonProps> = ({ subLessonId, onNextLesson, onPrevLesson, nextLabel }) => {
  const op1 = ['basic-op-cylinder', 'basic-op-box', 'basic-op-polygon', 'basic-op-cone', 'basic-op-torus'];
  const op2 = ['basic-op-move', 'basic-op-rotate', 'basic-op-mirror', 'basic-op-copy', 'basic-op-rotateCopy', 'basic-op-mirrorCopy', 'basic-op-delete'];
  const op3 = ['basic-op-sketch', 'basic-op-extrude', 'basic-op-revolve'];
  const op4 = ['basic-op-showHide', 'basic-op-stretch', 'basic-op-resize'];
  const op5 = ['basic-op-shapeSteels'];

  if (op2.includes(subLessonId)) return <BasicOperation2 subLessonId={subLessonId} onNextLesson={onNextLesson} onPrevLesson={onPrevLesson} nextLabel={nextLabel} />;
  if (op3.includes(subLessonId)) return <BasicOperation3 subLessonId={subLessonId} onNextLesson={onNextLesson} onPrevLesson={onPrevLesson} nextLabel={nextLabel} />;
  if (op4.includes(subLessonId)) return <BasicOperation4 subLessonId={subLessonId} onNextLesson={onNextLesson} onPrevLesson={onPrevLesson} nextLabel={nextLabel} />;
  if (op5.includes(subLessonId)) return <BasicOperation5 subLessonId={subLessonId} onNextLesson={onNextLesson} onPrevLesson={onPrevLesson} nextLabel={nextLabel} />;
  return <BasicOperation1 subLessonId={subLessonId} onNextLesson={onNextLesson} onPrevLesson={onPrevLesson} nextLabel={nextLabel} />;
};`;
code = code.replace(oldExport, newExport);

fs.writeFileSync('frontend/src/components/3D_Modeling/3D_BasicOperation.tsx', code, 'utf-8');
console.log('Refactored using clean Node script!');
