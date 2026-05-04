

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
import { KaraokeLessonText } from '../KaraokeLessonText';
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

import sketchIcon from '../../assets/3D_Image_File/basic_operation4_sketch1.jpg';

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
  const { scrollProgress, containerRef, speak, stop, isSpeaking, currentIndex, currentCharIndex } = useLessonCore(`${subLessonId}-${activeTab}`);

  useEffect(() => {
    localStorage.setItem(`${subLessonId}-tab`, activeTab);
  }, [subLessonId, activeTab]);

  const commonIntroSteps = [
    "Creating Basic Shapes",
    "When creating a 3D model, always start with the Front View.",
    "On the command menu: Arrange Solid, then Select Y Orientation."
  ];

  const cylinderSteps = [
    ...commonIntroSteps,
    "CYLINDER",
    "Step 1: Select Arrange Cylinder from the icon menu.",
    "Step 2: On the bottom left corner, the item entry can be located. Specify the diameter and height of cylinder on the item entry.",
    "Step 3: In the Key Entry Area, enter the coordinates for the position (origin)."
  ];

  const boxSteps = [
    ...commonIntroSteps,
    "BOX",
    "Step 1: Select Arrange Box from the icon menu.",
    "Step 2: Specify the depth, width and height of the box on the item entry.",
    "Step 3: In the Key Entry Area, enter the coordinates for the position (origin)."
  ];

  const polygonSteps = [
    ...commonIntroSteps,
    "POLYGONAL PRISM",
    "Step 1: Select Arrange Polygonal Prism from the icon menu.",
    "Step 2: Specify the number of sides, diameter and height of the polygon on the item entry.",
    "Step 3: In the Key Entry Area, enter the coordinates for the position (origin)."
  ];

  const coneSteps = [
    ...commonIntroSteps,
    "CONE",
    "Step 1: Select Arrange Cone from the icon menu.",
    "Step 2: Specify the number of sides, base diameter, top face diameter and height on the item entry.",
    "Step 3: On the Key Entry Area, enter the coordinates for the position (origin)."
  ];

  const torusSteps = [
    ...commonIntroSteps,
    "TORUS",
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
    window.scrollTo({ top: 0, behavior: 'smooth' });

  };

  const handlePrev = () => {
    const i = tabs.findIndex(t => t.id === activeTab);
    if (i > 0) { setActiveTab(tabs[i - 1].id as any); } else if (onPrevLesson) onPrevLesson();
    window.scrollTo({ top: 0, behavior: 'smooth' });

  };

  return (
    <div className={`course-lesson-container`} ref={containerRef}>
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      <div className="lesson-tabs">
        {tabs.map(tab => (<button key={tab.id} className={`tab-button ${activeTab === tab.id ? 'active' : ''}`} onClick={() => setActiveTab(tab.id as any)}>{tab.label}</button>))}
      </div>

      <section className="lesson-intro">
        <div className="flex-row-center" style={{ justifyContent: 'space-between', marginBottom: '1rem' }}>
          <h3 className={`section-title ${currentIndex === 0 ? 'reading-active' : ''}`} data-reading-index="0" style={{ margin: 0 }}>
            <KaraokeLessonText
              as="span"
              text="Creating Basic Shapes"
              isActive={isSpeaking && currentIndex === 0}
              currentCharIndex={currentCharIndex}
            />
          </h3>
          <ReadAloudButton 
            isSpeaking={isSpeaking} 
            onStart={() => {
              const currentSteps = activeTab === 'cylinder' ? cylinderSteps : 
                                 activeTab === 'box' ? boxSteps : 
                                 activeTab === 'polygon' ? polygonSteps : 
                                 activeTab === 'cone' ? coneSteps : torusSteps;
              speak(currentSteps);
            }} 
            onStop={stop} 
          />
        </div>
        <div className={`instruction-step ${currentIndex === 1 ? 'reading-active' : ''}`} data-reading-index="1">
          <KaraokeLessonText
            text="When creating a 3D model, always start with the Front View."
            isActive={isSpeaking && currentIndex === 1}
            currentCharIndex={currentCharIndex}
          />
          <div className="screenshot-wrapper mt-8">
            <img src={threeDView} alt="3D View" className="software-screenshot" style={{ width: '350px' }} />
          </div>
        </div>
        <div className={`instruction-box mt-8 instruction-step ${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
          <KaraokeLessonText
            text="On the command menu: [Arrange Solid] > [Select Y Orientation]"
            isActive={isSpeaking && currentIndex === 2}
            currentCharIndex={currentCharIndex}
          />
          <div className="screenshot-wrapper">
            <img src={cmdMenu} alt="Command Menu" className="software-screenshot" style={{ width: '200px', marginTop: "1rem" }} />
          </div>
        </div>
      </section>

      <div className="lesson-grid single-card">
        {activeTab === 'cylinder' && (
          <div className="lesson-card tab-content fade-in">
            
             <div className="card-header">
                <h4 className={`section-title ${currentIndex === 3 ? 'reading-active' : ''}`} data-reading-index="3" style={{ margin: 0 }}>
                  <KaraokeLessonText
                    as="span"
                    text="CYLINDER"
                    isActive={isSpeaking && currentIndex === 3}
                    currentCharIndex={currentCharIndex}
                  />
                </h4>
              </div>

            <div className={`instruction-step ${currentIndex === 4 ? 'reading-active' : ''}`} data-reading-index="4">
              <div className="step-header">
                <span className="step-number">1 </span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text="Select Arrange Cylinder from the icon menu."
                  isActive={isSpeaking && currentIndex === 4}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <div className="screenshot-wrapper">
                  <img src={arrangeCylinder} alt="Arrange Cylinder icon" className="software-screenshot" style={{ width: '550px', marginBottom: "-3rem" }} />
                </div>
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 5 ? 'reading-active' : ''}`} data-reading-index="5">
              <div className="step-header">
                <span className="step-number">2 </span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text="On the bottom left corner, the item entry can be located."
                  isActive={isSpeaking && currentIndex === 5}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <div className="screenshot-wrapper">
                  <img src={itemEntry} alt="Item Entry Cylinder" className="software-screenshot" style={{ width: '850px', marginTop: "-1rem" }} />
                </div>
                <KaraokeLessonText
                  className="p-flush mt-4 text-highlight"
                  style={{ marginBottom: "-2rem" }}
                  text="Specify the diameter and height of cylinder on the item entry."
                  isActive={isSpeaking && currentIndex === 5}
                  currentCharIndex={currentCharIndex}
                />
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 6 ? 'reading-active' : ''}`} data-reading-index="6">
              <div className="step-header">
                <span className="step-number">3 </span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text="In the Key Entry Area, enter the coordinates for the position (origin)."
                  isActive={isSpeaking && currentIndex === 6}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <div className="screenshot-wrapper">
                  <img src={keyEntry} alt="Key Entry" className="software-screensho" style={{ height: '60px' }} />
                </div>
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 6 ? 'reading-active' : ''}`} data-reading-index="6">
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
          <div className="lesson-card tab-content fade-in">
            <div className={`instruction-step ${currentIndex === 3 ? 'reading-active' : ''}`} data-reading-index="3">
              <div className="card-header">
                <h4 style={{ margin: 0 }}>
                  <KaraokeLessonText
                    as="span"
                    text="BOX"
                    isActive={isSpeaking && currentIndex === 3}
                    currentCharIndex={currentCharIndex}
                  />
                </h4>
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 4 ? 'reading-active' : ''}`} data-reading-index="4">
              <div className="step-header">
                <span className="step-number">1 </span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text="Select Arrange Box from the icon menu."
                  isActive={isSpeaking && currentIndex === 4}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <div className="screenshot-wrapper">
                  <img src={arrangeBox} alt="Arrange Box icon" className="software-screenshot screenshot-medium" style={{ width: '550px', marginBottom: "-3rem" }} />
                </div>
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 5 ? 'reading-active' : ''}`} data-reading-index="5">
              <div className="step-header">
                <span className="step-number">2 </span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text="Specify the depth, width and height of the box on the item entry."
                  isActive={isSpeaking && currentIndex === 5}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <div className="screenshot-wrapper">
                  <img src={itemEntryBox} alt="Item Entry Box" className="software-screenshot screenshot-wide" style={{ width: '900px', height: '50px', marginBottom: "-3rem" }} />
                </div>
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 6 ? 'reading-active' : ''}`} data-reading-index="6">
              <div className="step-header">
                <span className="step-number">3 </span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text="In the Key Entry Area, enter the coordinates for the position (origin)."
                  isActive={isSpeaking && currentIndex === 6}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <div className="screenshot-wrapper">
                  <img src={keyEntry} alt="Key Entry Box" className="software-screenshot screenshot-small" style={{ height: '60px' }} />
                </div>
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 6 ? 'reading-active' : ''}`} data-reading-index="6">
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
          <div className="lesson-card tab-content fade-in">
            <div className={`instruction-step ${currentIndex === 3 ? 'reading-active' : ''}`} data-reading-index="3">
              <div className="card-header">
                <h4 style={{ margin: 0 }}>
                  <KaraokeLessonText
                    as="span"
                    text="POLYGON"
                    isActive={isSpeaking && currentIndex === 3}
                    currentCharIndex={currentCharIndex}
                  />
                </h4>
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 4 ? 'reading-active' : ''}`} data-reading-index="4">
              <div className="step-header">
                <span className="step-number">1 </span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text="Select Arrange Polygonal Prism from the icon menu."
                  isActive={isSpeaking && currentIndex === 4}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <div className="screenshot-wrapper">
                  <img src={arrangePolygon} alt="Arrange Polygon icon" className="software-screenshot screenshot-medium" style={{ width: '450px', marginBottom: "-3rem" }} />
                </div>
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 5 ? 'reading-active' : ''}`} data-reading-index="5">
              <div className="step-header">
                <span className="step-number">2 </span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text="Specify the number of sides, diameter (circumscribed) and height of the polygon on the item entry."
                  isActive={isSpeaking && currentIndex === 5}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <div className="screenshot-wrapper">
                  <img src={itemEntryPolygon} alt="Item Entry Polygon" className="software-screenshot screenshot-wide" style={{ width: '900px', height: '60px', marginBottom: "-3rem" }} />
                </div>
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 6 ? 'reading-active' : ''}`} data-reading-index="6">
              <div className="step-header">
                <span className="step-number">3 </span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text="In the Key Entry Area, enter the coordinates for the position (origin)."
                  isActive={isSpeaking && currentIndex === 6}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <div className="screenshot-wrapper">
                  <img src={keyEntry} alt="Key Entry Polygon" className="software-screenshot screenshot-small" style={{ height: '60px' }} />
                </div>
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 6 ? 'reading-active' : ''}`} data-reading-index="6">
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
          <div className="lesson-card tab-content fade-in">
            <div className={`instruction-step ${currentIndex === 3 ? 'reading-active' : ''}`} data-reading-index="3">
              <div className="card-header">
                <h4 style={{ margin: 0 }}>
                  <KaraokeLessonText
                    as="span"
                    text="CONE"
                    isActive={isSpeaking && currentIndex === 3}
                    currentCharIndex={currentCharIndex}
                  />
                </h4>
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 4 ? 'reading-active' : ''}`} data-reading-index="4">
              <div className="step-header">
                <span className="step-number">1 </span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text="Select Arrange Cone from the icon menu."
                  isActive={isSpeaking && currentIndex === 4}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <div className="screenshot-wrapper">
                  <img src={arrangeCone} alt="Arrange Cone icon" className="software-screenshot screenshot-medium" style={{ width: '550px', marginBottom: "-3rem" }} />
                </div>
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 5 ? 'reading-active' : ''}`} data-reading-index="5">
              <div className="step-header">
                <span className="step-number">2 </span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  style={{ marginTop: "2rem" }}
                  text="Specify the number of sides, base diameter (circumscribed), top face diameter (circumscribed) and height on the item entry."
                  isActive={isSpeaking && currentIndex === 5}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <div className="screenshot-wrapper">
                  <img src={itemEntryCone} alt="Item Entry Cone" className="software-screenshot screenshot-wide" style={{ width: '900px', height: '70px', marginBottom: "-3rem" }} />
                </div>
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 6 ? 'reading-active' : ''}`} data-reading-index="6">
              <div className="step-header">
                <span className="step-number">3 </span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text="On the Key Entry Area, enter the coordinates for the position (origin)."
                  isActive={isSpeaking && currentIndex === 6}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <div className="screenshot-wrapper">
                  <img src={keyEntry} alt="Key Entry Cone" className="software-screenshot screenshot-small" style={{ height: '60px' }} />
                </div>
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 6 ? 'reading-active' : ''}`} data-reading-index="6">
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
          <div className="lesson-card tab-content fade-in">
            <div className={`instruction-step ${currentIndex === 3 ? 'reading-active' : ''}`} data-reading-index="3">
              <div className="card-header">
                <h4 style={{ margin: 0 }}>
                  <KaraokeLessonText
                    as="span"
                    text="TORUS"
                    isActive={isSpeaking && currentIndex === 3}
                    currentCharIndex={currentCharIndex}
                  />
                </h4>
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 4 ? 'reading-active' : ''}`} data-reading-index="4">
              <div className="step-header">
                <span className="step-number">1 </span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text="Select Arrange Torus from the icon menu."
                  isActive={isSpeaking && currentIndex === 4}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <div className="screenshot-wrapper">
                  <img src={arrangeTorus} alt="Arrange Torus icon" className="software-screenshot screenshot-medium" style={{ width: '550px', marginBottom: "-3rem" }} />
                </div>
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 5 ? 'reading-active' : ''}`} data-reading-index="5">
              <div className="step-header">
                <span className="step-number">2 </span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text="Specify the section diameter, path radius, and turn angle."
                  isActive={isSpeaking && currentIndex === 5}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <div className="screenshot-wrapper">
                  <img src={itemEntryTorus} alt="Item Entry Torus" className="software-screenshot screenshot-wide" style={{ width: '900px', marginBottom: "-3rem" }} />
                </div>
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 6 ? 'reading-active' : ''}`} data-reading-index="6">
              <div className="step-header">
                <span className="step-number">3 </span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text="In the Key Entry Area, enter the coordinates for the position (origin)."
                  isActive={isSpeaking && currentIndex === 6}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <div className="screenshot-wrapper">
                  <img src={keyEntry} alt="Key Entry Torus" className="software-screenshot screenshot-small" style={{ height: '60px' }} />
                </div>
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 6 ? 'reading-active' : ''}`} data-reading-index="6">
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
  const { scrollProgress, containerRef, speak, stop, isSpeaking, currentIndex, currentCharIndex } = useLessonCore(`${subLessonId}-${activeTab}`);

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
    window.scrollTo({ top: 0, behavior: 'smooth' });

  };

  const handlePrev = () => {
    const i = tabs.findIndex(t => t.id === activeTab);
    if (i > 0) { setActiveTab(tabs[i - 1].id as any); } else if (onPrevLesson) onPrevLesson();
    window.scrollTo({ top: 0, behavior: 'smooth' });

  };

  return (
    <div className={`course-lesson-container`} ref={containerRef}>
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      <div className="lesson-tabs">
        {tabs.map(tab => (<button key={tab.id} className={`tab-button ${activeTab === tab.id ? 'active' : ''}`} onClick={() => setActiveTab(tab.id as any)}>{tab.label}</button>))}
      </div>

      <section className="lesson-intro">
        <h3 className={`section-title ${currentIndex === 0 ? "reading-active" : ""}`} data-reading-index="0">
          <KaraokeLessonText
            as="span"
            text="Move, Rotate, Copy, Mirror, Delete"
            isActive={isSpeaking && currentIndex === 0}
            currentCharIndex={currentCharIndex}
          />
          <ReadAloudButton isSpeaking={isSpeaking} onStart={() => {
            const introTitle = "Move, Rotate, Copy, Mirror, Delete";
            const introDesc = "Use these tools to reposition, duplicate, or remove entities from your workspace.";
            const currentSteps = activeTab === 'move' ? moveSteps :
                               activeTab === 'rotate' ? rotateSteps :
                               activeTab === 'mirror' ? mirrorSteps :
                               activeTab === 'copy' ? copySteps :
                               activeTab === 'rotateCopy' ? rotateCopySteps :
                               activeTab === 'mirrorCopy' ? mirrorCopySteps : deleteSteps;
            speak([introTitle, introDesc, ...currentSteps]);
          }} onStop={stop} />
        </h3>
        <KaraokeLessonText
          className={`lesson-subtitle ${currentIndex === 1 ? "reading-active" : ""}`}
          data-reading-index="1"
          text="Use these tools to reposition, duplicate, or remove entities from your workspace."
          isActive={isSpeaking && currentIndex === 1}
          currentCharIndex={currentCharIndex}
        />
        <div className="screenshot-wrapper mt-8">
          <img src={operationsMenu} alt="Operations Menu" className="software-screenshot screenshot-small" style={{ width: '180px' }} />
        </div>
      </section>

      <div className="lesson-grid single-card">
        {activeTab === 'move' && (
          <div className="lesson-card tab-content fade-in">
            <div className="card-header">
              <h4>MOVE</h4>
            </div>

            <div className={`instruction-step ${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
              <div className="step-header">
                <span className="step-number">1 </span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text="Select Move from the icon menu."
                  isActive={isSpeaking && currentIndex === 2}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <div className="screenshot-wrapper">
                  <img src={moveMenu} alt="Move menu icon" className="software-screenshot screenshot-small" style={{ width: '190px', marginBottom: "-4rem" }} />
                </div>
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 3 ? 'reading-active' : ''}`} data-reading-index="3" style={{ marginBottom: "-4rem" }}>
              <div className="step-header">
                <span className="step-number">2 </span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  style={{ marginBottom: "1.5rem" }}
                  text="Left-click on the entity to be moved then click GO."
                  isActive={isSpeaking && currentIndex === 3}
                  currentCharIndex={currentCharIndex}
                />
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 4 ? 'reading-active' : ''}`} data-reading-index="4">
              <div className="step-header">
                <span className="step-number">3 </span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text="Specify the movement distance on the X, Y and Z-axis on the item entry then Press Enter."
                  isActive={isSpeaking && currentIndex === 4}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <div className="screenshot-wrapper">
                  <img src={itemEntryMove} alt="Item Entry Move" className="software-screenshot screenshot-medium" style={{ width: '900px' }} />
                </div>
                <KaraokeLessonText
                  className="p-flush mt-4 text-highlight"
                  text="Or after step 2, select a point on the entity then left-click on the desired location."
                  isActive={isSpeaking && currentIndex === 4}
                  currentCharIndex={currentCharIndex}
                />
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 4 ? 'reading-active' : ''}`} data-reading-index="4">
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
          <div className="lesson-card tab-content fade-in">
            <div className="card-header">
              <h4>ROTATE</h4>
            </div>

            <div className={`instruction-step ${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
              <div className="step-header">
                <span className="step-number">1 </span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text="Select Rotate from the icon menu."
                  isActive={isSpeaking && currentIndex === 2}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <div className="screenshot-wrapper">
                  <img src={rotateIcon} alt="Rotate icon" className="software-screenshot screenshot-small" style={{ width: '190px', marginBottom: "-4rem" }} />
                </div>
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 3 ? 'reading-active' : ''}`} data-reading-index="3" style={{ marginBottom: "-4rem" }}>
              <div className="step-header">
                <span className="step-number">2 </span>
                <div className="step-label" style={{ marginBottom: "1.5rem" }}>
                  <KaraokeLessonText
                    as="span"
                    text="Left-click on the entity to be rotated and click GO."
                    isActive={isSpeaking && currentIndex === 3}
                    currentCharIndex={currentCharIndex}
                  />
                  <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '40px', margin: '0 8px' }} />
                </div>
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 4 ? 'reading-active' : ''}`} data-reading-index="4" style={{ marginBottom: "-3rem" }}>
              <div className="step-header">
                <span className="step-number">3 </span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text="Select 2-points to set the axis of rotation."
                  isActive={isSpeaking && currentIndex === 4}
                  currentCharIndex={currentCharIndex}
                />
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 5 ? 'reading-active' : ''}`} data-reading-index="5">
              <div className="step-header">
                <span className="step-number">4 </span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text="Specify the desired angle of rotation on the item entry and press Enter."
                  isActive={isSpeaking && currentIndex === 5}
                  currentCharIndex={currentCharIndex}
                />
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
          <div className="lesson-card tab-content fade-in">
            <div className="card-header">
              <h4>MIRROR</h4>
            </div>

            <div className={`instruction-step ${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
              <div className="step-header">
                <span className="step-number">1 </span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text="Select Mirror from the icon menu."
                  isActive={isSpeaking && currentIndex === 2}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <div className="screenshot-wrapper">
                  <img src={mirrorIcon} alt="Mirror icon" className="software-screenshot screenshot-small" style={{ width: '190px', marginBottom: "-4rem" }} />
                </div>
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 3 ? 'reading-active' : ''}`} data-reading-index="3" style={{ marginBottom: "-5rem" }}>
              <div className="step-header">
                <span className="step-number">2 </span>
                <div className="step-label" style={{ marginBottom: "1.5rem" }}>
                  <KaraokeLessonText
                    as="span"
                    text="Left-click on the entity to be mirrored and click GO."
                    isActive={isSpeaking && currentIndex === 3}
                    currentCharIndex={currentCharIndex}
                  />
                  <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '40px', margin: '0 8px' }} />
                </div>
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 4 ? 'reading-active' : ''}`} data-reading-index="4">
              <div className="step-header">
                <span className="step-number">3 </span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  style={{ marginTop: "1.5rem" }}
                  text="Select 3-points to set the mirror plane or left-click on a face where the entity will be mirrored."
                  isActive={isSpeaking && currentIndex === 4}
                  currentCharIndex={currentCharIndex}
                />
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 5 ? 'reading-active' : ''}`} data-reading-index="5">
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
          <div className="lesson-card tab-content fade-in">
            <div className="card-header">
              <h4>COPY</h4>
            </div>

            <div className={`instruction-step ${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
              <div className="step-header">
                <span className="step-number">1 </span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text="Select Copy from the icon menu."
                  isActive={isSpeaking && currentIndex === 2}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <div className="screenshot-wrapper">
                  <img src={copyIcon} alt="Copy icon" className="software-screenshot screenshot-small" style={{ width: '250px', marginBottom: "-3rem" }} />
                </div>
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 3 ? 'reading-active' : ''}`} data-reading-index="3" style={{ marginBottom: "-3rem" }}>
              <div className="step-header">
                <span className="step-number">2 </span>
                <div className="step-label" style={{ marginTop: "-1.5rem" }}>
                  <KaraokeLessonText
                    as="span"
                    text="Left-click on the entity to be copied and click GO."
                    isActive={isSpeaking && currentIndex === 3}
                    currentCharIndex={currentCharIndex}
                  />
                  <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '40px', margin: '0 8px' }} />
                </div>
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 4 ? 'reading-active' : ''}`} data-reading-index="4">
              <div className="step-header">
                <span className="step-number">3 </span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text="Specify the distance on the X, Y and Z-axis and the number of copies needed then press Enter."
                  isActive={isSpeaking && currentIndex === 4}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <div className="screenshot-wrapper">
                  <img src={copyDistance} alt="Copy Distance" className="software-screenshot screenshot-wide" style={{ width: '1000px', height: "100px" }} />
                </div>
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 4 ? 'reading-active' : ''}`} data-reading-index="4">
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
          <div className="lesson-card tab-content fade-in">
            <div className="card-header">
              <h4>ROTATE COPY</h4>
            </div>
            <p className={`p-flush ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2" style={{ marginTop: "-2rem" }}>Same as rotate tool but makes a rotated duplicate of the entity.</p>

            <div className="step-description">
              <div className="screenshot-wrapper">
                <img src={rotateCopyIcon} alt="Rotate Copy icon" className="software-screenshot screenshot-small" style={{ width: '250px' }} />
              </div>
            </div>


            <div className={`instruction-step ${currentIndex === 4 ? 'reading-active' : ''}`} data-reading-index="4">
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
          <div className="lesson-card tab-content fade-in">
            <div className="card-header">
              <h4>MIRROR COPY</h4>
            </div>
            <p className={`p-flush ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2" style={{ marginTop: "-2rem" }}>Same as mirror tool but makes a mirror duplicate of the entity.</p>

            <div className="step-description">
              <div className="screenshot-wrapper">
                <img src={mirrorCopyIcon} alt="Mirror Copy icon" className="software-screenshot screenshot-small" style={{ width: '250px' }} />
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 5 ? 'reading-active' : ''}`} data-reading-index="5">
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
          <div className="lesson-card tab-content fade-in">
            <div className="card-header">
              <h4>DELETE</h4>
            </div>

            <div className={`instruction-step ${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2" style={{ marginBottom: "-5rem" }}>
              <div className="step-header">
                <span className="step-number">1 </span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text="Select Delete from the icon menu."
                  isActive={isSpeaking && currentIndex === 2}
                  currentCharIndex={currentCharIndex}
                />
              </div>
            </div>

            <div className="section-divider"></div>

            <div className={`instruction-step ${currentIndex === 3 ? 'reading-active' : ''}`} data-reading-index="3">
              <div className="step-header">
                <span className="step-number">2 </span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text="Left-click on the entity to delete."
                  isActive={isSpeaking && currentIndex === 3}
                  currentCharIndex={currentCharIndex}
                />
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
  const { scrollProgress, containerRef, speak, stop, isSpeaking, currentIndex, currentCharIndex } = useLessonCore(`${subLessonId}-${activeTab}`);

  useEffect(() => {
    localStorage.setItem(`${subLessonId}-tab`, activeTab);
  }, [subLessonId, activeTab]);

  const sketchSteps = [
    "SKETCH",
    "Sketch tools allow you to create lines, circles, and arcs in 3D space to form the base sections for your models."
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
    window.scrollTo({ top: 0, behavior: 'smooth' });

  };

  const handlePrev = () => {
    const i = tabs.findIndex(t => t.id === activeTab);
    if (i > 0) { setActiveTab(tabs[i - 1].id as any); } else if (onPrevLesson) onPrevLesson();
    window.scrollTo({ top: 0, behavior: 'smooth' });

  };

  return (
    <div className={`course-lesson-container`} ref={containerRef}>
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      <div className="lesson-tabs">
        {tabs.map(tab => (<button key={tab.id} className={`tab-button ${activeTab === tab.id ? 'active' : ''}`} onClick={() => setActiveTab(tab.id as any)}>{tab.label}</button>))}
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
              <ReadAloudButton isSpeaking={isSpeaking} onStart={() => {
                const introTitle = "Sketch";
                const introDesc = "Tools use to create lines, circles and arcs in the 3D space for creating section forms for modeling.";
                speak([introTitle, introDesc, ...sketchSteps]);
              }} onStop={stop} />
            </h3>
            <KaraokeLessonText
              className={`lesson-subtitle ${currentIndex === 1 ? "reading-active" : ""}`}
              data-reading-index="1"
              text="Tools use to create lines, circles and arcs in the 3D space for creating section forms for modeling."
              isActive={isSpeaking && currentIndex === 1}
              currentCharIndex={currentCharIndex}
            />
            <div className="screenshot-wrapper mt-8">
              <img src={sketchIntroImg} alt="Sketch Intro" className="software-screenshot screenshot-small" style={{ width: '280px' }} />
            </div>
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
              <ReadAloudButton isSpeaking={isSpeaking} onStart={() => {
                const introTitle = "Extrude and Revolve";
                const introDesc = "Tools use to create solids from sketch in the 3D space.";
                const steps = activeTab === 'extrude' ? extrudeSteps : revolveSteps;
                speak([introTitle, introDesc, ...steps]);
              }} onStop={stop} />
            </h3>
            <KaraokeLessonText
              className={`lesson-subtitle ${currentIndex === 1 ? "reading-active" : ""}`}
              data-reading-index="1"
              text="Tools use to create solids from sketch in the 3D space."
              isActive={isSpeaking && currentIndex === 1}
              currentCharIndex={currentCharIndex}
            />
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
              text="Tool used to create lines."
              isActive={isSpeaking && currentIndex === 3}
              currentCharIndex={currentCharIndex}
            />

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
            </div>

            <div className={`instruction-step ${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
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

            <div className={`instruction-step ${currentIndex === 3 ? 'reading-active' : ''}`} data-reading-index="3" style={{ marginBottom: "-2rem" }}>
              <div className="step-header">
                <span className="step-number">2 </span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  style={{ marginTop: "-1.5rem" }}
                  text="Select the perimeter of the sketch to be extruded and click GO. A hatch will appear."
                  isActive={isSpeaking && currentIndex === 3}
                  currentCharIndex={currentCharIndex}
                />
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 4 ? 'reading-active' : ''}`} data-reading-index="4" style={{ marginBottom: "-2rem" }}>
              <div className="step-header">
                <span className="step-number">3 </span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text="Specify the height of the extrusion on the item entry or workspace."
                  isActive={isSpeaking && currentIndex === 4}
                  currentCharIndex={currentCharIndex}
                />
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 5 ? 'reading-active' : ''}`} data-reading-index="5">
              <div className="step-header">
                <span className="step-number">4 </span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text="Press ENTER to finalize."
                  isActive={isSpeaking && currentIndex === 5}
                  currentCharIndex={currentCharIndex}
                />
              </div>

              <div className="section-divider" style={{ margin: "2rem" }}></div>

              <div className={`instruction-step ${currentIndex === 5 ? 'reading-active' : ''}`} data-reading-index="5">
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
            </div>

            <div className={`instruction-step ${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
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
                <div className="screenshot-wrapper mt-4" style={{ marginTop: "1rem" }}>
                  <img src={revolveIcon} alt="Revolve Icon" className="software-screenshot" style={{ width: '280px', marginBottom: "-3rem" }} />
                </div>
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 3 ? 'reading-active' : ''}`} data-reading-index="3" style={{ marginBottom: "-2rem" }}>
              <div className="step-header" style={{ marginBottom: "2rem" }}>
                <span className="step-number">2 </span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  style={{ marginTop: "-1.5rem" }}
                  text="Select the perimeter of the sketch to be revolve and click GO."
                  isActive={isSpeaking && currentIndex === 3}
                  currentCharIndex={currentCharIndex}
                />
              </div>


              <div className={`step-header ${currentIndex === 4 ? 'reading-active' : ''}`} data-reading-index="4">
                <span className="step-number">3 </span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  style={{ marginTop: "-1.5rem" }}
                  text="Select the axis of rotation (pick points or edge) and click GO. A hatch will appear including the specified area to be revolved."
                  isActive={isSpeaking && currentIndex === 4}
                  currentCharIndex={currentCharIndex}
                />
              </div>

              <div className="section-divider" style={{ margin: "2rem" }}></div>

              <div className={`instruction-step ${currentIndex === 4 ? 'reading-active' : ''}`} data-reading-index="4">
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
  const { scrollProgress, containerRef, speak, stop, isSpeaking, currentIndex, currentCharIndex } = useLessonCore(`${subLessonId}-${activeTab}`);

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
    window.scrollTo({ top: 0, behavior: 'smooth' });

  };

  const handlePrev = () => {
    const i = tabs.findIndex(t => t.id === activeTab);
    if (i > 0) { setActiveTab(tabs[i - 1].id as any); } else if (onPrevLesson) onPrevLesson();
    window.scrollTo({ top: 0, behavior: 'smooth' });

  };

  return (
    <div className={`course-lesson-container`} ref={containerRef}>
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      <div className="lesson-tabs">
        {tabs.map(tab => (<button key={tab.id} className={`tab-button ${activeTab === tab.id ? 'active' : ''}`} onClick={() => setActiveTab(tab.id as any)}>{tab.label}</button>))}
      </div>

      {activeTab === 'showHide' && (
        <section className="lesson-intro">
          <h3 className={`section-title ${currentIndex === 0 ? "reading-active" : ""}`} data-reading-index="0">
            <KaraokeLessonText
              as="span"
              text="Show / Hide"
              isActive={isSpeaking && currentIndex === 0}
              currentCharIndex={currentCharIndex}
            />
            <ReadAloudButton isSpeaking={isSpeaking} onStart={() => {
              const introTitle = "Show / Hide";
              const introDesc = "Tools use to switch between displaying and hiding entities.";
              speak([introTitle, introDesc, ...showHideSteps]);
            }} onStop={stop} />
          </h3>
          <KaraokeLessonText
            className={`lesson-subtitle ${currentIndex === 1 ? "reading-active" : ""}`}
            data-reading-index="1"
            text="Tools use to switch between displaying and hiding entities."
            isActive={isSpeaking && currentIndex === 1}
            currentCharIndex={currentCharIndex}
          />
          <div className="screenshot-wrapper mt-8">
            <img src={showHideMenu} alt="Show/Hide Intro" className="software-screenshot screenshot-small" style={{ width: '192px' }} />
          </div>
        </section>
      )}

      {activeTab === 'stretch' && (
        <section className="lesson-intro">
          <h3 className={`section-title ${currentIndex === 0 ? "reading-active" : ""}`} data-reading-index="0">
            <KaraokeLessonText
              as="span"
              text="Stretch / Shape / Cut"
              isActive={isSpeaking && currentIndex === 0}
              currentCharIndex={currentCharIndex}
            />
            <ReadAloudButton isSpeaking={isSpeaking} onStart={() => {
              const introTitle = "Stretch / Shape / Cut";
              const introDesc = "Tools used to modify the length and form of solid entities.";
              speak([introTitle, introDesc, ...stretchSteps]);
            }} onStop={stop} />
          </h3>
          <KaraokeLessonText
            className={`lesson-subtitle ${currentIndex === 1 ? "reading-active" : ""}`}
            data-reading-index="1"
            text="Tools used to modify the length and form of solid entities."
            isActive={isSpeaking && currentIndex === 1}
            currentCharIndex={currentCharIndex}
          />
          <div className="screenshot-wrapper mt-8">
            <img src={fairingChamferImg} alt="Stretch and Shape Intro" className="software-screenshot screenshot-small" style={{ width: '192px' }} />
          </div>
        </section>
      )}

      {activeTab === 'resize' && (
        <section className="lesson-intro">
          <h3 className={`section-title ${currentIndex === 0 ? "reading-active" : ""}`} data-reading-index="0">
            <KaraokeLessonText
              as="span"
              text="Resize"
              isActive={isSpeaking && currentIndex === 0}
              currentCharIndex={currentCharIndex}
            />
            <ReadAloudButton isSpeaking={isSpeaking} onStart={() => {
              const introTitle = "Resize";
              const introDesc = "Tool used to scale solid entities up or down.";
              speak([introTitle, introDesc, ...resizeSteps]);
            }} onStop={stop} />
          </h3>
          <KaraokeLessonText
            className={`lesson-subtitle ${currentIndex === 1 ? "reading-active" : ""}`}
            data-reading-index="1"
            text="Tool used to scale solid entities up or down."
            isActive={isSpeaking && currentIndex === 1}
            currentCharIndex={currentCharIndex}
          />
        </section>
      )}



      <div className="lesson-grid single-card">
        {activeTab === 'showHide' && (
          <div className="lesson-card tab-content fade-in">
            <div className="card-header">
              <h4>SHOW / HIDE ENTITY</h4>
            </div>

            <div className={`instruction-step ${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
              <div className="step-header">
                <span className="step-number">1 </span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text="Select Show/Hide from the icon menu."
                  isActive={isSpeaking && currentIndex === 2}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <div className="screenshot-wrapper">
                  <img src={showHideEntity} alt="Show/Hide Entity Icon" className="software-screenshot screenshot-small" style={{ width: '280px', marginBottom: "-5rem" }} />
                </div>
              </div>
            </div>

            <div className="section-divider"></div>

            <div className={`instruction-step ${currentIndex === 3 ? 'reading-active' : ''}`} data-reading-index="3">
              <div className="step-header">
                <span className="step-number">2 </span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  style={{ marginBottom: "1.5rem" }}
                  text="Select the specific entities you wish to display or hide and click GO."
                  isActive={isSpeaking && currentIndex === 3}
                  currentCharIndex={currentCharIndex}
                />
              </div>
            </div>

            <div className="card-header card-sub-header">
              <h4>SHOW/HIDE DRAFTING ENTITY</h4>
            </div>

            <div className={`instruction-step ${currentIndex === 4 ? 'reading-active' : ''}`} data-reading-index="4">
              <div className="step-header">
                <span className="step-number">1 </span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text="Select Show/Hide Drafting Entity from the icon menu."
                  isActive={isSpeaking && currentIndex === 4}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <div className="screenshot-wrapper">
                  <img src={showHideDraftingEntity} alt="Show/Hide Drafting Entity Icon" className="software-screenshot screenshot-small" style={{ width: '280px', marginBottom: "-5rem" }} />
                </div>
              </div>
            </div>

            <div className="section-divider"></div>

            <div className={`instruction-step ${currentIndex === 5 ? 'reading-active' : ''}`} data-reading-index="5">
              <div className="step-header">
                <span className="step-number">2 </span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text="You can also use 'Show/Hide Drafting Entity' to quickly toggle all dimensions and annotations."
                  isActive={isSpeaking && currentIndex === 5}
                  currentCharIndex={currentCharIndex}
                />
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

            <div className={`instruction-step ${currentIndex === 6 ? 'reading-active' : ''}`} data-reading-index="6">
              <div className="step-header">
                <span className="step-number">1 </span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text="Select Hide Unselected Entity from the icon menu."
                  isActive={isSpeaking && currentIndex === 6}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <div className="screenshot-wrapper">
                  <img src={hideUnselectedEntity} alt="Hide Unselected Entity Icon" className="software-screenshot screenshot-small" style={{ width: '280px', marginBottom: "-5rem" }} />
                </div>
              </div>
            </div>

            <div className="section-divider"></div>

            <div className={`instruction-step ${currentIndex === 7 ? 'reading-active' : ''}`} data-reading-index="7">
              <div className="step-header">
                <span className="step-number">2 </span>
                <div className="step-label" style={{ marginBottom: "1rem" }}>
                  <KaraokeLessonText
                    as="span"
                    text="Select entities to retain and click GO."
                    isActive={isSpeaking && currentIndex === 7}
                    currentCharIndex={currentCharIndex}
                  />
                  <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '40px', margin: '0 8px' }} />
                </div>
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
          <div className="lesson-card tab-content fade-in">
            <div className="card-header">
              <h4>STRETCH / SHAPE / CUT</h4>
            </div>

            <div className={`instruction-step ${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
              <div className="step-header">
                <span className="step-number">1 </span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text="Select Stretch from the menu."
                  isActive={isSpeaking && currentIndex === 2}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <div className="screenshot-wrapper">
                  <img src={stretchIcon} alt="Stretch Icon" className="software-screenshot screenshot-small" style={{ width: '280px', marginBottom: "-4rem" }} />
                </div>
              </div>
            </div>

            <div className="section-divider"></div>

            <div className={`instruction-step ${currentIndex === 3 ? 'reading-active' : ''}`} data-reading-index="3">
              <div className="step-header">
                <span className="step-number">2 </span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  style={{ marginBottom: "1.5rem" }}
                  text="Select the face you want to stretch and click GO."
                  isActive={isSpeaking && currentIndex === 3}
                  currentCharIndex={currentCharIndex}
                />
              </div>
            </div>


            <div className={`instruction-step ${currentIndex === 4 ? 'reading-active' : ''}`} data-reading-index="4" style={{ marginTop: "-4rem" }}>
              <div className="step-header">
                <span className="step-number">3 </span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text="Specify the desired additional length on the item entry or use the linear scale in 3D space."
                  isActive={isSpeaking && currentIndex === 4}
                  currentCharIndex={currentCharIndex}
                />
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
              <div className={`instruction-step ${currentIndex === 5 ? 'reading-active' : ''}`} data-reading-index="5">
                <div className="step-header">
                  <div className="step-label">
                    <KaraokeLessonText
                      as="span"
                      text="Select face and click GO then Left-click on 3D Space."
                      isActive={isSpeaking && currentIndex === 5}
                      currentCharIndex={currentCharIndex}
                    />
                    <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '40px', margin: '0 8px' }} />
                  </div>
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
          <div className="lesson-card tab-content fade-in">
            <div className="card-header">
              <h4>RESIZE</h4>
            </div>

            <div className={`instruction-step ${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
              <div className="step-header">
                <span className="step-number">1 </span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text="Select Resize from the icon menu."
                  isActive={isSpeaking && currentIndex === 2}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <div className="screenshot-wrapper">
                  <img src={resizeIcon} alt="Resize Icon" className="software-screenshot screenshot-small" style={{ width: '280px', marginBottom: "-4rem" }} />
                </div>
              </div>
            </div>

            <div className="section-divider"></div>

            <div className={`instruction-step ${currentIndex === 3 ? 'reading-active' : ''}`} data-reading-index="3">
              <div className="step-header">
                <span className="step-number">2 </span>
                <div className="step-label" style={{ marginBottom: "1.5rem" }}>
                  <KaraokeLessonText
                    as="span"
                    text="Select the entity for resizing and click GO."
                    isActive={isSpeaking && currentIndex === 3}
                    currentCharIndex={currentCharIndex}
                  />
                  <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '40px', margin: '0 8px' }} />
                </div>
              </div>
            </div>


            <div className={`instruction-step ${currentIndex === 4 ? 'reading-active' : ''}`} data-reading-index="4" style={{ marginTop: "-3rem" }}>
              <div className="step-header">
                <span className="step-number">3 </span>
                <div className="step-label" style={{ marginTop: "1.5rem" }}>
                  <KaraokeLessonText
                    as="span"
                    text="Using resize allows the user to scale up or scale down the size of the solid entity. Specify the scale on the item entry then left-click on the 3D Space."
                    isActive={isSpeaking && currentIndex === 4}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
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
  const { scrollProgress, containerRef, speak, stop, isSpeaking, currentIndex, currentCharIndex } = useLessonCore(`${subLessonId}-${activeTab}`);

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
    <div className={`course-lesson-container`} ref={containerRef}>
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      <div className="lesson-tabs">
        {tabs.map(tab => (<button key={tab.id} className={`tab-button ${activeTab === tab.id ? 'active' : ''}`} onClick={() => setActiveTab(tab.id as any)}>{tab.label}</button>))}
      </div>

      <section className="lesson-intro">
        <h3 className={`section-title ${currentIndex === 0 ? "reading-active" : ""}`} data-reading-index="0">
          <KaraokeLessonText
            as="span"
            text="Creating Shape Steels"
            isActive={isSpeaking && currentIndex === 0}
            currentCharIndex={currentCharIndex}
          />
          <ReadAloudButton isSpeaking={isSpeaking} onStart={() => {
            const introTitle = "Creating Shape Steels";
            const introDesc = "Learn how to arrange machine parts and steel profiles in 3D space.";
            speak([introTitle, introDesc, ...shapeSteelsSteps]);
          }} onStop={stop} />
        </h3>
        <KaraokeLessonText
          className={`lesson-subtitle ${currentIndex === 1 ? "reading-active" : ""}`}
          data-reading-index="1"
          text="Learn how to arrange machine parts and steel profiles in 3D space."
          isActive={isSpeaking && currentIndex === 1}
          currentCharIndex={currentCharIndex}
        />
        <div className="screenshot-wrapper">
          <img src={shapeSteels1} alt="Shape Steels Overview" className="software-screenshot" style={{ height: '225px' }} />
        </div>
      </section>

      <div className="lesson-grid single-card">
        {activeTab === 'shapeSteels' && (
          <div className="lesson-card tab-content fade-in">
            <div className="card-header">
              <h4>Shape Steels Includes:</h4>
            </div>

            <div className={`instruction-step ${currentIndex === 3 ? 'reading-active' : ''}`} data-reading-index="3">
              <div className="step-description">
                <div className="screenshot-wrapper">
                  <img src={shapeSteelsTypes} alt="Shape Steels Options" className="software-screenshot" style={{ width: '900px' }} />
                </div>
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
              <div className="step-header">
                <span className="step-number">1 </span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text="Select Arrange Machine Part from the icon menu."
                  isActive={isSpeaking && currentIndex === 2}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <div className="screenshot-wrapper">
                  <img src={arrangeMachinePartMenu} alt="Arrange Machine Part Menu" className="software-screenshot screenshot-small" style={{ width: '14rem' }} />
                </div>
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 3 ? 'reading-active' : ''}`} data-reading-index="3">
              <div className="step-header">
                <span className="step-number">2 </span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text="In the window that appears, select the machine part or steel type and specify the dimensions, then click OK."
                  isActive={isSpeaking && currentIndex === 3}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <div className="screenshot-wrapper">
                  <img src={arrangeMachinePartWindow} alt="Arrange Machine Part Window" className="software-screenshot" style={{ width: '900px', height: 'auto' }} />
                </div>
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 4 ? 'reading-active' : ''}`} data-reading-index="4">
              <div className="step-header">
                <span className="step-number">3 </span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text="In the Key Entry Area, enter the coordinates for the position point or origin point."
                  isActive={isSpeaking && currentIndex === 4}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <div className="screenshot-wrapper" style={{ marginBottom: "2rem" }}>
                  <img src={keyEntryArea} alt="Key Entry Area" className="software-screenshot screenshot-small" style={{ height: '50px' }} />
                </div>
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 3 ? 'reading-active' : ''}`} data-reading-index="3">
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

