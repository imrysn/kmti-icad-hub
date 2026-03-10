/**
 * 3D2Dto3D.tsx  —  2D > 3D lessons (1 through 3)
 *
 * Lesson-item parent ID: '2d-to-3d' (collapsed in sidebar)
 * Sub-lesson child IDs  : '2d-3d-1' | '2d-3d-2' | '2d-3d-3'
 *
 * Each sub-lesson is a self-contained component defined in this file.
 * The default export `TwoDTo3DLesson` dispatches to the correct sub-lesson:
 *
 *   <TwoDTo3DLesson subLessonId="2d-3d-1" />
 *
 * Sub-lesson map:
 *   2d-3d-1  →  TwoDTo3D1   Work Plane / Command Menu / Extrude
 *   2d-3d-2  →  TwoDTo3D2   (content stub — to be added)
 *   2d-3d-3  →  TwoDTo3D3   (content stub — to be added)
 */
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import '../../styles/3DModeling/CourseLesson.css';
import '../../styles/3DModeling/3D2Dto3D.css';

// ══════════════════════════════════════════════════════════════════════════
// 2D > 3D (1) — WORK PLANE / COMMAND MENU / EXTRUDE
// Lesson-item child ID: '2d-3d-1'
// Tabs: Work Plane | Command Menu | Extrude
// ══════════════════════════════════════════════════════════════════════════
import workPlaneImg from '../../assets/3D_Image_File/2d_3d_work_plane.jpg';
import openWorkPlaneImg from '../../assets/3D_Image_File/2d_3d_open_work_plane1.jpg';
import openWorkPlaneImg2 from '../../assets/3D_Image_File/2d_3d_open_work_plane.jpg';
import extrudeIcon from '../../assets/3D_Image_File/2d_3d_(1)_extrude.jpg';
import pickCrossSection from '../../assets/3D_Image_File/2d_3d_(1)_pick_cross_section.jpg';
import commandMenu from '../../assets/3D_Image_File/2d_3d(1)_1.png';
import commandMenu2 from '../../assets/3D_Image_File/2d_3d_(1)_command_menu2.jpg';
import leftClick from '../../assets/3D_Image_File/left_click.jpg';
import extrudeDialog from '../../assets/3D_Image_File/2d_3d(2)_extrude1.jpg';
import extrudeResultFinal from '../../assets/3D_Image_File/2d_3d(2)_extrude2.jpg';
import revolveIcon from '../../assets/3D_Image_File/2d_3d_(2)_revolve.jpg';
import revolveSteps from '../../assets/3D_Image_File/2d_3d(2)spiral.png';
import spiralSketch from '../../assets/3D_Image_File/2d_3d_(2)_revolve_spiral_form_sketch.jpg';
import spiralIcon from '../../assets/3D_Image_File/2d_3d_(2)_spiral_form.jpg';
import spiralItemEntry from '../../assets/3D_Image_File/2d_3d_(2)_spiral_form_item_entry.jpg';
import spiralPitch from '../../assets/3D_Image_File/2d_3d_(2)_spiral_form_pitch.jpg';
import spiralRotation1 from '../../assets/3D_Image_File/2d_3d_(2)_spiral_form_axis_rotation1.jpg';
import spiralRotation from '../../assets/3D_Image_File/2d_3d_(2)_spiral_form_axis_rotation.jpg';
import spiralRotation2 from '../../assets/3D_Image_File/2d_3d_(2)_spiral_form_axis_rotation2.jpg';


// ══════════════════════════════════════════════════════════════════════════
// 2D > 3D (2) — (Content to be added)
// Lesson-item child ID: '2d-3d-2'
// ══════════════════════════════════════════════════════════════════════════

// ══════════════════════════════════════════════════════════════════════════
// 2D > 3D (3) — (Content to be added)
// Lesson-item child ID: '2d-3d-3'
// ══════════════════════════════════════════════════════════════════════════

// ──────────────────────────────────────────────────────────────────────────
// Sub-lesson components
// ──────────────────────────────────────────────────────────────────────────

