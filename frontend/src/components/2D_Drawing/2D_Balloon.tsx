import React from "react";

import { ChevronLeft, ChevronRight } from 'lucide-react'; import { ReadAloudButton } from "../ReadAloudButton";
import { useLessonCore } from "../../hooks/useLessonCore";
import { KaraokeLessonText } from "../KaraokeLessonText";

import "../../styles/2D_Drawing/CourseLesson.css";

import balloonPartMenuImg from "../../assets/2D_Image_File/2D_balloon_part_drawing.png";

import balloonAssemblyMenuImg from "../../assets/2D_Image_File/2D_balloon_assembly_drawing_1.png";

interface BalloonLessonProps {
  nextLabel?: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const BalloonLesson: React.FC<BalloonLessonProps> = ({
  onNextLesson,
  onPrevLesson, nextLabel }) => {
  const { scrollProgress, containerRef, speak, stop, isSpeaking, currentIndex, currentCharIndex } = useLessonCore('2d-balloon');

  const balloonSteps = [
    "Select the part balloon command. Click L1 on the part, then P1 to locate the balloon. Note that balloons should not overlap with lines or dimensions.",
    "Select the add balloon command from the icon menu to annotate your assembly drawings."
  ];

  const currentTitle = "BALLOON";
  const currentSubtitle = "Annotating parts and assembly drawings with automated and manual balloon callouts.";

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
                onStart={() => speak([currentTitle, currentSubtitle, ...balloonSteps])}
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
                  text="Part Balloon Annotation"
                  isActive={isSpeaking && currentIndex === 2}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <div className="red-text mb-4">
                  <KaraokeLessonText
                    text={balloonSteps[0]}
                    isActive={isSpeaking && currentIndex === 2}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
                <img src={balloonPartMenuImg} alt="Part Balloon Menu" className="software-screenshot screenshot-wide mb-4" />
                <div className="red-text" style={{ padding: "1rem", borderLeft: "2px solid var(--primary-alpha)" }}>
                  <p><strong>BOM Linking Rules:</strong></p>
                  <ul style={{ paddingLeft: "1.2rem", marginTop: "0.5rem" }}>
                    <li>Balloons should not overlap with other lines or dimensions.</li>
                    <li>If linked to BOM, balloons are displayed automatically.</li>
                    <li>If not displayed, do not manually input characters into the item box.</li>
                    <li>Text properties must never be changed using manual character editing.</li>
                  </ul>
                </div>
              </div>
            </div>


            <div className={`instruction-step ${currentIndex === 3 ? "reading-active" : ""}`} data-reading-index="3">
              <div className="step-header">
                <span className="step-number">2</span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text="Assembly Drawing Callouts"
                  isActive={isSpeaking && currentIndex === 3}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <KaraokeLessonText
                  className="p-flush mb-4"
                  text={balloonSteps[1]}
                  isActive={isSpeaking && currentIndex === 3}
                  currentCharIndex={currentCharIndex}
                />
                <img src={balloonAssemblyMenuImg} alt="Add Balloon Menu" className="software-screenshot screenshot-wide" />
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

export default BalloonLesson;



