import React from "react";
import { ChevronLeft, ChevronRight, Layout } from 'lucide-react';
import { ReadAloudButton } from "../ReadAloudButton";
import { useLessonCore } from "../../hooks/useLessonCore";
import "../../styles/2D_Drawing/CourseLesson.css";

// --- Assets ---
import drawingTemplateImg from "../../assets/2D_Image_File/2D_create_orthographic_view_(1)_1.png";
import createViewImg from "../../assets/2D_Image_File/2D_create_orthographic_view_(1)_a.png";

import scalingImg from "../../assets/2D_Image_File/2D_create_orthographic_view_(1)_b.png";
import hiddenLineDialogImg from "../../assets/2D_Image_File/2D_create_orthographic_view_(2)_c.2.png";
import tangentLineDialogImg from "../../assets/2D_Image_File/2D_create_orthographic_view_(2)_d.2.png";

import highPrecisionDialogImg from "../../assets/2D_Image_File/2D_create_orthographic_view_(3)_e1.png";


interface OrthographicViewLessonProps {
  nextLabel?: string;
  subLessonId?: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}


const OrthographicViewLesson: React.FC<OrthographicViewLessonProps> = ({
  subLessonId = "2d-orthographic-1",
  onNextLesson,
  onPrevLesson, nextLabel }) => {
  const {
    scrollProgress,
    containerRef,
    speak,
    stop,
    isSpeaking,
    currentIndex
  } = useLessonCore(subLessonId);

  // --- Content Mapping ---
  const LESSON_DATA: Record<string, { title: string; steps: string[] }> = {
    '2d-orthographic-1': {
      title: 'CREATE ORTHOGRAPHIC VIEW (1)',
      steps: [
        "Drawing Template: Select and insert the standard KEMCO drawing template to begin your drafting process.",
        "Projection Method: KEMCO follows the Third Angle Projection method (standard for JIS and ANSI). In this method, the Top view is above the Front view, and the Right Side view is to the right.",
        "View Management: Use the tools to create standard orthographic views or delete unneeded ones from your project.",
        "Scaling: Set the scale via Projection Properties. Never use the toolbar for scaling, as it won't update dimensions correctly. Note that standard views scale together, while cross-sections and detail views must be scaled individually."
      ]
    },
    '2d-orthographic-2': {
      title: 'CREATE ORTHOGRAPHIC VIEW (2)',
      steps: [
        "Hidden Lines: Hidden lines aren't shown by default. Check the hidden line box in Projection Properties for each view where they are required.",
        "Tangent Lines: Use this to show or hide fillet lines. Like hidden lines, this must be enabled per view via the properties dialog."
      ]
    },
    '2d-orthographic-3': {
      title: 'CREATE ORTHOGRAPHIC VIEW (3)',
      steps: [
        "High Precision: Enable this for complex assemblies or small parts to prevent broken or missing lines. If one view requires it, it's best practice to apply it to all views for consistency."
      ]
    }
  };

  const currentLesson = LESSON_DATA[subLessonId] || { title: 'ORTHOGRAPHIC VIEW', steps: [] };

  return (
    <div className="course-lesson-container orthographic-view-lesson" ref={containerRef}>
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      <section className="lesson-intro">
        <h3 className="section-title">
          {currentLesson.title}
          <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(currentLesson.steps)}
            onStop={stop}
          />
        </h3>
        {currentLesson.steps.length === 0 && (
          <p className="p-flush">No content currently available for this section.</p>
        )}
      </section>

      <div className="lesson-grid single-card">
        <div className="lesson-card">
          {subLessonId === "2d-orthographic-1" && (
            <div className="tab-pane">
              <div className={`instruction-step ${currentIndex === 0 ? "reading-active" : ""}`}>
                <div className="step-header">
                  <span className="step-number">1</span>
                  <span className="step-label">INSERTING DRAWING TEMPLATE</span>
                </div>
                <div className="step-description">
                  <div>
                    <img src={drawingTemplateImg} alt="Inserting Drawing Template" className="software-screenshot screenshot-wide" />
                  </div>
                </div>
              </div>

              <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`}>
                <div className="step-header">
                  <span className="step-number">a</span>
                  <span className="step-label">CREATING ORTHOGRAPHIC VIEW / DELETE VIEWS</span>
                </div>
                <div className="step-description">
                  <div>
                    <img src={createViewImg} alt="Creating Orthographic Views" className="software-screenshot screenshot-wide" />
                  </div>
                </div>
              </div>

              <div className="section-divider" />

              <div className={`instruction-step ${currentIndex === 3 ? "reading-active" : ""}`}>
                <div className="step-header">
                  <span className="step-number">b</span>
                  <span className="step-label">SCALE</span>
                </div>
                <div className="step-description">
                  <p className="p-flush">Set the scale of selected view. When changing the scale, take note to always use the Projection Properties.</p>
                  <p className="p-flush"><em>Do not change the scale on the tool bar because the dimensions and notes will not update according to the set scale.</em></p>
                  <div>
                    <img src={scalingImg} alt="Scaling and Projection Properties" className="software-screenshot screenshot-wide" />
                  </div>
                  <div className="info-box" style={{ marginTop: "2rem" }}>
                    <p className="p-flush red-text">Note: When changing the scale of a standard view, other standard views also change the scale. <br /> Cross section view and detail view need to chnage the scale separately.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {subLessonId === "2d-orthographic-2" && (
            <div className="tab-pane">
              <div className={`instruction-step ${currentIndex === 0 ? "reading-active" : ""}`}>
                <div className="step-header">
                  <span className="step-number">c</span>
                  <span className="step-label">Hidden Line</span>
                </div>
                <div className="step-description">
                  <div className="flex-row--top">
                    <div className="annotation-pointing-box">
                      <p style={{ marginBottom: "1rem" }}>The hidden line is not automatically shown when orthographic view was inserted. It can be shown through the Projection Properties.</p>
                    </div>
                    <img src={hiddenLineDialogImg} alt="Hidden Line Dialog" className="software-screenshot screenshot-wide" />
                  </div>
                </div>
              </div>

              <div className="section-divider-sm" />

              <div className={`instruction-step ${currentIndex === 1 ? "reading-active" : ""}`}>
                <div className="step-header">
                  <span className="step-number">d</span>
                  <span className="step-label">Tangent Line</span>
                </div>
                <div className="step-description">
                  <div className="flex-row--top">
                    <div className="annotation-pointing-box">
                      <p className="p-flush" style={{ marginBottom: "1rem" }}>Shows and hides lines from fillets of a view. The tangent lines from chamfers are shown automatically during insertion of orthographic view.</p>
                    </div>
                    <img src={tangentLineDialogImg} alt="Tangent Line Dialog" className="software-screenshot screenshot-wide" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {subLessonId === "2d-orthographic-3" && (
            <div className="tab-pane">
              <div className={`instruction-step ${currentIndex === 0 ? "reading-active" : ""}`}>
                <div className="step-header">
                  <span className="step-number">e</span>
                  <span className="step-label">High Precision</span>
                </div>
                <div className="step-description">
                  <div className="flex-row--top">
                    <div className="annotation-pointing-box">
                      <p className="p-flush" style={{ marginBottom: "1rem" }}>Used for better projection of small components or parts on a part or assembly. When High precision is unchecked, some lines in the detail drawing are broken and some lines are missing. This is commonly used on assembly drawings but can also be used for parts, if necessary.</p>
                    </div>
                    <div>
                      <img src={highPrecisionDialogImg} alt="High Precision Dialog" className="software-screenshot screenshot-wide" />
                    </div>
                  </div>
                </div>
              </div>
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

export default OrthographicViewLesson;



