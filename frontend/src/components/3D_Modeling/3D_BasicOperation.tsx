

import React,
{

  useState,

  useEffect, useRef
} from 'react';

import {
  MousePointer2,
  Keyboard,
  Box as BoxIcon,
  Circle,
  ChevronLeft,
  ChevronRight,
  ArrowDown,
  ArrowRight,
  Info,
  Zap
} from 'lucide-react';
import { useLessonCore } from '../../hooks/useLessonCore';
import { ReadAloudButton } from '../ReadAloudButton';
import '../../styles/3D_Modeling/CourseLesson.css';
/* ── Shared Asset Imports ────────────────────────────────────────────────── */

import leftClick from '../../assets/3D_Image_File/left_click.png';
/* ══════════════════════════════════════════════════════════════════════════ */
/* Basic Operation (1)  ECREATING BASIC SHAPES */
/* Lesson-item child ID: 'basic-op-1' */
/* Tabs: Cylinder | Box | Polygon | Cone | Torus */
/* ══════════════════════════════════════════════════════════════════════════ */

import cmdMenu from '../../assets/3D_Image_File/basic_operation1_command_menu.png';

import threeDView from '../../assets/3D_Image_File/basic_operation1_3d_view.png';

import arrangeCylinder from '../../assets/3D_Image_File/basic_operation1_arrange_cylinder.png';

import cylinderResult from '../../assets/3D_Image_File/basic_operation1_cylinder.png';

import itemEntry from '../../assets/3D_Image_File/basic_operation1_item_entry.png';

import keyEntry from '../../assets/3D_Image_File/basic_operation1_key_entry_area.png';

import arrangeBox from '../../assets/3D_Image_File/basic_operation1_arrange_box.png';

import itemEntryBox from '../../assets/3D_Image_File/basic_operation1_item_entry_box.png';

import boxResult from '../../assets/3D_Image_File/box.png';


import arrangePolygon from '../../assets/3D_Image_File/basic_operation1_arrange_polygon_prism.png';

import polygonResult from '../../assets/3D_Image_File/polygon.png';

import itemEntryPolygon from '../../assets/3D_Image_File/item_entry_polygon.png';

import arrangeCone from '../../assets/3D_Image_File/basic_operation2_arrange_cone.png';

import itemEntryCone from '../../assets/3D_Image_File/basic_operation2_item_entry_cone.png';

import coneResult from '../../assets/3D_Image_File/cone.png';

import arrangeTorus from '../../assets/3D_Image_File/basic_operation2_arrange_torus.png';

import torusResult from '../../assets/3D_Image_File/torus.png';

import itemEntryTorus from '../../assets/3D_Image_File/basic_operation2_item_entry_torus.png';
/* ══════════════════════════════════════════════════════════════════════════ */
/* Basic Operation (2)  EMOVE, ROTATE, COPY, MIRROR, DELETE */
/* Lesson-item child ID: 'basic-op-2' */
/* Tabs: Move | Rotate | Mirror | Copy | Rotate Copy | Mirror Copy | Delete */
/* ══════════════════════════════════════════════════════════════════════════ */

import operationsMenu from '../../assets/3D_Image_File/basic_operation1_move_rotate_copy_mirror_delete.png';

import moveMenu from '../../assets/3D_Image_File/basic_operation2_move.png';

import itemEntryMove from '../../assets/3D_Image_File/basic_operation2_item_entry_box.png';

import moveResult from '../../assets/3D_Image_File/basic_operation2_move_3.png';

import rotateIcon from '../../assets/3D_Image_File/basic_operation3_rotate.png';

import rotateAxis from '../../assets/3D_Image_File/basic_operation3_rotate_axis_rotation.png';

import rotateEntry from '../../assets/3D_Image_File/basic_operation3_rotate_item_entry.png';

import mirrorIcon from '../../assets/3D_Image_File/basic_operation3_mirror.png';

import mirrorResult from '../../assets/3D_Image_File/basic_operation3_mirrored.png';

import copyIcon from '../../assets/3D_Image_File/basic_operation3_copy.png';

import copyDistance from '../../assets/3D_Image_File/basic_operation3_copy_distance.png';

import copyResult from '../../assets/3D_Image_File/basic_operation3_copy_3.png';

import rotateCopyIcon from '../../assets/3D_Image_File/basic_operation3_rotatecopy.png';

import rotateCopyAxis from '../../assets/3D_Image_File/basic_operation3_rotate_copy.png';

import mirrorCopyIcon from '../../assets/3D_Image_File/basic_operation3_mirror_copy.png';

import mirrorCopyResult from '../../assets/3D_Image_File/basic_operation3_mirrorcopy.png';

import deleteIcon from '../../assets/3D_Image_File/basic_operation3_delete.png';
/* ══════════════════════════════════════════════════════════════════════════ */
/* Basic Operation (3)  ESKETCH / EXTRUDE / REVOLVE / SHOW-HIDE / STRETCH / RESIZE */
/* Lesson-item child ID: 'basic-op-3' */
/* Tabs: Sketch/Extrude/Revolve | Show/Hide | Stretch | Resize */
/* ══════════════════════════════════════════════════════════════════════════ */

import sketchIcon from '../../assets/3D_Image_File/basic_operation4_sketch.png';

import sketch1 from '../../assets/3D_Image_File/basic_operation4_sketch.png';

import sketchResultImg from '../../assets/3D_Image_File/basic_operation4_sketch1.jpg';

import sketchIntroImg from '../../assets/3D_Image_File/basic_operation_(3)_sketch.jpg';

import extrudeRevolveMenu from '../../assets/3D_Image_File/basic_operation4_extrude_revolve.png';

import extrudeOneSide from '../../assets/3D_Image_File/basic_operation4_extrusion_oneside.png';
/* cspell:disable-line */

import extrudeBothSide from '../../assets/3D_Image_File/basic_operation4_extrusion_bothside.png';
/* cspell:disable-line */

import revolveIcon from '../../assets/3D_Image_File/basic_operation4_revolve.png';

import revolveP1 from '../../assets/3D_Image_File/basic_operation4_revolve_p1.png';

import revolveP2 from '../../assets/3D_Image_File/basic_operation4_revolve_p2.png';

import showHideMenu from '../../assets/3D_Image_File/basic_operation4_show_hide.jpg';

import showHideEntity from '../../assets/3D_Image_File/basic_operation4_show_hide_entity.png';

import showHideDraftingEntity from '../../assets/3D_Image_File/basic_operation4_showhide_drafting_entity.png';
/* cspell:disable-line */

import hideUnselectedEntity from '../../assets/3D_Image_File/basic_operation4_hide_unselected_entity.png';

import hideUnselectedEntity1 from '../../assets/3D_Image_File/basic_operation4_hide_unselected_entity_1.png';

import fairingChamferImg from '../../assets/3D_Image_File/fairing_chamfer.jpg';
import stretchIcon from '../../assets/3D_Image_File/basic_operation5_stretch.png';

import stretchItemEntry from '../../assets/3D_Image_File/basic_operation5_item_entry_stretch.png';

import stretchImg1 from '../../assets/3D_Image_File/basic_operation5_stretch1.png';

import stretchImg2 from '../../assets/3D_Image_File/basic_operation5_stretch2.png';

import resizeIcon from '../../assets/3D_Image_File/basic_operation5_resize.png';

import resizeItemEntry from '../../assets/3D_Image_File/basic_operation5_item_entry_resize.png';

import resize3_2 from '../../assets/3D_Image_File/basic_operation5_resize3_2.png';
/* ══════════════════════════════════════════════════════════════════════════ */
/* Basic Operation (4)  EARRANGE MACHINE PART / SHAPE STEELS */
/* Lesson-item child ID: 'basic-op-4' */
/* Tabs: Shape Steels */
/* ══════════════════════════════════════════════════════════════════════════ */

import arrangeMachinePartMenu from '../../assets/3D_Image_File/basic_operation6_arrange_machine_part.png';
/* dito nako haha */

import arrangeMachinePartWindow from '../../assets/3D_Image_File/basic_operation6_arrange_machine_part_window.png';

import shapeSteelsTypes from '../../assets/3D_Image_File/basic_operation6_shape_steels.png';

import shapeSteels1 from '../../assets/3D_Image_File/basic_operation6_shape_steels1.png';

import shapeSteels2 from '../../assets/3D_Image_File/basic_operation6_shape_steels2.png';

import keyEntryArea from '../../assets/3D_Image_File/basic_operation1_key_entry_area.png';
/* ────────────────────────────────────────────────────────────────────────── */
/* Sub-lesson components */
/* ────────────────────────────────────────────────────────────────────────── */
/* ── Basic Operation (1): Creating Basic Shapes ── */

