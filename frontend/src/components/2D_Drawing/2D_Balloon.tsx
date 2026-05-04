import React from "react";

import { ChevronLeft, ChevronRight } from 'lucide-react'; import { ReadAloudButton } from "../ReadAloudButton";
import { useLessonCore } from "../../hooks/useLessonCore";

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
  const { scrollProgress, containerRef, speak, stop, isSpeaking, currentIndex } = useLessonCore('2d-balloon');

  const balloonSteps = [
    "Part Drawing: Select the part balloon command. Click L1 on the part, then P1 to locate the balloon. Note that balloons should not overlap with lines or dimensions.",
    "Assembly Drawing: Select the add balloon command from the icon menu to annotate your assembly drawings."
  ];


  return (
    <div className="course-lesson-container" ref={containerRef}>
      {" "}
      {/* Sticky Progress Bar */}
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>
      <section className="lesson-intro">
        <h3 className={`section-title ${currentIndex === 0 ? "reading-active" : ""}`} data-reading-index="0">
          18. Balloon
          <ReadAloudButton isSpeaking={isSpeaking} onStart={() => {
            const introTitle = "18. Balloon";
            const introSubtitle = "Annotating parts and assembly drawings with automated and manual balloon callouts.";
            speak([introTitle, introSubtitle, ...balloonSteps]);
          }}
            onStop={stop}
          />
        </h3>
        <p className={`lesson-subtitle ${currentIndex === 1 ? "reading-active" : ""}`} data-reading-index="1">
          Annotating parts and assembly drawings with automated and manual balloon callouts.
        </p>
      </section>
      <div className="lesson-grid single-card">
        <div className="lesson-card">
          {" "}
          <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2">
            <div className="step-header" style={{ marginBottom: "2rem" }}>
              <span className="step-number">a.</span>
              <span className="step-label">Part drawing</span>
            </div>

            <div>
              <div>
                <div>
                  <div>
                    <img src={balloonPartMenuImg} alt="Part Balloon Menu Selection" className="software-screenshot screenshot-wide" />
                  </div>
                  <div className="info-box" style={{ marginTop: "2rem" }}>
                    <div style={{ padding: "1rem" }}>
                      <div style={{ marginBottom: "0.8rem" }}>A balloon will be placed where the part image is clearly shown.</div>
                      <div className="red-text" style={{ marginBottom: "0.5rem" }}><strong>Notes:</strong></div>
                      <div style={{ marginBottom: "0.8rem" }}>1. Balloons should not overlap with other lines or dimensions.</div>
                      <div style={{ marginBottom: "0.8rem" }}>2. If the details on the BOM are properly linked, part balloons are automatically displayed.</div>
                      <div style={{ marginBottom: "0.8rem" }}>3. If part balloon is not displayed, the drawing and the BOM properties is not linked. Do not manually input the letters / numbers in item entry box.</div>
                      <div style={{ marginBottom: "0.8rem" }}>4. Text should not change using edit characters.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>{" "}
          <div className={`instruction-step ${currentIndex === 3 ? "reading-active" : ""}`} data-reading-index="3">
            <div className="step-header" style={{ marginBottom: "2rem" }}>
              <span className="step-number">b.</span>
              <span className="step-label">Assembly drawing</span>
            </div>
            <div>
              <div>
                <div>
                  <img src={balloonAssemblyMenuImg} alt="Add Balloon Menu Selection" className="software-screenshot screenshot-wide" />
                </div>
              </div>
            </div>
          </div>{" "}
          {/* Navigation */}
          <div className="lesson-navigation">
            {" "}
            <button className="nav-button" onClick={onPrevLesson}>
              {" "}
              <ChevronLeft size={18} /> Previous{" "}
            </button>{" "}
            <button className="nav-button next" onClick={onNextLesson}>
              {" "}
              {nextLabel || 'Next Lesson'} <ChevronRight size={18} />{" "}
            </button>
          </div>
        </div>
      </div>
    </div >
  );
};

export default BalloonLesson;



