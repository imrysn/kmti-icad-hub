/** * 3D_2Dto3D.tsx  E2D > 3D lessons (1 through 3) */

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
import extrudeResultFinal from "../../assets/3D_Image_File/2d_3d2_extrude2.png";
import revolveIcon from "../../assets/3D_Image_File/2d_3d_2_revolve.png";
import revolveSteps from "../../assets/3D_Image_File/2d_3d2spiral.png";
import spiralSketch from "../../assets/3D_Image_File/2d_3d_2_revolve_spiral_form_sketch.png";
import spiralIcon from "../../assets/3D_Image_File/2d_3d_2_spiral_form.png";
import spiralItemEntry from "../../assets/3D_Image_File/2d_3d_2_spiral_form_item_entry.png";
import spiralPitch from "../../assets/3D_Image_File/2d_3d_2_spiral_form_pitch.png";
import spiralRotation1 from "../../assets/3D_Image_File/2d_3d_2_spiral_form_axis_rotation1.png";
import spiralRotation from "../../assets/3D_Image_File/2d_3d_2_spiral_form_axis_rotation.png";
import spiralRotation2 from "../../assets/3D_Image_File/2d_3d_2_spiral_form_axis_rotation2.png";

interface SubLessonProps {
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
  nextLabel?: string;
}

