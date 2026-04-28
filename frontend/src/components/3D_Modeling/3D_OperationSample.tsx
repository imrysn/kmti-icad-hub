/** * 3D_OperationSample.tsx  EOperation Sample lessons */

import React,
{

  useState,

  useEffect, useRef
} from 'react';

import {
  ChevronLeft,
  ChevronRight,
  Play,
  Box as BoxIcon,
  Info
} from 'lucide-react';
import { useLessonCore } from '../../hooks/useLessonCore';
import { ReadAloudButton } from "../ReadAloudButton";
import '../../styles/3D_Modeling/CourseLesson.css';
/* Shared Assets */

import leftClick from '../../assets/3D_Image_File/left_click.png';

import centerTool from '../../assets/3D_Image_File/center_tool.png';
/* Operation Sample (1) Assets */

import mainDrawing from '../../assets/3D_Image_File/sample_3d_modeling_parts.png';

import arrangeBoxTool from '../../assets/3D_Image_File/arrange_box_operation_sample1.png';

import machinePartTool from '../../assets/3D_Image_File/select_and_arrange_machine_part.png';

import moveTool from '../../assets/3D_Image_File/component1_move.png';

import opSample1 from '../../assets/3D_Image_File/operation_sample1.png';

import opSample1Move from '../../assets/3D_Image_File/operation_sample11.png';
/* Step 6 Assets */

import subtractTool from '../../assets/3D_Image_File/boolean1_boolean_subtract.png';

import subtractResult from '../../assets/3D_Image_File/subtract_operation_sample2.png';
/* Step 7 Assets */

import filletTool from '../../assets/3D_Image_File/fillet_edge.png';

import filletResult from '../../assets/3D_Image_File/filleted.png';
/* Step 8 Assets */

import copyTool from '../../assets/3D_Image_File/component1_copy.png';

import copyResult from '../../assets/3D_Image_File/copy_component.png';
/* Step 9 Assets */

import chamferTool from '../../assets/3D_Image_File/chamfer_edge.png';
import chamferResult from '../../assets/3D_Image_File/chamfered.png';
/* Step 10 Assets */
import createPartTool from '../../assets/3D_Image_File/3d_part1_create_3d_part.png';
import enterPartName from '../../assets/3D_Image_File/enter_3d_part_name.png';
/* Step 11 Assets */
import propertiesWindow from '../../assets/3D_Image_File/3d_properties.png';
/* Step 12 Assets */
import materialSettings from '../../assets/3D_Image_File/material_setting1_material_setting.png';
import layerInfo from '../../assets/3D_Image_File/materials_layer.png';
/* Step 13 Assets */
import fileMenu from '../../assets/3D_Image_File/tool_bars_file.png';
/* Operation Sample (3) Assets */
import mainDrawing3 from '../../assets/3D_Image_File/operation_sample3.png';
import segmentOverview from '../../assets/3D_Image_File/operation_sample3_segment.png';
import segmentAResult from '../../assets/3D_Image_File/operation_sample3_segment_a.png';
import segmentBResult from '../../assets/3D_Image_File/operation_sample3_segment_b.png';

import unionTool from '../../assets/3D_Image_File/boolean1_union.png';

/* Operation Sample (4) Assets */
import mainDrawing4 from '../../assets/3D_Image_File/operation_sample3.png';
import workPlaneImg from '../../assets/3D_Image_File/operation_sample4_work_plane.png';
import sketchImg from '../../assets/3D_Image_File/operation_sample4_revolving.png';
import revolveImg from '../../assets/3D_Image_File/operation_sample4_revolve.png';
import segmentDResult from '../../assets/3D_Image_File/operation_sample4_segment_d.png';
import segmentEResult from '../../assets/3D_Image_File/operation_sample4_segment_e.png';
import keyGrooveBox from '../../assets/3D_Image_File/operation_sample4_4.png';
import keyGroovePos from '../../assets/3D_Image_File/operation_sample4_4_position_tool_entity.png';
import arrangeBoxIcon from '../../assets/3D_Image_File/basic_operation1_arrange_box.png';
/* Operation Sample (5) Assets */
import keyGrooveSubtractResult from '../../assets/3D_Image_File/operation_sample5_4_subtract_tool.png';
import keyGrooveFilletResult from '../../assets/3D_Image_File/operation_sample5_4_add_fillet_radius.png';
import finalPartFairing from '../../assets/3D_Image_File/operation_sample5_6.png';

