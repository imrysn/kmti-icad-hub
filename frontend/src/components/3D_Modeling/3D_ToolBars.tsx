import { ChevronLeft, ChevronRight, Wrench } from 'lucide-react';
import React from "react";
import { useLessonCore } from "../../hooks/useLessonCore";
import './CourseLesson.css';
import '../LessonIntroPanel.css';
import VideoTutorialViewer from "./VideoTutorialViewer";
import FoundationsVideoReadingLayout from '../FoundationsVideoReadingLayout';

/* Toolbar image imports */


import { TOOLBAR_TUTORIAL_STEPS } from "./VideoTutorialData/ToolBarsTutorial";


import { useTranslation } from '../../context/LanguageContext';

interface ToolBarsLessonProps {
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
  nextLabel?: string;
}

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
    scrollProgress,
    containerRef  } = useLessonCore('toolbars');





  return (
    <div className="course-lesson-container foundations-standard-intro foundations-video-reading-lesson" ref={containerRef}>
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>



      {/* Main Interactive Stage */}
      <div className="lesson-grid interactive-layout single-card">
        <div className="lesson-card tab-content fade-in" style={{ background: 'transparent', border: 'none', boxShadow: 'none', padding: 0 }}>

          <div className="interactive-stage-container">
            {(() => {
              const steps = localizeToolbarTutorialSteps(t, translateContent);
              return (
                <FoundationsVideoReadingLayout
                  title="Explore the iCAD Tool Bars"
                  description="Review the toolbar commands as a written, step-by-step reference."
                  steps={steps.map(step => ({ id: step.id, title: step.title, text: step.text }))}
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

