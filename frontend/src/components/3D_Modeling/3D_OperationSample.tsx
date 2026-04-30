/** * 3D_OperationSample.tsx – Operation Sample lessons */

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Box as BoxIcon, Info } from 'lucide-react';
import { useLessonCore } from '../../hooks/useLessonCore';
import { ReadAloudButton } from "../ReadAloudButton";
import '../../styles/3D_Modeling/CourseLesson.css';

/* Shared Assets */
import leftClick from '../../assets/3D_Image_File/left_click.png';
// press_q.png removed — asset deleted in current HEAD
import booleanSubtractIcon from '../../assets/3D_Image_File/boolean1_subtract.png';
import centerTool from '../../assets/3D_Image_File/center_tool.png';

/* Operation Sample (1) Assets */
import mainDrawing from '../../assets/3D_Image_File/sample_3d_modeling_parts.png';
import arrangeBoxTool from '../../assets/3D_Image_File/arrange_box_operation_sample1.png';
import machinePartTool from '../../assets/3D_Image_File/select_and_arrange_machine_part.png';
import moveTool from '../../assets/3D_Image_File/component1_move.png';
import opSample1 from '../../assets/3D_Image_File/operation_sample1.png';
import opSample1Move from '../../assets/3D_Image_File/operation_sample11.png';
import subtractTool from '../../assets/3D_Image_File/boolean1_boolean_subtract.png';
import subtractResult from '../../assets/3D_Image_File/subtract_operation_sample2.png';
import filletTool from '../../assets/3D_Image_File/fillet_edge.png';
import filletResult from '../../assets/3D_Image_File/filleted.png';
import copyTool from '../../assets/3D_Image_File/component1_copy.png';
import copyResult from '../../assets/3D_Image_File/copy_component.png';
import chamferTool from '../../assets/3D_Image_File/chamfer_edge.png';
import chamferResult from '../../assets/3D_Image_File/chamfered.png';
import createPartTool from '../../assets/3D_Image_File/3d_part1_create_3d_part.png';
import enterPartName from '../../assets/3D_Image_File/enter_3d_part_name.png';
import propertiesWindow from '../../assets/3D_Image_File/3d_properties.png';
import materialSettings from '../../assets/3D_Image_File/material_setting1_material_setting.png';
import layerInfo from '../../assets/3D_Image_File/materials_layer.png';
import fileMenu from '../../assets/3D_Image_File/tool_bars_file.png';

/* Operation Sample (2-5) Assets */
// operation_sample_2.jpg removed — asset deleted in current HEAD
import mainDrawing3 from '../../assets/3D_Image_File/operation_sample3.png';
import segmentOverview from '../../assets/3D_Image_File/operation_sample3_segment.png';
import segmentAResult from '../../assets/3D_Image_File/operation_sample3_segment_a.png';
import segmentBResult from '../../assets/3D_Image_File/operation_sample3_segment_b.png';
import unionTool from '../../assets/3D_Image_File/boolean1_union.png';
import workPlaneImg from '../../assets/3D_Image_File/operation_sample4_work_plane.png';
import sketchImg from '../../assets/3D_Image_File/operation_sample4_revolving.png';
import revolveImg from '../../assets/3D_Image_File/operation_sample4_revolve.png';
import segmentDResult from '../../assets/3D_Image_File/operation_sample4_segment_d.png';
import segmentEResult from '../../assets/3D_Image_File/operation_sample4_segment_e.png';
import keyGrooveBox from '../../assets/3D_Image_File/operation_sample4_4.png';
import keyGroovePos from '../../assets/3D_Image_File/operation_sample4_4_position_tool_entity.png';
import keyGrooveSubtractResult from '../../assets/3D_Image_File/operation_sample5_4_subtract_tool.png';
import keyGrooveFilletResult from '../../assets/3D_Image_File/operation_sample5_4_add_fillet_radius.png';
import finalPartFairing from '../../assets/3D_Image_File/operation_sample5_6.png';

