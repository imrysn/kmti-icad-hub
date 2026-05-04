import React from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ReadAloudButton } from "../ReadAloudButton";
import { KaraokeLessonText } from "../KaraokeLessonText";
import { useLessonCore } from "../../hooks/useLessonCore";

import "../../styles/2D_Drawing/CourseLesson.css";

/* Importing assets for Command Menu */
import commandMenu1ImgA from "../../assets/2D_Image_File/2D_command_menu_(1)_command_menu.png";
import commandMenu1ImgB from "../../assets/2D_Image_File/2D_command_menu_(1)_command_menu_2.png";
import commandMenu2ImgA from "../../assets/2D_Image_File/2D_command_menu_(2)_active_view.png";

interface CommandMenuLessonProps {
  nextLabel?: string;
  subLessonId?: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const CommandMenuLesson: React.FC<CommandMenuLessonProps> = ({
  subLessonId = "2d-command-menu-1",
  onNextLesson,
  onPrevLesson,
  nextLabel
}) => {
  const { scrollProgress, containerRef, speak, stop, isSpeaking, currentIndex, currentCharIndex } = useLessonCore(subLessonId);

  const commandSteps1 = [
    "Command Menu: Use this specialized menu for quick access to drafting tools. Familiarize yourself with the layout to improve your detailing speed and efficiency."
  ];

  const commandSteps2 = [
    "Layer Properties: Assign technical entities to their correct layers (e.g., center lines, hidden lines, dimensions). Consistent layer management ensures drawing clarity and standards compliance."
  ];

  const introTitle = "COMMAND MENU";
  const introSubtitle = "Exploring the primary command interface and tool selection for 2D drafting.";

  return (
    <div className={`course-lesson-container`} ref={containerRef}>
      {/* Sticky Progress Bar */}
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
            const currentSteps = subLessonId === "2d-command-menu-1" ? commandSteps1 : commandSteps2;
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
          {subLessonId === "2d-command-menu-1" ? (
            <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2">
              <div className="step-header" style={{ marginBottom: "1rem" }}>
                <span className="step-number">a.</span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text="Command menu"
                  isActive={isSpeaking && currentIndex === 2}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="flex-col">
                <div>
                  <img src={commandMenu1ImgA} alt="Command Menu Layout" className="software-screenshot screenshot-wide" />
                </div>
                <div className="info-box" style={{ marginTop: "1rem" }}>
                  <KaraokeLessonText
                    className="p-flush"
                    text="The command menu allows quick access to various drafting and modification tools."
                    isActive={isSpeaking && currentIndex === 2}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
                <div style={{ marginTop: "1rem" }}>
                  <img src={commandMenu1ImgB} alt="Command Menu Detail" className="software-screenshot screenshot-wide" />
                </div>
              </div>
            </div>
          ) : subLessonId === "2d-command-menu-2" ? (
            <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2">
              <div className="step-header" style={{ marginBottom: "1rem" }}>
                <span className="step-number">a.</span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text="Layer Properties"
                  isActive={isSpeaking && currentIndex === 2}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="flex-col">
                <div>
                  <img src={commandMenu2ImgA} alt="Layer Properties Dialog" className="software-screenshot screenshot-wide" />
                </div>
                <div className="info-box" style={{ marginTop: "1rem" }}>
                  <KaraokeLessonText
                    className="p-flush"
                    text="1. Select line then change line properties or layer as required. 2. Apply color, line type and thickness according to the KEMCO drafting standard."
                    isActive={isSpeaking && currentIndex === 2}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="content-placeholder">
              <p>Lesson content for {subLessonId} will be provided soon.</p>
            </div>
          )}

          {/* Navigation */}
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

export default CommandMenuLesson;

