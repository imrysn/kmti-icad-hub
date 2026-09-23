import { professionalRenderLesson } from './components/iCAD_Professional/curriculum';
import {createRoot} from 'react-dom/client';
import {LanguageProvider} from './context/LanguageContext';
import {TTSProvider} from './context/TTSContext';
import Reader from './components/iCAD_Foundations/FoundationReadingLesson';
import {FOUNDATION_LESSONS} from './components/iCAD_Foundations/curriculum';
import { PRESERVED_FOUNDATIONS_LESSONS } from './views/mentor/mentorConstants';
import DynamicFoundationsLesson from './components/PublicCourses/Foundations/DynamicFoundationsLesson';
import { getDynamicFoundationsLessonProps } from './components/PublicCourses/Foundations/dynamicLessonProps';
import BasicOperationLesson from './components/3D_Modeling/3D_BasicOperation';
import * as en from './components/iCAD_Foundations/VideoTutorial_EN';
import * as ja from './components/iCAD_Foundations/VideoTutorial_JP';
import './index.css';

const q=new URLSearchParams(location.search);localStorage.setItem('kmti_lang',q.get('lang')||'en');
const lesson=professionalRenderLesson(q.get('id')||'')||FOUNDATION_LESSONS.find(l=>l.id===q.get('id'))||FOUNDATION_LESSONS[0];
Object.assign(window,{auditLessons:FOUNDATION_LESSONS,auditVideos:{en,ja}});

const op2Map: Record<string, string> = {
  'basic-op-move': 'lesson-6-1',
  'basic-op-rotate': 'lesson-6-2',
  'basic-op-mirror': 'lesson-6-3',
  'basic-op-copy': 'lesson-6-4',
  'basic-op-rotateCopy': 'lesson-6-5',
  'basic-op-mirrorCopy': 'lesson-6-6',
  'basic-op-delete': 'lesson-6-7',
};
const renderer = lesson?.renderer;
const effectiveRenderer = (renderer && op2Map[renderer]) || renderer || '';
const source = PRESERVED_FOUNDATIONS_LESSONS.flatMap(module => module.children || [module]).find(l => l.id === effectiveRenderer);
const tutorialComponent = effectiveRenderer.startsWith('basic-op-')
  ? <BasicOperationLesson subLessonId={effectiveRenderer} />
  : source ? <DynamicFoundationsLesson {...getDynamicFoundationsLessonProps({ ...source, content: source.content || [] })} /> : null;

createRoot(document.getElementById('root')!).render(
  <LanguageProvider>
    <TTSProvider>
      <Reader
        lesson={lesson}
        onComplete={async()=>{}}
        onNext={()=>{}}
        isLast={lesson.id==='F16.2'}
        tutorial={tutorialComponent && <div className="foundations-zoom-tutorial">{tutorialComponent}</div>}
      />
    </TTSProvider>
  </LanguageProvider>
);
