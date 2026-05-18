import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ReadAloudButton } from "../ReadAloudButton";
import { KaraokeLessonText } from "../KaraokeLessonText";
import { useLessonCore } from "../../hooks/useLessonCore";

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
    { id: 'move-view', label: 'Move View' },
    { id: 'alignment-delete', label: 'Alignment & Delete' }
  ];

  const [activeTab, setActiveTab] = useState<string>(() => {
    return localStorage.getItem('2d-operal-view-active-tab') || TABS[0].id;
  });

  const { scrollProgress, containerRef, speak, stop, isSpeaking, currentIndex, currentCharIndex } = useLessonCore(`2d-operal-view-${activeTab}`);

  useEffect(() => {
    localStorage.setItem('2d-operal-view-active-tab', activeTab);
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
    '2d-operal-view-move-view': {
      title: 'OPERATE VIEW',
      subtitle: 'Manipulating drafting views including moving, aligning, and managing projections.',
      steps: [
        "Move View: Use this command to reposition technical views on the template. For Isometric views, position them freely without overlapping. For Orthographic views, moving one will move all aligned views simultaneously.",
        "Alignment Standard: Position isometric views carefully—not too far or overlapping. Ensure all projected views remain parallel and aligned to maintain professional drafting standards."
      ]
    },
    '2d-operal-view-alignment-delete': {
      title: 'OPERATE VIEW',
      subtitle: 'Manipulating drafting views including moving, aligning, and managing projections.',
      steps: [
        "View Alignment: If views are not aligned, use the create-three-view tool to adjust. Aligning lines will appear as guides to help you restore proper projection integrity.",
        "Delete View: Select any unnecessary views, click GO, and confirm in the dialog box to remove them from your drawing template."
      ]
    }
  };

  const currentLesson = LESSON_DATA[`2d-operal-view-${activeTab}`] || LESSON_DATA['2d-operal-view-move-view'];

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
              {activeTab === 'move-view' && (
                <>
                  <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2" style={{ marginTop: "-2rem" }}>
                    <div className="step-header">
                      <span className="step-number">1</span>
                      <KaraokeLessonText
                        as="span"
                        className="step-label"
                        text="Move View Operation"
                        isActive={isSpeaking && currentIndex === 2}
                        currentCharIndex={currentCharIndex}
                      />
                    </div>
                    <div className="step-description">
                      <img src={operateView1ImgA} alt="Move View Menu" className="software-screenshot screenshot-medium mb-4" />
                      <div className="red-text">
                        <p><strong>Isometric Spacing:</strong> Views must not be too close, too far, or overlap with orthographic views.</p>
                      </div>
                      <img src={operateView1ImgA1} alt="Isometric View" className="software-screenshot screenshot-wide" />
                    </div>
                  </div>

                  <div className={`instruction-step ${currentIndex === 3 ? "reading-active" : ""}`} data-reading-index="3">
                    <div className="step-header">
                      <span className="step-number">2</span>
                      <KaraokeLessonText
                        as="span"
                        className="step-label"
                        text="Orthographic Alignment Sync"
                        isActive={isSpeaking && currentIndex === 3}
                        currentCharIndex={currentCharIndex}
                      />
                    </div>
                    <div className="step-description">
                      <div className="red-text mb-4">
                        <p><strong>Projection Rule:</strong> All projected views must always remain aligned. Moving one will move all simultaneous aligned views.</p>
                      </div>
                      <img src={operateView1ImgB2} alt="Orthographic Sync" className="software-screenshot screenshot-wide" />
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'alignment-delete' && (
                <>
                  <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2" style={{ marginTop: "-2rem" }}>
                    <div className="step-header">
                      <span className="step-number">1</span>
                      <KaraokeLessonText
                        as="span"
                        className="step-label"
                        text="Create Three-View Alignment"
                        isActive={isSpeaking && currentIndex === 2}
                        currentCharIndex={currentCharIndex}
                      />
                    </div>
                    <div className="step-description">
                      <div className="red-text mb-4">
                        <p><strong>Guide Tip:</strong> Use the three-view tool to restore alignment. Visible guides will appear during adjustment.</p>
                      </div>
                      <img src={operateView2ImgB3} alt="Alignment Guides" className="software-screenshot screenshot-wide" />
                    </div>
                  </div>

                  <div className={`instruction-step ${currentIndex === 3 ? "reading-active" : ""}`} data-reading-index="3">
                    <div className="step-header">
                      <span className="step-number">2</span>
                      <KaraokeLessonText
                        as="span"
                        className="step-label"
                        text="Delete View Cleanup"
                        isActive={isSpeaking && currentIndex === 3}
                        currentCharIndex={currentCharIndex}
                      />
                    </div>
                    <div className="step-description">
                      <KaraokeLessonText
                        className="p-flush mb-4"
                        text="Select unnecessary views, click GO, and confirm in the dialog box to maintain a clean template."
                        isActive={isSpeaking && currentIndex === 3}
                        currentCharIndex={currentCharIndex}
                      />
                      <div className="flex-col gap-4">
                        <img src={operateView2ImgB1} alt="Delete Command" className="software-screenshot screenshot-medium" />
                        <img src={operateView2ImgB2} alt="Confirmation Dialog" className="software-screenshot screenshot-wide" />
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
