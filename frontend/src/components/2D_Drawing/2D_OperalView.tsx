import React from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ReadAloudButton } from "../ReadAloudButton";
import { useLessonCore } from "../../hooks/useLessonCore";

import "../../styles/2D_Drawing/CourseLesson.css";

/* Importing assets for Operate View (1) */
import operateView1ImgA from "../../assets/2D_Image_File/2D_operate_view(1)_a.png";
import operateView1ImgA1 from "../../assets/2D_Image_File/2D_operate_view(1)_a1.png";
import operateView1ImgB2 from "../../assets/2D_Image_File/2D_operate_view(1)_b2.png";

/* Importing assets for Operate View (2) */
import operateView2ImgB1 from "../../assets/2D_Image_File/2D_operate_view(2)_b_1.png";
import operateView2ImgB2 from "../../assets/2D_Image_File/2D_operate_view(2)_b_2.jpg";
import operateView2ImgB3 from "../../assets/2D_Image_File/2D_operate_view(2)_b2_3.jpg";

interface OperalViewLessonProps {
  nextLabel?: string;
  subLessonId?: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const OperalViewLesson: React.FC<OperalViewLessonProps> = ({
  subLessonId = "2d-operal-view-1",
  onNextLesson,
  onPrevLesson,
  nextLabel
}) => {
  const { scrollProgress, containerRef, speak, stop, isSpeaking, currentIndex } = useLessonCore(subLessonId);

  const operateSteps1 = [
    "Move View: Use this command to reposition your technical views on the template. For Isometric views, you can move them freely. For Orthographic views, use the alignment tools to ensure they remain parallel and correctly projected from one another."
  ];

  const operateSteps2 = [
    "Alignment Control: Use the alignment operation to maintain projection integrity between related views. You can lock or unlock alignment based on the layout requirements of the operation drawing."
  ];

  const introSubtitle = "Manipulating drafting views including moving, aligning, and managing projections.";

  return (
    <div className="course-lesson-container" ref={containerRef}>
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      <section className="lesson-intro">
        <h3 className={`section-title ${currentIndex === 0 ? "reading-active" : ""}`} data-reading-index="0">
          21. OPERATE VIEW
          <ReadAloudButton isSpeaking={isSpeaking} onStart={() => {
            const introTitle = "21. OPERATE VIEW";
            const currentSteps = subLessonId === "2d-operal-view-1" ? operateSteps1 : operateSteps2;
            speak([introTitle, introSubtitle, ...currentSteps]);
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
          {subLessonId === "2d-operal-view-1" ? (
            <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2">
              <div id="move-view">
                <div className="step-header" style={{ marginBottom: "1rem" }}>
                  <span className="step-number">a.</span>
                  <span className="step-label">Move view</span>
                </div>
                <img src={operateView1ImgA} alt="Move View" className="software-screenshot screenshot-medium" />
              </div>

              <div className="section-divider"></div>

              <div id="isometric-view-move">
                <div className="step-header" style={{ marginBottom: "1rem" }}>
                  <span className="step-number">a.1</span>
                  <span className="step-label">Isometric view</span>
                </div>
                <div className="info-box" style={{ marginBottom: "1rem" }}>
                  <p className="p-flush">Position of isometric view must not be too close, too far, or overlap with the orthographic view.</p>
                </div>
                <img src={operateView1ImgA1} alt="Isometric View Move" className="software-screenshot screenshot-wide" />
              </div>

              <div className="section-divider"></div>

              <div id="orthographic-view-move">
                <div className="step-header" style={{ marginBottom: "1rem" }}>
                  <span className="step-number">a.2</span>
                  <span className="step-label">Orthographic view</span>
                </div>
                <div className="info-box" style={{ marginBottom: "1rem" }}>
                  <p className="p-flush">All projection views must always be aligned. If the projected views are aligned, moving one will move all simultaneously.</p>
                </div>
                <img src={operateView1ImgB2} alt="Orthographic View Move" className="software-screenshot screenshot-wide" />
              </div>
            </div>
          ) : subLessonId === "2d-operal-view-2" ? (
            <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2">
              <div id="operation-alignment">
                <div className="info-box" style={{ marginBottom: "2rem" }}>
                  <p className="p-flush">If the views are not aligned, use the create-three-view icon to adjust and align. Aligning lines will appear as guides.</p>
                </div>
                <img src={operateView2ImgB3} alt="View Alignment Step 3" className="software-screenshot screenshot-wide" style={{ marginBottom: "2rem" }} />
                
                <div className="step-header" style={{ marginBottom: "1rem" }}>
                  <span className="step-number">b.</span>
                  <span className="step-label">Delete View</span>
                </div>
                <img src={operateView2ImgB1} alt="Delete View Command" className="software-screenshot screenshot-medium" />
                <div className="info-box" style={{ marginTop: "1rem" }}>
                  <p className="p-flush">Select the unnecessary view, click GO, and confirm in the dialog box.</p>
                </div>
                <img src={operateView2ImgB2} alt="Delete View Confirmation" className="software-screenshot screenshot-wide" style={{ marginTop: "1rem" }} />
              </div>
            </div>
          ) : (
            <div className="content-placeholder">
              <p>Lesson content for {subLessonId} is being prepared.</p>
            </div>
          )}

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

export default OperalViewLesson;
