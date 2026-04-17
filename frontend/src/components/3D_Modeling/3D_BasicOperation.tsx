

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

import extrudeRevolveMenu from '../../assets/3D_Image_File/basic_operation4_extrude_revolve.png';

import extrudeOneSide from '../../assets/3D_Image_File/basic_operation4_extrusion_oneside.png';
/* cspell:disable-line */

import extrudeBothSide from '../../assets/3D_Image_File/basic_operation4_extrusion_bothside.png';
/* cspell:disable-line */

import revolveIcon from '../../assets/3D_Image_File/basic_operation4_revolve.png';

import revolveP1 from '../../assets/3D_Image_File/basic_operation4_revolve_p1.png';

import showHideMenu from '../../assets/3D_Image_File/basic_operation4_show_hide.png';

import showHideEntity from '../../assets/3D_Image_File/basic_operation4_show_hide_entity.png';

import showHideDraftingEntity from '../../assets/3D_Image_File/basic_operation4_showhide_drafting_entity.png';
/* cspell:disable-line */

import hideUnselectedEntity from '../../assets/3D_Image_File/basic_operation4_hide_unselected_entity.png';

import hideUnselectedEntity1 from '../../assets/3D_Image_File/basic_operation4_hide_unselected_entity_1.png';

import draftingEntitiesTable from '../../assets/3D_Image_File/basic_operation4_drafting_entities.png';

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

interface SubLessonProps { onNextLesson?: () => void; onPrevLesson?: () => void; nextLabel?: string; }

