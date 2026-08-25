import { useTranslation } from '../../../context/LanguageContext';
import React, { useEffect, useState } from "react";
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { useLessonCore } from "../../../hooks/useLessonCore";
import { useTTSAutoplay } from "../../../hooks/useTTSAutoplay";
import { KaraokeLessonText } from "../../KaraokeLessonText";
import './CourseLesson.css';

interface LessonProps {
  onPrevLesson?: () => void;
  onNextLesson?: () => void;
  nextLabel?: string;
}

const WorkspaceLayout: React.FC<LessonProps> = ({
  onPrevLesson,
  onNextLesson,
  nextLabel,
}) => {
  const [activeTab] = useState("layout");
  const { t } = useTranslation();
  
  const {
    scrollProgress,
    containerRef,
    speak,
    stop,
    isSpeaking,
    currentIndex,
    currentCharIndex,
    registerText
  } = useLessonCore("icad-foundations-layout");

  useEffect(() => {
    stop();
  }, [stop]);

  const steps = [
    "The Workspace Layout",
    "iCAD's workspace is divided into several main areas.",
    "1. The Main Viewport: Where all your 3D models live.",
    "2. The Command Menu: Text-based hierarchy on the right for legacy operations.",
    "3. Toolbars: Icon-based quick access at the top and left.",
    "4. Message Pane: Bottom left area showing errors or command prompts."
  ];

  useEffect(() => {
    registerText(steps, 0);
  }, [registerText]);

  useTTSAutoplay(
    isSpeaking,
    currentIndex,
    activeTab,
    steps.length,
    [{ id: 'layout' }],
    () => { if (onNextLesson) onNextLesson(); },
    speak,
    steps,
    0
  );

  return (
    <div className="course-lesson-container" ref={containerRef}>
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      <div className="lesson-grid single-card mt-8">
        <div className="lesson-card tab-content">
          <div className="fade-in">
            <div className="card-header">
              <KaraokeLessonText
                as="h4"
                className={`section-title ${currentIndex === 0 ? 'reading-active' : ''}`}
                text={steps[0]}
                isActive={isSpeaking && currentIndex === 0}
                currentCharIndex={currentCharIndex}
              />
            </div>

            <div className={`instruction-step ${currentIndex === 1 ? 'reading-active' : ''}`}>
              <KaraokeLessonText
                className="p-flush text-lg"
                text={steps[1]}
                isActive={isSpeaking && currentIndex === 1}
                currentCharIndex={currentCharIndex}
              />
            </div>

            <div className="step-description mt-6 p-6 bg-slate-50 rounded-lg">
              <div className={`instruction-step ${currentIndex === 2 ? 'reading-active' : ''}`}>
                <KaraokeLessonText text={steps[2]} isActive={isSpeaking && currentIndex === 2} currentCharIndex={currentCharIndex} />
              </div>
              <div className={`instruction-step mt-2 ${currentIndex === 3 ? 'reading-active' : ''}`}>
                <KaraokeLessonText text={steps[3]} isActive={isSpeaking && currentIndex === 3} currentCharIndex={currentCharIndex} />
              </div>
              <div className={`instruction-step mt-2 ${currentIndex === 4 ? 'reading-active' : ''}`}>
                <KaraokeLessonText text={steps[4]} isActive={isSpeaking && currentIndex === 4} currentCharIndex={currentCharIndex} />
              </div>
              <div className={`instruction-step mt-2 ${currentIndex === 5 ? 'reading-active' : ''}`}>
                <KaraokeLessonText text={steps[5]} isActive={isSpeaking && currentIndex === 5} currentCharIndex={currentCharIndex} />
              </div>
            </div>
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

export default WorkspaceLayout;
