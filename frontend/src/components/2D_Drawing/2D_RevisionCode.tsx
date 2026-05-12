import React from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ReadAloudButton } from "../ReadAloudButton";
import { KaraokeLessonText } from "../KaraokeLessonText";
import { useLessonCore } from "../../hooks/useLessonCore";

import "../../styles/2D_Drawing/CourseLesson.css";

/* Import images */
import img1 from "../../assets/2D_Image_File/2D_revision_code.png";
import imgA1 from "../../assets/2D_Image_File/2D_revision_code_a1.png";
import imgA2 from "../../assets/2D_Image_File/2D_revision_code_a2.png";
import imgA3 from "../../assets/2D_Image_File/2D_revision_code_a3.png";
import imgB from "../../assets/2D_Image_File/2D_revision_code_b.png";

interface RevisionCodeLessonProps {
  nextLabel?: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const RevisionCodeLesson: React.FC<RevisionCodeLessonProps> = ({
  onNextLesson,
  onPrevLesson,
  nextLabel
}) => {
  const { scrollProgress, containerRef, speak, stop, isSpeaking, currentIndex, currentCharIndex } = useLessonCore('2d-revision-code');

  const revisionSteps = [
    "Revisions occur when approved drawings need modifications due to fabrication discrepancies. It's critical to track these changes for engineering history.",
    "Use the 'create delta' command to mark changes. Enter the delta character and place it near the modified feature. Remember: local view must be activated.",
    "Update the revision history block to provide a clear record of what was changed, by whom, and when."
  ];

  const currentTitle = "REVISION CODE AND HISTORY";
  const currentSubtitle = "Tracking engineering changes and modifications using delta markers and history blocks.";

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
                onStart={() => speak([currentTitle, currentSubtitle, ...revisionSteps])}
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
                  text="Revision Awareness & Necessity"
                  isActive={isSpeaking && currentIndex === 2}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <div className="red-text mb-4">
                  <KaraokeLessonText
                    text={revisionSteps[0]}
                    isActive={isSpeaking && currentIndex === 2}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
                <img src={img1} alt="Revision History Overview" className="software-screenshot screenshot-wide" />
              </div>
            </div>


            <div className={`instruction-step ${currentIndex === 3 ? "reading-active" : ""}`} data-reading-index="3">
              <div className="step-header">
                <span className="step-number">2</span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text="Delta Marker Placement (Revised Detail)"
                  isActive={isSpeaking && currentIndex === 3}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <div className="flex-col gap-4 mb-4">
                  <div className="flex-row gap-4">
                    <img src={imgA1} alt="Command Menu" className="software-screenshot screenshot-wide" />
                    <img src={imgA2} alt="Delta Input" className="software-screenshot screenshot-medium" />
                  </div>
                  <div className="red-text">
                    <p><strong>Workflow:</strong> 1. Setup 'create delta' → 2. Enter character → 3. Place on location.</p>
                    <p><strong>Requirement:</strong> Local view must be activated before placement.</p>
                  </div>
                </div>
                <img src={imgA3} alt="Placement Example" className="software-screenshot screenshot-wide" />
              </div>
            </div>


            <div className={`instruction-step ${currentIndex === 4 ? "reading-active" : ""}`} data-reading-index="4">
              <div className="step-header">
                <span className="step-number">3</span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text="Revision History Management"
                  isActive={isSpeaking && currentIndex === 4}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <KaraokeLessonText
                  className="p-flush mb-4"
                  text={revisionSteps[2]}
                  isActive={isSpeaking && currentIndex === 4}
                  currentCharIndex={currentCharIndex}
                />
                <img src={imgB} alt="Revision Code History" className="software-screenshot screenshot-wide" />
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

export default RevisionCodeLesson;