const BasicOperation1: React.FC<SubLessonProps> = ({ onNextLesson, onPrevLesson, nextLabel }) => {
  const [activeTab, setActiveTab] = useState<'cylinder' | 'box' | 'polygon' | 'cone' | 'torus'>('cylinder');

  // Use core hook for scroll tracking and TTS
  const {
    scrollProgress,
    containerRef,
    speak,
    stop,
    isSpeaking,
    currentIndex
  } = useLessonCore(`basic-op-1-${activeTab}`);

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

  const getStepClass = (stepId: string) => "instruction-step";
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

    <div className="course-lesson-container" ref={containerRef}>
      {/* Sticky Progress Bar */}

      <div className="lesson-progress-container">

        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />

      </div>

      <div className="lesson-tabs">
        {tabs.map(tab => (<button key={tab.id} className={`tab-button ${activeTab === tab.id ? 'active' : ''}`} onClick={() => setActiveTab(tab.id as any)}>{tab.label}</button>
        ))}

      </div>

      <section className="lesson-intro">
        <h3 className="section-title" style={{ marginRight: '240px' }}>
          Creating basic shapes
        </h3>
        <p>When creating a 3D model, always start with the <strong>Front View</strong>.
        </p>

        <div style={{ width: '450px', height: 'auto' }}>

          <img src={threeDView} alt="3D View" className="software-screenshot screenshot-medium" />

        </div>

        <div className="instruction-box">

          <p>On the command menu: <strong>[Arrange Solid]</strong> &gt; <strong>[Select Y Orientation]</strong>
          </p>

          <div className="flex-row-center--wrap">

            <div>

              <img src={cmdMenu} alt="Command Menu" className="software-screenshot screenshot-small" style={{ width: '250px', height: 'auto' }} />

            </div>

          </div>

        </div>

      </section>

      <div className="lesson-grid single-card">
        {/* CYLINDER */}
        {activeTab === 'cylinder' && (

          <div className="lesson-card tab-content">

            <div
              className="card-header">
              <h4>CYLINDER</h4>
              <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(cylinderSteps)}
                onStop={stop}
              />
            </div>

            <div className={`${getStepClass('b1-1')} ${currentIndex === 0 ? 'reading-active' : ''}`}>

              <div className="step-header"> <span className="step-number">
                1 </span> <span className="step-label">Select <strong className="text-highlight">Arrange Cylinder</strong> from the icon menu.</span>

              </div>

              <div className="step-description" /* sanitized: paddingLeft: '2.5rem' */>

                <div>

                  <img src={arrangeCylinder} alt="Arrange Cylinder icon" className="software-screenshot screenshot-medium" style={{ width: '550px', height: 'auto' }} />

                </div>

              </div>

            </div>

            <div className={`${getStepClass('b1-2')} ${currentIndex === 1 ? 'reading-active' : ''}`}>

              <div className="step-header"> <span className="step-number">
                2 </span> <span className="step-label">On the bottom left corner, the <strong className="text-highlight">item entry</strong> can be located.</span>

              </div>

              <div className="step-description" /* sanitized: paddingLeft: '2.5rem' */>

                <div style={{ width: '950px', height: '' }}>

                  <img src={itemEntry} alt="Item Entry Cylinder" className="software-screenshot screenshot-wide" style={{ width: '850px', height: 'auto' }} />

                </div>

                <p className="text-caption">Specify the diameter and heigth of cylinder on the item entry.
                </p>

              </div>

            </div>

            <div className={`${getStepClass('b1-3')} ${currentIndex === 2 ? 'reading-active' : ''}`}>

              <div className="step-header"> <span className="step-number">
                3 </span> <span className="step-label">In the <strong className="text-highlight">Key Entry Area</strong>, enter the coordinates for the position (origin).</span>

              </div>

              <div className="step-description" /* sanitized: paddingLeft: '2.5rem' */>

                <div>

                  <img src={keyEntry} alt="Key Entry" className="software-screenshot screenshot-small" style={{ height: '60px' }} />

                </div>

              </div>

            </div>

            <div /* sanitized: marginTop: '1.5rem' */>

              <div className="card-header"><h4>PREVIEW</h4>
              </div>

              <div>

                <img src={cylinderResult} alt="Cylinder Preview" className="software-screenshot screenshot-large" style={{ height: '450px' }} />

              </div>

            </div>

            <div className="lesson-navigation"> <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button> <button className="nav-button next" onClick={handleNext}>Next Lesson <ChevronRight size={18} /></button>

            </div>

          </div>
        )}
        {/* BOX */}
        {activeTab === 'box' && (

          <div className="lesson-card tab-content">

            <div
              className="card-header">
              <h4>BOX</h4>
              <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(boxSteps)}
                onStop={stop}
              />
            </div>

            <div className={`${getStepClass('b1b-1')} ${currentIndex === 0 ? 'reading-active' : ''}`}>

              <div className="step-header"> <span className="step-number">
                1 </span> <span className="step-label">Select <strong className="text-highlight">Arrange Box</strong> from the icon menu.</span>

              </div>

              <div className="step-description" /* sanitized: paddingLeft: '2.5rem' */>

                <div>

                  <img src={arrangeBox} alt="Arrange Box icon" className="software-screenshot screenshot-medium" style={{ width: '550px', height: 'auto' }} />

                </div>

              </div>

            </div>

            <div className={`${getStepClass('b1b-2')} ${currentIndex === 1 ? 'reading-active' : ''}`}>

              <div className="step-header"> <span className="step-number">
                2 </span> <span className="step-label">Specify the <strong className="text-highlight">depth, width and height</strong> of the box on the item entry.</span>

              </div>

              <div className="step-description" /* sanitized: paddingLeft: '2.5rem' */>

                <div>

                  <img src={itemEntryBox} alt="Item Entry Box" className="software-screenshot screenshot-wide" style={{ width: '800px', height: 'auto' }} />

                </div>

              </div>

            </div>

            <div className={`${getStepClass('b1b-3')} ${currentIndex === 2 ? 'reading-active' : ''}`}>

              <div className="step-header"> <span className="step-number">
                3 </span> <span className="step-label">In the <strong className="text-highlight">Key Entry Area</strong>, enter the coordinates for the position (origin).</span>

              </div>

              <div className="step-description" /* sanitized: paddingLeft: '2.5rem' */>

                <div>

                  <img src={keyEntry} alt="Key Entry Box" className="software-screenshot screenshot-small" style={{ height: '60px' }} />

                </div>

              </div>

            </div>

            <div /* sanitized: marginTop: '1.5rem' */>

              <div className="card-header"><h4>PREVIEW</h4>
              </div>

              <div>

                <img src={boxResult} alt="Box Preview" className="software-screenshot screenshot-large" />

              </div>

            </div>

            <div className="lesson-navigation"> <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button> <button className="nav-button next" onClick={handleNext}>Next <ChevronRight size={18} /></button>

            </div>

          </div>
        )}
        {/* POLYGON */}
        {activeTab === 'polygon' && (

          <div className="lesson-card tab-content">

            <div
              className="card-header">
              <h4>POLYGON</h4>
              <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(polygonSteps)}
                onStop={stop}
              />
            </div>

            <div className={`${getStepClass('b1p-1')} ${currentIndex === 0 ? 'reading-active' : ''}`}>

              <div className="step-header"> <span className="step-number">
                1 </span> <span className="step-label">Select <strong className="text-highlight">Arrange Polygonal Prism</strong> from the icon menu.</span>

              </div>

              <div className="step-description" /* sanitized: paddingLeft: '2.5rem' */>

                <div>

                  <img src={arrangePolygon} alt="Arrange Polygon icon" className="software-screenshot screenshot-medium" style={{ width: '450px', height: 'auto' }} />

                </div>

              </div>

            </div>

            <div className={`${getStepClass('b1p-2')} ${currentIndex === 1 ? 'reading-active' : ''}`}>

              <div className="step-header"> <span className="step-number">
                2 </span> <span className="step-label">Specify the number of sides, diameter (circumscribed) and height of the polygon on the item entry.</span>

              </div>

              <div className="step-description" /* sanitized: paddingLeft: '2.5rem' */>

                <div>

                  <img src={itemEntryPolygon} alt="Item Entry Polygon" className="software-screenshot screenshot-wide" style={{ width: '800px', height: 'auto' }} />

                </div>

              </div>

            </div>

            <div className={`${getStepClass('b1p-3')} ${currentIndex === 2 ? 'reading-active' : ''}`}>

              <div className="step-header"> <span className="step-number">
                3 </span> <span className="step-label">In the <strong className="text-highlight">Key Entry Area</strong>, enter the coordinates for the position (origin).</span>

              </div>

              <div className="step-description" /* sanitized: paddingLeft: '2.5rem' */>

                <div>

                  <img src={keyEntry} alt="Key Entry Polygon" className="software-screenshot screenshot-small" style={{ height: '60px' }} />

                </div>

              </div>

            </div>

            <div /* sanitized: marginTop: '1.5rem' */>

              <div className="card-header"><h4>PREVIEW</h4>
              </div>

              <div>

                <img src={polygonResult} alt="Polygon Preview" className="software-screenshot screenshot-large" />

              </div>

            </div>

            <div className="lesson-navigation"> <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button> <button className="nav-button next" onClick={handleNext}>Next <ChevronRight size={18} /></button>

            </div>

          </div>
        )}
        {/* CONE */}
        {activeTab === 'cone' && (

          <div className="lesson-card tab-content">

            <div
              className="card-header">
              <h4>CONE</h4>
              <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(coneSteps)}
                onStop={stop}
              />
            </div>

            <div className={`${getStepClass('b1c-1')} ${currentIndex === 0 ? 'reading-active' : ''}`}>

              <div className="step-header"> <span className="step-number">
                1 </span> <span className="step-label">Select <strong className="text-highlight">Arrange Cone</strong> from the icon menu.</span>

              </div>

              <div className="step-description" /* sanitized: paddingLeft: '2.5rem' */>

                <div>

                  <img src={arrangeCone} alt="Arrange Cone icon" className="software-screenshot screenshot-medium" style={{ width: '550px', height: 'auto' }} />

                </div>

              </div>

            </div>

            <div className={`${getStepClass('b1c-2')} ${currentIndex === 1 ? 'reading-active' : ''}`}>

              <div className="step-header"> <span className="step-number">
                2 </span> <span className="step-label">Specify the number of sides, base diameter (circumscribed), top face diameter (circumscribed) and height on the item entry.</span>

              </div>

              <div className="step-description" /* sanitized: paddingLeft: '2.5rem' */>

                <div>

                  <img src={itemEntryCone} alt="Item Entry Cone" className="software-screenshot screenshot-wide" style={{ width: '850px', height: 'auto' }} />

                </div>

              </div>

            </div>

            <div className={`${getStepClass('b1c-3')} ${currentIndex === 2 ? 'reading-active' : ''}`}>

              <div className="step-header"> <span className="step-number">
                3 </span> <span className="step-label">On the <strong className="text-highlight">Key Entry Area</strong>, enter the coordinates for the position (origin).</span>

              </div>

              <div className="step-description" /* sanitized: paddingLeft: '2.5rem' */>

                <div>

                  <img src={keyEntry} alt="Key Entry" className="software-screenshot screenshot-small" style={{ height: '60px' }} />

                </div>

              </div>

            </div>

            <div /* sanitized: marginTop: '1.5rem' */>

              <div className="card-header"><h4>PREVIEW</h4>
              </div>

              <div>

                <img src={coneResult} alt="Cone Preview" className="software-screenshot screenshot-large" />

              </div>

            </div>

            <div className="lesson-navigation"> <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button> <button className="nav-button next" onClick={handleNext}>Next <ChevronRight size={18} /></button>

            </div>

          </div>
        )}
        {/* TORUS */}
        {activeTab === 'torus' && (

          <div className="lesson-card tab-content">

            <div
              className="card-header">
              <h4>TORUS</h4>
              <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(torusSteps)}
                onStop={stop}
              />
            </div>

            <div className={`${getStepClass('b1t-1')} ${currentIndex === 0 ? 'reading-active' : ''}`}>

              <div className="step-header"> <span className="step-number">
                1 </span> <span className="step-label">Select <strong className="text-highlight">Arrange Torus</strong> from the icon menu.</span>

              </div>

              <div className="step-description" /* sanitized: paddingLeft: '2.5rem' */>

                <div>

                  <img src={arrangeTorus} alt="Arrange Torus icon" className="software-screenshot screenshot-medium" style={{ width: '550px', height: 'auto' }} />

                </div>

              </div>

            </div>

            <div className={`${getStepClass('b1t-2')} ${currentIndex === 1 ? 'reading-active' : ''}`}>

              <div className="step-header"> <span className="step-number">
                2 </span> <span className="step-label">Specify the section diameter, path radius, and turn angle.</span>

              </div>

              <div className="step-description" /* sanitized: paddingLeft: '2.5rem' */>

                <div>

                  <img src={itemEntryTorus} alt="Item Entry Torus" className="software-screenshot screenshot-wide" style={{ width: '800px', height: 'auto' }} />

                </div>

              </div>

            </div>

            <div className={`${getStepClass('b1t-3')} ${currentIndex === 2 ? 'reading-active' : ''}`}>

              <div className="step-header"> <span className="step-number">
                3 </span> <span className="step-label">In the <strong className="text-highlight">Key Entry Area</strong>, enter the coordinates for the position (origin).</span>

              </div>

              <div className="step-description" /* sanitized: paddingLeft: '2.5rem' */>

                <div>

                  <img src={keyEntry} alt="Key Entry Torus" className="software-screenshot screenshot-small" style={{ height: '60px' }} />

                </div>

              </div>

            </div>

            <div /* sanitized: marginTop: '1.5rem' */>

              <div className="card-header"><h4>PREVIEW</h4>
              </div>

              <div>

                <img src={torusResult} alt="Torus Preview" className="software-screenshot screenshot-large" />

              </div>

            </div>

            <div className="lesson-navigation"> <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button> <button className="nav-button next" onClick={handleNext}>Next Lesson <ChevronRight size={18} /></button>

            </div>

          </div>
        )}

      </div>

    </div>
  );
}; /* ── Basic Operation (2): Move, Rotate, Copy, Mirror, Delete ── */

