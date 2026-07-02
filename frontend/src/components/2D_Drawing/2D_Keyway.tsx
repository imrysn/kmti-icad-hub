import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ReadAloudButton } from "../ReadAloudButton";
import { KaraokeLessonText } from "../KaraokeLessonText";
import { useLessonCore } from "../../hooks/useLessonCore";
import { useTTSAutoplay } from "../../hooks/useTTSAutoplay";

import "../../styles/2D_Drawing/CourseLesson.css";

/* Importing assets for Keyway */
import keywayImg from "../../assets/2D_Image_File/2D_keyway.jpg";

interface KeywayLessonProps {
  nextLabel?: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const KeywayLesson: React.FC<KeywayLessonProps> = ({
  onNextLesson,
  onPrevLesson,
  nextLabel
}) => {
  const TABS = [
    { id: 'keyway', label: 'Keyway' }
  ];
  const [activeTab, setActiveTab] = useState('keyway');

  const { scrollProgress, containerRef, speak, stop, isSpeaking, currentIndex, currentCharIndex, registerText } = useLessonCore('2d-keyway');

  const keywaySteps = [
    "Review the Parallel Keyway table for shafts and hubs. Ensure you apply the correct dimensions and tolerances based on the shaft diameter to maintain KEMCO engineering standards."
  ];

  const currentTitle = "KEYWAY STANDARDS SIZE AND TOLERANCE";
  const currentTabSteps = [
    currentTitle,
    keywaySteps[0]
  ];
  const tabsList = [{ id: 'keyway' }];

  useEffect(() => {
    registerText(currentTabSteps, 0);
  }, [registerText]);

  const handleNext = (isAuto = false) => {
    stop();
    if (!isAuto) {
      sessionStorage.setItem('tts-autoplay-active', 'false');
    }

    if (onNextLesson) onNextLesson();
  };

  useTTSAutoplay(
    isSpeaking,
    currentIndex,
    activeTab,
    currentTabSteps.length,
    tabsList,
    handleNext,
    speak,
    currentTabSteps,
    0
  );
  const currentSubtitle = "";

  return (
    <div className="course-lesson-container" ref={containerRef}>
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      <div className="lesson-tabs">
        {TABS.map(tab => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="lesson-grid single-card">
        <div className="lesson-card">
          <div className="fade-in">

            <div className={`instruction-step ${currentIndex === 0 ? "reading-active" : ""}`} data-reading-index="0" style={{ marginTop: "-2rem" }}>
              <div className="step-header">
                <span className="step-number">10</span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text="Keyway Standards Size and Tolerance"
                  isActive={isSpeaking && currentIndex === 0}
                  currentCharIndex={currentCharIndex}
                />
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 1 ? "reading-active" : ""}`} data-reading-index="1" style={{ marginTop: "1rem" }}>
              <div className="step-description">
                <KaraokeLessonText
                  className="p-flush mb-4"
                  text={keywaySteps[0]}
                  isActive={isSpeaking && currentIndex === 1}
                  currentCharIndex={currentCharIndex}
                />
                <img src={keywayImg} alt="Parallel Keyway Standards" className="software-screenshot screenshot-wide" />
              </div>
            </div>
          </div>

          <div className="lesson-navigation">
            <button className="nav-button" onClick={onPrevLesson}>
              <ChevronLeft size={18} /> Previous
            </button>
            <button className="nav-button next" onClick={onNextLesson}>
              {nextLabel || 'Next'} <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeywayLesson;
