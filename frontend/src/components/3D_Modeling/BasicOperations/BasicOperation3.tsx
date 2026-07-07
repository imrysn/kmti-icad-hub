import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLessonCore } from '../../../hooks/useLessonCore';
import { KaraokeLessonText } from '../../KaraokeLessonText';
import {
  sketchSteps,
  extrudeSteps,
  revolveSteps
} from '../VideoTutorialData/basicOpStepsData';

// Asset Imports
import leftClick from '../../../assets/3D_Image_File/left_click.png';
import sketchIcon from '../../../assets/3D_Image_File/basic_operation4_sketch.jpg';
import sketchResultImg from '../../../assets/3D_Image_File/basic_operation4_sketch1.jpg';
import sketchIntroImg from '../../../assets/3D_Image_File/basic_operation_(3)_sketch.jpg';
import extrudeRevolveMenu from '../../../assets/3D_Image_File/basic_operation4_extrude_revolve.png';
import extrudeOneSide from '../../../assets/3D_Image_File/basic_operation4_extrusion_oneside.png';
import extrudeBothSide from '../../../assets/3D_Image_File/basic_operation4_extrusion_bothside.png';
import revolveIcon from '../../../assets/3D_Image_File/basic_operation4_revolve.png';
import revolveP2 from '../../../assets/3D_Image_File/basic_operation4_revolve_p2.png';

interface SubLessonProps {
  subLessonId: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
  nextLabel?: string;
}