const BasicOperation2: React.FC<SubLessonProps> = ({ onNextLesson, onPrevLesson, nextLabel }) => {
  const [activeTab, setActiveTab] = useState<'move' | 'copy' | 'mirror' | 'rotate' | 'rotateCopy' | 'mirrorCopy' | 'delete'>('move');

  const {
    scrollProgress,
    containerRef,
    speak,
    stop,
    isSpeaking,
    currentIndex
  } = useLessonCore(`basic-op-2-${activeTab}`);

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

  const getStepClass = (stepId: string) => "instruction-step";
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

    <div className="course-lesson-container" ref={containerRef}>
      {/* Sticky Progress Bar */}

      <div className="lesson-progress-container">

        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />

      </div>

      <div className="lesson-tabs">
        {tabs.map(tab => (<button key={tab.id} className={`tab-button ${activeTab === tab.id ? 'active' : ''}`} onClick={() => setActiveTab(tab.id as any)}>{tab.label}</button>
        ))}

      </div>

      <section className="lesson-intro">
        <h3 className="section-title" style={{ marginRight: '200px' }}>Move, rotate, copy, mirror, delete</h3>

        <div className="instruction-box">

          <div>

            <img src={operationsMenu} alt="Operations Menu" className="software-screenshot screenshot-small" style={{ width: '200px', height: 'auto' }} />

          </div>

        </div>

      </section>

      <div className="lesson-grid single-card">
        {/* MOVE */}
        {activeTab === 'move' && (

          <div className="lesson-card tab-content">

            <div
              className="card-header">
              <h4>MOVE</h4>
              <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(moveSteps)}
                onStop={stop}
              />
            </div>

            <div className={`${getStepClass('b2m-1')} ${currentIndex === 0 ? 'reading-active' : ''}`}>

              <div className="step-header"> <span className="step-number">
                1 </span> <span className="step-label">Select <strong className="text-highlight">Move</strong> from the icon menu.</span>

              </div>

              <div className="step-description" /* sanitized: paddingLeft: '2.5rem' */>

                <div>

                  <img src={moveMenu} alt="Move menu icon" className="software-screenshot screenshot-small" style={{ width: '250px', height: 'auto' }} />

                </div>

              </div>

            </div>

            <div className={`${getStepClass('b2m-2')} ${currentIndex === 1 ? 'reading-active' : ''}`}>

              <div className="step-header"> <span className="step-number">
                2 </span> <span className="step-label">Left-click on the entity to be move &gt; <strong className="text-highlight">GO</strong>
                  <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '40px', verticalAlign: 'middle', margin: '0 4px' }} /></span>

              </div>

              <div className="step-description" /* sanitized: paddingLeft: '2.5rem' */>
              </div>

            </div>

            <div className={`${getStepClass('b2m-3')} ${currentIndex === 2 ? 'reading-active' : ''}`}>

              <div className="step-header"> <span className="step-number">
                3 </span> <span className="step-label">Specify the movement distance on the <strong className="text-highlight">X, Y, and Z-axis</strong> on the item entry. Press Enter.</span>

              </div>

              <div className="step-description" /* sanitized: paddingLeft: '2.5rem' */>

                <div>

                  <img src={itemEntryMove} alt="Item Entry Move" className="software-screenshot screenshot-wide" style={{ width: '850px', height: 'auto' }} />

                </div>

                <p className="step-label">Or after step 2, select a point on the entity then left-click on the desired location.
                </p>

              </div>

            </div>

            <div /* sanitized: marginTop: '1.5rem' */>

              <div className="card-header"><h4>RESULT</h4>
              </div>

              <div>

                <img src={moveResult} alt="Move Preview" className="software-screenshot screenshot-large" />

              </div>

            </div>

            <div className="lesson-navigation"> <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button> <button className="nav-button next" onClick={handleNext}>Next <ChevronRight size={18} /></button>

            </div>

          </div>
        )}
        {/* ROTATE */}
        {activeTab === 'rotate' && (

          <div className="lesson-card tab-content">

            <div
              className="card-header">
              <h4>ROTATE</h4>
              <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(rotateSteps)}
                onStop={stop}
              />
            </div>

            <div className={`${getStepClass('b2r-1')} ${currentIndex === 0 ? 'reading-active' : ''}`}>

              <div className="step-header"> <span className="step-number">
                1 </span> <span className="step-label">Select <strong className="text-highlight">Rotate</strong> from the icon menu.</span>

              </div>

              <div className="step-description" /* sanitized: paddingLeft: '2.5rem' */>

                <div>

                  <img src={rotateIcon} alt="Rotate icon" className="software-screenshot screenshot-small" style={{ width: '250px', height: 'auto' }} />

                </div>

              </div>

            </div>

            <div className={`${getStepClass('b2r-2')} ${currentIndex === 1 ? 'reading-active' : ''}`}>

              <div className="step-header"> <span className="step-number">
                2 </span> <span className="step-label">Left-click on the entity to be rotate &gt; <strong className="text-highlight">GO</strong>
                  <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '40px', verticalAlign: 'middle', margin: '0 4px' }} /></span>

              </div>

              <div className="step-description" /* sanitized: paddingLeft: '2.5rem' */>
              </div>

            </div>

            <div className={`${getStepClass('b2r-3')} ${currentIndex === 2 ? 'reading-active' : ''}`}>

              <div className="step-header"> <span className="step-number">
                3 </span> <span className="step-label">Select 2-points to set the axis of rotation.</span>

              </div>

              <div className="step-description" /* sanitized: paddingLeft: '2.5rem' */>

                <div>

                  <img src={rotateAxis} alt="Axis of Rotation" className="software-screenshot screenshot-medium" />

                </div>

              </div>

            </div>

            <div className={`${getStepClass('b2r-4')} ${currentIndex === 3 ? 'reading-active' : ''}`}>

              <div className="step-header"> <span className="step-number">
                4 </span> <span className="step-label">Specify the desired angle of rotation on the item entry &gt; Press Enter</span>

              </div>

              <div className="step-description" /* sanitized: paddingLeft: '2.5rem' */>

                <div>

                  <img src={rotateEntry} alt="Rotate Item Entry" className="software-screenshot screenshot-large" style={{ width: '530px', height: 'auto' }} />

                </div>

              </div>

            </div>

            <div className="lesson-navigation"> <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button> <button className="nav-button next" onClick={handleNext}>Next <ChevronRight size={18} /></button>

            </div>

          </div>
        )}
        {/* MIRROR */}
        {activeTab === 'mirror' && (

          <div className="lesson-card tab-content">

            <div
              className="card-header">
              <h4>MIRROR</h4>
              <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(mirrorSteps)}
                onStop={stop}
              />
            </div>

            <div className={`${getStepClass('b2mir-1')} ${currentIndex === 0 ? 'reading-active' : ''}`}>

              <div className="step-header"> <span className="step-number">
                1 </span> <span className="step-label">Select <strong className="text-highlight">Mirror</strong> from the icon menu.</span>

              </div>

              <div className="step-description" /* sanitized: paddingLeft: '2.5rem' */>

                <div>

                  <img src={mirrorIcon} alt="Mirror icon" className="software-screenshot screenshot-small" style={{ width: '250px', height: 'auto' }} />

                </div>

              </div>

            </div>

            <div className={`${getStepClass('b2mir-2')} ${currentIndex === 1 ? 'reading-active' : ''}`}>

              <div className="step-header"> <span className="step-number">
                2 </span> <span className="step-label">Left-click on the entity to be mirror &gt; <strong className="text-highlight">GO</strong>
                  <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '40px', verticalAlign: 'middle', margin: '0 4px' }} /></span>

              </div>

              <div className="step-description" /* sanitized: paddingLeft: '2.5rem' */>
              </div>

            </div>

            <div className={`${getStepClass('b2mir-3')} ${currentIndex === 2 ? 'reading-active' : ''}`}>

              <div className="step-header"> <span className="step-number">
                3 </span> <span className="step-label">Select 3-points to set the plane where the entity will be mirrored or left-click on the face where the entity will be mirrored.</span>

              </div>

            </div>

            <div /* sanitized: marginTop: '1.5rem' */>

              <div className="card-header"><h4>RESULT</h4>
              </div>

              <div>

                <img src={mirrorResult} alt="Mirror Result" className="software-screenshot screenshot-large" />

              </div>

            </div>

            <div className="lesson-navigation"> <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button> <button className="nav-button next" onClick={handleNext}>Next <ChevronRight size={18} /></button>

            </div>

          </div>
        )}
        {/* COPY */}
        {activeTab === 'copy' && (

          <div className="lesson-card tab-content">

            <div
              className="card-header">
              <h4>COPY COMPONENT</h4>
              <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(copySteps)}
                onStop={stop}
              />
            </div>

            <div className={`${getStepClass('b2c-1')} ${currentIndex === 0 ? 'reading-active' : ''}`}>

              <div className="step-header"> <span className="step-number">
                1 </span> <span className="step-label">Select <strong className="text-highlight">Copy</strong> from the icon menu.</span>

              </div>

              <div className="step-description" /* sanitized: paddingLeft: '2.5rem' */>

                <div>

                  <img src={copyIcon} alt="Copy icon" className="software-screenshot screenshot-small" style={{ width: '250px', height: 'auto' }} />

                </div>

              </div>

            </div>

            <div className={`${getStepClass('b2c-2')} ${currentIndex === 1 ? 'reading-active' : ''}`}>

              <div className="step-header"> <span className="step-number">
                2 </span> <span className="step-label">Left-click on the entity to be copy &gt; <strong className="text-highlight">GO</strong>
                  <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '40px', verticalAlign: 'middle', margin: '0 4px' }} /></span>

              </div>

              <div className="step-description" /* sanitized: paddingLeft: '2.5rem' */>
              </div>

            </div>

            <div className={`${getStepClass('b2c-3')} ${currentIndex === 2 ? 'reading-active' : ''}`}>

              <div className="step-header"> <span className="step-number">
                3 </span> <span className="step-label">Specify the distance on the <strong className="text-highlight">X, Y and Z-axis</strong> and the <strong className="text-highlight">number of copies</strong> needed &gt; Press Enter.</span>

              </div>

              <div className="step-description" /* sanitized: paddingLeft: '2.5rem' */>

                <div>

                  <img src={copyDistance} alt="Copy Distance" className="software-screenshot screenshot-wide" style={{ width: '900px', height: '110px' }} />

                </div>

              </div>

            </div>

            <div /* sanitized: marginTop: '1.5rem' */>

              <div className="card-header"><h4>RESULT</h4>
              </div>

              <div>

                <img src={copyResult} alt="Copy Result" className="software-screenshot screenshot-large" />

              </div>

            </div>

            <div className="lesson-navigation"> <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button> <button className="nav-button next" onClick={handleNext}>Next <ChevronRight size={18} /></button>

            </div>

          </div>
        )}
        {/* ROTATE COPY */}
        {activeTab === 'rotateCopy' && (

          <div className="lesson-card tab-content">

            <div
              className="card-header">
              <h4>ROTATE COPY</h4>
              <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(rotateCopySteps)}
                onStop={stop}
              />
            </div>

            <div className={`${getStepClass('b2rc-1')} ${currentIndex === 0 ? 'reading-active' : ''}`}>

              <div className="step-header"> <span className="step-number">
                1 </span> <span className="step-label">Same as rotate tool but makes a rotated duplicate of the entity.</span>

              </div>

              <div className="step-description" /* sanitized: paddingLeft: '2.5rem' */>

                <div>

                  <img src={rotateCopyIcon} alt="Rotate Copy icon" className="software-screenshot screenshot-small" style={{ width: '250px', height: 'auto' }} />

                </div>

              </div>

            </div>

            <div /* sanitized: marginTop: '1.5rem' */>

              <div className="card-header"><h4>RESULT</h4>
              </div>

              <div>

                <img src={rotateCopyAxis} alt="Rotate Copy Result" className="software-screenshot screenshot-large" />

              </div>

            </div>

            <div className="lesson-navigation"> <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button> <button className="nav-button next" onClick={handleNext}>Next <ChevronRight size={18} /></button>

            </div>

          </div>
        )}
        {/* MIRROR COPY */}
        {activeTab === 'mirrorCopy' && (

          <div className="lesson-card tab-content">

            <div
              className="card-header">
              <h4>MIRROR COPY</h4>
              <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(mirrorCopySteps)}
                onStop={stop}
              />
            </div>

            <div className={`${getStepClass('b2mc-1')} ${currentIndex === 0 ? 'reading-active' : ''}`}>

              <div className="step-header"> <span className="step-number">
                1 </span> <span className="step-label">Same as mirror tool but makes a mirror duplicate of the entity.</span>

              </div>

              <div className="step-description" /* sanitized: paddingLeft: '2.5rem' */>

                <div>

                  <img src={mirrorCopyIcon} alt="Mirror Copy icon" className="software-screenshot screenshot-small" style={{ width: '250px', height: 'auto' }} />

                </div>

              </div>

            </div>

            <div /* sanitized: marginTop: '1.5rem' */>

              <div className="card-header"><h4>RESULT</h4>
              </div>

              <div>

                <img src={mirrorCopyResult} alt="Mirror Copy Preview" className="software-screenshot screenshot-large" />

              </div>

            </div>

            <div className="lesson-navigation"> <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button> <button className="nav-button next" onClick={handleNext}>Next <ChevronRight size={18} /></button>

            </div>

          </div>
        )}
        {/* DELETE */}
        {activeTab === 'delete' && (

          <div className="lesson-card tab-content">

            <div
              className="card-header">
              <h4>DELETE</h4>
              <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(deleteSteps)}
                onStop={stop}
              />
            </div>

            <div className={`${getStepClass('b2d-1')} ${currentIndex === 0 ? 'reading-active' : ''}`}>

              <div className="step-header"> <span className="step-number">
                1 </span> <span className="step-label">Select <strong className="text-highlight">Delete</strong> from the icon menu.</span>

              </div>

              <div className={`${getStepClass('b2d-2')} ${currentIndex === 1 ? 'reading-active' : ''}`}>

                <div className="step-header"> <span className="step-number">
                  2 </span> <span className="step-label">Left-click on the entity to delete.</span>

                </div>

                <div className="step-description" /* sanitized: paddingLeft: '2.5rem' */>

                  <div >

                    <img src={deleteIcon} alt="Delete icon" className="software-screenshot screenshot-small" style={{ width: '300px', height: 'auto' }} />

                  </div>

                </div>

              </div>

            </div>

            <div className="lesson-navigation"> <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button> <button className="nav-button next" onClick={handleNext}>Next Lesson <ChevronRight size={18} /></button>

            </div>

          </div>
        )}

      </div>

    </div>
  );
}; /* ── Basic Operation (3): Sketch / Extrude / Revolve / Show-Hide / Stretch / Resize ── */

