import React from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ReadAloudButton } from "../ReadAloudButton";
import { useLessonCore } from "../../hooks/useLessonCore";

import "../../styles/2D_Drawing/CourseLesson.css";

/* Import images */
import imgToolbar from "../../assets/2D_Image_File/2D_standard_part_library.png";
import imgSafetyColor from "../../assets/2D_Image_File/2D_standard_part_library_safety_color.png";
import imgRevHistory1 from "../../assets/2D_Image_File/2D_standard_part_library_revision_history_1.jpg";
import imgRevHistory2 from "../../assets/2D_Image_File/2D_standard_part_library_revision_history_2.png";

interface StandardLibraryLessonProps {
  nextLabel?: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const StandardLibraryLesson: React.FC<StandardLibraryLessonProps> = ({
  onNextLesson,
  onPrevLesson,
  nextLabel
}) => {
  const { scrollProgress, containerRef, speak, stop, isSpeaking, currentIndex } = useLessonCore('2d-standard-library');

  const librarySteps = [
    "Safety Color: Use the part library to insert safety color notes for rotating or moving parts. Activate the global view, choose the safety color template, and place it on the lower right of your drawing. Note that standard machine colors don't require specific notes.",
    "Revision History: To track changes, select the revision history template from the part library while in global view. Place it in its designated location and edit the details based on the reference instructions."
  ];

  const introSubtitle = "Utilizing pre-defined templates for safety notes, revision history, and standard annotations.";

  return (
    <div className="course-lesson-container" ref={containerRef}>
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      <section className="lesson-intro">
        <h3 className={`section-title ${currentIndex === 0 ? "reading-active" : ""}`} data-reading-index="0">
          24. STANDARD PART LIBRARY
          <ReadAloudButton isSpeaking={isSpeaking} onStart={() => {
            const introTitle = "24. STANDARD PART LIBRARY";
            speak([introTitle, introSubtitle, ...librarySteps]);
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
                <span className="step-number">a.</span>
                <span className="step-label">Safety Color</span>
              </div>
              <img src={imgToolbar} alt="Library Toolbar" className="software-screenshot screenshot-medium" />
              <div className="flex-row" style={{ marginTop: "1rem", gap: "1rem" }}>
                <div className="info-box">
                  <p>1. Global view must be activated.</p>
                  <p>2. Click "part library" command.</p>
                  <p>3. Choose "safetycolor note" template.</p>
                  <p>4. Designated position is on the lower right portion.</p>
                </div>
                <img src={imgSafetyColor} alt="Safety Color Template" className="software-screenshot" />
              </div>
            </div>

            <div className="section-divider"></div>

            <div className={`instruction-step ${currentIndex === 3 ? "reading-active" : ""}`} data-reading-index="3">
              <div className="step-header">
                <span className="step-number">b.</span>
                <span className="step-label">Revision History</span>
              </div>
              <div className="flex-row" style={{ gap: "1rem" }}>
                <div className="info-box">
                  <p>1. Global view must be activated.</p>
                  <p>2. Choose "revision history" from part library.</p>
                  <p>3. Place on designated location and edit details.</p>
                </div>
                <img src={imgRevHistory1} alt="Revision History Template" className="software-screenshot" />
              </div>
              <img src={imgRevHistory2} alt="Revision History Placement" className="software-screenshot screenshot-wide" style={{ marginTop: "1.5rem" }} />
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

export default StandardLibraryLesson;
