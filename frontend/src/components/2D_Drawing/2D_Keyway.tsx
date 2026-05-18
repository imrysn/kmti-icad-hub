import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ReadAloudButton } from "../ReadAloudButton";
import { KaraokeLessonText } from "../KaraokeLessonText";
import { useLessonCore } from "../../hooks/useLessonCore";

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

  const { scrollProgress, containerRef, speak, stop, isSpeaking, currentIndex, currentCharIndex } = useLessonCore('2d-keyway');

  const keywaySteps = [
    "Review the Parallel Keyway table for shafts and hubs. Ensure you apply the correct dimensions and tolerances based on the shaft diameter to maintain KEMCO engineering standards."
  ];

  const currentTitle = "KEYWAY STANDARDS SIZE AND TOLERANCE";
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

            <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2">
              <div className="step-description">
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
