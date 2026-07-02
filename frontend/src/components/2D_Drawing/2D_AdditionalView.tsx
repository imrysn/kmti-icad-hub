import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { KaraokeLessonText } from "../KaraokeLessonText";
import { useLessonCore } from "../../hooks/useLessonCore";
import { useTTSAutoplay } from "../../hooks/useTTSAutoplay";

import "../../styles/2D_Drawing/CourseLesson.css";

/* Importing assets */
import additionalView1Img1 from "../../assets/2D_Image_File/2D_additional_view(1)_a.png";
import additionalView2ImgB from "../../assets/2D_Image_File/2D_additional_view(2)_b.png";
import additionalView2ImgC from "../../assets/2D_Image_File/2D_additional_view(2)_c.png";
import additionalView3ImgD from "../../assets/2D_Image_File/2D_additional_view(3)_d.png";
import additionalView3ImgE from "../../assets/2D_Image_File/2D_additional_view(3)_e.png";
import additionalView4ImgF from "../../assets/2D_Image_File/2D_additional_view(4)_f.png";

interface AdditionalViewLessonProps {
  nextLabel?: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const AdditionalViewLesson: React.FC<AdditionalViewLessonProps> = ({
  onNextLesson,
  onPrevLesson,
  nextLabel
}) => {
  const TABS = [
    { id: 'cross-section', label: 'Additional View' },
    { id: 'partial-detail', label: 'Partial Section & Detail' },
    { id: 'isometric', label: 'Isometric & Cross Sectional' },
    { id: 'trim', label: 'Trim View' }
  ];

  const [activeTab, setActiveTab] = useState<string>(() => {
    return localStorage.getItem('2d-additional-view-active-tab') || TABS[0].id;
  });

  const { scrollProgress, containerRef, speak, stop, isSpeaking, currentIndex, currentCharIndex, registerText } = useLessonCore(`2d-additional-view-${activeTab}`);

  useEffect(() => {
    localStorage.setItem('2d-additional-view-active-tab', activeTab);
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
    '2d-additional-view-cross-section': {
      title: 'ADDITIONAL VIEW',
      subtitle: 'Creating cross-sections and adjusting viewing depth in 2D drawings.',
      steps: [
        "There are some instances that the cross sectional view have parts which is not related to the desired view to be seen, we can set the cross-sectional depth to eliminate uneccessary parts."
      ]
    },
    '2d-additional-view-partial-detail': {
      title: 'ADDITIONAL VIEW',
      subtitle: 'Configuring partial sectional views and magnified detail drawings.',
      steps: [
        "Use to make a cross-section of a part partially",
        "Use to detail a view on a bigger scale from a different view."
      ]
    },
    '2d-additional-view-isometric': {
      title: 'ADDITIONAL VIEW',
      subtitle: 'Adding 3D isometric representation views and depth boundaries.',
      steps: [
        "Isometric View: Follow the projection steps to place a 3D isometric representation on your 2D drawing.",
        "There are some instances that the cross-sectional view have parts which is not related to the desired view to be seen, we can set the cross-sectional depth to eliminate the unnecessary parts."
      ]
    },
    '2d-additional-view-trim': {
      title: 'ADDITIONAL VIEW',
      subtitle: 'Trimming unwanted detail parts out of specific view bounds.',
      steps: [
        "Another way to eliminate parts that are not needed on a certain view. This can not be applied on Detail Drawing."
      ]
    }
  };

  const currentLesson = LESSON_DATA[`2d-additional-view-${activeTab}`] || LESSON_DATA['2d-additional-view-cross-section'];

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
                  <span className="step-number">20</span>
                  <span className="step-label">Additional View</span>
                </div>
              </div>

              {activeTab === 'cross-section' && (
                <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2" style={{ marginTop: "-3rem" }}>
                  <div className="step-header" style={{ marginLeft: "3rem" }}>
                    <span className="step-number">a</span>
                    <KaraokeLessonText
                      as="span"
                      className="step-label"
                      text="Cross Section View"
                      isActive={isSpeaking && currentIndex === 2}
                      currentCharIndex={currentCharIndex}
                    />
                  </div>
                  <div className="step-description">
                    <img src={additionalView1Img1} alt="Cross Section View Steps" className="software-screenshot screenshot-wide mb-4" />
                    <div className="instruction-box mt-4">
                      <p className="p-flush">
                        <strong className="red-text">Note:</strong> <br /> The text height of the section name should be the same with the dimension text height.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'partial-detail' && (
                <>
                  <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2" style={{ marginTop: "-3rem" }}>
                    <div className="step-header" style={{ marginLeft: "3rem" }}>
                      <span className="step-number">b</span>
                      <KaraokeLessonText
                        as="span"
                        className="step-label"
                        text="Partial Section"
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
                      <img src={additionalView2ImgB} alt="Partial Section Logic" className="software-screenshot screenshot-wide" />
                    </div>
                  </div>

                  <div className={`instruction-step ${currentIndex === 3 ? "reading-active" : ""}`} data-reading-index="3">
                    <div className="step-header" style={{ marginLeft: "3rem" }}>
                      <span className="step-number">c</span>
                      <KaraokeLessonText
                        as="span"
                        className="step-label"
                        text="Detail Drawing"
                        isActive={isSpeaking && currentIndex === 3}
                        currentCharIndex={currentCharIndex}
                      />
                    </div>
                    <div className="step-description">
                      <KaraokeLessonText
                        className="p-flush mb-4"
                        text={currentLesson.steps[1]}
                        isActive={isSpeaking && currentIndex === 3}
                        currentCharIndex={currentCharIndex}
                      />
                      <img src={additionalView2ImgC} alt="Detail View" className="software-screenshot screenshot-wide" />
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'isometric' && (
                <>
                  <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2" style={{ marginTop: "-3rem" }}>
                    <div className="step-header" style={{ marginLeft: "3rem" }}>
                      <span className="step-number">d</span>
                      <KaraokeLessonText
                        as="span"
                        className="step-label"
                        text="Isometric View"
                        isActive={isSpeaking && currentIndex === 2}
                        currentCharIndex={currentCharIndex}
                      />
                    </div>
                    <div className="step-description">
                      <img src={additionalView3ImgD} alt="Isometric Projection" className="software-screenshot screenshot-wide" />
                    </div>
                  </div>

                  <div className={`instruction-step ${currentIndex === 3 ? "reading-active" : ""}`} data-reading-index="3" style={{ marginTop: "-3rem" }}>
                    <div className="step-header" style={{ marginLeft: "3rem" }}>
                      <span className="step-number">e</span>
                      <KaraokeLessonText
                        as="span"
                        className="step-label"
                        text="Cross-sectional Depth"
                        isActive={isSpeaking && currentIndex === 3}
                        currentCharIndex={currentCharIndex}
                      />
                    </div>
                    <div className="step-description">
                      <KaraokeLessonText
                        className="p-flush mb-4"
                        text={currentLesson.steps[1]}
                        isActive={isSpeaking && currentIndex === 3}
                        currentCharIndex={currentCharIndex}
                      />
                      <img src={additionalView3ImgE} alt="Section Depth" className="software-screenshot screenshot-wide" />
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'trim' && (
                <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2" style={{ marginTop: "-3rem" }}>
                  <div className="step-header" style={{ marginLeft: "3rem" }}>
                    <span className="step-number">f</span>
                    <KaraokeLessonText
                      as="span"
                      className="step-label"
                      text="Trim"
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
                    <img src={additionalView4ImgF} alt="Trim Command" className="software-screenshot screenshot-wide mb-4" />
                  </div>
                </div>
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

export default AdditionalViewLesson;