const BasicOperation3: React.FC<SubLessonProps> = ({ onNextLesson, onPrevLesson, nextLabel }) => {
  const [activeTab, setActiveTab] = useState<'sketchExtrude' | 'showHide' | 'stretch' | 'resize'>('sketchExtrude');

  const {
    scrollProgress,
    containerRef,
    speak,
    stop,
    isSpeaking,
    currentIndex
  } = useLessonCore(`basic-op-3-${activeTab}`);

  const sketchSteps = [
    "Step 1: Sketch tools allow you to create lines, circles, and arcs in 3D space to form the base sections for your models.",
    "Step 2: After sketching, use Extrude to create solids by specifying the height and perimeter.",
    "Step 3: Revolve allows you to create solids by rotating a sketch around a specified axis."
  ];

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

  const getStepClass = (stepId: string) => "instruction-step";
  const tabs = [
    { id: 'sketchExtrude', label: 'Sketch / Extrude / Revolve' },
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

    <div className="course-lesson-container" ref={containerRef}>
      {/* Sticky Progress Bar */}

      <div className="lesson-progress-container">

        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />

      </div>

      <div className="lesson-tabs">
        {tabs.map(tab => (<button key={tab.id} className={`tab-button ${activeTab === tab.id ? 'active' : ''}`} onClick={() => setActiveTab(tab.id as any)}>{tab.label}</button>
        ))}

      </div>

      <section className="lesson-intro">
        <h3 className="section-title">Sketch / Extrude / Revolve / Show-hide / Stretch / Resize</h3>

      </section>
      {activeTab === 'showHide' && (

        <div className="instruction-box">

          <div
            className="card-header">
            <h4>SHOW / HIDE</h4>
            <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(showHideSteps)}
              onStop={stop}
            />
          </div>

          <p>Tools use to switch between displaying and hiding entities.
          </p>

          <div className="flex-row-center--wrap">

            <div>

              <img src={showHideMenu} alt="Show/Hide Menu" className="software-screenshot screenshot-small" />

            </div>

          </div>

        </div>
      )}

      <div className="lesson-grid single-card">
        {/* SKETCH / EXTRUDE / REVOLVE */}
        {activeTab === 'sketchExtrude' && (

          <div className="lesson-card tab-content">

            <div
              className="card-header">
              <h4>SKETCH / EXTRUDE / REVOLVE</h4>
              <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(sketchSteps)}
                onStop={stop}
              />
            </div>

            <div>

              <img src={sketch1} alt="Sketch Overview" className="software-screenshot screenshot-small" style={{ width: '280px', height: 'auto' }} />

            </div>

            <div className={`${getStepClass('b3s-1')} ${currentIndex === 0 ? 'reading-active' : ''}`}>

              <div className="step-header"> <span className="step-number">
                1 </span> <span className="step-label">Tools use to create lines, circles and arcs in the 3D space for creating section forms for modeling.</span>

              </div>

              <div className="step-description" /* sanitized: paddingLeft: '2.rem' */>

                <div className="flex-row-wrap">

                  <div className="flex-row">

                    <div>

                      <img src={sketchIcon} alt="Sketch Tool" className="software-screenshot screenshot-small" style={{ width: '280px', height: 'auto' }} />

                    </div>

                  </div>

                  <div className="flex-col-right">

                    <div > <ArrowDown size={32} color="var(--primary-red)" strokeWidth={2.5} />

                    </div>

                  </div>

                </div>

              </div>

            </div>

            <div className="card-header card-sub-header"><h4>EXTRUDE/REVOLVE</h4>
            </div>

            <p > Tools use to create solids from sketch in the 3D space.
            </p>

            <div className="instruction-step">

              <div>

                <img src={extrudeRevolveMenu} alt="Extrude Revolve Menu" className="software-screenshot screenshot-small" style={{ width: '280px', height: 'auto' }} />

              </div>

            </div>
            {/* EXTRUDE */}

            <div className="section-divider">

              <div className="flex-row extrude-section-layout">

                <div className="flex-1">

                  <div className="card-header card-sub-header"><h4>EXTRUDE</h4>
                  </div>

                  <div className={`${getStepClass('b3e-1')} ${currentIndex === 1 ? 'reading-active' : ''}`}>

                    <div className="step-header"> <span className="step-number">
                      1 </span> <span className="step-label">Select Extrude from the icon menu.</span>

                    </div>

                    <div className="step-description" /* sanitized: paddingLeft: '2.5rem' */>

                      <div className="flex-row">

                        <div className="image-wrapper-flush">

                          <img src={extrudeOneSide} alt="Extrusion One Side" className="software-screenshot screenshot-small" style={{ width: '280px', height: 'auto' }} />

                        </div>
                        <br />
                        <br />
                        <div className="image-wrapper-flush">
                          <br />
                          <img src={extrudeBothSide} alt="Extrude Both Side" className="software-screenshot screenshot-small" style={{ width: '280px', height: 'auto' }} />

                        </div>

                      </div>

                    </div>

                  </div>

                  <div className={`${getStepClass('b3e-2')} ${currentIndex === 1 ? 'reading-active' : ''}`}>

                    <div className="step-header"> <span className="step-number">
                      2 </span> <span className="step-label">Select the perimeter of the sketch to be extrude &gt; GO</span>

                    </div>

                    <div className="step-description" /* sanitized: paddingLeft: '2.5rem' */>

                      <p className="p-flush">* A hatch will appear indicating the specified area to be extruded.
                      </p>

                    </div>

                  </div>

                  <div className={`${getStepClass('b3e-3')} ${currentIndex === 1 ? 'reading-active' : ''}`}>

                    <div className="step-header"> <span className="step-number">
                      3 </span> <span className="step-label">Specify the height of extrusion. Can also be set on the item entry.</span>

                    </div>

                  </div>

                  <div className={`${getStepClass('b3e-4')} ${currentIndex === 1 ? 'reading-active' : ''}`}>

                    <div className="step-header"> <span className="step-number">
                      4 </span> <span className="step-label">Press <strong className="text-highlight">ENTER</strong>.</span>

                    </div>

                  </div>

                </div>

                <div className="flex-col-start result-preview-box">

                  <div className="flex-col-center">

                    <div > <ArrowDown size={32} color="var(--primary-red)" strokeWidth={2.5} />

                    </div>

                  </div>

                </div>

              </div>

            </div>

            <div className="section-divider">

              <div className="card-header card-sub-header"><h4>REVOLVE</h4>
              </div>

              <div className="flex-row revolve-section-layout">

                <div className="flex-1">

                  <div className={`${getStepClass('b3r-1')} ${currentIndex === 2 ? 'reading-active' : ''}`}>

                    <div className="step-header"> <span className="step-number">
                      1 </span> <span className="step-label">Select <strong className="text-highlight">Revolve</strong> from the icon menu.</span>

                    </div>

                    <div className="step-description" /* sanitized: paddingLeft: '2.5rem' */>

                      <div>

                        <img src={revolveIcon} alt="Revolve Icon" className="software-screenshot screenshot-small" style={{ width: '280px', height: 'auto' }} />

                      </div>

                    </div>

                  </div>

                  <div className={`${getStepClass('b3r-2')} ${currentIndex === 2 ? 'reading-active' : ''}`}>

                    <div className="step-header"> <span className="step-number">
                      2 </span> <span className="step-label">Select the perimeter of the sketch to be revolve &gt; GO</span>

                    </div>

                    <div className="step-description" /* sanitized: paddingLeft: '2.5rem' */>

                    </div>

                  </div>

                  <div className={`${getStepClass('b3r-3')} ${currentIndex === 2 ? 'reading-active' : ''}`}>

                    <div className="step-header"> <span className="step-number">
                      3 </span> <span className="step-label">Select the axis of rotation (pick points or edge) &gt; GO</span>

                    </div>

                    <div className="step-description" /* sanitized: paddingLeft: '2.5rem' */>

                      <p className="p-flush">A hatch will appear indicating the specified area to be revolve.
                      </p>

                    </div>

                  </div>

                </div>

                <div className="flex-col-start result-preview-box">

                  <div>

                    <img src={revolveP1} alt="Revolve P1" className="software-screenshot screenshot-mmedium" />

                  </div>

                </div>

              </div>

            </div>

            <div className="lesson-navigation"> <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button> <button className="nav-button next" onClick={handleNext}>Next <ChevronRight size={18} /></button>

            </div>

          </div>
        )}
        {/* SHOW / HIDE */}
        {activeTab === 'showHide' && (

          <div className="lesson-card tab-content">

            <div
              className="card-header">
              <h4>SHOW / HIDE ENTITY</h4>
              <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(showHideSteps)}
                onStop={stop}
              />
            </div>

            <div className={getStepClass('b3sh-1')}>

              <div className="step-header"> <span className="step-number">
                1 </span> <span className="step-label">Select <strong className="text-highlight">Show/Hide</strong> from the icon menu.</span>

              </div>

              <div className="step-description" /* sanitized: paddingLeft: '2.5rem' */>

                <div >

                  <img src={showHideEntity} alt="Show/Hide Entity Icon" className="software-screenshot screenshot-icon--flush screenshot-small" style={{ width: '280px', height: 'auto' }} />

                </div>

              </div>

            </div>

            <div className={getStepClass('b3sh-2')}>

              <div className="step-header"> <span className="step-number">
                2 </span> <span className="step-label">Select the entities for showing/hiding &gt; GO</span>

              </div>

              <div className="card-header"><h4>SHOW/HIDE DRAFTING ENTITY</h4>

              </div>
              <div className={getStepClass('b3sh13')}>

                <div className="step-header"> <span className="step-number">
                  1 </span> <span className="step-label">Select <strong className="text-highlight">Show/Hide Drafting Entity</strong> from the icon menu.</span>

                </div>

                <div>

                  <img src={showHideDraftingEntity} alt="Show/Hide Drafting Entity Icon" className="software-screenshot screenshot-icon--flush screenshot-small" style={{ width: '280px', height: 'auto' }} />

                </div>

              </div>
              <div className={getStepClass('b3sh12')}>

                <div className="step-header"> <span className="step-number">
                  2 </span> <span className="step-label">Right-click to show/hide all drafting entities.</span>

                </div>

                <p className="text-caption">Drafting Entities includes:
                </p>

                <div className="step-description" /* sanitized: paddingLeft: '2.5rem' */>

                  <div>

                    <img src={draftingEntitiesTable} alt="Drafting Entities Diagram" className="software-screenshot screenshot-large img-mt-sm" />

                  </div>

                </div>

              </div>

              <div className="card-header"><h4>HIDE UNSELECTED ENTITY</h4>

              </div>

              <div className="step-description" /* sanitized: paddingLeft: '2.5rem' */>

                <div className="flex-row">

                  <div className="flex-1">

                    <div className="image-wrapper-">


                    </div>
                    <img src={hideUnselectedEntity} alt="Hide Unselected Entity Icon" className="software-screenshot screenshot-icon--flush" style={{ width: '280px', height: 'auto' }} />
                    <br />
                    <p className="step-label"> 1. Select Hide Unselected Entity From the icon menu.</p>
                    <span className="step-label">2. Select all entities to be retain GO

                      <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '40px', verticalAlign: 'middle', margin: '0 4px' }} />

                    </span>

                    <p className="step-label">All unselected entities will be hidden</p>
                    <div className="image-wrapper-">

                      <br />

                    </div>

                  </div>

                  <div className="flex-no-shrink">

                    <img src={hideUnselectedEntity1} alt="Hide Unselected Entity Example" className="software-screenshot screenshot-medium flex-no-shrink" />

                  </div>

                </div>

              </div>

            </div>

            <div className="lesson-navigation"> <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button> <button className="nav-button next" onClick={handleNext}>Next <ChevronRight size={18} /></button>

            </div>

          </div>
        )}
        {/* STRETCH */}
        {activeTab === 'stretch' && (

          <div className="lesson-card tab-content">

            <div
              className="card-header">
              <h4>STRETCH/SHAPE/CUT</h4>
              <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(stretchSteps)}
                onStop={stop}
              />
            </div>

            <div className={getStepClass('b3st-1')}>

              <div className="step-header"> <span className="step-number">
                1 </span> <span className="step-label">Select <strong className="text-highlight">Stretch</strong> from the menu.</span>

              </div>

              <div className="step-description" /* sanitized: paddingLeft: '2.5rem' */>

                <div>

                  <img src={stretchIcon} alt="Stretch Icon" className="software-screenshot screenshot-small" style={{ width: '280px', height: 'auto' }} />

                </div>

              </div>

            </div>

            <div className={getStepClass('b3st-2')}>

              <div className="step-header"> <span className="step-number">
                2 </span> <span className="step-label">Select the face to be stretch &gt; <strong className="text-highlight">GO</strong>
                  <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '40px', verticalAlign: 'middle', margin: '0 4px' }} /></span>


              </div>

              <div className="step-description" /* sanitized: paddingLeft: '2.5rem' */>

              </div>

            </div>

            <div className={getStepClass('b3st-3')}>

              <div className="step-header"> <span className="step-number">
                3 </span> <span className="step-label">Specify the desired length of the solid entity on the item entry.</span>

              </div>

              <p className="text-caption">Also works for circular surfaces.
              </p>

              <div className="step-description" /* sanitized: paddingLeft: '2.5rem' */>

                <div className="flex-row">

                  <div className="flex-1">

                    <div>

                      <img src={stretchItemEntry} alt="Stretch Item Entry" className="software-screenshot screenshot-wide" style={{ width: '800px', height: 'auto' }} />

                    </div>
                    <br />
                    <br />
                    <br />
                  </div>

                </div>

                <div className="flex-no-shrink">
                  <br />
                  <img src={stretchImg1} alt="Stretch Drag Example" className="software-screenshot screenshot-large" />

                </div>

              </div>

            </div>

            <div className="section-divider">
            </div>

            <div className="tool-block"> <h4 className=""></h4>

              <div className="tool-block" style={{ display: 'flex', alignItems: 'center' }}>
                <h4 className="section-title" style={{ marginRight: '16px' }}>Or</h4>
                {/* The rest of your content (the vertical line/input) goes here */}

              </div>
              <div className="instruction-step">

                <div className="step-header"> <span className="step-label">Select face &gt; <strong className="text-highlight">GO</strong>
                  <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '40px', verticalAlign: 'middle', margin: '0 4px' }} /> &gt; Left-click on the 3D Space.</span>

                </div>

                <div className="step-header"> <span className="step-label">A linear scale will appear on the 3D space. Specify the additional length of stretch &gt; Press Enter or Left-Click on the scale.</span>

                </div>

                <div>

                  <img src={stretchImg2} alt="Stretch Scale Example" className="software-screenshot screenshot-large" />

                </div>

              </div>

            </div>

            <div className="lesson-navigation"> <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button> <button className="nav-button next" onClick={handleNext}>Next <ChevronRight size={18} /></button>

            </div>

          </div>
        )}
        {/* RESIZE */}
        {activeTab === 'resize' && (

          <div className="lesson-card tab-content">

            <div
              className="card-header">
              <h4>RESIZE</h4>
              <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(resizeSteps)}
                onStop={stop}
              />
            </div>

            <div className={getStepClass('b3rez-1')}>

              <div className="step-header"> <span className="step-number">
                1 </span> <span className="step-label">Select <strong className="text-highlight">Resize</strong> from the menu.</span>

              </div>

              <div className="step-description" /* sanitized: paddingLeft: '2.5rem' */>

                <div>

                  <img src={resizeIcon} alt="Resize Icon" className="software-screenshot screenshot-small" style={{ width: '280px', height: 'auto' }} />

                </div>

              </div>

            </div>

            <div className={getStepClass('b3rez-2')}>

              <div className="step-header"> <span className="step-number">
                2 </span> <span className="step-label">Select the entity for resizing &gt; <strong className="text-highlight">GO</strong>
                  <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '40px', verticalAlign: 'middle', margin: '0 4px' }} /></span>

              </div>

              <div className="step-description" /* sanitized: paddingLeft: '2.5rem' */>

              </div>

            </div>

            <div className={getStepClass('b3rez-3')}>

              <div className="step-header"> <span className="step-number">
                3 </span> <span className="step-label">Using resize allows the user to scale up or scale down the size of the solid entity.</span>

              </div>

              <p className="text-caption">Specify the scale on the item entry &gt; Left-click on the 3D Space
              </p>

              <div className="step-description" /* sanitized: paddingLeft: '2.5rem' */>

                <div className="flex-row-center--wide">

                  <div>

                    <img src={resizeItemEntry} alt="Resize Item Entry" className="software-screenshot screenshot-small" style={{ width: '250px', height: 'auto' }} />

                  </div>
                  <br />
                  <br />
                  <br />
                  <div>
                    <img src={resize3_2} alt="Resize Scale Result" className="software-screenshot screenshot-large" />

                  </div>

                </div>

              </div>

            </div>

            <div className="lesson-navigation"> <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button> <button className="nav-button next" onClick={handleNext}>Next Lesson <ChevronRight size={18} /></button>

            </div>

          </div>
        )}

      </div>

    </div >
  );
}; /* ── Basic Operation (4): Arrange Machine Part / Shape Steels ── */

