import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ReadAloudButton } from "../ReadAloudButton";
import { KaraokeLessonText } from "../KaraokeLessonText";
import { useLessonCore } from "../../hooks/useLessonCore";

import "../../styles/2D_Drawing/CourseLesson.css";

/* Import images */
import img2 from "../../assets/2D_Image_File/2D_normal_and_mirror_parts(1)_2.png";
import imgA1 from "../../assets/2D_Image_File/2D_normal_and_mirror_parts(2)_a_1.png";
import imgA2 from "../../assets/2D_Image_File/2D_normal_and_mirror_parts(2)_a_2.png";

interface NormalMirrorPartsLessonProps {
  nextLabel?: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const NormalMirrorPartsLesson: React.FC<NormalMirrorPartsLessonProps> = ({
  onNextLesson,
  onPrevLesson,
  nextLabel
}) => {
  const TABS = [
    { id: 'nomenclature', label: 'Nomenclature' },
    { id: 'mirror-command', label: 'Mirror Command' }
  ];

  const [activeTab, setActiveTab] = useState<string>(() => {
    return localStorage.getItem('2d-normal-mirror-active-tab') || TABS[0].id;
  });

  const { scrollProgress, containerRef, speak, stop, isSpeaking, currentIndex, currentCharIndex } = useLessonCore(`2d-normal-mirror-${activeTab}`);

  useEffect(() => {
    localStorage.setItem('2d-normal-mirror-active-tab', activeTab);
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
    '2d-normal-mirror-nomenclature': {
      title: 'NORMAL AND MIRROR PARTS',
      subtitle: 'Designating normal and mirror parts with standardized numbering and symmetry rules.',
      steps: [
        "Normal parts use an 'N' designation, while mirror parts are symmetrical, designated with 'A' and 'B' numbers. First, finalize the 'A' drawing completely.",
        "Save a copy as the 'B' designation. Mirror the part in 3D, then update the 2D views. Change side views, update isometrics, and ensure drawing numbers match."
      ]
    },
    '2d-normal-mirror-mirror-command': {
      title: 'NORMAL AND MIRROR PARTS',
      subtitle: 'Designating normal and mirror parts with standardized numbering and symmetry rules.',
      steps: [
        "Use the dedicated mirror command for rapid 2D detailing. Select the entities and define the mirror axis to create symmetrical representations instantly."
      ]
    }
  };

  const currentLesson = LESSON_DATA[`2d-normal-mirror-${activeTab}`] || LESSON_DATA['2d-normal-mirror-nomenclature'];

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
                currentCharIndex={currentIndex === 0 ? currentCharIndex : -1}
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
              {activeTab === 'nomenclature' && (
                <>
                  <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2" style={{ marginTop: "-2rem" }}>
                    <div className="step-header">
                      <span className="step-number">1</span>
                      <KaraokeLessonText
                        as="span"
                        className="step-label"
                        text="Part Nomenclature & Designation"
                        isActive={isSpeaking && currentIndex === 2}
                        currentCharIndex={currentIndex === 2 ? currentCharIndex : -1}
                      />
                    </div>
                    <div className="step-description">
                      <div className="red-text mb-4">
                        <p><strong>Normal:</strong> Example RTXXXXXX<strong>N</strong>01</p>
                        <p><strong>Mirror parts:</strong> RTXXXXXX<strong>A</strong>01 & RTXXXXXX<strong>B</strong>01 (Symmetrical)</p>
                      </div>
                    </div>
                  </div>

                  <div className={`instruction-step ${currentIndex === 3 ? "reading-active" : ""}`} data-reading-index="3">
                    <div className="step-header">
                      <span className="step-number">2</span>
                      <KaraokeLessonText
                        as="span"
                        className="step-label"
                        text="Mirror Detailing Workflow"
                        isActive={isSpeaking && currentIndex === 3}
                        currentCharIndex={currentIndex === 3 ? currentCharIndex : -1}
                      />
                    </div>
                    <div className="step-description">
                      <KaraokeLessonText
                        className="p-flush mb-4"
                        text={currentLesson.steps[1]}
                        isActive={isSpeaking && currentIndex === 3}
                        currentCharIndex={currentIndex === 3 ? currentCharIndex : -1}
                      />
                      <img src={img2} alt="Mirroring Toolbar" className="software-screenshot screenshot-wide" />
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'mirror-command' && (
                <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2" style={{ marginTop: "-2rem" }}>
                  <div className="step-header">
                    <span className="step-number">1</span>
                    <KaraokeLessonText
                      as="span"
                      className="step-label"
                      text="2D Mirror Detailing Command"
                      isActive={isSpeaking && currentIndex === 2}
                      currentCharIndex={currentIndex === 2 ? currentCharIndex : -1}
                    />
                  </div>
                  <div className="step-description">
                    <KaraokeLessonText
                      className="p-flush mb-4"
                      text={currentLesson.steps[0]}
                      isActive={isSpeaking && currentIndex === 2}
                      currentCharIndex={currentIndex === 2 ? currentCharIndex : -1}
                    />
                    <div className="flex-col gap-4">
                      <img src={imgA1} alt="Mirror Command Menu" className="software-screenshot screenshot-wide" />
                      <img src={imgA2} alt="Mirroring Operation" className="software-screenshot screenshot-wide" />
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

export default NormalMirrorPartsLesson;
