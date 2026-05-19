import React from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { KaraokeLessonText } from "../KaraokeLessonText";
import { useLessonCore } from "../../hooks/useLessonCore";

import "../../styles/2D_Drawing/CourseLesson.css";

/* Importing assets for Welding Symbol and Notes */
import weldingSymbolMainImg from "../../assets/2D_Image_File/2D_welding_symbol.png";
import weldingSymbolNotesImg from "../../assets/2D_Image_File/2D_welding_symbol_notes.jpg";
import standardNotesImg from "../../assets/2D_Image_File/2D_welding_symbol_standard_notes.jpg";

interface WeldingSymbolLessonProps {
  nextLabel?: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const WeldingSymbolLesson: React.FC<WeldingSymbolLessonProps> = ({
  onNextLesson,
  onPrevLesson,
  nextLabel
}) => {
  const { scrollProgress, containerRef, speak, stop, isSpeaking, currentIndex, currentCharIndex } = useLessonCore('2d-welding-symbol');

  const weldingSteps = [
    "Before adding a symbol, apply welding hatches as a visual representation. The arrow line acts as your welding torch. Keep leg lengths at sixty percent of the thinner plate thickness unless the design specifies otherwise.",
    "Standard notes are located in the upper left corner. They cover mandatory requirements like chamfering holes, deburring corners, and ensuring parts are free from dust. While the tapping note can be removed if not needed, text properties must never be altered."
  ];

  const currentTitle = "WELDING SYMBOL / NOTES";
  const currentSubtitle = "Procedures for applying welding symbols, hatches, and standard notes.";

  return (
    <div className="course-lesson-container" ref={containerRef}>
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      <div className="lesson-grid single-card">
        <div className="lesson-card">
          <div className="fade-in">
            <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2" style={{ marginTop: "-2rem" }}>
              <div className="step-header">
                <span className="step-number">1</span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text="Welding Symbol & Hatches"
                  isActive={isSpeaking && currentIndex === 2}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <div className="red-text mb-4">
                  <KaraokeLessonText
                    text={weldingSteps[0]}
                    isActive={isSpeaking && currentIndex === 2}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
                <div className="flex-col gap-4">
                  <img src={weldingSymbolMainImg} alt="Welding Symbol Menu" className="software-screenshot screenshot-wide" />
                  <img src={weldingSymbolNotesImg} alt="Welding Hatches Detail" className="software-screenshot screenshot-wide" />
                </div>
              </div>
            </div>


            <div className={`instruction-step ${currentIndex === 3 ? "reading-active" : ""}`} data-reading-index="3">
              <div className="step-header">
                <span className="step-number">2</span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text="Standard Technical Notes"
                  isActive={isSpeaking && currentIndex === 3}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <div className="flex-col gap-4">
                  <img src={standardNotesImg} alt="Standard Notes Placement" className="software-screenshot screenshot-wide" />
                </div>
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

export default WeldingSymbolLesson;