/* ── 2D > 3D (1) ── */
const TwoDTo3D1: React.FC<{ onNextLesson?: () => void }> = ({ onNextLesson }) => {
  const [activeTab, setActiveTab] = useState<'workPlane'>('workPlane');
  const tabs = [
    { id: 'workPlane', label: 'Work Plane' },
  ];

  const scrollToTop = () => {
    const viewer = document.querySelector('.main-content-viewer');
    if (viewer) viewer.scrollTo(0, 0);
  };
  const handleNext = () => {
    const i = tabs.findIndex(t => t.id === activeTab);
    if (i < tabs.length - 1) setActiveTab(tabs[i + 1].id as any);
  };
  const handlePrev = () => {
    const i = tabs.findIndex(t => t.id === activeTab);
    if (i > 0) setActiveTab(tabs[i - 1].id as any);
  };

  return (
    <div className="course-lesson-container">
      <section className="lesson-intro">
        <h3>2D &gt; 3D (1)</h3>
      </section>

      <div className="lesson-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => {
              setActiveTab(tab.id as any);
              scrollToTop();
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="lesson-grid single-card">
        {/* WORK PLANE */}
        {activeTab === 'workPlane' && (
          <div className="lesson-card tab-content">
            <div className="card-header"><h4>WORK PLANE</h4></div>
            <div className="instruction-step">
              <div className="intro-row">
                <p className="intro-text">3D modeling can be done by sketching on 2D sketch using a plane on the 3D dimension.</p>
                <img src={workPlaneImg} alt="X-Y Plane" className="software-screenshot screenshot-small intro-plane-img" />
              </div>
              <div className="flex-1">
                <p className="intro-sub-text">To create 2D plane on the 3D Dimension, use <strong>Open Work Plane</strong> from the toolbar.</p>
              </div>
              <div className="image-wrapper-flush">
                <img src={openWorkPlaneImg} alt="Open Work Plane toolbar" className="software-screenshot screenshot-wide" />
              </div>
              <div className="image-wrapper-row">
                <img src={openWorkPlaneImg2} alt="Open Work Plane" className="software-screenshot screenshot-small" />
                <p className="p-flush">Use to rotate the work plane to X-Y Plane, X-Z Plane or Y-Z Plane.</p>
              </div>
            </div>

            <div className="lesson-navigation">
              <button className="nav-button" disabled><ChevronLeft size={18} /> Previous</button>
              <button className="nav-button next" onClick={onNextLesson}>Finish <ChevronRight size={18} /></button>
            </div>
          </div>
        )}
      </div>
    </div >
  );
};