interface SubLessonProps {
  subLessonId: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
  nextLabel?: string;
}

const BasicOperation1: React.FC<SubLessonProps> = ({ subLessonId, onNextLesson, onPrevLesson, nextLabel }) => {
  const [activeTab, setActiveTab] = useState<'cylinder' | 'box' | 'polygon' | 'cone' | 'torus'>(() => {
    return (localStorage.getItem(`${subLessonId}-tab`) as any) || 'cylinder';
  });
  const { scrollProgress, containerRef, speak, stop, isSpeaking, currentIndex } = useLessonCore(`${subLessonId}-${activeTab}`);

  useEffect(() => {
    localStorage.setItem(`${subLessonId}-tab`, activeTab);
  }, [subLessonId, activeTab]);

  const cylinderSteps = [
    "Step 1: Select Arrange Cylinder from the icon menu.",
    "Step 2: On the bottom left corner, the item entry can be located. Specify the diameter and height of cylinder on the item entry.",
    "Step 3: In the Key Entry Area, enter the coordinates for the position (origin)."
  ];

  const boxSteps = [
    "Step 1: Select Arrange Box from the icon menu.",
    "Step 2: Specify the depth, width and height of the box on the item entry.",
    "Step 3: In the Key Entry Area, enter the coordinates for the position (origin)."
  ];

  const polygonSteps = [
    "Step 1: Select Arrange Polygonal Prism from the icon menu.",
    "Step 2: Specify the number of sides, diameter and height of the polygon on the item entry.",
    "Step 3: In the Key Entry Area, enter the coordinates for the position (origin)."
  ];

  const coneSteps = [
    "Step 1: Select Arrange Cone from the icon menu.",
    "Step 2: Specify the number of sides, base diameter, top face diameter and height on the item entry.",
    "Step 3: On the Key Entry Area, enter the coordinates for the position (origin)."
  ];

  const torusSteps = [
    "Step 1: Select Arrange Torus from the icon menu.",
    "Step 2: Specify the section diameter, path radius, and turn angle.",
    "Step 3: In the Key Entry Area, enter the coordinates for the position (origin)."
  ];

  const tabs = [
    { id: 'cylinder', label: 'Cylinder' },
    { id: 'box', label: 'Box' },
    { id: 'polygon', label: 'Polygon' },
    { id: 'cone', label: 'Cone' },
    { id: 'torus', label: 'Torus' }];

  const handleNext = () => {
    const i = tabs.findIndex(t => t.id === activeTab);
    if (i < tabs.length - 1) { setActiveTab(tabs[i + 1].id as any); } else if (onNextLesson) onNextLesson();
  };

  const handlePrev = () => {
    const i = tabs.findIndex(t => t.id === activeTab);
    if (i > 0) { setActiveTab(tabs[i - 1].id as any); } else if (onPrevLesson) onPrevLesson();
  };

  return (
    <div className={`course-lesson-container ${isSpeaking ? 'is-reading' : ''}`} ref={containerRef}>
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      <div className="lesson-tabs">
        {tabs.map(tab => (<button key={tab.id} className={`tab-button ${activeTab === tab.id ? 'active' : ''}`} onClick={() => setActiveTab(tab.id as any)}>{tab.label}</button>))}
      </div>

      <section className="lesson-intro">
        <h3 className="section-title">Creating Basic Shapes</h3>
        <p className="p-flush">When creating a 3D model, always start with the <strong className="text-highlight">Front View</strong>.</p>
        <div className="screenshot-wrapper mt-8">
          <img src={threeDView} alt="3D View" className="software-screenshot" style={{ width: '350px' }} />
        </div>
        <div className="instruction-box mt-8">
          <p className="p-flush mb-4">On the command menu: <strong className="text-highlight">[Arrange Solid] &gt; [Select Y Orientation]</strong></p>
          <div className="screenshot-wrapper">
            <img src={cmdMenu} alt="Command Menu" className="software-screenshot" style={{ width: '200px', marginTop: "1rem" }} />
          </div>
        </div>
      </section>

      <div className="lesson-grid single-card">
        {activeTab === 'cylinder' && (
          <div className={`lesson-card tab-content fade-in ${isSpeaking ? 'reading-active' : ''}`}>
            <div className="card-header">
              <h4>CYLINDER</h4>
              <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(cylinderSteps)} onStop={stop} />
            </div>

            <div className={`instruction-step ${currentIndex === 0 ? 'reading-active' : ''}`} data-reading-index="0">
              <div className="step-header">
                <span className="step-number">1 </span>
                <span className="step-label">Select  <strong className="red-text"> Arrange Cylinder </strong> from the icon menu.</span>
              </div>
              <div className="step-description">
                <div className="screenshot-wrapper">
                  <img src={arrangeCylinder} alt="Arrange Cylinder icon" className="software-screenshot" style={{ width: '550px', marginBottom: "-3rem" }} />
                </div>
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 1 ? 'reading-active' : ''}`}>
              <div className="step-header">
                <span className="step-number">2 </span>
                <span className="step-label">On the bottom left corner, the <strong className="red-text"> item entry</strong>  can be located.</span>
              </div>
              <div className="step-description">
                <div className="screenshot-wrapper">
                  <img src={itemEntry} alt="Item Entry Cylinder" className="software-screenshot" style={{ width: '850px', marginTop: "-1rem" }} />
                </div>
                <p className="p-flush mt-4 text-highlight" style={{ marginBottom: "-2rem" }}>Specify the diameter and height of cylinder on the item entry.</p>
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 2 ? 'reading-active' : ''}`}>
              <div className="step-header">
                <span className="step-number">3 </span>
                <span className="step-label">In the <strong className="text-highlight">Key Entry Area</strong>, enter the coordinates for the position (origin).</span>
              </div>
              <div className="step-description">
                <div className="screenshot-wrapper">
                  <img src={keyEntry} alt="Key Entry" className="software-screensho" style={{ height: '60px' }} />
                </div>
              </div>
            </div>

            <div className="instruction-step">
              <div className="card-header"><h4>PREVIEW</h4></div>
              <div className="screenshot-wrapper mt-8">
                <img src={cylinderResult} alt="Cylinder Preview" className="software-screenshot" style={{ height: '500px' }} />
              </div>
            </div>

            <div className="lesson-navigation">
              <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button>
              <button className="nav-button next" onClick={handleNext}>Next<ChevronRight size={18} /></button>
            </div>
          </div>
        )}

        {activeTab === 'box' && (
          <div className={`lesson-card tab-content fade-in ${isSpeaking ? 'reading-active' : ''}`}>
            <div className="card-header">
              <h4>BOX</h4>
              <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(boxSteps)} onStop={stop} />
            </div>

            <div className={`instruction-step ${currentIndex === 0 ? 'reading-active' : ''}`}>
              <div className="step-header">
                <span className="step-number">1 </span>
                <span className="step-label">Select <strong className="red-text">Arrange Box</strong> from the icon menu.</span>
              </div>
              <div className="step-description">
                <div className="screenshot-wrapper">
                  <img src={arrangeBox} alt="Arrange Box icon" className="software-screenshot screenshot-medium" style={{ width: '550px', marginBottom: "-3rem" }} />
                </div>
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 1 ? 'reading-active' : ''}`}>
              <div className="step-header">
                <span className="step-number">2 </span>
                <span className="step-label">Specify the depth, width and height of the box on the item entry.</span>
              </div>
              <div className="step-description">
                <div className="screenshot-wrapper">
                  <img src={itemEntryBox} alt="Item Entry Box" className="software-screenshot screenshot-wide" style={{ width: '900px', height: '50px', marginBottom: "-3rem" }} />
                </div>
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 2 ? 'reading-active' : ''}`}>
              <div className="step-header">
                <span className="step-number">3 </span>
                <span className="step-label">In the Key Entry Area, enter the coordinates for the position (origin).</span>
              </div>
              <div className="step-description">
                <div className="screenshot-wrapper">
                  <img src={keyEntry} alt="Key Entry Box" className="software-screenshot screenshot-small" style={{ height: '60px' }} />
                </div>
              </div>
            </div>

            <div className="instruction-step">
              <div className="card-header"><h4>PREVIEW</h4></div>
              <div className="screenshot-wrapper mt-8">
                <img src={boxResult} alt="Box Preview" className="software-screenshot screenshot-large" style={{ width: '900px' }} />
              </div>
            </div>

            <div className="lesson-navigation">
              <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button>
              <button className="nav-button next" onClick={handleNext}>Next<ChevronRight size={18} /></button>
            </div>
          </div>
        )}

        {activeTab === 'polygon' && (
          <div className={`lesson-card tab-content fade-in ${isSpeaking ? 'reading-active' : ''}`}>
            <div className="card-header">
              <h4>POLYGON</h4>
              <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(polygonSteps)} onStop={stop} />
            </div>

            <div className={`instruction-step ${currentIndex === 0 ? 'reading-active' : ''}`}>
              <div className="step-header">
                <span className="step-number">1 </span>
                <span className="step-label">Select <strong className="red-text">Arrange Polygonal Prism</strong> from the icon menu.</span>
              </div>
              <div className="step-description">
                <div className="screenshot-wrapper">
                  <img src={arrangePolygon} alt="Arrange Polygon icon" className="software-screenshot screenshot-medium" style={{ width: '450px', marginBottom: "-3rem" }} />
                </div>
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 1 ? 'reading-active' : ''}`}>
              <div className="step-header">
                <span className="step-number">2 </span>
                <span className="step-label">Specify the number of sides, diameter (circumscribed) and height of the polygon on the item entry.</span>
              </div>
              <div className="step-description">
                <div className="screenshot-wrapper">
                  <img src={itemEntryPolygon} alt="Item Entry Polygon" className="software-screenshot screenshot-wide" style={{ width: '900px', height: '60px', marginBottom: "-3rem" }} />
                </div>
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 2 ? 'reading-active' : ''}`}>
              <div className="step-header">
                <span className="step-number">3 </span>
                <span className="step-label">In the Key Entry Area, enter the coordinates for the position (origin).</span>
              </div>
              <div className="step-description">
                <div className="screenshot-wrapper">
                  <img src={keyEntry} alt="Key Entry Polygon" className="software-screenshot screenshot-small" style={{ height: '60px' }} />
                </div>
              </div>
            </div>

            <div className="instruction-step">
              <div className="card-header"><h4>PREVIEW</h4></div>
              <div className="screenshot-wrapper mt-8">
                <img src={polygonResult} alt="Polygon Preview" className="software-screenshot screenshot-large" style={{ width: '900px' }} />
              </div>
            </div>

            <div className="lesson-navigation">
              <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button>
              <button className="nav-button next" onClick={handleNext}>Next <ChevronRight size={18} /></button>
            </div>
          </div>
        )}

        {activeTab === 'cone' && (
          <div className={`lesson-card tab-content fade-in ${isSpeaking ? 'reading-active' : ''}`}>
            <div className="card-header">
              <h4>CONE</h4>
              <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(coneSteps)} onStop={stop} />
            </div>

            <div className={`instruction-step ${currentIndex === 0 ? 'reading-active' : ''}`}>
              <div className="step-header">
                <span className="step-number">1 </span>
                <span className="step-label">Select <strong className="red-text">Arrange Cone</strong> from the icon menu.</span>
              </div>
              <div className="step-description">
                <div className="screenshot-wrapper">
                  <img src={arrangeCone} alt="Arrange Cone icon" className="software-screenshot screenshot-medium" style={{ width: '550px', marginBottom: "-3rem" }} />
                </div>
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 1 ? 'reading-active' : ''}`}>
              <div className="step-header">
                <span className="step-number">2 </span>
                <span className="step-label" style={{ marginTop: "2rem" }}>Specify the number of sides, base diameter (circumscribed), top face diameter (circumscribed) and height on the item entry.</span>
              </div>
              <div className="step-description">
                <div className="screenshot-wrapper">
                  <img src={itemEntryCone} alt="Item Entry Cone" className="software-screenshot screenshot-wide" style={{ width: '900px', height: '70px', marginBottom: "-3rem" }} />
                </div>
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 2 ? 'reading-active' : ''}`}>
              <div className="step-header">
                <span className="step-number">3 </span>
                <span className="step-label">On the Key Entry Area, enter the coordinates for the position (origin).</span>
              </div>
              <div className="step-description">
                <div className="screenshot-wrapper">
                  <img src={keyEntry} alt="Key Entry Cone" className="software-screenshot screenshot-small" style={{ height: '60px' }} />
                </div>
              </div>
            </div>

            <div className="instruction-step">
              <div className="card-header"><h4>PREVIEW</h4></div>
              <div className="screenshot-wrapper mt-8">
                <img src={coneResult} alt="Cone Preview" className="software-screenshot screenshot-large" style={{ width: '500px' }} />
              </div>
            </div>

            <div className="lesson-navigation">
              <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button>
              <button className="nav-button next" onClick={handleNext}>Next <ChevronRight size={18} /></button>
            </div>
          </div>
        )}

        {activeTab === 'torus' && (
          <div className={`lesson-card tab-content fade-in ${isSpeaking ? 'reading-active' : ''}`}>
            <div className="card-header">
              <h4>TORUS</h4>
              <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(torusSteps)} onStop={stop} />
            </div>

            <div className={`instruction-step ${currentIndex === 0 ? 'reading-active' : ''}`}>
              <div className="step-header">
                <span className="step-number">1 </span>
                <span className="step-label">Select <strong className="red-text">Arrange Torus</strong> from the icon menu.</span>
              </div>
              <div className="step-description">
                <div className="screenshot-wrapper">
                  <img src={arrangeTorus} alt="Arrange Torus icon" className="software-screenshot screenshot-medium" style={{ width: '550px', marginBottom: "-3rem" }} />
                </div>
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 1 ? 'reading-active' : ''}`}>
              <div className="step-header">
                <span className="step-number">2 </span>
                <span className="step-label">Specify the section diameter, path radius, and turn angle.</span>
              </div>
              <div className="step-description">
                <div className="screenshot-wrapper">
                  <img src={itemEntryTorus} alt="Item Entry Torus" className="software-screenshot screenshot-wide" style={{ width: '900px', marginBottom: "-3rem" }} />
                </div>
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 2 ? 'reading-active' : ''}`}>
              <div className="step-header">
                <span className="step-number">3 </span>
                <span className="step-label">In the Key Entry Area, enter the coordinates for the position (origin).</span>
              </div>
              <div className="step-description">
                <div className="screenshot-wrapper">
                  <img src={keyEntry} alt="Key Entry Torus" className="software-screenshot screenshot-small" style={{ height: '60px' }} />
                </div>
              </div>
            </div>

            <div className="instruction-step">
              <div className="card-header"><h4>PREVIEW</h4></div>
              <div className="screenshot-wrapper mt-8">
                <img src={torusResult} alt="Torus Preview" className="software-screenshot screenshot-large" style={{ width: '500px' }} />
              </div>
            </div>

            <div className="lesson-navigation">
              <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button>
              <button className="nav-button next" onClick={handleNext}>Next Lesson <ChevronRight size={18} /></button>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};

