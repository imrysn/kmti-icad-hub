import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { KaraokeLessonText } from "../KaraokeLessonText";
import { useLessonCore } from "../../hooks/useLessonCore";
import { useTTSAutoplay } from "../../hooks/useTTSAutoplay";

import "../../styles/2D_Drawing/CourseLesson.css";

/* Importing assets for Operate View (1) */
import operateView1ImgA from "../../assets/2D_Image_File/2D_operate_view(1)_a.png";
import operateView1ImgA1 from "../../assets/2D_Image_File/2D_operate_view(1)_a1.png";
import operateView1ImgB2 from "../../assets/2D_Image_File/2D_operate_view(1)_b2.png";

/* Importing assets for Operate View (2) */
import operateView2ImgB1 from "../../assets/2D_Image_File/2D_operate_view(2)_b_1.png";
import operateView2ImgB2 from "../../assets/2D_Image_File/2D_operate_view(2)_b_2.jpg";
import operateView2ImgB3 from "../../assets/2D_Image_File/2D_operate_view(2)_b2_3.jpg";

interface OperalViewLessonProps {
  nextLabel?: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const OperalViewLesson: React.FC<OperalViewLessonProps> = ({
  onNextLesson,
  onPrevLesson,
  nextLabel
}) => {
  const TABS = [
    { id: 'move-view', label: 'Isometric / Orthographic View' },
    { id: 'alignment-delete', label: 'Delete View' }
  ];

  const [activeTab, setActiveTab] = useState<string>(() => {
    return localStorage.getItem('2d-operal-view-active-tab') || TABS[0].id;
  });

  const { scrollProgress, containerRef, speak, stop, isSpeaking, currentIndex, currentCharIndex, registerText } = useLessonCore(`2d-operal-view-${activeTab}`);

  useEffect(() => {
    localStorage.setItem('2d-operal-view-active-tab', activeTab);
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

  const LESSON_DATA: Record<string, { title: string; subtitle: string; steps: string[] }> = {
    '2d-operal-view-move-view': {
      title: 'OPERATE VIEW',
      subtitle: 'Repositioning isometric and orthographic views on your drawing template.',
      steps: [
        "Move View: Use this command to reposition technical views on the template. For Isometric views, position them freely without overlapping. For Orthographic views, moving one will move all aligned views simultaneously.",
        "Alignment Standard: Position isometric views carefully—not too far or overlapping. Ensure all projected views remain parallel and aligned to maintain professional drafting standards."
      ]
    },
    '2d-operal-view-alignment-delete': {
      title: 'OPERATE VIEW',
      subtitle: 'Aligning projected views and deleting unnecessary views.',
      steps: [
        "View Alignment: If views are not aligned, use the create-three-view tool to adjust. Aligning lines will appear as guides to help you restore proper projection integrity.",
        "Delete View: Select any unnecessary views, click GO, and confirm in the dialog box to remove them from your drawing template."
      ]
    }
  };

  const currentLesson = LESSON_DATA[`2d-operal-view-${activeTab}`] || LESSON_DATA['2d-operal-view-move-view'];

  const currentTabSteps = [
    currentLesson.title,
    currentLesson.subtitle,
    ...(currentLesson.steps || [])
  ].filter(Boolean);

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
            <div className="flex-col tab-content fade-in">
              <div className="instruction-step" style={{ marginTop: "-2rem" }}>
                <div className="step-header">
                  <span className="step-number">21</span>
                  <span className="step-label">Operate View</span>
                </div>
              </div>

              {activeTab === 'move-view' && (
                <>
                  <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2" style={{ marginTop: "-3rem" }}>
                    <div className="step-header" style={{ marginLeft: "3rem" }}>
                      <span className="step-number">a</span>
                      <KaraokeLessonText
                        as="span"
                        className="step-label"
                        text="Move View"
                        isActive={isSpeaking && currentIndex === 2}
                        currentCharIndex={currentCharIndex}
                      />
                    </div>
                    <div className="step-description">
                      <img src={operateView1ImgA} alt="Move View Menu" className="software-screenshot screenshot-medium mb-4" />
                      <div className="step-header" style={{ marginLeft: "3rem", marginTop: "1.5rem", marginBottom: "1rem" }}>
                        <span className="step-number">a.1</span>
                        <span className="step-label">Isometric View</span>
                      </div>
                      <p className="p-flush">Position of isometric view must not be too close, too far, or over lap with the orthographic view.</p>
                      <img src={operateView1ImgA1} alt="Isometric View" className="software-screenshot screenshot-wide" />
                    </div>
                  </div>

                  <div className={`instruction-step ${currentIndex === 3 ? "reading-active" : ""}`} data-reading-index="3">
                    <div className="step-header" style={{ marginLeft: "3rem" }}>
                      <span className="step-number">b.2</span>
                      <KaraokeLessonText
                        as="span"
                        className="step-label"
                        text="Orthographic View"
                        isActive={isSpeaking && currentIndex === 3}
                        currentCharIndex={currentCharIndex}
                      />
                    </div>
                    <p className="p-flush">All projection views must always aligned.</p>
                    <div className="step-description">
                      <img src={operateView1ImgB2} alt="Orthographic Sync" className="software-screenshot screenshot-wide" />
                      <div className="instruction-box mt-4">
                        <p className="p-flush" style={{ marginBottom: "0.5rem" }}>
                          1. Select create three view icon and select the Front view. If all the main view are highlighted, it means that the views are align.
                        </p>
                        <p className="p-flush">
                          <strong className="red-text">Note:</strong> <br /> If the projected views are aligned, upon moving the views, all views will move simultaneously
                        </p>
                      </div>
                      <div className="flex-row gap-4 mt-4">
                        <div className="instruction-box" style={{ flex: 1, display: "flex", alignItems: "center" }}>
                          <p className="p-flush">
                            If the views are not aligned, you can use also the same icon to adjust the location and aligning lines will appear.
                          </p>
                        </div>
                        <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
                          <img src={operateView2ImgB3} alt="Alignment Guides" className="software-screenshot screenshot-wide" style={{ margin: 0 }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'alignment-delete' && (
                <>
                  <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2" style={{ marginTop: "-3rem" }}>
                    <div className="step-header" style={{ marginLeft: "3rem" }}>
                      <span className="step-number">a</span>
                      <KaraokeLessonText
                        as="span"
                        className="step-label"
                        text="View Alignment"
                        isActive={isSpeaking && currentIndex === 2}
                        currentCharIndex={currentCharIndex}
                      />
                    </div>
                    <div className="step-description">
                      <KaraokeLessonText
                        className="p-flush mb-4"
                        text={currentLesson.steps[0]}
                        isActive={isSpeaking && currentIndex === 2}
                        currentCharIndex={currentCharIndex}
                      />
                      <img src={operateView2ImgB3} alt="Alignment Guides" className="software-screenshot screenshot-wide" />
                    </div>
                  </div>

                  <div className={`instruction-step ${currentIndex === 3 ? "reading-active" : ""}`} data-reading-index="3">
                    <div className="step-header" style={{ marginLeft: "3rem" }}>
                      <span className="step-number">b</span>
                      <KaraokeLessonText
                        as="span"
                        className="step-label"
                        text="Delete View"
                        isActive={isSpeaking && currentIndex === 3}
                        currentCharIndex={currentCharIndex}
                      />
                    </div>
                    <div className="flex-col gap-4">
                      <img src={operateView2ImgB1} alt="Delete Command" className="software-screenshot screenshot-medium" />
                      <div className="flex-row gap-4 mt-4">
                        <div className="instruction-box" style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                          <p className="p-flush" style={{ marginBottom: "0.5rem" }}>
                            1. Click the unnecessary view, then GO.
                          </p>
                          <p className="p-flush" style={{ marginBottom: "0.5rem" }}>
                            2. Delete view dialog box display.
                          </p>
                          <p className="p-flush">
                            3. Click OK if you decided to delete the view. Click CANCEL if it's still needed.
                          </p>
                        </div>
                        <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
                          <img src={operateView2ImgB2} alt="Confirmation Dialog" className="software-screenshot screenshot-wide" style={{ margin: 0 }} />
                        </div>
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
            <button className="nav-button next" onClick={handleNext}>
              {nextLabel || 'Next'} <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OperalViewLesson;
