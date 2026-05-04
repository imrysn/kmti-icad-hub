import React from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ReadAloudButton } from "../ReadAloudButton";
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
  const { scrollProgress, containerRef, speak, stop, isSpeaking, currentIndex } = useLessonCore('2d-welding-symbol');

  const weldingSteps = [
    "Welding Symbols: Before adding a symbol, apply welding hatches as a visual representation. The arrow line acts as your welding torch. Keep leg lengths at sixty percent of the thinner plate thickness unless the design specifies otherwise.",
    "Standard Notes: These are located in the upper left corner. They cover mandatory requirements like chamfering holes, deburring corners, and ensuring parts are free from dust. While the tapping note can be removed if not needed, text properties must never be altered."
  ];

  const introSubtitle = "Procedures for applying welding symbols, hatches, and standard notes.";

  return (
    <div className="course-lesson-container" ref={containerRef}>
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      <section className="lesson-intro">
        <h3 className={`section-title ${currentIndex === 0 ? "reading-active" : ""}`} data-reading-index="0">
          WELDING SYMBOL / NOTES
          <ReadAloudButton isSpeaking={isSpeaking} onStart={() => {
            const introTitle = "WELDING SYMBOL / NOTES";
            speak([introTitle, introSubtitle, ...weldingSteps]);
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
              <div className="step-header">
                <span className="step-number">13.</span>
                <span className="step-label">Welding Symbol</span>
              </div>
              <img src={weldingSymbolMainImg} alt="Welding Symbol Menu" className="software-screenshot screenshot-wide" />
              <img src={weldingSymbolNotesImg} alt="Welding Hatches" className="software-screenshot screenshot-wide" style={{ margin: "2rem 0" }} />
              <div className="info-box">
                <p>※ Apply welding hatches first. Leg length is 60% of plate thickness (thinner side).</p>
                <p>※ Arrow line acts as a welding torch.</p>
              </div>
            </div>

            <div className="section-divider"></div>

            <div className={`instruction-step ${currentIndex === 3 ? "reading-active" : ""}`} data-reading-index="3">
              <div className="step-header">
                <span className="step-number">14.</span>
                <span className="step-label">Notes</span>
              </div>
              <p className="p-flush">Notes are located in the upper left corner.</p>
              <div className="flex-row" style={{ marginTop: "1rem", gap: "1rem" }}>
                <img src={standardNotesImg} alt="Standard Notes" className="software-screenshot screenshot-wide" />
                <div className="info-box">
                  <p className="red-text"><strong>Standard Notes:</strong></p>
                  <p>1. Drill holes shall be chamfered.</p>
                  <p>2. Unspecified corners slightly chamfered.</p>
                  <p>3. Burrs and dust must not exist.</p>
                </div>
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

export default WeldingSymbolLesson;
