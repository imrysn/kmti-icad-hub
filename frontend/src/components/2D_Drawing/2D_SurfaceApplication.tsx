import React, { useState, useEffect } from "react";
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
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const SurfaceApplicationLesson: React.FC<SurfaceApplicationLessonProps> = ({
  onNextLesson,
  onPrevLesson,
  nextLabel
}) => {
  const TABS = [
    { id: 'shotblasting', label: 'Shotblasting' },
    { id: 'machining', label: 'Machining' }
  ];

  const [activeTab, setActiveTab] = useState<string>(() => {
    return localStorage.getItem('2d-surface-app-active-tab') || TABS[0].id;
  });

  const { scrollProgress, containerRef, speak, stop, isSpeaking, currentIndex, currentCharIndex } = useLessonCore(`2d-surface-app-${activeTab}`);

  useEffect(() => {
    localStorage.setItem('2d-surface-app-active-tab', activeTab);
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
    '2d-surface-app-shotblasting': {
      title: 'APPLICATION OF SURFACE',
      subtitle: 'Techniques for material black skin removal using Shotblasting.',
      steps: [
        "Before Surface Treatment, material black skin must be removed. Shotblasting is used for stress removal after welding, mechanical cleaning, and fatigue resistance.",
        "Shotblasting increases corrosion resistance for parts exposed to friction and heat. Ensure all contours are properly blasted before applying final coatings."
      ]
    },
    '2d-surface-app-machining': {
      title: 'APPLICATION OF SURFACE',
      subtitle: 'Surface preparation using controlled machining processes.',
      steps: [
        "If shotblasting is not necessary, machine all sides to remove black skin and achieve the final shape. For polished materials where black skin is not present, skin removal is not necessary."
      ]
    }
  };

  const currentLesson = LESSON_DATA[`2d-surface-app-${activeTab}`] || LESSON_DATA['2d-surface-app-shotblasting'];

  return (
    <div className={`course-lesson-container`} ref={containerRef}>
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
              {activeTab === 'shotblasting' && (
                <>
                  <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2" style={{ marginTop: "-2rem" }}>
                    <div className="step-header">
                      <span className="step-number">1</span>
                      <KaraokeLessonText
                        as="span"
                        className="step-label"
                        text="Shotblasting Purpose"
                        isActive={isSpeaking && currentIndex === 2}
                        currentCharIndex={currentCharIndex}
                      />
                    </div>
                    <div className="step-description">
                      <div className="red-text mb-4">
                        <KaraokeLessonText
                          text={currentLesson.steps[0]}
                          isActive={isSpeaking && currentIndex === 2}
                          currentCharIndex={currentCharIndex}
                        />
                      </div>
                      <img src={shotblast1Img} alt="Shotblasting Application" className="software-screenshot screenshot-wide" />
                    </div>
                  </div>

                  <div className={`instruction-step ${currentIndex === 3 ? "reading-active" : ""}`} data-reading-index="3">
                    <div className="step-header">
                      <span className="step-number">2</span>
                      <KaraokeLessonText
                        as="span"
                        className="step-label"
                        text="Stress Relief & Cleaning"
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
                      <img src={shotblast2Img} alt="Black Skin Removal" className="software-screenshot screenshot-wide" />
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'machining' && (
                <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2" style={{ marginTop: "-2rem" }}>
                  <div className="step-header">
                    <span className="step-number">1</span>
                    <KaraokeLessonText
                      as="span"
                      className="step-label"
                      text="Machining Preparation"
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
                    <div className="flex-col gap-4">
                      <img src={machiningImg} alt="Machining All Sides" className="software-screenshot screenshot-wide" />
                      <img src={machining2Img} alt="Polished Material Check" className="software-screenshot screenshot-wide" />
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

export default SurfaceApplicationLesson;

