import { ChevronLeft, ChevronRight } from 'lucide-react';
import React from "react";
import { useLessonCore } from "../../hooks/useLessonCore";
import "../../styles/3D_Modeling/CourseLesson.css";
import VideoTutorialViewer from "./VideoTutorialViewer";

/* Toolbar image imports */


import { TOOLBAR_TUTORIAL_STEPS } from "./VideoTutorialData/ToolBarsTutorial";


import { useTranslation } from '../../context/LanguageContext';

interface ToolBarsLessonProps {
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
  nextLabel?: string;
}

const ToolBarsLesson: React.FC<ToolBarsLessonProps> = ({ onNextLesson, onPrevLesson, nextLabel }) => {
  const { t } = useTranslation();
  const {
    scrollProgress,
    containerRef  } = useLessonCore('toolbars');





  return (
    <div className={`course-lesson-container`} ref={containerRef}>
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>



      {/* Main Interactive Stage */}
      <div className="lesson-grid interactive-layout single-card">
        <div className="lesson-card tab-content fade-in" style={{ background: 'transparent', border: 'none', boxShadow: 'none', padding: 0 }}>


          <div className="interactive-stage-container">
            <VideoTutorialViewer steps={TOOLBAR_TUTORIAL_STEPS.map(s => ({
              ...s,
              title: t(`tutorial.toolbars.${s.id}.title`),
              text: t(`tutorial.toolbars.${s.id}.text`)
            }))} />
          </div>

          <div className="lesson-navigation">
            <button className="nav-button" onClick={() => { if (onPrevLesson) onPrevLesson(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}><ChevronLeft size={18} /> {t('common.previous')}</button>
            <button className="nav-button next" onClick={() => { if (onNextLesson) onNextLesson(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>{nextLabel || t('common.next')} <ChevronRight size={18} /></button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ToolBarsLesson;

