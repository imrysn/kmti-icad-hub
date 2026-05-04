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

  const introTitle = "2D to 3D";
  const introSubtitle = "3D modeling can be done by sketching on a 2D sketch using a plane on the 3D dimension.";

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
            const steps = activeTab === 'workPlane' ? workPlaneSteps : menuSteps;
            speak([introTitle, introSubtitle, ...steps]);
          }} onStop={stop} />
        </h3>
        <KaraokeLessonText
          className={`lesson-subtitle ${currentIndex === 1 ? "reading-active" : ""}`}
          data-reading-index="1"
          text={introSubtitle}
          isActive={isSpeaking && currentIndex === 1}
          currentCharIndex={currentCharIndex}
        />
      </section>

      <div className="lesson-grid single-card">
        {activeTab === 'workPlane' && (
          <div className="lesson-card tab-content fade-in">
            <div className="card-header">
              <h4>2D &gt; 3D</h4>
            </div>
            <div className={`instruction-step ${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
              <KaraokeLessonText
                as="p"
                className="p-flush"
                text="Work Plane: 3D modeling can be done by sketching on a 2D sketch using a plane on the 3D dimension. Use Open Work Plane from the toolbar to start."
                isActive={isSpeaking && currentIndex === 2}
                currentCharIndex={currentCharIndex}
              />
              <div className="flex-row-center--wrap" style={{ justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: '2rem' }}>
                <div className="screenshot-wrapper" style={{ marginTop: "-2rem" }}>
                  <img src={workPlaneImg} alt="X-Y Plane" className="software-screenshot screenshot-small" style={{ width: "8rem" }} />
                </div>
              </div>
              <div className="screenshot-wrapper">
                <img src={openWorkPlaneImg} alt="Open Work Plane toolbar" className="software-screenshot screenshot-wide" />
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 3 ? 'reading-active' : ''}`} data-reading-index="3">
              <KaraokeLessonText
                as="span"
                text="Step 2: Use the tools shown to rotate the work plane to X-Y, X-Z, or Y-Z orientations."
                isActive={isSpeaking && currentIndex === 3}
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
            <div className="card-header">
              <h4>COMMAND MENU</h4>
            </div>
            <KaraokeLessonText
              as="p"
              className="p-flush mb-8"
              style={{marginTop: "-2rem"}}
              text="Command Menu: Most tools for sketching on the work plane, like those for extruding 2D sketches into 3D solid entities, can be found on this menu."
              isActive={isSpeaking && currentIndex === 2}
              currentCharIndex={currentCharIndex}
            />
            <div className={`instruction-step ${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
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

  const extrudeSteps = ["Step 1: Select Extrude from the icon menu.", "Step 2: Pick the cross-section to be extruded. A hatch will appear to show it is an enclosed figure. Click GO.", "Step 3: Specify the height on the item entry, press Enter, then click GO.", "Instruction: A dialog box will appear asking to delete the work plane. OK deletes the plane and all sketches permanently. Cancel keeps them."];
  const revolveStepsTTS = ["Step 1: Select Revolve from the icon menu.", "Step 2: Pick the cross-section to be revolved. Ensure it is enclosed by checking for the hatch. Click GO.", "Step 3: Select the axis of rotation and click GO."];
  const spiralSteps = ["Step 1: First, create your 2D sketch for the spiral form.", "Step 2: Select Spiral Form from the menu. Pick the cross-section and click GO.", "Step 3: Specify the pitch in the item entry. Pitch must be greater than thickness. Click GO.", "Step 4: Select the ends of the rotational axis for the spiral length, then click GO."];

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
            speak([introTitle, introSubtitle, ...steps]);
          }} onStop={stop} />
        </h3>
        <KaraokeLessonText
          className={`lesson-subtitle ${currentIndex === 1 ? "reading-active" : ""}`}
          data-reading-index="1"
          text={introSubtitle}
          isActive={isSpeaking && currentIndex === 1}
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
              <h4>EXTRUDE</h4>
            </div>
            <p className="p-flush" style={{ marginTop: "-2rem" }}>Creates a solid entity from a section form created on a work plane or 2D drawing, by performing vertical projection.</p>

            <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2">
              <div className="step-header">
                <span className="step-number">1 </span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text="Select Extrude from the icon menu."
                  isActive={isSpeaking && currentIndex === 2}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <div className="screenshot-wrapper">
                  <img src={extrudeIcon} alt="Extrude Icon Menu" className="software-screenshot screenshot-small" style={{ height: '100px' }} />
                </div>
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 3 ? "reading-active" : ""}`} data-reading-index="3">
              <div className="step-header" style={{ marginBottom: "-2rem" }}>
                <span className="step-number">2 </span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text="Pick the cross-section to be extruded. A hatch will appear to show it is an enclosed figure. Click GO."
                  isActive={isSpeaking && currentIndex === 3}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <div className="screenshot-wrapper" style={{ marginTop: "2rem" }}>
                  <img src={pickCrossSection} alt="PICK EDGE" className="software-screenshot" style={{ width: '600px' }} />
                </div>
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 4 ? "reading-active" : ""}`} data-reading-index="4">
              <div className="step-header" style={{ marginTop: "-2rem" }}>
                <span className="step-number">3 </span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  style={{ marginBottom: "1.5rem" }}
                  text="Specify the height on the item entry, press Enter, then click GO."
                  isActive={isSpeaking && currentIndex === 4}
                  currentCharIndex={currentCharIndex}
                />
              </div>
            </div>



            <div className={`instruction-box instruction-box--warning ${currentIndex === 5 ? "reading-active" : ""}`} data-reading-index="5">
              <KaraokeLessonText
                as="p"
                className="p-flush"
                style={{ marginBottom: "1rem" }}
                text="Instruction: A dialog box will appear asking to delete the work plane. OK deletes the plane and all sketches permanently. Cancel keeps them."
                isActive={isSpeaking && currentIndex === 5}
                currentCharIndex={currentCharIndex}
              />
              <p className="red-text" ><strong>Note: Deleting the work plane will delete all the sketch made on the plane. <br />Be careful, this process cannot be undone.</strong></p>
            </div>


            <div className={`instruction-step ${currentIndex === 5 ? 'reading-active' : ''}`} data-reading-index="5">
              <div className="card-header"><h4>RESULT</h4></div>
              <div className="flex-row-wrap mt-8" style={{ gap: '2rem' }}>
                <div className="screenshot-wrapper">
                  <img src={extrudeDialog} alt="Extrude Dialog" className="software-screenshot" style={{ width: '600px' }} />
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
            </div>
            <p className="p-flush" style={{ marginTop: "-2rem" }}>Creates a solid entity from a section form created on a work plane or 2D drawing, by performing rotation projection.</p>

            <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2">
              <div className="step-header">
                <span className="step-number">1 </span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text="Select Revolve from the icon menu."
                  isActive={isSpeaking && currentIndex === 2}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <div className="screenshot-wrapper">
                  <img src={revolveIcon} alt="Revolve Icon" className="software-screenshot screenshot-small" style={{ height: '100px' }} />
                </div>
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 3 ? "reading-active" : ""}`} data-reading-index="3">
              <div className="step-header">
                <span className="step-number">2 </span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  style={{ marginTop: "-1.5rem" }}
                  text="Pick the cross-section to be revolved. Ensure it is enclosed by checking for the hatch. Click GO."
                  isActive={isSpeaking && currentIndex === 3}
                  currentCharIndex={currentCharIndex}
                />
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 4 ? "reading-active" : ""}`} data-reading-index="4">
              <div className="step-header" style={{ marginTop: "-2rem" }} >
                <span className="step-number">3 </span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  style={{ marginTop: "-1.5rem" }}
                  text="Select the axis of rotation and click GO."
                  isActive={isSpeaking && currentIndex === 4}
                  currentCharIndex={currentCharIndex}
                />
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 4 ? 'reading-active' : ''}`} data-reading-index="4">
              <div className="card-header"><h4>PROCESS OVERVIEW</h4></div>
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
              <h4>SPIRAL FORM</h4>
            </div>
            <p className="p-flush" style={{ marginTop: "-2rem" }}>Creates a 3D spiral form from a section form created on a 2D sketch.</p>

            <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2">
              <div className="step-header">
                <span className="step-number">1 </span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text="First, create your 2D sketch for the spiral form."
                  isActive={isSpeaking && currentIndex === 2}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <div className="screenshot-wrapper">
                  <img src={spiralSketch} alt="Spiral Sketch" className="software-screenshot screenshot-wide" style={{ height: 'auto', width: '900px', marginBottom: "-2rem" }} />
                </div>
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 3 ? "reading-active" : ""}`} data-reading-index="3">
              <div className="step-header">
                <span className="step-number">2 </span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text="Select Spiral Form from the menu. Pick the cross-section and click GO."
                  isActive={isSpeaking && currentIndex === 3}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <div className="screenshot-wrapper">
                  <img src={spiralIcon} alt="Spiral Form Icon" className="software-screenshot screenshot-small" style={{ height: '100px', marginBottom: "-2rem" }} />
                </div>
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 4 ? "reading-active" : ""}`} data-reading-index="4">
              <div className="step-header" style={{ marginTop: "-2rem" }}>
                <span className="step-number">3 </span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  style={{ marginTop: "-1.1rem" }}
                  text="Specify the pitch in the item entry. Pitch must be greater than thickness. Click GO."
                  isActive={isSpeaking && currentIndex === 4}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="flex-row-center--wrap mt-4" style={{ gap: '2rem' }}>
                <div className="screenshot-wrapper">
                  <img src={spiralItemEntry} alt="Spiral Item Entry" className="software-screenshot screenshot-wide" style={{ height: 'auto', width: '900px', marginBottom: "-2rem" }} />
                </div>
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 5 ? "reading-active" : ""}`} data-reading-index="5">
              <div className="step-header">
                <span className="step-number">4 </span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text="Select the ends of the rotational axis for the spiral length, then click GO."
                  isActive={isSpeaking && currentIndex === 5}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <div className="screenshot-wrapper">
                  <img src={spiralRotation1} alt="Spiral Axis Selection" className="software-screenshot screenshot-medium" style={{ width: '600px', height: 'auto' }} />
                </div>
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 5 ? 'reading-active' : ''}`} data-reading-index="5">
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