const BasicOperation2: React.FC<SubLessonProps> = ({ subLessonId, onNextLesson, onPrevLesson, nextLabel }) => {
  const [activeTab, setActiveTab] = useState<'move' | 'copy' | 'mirror' | 'rotate' | 'rotateCopy' | 'mirrorCopy' | 'delete'>(() => {
    return (localStorage.getItem(`${subLessonId}-tab`) as any) || 'move';
  });
  const { scrollProgress, containerRef, speak, stop, isSpeaking, currentIndex } = useLessonCore(`${subLessonId}-${activeTab}`);

  useEffect(() => {
    localStorage.setItem(`${subLessonId}-tab`, activeTab);
  }, [subLessonId, activeTab]);

  const moveSteps = [
    "Step 1: Select Move from the icon menu.",
    "Step 2: Left-click on the entity to be moved and click GO.",
    "Step 3: Specify the movement distance on the X, Y, and Z-axis on the item entry. Press Enter."
  ];

  const rotateSteps = [
    "Step 1: Select Rotate from the icon menu.",
    "Step 2: Left-click on the entity to be rotated and click GO.",
    "Step 3: Select 2-points to set the axis of rotation.",
    "Step 4: Specify the desired angle of rotation on the item entry and press Enter."
  ];

  const mirrorSteps = [
    "Step 1: Select Mirror from the icon menu.",
    "Step 2: Left-click on the entity to be mirrored and click GO.",
    "Step 3: Select 3-points to set the mirror plane or left-click on a face where the entity will be mirrored."
  ];

  const copySteps = [
    "Step 1: Select Copy from the icon menu.",
    "Step 2: Left-click on the entity to be copied and click GO.",
    "Step 3: Specify the distance on the X, Y and Z-axis and the number of copies needed then press Enter."
  ];

  const rotateCopySteps = [
    "Step 1: Same as rotate tool but makes a rotated duplicate of the entity."
  ];

  const mirrorCopySteps = [
    "Step 1: Same as mirror tool but makes a mirror duplicate of the entity."
  ];

  const deleteSteps = [
    "Step 1: Select Delete from the icon menu.",
    "Step 2: Left-click on the entity to delete."
  ];

  const tabs = [
    { id: 'move', label: 'Move' },
    { id: 'rotate', label: 'Rotate' },
    { id: 'mirror', label: 'Mirror' },
    { id: 'copy', label: 'Copy' },
    { id: 'rotateCopy', label: 'Rotate Copy' },
    { id: 'mirrorCopy', label: 'Mirror Copy' },
    { id: 'delete', label: 'Delete' }];

  const handleNext = () => {
    const i = tabs.findIndex(t => t.id === activeTab);
    if (i < tabs.length - 1) { setActiveTab(tabs[i + 1].id as any); } else if (onNextLesson) onNextLesson();
  };

  const handlePrev = () => {
    const i = tabs.findIndex(t => t.id === activeTab);
    if (i > 0) { setActiveTab(tabs[i - 1].id as any); } else if (onPrevLesson) onPrevLesson();
  };

  return (
    <div className={`course-lesson-container ${isSpeaking ? 'is-reading' : ''}`} ref={containerRef}>
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      <div className="lesson-tabs">
        {tabs.map(tab => (<button key={tab.id} className={`tab-button ${activeTab === tab.id ? 'active' : ''}`} onClick={() => setActiveTab(tab.id as any)}>{tab.label}</button>))}
      </div>

      <section className="lesson-intro">
        <h3 className="section-title">Move, Rotate, Copy, Mirror, Delete</h3>
        <p className="p-flush">Use these tools to reposition, duplicate, or remove entities from your workspace.</p>
        <div className="screenshot-wrapper mt-8">
          <img src={operationsMenu} alt="Operations Menu" className="software-screenshot screenshot-small" style={{ width: '180px' }} />
        </div>
      </section>

      <div className="lesson-grid single-card">
        {activeTab === 'move' && (
          <div className={`lesson-card tab-content fade-in ${isSpeaking ? 'reading-active' : ''}`}>
            <div className="card-header">
              <h4>MOVE</h4>
              <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(moveSteps)} onStop={stop} />
            </div>

            <div className={`instruction-step ${currentIndex === 0 ? 'reading-active' : ''}`}>
              <div className="step-header">
                <span className="step-number">1 </span>
                <span className="step-label">Select <strong className="red-text">Move</strong> from the icon menu.</span>
              </div>
              <div className="step-description">
                <div className="screenshot-wrapper">
                  <img src={moveMenu} alt="Move menu icon" className="software-screenshot screenshot-small" style={{ width: '190px', marginBottom: "-4rem" }} />
                </div>
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 1 ? 'reading-active' : ''}`} style={{ marginBottom: "-4rem" }}>
              <div className="step-header">
                <span className="step-number">2 </span>
                <span className="step-label" style={{ marginBottom: "1.5rem" }}>Left-click on the entity to be move &gt; GO
                  <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '40px', margin: '0 8px' }} />
                </span>
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 2 ? 'reading-active' : ''}`}>
              <div className="step-header">
                <span className="step-number">3 </span>
                <span className="step-label">Specify the distance on the <strong className="text-highlight">X, Y and Z-axis</strong> on the item entry &gt; Press Enter.</span>
              </div>
              <div className="step-description">
                <div className="screenshot-wrapper">
                  <img src={itemEntryMove} alt="Item Entry Move" className="software-screenshot screenshot-medium" style={{ width: '900px' }} />
                </div>
                <p className="p-flush mt-4 text-highlight">Or after step 2, select a point on the entity then left-click on the desired location.</p>
              </div>
            </div>

            <div className="instruction-step">
              <div className="card-header"><h4>RESULT</h4></div>
              <div className="screenshot-wrapper mt-8">
                <img src={moveResult} alt="Move Preview" className="software-screenshot screenshot-wide" />
              </div>
            </div>

            <div className="lesson-navigation">
              <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button>
              <button className="nav-button next" onClick={handleNext}>Next <ChevronRight size={18} /></button>
            </div>
          </div>
        )}

        {activeTab === 'rotate' && (
          <div className={`lesson-card tab-content fade-in ${isSpeaking ? 'reading-active' : ''}`}>
            <div className="card-header">
              <h4>ROTATE</h4>
              <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(rotateSteps)} onStop={stop} />
            </div>

            <div className={`instruction-step ${currentIndex === 0 ? 'reading-active' : ''}`}>
              <div className="step-header">
                <span className="step-number">1 </span>
                <span className="step-label">Select <strong className="red-text">Rotate</strong> from the icon menu.</span>
              </div>
              <div className="step-description">
                <div className="screenshot-wrapper">
                  <img src={rotateIcon} alt="Rotate icon" className="software-screenshot screenshot-small" style={{ width: '190px', marginBottom: "-4rem" }} />
                </div>
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 1 ? 'reading-active' : ''}`} style={{ marginBottom: "-4rem" }}>
              <div className="step-header">
                <span className="step-number">2 </span>
                <span className="step-label" style={{ marginBottom: "1.5rem" }}> Left-click on the entity to be rotate &gt; <strong className="text-highlight">GO</strong>
                  <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '40px', margin: '0 8px' }} />
                </span>
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 2 ? 'reading-active' : ''}`} style={{ marginBottom: "-3rem" }}>
              <div className="step-header">
                <span className="step-number">3 </span>
                <span className="step-label">Select 2-points to set the <strong className="text-highlight">axis of rotation</strong>.</span>
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 3 ? 'reading-active' : ''}`}>
              <div className="step-header">
                <span className="step-number">4 </span>
                <span className="step-label">Specify the desired <strong className="text-highlight">angle</strong> on the item entry &gt; Press Enter.</span>
              </div>

              <div className="step-description">
                <div className="screenshot-wrapper">
                  <img src={rotateEntry} alt="Rotate Item Entry" className="software-screenshot screenshot-medium" style={{ width: '900px' }} />
                </div>
              </div>
            </div>

            <div className="card-header"><h4>RESULT</h4></div>
            <div className="screenshot-wrapper mt-8">
              <img src={rotateAxis} alt="Axis of Rotation" className="software-screenshot screenshot-medium" style={{ width: '730px', marginBottom: "-3rem" }} />
            </div>

            <div className="lesson-navigation">
              <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button>
              <button className="nav-button next" onClick={handleNext}>Next <ChevronRight size={18} /></button>
            </div>
          </div>
        )}

        {activeTab === 'mirror' && (
          <div className={`lesson-card tab-content fade-in ${isSpeaking ? 'reading-active' : ''}`}>
            <div className="card-header">
              <h4>MIRROR</h4>
              <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(mirrorSteps)} onStop={stop} />
            </div>

            <div className={`instruction-step ${currentIndex === 0 ? 'reading-active' : ''}`}>
              <div className="step-header">
                <span className="step-number">1 </span>
                <span className="step-label">Select <strong className="red-text">Mirror</strong> from the icon menu.</span>
              </div>
              <div className="step-description">
                <div className="screenshot-wrapper">
                  <img src={mirrorIcon} alt="Mirror icon" className="software-screenshot screenshot-small" style={{ width: '190px', marginBottom: "-4rem" }} />
                </div>
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 1 ? 'reading-active' : ''}`} style={{ marginBottom: "-5rem" }}>
              <div className="step-header">
                <span className="step-number">2 </span>
                <span className="step-label" style={{ marginBottom: "1.5rem" }}>Left-click on the entity to be mirror &gt; <strong className="text-highlight">GO</strong>
                  <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '40px', margin: '0 8px' }} />
                </span>
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 2 ? 'reading-active' : ''}`}>
              <div className="step-header">
                <span className="step-number">3 </span>
                <span className="step-label" style={{ marginTop: "1.5rem" }}>Select 3-points to set the plane where the entity will be mirrored or left-click on the face where the entity will be mirrored.</span>
              </div>
            </div>

            <div className="instruction-step">
              <div className="card-header"><h4>RESULT</h4></div>
              <div className="screenshot-wrapper mt-8">
                <img src={mirrorResult} alt="Mirror Result" className="software-screenshot" style={{ width: '900px' }} />
              </div>
            </div>

            <div className="lesson-navigation">
              <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button>
              <button className="nav-button next" onClick={handleNext}>Next <ChevronRight size={18} /></button>
            </div>
          </div>
        )}

        {activeTab === 'copy' && (
          <div className={`lesson-card tab-content fade-in ${isSpeaking ? 'reading-active' : ''}`}>
            <div className="card-header">
              <h4>COPY</h4>
              <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(copySteps)} onStop={stop} />
            </div>

            <div className={`instruction-step ${currentIndex === 0 ? 'reading-active' : ''}`}>
              <div className="step-header">
                <span className="step-number">1 </span>
                <span className="step-label">Select <strong className="red-text">Copy</strong> from the icon menu.</span>
              </div>
              <div className="step-description">
                <div className="screenshot-wrapper">
                  <img src={copyIcon} alt="Copy icon" className="software-screenshot screenshot-small" style={{ width: '250px', marginBottom: "-3rem" }} />
                </div>
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 1 ? 'reading-active' : ''}`} style={{ marginBottom: "-3rem" }}>
              <div className="step-header">
                <span className="step-number">2 </span>
                <span className="step-label" style={{ marginTop: "-1.5rem" }}>Left-click on the entity to be copy &gt; <strong className="text-highlight">GO</strong>
                  <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '40px', margin: '0 8px' }} />
                </span>
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 2 ? 'reading-active' : ''}`}>
              <div className="step-header">
                <span className="step-number">3 </span>
                <span className="step-label">Specify the distance on the <strong className="text-highlight">X, Y and Z-axis</strong> and the <strong className="text-highlight">number of copies</strong> needed &gt; Press Enter.</span>
              </div>
              <div className="step-description">
                <div className="screenshot-wrapper">
                  <img src={copyDistance} alt="Copy Distance" className="software-screenshot screenshot-wide" style={{ width: '1000px', height: "100px" }} />
                </div>
              </div>
            </div>

            <div className="instruction-step">
              <div className="card-header"><h4>RESULT</h4></div>
              <div className="screenshot-wrapper mt-8">
                <img src={copyResult} alt="Copy Result" className="software-screenshot screenshot-large" style={{ maxWidth: '600px' }} />
              </div>
            </div>

            <div className="lesson-navigation">
              <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button>
              <button className="nav-button next" onClick={handleNext}>Next <ChevronRight size={18} /></button>
            </div>
          </div>
        )}

        {activeTab === 'rotateCopy' && (
          <div className={`lesson-card tab-content fade-in ${isSpeaking ? 'reading-active' : ''}`}>
            <div className="card-header">
              <h4>ROTATE COPY</h4>
              <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(rotateCopySteps)} onStop={stop} />
            </div>
            <p className='p-flush' style={{ marginTop: "-2rem" }}>Same as rotate tool but makes a rotated duplicate of the entity.</p>

            <div className="step-description">
              <div className="screenshot-wrapper">
                <img src={rotateCopyIcon} alt="Rotate Copy icon" className="software-screenshot screenshot-small" style={{ width: '250px' }} />
              </div>
            </div>


            <div className="instruction-step">
              <div className="card-header"><h4>RESULT</h4></div>
              <div className="screenshot-wrapper mt-8">
                <img src={rotateCopyAxis} alt="Rotate Copy Result" className="software-screenshot screenshot-large" style={{ width: '900px' }} />
              </div>
            </div>

            <div className="lesson-navigation">
              <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button>
              <button className="nav-button next" onClick={handleNext}>Next <ChevronRight size={18} /></button>
            </div>
          </div>
        )}

        {activeTab === 'mirrorCopy' && (
          <div className={`lesson-card tab-content fade-in ${isSpeaking ? 'reading-active' : ''}`}>
            <div className="card-header">
              <h4>MIRROR COPY</h4>
              <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(mirrorCopySteps)} onStop={stop} />
            </div>
            <p className='p-flush' style={{ marginTop: "-2rem" }}>Same as mirror tool but makes a mirror duplicate of the entity.</p>

            <div className="step-description">
              <div className="screenshot-wrapper">
                <img src={mirrorCopyIcon} alt="Mirror Copy icon" className="software-screenshot screenshot-small" style={{ width: '250px' }} />
              </div>
            </div>

            <div className="instruction-step">
              <div className="card-header"><h4>RESULT</h4></div>
              <div className="screenshot-wrapper mt-8">
                <img src={mirrorCopyResult} alt="Mirror Copy Preview" className="software-screenshot screenshot-large" style={{ width: '900px' }} />
              </div>
            </div>

            <div className="lesson-navigation">
              <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button>
              <button className="nav-button next" onClick={handleNext}>Next <ChevronRight size={18} /></button>
            </div>
          </div>
        )}

        {activeTab === 'delete' && (
          <div className={`lesson-card tab-content fade-in ${isSpeaking ? 'reading-active' : ''}`}>
            <div className="card-header">
              <h4>DELETE</h4>
              <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(deleteSteps)} onStop={stop} />
            </div>

            <div className={`instruction-step ${currentIndex === 0 ? 'reading-active' : ''}`} style={{ marginBottom: "-5rem" }}>
              <div className="step-header">
                <span className="step-number">1 </span>
                <span className="step-label">Select <strong className="red-text">Delete</strong> from the icon menu.</span>
              </div>
            </div>

            <div className="section-divider"></div>

            <div className={`instruction-step ${currentIndex === 1 ? 'reading-active' : ''}`}>
              <div className="step-header">
                <span className="step-number">2 </span>
                <span className="step-label">Left-click on the entity to delete.</span>
              </div>
              <div className="step-description">
                <div className="screenshot-wrapper">
                  <img src={deleteIcon} alt="Delete icon" className="software-screenshot screenshot-small" style={{ width: '300px' }} />
                </div>
              </div>
            </div>

            <div className="lesson-navigation">
              <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button>
              <button className="nav-button next" onClick={handleNext}>{nextLabel || 'Next'} <ChevronRight size={18} /></button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const BasicOperation3: React.FC<SubLessonProps> = ({ subLessonId, onNextLesson, onPrevLesson, nextLabel }) => {
  const [activeTab, setActiveTab] = useState<'sketch' | 'extrude' | 'revolve'>(() => {
    return (localStorage.getItem(`${subLessonId}-tab`) as any) || 'sketch';
  });
  const { scrollProgress, containerRef, speak, stop, isSpeaking, currentIndex } = useLessonCore(`${subLessonId}-${activeTab}`);

  useEffect(() => {
    localStorage.setItem(`${subLessonId}-tab`, activeTab);
  }, [subLessonId, activeTab]);

  const sketchSteps = [
    "Step 1: Sketch tools allow you to create lines, circles, and arcs in 3D space to form the base sections for your models."
  ];

  const extrudeSteps = [
    "Step 1: Select Extrude from the icon menu.",
    "Step 2: Select the perimeter of the sketch to be extruded and click GO. A hatch will appear.",
    "Step 3: Specify the height of the extrusion on the item entry or workspace.",
    "Step 4: Press ENTER to finalize."
  ];

  const revolveSteps = [
    "Step 1: Select Revolve from the icon menu.",
    "Step 2: Select the perimeter and click GO.",
    "Step 3: Select the axis of rotation and click GO to create the revolved solid."
  ];

  const tabs = [
    { id: 'sketch', label: 'SKETCH' },
    { id: 'extrude', label: 'EXTRUDE' },
    { id: 'revolve', label: 'REVOLVE' }
  ];

  const handleNext = () => {
    const i = tabs.findIndex(t => t.id === activeTab);
    if (i < tabs.length - 1) { setActiveTab(tabs[i + 1].id as any); } else if (onNextLesson) onNextLesson();
  };

  const handlePrev = () => {
    const i = tabs.findIndex(t => t.id === activeTab);
    if (i > 0) { setActiveTab(tabs[i - 1].id as any); } else if (onPrevLesson) onPrevLesson();
  };

  return (
    <div className={`course-lesson-container ${isSpeaking ? 'is-reading' : ''}`} ref={containerRef}>
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      <div className="lesson-tabs">
        {tabs.map(tab => (<button key={tab.id} className={`tab-button ${activeTab === tab.id ? 'active' : ''}`} onClick={() => setActiveTab(tab.id as any)}>{tab.label}</button>))}
      </div>

      <section className="lesson-intro">
        {activeTab === 'sketch' ? (
          <>
            <h3 className="section-title">Sketch</h3>
            <p className="p-flush">Tools use to create lines, circles and arcs in the 3D space for creating section forms for modeling.</p>
            <div className="screenshot-wrapper mt-8">
              <img src={sketchIntroImg} alt="Sketch Intro" className="software-screenshot screenshot-small" style={{ width: '280px' }} />
            </div>
          </>
        ) : (
          <>
            <h3 className="section-title">Extrude and Revolve</h3>
            <p className="p-flush">Tools use to create solids from sketch in the 3D space.</p>
            <div className="screenshot-wrapper mt-8">
              <img src={extrudeRevolveMenu} alt="Extrude and Revolve Intro" className="software-screenshot screenshot-small" style={{ width: '280px' }} />
            </div>
          </>
        )}
      </section>

      <div className="lesson-grid single-card">
        {activeTab === 'sketch' && (
          <div className={`lesson-card tab-content fade-in ${isSpeaking ? 'reading-active' : ''}`}>
            <div className="card-header card-sub-header">
              <h4>SKETCH</h4>
              <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(sketchSteps)} onStop={stop} />
            </div>
            <p className="p-flush" style={{ marginTop: "-2rem" }}> Tool used to create lines.</p>

            <div className="step-description">
              <div className="flex-row-center--wrap" style={{ gap: '2rem' }}>
                <div className="screenshot-wrapper">
                  <img src={sketchIcon} alt="Sketch Tool" className="software-screenshot screenshot-small" style={{ width: '280px' }} />
                </div>
              </div>
            </div>

            <div className="step-description" style={{ marginTop: "3rem" }}>
              <div className="screenshot-wrapper mt-4">
                <img src={sketchResultImg} alt="Sketch Result" className="software-screenshot" style={{ width: "600px" }} />
              </div>
            </div>

            <div className="lesson-navigation">
              <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button>
              <button className="nav-button next" onClick={handleNext}>Next <ChevronRight size={18} /></button>
            </div>
          </div>
        )}

        {activeTab === 'extrude' && (
          <div className={`lesson-card tab-content fade-in ${isSpeaking ? 'reading-active' : ''}`}>
            <div className="card-header card-sub-header">
              <h4>EXTRUDE</h4>
              <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(extrudeSteps)} onStop={stop} />
            </div>

            <div className={`instruction-step ${currentIndex === 0 ? 'reading-active' : ''}`}>
              <div className="step-header">
                <span className="step-number">1 </span>
                <span className="step-label">Select <strong className="red-text">Extrude</strong> from the icon menu.</span>
              </div>
              <div className="step-description" style={{ marginTop: "1rem" }}>
                <div className="mt-6" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                  <div className="screenshot-wrapper">
                    <img src={extrudeOneSide} alt="Extrusion One Side" className="software-screenshot screenshot-small" style={{ width: '100%', marginBottom: "1rem" }} />
                    <span style={{ marginLeft: "6rem", fontSize: "1.2rem" }}> EXTRUSION (ONE SIDE)</span>
                  </div>
                  <div className="screenshot-wrapper">
                    <img src={extrudeBothSide} alt="Extrude Both Side" className="software-screenshot screenshot-small" style={{ width: '100%', marginBottom: "1rem" }} />
                    <span style={{ marginLeft: "6rem", fontSize: "1.2rem" }}>EXTRUSION (BOTH SIDES)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 1 ? 'reading-active' : ''}`} style={{ marginBottom: "-2rem" }}>
              <div className="step-header">
                <span className="step-number">2 </span>
                <span className="step-label" style={{ marginTop: "-1.5rem" }}>Select the perimeter of the sketch to be extruded &gt; <strong className="text-highlight">GO</strong>
                  <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '40px', margin: '0 8px' }} />
                </span>
              </div>
              <p className="p-flush" style={{ marginLeft: "3rem", marginBottom: "-1rem", marginTop: "-1rem" }}>* A hatch will appear indicating the specified area to be extruded.</p>
            </div>

            <div className={`instruction-step ${currentIndex === 2 ? 'reading-active' : ''}`} style={{ marginBottom: "-2rem" }}>
              <div className="step-header">
                <span className="step-number">3 </span>
                <span className="step-label">Specify the height of the extrusion. Can also be set on the item entry.</span>
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 3 ? 'reading-active' : ''}`}>
              <div className="step-header">
                <span className="step-number">4 </span>
                <span className="step-label">Press ENTER</span>
              </div>

              <div className="section-divider" style={{ margin: "2rem" }}></div>

              <div className="instruction-step">
                <div className="card-header"><h4>PROCESS OVERVIEW</h4></div>
                <div className="flex-row-wrap mt-8" style={{ gap: '2rem' }}>
                  <img src={revolveP1} alt="Extrude Result" className="software-screenshot" style={{ width: "900px", marginTop: "2rem" }} />
                </div>
              </div>
            </div>

            <div className="lesson-navigation">
              <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button>
              <button className="nav-button next" onClick={handleNext}>Next <ChevronRight size={18} /></button>
            </div>
          </div>


        )}

        {activeTab === 'revolve' && (
          <div className={`lesson-card tab-content fade-in ${isSpeaking ? 'reading-active' : ''}`}>
            <div className="card-header card-sub-header">
              <h4>REVOLVE</h4>
              <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(revolveSteps)} onStop={stop} />
            </div>

            <div className={`instruction-step ${currentIndex === 0 ? 'reading-active' : ''}`}>
              <div className="step-header">
                <span className="step-number">1 </span>
                <span className="step-label">Select <strong className="red-text">Revolve</strong> from the icon menu.</span>
              </div>
              <div className="step-description">
                <div className="screenshot-wrapper mt-4" style={{ marginTop: "1rem" }}>
                  <img src={revolveIcon} alt="Revolve Icon" className="software-screenshot" style={{ width: '280px', marginBottom: "-3rem" }} />
                </div>
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 1 ? 'reading-active' : ''}`} style={{ marginBottom: "-2rem" }}>
              <div className="step-header" style={{ marginBottom: "2rem" }}>
                <span className="step-number">2 </span>
                <span className="step-label" style={{ marginTop: "-1.5rem" }}>Select the perimeter of the sketch to be revolve &gt; GO
                  <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '40px', margin: '0 8px' }} />
                </span>
              </div>


              <div className="step-header">
                <span className="step-number">3 </span>
                <span className="step-label" style={{ marginTop: "-1.5rem" }}>Select the axis of rotation (pick points or edge) &gt; GO
                  <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '40px', margin: '0 8px' }} />
                </span>
              </div>
              <p className="p-flush" style={{ marginLeft: "3rem", marginBottom: "-1rem", marginTop: "-1rem" }}>* A hatch will appear including the specified area to be revolved.</p>

              <div className="section-divider" style={{ margin: "2rem" }}></div>

              <div className="instruction-step">
                <div className="card-header"><h4>PROCESS OVERVIEW</h4></div>
                <div className="flex-row-wrap mt-8" style={{ gap: '2rem' }}>
                  <img src={revolveP2} alt="Revolve Result" className="software-screenshot" style={{ "width": "900px" }} />
                </div>
              </div>
            </div>


            <div className="lesson-navigation">
              <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button>
              <button className="nav-button next" onClick={handleNext}>{nextLabel || 'Next'} <ChevronRight size={18} /></button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/* ── Basic Operation (4): Show/Hide / Stretch / Resize ── */


