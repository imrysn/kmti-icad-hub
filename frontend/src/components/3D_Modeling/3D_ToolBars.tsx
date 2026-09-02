import { ChevronLeft, ChevronRight, Wrench } from 'lucide-react';
import React from "react";
import { useLessonCore } from "../../hooks/useLessonCore";
import './CourseLesson.css';
import '../LessonIntroPanel.css';
import VideoTutorialViewer from "./VideoTutorialViewer";
import FoundationsVideoReadingLayout from '../FoundationsVideoReadingLayout';
import type { WrittenTutorialStep } from '../WrittenTutorialPanel';

/* Toolbar image imports */


import { TOOLBAR_TUTORIAL_STEPS } from "./VideoTutorialData/ToolBarsTutorial";


import { useTranslation } from '../../context/LanguageContext';

interface ToolBarsLessonProps {
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
  nextLabel?: string;
}

export const TOOLBARS_WRITTEN_TUTORIAL_STEPS: WrittenTutorialStep[] = [
  {
    id: 'file',
    title: 'File',
    text: 'Contains new, open, save, print.',
    preserveText: true,
  },
  {
    id: '2d-view',
    title: '2D View',
    text: 'Contains Previous View, Switch Views, Next View.',
    preserveText: true,
  },
  {
    id: 'switch-display',
    title: 'Switch Display',
    text: 'Contains Change Projection Method, Switch Dimensions.',
    preserveText: true,
  },
  {
    id: 'screen-operations',
    title: 'Screen Operations',
    text: 'Contains Set Zoom Area, Zoom In, Zoom Out, Zoom to Fit, Re-Display, Previous Zoom.',
    preserveText: true,
  },
  {
    id: '3d-view',
    title: '3D View',
    text: 'Contains Top, Front, Right, Left, Back, Bottom, Set a Plane, Set using 3-Points.',
    preserveText: true,
  },
  {
    id: 'user-views',
    title: 'User Views',
    text: 'Contains User View 1, 2, 3, 4 (ISOMETRIC VIEWS).',
    preserveText: true,
  },
  {
    id: 'edit',
    title: 'Edit',
    text: 'Contains Undo, Redo.',
    preserveText: true,
  },
  {
    id: 'shading',
    title: 'Shading',
    text: 'Contains Shading, Shading with Frame, Hidden Lines Removed, Wireframe.',
    preserveText: true,
  },
  {
    id: 'section-display',
    title: 'Section Display',
    text: 'Contains Open Work Plane, Switch to Section Display.',
    preserveText: true,
  },
  {
    id: '2d-standard-screen',
    title: '2D Standard Screen',
    text: 'Contains Set Standard Screen Range, Set Display Screen, Display Standard Screen.',
    preserveText: true,
  },
  {
    id: 'system-information',
    title: 'System Information',
    text: 'Setting for attributes of entities to be created.',
    preserveText: true,
  },
  {
    id: 'screen-memory',
    title: 'Screen Memory',
    text: 'Stores the currently displayed screen.',
    preserveText: true,
  },
  {
    id: 'entry-control',
    title: 'Entry Control',
    text: 'The method for entity selection and coordinate entry can be specified.',
    preserveText: true,
  },
];

export const TOOLBARS_WRITTEN_TUTORIAL_COPY = {
  title: 'This lesson introduces the iCAD tool bars and the commands available in each section.',
  moduleLabel: 'About the Lesson',
  procedureTitle: 'Procedure',
  completionText: 'You have completed the iCAD Tool Bars lesson.',
};

export const localizeToolbarTutorialSteps = (
  translate: (key: string) => string,
  translateContent: (text: string) => string = (text) => text,
) => TOOLBAR_TUTORIAL_STEPS.map((step) => {
  const titleKey = `tutorial.toolbars.${step.id}.title`;
  const textKey = `tutorial.toolbars.${step.id}.text`;
  const translatedTitle = translate(titleKey);
  const translatedText = translate(textKey);

  return {
    ...step,
    title: translatedTitle === titleKey ? step.title : translatedTitle,
    text: translatedText === textKey ? step.text : translatedText,
    quizData: step.quizData ? {
      question: translateContent(step.quizData.question),
      options: step.quizData.options.map((option) => ({
        ...option,
        text: translateContent(option.text),
        feedback: translateContent(option.feedback),
      })),
    } : undefined,
    recapData: step.recapData ? {
      title: translateContent(step.recapData.title),
      items: step.recapData.items.map(translateContent),
    } : undefined,
  };
});

const ToolBarsLesson: React.FC<ToolBarsLessonProps> = ({ onNextLesson, onPrevLesson, nextLabel }) => {
  const { t, translateContent } = useTranslation();
  const {
    containerRef  } = useLessonCore('toolbars');





  return (
    <div className="course-lesson-container foundations-standard-intro foundations-video-reading-lesson" ref={containerRef}>
      {/* Main Interactive Stage */}
      <div className="lesson-grid interactive-layout single-card">
        <div className="lesson-card tab-content fade-in" style={{ background: 'transparent', border: 'none', boxShadow: 'none', padding: 0 }}>

          <div className="interactive-stage-container">
            {(() => {
              const steps = localizeToolbarTutorialSteps(t, translateContent);
              return (
                <FoundationsVideoReadingLayout
                  title={TOOLBARS_WRITTEN_TUTORIAL_COPY.title}
                  steps={TOOLBARS_WRITTEN_TUTORIAL_STEPS}
                  writtenTutorialCopy={TOOLBARS_WRITTEN_TUTORIAL_COPY}
                >
                  <VideoTutorialViewer 
                    steps={steps}
                    introPanel={{
                      icon: Wrench,
                      eyebrow: "Interactive tool tour",
                      title: "Explore the iCAD Tool Bars",
                      description: "Take a guided tour of the Tool Bars and learn where to find the essential commands used throughout your iCAD workflow."
                    }}
                  />
                </FoundationsVideoReadingLayout>
              );
            })()}
          </div>

          <div className="lesson-navigation">
            {onPrevLesson && (
  <button className="nav-button" onClick={() => { if (onPrevLesson) onPrevLesson(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}><ChevronLeft size={18} /> {t('common.previous')}</button>
)}
            <button className="nav-button next" onClick={() => { if (onNextLesson) onNextLesson(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>{nextLabel || t('common.next')} <ChevronRight size={18} /></button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ToolBarsLesson;

