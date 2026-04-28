/** * 3D_2Dto3D.tsx — 2D > 3D lessons (1 through 2) */

import React, { useState, useEffect, useRef } from "react";

import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Zap
} from 'lucide-react';
import { useLessonCore } from "../../hooks/useLessonCore";
import { ReadAloudButton } from "../ReadAloudButton";
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
    currentIndex
  } = useLessonCore(`2d-3d-1-${activeTab}`);

  useEffect(() => {
    localStorage.setItem('2d-3d-1-tab', activeTab);
  }, [activeTab]);

  const workPlaneSteps = [
    "Work Plane: 3D modeling can be done by sketching on a 2D sketch using a plane on the 3D dimension. Use Open Work Plane from the toolbar to start.",
    "Step 2: Use the tools shown to rotate the work plane to X-Y, X-Z, or Y-Z orientations."
  ];

  const menuSteps = ["Command Menu: Most tools for sketching on the work plane, like those for extruding 2D sketches into 3D solid entities, can be found on this menu."];

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
  };

  const handlePrev = () => {
    const i = tabs.findIndex((t) => t.id === activeTab);
    if (i > 0) {
      setActiveTab(tabs[i - 1].id as any);
    } else if (onPrevLesson) {
      onPrevLesson();
    }
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
            <div className="card-header">
              <h4>2D &gt; 3D</h4>
              <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(workPlaneSteps)} onStop={stop} />
            </div>
            <p className="p-flush" style={{ marginTop: "-2rem" }}>3D modeling can be done by sketching on 2D sketch using a plane on the 3D Dimension.</p>
            <p className="p-flush" style={{ marginTop: "-2rem" }}>To create 2D plane on the 3D dimension, use <strong className="text-highlight">Open Work Plane</strong> from the toolbar.</p>
            <div className="flex-row-center--wrap" style={{ justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: '2rem' }}>

              <div className="screenshot-wrapper" style={{ marginTop: "-2rem" }}>
                <img src={workPlaneImg} alt="X-Y Plane" className="software-screenshot screenshot-small" style={{ width: "8rem" }} />
              </div>
            </div>

            <div className="screenshot-wrapper">
              <img src={openWorkPlaneImg} alt="Open Work Plane toolbar" className="software-screenshot screenshot-wide" />
            </div>
            <span> Use to rotate the work plane to X-Y Plane, X-Z, Plane or Y-Z Plane.</span>
            <div className="screenshot-wrapper" style={{ marginTop: "-2rem" }}>
              <img src={openWorkPlaneImg2} alt="Open Work Plane Orientation" className="software-screenshot" style={{ width: '10rem' }} />
            </div>

            <div className="lesson-navigation">
              <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button>
              <button className="nav-button next" onClick={handleNext}>Next <ChevronRight size={18} /></button>
            </div>
          </div>
        )}

        {activeTab === 'commandMenu' && (
          <div className="lesson-card tab-content fade-in">
            <div className="card-header">
              <h4>COMMAND MENU</h4>
              <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(menuSteps)} onStop={stop} />
            </div>
            <p className="p-flush mb-8" style={{ marginTop: "-2rem" }}>Most tools used for sketching on the work plane can be found on the command menu.</p>
            <div className="screenshot-wrapper">
              <img src={commandMenu} alt="Command Menu" className="software-screenshot screenshot-wide" style={{ height: '545px', marginTop: "2rem" }} />
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
    currentIndex
  } = useLessonCore(`2d-3d-2-${activeTab}`);

  useEffect(() => {
    localStorage.setItem('2d-3d-2-tab', activeTab);
  }, [activeTab]);

  const extrudeSteps = ["Step 1: Select Extrude from the icon menu.", "Step 2: Pick the cross-section to be extruded. A hatch will appear to show it is an enclosed figure. Click GO.", "Step 3: Specify the height on the item entry, press Enter, then click GO.", "Instruction: A dialog box will appear asking to delete the work plane. OK deletes the plane and all sketches permanently. Cancel keeps them."];
  const revolveStepsTTS = ["Step 1: Select Revolve from the icon menu.", "Step 2: Pick the cross-section to be revolved. Ensure it is enclosed by checking for the hatch. Click GO.", "Step 3: Select the axis of rotation and click GO."];
  const spiralSteps = ["Step 1: First, create your 2D sketch for the spiral form.", "Step 2: Select Spiral Form from the menu. Pick the cross-section and click GO.", "Step 3: Specify the pitch in the item entry. Pitch must be greater than thickness. Click GO.", "Step 4: Select the ends of the rotational axis for the spiral length, then click GO."];

  const tabs = [{ id: "extrude", label: "Extrude" }, { id: "revolve", label: "Revolve" }, { id: "spiral", label: "Spiral" },];
  const handleNext = () => { const i = tabs.findIndex((t) => t.id === activeTab); if (i < tabs.length - 1) { setActiveTab(tabs[i + 1].id as any); } else if (onNextLesson) onNextLesson(); };
  const handlePrev = () => { const i = tabs.findIndex((t) => t.id === activeTab); if (i > 0) { setActiveTab(tabs[i - 1].id as any); } else if (onPrevLesson) onPrevLesson(); };

  return (
    <div className="course-lesson-container" ref={containerRef}>
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>
      <div className="lesson-tabs">
        {tabs.map((tab) => (<button key={tab.id} className={`tab-button ${activeTab === tab.id ? "active" : ""}`} onClick={() => setActiveTab(tab.id as any)} > {tab.label} </button>))}
      </div>

      <section className="lesson-intro">
        <h3 className="section-title">2D &gt; 3D</h3>
        <p className="p-flush">These are the tools use for extruding 2D sketches to 3D Solid Entities.</p>
        <p className="p-flush" style={{ marginTop: "-2rem"}}> Most commonly used tools are the following: </p>
        <div className="screenshot-wrapper">
          <img src={commandMenu2} alt="Extrude Tools" className="software-screenshot screenshot-small" style={{ height: '225px' }} />
        </div>
      </section>

      <div className="lesson-grid single-card">
        {/* EXTRUDE */}
        {activeTab === "extrude" && (
          <div className="lesson-card tab-content fade-in">
            <div className="card-header">
              <h4>EXTRUDE</h4>
              <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(extrudeSteps)} onStop={stop} />
            </div>  
            <p className="p-flush" style={{ marginTop: "-2rem"}}>Creates a solid entity from a section form created on a work plane or 2D drawing, by performing vertical projection.</p>

            <div className={`instruction-step ${currentIndex === 0 ? "reading-active" : ""}`} data-reading-index="0">
              <div className="step-header">
                <span className="step-number">1 </span>
                <span className="step-label">Select <strong className="red-text">Extrude</strong> from the icon menu.</span>
              </div>
              <div className="step-description">
                <div className="screenshot-wrapper">
                  <img src={extrudeIcon} alt="Extrude Icon Menu" className="software-screenshot screenshot-small" style={{ height: '100px' }} />
                </div>
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 1 ? "reading-active" : ""}`} data-reading-index="1">
              <div className="step-header" style={{ marginBottom: "-2rem"}}>
                <span className="step-number">2 </span>
                <span className="step-label">Pick the cross-section to be extruded. </span>
              </div>
              <div className="step-description">
                <span className="p-flush" style={{ marginLeft: "3rem"}}>A hatch will appear to show that the sketch is an enclosed figure &gt; GO
                  <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '32px', margin: '0 8px'}} />
                </span>

                <div className="screenshot-wrapper" style={{ marginTop: "2rem"}}>
                  <img src={pickCrossSection} alt="PICK EDGE" className="software-screenshot" style={{ width: '600px'}}/>
                </div>
              </div>  
            </div>

            <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2">
              <div className="step-header" style={{ marginTop: "-2rem"}}>
                <span className="step-number">3 </span>
                <span className="step-label" style={{ marginBottom: "1rem"}}>Specify the height of extrusion on the item entry &gt; Press Enter &gt; GO
                  <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '32px', margin: '0 8px' }} />
                </span>
              </div>
            </div>

 

            <div className={`instruction-box instruction-box--warning ${currentIndex === 3 ? "reading-active" : ""}`} data-reading-index="3">
              <p className="p-flush" style={{ marginBottom: "1rem"}}>A dialog box will appear asking if after extrusion, the work plane will be deleted or not.</p>
               <p className="p-flush" style={{ marginBottom: "1rem"}}>Select OK to delete the work plane.</p>
              <p className="red-text" ><strong>Note: Deleting the work plane will delete all the sketch made on the plane. <br />Be careful, this process cannot be undone.</strong></p>
              <p className="p-flush" style={{ marginTop: "1rem"}}>Select Cancel to keep the work plane together with all the 2D sketches. </p>
            </div>


            <div className="instruction-step">
              <div className="card-header"><h4>RESULT</h4></div>
              <div className="flex-row-wrap mt-8" style={{ gap: '2rem' }}>
                <div className="screenshot-wrapper">
                  <img src={extrudeDialog} alt="Extrude Dialog" className="software-screenshot" style={{ width: '600px'}} />
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
              <h4>REVOLVE</h4>
              <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(revolveStepsTTS)} onStop={stop} />
            </div>
            <p className="p-flush" style={{ marginTop: "-2rem"}}>Creates a solid entity from a section form created on a work plane or 2D drawing, by performing rotation projection.</p>

            <div className={`instruction-step ${currentIndex === 0 ? "reading-active" : ""}`} data-reading-index="0">
              <div className="step-header">
                <span className="step-number">1 </span>
                <span className="step-label">Select <strong className="red-text">Revolve</strong> from the icon menu.</span>
              </div>
              <div className="step-description">
                <div className="screenshot-wrapper">
                  <img src={revolveIcon} alt="Revolve Icon" className="software-screenshot screenshot-small" style={{ height: '100px' }} />
                </div>
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 1 ? "reading-active" : ""}`} data-reading-index="1">
              <div className="step-header">
                <span className="step-number">2 </span>
                <span className="step-label" style={{ marginTop: "-1rem"}}>Pick the cross-section to be revolved &gt; GO
                  <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '32px', margin: '0 8px' }} />
                </span>
              </div>
               <span className="p-flush" style={{ marginLeft: "3rem", marginTop: "-1rem"}}>A hatch will appear to show that the sketch is an enclosed figure</span>
            </div>

            <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2">
              <div className="step-header" style={{ marginTop: "-2rem"}} >
                <span className="step-number">3 </span>
                <span className="step-label" style={{ marginTop: "-1rem"}}>Select the <strong className="text-highlight">axis of rotation</strong> &gt; <strong className="text-highlight">GO</strong>
                  <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '32px', margin: '0 8px' }} />
                </span>
              </div>
            </div>

 

            <div className="instruction-step">
              <div className="card-header"><h4>PROCESS OVERVIEW</h4></div>
              <div className="screenshot-wrapper mt-8">
                <img src={revolveSteps} alt="Revolve Steps" className="software-screenshot" style={{ width: '950px', height: '350px', marginTop: "1rem"}} />
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
              <h4>SPIRAL FORM</h4>
              <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(spiralSteps)} onStop={stop} />
            </div>
             <p className="p-flush" style={{ marginTop: "-2rem"}}>Creates a 3D spiral form from a section form created on a 2D sketch.</p>

            <div className={`instruction-step ${currentIndex === 0 ? "reading-active" : ""}`} data-reading-index="0">
              <div className="step-header">
                <span className="step-number">1 </span>
                <span className="step-label">First do the sketch.</span>
              </div>
              <div className="step-description">
                <div className="screenshot-wrapper">
                  <img src={spiralSketch} alt="Spiral Sketch" className="software-screenshot screenshot-wide" style={{ height: 'auto', width: '900px', marginBottom: "-2rem"}} />
                </div>
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 1 ? "reading-active" : ""}`} data-reading-index="1">
              <div className="step-header">
                <span className="step-number">2 </span>
                <span className="step-label">Select <strong className="red-text">Spiral Form</strong> from the icon menu.</span>
              </div>
              <div className="step-description">
                <div className="screenshot-wrapper">
                  <img src={spiralIcon} alt="Spiral Form Icon" className="software-screenshot screenshot-small" style={{ height: '100px', marginBottom: "-2rem"}} />
                </div> 
              </div>
              <span className="p-flush" style={{ marginBottom: "1.5rem" }}> Pick the cross section to be revolved. Hatch will appear to show that the sketch is an enclosed figure &gt; GO
                 <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '40px', margin: '0 8px' }} />
                </span>
            </div>

            <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2">
              <div className="step-header" style={{ marginTop: "-2rem"}}>
                <span className="step-number">3 </span>
                <span className="step-label" style={{ marginTop: "-1rem"}}>Specify the pitch of the spiral on the item entry &gt; Press Enter &gt; GO 
                  <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '32px', margin: '0 8px' }} />
                </span>
              </div>
              <div className="instruction-box" style={{ marginTop: "2rem"}}>
                <p className="p-flush"> <strong className="red-text">Note:</strong> Pitch must be greater than thickness.</p>
              </div>

              <div className="flex-row-center--wrap mt-4" style={{ gap: '2rem' }}>
                <div className="screenshot-wrapper">
                  <img src={spiralItemEntry} alt="Spiral Item Entry" className="software-screenshot screenshot-wide" style={{ height: 'auto', width: '900px', marginBottom: "-2rem" }} />
                </div>
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 3 ? "reading-active" : ""}`} data-reading-index="3">
              <div className="step-header">
                <span className="step-number">4 </span>
                <span className="step-label">Select the ends of the length of the spiral along the axis of rotation. Then GO</span>
              </div>
              <div className="step-description">
                <div className="screenshot-wrapper">
                  <img src={spiralRotation1} alt="Spiral Axis Selection" className="software-screenshot screenshot-medium" style={{ width: '600px', height: 'auto' }} />
                </div>
              </div>
            </div>

            <div className="instruction-step">
              <div className="card-header"><h4>RESULT</h4></div>
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