const BasicOperation4: React.FC<SubLessonProps> = ({ subLessonId, onNextLesson, onPrevLesson, nextLabel }) => {
  const [activeTab, setActiveTab] = useState<'showHide' | 'stretch' | 'resize'>(() => {
    return (localStorage.getItem(`${subLessonId}-tab`) as any) || 'showHide';
  });
  const { scrollProgress, containerRef, speak, stop, isSpeaking, currentIndex } = useLessonCore(`${subLessonId}-${activeTab}`);

  useEffect(() => {
    localStorage.setItem(`${subLessonId}-tab`, activeTab);
  }, [subLessonId, activeTab]);

  const showHideSteps = [
    "Step 1: Select Show/Hide from the icon menu.",
    "Step 2: Select the specific entities you wish to display or hide and click GO.",
    "Step 3: You can also use 'Show/Hide Drafting Entity' to quickly toggle all dimensions and annotations."
  ];

  const stretchSteps = [
    "Step 1: Select Stretch from the menu.",
    "Step 2: Select the face you want to stretch and click GO.",
    "Step 3: Specify the desired additional length on the item entry or use the linear scale in 3D space."
  ];

  const resizeSteps = [
    "Step 1: Select Resize from the menu.",
    "Step 2: Select the entity you wish to resize and click GO.",
    "Step 3: Specify the scale factor on the item entry to scale the solid entity up or down."
  ];

  const tabs = [
    { id: 'showHide', label: 'Show/Hide' },
    { id: 'stretch', label: 'Stretch' },
    { id: 'resize', label: 'Resize' }];

  const handleNext = () => {
    const i = tabs.findIndex(t => t.id === activeTab);
    if (i < tabs.length - 1) { setActiveTab(tabs[i + 1].id as any); } else if (onNextLesson) onNextLesson();
  };

  const handlePrev = () => {
    const i = tabs.findIndex(t => t.id === activeTab);
    if (i > 0) { setActiveTab(tabs[i - 1].id as any); } else if (onPrevLesson) onPrevLesson();
  };

  return (
    <div className={`course-lesson-container ${isSpeaking ? 'is-reading' : ''}`} ref={containerRef}>
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      <div className="lesson-tabs">
        {tabs.map(tab => (<button key={tab.id} className={`tab-button ${activeTab === tab.id ? 'active' : ''}`} onClick={() => setActiveTab(tab.id as any)}>{tab.label}</button>))}
      </div>

      {activeTab === 'showHide' && (
        <section className="lesson-intro">
          <h3 className="section-title">Show / Hide </h3>
          <p className="p-flush">Tools use to switch between displaying and hiding entities.</p>
          <div className="screenshot-wrapper mt-8">
            <img src={showHideMenu} alt="Show/Hide Intro" className="software-screenshot screenshot-small" style={{ width: '192px' }} />
          </div>
        </section>
      )}

      {activeTab === 'stretch' && (
        <section className="lesson-intro">
          <h3 className="section-title">Stretch / Shape / Cut</h3>
          <div className="screenshot-wrapper mt-8">
            <img src={fairingChamferImg} alt="Stretch and Shape Intro" className="software-screenshot screenshot-small" style={{ width: '192px' }} />
          </div>
        </section>
      )}



      <div className="lesson-grid single-card">
        {activeTab === 'showHide' && (
          <div className={`lesson-card tab-content fade-in ${isSpeaking ? 'reading-active' : ''}`}>
            <div className="card-header">
              <h4>SHOW / HIDE ENTITY</h4>
              <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(showHideSteps)} onStop={stop} />
            </div>

            <div className={`instruction-step ${currentIndex === 0 ? 'reading-active' : ''}`} data-reading-index="0">
              <div className="step-header">
                <span className="step-number">1 </span>
                <span className="step-label">Select <strong className="red-text">Show/Hide</strong> from the icon menu.</span>
              </div>
              <div className="step-description">
                <div className="screenshot-wrapper">
                  <img src={showHideEntity} alt="Show/Hide Entity Icon" className="software-screenshot screenshot-small" style={{ width: '280px', marginBottom: "-5rem" }} />
                </div>
              </div>
            </div>

            <div className="section-divider"></div>

            <div className={`instruction-step ${currentIndex === 1 ? 'reading-active' : ''}`} data-reading-index="1">
              <div className="step-header">
                <span className="step-number">2 </span>
                <span className="step-label" style={{ marginBottom: "1.5rem" }}>Select the entities for showing/hiding &gt; GO
                  <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '40px', margin: '0 8px' }} />
                </span>
              </div>
            </div>

            <div className="card-header card-sub-header">
              <h4>SHOW/HIDE DRAFTING ENTITY</h4>
            </div>

            <div className={`instruction-step ${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
              <div className="step-header">
                <span className="step-number">1 </span>
                <span className="step-label">Select <strong className="red-text">Show/Hide Drafting Entity</strong> from the icon menu.</span>
              </div>
              <div className="step-description">
                <div className="screenshot-wrapper">
                  <img src={showHideDraftingEntity} alt="Show/Hide Drafting Entity Icon" className="software-screenshot screenshot-small" style={{ width: '280px', marginBottom: "-5rem" }} />
                </div>
              </div>
            </div>

            <div className="section-divider"></div>

            <div className={`instruction-step ${currentIndex === 3 ? 'reading-active' : ''}`} data-reading-index="3">
              <div className="step-header">
                <span className="step-number">2 </span>
                <span className="step-label">Right-click to show/hide all drafting entities. </span>
              </div>
              <p className="p-flush" style={{ marginLeft: "3rem", marginTop: "-1rem" }}>Drafting Entities include:</p>
              <div className="lesson-table-container" style={{ marginTop: "2rem", marginLeft: "3rem", maxWidth: "800px" }}>
                <table className="lesson-table">
                  <thead>
                    <tr>
                      <th>DIMENSIONS</th>
                      <th>NOTES</th>
                      <th>SYMBOLS</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Linear/Circular/Angular</td>
                      <td>Text</td>
                      <td>Arrow/Arrow View</td>
                    </tr>
                    <tr>
                      <td>Chamfer/Fillet</td>
                      <td>Part Notes</td>
                      <td>Cutting Lines</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>Welding</td>
                      <td>Machining/Finishing</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>Balloon</td>
                      <td>Hatch</td>
                    </tr>
                  </tbody>
                </table>
              </div>

            </div>

            <div className="section-divider"></div>

            <div className="card-header card-sub-header">
              <h4>HIDE UNSELECTED ENTITY</h4>
            </div>

            <div className={`instruction-step ${currentIndex === 4 ? 'reading-active' : ''}`} data-reading-index="4">
              <div className="step-header">
                <span className="step-number">1 </span>
                <span className="step-label">Select <strong className="red-text">Hide Unselected Entity</strong> from the icon menu.</span>
              </div>
              <div className="step-description">
                <div className="screenshot-wrapper">
                  <img src={hideUnselectedEntity} alt="Hide Unselected Entity Icon" className="software-screenshot screenshot-small" style={{ width: '280px', marginBottom: "-5rem" }} />
                </div>
              </div>
            </div>

            <div className="section-divider"></div>

            <div className={`instruction-step ${currentIndex === 5 ? 'reading-active' : ''}`} data-reading-index="5">
              <div className="step-header">
                <span className="step-number">2 </span>
                <span className="step-label" style={{ marginBottom: "1rem" }}>Select entities to retain &gt; <strong className="text-highlight">GO</strong>
                  <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '40px', margin: '0 8px' }} />
                </span>
              </div>
              <div className="step-description">
                <p className="p-flush" style={{ marginLeft: "3rem", marginTop: "-2rem" }}>All unselected entities will be hidden.</p>
                <div className="screenshot-wrapper" style={{ marginTop: "2rem" }}>
                  <img src={hideUnselectedEntity1} alt="Hide Unselected Entity Example" className="software-screenshot screenshot-medium" style={{ width: '900px' }} />
                </div>
              </div>
            </div>

            <div className="lesson-navigation">
              <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button>
              <button className="nav-button next" onClick={handleNext}>Next <ChevronRight size={18} /></button>
            </div>
          </div>
        )}

        {activeTab === 'stretch' && (
          <div className={`lesson-card tab-content fade-in ${isSpeaking ? 'reading-active' : ''}`}>
            <div className="card-header">
              <h4>STRETCH / SHAPE / CUT</h4>
              <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(stretchSteps)} onStop={stop} />
            </div>

            <div className={`instruction-step ${currentIndex === 0 ? 'reading-active' : ''}`} data-reading-index="0">
              <div className="step-header">
                <span className="step-number">1 </span>
                <span className="step-label">Select <strong className="red-text">Stretch</strong> from the icon menu.</span>
              </div>
              <div className="step-description">
                <div className="screenshot-wrapper">
                  <img src={stretchIcon} alt="Stretch Icon" className="software-screenshot screenshot-small" style={{ width: '280px', marginBottom: "-4rem" }} />
                </div>
              </div>
            </div>

            <div className="section-divider"></div>

            <div className={`instruction-step ${currentIndex === 1 ? 'reading-active' : ''}`} data-reading-index="1">
              <div className="step-header">
                <span className="step-number">2 </span>
                <span className="step-label" style={{ marginBottom: "1.5rem" }}>Select the face to be strecth &gt; GO
                  <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '40px', margin: '0 8px' }} />
                </span>
              </div>
            </div>


            <div className={`instruction-step ${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2" style={{ marginTop: "-4rem" }}>
              <div className="step-header">
                <span className="step-number">3 </span>
                <span className="step-label">Specify the desired length of the solid entity on the item entry.</span>
              </div>
              <div className="step-description">
                <p className="p-flush opacity-80 text-sm mb-4" style={{ marginLeft: "3rem", marginBottom: "2rem", marginTop: "-1rem" }}> Also works for circular surfaces.</p>
                <div className="screenshot-wrapper">
                  <img src={stretchItemEntry} alt="Stretch Item Entry" className="software-screenshot screenshot-wide" style={{ width: '900px' }} />
                </div>
                <div className="screenshot-wrapper mt-8">
                  <img src={stretchImg1} alt="Stretch Drag Example" className="software-screenshot screenshot-large" style={{ width: '900px', marginTop: "2rem" }} />
                </div>
              </div>
            </div>

            <div className="section-divider"></div>

            <div>
              <h4 className="text-highlight mb-4">OR</h4>
              <div className={`instruction-step ${currentIndex === 3 ? 'reading-active' : ''}`} data-reading-index="3">
                <div className="step-header">
                  <span className="step-label">Select face &gt; <strong className="text-highlight">GO  <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '40px', margin: '0 8px' }} /></strong> &gt; Left-click on 3D Space.</span>
                </div>
                <div className="step-description">
                  <p className="p-flush mt-4" style={{ marginTop: "-1rem" }}>A linear scale will appear on the 3D Space</p>
                  <p className="p-flush mt-4" style={{ marginBottom: "2rem" }}>Specify the additional length of stretch &gt; Press Enter or Left-Click on the scale. </p>
                  <div className="screenshot-wrapper mt-6">
                    <img src={stretchImg2} alt="Stretch Scale Example" className="software-screenshot screenshot-large" style={{ width: '900px' }} />
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

        {activeTab === 'resize' && (
          <div className={`lesson-card tab-content fade-in ${isSpeaking ? 'reading-active' : ''}`}>
            <div className="card-header">
              <h4>RESIZE</h4>
              <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(resizeSteps)} onStop={stop} />
            </div>

            <div className={`instruction-step ${currentIndex === 0 ? 'reading-active' : ''}`} data-reading-index="0">
              <div className="step-header">
                <span className="step-number">1 </span>
                <span className="step-label">Select <strong className="red-text">Resize</strong> from the icon menu.</span>
              </div>
              <div className="step-description">
                <div className="screenshot-wrapper">
                  <img src={resizeIcon} alt="Resize Icon" className="software-screenshot screenshot-small" style={{ width: '280px', marginBottom: "-4rem" }} />
                </div>
              </div>
            </div>

            <div className="section-divider"></div>

            <div className={`instruction-step ${currentIndex === 1 ? 'reading-active' : ''}`} data-reading-index="1">
              <div className="step-header">
                <span className="step-number">2 </span>
                <span className="step-label" style={{ marginBottom: "1.5rem" }}>Select the entity for resizing &gt; GO
                  <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '40px', margin: '0 8px' }} />
                </span>
              </div>
            </div>


            <div className={`instruction-step ${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2" style={{ marginTop: "-3rem" }}>
              <div className="step-header">
                <span className="step-number">3 </span>
                <span className="step-label" style={{ marginTop: "1.5rem" }}>Using resize allows the user to scale up or scale down the size of the solid entity. Specify the scale on the item entry &gt; Left-click on the 3D Space.</span>
              </div>
              <div className="step-description">
                <div className="flex-row-center--wrap mt-6" style={{ gap: '2rem' }}>
                  <div className="screenshot-wrapper">
                    <img src={resizeItemEntry} alt="Resize Item Entry" className="software-screenshot screenshot-small" style={{ width: '200px' }} />
                  </div>
                  <div className="screenshot-wrapper">
                    <img src={resize3_2} alt="Resize Scale Result" className="software-screenshot screenshot-large" style={{ width: '900px', marginTop: "2rem" }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="lesson-navigation">
              <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button>
              <button className="nav-button next" onClick={handleNext}>Next Lesson <ChevronRight size={18} /></button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}; /* ── Basic Operation (5): Shape Steels ── */

const BasicOperation5: React.FC<SubLessonProps> = ({ subLessonId, onNextLesson, onPrevLesson, nextLabel }) => {
  const [activeTab, setActiveTab] = useState<'shapeSteels'>(() => {
    return (localStorage.getItem(`${subLessonId}-tab`) as any) || 'shapeSteels';
  });
  const { scrollProgress, containerRef, speak, stop, isSpeaking, currentIndex } = useLessonCore(`${subLessonId}-${activeTab}`);

  useEffect(() => {
    localStorage.setItem(`${subLessonId}-tab`, activeTab);
  }, [subLessonId, activeTab]);

  const shapeSteelsSteps = [
    "Step 1: Select Arrange Machine Part from the icon menu.",
    "Step 2: In the window that appears, select the machine part or steel type and specify the dimensions, then click OK.",
    "Step 3: In the Key Entry Area, enter the coordinates for the position point or origin point."
  ];

  const tabs = [{ id: 'shapeSteels', label: 'Shape Steels' }];

  return (
    <div className={`course-lesson-container ${isSpeaking ? 'is-reading' : ''}`} ref={containerRef}>
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      <div className="lesson-tabs">
        {tabs.map(tab => (<button key={tab.id} className={`tab-button ${activeTab === tab.id ? 'active' : ''}`} onClick={() => setActiveTab(tab.id as any)}>{tab.label}</button>))}
      </div>

      <section className="lesson-intro">
        <h3 className="section-title">Creating Shape Steels</h3>
        <div className="screenshot-wrapper">
          <img src={shapeSteels1} alt="Shape Steels Overview" className="software-screenshot" style={{ height: '225px' }} />
        </div>
      </section>

      <div className="lesson-grid single-card">
        {activeTab === 'shapeSteels' && (
          <div className={`lesson-card tab-content fade-in ${isSpeaking ? 'reading-active' : ''}`}>
            <div className="card-header">
              <h4>Shape Steels Includes:</h4>
              <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(shapeSteelsSteps)} onStop={stop} />
            </div>

            <div className="instruction-step">
              <div className="step-description">
                <div className="screenshot-wrapper">
                  <img src={shapeSteelsTypes} alt="Shape Steels Options" className="software-screenshot" style={{ width: '900px' }} />
                </div>
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 0 ? 'reading-active' : ''}`}>
              <div className="step-header">
                <span className="step-number">1 </span>
                <span className="step-label">Select <strong className="red-text">Arrange Machine Part</strong> from the icon menu.</span>
              </div>
              <div className="step-description">
                <div className="screenshot-wrapper">
                  <img src={arrangeMachinePartMenu} alt="Arrange Machine Part Menu" className="software-screenshot screenshot-small" style={{ width: '14rem' }} />
                </div>
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 1 ? 'reading-active' : ''}`}>
              <div className="step-header">
                <span className="step-number">2 </span>
                <span className="step-label">The Arrange Machine Part window will appear. Select and provide the necessary specifications &gt; Press OK </span>
              </div>
              <div className="step-description">
                <div className="screenshot-wrapper">
                  <img src={arrangeMachinePartWindow} alt="Arrange Machine Part Window" className="software-screenshot" style={{ width: '900px', height: 'auto' }} />
                </div>
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 2 ? 'reading-active' : ''}`}>
              <div className="step-header">
                <span className="step-number">3 </span>
                <span className="step-label">In the Key Entry Area, enter the coordinates for the position (origin point).</span>
              </div>
              <div className="step-description">
                <div className="screenshot-wrapper" style={{ marginBottom: "2rem" }}>
                  <img src={keyEntryArea} alt="Key Entry Area" className="software-screenshot screenshot-small" style={{ height: '50px' }} />
                </div>
              </div>
            </div>

            <div className="instruction-step">
              <div className="card-header"><h4>RESULT</h4></div>
              <div className="flex-row-wrap mt-8" style={{ gap: '2rem' }}>
                <img src={shapeSteels2} alt="Shape Steels Result" className="software-screenshot screenshot-large" style={{ width: '900px', height: 'auto' }} />
              </div>
            </div>

            <div className="lesson-navigation">
              <button className="nav-button" onClick={onPrevLesson}><ChevronLeft size={18} /> Previous</button>
              <button className="nav-button next" onClick={onNextLesson}>{nextLabel || 'Next Lesson'} <ChevronRight size={18} /></button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
