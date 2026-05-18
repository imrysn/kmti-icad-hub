import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ReadAloudButton } from "../ReadAloudButton";
import { KaraokeLessonText } from "../KaraokeLessonText";
import { useLessonCore } from "../../hooks/useLessonCore";

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
    { id: 'cross-section', label: 'Cross Section View' },
    { id: 'partial-detail', label: 'Partial Section & Detail' },
    { id: 'isometric', label: 'Isometric View' },
    { id: 'trim', label: 'Trim View' }
  ];

  const [activeTab, setActiveTab] = useState<string>(() => {
    return localStorage.getItem('2d-additional-view-active-tab') || TABS[0].id;
  });

  const { scrollProgress, containerRef, speak, stop, isSpeaking, currentIndex, currentCharIndex } = useLessonCore(`2d-additional-view-${activeTab}`);

  useEffect(() => {
    localStorage.setItem('2d-additional-view-active-tab', activeTab);
    stop();
  }, [activeTab, stop]);

  const handleNext = () => {
    const currentIndex = TABS.findIndex(tab => tab.id === activeTab);
    if (currentIndex < TABS.length - 1) {
      setActiveTab(TABS[currentIndex + 1].id);
    } else if (onNextLesson) {
      onNextLesson();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrev = () => {
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
      subtitle: 'Creating and managing specialized cross-sections, details, and isometric projections in 2D drafting.',
      steps: [
        "Cross Section View: Follow steps 1 through 4 to create a basic cross section. Note that the text height of the section name must match the dimension text height."
      ]
    },
    '2d-additional-view-partial-detail': {
      title: 'ADDITIONAL VIEW',
      subtitle: 'Creating and managing specialized cross-sections, details, and isometric projections in 2D drafting.',
      steps: [
        "Partial Section: Use this tool to create a cross-section of a specific part area. Select the view, define the boundary, and set the depth.",
        "Detail Drawing: Use this to show a specific view area on a larger scale for better clarity."
      ]
    },
    '2d-additional-view-isometric': {
      title: 'ADDITIONAL VIEW',
      subtitle: 'Creating and managing specialized cross-sections, details, and isometric projections in 2D drafting.',
      steps: [
        "Isometric View: Follow the projection steps to place a 3D isometric representation on your 2D drawing.",
        "Cross-sectional Depth: Set the depth to eliminate unnecessary background parts from your section view."
      ]
    },
    '2d-additional-view-trim': {
      title: 'ADDITIONAL VIEW',
      subtitle: 'Creating and managing specialized cross-sections, details, and isometric projections in 2D drafting.',
      steps: [
        "Trim: This is another way to eliminate unneeded parts from a view. Note that Trim cannot be applied to Detail Drawings."
      ]
    }
  };

  const currentLesson = LESSON_DATA[`2d-additional-view-${activeTab}`] || LESSON_DATA['2d-additional-view-cross-section'];

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
            <div className="card-header">
              <KaraokeLessonText
                as="h4"
                className={`section-title ${currentIndex === 0 ? "reading-active" : ""}`}
                data-reading-index="0"
                text={currentLesson.title}
                isActive={isSpeaking && currentIndex === 0}
                currentCharIndex={currentCharIndex}
              />
              <ReadAloudButton 
                isSpeaking={isSpeaking} 
                onStart={() => speak([currentLesson.title, currentLesson.subtitle, ...currentLesson.steps])}
                onStop={stop}
              />
            </div>

            <div className={`instruction-step ${currentIndex === 1 ? "reading-active" : ""}`} data-reading-index="1">
              <KaraokeLessonText
                className="p-flush"
                text={currentLesson.subtitle}
                isActive={isSpeaking && currentIndex === 1}
                currentCharIndex={currentCharIndex}
              />
            </div>

            <div className="flex-col tab-content fade-in">
              {activeTab === 'cross-section' && (
                <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2" style={{ marginTop: "-2rem" }}>
                  <div className="step-header">
                    <span className="step-number">1</span>
                    <KaraokeLessonText
                      as="span"
                      className="step-label"
                      text="Cross Section View Construction"
                      isActive={isSpeaking && currentIndex === 2}
                      currentCharIndex={currentCharIndex}
                    />
                  </div>
                  <div className="step-description">
                    <img src={additionalView1Img1} alt="Cross Section View Steps" className="software-screenshot screenshot-wide mb-4" />
                    <div className="red-text">
                      <p><strong>Standard Rule:</strong> The text height of the section name should be the same with the dimension text height.</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'partial-detail' && (
                <>
                  <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2" style={{ marginTop: "-2rem" }}>
                    <div className="step-header">
                      <span className="step-number">1</span>
                      <KaraokeLessonText
                        as="span"
                        className="step-label"
                        text="Partial Section Creation"
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
                    <div className="step-header">
                      <span className="step-number">2</span>
                      <KaraokeLessonText
                        as="span"
                        className="step-label"
                        text="Detail Drawing Scale"
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
                  <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2" style={{ marginTop: "-2rem" }}>
                    <div className="step-header">
                      <span className="step-number">1</span>
                      <KaraokeLessonText
                        as="span"
                        className="step-label"
                        text="Isometric View Projection"
                        isActive={isSpeaking && currentIndex === 2}
                        currentCharIndex={currentCharIndex}
                      />
                    </div>
                    <div className="step-description">
                      <img src={additionalView3ImgD} alt="Isometric Projection" className="software-screenshot screenshot-wide" />
                    </div>
                  </div>

                  <div className={`instruction-step ${currentIndex === 3 ? "reading-active" : ""}`} data-reading-index="3">
                    <div className="step-header">
                      <span className="step-number">2</span>
                      <KaraokeLessonText
                        as="span"
                        className="step-label"
                        text="Cross-sectional Depth Settings"
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
                <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2" style={{ marginTop: "-2rem" }}>
                  <div className="step-header">
                    <span className="step-number">1</span>
                    <KaraokeLessonText
                      as="span"
                      className="step-label"
                      text="Trim View Operations"
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
                    <div className="red-text">
                      <p><strong>Restriction:</strong> Trim command cannot be applied to Detail Drawings.</p>
                    </div>
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


