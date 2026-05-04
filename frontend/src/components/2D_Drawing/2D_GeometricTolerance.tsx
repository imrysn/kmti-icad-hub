import React from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ReadAloudButton } from "../ReadAloudButton";
import { useLessonCore } from "../../hooks/useLessonCore";

import "../../styles/2D_Drawing/CourseLesson.css";

/* Importing assets for Geometric Tolerance */
import geoTolMainImg from "../../assets/2D_Image_File/2D_geometric_tolerance(1).png";
import datumImg from "../../assets/2D_Image_File/D_geometric_tolerance(2)_datum_1.png";

interface GeometricToleranceLessonProps {
  nextLabel?: string;
  subLessonId?: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const GeometricToleranceLesson: React.FC<GeometricToleranceLessonProps> = ({
  subLessonId = "2d-geometric-tol-1",
  onNextLesson,
  onPrevLesson,
  nextLabel
}) => {
  const { scrollProgress, containerRef, speak, stop, isSpeaking, currentIndex } = useLessonCore(subLessonId);

  const geoTol1Steps = [
    "Tolerance Application: Select the tolerance command from the menu. Configure the characteristics, value, and datum references in the dialog box, then place the symbol on your technical feature.",
    "Datum Definition: Datums establish the reference points for your tolerances. Apply the datum triangle to your primary surfaces to ensure measurement consistency during fabrication."
  ];

  const geoTol2Steps = [
    "Advanced Tolerancing: Use complex tolerance frames for composite requirements. Ensure all datum references (A, B, C) are clearly defined and correspond to your design intent."
  ];

  return (
    <div className="course-lesson-container" ref={containerRef}>
      {/* Sticky Progress Bar */}
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      <section className="lesson-intro">
        <h3 className={`section-title ${currentIndex === 0 ? "reading-active" : ""}`} data-reading-index="0">
          9. GEOMETRIC TOLERANCE
          <ReadAloudButton isSpeaking={isSpeaking} onStart={() => {
            const introTitle = "9. GEOMETRIC TOLERANCE";
            const introSubtitle = "Applying geometric tolerances and datum references to ensure precision part fabrication.";
            const currentSteps = subLessonId === "2d-geometric-tol-1" ? geoTol1Steps : geoTol2Steps;
            speak([introTitle, introSubtitle, ...currentSteps]);
          }}
            onStop={stop}
          />
        </h3>
        <p className={`lesson-subtitle ${currentIndex === 1 ? "reading-active" : ""}`} data-reading-index="1">
          Applying geometric tolerances and datum references to ensure precision part fabrication.
        </p>
      </section>

      <div className="lesson-grid single-card">
        <div className="lesson-card">
          {subLessonId === "2d-geometric-tol-1" ? (
            <div className="flex-col">
              <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2">
                <div className="step-header" style={{ marginBottom: "1rem" }}>
                  <span className="step-number">9.</span>
                  <span className="step-label">Geometric Tolerance</span>
                </div>
                <div>
                  <img src={geoTolMainImg} alt="Geometric Tolerance Dialog" className="software-screenshot screenshot-wide" />
                </div>
              </div>

              <div className="section-divider"></div>

              <div className={`instruction-step ${currentIndex === 3 ? "reading-active" : ""}`} data-reading-index="3">
                <div className="step-header" style={{ marginBottom: "1rem" }}>
                  <span className="step-number">a.</span>
                  <span className="step-label">Datum</span>
                </div>
                <div className="flex-col">
                  <div className="image-wrapper-flush">
                    <img src={datumImg} alt="Datum Triangle Application" className="software-screenshot screenshot-wide" />
                  </div>
                  <div className="info-box" style={{ marginTop: "1rem" }}>
                    <p className="p-flush">Select the datum command and place the reference triangle on the required surface or dimension line.</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2">
              <div className="content-placeholder">
                <p>Advanced Tolerancing content for {subLessonId} is being prepared.</p>
              </div>
            </div>
          )}

          {/* Navigation */}
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

export default GeometricToleranceLesson;
