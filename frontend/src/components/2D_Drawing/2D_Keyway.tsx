import React from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ReadAloudButton } from "../ReadAloudButton";
import { useLessonCore } from "../../hooks/useLessonCore";

import "../../styles/2D_Drawing/CourseLesson.css";

/* Importing assets for Keyway */
import keywayImg from "../../assets/2D_Image_File/2D_keyway.jpg";

interface KeywayLessonProps {
  nextLabel?: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const KeywayLesson: React.FC<KeywayLessonProps> = ({
  onNextLesson,
  onPrevLesson,
  nextLabel
}) => {
  const { scrollProgress, containerRef, speak, stop, isSpeaking, currentIndex } = useLessonCore('2d-keyway');

  const keywaySteps = [
    "Keyway Standards: Review the Parallel Keyway table for shafts and hubs. Ensure you apply the correct dimensions and tolerances based on the shaft diameter to maintain KEMCO engineering standards."
  ];

  const introSubtitle = "Dimensions and tolerance specifications for parallel keyways on shafts and hubs.";

  return (
    <div className="course-lesson-container" ref={containerRef}>
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      <section className="lesson-intro">
        <h3 className={`section-title ${currentIndex === 0 ? "reading-active" : ""}`} data-reading-index="0">
          KEYWAY STANDARDS SIZE AND TOLERANCE
          <ReadAloudButton isSpeaking={isSpeaking} onStart={() => {
            const introTitle = "KEYWAY STANDARDS SIZE AND TOLERANCE";
            speak([introTitle, introSubtitle, ...keywaySteps]);
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
                <img src={keywayImg} alt="Parallel Keyway Standards Table" className="software-screenshot screenshot-wide" />
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

export default KeywayLesson;