const BasicOperation4: React.FC<SubLessonProps> = ({ onNextLesson, onPrevLesson, nextLabel }) => {
  const [activeTab, setActiveTab] = useState<'shapeSteels'>('shapeSteels');

  const {
    scrollProgress,
    containerRef,
    speak,
    stop,
    isSpeaking,
    currentIndex
  } = useLessonCore(`basic-op-4-${activeTab}`);

  const shapeSteelsSteps = [
    "Step 1: Select Arrange Machine Part from the icon menu.",
    "Step 2: In the window that appears, select the machine part or steel type and specify the dimensions, then click OK.",
    "Step 3: In the Key Entry Area, enter the coordinates for the position point or origin point."
  ];

  const getStepClass = (stepId: string) => "instruction-step";
  const tabs = [{ id: 'shapeSteels', label: 'Shape Steels' }];

  return (

    <div className="course-lesson-container" ref={containerRef}>
      {/* Sticky Progress Bar */}

      <div className="lesson-progress-container">

        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />

      </div>

      <div className="lesson-tabs">
        {tabs.map(tab => (<button key={tab.id} className={`tab-button ${activeTab === tab.id ? 'active' : ''}`} onClick={() => setActiveTab(tab.id as any)}>{tab.label}</button>
        ))}

      </div>

      <div className="lesson-grid single-card">
        {activeTab === 'shapeSteels' && (

          <div className="lesson-card tab-content">

            <div
              className="card-header">
              <h4>CREATING SHAPE STEELS</h4>
              <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(shapeSteelsSteps)}
                onStop={stop}
              />
            </div>

            <div className="instruction-step">

              <div>

                <img src={shapeSteels1} alt="Shape Steels Overview" className="software-screenshot screenshot-medium" style={{ height: '225px' }} />

              </div>

              <p className="p-flush"><strong className="text-highlight">Shape Steels includes:</strong>
              </p>

              <div>

                <img src={shapeSteelsTypes} alt="Shape Steels Options" className="software-screenshot screenshot-wide" />

              </div>

            </div>

            <div className="section-divider">
            </div>

            <div className={`${getStepClass('b4ss-1')} ${currentIndex === 0 ? 'reading-active' : ''}`}>

              <div className="step-header"> <span className="step-number">
                1 </span> <span className="step-label">Select the <strong className="text-highlight">Arrange Machine Part</strong> from the icon menu.</span>

              </div>

              <div className="step-description" /* sanitized: paddingLeft: '2.5rem' */>

                <div>

                  <img src={arrangeMachinePartMenu} alt="Arrange Machine Part Menu" className="software-screenshot screenshot-small" style={{ height: '150px' }} />

                </div>

              </div>

            </div>

            <div className={`${getStepClass('b4ss-2')} ${currentIndex === 1 ? 'reading-active' : ''}`}>

              <div className="step-header"> <span className="step-number">
                2 </span> <span className="step-label">The Arrange Machine Part window will appear. Select and provide the necessary specifications &gt; Press OK</span>

              </div>

              <div className="step-description" /* sanitized: paddingLeft: '2.5rem' */>

                <div>

                  <img src={arrangeMachinePartWindow} alt="Arrange Machine Part Window" className="software-screenshot screenshot-wide" />

                </div>

              </div>

            </div>

            <div className={`${getStepClass('b4ss-3')} ${currentIndex === 2 ? 'reading-active' : ''}`}>

              <div className="step-header"> <span className="step-number">
                3 </span> <span className="step-label">in the Key Entry Area, enter the coordinates for the position (origin point)</span>

              </div>

              <div className="step-description" /* sanitized: paddingLeft: '2.5rem' */>

                <div className="flex-row-center--wrap">

                  <div className="flex-1">

                    <div>

                      <img src={keyEntryArea} alt="Key Entry Area" className="software-screenshot screenshot-small" style={{ height: '60px' }} />

                    </div>

                  </div>

                </div>

                <div>
                  <br />

                  <img src={shapeSteels2} alt="Shape Steels Result" className="software-screenshot screenshot-large" style={{ height: '450px' }} />

                </div>

              </div>

            </div>

            <div className="lesson-navigation"> <button className="nav-button" onClick={onPrevLesson}><ChevronLeft size={18} /> Previous</button> <button className="nav-button next" onClick={onNextLesson}>Next Lesson <ChevronRight size={18} /></button>

            </div>

          </div>
        )}

      </div>

    </div>
  );
};
/* Main export  Erenders the correct sub-lesson based on subLessonId prop */

interface BasicOperationLessonProps { subLessonId: string; onNextLesson?: () => void; onPrevLesson?: () => void; nextLabel?: string; }

const BasicOperationLesson: React.FC<BasicOperationLessonProps> = ({ subLessonId, onNextLesson, onPrevLesson, nextLabel
}) => {
  switch (subLessonId) {
    case 'basic-op-1':

      return <BasicOperation1 onNextLesson={onNextLesson} onPrevLesson={onPrevLesson} nextLabel={nextLabel} />; case 'basic-op-2':

      return <BasicOperation2 onNextLesson={onNextLesson} onPrevLesson={onPrevLesson} nextLabel={nextLabel} />; case 'basic-op-3':

      return <BasicOperation3 onNextLesson={onNextLesson} onPrevLesson={onPrevLesson} nextLabel={nextLabel} />; case 'basic-op-4':

      return <BasicOperation4 onNextLesson={onNextLesson} onPrevLesson={onPrevLesson} nextLabel={nextLabel} />; default:

      return <BasicOperation1 onNextLesson={onNextLesson} onPrevLesson={onPrevLesson} nextLabel={nextLabel} />;
  }
};

export default BasicOperationLesson; 
