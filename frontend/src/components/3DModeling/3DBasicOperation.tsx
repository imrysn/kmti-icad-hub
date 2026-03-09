/**
 * 3DBasicOperation.tsx  —  Basic Operation lessons (1 through 4)
 *
 * Lesson-item parent ID: 'basic-operation' (collapsed in sidebar)
 * Sub-lesson child IDs  : 'basic-op-1' | 'basic-op-2' | 'basic-op-3' | 'basic-op-4'
 *
 * Each sub-lesson is a self-contained React component defined in this file,
 * separated by section header comments (═══). The default export
 * `BasicOperationLesson` acts as a dispatcher:
 *
 *   <BasicOperationLesson subLessonId="basic-op-2" />
 *
 * Sub-lesson map:
 *   basic-op-1  →  BasicOperation1   Creating Basic Shapes (Cylinder, Box, Polygon, Cone, Torus)
 *   basic-op-2  →  BasicOperation2   Move, Rotate, Copy, Mirror, Delete
 *   basic-op-3  →  BasicOperation3   Sketch / Extrude / Revolve / Show-Hide / Stretch / Resize
 *   basic-op-4  →  BasicOperation4   Arrange Machine Part / Shape Steels
 *
 * To add content to a sub-lesson: find the matching section header and edit
 * the corresponding component. To add a new sub-lesson: create a new component,
 * add its id to ICAD_3D_LESSONS in MentorMode.tsx, and add a case to the switch.
 */
import React, { useState } from 'react';
import { MousePointer2, Keyboard, Box as BoxIcon, Circle, ChevronLeft, ChevronRight, ArrowDown, ArrowRight } from 'lucide-react';
import '../../styles/3DModeling/CourseLesson.css';
import '../../styles/3DModeling/3DBasicOperation.css';

// ── Shared Asset Imports ──────────────────────────────────────────────────
import leftClick from '../../assets/3D_Image_File/left_click.jpg';

// ══════════════════════════════════════════════════════════════════════════
// Basic Operation (1) — CREATING BASIC SHAPES
// Lesson-item child ID: 'basic-op-1'
// Tabs: Cylinder | Box | Polygon | Cone | Torus
// ══════════════════════════════════════════════════════════════════════════
import cmdMenu from '../../assets/3D_Image_File/basic_operation(1)_command_menu.jpg';
import arrangeCylinder from '../../assets/3D_Image_File/basic_operation(1)_arrange_cylinder.jpg';
import cylinderResult from '../../assets/3D_Image_File/basic_operation(1)_cylinder.jpg';
import itemEntry from '../../assets/3D_Image_File/basic_operation(1)_item_entry.jpg';
import keyEntry from '../../assets/3D_Image_File/basic_operation(1)_key_entry_area.jpg';
import arrangeBox from '../../assets/3D_Image_File/basic_operation(1)_arrange_box.jpg';
import boxResult from '../../assets/3D_Image_File/box.jpg';
import arrangePolygon from '../../assets/3D_Image_File/basic_operation(1)_arrange_polygon_prism.jpg';
import polygonResult from '../../assets/3D_Image_File/polygon.jpg';
import itemEntryPolygon from '../../assets/3D_Image_File/item_entry_polygon.jpg';
import arrangeCone from '../../assets/3D_Image_File/basic_operation(2)_arrange_cone.jpg';
import itemEntryCone from '../../assets/3D_Image_File/basic_operation(2)_item_entry_cone.jpg';
import coneResult from '../../assets/3D_Image_File/cone.jpg';
import arrangeTorus from '../../assets/3D_Image_File/basic_operation(2)_arrange_torus.jpg';
import torusResult from '../../assets/3D_Image_File/torus.jpg';
import itemEntryTorus from '../../assets/3D_Image_File/basic_operation(1)_item_entry.jpg'; // Placeholder for Torus

// ══════════════════════════════════════════════════════════════════════════
// Basic Operation (2) — MOVE, ROTATE, COPY, MIRROR, DELETE
// Lesson-item child ID: 'basic-op-2'
// Tabs: Move | Rotate | Mirror | Copy | Rotate Copy | Mirror Copy | Delete
// ══════════════════════════════════════════════════════════════════════════
import operationsMenu from '../../assets/3D_Image_File/basic_operation(1)_move_rotate_copy_mirror_delete.jpg';
import moveMenu from '../../assets/3D_Image_File/basic_operation(2)_move.jpg';
import itemEntryMove from '../../assets/3D_Image_File/basic_operation(2)_item_entry_box.jpg';
import moveResult from '../../assets/3D_Image_File/basic_operation(2)_move_3.jpg';
import rotateIcon from '../../assets/3D_Image_File/basic_operation(3)_rotate.jpg';
import rotateAxis from '../../assets/3D_Image_File/basic_operation(3)_rotate_axis_rotation.jpg';
import rotateEntry from '../../assets/3D_Image_File/basic_operation(3)_rotate_item_entry.jpg';
import mirrorIcon from '../../assets/3D_Image_File/basic_operation(3)_mirror.jpg';
import mirrorResult from '../../assets/3D_Image_File/basic_operation(3)_mirrored.jpg';
import copyIcon from '../../assets/3D_Image_File/basic_operation(3)_copy.jpg';
import copyDistance from '../../assets/3D_Image_File/basic_operation(3)_copy_distance.jpg';
import copyResult from '../../assets/3D_Image_File/basic_operation(3)_copy_3.jpg';
import rotateCopyIcon from '../../assets/3D_Image_File/basic_operation(3)_rotatecopy.jpg';
import rotateCopyAxis from '../../assets/3D_Image_File/basic_operation(3)_rotate_copy.jpg';
import mirrorCopyIcon from '../../assets/3D_Image_File/basic_operation(3)_mirror_copy.jpg';
import mirrorCopyResult from '../../assets/3D_Image_File/basic_operation(3)_mirrorcopy.jpg';
import deleteIcon from '../../assets/3D_Image_File/basic_operation(3)_delete.jpg';

