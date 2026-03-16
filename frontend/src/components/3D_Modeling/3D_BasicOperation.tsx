
import React, { useState, useEffect, useRef } from 'react';
import { MousePointer2, Keyboard, Box as BoxIcon, Circle, ChevronLeft, ChevronRight, ArrowDown, ArrowRight, Info, CheckCircle2, Zap } from 'lucide-react';
import '../../styles/3D_Modeling/CourseLesson.css';


// ── Shared Asset Imports ──────────────────────────────────────────────────
import leftClick from '../../assets/3D_Image_File/left_click.jpg';

// ══════════════════════════════════════════════════════════════════════════
// Basic Operation (1) — CREATING BASIC SHAPES
// Lesson-item child ID: 'basic-op-1'
// Tabs: Cylinder | Box | Polygon | Cone | Torus
// ══════════════════════════════════════════════════════════════════════════
import cmdMenu from '../../assets/3D_Image_File/basic_operation(1)_command_menu.jpg';
import threeDView from '../../assets/3D_Image_File/basic_operation(1)_3d_view.jpg';
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
import sketchIcon from '../../assets/3D_Image_File/basic_operation(4)_sketch.jpg';
import extrudeRevolveMenu from '../../assets/3D_Image_File/basic_operation(4)_extrude_revolve.jpg';
import extrudeOneSide from '../../assets/3D_Image_File/basic_operation(4)_extrusion_oneside.jpg'; // cspell:disable-line
import extrudeBothSide from '../../assets/3D_Image_File/basic_operation(4)_extrusion_bothside.jpg'; // cspell:disable-line
import revolveIcon from '../../assets/3D_Image_File/basic_operation(4)_revolve.jpg';
import revolveP1 from '../../assets/3D_Image_File/basic_operation(4)_revolve_p1.png';
import showHideMenu from '../../assets/3D_Image_File/basic_operation(4)_show_hide.jpg';
import showHideEntity from '../../assets/3D_Image_File/basic_operation(4)_show_hide_entity.jpg';
import showHideDraftingEntity from '../../assets/3D_Image_File/basic_operation(4)_showhide_drafting_entity.jpg'; // cspell:disable-line
import hideUnselectedEntity from '../../assets/3D_Image_File/basic_operation(4)_hide_unselected_entity.jpg';
import hideUnselectedEntity1 from '../../assets/3D_Image_File/basic_operation(4)_hide_unselected_entity_1.jpg';
import draftingEntitiesTable from '../../assets/3D_Image_File/basic_operation(4)_drafting_entities.jpg';
import stretchIcon from '../../assets/3D_Image_File/basic_operation(5)_stretch.jpg';
import stretchItemEntry from '../../assets/3D_Image_File/basic_operation(5)_item_entry_stretch.jpg';
import stretchImg1 from '../../assets/3D_Image_File/basic_operation(5)_stretch1.jpg';
import stretchImg2 from '../../assets/3D_Image_File/basic_operation(5)_stretch2.jpg';
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
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const element = containerRef.current;
      const totalHeight = element.scrollHeight - element.clientHeight;
      if (totalHeight === 0) {
        setScrollProgress(100);
        return;
      }
      const progress = (element.scrollTop / totalHeight) * 100;
      setScrollProgress(progress);
    };

    const currentContainer = containerRef.current;
    if (currentContainer) {
      currentContainer.addEventListener('scroll', handleScroll);
      handleScroll();
    }

    return () => {
      if (currentContainer) {
        currentContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, [activeTab]);

  const toggleStep = (stepId: string) => {
    setCompletedSteps(prev => {
      const next = new Set(prev);
      if (next.has(stepId)) next.delete(stepId);
      else next.add(stepId);
      return next;
    });
  };

  const getStepClass = (stepId: string) => {
    return `instruction-step interactive ${completedSteps.has(stepId) ? 'completed' : ''}`;
  };

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
    <div className="course-lesson-container" ref={containerRef}>
      {/* Sticky Progress Bar */}
      <div className="lesson-progress-container">
        <div
          className="lesson-progress-bar"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
      <section className="lesson-intro">
        <h3 className="section-title"><BoxIcon size={28} className="lesson-intro-icon" /> CREATING BASIC SHAPES</h3>
        <p>When creating a 3D model, always start with the <strong>Front View</strong>.</p>
        <div className="image-wrapper-flush">
          <img src={threeDView} alt="3D View" className="software-screenshot screenshot-medium" />
        </div>
        <div className="instruction-box">
          <p>On the command menu: <strong>[Arrange Solid]</strong> &gt; <strong>[Select Y Orientation]</strong></p>
          <div className="flex-row-center--wrap" style={{ marginTop: '1rem', gap: '1.5rem' }}>
            <div className="image-wrapper-flush">
              <img src={cmdMenu} alt="Command Menu" className="software-screenshot screenshot-small" />
            </div>
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

            <div className={getStepClass('b1-1')} onClick={() => toggleStep('b1-1')}>
              <div className="step-header">
                <span className={`step-number ${completedSteps.has('b1-1') ? 'completed' : ''}`}>
                  {completedSteps.has('b1-1') ? <CheckCircle2 size={16} /> : '1'}
                </span>
                <span className="step-label">Select Shape</span>
              </div>
              <div className="step-description" style={{ paddingLeft: '2.5rem' }}>
                <p className="p-flush">Select <strong className="text-highlight">Arrange Cylinder</strong> from the icon menu.</p>
                <div className="image-wrapper-flush" style={{ marginTop: '0.8rem' }}>
                  <img src={arrangeCylinder} alt="Arrange Cylinder icon" className="software-screenshot screenshot-medium" />
                </div>
              </div>
            </div>

            <div className={getStepClass('b1-2')} onClick={() => toggleStep('b1-2')}>
              <div className="step-header">
                <span className={`step-number ${completedSteps.has('b1-2') ? 'completed' : ''}`}>
                  {completedSteps.has('b1-2') ? <CheckCircle2 size={16} /> : '2'}
                </span>
                <span className="step-label">Dimension Entry</span>
              </div>
              <div className="step-description" style={{ paddingLeft: '2.5rem' }}>
                <p className="p-flush">On the bottom left corner, the <strong className="text-highlight">item entry</strong> can be located.</p>
                <div className="image-wrapper-flush" style={{ marginTop: '0.8rem' }}>
                  <img src={itemEntry} alt="Item Entry Cylinder" className="software-screenshot screenshot-wide" />
                </div>
                <p style={{ marginTop: '1rem' }}>Specify the diameter and height of cylinder on the item entry.</p>
              </div>
            </div>

            <div className={getStepClass('b1-3')} onClick={() => toggleStep('b1-3')}>
              <div className="step-header">
                <span className={`step-number ${completedSteps.has('b1-3') ? 'completed' : ''}`}>
                  {completedSteps.has('b1-3') ? <CheckCircle2 size={16} /> : '3'}
                </span>
                <span className="step-label">Set Origin</span>
              </div>
              <div className="step-description" style={{ paddingLeft: '2.5rem' }}>
                <p className="p-flush">In the <strong className="text-highlight">Key Entry Area</strong>, enter the coordinates for the position (origin).</p>
                <div className="image-wrapper-flush" style={{ marginTop: '0.8rem' }}>
                  <img src={keyEntry} alt="Key Entry" className="software-screenshot screenshot-small" />
                </div>
              </div>
            </div>
            <div style={{ marginTop: '1.5rem' }}>
              <div className="card-header"><h4>PREVIEW</h4></div>
              <div className="image-wrapper-flush" style={{ marginTop: '1rem' }}>
                <img src={cylinderResult} alt="Cylinder Preview" className="software-screenshot screenshot-medium" />
              </div>
            </div>

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

            <div className={getStepClass('b1b-1')} onClick={() => toggleStep('b1b-1')}>
              <div className="step-header">
                <span className={`step-number ${completedSteps.has('b1b-1') ? 'completed' : ''}`}>
                  {completedSteps.has('b1b-1') ? <CheckCircle2 size={16} /> : '1'}
                </span>
                <span className="step-label">Select Shape</span>
              </div>
              <div className="step-description" style={{ paddingLeft: '2.5rem' }}>
                <p className="p-flush">Select <strong className="text-highlight">Arrange Box</strong> from the icon menu.</p>
                <div className="image-wrapper-flush" style={{ marginTop: '0.8rem' }}>
                  <img src={arrangeBox} alt="Arrange Box icon" className="software-screenshot screenshot-medium" />
                </div>
              </div>
            </div>

            <div className={getStepClass('b1b-2')} onClick={() => toggleStep('b1b-2')}>
              <div className="step-header">
                <span className={`step-number ${completedSteps.has('b1b-2') ? 'completed' : ''}`}>
                  {completedSteps.has('b1b-2') ? <CheckCircle2 size={16} /> : '2'}
                </span>
                <span className="step-label">Dimension Entry</span>
              </div>
              <div className="step-description" style={{ paddingLeft: '2.5rem' }}>
                <p className="p-flush">Specify the <strong className="text-highlight">depth, width and height</strong> of the box on the item entry.</p>
                <div className="image-wrapper-flush" style={{ marginTop: '0.8rem' }}>
                  <img src={itemEntry} alt="Item Entry Box" className="software-screenshot screenshot-wide" />
                </div>
              </div>
            </div>

            <div className={getStepClass('b1b-3')} onClick={() => toggleStep('b1b-3')}>
              <div className="step-header">
                <span className={`step-number ${completedSteps.has('b1b-3') ? 'completed' : ''}`}>
                  {completedSteps.has('b1b-3') ? <CheckCircle2 size={16} /> : '3'}
                </span>
                <span className="step-label">Set Origin</span>
              </div>
              <div className="step-description" style={{ paddingLeft: '2.5rem' }}>
                <p className="p-flush">In the <strong className="text-highlight">Key Entry Area</strong>, enter the coordinates for the position (origin).</p>
                <div className="image-wrapper-flush" style={{ marginTop: '0.8rem' }}>
                  <img src={keyEntry} alt="Key Entry Box" className="software-screenshot screenshot-small" />
                </div>
              </div>
            </div>

            <div style={{ marginTop: '1.5rem' }}>
              <div className="card-header"><h4>PREVIEW</h4></div>
              <div className="image-wrapper-flush" style={{ marginTop: '1rem' }}>
                <img src={boxResult} alt="Box Preview" className="software-screenshot screenshot-medium" />
              </div>
            </div>


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

            <div className={getStepClass('b1p-1')} onClick={() => toggleStep('b1p-1')}>
              <div className="step-header">
                <span className={`step-number ${completedSteps.has('b1p-1') ? 'completed' : ''}`}>
                  {completedSteps.has('b1p-1') ? <CheckCircle2 size={16} /> : '1'}
                </span>
                <span className="step-label">Select Shape</span>
              </div>
              <div className="step-description" style={{ paddingLeft: '2.5rem' }}>
                <p className="p-flush">Select <strong className="text-highlight">Arrange Polygonal Prism</strong> from the icon menu.</p>
                <div className="image-wrapper-flush" style={{ marginTop: '0.8rem' }}>
                  <img src={arrangePolygon} alt="Arrange Polygon icon" className="software-screenshot screenshot-medium" />
                </div>
              </div>
            </div>

            <div className={getStepClass('b1p-2')} onClick={() => toggleStep('b1p-2')}>
              <div className="step-header">
                <span className={`step-number ${completedSteps.has('b1p-2') ? 'completed' : ''}`}>
                  {completedSteps.has('b1p-2') ? <CheckCircle2 size={16} /> : '2'}
                </span>
                <span className="step-label">Dimension Entry</span>
              </div>
              <div className="step-description" style={{ paddingLeft: '2.5rem' }}>
                <p className="p-flush">Specify the number of sides, diameter (circumscribed) and height of the polygon on the item entry.</p>
                <div className="image-wrapper-flush" style={{ marginTop: '0.8rem' }}>
                  <img src={itemEntryPolygon} alt="Item Entry Polygon" className="software-screenshot screenshot-wide" />
                </div>
              </div>
            </div>

            <div className={getStepClass('b1p-3')} onClick={() => toggleStep('b1p-3')}>
              <div className="step-header">
                <span className={`step-number ${completedSteps.has('b1p-3') ? 'completed' : ''}`}>
                  {completedSteps.has('b1p-3') ? <CheckCircle2 size={16} /> : '3'}
                </span>
                <span className="step-label">Set Origin</span>
              </div>
              <div className="step-description" style={{ paddingLeft: '2.5rem' }}>
                <p className="p-flush">In the <strong className="text-highlight">Key Entry Area</strong>, enter the coordinates for the position (origin).</p>
                <div className="image-wrapper-flush" style={{ marginTop: '0.8rem' }}>
                  <img src={keyEntry} alt="Key Entry Polygon" className="software-screenshot screenshot-small" />
                </div>
              </div>
            </div>

            <div style={{ marginTop: '1.5rem' }}>
              <div className="card-header"><h4>PREVIEW</h4></div>
              <div className="image-wrapper-flush" style={{ marginTop: '1rem' }}>
                <img src={polygonResult} alt="Polygon Preview" className="software-screenshot screenshot-medium" />
              </div>
            </div>


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

            <div className={getStepClass('b1c-1')} onClick={() => toggleStep('b1c-1')}>
              <div className="step-header">
                <span className={`step-number ${completedSteps.has('b1c-1') ? 'completed' : ''}`}>
                  {completedSteps.has('b1c-1') ? <CheckCircle2 size={16} /> : '1'}
                </span>
                <span className="step-label">Select Shape</span>
              </div>
              <div className="step-description" style={{ paddingLeft: '2.5rem' }}>
                <p className="p-flush">Select <strong className="text-highlight">Arrange Cone</strong> from the icon menu.</p>
                <div className="image-wrapper-flush" style={{ marginTop: '0.8rem' }}>
                  <img src={arrangeCone} alt="Arrange Cone icon" className="software-screenshot screenshot-medium" />
                </div>
              </div>
            </div>

            <div className={getStepClass('b1c-2')} onClick={() => toggleStep('b1c-2')}>
              <div className="step-header">
                <span className={`step-number ${completedSteps.has('b1c-2') ? 'completed' : ''}`}>
                  {completedSteps.has('b1c-2') ? <CheckCircle2 size={16} /> : '2'}
                </span>
                <span className="step-label">Dimension Entry</span>
              </div>
              <div className="step-description" style={{ paddingLeft: '2.5rem' }}>
                <p className="p-flush">Specify the number of sides, base diameter (circumscribed), top face diameter (circumscribed) and height on the item entry.</p>
                <div className="image-wrapper-flush" style={{ marginTop: '0.8rem' }}>
                  <img src={itemEntryCone} alt="Item Entry Cone" className="software-screenshot screenshot-wide" />
                </div>
              </div>
            </div>

            <div className={getStepClass('b1c-3')} onClick={() => toggleStep('b1c-3')}>
              <div className="step-header">
                <span className={`step-number ${completedSteps.has('b1c-3') ? 'completed' : ''}`}>
                  {completedSteps.has('b1c-3') ? <CheckCircle2 size={16} /> : '3'}
                </span>
                <span className="step-label">Set Origin</span>
              </div>
              <div className="step-description" style={{ paddingLeft: '2.5rem' }}>
                <p className="p-flush">On the <strong className="text-highlight">Key Entry Area</strong>, enter the coordinates for the position (origin).</p>
                <div className="image-wrapper-flush" style={{ marginTop: '0.8rem' }}>
                  <img src={keyEntry} alt="Key Entry" className="software-screenshot screenshot-small" />
                </div>
              </div>
            </div>

            <div style={{ marginTop: '1.5rem' }}>
              <div className="card-header"><h4>PREVIEW</h4></div>
              <div className="image-wrapper-flush" style={{ marginTop: '1rem' }}>
                <img src={coneResult} alt="Cone Preview" className="software-screenshot screenshot-medium" />
              </div>
            </div>

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

            <div className={getStepClass('b1t-1')} onClick={() => toggleStep('b1t-1')}>
              <div className="step-header">
                <span className={`step-number ${completedSteps.has('b1t-1') ? 'completed' : ''}`}>
                  {completedSteps.has('b1t-1') ? <CheckCircle2 size={16} /> : '1'}
                </span>
                <span className="step-label">Select Shape</span>
              </div>
              <div className="step-description" style={{ paddingLeft: '2.5rem' }}>
                <p className="p-flush">Select <strong className="text-highlight">Arrange Torus</strong> from the icon menu.</p>
                <div className="image-wrapper-flush" style={{ marginTop: '0.8rem' }}>
                  <img src={arrangeTorus} alt="Arrange Torus icon" className="software-screenshot screenshot-medium" />
                </div>
              </div>
            </div>

            <div className={getStepClass('b1t-2')} onClick={() => toggleStep('b1t-2')}>
              <div className="step-header">
                <span className={`step-number ${completedSteps.has('b1t-2') ? 'completed' : ''}`}>
                  {completedSteps.has('b1t-2') ? <CheckCircle2 size={16} /> : '2'}
                </span>
                <span className="step-label">Dimension Entry</span>
              </div>
              <div className="step-description" style={{ paddingLeft: '2.5rem' }}>
                <p className="p-flush">Specify the section diameter on the item entry.</p>
                <div className="image-wrapper-flush" style={{ marginTop: '0.8rem' }}>
                  <img src={itemEntryTorus} alt="Item Entry Torus" className="software-screenshot screenshot-wide" />
                </div>
              </div>
            </div>

            <div className={getStepClass('b1t-3')} onClick={() => toggleStep('b1t-3')}>
              <div className="step-header">
                <span className={`step-number ${completedSteps.has('b1t-2') ? 'completed' : ''}`}>
                  {completedSteps.has('b1t-3') ? <CheckCircle2 size={16} /> : '3'}
                </span>
                <span className="step-label">Set Origin</span>
              </div>
              <div className="step-description" style={{ paddingLeft: '2.5rem' }}>
                <p className="p-flush">In the <strong className="text-highlight">Key Entry Area</strong>, enter the coordinates for the position (origin).</p>
                <div className="image-wrapper-flush" style={{ marginTop: '0.8rem' }}>
                  <img src={keyEntry} alt="Key Entry Torus" className="software-screenshot screenshot-small" />
                </div>
              </div>
            </div>

            <div style={{ marginTop: '1.5rem' }}>
              <div className="card-header"><h4>PREVIEW</h4></div>
              <div className="image-wrapper-flush" style={{ marginTop: '1rem' }}>
                <img src={torusResult} alt="Torus Preview" className="software-screenshot screenshot-medium" />
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

/* ── Basic Operation (2): Move, Rotate, Copy, Mirror, Delete ── */
const BasicOperation2: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'move' | 'copy' | 'mirror' | 'rotate' | 'rotateCopy' | 'mirrorCopy' | 'delete'>('move');
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const element = containerRef.current;
      const totalHeight = element.scrollHeight - element.clientHeight;
      if (totalHeight === 0) {
        setScrollProgress(100);
        return;
      }
      const progress = (element.scrollTop / totalHeight) * 100;
      setScrollProgress(progress);
    };

    const currentContainer = containerRef.current;
    if (currentContainer) {
      currentContainer.addEventListener('scroll', handleScroll);
      handleScroll();
    }

    return () => {
      if (currentContainer) {
        currentContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, [activeTab]);

  const toggleStep = (stepId: string) => {
    setCompletedSteps(prev => {
      const next = new Set(prev);
      if (next.has(stepId)) next.delete(stepId);
      else next.add(stepId);
      return next;
    });
  };

  const getStepClass = (stepId: string) => {
    return `instruction-step interactive ${completedSteps.has(stepId) ? 'completed' : ''}`;
  };

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
    <div className="course-lesson-container" ref={containerRef}>
      {/* Sticky Progress Bar */}
      <div className="lesson-progress-container">
        <div
          className="lesson-progress-bar"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
      <section className="lesson-intro">
        <h3 className="section-title">MOVE, ROTATE, COPY, MIRROR, DELETE</h3>
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

            <div className={getStepClass('b2m-1')} onClick={() => toggleStep('b2m-1')}>
              <div className="step-header">
                <span className={`step-number ${completedSteps.has('b2m-1') ? 'completed' : ''}`}>
                  {completedSteps.has('b2m-1') ? <CheckCircle2 size={16} /> : '1'}
                </span>
                <span className="step-label">Select Move</span>
              </div>
              <div className="step-description" style={{ paddingLeft: '2.5rem' }}>
                <p className="p-flush">Select <strong className="text-highlight">Move</strong> from the icon menu.</p>
                <div className="image-wrapper-flush" style={{ marginTop: '0.8rem' }}>
                  <img src={moveMenu} alt="Move menu icon" className="software-screenshot screenshot-small" />
                </div>
              </div>
            </div>

            <div className={getStepClass('b2m-2')} onClick={() => toggleStep('b2m-2')}>
              <div className="step-header">
                <span className={`step-number ${completedSteps.has('b2m-2') ? 'completed' : ''}`}>
                  {completedSteps.has('b2m-2') ? <CheckCircle2 size={16} /> : '2'}
                </span>
                <span className="step-label">Select Entity</span>
              </div>
              <div className="step-description" style={{ paddingLeft: '2.5rem' }}>
                <p className="p-flush">
                  Left-click on the entity to be move &gt; GO <img src={leftClick} alt="Left click" className="software-screenshot screenshot-click--inline" style={{ verticalAlign: 'middle', marginLeft: '0.25rem' }} />
                </p>
              </div>
            </div>

            <div className={getStepClass('b2m-3')} onClick={() => toggleStep('b2m-3')}>
              <div className="step-header">
                <span className={`step-number ${completedSteps.has('b2m-3') ? 'completed' : ''}`}>
                  {completedSteps.has('b2m-3') ? <CheckCircle2 size={16} /> : '3'}
                </span>
                <span className="step-label">Movement Distance</span>
              </div>
              <div className="step-description" style={{ paddingLeft: '2.5rem' }}>
                <p className="p-flush">Specify the movement distance on the <strong className="text-highlight">X, Y, and Z-axis</strong> on the item entry. Press Enter.</p>
                <div className="image-wrapper-flush" style={{ marginTop: '0.8rem' }}>
                  <img src={itemEntryMove} alt="Item Entry Move" className="software-screenshot screenshot-wide" />
                </div>
              </div>
            </div>

            <div style={{ marginTop: '1.5rem' }}>
              <div className="card-header"><h4>RESULT</h4></div>
              <div className="image-wrapper-flush" style={{ marginTop: '1rem' }}>
                <img src={moveResult} alt="Move Preview" className="software-screenshot screenshot-large" />
              </div>
            </div>

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

            <div className={getStepClass('b2r-1')} onClick={() => toggleStep('b2r-1')}>
              <div className="step-header">
                <span className={`step-number ${completedSteps.has('b2r-1') ? 'completed' : ''}`}>
                  {completedSteps.has('b2r-1') ? <CheckCircle2 size={16} /> : '1'}
                </span>
                <span className="step-label">Select Tool</span>
              </div>
              <div className="step-description" style={{ paddingLeft: '2.5rem' }}>
                <p className="p-flush">Select <strong className="text-highlight">Rotate</strong> from the icon menu.</p>
                <div className="image-wrapper-flush" style={{ marginTop: '0.8rem' }}>
                  <img src={rotateIcon} alt="Rotate icon" className="software-screenshot screenshot-small" />
                </div>
              </div>
            </div>

            <div className={getStepClass('b2r-2')} onClick={() => toggleStep('b2r-2')}>
              <div className="step-header">
                <span className={`step-number ${completedSteps.has('b2r-2') ? 'completed' : ''}`}>
                  {completedSteps.has('b2r-2') ? <CheckCircle2 size={16} /> : '2'}
                </span>
                <span className="step-label">Select Entity</span>
              </div>
              <div className="step-description" style={{ paddingLeft: '2.5rem' }}>
                <p className="p-flush">
                  Left-click on the entity to be rotate &gt; GO <img src={leftClick} alt="Left click" className="software-screenshot screenshot-click--inline" style={{ verticalAlign: 'middle', marginLeft: '0.25rem' }} />
                </p>
              </div>
            </div>

            <div className={getStepClass('b2r-3')} onClick={() => toggleStep('b2r-3')}>
              <div className="step-header">
                <span className={`step-number ${completedSteps.has('b2r-3') ? 'completed' : ''}`}>
                  {completedSteps.has('b2r-3') ? <CheckCircle2 size={16} /> : '3'}
                </span>
                <span className="step-label">Set Axis</span>
              </div>
              <div className="step-description" style={{ paddingLeft: '2.5rem' }}>
                <p className="p-flush">Select 2-points to set the axis of rotation.</p>
                <div className="image-wrapper-flush" style={{ marginTop: '0.8rem' }}>
                  <img src={rotateAxis} alt="Axis of Rotation" className="software-screenshot screenshot-medium" />
                </div>
              </div>
            </div>

            <div className={getStepClass('b2r-4')} onClick={() => toggleStep('b2r-4')}>
              <div className="step-header">
                <span className={`step-number ${completedSteps.has('b2r-4') ? 'completed' : ''}`}>
                  {completedSteps.has('b2r-4') ? <CheckCircle2 size={16} /> : '4'}
                </span>
                <span className="step-label">Set Angle</span>
              </div>
              <div className="step-description" style={{ paddingLeft: '2.5rem' }}>
                <p className="p-flush">Specify the desired angle of rotation on the item entry &gt; Press Enter</p>
                <div className="image-wrapper-flush" style={{ marginTop: '0.8rem' }}>
                  <img src={rotateEntry} alt="Rotate Item Entry" className="software-screenshot screenshot-large" />
                </div>
              </div>
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

            <div className={getStepClass('b2mir-1')} onClick={() => toggleStep('b2mir-1')}>
              <div className="step-header">
                <span className={`step-number ${completedSteps.has('b2mir-1') ? 'completed' : ''}`}>
                  {completedSteps.has('b2mir-1') ? <CheckCircle2 size={16} /> : '1'}
                </span>
                <span className="step-label">Select Tool</span>
              </div>
              <div className="step-description" style={{ paddingLeft: '2.5rem' }}>
                <p className="p-flush">Select <strong className="text-highlight">Mirror</strong> from the icon menu.</p>
                <div className="image-wrapper-flush" style={{ marginTop: '0.8rem' }}>
                  <img src={mirrorIcon} alt="Mirror icon" className="software-screenshot screenshot-small" />
                </div>
              </div>
            </div>

            <div className={getStepClass('b2mir-2')} onClick={() => toggleStep('b2mir-2')}>
              <div className="step-header">
                <span className={`step-number ${completedSteps.has('b2mir-2') ? 'completed' : ''}`}>
                  {completedSteps.has('b2mir-2') ? <CheckCircle2 size={16} /> : '2'}
                </span>
                <span className="step-label">Select Entity</span>
              </div>
              <div className="step-description" style={{ paddingLeft: '2.5rem' }}>
                <p className="p-flush">
                  Left-click on the entity to be mirror &gt; GO <img src={leftClick} alt="Left click" className="software-screenshot screenshot-click--inline" style={{ verticalAlign: 'middle', marginLeft: '0.25rem' }} />
                </p>
              </div>
            </div>

            <div className={getStepClass('b2mir-3')} onClick={() => toggleStep('b2mir-3')}>
              <div className="step-header">
                <span className={`step-number ${completedSteps.has('b2mir-3') ? 'completed' : ''}`}>
                  {completedSteps.has('b2mir-3') ? <CheckCircle2 size={16} /> : '3'}
                </span>
                <span className="step-label">Set Plane</span>
              </div>
              <div className="step-description" style={{ paddingLeft: '2.5rem' }}>
                <p className="p-flush">Select <strong className="text-highlight">3-points</strong> to set the plane where the entity will be mirrored or <strong className="text-highlight">left-click</strong> on the face where the entity will be mirrored.</p>
              </div>
            </div>

            <div style={{ marginTop: '1.5rem' }}>
              <div className="card-header"><h4>RESULT</h4></div>
              <div className="image-wrapper-flush" style={{ marginTop: '1rem' }}>
                <img src={mirrorResult} alt="Mirror Result" className="software-screenshot screenshot-medium" />
              </div>
            </div>

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

            <div className={getStepClass('b2c-1')} onClick={() => toggleStep('b2c-1')}>
              <div className="step-header">
                <span className={`step-number ${completedSteps.has('b2c-1') ? 'completed' : ''}`}>
                  {completedSteps.has('b2c-1') ? <CheckCircle2 size={16} /> : '1'}
                </span>
                <span className="step-label">Select Tool</span>
              </div>
              <div className="step-description" style={{ paddingLeft: '2.5rem' }}>
                <p className="p-flush">Select <strong className="text-highlight">Copy</strong> from the icon menu.</p>
                <div className="image-wrapper-flush" style={{ marginTop: '0.8rem' }}>
                  <img src={copyIcon} alt="Copy icon" className="software-screenshot screenshot-small" />
                </div>
              </div>
            </div>

            <div className={getStepClass('b2c-2')} onClick={() => toggleStep('b2c-2')}>
              <div className="step-header">
                <span className={`step-number ${completedSteps.has('b2c-2') ? 'completed' : ''}`}>
                  {completedSteps.has('b2c-2') ? <CheckCircle2 size={16} /> : '2'}
                </span>
                <span className="step-label">Select Entity</span>
              </div>
              <div className="step-description" style={{ paddingLeft: '2.5rem' }}>
                <p className="p-flush">
                  Left-click on the entity to be copied. <img src={leftClick} alt="Left click" className="software-screenshot screenshot-click--inline" style={{ verticalAlign: 'middle', marginLeft: '0.25rem' }} />
                </p>
              </div>
            </div>

            <div className={getStepClass('b2c-3')} onClick={() => toggleStep('b2c-3')}>
              <div className="step-header">
                <span className={`step-number ${completedSteps.has('b2c-3') ? 'completed' : ''}`}>
                  {completedSteps.has('b2c-3') ? <CheckCircle2 size={16} /> : '3'}
                </span>
                <span className="step-label">Dimension Entry</span>
              </div>
              <div className="step-description" style={{ paddingLeft: '2.5rem' }}>
                <p className="p-flush">Specify the distance on the <strong className="text-highlight">X, Y and Z-axis</strong> and the <strong className="text-highlight">number of copies</strong> needed &gt; Press Enter.</p>
                <div className="image-wrapper-flush" style={{ marginTop: '0.8rem' }}>
                  <img src={copyDistance} alt="Copy Distance" className="software-screenshot screenshot-wide" />
                </div>
              </div>
            </div>

            <div style={{ marginTop: '1.5rem' }}>
              <div className="card-header"><h4>RESULT</h4></div>
              <div className="image-wrapper-flush" style={{ marginTop: '1rem' }}>
                <img src={copyResult} alt="Copy Result" className="software-screenshot screenshot-medium" />
              </div>
            </div>
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
            </div>

            <div className={getStepClass('b2rc-1')} onClick={() => toggleStep('b2rc-1')}>
              <div className="step-header">
                <span className={`step-number ${completedSteps.has('b2rc-1') ? 'completed' : ''}`}>
                  {completedSteps.has('b2rc-1') ? <CheckCircle2 size={16} /> : '1'}
                </span>
                <span className="step-label">Select Tool</span>
              </div>
              <div className="step-description" style={{ paddingLeft: '2.5rem' }}>
                <p className="p-flush">Same as rotate tool but makes a rotated duplicate of the entry.</p>
                <div className="image-wrapper-flush" style={{ marginTop: '0.8rem' }}>
                  <img src={rotateCopyIcon} alt="Rotate Copy icon" className="software-screenshot screenshot-small" />
                </div>
              </div>
            </div>

            <div style={{ marginTop: '1.5rem' }}>
              <div className="card-header"><h4>RESULT</h4></div>
              <div className="image-wrapper-flush" style={{ marginTop: '1rem' }}>
                <img src={rotateCopyAxis} alt="Rotate Copy Result" className="software-screenshot screenshot-medium" />
              </div>
            </div>

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
            </div>

            <div className={getStepClass('b2mc-1')} onClick={() => toggleStep('b2mc-1')}>
              <div className="step-header">
                <span className={`step-number ${completedSteps.has('b2mc-1') ? 'completed' : ''}`}>
                  {completedSteps.has('b2mc-1') ? <CheckCircle2 size={16} /> : '1'}
                </span>
                <span className="step-label">Select Tool</span>
              </div>
              <div className="step-description" style={{ paddingLeft: '2.5rem' }}>
                <p className="p-flush">Same as mirror tool but makes a mirror duplicate of the entity</p>
                <div className="image-wrapper-flush" style={{ marginTop: '0.8rem' }}>
                  <img src={mirrorCopyIcon} alt="Mirror Copy icon" className="software-screenshot screenshot-small" />
                </div>
              </div>
            </div>

            <div style={{ marginTop: '1.5rem' }}>
              <div className="card-header"><h4>RESULT</h4></div>
              <div className="image-wrapper-flush" style={{ marginTop: '1rem' }}>
                <img src={mirrorCopyResult} alt="Mirror Copy Preview" className="software-screenshot screenshot-medium" />
              </div>
            </div>


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

            <div className={getStepClass('b2d-1')} onClick={() => toggleStep('b2d-1')}>
              <div className="step-header">
                <span className={`step-number ${completedSteps.has('b2d-1') ? 'completed' : ''}`}>
                  {completedSteps.has('b2d-1') ? <CheckCircle2 size={16} /> : '1'}
                </span>
                <span className="step-label">Select Tool</span>
              </div>
              <div className="step-description" style={{ paddingLeft: '2.5rem' }}>
                <p className="p-flush">Select <strong className="text-highlight">Delete</strong> from the icon menu.</p>
                <div className="image-wrapper-flush" style={{ marginTop: '0.8rem' }}>
                  <img src={deleteIcon} alt="Delete icon" className="software-screenshot screenshot-small" />
                </div>
              </div>
            </div>

            <div className={getStepClass('b2d-2')} onClick={() => toggleStep('b2d-2')}>
              <div className="step-header">
                <span className={`step-number ${completedSteps.has('b2d-2') ? 'completed' : ''}`}>
                  {completedSteps.has('b2d-2') ? <CheckCircle2 size={16} /> : '2'}
                </span>
                <span className="step-label">Action</span>
              </div>
              <div className="step-description" style={{ paddingLeft: '2.5rem' }}>
                <p className="p-flush">Left-click on the entity to delete.</p>
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

/* ── Basic Operation (3): Sketch / Extrude / Revolve / Show-Hide / Stretch / Resize ── */
const BasicOperation3: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'sketchExtrude' | 'showHide' | 'stretch' | 'resize'>('sketchExtrude');
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const element = containerRef.current;
      const totalHeight = element.scrollHeight - element.clientHeight;
      if (totalHeight === 0) {
        setScrollProgress(100);
        return;
      }
      const progress = (element.scrollTop / totalHeight) * 100;
      setScrollProgress(progress);
    };

    const currentContainer = containerRef.current;
    if (currentContainer) {
      currentContainer.addEventListener('scroll', handleScroll);
      handleScroll();
    }

    return () => {
      if (currentContainer) {
        currentContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, [activeTab]);

  const toggleStep = (stepId: string) => {
    setCompletedSteps(prev => {
      const next = new Set(prev);
      if (next.has(stepId)) next.delete(stepId);
      else next.add(stepId);
      return next;
    });
  };

  const getStepClass = (stepId: string) => {
    return `instruction-step interactive ${completedSteps.has(stepId) ? 'completed' : ''}`;
  };

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
    <div className="course-lesson-container" ref={containerRef}>
      {/* Sticky Progress Bar */}
      <div className="lesson-progress-container">
        <div
          className="lesson-progress-bar"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
      <section className="lesson-intro">
        <h3 className="section-title">SKETCH / EXTRUDE / REVOLVE</h3>
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

            <div className={getStepClass('b3s-1')} onClick={() => toggleStep('b3s-1')}>
              <div className="step-header">
                <span className={`step-number ${completedSteps.has('b3s-1') ? 'completed' : ''}`}>
                  {completedSteps.has('b3s-1') ? <CheckCircle2 size={16} /> : '1'}
                </span>
                <span className="step-label">Select Sketch</span>
              </div>
              <div className="step-description" style={{ paddingLeft: '2.5rem' }}>
                <p className="p-flush">Tools use to create lines, circles and arcs in the 3D space for creating section forms for modeling.</p>
                <div className="flex-row-wrap" style={{ gap: '2rem', marginTop: '1rem' }}>
                  <div className="flex-row" style={{ gap: '1rem', flex: 1 }}>
                    <div className="image-wrapper-flush">
                      <img src={sketchIcon} alt="Sketch Tool" className="software-screenshot screenshot-small" />
                    </div>

                  </div>
                  <div className="flex-col-right">

                    <div style={{ padding: '0.5rem' }}>
                      <ArrowDown size={32} color="var(--primary-red)" strokeWidth={2.5} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="section-divider"></div>
            <div className="card-header card-sub-header"><h4>EXTRUDE/REVOLVE</h4></div>
            <p>Tools use to create solids from sketch in the 3D space.</p>
            <div className="instruction-step" style={{ border: 'none', background: 'transparent', paddingLeft: 0 }}>
              <div className="image-wrapper-flush">
                <img src={extrudeRevolveMenu} alt="Extrude Revolve Menu" className="software-screenshot screenshot-small" />
              </div>
            </div>
            {/* EXTRUDE */}
            <div className="section-divider">
              <div className="flex-row extrude-section-layout" style={{ gap: '2rem' }}>
                <div className="flex-1">
                  <div className="card-header card-sub-header" style={{ marginBottom: '1rem' }}><h4>EXTRUDE</h4></div>
                  <div className={getStepClass('b3e-1')} onClick={() => toggleStep('b3e-1')}>
                    <div className="step-header">
                      <span className={`step-number ${completedSteps.has('b3e-1') ? 'completed' : ''}`}>
                        {completedSteps.has('b3e-1') ? <CheckCircle2 size={16} /> : '1'}
                      </span>
                      <span className="step-label">Select Extrude</span>
                    </div>
                    <div className="step-description" style={{ paddingLeft: '2.5rem' }}>
                      <p className="p-flush">Select <strong className="text-highlight">Extrude</strong> from the icon menu.</p>
                      <div className="image-wrapper-flush" style={{ marginTop: '0.8rem' }}>
                        <img src={extrudeOneSide} alt="Extrusion One Side" className="software-screenshot screenshot-small" />
                      </div>
                    </div>
                  </div>

                  <div className={getStepClass('b3e-2')} onClick={() => toggleStep('b3e-2')}>
                    <div className="step-header">
                      <span className={`step-number ${completedSteps.has('b3e-2') ? 'completed' : ''}`}>
                        {completedSteps.has('b3e-2') ? <CheckCircle2 size={16} /> : '2'}
                      </span>
                      <span className="step-label">Select Perimeter</span>
                    </div>
                    <div className="step-description" style={{ paddingLeft: '2.5rem' }}>
                      <p className="p-flush">
                        Select the perimeter of the sketch to be extrude &gt; GO <img src={leftClick} alt="Left click" className="software-screenshot screenshot-click--inline" style={{ verticalAlign: 'middle', marginLeft: '0.25rem' }} />
                      </p>
                    </div>
                  </div>

                  <div className={getStepClass('b3e-3')} onClick={() => toggleStep('b3e-3')}>
                    <div className="step-header">
                      <span className={`step-number ${completedSteps.has('b3e-3') ? 'completed' : ''}`}>
                        {completedSteps.has('b3e-3') ? <CheckCircle2 size={16} /> : '3'}
                      </span>
                      <span className="step-label">Set Height & Confirm</span>
                    </div>
                    <div className="step-description" style={{ paddingLeft: '2.5rem' }}>
                      <p className="p-flush">Specify the height on the item entry &gt; Press <strong className="text-highlight">ENTER</strong>.</p>
                    </div>
                  </div>
                </div>

                <div className="flex-col-start result-preview-box" style={{ gap: '1rem', marginTop: '1rem' }}>
                  <div className="flex-col-center">

                    <div style={{ padding: '0.5rem' }}>
                      <ArrowDown size={32} color="var(--primary-red)" strokeWidth={2.5} />
                    </div>
                  </div>
                  <div className="flex-row-center" style={{ gap: '0.75rem' }}>
                    <div className="image-wrapper-flush">
                      <img src={extrudeOneSide} alt="Extrude One Side" className="software-screenshot screenshot-small" />
                    </div>
                    <ArrowRight size={32} color="var(--primary-red)" strokeWidth={2.5} />
                    <div className="image-wrapper-flush">
                      <img src={extrudeBothSide} alt="Extrude Both Side" className="software-screenshot screenshot-small" />
                    </div>
                  </div>
                </div>
              </div>

            </div>
            <div className="section-divider">
              <div className="card-header card-sub-header" style={{ marginTop: '0' }}><h4>REVOLVE</h4></div>
              <div className="flex-row revolve-section-layout" style={{ gap: '2rem' }}>
                <div className="flex-1">
                  <div className={getStepClass('b3r-1')} onClick={() => toggleStep('b3r-1')}>
                    <div className="step-header">
                      <span className={`step-number ${completedSteps.has('b3r-1') ? 'completed' : ''}`}>
                        {completedSteps.has('b3r-1') ? <CheckCircle2 size={16} /> : '1'}
                      </span>
                      <span className="step-label">Select Tool</span>
                    </div>
                    <div className="step-description" style={{ paddingLeft: '2.5rem' }}>
                      <p className="p-flush">Select <strong className="text-highlight">Revolve</strong> from the menu.</p>
                      <div className="image-wrapper-flush" style={{ marginTop: '0.8rem' }}>
                        <img src={revolveIcon} alt="Revolve Icon" className="software-screenshot screenshot-small" />
                      </div>
                    </div>
                  </div>

                  <div className={getStepClass('b3r-2')} onClick={() => toggleStep('b3r-2')}>
                    <div className="step-header">
                      <span className={`step-number ${completedSteps.has('b3r-2') ? 'completed' : ''}`}>
                        {completedSteps.has('b3r-2') ? <CheckCircle2 size={16} /> : '2'}
                      </span>
                      <span className="step-label">Select Perimeter</span>
                    </div>
                    <div className="step-description" style={{ paddingLeft: '2.5rem' }}>
                      <p className="p-flush">
                        Select the perimeter of the sketch to be revolve &gt; GO <img src={leftClick} alt="Left click" className="software-screenshot screenshot-click--inline" style={{ verticalAlign: 'middle', marginLeft: '0.25rem' }} />
                      </p>
                    </div>
                  </div>

                  <div className={getStepClass('b3r-3')} onClick={() => toggleStep('b3r-3')}>
                    <div className="step-header">
                      <span className={`step-number ${completedSteps.has('b3r-3') ? 'completed' : ''}`}>
                        {completedSteps.has('b3r-3') ? <CheckCircle2 size={16} /> : '3'}
                      </span>
                      <span className="step-label">Select Axis</span>
                    </div>
                    <div className="step-description" style={{ paddingLeft: '2.5rem' }}>
                      <p className="p-flush">
                        Select the axis of rotation (pick points or edge) &gt; GO <img src={leftClick} alt="Left click" className="software-screenshot screenshot-click--inline" style={{ verticalAlign: 'middle', marginLeft: '0.25rem' }} />
                      </p>
                      <p className="p-flush" style={{ marginTop: '0.5rem' }}>A hatch will appear indicating the specified area to be revolve.</p>
                    </div>
                  </div>
                </div>

                <div className="flex-col-start result-preview-box" style={{ gap: '1rem', marginTop: '1rem', background: 'none', border: 'none', boxShadow: 'none' }}>
                  <div className="image-wrapper-flush">
                    <img src={revolveP1} alt="Revolve P1" className="software-screenshot screenshot-small" style={{ background: 'none', border: 'none', boxShadow: 'none' }} />
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
            <div className="instruction-step" style={{ border: 'none', background: 'transparent' }}>
              <p className="p-flush p-mt-sm">Manage the visibility of your components to keep your workspace clean and focused.</p>
              <div className="image-wrapper-flush" style={{ margin: '1rem auto' }}>
                <img src={showHideMenu} alt="Show/Hide Menu" className="software-screenshot screenshot-small" />
              </div>
            </div>

            <div className={getStepClass('b3sh-1')} onClick={() => toggleStep('b3sh-1')}>
              <div className="step-header">
                <span className={`step-number ${completedSteps.has('b3sh-1') ? 'completed' : ''}`}>
                  {completedSteps.has('b3sh-1') ? <CheckCircle2 size={16} /> : <div className="step-dot"></div>}
                </span>
                <span className="step-label step-label-blue">SHOW / HIDE ENTITY</span>
              </div>
              <div className="step-description" style={{ paddingLeft: '2.5rem' }}>
                <p className="p-flush">1. Select <strong>Show/Hide</strong> from the menu.</p>
                <div className="image-wrapper-flush" style={{ margin: '0.5rem 0' }}>
                  <img src={showHideEntity} alt="Show/Hide Entity Icon" className="software-screenshot screenshot-icon--flush" />
                </div>
                <p className="p-flush">2. Select the entities &gt; GO</p>
                <div className="image-wrapper-flush" style={{ margin: '0.5rem 0' }}>
                  <img src={leftClick} alt="Left click" className="software-screenshot screenshot-click screenshot-click--flush" />
                </div>
              </div>
            </div>

            <div className={getStepClass('b3sh-2')} onClick={() => toggleStep('b3sh-2')}>
              <div className="step-header">
                <span className={`step-number ${completedSteps.has('b3sh-2') ? 'completed' : ''}`}>
                  {completedSteps.has('b3sh-2') ? <CheckCircle2 size={16} /> : <div className="step-dot"></div>}
                </span>
                <span className="step-label step-label-blue">SHOW / HIDE DRAFTING ENTITY</span>
              </div>
              <div className="step-description" style={{ paddingLeft: '2.5rem' }}>
                <p className="p-flush">1. Select <strong>Show/Hide Drafting Entity</strong>.</p>
                <div className="image-wrapper-flush" style={{ margin: '0.5rem 0' }}>
                  <img src={showHideDraftingEntity} alt="Show/Hide Drafting Entity Icon" className="software-screenshot screenshot-icon--flush" />
                </div>
                <p className="p-flush">2. <strong>Right-click</strong> to toggle all drafting entities (lines, dims, etc.).</p>
                <div className="image-wrapper-flush" style={{ marginTop: '0.8rem' }}>
                  <img src={draftingEntitiesTable} alt="Drafting Entities Diagram" className="software-screenshot screenshot-wide img-mt-sm" />
                </div>
              </div>
            </div>

            <div className={getStepClass('b3sh-3')} onClick={() => toggleStep('b3sh-3')}>
              <div className="step-header">
                <span className={`step-number ${completedSteps.has('b3sh-3') ? 'completed' : ''}`}>
                  {completedSteps.has('b3sh-3') ? <CheckCircle2 size={16} /> : <div className="step-dot"></div>}
                </span>
                <span className="step-label step-label-blue">HIDE UNSELECTED ENTITY</span>
              </div>
              <div className="step-description" style={{ paddingLeft: '2.5rem' }}>
                <div className="flex-row" style={{ gap: '1.5rem' }}>
                  <div className="flex-1">
                    <p className="p-flush">1. Select <strong>Hide Unselected</strong>.</p>
                    <div className="image-wrapper-flush" style={{ margin: '0.5rem 0' }}>
                      <img src={hideUnselectedEntity} alt="Hide Unselected Entity Icon" className="software-screenshot screenshot-icon--flush" />
                    </div>
                    <p className="p-flush">2. Select what you want to <strong>keep</strong> &gt; GO.</p>
                    <div className="image-wrapper-flush" style={{ margin: '0.5rem 0' }}>
                      <img src={leftClick} alt="Left click" className="software-screenshot screenshot-click screenshot-click--flush" />
                    </div>
                  </div>
                  <div className="image-wrapper-flush flex-no-shrink">
                    <img src={hideUnselectedEntity1} alt="Hide Unselected Entity Example" className="software-screenshot screenshot-medium flex-no-shrink" />
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
        {/* STRETCH */}
        {activeTab === 'stretch' && (
          <div className="lesson-card tab-content">
            <div className="card-header"><h4>STRETCH</h4></div>

            <div className={getStepClass('b3st-1')} onClick={() => toggleStep('b3st-1')}>
              <div className="step-header">
                <span className={`step-number ${completedSteps.has('b3st-1') ? 'completed' : ''}`}>
                  {completedSteps.has('b3st-1') ? <CheckCircle2 size={16} /> : '1'}
                </span>
                <span className="step-label">Select Tool</span>
              </div>
              <div className="step-description" style={{ paddingLeft: '2.5rem' }}>
                <p className="p-flush">Select <strong className="text-highlight">Stretch</strong> from the menu.</p>
                <div className="image-wrapper-flush" style={{ marginTop: '0.8rem' }}>
                  <img src={stretchIcon} alt="Stretch Icon" className="software-screenshot screenshot-small" />
                </div>
              </div>
            </div>

            <div className={getStepClass('b3st-2')} onClick={() => toggleStep('b3st-2')}>
              <div className="step-header">
                <span className={`step-number ${completedSteps.has('b3st-2') ? 'completed' : ''}`}>
                  {completedSteps.has('b3st-2') ? <CheckCircle2 size={16} /> : '2'}
                </span>
                <span className="step-label">Select Face</span>
              </div>
              <div className="step-description" style={{ paddingLeft: '2.5rem' }}>
                <p className="p-flush">Left-click to select the face to be stretched &gt; GO</p>
                <div className="image-wrapper-flush" style={{ marginTop: '0.8rem' }}>
                  <img src={leftClick} alt="Left click" className="software-screenshot screenshot-click" />
                </div>
              </div>
            </div>

            <div className={getStepClass('b3st-3')} onClick={() => toggleStep('b3st-3')}>
              <div className="step-header">
                <span className={`step-number ${completedSteps.has('b3st-3') ? 'completed' : ''}`}>
                  {completedSteps.has('b3st-3') ? <CheckCircle2 size={16} /> : '3'}
                </span>
                <span className="step-label">Specify Length</span>
              </div>
              <div className="step-description" style={{ paddingLeft: '2.5rem' }}>
                <div className="flex-row" style={{ gap: '1.5rem' }}>
                  <div className="flex-1">
                    <p className="p-flush">Enter the additional length on the item entry &gt; Press ENTER.</p>
                    <div className="image-wrapper-flush" style={{ marginTop: '0.8rem' }}>
                      <img src={stretchItemEntry} alt="Stretch Item Entry" className="software-screenshot screenshot-wide" />
                    </div>
                  </div>
                  <div className="image-wrapper-flush flex-no-shrink">
                    <img src={stretchImg1} alt="Stretch Drag Example" className="software-screenshot screenshot-medium" />
                  </div>
                </div>
              </div>
            </div>



            <div className="section-divider"></div>
            <div className="tool-block">
              <h4 className="section-title">ALTERNATIVE METHOD</h4>
              <div className="step-description">
                <p className="p-flush">Select face &gt; <strong className="text-highlight">Drag</strong> &gt; Left-click on the 3D Space.</p>
                <p className="p-flush" style={{ marginTop: '0.5rem' }}>A linear scale will appear on the 3D space. Specify the additional length of stretch &gt; Press Enter or Left-Click on the scale.</p>
              </div>
              <div className="image-wrapper-flush" style={{ marginTop: '1rem' }}>
                <img src={stretchImg2} alt="Stretch Scale Example" className="software-screenshot screenshot-large" />
              </div>
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

            <div className={getStepClass('b3rez-1')} onClick={() => toggleStep('b3rez-1')}>
              <div className="step-header">
                <span className={`step-number ${completedSteps.has('b3rez-1') ? 'completed' : ''}`}>
                  {completedSteps.has('b3rez-1') ? <CheckCircle2 size={16} /> : '1'}
                </span>
                <span className="step-label">Select Tool</span>
              </div>
              <div className="step-description" style={{ paddingLeft: '2.5rem' }}>
                <p className="p-flush">Select <strong className="text-highlight">Resize</strong> from the menu.</p>
                <div className="image-wrapper-flush" style={{ marginTop: '0.8rem' }}>
                  <img src={resizeIcon} alt="Resize Icon" className="software-screenshot screenshot-small" />
                </div>
              </div>
            </div>

            <div className={getStepClass('b3rez-2')} onClick={() => toggleStep('b3rez-2')}>
              <div className="step-header">
                <span className={`step-number ${completedSteps.has('b3rez-2') ? 'completed' : ''}`}>
                  {completedSteps.has('b3rez-2') ? <CheckCircle2 size={16} /> : '2'}
                </span>
                <span className="step-label">Select Entity</span>
              </div>
              <div className="step-description" style={{ paddingLeft: '2.5rem' }}>
                <p className="p-flush">Left-click on the entity to be resized &gt; GO</p>
                <div className="image-wrapper-flush" style={{ marginTop: '0.8rem' }}>
                  <img src={leftClick} alt="Left click" className="software-screenshot screenshot-click" />
                </div>
              </div>
            </div>

            <div className={getStepClass('b3rez-3')} onClick={() => toggleStep('b3rez-3')}>
              <div className="step-header">
                <span className={`step-number ${completedSteps.has('b3rez-3') ? 'completed' : ''}`}>
                  {completedSteps.has('b3rez-3') ? <CheckCircle2 size={16} /> : '3'}
                </span>
                <span className="step-label">Specify Scale</span>
              </div>
              <div className="step-description" style={{ paddingLeft: '2.5rem' }}>
                <p className="p-flush">Enter the <strong className="text-highlight">scale</strong> on the item entry &gt; Press ENTER.</p>
                <div className="flex-row-center--wide" style={{ marginTop: '1rem', gap: '2rem' }}>
                  <div className="image-wrapper-flush">
                    <img src={resizeItemEntry} alt="Resize Item Entry" className="software-screenshot screenshot-small" />
                  </div>
                  <div className="image-wrapper-flush">
                    <img src={resize3_2} alt="Resize Scale Result" className="software-screenshot screenshot-medium" />
                  </div>
                </div>
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
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const element = containerRef.current;
      const totalHeight = element.scrollHeight - element.clientHeight;
      if (totalHeight === 0) {
        setScrollProgress(100);
        return;
      }
      const progress = (element.scrollTop / totalHeight) * 100;
      setScrollProgress(progress);
    };

    const currentContainer = containerRef.current;
    if (currentContainer) {
      currentContainer.addEventListener('scroll', handleScroll);
      handleScroll();
    }

    return () => {
      if (currentContainer) {
        currentContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, [activeTab]);

  const toggleStep = (stepId: string) => {
    setCompletedSteps(prev => {
      const next = new Set(prev);
      if (next.has(stepId)) next.delete(stepId);
      else next.add(stepId);
      return next;
    });
  };

  const getStepClass = (stepId: string) => {
    return `instruction-step interactive ${completedSteps.has(stepId) ? 'completed' : ''}`;
  };

  const tabs = [{ id: 'shapeSteels', label: 'Shape Steels' }];
  return (
    <div className="course-lesson-container" ref={containerRef}>
      {/* Sticky Progress Bar */}
      <div className="lesson-progress-container">
        <div
          className="lesson-progress-bar"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
      <section className="lesson-intro">
        <h3 className="section-title">ARRANGE MACHINE PART</h3>
        <p>Learn how to use the <strong>Arrange Machine Part</strong> tool to quickly generate standardized components like <strong>Shape Steels</strong>.</p>
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

            <div className="instruction-step" style={{ border: 'none', background: 'transparent' }}>
              <div className="image-wrapper-flush" style={{ margin: '0 auto' }}>
                <img src={shapeSteels1} alt="Shape Steels Overview" className="software-screenshot screenshot-medium" />
              </div>
              <p className="p-flush" style={{ margin: '1rem 0', textAlign: 'center' }}><strong className="text-highlight">Shape Steels includes:</strong></p>
              <div className="image-wrapper-flush">
                <img src={shapeSteelsTypes} alt="Shape Steels Options" className="software-screenshot screenshot-wide" />
              </div>
            </div>

            <div className="section-divider"></div>

            <div className={getStepClass('b4ss-1')} onClick={() => toggleStep('b4ss-1')}>
              <div className="step-header">
                <span className={`step-number ${completedSteps.has('b4ss-1') ? 'completed' : ''}`}>
                  {completedSteps.has('b4ss-1') ? <CheckCircle2 size={16} /> : '1'}
                </span>
                <span className="step-label">Select Tool</span>
              </div>
              <div className="step-description" style={{ paddingLeft: '2.5rem' }}>
                <p className="p-flush">Select <strong className="text-highlight">Arrange Machine Part</strong> from the menu.</p>
                <div className="image-wrapper-flush" style={{ marginTop: '0.8rem' }}>
                  <img src={arrangeMachinePartMenu} alt="Arrange Machine Part Menu" className="software-screenshot screenshot-small" />
                </div>
              </div>
            </div>

            <div className={getStepClass('b4ss-2')} onClick={() => toggleStep('b4ss-2')}>
              <div className="step-header">
                <span className={`step-number ${completedSteps.has('b4ss-2') ? 'completed' : ''}`}>
                  {completedSteps.has('b4ss-2') ? <CheckCircle2 size={16} /> : '2'}
                </span>
                <span className="step-label">Configure Part</span>
              </div>
              <div className="step-description" style={{ paddingLeft: '2.5rem' }}>
                <p className="p-flush">The configuration window will appear. Select your steel type and size &gt; Press <strong className="text-highlight">OK</strong></p>
                <div className="image-wrapper-flush" style={{ marginTop: '0.8rem' }}>
                  <img src={arrangeMachinePartWindow} alt="Arrange Machine Part Window" className="software-screenshot screenshot-wide" />
                </div>
              </div>
            </div>

            <div className={getStepClass('b4ss-3')} onClick={() => toggleStep('b4ss-3')}>
              <div className="step-header">
                <span className={`step-number ${completedSteps.has('b4ss-3') ? 'completed' : ''}`}>
                  {completedSteps.has('b4ss-3') ? <CheckCircle2 size={16} /> : '3'}
                </span>
                <span className="step-label">Set Origin Position</span>
              </div>
              <div className="step-description" style={{ paddingLeft: '2.5rem' }}>
                <div className="flex-row-center--wrap" style={{ gap: '2rem' }}>
                  <div className="flex-1">
                    <p className="p-flush">In the <strong className="text-highlight">Key Entry Area</strong>, enter the coordinates (e.g., <code className="code-inline">0 0 0</code>) or pick a point.</p>
                    <div className="image-wrapper-flush" style={{ marginTop: '0.8rem' }}>
                      <img src={keyEntryArea} alt="Key Entry Area" className="software-screenshot screenshot-small" />
                    </div>
                  </div>
                  <div className="image-wrapper-flush">
                    <img src={shapeSteels2} alt="Shape Steels Result" className="software-screenshot screenshot-medium" />
                  </div>
                </div>
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
