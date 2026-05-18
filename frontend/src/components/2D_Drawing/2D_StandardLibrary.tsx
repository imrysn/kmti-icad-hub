import React from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ReadAloudButton } from "../ReadAloudButton";
import { KaraokeLessonText } from "../KaraokeLessonText";
import { useLessonCore } from "../../hooks/useLessonCore";

import "../../styles/2D_Drawing/CourseLesson.css";

/* Import images */
import imgToolbar from "../../assets/2D_Image_File/2D_standard_part_library.png";
import imgSafetyColor from "../../assets/2D_Image_File/2D_standard_part_library_safety_color.png";
import imgRevHistory1 from "../../assets/2D_Image_File/2D_standard_part_library_revision_history_1.jpg";
import imgRevHistory2 from "../../assets/2D_Image_File/2D_standard_part_library_revision_history_2.png";

interface StandardLibraryLessonProps {
  nextLabel?: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const StandardLibraryLesson: React.FC<StandardLibraryLessonProps> = ({
  onNextLesson,
  onPrevLesson,
  nextLabel
}) => {
  const { scrollProgress, containerRef, speak, stop, isSpeaking, currentIndex, currentCharIndex } = useLessonCore('2d-standard-library');

  const librarySteps = [
    "Safety Color: Use the part library to insert safety color notes for rotating or moving parts. Activate the global view, choose the template, and place it on the lower right of your drawing.",
    "Revision History: Select the revision history template from the part library while in global view. Place it in its designated location and edit the details based on reference instructions."
  ];

  const currentTitle = "STANDARD PART LIBRARY";
  const currentSubtitle = "Utilizing pre-defined templates for safety notes, revision history, and standard annotations.";

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
                onStart={() => speak([currentTitle, currentSubtitle, ...librarySteps])}
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
                  text="Safety Color Note Placement"
                  isActive={isSpeaking && currentIndex === 2}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <div className="flex-col gap-4 mb-4">
                  <img src={imgToolbar} alt="Library Toolbar" className="software-screenshot screenshot-medium" />
                  <div className="red-text">
                    <p><strong>Requirement:</strong> Global view must be activated.</p>
                    <p><strong>Workflow:</strong> 1. Click 'part library' → 2. Choose 'safetycolor note' → 3. Place on lower right.</p>
                  </div>
                </div>
                <img src={imgSafetyColor} alt="Safety Color Template" className="software-screenshot screenshot-wide" />
              </div>
            </div>


            <div className={`instruction-step ${currentIndex === 3 ? "reading-active" : ""}`} data-reading-index="3">
              <div className="step-header">
                <span className="step-number">2</span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text="Revision History Template"
                  isActive={isSpeaking && currentIndex === 3}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <div className="red-text mb-4">
                  <p><strong>Requirement:</strong> Global view must be activated.</p>
                  <p><strong>Workflow:</strong> 1. Select 'revision history' → 2. Place on designated location → 3. Edit details.</p>
                </div>
                <div className="flex-col gap-4">
                  <img src={imgRevHistory1} alt="Revision Selection" className="software-screenshot" />
                  <img src={imgRevHistory2} alt="Revision Placement" className="software-screenshot screenshot-wide" />
                </div>
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

export default StandardLibraryLesson;
