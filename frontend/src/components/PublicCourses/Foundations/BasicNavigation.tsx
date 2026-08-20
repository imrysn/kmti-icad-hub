import { useTranslation } from '../../../context/LanguageContext';
import React, { useEffect, useState } from "react";
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { useLessonCore } from "../../../hooks/useLessonCore";
import { useTTSAutoplay } from "../../../hooks/useTTSAutoplay";
import { KaraokeLessonText } from "../../KaraokeLessonText";
import "../../../styles/3D_Modeling/CourseLesson.css";

interface LessonProps {
  onPrevLesson?: () => void;
  onNextLesson?: () => void;
  nextLabel?: string;
}

const BasicNavigation: React.FC<LessonProps> = ({
  onPrevLesson,
  onNextLesson,
  nextLabel,
}) => {
  const [activeTab] = useState("nav");
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
  } = useLessonCore("icad-foundations-nav");

  useEffect(() => {
    stop();
  }, [stop]);

  const steps = [
    "Basic Navigation and Zooming",
    "Moving around your 3D model is essential for designing.",
    "1. Panning: Hold the middle mouse button and drag to move your view.",
    "2. Zooming: Scroll the mouse wheel up or down.",
    "3. Rotating: Hold Shift and the middle mouse button, then drag to orbit.",
    "Try these out in your workspace until they feel natural!"
  ];

  useEffect(() => {
    registerText(steps, 0);
  }, [registerText]);

  useTTSAutoplay(
    isSpeaking,
    currentIndex,
    activeTab,
    steps.length,
    [{ id: 'nav' }],
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
            </div>

            <div className={`instruction-step mt-8 ${currentIndex === 5 ? 'reading-active' : ''}`}>
              <KaraokeLessonText
                className="p-flush font-medium text-blue-600"
                text={steps[5]}
                isActive={isSpeaking && currentIndex === 5}
                currentCharIndex={currentCharIndex}
              />
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

export default BasicNavigation;
