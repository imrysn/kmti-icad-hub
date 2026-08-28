import React from 'react';
import VideoTutorialViewer from '../../3D_Modeling/VideoTutorialViewer';
import { SOLIDWORKS_TUTORIAL_STEPS } from './VideoTutorialData/solidworksInterfaceTutorial';
import mainInterface from '../../../../../assets/Solidworks/3D_Fv/Solidwork_Interface_main.png';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface VideoSolidWorksInterfaceProps {
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
  nextLabel?: string;
  currentIndex?: number;
}

const Video_SolidWorks_Interface: React.FC<VideoSolidWorksInterfaceProps> = ({ onNextLesson, onPrevLesson, nextLabel, currentIndex = 0 }) => {
  return (
    <div className="lesson-grid interactive-layout single-card">
      <div className={`lesson-card tab-content fade-in ${currentIndex >= 0 ? 'reading-active' : ''}`}
        data-reading-index={currentIndex >= 0 && currentIndex <= SOLIDWORKS_TUTORIAL_STEPS.length ? "0" : undefined}
        style={{ background: 'transparent', border: 'none', boxShadow: 'none', padding: 0 }}>

        <div className="interactive-stage-container">
          <VideoTutorialViewer 
            steps={SOLIDWORKS_TUTORIAL_STEPS} 
            imageSrc={mainInterface}
            showBrowser={true}
            fullscreenImageFit="fill"
          />
        </div>

        <div className="lesson-navigation">
          <button className="nav-button" onClick={() => { if (onPrevLesson) onPrevLesson(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}><ChevronLeft size={18} /> Previous</button>
          <button className="nav-button next" onClick={() => { if (onNextLesson) onNextLesson(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>{nextLabel || 'Next Lesson'} <ChevronRight size={18} /></button>
        </div>
      </div>
    </div>
  );
};

export default Video_SolidWorks_Interface;