/* ── 2D > 3D (1) ── */
const TwoDTo3D1: React.FC<SubLessonProps> = ({ onNextLesson, onPrevLesson, nextLabel }) => {
  const [activeTab, setActiveTab] = useState<"workPlane">(() => {
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

  const tabs = [{ id: "workPlane", label: "Work Plane" }];

  return (
    <div className="course-lesson-container" ref={containerRef}>
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>
      <div className="lesson-tabs">
        {tabs.map((tab) => (<button key={tab.id} className={`tab-button ${activeTab === tab.id ? "active" : ""}`} onClick={() => setActiveTab(tab.id as any)} > {tab.label} </button>))}
      </div>

      <section className="lesson-intro">
        <h3 className="section-title">2D &gt; 3D (1)</h3>
      </section>

      <div className="lesson-grid single-card">
        <div className="lesson-card tab-content fade-in">
          <div className="card-header">
            <h4>WORK PLANE</h4>
            <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(workPlaneSteps)} onStop={stop} />
          </div>

          <div className={`instruction-step ${currentIndex === 0 ? "reading-active" : ""}`}>
            <div className="step-header">
              <span className="step-number">1 </span>
              <span className="step-label">Use <strong className="text-highlight">Open Work Plane</strong> to begin.</span>
            </div>
            <div className="step-description">
              <p className="p-flush mb-4">3D modeling is performed by sketching on 2D planes within the 3D environment.</p>
              <div className="flex-row-wrap mt-8" style={{ gap: '2rem' }}>
                <div className="screenshot-wrapper">
                  <img src={workPlaneImg} alt="X-Y Plane" className="software-screenshot screenshot-small" style={{ width: "8.5rem" }} />
                </div>
                <div className="screenshot-wrapper">
                  <img src={openWorkPlaneImg} alt="Open Work Plane toolbar" className="software-screenshot screenshot-wide" />
                </div>
              </div>
            </div>
          </div>

          <div className="section-divider"></div>

          <div className={`instruction-step ${currentIndex === 1 ? "reading-active" : ""}`}>
            <div className="step-header">
              <span className="step-number">2 </span>
              <span className="step-label">Rotate the work plane to <strong className="text-highlight">X-Y</strong>, <strong className="text-highlight">X-Z</strong>, or <strong className="text-highlight">Y-Z</strong> orientations.</span>
            </div>
            <div className="step-description">
              <div className="screenshot-wrapper">
                <img src={openWorkPlaneImg2} alt="Open Work Plane Orientation" className="software-screenshot screenshot-small" style={{ width: '15rem' }} />
              </div>
            </div>
          </div>

          <div className="lesson-navigation">
            <button className="nav-button" onClick={onPrevLesson}><ChevronLeft size={18} /> Previous</button>
            <button className="nav-button next" onClick={onNextLesson}>{nextLabel || 'Next Lesson'} <ChevronRight size={18} /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ── 2D > 3D (2) ── */
const TwoDTo3D2: React.FC<SubLessonProps> = ({ onNextLesson, onPrevLesson, nextLabel }) => {
  const [activeTab, setActiveTab] = useState<"commandMenu">(() => {
    return (localStorage.getItem('2d-3d-2-tab') as any) || 'commandMenu';
  });

  const {
    scrollProgress,
    containerRef,
    speak,
    stop,
    isSpeaking
  } = useLessonCore(`2d-3d-2-${activeTab}`);

  useEffect(() => {
    localStorage.setItem('2d-3d-2-tab', activeTab);
  }, [activeTab]);

  const menuSteps = ["Command Menu: Most tools for sketching on the work plane, like those for extruding 2D sketches into 3D solid entities, can be found on this menu."];
  const tabs = [{ id: "commandMenu", label: "Command Menu" }];

  return (
    <div className="course-lesson-container" ref={containerRef}>
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>
      <div className="lesson-tabs">
        {tabs.map((tab) => (<button key={tab.id} className={`tab-button active`}> {tab.label} </button>))}
      </div>

      <section className="lesson-intro">
        <h3 className="section-title">2D &gt; 3D (2)</h3>
      </section>

      <div className="lesson-grid single-card">
        <div className="lesson-card tab-content fade-in">
          <div className="card-header">
            <h4>COMMAND MENU</h4>
            <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(menuSteps)} onStop={stop} />
          </div>

          <div className="instruction-step">
            <p className="p-flush mb-8">Most tools used for sketching on the work plane can be found on the command menu.</p>
            <div className="screenshot-wrapper">
              <img src={commandMenu} alt="Command Menu" className="software-screenshot screenshot-wide" style={{ height: '545px' }} />
            </div>
          </div>

          <div className="lesson-navigation">
            <button className="nav-button" onClick={onPrevLesson}><ChevronLeft size={18} /> Previous</button>
            <button className="nav-button next" onClick={onNextLesson}>{nextLabel || 'Next Lesson'} <ChevronRight size={18} /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ── 2D > 3D (3) ── */
const TwoDTo3D3: React.FC<SubLessonProps> = ({ onNextLesson, onPrevLesson, nextLabel }) => {
  const [activeTab, setActiveTab] = useState<"extrude" | "revolve" | "spiral">(() => {
    return (localStorage.getItem('2d-3d-3-tab') as any) || 'extrude';
  });

  const {
    scrollProgress,
    containerRef,
    speak,
    stop,
    isSpeaking,
    currentIndex
  } = useLessonCore(`2d-3d-3-${activeTab}`);

  useEffect(() => {
    localStorage.setItem('2d-3d-3-tab', activeTab);
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
        <h3 className="section-title">2D &gt; 3D (3)</h3>
      </section>

      <div className="lesson-grid single-card">
        {/* EXTRUDE */}
        {activeTab === "extrude" && (
          <div className="lesson-card tab-content fade-in">
            <div className="card-header">
              <h4>EXTRUDE</h4>
              <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(extrudeSteps)} onStop={stop} />
            </div>

            <div className="instruction-step">
              <p className="p-flush text-highlight mb-4">These tools are used for extruding 2D sketches into 3D solid entities.</p>
              <div className="screenshot-wrapper">
                <img src={commandMenu2} alt="Extrude Tools" className="software-screenshot screenshot-small" style={{ height: '225px' }} />
              </div>
            </div>

            <div className="section-divider"></div>

            <div className={`instruction-step ${currentIndex === 0 ? "reading-active" : ""}`}>
              <div className="step-header">
                <span className="step-number">1 </span>
                <span className="step-label">Select <strong className="text-highlight">Extrude</strong> from the icon menu.</span>
              </div>
              <div className="step-description">
                <div className="screenshot-wrapper">
                  <img src={extrudeIcon} alt="Extrude Icon Menu" className="software-screenshot screenshot-small" style={{ height: '190px' }} />
                </div>
              </div>
            </div>

            <div className="section-divider"></div>

            <div className={`instruction-step ${currentIndex === 1 ? "reading-active" : ""}`}>
              <div className="step-header">
                <span className="step-number">2 </span>
                <span className="step-label">Pick the cross-section to be extruded &gt; <strong className="text-highlight">GO</strong>
                  <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '32px', margin: '0 4px' }} />
                </span>
              </div>
              <div className="step-description">
                <p className="p-flush mb-4">A hatch will appear to indicate the sketch is an enclosed figure.</p>
                <div className="screenshot-wrapper">
                  <img src={pickCrossSection} alt="PICK EDGE" className="software-screenshot screenshot-medium" />
                </div>
              </div>
            </div>

            <div className="section-divider"></div>

            <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`}>
              <div className="step-header">
                <span className="step-number">3 </span>
                <span className="step-label">Specify <strong className="text-highlight">height</strong> in item entry &gt; <strong className="text-highlight">Enter</strong> &gt; <strong className="text-highlight">GO</strong>
                  <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '32px', margin: '0 4px' }} />
                </span>
              </div>
            </div>

            <div className="section-divider"></div>

            <div className={`instruction-box instruction-box--warning ${currentIndex === 3 ? "reading-active" : ""}`}>
              <p className="p-flush">A dialog box will ask to delete the work plane. <strong className="text-highlight">OK</strong> deletes the plane and all sketches permanently. Select <strong className="text-highlight">Cancel</strong> to keep them.</p>
            </div>

            <div className="section-divider"></div>

            <div className="instruction-step">
              <div className="card-header"><h4>RESULT</h4></div>
              <div className="flex-row-wrap mt-8" style={{ gap: '2rem' }}>
                <div className="screenshot-wrapper">
                  <img src={extrudeDialog} alt="Extrude Dialog" className="software-screenshot screenshot-medium" />
                </div>
                <div className="flex-row-center"><ArrowRight size={24} className="text-highlight" /></div>
                <div className="screenshot-wrapper">
                  <img src={extrudeResultFinal} alt="Extrude Result" className="software-screenshot screenshot-medium" />
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

            <div className="instruction-step">
              <p className="p-flush text-highlight mb-4">Creates a solid entity by rotating a section form around a selected axis.</p>
            </div>

            <div className={`instruction-step ${currentIndex === 0 ? "reading-active" : ""}`}>
              <div className="step-header">
                <span className="step-number">1 </span>
                <span className="step-label">Select <strong className="text-highlight">Revolve</strong> from the icon menu.</span>
              </div>
              <div className="step-description">
                <div className="screenshot-wrapper">
                  <img src={revolveIcon} alt="Revolve Icon" className="software-screenshot screenshot-small" style={{ height: '170px' }} />
                </div>
              </div>
            </div>

            <div className="section-divider"></div>

            <div className={`instruction-step ${currentIndex === 1 ? "reading-active" : ""}`}>
              <div className="step-header">
                <span className="step-number">2 </span>
                <span className="step-label">Pick the cross-section to be revolved &gt; <strong className="text-highlight">GO</strong>
                  <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '32px', margin: '0 4px' }} />
                </span>
              </div>
              <div className="step-description">
                <p className="p-flush">A hatch will appear to show the sketch is an enclosed figure.</p>
              </div>
            </div>

            <div className="section-divider"></div>

            <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`}>
              <div className="step-header">
                <span className="step-number">3 </span>
                <span className="step-label">Select the <strong className="text-highlight">axis of rotation</strong> &gt; <strong className="text-highlight">GO</strong>
                  <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '32px', margin: '0 4px' }} />
                </span>
              </div>
            </div>

            <div className="section-divider"></div>

            <div className="instruction-step">
              <div className="card-header"><h4>PROCESS OVERVIEW</h4></div>
              <div className="screenshot-wrapper mt-8">
                <img src={revolveSteps} alt="Revolve Steps" className="software-screenshot screenshot-wide" />
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

            <div className="instruction-step">
              <p className="p-flush text-highlight mb-4">Creates a 3D spiral form from a section form created on a 2D sketch.</p>
            </div>

            <div className={`instruction-step ${currentIndex === 0 ? "reading-active" : ""}`}>
              <div className="step-header">
                <span className="step-number">1 </span>
                <span className="step-label">Create the <strong className="text-highlight">2D sketch</strong> first.</span>
              </div>
              <div className="step-description">
                <div className="screenshot-wrapper">
                  <img src={spiralSketch} alt="Spiral Sketch" className="software-screenshot screenshot-wide" style={{ height: '330px' }} />
                </div>
              </div>
            </div>

            <div className="section-divider"></div>

            <div className={`instruction-step ${currentIndex === 1 ? "reading-active" : ""}`}>
              <div className="step-header">
                <span className="step-number">2 </span>
                <span className="step-label">Select <strong className="text-highlight">Spiral Form</strong> from the menu &gt; Pick section &gt; <strong className="text-highlight">GO</strong>.</span>
              </div>
              <div className="step-description">
                <div className="screenshot-wrapper">
                  <img src={spiralIcon} alt="Spiral Form Icon" className="software-screenshot screenshot-small" style={{ height: '170px' }} />
                </div>
              </div>
            </div>

            <div className="section-divider"></div>

            <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`}>
              <div className="step-header">
                <span className="step-number">3 </span>
                <span className="step-label">Specify <strong className="text-highlight">pitch</strong> in item entry &gt; <strong className="text-highlight">GO</strong>.</span>
              </div>
              <div className="step-description">
                <p className="p-flush text-caption mb-4">*Note: Pitch must be greater than thickness.</p>
                <div className="flex-row-wrap mt-4" style={{ gap: '2rem' }}>
                  <div className="screenshot-wrapper">
                    <img src={spiralItemEntry} alt="Spiral Item Entry" className="software-screenshot screenshot-wide" style={{ height: '110px' }} />
                  </div>
                  <div className="screenshot-wrapper">
                    <img src={spiralPitch} alt="Spiral Pitch Diagram" className="software-screenshot screenshot-medium" />
                  </div>
                </div>
              </div>
            </div>

            <div className="section-divider"></div>

            <div className={`instruction-step ${currentIndex === 3 ? "reading-active" : ""}`}>
              <div className="step-header">
                <span className="step-number">4 </span>
                <span className="step-label">Select the ends of the rotational axis &gt; <strong className="text-highlight">GO</strong>.</span>
              </div>
              <div className="step-description">
                <div className="screenshot-wrapper">
                  <img src={spiralRotation1} alt="Spiral Axis Selection" className="software-screenshot screenshot-medium" style={{ width: '350px' }} />
                </div>
              </div>
            </div>

            <div className="section-divider"></div>

            <div className="instruction-step">
              <div className="card-header"><h4>RESULT</h4></div>
              <div className="flex-row-wrap mt-8" style={{ gap: '2rem' }}>
                <div className="flex-row-center"><ArrowRight size={24} className="text-highlight" /></div>
                <div className="screenshot-wrapper">
                  <img src={spiralRotation} alt="Spiral Axis Result" className="software-screenshot screenshot-medium" />
                </div>
                <div className="flex-row-center"><ArrowRight size={24} className="text-highlight" /></div>
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
    case "2d-3d-3":
      return (
        <TwoDTo3D3 onNextLesson={onNextLesson} onPrevLesson={onPrevLesson} nextLabel={nextLabel} />
      );
    default:
      return (
        <TwoDTo3D1 onNextLesson={onNextLesson} onPrevLesson={onPrevLesson} nextLabel={nextLabel} />
      );
  }
};

export default TwoDTo3DLesson;
