import React, { useEffect } from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLessonCore } from "../../../../hooks/useLessonCore";
import { useTTSAutoplay } from "../../../../hooks/useTTSAutoplay";
import { KaraokeLessonText } from "../../../KaraokeLessonText";
import "../../../../styles/2D_Drawing/CourseLesson.css";

/* Static Assets */
import steelPipe1Img from "../../../../assets/Standard/Kemco_JIS_Standard/structural_steel_pipe1.png";
import steelPipe2Img from "../../../../assets/Standard/Kemco_JIS_Standard/structural_steel_pipe2.png";
import steelPipe3Img from "../../../../assets/Standard/Kemco_JIS_Standard/structural_steel_pipe3.png";

interface SteelPipesLessonProps {
  nextLabel?: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const reminderSteps = [
  "S45C Structural Steel Pipe - Inner Diameter Specified",
  "(Akashi-Approve) (STKM16A)",
  "Please review the specifications for the structural steel pipe.",
];

const SteelPipesLesson: React.FC<SteelPipesLessonProps> = ({
  onNextLesson,
  onPrevLesson,
  nextLabel,
}) => {
  const {
    scrollProgress,
    containerRef,
    speak,
    stop,
    isSpeaking,
    currentIndex,
    currentCharIndex,
    registerText,
  } = useLessonCore("steel-pipes");

  useEffect(() => {
    registerText(reminderSteps, 0);
  }, [registerText]);

  const tabsList = [{ id: "steel-pipes" }];

  useTTSAutoplay(
    isSpeaking,
    currentIndex,
    "steel-pipes",
    reminderSteps.length,
    tabsList,
    () => { if (onNextLesson) onNextLesson(); },
    speak,
    reminderSteps,
    0
  );

  const handleNext = () => {
    stop();
    if (onNextLesson) onNextLesson();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePrev = () => {
    stop();
    if (onPrevLesson) onPrevLesson();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="course-lesson-container" ref={containerRef}>
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      <section className="lesson-intro">
        <KaraokeLessonText
          as="h3"
          className={`section-title ${currentIndex === 0 ? "reading-active" : ""}`}
          data-reading-index="0"
          text="S45C Structural Steel Pipe - Inner Diameter Specified"
          isActive={isSpeaking && currentIndex === 0}
          currentCharIndex={currentCharIndex}
        />
        <KaraokeLessonText
          className={`lesson-subtitle ${currentIndex === 1 ? "reading-active" : ""}`}
          data-reading-index="1"
          text="(Akashi-Approve) (STKM16A)"
          isActive={isSpeaking && currentIndex === 1}
          currentCharIndex={currentCharIndex}
        />
      </section>

      <div className="lesson-grid single-card">
        <div className="lesson-card tab-content fade-in">
          {/* Step 1 */}
          <div
            className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`}
            data-reading-index="2"
          >
            <div className="step-header">
              <span className="step-number">1 </span>
              <KaraokeLessonText
                as="span"
                className="step-label"
                text="Please review the specifications for the structural steel pipe."
                isActive={isSpeaking && currentIndex === 2}
                currentCharIndex={currentCharIndex}
              />
            </div>
          </div>

          {/* ── Image 1 ── */}
          <div className="step-description" style={{ marginTop: "0.5rem", alignItems: "center" }}>
            <img
              src={steelPipe1Img}
              alt="Structural Steel Pipe 1"
              className="software-screenshot"
              style={{ maxWidth: "70%", height: "auto", objectFit: "contain", borderRadius: "8px" }}
            />
          </div>

          {/* ── Image 2 ── */}
          <div className="step-description" style={{ marginTop: "0.5rem", alignItems: "center" }}>
            <img
              src={steelPipe2Img}
              alt="Structural Steel Pipe 2"
              className="software-screenshot"
              style={{ maxWidth: "70%", height: "auto", objectFit: "contain", borderRadius: "8px" }}
            />
          </div>

          {/* ── Image 3 ── */}
          <div className="step-description" style={{ marginTop: "0.5rem", alignItems: "center" }}>
            <img
              src={steelPipe3Img}
              alt="Structural Steel Pipe 3"
              className="software-screenshot"
              style={{ maxWidth: "70%", height: "auto", objectFit: "contain", borderRadius: "8px" }}
            />
          </div>

          {/* Page Navigation */}
          <div className="lesson-navigation mt-12">
            <button
              className="nav-button"
              onClick={handlePrev}
              disabled={!onPrevLesson}
            >
              <ChevronLeft size={18} /> Previous
            </button>
            <button className="nav-button next" onClick={handleNext}>
              {nextLabel || "Next Lesson"} <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SteelPipesLesson;
