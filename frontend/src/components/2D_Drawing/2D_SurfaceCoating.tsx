import React from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ReadAloudButton } from "../ReadAloudButton";
import { KaraokeLessonText } from "../KaraokeLessonText";
import { useLessonCore } from "../../hooks/useLessonCore";

import "../../styles/2D_Drawing/CourseLesson.css";

/* Importing assets for Surface Coating */
import specialNotesImg from "../../assets/2D_Image_File/2D_surface_coating_special_notes.png";
import copyMoveImg from "../../assets/2D_Image_File/2D_surface_coating_copy_move.png";

interface SurfaceCoatingLessonProps {
  nextLabel?: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const SurfaceCoatingLesson: React.FC<SurfaceCoatingLessonProps> = ({
  onNextLesson,
  onPrevLesson,
  nextLabel
}) => {
  const { scrollProgress, containerRef, speak, stop, isSpeaking, currentIndex, currentCharIndex } = useLessonCore('2d-surface-coating');

  const coatingSteps = [
    "Review the technical table for surface finishing processes. Ensure the chosen coating matches the material requirements for durability and corrosion resistance.",
    "Use special notes for heat treatments or specific part requirements. Arrange them chronologically by manufacturing sequence to match standard drafting practices.",
    "Copy multiplies entities, while move changes their location. Use reference points P1 and P2 to precisely reposition technical details."
  ];

  const currentTitle = "SURFACE COATING";
  const currentSubtitle = "Technical specifications for surface finishing processes and annotation management.";

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
                onStart={() => speak([currentTitle, currentSubtitle, ...coatingSteps])}
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
                  text="Plating & Coating Specifications"
                  isActive={isSpeaking && currentIndex === 2}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <div className="lesson-table-container">
                  <table className="lesson-table">
                    <thead>
                      <tr>
                        <th>Kind of Process</th>
                        <th>Indication of Drawing</th>
                        <th>Material</th>
                        <th>Purpose</th>
                        <th>Characteristics</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td rowSpan={2}>Hard Chromate</td>
                        <td>硬質クロームメッキ施工</td>
                        <td rowSpan={2}>S45C, STKM16A, etc.</td>
                        <td rowSpan={2}>Shafts, Shoes, etc.</td>
                        <td rowSpan={2}>Good for anti-corrosion and anti-friction.</td>
                      </tr>
                      <tr><td>(Plating thickness &gt;0.03mm)</td></tr>
                      <tr>
                        <td>Chrome Plating</td>
                        <td>クロームメッキ施工</td>
                        <td>All materials</td>
                        <td>Handles, Tools</td>
                        <td>Good for decoration and anti-corrosion.</td>
                      </tr>
                      <tr>
                        <td>Nickel Plating</td>
                        <td>ニッケルメッキ施工</td>
                        <td>All materials</td>
                        <td>Levers, Covers</td>
                        <td>Low-cost decorative process.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>


            <div className={`instruction-step ${currentIndex === 3 ? "reading-active" : ""}`} data-reading-index="3">
              <div className="step-header">
                <span className="step-number">2</span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text="Special Notes & Documentation"
                  isActive={isSpeaking && currentIndex === 3}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <KaraokeLessonText
                  className="p-flush mb-4"
                  text={coatingSteps[1]}
                  isActive={isSpeaking && currentIndex === 3}
                  currentCharIndex={currentCharIndex}
                />
                <img src={specialNotesImg} alt="Special Notes Interface" className="software-screenshot screenshot-wide" />
              </div>
            </div>


            <div className={`instruction-step ${currentIndex === 4 ? "reading-active" : ""}`} data-reading-index="4">
              <div className="step-header">
                <span className="step-number">3</span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text="Precision Management (Copy / Move)"
                  isActive={isSpeaking && currentIndex === 4}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <div className="red-text mb-4">
                  <KaraokeLessonText
                    text={coatingSteps[2]}
                    isActive={isSpeaking && currentIndex === 4}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
                <img src={copyMoveImg} alt="Drafting Commands" className="software-screenshot screenshot-wide" />
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

export default SurfaceCoatingLesson;
