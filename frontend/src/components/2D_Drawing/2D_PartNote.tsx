import React from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { KaraokeLessonText } from "../KaraokeLessonText";
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
  const { scrollProgress, containerRef, speak, stop, isSpeaking, currentIndex, currentCharIndex } = useLessonCore('2d-part-note');

  const noteSteps = [
    "Note: Aside from the given samples, note command can be applied depends on the purpose and on the required process to be applied.",
  ];

  const currentTitle = "PART NOTE / TEXT";
  const currentSubtitle = "";

  return (
    <div className="course-lesson-container" ref={containerRef}>
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      <div className="lesson-grid single-card">
        <div className="lesson-card">
          <div className="fade-in">

  

            <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2" style={{ marginTop: "-2rem" }}>
              <div className="step-description">
                <img src={partNoteImg1} alt="Part Note Process" className="software-screenshot screenshot-wide mb-6" />
                
                <img src={partNoteImg2} alt="Assembly Reference" className="software-screenshot screenshot-wide" />
                
                <div className="instruction-box mt-6">
                  <KaraokeLessonText
                    className="p-flush"
                    text={noteSteps[0]}
                    isActive={isSpeaking && currentIndex === 2}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
              </div>
            </div>

            <div className="instruction-step" style={{ marginTop: "1rem" }}>
              <div className="step-header">
                <span className="step-number">11</span>
                <span className="step-label">Text</span>
              </div>
              <div className="step-description">
                <img src={textNoteImg} alt="Text Configuration" className="software-screenshot screenshot-wide mt-4" />
              </div>
            </div>
          </div>

          <div className="lesson-navigation">
            <button className="nav-button" onClick={onPrevLesson}>
              <ChevronLeft size={18} /> Previous
            </button>
            <button className="nav-button next" onClick={onNextLesson}>
              {nextLabel || 'Next'} <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartNoteLesson;