/* Main export  Erenders the correct sub-lesson based on subLessonId prop */

interface BasicOperationLessonProps { subLessonId: string; onNextLesson?: () => void; onPrevLesson?: () => void; nextLabel?: string; }

const BasicOperationLesson: React.FC<BasicOperationLessonProps> = ({ subLessonId, onNextLesson, onPrevLesson, nextLabel }) => {
  switch (subLessonId) {
    case 'basic-op-1':
      return <BasicOperation1 subLessonId={subLessonId} onNextLesson={onNextLesson} onPrevLesson={onPrevLesson} nextLabel={nextLabel} />;
    case 'basic-op-2':
      return <BasicOperation2 subLessonId={subLessonId} onNextLesson={onNextLesson} onPrevLesson={onPrevLesson} nextLabel={nextLabel} />;
    case 'basic-op-3':
      return <BasicOperation3 subLessonId={subLessonId} onNextLesson={onNextLesson} onPrevLesson={onPrevLesson} nextLabel={nextLabel} />;
    case 'basic-op-4':
      return <BasicOperation4 subLessonId={subLessonId} onNextLesson={onNextLesson} onPrevLesson={onPrevLesson} nextLabel={nextLabel} />;
    case 'basic-op-5':
      return <BasicOperation5 subLessonId={subLessonId} onNextLesson={onNextLesson} onPrevLesson={onPrevLesson} nextLabel={nextLabel} />;
    default:
      return <BasicOperation1 subLessonId={subLessonId} onNextLesson={onNextLesson} onPrevLesson={onPrevLesson} nextLabel={nextLabel} />;
  }
};

export { BasicOperation1, BasicOperation2, BasicOperation3, BasicOperation4, BasicOperation5, BasicOperationLesson };
export default BasicOperationLesson;
