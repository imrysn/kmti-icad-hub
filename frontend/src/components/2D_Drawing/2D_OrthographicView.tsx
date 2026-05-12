import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ReadAloudButton } from "../ReadAloudButton";
import { useLessonCore } from "../../hooks/useLessonCore";
import { KaraokeLessonText } from "../KaraokeLessonText";

import "../../styles/2D_Drawing/CourseLesson.css";

/* Importing assets for Orthographic View */
import drawingTemplateImg from "../../assets/2D_Image_File/2D_create_orthographic_view_(1)_1.png";
import createViewImg from "../../assets/2D_Image_File/2D_create_orthographic_view_(1)_a.png";
import scalingImg from "../../assets/2D_Image_File/2D_create_orthographic_view_(1)_b.png";
import hiddenLineDialogImg from "../../assets/2D_Image_File/2D_create_orthographic_view_(2)_c.2.png";
import tangentLineDialogImg from "../../assets/2D_Image_File/2D_create_orthographic_view_(2)_d.2.png";
import highPrecisionDialogImg from "../../assets/2D_Image_File/2D_create_orthographic_view_(3)_e1.png";

interface OrthographicViewLessonProps {
  nextLabel?: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const OrthographicViewLesson: React.FC<OrthographicViewLessonProps> = ({
  onNextLesson,
  onPrevLesson,
  nextLabel
}) => {
  const TABS = [
    { id: 'template', label: 'Drawing Template' },
    { id: 'views', label: 'Create / Delete Views' },
    { id: 'scale', label: 'Scale' },
    { id: 'hidden', label: 'Hidden Line' },
    { id: 'tangent', label: 'Tangent Line' },
    { id: 'precision', label: 'High Precision' }
  ];

  const [activeTab, setActiveTab] = useState<string>(() => {
    return localStorage.getItem('2d-orthographic-active-tab') || TABS[0].id;
  });

  const { scrollProgress, containerRef, speak, stop, isSpeaking, currentIndex, currentCharIndex } = useLessonCore(`2d-orthographic-${activeTab}`);

  useEffect(() => {
    localStorage.setItem('2d-orthographic-active-tab', activeTab);
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

  const LESSON_DATA: Record<string, { title: string; steps: string[] }> = {
    '2d-orthographic-template': {
      title: 'Inserting Drawing Template',
      steps: [""]
    },
    '2d-orthographic-views': {
      title: 'Creating Orthographic View / Delete Views',
      steps: [""]
    },
    '2d-orthographic-scale': {
      title: 'SCALE',
      steps: [
        "Set the scale of selected view. When changing the scale, take note to always use the Projection Properties.",
        "Note: Do not change the scale on the toolbar because the dimensions and scales will not update according to the set scale.",
        "Note: When changing the scale of a standard view, other standard views also change the scale. Cross section view and detail view need to change the scale separately."
      ]
    },
    '2d-orthographic-hidden': {
      title: 'HIDDEN LINE',
      steps: [
        "The hidden line is not automatically shown when orthographic view was inserted. It can be shown through the Projection Properties."
      ]
    },
    '2d-orthographic-tangent': {
      title: 'TANGENT LINE',
      steps: [
        "Shows and hides lines from fillets of a view. The tangent lines from chamfers are shown automatically during insertion of orthographic view."
      ]
    },
    '2d-orthographic-precision': {
      title: 'HIGH PRECISION',
      steps: [
        "Used for better projection of small components or parts on a part or assembly. When High precision is unchecked, some lines in the detail drawing are broken and some lines are missing. This is commonly used on assembly drawings but can also be used for parts, if necessary."
      ]
    }
  };

  const currentLesson = LESSON_DATA[`2d-orthographic-${activeTab}`] || { title: 'ORTHOGRAPHIC VIEW', steps: [] };

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
                onStart={() => speak([currentLesson.title, ...currentLesson.steps])}
                onStop={stop}
              />
            </div>

            <div className="flex-col tab-content fade-in">
              {activeTab === 'template' && (
                <div className={`instruction-step ${currentIndex === 1 ? "reading-active" : ""}`} data-reading-index="1" style={{ marginTop: "-2rem" }}> 
                  <div className="step-header">
                    <KaraokeLessonText
                      as="span"
                      className="step-label"
                      text=""
                      isActive={isSpeaking && currentIndex === 1}
                      currentCharIndex={currentCharIndex}
                    />
                  </div>
                  <div className="step-description">
                    <img src={drawingTemplateImg} alt="Inserting Drawing Template" className="software-screenshot screenshot-wide mt-4" />
                  </div>
                </div>
              )}

              {activeTab === 'views' && (
                <div className={`instruction-step ${currentIndex === 1 ? "reading-active" : ""}`} data-reading-index="1" style={{ marginTop: "-2rem" }}>
                  <div className="step-header">
                    <KaraokeLessonText
                      as="span"
                      className="step-label"
                      text=""
                      isActive={isSpeaking && currentIndex === 1}
                      currentCharIndex={currentCharIndex}
                    />
                  </div>
                  <div className="step-description">
                    <img src={createViewImg} alt="Creating Orthographic Views" className="software-screenshot screenshot-wide mt-4" />
                  </div>
                </div>
              )}

              {activeTab === 'scale' && (
                <div className={`instruction-step ${currentIndex >= 1 && currentIndex <= 3 ? "reading-active" : ""}`} data-reading-index="1" style={{ marginTop: "-2rem" }}>
                  <div className="step-header">
                    <KaraokeLessonText
                      as="span"
                      className="step-label"
                      text=""
                      isActive={isSpeaking && currentIndex === 1}
                      currentCharIndex={currentCharIndex}
                    />
                  </div>
                  <div className="step-description">
                    <KaraokeLessonText
                      className="p-flush"
                      text={currentLesson.steps[0]}
                      isActive={isSpeaking && currentIndex === 1}
                      currentCharIndex={currentCharIndex}
                    />
                    <div className={`instruction-box ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2" style={{marginTop: "1rem"}}>
                      <p className="p-flush"><strong className="red-text">Note:</strong></p>
                      <KaraokeLessonText
                        as="div"
                        className="p-flush"
                        text={currentLesson.steps[1]}
                        isActive={isSpeaking && currentIndex === 2}
                        currentCharIndex={currentCharIndex}
                      />
                    </div>
                    <img src={scalingImg} alt="Scaling and Projection Properties" className="software-screenshot screenshot-wide mt-4" />
                    <div className={`instruction-box ${currentIndex === 3 ? "reading-active" : ""}`} data-reading-index="3" style={{marginTop: "2rem"}}>
                      <p className="p-flush"><strong className="red-text">Note:</strong></p>
                      <KaraokeLessonText
                        as="div"
                        className="p-flush"
                        text={currentLesson.steps[2]}
                        isActive={isSpeaking && currentIndex === 3}
                        currentCharIndex={currentCharIndex}
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'hidden' && (
                <div className={`instruction-step ${currentIndex === 1 ? "reading-active" : ""}`} data-reading-index="1" style={{ marginTop: "-2rem" }}>
                  <div className="step-header">
                    <KaraokeLessonText
                      as="span"
                      className="step-label"
                      text=""
                      isActive={isSpeaking && currentIndex === 1}
                      currentCharIndex={currentCharIndex}
                    />
                  </div>
                  <div className="step-description">
                    <KaraokeLessonText
                      className="p-flush"
                      text={currentLesson.steps[0]}
                      isActive={isSpeaking && currentIndex === 1}
                      currentCharIndex={currentCharIndex}
                    />
                    <img src={hiddenLineDialogImg} alt="Hidden Line Dialog" className="software-screenshot screenshot-wide mt-4" />
                  </div>
                </div>
              )}

              {activeTab === 'tangent' && (
                <div className={`instruction-step ${currentIndex === 1 ? "reading-active" : ""}`} data-reading-index="1" style={{ marginTop: "-2rem" }}>
                  <div className="step-header">
                    <KaraokeLessonText
                      as="span"
                      className="step-label"
                      text=""
                      isActive={isSpeaking && currentIndex === 1}
                      currentCharIndex={currentCharIndex}
                    />
                  </div>
                  <div className="step-description">
                    <KaraokeLessonText
                      className="p-flush"
                      text={currentLesson.steps[0]}
                      isActive={isSpeaking && currentIndex === 1}
                      currentCharIndex={currentCharIndex}
                    />
                    <img src={tangentLineDialogImg} alt="Tangent Line Dialog" className="software-screenshot screenshot-wide mt-4" />
                  </div>
                </div>
              )}

              {activeTab === 'precision' && (
                <div className={`instruction-step ${currentIndex === 1 ? "reading-active" : ""}`} data-reading-index="1" style={{ marginTop: "-2rem" }}>
                  <div className="step-header">
                    <KaraokeLessonText
                      as="span"
                      className="step-label"
                      text=""
                      isActive={isSpeaking && currentIndex === 1}
                      currentCharIndex={currentCharIndex}
                    />
                  </div>
                  <div className="step-description">
                    <KaraokeLessonText
                      className="p-flush"
                      text={currentLesson.steps[0]}
                      isActive={isSpeaking && currentIndex === 1}
                      currentCharIndex={currentCharIndex}
                    />
                    <img src={highPrecisionDialogImg} alt="High Precision Dialog" className="software-screenshot screenshot-wide mt-4" />
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

export default OrthographicViewLesson;

