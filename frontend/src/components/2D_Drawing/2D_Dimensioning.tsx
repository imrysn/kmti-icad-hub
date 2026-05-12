import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ReadAloudButton } from "../ReadAloudButton";
import { KaraokeLessonText } from "../KaraokeLessonText";
import { useLessonCore } from "../../hooks/useLessonCore";

import "../../styles/2D_Drawing/CourseLesson.css";

/* Importing assets for Dimensioning (1) */
import diimensioningImg from "../../assets/2D_Image_File/2D_dimensioning(1)_diimensioning.png";
import standardDimMenuImg from "../../assets/2D_Image_File/2D_dimensioning(1)_a.1_standard_dimension.png";
import seriesDimMenuImg from "../../assets/2D_Image_File/2D_dimensioning(1)_a.2_series_dimension.png";

/* Importing assets for Dimensioning (2) */
import editDimDrawingImg from "../../assets/2D_Image_File/2D_dimensioning_b.1_edit_dimension_charac.png";
import toleranceImg from "../../assets/2D_Image_File/2D_dimensioning_tolerance.png";
import chamferRadiusImg from "../../assets/2D_Image_File/2D_dimensioning_chamfer_radius.png";

/* Importing assets for Dimensioning (3) */
import polishedMaterialImg from "../../assets/2D_Image_File/2D_dimensioning_b.2_polished_material.png";
import partNoteMenuImg from "../../assets/2D_Image_File/2D_dimensioning(3)_part_note.png";

/* Importing assets for Dimensioning (4) */
import changePosition1Img from "../../assets/2D_Image_File/2D_dimensioning(4)_b.4_change_position_1 (1).png";

/* Importing assets for Dimensioning (5) */
import breakViewWorkflowImg from "../../assets/2D_Image_File/2D_dimensioning(5)_c_dimensions_for_breakviews_1.png";

