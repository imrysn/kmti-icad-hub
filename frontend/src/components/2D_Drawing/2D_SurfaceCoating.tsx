import React from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ReadAloudButton } from "../ReadAloudButton";
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
  const { scrollProgress, containerRef, speak, stop, isSpeaking, currentIndex } = useLessonCore('2d-surface-coating');

  const coatingSteps = [
    "Coating Specifications: Review the technical table for surface finishing processes. Ensure the chosen coating matches the material requirements for durability and corrosion resistance.",
    "Special Notes: Use special notes for heat treatments, welding instructions, or specific part requirements. If multiple notes are needed, arrange them chronologically by the manufacturing sequence, ensuring text properties match standard drafting notes.",
    "Copy and Move: These commands help organize your drawing. Copy multiplies entities, while move simply changes their location. Use reference points P1 and P2 to precisely reposition your technical details."
  ];

  const introSubtitle = "Technical specifications for surface finishing processes and annotation management.";

  return (
    <div className="course-lesson-container" ref={containerRef}>
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      <section className="lesson-intro">
        <h3 className={`section-title ${currentIndex === 0 ? "reading-active" : ""}`} data-reading-index="0">
          SURFACE COATING
          <ReadAloudButton isSpeaking={isSpeaking} onStart={() => {
            const introTitle = "SURFACE COATING";
            speak([introTitle, introSubtitle, ...coatingSteps]);
          }}
            onStop={stop}
          />
        </h3>
        <p className={`lesson-subtitle ${currentIndex === 1 ? "reading-active" : ""}`} data-reading-index="1">
          {introSubtitle}
        </p>
      </section>

      <div className="lesson-grid single-card">
        <div className="lesson-card">
          <div className="flex-col">
            <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2">
              <div className="lesson-table-container">
                <table className="lesson-table">
                  <thead>
                    <tr>
                      <th>Kind of Process</th>
                      <th>Indication of Drawing</th>
                      <th>Applicable Material</th>
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

            <div className="section-divider"></div>

            <div className={`instruction-step ${currentIndex === 3 ? "reading-active" : ""}`} data-reading-index="3">
              <div className="step-header" style={{ marginBottom: "1rem" }}>
                <span className="step-number">b.</span>
                <span className="step-label">Special Notes</span>
              </div>
              <img src={specialNotesImg} alt="Special Notes Location" className="software-screenshot screenshot-wide" />
            </div>

            <div className="section-divider"></div>

            <div className={`instruction-step ${currentIndex === 4 ? "reading-active" : ""}`} data-reading-index="4">
              <div className="step-header" style={{ marginBottom: "1rem" }}>
                <span className="step-number">c.</span>
                <span className="step-label">Copy / Move</span>
              </div>
              <img src={copyMoveImg} alt="Copy and Move Command" className="software-screenshot screenshot-wide" />
              <div className="info-box" style={{ marginTop: "1rem" }}>
                <p>Copy multiplies quantity while Move changes location. Use reference points for precision.</p>
              </div>
            </div>
          </div>

          <div className="lesson-navigation">
            <button className="nav-button" onClick={onPrevLesson}>
              <ChevronLeft size={18} /> Previous
            </button>
            <button className="nav-button next" onClick={onNextLesson}>
              {nextLabel || 'Next Lesson'} <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurfaceCoatingLesson;
