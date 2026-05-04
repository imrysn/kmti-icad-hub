import React from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ReadAloudButton } from "../ReadAloudButton";
import { useLessonCore } from "../../hooks/useLessonCore";
import { KaraokeLessonText } from "../KaraokeLessonText";

import "../../styles/2D_Drawing/CourseLesson.css";

/* Importing assets */
import shotblast1Img from "../../assets/2D_Image_File/2D_application_surface((1)_application_surface_1.png";
import shotblast2Img from "../../assets/2D_Image_File/2D_application_surface((1)_application_surface_2.png";
import machiningImg from "../../assets/2D_Image_File/2D_application_surface((2)_machining.png";
import machining2Img from "../../assets/2D_Image_File/2D_application_surface((2)_machining_2.png";

interface SurfaceApplicationLessonProps {
  nextLabel?: string;
  subLessonId?: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const SurfaceApplicationLesson: React.FC<SurfaceApplicationLessonProps> = ({
  subLessonId = "2d-surface-app-1",
  onNextLesson,
  onPrevLesson,
  nextLabel
}) => {
  const { scrollProgress, containerRef, speak, stop, isSpeaking, currentIndex, currentCharIndex } = useLessonCore(subLessonId);

  const surface1Steps = [
    "Surface Preparation: Before coating, the material's black skin must be removed. Shotblasting is a primary method used to smooth or roughen surfaces and remove contaminants.",
    "Shotblasting Classifications: It's commonly used for stress relief after welding and to increase fatigue resistance. For parts prone to corrosion from friction, shotblasting provides a critical protective surface."
  ];

  const surface2Steps = [
    "Machining for Finish: When shotblasting isn't required, machining all sides removes the black skin to achieve desired dimensions. For polished materials where black skin isn't present, these removal processes can sometimes be skipped entirely."
  ];

  const introTitle = "APPLICATION OF SURFACE";
  const introSubtitle = subLessonId === "2d-surface-app-1"
    ? "Techniques for material black skin removal using Shotblasting."
    : "Surface preparation using controlled machining processes.";

  return (
    <div className={`course-lesson-container`} ref={containerRef}>
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      <section className="lesson-intro">
        <h3 className={`section-title ${currentIndex === 0 ? "reading-active" : ""}`} data-reading-index="0">
          <KaraokeLessonText
            as="span"
            text={introTitle}
            isActive={isSpeaking && currentIndex === 0}
            currentCharIndex={currentCharIndex}
          />
          <ReadAloudButton isSpeaking={isSpeaking} onStart={() => {
            const currentSteps = subLessonId === "2d-surface-app-1" ? surface1Steps : surface2Steps;
            speak([introTitle, introSubtitle, ...currentSteps]);
          }}
            onStop={stop}
          />
        </h3>
        <KaraokeLessonText
          className={`lesson-subtitle ${currentIndex === 1 ? "reading-active" : ""}`}
          data-reading-index="1"
          text={introSubtitle}
          isActive={isSpeaking && currentIndex === 1}
          currentCharIndex={currentCharIndex}
        />
      </section>

      <div className="lesson-grid single-card">
        <div className="lesson-card">
          <div className="flex-col">
            <div className="info-box-white" style={{ marginBottom: "2rem" }}>
              <KaraokeLessonText
                text="Before Surface Treatment, material black skin must be removed via: (1) Shotblasting or (2) Machining."
                isActive={isSpeaking && currentIndex === -1} // Not specifically highlighted but still Karaoke if needed
                currentCharIndex={currentCharIndex}
              />
            </div>

            {subLessonId === "2d-surface-app-1" ? (
              <div className="flex-col">
                <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2">
                  <div className="step-header">
                    <span className="step-number">1.</span>
                    <KaraokeLessonText
                      as="span"
                      className="step-label"
                      text="Shotblasting Usage"
                      isActive={isSpeaking && currentIndex === 2}
                      currentCharIndex={currentCharIndex}
                    />
                  </div>
                  <KaraokeLessonText
                    text="Used for stress removal after welding, mechanical cleaning, and fatigue resistance."
                    isActive={isSpeaking && currentIndex === 2}
                    currentCharIndex={currentCharIndex}
                  />
                  <img src={shotblast1Img} alt="Shotblasting Stress Relief" className="software-screenshot screenshot-wide" style={{ marginTop: "1rem" }} />
                </div>

                <div className="section-divider"></div>

                <div className={`instruction-step ${currentIndex === 3 ? "reading-active" : ""}`} data-reading-index="3">
                  <div className="step-header">
                    <span className="step-number">b.</span>
                    <KaraokeLessonText
                      as="span"
                      className="step-label"
                      text="Black Skin Removal"
                      isActive={isSpeaking && currentIndex === 3}
                      currentCharIndex={currentCharIndex}
                    />
                  </div>
                  <img src={shotblast2Img} alt="Black Skin Removal" className="software-screenshot screenshot-wide" style={{ marginBottom: "1rem" }} />
                  <KaraokeLessonText
                    text="Increases corrosion resistance for parts exposed to friction and heat."
                    isActive={isSpeaking && currentIndex === 3}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
              </div>
            ) : subLessonId === "2d-surface-app-2" ? (
              <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2">
                <div className="step-header">
                  <span className="step-number">2.</span>
                  <KaraokeLessonText
                    as="span"
                    className="step-label"
                    text="Machining"
                    isActive={isSpeaking && currentIndex === 2}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
                <img src={machiningImg} alt="Machining Sides" className="software-screenshot screenshot-wide" style={{ margin: "1rem 0" }} />
                <KaraokeLessonText
                  text="If shotblasting is not necessary, machine all sides to remove black skin and achieve shape."
                  isActive={isSpeaking && currentIndex === 2}
                  currentCharIndex={currentCharIndex}
                />
                
                <div className="section-divider"></div>
                
                <img src={machining2Img} alt="Polished Material" className="software-screenshot screenshot-wide" style={{ margin: "1rem 0" }} />
                <KaraokeLessonText
                  text="For polished materials where black skin is not present, skin removal is not necessary."
                  isActive={isSpeaking && currentIndex === 2}
                  currentCharIndex={currentCharIndex}
                />
              </div>
            ) : null}
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

export default SurfaceApplicationLesson;

