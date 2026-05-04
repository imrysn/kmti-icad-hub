import React from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ReadAloudButton } from "../ReadAloudButton";
import { useLessonCore } from "../../hooks/useLessonCore";

import "../../styles/2D_Drawing/CourseLesson.css";

/* Importing assets for Retaining Ring */
import retaining1Img from "../../assets/2D_Image_File/2D_retaining_ring_(1).jpg";
import retaining2Img from "../../assets/2D_Image_File/2D_retaining_ring_(2).jpg";

interface RetainingRingLessonProps {
  nextLabel?: string;
  subLessonId?: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const RetainingRingLesson: React.FC<RetainingRingLessonProps> = ({
  subLessonId = "2d-retaining-ring-1",
  onNextLesson,
  onPrevLesson,
  nextLabel
}) => {
  const { scrollProgress, containerRef, speak, stop, isSpeaking, currentIndex } = useLessonCore(subLessonId);

  const externalSteps = [
    "External Retaining Rings: Review the dimensional specifications for C-type external rings. Ensure the groove diameter and width match the shaft standards for secure axial retention."
  ];

  const internalSteps = [
    "Internal Retaining Rings: These standards focus on rings fitted inside bores. Verify the housing diameter and groove dimensions to ensure the C-type internal ring seats correctly during assembly."
  ];

  const introTitle = "RETAINING RING SIZE AND TOLERANCE";
  const introSubtitle = subLessonId === "2d-retaining-ring-1"
    ? "Dimensional specifications and assembly standards for External C-Type Retaining Rings."
    : "Dimensional specifications and assembly standards for Internal C-Type Retaining Rings.";

  return (
    <div className="course-lesson-container" ref={containerRef}>
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      <section className="lesson-intro">
        <h3 className={`section-title ${currentIndex === 0 ? "reading-active" : ""}`} data-reading-index="0">
          {introTitle}
          <ReadAloudButton isSpeaking={isSpeaking} onStart={() => {
            const currentSteps = subLessonId === "2d-retaining-ring-1" ? externalSteps : internalSteps;
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
          <div className="flex-col">
            <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2">
              <div className="image-wrapper-flush">
                <img 
                  src={subLessonId === "2d-retaining-ring-1" ? retaining1Img : retaining2Img} 
                  alt="Retaining Rings Standards" 
                  className="software-screenshot screenshot-wide" 
                />
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

export default RetainingRingLesson;