interface OperationSampleLessonProps {
  nextLabel?: string;
  subLessonId?: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const OperationSampleLesson: React.FC<OperationSampleLessonProps> = ({ subLessonId = 'op-sample-1', onNextLesson, onPrevLesson, nextLabel }) => {
  const [activeTab, setActiveTab] = useState<'sample1' | 'sample2' | 'sample3' | 'sample4' | 'sample5'>(() => {
    return (localStorage.getItem(`${subLessonId}-tab`) as any) || 'sample1';
  });

  const {
    scrollProgress,
    containerRef,
    speak,
    stop,
    isSpeaking,
    currentIndex
  } = useLessonCore(`${subLessonId}-${activeTab}`);

  useEffect(() => {
    localStorage.setItem(`${subLessonId}-tab`, activeTab);
  }, [activeTab, subLessonId]);

  const opSample1Steps = [
    "Step 1: Open a new drawing via File, New. Save it using the drawing number as the file name. Always verify if it's a Normal or Mirror part before starting modeling.",
    "Step 2: Create the base using Arrange Box. Input dimensions: 16mm depth, 100mm width, and 210mm height at the origin point.",
    "Step 3: Select Arrange Machine Part from the menu to prepare for adding specialized features like holes.",
    "Step 4: Place the hole component on the target face. Use the non-conversion plus Q shortcut to change orientation, then left-click and select GO to finalize placement.",
    "Step 5: Select the hole component and use the Move tool. Set the Y-movement to 183mm to reach its precise technical location.",
    "Step 6: To create long hole details, first arrange a box as a tool entity with 14 by 38mm dimensions. Position it and use the Subtract command to cut the shape.",
    "Step 7: Apply a Fillet Edge with a 7mm radius. Select all required edges and click GO to smooth the transitions.",
    "Step 8: Use the Copy Component tool to duplicate your finished features across the part where required.",
    "Step 9: Apply a Chamfer Edge for final deburring and technical finishing.",
    "Step 10: Finalize by selecting Create 3D Part and entering the standard drawing name.",
    "Step 11: Set the 3D Properties to ensure correct metadata and drafting coordination."
  ];

  const opSample2Steps = [
    "Step 1: Open and Save drawing as Drawing Number.",
    "Step 2: Create part by segments (A, B, C, D, and E) following technical coordinates.",
    "Step 3: Use the Boolean Union tool to join all segments into a single unified solid body.",
    "Step 4: Arrange a tool entity box for the keyway and precisely position it on the shaft face.",
    "Step 5: Use the Boolean Subtract tool to cut the keyway profile and add fillets.",
    "Step 6: Apply final fairing and surface grinding symbols as per drafting standards.",
    "Step 7: Finalize by selecting Create 3D Part and saving via the File menu."
  ];

  const opSample3Steps = [
    "Step 1: Open and Save drawing as Drawing Number.",
    "Step 2: Create part by SEGMENTS. Review the overview to understand the A, B, C, D, and E arrangement.",
    "Step 3: Model Segment A using Arrange Cylinder and Union. C1: 20x3.65, C2: 19x1.35, C3: 20x64.5.",
    "Step 4: Model Segment B (30mm Dia x 22.25mm H) and attach it using the Center Tool.",
    "Step 5: Combine all segments into the final shaft assembly."
  ];

  const opSample4Steps = [
    "Step 1: Create Segment C by sketching the half profile on the Work Plane and then Revolving.",
    "Step 2: Attach Segments D and E using the Center Tool to finalize the shaft backbone.",
    "Step 3: Join all segments using the Boolean UNION tool.",
    "Step 4: For the Key Groove, create a Tool Solid (Box: 6x3.5x43) and position it precisely on the face.",
    "Step 5: Perform the subtraction to create the final keyway profile."
  ];

  const opSample5Steps = [
    "Step 1: Apply final fairings. Set Fillet Radius to 3mm for the keyway and internal edges.",
    "Step 2: Perform the Subtract operation for the tool entity and add any remaining fillets.",
    "Step 3: Finalize all fairings and review the assembly with all neighboring parts.",
    "Step 4: Save the completed 3D part and verify all drafting properties."
  ];

  const handleNext = () => {
    if (activeTab === 'sample1') setActiveTab('sample2');
    else if (activeTab === 'sample2') setActiveTab('sample3');
    else if (activeTab === 'sample3') setActiveTab('sample4');
    else if (activeTab === 'sample4') setActiveTab('sample5');
    else if (onNextLesson) onNextLesson();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrev = () => {
    if (activeTab === 'sample5') setActiveTab('sample4');
    else if (activeTab === 'sample4') setActiveTab('sample3');
    else if (activeTab === 'sample3') setActiveTab('sample2');
    else if (activeTab === 'sample2') setActiveTab('sample1');
    else if (onPrevLesson) onPrevLesson();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getStepClass = (stepId: string) => "instruction-step";

  return (
    <div className={`course-lesson-container ${isSpeaking ? 'is-reading' : ''}`} ref={containerRef}>
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      <div className="lesson-tabs">
        <button className={`tab-button ${activeTab === 'sample1' ? 'active' : ''}`} onClick={() => setActiveTab('sample1')}>SAMPLE 1 (BRACKET)</button>
        <button className={`tab-button ${activeTab === 'sample2' ? 'active' : ''}`} onClick={() => setActiveTab('sample2')}>SAMPLE 2 (SHAFT)</button>
        <button className={`tab-button ${activeTab === 'sample3' ? 'active' : ''}`} onClick={() => setActiveTab('sample3')}>SAMPLE 3 (SEGMENTS)</button>
        <button className={`tab-button ${activeTab === 'sample4' ? 'active' : ''}`} onClick={() => setActiveTab('sample4')}>SAMPLE 4 (REVOLVE)</button>
        <button className={`tab-button ${activeTab === 'sample5' ? 'active' : ''}`} onClick={() => setActiveTab('sample5')}>SAMPLE 5 (FINISHING)</button>
      </div>

      <div className="lesson-grid single-card">
        {activeTab === 'sample1' && (
          <div className="lesson-card tab-content fade-in">
            <div className="card-header">
              <h4>OPERATION SAMPLE (1) - BRACKET</h4>
              <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(opSample1Steps)} onStop={stop} />
            </div>
            
            <div className="instruction-box">
              <div className="screenshot-wrapper mt-4">
                <img src={mainDrawing} alt="Bracket Technical Drawing" className="software-screenshot" style={{ width: "900px", height: "auto" }} />
              </div>
            </div>

            <div className="section-divider"></div>

            {/* Steps 1-5 */}
            <div className={`${getStepClass('s1-1')} ${currentIndex === 0 ? 'reading-active' : ''}`} data-reading-index="0">
              <div className="step-header"><span className="step-number">1</span><span className="step-label">Open a new drawing &gt; Save as Drawing Number.</span></div>
            </div>
            <div className={`${getStepClass('s1-2')} ${currentIndex === 1 ? 'reading-active' : ''}`} data-reading-index="1">
              <div className="step-header"><span className="step-number">2</span><span className="step-label">Create Base: <strong>Arrange Box</strong> (16 x 100 x 210) at Origin.</span></div>
              <div className="screenshot-wrapper mt-4"><img src={arrangeBoxTool} alt="Arrange Box" className="software-screenshot" style={{width: '250px'}} /></div>
            </div>
            <div className={`${getStepClass('s1-3')} ${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
              <div className="step-header"><span className="step-number">3</span><span className="step-label">Select <strong>Arrange Machine Part</strong>.</span></div>
            </div>
            <div className={`${getStepClass('s1-4')} ${currentIndex === 3 ? 'reading-active' : ''}`} data-reading-index="3">
              <div className="step-header"><span className="step-number">4</span><span className="step-label">Place Hole &gt; Use <strong>Muhenkan + Q</strong> for orientation.</span></div>
            </div>
            <div className={`${getStepClass('s1-5')} ${currentIndex === 4 ? 'reading-active' : ''}`} data-reading-index="4">
              <div className="step-header"><span className="step-number">5</span><span className="step-label">Move Hole: Y-pos = <strong>183.00mm</strong>.</span></div>
            </div>

            {/* Steps 6-11 */}
            <div className="section-divider"></div>
            <div className={`${getStepClass('s1-6')} ${currentIndex === 5 ? 'reading-active' : ''}`} data-reading-index="5">
              <div className="step-header"><span className="step-number">6</span><span className="step-label">Long Hole: <strong>Arrange Box</strong> (14 x 38) &gt; <strong>Subtract</strong>.</span></div>
              <div className="screenshot-wrapper mt-4"><img src={subtractResult} alt="Subtract Result" className="software-screenshot" style={{width: '500px'}} /></div>
            </div>
            <div className={`${getStepClass('s1-7')} ${currentIndex === 6 ? 'reading-active' : ''}`} data-reading-index="6">
              <div className="step-header"><span className="step-number">7</span><span className="step-label">Fillet Edge: Radius = <strong>7mm</strong>.</span></div>
              <div className="screenshot-wrapper mt-4"><img src={filletResult} alt="Fillet Result" className="software-screenshot" style={{width: '400px'}} /></div>
            </div>
            <div className={`${getStepClass('s1-8')} ${currentIndex === 7 ? 'reading-active' : ''}`} data-reading-index="7">
              <div className="step-header"><span className="step-number">8</span><span className="step-label"><strong>Copy Component</strong> tool.</span></div>
            </div>
            <div className={`${getStepClass('s1-9')} ${currentIndex === 8 ? 'reading-active' : ''}`} data-reading-index="8">
              <div className="step-header"><span className="step-number">9</span><span className="step-label"><strong>Chamfer Edge</strong>.</span></div>
            </div>
            <div className={`${getStepClass('s1-10')} ${currentIndex === 9 ? 'reading-active' : ''}`} data-reading-index="9">
              <div className="step-header"><span className="step-number">10</span><span className="step-label"><strong>Create 3D Part</strong>.</span></div>
            </div>
            <div className={`${getStepClass('s1-11')} ${currentIndex === 10 ? 'reading-active' : ''}`} data-reading-index="10">
              <div className="step-header"><span className="step-number">11</span><span className="step-label">Set <strong>3D Properties</strong>.</span></div>
            </div>
          </div>
        )}

        {activeTab === 'sample2' && (
          <div className="lesson-card tab-content fade-in">
            <div className="card-header">
              <h4>OPERATION SAMPLE (2) - SHAFT</h4>
              <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(opSample2Steps)} onStop={stop} />
            </div>

            <div className="instruction-box">
              <div className="content-placeholder" style={{ padding: '2rem', textAlign: 'center', opacity: 0.6 }}>
                <p>Technical drawing for Sample 2 (Shaft) will be provided soon.</p>
              </div>
            </div>

            <div className="section-divider"></div>

            <div className={`${getStepClass('s2-1')} ${currentIndex === 0 ? 'reading-active' : ''}`} data-reading-index="0">
              <div className="step-header"><span className="step-number">1</span><span className="step-label">Open & Save drawing.</span></div>
            </div>
            <div className={`${getStepClass('s2-2')} ${currentIndex === 1 ? 'reading-active' : ''}`} data-reading-index="1">
              <div className="step-header"><span className="step-number">2</span><span className="step-label">Create Segments A-E. (See detailed tabs for segments).</span></div>
            </div>
            <div className={`${getStepClass('s2-3')} ${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
              <div className="step-header"><span className="step-number">3</span><span className="step-label">Use <strong>Boolean Union</strong> to join all parts.</span></div>
              <div className="screenshot-wrapper mt-4"><img src={unionTool} alt="Union Tool" className="software-screenshot" style={{width: '200px'}} /></div>
            </div>
            <div className={`${getStepClass('s2-4')} ${currentIndex === 3 ? 'reading-active' : ''}`} data-reading-index="3">
              <div className="step-header"><span className="step-number">4</span><span className="step-label">Arrange <strong>Keyway Box</strong> (6 x 3.5 x 43).</span></div>
            </div>
            <div className={`${getStepClass('s2-5')} ${currentIndex === 4 ? 'reading-active' : ''}`} data-reading-index="4">
              <div className="step-header"><span className="step-number">5</span><span className="step-label"><strong>Boolean Subtract</strong> keyway.</span></div>
            </div>
            <div className={`${getStepClass('s2-6')} ${currentIndex === 5 ? 'reading-active' : ''}`} data-reading-index="5">
              <div className="step-header"><span className="step-number">6</span><span className="step-label">Apply final fairing and symbols.</span></div>
            </div>
            <div className={`${getStepClass('s2-7')} ${currentIndex === 6 ? 'reading-active' : ''}`} data-reading-index="6">
              <div className="step-header"><span className="step-number">7</span><span className="step-label">Finalize 3D Part.</span></div>
            </div>
          </div>
        )}

        {activeTab === 'sample3' && (
          <div className="lesson-card tab-content fade-in">
            <div className="card-header">
              <h4>SAMPLE 3 - SHAFT SEGMENTS</h4>
              <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(opSample3Steps)} onStop={stop} />
            </div>
            <div className="instruction-box">
              <img src={segmentOverview} alt="Segment Overview" className="software-screenshot" style={{width: '900px'}} />
            </div>
            <div className="section-divider"></div>
            <div className={`${getStepClass('s3-3')} ${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
              <div className="step-header"><span className="step-number">3</span><span className="step-label">Segment A: C1: 20x3.65, C2: 19x1.35, C3: 20x64.5.</span></div>
              <img src={segmentAResult} alt="Segment A" className="software-screenshot mt-4" style={{width: '900px'}} />
            </div>
            <div className={`${getStepClass('s3-4')} ${currentIndex === 3 ? 'reading-active' : ''}`} data-reading-index="3">
              <div className="step-header"><span className="step-number">4</span><span className="step-label">Segment B: 30 Dia x 22.25 H. Use <strong>Center Tool</strong>.</span></div>
              <img src={segmentBResult} alt="Segment B" className="software-screenshot mt-4" style={{width: '400px'}} />
            </div>
          </div>
        )}

        {activeTab === 'sample4' && (
          <div className="lesson-card tab-content fade-in">
            <div className="card-header">
              <h4>SAMPLE 4 - REVOLVE & KEY GROOVE</h4>
              <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(opSample4Steps)} onStop={stop} />
            </div>
            <div className={`${getStepClass('s4-1')} ${currentIndex === 0 ? 'reading-active' : ''}`} data-reading-index="0">
              <div className="step-header"><span className="step-number">1</span><span className="step-label">Segment C: Sketch on Work Plane and <strong>Revolve</strong>.</span></div>
              <div style={{display: 'flex', gap: '2rem', marginTop: '1rem'}}>
                <img src={workPlaneImg} alt="Work Plane" className="software-screenshot" style={{width: '200px'}} />
                <img src={sketchImg} alt="Sketch" className="software-screenshot" style={{width: '400px'}} />
              </div>
            </div>
            <div className="section-divider"></div>
            <div className={`${getStepClass('s4-4')} ${currentIndex === 3 ? 'reading-active' : ''}`} data-reading-index="3">
              <div className="step-header"><span className="step-number">4</span><span className="step-label">Key Groove: Tool Box (6 x 3.5 x 43).</span></div>
              <img src={keyGroovePos} alt="Key Groove Positioning" className="software-screenshot mt-4" style={{width: '900px'}} />
            </div>
          </div>
        )}

        {activeTab === 'sample5' && (
          <div className="lesson-card tab-content fade-in">
            <div className="card-header">
              <h4>SAMPLE 5 - FINAL FINISHING</h4>
              <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(opSample5Steps)} onStop={stop} />
            </div>
            <div className={`${getStepClass('s5-1')} ${currentIndex === 0 ? 'reading-active' : ''}`} data-reading-index="0">
              <div className="step-header"><span className="step-number">1</span><span className="step-label">Final Fairings: Radius = <strong>3mm</strong>.</span></div>
              <img src={keyGrooveFilletResult} alt="Fillet Result" className="software-screenshot mt-4" style={{width: '900px'}} />
            </div>
            <div className="section-divider"></div>
            <div className={`${getStepClass('s5-3')} ${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
              <div className="step-header"><span className="step-number">3</span><span className="step-label">Final Review.</span></div>
              <img src={finalPartFairing} alt="Final Part" className="software-screenshot mt-4" style={{width: '500px'}} />
            </div>
          </div>
        )}

        <div className="lesson-navigation">
          <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button>
          <button className="nav-button next" onClick={handleNext}>
            {activeTab === 'sample5' ? (nextLabel || 'Next Lesson') : 'Next'} <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OperationSampleLesson;
