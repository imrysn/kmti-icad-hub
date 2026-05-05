import React, { useState, useEffect, useRef } from "react";

import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Zap
} from 'lucide-react';
import { useLessonCore } from "../../hooks/useLessonCore";
import { ReadAloudButton } from "../ReadAloudButton";
import { KaraokeLessonText } from "../KaraokeLessonText";
import "../../styles/3D_Modeling/CourseLesson.css";

/* 2D > 3D (1) Assets */
import workPlaneImg from "../../assets/3D_Image_File/2d_3d_work_plane.png";
import openWorkPlaneImg from "../../assets/3D_Image_File/2d_3d_open_work_plane1.png";
import openWorkPlaneImg2 from "../../assets/3D_Image_File/2d_3d_open_work_plane.png";
import extrudeIcon from "../../assets/3D_Image_File/2d_3d_1_extrude.png";
import pickCrossSection from "../../assets/3D_Image_File/2d_3d_1_pick_cross_section.png";
import commandMenu from "../../assets/3D_Image_File/2d_3d1_1.png";
import commandMenu2 from "../../assets/3D_Image_File/2d_3d_1_command_menu2.png";
import leftClick from "../../assets/3D_Image_File/left_click.png";
import extrudeDialog from "../../assets/3D_Image_File/2d_3d2_extrude1.png";
import revolveIcon from "../../assets/3D_Image_File/2d_3d_2_revolve.png";
import revolveSteps from "../../assets/3D_Image_File/2d_3d2spiral.png";
import spiralSketch from "../../assets/3D_Image_File/2d_3d_2_revolve_spiral_form_sketch.png";
import spiralIcon from "../../assets/3D_Image_File/2d_3d_2_spiral_form.png";
import spiralItemEntry from "../../assets/3D_Image_File/2d_3d_2_spiral_form_item_entry.png";
import spiralRotation1 from "../../assets/3D_Image_File/2d_3d_2_spiral_form_axis_rotation1.png";
import spiralRotation from "../../assets/3D_Image_File/2d_3d_2_spiral_form_axis_rotation.png";


interface SubLessonProps {
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
  nextLabel?: string;
}