// ══════════════════════════════════════════════════════════════════════════
// Basic Operation (3) — SKETCH / EXTRUDE / REVOLVE / SHOW-HIDE / STRETCH / RESIZE
// Lesson-item child ID: 'basic-op-3'
// Tabs: Sketch/Extrude/Revolve | Show/Hide | Stretch | Resize
// ══════════════════════════════════════════════════════════════════════════
import sketch1 from '../../assets/3D_Image_File/basic_operation(4)_1sketch.jpg';
import sketchP1 from '../../assets/3D_Image_File/basic_operation(4)_sketch_p1.jpg';
import sketchIcon from '../../assets/3D_Image_File/basic_operation(4)_sketch.jpg';
import extrudeRevolveMenu from '../../assets/3D_Image_File/basic_operation(4)_extrude_revolve.jpg';
import extrudeOneSide from '../../assets/3D_Image_File/basic_operation(4)_extrusion_oneside.jpg'; // cspell:disable-line
import extrudeBothSide from '../../assets/3D_Image_File/basic_operation(4)_extrusion_bothside.jpg'; // cspell:disable-line
import extrudeP1 from '../../assets/3D_Image_File/basic_operation(4)_extrude_p1.jpg';
import extrudeP2 from '../../assets/3D_Image_File/basic_operation(4)_extrude_p2.jpg';
import revolveIcon from '../../assets/3D_Image_File/basic_operation(4)_revolve.jpg';
import revolveP1 from '../../assets/3D_Image_File/basic_operation(4)_revolve_p1.jpg';
import revolveP2 from '../../assets/3D_Image_File/basic_operation(4)_revolve_p2.jpg';
import revolveP3 from '../../assets/3D_Image_File/basic_operation(4)_revolve_p3.jpg';
import showHideMenu from '../../assets/3D_Image_File/basic_operation(4)_show_hide.jpg';
import showHideEntity from '../../assets/3D_Image_File/basic_operation(4)_show_hide_entity.jpg';
import showHideDraftingEntity from '../../assets/3D_Image_File/basic_operation(4)_showhide_drafting_entity.jpg'; // cspell:disable-line
import hideUnselectedEntity from '../../assets/3D_Image_File/basic_operation(4)_hide_unselected_entity.jpg';
import hideUnselectedEntity1 from '../../assets/3D_Image_File/basic_operation(4)_hide_unselected_entity_1.jpg';
import draftingEntitiesTable from '../../assets/3D_Image_File/basic_operation(4)_drafting_entities.jpg';
import stretchIcon from '../../assets/3D_Image_File/basic_operation(5)_stretch.jpg';
import stretchItemEntry from '../../assets/3D_Image_File/basic_operation(5)_item_entry_stretch.jpg';
import stretch1 from '../../assets/3D_Image_File/basic_operation(5)_stretch1.jpg';
import stretch2 from '../../assets/3D_Image_File/basic_operation(5)_stretch2.jpg';
import resizeIcon from '../../assets/3D_Image_File/basic_operation(5)_resize.jpg';
import resizeItemEntry from '../../assets/3D_Image_File/basic_operation(5)_item_entry_resize.jpg';
import resize3_2 from '../../assets/3D_Image_File/basic_operation(5)_resize3_2.jpg';

// ══════════════════════════════════════════════════════════════════════════
// Basic Operation (4) — ARRANGE MACHINE PART / SHAPE STEELS
// Lesson-item child ID: 'basic-op-4'
// Tabs: Shape Steels
// ══════════════════════════════════════════════════════════════════════════
import arrangeMachinePartMenu from '../../assets/3D_Image_File/basic_operation(6)_arrange_machine_part.jpg';
import arrangeMachinePartWindow from '../../assets/3D_Image_File/basic_operation(6)_arrange_machine_part_window.jpg';
import shapeSteelsTypes from '../../assets/3D_Image_File/basic_operation(6)_shape_steels.jpg';
import shapeSteels1 from '../../assets/3D_Image_File/basic_operation(6)_shape_steels1.jpg';
import shapeSteels2 from '../../assets/3D_Image_File/basic_operation(6)_shape_steels2.jpg';
import keyEntryArea from '../../assets/3D_Image_File/basic_operation(1)_key_entry_area.jpg';

// ──────────────────────────────────────────────────────────────────────────
// Sub-lesson components
// ──────────────────────────────────────────────────────────────────────────

