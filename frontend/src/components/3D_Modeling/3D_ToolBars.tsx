import { ChevronLeft, ChevronRight, Wrench } from 'lucide-react';
import React, { useState } from "react";
import LessonIntroPanel from '../LessonIntroPanel';
import { useLessonCore } from "../../hooks/useLessonCore";
import './CourseLesson.css';
import '../LessonIntroPanel.css';
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
  const [hasStarted, setHasStarted] = useState(false);
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

          {!hasStarted ? (
            <div className="lesson-intro-shell">
              <LessonIntroPanel
                icon={Wrench}
                eyebrow="Interactive tool tour"
                title="Explore the iCAD Tool Bars"
                description="Take a guided tour of the Tool Bars and learn where to find the essential commands used throughout your iCAD workflow."
                onStart={() => setHasStarted(true)}
              />
            </div>
          ) : (
            <div className="interactive-stage-container">
              <VideoTutorialViewer steps={TOOLBAR_TUTORIAL_STEPS.map(s => ({
                ...s,
                title: t(`tutorial.toolbars.${s.id}.title`),
                text: t(`tutorial.toolbars.${s.id}.text`)
              }))} />
            </div>
          )}

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

