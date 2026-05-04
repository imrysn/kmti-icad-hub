import React from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ReadAloudButton } from "../ReadAloudButton";
import { useLessonCore } from "../../hooks/useLessonCore";
import { KaraokeLessonText } from "../KaraokeLessonText";

import "../../styles/2D_Drawing/CourseLesson.css";

/* Importing assets for Orthographic View */
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
  onPrevLesson,
  nextLabel
}) => {
  const { scrollProgress, containerRef, speak, stop, isSpeaking, currentIndex, currentCharIndex } = useLessonCore(subLessonId);

  const LESSON_DATA: Record<string, { title: string; subtitle: string; steps: string[] }> = {
    '2d-orthographic-1': {
      title: 'CREATE ORTHOGRAPHIC VIEW (1)',
      subtitle: 'Creating and configuring primary projection views using Third Angle Projection standards.',
      steps: [
        "Drawing Template: Select and insert the standard KEMCO drawing template to begin your drafting process.",
        "Projection Method: KEMCO follows the Third Angle Projection method. The Top view is above the Front view, and the Right Side view is to the right.",
        "View Management: Use the tools to create standard orthographic views or delete unneeded ones from your project.",
        "Scaling: Set the scale via Projection Properties. Never use the toolbar for scaling, as it won't update dimensions correctly."
      ]
    },
    '2d-orthographic-2': {
      title: 'CREATE ORTHOGRAPHIC VIEW (2)',
      subtitle: 'Managing hidden lines and tangent line visibility for technical clarity.',
      steps: [
        "Hidden Lines: Hidden lines aren't shown by default. Check the hidden line box in Projection Properties for each view where they are required.",
        "Tangent Lines: Use this to show or hide fillet lines. Tangent lines from chamfers are shown automatically during view insertion."
      ]
    },
    '2d-orthographic-3': {
      title: 'CREATE ORTHOGRAPHIC VIEW (3)',
      subtitle: 'Applying high precision rendering for complex assemblies and small parts.',
      steps: [
        "High Precision: Enable this for complex assemblies or small parts to prevent broken or missing lines. Best practice is to apply it to all views for consistency."
      ]
    }
  };

  const currentLesson = LESSON_DATA[subLessonId] || { title: 'ORTHOGRAPHIC VIEW', subtitle: '', steps: [] };

  return (
    <div className={`course-lesson-container`} ref={containerRef}>
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      <section className="lesson-intro">
        <h3 className={`section-title ${currentIndex === 0 ? "reading-active" : ""}`} data-reading-index="0">
          <KaraokeLessonText
            as="span"
            text={currentLesson.title}
            isActive={isSpeaking && currentIndex === 0}
            currentCharIndex={currentCharIndex}
          />
          <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak([currentLesson.title, currentLesson.subtitle, ...currentLesson.steps])}
            onStop={stop}
          />
        </h3>
        <KaraokeLessonText
          className={`lesson-subtitle ${currentIndex === 1 ? "reading-active" : ""}`}
          data-reading-index="1"
          text={currentLesson.subtitle}
          isActive={isSpeaking && currentIndex === 1}
          currentCharIndex={currentCharIndex}
        />
      </section>

      <div className="lesson-grid single-card">
        <div className="lesson-card">
          {subLessonId === "2d-orthographic-1" ? (
            <div className="flex-col">
              <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2">
                <div className="step-header">
                  <span className="step-number">1.</span>
                  <KaraokeLessonText
                    as="span"
                    className="step-label"
                    text={currentLesson.steps[0].split(":")[0]}
                    isActive={isSpeaking && currentIndex === 2}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
                <img src={drawingTemplateImg} alt="Inserting Drawing Template" className="software-screenshot screenshot-wide" />
              </div>

              <div className="section-divider"></div>

              <div className={`instruction-step ${currentIndex === 3 ? "reading-active" : ""}`} data-reading-index="3">
                <div className="info-box">
                  <KaraokeLessonText
                    text={currentLesson.steps[1]}
                    isActive={isSpeaking && currentIndex === 3}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
              </div>

              <div className="section-divider"></div>

              <div className={`instruction-step ${currentIndex === 4 ? "reading-active" : ""}`} data-reading-index="4">
                <div className="step-header">
                  <span className="step-number">a.</span>
                  <KaraokeLessonText
                    as="span"
                    className="step-label"
                    text={currentLesson.steps[2].split(":")[0]}
                    isActive={isSpeaking && currentIndex === 4}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
                <img src={createViewImg} alt="Creating Orthographic Views" className="software-screenshot screenshot-wide" />
              </div>

              <div className="section-divider"></div>

              <div className={`instruction-step ${currentIndex === 5 ? "reading-active" : ""}`} data-reading-index="5">
                <div className="step-header">
                  <span className="step-number">b.</span>
                  <KaraokeLessonText
                    as="span"
                    className="step-label"
                    text="SCALE"
                    isActive={isSpeaking && currentIndex === 5}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
                <KaraokeLessonText
                  className="p-flush"
                  text="Set the scale via Projection Properties. Do not use the toolbar for scaling, as it won't update dimensions correctly."
                  isActive={isSpeaking && currentIndex === 5}
                  currentCharIndex={currentCharIndex}
                />
                <img src={scalingImg} alt="Scaling and Projection Properties" className="software-screenshot screenshot-wide" style={{ marginTop: "1rem" }} />
              </div>
            </div>
          ) : subLessonId === "2d-orthographic-2" ? (
            <div className="flex-col">
              <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2">
                <div className="step-header">
                  <span className="step-number">c.</span>
                  <KaraokeLessonText
                    as="span"
                    className="step-label"
                    text="Hidden Line"
                    isActive={isSpeaking && currentIndex === 2}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
                <div className="info-box" style={{ marginBottom: "1rem" }}>
                  <KaraokeLessonText
                    className="p-flush"
                    text="The hidden line is not automatically shown. Enable it through the Projection Properties for each required view."
                    isActive={isSpeaking && currentIndex === 2}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
                <img src={hiddenLineDialogImg} alt="Hidden Line Dialog" className="software-screenshot screenshot-wide" />
              </div>

              <div className="section-divider"></div>

              <div className={`instruction-step ${currentIndex === 3 ? "reading-active" : ""}`} data-reading-index="3">
                <div className="step-header">
                  <span className="step-number">d.</span>
                  <KaraokeLessonText
                    as="span"
                    className="step-label"
                    text="Tangent Line"
                    isActive={isSpeaking && currentIndex === 3}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
                <div className="info-box" style={{ marginBottom: "1rem" }}>
                  <KaraokeLessonText
                    className="p-flush"
                    text="Shows and hides lines from fillets. Tangent lines from chamfers are shown automatically during view insertion."
                    isActive={isSpeaking && currentIndex === 3}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
                <img src={tangentLineDialogImg} alt="Tangent Line Dialog" className="software-screenshot screenshot-wide" />
              </div>
            </div>
          ) : subLessonId === "2d-orthographic-3" ? (
            <div className="flex-col">
              <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2">
                <div className="step-header">
                  <span className="step-number">e.</span>
                  <KaraokeLessonText
                    as="span"
                    className="step-label"
                    text="High Precision"
                    isActive={isSpeaking && currentIndex === 2}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
                <div className="info-box" style={{ marginBottom: "1rem" }}>
                  <KaraokeLessonText
                    className="p-flush"
                    text="Used for better projection of small components. Prevents broken or missing lines in detail drawings of complex parts or assemblies."
                    isActive={isSpeaking && currentIndex === 2}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
                <img src={highPrecisionDialogImg} alt="High Precision Dialog" className="software-screenshot screenshot-wide" />
              </div>
            </div>
          ) : null}

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

