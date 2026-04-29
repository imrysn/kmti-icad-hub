/** * 3D_Boolean.tsx – Boolean operations lessons (Consolidated) */

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLessonCore } from "../../hooks/useLessonCore";
import { ReadAloudButton } from "../ReadAloudButton";
import "../../styles/3D_Modeling/CourseLesson.css";

/* Boolean (1) Assets */
import booleanOpMenu from "../../assets/3D_Image_File/boolean1_boolean_operation.png";
import unionIcon from "../../assets/3D_Image_File/boolean1_union.png";
import select3D from "../../assets/3D_Image_File/boolean1_select3d.png";
import subtractIcon from "../../assets/3D_Image_File/boolean1_subtract.png";
import subtractEntity from "../../assets/3D_Image_File/boolean1_subtract_entity.png";
import subtractAfter from "../../assets/3D_Image_File/boolean1_subtract_after_subtraction.png";
import subtractRetain from "../../assets/3D_Image_File/boolean1_subtract_retain_entities.png";
import booleanSubtract from "../../assets/3D_Image_File/boolean1_boolean_subtract.png";
import leftClick from "../../assets/3D_Image_File/left_click.png";

/* Boolean (2) Assets */
import intersectIcon from "../../assets/3D_Image_File/boolean2_intersect.png";
import intersectingEntities from "../../assets/3D_Image_File/boolean2_intersecting_entities.png";
import selectEntity from "../../assets/3D_Image_File/boolean2_select_entity.png";
import selectOk from "../../assets/3D_Image_File/boolean2_select_ok.png";
import componentIcon from "../../assets/3D_Image_File/boolean2_component.png";
import componentSeparate from "../../assets/3D_Image_File/boolean2_component_separate_all_components.png";
import componentOk from "../../assets/3D_Image_File/boolean2_component_select_ok.png";
import componentSeparated from "../../assets/3D_Image_File/boolean2_component_separated.png";

