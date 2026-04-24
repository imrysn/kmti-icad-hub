/** * 3D_Boolean.tsx – Boolean operations lessons (1 and 2) */

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
  const [activeTab1, setActiveTab1] = useState<"union" | "subtract">(() => {
    return (localStorage.getItem(`${subLessonId}-tab1`) as any) || 'union';
  });
  const [activeTab2, setActiveTab2] = useState<"intersect" | "separate">(() => {
    return (localStorage.getItem(`${subLessonId}-tab2`) as any) || 'intersect';
  });

  useEffect(() => {
    localStorage.setItem(`${subLessonId}-tab1`, activeTab1);
  }, [subLessonId, activeTab1]);

  useEffect(() => {
    localStorage.setItem(`${subLessonId}-tab2`, activeTab2);
  }, [subLessonId, activeTab2]);

  // Use core hook for scroll tracking and TTS
  const {
    scrollProgress,
    containerRef,
    speak,
    stop,
    isSpeaking,
    currentIndex
  } = useLessonCore(`${subLessonId}-${activeTab1}-${activeTab2}`);

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

  const tabs1 = [
    { id: "union", label: "Union" },
    { id: "subtract", label: "Subtract" },
  ];
  const tabs2 = [
    { id: "intersect", label: "Intersect" },
    { id: "separate", label: "Separate Entity" },
  ];

  const handleNext1 = () => {
    if (activeTab1 === "union") setActiveTab1("subtract");
    else if (onNextLesson) onNextLesson();
  };

  const handlePrev1 = () => {
    if (activeTab1 === "subtract") setActiveTab1("union");
    else if (onPrevLesson) onPrevLesson();
  };

  const handleNext2 = () => {
    if (activeTab2 === "intersect") setActiveTab2("separate");
    else if (onNextLesson) onNextLesson();
  };

  const handlePrev2 = () => {
    if (activeTab2 === "separate") setActiveTab2("intersect");
    else if (onPrevLesson) onPrevLesson();
  };

  return (
    <div className="course-lesson-container" ref={containerRef}>
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      <div className="lesson-tabs">
        {subLessonId === "boolean-1" ? (
          tabs1.map((tab) => (
            <button key={tab.id} className={`tab-button ${activeTab1 === tab.id ? "active" : ""}`} onClick={() => setActiveTab1(tab.id as any)}>
              {tab.label}
            </button>
          ))
        ) : (
          tabs2.map((tab) => (
            <button key={tab.id} className={`tab-button ${activeTab2 === tab.id ? "active" : ""}`} onClick={() => setActiveTab2(tab.id as any)}>
              {tab.label}
            </button>
          ))
        )}
      </div>

      <section className="lesson-intro">
        <h3 className="section-title">Boolean operations</h3>
        <div className="instruction-box">
          <div>
            <img src={booleanOpMenu} alt="Boolean Operation Menu" className="software-screenshot screenshot-small" style={{ height: '240px' }} />
          </div>
        </div>
      </section>

      <div className="lesson-grid single-card">
        {subLessonId === "boolean-1" && (
          <div className="fade-in">
            {activeTab1 === "union" && (
              <div className="lesson-card tab-content">
                <div className="card-header">
                  <h4>UNION</h4>
                  <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(unionSteps)} onStop={stop} />
                </div>

                <div className="instruction-step">
                  <p className="p-flush text-highlight">Tool for joining 3D entities into a single entity.</p>
                </div>

                <div className={`${getStepClass("bl1u-1")} ${currentIndex === 0 ? "reading-active" : ""}`}>
                  <div className="step-header">
                    <span className="step-number">1 </span>
                    <span className="step-label">Select <strong className="text-highlight">Union</strong> from the icon menu.</span>
                  </div>
                  <div className="step-description">
                    <div className="screenshot-wrapper">
                      <img src={unionIcon} alt="Union Icon" className="software-screenshot screenshot-small" style={{ height: '170px' }} />
                    </div>
                  </div>
                </div>

                <div className="section-divider"></div>

                <div className={`${getStepClass("bl1u-2")} ${currentIndex === 1 ? "reading-active" : ""}`}>
                  <div className="step-header">
                    <span className="step-number">2 </span>
                    <span className="step-label">Select all 3D entities for joining &gt; <strong className="text-highlight">GO</strong>
                      <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '32px', margin: '0 4px' }} />
                    </span>
                  </div>
                  <div className="step-description">
                    <div className="screenshot-wrapper">
                      <img src={select3D} alt="Select 3D entities" className="software-screenshot screenshot-medium" />
                    </div>
                  </div>
                </div>

                <div className="lesson-navigation">
                  <button className="nav-button" onClick={handlePrev1}><ChevronLeft size={18} /> Previous</button>
                  <button className="nav-button next" onClick={handleNext1}>Next <ChevronRight size={18} /></button>
                </div>
              </div>
            )}

            {activeTab1 === "subtract" && (
              <div className="lesson-card tab-content">
                <div className="card-header">
                  <h4>SUBTRACT</h4>
                  <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(subtractSteps)} onStop={stop} />
                </div>

                <div className="instruction-step">
                  <p className="p-flush text-highlight">Tool for creating cutouts on 3D entities.</p>
                </div>

                <div className={`${getStepClass("bl1s-1")} ${currentIndex === 0 ? "reading-active" : ""}`}>
                  <div className="step-header">
                    <span className="step-number">1 </span>
                    <span className="step-label">Select <strong className="text-highlight">Subtract</strong> from the icon menu.</span>
                  </div>
                  <div className="step-description">
                    <div className="screenshot-wrapper">
                      <img src={subtractIcon} alt="Subtract Icon" className="software-screenshot screenshot-small" style={{ height: '170px' }} />
                    </div>
                  </div>
                </div>

                <div className="section-divider"></div>

                <div className={`${getStepClass("bl1s-2")} ${currentIndex === 1 ? "reading-active" : ""}`}>
                  <div className="step-header">
                    <span className="step-number">2 </span>
                    <span className="step-label">First, select the <strong className="text-highlight">Target entity</strong> (Main Part).</span>
                  </div>
                  <div className="step-description">
                    <div className="flex-row-wrap mt-4" style={{ gap: '2rem' }}>
                      <div className="flex-1">
                        <ul className="list-flush">
                          <li><strong className="text-highlight">Target Entity:</strong> Main Part</li>
                          <li><strong className="text-highlight">Tool Entity:</strong> Entities to be subtracted.</li>
                        </ul>
                      </div>
                      <div className="screenshot-wrapper">
                        <img src={subtractEntity} alt="Target and Tool Entity" className="software-screenshot screenshot-medium" style={{ height: '200px' }} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="section-divider"></div>

                <div className={`${getStepClass("bl1s-3")} ${currentIndex === 2 ? "reading-active" : ""}`}>
                  <div className="step-header">
                    <span className="step-number">3 </span>
                    <span className="step-label">Select <strong className="text-highlight">tool entities</strong> &gt; <strong className="text-highlight">GO</strong>
                      <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '32px', margin: '0 4px' }} />
                    </span>
                  </div>
                  <div className="step-description">
                    <p className="p-flush text-caption mb-4">Tool entities will disappear and become cutouts after subtraction.</p>
                    <div className="screenshot-wrapper">
                      <img src={subtractAfter} alt="Subtraction Result" className="software-screenshot screenshot-wide" />
                    </div>
                  </div>
                </div>

                <div className="section-divider"></div>

                <div className="instruction-step">
                  <div className="card-header"><h4>RETAIN TOOLS</h4></div>
                  <div className="step-description mt-4">
                    <p className="p-flush">The <strong className="text-highlight">Boolean Subtract</strong> tool will retain the tool entities after the operation.</p>
                    <div className="flex-row-wrap mt-8" style={{ gap: '2rem' }}>
                      <div className="screenshot-wrapper">
                        <img src={subtractRetain} alt="Subtract and retain entities" className="software-screenshot screenshot-small" style={{ height: '170px' }} />
                      </div>
                      <div className="screenshot-wrapper">
                        <img src={booleanSubtract} alt="Boolean Subtract Icon" className="software-screenshot screenshot-medium" style={{ height: '190px' }} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lesson-navigation">
                  <button className="nav-button" onClick={handlePrev1}><ChevronLeft size={18} /> Previous</button>
                  <button className="nav-button next" onClick={handleNext1}>{nextLabel || 'Next Lesson'} <ChevronRight size={18} /></button>
                </div>
              </div>
            )}
          </div>
        )}

        {subLessonId === "boolean-2" && (
          <div className="fade-in">
            {activeTab2 === "intersect" && (
              <div className="lesson-card tab-content">
                <div className="card-header">
                  <h4>INTERSECT</h4>
                  <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(intersectSteps)} onStop={stop} />
                </div>

                <div className="instruction-step">
                  <p className="p-flush text-highlight">Tool that creates an entity from the intersection of two overlapping entities.</p>
                </div>

                <div className={`${getStepClass("bl2i-1")} ${currentIndex === 0 ? "reading-active" : ""}`}>
                  <div className="step-header">
                    <span className="step-number">1 </span>
                    <span className="step-label">Select <strong className="text-highlight">Intersect</strong> from the menu.</span>
                  </div>
                  <div className="step-description">
                    <div className="screenshot-wrapper">
                      <img src={intersectIcon} alt="Intersect Icon" className="software-screenshot screenshot-small" style={{ height: '170px' }} />
                    </div>
                  </div>
                </div>

                <div className="section-divider"></div>

                <div className={`${getStepClass("bl2i-2")} ${currentIndex === 1 ? "reading-active" : ""}`}>
                  <div className="step-header">
                    <span className="step-number">2 </span>
                    <span className="step-label">Select <strong className="text-highlight">intersecting entities</strong> &gt; <strong className="text-highlight">GO</strong>.</span>
                  </div>
                  <div className="step-description">
                    <p className="p-flush text-caption mb-4">Intersecting entities will not disappear after the process.</p>
                    <div className="screenshot-wrapper">
                      <img src={intersectingEntities} alt="Intersecting Entities Result" className="software-screenshot screenshot-wide" />
                    </div>
                  </div>
                </div>

                <div className="lesson-navigation">
                  <button className="nav-button" onClick={handlePrev2}><ChevronLeft size={18} /> Previous</button>
                  <button className="nav-button next" onClick={handleNext2}>Next <ChevronRight size={18} /></button>
                </div>
              </div>
            )}

            {activeTab2 === "separate" && (
              <div className="lesson-card tab-content">
                <div className="card-header">
                  <h4>SEPARATE ENTITY</h4>
                  <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(separateSteps)} onStop={stop} />
                </div>

                <div className="instruction-step">
                  <p className="p-flush text-highlight">Tool used to reverse boolean operations by creating CSG solids.</p>
                </div>

                <div className="info-box mb-8">
                  <div className="flex-row-wrap mt-4" style={{ gap: '2rem' }}>
                    <p className="flex-1" style={{ minWidth: '250px' }}><strong className="text-highlight">Component:</strong> A by-product of boolean operations (entities joined by union, cutouts, holes).</p>
                    <div className="screenshot-wrapper">
                      <img src={componentIcon} alt="Component Icon" className="software-screenshot screenshot-small" style={{ height: '170px' }} />
                    </div>
                  </div>
                </div>

                <div className={`${getStepClass("bl2s-1")} ${currentIndex === 0 || currentIndex === 1 ? "reading-active" : ""}`}>
                  <div className="step-header">
                    <span className="step-number">1 </span>
                    <span className="step-label">Select <strong className="text-highlight">desired components</strong> &gt; <strong className="text-highlight">GO</strong>.</span>
                  </div>
                  <div className="step-description">
                    <p className="p-flush mb-4">Separated components will be displayed as CSG solids. Select <strong className="text-highlight">OK</strong> to confirm.</p>
                    <div className="flex-row-wrap mt-4" style={{ gap: '2rem' }}>
                      <div className="screenshot-wrapper">
                        <img src={componentOk} alt="Confirm Dialog" className="software-screenshot screenshot-medium" style={{ height: '200px' }} />
                      </div>
                      <div className="screenshot-wrapper">
                        <img src={componentSeparated} alt="Separated Result" className="software-screenshot screenshot-medium" style={{ height: '347px' }} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="section-divider"></div>

                <div className={`${getStepClass("bl2s-2")} ${currentIndex === 2 ? "reading-active" : ""}`}>
                  <div className="step-header">
                    <span className="step-number">2 </span>
                    <span className="step-label">Select <strong className="text-highlight">entire solid entity</strong> to separate all components &gt; <strong className="text-highlight">GO</strong>.</span>
                  </div>
                  <div className="step-description">
                    <div className="flex-row-wrap mt-4" style={{ gap: '2rem' }}>
                      <div className="screenshot-wrapper">
                        <img src={selectOk} alt="Confirm Dialog All" className="software-screenshot screenshot-medium" style={{ height: '200px' }} />
                      </div>
                      <div className="screenshot-wrapper">
                        <img src={selectEntity} alt="All Separated Result" className="software-screenshot screenshot-medium" style={{ height: '350px' }} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lesson-navigation">
                  <button className="nav-button" onClick={handlePrev2}><ChevronLeft size={18} /> Previous</button>
                  <button className="nav-button next" onClick={handleNext2}>Finish <ChevronRight size={18} /></button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BooleanLesson;