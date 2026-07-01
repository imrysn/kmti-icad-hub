import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLessonCore } from "../../hooks/useLessonCore";
import { useTTSAutoplay } from "../../hooks/useTTSAutoplay";
import { ReadAloudButton } from "../ReadAloudButton";
import { KaraokeLessonText } from "../KaraokeLessonText";
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
    currentIndex,
    currentCharIndex,
    registerText
  } = useLessonCore(subLessonId);

  const unionSteps = [
    "UNION",
    "Tool for joining 3D entities into a single entity.",
    "Step 1: Select Union from the icon menu.",
    "Step 2: Select all 3D entities for joining then GO",
  ];

  const subtractSteps = [
    "SUBTRACT",
    "Tool for creating cutouts on 3D entities.",
    "Step 1: Select Subtract from the icon menu.",
    "Step 2: First, select the Target entity.",
    "Step 3: Select the tool entities then GO. Tool entities will disappear and become components after subtraction.",
    "This subtract tool will retain the tool entities after subtraction.",
  ];

  const intersectSteps = [
    "INTERSECT",
    "Tool that creates entity of the product of two intersecting entities.",
    "Step 1: Select Intersect from the icon menu.",
    "Step 2: Select the intersecting entities then GO",
    "Intersecting entities will not disappear after the process.",
  ];

  const separateSteps = [
    "SEPARATE ENTITY",
    "Tool use to reverse boolean operations by creating CSG solid.",
    "Component: By product of boolean operations (entities joined by union, cutout, holes). This tool is use to separate specified entities from the solid entity.",
    "Step 1: Select the desired components to be separated from the solid entity then GO",
    "Step 2: Separated components will be displayed in a form of CSG solid. Then select OK",
    "This tool is use to separate all components from the solid entity.",
    "Step 1: Select the solid entity then GO",
    "Step 2: Separated components will be displayed in a form of CSG solid. Then select OK"
  ];

  const tabs = [
    { id: "union", label: "Union" },
    { id: "subtract", label: "Subtract" },
    { id: "intersect", label: "Intersect" },
    { id: "separate", label: "Separate Entity" },
  ];

  const handleNext = (isAuto = false) => {
    stop();
    if (!isAuto) {
      sessionStorage.setItem('tts-autoplay-active', 'false');
    }
    if (activeTab === "union") setActiveTab("subtract");
    else if (activeTab === "subtract") setActiveTab("intersect");
    else if (activeTab === "intersect") setActiveTab("separate");
    else if (onNextLesson) onNextLesson();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrev = (isAuto = false) => {
    stop();
    if (!isAuto) {
      sessionStorage.setItem('tts-autoplay-active', 'false');
    }
    if (activeTab === "separate") setActiveTab("intersect");
    else if (activeTab === "intersect") setActiveTab("subtract");
    else if (activeTab === "subtract") setActiveTab("union");
    else if (onPrevLesson) onPrevLesson();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const introTitle = "Boolean Operation";
  const introSubtitle = "Use boolean operations to join, cut, or intersect 3D entities.";


  useEffect(() => {
    const steps = activeTab === 'union' ? unionSteps :
                  activeTab === 'subtract' ? subtractSteps :
                  activeTab === 'intersect' ? intersectSteps : separateSteps;
    registerText(steps, 0);
  }, [activeTab, registerText]);

  const currentTabSteps = activeTab === 'union' ? unionSteps :
                          activeTab === 'subtract' ? subtractSteps :
                          activeTab === 'intersect' ? intersectSteps : separateSteps;
  const tabsList = [{ id: 'union' }, { id: 'subtract' }, { id: 'intersect' }, { id: 'separate' }];

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
    <div className={`course-lesson-container`} ref={containerRef}>
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      <div className="lesson-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => { stop(); sessionStorage.setItem('tts-autoplay-active', 'false'); setActiveTab(tab.id as any); }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <section className="lesson-intro">
        <h3 className={`section-title ${currentIndex === 0 ? "reading-active" : ""}`} data-reading-index="0">
          <KaraokeLessonText
            as="span"
            text={introTitle}
            isActive={isSpeaking && currentIndex === 0}
            currentCharIndex={currentCharIndex}
          />
          
        </h3>
        <KaraokeLessonText
          className={`lesson-subtitle ${currentIndex === 1 ? "reading-active" : ""}`}
          data-reading-index="1"
          text={introSubtitle}
          isActive={isSpeaking && currentIndex === 1}
          currentCharIndex={currentCharIndex}
        />
        <img src={booleanOpMenu} alt="Boolean Operation Menu" className="software-screenshot" style={{ height: 'auto', width: "200px" }} />
      </section>

      <div className="lesson-grid single-card">
        <div className="fade-in">
          {activeTab === "union" && (
            <div className="lesson-card tab-content">
              <div className="card-header">
                <h4 className={`${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2">
                  <KaraokeLessonText
                    as="span"
                    text="UNION"
                    isActive={isSpeaking && currentIndex === 2}
                    currentCharIndex={currentCharIndex}
                  />
                </h4>
              </div>
              <KaraokeLessonText
                as="p"
                className={`p-flush ${currentIndex === 3 ? "reading-active" : ""}`}
                style={{ marginTop: "-2rem" }}
                data-reading-index="3"
                text="Tool for joining 3D entities into a single entity"
                isActive={isSpeaking && currentIndex === 3}
                currentCharIndex={currentCharIndex}
              />

              <div className={`instruction-step ${currentIndex === 4 ? "reading-active" : ""}`} data-reading-index="4">
                <div className="step-header">
                  <span className="step-number">1 </span>
                  <span className="step-label">
                    <KaraokeLessonText
                      as="span"
                      text="Select Union from the icon menu."
                      isActive={isSpeaking && currentIndex === 4}
                      currentCharIndex={currentCharIndex}
                    />
                  </span>
                </div>
                <div className="step-description">
                  <img src={unionIcon} alt="Union Icon" className="software-screenshot " style={{ height: 'auto', width: "200px", marginBottom: "-1rem" }} />
                </div>
              </div>

              <div className={`instruction-step ${currentIndex === 5 ? "reading-active" : ""}`} data-reading-index="5">
                <div className="step-header">
                  <span className="step-number">2 </span>
                  <span className="step-label" style={{ marginTop: "-1.5rem" }}>
                    <KaraokeLessonText
                      as="span"
                      text="Select entities to join then GO"
                      isActive={isSpeaking && currentIndex === 5}
                      currentCharIndex={currentCharIndex}
                    />
                    <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '40px', margin: '0 8px' }} />
                  </span>
                </div>

                <div className={`instruction-step ${currentIndex === 6 ? "reading-active" : ""}`} data-reading-index="6">
                  <div className="card-header">
                    <h4 className={`${currentIndex === 6 ? "reading-active" : ""}`} data-reading-index="6">
                      <KaraokeLessonText
                        as="span"
                        text="RESULT"
                        isActive={isSpeaking && currentIndex === 6}
                        currentCharIndex={currentCharIndex}
                      />
                    </h4>
                  </div>
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
            <div className="lesson-card tab-content">
              <div className="card-header">
                <h4 className={`${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2">
                  <KaraokeLessonText
                    as="span"
                    text="SUBTRACT"
                    isActive={isSpeaking && currentIndex === 2}
                    currentCharIndex={currentCharIndex}
                  />
                </h4>
              </div>
              <KaraokeLessonText
                as="p"
                className={`p-flush ${currentIndex === 3 ? "reading-active" : ""}`}
                style={{ marginTop: "-2rem" }}
                data-reading-index="3"
                text="Tool for creating cutouts on 3D entities"
                isActive={isSpeaking && currentIndex === 3}
                currentCharIndex={currentCharIndex}
              />

              <div className={`instruction-step ${currentIndex === 4 ? "reading-active" : ""}`} data-reading-index="4">
                <div className="step-header">
                  <span className="step-number">1 </span>
                  <span className="step-label">
                    <KaraokeLessonText
                      as="span"
                      text="Select Subtract from the icon menu"
                      isActive={isSpeaking && currentIndex === 4}
                      currentCharIndex={currentCharIndex}
                    />
                  </span>
                </div>
                <div className="step-description">
                  <img src={subtractIcon} alt="Subtract Icon" className="software-screenshot" style={{ height: 'auto', width: "200px", marginBottom: "-2rem" }} />
                </div>
              </div>

              <div className={`instruction-step ${currentIndex === 5 ? "reading-active" : ""}`} data-reading-index="5">
                <div className="step-header">
                  <span className="step-number">2 </span>
                  <span className="step-label">
                    <KaraokeLessonText
                      as="span"
                      text="First, select the Target entity."
                      isActive={isSpeaking && currentIndex === 5}
                      currentCharIndex={currentCharIndex}
                    />
                  </span>
                </div>
                <div className="step-description">
                  <div className="flex-row-wrap mt-4" style={{ gap: '2rem' }}>
                    <div className="flex-1">
                      <ul className="list-flush">
                        <li><strong className="red-text">Target Entity:</strong> Main Part</li>
                        <li><strong className="red-text">Tool Entity:</strong> Entities to be subtracted on the target entity.</li>
                      </ul>
                    </div>
                    <img src={subtractEntity} alt="Target and Tool Entity" className="software-screenshot screenshot-medium mt-4" style={{ height: 'auto', width: '900px', marginBottom: "-2rem" }} />
                  </div>
                </div>
              </div>

              <div className={`instruction-step ${currentIndex === 6 ? "reading-active" : ""}`} data-reading-index="6">
                <div className="step-header">
                  <span className="step-number">3 </span>
                  <span className="step-label" style={{ marginTop: "-1.5rem" }}>
                    <KaraokeLessonText
                      as="span"
                      text="Select the tool entities then GO"
                      isActive={isSpeaking && currentIndex === 6}
                      currentCharIndex={currentCharIndex}
                    />
                    <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '40px', margin: '0 8px' }} />
                  </span>
                </div>
                <div className="step-description">
                  <KaraokeLessonText
                    as="p"
                    className={`p-flush ${currentIndex === 6 ? "reading-active" : ""}`}
                    style={{ marginTop: "-1rem" }}
                    data-reading-index="6"
                    text="Tool entities will disappear and become components after subtraction"
                    isActive={isSpeaking && currentIndex === 6}
                    currentCharIndex={currentCharIndex}
                  />
                </div>


                <div className={`instruction-step ${currentIndex === 7 ? "reading-active" : ""}`} data-reading-index="7">
                  <div className="card-header">
                    <h4 className={`${currentIndex === 7 ? "reading-active" : ""}`} data-reading-index="7">
                      <KaraokeLessonText
                        as="span"
                        text="RESULT"
                        isActive={isSpeaking && currentIndex === 7}
                        currentCharIndex={currentCharIndex}
                      />
                    </h4>
                  </div>
                  <div className="flex-row-wrap mt-8" style={{ gap: '2rem' }}>
                    <img src={subtractAfter} alt="Subtraction Result" className="software-screenshot" style={{ width: '900px', marginTop: "2rem" }} />
                  </div>
                </div>
              </div>

              <div className="step-description mt-4">
                <KaraokeLessonText
                  as="span"
                  className={`p-flush ${currentIndex === 8 ? "reading-active" : ""}`}
                  data-reading-index="8"
                  text="This subtract tool will retain the tool entities after subtraction"
                  isActive={isSpeaking && currentIndex === 8}
                  currentCharIndex={currentCharIndex}
                />
                <div className="flex-row-wrap mt-8" style={{ gap: '2rem' }}>
                  <img src={subtractRetain} alt="Subtract and retain entities" className="software-screenshot" style={{ height: 'auto', width: "200px", marginBottom: "1rem", marginTop: "1rem" }} />


                  <div className={`instruction-step ${currentIndex === 9 ? "reading-active" : ""}`} data-reading-index="9">
                    <div className="card-header">
                      <h4 className={`${currentIndex === 9 ? "reading-active" : ""}`} data-reading-index="9">
                        <KaraokeLessonText
                          as="span"
                          text="RESULT"
                          isActive={isSpeaking && currentIndex === 9}
                          currentCharIndex={currentCharIndex}
                        />
                      </h4>
                    </div>
                    <div className="flex-row-wrap mt-8" style={{ gap: '2rem' }}>
                      <img src={booleanSubtract} alt="Boolean Subtract Icon" className="software-screenshot" style={{ width: '900px' }} />
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
            <div className="lesson-card tab-content">
              <div className="card-header">
                <h4 className={`${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2">
                  <KaraokeLessonText
                    as="span"
                    text="INTERSECT"
                    isActive={isSpeaking && currentIndex === 2}
                    currentCharIndex={currentCharIndex}
                  />
                </h4>
              </div>

              <KaraokeLessonText
                as="p"
                className={`p-flush ${currentIndex === 3 ? "reading-active" : ""}`}
                style={{ marginTop: "-2rem" }}
                data-reading-index="3"
                text="Tool that creates entity of the product of two intersecting entities"
                isActive={isSpeaking && currentIndex === 3}
                currentCharIndex={currentCharIndex}
              />

              <div className={`instruction-step ${currentIndex === 4 ? "reading-active" : ""}`} data-reading-index="4">
                <div className="step-header">
                  <span className="step-number">1 </span>
                  <span className="step-label">
                    <KaraokeLessonText
                      as="span"
                      text="Select Intersect from the icon menu"
                      isActive={isSpeaking && currentIndex === 4}
                      currentCharIndex={currentCharIndex}
                    />
                  </span>
                </div>
                <div className="step-description">
                  <img src={intersectIcon} alt="Intersect Icon" className="software-screenshot" style={{ height: 'auto', width: "200px", marginBottom: "-1rem" }} />
                </div>
              </div>

              <div className={`instruction-step ${currentIndex === 5 ? "reading-active" : ""}`} data-reading-index="5">
                <div className="step-header">
                  <span className="step-number">2 </span>
                  <span className="step-label" style={{ marginTop: "-1.5rem" }}>
                    <KaraokeLessonText
                      as="span"
                      text="Select intersecting entities then GO"
                      isActive={isSpeaking && currentIndex === 5}
                      currentCharIndex={currentCharIndex}
                    />
                    <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '40px', margin: '0 8px' }} />
                  </span>
                </div>

                <div className="step-description">
                  <KaraokeLessonText
                    as="p"
                    className={`p-flush ${currentIndex === 6 ? "reading-active" : ""}`}
                    style={{ marginTop: "-1rem" }}
                    data-reading-index="6"
                    text="Intersecting entities will not disappear after the process"
                    isActive={isSpeaking && currentIndex === 6}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
              </div>

              <div className={`instruction-step ${currentIndex === 7 ? "reading-active" : ""}`} data-reading-index="7">
                <div className="card-header">
                  <h4 className={`${currentIndex === 7 ? "reading-active" : ""}`} data-reading-index="7">
                    <KaraokeLessonText
                      as="span"
                      text="RESULT"
                      isActive={isSpeaking && currentIndex === 7}
                      currentCharIndex={currentCharIndex}
                    />
                  </h4>
                </div>
                <div className="flex-row-wrap mt-8" style={{ gap: '2rem' }}>
                  <img src={intersectingEntities} alt="Intersecting entities" className="software-screenshot mt-8" style={{ width: '900px' }} />
                </div>
              </div>

              <div className="lesson-navigation">
                <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button>
                <button className="nav-button next" onClick={handleNext}>Next <ChevronRight size={18} /></button>
              </div>
            </div>
          )}

          {activeTab === "separate" && (
            <div className="lesson-card tab-content">
              <div className="card-header">
                <h4 className={`${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2">
                  <KaraokeLessonText
                    as="span"
                    text="SEPARATE ENTITY"
                    isActive={isSpeaking && currentIndex === 2}
                    currentCharIndex={currentCharIndex}
                  />
                </h4>
              </div>

              <KaraokeLessonText
                as="p"
                className={`p-flush ${currentIndex === 3 ? "reading-active" : ""}`}
                style={{ marginTop: "-2rem" }}
                data-reading-index="3"
                text="Tool use to reverse boolean operations by creating CSG solid"
                isActive={isSpeaking && currentIndex === 3}
                currentCharIndex={currentCharIndex}
              />

              <div className={`mt-4 ${currentIndex === 4 ? "reading-active" : ""}`} data-reading-index="4">
                <div className="flex-row-wrap" style={{ gap: '2rem' }}>
                  <p className="p-flush" style={{ minWidth: '250px' }}>
                    <strong className="red-text">Component:</strong>
                  </p>
                  <KaraokeLessonText
                    as="p"
                    className="p-flush"
                    text="By product of boolean operations (entities joined by union, cutout, holes)"
                    isActive={isSpeaking && currentIndex === 4}
                    currentCharIndex={currentCharIndex}
                  />
                  <div className="flex-col">
                    <img src={componentIcon} alt="Component Icon" className="software-screenshot" style={{ height: 'auto', width: "200px" }} />
                    <KaraokeLessonText
                      as="p"
                      className="p-flush"
                      style={{ marginTop: "1rem" }}
                      text="This tool is use to separate specified entities from the solid entity"
                      isActive={isSpeaking && currentIndex === 4}
                      currentCharIndex={currentCharIndex}
                    />
                  </div>
                </div>
              </div>

              <div className={`instruction-step ${currentIndex === 5 ? "reading-active" : ""}`} data-reading-index="5">
                <div className="step-header">
                  <span className="step-number">1 </span>
                  <span className="step-label" style={{ marginTop: "-1.5rem" }}>
                    <KaraokeLessonText
                      as="span"
                      text="Select the desired components to be separated from the solid entity &gt; GO"
                      isActive={isSpeaking && currentIndex === 5}
                      currentCharIndex={currentCharIndex}
                    />
                    <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '40px', margin: '0 8px' }} />
                  </span>
                </div>
              </div>

              <div className={`instruction-step ${currentIndex === 6 ? "reading-active" : ""}`} data-reading-index="6" style={{ marginTop: "-2rem" }}>
                <div className="step-header">
                  <span className="step-number">2 </span>
                  <span className="step-label">
                    <KaraokeLessonText
                      as="span"
                      text="Separated components will be displayed in a form of CSG solid. Select OK"
                      isActive={isSpeaking && currentIndex === 6}
                      currentCharIndex={currentCharIndex}
                    />
                  </span>
                </div>

                <div className="flex-row-wrap mt-4" style={{ gap: '2rem' }}>
                  <img src={componentOk} alt="Confirm Dialog" className="software-screenshot mt-4" style={{ height: 'auto', width: '350px' }} />
                  <img src={componentSeparated} alt="Separated Result" className="software-screenshot mt-4" style={{ height: 'auto', width: '400px' }} />
                </div>
              </div>

              <div className={`mt-4 ${currentIndex === 7 ? "reading-active" : ""}`} data-reading-index="7" style={{ marginTop: "-3rem", marginBottom: "2rem" }}>
                <img src={componentSeparate} alt="Separate All Components" className="software-screenshot" style={{ height: 'auto', width: "200px", marginBottom: "1rem" }} />
                <KaraokeLessonText
                  as="p"
                  className="p-flush"
                  style={{ marginTop: "1rem" }}
                  text="This tool is use to separate all components from the solid entity"
                  isActive={isSpeaking && currentIndex === 7}
                  currentCharIndex={currentCharIndex}
                />
              </div>

              <div className={`instruction-step ${currentIndex === 8 ? "reading-active" : ""}`} data-reading-index="8">
                <div className="step-header">
                  <span className="step-number">1 </span>
                  <span className="step-label" style={{ marginTop: "-1.5rem" }}>
                    <KaraokeLessonText
                      as="span"
                      text="Select the solid entity &gt; GO"
                      isActive={isSpeaking && currentIndex === 8}
                      currentCharIndex={currentCharIndex}
                    />
                    <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '40px', margin: '0 8px' }} />
                  </span>
                </div>
              </div>

              <div className={`instruction-step ${currentIndex === 9 ? "reading-active" : ""}`} data-reading-index="9" style={{ marginTop: "-2rem" }}>
                <div className="step-header">
                  <span className="step-number">2 </span>
                  <span className="step-label">
                    <KaraokeLessonText
                      as="span"
                      text="Separated components will be displayed in a form of CSG solid. Select OK"
                      isActive={isSpeaking && currentIndex === 9}
                      currentCharIndex={currentCharIndex}
                    />
                  </span>
                </div>
                <div className="step-description">
                  <div className="flex-row-wrap" style={{ gap: '2rem' }}>
                    <img src={selectOk} alt="Confirm Dialog All" className="software-screenshot screenshot-medium mt-4" style={{ height: 'auto', width: '350px' }} />
                    <img src={selectEntity} alt="All Separated Result" className="software-screenshot screenshot-medium mt-4" style={{ height: 'auto', width: '400px' }} />
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