interface DimensioningLessonProps {
  nextLabel?: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const DimensioningLesson: React.FC<DimensioningLessonProps> = ({
  onNextLesson,
  onPrevLesson,
  nextLabel
}) => {
  const TABS = [
    { id: '1', label: 'Basics' },
    { id: '2', label: 'Symbols' },
    { id: '3', label: 'Materials' },
    { id: '4', label: 'Positioning' },
    { id: '5', label: 'Break Views' }
  ];

  const [activeTab, setActiveTab] = useState<string>(() => {
    return localStorage.getItem('2d-dimensioning-active-tab') || TABS[0].id;
  });

  const { scrollProgress, containerRef, speak, stop, isSpeaking, currentIndex, currentCharIndex } = useLessonCore(`2d-dimensioning-${activeTab}`);

  useEffect(() => {
    localStorage.setItem('2d-dimensioning-active-tab', activeTab);
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
    '2d-dimensioning-1': {
      title: 'DIMENSIONING',
      subtitle: 'Applying technical dimensions and tolerances to 2D drawings using standard commands.',
      steps: [
        "Put all the dimensions, symbols, and notes required in the drawing.",
        "This is the basic command for adding dimensions one by one. Select Line 1 and Line 2, then drag to the desired location.",
        "Use this for continuous linear dimensions. Select multiple lines in sequence, then click GO to place the aligned chain."
      ]
    },
    '2d-dimensioning-2': {
      title: 'DIMENSIONING',
      subtitle: 'Applying technical dimensions and tolerances to 2D drawings using standard commands.',
      steps: [
        "To add symbols like the diameter mark, select the edit characters command, click the dimension, and choose the symbol from the Mark dropdown.",
        "If fitting tolerance is required, use the convert tool to display the appropriate JIC standard values.",
        "These marks are generated automatically if your 3D model features were created correctly, so manual input is usually unnecessary."
      ]
    },
    '2d-dimensioning-3': {
      title: 'DIMENSIONING',
      subtitle: 'Applying technical dimensions and tolerances to 2D drawings using standard commands.',
      steps: [
        "Grinded materials like S45C-D and SS400-D have specific tolerance levels (like h9 or h7) and surface roughness requirements based on the grinding process.",
        "Use this tool for automatic hole detailing and quantity callouts. Select the command and click the features to place the leader notes."
      ]
    },
    '2d-dimensioning-4': {
      title: 'DIMENSIONING',
      subtitle: 'Applying technical dimensions and tolerances to 2D drawings using standard commands.',
      steps: [
        "Ensure dimensions have enough space between them. Use the change position command, click the dimension, and pick its new location.",
        "For professional drawings, align dimensions across different views. Select multiple dimensions and move them parallelly to match a reference point."
      ]
    },
    '2d-dimensioning-5': {
      title: 'DIMENSIONING',
      subtitle: 'Applying technical dimensions and tolerances to 2D drawings using standard commands.',
      steps: [
        "For long parts like shafts, use break views to fit the drawing on the template while maintaining scale for details. Remember to underline fake length dimensions.",
        "You can also apply break views to isometric representations. Use reference lines to maintain the correct cutting angle."
      ]
    }
  };

  const currentLesson = LESSON_DATA[`2d-dimensioning-${activeTab}`] || LESSON_DATA['2d-dimensioning-1'];

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
        <div className="lesson-card main-dimensioning-card">
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
                <div className="flex-col">
                  <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2" style={{ marginTop: "-2rem" }}>
                    <div className="step-header">
                      <span className="step-number">1</span>
                      <KaraokeLessonText
                        as="span"
                        className="step-label"
                        text="Dimensioning Overview"
                        isActive={isSpeaking && currentIndex === 2}
                        currentCharIndex={currentCharIndex}
                      />
                    </div>
                    <div className="step-description">
                      <KaraokeLessonText
                        className="p-flush"
                        text={currentLesson.steps[0]}
                        isActive={isSpeaking && currentIndex === 2}
                        currentCharIndex={currentCharIndex}
                      />
                      <img src={diimensioningImg} alt="Dimensioning Overview" className="software-screenshot screenshot-wide mt-4" />
                    </div>
                  </div>

                  <div className={`instruction-step ${currentIndex === 3 ? "reading-active" : ""}`} data-reading-index="3">
                    <div className="step-header">
                      <span className="step-number">2</span>
                      <KaraokeLessonText
                        as="span"
                        className="step-label"
                        text="Standard Dimension"
                        isActive={isSpeaking && currentIndex === 3}
                        currentCharIndex={currentCharIndex}
                      />
                    </div>
                    <div className="step-description">
                      <KaraokeLessonText
                        className="p-flush"
                        text={currentLesson.steps[1]}
                        isActive={isSpeaking && currentIndex === 3}
                        currentCharIndex={currentCharIndex}
                      />
                      <img src={standardDimMenuImg} alt="Standard Dimension Menu" className="software-screenshot screenshot-wide mt-4" />
                    </div>
                  </div>

                  <div className={`instruction-step ${currentIndex === 4 ? "reading-active" : ""}`} data-reading-index="4">
                    <div className="step-header">
                      <span className="step-number">3</span>
                      <KaraokeLessonText
                        as="span"
                        className="step-label"
                        text="Series Dimension"
                        isActive={isSpeaking && currentIndex === 4}
                        currentCharIndex={currentCharIndex}
                      />
                    </div>
                    <div className="step-description">
                      <KaraokeLessonText
                        className="p-flush"
                        text={currentLesson.steps[2]}
                        isActive={isSpeaking && currentIndex === 4}
                        currentCharIndex={currentCharIndex}
                      />
                      <img src={seriesDimMenuImg} alt="Series Dimension Menu" className="software-screenshot screenshot-wide mt-4" />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === '2' && (
                <div className="flex-col">
                  <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2" style={{ marginTop: "-2rem" }}>
                    <div className="step-header">
                      <span className="step-number">1</span>
                      <KaraokeLessonText
                        as="span"
                        className="step-label"
                        text="Edit Dimension Characters"
                        isActive={isSpeaking && currentIndex === 2}
                        currentCharIndex={currentCharIndex}
                      />
                    </div>
                    <div className="step-description">
                      <KaraokeLessonText
                        className="p-flush"
                        text={currentLesson.steps[0]}
                        isActive={isSpeaking && currentIndex === 2}
                        currentCharIndex={currentCharIndex}
                      />
                      <img src={editDimDrawingImg} alt="Edit Dimension Guide" className="software-screenshot screenshot-wide mt-4" />
                    </div>
                  </div>

                  <div className={`instruction-step ${currentIndex === 3 ? "reading-active" : ""}`} data-reading-index="3">
                    <div className="step-header">
                      <span className="step-number">2</span>
                      <KaraokeLessonText
                        as="span"
                        className="step-label"
                        text="Tolerance"
                        isActive={isSpeaking && currentIndex === 3}
                        currentCharIndex={currentCharIndex}
                      />
                    </div>
                    <div className="step-description">
                      <KaraokeLessonText
                        className="p-flush"
                        text={currentLesson.steps[1]}
                        isActive={isSpeaking && currentIndex === 3}
                        currentCharIndex={currentCharIndex}
                      />
                      <img src={toleranceImg} alt="Tolerance Guide" className="software-screenshot screenshot-wide mt-4" />
                    </div>
                  </div>

                  <div className={`instruction-step ${currentIndex === 4 ? "reading-active" : ""}`} data-reading-index="4">
                    <div className="step-header">
                      <span className="step-number">3</span>
                      <KaraokeLessonText
                        as="span"
                        className="step-label"
                        text="Chamfer / Radius"
                        isActive={isSpeaking && currentIndex === 4}
                        currentCharIndex={currentCharIndex}
                      />
                    </div>
                    <div className="step-description">
                      <KaraokeLessonText
                        className="p-flush"
                        text={currentLesson.steps[2]}
                        isActive={isSpeaking && currentIndex === 4}
                        currentCharIndex={currentCharIndex}
                      />
                      <img src={chamferRadiusImg} alt="Chamfer and Radius Marks" className="software-screenshot screenshot-wide mt-4" />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === '3' && (
                <div className="flex-col">
                  <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2" style={{ marginTop: "-2rem" }}>
                    <div className="step-header">
                      <span className="step-number">1</span>
                      <KaraokeLessonText
                        as="span"
                        className="step-label"
                        text="Polished Material"
                        isActive={isSpeaking && currentIndex === 2}
                        currentCharIndex={currentCharIndex}
                      />
                    </div>
                    <div className="step-description">
                      <KaraokeLessonText
                        className="p-flush"
                        text={currentLesson.steps[0]}
                        isActive={isSpeaking && currentIndex === 2}
                        currentCharIndex={currentCharIndex}
                      />
                      <div className="lesson-table-container mt-4">
                        <table className="lesson-table">
                          <thead>
                            <tr>
                              <th>Code</th>
                              <th>Details</th>
                              <th>Tolerance Level JIC B 0401</th>
                              <th>Surface Roughness Range</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>S45C-D</td>
                              <td>S45C materials which are grinded. These diameter dimensions are assured by processing of drawing</td>
                              <td>h9</td>
                              <td>over 3.2a / over 12.5S</td>
                            </tr>
                            <tr>
                              <td>S45C-CG</td>
                              <td>S45C materials which are grinded. These diameter dimensions are assured by processing of centerless grinding machine</td>
                              <td>h7</td>
                              <td>over 3.2a / over 12.5S</td>
                            </tr>
                            <tr>
                              <td>SS400-D</td>
                              <td>SS400 materials which are grinded. These diameter dimensions are assured by processing of drawing</td>
                              <td>h9</td>
                              <td>over 3.2a / over 12.5S</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <img src={polishedMaterialImg} alt="Polished Material Dialog" className="software-screenshot screenshot-wide mt-4" />
                    </div>
                  </div>

                  <div className={`instruction-step ${currentIndex === 3 ? "reading-active" : ""}`} data-reading-index="3">
                    <div className="step-header">
                      <span className="step-number">2</span>
                      <KaraokeLessonText
                        as="span"
                        className="step-label"
                        text="Part Note"
                        isActive={isSpeaking && currentIndex === 3}
                        currentCharIndex={currentCharIndex}
                      />
                    </div>
                    <div className="step-description">
                      <KaraokeLessonText
                        className="p-flush"
                        text={currentLesson.steps[1]}
                        isActive={isSpeaking && currentIndex === 3}
                        currentCharIndex={currentCharIndex}
                      />
                      <img src={partNoteMenuImg} alt="Part Note Menu" className="software-screenshot screenshot-wide mt-4" />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === '4' && (
                <div className="flex-col">
                  <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2" style={{ marginTop: "-2rem" }}>
                    <div className="step-header">
                      <span className="step-number">1</span>
                      <KaraokeLessonText
                        as="span"
                        className="step-label"
                        text="Change Position"
                        isActive={isSpeaking && currentIndex === 2}
                        currentCharIndex={currentCharIndex}
                      />
                    </div>
                    <div className="step-description">
                      <KaraokeLessonText
                        className="p-flush"
                        text={currentLesson.steps[0]}
                        isActive={isSpeaking && currentIndex === 2}
                        currentCharIndex={currentCharIndex}
                      />
                      <img src={changePosition1Img} alt="Change Position Overview" className="software-screenshot screenshot-wide mt-4" />
                    </div>
                  </div>

                  <div className={`instruction-step ${currentIndex === 3 ? "reading-active" : ""}`} data-reading-index="3">
                    <div className="step-header">
                      <span className="step-number">2</span>
                      <KaraokeLessonText
                        as="span"
                        className="step-label"
                        text="Align Dimensions"
                        isActive={isSpeaking && currentIndex === 3}
                        currentCharIndex={currentCharIndex}
                      />
                    </div>
                    <div className="step-description">
                      <div className="red-text">
                        <KaraokeLessonText
                          text={currentLesson.steps[1]}
                          isActive={isSpeaking && currentIndex === 3}
                          currentCharIndex={currentCharIndex}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === '5' && (
                <div className="flex-col">
                  <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2" style={{ marginTop: "-2rem" }}>
                    <div className="step-header">
                      <span className="step-number">1</span>
                      <KaraokeLessonText
                        as="span"
                        className="step-label"
                        text="Dimension for Break Views"
                        isActive={isSpeaking && currentIndex === 2}
                        currentCharIndex={currentCharIndex}
                      />
                    </div>
                    <div className="step-description">
                      <KaraokeLessonText
                        className="p-flush"
                        text={currentLesson.steps[0]}
                        isActive={isSpeaking && currentIndex === 2}
                        currentCharIndex={currentCharIndex}
                      />
                      <img src={breakViewWorkflowImg} alt="Break View Workflow" className="software-screenshot screenshot-wide mt-4" />
                    </div>
                  </div>

                  <div className={`instruction-step ${currentIndex === 3 ? "reading-active" : ""}`} data-reading-index="3">
                    <div className="step-header">
                      <span className="step-number">2</span>
                      <KaraokeLessonText
                        as="span"
                        className="step-label"
                        text="Isometric Break"
                        isActive={isSpeaking && currentIndex === 3}
                        currentCharIndex={currentCharIndex}
                      />
                    </div>
                    <div className="step-description">
                      <KaraokeLessonText
                        className="p-flush"
                        text={currentLesson.steps[1]}
                        isActive={isSpeaking && currentIndex === 3}
                        currentCharIndex={currentCharIndex}
                      />
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

export default DimensioningLesson;
