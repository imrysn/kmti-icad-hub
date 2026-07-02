import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { KaraokeLessonText } from "../KaraokeLessonText";
import { useLessonCore } from "../../hooks/useLessonCore";
import { useTTSAutoplay } from "../../hooks/useTTSAutoplay";

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
  const TABS = [
    { id: 'revision-code', label: 'Revision Code' }
  ];

  const [activeTab, setActiveTab] = useState<string>(() => {
    return localStorage.getItem('2d-revision-code-active-tab') || TABS[0].id;
  });

  const { scrollProgress, containerRef, speak, stop, isSpeaking, currentIndex, currentCharIndex, registerText } = useLessonCore(`2d-revision-code-${activeTab}`);

  useEffect(() => {
    localStorage.setItem('2d-revision-code-active-tab', activeTab);
    stop();
  }, [activeTab, stop]);

  const handleNext = (isAuto = false) => {
    stop();
    if (!isAuto) {
      sessionStorage.setItem('tts-autoplay-active', 'false');
    }

    const currentIndex = TABS.findIndex(tab => tab.id === activeTab);
    if (currentIndex < TABS.length - 1) {
      setActiveTab(TABS[currentIndex + 1].id);
    } else if (onNextLesson) {
      onNextLesson();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrev = (isAuto = false) => {
    stop();
    if (!isAuto) {
      sessionStorage.setItem('tts-autoplay-active', 'false');
    }

    const currentIndex = TABS.findIndex(tab => tab.id === activeTab);
    if (currentIndex > 0) {
      setActiveTab(TABS[currentIndex - 1].id);
    } else if (onPrevLesson) {
      onPrevLesson();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const revisionSteps = [
    "Revision will occur if the finished drawing is already approved yet discrepancy notice during fabrication.",
    "Use the 'create delta' command to mark changes. Enter the delta character and place it near the modified feature. Remember: local view must be activated.",
    "Update the revision history block to provide a clear record of what was changed, by whom, and when."
  ];

  const currentTabSteps = [
    "REVISION CODE",
    ...revisionSteps
  ];
  const tabsList = TABS.map(t => ({ id: t.id }));

  useEffect(() => {
    registerText(currentTabSteps, 0);
  }, [activeTab, registerText]);

  useTTSAutoplay(
    isSpeaking,
    currentIndex,
    activeTab,
    currentTabSteps.length,
    tabsList,
    handleNext,
    speak,
    currentTabSteps,
    0
  );

  return (
    <div className="course-lesson-container" ref={containerRef}>
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      <div className="lesson-tabs">
        {TABS.map(tab => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="lesson-grid single-card">
        <div className="lesson-card">
          <div className="fade-in">
            <div className="instruction-step" style={{ marginTop: "-2rem" }}>
              <div className="step-header">
                <span className="step-number">23</span>
                <span className="step-label">Revision Code and History</span>
              </div>
            </div>

            <div className="flex-col tab-content fade-in">
              {activeTab === 'revision-code' && (
                <>
                  <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2" style={{ marginTop: "-4rem" }}>
                    <div className="step-header">
                      <KaraokeLessonText
                        as="span"
                        className="step-label"
                        text="Revision"
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

                  <div className={`instruction-step ${currentIndex === 3 ? "reading-active" : ""}`} data-reading-index="3" style={{ marginTop: "1rem" }}>
                    <div className="step-header" style={{ marginLeft: "3rem" }}>
                      <span className="step-number">a</span>
                      <KaraokeLessonText
                        as="span"
                        className="step-label"
                        text="Revise Detail"
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

                      </div>
                      <div className="flex-row gap-4 mt-4" style={{ alignItems: "center" }}>
                        <div className="flex-1">
                          <div className="instruction-box" style={{ margin: 0 }}>
                            <p className="p-flush" style={{ marginBottom: "0.5rem" }}>
                              1. Set up <strong>"create delta"</strong> command
                            </p>
                            <p className="p-flush" style={{ marginBottom: "0.5rem" }}>
                              2. Enter delta character
                            </p>
                            <p className="p-flush" style={{ marginBottom: "0.5rem" }}>
                              3. Place it on proper location
                            </p>
                            <p className="p-flush red-text" style={{ marginTop: "0.5rem" }}>
                              <strong>Note:</strong><br />
                              Local view where it will belong must be activated. see Command Menu Tab
                            </p>
                          </div>
                        </div>
                        <div className="flex-1">
                          <img src={imgA3} alt="Placement Example" className="software-screenshot screenshot-wide" style={{ margin: 0 }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={`instruction-step ${currentIndex === 4 ? "reading-active" : ""}`} data-reading-index="4" style={{ marginTop: "1rem" }}>
                    <div className="step-header" style={{ marginLeft: "3rem" }}>
                      <span className="step-number">b</span>
                      <KaraokeLessonText
                        as="span"
                        className="step-label"
                        text="Revision Code"
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
                </>
              )}
            </div>
          </div>

          <div className="lesson-navigation">
            <button className="nav-button" onClick={handlePrev}>
              <ChevronLeft size={18} /> Previous
            </button>
            <button className="nav-button next" onClick={handleNext}>
              {nextLabel || 'Next'} <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevisionCodeLesson;