/* ── 2D > 3D (2) — Placeholder ── */
const TwoDTo3D2: React.FC<{ onNextLesson?: () => void }> = ({ onNextLesson }) => {
  const [activeTab, setActiveTab] = useState<'commandMenu'>('commandMenu');

  const tabs = [
    { id: 'commandMenu', label: 'Command Menu' },
  ];

  return (
    <div className="course-lesson-container">
      <section className="lesson-intro">
        <h3>2D &gt; 3D (2)</h3>
      </section>

      <div className="lesson-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id as any)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="lesson-grid single-card">
        {activeTab === 'commandMenu' && (
          <div className="lesson-card tab-content">
            <div className="card-header"><h4>COMMAND MENU</h4></div>
            <div className="instruction-step">
              <p className="p-flush-bottom">Most tools used for sketching on the work plane can be found on the command menu.</p>
              <img src={commandMenu} alt="Command Menu" />
            </div>
            <div className="lesson-navigation">
              <button className="nav-button" disabled><ChevronLeft size={18} /> Previous</button>
              <button className="nav-button next" onClick={onNextLesson}>Finish <ChevronRight size={18} /></button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/* ── 2D > 3D (3) — Placeholder ── */
const TwoDTo3D3: React.FC<{ onNextLesson?: () => void }> = ({ onNextLesson }) => {
  const [activeTab, setActiveTab] = useState<'extrude' | 'revolve' | 'spiral'>('extrude');

  const tabs = [
    { id: 'extrude', label: 'Extrude' },
    { id: 'revolve', label: 'Revolve' },
    { id: 'spiral', label: 'Spiral' },
  ];

  const scrollToTop = () => {
    const viewer = document.querySelector('.main-content-viewer');
    if (viewer) viewer.scrollTo(0, 0);
  };

  const handleNext = () => {
    const i = tabs.findIndex(t => t.id === activeTab);
    if (i < tabs.length - 1) {
      setActiveTab(tabs[i + 1].id as any);
      scrollToTop();
    }
  };
  const handlePrev = () => {
    const i = tabs.findIndex(t => t.id === activeTab);
    if (i > 0) {
      setActiveTab(tabs[i - 1].id as any);
      scrollToTop();
    }
  };

  return (
    <div className="course-lesson-container">
      <section className="lesson-intro">
        <h3>2D &gt; 3D (3)</h3>
      </section>

      <div className="lesson-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => {
              setActiveTab(tab.id as any);
              scrollToTop();
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="lesson-grid single-card">
        {/* EXTRUDE */}
        {activeTab === 'extrude' && (
          <div className="lesson-card tab-content">
            <div className="instruction-box">
              <p>These are the tools use for extruding 2D sketches to 3D solid Entities.</p>
              <div className="image-wrapper">
                <img src={commandMenu2} alt="Extrude Tools" className="software-screenshot screenshot-medium" />
              </div>
              <p className="p-mt-sm">Most commonly used tools are the following:</p>
            </div>

            <div className="card-header card-header--spaced"><h4>EXTRUDE</h4></div>
            <p className="p-flush-bottom">Creates a solid entity from a section form created on a work plane or 2D drawing, by performing vertical at projection.</p>

            <div className="instruction-step">
              <div className="step-header">
                <span className="step-label step-label--normal">1.) Select <strong>Extrude</strong> from the icon menu.</span>
              </div>
              <div className="image-wrapper-flush">
                <img src={extrudeIcon} alt="Extrude Icon Menu" className="software-screenshot screenshot-small" />
              </div>
            </div>

            <div className="instruction-step">
              <div className="step-header">
                <span className="step-label step-label--normal">2.) Pick the cross-section to be extruded. A hatch will appear to show that the sketch is an enclosed figure &gt; GO</span>
                <img src={leftClick} alt="Left click" className="software-screenshot screenshot-click screenshot-click--indent" />
              </div>
              <div className="image-wrapper-row image-wrapper-row--mt-md">
                <img src={pickCrossSection} alt="PICK EDGE" className="software-screenshot screenshot-medium" />

              </div>
            </div>

            <div className="instruction-step">
              <div className="step-header">
                <span className="step-label step-label--normal">3.) Specify the height of extrusion on the item entry &gt; Press Enter &gt; GO</span>
                <img src={leftClick} alt="Left click" className="software-screenshot screenshot-click screenshot-click--indent" />
              </div>
            </div>

            <p className="p-flush-bottom p-mt-sm">A dialog box will appear asking if after extrusion, the work plane will be deleted or not. Select OK to delete the work plane.</p>
            <p className="note-text--warning">Note: Deleting the work plane will delete all the sketch made on the plane. Be careful, this process cannot be undone.</p>
            <p className="p-flush p-reset">Select Cancel to keep the work plane together with all the 2D sketches.</p>

            <div className="image-wrapper-row image-wrapper-row--mt-lg">
              <img src={extrudeDialog} alt="Extrude Dialog" className="software-screenshot screenshot-medium" />
              <img src={extrudeResultFinal} alt="Extrude Result" className="software-screenshot screenshot-medium" />
            </div>

            <div className="lesson-navigation">
              <button className="nav-button" disabled><ChevronLeft size={18} /> Previous</button>
              <button className="nav-button next" onClick={handleNext}>Next <ChevronRight size={18} /></button>
            </div>
          </div>
        )}

        {/* REVOLVE */}
        {activeTab === 'revolve' && (
          <div className="lesson-card tab-content">
            <div className="instruction-box">
              <p>These are the tools use for revolving 2D sketches to 3D solid Entities.</p>
              <div className="image-wrapper">
                <img src={commandMenu2} alt="Revolve Tools" className="software-screenshot screenshot-medium" />
              </div>
              <p className="p-mt-sm">Most commonly used tools are the following:</p>
            </div>

            <div className="card-header card-header--spaced"><h4>REVOLVE</h4></div>
            <p className="p-flush-bottom">Creates a solid entity from a section from creatd on a work plane or 2D drawing, by performing rotation projection.</p>

            <div className="instruction-step">
              <div className="step-header">
                <span className="step-label step-label--normal">1.) Select <strong>Revolve</strong> from the icon menu.</span>
              </div>
              <div className="image-wrapper-flush">
                <img src={revolveIcon} alt="Revolve Icon" className="software-screenshot screenshot-small" />
              </div>
            </div>

            <div className="instruction-step">
              <div className="step-header">
                <span className="step-label step-label--normal">2.) Pick the cross section to be revolved &gt; GO</span>
                <img src={leftClick} alt="Left click" className="software-screenshot screenshot-click screenshot-click--indent" />
              </div>
              <p className="p-flush">A hatch will appear to show that the sketch is an enclosed figure</p>
            </div>

            <div className="instruction-step">
              <div className="step-header">
                <span className="step-label step-label--normal">3.) Select the axis of rotation &gt; GO</span>
                <img src={leftClick} alt="Left click" className="software-screenshot screenshot-click screenshot-click--indent" />
              </div>
            </div>

            <img src={revolveSteps} alt="Revolve Steps" />

            <div className="lesson-navigation">
              <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button>
              <button className="nav-button next" onClick={handleNext}>Next <ChevronRight size={18} /></button>
            </div>
          </div>
        )}

        {/* SPIRAL */}
        {activeTab === 'spiral' && (
          <div className="lesson-card tab-content">
            <div className="instruction-box">
              <p>These are the tools use for spiraling 2D sketches to 3D solid Entities.</p>
              <div className="image-wrapper">
                <img src={commandMenu2} alt="Spiral Tools" className="software-screenshot screenshot-medium" />
              </div>
              <p className="p-mt-sm">Most commonly used tools are the following:</p>
            </div>

            <div className="card-header card-header--spaced"><h4>SPIRAL FORM</h4></div>
            <p className="p-flush-bottom">Creates a 3D spiral form from a section form created on a 2D sketch.</p>

            <div className="instruction-step">
              <div className="step-header">
                <span className="step-label step-label--normal">1.) First do the sketch.</span>
              </div>
              <div className="image-wrapper-flush">
                <img src={spiralSketch} alt="Spiral Sketch" className="software-screenshot screenshot-wide" />
              </div>
            </div>

            <div className="instruction-step">
              <div className="step-header">
                <span className="step-label step-label--normal">2.) Select <strong className="keyword--danger">Spiral Form</strong> from the icon menu.</span>
              </div>
              <div className="image-wrapper-flush">
                <img src={spiralIcon} alt="Spiral Form Icon" className="software-screenshot screenshot-small" />
              </div>
              <p className="p-flush">Pick the cross section to be revolved. Hatch will appear to show that the sketch is an enclosed figure &gt; GO </p>
            </div>

            <div className="instruction-step">
              <div className="step-header">
                <span className="step-label step-label--normal">3.) Specify the pitch of the spiral on the item entry &gt; Press Enter &gt; GO</span>
                <img src={leftClick} alt="Left click" className="software-screenshot screenshot-click screenshot-click--indent" />
              </div>
              <p className="p-flush-bottom note-text--warning">*Note: Pitch must be greater than Thickness</p>
              <div className="image-wrapper-row image-wrapper-row--mt-sm">
                <img src={spiralItemEntry} alt="Spiral Item Entry" className="software-screenshot screenshot-medium" />
                <img src={spiralPitch} alt="Spiral Pitch Diagram" className="software-screenshot screenshot-medium" />
              </div>
            </div>

            <div className="instruction-step">
              <div className="step-header">
                <span className="step-label step-label--normal">4.) Select the ends of the length of the spiral along the axis of rotation Then GO</span>
              </div>
            </div>

            <div className="image-wrapper-row image-wrapper-row--mt-lg image-wrapper-row--wrap">
              <img src={spiralRotation1} alt="Spiral Axis 1" className="software-screenshot screenshot-medium-small" />
              <img src={spiralRotation} alt="Spiral Axis" className="software-screenshot screenshot-medium-small" />
              <img src={spiralRotation2} alt="Spiral Result" className="software-screenshot screenshot-medium-small" />
            </div>

            <div className="lesson-navigation">
              <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button>
              <button className="nav-button next" onClick={onNextLesson}>Finish <ChevronRight size={18} /></button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ──────────────────────────────────────────────────────────────────────────
// Main export — renders the correct sub-lesson based on subLessonId prop
// ──────────────────────────────────────────────────────────────────────────
interface TwoDTo3DLessonProps {
  subLessonId: string;
  onNextLesson?: () => void;
}

const TwoDTo3DLesson: React.FC<TwoDTo3DLessonProps> = ({ subLessonId, onNextLesson }) => {
  switch (subLessonId) {
    case '2d-3d-1': return <TwoDTo3D1 onNextLesson={onNextLesson} />;
    case '2d-3d-2': return <TwoDTo3D2 onNextLesson={onNextLesson} />;
    case '2d-3d-3': return <TwoDTo3D3 onNextLesson={onNextLesson} />;
    default: return <TwoDTo3D1 onNextLesson={onNextLesson} />;
  }
};

export default TwoDTo3DLesson;
