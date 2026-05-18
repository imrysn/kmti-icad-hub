import React from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ReadAloudButton } from "../ReadAloudButton";
import { KaraokeLessonText } from "../KaraokeLessonText";
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
  const { scrollProgress, containerRef, speak, stop, isSpeaking, currentIndex, currentCharIndex } = useLessonCore('2d-titleblock');

  const titleBlockSteps = [
    "The title block displays critical part information including Job Order, Drawing Number, and designer names. Ensure all fields are filled accurately for project tracking.",
    "Follow the systematic approach to reflect technical data. Input the required information into the dialog and check that it appears correctly in the designated template fields.",
    "Position the completed title block using landmarks P1 and P2 to ensure it aligns perfectly with the standard KEMCO drawing frame."
  ];

  const currentTitle = "TITLE BLOCK";
  const currentSubtitle = "Configuring the primary information block for project tracking and part identification.";

  return (
    <div className="course-lesson-container" ref={containerRef}>
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      <div className="lesson-grid single-card">
        <div className="lesson-card">
          <div className="fade-in">
            <div className="card-header">
              <KaraokeLessonText
                as="h4"
                className={`section-title ${currentIndex === 0 ? "reading-active" : ""}`}
                data-reading-index="0"
                text={currentTitle}
                isActive={isSpeaking && currentIndex === 0}
                currentCharIndex={currentCharIndex}
              />
              <ReadAloudButton 
                isSpeaking={isSpeaking} 
                onStart={() => speak([currentTitle, currentSubtitle, ...titleBlockSteps])}
                onStop={stop}
              />
            </div>

            <div className={`instruction-step ${currentIndex === 1 ? "reading-active" : ""}`} data-reading-index="1">
              <KaraokeLessonText
                className="p-flush"
                text={currentSubtitle}
                isActive={isSpeaking && currentIndex === 1}
                currentCharIndex={currentCharIndex}
              />
            </div>


            <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2">
              <div className="step-header">
                <span className="step-number">1</span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text="Title Block Definition & Overview"
                  isActive={isSpeaking && currentIndex === 2}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <div className="red-text mb-4">
                  <KaraokeLessonText
                    text="Displays part information: Job Order, Drawing Number, Machine Name, Designer, and References."
                    isActive={isSpeaking && currentIndex === 2}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
                <img src={titleBlock1Img} alt="Title Block Definitions" className="software-screenshot screenshot-wide" />
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

export default TitleBlockLesson;
