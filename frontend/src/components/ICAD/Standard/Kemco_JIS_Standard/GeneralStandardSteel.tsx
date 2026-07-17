import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';
import { useLessonCore } from "../../../../hooks/useLessonCore";
import { useTTSAutoplay } from "../../../../hooks/useTTSAutoplay";
import { KaraokeLessonText } from "../../../KaraokeLessonText";
import "../../../../styles/2D_Drawing/CourseLesson.css";

/* Static Assets — Images 1, 2, 3 */
import steelTable1Img from "../../../../assets/Standard/Kemco_JIS_Standard/steel_material_table1.png";
import steelTable2Img from "../../../../assets/Standard/Kemco_JIS_Standard/steel_material_table2.png";
import steelTable3Img from "../../../../assets/Standard/Kemco_JIS_Standard/steel_material_table3.png";

/* Gallery Assets — Image 4 (Flat Bar) */
import steelTable4Img from "../../../../assets/Standard/Kemco_JIS_Standard/steel_material_table4.png";

/* Gallery Assets — Image 5 (Round Bar) */
import steelTable5Img from "../../../../assets/Standard/Kemco_JIS_Standard/steel_material_table5.png";

interface GeneralStandardSteelLessonProps {
  nextLabel?: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const reminderSteps = [
  "General Standard Steel Material Table",
  "REMINDER:",
  "Please review the General Standard Steel Material Table.",
  "Ensure standard steel materials are selected according to this table.",
];

const GeneralStandardSteelLesson: React.FC<GeneralStandardSteelLessonProps> = ({
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
  } = useLessonCore("kemco-general-standard-steel");

  useEffect(() => {
    registerText(reminderSteps, 0);
  }, [registerText]);

  const tabsList = [{ id: "kemco-general-standard-steel" }];

  useTTSAutoplay(
    isSpeaking,
    currentIndex,
    "kemco-general-standard-steel",
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
          text="General Standard Steel Material Table"
          isActive={isSpeaking && currentIndex === 0}
          currentCharIndex={currentCharIndex}
        />
        <KaraokeLessonText
          className={`lesson-subtitle ${currentIndex === 1 ? "reading-active" : ""}`}
          data-reading-index="1"
          text="REMINDER:"
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
                text="Please review the General Standard Steel Material Table."
                isActive={isSpeaking && currentIndex === 2}
                currentCharIndex={currentCharIndex}
              />
            </div>
          </div>

          {/* Step 2 */}
          <div
            className={`instruction-step ${currentIndex === 3 ? "reading-active" : ""}`}
            data-reading-index="3"
          >
            <div className="step-header">
              <span className="step-number">2 </span>
              <KaraokeLessonText
                as="span"
                className="step-label"
                text="Ensure standard steel materials are selected according to this table."
                isActive={isSpeaking && currentIndex === 3}
                currentCharIndex={currentCharIndex}
              />
            </div>
          </div>

          {/* ── Image 1 ── */}
          <div className="step-description" style={{ marginTop: "2rem" }}>
            <img
              src={steelTable1Img}
              alt="Steel Material Table 1"
              className="software-screenshot mt-4"
              style={{ maxWidth: "100%", height: "auto", objectFit: "contain", borderRadius: "8px" }}
            />
          </div>

          {/* ── Image 2 ── */}
          <div className="step-description" style={{ marginTop: "2rem" }}>
            <img
              src={steelTable2Img}
              alt="Steel Material Table 2"
              className="software-screenshot mt-4"
              style={{ maxWidth: "100%", height: "auto", objectFit: "contain", borderRadius: "8px" }}
            />
          </div>

          {/* ── Image 3 ── */}
          <div className="step-description" style={{ marginTop: "2rem" }}>
            <img
              src={steelTable3Img}
              alt="Steel Material Table 3"
              className="software-screenshot mt-4"
              style={{ maxWidth: "100%", height: "auto", objectFit: "contain", borderRadius: "8px" }}
            />
          </div>

          {/* ── Flat Bar Gallery (Image 4 split into 4) ── */}
          <div
            className="gallery-section mt-12"
            style={{ borderTop: "1px solid var(--glass-border)", paddingTop: "3rem", width: "100%" }}
          >
            <h4
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                fontSize: "1.25rem",
                fontWeight: 700,
                marginBottom: "1.5rem",
                color: "var(--text-main)",
              }}
            >
              <ImageIcon size={20} style={{ color: "var(--color-primary)" }} /> Flat Bar Reference Table
            </h4>

      <div className="step-description" style={{ marginTop: "2rem" }}>
        <img
          src={steelTable4Img}
          alt="Flat Bar Reference Table"
          className="software-screenshot mt-4"
          style={{ maxWidth: "100%", height: "auto", objectFit: "contain", borderRadius: "8px" }}
        />
      </div>
  </div>

          {/* ── Round Bar Section Title ── */}
          <div
            className="gallery-section mt-12"
            style={{ borderTop: "1px solid var(--glass-border)", paddingTop: "3rem", width: "100%" }}
          >
            <h4
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                fontSize: "1.25rem",
                fontWeight: 700,
                marginBottom: "1.5rem",
                color: "var(--text-main)",
              }}
            >
              <ImageIcon size={20} style={{ color: "var(--color-primary)" }} /> Round Bar
            </h4>

      <div className="step-description" style={{ marginTop: "2rem" }}>
        <img
          src={steelTable5Img}
          alt="Round Bar Reference Table"
          className="software-screenshot mt-4"
          style={{ maxWidth: "100%", height: "auto", objectFit: "contain", borderRadius: "8px" }}
        />
      </div>
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

export default GeneralStandardSteelLesson;
