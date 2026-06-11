import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLessonCore } from "../../hooks/useLessonCore";

import "../../styles/2D_Drawing/CourseLesson.css";

/* Importing assets */
import titleBlock1Img from "../../assets/2D_Image_File/2D_title_block_1.png";

interface TitleBlockLessonProps {
  nextLabel?: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const TitleBlockLesson: React.FC<TitleBlockLessonProps> = ({
  onNextLesson,
  onPrevLesson,
  nextLabel
}) => {
  const { scrollProgress, containerRef } = useLessonCore('2d-titleblock');
  const TABS = [
    { id: 'titleblock', label: 'Titleblock' }
  ];
  const [activeTab, setActiveTab] = useState('titleblock');

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
            <div className="flex-col tab-content fade-in">
              {activeTab === 'titleblock' && (
                <div className="instruction-step" style={{ marginTop: "-2rem" }}>
                  <div className="step-header">
                    <span className="step-number">19</span>
                    <span className="step-label">Title Block</span>
                  </div>
                  <div className="step-description">
                    <div className="p-flush">
                      Displays part informations such as Job Order, Drawing Number,  Part & Machine Name,  Drawn & Designer Name, Cross Reference and Pervious Drawing Number and Quantity
                    </div>
                    <img src={titleBlock1Img} alt="Title Block Definitions" className="software-screenshot screenshot-wide" />
                  </div>
                </div>
              )}
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

export default TitleBlockLesson;