interface BooleanLessonProps {
  nextLabel?: string;
  subLessonId: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const BooleanLesson: React.FC<BooleanLessonProps> = ({ subLessonId, onNextLesson, onPrevLesson, nextLabel }) => {
  const [activeTab, setActiveTab] = useState<"union" | "subtract" | "intersect" | "separate">(() => {
    return (localStorage.getItem(`${subLessonId}-tab`) as any) || 'union';
  });

  useEffect(() => {
    localStorage.setItem(`${subLessonId}-tab`, activeTab);
  }, [subLessonId, activeTab]);

  const {
    scrollProgress,
    containerRef,
    speak,
    stop,
    isSpeaking,
    currentIndex
  } = useLessonCore(`${subLessonId}-${activeTab}`);

  const unionSteps = [
    "Step 1: Select Union from the menu.",
    "Step 2: Select all 3D entities for joining and click GO."
  ];

  const subtractSteps = [
    "Step 1: Select Subtract from the icon menu.",
    "Step 2: First, select the Target entity which is the Main Part.",
    "Step 3: Select the tool entities and click GO. The tool entities will disappear and become cutouts."
  ];

  const intersectSteps = [
    "Step 1: Select Intersect from the menu.",
    "Step 2: Select the intersecting entities and click GO."
  ];

  const separateSteps = [
    "Step 1: Select the desired components to be separated from the solid entity and click GO.",
    "Step 2: Separated components will be displayed as CSG solids. Select OK to confirm.",
    "Step 3: Or select the entire solid entity to separate all components at once."
  ];

  const getStepClass = (stepId: string) => "instruction-step";

  const tabs = [
    { id: "union", label: "Union" },
    { id: "subtract", label: "Subtract" },
    { id: "intersect", label: "Intersect" },
    { id: "separate", label: "Separate Entity" },
  ];

  const handleNext = () => {
    if (activeTab === "union") setActiveTab("subtract");
    else if (activeTab === "subtract") setActiveTab("intersect");
    else if (activeTab === "intersect") setActiveTab("separate");
    else if (onNextLesson) onNextLesson();
  };

  const handlePrev = () => {
    if (activeTab === "separate") setActiveTab("intersect");
    else if (activeTab === "intersect") setActiveTab("subtract");
    else if (activeTab === "subtract") setActiveTab("union");
    else if (onPrevLesson) onPrevLesson();
  };

  return (
    <div className={`course-lesson-container ${isSpeaking ? 'is-reading' : ''}`} ref={containerRef}>
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      <div className="lesson-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => setActiveTab(tab.id as any)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <section className="lesson-intro">
        <h3 className="section-title">Boolean Operation</h3>
        <div>
          <div>
            <img src={booleanOpMenu} alt="Boolean Operation Menu" className="software-screenshot screenshot-small" style={{ height: '200px' }} />
          </div>
        </div>
      </section>

      <div className="lesson-grid single-card">
        <div className="fade-in">
          {activeTab === "union" && (
            <div className={`lesson-card tab-content ${isSpeaking ? 'reading-active' : ''}`}>
              <div className="card-header">
                <h4>UNION</h4>
                <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(unionSteps)} onStop={stop} />
              </div>
              <p className="p-flush" style={{ marginTop: "-2rem" }}>Tool for joining 3D entities into a single entity.</p>

              <div className={`instruction-step ${currentIndex === 0 ? "reading-active" : ""}`} data-reading-index="0">
                <div className="step-header">
                  <span className="step-number">1 </span>
                  <span className="step-label">Select <strong className="red-text">Union</strong> from the icon menu.</span>
                </div>
                <div className="step-description">
                  <div className="screenshot-wrapper">
                    <img src={unionIcon} alt="Union Icon" className="software-screenshot screenshot-small" style={{ height: '100px' }} />
                  </div>
                </div>
              </div>

              <div className={`instruction-step ${currentIndex === 1 ? "reading-active" : ""}`} data-reading-index="1">
                <div className="step-header">
                  <span className="step-number">2 </span>
                  <span className="step-label" style={{ marginTop: "-1.5rem" }}>Select all 3D entities for joining &gt; GO
                    <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '40px', margin: '0 8px' }} />
                  </span>
                </div>

                <div className="section-divider" style={{ margin: "1rem" }}></div>
                <div className={`instruction-step ${currentIndex === 1 ? "reading-active" : ""}`} data-reading-index="1">
                  <div className="card-header"><h4>RESULT</h4></div>
                  <div className="flex-row-wrap mt-8" style={{ gap: '2rem' }}>
                    <img src={select3D} alt="Select 3D entities" className="software-screenshot" style={{ width: '900px', marginTop: "1rem" }} />
                  </div>
                </div>


              </div>

              <div className="lesson-navigation">
                <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button>
                <button className="nav-button next" onClick={handleNext}>Next <ChevronRight size={18} /></button>
              </div>
            </div>
          )}

          {activeTab === "subtract" && (
            <div className={`lesson-card tab-content ${isSpeaking ? 'reading-active' : ''}`}>
              <div className="card-header">
                <h4>SUBTRACT</h4>
                <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(subtractSteps)} onStop={stop} />
              </div>
              <p className="p-flush" style={{ marginTop: "-2rem" }} >Tool for creating cutouts on 3D entities.</p>

              <div className={`instruction-step ${currentIndex === 0 ? "reading-active" : ""}`} data-reading-index="0">
                <div className="step-header">
                  <span className="step-number">1 </span>
                  <span className="step-label">Select <strong className="red-text">Subtract</strong> from the icon menu.</span>
                </div>
                <div className="step-description">
                  <div className="screenshot-wrapper">
                    <img src={subtractIcon} alt="Subtract Icon" className="software-screenshot screenshot-small" style={{ height: '100px', marginBottom: "-2rem" }} />
                  </div>
                </div>
              </div>

              <div className={`instruction-step ${currentIndex === 1 ? "reading-active" : ""}`} data-reading-index="1">
                <div className="step-header">
                  <span className="step-number">2 </span>
                  <span className="step-label">First, select the Target entity.</span>
                </div>
                <div className="step-description">
                  <div className="flex-row-wrap mt-4" style={{ gap: '2rem' }}>
                    <div className="flex-1">
                      <ul className="list-flush">
                        <li><strong className="red-text">Target Entity:</strong> Main Part</li>
                        <li><strong className="red-text">Tool Entity:</strong> Entities to be subtracted on the target entity.</li>
                      </ul>
                    </div>
                    <div className="screenshot-wrapper">
                      <img src={subtractEntity} alt="Target and Tool Entity" className="software-screenshot screenshot-medium" style={{ height: 'auto', width: '900px', marginBottom: "-2rem" }} />
                    </div>
                  </div>
                </div>
              </div>

              <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2">
                <div className="step-header">
                  <span className="step-number">3 </span>
                  <span className="step-label" style={{ marginTop: "-1.5rem" }}>Select <strong className="text-highlight">tool entities</strong> &gt; <strong className="text-highlight">GO</strong>
                    <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '40px', margin: '0 8px' }} />
                  </span>
                </div>

                <div className="section-divider" style={{ margin: "0.5rem" }}></div>

                <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2">
                  <div className="card-header"><h4>RESULT</h4></div>
                  <div className="flex-row-wrap mt-8" style={{ gap: '2rem' }}>
                    <img src={subtractAfter} alt="Subtraction Result" className="software-screenshot" style={{ width: '900px', marginTop: "2rem" }} />
                  </div>
                </div>
              </div>

              <div className="step-description mt-4">
                <p className="p-flush" >This subtract tool will retain the tool entities after subtraction.</p>
                <div className="flex-row-wrap mt-8" style={{ gap: '2rem' }}>
                  <div className="screenshot-wrapper">
                    <img src={subtractRetain} alt="Subtract and retain entities" className="software-screenshot screenshot-small" style={{ height: '100px', marginBottom: "1rem", marginTop: "1rem" }} />
                  </div>

                  <div className="section-divider" style={{ margin: "2rem" }}></div>

                  <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2">
                    <div className="card-header"><h4>RESULT</h4></div>
                    <div className="flex-row-wrap mt-8" style={{ gap: '2rem' }}>
                      <img src={booleanSubtract} alt="Boolean Subtract Icon" className="software-screenshot screenshot-medium" style={{ height: 'auto', width: '900px' }} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="lesson-navigation">
                <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button>
                <button className="nav-button next" onClick={handleNext}>Next <ChevronRight size={18} /></button>
              </div>
            </div>
          )}

          {activeTab === "intersect" && (
            <div className={`lesson-card tab-content ${isSpeaking ? 'reading-active' : ''}`}>
              <div className="card-header">
                <h4>INTERSECT</h4>
                <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(intersectSteps)} onStop={stop} />
              </div>

              <p className="p-flush" style={{ marginTop: "-2rem" }}>Tool that creates entity of the product of two intersecting entities.</p>

              <div className={`instruction-step ${currentIndex === 0 ? "reading-active" : ""}`} data-reading-index="0">
                <div className="step-header">
                  <span className="step-number">1 </span>
                  <span className="step-label">Select <strong className="red-text">Intersect</strong> from the icon menu.</span>
                </div>
                <div className="step-description">
                  <div className="screenshot-wrapper">
                    <img src={intersectIcon} alt="Intersect Icon" className="software-screenshot screenshot-small" style={{ height: '100px' }} />
                  </div>
                </div>
              </div>

              <div className={`instruction-step ${currentIndex === 1 ? "reading-active" : ""}`} data-reading-index="1">
                <div className="step-header">
                  <span className="step-number">2 </span>
                  <span className="step-label" style={{ marginTop: "-1.5rem" }}>Select the intersecting entities &gt; GO
                    <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '40px', margin: '0 8px' }} />
                  </span>
                </div>

                <div className="step-description">
                  <p className="p-flush" style={{ marginTop: "-1rem", marginLeft: "3rem" }}>Intersecting entities will not disappear after the process.</p>

                  <div className={`instruction-step ${currentIndex === 1 ? "reading-active" : ""}`} data-reading-index="1">
                    <div className="card-header"><h4>RESULT</h4></div>
                    <div className="flex-row-wrap mt-8" style={{ gap: '2rem' }}>
                      <div className="screenshot-wrapper">
                        <img src={intersectingEntities} alt="Intersecting Entities Result" className="software-screenshot" style={{ width: '900px', marginTop: '1rem' }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lesson-navigation">
                <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button>
                <button className="nav-button next" onClick={handleNext}>Next <ChevronRight size={18} /></button>
              </div>
            </div>
          )}

          {activeTab === "separate" && (
            <div className={`lesson-card tab-content ${isSpeaking ? 'reading-active' : ''}`}>
              <div className="card-header">
                <h4>SEPARATE ENTITY</h4>
                <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(separateSteps)} onStop={stop} />
              </div>

              <p className="p-flush" style={{ marginTop: "-2rem" }}>Tool use to reverse boolean operations by creating CSG solid.</p>

              <div>
                <div className="flex-row-wrap mt-4" style={{ gap: '2rem' }}>
                  <p className="p-flush" style={{ minWidth: '250px' }}><strong className="red-text">Component:</strong> </p>
                  <p className="p-flush"> By product of boolean operations (entities joined by union, cutout, holes)</p>
                  <div className="screenshot-wrapper">
                    <img src={componentIcon} alt="Component Icon" className="software-screenshot screenshot-small" style={{ height: '100px', marginTop: "1rem" }} />
                  </div>
                </div>
              </div>

              <div className={`instruction-step ${currentIndex === 0 ? "reading-active" : ""}`} data-reading-index="0">
                <div className="step-header">
                  <span className="step-number">1 </span>
                  <span className="step-label" style={{ marginTop: "-1.5rem" }}>Select the desired components to be separate from the solid entity &gt; GO
                    <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '40px', margin: '0 8px' }} />
                  </span>
                </div>
              </div>

              <div className={`instruction-step ${currentIndex === 1 ? "reading-active" : ""}`} data-reading-index="1">
                <div className="step-header" style={{ marginTop: "2rem", marginBottom: "1rem" }}>
                  <span className="step-number">2 </span>
                  <span className="step-label">Separated components will be displayed in a form of CSG solid. Select OK.
                  </span>
                </div>

                <div className="flex-row-wrap mt-4" style={{ gap: '2rem' }}>
                  <div className="screenshot-wrapper">
                    <img src={componentOk} alt="Confirm Dialog" className="software-screenshot" style={{ height: 'auto', width: '350px' }} />
                  </div>

                  <div className="screenshot-wrapper">
                    <img src={componentSeparated} alt="Separated Result" className="software-screenshot" style={{ height: 'auto', width: '400px', marginLeft: "24rem", marginTop: "-9.1rem" }} />
                  </div>
                </div>
              </div>

              <div className="screenshot-wrapper" style={{ marginTop: "-3rem", marginBottom: "2rem" }}>
                <img src={componentSeparate} alt="Separate All Components" className="software-screenshot screenshot-small" style={{ height: '100px', marginTop: "1rem" }} />
                <p className="p-flush" style={{ marginTop: "1rem" }}> This tool is use to separate all components from the solid entity.</p>
              </div>

              <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2">
                <div className="step-header" style={{ marginBottom: "1rem" }}>
                  <span className="step-number">3 </span>
                  <span className="step-label">Select the solid entity &gt; GO to separate all components at once. Then select OK</span>
                </div>
                <div className="step-description">
                  <div className="flex-row-center--wrap" style={{ gap: '2rem', justifyContent: 'center' }}>
                    <div className="screenshot-wrapper">
                      <img src={selectOk} alt="Confirm Dialog All" className="software-screenshot screenshot-medium" style={{ height: 'auto', width: '350px' }} />
                    </div>
                    <div className="screenshot-wrapper">
                      <img src={selectEntity} alt="All Separated Result" className="software-screenshot screenshot-medium" style={{ height: 'auto', width: '400px', marginLeft: "24rem", marginTop: "-9.1rem" }} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="lesson-navigation">
                <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button>
                <button className="nav-button next" onClick={handleNext}>{nextLabel || 'Next Lesson'} <ChevronRight size={18} /></button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BooleanLesson;