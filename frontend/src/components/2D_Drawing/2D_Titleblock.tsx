import React from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ReadAloudButton } from "../ReadAloudButton";
import { useLessonCore } from "../../hooks/useLessonCore";

import "../../styles/2D_Drawing/CourseLesson.css";

/* Importing assets */
import titleBlock1Img from "../../assets/2D_Image_File/2D_title_block_1.png";

interface TitleBlockLessonProps {
  nextLabel?: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const TitleBlockLesson: React.FC<TitleBlockLessonProps> = ({
  onNextLesson,
  onPrevLesson,
  nextLabel
}) => {
  const { scrollProgress, containerRef, speak, stop, isSpeaking, currentIndex } = useLessonCore('2d-titleblock');

  const titleBlockSteps = [
    "Title Block Overview: The title block displays critical part information including Job Order, Drawing Number, and designer names. Ensure all fields are filled accurately for project tracking.",
    "Data Entry Procedure: Follow the systematic approach to reflect technical data. Input the required information into the dialog and check that it appears correctly in the designated template fields.",
    "Placement Landmarks: Position the completed title block using landmarks P1 and P2 to ensure it aligns perfectly with the standard KEMCO drawing frame."
  ];

  const introSubtitle = "Configuring the primary information block for project tracking and part identification.";

  return (
    <div className="course-lesson-container" ref={containerRef}>
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      <section className="lesson-intro">
        <h3 className={`section-title ${currentIndex === 0 ? "reading-active" : ""}`} data-reading-index="0">
          19. TITLE BLOCK
          <ReadAloudButton isSpeaking={isSpeaking} onStart={() => {
            const introTitle = "19. TITLE BLOCK";
            speak([introTitle, introSubtitle, ...titleBlockSteps]);
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
              <div className="info-box" style={{ marginBottom: "2rem" }}>
                <p>Displays part information: Job Order, Drawing Number, Machine Name, Designer, and References.</p>
              </div>
              <img src={titleBlock1Img} alt="Title Block Definitions" className="software-screenshot screenshot-wide" />
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

export default TitleBlockLesson;