interface OperationSampleLessonProps {
  nextLabel?: string; subLessonId?: string; onNextLesson?: () => void; onPrevLesson?: () => void;
}

const OperationSampleLesson: React.FC<OperationSampleLessonProps> = ({ subLessonId = 'op-sample-1', onNextLesson, onPrevLesson, nextLabel }) => {
  const {
    scrollProgress,
    containerRef,
    speak,
    stop,
    isSpeaking,
    currentIndex
  } = useLessonCore(subLessonId);

  const opSample1Steps = [
    "Step 1: Open a new drawing via File, New. Save it using the drawing number as the file name. Always verify if it's a Normal or Mirror part before starting modeling.",
    "Step 2: Create the base using Arrange Box. Input dimensions: 16mm depth, 100mm width, and 210mm height at the origin point.",
    "Step 3: Select Arrange Machine Part from the menu to prepare for adding specialized features like holes.",
    "Step 4: Place the hole component on the target face. Use the non-conversion plus Q shortcut to change orientation, then left-click and select GO to finalize placement.",
    "Step 5: Select the hole component and use the Move tool. Set the Y-movement to 183mm to reach its precise technical location."
  ];

  const opSample2Steps = [
    "Step 6: To create long hole details, first arrange a box as a tool entity with 14 by 38mm dimensions. Position it and use the Subtract command to cut the shape.",
    "Step 7: Apply a Fillet Edge with a 7mm radius. Select all required edges and click GO to smooth the transitions.",
    "Step 8: Use the Copy Component tool to duplicate your finished features across the part where required.",
    "Step 9: Apply a Chamfer Edge for final deburring and technical finishing.",
    "Step 10: Finalize by selecting Create 3D Part and entering the standard drawing name.",
    "Step 11: Set the 3D Properties to ensure correct metadata and drafting coordination.",
    "Step 12: Configure Material Settings and Layer information for accurate manufacturing representation.",
    "Step 13: Finally, save your work via the File menu to complete the modeling process."
  ];

  const opSample3Steps = [
    "Section A: Create the segment A geometry using a 2D sketch and extrusion as the base feature.",
    "Section B: Model segment B and use the Boolean Union tool to join it with the main body, ensuring a single unified solid part.",
    "Section C: Complete the remaining features for sample 3 by following the technical drawing coordinates."
  ];

  const opSample4Steps = [
    "Work Plane: Start by defining your work plane for 2D sketching. This provides the foundation for revolving or extruding profiles.",
    "Revolve Operation: Create the main circular body using a 2D profile and the Revolve tool around the central axis.",
    "Key Groove: Arrange a tool entity box for the keyway. Precisely position it on the shaft face using reference points and orientation shortcuts."
  ];

  const opSample5Steps = [
    "Groove Completion: Use the Boolean Subtract tool to cut the keyway profile from the shaft. Finish the internal corners with small fillets.",
    "Retainer Ring: Follow the standard workflow to cut the retaining ring groove using the designated tool and dimensions.",
    "Final Fairing: Apply final fairing and surface grinding symbols to ensure the part is ready for 2D detailing and fabrication."
  ];

  const getStepClass = (stepId: string) => "instruction-step";
  const isSample1 = subLessonId === 'op-sample-1';

  const isSample2 = subLessonId === 'op-sample-2';

  const isSample3 = subLessonId === 'op-sample-3';

  const isSample4 = subLessonId === 'op-sample-4';

  const isSample5 = subLessonId === 'op-sample-5';

  return (

    <div className={`course-lesson-container ${isSpeaking ? 'is-reading' : ''}`} ref={containerRef}>
      {/* Sticky Progress Bar */}
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>
      <section className="lesson-intro">
        <h4 className="section-title">
          {isSample1 ? 'Operation sample (1)' : isSample2 ? 'Operation sample (2)' : isSample3 ? 'Operation sample (3)' : isSample4 ? 'Operation sample (4)' : 'Operation sample (5)'}
          <ReadAloudButton isSpeaking={isSpeaking} onStart={() => {
            if (isSample1) speak(opSample1Steps);
            else if (isSample2) speak(opSample2Steps);
            else if (isSample3) speak(opSample3Steps);
            else if (isSample4) speak(opSample4Steps);
            else speak(opSample5Steps);
          }}
            onStop={stop}
          />
        </h4>
        {isSample1 ? (
          <div className="instruction-box">
            <div className="screenshot-wrapper mt-4">
              <img src={mainDrawing} alt="3D Modeling Samples" className="software-screenshot screenshot-wide" />
            </div>
          </div>
        ) : (
          <div className="instruction-box">
            <h4 className="section-title">3D Modeling Using 2D Sketch, Key Groove, Retainer Ring Groove</h4>
            <div className="screenshot-wrapper mt-4">
              <img src={isSample4 ? mainDrawing4 : mainDrawing3} alt={isSample4 ? "Sample 4 Technical Drawing" : "Sample 3 Technical Drawing"} className="software-screenshot screenshot-wide" />
            </div>
            <p className="p-flush mt-4">Let us try this drawing for example:</p>
          </div>
        )}
      </section>

      <div className="lesson-grid single-card">
        <div className="lesson-card tab-content">
          {isSample1 ? (
            <div className="fade-in">
              <div className="card-header">
                <h4>STEP-BY-STEP PROCEDURE</h4>
                <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(opSample1Steps)} onStop={stop} />
              </div>

              <div className={`${getStepClass('s1-1')} ${currentIndex === 0 ? 'reading-active' : ''}`} data-reading-index="0">
                <div className="step-header">
                  <span className="step-number">1 </span>
                  <span className="step-label">Open a new drawing: Go to <strong className="text-highlight">File &gt; New</strong></span>
                </div>
                <div className="step-description">
                  <p className="p-flush">Save using drawing number as File Name &gt; <strong className="text-highlight">Save</strong>.</p>
                  <div className="instruction-box mt-4">
                    <p className="p-flush">Always verify if the part is <strong className="text-highlight">Normal</strong> or <strong className="text-highlight">Mirror</strong> before modeling.</p>
                  </div>
                </div>
              </div>

              <div className="section-divider"></div>

              <div className={`${getStepClass('s1-2')} ${currentIndex === 1 ? 'reading-active' : ''}`} data-reading-index="1">
                <div className="step-header">
                  <span className="step-number">2 </span>
                  <span className="step-label">ARRANGE BOX</span>
                </div>
                <div className="step-description">
                  <div className="screenshot-wrapper">
                    <img src={arrangeBoxTool} alt="Arrange Box Tool" className="software-screenshot screenshot-medium" style={{ width: '400px' }} />
                  </div>
                  <div className="info-box mt-4">
                    <p className="p-flush"><strong>INPUT:</strong> Depth=16, Width=100, Height=210 at <strong className="text-highlight">(0,0,0)</strong>.</p>
                  </div>
                </div>
              </div>

              <div className="section-divider"></div>

              <div className={`${getStepClass('s1-3')} ${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
                <div className="step-header">
                  <span className="step-number">3 </span>
                  <span className="step-label">Select and <strong className="text-highlight">Arrange Machine Part</strong></span>
                </div>
                <div className="step-description">
                  <div className="screenshot-wrapper">
                    <img src={machinePartTool} alt="Select and Arrange Machine Part" className="software-screenshot screenshot-wide" />
                  </div>
                </div>
              </div>

              <div className="section-divider"></div>

              <div className={`${getStepClass('s1-4')} ${currentIndex === 3 ? 'reading-active' : ''}`} data-reading-index="3">
                <div className="step-header">
                  <span className="step-number">4 </span>
                  <span className="step-label">Point the hole on the target face.</span>
                </div>
                <div className="step-description">
                  <p className="p-flush">Press <strong className="text-highlight">無変換 + Q</strong> to change orientation.</p>
                  <div className="flex-row-center mt-4" style={{ gap: '1rem' }}>
                    <img src={centerTool} alt="Center Tool" className="screenshot-click--inline" style={{ width: '40px' }} />
                    <img src={leftClick} alt="Left Click" className="screenshot-click--inline" style={{ width: '40px' }} />
                    <span className="text-highlight">GO</span>
                  </div>
                  <div className="screenshot-wrapper mt-4">
                    <img src={opSample1} alt="Operation Sample 1 Result" className="software-screenshot screenshot-medium" style={{ width: '400px' }} />
                  </div>
                </div>
              </div>

              <div className="section-divider"></div>

              <div className={`${getStepClass('s1-5')} ${currentIndex === 4 ? 'reading-active' : ''}`} data-reading-index="4">
                <div className="step-header">
                  <span className="step-number">5 </span>
                  <span className="step-label">Move to specified location.</span>
                </div>
                <div className="step-description">
                  <div className="screenshot-wrapper">
                    <img src={moveTool} alt="Move Component Tool" className="software-screenshot screenshot-small" style={{ height: '200px' }} />
                  </div>
                  <div className="info-box mt-4">
                    <p className="p-flush"><strong>INPUT:</strong> MOVELENGY = <strong className="text-highlight">183mm</strong></p>
                  </div>
                  <div className="screenshot-wrapper mt-4">
                    <img src={opSample1Move} alt="Move Component Result" className="software-screenshot screenshot-small" style={{ width: '150px' }} />
                  </div>
                </div>
              </div>
            </div>
          ) : isSample2 ? (
            <div className="fade-in">
              <div className="card-header">
                <h4>FINAL OPERATIONS</h4>
                <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(opSample2Steps)} onStop={stop} />
              </div>

              <div className={`${getStepClass('s2-6')} ${currentIndex === 0 ? 'reading-active' : ''}`} data-reading-index="0">
                <div className="step-header">
                  <span className="step-number">6 </span>
                  <span className="step-label">Create tool entity for long hole.</span>
                </div>
                <div className="step-description">
                  <div className="info-box">
                    <p className="p-flush"><strong>Box INPUT:</strong> Depth=16, Width=14, Height=38. Use <strong className="text-highlight">Subtract</strong>.</p>
                  </div>
                  <div className="screenshot-wrapper mt-4">
                    <img src={subtractResult} alt="Subtract Result" className="software-screenshot screenshot-wide" />
                  </div>
                </div>
              </div>

              <div className="section-divider"></div>

              <div className={`${getStepClass('s2-7')} ${currentIndex === 1 ? 'reading-active' : ''}`} data-reading-index="1">
                <div className="step-header">
                  <span className="step-number">7 </span>
                  <span className="step-label">FILLET EDGE</span>
                </div>
                <div className="step-description">
                  <div className="screenshot-wrapper">
                    <img src={filletTool} alt="Fillet Tool" className="software-screenshot screenshot-small" style={{ height: '230px' }} />
                  </div>
                  <div className="instruction-box mt-4">
                    <p className="p-flush">Radius = <strong className="text-highlight">7mm</strong>. Pick edges &gt; <strong className="text-highlight">GO</strong>.</p>
                  </div>
                  <div className="screenshot-wrapper mt-4">
                    <img src={filletResult} alt="Fillet Result" className="software-screenshot screenshot-wide" />
                  </div>
                </div>
              </div>

              <div className="section-divider"></div>

              <div className={`${getStepClass('s2-8')} ${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
                <div className="step-header">
                  <span className="step-number">8 </span>
                  <span className="step-label">COPY COMPONENT</span>
                </div>
                <div className="step-description">
                  <div className="screenshot-wrapper">
                    <img src={copyTool} alt="Copy Tool" className="software-screenshot screenshot-small" style={{ height: '200px' }} />
                  </div>
                  <div className="screenshot-wrapper mt-4">
                    <img src={copyResult} alt="Copy Result" className="software-screenshot screenshot-wide" />
                  </div>
                </div>
              </div>

              <div className="section-divider"></div>

              <div className={`${getStepClass('s2-9')} ${currentIndex === 3 ? 'reading-active' : ''}`} data-reading-index="3">
                <div className="step-header">
                  <span className="step-number">9 </span>
                  <span className="step-label">CHAMFER EDGE</span>
                </div>
                <div className="step-description">
                  <div className="screenshot-wrapper">
                    <img src={chamferTool} alt="Chamfer Tool" className="software-screenshot screenshot-small" style={{ height: '200px' }} />
                  </div>
                  <div className="info-box mt-4">
                    <p className="p-flush">Length = <strong className="text-highlight">20mm</strong>. Select edges &gt; <strong className="text-highlight">GO</strong>.</p>
                  </div>
                  <div className="screenshot-wrapper mt-4">
                    <img src={chamferResult} alt="Chamfer Result" className="software-screenshot screenshot-small" style={{ width: '160px' }} />
                  </div>
                </div>
              </div>

              <div className="section-divider"></div>

              <div className={`${getStepClass('s2-10')} ${currentIndex === 4 ? 'reading-active' : ''}`} data-reading-index="4">
                <div className="step-header">
                  <span className="step-number">10 </span>
                  <span className="step-label">CREATE 3D PART</span>
                </div>
                <div className="step-description">
                  <div className="screenshot-wrapper">
                    <img src={createPartTool} alt="Create Part Tool" className="software-screenshot screenshot-small" style={{ height: '200px' }} />
                  </div>
                  <div className="screenshot-wrapper mt-4">
                    <img src={enterPartName} alt="Enter Part Name" className="software-screenshot screenshot-medium" style={{ height: '400px', width: '400px' }} />
                  </div>
                </div>
              </div>

              <div className="section-divider"></div>

              <div className={`${getStepClass('s2-11')} ${currentIndex === 5 ? 'reading-active' : ''}`} data-reading-index="5">
                <div className="step-header">
                  <span className="step-number">11 </span>
                  <span className="step-label">Check Properties & Information</span>
                </div>
                <div className="step-description">
                  <p className="p-flush mb-4">Set Material, Layer, and Color (Step 12-13).</p>
                  <div className="flex-row-center--wrap" style={{ gap: '1rem' }}>
                    <div className="screenshot-wrapper">
                      <img src={propertiesWindow} alt="Properties Window" className="software-screenshot screenshot-medium" />
                    </div>
                    <div className="screenshot-wrapper">
                      <img src={layerInfo} alt="Layer Information" className="software-screenshot screenshot-medium" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : isSample3 ? (
            <div className="fade-in">
              <div className="card-header">
                <h4>STEP-BY-STEP PROCEDURE</h4>
                <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(opSample3Steps)} onStop={stop} />
              </div>

              <div className={`${getStepClass('s3-1')} ${currentIndex === 0 ? 'reading-active' : ''}`} data-reading-index="0">
                <div className="step-header">
                  <span className="step-number">1 </span>
                  <span className="step-label">Open and Save drawing as Drawing Number.</span>
                </div>
              </div>

              <div className="section-divider"></div>

              <div className={`${getStepClass('s3-2')} ${currentIndex === 1 ? 'reading-active' : ''}`} data-reading-index="1">
                <div className="step-header">
                  <span className="step-number">2 </span>
                  <span className="step-label">Create part by SEGMENTS.</span>
                </div>
                <div className="step-description">
                  <div className="screenshot-wrapper">
                    <img src={segmentOverview} alt="Segments Overview" className="software-screenshot screenshot-wide" />
                  </div>

                  <div className="tool-block mt-8">
                    <div className="card-header"><h4>SEGMENT A</h4></div>
                    <p className="p-flush">Use <strong className="text-highlight">Arrange Cylinder</strong> + <strong className="text-highlight">Union</strong>.</p>
                    <div className="info-box mt-4">
                      <p className="p-flush">C1: 20x3.65 | C2: 19x1.35 | C3: 20x64.5</p>
                    </div>
                    <div className="screenshot-wrapper mt-4">
                      <img src={segmentAResult} alt="Segment A Result" className="software-screenshot screenshot-wide" />
                    </div>
                  </div>

                  <div className="tool-block mt-8">
                    <div className="card-header"><h4>SEGMENT B</h4></div>
                    <p className="p-flush">30mm Dia x 22.25mm H. Use <strong className="text-highlight">Center Tool</strong> to attach.</p>
                    <div className="screenshot-wrapper mt-4">
                      <img src={segmentBResult} alt="Segment B Result" className="software-screenshot screenshot-small" style={{ width: '330px' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : isSample4 ? (
            <div className="fade-in">
              <div className="card-header">
                <h4>2D SKETCH FOUNDATION</h4>
                <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(opSample4Steps)} onStop={stop} />
              </div>

              <div className={`${getStepClass('s4-1')} ${currentIndex === 0 ? 'reading-active' : ''}`} data-reading-index="0">
                <div className="tool-block">
                  <div className="card-header"><h4>SEGMENT C</h4></div>
                  <p className="p-flush">Sketch half profile for <strong className="text-highlight">Revolving</strong>.</p>
                  <div className="flex-row-center--wrap mt-4" style={{ gap: '2rem' }}>
                    <div className="screenshot-wrapper">
                      <p className="text-caption">Work Plane</p>
                      <img src={workPlaneImg} alt="Work Plane" className="software-screenshot screenshot-small" style={{ width: '200px' }} />
                    </div>
                    <div className="screenshot-wrapper">
                      <p className="text-caption">Revolve Profile</p>
                      <img src={sketchImg} alt="Sketch" className="software-screenshot screenshot-medium" />
                    </div>
                  </div>
                  <div className="screenshot-wrapper mt-8">
                    <img src={revolveImg} alt="Revolve Result" className="software-screenshot screenshot-small" style={{ width: '300px' }} />
                  </div>
                </div>
              </div>

              <div className="section-divider"></div>

              <div className={`${getStepClass('s4-2')} ${currentIndex === 1 ? 'reading-active' : ''}`} data-reading-index="1">
                <div className="tool-block">
                  <div className="card-header"><h4>SEGMENT D & E</h4></div>
                  <p className="p-flush">Attach cylinders using <strong className="text-highlight">Center Tool</strong>.</p>
                  <div className="flex-row-center--wrap mt-4" style={{ gap: '2rem' }}>
                    <div className="screenshot-wrapper">
                      <img src={segmentDResult} alt="Segment D" className="software-screenshot screenshot-medium" />
                    </div>
                    <div className="screenshot-wrapper">
                      <img src={segmentEResult} alt="Segment E" className="software-screenshot screenshot-medium" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="section-divider"></div>

              <div className={getStepClass('s4-3')}>
                <div className="step-header">
                  <span className="step-number">3 </span>
                  <span className="step-label">JOIN ALL SEGMENTS &gt; <strong className="text-highlight">UNION</strong></span>
                </div>
              </div>

              <div className="section-divider"></div>

              <div className={`${getStepClass('s4-4')} ${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
                <div className="step-header">
                  <span className="step-number">4 </span>
                  <span className="step-label">FOR KEY GROOVE</span>
                </div>
                <div className="step-description">
                  <div className="info-box">
                    <p className="p-flush">Box: 6x3.5x43. Position precisely on face.</p>
                  </div>
                  <div className="screenshot-wrapper mt-4">
                    <img src={keyGrooveBox} alt="Key Groove Box" className="software-screenshot screenshot-medium" />
                  </div>
                  <div className="screenshot-wrapper mt-8">
                    <img src={keyGroovePos} alt="Positioning" className="software-screenshot screenshot-wide" />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="fade-in">
              <div className="card-header">
                <h4>FINAL FINISHING</h4>
                <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(opSample5Steps)} onStop={stop} />
              </div>

              <div className={`${getStepClass('s5-5')} ${currentIndex === 0 ? 'reading-active' : ''}`} data-reading-index="0">
                <div className="step-header">
                  <span className="step-number">5 </span>
                  <span className="step-label">SUBTRACT TOOL ENTITY</span>
                </div>
                <div className="step-description">
                  <div className="screenshot-wrapper">
                    <img src={keyGrooveSubtractResult} alt="Subtract Result" className="software-screenshot screenshot-medium" />
                  </div>
                  <div className="instruction-box mt-4">
                    <p className="p-flush">Add Fillet: <strong className="text-highlight">Radius = 3mm</strong>.</p>
                  </div>
                  <div className="screenshot-wrapper mt-4">
                    <img src={keyGrooveFilletResult} alt="Fillet Result" className="software-screenshot screenshot-wide" />
                  </div>
                </div>
              </div>

              <div className="section-divider"></div>

              <div className={`${getStepClass('s5-6')} ${currentIndex === 1 ? 'reading-active' : ''}`} data-reading-index="1">
                <div className="step-header">
                  <span className="step-number">6 </span>
                  <span className="step-label">ADD ALL FAIRINGS</span>
                </div>
                <div className="step-description">
                  <div className="screenshot-wrapper">
                    <img src={finalPartFairing} alt="Final Part" className="software-screenshot screenshot-medium" />
                  </div>
                </div>
              </div>

              <div className="section-divider"></div>

              <div className={`${getStepClass('s5-7')} ${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
                <div className="step-header">
                  <span className="step-number">7 </span>
                  <span className="step-label">CREATE 3D PART & SAVE</span>
                </div>
                <div className="step-description">
                  <p className="p-flush">Follow standard naming and save via <strong className="text-highlight">File &gt; Save</strong>.</p>
                </div>
              </div>
            </div>
          )}

          <div className="lesson-navigation">
            <button className="nav-button" onClick={onPrevLesson}><ChevronLeft size={18} /> Previous</button>
            <button className="nav-button next" onClick={onNextLesson}>{nextLabel || 'Next Lesson'} <ChevronRight size={18} /></button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default OperationSampleLesson; 
