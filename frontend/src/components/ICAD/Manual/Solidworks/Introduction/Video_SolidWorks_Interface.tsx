import React, { useState } from 'react';
import VideoTutorialViewer from '../../3D_Modeling/VideoTutorialViewer';
import { SOLIDWORKS_TUTORIAL_STEPS } from './VideoTutorialData/solidworksInterfaceTutorial';
import mainInterface from '../../../../../assets/Solidworks/Introduction/SW_UI_Main.png';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLessonCore } from '../../../../../hooks/useLessonCore';

interface VideoSolidWorksInterfaceProps {
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
  nextLabel?: string;
}

const Video_SolidWorks_Interface: React.FC<VideoSolidWorksInterfaceProps> = ({ onNextLesson, onPrevLesson, nextLabel }) => {
  const {
    scrollProgress,
    containerRef,
    currentIndex
  } = useLessonCore('sw-interface');

  return (
    <div className={`course-lesson-container`} ref={containerRef}>
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      {/* Main Interactive Stage */}
      <div className="lesson-grid interactive-layout single-card">
        <div className={`lesson-card tab-content fade-in ${currentIndex >= 0 ? 'reading-active' : ''}`}
          data-reading-index={currentIndex >= 0 && currentIndex <= SOLIDWORKS_TUTORIAL_STEPS.length ? "0" : undefined}
          style={{ background: 'transparent', border: 'none', boxShadow: 'none', padding: 0 }}>

          <div className="interactive-stage-container">
            <VideoTutorialViewer 
              steps={SOLIDWORKS_TUTORIAL_STEPS} 
              imageSrc={mainInterface}
            />
          </div>

          <div className="lesson-navigation">
            <button className="nav-button" onClick={() => { if (onPrevLesson) onPrevLesson(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}><ChevronLeft size={18} /> Previous</button>
            <button className="nav-button next" onClick={() => { if (onNextLesson) onNextLesson(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>{nextLabel || 'Next Lesson'} <ChevronRight size={18} /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Video_SolidWorks_Interface;