/* ── Basic Operation (1): Creating Basic Shapes ── */
const BasicOperation1: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'cylinder' | 'box' | 'polygon' | 'cone' | 'torus'>('cylinder');
  const tabs = [
    { id: 'cylinder', label: 'Cylinder' },
    { id: 'box', label: 'Box' },
    { id: 'polygon', label: 'Polygon' },
    { id: 'cone', label: 'Cone' },
    { id: 'torus', label: 'Torus' }
  ];
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
        <h3><BoxIcon size={28} className="text-blue-600" /> CREATING BASIC SHAPES</h3>
        <p>When creating a 3D model, always start with the <strong>Front View</strong>.</p>
        <div className="instruction-box">
          <p>On the command menu: <strong>[Arrange Solid]</strong> &gt; <strong>[Select Y Orientation]</strong></p>
          <div className="image-wrapper">
            <img src={cmdMenu} alt="Command Menu" className="software-screenshot screenshot-small" />
          </div>
        </div>
      </section>
      <div className="lesson-tabs">
        {tabs.map(tab => (
          <button key={tab.id} className={`tab-button ${activeTab === tab.id ? 'active' : ''}`} onClick={() => setActiveTab(tab.id as any)}>{tab.label}</button>
        ))}
      </div>
      <div className="lesson-grid single-card">
        {/* CYLINDER */}
        {activeTab === 'cylinder' && (
          <div className="lesson-card tab-content">
            <div className="card-header"><h4>CYLINDER</h4></div>
            <div className="instruction-step">
              <div className="step-header"><span className="step-number">1</span><span className="step-label">Select Shape</span></div>
              <p>Select <strong>Arrange Cylinder</strong> from the icon menu.</p>
              <img src={arrangeCylinder} alt="Arrange Cylinder icon" className="software-screenshot screenshot-icon" />
            </div>
            <div className="instruction-step">
              <div className="step-header"><span className="step-number">2</span><span className="step-label">Dimension Entry</span></div>
              <p>On the bottom left corner, the <strong>item entry</strong> can be located. </p>
              <div className="image-wrapper"><img src={itemEntry} alt="Item Entry Cylinder" className="software-screenshot" /></div>
            </div>
            <div className="instruction-step">
              <div className="step-header"><span className="step-number">3</span><span className="step-label">Set Origin</span></div>
              <p>In the <strong>Key Entry Area</strong>, enter the coordinates for the position (origin).</p>
              <div className="image-wrapper"><img src={keyEntry} alt="Key Entry" className="software-screenshot screenshot-small" /></div>
            </div>
            <div className="result-preview"><span className="preview-label">PREVIEW</span><img src={cylinderResult} alt="Cylinder Preview" className="software-screenshot preview-img" /></div>
            <div className="lesson-navigation">
              <button className="nav-button" disabled><ChevronLeft size={18} /> Previous</button>
              <button className="nav-button next" onClick={handleNext}>Next <ChevronRight size={18} /></button>
            </div>
          </div>
        )}
        {/* BOX */}
        {activeTab === 'box' && (
          <div className="lesson-card tab-content">
            <div className="card-header"><h4>BOX</h4></div>
            <div className="instruction-step">
              <div className="step-header"><span className="step-number">1</span><span className="step-label">Select Shape</span></div>
              <p>Select <strong>Arrange Box</strong> from the icon menu.</p>
              <img src={arrangeBox} alt="Arrange Box icon" className="software-screenshot screenshot-icon" />
            </div>
            <div className="instruction-step">
              <div className="step-header"><span className="step-number">2</span><span className="step-label">Dimension Entry</span></div>
              <p>Specify the depth, width and height of the box on the item entry.</p>
              <div className="image-wrapper"><img src={itemEntry} alt="Item Entry Box" className="software-screenshot" /></div>
            </div>
            <div className="instruction-step">
              <div className="step-header"><span className="step-number">3</span><span className="step-label">Set Origin</span></div>
              <p>In the <strong>Key Entry Area</strong>, enter the coordinates for the position (origin).</p>
              <div className="image-wrapper"><img src={keyEntry} alt="Key Entry Box" className="software-screenshot screenshot-small" /></div>
            </div>
            <div className="result-preview"><span className="preview-label">PREVIEW</span><img src={boxResult} alt="Box Preview" className="software-screenshot preview-img" /></div>
            <div className="lesson-navigation">
              <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button>
              <button className="nav-button next" onClick={handleNext}>Next <ChevronRight size={18} /></button>
            </div>
          </div>
        )}
        {/* POLYGON */}
        {activeTab === 'polygon' && (
          <div className="lesson-card tab-content">
            <div className="card-header"><h4>POLYGON</h4></div>
            <div className="instruction-step">
              <div className="step-header"><span className="step-number">1</span><span className="step-label">Select Shape</span></div>
              <p>Select <strong>Arrange Polygonal Prism</strong> from the icon menu.</p>
              <img src={arrangePolygon} alt="Arrange Polygon icon" className="software-screenshot screenshot-icon" />
            </div>
            <div className="instruction-step">
              <div className="step-header"><span className="step-number">2</span><span className="step-label">Dimension Entry</span></div>
              <p>Specify the number of sides, diameter (circumscribed) and height of the polygon on the item entry.</p>
              <div className="image-wrapper"><img src={itemEntryPolygon} alt="Item Entry Polygon" className="software-screenshot" /></div>
            </div>
            <div className="instruction-step">
              <div className="step-header"><span className="step-number">3</span><span className="step-label">Set Origin</span></div>
              <p>In the <strong>Key Entry Area</strong>, enter the coordinates for the position (origin).</p>
              <div className="image-wrapper"><img src={keyEntry} alt="Key Entry Polygon" className="software-screenshot screenshot-small" /></div>
            </div>
            <div className="result-preview"><span className="preview-label">PREVIEW</span><img src={polygonResult} alt="Polygon Preview" className="software-screenshot preview-img" /></div>
            <div className="lesson-navigation">
              <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button>
              <button className="nav-button next" onClick={handleNext}>Next <ChevronRight size={18} /></button>
            </div>
          </div>
        )}
        {/* CONE */}
        {activeTab === 'cone' && (
          <div className="lesson-card tab-content">
            <div className="card-header"><h4>CONE</h4></div>
            <div className="instruction-step">
              <div className="step-header"><span className="step-number">1</span><span className="step-label">Select Shape</span></div>
              <p>Select <strong>Arrange Cone</strong> from the icon menu.</p>
              <img src={arrangeCone} alt="Arrange Cone icon" className="software-screenshot screenshot-icon" />
            </div>
            <div className="instruction-step">
              <div className="step-header"><span className="step-number">2</span><span className="step-label">Dimension Entry</span></div>
              <p>Specify the number of sides, base diameter (circumscribed), top face diameter (circumscribed) and height on the item entry.</p>
              <div className="image-wrapper"><img src={itemEntryCone} alt="Item Entry Cone" className="software-screenshot" /></div>
            </div>
            <div className="instruction-step">
              <div className="step-header"><span className="step-number">3</span><span className="step-label">Set Origin</span></div>
              <p>On the <strong>Key Entry Area</strong>, enter the coordinates for the position (origin).</p>
              <div className="image-wrapper"><img src={keyEntry} alt="Key Entry" className="software-screenshot screenshot-small" /></div>
            </div>
            <div className="result-preview"><span className="preview-label">PREVIEW</span><img src={coneResult} alt="Cone Preview" className="software-screenshot preview-img" /></div>
            <div className="lesson-navigation">
              <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button>
              <button className="nav-button next" onClick={handleNext}>Next <ChevronRight size={18} /></button>
            </div>
          </div>
        )}
        {/* TORUS */}
        {activeTab === 'torus' && (
          <div className="lesson-card tab-content">
            <div className="card-header"><h4>TORUS</h4></div>
            <div className="instruction-step">
              <div className="step-header"><span className="step-number">1</span><span className="step-label">Select Shape</span></div>
              <p>Select <strong>Arrange Torus</strong> from the icon menu.</p>
              <img src={arrangeTorus} alt="Arrange Torus icon" className="software-screenshot screenshot-icon" />
            </div>
            <div className="instruction-step">
              <div className="step-header"><span className="step-number">2</span><span className="step-label">Dimension Entry</span></div>
              <p>Specify the section diameter, </p>
              <div className="image-wrapper"><img src={itemEntryTorus} alt="Item Entry Torus" className="software-screenshot" /></div>
            </div>
            <div className="instruction-step">
              <div className="step-header"><span className="step-number">3</span><span className="step-label">Set Origin</span></div>
              <p>In the <strong>Key Entry Area</strong>, enter the coordinates for the position (origin).</p>
              <div className="image-wrapper"><img src={keyEntry} alt="Key Entry Torus" className="software-screenshot screenshot-small" /></div>
            </div>
            <div className="result-preview"><span className="preview-label">PREVIEW</span><img src={torusResult} alt="Torus Preview" className="software-screenshot preview-img" /></div>
            <div className="lesson-navigation">
              <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button>
              <button className="nav-button next" disabled>Finish <ChevronRight size={18} /></button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/* ── Basic Operation (2): Move, Rotate, Copy, Mirror, Delete ── */
const BasicOperation2: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'move' | 'copy' | 'mirror' | 'rotate' | 'rotateCopy' | 'mirrorCopy' | 'delete'>('move');
  const tabs = [
    { id: 'move', label: 'Move' },
    { id: 'rotate', label: 'Rotate' },
    { id: 'mirror', label: 'Mirror' },
    { id: 'copy', label: 'Copy' },
    { id: 'rotateCopy', label: 'Rotate Copy' },
    { id: 'mirrorCopy', label: 'Mirror Copy' },
    { id: 'delete', label: 'Delete' }
  ];
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
        <h3>MOVE, ROTATE, COPY, MIRROR, DELETE</h3>
        <div className="instruction-box">
          <div className="image-wrapper">
            <img src={operationsMenu} alt="Operations Menu" className="software-screenshot screenshot-small" />
          </div>
        </div>
      </section>
      <div className="lesson-tabs">
        {tabs.map(tab => (
          <button key={tab.id} className={`tab-button ${activeTab === tab.id ? 'active' : ''}`} onClick={() => setActiveTab(tab.id as any)}>{tab.label}</button>
        ))}
      </div>
      <div className="lesson-grid single-card">
        {/* MOVE */}
        {activeTab === 'move' && (
          <div className="lesson-card tab-content">
            <div className="card-header"><h4>MOVE</h4></div>
            <div className="instruction-step">
              <div className="step-header"><span className="step-number">1</span><span className="step-label">Select Move</span></div>
              <p>Select <strong>Move Component</strong> from the icon menu.</p>
              <img src={moveMenu} alt="Move menu icon" className="software-screenshot screenshot-icon" />
            </div>
            <div className="instruction-step">
              <div className="step-header"><span className="step-number">2</span><span className="step-label">Select Entity</span></div>
              <p>Select the component to be move &gt; GO </p>
              <img src={leftClick} alt="Left click" className="software-screenshot screenshot-click" />
            </div>
            <div className="instruction-step">
              <div className="step-header"><span className="step-number">3</span><span className="step-label">Movement Distance</span></div>
              <p>Specify the movement distance on the X, Y, and Z-axis on the item entry. Press Enter.</p>
              <div className="image-wrapper"><img src={itemEntryMove} alt="Item Entry Move" className="software-screenshot screenshot-wide" /></div>
            </div>
            <div className="result-preview"><span className="preview-label">RESULT</span><img src={moveResult} alt="Move Preview" className="software-screenshot preview-img" /></div>
            <div className="lesson-navigation">
              <button className="nav-button" disabled><ChevronLeft size={18} /> Previous</button>
              <button className="nav-button next" onClick={handleNext}>Next <ChevronRight size={18} /></button>
            </div>
          </div>
        )}
        {/* ROTATE */}
        {activeTab === 'rotate' && (
          <div className="lesson-card tab-content">
            <div className="card-header"><h4>ROTATE</h4></div>
            <div className="instruction-step">
              <div className="step-header"><span className="step-number">1</span><span className="step-label">Select Tool</span></div>
              <p>Select <strong>Rotate</strong> from the icon menu.</p>
              <img src={rotateIcon} alt="Rotate icon" className="software-screenshot screenshot-icon" />
            </div>
            <div className="instruction-step">
              <div className="step-header"><span className="step-number">2</span><span className="step-label">Select Entity</span></div>
              <p>Left-click on the entity to be rotate &gt; GO</p>
              <img src={leftClick} alt="Left click" className="software-screenshot screenshot-click" />
            </div>
            <div className="instruction-step">
              <div className="step-header"><span className="step-number">3</span><span className="step-label">Set Axis</span></div>
              <p>Select 2-points to set the axis of rotation.</p>
              <div className="image-wrapper"><img src={rotateAxis} alt="Axis of Rotation" className="software-screenshot" /></div>
            </div>
            <div className="instruction-step">
              <div className="step-header"><span className="step-number">4</span><span className="step-label">Set Angle</span></div>
              <p>Specify the desired angle of rotation on the item entry &gt; Press Enter</p>
              <div className="image-wrapper"><img src={rotateEntry} alt="Rotate Item Entry" className="software-screenshot screenshot-wide" /></div>
            </div>
            <div className="lesson-navigation">
              <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button>
              <button className="nav-button next" onClick={handleNext}>Next <ChevronRight size={18} /></button>
            </div>
          </div>
        )}
        {/* MIRROR */}
        {activeTab === 'mirror' && (
          <div className="lesson-card tab-content">
            <div className="card-header"><h4>MIRROR</h4></div>
            <div className="instruction-step">
              <div className="step-header"><span className="step-number">1</span><span className="step-label">Select Tool</span></div>
              <p>Select <strong>Mirror</strong> from the icon menu.</p>
              <img src={mirrorIcon} alt="Mirror icon" className="software-screenshot screenshot-icon" />
            </div>
            <div className="instruction-step">
              <div className="step-header"><span className="step-number">2</span><span className="step-label">Select Entity</span></div>
              <p>Left-click on the entity to be mirror &gt; GO</p>
              <img src={leftClick} alt="Left click" className="software-screenshot screenshot-click" />
            </div>
            <div className="instruction-step">
              <div className="step-header"><span className="step-number">3</span><span className="step-label">Set Plane</span></div>
              <p>Select 3-points to set the plane where the entity will be mirrored or left-click on the face where the entity will be mirrored.</p>
            </div>
            <div className="result-preview"><span className="preview-label">RESULT</span><img src={mirrorResult} alt="Mirror Result" className="software-screenshot preview-img" /></div>
            <div className="lesson-navigation">
              <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button>
              <button className="nav-button next" onClick={handleNext}>Next <ChevronRight size={18} /></button>
            </div>
          </div>
        )}
        {/* COPY */}
        {activeTab === 'copy' && (
          <div className="lesson-card tab-content">
            <div className="card-header"><h4>COPY COMPONENT</h4></div>
            <div className="instruction-step">
              <div className="step-header"><span className="step-number">1</span><span className="step-label">Select Tool</span></div>
              <p>Select <strong>Copy</strong> from the icon menu.</p>
              <img src={copyIcon} alt="Copy icon" className="software-screenshot screenshot-icon" />
            </div>
            <div className="instruction-step">
              <div className="step-header"><span className="step-number">2</span><span className="step-label">Select Entity</span></div>
              <p>Left-click on the entity to be copied.</p>
              <img src={leftClick} alt="Left click" className="software-screenshot screenshot-click" />
            </div>
            <div className="instruction-step">
              <div className="step-header"><span className="step-number">3</span><span className="step-label">Dimension Entry</span></div>
              <p>Specify the distance on the X, Y and Z-axis and the number of copies needed &gt; Press Enter.</p>
              <div className="image-wrapper"><img src={copyDistance} alt="Copy Distance" className="software-screenshot screenshot-wide" /></div>
            </div>
            <div className="result-preview"><span className="preview-label">RESULT</span><img src={copyResult} alt="Copy Result" className="software-screenshot preview-img" /></div>
            <div className="lesson-navigation">
              <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button>
              <button className="nav-button next" onClick={handleNext}>Next <ChevronRight size={18} /></button>
            </div>
          </div>
        )}
        {/* ROTATE COPY */}
        {activeTab === 'rotateCopy' && (
          <div className="lesson-card tab-content">
            <div className="card-header">
              <h4>ROTATE COPY</h4>
              <p>Same as rotate tool but makes a rotated duplicate of the entity.</p>
            </div>
            <div className="instruction-step"><img src={rotateCopyIcon} alt="Rotate Copy icon" className="software-screenshot screenshot-icon" /></div>
            <div className="result-preview"><span className="preview-label">RESULT</span><img src={rotateCopyAxis} alt="Rotate Copy Result" className="software-screenshot preview-img" /></div>
            <div className="lesson-navigation">
              <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button>
              <button className="nav-button next" onClick={handleNext}>Next <ChevronRight size={18} /></button>
            </div>
          </div>
        )}
        {/* MIRROR COPY */}
        {activeTab === 'mirrorCopy' && (
          <div className="lesson-card tab-content">
            <div className="card-header">
              <h4>MIRROR COPY</h4>
              <p>Same as mirror tool but makes a mirror duplicate of the entity.</p>
            </div>
            <div className="instruction-step"><img src={mirrorCopyIcon} alt="Mirror Copy icon" className="software-screenshot screenshot-icon" /></div>
            <div className="result-preview" style={{ marginTop: '2rem' }}><span className="preview-label">RESULT</span><img src={mirrorCopyResult} alt="Mirror Copy Preview" className="software-screenshot preview-img" /></div>
            <div className="lesson-navigation">
              <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button>
              <button className="nav-button next" onClick={handleNext}>Next <ChevronRight size={18} /></button>
            </div>
          </div>
        )}
        {/* DELETE */}
        {activeTab === 'delete' && (
          <div className="lesson-card tab-content">
            <div className="card-header"><h4>DELETE</h4></div>
            <div className="instruction-step">
              <div className="step-header"><span className="step-number">1</span><span className="step-label">Select Tool</span></div>
              <p>Select <strong>Delete</strong> from the icon menu.</p>
              <img src={deleteIcon} alt="Delete icon" className="software-screenshot screenshot-icon" />
            </div>
            <div className="instruction-step">
              <div className="step-header"><span className="step-number">2</span><span className="step-label">Action</span></div>
              <p>Left-click on the entity to delete.</p>
              <img src={leftClick} alt="Left click" className="software-screenshot screenshot-click" />
            </div>
            <div className="lesson-navigation">
              <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button>
              <button className="nav-button next" disabled>Finish <ChevronRight size={18} /></button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/* ── Basic Operation (3): Sketch / Extrude / Revolve / Show-Hide / Stretch / Resize ── */
const BasicOperation3: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'sketchExtrude' | 'showHide' | 'stretch' | 'resize'>('sketchExtrude');
  const tabs = [
    { id: 'sketchExtrude', label: 'Sketch / Extrude / Revolve' },
    { id: 'showHide', label: 'Show/Hide' },
    { id: 'stretch', label: 'Stretch' },
    { id: 'resize', label: 'Resize' }
  ];
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
        <h3>BASIC OPERATION (3)</h3>
        <p>In this lesson, we will focus on Sketch, Extrude/Revolve operations, Show/Hide entities, Stretch and Resize.</p>
      </section>
      <div className="lesson-tabs">
        {tabs.map(tab => (
          <button key={tab.id} className={`tab-button ${activeTab === tab.id ? 'active' : ''}`} onClick={() => setActiveTab(tab.id as any)}>{tab.label}</button>
        ))}
      </div>
      <div className="lesson-grid single-card">
        {/* SKETCH / EXTRUDE / REVOLVE */}
        {activeTab === 'sketchExtrude' && (
          <div className="lesson-card tab-content">
            <div className="card-header"><h4>SKETCH</h4></div>
            <div className="instruction-box"><p>Tools used to create lines, circles, and arcs in the 3D space for creating section forms for modeling.</p></div>
            <div className="instruction-step">
              <div className="flex-row-wrap">
                <div className="flex-row flex-1">
                  <img src={sketch1} alt="Sketch Example" className="software-screenshot screenshot-small" />
                  <img src={sketchIcon} alt="Sketch Tool" className="software-screenshot screenshot-icon" />
                </div>
                <div className="flex-col-center" style={{ marginLeft: 'auto' }}>
                  <img src={sketchP1} alt="Sketch P1" className="software-screenshot screenshot-small" />
                  <ArrowDown size={32} color="#d32f2f" strokeWidth={2.5} />
                </div>
              </div>
            </div>
            {/* EXTRUDE / REVOLVE Header */}
            <div className="section-divider">
              <div className="card-header card-sub-header"><h4>EXTRUDE / REVOLVE</h4></div>
              <div className="instruction-box" style={{ marginTop: '0.75rem' }}>
                <p>Tools used to create solids from sketch in the 3D space.</p>
              </div>
              <div className="instruction-step">
                <img src={extrudeRevolveMenu} alt="Extrude Revolve Menu" className="software-screenshot screenshot-icon" />
              </div>
            </div>
            {/* EXTRUDE */}
            <div className="section-divider">
              <div className="step-header" style={{ marginBottom: '1rem' }}>
                <span className="step-label step-label-primary">EXTRUDE</span>
              </div>
              <div className="flex-row">
                <div className="flex-1">
                  <div className="instruction-step">
                    <div className="step-header"><span className="step-number">1</span><span className="step-label">Select Extrude from the icon menu.</span></div>
                    <div className="flex-row" style={{ marginTop: '0.75rem', paddingLeft: '2.5rem', flexWrap: 'wrap' }}>
                      <div className="text-center">
                        <img src={extrudeOneSide} alt="Extrusion One Side" className="software-screenshot screenshot-small" />
                        <p className="img-caption">EXTRUSION (ONE SIDE)</p>
                      </div>
                      <div className="text-center">
                        <img src={extrudeBothSide} alt="Extrusion Both Side" className="software-screenshot screenshot-small" />
                        <p className="img-caption">EXTRUSION (BOTH SIDE)</p>
                      </div>
                    </div>
                  </div>
                  <div className="instruction-step">
                    <div className="step-header"><span className="step-number">2</span><span className="step-label">Select the perimeter of the sketch to be extruded &gt; GO</span></div>
                    <p style={{ paddingLeft: '2.5rem' }}>*A hatch will appear indicating the specified area to be extruded.</p>
                    <div className="image-wrapper"><img src={leftClick} alt="Left click" className="software-screenshot screenshot-click" /></div>
                  </div>
                  <div className="instruction-step">
                    <div className="step-header"><span className="step-number">3</span><span className="step-label">Specify the height of extrusion. Can also be set on the item entry.</span></div>
                  </div>
                  <div className="instruction-step">
                    <div className="step-header"><span className="step-number">4</span><span className="step-label">Press <strong>ENTER</strong></span></div>
                  </div>
                </div>
                <div className="flex-row-center flex-no-shrink">
                  <img src={extrudeP1} alt="Extrude P1" className="software-screenshot screenshot-small" />
                  <ArrowRight size={28} color="#d32f2f" strokeWidth={2.5} />
                  <img src={extrudeP2} alt="Extrude P2 Result" className="software-screenshot screenshot-small" />
                </div>
              </div>
            </div>
            {/* REVOLVE */}
            <div className="section-divider">
              <div className="step-header" style={{ marginBottom: '1rem' }}>
                <span className="step-label step-label-primary">REVOLVE</span>
              </div>
              <div className="flex-row">
                <div className="flex-1">
                  <div className="instruction-step">
                    <div className="step-header"><span className="step-number">1</span><span className="step-label">Select Revolve from the icon menu.</span></div>
                    <div className="image-wrapper"><img src={revolveIcon} alt="Revolve Icon" className="software-screenshot screenshot-icon" /></div>
                  </div>
                  <div className="instruction-step">
                    <div className="step-header"><span className="step-number">2</span><span className="step-label">Select the perimeter of the sketch to be revolved &gt; GO</span></div>
                    <div className="image-wrapper"><img src={leftClick} alt="Left click" className="software-screenshot screenshot-click" /></div>
                  </div>
                  <div className="instruction-step">
                    <div className="step-header"><span className="step-number">3</span><span className="step-label">Select the axis of rotation (pick points or edge) &gt; GO</span></div>
                    <p style={{ paddingLeft: '2.5rem' }}>A hatch will appear indicating the specified area to be revolved.</p>
                    <div className="image-wrapper"><img src={leftClick} alt="Left click" className="software-screenshot screenshot-click" /></div>
                  </div>
                </div>
                <div className="flex-col-center flex-no-shrink" style={{ gap: '0.5rem', alignItems: 'flex-start' }}>
                  <div className="flex-col-center">
                    <img src={revolveP1} alt="Revolve P1" className="software-screenshot screenshot-small" />
                    <ArrowDown size={28} color="#d32f2f" strokeWidth={2.5} style={{ marginTop: '3.25rem' }} />
                  </div>
                  <div className="flex-row-center">
                    <img src={revolveP2} alt="Revolve P2" className="software-screenshot screenshot-small" />
                    <ArrowRight size={28} color="#d32f2f" strokeWidth={2.5} />
                    <img src={revolveP3} alt="Revolve P3 Result" className="software-screenshot screenshot-small" />
                  </div>
                </div>
              </div>
            </div>
            <div className="lesson-navigation">
              <button className="nav-button" disabled><ChevronLeft size={18} /> Previous</button>
              <button className="nav-button next" onClick={handleNext}>Next <ChevronRight size={18} /></button>
            </div>
          </div>
        )}
        {/* SHOW / HIDE */}
        {activeTab === 'showHide' && (
          <div className="lesson-card tab-content">
            <div className="card-header"><h4>SHOW / HIDE</h4></div>
            <div className="instruction-step">
              <p className="p-flush" style={{ marginTop: '0.5rem' }}>Tools used to switch between displaying and hiding entities.</p>
              <div className="image-wrapper-flush"><img src={showHideMenu} alt="Show/Hide Menu" className="software-screenshot screenshot-small" /></div>
            </div>
            <div className="instruction-step" style={{ marginTop: '1rem' }}>
              <div className="step-header"><span className="step-label step-label-blue">SHOW / HIDE ENTITY</span></div>
              <p className="p-flush">1. Select <strong>Show/Hide</strong> from the icon menu.</p>
              <img src={showHideEntity} alt="Show/Hide Entity Icon" className="software-screenshot screenshot-icon" style={{ marginLeft: 0, marginBottom: '0.5rem' }} />
              <p className="p-flush">2. Select the entities for showing/hiding &gt; GO</p>
              <img src={leftClick} alt="Left click" className="software-screenshot screenshot-click" style={{ marginLeft: 0 }} />
            </div>
            <div className="instruction-step section-divider-sm">
              <div className="step-header"><span className="step-label step-label-blue">SHOW / HIDE DRAFTING ENTITY</span></div>
              <p className="p-flush">1. Select <strong>Show/Hide Drafting Entity</strong> from the icon menu.</p>
              <img src={showHideDraftingEntity} alt="Show/Hide Drafting Entity Icon" className="software-screenshot screenshot-icon" style={{ marginLeft: 0, marginBottom: '0.5rem' }} />
              <p className="p-flush">2. Right-click to show/hide all drafting entities. <br />Drafting Entities includes:</p>
              <div className="image-wrapper-flush"><img src={draftingEntitiesTable} alt="Drafting Entities Diagram" className="software-screenshot screenshot-wide" style={{ marginTop: '0.5rem' }} /></div>
            </div>
            <div className="instruction-step section-divider-sm">
              <div className="step-header"><span className="step-label step-label-blue">HIDE UNSELECTED ENTITY</span></div>
              <div className="flex-row">
                <div className="flex-1">
                  <p className="p-flush">1. Select <strong>Hide Unselected Entity</strong> from the icon menu.</p>
                  <img src={hideUnselectedEntity} alt="Hide Unselected Entity Icon" className="software-screenshot screenshot-icon" style={{ marginLeft: 0, marginBottom: '0.5rem' }} />
                  <p className="p-flush">2. Select all entities to be retained &gt; GO <br />All unselected will be hidden.</p>
                  <img src={leftClick} alt="Left click" className="software-screenshot screenshot-click" style={{ marginLeft: 0 }} />
                </div>
                <img src={hideUnselectedEntity1} alt="Hide Unselected Entity Example" className="software-screenshot screenshot-medium flex-no-shrink" />
              </div>
            </div>
            <div className="lesson-navigation">
              <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button>
              <button className="nav-button next" onClick={handleNext}>Next <ChevronRight size={18} /></button>
            </div>
          </div>
        )}
        {/* STRETCH */}
        {activeTab === 'stretch' && (
          <div className="lesson-card tab-content">
            <div className="card-header"><h4>STRETCH</h4></div>
            <div className="instruction-step">
              <div className="step-header"><span className="step-number">1</span><span className="step-label">Select Tool</span></div>
              <p>Select <strong>Stretch</strong> from the icon menu.</p>
              <img src={stretchIcon} alt="Stretch Icon" className="software-screenshot screenshot-icon" />
            </div>
            <div className="instruction-step">
              <div className="step-header"><span className="step-number">2</span><span className="step-label">Select Entity</span></div>
              <p>Left-click to select the face to be stretched &gt; GO</p>
              <img src={leftClick} alt="Left click" className="software-screenshot screenshot-click" />
            </div>
            <div className="instruction-step">
              <div className="step-header"><span className="step-number">3</span><span className="step-label">Specify Stretch Length</span></div>
              <p>Specify the additional length of stretch on the item entry. Press Enter.</p>
              <div className="image-wrapper"><img src={stretchItemEntry} alt="Stretch Item Entry" className="software-screenshot screenshot-wide" /></div>
            </div>
            <div className="image-wrapper" style={{ paddingLeft: 0, marginTop: '0.75rem' }}>
              <img src={stretch1} alt="Stretch Drag Example" className="software-screenshot screenshot-large" />
            </div>
            <div className="instruction-step section-divider-sm">
              <div className="step-header"><span className="step-label step-label-primary">OR</span></div>
              <p style={{ paddingLeft: 0 }}>Select face &gt; Drag &gt; Left-click on the 3D Space.</p>
              <p style={{ paddingLeft: 0 }}>A linear scale will appear on the 3D space.<br />Specify the additional length of stretch &gt; Press Enter or Left-Click on the scale.</p>
            </div>
            <div className="image-wrapper" style={{ paddingLeft: 0, marginTop: '0.75rem' }}>
              <img src={stretch2} alt="Stretch Scale Example" className="software-screenshot screenshot-large" />
            </div>
            <div className="lesson-navigation">
              <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button>
              <button className="nav-button next" onClick={handleNext}>Next <ChevronRight size={18} /></button>
            </div>
          </div>
        )}
        {/* RESIZE */}
        {activeTab === 'resize' && (
          <div className="lesson-card tab-content">
            <div className="card-header"><h4>RESIZE</h4></div>
            <div className="instruction-step">
              <div className="step-header"><span className="step-number">1</span><span className="step-label">Select Tool</span></div>
              <p>Select <strong>Resize</strong> from the icon menu.</p>
              <img src={resizeIcon} alt="Resize Icon" className="software-screenshot screenshot-icon" />
            </div>
            <div className="instruction-step">
              <div className="step-header"><span className="step-number">2</span><span className="step-label">Select Entity</span></div>
              <p>Left-click on the entity to be resized &gt; GO</p>
              <img src={leftClick} alt="Left click" className="software-screenshot screenshot-click" />
            </div>
            <div className="instruction-step">
              <div className="step-header"><span className="step-number">3</span><span className="step-label">Scale Up/Down</span></div>
              <p>Using resize allows the user to scale up or scale down the size of the solid entry. <br />Specifiy the scale on the item entry &gt; Left click on the 3D Space.</p>
              <div className="flex-row-center" style={{ flexWrap: 'wrap', gap: '5.5rem' }}>
                <img src={resizeItemEntry} alt="Resize Item Entry" className="software-screenshot flex-no-shrink" style={{ maxWidth: '150px' }} />
                <img src={resize3_2} alt="Resize Scale Result" className="software-screenshot flex-no-shrink" style={{ maxWidth: '450px' }} />
              </div>
            </div>
            <div className="lesson-navigation">
              <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button>
              <button className="nav-button next" disabled>Finish <ChevronRight size={18} /></button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/* ── Basic Operation (4): Arrange Machine Part / Shape Steels ── */
const BasicOperation4: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'shapeSteels'>('shapeSteels');
  const tabs = [{ id: 'shapeSteels', label: 'Shape Steels' }];
  return (
    <div className="course-lesson-container">
      <section className="lesson-intro">
        <h3>BASIC OPERATION (4)</h3>
        <p>In this lesson, we will focus on creating structured components using the <strong>Arrange Machine Part</strong> tool, specifically exploring <strong>Shape Steels</strong>.</p>
      </section>
      <div className="lesson-tabs">
        {tabs.map(tab => (
          <button key={tab.id} className={`tab-button ${activeTab === tab.id ? 'active' : ''}`} onClick={() => setActiveTab(tab.id as any)}>{tab.label}</button>
        ))}
      </div>
      <div className="lesson-grid single-card">
        {activeTab === 'shapeSteels' && (
          <div className="lesson-card tab-content">
            <div className="card-header"><h4>CREATING SHAPE STEELS</h4></div>
            <div className="instruction-step">
              <div className="image-wrapper-flush" style={{ marginBottom: '1rem' }}>
                <img src={shapeSteels1} alt="Shape Steels Overview" className="software-screenshot screenshot-medium" />
              </div>
              <p><strong>Shape Steels includes:</strong></p>
              <div className="image-wrapper full-width"><img src={shapeSteelsTypes} alt="Shape Steels Options" className="software-screenshot screenshot-wide" /></div>
            </div>
            <div className="instruction-step">
              <div className="step-header"><span className="step-number">1</span><span className="step-label">Select Tool</span></div>
              <p>Select <strong>Arrange Machine Part</strong> from the icon menu.</p>
              <img src={arrangeMachinePartMenu} alt="Arrange Machine Part Menu" className="software-screenshot screenshot-icon" />
            </div>
            <div className="instruction-step">
              <div className="step-header"><span className="step-number">2</span><span className="step-label">Configure Part</span></div>
              <p>The Arrange Machine Part window will appear. Select and provide the necessary specifications &gt; Press <strong>OK</strong></p>
              <div className="image-wrapper full-width"><img src={arrangeMachinePartWindow} alt="Arrange Machine Part Window" className="software-screenshot screenshot-wide" /></div>
            </div>
            <div className="instruction-step">
              <div className="step-header"><span className="step-number">3</span><span className="step-label">Set Origin Position</span></div>
              <p>In the Key Entry Area, enter the coordinates for the position (origin point). For example, <span className="code-inline">0 0 0</span>.</p>
              <div className="flex-row-center" style={{ flexWrap: 'wrap' }}>
                <img src={keyEntryArea} alt="Key Entry Area" className="software-screenshot screenshot-small" />
                <img src={shapeSteels2} alt="Shape Steels Result" className="software-screenshot screenshot-medium flex-no-shrink" />
              </div>
            </div>
            <div className="lesson-navigation">
              <button className="nav-button" disabled><ChevronLeft size={18} /> Previous</button>
              <button className="nav-button next" disabled>Finish <ChevronRight size={18} /></button>
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
interface BasicOperationLessonProps {
  subLessonId: string;
}

const BasicOperationLesson: React.FC<BasicOperationLessonProps> = ({ subLessonId }) => {
  switch (subLessonId) {
    case 'basic-op-1': return <BasicOperation1 />;
    case 'basic-op-2': return <BasicOperation2 />;
    case 'basic-op-3': return <BasicOperation3 />;
    case 'basic-op-4': return <BasicOperation4 />;
    default: return <BasicOperation1 />;
  }
};

export default BasicOperationLesson;
