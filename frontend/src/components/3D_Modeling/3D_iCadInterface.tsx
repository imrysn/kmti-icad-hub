import { ChevronLeft,ChevronRight,Monitor } from 'lucide-react';
import React,{ useState } from "react";
import LessonIntroPanel from '../LessonIntroPanel';
import { useLessonCore } from "../../hooks/useLessonCore";
import "../../styles/3D_Modeling/CourseLesson.css";
import "../../styles/LessonIntroPanel.css";
import VideoTutorialViewer from "./VideoTutorialViewer";

interface IcadInterfaceLessonProps {
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
  nextLabel?: string;
  showFoundationsIntro?: boolean;
}

import { useTranslation } from '../../context/LanguageContext';

import { TUTORIAL_STEPS } from "./VideoTutorialData/iCadInterfaceTutorial";

const IcadInterfaceLesson: React.FC<IcadInterfaceLessonProps> = ({ onNextLesson, onPrevLesson, nextLabel, showFoundationsIntro = false }) => {
  const { t } = useTranslation();
  const [hasStarted, setHasStarted] = useState(!showFoundationsIntro);

  const INTERFACE_STEPS = React.useMemo(() => [
    t('icad.step0'),
    t('icad.step1'),
    t('icad.step2'),
    t('icad.step3'),
    t('icad.step4'),
    t('icad.step5'),
    t('icad.step6'),
    t('icad.step7'),
    t('icad.step8'),
    t('icad.step9'),
    t('icad.step10'),
    t('icad.step11')
  ], [t]);

  const {
    scrollProgress,
    containerRef,
    currentIndex  } = useLessonCore('interface', INTERFACE_STEPS);

  return (
    <div className={`course-lesson-container`} ref={containerRef}>
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      {/* Main Interactive Stage */}
      <div className="lesson-grid interactive-layout single-card">
        <div className={`lesson-card tab-content fade-in ${currentIndex >= 0 ? 'reading-active' : ''}`}
          data-reading-index={currentIndex >= 0 && currentIndex <= 11 ? "0" : undefined}
          style={{ background: 'transparent', border: 'none', boxShadow: 'none', padding: 0 }}>

          {!hasStarted ? (
            <div className="lesson-intro-shell">
              <LessonIntroPanel
                icon={Monitor}
                eyebrow="Interactive screen tour"
                title="Explore the iCAD SX Screen"
                description="Take a guided tour of the workspace and learn where to find the main screen areas used throughout your iCAD training."
                onStart={() => setHasStarted(true)}
              />
            </div>
          ) : (
            <div className="interactive-stage-container">
              <VideoTutorialViewer steps={TUTORIAL_STEPS.map(s => ({
                ...s,
                title: t(`tutorial.icad.${s.id}.title`),
                text: t(`tutorial.icad.${s.id}.text`)
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

export default IcadInterfaceLesson;