const BasicOperation3: React.FC<SubLessonProps> = ({ subLessonId, onNextLesson, onPrevLesson, nextLabel }) => {
  const [activeTab, setActiveTab] = useState<'sketch' | 'extrude' | 'revolve'>(() => {
    return (localStorage.getItem(`${subLessonId}-tab`) as any) || 'sketch';
  });
  const { scrollProgress, containerRef, speak, stop, isSpeaking, currentIndex, currentCharIndex, registerText } = useLessonCore(subLessonId);

  useEffect(() => {
    localStorage.setItem(`${subLessonId}-tab`, activeTab);
  }, [subLessonId, activeTab]);

  const tabs = [
    { id: 'sketch', label: 'SKETCH' },
    { id: 'extrude', label: 'EXTRUDE' },
    { id: 'revolve', label: 'REVOLVE' }
  ];

  const handleNext = (isAuto: boolean = false) => {
    stop();
    if (!isAuto) {
      sessionStorage.setItem('tts-autoplay-active', 'false');
    }
    const i = tabs.findIndex(t => t.id === activeTab);
    if (i < tabs.length - 1) { setActiveTab(tabs[i + 1].id as any); } else if (onNextLesson) onNextLesson();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrev = (isAuto: boolean = false) => {
    stop();
    if (!isAuto) {
      sessionStorage.setItem('tts-autoplay-active', 'false');
    }
    const i = tabs.findIndex(t => t.id === activeTab);
    if (i > 0) { setActiveTab(tabs[i - 1].id as any); } else if (onPrevLesson) onPrevLesson();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (activeTab === 'sketch') {
      const introTitle = "Sketch";
      const introDesc = "Tools use to create lines, circles and arcs in the 3D space for creating section forms for modeling.";
      registerText([introTitle, introDesc, ...sketchSteps], 0);
    } else {
      const introTitle = "Extrude and Revolve";
      const introDesc = "Tools use to create solids from sketch in the 3D space.";
      const steps = activeTab === 'extrude' ? extrudeSteps : revolveSteps;
      const startIdx = activeTab === 'extrude' ? 0 : 2;
      registerText([introTitle, introDesc, ...steps], startIdx);
    }
  }, [activeTab, registerText]);

  const wasSpeakingRef = React.useRef(false);
  const lastIndexRef = React.useRef(-1);
  const shouldAutoPlayRef = React.useRef(false);

  useEffect(() => {
    if (currentIndex !== -1) {
      lastIndexRef.current = currentIndex;
    }
  }, [currentIndex]);

  useEffect(() => {
    if (!isSpeaking && wasSpeakingRef.current) {
      const stepsLength = activeTab === 'sketch' 
        ? 2 + sketchSteps.length 
        : 2 + (activeTab === 'extrude' ? extrudeSteps.length : revolveSteps.length);
      if (lastIndexRef.current === stepsLength - 1) {
        const i = tabs.findIndex(t => t.id === activeTab);
        if (i < tabs.length - 1) {
          shouldAutoPlayRef.current = true;
          handleNext();
        }
      }
    }
    wasSpeakingRef.current = isSpeaking;
  }, [isSpeaking, activeTab]);

  const prevTabRef = React.useRef(activeTab);

  useEffect(() => {
    if (activeTab !== prevTabRef.current) {
      if (shouldAutoPlayRef.current) {
        shouldAutoPlayRef.current = false;
        setTimeout(() => {
          if (activeTab === 'sketch') {
            const introTitle = "Sketch";
            const introDesc = "Tools use to create lines, circles and arcs in the 3D space for creating section forms for modeling.";
            speak([introTitle, introDesc, ...sketchSteps], 0);
          } else {
            const introTitle = "Extrude and Revolve";
            const introDesc = "Tools use to create solids from sketch in the 3D space.";
            const steps = activeTab === 'extrude' ? extrudeSteps : revolveSteps;
            const startIdx = activeTab === 'extrude' ? 0 : 2;
            speak([introTitle, introDesc, ...steps], startIdx);
          }
        }, 300);
      }
      prevTabRef.current = activeTab;
    }
  }, [activeTab, speak]);

  return (
    <div className={`course-lesson-container`} ref={containerRef}>
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      <div className="lesson-tabs">
        {tabs.map(tab => (<button key={tab.id} className={`tab-button ${activeTab === tab.id ? 'active' : ''}`} onClick={() => { stop(); sessionStorage.setItem('tts-autoplay-active', 'false'); setActiveTab(tab.id as any); }}>{tab.label}</button>))}
      </div>

      <section className="lesson-intro">
        {activeTab === 'sketch' ? (
          <>
            <h3 className={`section-title ${currentIndex === 0 ? "reading-active" : ""}`} data-reading-index="0">
              <KaraokeLessonText
                as="span"
                text="Sketch"
                isActive={isSpeaking && currentIndex === 0}
                currentCharIndex={currentCharIndex}
              />
            </h3>
            <KaraokeLessonText
              className={`lesson-subtitle ${currentIndex === 1 ? "reading-active" : ""}`}
              data-reading-index="1"
              text="Tools use to create lines, circles and arcs in the 3D space for creating section forms for modeling."
              isActive={isSpeaking && currentIndex === 1}
              currentCharIndex={currentCharIndex}
            />
            <img src={sketchIntroImg} alt="Sketch Intro" className="software-screenshot screenshot-small mt-8" style={{ width: '280px' }} />
          </>
        ) : (
          <>
            <h3 className={`section-title ${currentIndex === 0 ? "reading-active" : ""}`} data-reading-index="0">
              <KaraokeLessonText
                as="span"
                text="Extrude and Revolve"
                isActive={isSpeaking && currentIndex === 0}
                currentCharIndex={currentCharIndex}
              />
            </h3>
            <KaraokeLessonText
              className={`lesson-subtitle ${currentIndex === 1 ? "reading-active" : ""}`}
              data-reading-index="1"
              text="Tools use to create solids from sketch in the 3D space"
              isActive={isSpeaking && currentIndex === 1}
              currentCharIndex={currentCharIndex}
            />
            <img src={extrudeRevolveMenu} alt="Extrude and Revolve Intro" className="software-screenshot screenshot-small mt-8" style={{ width: '280px' }} />
          </>
        )}
      </section>

      <div className="lesson-grid single-card">
        {activeTab === 'sketch' && (
          <div className={`lesson-card tab-content fade-in ${isSpeaking ? 'reading-active' : ''}`}>
            <div className="card-header mt-12">
              <h4 className={`${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
                <KaraokeLessonText
                  as="span"
                  text="SKETCH"
                  isActive={isSpeaking && currentIndex === 2}
                  currentCharIndex={currentCharIndex}
                />
              </h4>
            </div>
            <KaraokeLessonText
              className={`p-flush ${currentIndex === 3 ? 'reading-active' : ''}`}
              data-reading-index="3"
              style={{ marginTop: "-2rem" }}
              text="Tool used to create lines"
              isActive={isSpeaking && currentIndex === 3}
              currentCharIndex={currentCharIndex}
            />

            <div className="step-description">
              <div className="flex-row-center--wrap" style={{ gap: '2rem' }}>
                <img src={sketchIcon} alt="Sketch Tool" className="software-screenshot screenshot-small" style={{ width: '280px' }} />
              </div>
            </div>

            <div className="step-description" style={{ marginTop: "3rem" }}>
              <img src={sketchResultImg} alt="Sketch Result" className="software-screenshot mt-4" style={{ width: "600px" }} />
            </div>

            <div className="lesson-navigation">
              <button className="nav-button" onClick={() => handlePrev()}><ChevronLeft size={18} /> Previous</button>
              <button className="nav-button next" onClick={() => handleNext()}>Next <ChevronRight size={18} /></button>
            </div>
          </div>
        )}

        {activeTab === 'extrude' && (
          <div className={`lesson-card tab-content fade-in ${isSpeaking ? 'reading-active' : ''}`}>
            <div className="card-header mt-12">
              <h4 className={`${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
                <KaraokeLessonText
                  as="span"
                  text="EXTRUDE"
                  isActive={isSpeaking && currentIndex === 2}
                  currentCharIndex={currentCharIndex}
                />
              </h4>
            </div>

            <div className={`instruction-step ${currentIndex === 3 ? 'reading-active' : ''}`} data-reading-index="3">
              <div className="step-header">
                <span className="step-number">1 </span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text="Select Extrude from the icon menu"
                  isActive={isSpeaking && currentIndex === 3}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description" style={{ marginTop: "1rem" }}>
                <div className="mt-6" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                  <div>
                    <img src={extrudeOneSide} alt="Extrusion One Side" className="software-screenshot screenshot-small" style={{ width: '100%', marginBottom: "1rem" }} />
                    <div className="text-center font-bold text-lg mt-4" style={{ marginLeft: "-8rem" }}>EXTRUSION (ONE SIDE)</div>
                  </div>
                  <div>
                    <img src={extrudeBothSide} alt="Extrude Both Side" className="software-screenshot screenshot-small" style={{ width: '100%', marginBottom: "1rem" }} />
                    <div className="text-center font-bold text-lg mt-4" style={{ marginLeft: "-8em" }}>EXTRUSION (BOTH SIDES)</div>
                  </div>
                </div>
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 4 ? 'reading-active' : ''}`} data-reading-index="4" style={{ marginBottom: "-2rem" }}>
              <div className="step-header">
                <span className="step-number">2 </span>
                <div className="step-label" style={{ marginTop: "0.5rem" }}>
                  <KaraokeLessonText
                    as="span"
                    text="Select the perimeter of the sketch to be extruded > GO"
                    isActive={isSpeaking && currentIndex === 4}
                    currentCharIndex={currentCharIndex}
                  />
                  <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '40px', margin: '0 8px' }} />
                  <br />
                  <KaraokeLessonText
                    as="span"
                    text="A hatch will appear indicating the specified area to be extruded."
                    isActive={isSpeaking && currentIndex === 4}
                    currentCharIndex={currentCharIndex - 55}
                  />
                </div>
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 5 ? 'reading-active' : ''}`} data-reading-index="5" style={{ marginBottom: "-2rem" }}>
              <div className="step-header">
                <span className="step-number">3 </span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text="Specify the height of extrusion. Can also be set on the item entry"
                  isActive={isSpeaking && currentIndex === 5}
                  currentCharIndex={currentCharIndex}
                />
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 6 ? 'reading-active' : ''}`} data-reading-index="6">
              <div className="step-header">
                <span className="step-number">4 </span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text="Press ENTER"
                  isActive={isSpeaking && currentIndex === 6}
                  currentCharIndex={currentCharIndex}
                />
              </div>

              <div className={`instruction-step ${currentIndex === 6 ? 'reading-active' : ''}`} data-reading-index="6">
                <div className="card-header"><h4>PROCESS OVERVIEW</h4></div>
                <div className="flex-row-wrap mt-8" style={{ gap: '2rem' }}>
                  <img src={extrudeOneSide} alt="Extrude Process Overview" className="software-screenshot" style={{ width: "900px", marginTop: "2rem" }} />
                </div>
              </div>
            </div>

            <div className="lesson-navigation">
              <button className="nav-button" onClick={() => handlePrev()}><ChevronLeft size={18} /> Previous</button>
              <button className="nav-button next" onClick={() => handleNext()}>Next <ChevronRight size={18} /></button>
            </div>
          </div>
        )}

        {activeTab === 'revolve' && (
          <div className={`lesson-card tab-content fade-in ${isSpeaking ? 'reading-active' : ''}`}>
            <div className="card-header mt-12">
              <h4 className={`${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
                <KaraokeLessonText
                  as="span"
                  text="REVOLVE"
                  isActive={isSpeaking && currentIndex === 2}
                  currentCharIndex={currentCharIndex}
                />
              </h4>
            </div>

            <div className={`instruction-step ${currentIndex === 3 ? 'reading-active' : ''}`} data-reading-index="3" style={{ marginBottom: "-2rem" }}>
              <div className="step-header">
                <span className="step-number">1 </span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text="Select Revolve from the icon menu"
                  isActive={isSpeaking && currentIndex === 3}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <img src={revolveIcon} alt="Revolve Icon" className="software-screenshot mt-4" style={{ width: '280px', marginBottom: "1rem" }} />
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 4 ? 'reading-active' : ''}`} data-reading-index="4" style={{ marginBottom: "-2rem" }}>
              <div className="step-header" style={{ marginBottom: "2rem" }}>
                <span className="step-number">2 </span>
                <div className="step-label" style={{ marginTop: "-1.5rem" }}>
                  <KaraokeLessonText
                    as="span"
                    text="Select the perimeter of the sketch to be revolved > GO"
                    isActive={isSpeaking && currentIndex === 4}
                    currentCharIndex={currentCharIndex}
                  />
                  <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '40px', margin: '0 8px' }} />
                </div>
              </div>

              <div className={`step-header ${currentIndex === 5 ? 'reading-active' : ''}`} data-reading-index="5">
                <span className="step-number">3 </span>
                <div className="step-label" style={{ marginTop: "0.5rem" }}>
                  <KaraokeLessonText
                    as="span"
                    text="Select the axis of rotation (pick points or edge) > GO"
                    isActive={isSpeaking && currentIndex === 5}
                    currentCharIndex={currentCharIndex}
                  />
                  <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '40px', margin: '0 8px' }} />
                  <br />
                  <KaraokeLessonText
                    as="span"
                    text="A hatch will appear indicating the specified area to be revolved."
                    isActive={isSpeaking && currentIndex === 5}
                    currentCharIndex={currentCharIndex - 55}
                  />
                </div>
              </div>

              <div className={`instruction-step ${currentIndex === 5 ? 'reading-active' : ''}`} data-reading-index="5">
                <div className="card-header"><h4>PROCESS OVERVIEW</h4></div>
                <div className="flex-row-wrap mt-8" style={{ gap: '2rem' }}>
                  <img src={revolveP2} alt="Revolve Result" className="software-screenshot" style={{ width: "900px" }} />
                </div>
              </div>
            </div>

            <div className="lesson-navigation">
              <button className="nav-button" onClick={() => handlePrev()}><ChevronLeft size={18} /> Previous</button>
              <button className="nav-button next" onClick={() => handleNext()}>{nextLabel || 'Next'} <ChevronRight size={18} /></button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BasicOperation3;
