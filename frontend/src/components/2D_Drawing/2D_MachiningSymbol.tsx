import React from "react";

import { ChevronLeft, ChevronRight } from 'lucide-react'; import { ReadAloudButton } from "../ReadAloudButton";
import { KaraokeLessonText } from "../KaraokeLessonText";
import { useLessonCore } from "../../hooks/useLessonCore";

import "../../styles/2D_Drawing/CourseLesson.css";
/* Importing assets for Machining Symbol */

import machiningSymbolMainImg from "../../assets/2D_Image_File/2D_machining_symbol.png";

import machiningSymbolNoteImg from "../../assets/2D_Image_File/2D_machining_symbol_note.jpg";

import machiningSurfaceCondImg from "../../assets/2D_Image_File/2D_machining_symbol_machining_surface_condiiton.jpg";

interface MachiningSymbolLessonProps {
  nextLabel?: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const MachiningSymbolLesson: React.FC<MachiningSymbolLessonProps> = ({
  onNextLesson,
  onPrevLesson, nextLabel }) => {
  const { scrollProgress, containerRef, speak, stop, isSpeaking, currentIndex, currentCharIndex } = useLessonCore('2d-machining-symbol');

  const machiningSteps = [
    "Select the required machining symbol from the menu. Note that symbols in parentheses indicate the part must be machined before welding, as post-weld machining would be impossible.",
    "Refer to the Machining Surface Condition table for specific roughness values and finish requirements standard for KEMCO parts."
  ];

  const currentTitle = "MACHINING SYMBOL";
  const currentSubtitle = "Understanding machining symbols and surface condition requirements to ensure precision parts and required surface finishes.";

  return (
    <div className="course-lesson-container" ref={containerRef}>
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      <div className="lesson-grid single-card">
        <div className="lesson-card">
          <div className="fade-in">
            <div className="card-header">
              <KaraokeLessonText
                as="h4"
                className={`section-title ${currentIndex === 0 ? "reading-active" : ""}`}
                data-reading-index="0"
                text={currentTitle}
                isActive={isSpeaking && currentIndex === 0}
                currentCharIndex={currentCharIndex}
              />
              <ReadAloudButton 
                isSpeaking={isSpeaking} 
                onStart={() => speak([currentTitle, currentSubtitle, ...machiningSteps])}
                onStop={stop}
              />
            </div>

            <div className={`instruction-step ${currentIndex === 1 ? "reading-active" : ""}`} data-reading-index="1">
              <KaraokeLessonText
                className="p-flush"
                text={currentSubtitle}
                isActive={isSpeaking && currentIndex === 1}
                currentCharIndex={currentCharIndex}
              />
            </div>


            <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2">
              <div className="step-header">
                <span className="step-number">1</span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text="Machining Symbol Selection"
                  isActive={isSpeaking && currentIndex === 2}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <div className="red-text mb-4">
                  <KaraokeLessonText
                    text={machiningSteps[0]}
                    isActive={isSpeaking && currentIndex === 2}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
                <img src={machiningSymbolMainImg} alt="Machining Symbol Selection" className="software-screenshot screenshot-wide" />
              </div>
            </div>


            <div className={`instruction-step ${currentIndex === 3 ? "reading-active" : ""}`} data-reading-index="3">
              <div className="step-header">
                <span className="step-number">2</span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text="Surface Condition Reference"
                  isActive={isSpeaking && currentIndex === 3}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <KaraokeLessonText
                  className="p-flush mb-4"
                  text={machiningSteps[1]}
                  isActive={isSpeaking && currentIndex === 3}
                  currentCharIndex={currentCharIndex}
                />
                <img src={machiningSurfaceCondImg} alt="Machining Surface Condition Table" className="software-screenshot screenshot-wide" />
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

export default MachiningSymbolLesson;