/* ── 2D > 3D (1) ── */
const TwoDTo3D1: React.FC<SubLessonProps> = ({ onNextLesson, onPrevLesson, nextLabel }) => {
  const [activeTab, setActiveTab] = useState<"workPlane" | "commandMenu">(() => {
    return (localStorage.getItem('2d-3d-1-tab') as any) || 'workPlane';
  });

  const {
    scrollProgress,
    containerRef,
    speak,
    stop,
    isSpeaking,
    currentIndex,
    currentCharIndex
  } = useLessonCore(`2d-3d-1-${activeTab}`);

  useEffect(() => {
    localStorage.setItem('2d-3d-1-tab', activeTab);
  }, [activeTab]);

  const workPlaneSteps = [
    "2D to 3D",
    "3D modeling can be done by sketching on 2D sketch using a plane on the 3D Dimension. To create 2D plane on the 3D Dimension, use Open Work Plane from the toolbar.",
    "Use to rotate the work plane to X-Y Plane, X-Z Plane or Y-Z Plane."
  ];

  const menuSteps = [
    "COMMAND MENU",
    "Most tools use for sketching on the work plane can be found on the command menu."
  ];

  const tabs = [
    { id: "workPlane", label: "Work Plane" },
    { id: "commandMenu", label: "Command Menu" }
  ];

  const handleNext = () => {
    const i = tabs.findIndex((t) => t.id === activeTab);
    if (i < tabs.length - 1) {
      setActiveTab(tabs[i + 1].id as any);
    } else if (onNextLesson) {
      onNextLesson();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrev = () => {
    const i = tabs.findIndex((t) => t.id === activeTab);
    if (i > 0) {
      setActiveTab(tabs[i - 1].id as any);
    } else if (onPrevLesson) {
      onPrevLesson();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };



  return (
    <div className="course-lesson-container" ref={containerRef}>
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>
      <div className="lesson-tabs">
        {tabs.map((tab) => (<button key={tab.id} className={`tab-button ${activeTab === tab.id ? "active" : ""}`} onClick={() => setActiveTab(tab.id as any)} > {tab.label} </button>))}
      </div>



      <div className="lesson-grid single-card">
        {activeTab === 'workPlane' && (
          <div className="lesson-card tab-content fade-in">
            <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h4 className={`${currentIndex === 0 ? 'reading-active' : ''}`} data-reading-index="0">
                <KaraokeLessonText
                  as="span"
                  text="2D > 3D"
                  isActive={isSpeaking && currentIndex === 0}
                  currentCharIndex={currentCharIndex}
                />
              </h4>
              <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(workPlaneSteps)} onStop={stop} />
            </div>
            <div className={`instruction-step ${currentIndex === 1 ? 'reading-active' : ''}`} data-reading-index="1" style={{ marginTop: "-3.4rem" }}>
              <KaraokeLessonText
                as="p"
                className="p-flush"
                text="3D modeling can be done by sketching on 2D sketch using a plane on the 3D Dimension. To create 2D plane on the 3D Dimension, use Open Work Plane from the toolbar."
                isActive={isSpeaking && currentIndex === 1}
                currentCharIndex={currentCharIndex}
              />
              <div className="flex-row-center--wrap" style={{ justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: '0rem' , marginTop: "2rem"}}>
                <div className="screenshot-wrapper" style={{ marginTop: "-2rem" }}>
                  <img src={workPlaneImg} alt="X-Y Plane" className="software-screenshot screenshot-small" style={{ width: "10rem" }} />
                </div>
              </div>
              <div className="screenshot-wrapper">
                <img src={openWorkPlaneImg} alt="Open Work Plane toolbar" className="software-screenshot screenshot-wide" />
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
              <KaraokeLessonText
                as="span"
                text="Use to rotate the work plane to X-Y Plane, X-Z Plane or Y-Z Plane."
                isActive={isSpeaking && currentIndex === 2}
                currentCharIndex={currentCharIndex}
              />
              <div className="screenshot-wrapper" style={{ marginTop: "1rem" }}>
                <img src={openWorkPlaneImg2} alt="Open Work Plane Orientation" className="software-screenshot" style={{ width: '10rem' }} />
              </div>
            </div>

            <div className="lesson-navigation">
              <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button>
              <button className="nav-button next" onClick={handleNext}>Next <ChevronRight size={18} /></button>
            </div>
          </div>
        )}

        {activeTab === 'commandMenu' && (
          <div className="lesson-card tab-content fade-in">
            <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h4 className={`${currentIndex === 0 ? 'reading-active' : ''}`} data-reading-index="0">
                <KaraokeLessonText
                  as="span"
                  text="COMMAND MENU"
                  isActive={isSpeaking && currentIndex === 0}
                  currentCharIndex={currentCharIndex}
                />
              </h4>
              <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(menuSteps)} onStop={stop} />
            </div>
            <KaraokeLessonText
              as="p"
              className="p-flush mb-8"
              style={{marginTop: "-2rem"}}
              text="Most tools use for sketching on the work plane can be found on the command menu."
              isActive={isSpeaking && currentIndex === 1}
              currentCharIndex={currentCharIndex}
            />
            <div className={`instruction-step ${currentIndex === 1 ? 'reading-active' : ''}`} data-reading-index="1">
              <div className="screenshot-wrapper">
                <img src={commandMenu} alt="Command Menu" className="software-screenshot screenshot-wide" style={{ height: '545px', marginTop: "2rem" }} />
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
  );
};


/* ── 2D > 3D (2) ── */
const TwoDTo3D2: React.FC<SubLessonProps> = ({ onNextLesson, onPrevLesson, nextLabel }) => {
  const [activeTab, setActiveTab] = useState<"extrude" | "revolve" | "spiral">(() => {
    return (localStorage.getItem('2d-3d-2-tab') as any) || 'extrude';
  });

  const {
    scrollProgress,
    containerRef,
    speak,
    stop,
    isSpeaking,
    currentIndex,
    currentCharIndex
  } = useLessonCore(`2d-3d-2-${activeTab}`);

  useEffect(() => {
    localStorage.setItem('2d-3d-2-tab', activeTab);
  }, [activeTab]);

  const extrudeSteps = [
    "EXTRUDE",
    "Creates a solid entity from a section form created on a work plane or 2D drawing, by performing vertical projection.",
    "Step 1: Select Extrude from the icon menu.",
    "Step 2: Pick the cross-section to be extruded. A hatch will appear to show that the sketch is an enclosed figure > GO",
    "Step 3: Specify the height of extrusion on the item entry then Press Enter then GO",
    "A dialog box will appear asking if after extrusion, the work plane will be deleted or not. Select OK to delete the work plane. ",
    "Note: Deleting the work plane will delete all the sketch made on the plane. Be careful, this process cannot be undone.",
    "Select Cancel to keep the work plane together with all the 2D sketches.",
    "RESULT"
  ];
  const revolveStepsTTS = [
    "REVOLVE",
    "Creates a solid entity from a section form created on a work plane or 2D drawing, by performing rotation projection.",
    "Step 1: Select Revolve from the icon menu.",
    "Step 2: Pick the cross section to be revolved then GO. A hatch will appear to show that the sketch is an enclosed figure",
    "Step 3: Select the axis of rotation then GO",
    "PROCESS OVERVIEW"
  ];
  const spiralSteps = [
    "SPIRAL FORM",
    "Creates a 3D spiral form from a section form created on a 2D sketch.",
    "Step 1: First do the sketch",
    "Step 2: Select Spiral Form from the icon menu. Pick the cross section to be revolved. Hatch will appear to show that the sketch is an enclosed figure then GO",
    "Step 3: Specify the pitch of the spiral on the item entry then Press Enter then GO. Note: Pitch must be greater than Thickness",
    "Step 4: Select the ends of the length of the spiral along the axis of rotation then GO",
    "RESULT"
  ];

  const tabs = [{ id: "extrude", label: "Extrude" }, { id: "revolve", label: "Revolve" }, { id: "spiral", label: "Spiral" },];
  const handleNext = () => { 
    const i = tabs.findIndex((t) => t.id === activeTab); 
    if (i < tabs.length - 1) { 
      setActiveTab(tabs[i + 1].id as any); 
    } else if (onNextLesson) {
      onNextLesson();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const handlePrev = () => { 
    const i = tabs.findIndex((t) => t.id === activeTab); 
    if (i > 0) { 
      setActiveTab(tabs[i - 1].id as any); 
    } else if (onPrevLesson) {
      onPrevLesson();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const introTitle = "Extrude, Revolve, Spiral";
  const introSubtitle = "These are the tools use for extruding 2D sketches to 3D Solid Entities.";
  const introSubtitle2 = "Most commonly used tools are the following:";

  return (
    <div className="course-lesson-container" ref={containerRef}>
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>
      <div className="lesson-tabs">
        {tabs.map((tab) => (<button key={tab.id} className={`tab-button ${activeTab === tab.id ? "active" : ""}`} onClick={() => setActiveTab(tab.id as any)} > {tab.label} </button>))}
      </div>

      <section className="lesson-intro">
        <h3 className={`section-title ${currentIndex === 0 ? "reading-active" : ""}`} data-reading-index="0">
          <KaraokeLessonText
            as="span"
            text={introTitle}
            isActive={isSpeaking && currentIndex === 0}
            currentCharIndex={currentCharIndex}
          />
          <ReadAloudButton isSpeaking={isSpeaking} onStart={() => {
            const steps = activeTab === 'extrude' ? extrudeSteps :
                           activeTab === 'revolve' ? revolveStepsTTS : spiralSteps;
            speak([introTitle, introSubtitle, introSubtitle2, ...steps]);
          }} onStop={stop} />
        </h3>
        <KaraokeLessonText
          className={`lesson-subtitle ${currentIndex === 1 ? "reading-active" : ""}`}
          data-reading-index="1"
          text={introSubtitle}
          isActive={isSpeaking && currentIndex === 1}
          currentCharIndex={currentCharIndex}
        />
        <KaraokeLessonText
          className={`lesson-subtitle ${currentIndex === 2 ? "reading-active" : ""}`}
          data-reading-index="2"
          text={introSubtitle2}
          isActive={isSpeaking && currentIndex === 2}
          currentCharIndex={currentCharIndex}
        />
        <div className="screenshot-wrapper">
          <img src={commandMenu2} alt="Extrude Tools" className="software-screenshot screenshot-small" style={{ height: '225px' }} />
        </div>
      </section>

      <div className="lesson-grid single-card">
        {/* EXTRUDE */}
        {activeTab === "extrude" && (
          <div className="lesson-card tab-content fade-in">
            <div className="card-header">
              <h4 className={`${currentIndex === 3 ? "reading-active" : ""}`} data-reading-index="3">
                <KaraokeLessonText
                  as="span"
                  text="EXTRUDE"
                  isActive={isSpeaking && currentIndex === 3}
                  currentCharIndex={currentCharIndex}
                />
              </h4>
            </div>
            <KaraokeLessonText
              as="p"
              className={`p-flush ${currentIndex === 4 ? "reading-active" : ""}`}
              style={{ marginTop: "-2rem" }}
              data-reading-index="4"
              text="Creates a solid entity from a section form created on a work plane or 2D drawing, by performing vertical projection."
              isActive={isSpeaking && currentIndex === 4}
              currentCharIndex={currentCharIndex}
            />

            <div className={`instruction-step ${currentIndex === 5 ? "reading-active" : ""}`} data-reading-index="5">
              <div className="step-header">
                <span className="step-number">1 </span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text="Select Extrude from the icon menu."
                  isActive={isSpeaking && currentIndex === 5}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <div className="screenshot-wrapper">
                  <img src={extrudeIcon} alt="Extrude Icon Menu" className="software-screenshot screenshot-small" style={{ height: '100px' }} />
                </div>
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 6 ? "reading-active" : ""}`} data-reading-index="6">
              <div className="step-header">
                <span className="step-number" style={{ marginTop: "-3.5rem" }}>2 </span>
                <div className="step-label">
                  <KaraokeLessonText
                    as="span"
                    text="Pick the cross-section to be extruded."
                    isActive={isSpeaking && currentIndex === 6}
                    currentCharIndex={currentCharIndex}
                  />
                  <br />
                  <KaraokeLessonText
                    as="span"
                    text="A hatch will appear to show that the sketch is an enclosed figure &gt; GO"
                    isActive={isSpeaking && currentIndex === 6}
                    currentCharIndex={currentCharIndex}
                  />
                  <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '40px', margin: '0 8px' }} />
                </div>
              </div>
              <div className="step-description">
                <div className="screenshot-wrapper" style={{ marginTop: "2rem" }}>
                  <img src={pickCrossSection} alt="PICK EDGE" className="software-screenshot" style={{ width: '600px' }} />
                </div>
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 7 ? "reading-active" : ""}`} data-reading-index="7">
              <div className="step-header">
                <span className="step-number">3 </span>
                <div className="step-label" style={{ marginTop: "-1.5rem" }}>
                  <KaraokeLessonText
                    as="span"
                    text="Specify the height of extrusion on the item entry &gt; Press Enter &gt; GO"
                    isActive={isSpeaking && currentIndex === 7}
                    currentCharIndex={currentCharIndex}
                  />
                  <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '40px', margin: '0 8px' }} />
                </div>
              </div>
            </div>



            <div className={`instruction-box instruction-box--warning ${currentIndex === 8 || currentIndex === 9 || currentIndex === 10 ? "reading-active" : ""}`} data-reading-index="8">
              <KaraokeLessonText
                as="p"
                className="p-flush"
                style={{ marginBottom: "1rem" }}
                text="A dialog box will appear asking if after extrusion, the work plane will be deleted or not. Select OK to delete the work plane. "
                isActive={isSpeaking && currentIndex === 8}
                currentCharIndex={currentCharIndex}
              />
              <KaraokeLessonText
                as="p"
                className="red-text"
                text="Note: Deleting the work plane will delete all the sketch made on the plane. Be careful, this process cannot be undone."
                isActive={isSpeaking && currentIndex === 9}
                currentCharIndex={currentCharIndex}
              />
              <KaraokeLessonText
                as="p"
                style={{ marginTop: "1rem" }}
                text="Select Cancel to keep the work plane together with all the 2D sketches."
                isActive={isSpeaking && currentIndex === 10}
                currentCharIndex={currentCharIndex}
              />
            </div>


            <div className={`instruction-step ${currentIndex === 11 ? 'reading-active' : ''}`} data-reading-index="11">
              <div className="card-header">
                <h4 className={`${currentIndex === 11 ? "reading-active" : ""}`} data-reading-index="11">
                  <KaraokeLessonText
                    as="span"
                    text="RESULT"
                    isActive={isSpeaking && currentIndex === 11}
                    currentCharIndex={currentCharIndex}
                  />
                </h4>
              </div>
              <div className="flex-row-wrap mt-8" style={{ gap: '2rem' }}>
                <div className="screenshot-wrapper">
                  <img src={extrudeDialog} alt="Extrude Dialog" className="software-screenshot" style={{ width: '900px' }} />
                </div>
              </div>
            </div>

            <div className="lesson-navigation">
              <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button>
              <button className="nav-button next" onClick={handleNext}>Next <ChevronRight size={18} /></button>
            </div>
          </div>
        )}

        {/* REVOLVE */}
        {activeTab === "revolve" && (
          <div className="lesson-card tab-content fade-in">
            <div className="card-header">
              <h4 className={`${currentIndex === 3 ? "reading-active" : ""}`} data-reading-index="3">
                <KaraokeLessonText
                  as="span"
                  text="REVOLVE"
                  isActive={isSpeaking && currentIndex === 3}
                  currentCharIndex={currentCharIndex}
                />
              </h4>
            </div>
            <KaraokeLessonText
              as="p"
              className={`p-flush ${currentIndex === 4 ? "reading-active" : ""}`}
              style={{ marginTop: "-2rem" }}
              data-reading-index="4"
              text="Creates a solid entity from a section form created on a work plane or 2D drawing, by performing rotation projection."
              isActive={isSpeaking && currentIndex === 4}
              currentCharIndex={currentCharIndex}
            />

            <div className={`instruction-step ${currentIndex === 5 ? "reading-active" : ""}`} data-reading-index="5">
              <div className="step-header">
                <span className="step-number">1 </span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text="Select Revolve from the icon menu."
                  isActive={isSpeaking && currentIndex === 5}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <div className="screenshot-wrapper">
                  <img src={revolveIcon} alt="Revolve Icon" className="software-screenshot screenshot-small" style={{ height: '100px', marginBottom: "-2rem"}} />
                </div>
              </div>
            </div>  
            
            <div className={`instruction-step ${currentIndex === 6 ? "reading-active" : ""}`} data-reading-index="6">
              <div className="step-header">
                <span className="step-number">2 </span>
                <div className="step-label" style={{ gap: '0px' }}>
                  <KaraokeLessonText
                    as="span"
                    text="Pick the cross section to be revolved &gt; GO"
                    isActive={isSpeaking && currentIndex === 6}
                    currentCharIndex={currentCharIndex}
                  />
                  <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '40px', margin: '0 8px' }} />
                  <br />
                  <KaraokeLessonText
                    as="span"
                    text="A hatch will appear to show that the sketch is an enclosed figure"
                    isActive={isSpeaking && currentIndex === 6}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 7 ? "reading-active" : ""}`} data-reading-index="7">
              <div className="step-header">
                <span className="step-number">3 </span>
                <div className="step-label" style={{ marginTop: "-1.5rem" }}>
                  <KaraokeLessonText
                    as="span"
                    text="Select the axis of rotation &gt; GO"
                    isActive={isSpeaking && currentIndex === 7}
                    currentCharIndex={currentCharIndex}
                  />
                  <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '40px', margin: '0 8px' }} />
                </div>     
              </div>
            </div>

          

            <div className={`instruction-step ${currentIndex === 8 ? 'reading-active' : ''}`} data-reading-index="8">
              <div className="card-header">
                <h4 className={`${currentIndex === 8 ? "reading-active" : ""}`} data-reading-index="8">
                  <KaraokeLessonText
                    as="span"
                    text="PROCESS OVERVIEW"
                    isActive={isSpeaking && currentIndex === 8}
                    currentCharIndex={currentCharIndex}
                  />
                </h4>
              </div>
              <div className="screenshot-wrapper mt-8">
                <img src={revolveSteps} alt="Revolve Steps" className="software-screenshot" style={{ width: '950px', height: '350px', marginTop: "1rem" }} />
              </div>
            </div>

            <div className="lesson-navigation">
              <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button>
              <button className="nav-button next" onClick={handleNext}>Next <ChevronRight size={18} /></button>
            </div>
          </div>
        )}

        {/* SPIRAL */}
        {activeTab === "spiral" && (
          <div className="lesson-card tab-content fade-in">
            <div className="card-header">
              <h4 className={`${currentIndex === 3 ? "reading-active" : ""}`} data-reading-index="3">
                <KaraokeLessonText
                  as="span"
                  text="SPIRAL FORM"
                  isActive={isSpeaking && currentIndex === 3}
                  currentCharIndex={currentCharIndex}
                />
              </h4>
            </div>
            <KaraokeLessonText
              as="p"
              className={`p-flush ${currentIndex === 4 ? "reading-active" : ""}`}
              style={{ marginTop: "-2rem" }}
              data-reading-index="4"
              text="Creates a 3D spiral form from a section form created on a 2D sketch."
              isActive={isSpeaking && currentIndex === 4}
              currentCharIndex={currentCharIndex}
            />

            <div className={`instruction-step ${currentIndex === 5 ? "reading-active" : ""}`} data-reading-index="5">
              <div className="step-header">
                <span className="step-number">1 </span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text="First do the sketch"
                  isActive={isSpeaking && currentIndex === 5}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <div className="screenshot-wrapper">
                  <img src={spiralSketch} alt="Spiral Sketch" className="software-screenshot screenshot-wide" style={{ height: 'auto', width: '900px', marginBottom: "-2rem" }} />
                </div>
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 6 ? "reading-active" : ""}`} data-reading-index="6">
              <div className="step-header">
                <span className="step-number">2 </span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text="Select Spiral Form from the icon menu"
                  isActive={isSpeaking && currentIndex === 6}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <div className="screenshot-wrapper">
                  <img src={spiralIcon} alt="Spiral Form Icon" className="software-screenshot screenshot-small" style={{ height: '100px', marginBottom: "1rem" }} />
                </div>  
              </div>
              <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text="Pick the cross section to be revolved. Hatch will appear to show that the sketch is an enclosed figure &gt; GO"
                  isActive={isSpeaking && currentIndex === 6}
                  currentCharIndex={currentCharIndex}
                />
            </div>

            <div className={`instruction-step ${currentIndex === 7 ? "reading-active" : ""}`} data-reading-index="7">
              <div className="step-header" style={{ marginTop: "-1rem" }}>
                <span className="step-number">3 </span>
                <div className="step-label">
                  <KaraokeLessonText
                    as="span"
                    text="Specify the pitch of the spiral on the item entry &gt; Press Enter &gt; GO"
                    isActive={isSpeaking && currentIndex === 7}
                    currentCharIndex={currentCharIndex}
                  />
                  <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '40px', margin: '0 8px' }} />
                  <br />
                  <KaraokeLessonText
                    as="span"
                    className="red-text"
                    style={{ fontWeight: 'bold' }}
                    text="Note: Pitch must be greater than Thickness"
                    isActive={isSpeaking && currentIndex === 7}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
              </div>
              <div className="flex-row-center--wrap mt-4" style={{ gap: '2rem' }}>
                <div className="screenshot-wrapper">
                  <img src={spiralItemEntry} alt="Spiral Item Entry" className="software-screenshot screenshot-wide" style={{ height: 'auto', width: '900px', marginBottom: "-2rem" }} />
                </div>
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 8 ? "reading-active" : ""}`} data-reading-index="8">
              <div className="step-header">
                <span className="step-number">4 </span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text="Select the ends of the length of the spiral along the axis of rotation then GO"
                  isActive={isSpeaking && currentIndex === 8}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <div className="screenshot-wrapper">
                  <img src={spiralRotation1} alt="Spiral Axis Selection" className="software-screenshot screenshot-medium" style={{ width: '900px', height: 'auto' }} />
                </div>
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 9 ? 'reading-active' : ''}`} data-reading-index="9">
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
                <div className="screenshot-wrapper">
                  <img src={spiralRotation} alt="Spiral Axis Result" className="software-screenshot screenshot-medium" />
                </div>
              </div>
            </div>

            <div className="lesson-navigation">
              <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button>
              <button className="nav-button next" onClick={onNextLesson}>{nextLabel || 'Next Lesson'} <ChevronRight size={18} /></button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

interface TwoDTo3DLessonProps {
  nextLabel?: string;
  subLessonId: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const TwoDTo3DLesson: React.FC<TwoDTo3DLessonProps> = ({
  subLessonId,
  onNextLesson,
  onPrevLesson,
  nextLabel
}) => {
  switch (subLessonId) {
    case "2d-3d-1":
      return (
        <TwoDTo3D1 onNextLesson={onNextLesson} onPrevLesson={onPrevLesson} nextLabel={nextLabel} />
      );
    case "2d-3d-2":
      return (
        <TwoDTo3D2 onNextLesson={onNextLesson} onPrevLesson={onPrevLesson} nextLabel={nextLabel} />
      );
    default:
      return (
        <TwoDTo3D1 onNextLesson={onNextLesson} onPrevLesson={onPrevLesson} nextLabel={nextLabel} />
      );
  }
};

export default TwoDTo3DLesson;
