import React from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ReadAloudButton } from "../ReadAloudButton";
import { useLessonCore } from "../../hooks/useLessonCore";

import "../../styles/2D_Drawing/CourseLesson.css";

/* Import images */
import img2 from "../../assets/2D_Image_File/2D_normal_and_mirror_parts(1)_2.png";
import imgA1 from "../../assets/2D_Image_File/2D_normal_and_mirror_parts(2)_a_1.png";
import imgA2 from "../../assets/2D_Image_File/2D_normal_and_mirror_parts(2)_a_2.png";

interface NormalMirrorPartsLessonProps {
  nextLabel?: string;
  subLessonId?: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const NormalMirrorPartsLesson: React.FC<NormalMirrorPartsLessonProps> = ({
  subLessonId = "2d-normal-mirror-1",
  onNextLesson,
  onPrevLesson,
  nextLabel
}) => {
  const { scrollProgress, containerRef, speak, stop, isSpeaking, currentIndex } = useLessonCore(subLessonId);

  const mirror1Steps = [
    "Definitions: Normal parts use an 'N' designation, while mirror parts are symmetrical, designated with 'A' and 'B' numbers. First, finalize the 'A' drawing completely.",
    "Drafting Rules: Save a copy as the 'B' designation. Mirror the part in 3D, then update the 2D views. Change the right side view to a left side view, update the isometric view, and ensure the title block reflects the new drawing number."
  ];

  const mirror2Steps = [
    "Mirror Command: Use the dedicated mirror command for rapid 2D detailing. Select the entities and define the mirror axis to create symmetrical representations instantly."
  ];

  const introSubtitle = "Designating normal and mirror parts with standardized numbering and symmetry rules.";

  return (
    <div className="course-lesson-container" ref={containerRef}>
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      <section className="lesson-intro">
        <h3 className={`section-title ${currentIndex === 0 ? "reading-active" : ""}`} data-reading-index="0">
          22. NORMAL AND MIRROR PARTS
          <ReadAloudButton isSpeaking={isSpeaking} onStart={() => {
            const introTitle = "22. NORMAL AND MIRROR PARTS";
            const currentSteps = subLessonId === "2d-normal-mirror-1" ? mirror1Steps : mirror2Steps;
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
          {subLessonId === "2d-normal-mirror-1" ? (
            <div className="flex-col">
              <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2">
                <div className="info-box">
                  <p><span className="red-bold">Normal:</span> Example RTXXXXXX<span className="red-bold">N</span>01</p>
                  <p><span className="red-bold">Mirror parts:</span> RTXXXXXX<span className="red-bold">A</span>01 & RTXXXXXX<span className="red-bold">B</span>01 are symmetrically the same.</p>
                </div>
              </div>

              <div className="section-divider"></div>

              <div className={`instruction-step ${currentIndex === 3 ? "reading-active" : ""}`} data-reading-index="3">
                <div className="step-header">
                  <span className="step-label">Rule on how to detail a mirror part</span>
                </div>
                <img src={img2} alt="Mirroring Rule Toolbar" className="software-screenshot screenshot-wide" style={{ marginTop: "1rem" }} />
              </div>
            </div>
          ) : subLessonId === "2d-normal-mirror-2" ? (
            <div className="flex-col">
              <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2">
                <div className="step-header">
                  <span className="step-number">a.</span>
                  <span className="step-label">Mirror Command on detailing</span>
                </div>
                <img src={imgA1} alt="Mirror Command Menu" className="software-screenshot screenshot-wide" style={{ marginTop: "1rem" }} />
                <div className="image-wrapper-bordered" style={{ marginTop: "1.5rem" }}>
                  <img src={imgA2} alt="Mirroring Result" className="software-screenshot screenshot-wide" />
                </div>
              </div>
            </div>
          ) : (
            <div className="content-placeholder">
              <p>Lesson content for {subLessonId} is being prepared.</p>
            </div>
          )}

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

export default NormalMirrorPartsLesson;
