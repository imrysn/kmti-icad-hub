import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { KaraokeLessonText } from "../KaraokeLessonText";
import { useLessonCore } from "../../hooks/useLessonCore";
import { useTTSAutoplay } from "../../hooks/useTTSAutoplay";

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
  const TABS = [
    { id: 'standard-library', label: 'Standard Part Library' }
  ];

  const [activeTab, setActiveTab] = useState<string>(() => {
    return localStorage.getItem('2d-standard-library-active-tab') || TABS[0].id;
  });

  const { scrollProgress, containerRef, speak, stop, isSpeaking, currentIndex, currentCharIndex, registerText } = useLessonCore(`2d-standard-library-${activeTab}`);

  useEffect(() => {
    localStorage.setItem('2d-standard-library-active-tab', activeTab);
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

  const currentTitle = "STANDARD PART LIBRARY";
  const currentSubtitle = "Learn how to insert and configure safety colors and revision histories from the Standard Part Library.";

  const currentTabSteps = [
    currentTitle,
    currentSubtitle,
    "Safety Color: To easily recognize accident-prone areas with rotating parts, paint chain covers, gear covers, and universal joint covers with yellow color number four.",
    "Revision History: Select the revision history template from the part library, place it on its designated location, and edit the details using the edit characters command."
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
                <span className="step-number">24</span>
                <span className="step-label">Standard Part Library</span>
              </div>
            </div>

            <div className="flex-col tab-content fade-in">
              {activeTab === 'standard-library' && (
                <>
                  <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2" style={{ marginTop: "-3rem" }}>
                    <img src={imgToolbar} alt="Library Toolbar" className="software-screenshot" style={{ width: "450px", marginBottom: "1rem" }} />
                    <div className="step-header" style={{ marginLeft: "3rem" }}>
                      <span className="step-number">a</span>
                      <KaraokeLessonText
                        as="span"
                        className="step-label"
                        text="Safety Color"
                        isActive={isSpeaking && currentIndex === 2}
                        currentCharIndex={currentCharIndex}
                      />
                    </div>
                    <div className="step-description">
                      <p className="p-flush mb-4">
                        To easily recognize that the area in which this part is located has a rotating moving object, hence, it is an accident-prone area.<br />
                        Chain cover, gear cover, motor cover, universal joint cover and rotated parts need to be painted by yellow color #4.
                      </p>
                      <div className="flex-row gap-4 mt-4" style={{ alignItems: "center" }}>
                        <div className="flex-1">
                          <div className="instruction-box" style={{ margin: 0 }}>
                            <p className="p-flush" style={{ marginBottom: "0.5rem" }}>
                              1. Global view must be activated
                            </p>
                            <p className="p-flush" style={{ marginBottom: "0.5rem" }}>
                              2. Click <strong>"part library"</strong> command
                            </p>
                            <p className="p-flush" style={{ marginBottom: "0.5rem" }}>
                              3. Choose required template (safety color note)
                            </p>
                            <p className="p-flush" style={{ marginBottom: "0.5rem" }}>
                              4. Click OK
                            </p>
                          </div>
                        </div>
                        <div className="flex-1">
                          <img src={imgSafetyColor} alt="Safety Color Template" className="software-screenshot screenshot-wide" style={{ margin: 0 }} />
                        </div>
                      </div>
                      <div className="instruction-box mt-4">
                        <p className="p-flush red-text" style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>
                          Note:
                        </p>
                        <p className="p-flush" style={{ marginBottom: "0.5rem" }}>
                          1. Solenoid cover, junction box cover and other cover that is not stated above and not rotated parts should be painted by machine color.
                        </p>
                        <p className="p-flush">
                          2. No need to indicate notes for machine color.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className={`instruction-step ${currentIndex === 3 ? "reading-active" : ""}`} data-reading-index="3" style={{ marginTop: "-2rem" }}>
                    <div className="step-header" style={{ marginLeft: "3rem" }}>
                      <span className="step-number">b</span>
                      <KaraokeLessonText
                        as="span"
                        className="step-label"
                        text="Revision History"
                        isActive={isSpeaking && currentIndex === 3}
                        currentCharIndex={currentCharIndex}
                      />
                    </div>
                    <div className="step-description">
                      <div className="flex-row gap-4 mt-4" style={{ alignItems: "center" }}>
                        <div className="flex-1">
                          <div className="instruction-box" style={{ margin: 0 }}>
                            <p className="p-flush" style={{ marginBottom: "0.5rem" }}>
                              1. Global view must be activated
                            </p>
                            <p className="p-flush" style={{ marginBottom: "0.5rem" }}>
                              2. Click <strong>"part library"</strong> command
                            </p>
                            <p className="p-flush" style={{ marginBottom: "0.5rem" }}>
                              3. Choose required template (revision history)
                            </p>
                            <p className="p-flush" style={{ marginBottom: "0.5rem" }}>
                              4. Click OK
                            </p>
                            <p className="p-flush" style={{ marginBottom: "0.5rem" }}>
                              5. Place on its designated location
                            </p>
                            <p className="p-flush" style={{ marginTop: "0.5rem" }}>
                              6. Edit the details on it based on the reference and instruction. Use <strong>"edit characters"</strong> command. (See Dimensioning tab)
                            </p>
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex-col gap-4">
                            <img src={imgRevHistory1} alt="Revision Selection" className="software-screenshot" style={{ margin: 0 }} />
                          </div>
                        </div>
                      </div>
                      <div>
                        <img src={imgRevHistory2} alt="Revision Placement" className="software-screenshot screenshot-wide" />
                      </div>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default StandardLibraryLesson;
