import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ReadAloudButton } from "../ReadAloudButton";
import { KaraokeLessonText } from "../KaraokeLessonText";
import { useLessonCore } from "../../hooks/useLessonCore";

import "../../styles/2D_Drawing/CourseLesson.css";

/* Importing assets for Line Properties (1) */
import lineProp1Img from "../../assets/2D_Image_File/2D_line_properties_(1).png";

/* Importing assets for Line Properties (2) */
import lineProp2Img from "../../assets/2D_Image_File/2D_line_properties_(2)_6_changing_line_color.png";

/* Importing assets for Line Properties (3) */
import lineProp3Img from "../../assets/2D_Image_File/2D_line_properties_(3)_b_center_line_3.png";

/* Importing assets for Line Properties (4) */
import lineProp4Img from "../../assets/2D_Image_File/2D_line_properties_(4)_d_change_representation_parts_1.png";

interface LinePropertiesLessonProps {
  nextLabel?: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const LinePropertiesLesson: React.FC<LinePropertiesLessonProps> = ({
  onNextLesson,
  onPrevLesson,
  nextLabel
}) => {
  const TABS = [
    { id: '1', label: 'Standards Table' },
    { id: '2', label: 'External & Hidden' },
    { id: '3', label: 'Center & Dimensions' },
    { id: '4', label: 'Verification' }
  ];

  const [activeTab, setActiveTab] = useState<string>(() => {
    return localStorage.getItem('2d-line-props-active-tab') || TABS[0].id;
  });

  const { scrollProgress, containerRef, speak, stop, isSpeaking, currentIndex, currentCharIndex } = useLessonCore(`2d-line-props-${activeTab}`);

  useEffect(() => {
    localStorage.setItem('2d-line-props-active-tab', activeTab);
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
    '2d-line-props-1': {
      title: 'LINE PROPERTIES',
      subtitle: 'Technical standards for line colors, types, and thicknesses in 2D drafting.',
      steps: [
        "Line Standards: Review the technical table for line color and thickness. Each color corresponds to a specific line weight used in the standard KEMCO template."
      ]
    },
    '2d-line-props-2': {
      title: 'LINE PROPERTIES',
      subtitle: 'Technical standards for line colors, types, and thicknesses in 2D drafting.',
      steps: [
        "External and Hidden Lines: Visible edges use thick lines (White), while hidden features use dashed thin lines (Yellow). Ensure your drawing clearly distinguishes these for fabrication."
      ]
    },
    '2d-line-props-3': {
      title: 'LINE PROPERTIES',
      subtitle: 'Technical standards for line colors, types, and thicknesses in 2D drafting.',
      steps: [
        "Center Lines and Dimensions: Center lines use long-short dash patterns (Red). Dimensions and technical notes are typically assigned to specific layers with uniform thickness."
      ]
    },
    '2d-line-props-4': {
      title: 'LINE PROPERTIES',
      subtitle: 'Technical standards for line colors, types, and thicknesses in 2D drafting.',
      steps: [
        "Verification: Use the line properties command to audit your entities. All lines must match the established standards before the drawing is submitted for approval."
      ]
    }
  };

  const currentLesson = LESSON_DATA[`2d-line-props-${activeTab}`] || LESSON_DATA['2d-line-props-1'];

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
              {activeTab === '1' && (
                <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2" style={{ marginTop: "-2rem" }}>
                  <div className="step-header">
                    <span className="step-number">1</span>
                    <KaraokeLessonText
                      as="span"
                      className="step-label"
                      text="Line Standards Table"
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
                    <div className="lesson-table-container mb-4">
                      <table className="lesson-table">
                        <thead>
                          <tr>
                            <th>Color</th>
                            <th>Thickness</th>
                            <th>Type</th>
                            <th>Purpose</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr><td>White</td><td>0.35mm</td><td>Solid</td><td>External lines, visible edges</td></tr>
                          <tr><td>Yellow</td><td>0.18mm</td><td>Dashed</td><td>Hidden lines</td></tr>
                          <tr><td>Red</td><td>0.18mm</td><td>Dash-Dot</td><td>Center lines, symmetry</td></tr>
                        </tbody>
                      </table>
                    </div>
                    <img src={lineProp1Img} alt="Line Properties Overview" className="software-screenshot screenshot-wide" />
                  </div>
                </div>
              )}

              {activeTab === '2' && (
                <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2" style={{ marginTop: "-2rem" }}>
                  <div className="step-header">
                    <span className="step-number">1</span>
                    <KaraokeLessonText
                      as="span"
                      className="step-label"
                      text="External & Hidden Lines"
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
                    <img src={lineProp2Img} alt="External and Hidden Lines" className="software-screenshot screenshot-wide" />
                  </div>
                </div>
              )}

              {activeTab === '3' && (
                <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2" style={{ marginTop: "-2rem" }}>
                  <div className="step-header">
                    <span className="step-number">1</span>
                    <KaraokeLessonText
                      as="span"
                      className="step-label"
                      text="Center Lines & Dimensions"
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
                    <img src={lineProp3Img} alt="Center Lines and Dimensions" className="software-screenshot screenshot-wide" />
                  </div>
                </div>
              )}

              {activeTab === '4' && (
                <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2" style={{ marginTop: "-2rem" }}>
                  <div className="step-header">
                    <span className="step-number">1</span>
                    <KaraokeLessonText
                      as="span"
                      className="step-label"
                      text="Property Verification"
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
                    <img src={lineProp4Img} alt="Line Property Verification" className="software-screenshot screenshot-wide" />
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

export default LinePropertiesLesson;
