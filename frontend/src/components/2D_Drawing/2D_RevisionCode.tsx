import React from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ReadAloudButton } from "../ReadAloudButton";
import { useLessonCore } from "../../hooks/useLessonCore";

import "../../styles/2D_Drawing/CourseLesson.css";

/* Import images */
import img1 from "../../assets/2D_Image_File/2D_revision_code.png";
import imgA1 from "../../assets/2D_Image_File/2D_revision_code_a1.png";
import imgA2 from "../../assets/2D_Image_File/2D_revision_code_a2.png";
import imgA3 from "../../assets/2D_Image_File/2D_revision_code_a3.png";
import imgB from "../../assets/2D_Image_File/2D_revision_code_b.png";

interface RevisionCodeLessonProps {
  nextLabel?: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const RevisionCodeLesson: React.FC<RevisionCodeLessonProps> = ({
  onNextLesson,
  onPrevLesson,
  nextLabel
}) => {
  const { scrollProgress, containerRef, speak, stop, isSpeaking, currentIndex } = useLessonCore('2d-revision-code');

  const revisionSteps = [
    "Revision Awareness: Revisions occur when approved drawings need modifications due to fabrication discrepancies. It's critical to track these changes for engineering history.",
    "Revised Detail: Use the 'create delta' command to mark changes. Enter the delta character and place it near the modified feature. Remember to activate the specific local view where the change belongs.",
    "Revision Code: Update the revision history block to provide a clear record of what was changed, by whom, and when."
  ];

  const introSubtitle = "Tracking engineering changes and modifications using delta markers and history blocks.";

  return (
    <div className="course-lesson-container" ref={containerRef}>
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      <section className="lesson-intro">
        <h3 className={`section-title ${currentIndex === 0 ? "reading-active" : ""}`} data-reading-index="0">
          23. REVISION CODE AND HISTORY
          <ReadAloudButton isSpeaking={isSpeaking} onStart={() => {
            const introTitle = "23. REVISION CODE AND HISTORY";
            speak([introTitle, introSubtitle, ...revisionSteps]);
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
              <div className="info-box">
                <p className="p-flush"><strong className="red-text">Revision</strong> occurs when approved drawings require modification due to fabrication discrepancies.</p>
              </div>
              <img src={img1} alt="Revision Code and History Overview" className="software-screenshot screenshot-wide" style={{ marginTop: "1.5rem" }} />
            </div>

            <div className="section-divider"></div>

            <div className={`instruction-step ${currentIndex === 3 ? "reading-active" : ""}`} data-reading-index="3">
              <div className="step-header" style={{ marginBottom: "1rem" }}>
                <span className="step-number">a.</span>
                <span className="step-label">Revised Detail</span>
              </div>
              <div className="flex-row" style={{ gridTemplateColumns: '1fr 1fr', gap: "1rem" }}>
                <img src={imgA1} alt="Revised Detail Menu" className="software-screenshot screenshot-wide" />
                <img src={imgA2} alt="Delta Input" className="software-screenshot screenshot-medium" />
              </div>
              <div className="flex-row" style={{ marginTop: "1rem", gap: "1rem" }}>
                <div className="info-box">
                  <p>1. Setup "create delta" command.</p>
                  <p>2. Enter delta character.</p>
                  <p>3. Place on proper location.</p>
                  <p className="red-text">Note: Local view must be activated.</p>
                </div>
                <img src={imgA3} alt="Delta Symbol Placement" className="software-screenshot" />
              </div>
            </div>

            <div className="section-divider"></div>

            <div className={`instruction-step ${currentIndex === 4 ? "reading-active" : ""}`} data-reading-index="4">
              <div className="step-header" style={{ marginBottom: "1rem" }}>
                <span className="step-number">b.</span>
                <span className="step-label">Revision Code</span>
              </div>
              <img src={imgB} alt="Revision Code History Block" className="software-screenshot screenshot-wide" />
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

export default RevisionCodeLesson;
