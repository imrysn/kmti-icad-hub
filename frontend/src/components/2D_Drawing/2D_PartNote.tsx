import React from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ReadAloudButton } from "../ReadAloudButton";
import { useLessonCore } from "../../hooks/useLessonCore";

import "../../styles/2D_Drawing/CourseLesson.css";

/* Importing assets */
import partNoteImg1 from "../../assets/2D_Image_File/2D_part_note_1.png";
import partNoteImg2 from "../../assets/2D_Image_File/2D_part_note_2.png";
import textNoteImg from "../../assets/2D_Image_File/2D_part_note_text.png";

interface PartNoteLessonProps {
  nextLabel?: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const PartNoteLesson: React.FC<PartNoteLessonProps> = ({
  onNextLesson,
  onPrevLesson,
  nextLabel
}) => {
  const { scrollProgress, containerRef, speak, stop, isSpeaking, currentIndex } = useLessonCore('2d-part-note');

  const noteSteps = [
    "Part Notes: Notes are essential for providing additional technical instructions. Use them to specify process requirements that aren't captured by standard dimensions or symbols.",
    "Assembly Applications: The note command is flexible and can be applied based on the specific purpose and manufacturing requirements of your part or assembly.",
    "Text Command: Use the Text tool for general annotations and labels. This allows you to place custom technical references anywhere on the drawing template."
  ];

  const introSubtitle = "Applying technical notes and custom text for detailed process instructions.";

  return (
    <div className="course-lesson-container" ref={containerRef}>
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      <section className="lesson-intro">
        <h3 className={`section-title ${currentIndex === 0 ? "reading-active" : ""}`} data-reading-index="0">
          PART NOTE / TEXT
          <ReadAloudButton isSpeaking={isSpeaking} onStart={() => {
            const introTitle = "PART NOTE / TEXT";
            speak([introTitle, introSubtitle, ...noteSteps]);
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
              <img src={partNoteImg1} alt="Part Note Process Drawing" className="software-screenshot screenshot-wide" />
            </div>

            <div className="section-divider"></div>

            <div className={`instruction-step ${currentIndex === 3 ? "reading-active" : ""}`} data-reading-index="3">
              <div className="flex-col">
                <img src={partNoteImg2} alt="Part Note Assembly Reference" className="software-screenshot screenshot-wide" />
                <div className="info-box" style={{ marginTop: "2rem" }}>
                  <p className="red-text"><strong>Note:</strong></p>
                  <p>Aside from the given samples, note command can be applied based on the purpose and the required process.</p>
                </div>
              </div>
            </div>

            <div className="section-divider"></div>

            <div className={`instruction-step ${currentIndex === 4 ? "reading-active" : ""}`} data-reading-index="4">
              <div className="step-header" style={{ marginBottom: "1rem" }}>
                <span className="step-number">11.</span>
                <span className="step-label">Text</span>
              </div>
              <img src={textNoteImg} alt="Text Command and Configuration" className="software-screenshot screenshot-wide" />
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

export default PartNoteLesson;
