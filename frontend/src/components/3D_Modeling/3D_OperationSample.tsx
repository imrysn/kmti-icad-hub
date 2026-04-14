/** * 3D_OperationSample.tsx  EOperation Sample lessons */

import React,
{

  useState,

  useEffect, useRef
} from 'react';

import { ChevronLeft, ChevronRight, Play, Box as BoxIcon, Info } from 'lucide-react'; import { ReadAloudButton } from "../ReadAloudButton";
import { useTTS } from "../../hooks/useTTS";

import '../../styles/3D_Modeling/CourseLesson.css';
/* Shared Assets */

import leftClick from '../../assets/3D_Image_File/left_click.png';

import centerTool from '../../assets/3D_Image_File/center_tool.png';
/* Operation Sample (1) Assets */

import mainDrawing from '../../assets/3D_Image_File/sample_3d_modeling_parts.png';

import arrangeBoxTool from '../../assets/3D_Image_File/arrange_box_operation_sample1.png';

import machinePartTool from '../../assets/3D_Image_File/select_and_arrange_machine_part.png';

import moveTool from '../../assets/3D_Image_File/component(1)_move.png';

import opSample1 from '../../assets/3D_Image_File/operation_sample(1).png';

import opSample1Move from '../../assets/3D_Image_File/operation_sample(1)1.png';
/* Step 6 Assets */

import subtractTool from '../../assets/3D_Image_File/boolean(1)_boolean_subtract.png';

import subtractResult from '../../assets/3D_Image_File/subtract_operation_sample2.png';
/* Step 7 Assets */

import filletTool from '../../assets/3D_Image_File/fillet_edge.png';

import filletResult from '../../assets/3D_Image_File/filleted.png';
/* Step 8 Assets */

import copyTool from '../../assets/3D_Image_File/component(1)_copy.png';

import copyResult from '../../assets/3D_Image_File/copy_component.png';
/* Step 9 Assets */

import chamferTool from '../../assets/3D_Image_File/chamfer_edge.png';
import chamferResult from '../../assets/3D_Image_File/chamfered.png';
/* Step 10 Assets */
import createPartTool from '../../assets/3D_Image_File/3d_part(1)_create_3d_part.png';
import enterPartName from '../../assets/3D_Image_File/enter_3d_part_name.png';
/* Step 11 Assets */
import propertiesWindow from '../../assets/3D_Image_File/3d_properties.png';
/* Step 12 Assets */
import materialSettings from '../../assets/3D_Image_File/material_setting(1)_material_setting.png';
import layerInfo from '../../assets/3D_Image_File/materials_layer.png';
/* Step 13 Assets */
import fileMenu from '../../assets/3D_Image_File/tool_bars_file.png';
/* Operation Sample (3) Assets */
import mainDrawing3 from '../../assets/3D_Image_File/operation_sample3.png';
import segmentOverview from '../../assets/3D_Image_File/operation_sample3_segment.png';
import segmentAResult from '../../assets/3D_Image_File/operation_sample3_segment_a.png';
import segmentBResult from '../../assets/3D_Image_File/operation_sample3_segment_b.png';
import unionTool from '../../assets/3D_Image_File/boolean(1)_union.png';
/* Operation Sample (4) Assets */
import mainDrawing4 from '../../assets/3D_Image_File/operation_sample(3).png';
import workPlaneImg from '../../assets/3D_Image_File/operation_sample4_work_plane.png';
import sketchImg from '../../assets/3D_Image_File/operation_sample4_revolving.png';
import revolveImg from '../../assets/3D_Image_File/operation_sample4_revolve.png';
import segmentDResult from '../../assets/3D_Image_File/operation_sample4_segment_d.png';
import segmentEResult from '../../assets/3D_Image_File/operation_sample4_segment_e.png';
import keyGrooveBox from '../../assets/3D_Image_File/operation_sample4_4.png';
import keyGroovePos from '../../assets/3D_Image_File/operation_sample4_4_position_tool_entity.png';
import arrangeBoxIcon from '../../assets/3D_Image_File/basic_operation(1)_arrange_box.png';
/* Operation Sample (5) Assets */
import keyGrooveSubtractResult from '../../assets/3D_Image_File/operation_sample5_4_subtract_tool.png';
import keyGrooveFilletResult from '../../assets/3D_Image_File/operation_sample5_4_add_fillet_radius.png';
import finalPartFairing from '../../assets/3D_Image_File/operation_sample5_6.png';

interface OperationSampleLessonProps {
  nextLabel?: string; subLessonId?: string; onNextLesson?: () => void; onPrevLesson?: () => void;
}

const OperationSampleLesson: React.FC<OperationSampleLessonProps> = ({ subLessonId = 'op-sample-1', onNextLesson, onPrevLesson
  , nextLabel }) => {

  const [scrollProgress, setScrollProgress] =

    useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const { speak, stop, isSpeaking, currentIndex } = useTTS();

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

  useEffect(() => {

    const handleScroll = () => {

      if (!containerRef.current) return;

      const element = containerRef.current;

      const totalHeight = element.scrollHeight - element.clientHeight;

      if (totalHeight === 0) { setScrollProgress(100); return; }

      const progress = (element.scrollTop / totalHeight) * 100; setScrollProgress(progress);
    };

    const currentContainer = containerRef.current;

    if (currentContainer) {
      currentContainer.addEventListener('scroll', handleScroll);
      handleScroll(); // Initial trigger
    }

    return () => {

      if (currentContainer) { currentContainer.removeEventListener('scroll', handleScroll); }
    };
  }, [subLessonId]);

  const getStepClass = (stepId: string) => "instruction-step";
  const isSample1 = subLessonId === 'op-sample-1';

  const isSample2 = subLessonId === 'op-sample-2';

  const isSample3 = subLessonId === 'op-sample-3';

  const isSample4 = subLessonId === 'op-sample-4';

  const isSample5 = subLessonId === 'op-sample-5';

  return (

    <div className="course-lesson-container" ref={containerRef}>
      {/* Sticky Progress Bar */}

      <div className="lesson-progress-container">

        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />

      </div>

      <section className="lesson-intro">

        <h3 className="section-title">
          {isSample1 ? 'OPERATION SAMPLE (1)' : isSample2 ? 'OPERATION SAMPLE (2)' : isSample3 ? 'OPERATION SAMPLE (3)' : isSample4 ? 'OPERATION SAMPLE (4)' : 'OPERATION SAMPLE (5)'}
          <ReadAloudButton isSpeaking={isSpeaking} onStart={() => {
            if (isSample1) speak(opSample1Steps);
            else if (isSample2) speak(opSample2Steps);
            else if (isSample3) speak(opSample3Steps);
            else if (isSample4) speak(opSample4Steps);
            else speak(opSample5Steps);
          }}
            onStop={stop}
          />
        </h3>
        {isSample1 ? (

          <div className="instruction-box" /* sanitized: marginTop: '1.5rem' */>

            <div className="image-wrapper-flush">

              <img src={mainDrawing} alt="3D Modeling Samples" className="software-screenshot screenshot-wide" />

            </div>

          </div>
        ) : isSample2 ? (

          <p className="p-flush">

          </p>
        ) : (

          <div className="instruction-box" /* sanitized: marginTop: '1.5rem' */> <h4 className="section-title">3D Modeling Using 2D Sketch, Key Groove, Retainer Ring Groove</h4>

            <div className="image-wrapper-flush">

              <img src={isSample4 ? mainDrawing4 : mainDrawing3} alt={isSample4 ? "Sample 4 Technical Drawing" : "Sample 3 Technical Drawing"} className="software-screenshot screenshot-wide" />

            </div>

            <p className="p-flush">Let us try this drawing for example:
            </p>

          </div>
        )}

      </section>

      <div className="lesson-grid single-card">

        <div className="lesson-card">
          {isSample1 ? (

            <div className="tab-pane"> <h4 className="section-title">HERE IS THE STEP-BY-STEP PROCEDURE OF CREATING 3D MODEL</h4>
              {/* STEP 1 */}

              <div className={`${getStepClass('s1-1')} ${currentIndex === 0 ? 'reading-active' : ''}`}>

                <div className="step-header"> <span className="step-number">
                  1 </span> <span className="step-label">Open a new drawing: Go to <strong className="text-highlight">File &gt; New</strong></span>

                </div>

                <div className="step-description" /* sanitized: paddingLeft: '2.5rem' */>

                  <p className="p-flush">Save the drawing: <strong className="text-highlight">File &gt; Save As</strong> &gt; Use drawing number as File Name &gt; Press <strong className="text-highlight">Save</strong>.
                  </p>

                  <p className="p-flush">*Check

                    if Normal or Mirror Part (See page 37)
                  </p>

                </div>

              </div>
              {/* STEP 2 */}

              <div className={`${getStepClass('s1-2')} ${currentIndex === 1 ? 'reading-active' : ''}`}>

                <div className="step-header"> <span className="step-number">
                  2 </span> <span className="step-label">Arrange Box</span>

                </div>

                <div className="flex-row-center--wrap">

                  <div className="image-wrapper-flush">

                    <img src={arrangeBoxTool} alt="Arrange Box Tool" className="software-screenshot screenshot-medium" />

                  </div>

                  <div className="step-description">

                    <p className="p-flush"><strong>INPUT:</strong>
                    </p> <ul className="interaction-list--plain"> <li>Depth = <strong className="text-highlight">16mm</strong></li> <li>Width = <strong className="text-highlight">100mm</strong></li> <li>Height = <strong className="text-highlight">210mm</strong></li> <li>Coordinates <strong className="text-highlight">(0,0,0)</strong></li> </ul>

                  </div>

                </div>

              </div>
              {/* STEP 3 */}

              <div className={`${getStepClass('s1-3')} ${currentIndex === 2 ? 'reading-active' : ''}`}>

                <div className="step-header"> <span className="step-number">
                  3 </span> <span className="step-label">Select and Arrange Machine Part</span>

                </div>

                <div className="image-wrapper-flush" /* sanitized: paddingLeft: '2.5rem' */>

                  <img src={machinePartTool} alt="Select and Arrange Machine Part" className="software-screenshot screenshot-large" />

                </div>

              </div>
              {/* STEP 4 */}

              <div className={`${getStepClass('s1-4')} ${currentIndex === 3 ? 'reading-active' : ''}`}>

                <div className="step-header"> <span className="step-number">
                  4 </span> <span className="step-label">Point the hole on the face where the hole is located.</span>

                </div>

                <div className="step-description" /* sanitized: paddingLeft: '2.5rem' */>

                  <div className="flex-row-center--wrap">

                    <div /* sanitized: flex: 1 */>

                      <div className="flex-row-center">

                        <p className="p-flush">Press <strong className="text-highlight">無変換 + Q</strong> to make the tool change its orientation.
                        </p>

                      </div>

                      <div className="flex-row-center">

                        <p className="p-flush">Click on the center

                          <img src={centerTool} alt="Center Tool" className="screenshot-click--inline" style={{ width: '40px', verticalAlign: 'middle', margin: '0 4px' }} />
                        </p>

                      </div>

                      <div className="flex-row-center">

                        <p className="p-flush">Left-click on the selected point &gt; <strong className="text-highlight">GO</strong>
                          <img src={leftClick} alt="Left Click" className="screenshot-click--inline" style={{ width: '40px', verticalAlign: 'middle', margin: '0 4px' }} />
                        </p>

                      </div>

                    </div>

                    <div className="image-wrapper-flush">

                      <img src={opSample1} alt="Operation Sample 1 Result" className="software-screenshot screenshot-medium" />

                    </div>

                  </div>

                </div>

              </div>
              {/* STEP 5 */}

              <div className={`${getStepClass('s1-5')} ${currentIndex === 4 ? 'reading-active' : ''}`}>

                <div className="step-header"> <span className="step-number">
                  5 </span> <span className="step-label">Select the hole component &gt; <strong className="text-highlight">GO</strong>. Move it to the specified location.</span>

                </div>

                <div className="step-description" /* sanitized: paddingLeft: '2.5rem' */>

                  <div className="flex-row-center--wrap">

                    <div className="image-wrapper-flush flex-no-shrink">

                      <img src={moveTool} alt="Move Component Tool" className="software-screenshot screenshot-small" />

                    </div>

                    <div /* sanitized: flex: 1 */>

                      <p className="p-flush"><strong>INPUT:</strong>
                      </p> <ul className="interaction-list"> <li>MOVELENGX = <strong className="text-highlight">0</strong></li> <li>MOVELENGY = <strong className="text-highlight">183mm</strong></li> <li>MOVELENGZ = <strong className="text-highlight">0</strong></li> </ul>

                    </div>

                    <div className="image-wrapper-flush flex-no-shrink">

                      <img src={opSample1Move} alt="Move Component Result" className="software-screenshot screenshot-small" />

                    </div>

                  </div>

                </div>

              </div>

            </div>
          ) : subLessonId === 'op-sample-2' ? (

            <div className="tab-pane"> <h4 className="section-title">SAMPLES OF 3D MODELING OF PARTS</h4>
              {/* STEP 6 */}

              <div className={getStepClass('s2-6')}>

                <div className="step-header"> <span className="step-number">
                  6 </span> <span className="step-label">For making long hole details, first create a tool entity.</span>

                </div>

                <div className="step-description" /* sanitized: paddingLeft: '2.5rem' */>

                  <div className="flex-row-center--wrap">

                    <div /* sanitized: flex: 1 */>

                      <p className="p-flush"><strong>Arrange Box</strong>
                      </p>

                      <p className="p-flush"><strong>INPUT:</strong>
                      </p> <ul className="interaction-list"> <li>Depth = <strong className="text-highlight">16mm</strong></li> <li>Width = <strong className="text-highlight">14mm</strong></li> <li>Height = <strong className="text-highlight">38mm</strong></li> </ul>

                      <p className="p-flush">Position the tool entity on the location to be cut then use <strong className="text-highlight">Subtract</strong>.
                      </p>

                    </div>

                    <div className="image-wrapper-flush">

                      <img src={subtractResult} alt="Subtract Result" className="software-screenshot screenshot-large" />

                    </div>

                  </div>

                </div>

              </div>
              {/* STEP 7 */}

              <div className={getStepClass('s2-7')}>

                <div className="step-header"> <span className="step-number">
                  7 </span> <span className="step-label">Fillet Edge</span>

                </div>

                <div className="step-description" /* sanitized: paddingLeft: '2.5rem' */>

                  <div className="flex-row-center--wrap">

                    <div /* sanitized: flex: 1 */>

                      <div className="image-wrapper-flush">

                        <img src={filletTool} alt="Fillet Tool" className="software-screenshot screenshot-small" />

                      </div>

                      <p className="p-flush">Set Radius = <strong className="text-highlight"> 7mm</strong>
                      </p>

                      <p className="p-flush">Pick all the edges to be filleted &gt; <strong className="text-highlight">GO</strong>
                        <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '40px', verticalAlign: 'middle', margin: '0 4px' }} />
                      </p>

                    </div>

                    <div className="image-wrapper-flush">

                      <img src={filletResult} alt="Fillet Result" className="software-screenshot screenshot-large" />

                    </div>

                  </div>

                </div>

              </div>
              {/* STEP 8 */}

              <div className={getStepClass('s2-8')}>

                <div className="step-header"> <span className="step-number">
                  8 </span> <span className="step-label">Copy Component</span>

                </div>

                <div className="step-description" /* sanitized: paddingLeft: '2.5rem' */>

                  <div className="flex-row-center--wrap">

                    <div /* sanitized: flex: 1 */>

                      <div className="image-wrapper-flush">

                        <img src={copyTool} alt="Copy Tool" className="software-screenshot screenshot-small" />

                      </div>

                    </div>

                    <div className="image-wrapper-flush">

                      <img src={copyResult} alt="Copy Result" className="software-screenshot screenshot-large" />

                    </div>

                  </div>

                </div>

              </div>
              {/* STEP 9 */}

              <div className={getStepClass('s2-9')}>

                <div className="step-header"> <span className="step-number">
                  9 </span> <span className="step-label">Chamfer Edge</span>

                </div>

                <div className="step-description" /* sanitized: paddingLeft: '2.5rem' */>

                  <div className="flex-row-center--wrap">

                    <div /* sanitized: flex: 1 */>

                      <div className="image-wrapper-flush">

                        <img src={chamferTool} alt="Chamfer Tool" className="software-screenshot screenshot-small" />

                      </div>

                      <p className="p-flush">Set Chamfer Length = <strong className="text-highlight">20mm</strong>
                      </p>

                      <p className="p-flush">Select all edges to be chamfered &gt; <strong className="text-highlight">GO</strong>
                        <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '40px', verticalAlign: 'middle', margin: '0 4px' }} />
                      </p>

                    </div>

                    <div className="image-wrapper-flush">

                      <img src={chamferResult} alt="Chamfer Result" className="software-screenshot screenshot-small" />

                    </div>

                  </div>

                </div>

              </div>
              {/* STEP 10 */}

              <div className={getStepClass('s2-10')}>

                <div className="step-header"> <span className="step-number">
                  10 </span> <span className="step-label">Create 3D Part Name</span>

                </div>

                <div className="step-description" /* sanitized: paddingLeft: '2.5rem' */>

                  <div className="flex-row-center--wrap">

                    <div /* sanitized: flex: 1 */>

                      <div className="image-wrapper-flush">

                        <img src={createPartTool} alt="Create Part Tool" className="software-screenshot screenshot-small" />

                      </div>

                      <p className='p-flush'>Select the entity &gt; <strong className="text-highlight">GO</strong>
                        <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '40px', verticalAlign: 'middle', margin: '0 4px' }} />
                      </p>

                      <p className='p-flush'>Enter the 3D Part Name
                      </p>

                    </div>

                    <div className="image-wrapper-flush">

                      <img src={enterPartName} alt="Enter Part Name" className="software-screenshot screenshot-medium" />

                    </div>

                  </div>

                </div>

              </div>
              {/* STEP 11 */}

              <div className={getStepClass('s2-11')}>

                <div className="step-header"> <span className="step-number">
                  11 </span> <span className="step-label">Check properties of Top 3D Part</span>

                </div>

                <div className="step-description" /* sanitized: paddingLeft: '2.5rem' */>

                  <div className="flex-row-center--wrap">

                    <div className="image-wrapper-flush">

                      <img src={propertiesWindow} alt="Properties Window" className="software-screenshot screenshot-large" />

                    </div>

                  </div>

                </div>

              </div>
              {/* STEP 12 */}

              <div className={getStepClass('s2-12')}>

                <div className="step-header"> <span className="step-number">
                  12 </span> <span className="step-label">Set all necessary information (Material, Layer, Color)</span>

                </div>

                <div className="step-description" /* sanitized: paddingLeft: '2.5rem' */>

                  <div className="flex-row-center--wrap">

                    <div className="image-wrapper-flush">

                      <img src={layerInfo} alt="Layer Information" className="software-screenshot screenshot-large" />

                    </div>

                  </div>

                </div>

              </div>
              {/* STEP 13 */}

              <div className={getStepClass('s2-13')}>

                <div className="step-header"> <span className="step-number">
                  13 </span> <span className="step-label">Save the file <strong className="text-highlight">File &gt; Save</strong></span>

                </div>

              </div>

            </div>
          ) : isSample3 ? (

            <div className="tab-pane"> <h4 className="section-title">HERE IS THE STEP-BY-STEP PROCEDURE OF CREATING 3D MODEL</h4>

              <div className={getStepClass('s3-1')}>

                <div className="step-header"> <span className="step-number">
                  1 </span> <span className="step-label">Open a new drawing: Go to <strong className="text-highlight">File &gt; New</strong></span>

                </div>

                <div className="step-description" /* sanitized: paddingLeft: '2.5rem' */>

                  <p className="p-flush">Save the drawing: <strong className="text-highlight">File &gt; Save As</strong> &gt; Use drawing number as File Name &gt; Press <strong className="text-highlight">Save</strong>.
                  </p>

                  <p className="p-flush">*Check

                    if Normal or Mirror Part (See page 37)
                  </p>

                </div>

              </div>
              {/* STEP 2 */}

              <div className={getStepClass('s3-2')}>

                <div className="step-header"> <span className="step-number">
                  2 </span> <span className="step-label">In order to create this part, it must be done by segments. Segments must be attach together after modeling.</span>

                </div>

                <div className="step-description" /* sanitized: paddingLeft: '2.5rem' */>

                  <div className="image-wrapper-flush" /* sanitized: marginTop: '1.5rem' */>

                    <img src={segmentOverview} alt="Segments Overview" className="software-screenshot screenshot-wide" />

                  </div>

                </div>

                <div className="flex-row">
                  {/* SEGMENT A */}

                  <div > <h4 className="section-title">SEGMENT A</h4>

                    <div className="flex-row-center">

                      <p className="p-flush">Use <strong className="text-highlight">Arrange Cylinder</strong>
                      </p>

                    </div>

                    <div className="flex-row-center">

                      <p className="p-flush">Create 3 cylinders to make the retainer ring groove &gt; <strong className="text-highlight">[UNION]</strong>
                      </p>

                    </div> <ul className="interaction-list--plain"> <li>Cylinder 1: <strong className="text-highlight">Diameter = 20mm, Height = 3.65mm, Coordinates (0,0,0)</strong></li> <li>Cylinder 2: <strong className="text-highlight">Diameter = 19mm, Height = 1.35mm</strong></li> <li>Cylinder 3: <strong className="text-highlight">Diameter = 20mm, Height = 64.5mm</strong></li> </ul>

                    <div className="flex-row-center">

                      <div className="image-wrapper-flush">

                        <img src={segmentAResult} alt="Segment A Result" className="software-screenshot screenshot-large" />

                      </div>

                    </div>

                  </div>
                  {/* SEGMENT B */}

                  <div > <h4 className="section-title">SEGMENT B</h4>

                    <div className="flex-row-center">

                      <p className="p-flush">Use <strong className="text-highlight">Arrange Cylinder</strong>
                      </p>

                    </div>

                    <p className="p-flush">INPUT:
                    </p> <ul className="interaction-list--plain"> <li>Diameter = <strong className="text-highlight">30mm</strong></li> <li>Height = <strong className="text-highlight">22.25mm</strong></li> </ul>

                    <div className="flex-row-center">

                      <p className="p-flush">Use <strong className="text-highlight">Center tool</strong> &gt; Attach to Segment A
                      </p>

                    </div>

                    <div className="image-wrapper-flush">

                      <img src={segmentBResult} alt="Segment B Result" className="software-screenshot screenshot-medium" />

                    </div>

                  </div>

                </div>

              </div>

            </div>
          ) : isSample4 ? (

            <div className="tab-pane">

              <div className={getStepClass('s4-1')}>

                <div className="step-header"> <span className="step-number">
                  1 </span> <span className="step-label">SEGMENT C</span>

                </div>

                <div /* sanitized: paddingLeft: '2.5rem' */>

                  <p className="p-flush">In this case, 2D Sketch is recommended in creating the 3D model for this part in order to get the required dimensions precisely. dimensions enclosed in parentheses are close but not exact with the original dimension.
                  </p>

                  <div className="flex-row">

                    <div /* sanitized: flex: 1 */>

                      <p className="p-flush">Open Work Plane
                      </p>

                      <p className="p-flush">Use <strong className="text-highlight">Center</strong> &gt; Place at end of Segment B
                      </p>

                      <div className="image-wrapper-flush">

                        <img src={workPlaneImg} alt="Open Work Plane" className="software-screenshot screenshot-small" />

                      </div>

                    </div>

                    <div /* sanitized: flex: 1 */>

                      <p className="p-flush">Sketch half of segment C (For revolving)
                      </p>

                      <p className="p-flush">*These are the dimensions that must be prioritized.
                      </p>

                      <div className="image-wrapper-flush">

                        <img src={sketchImg} alt="Sketch half of Segment C" className="software-screenshot screenshot-medium" />

                      </div>

                    </div>

                  </div>

                  <div className="flex-row-center">

                    <div /* sanitized: flex: 1 */>

                      <div className="step-header"> <span className="step-label">Use <strong className="text-highlight">Revolve (2D &gt;&gt; 3D)</strong></span>

                      </div>

                      <div className="image-wrapper-flush">

                        <img src={revolveImg} alt="Revolve Result" className="software-screenshot screenshot-medium" />

                      </div>

                    </div>

                    <div /* sanitized: flex: 1 */> <h4 className="section-title">SEGMENT D</h4>

                      <div className="step-header"> <span className="step-label">Use <strong className="text-highlight">Arrange Cylinder</strong></span>

                      </div> <ul className="interaction-list--plain">

                        <p className="p-flush">INPUT:
                        </p> <li>Diameter = 20mm</li> <li>Height = 32.5mm</li> </ul>

                      <div className="step-header"> <span className="step-label">Use <strong className="text-highlight">Center tool</strong> &gt; Attach to Segment C</span>

                      </div>

                      <div className="image-wrapper-flush">

                        <img src={segmentDResult} alt="Segment D Result" className="software-screenshot screenshot-medium" />

                      </div>

                    </div>

                  </div>

                </div>

              </div>

              <div className="section-divider">
              </div>

              <div className={getStepClass('s4-2')}>

                <div className="step-header"> <span className="step-number">
                  2 </span> <span className="step-label">SEGMENT E</span>

                </div>

                <div className="step-description">

                  <div className="step-header"> <span className="step-label">Use <strong className="text-highlight">Arrange Cylinder</strong></span>

                  </div> <ul className="interaction-list--plain">

                    <p className="p-flush">INPUT:
                    </p> <li>Diameter = 20mm</li> <li>Height = 32.5mm</li> </ul>

                  <div className="step-header"> <span className="step-label">Use <strong className="text-highlight">Center tool</strong> &gt; Attach to Segment D</span>

                  </div>

                  <div className="image-wrapper-flush">

                    <img src={segmentEResult} alt="Segment E Result" className="software-screenshot screenshot-medium" />

                  </div>

                </div>

              </div>

              <div className="section-divider">
              </div>
              {/* JOIN ALL SEGMENTS */}

              <div className={getStepClass('s4-3')}>

                <div className="step-header"> <span className="step-number">
                  3 </span> <span className="step-label">JOIN ALL SEGMENTS &gt; Use UNION</span>

                </div>

              </div>

              <div className="section-divider">
              </div>
              {/* FOR KEY GROOVE */}

              <div className={getStepClass('s4-4')}>

                <div className="step-header"> <span className="step-number">
                  4 </span> <span className="step-label">For Key Groove</span>

                </div>

                <div className="flex-row">

                  <div /* sanitized: flex: 1 */>

                    <div className="step-header"> <span className="step-label">Create the tool entity first</span>

                    </div>

                    <div className="step-header"> <span className="step-label">Use <strong className="text-highlight">Arrange Box</strong></span>

                    </div> <ul className="interaction-list--plain">

                      <p className="p-flush">INPUT:
                      </p> <li>Depth = 6mm</li> <li>Width = 3.5mm</li> <li>Height = 43mm</li> </ul>

                    <div className="image-wrapper-flush">

                      <img src={keyGrooveBox} alt="Key Groove Box Tool" className="software-screenshot screenshot-medium" />

                    </div>

                  </div>

                  <div /* sanitized: flex: 1 */>

                    <div className="step-header">

                    </div>

                    <div className="image-wrapper-flush">

                      <img src={keyGroovePos} alt="Position the tool entity" className="software-screenshot screenshot-medium" />

                    </div>

                  </div>

                </div>

              </div>

            </div>
          ) : isSample5 ? (

            <div className="tab-pane"> <h4 className="section-title">FINAL FINISHING OPERATIONS</h4>
              {/* STEP 5 */}

              <div className={getStepClass('s5-5')}>

                <div className="step-header"> <span className="step-number">
                  5 </span> <span className="step-label">Subtract the tool entity</span>

                </div>

                <div className="flex-row">

                  <div /* sanitized: flex: 1 */>

                    <div className="step-header">

                    </div>

                    <div className="image-wrapper-flush">

                      <img src={keyGrooveSubtractResult} alt="Subtract Key Groove" className="software-screenshot screenshot-medium" />

                    </div>

                  </div>

                  <div /* sanitized: flex: 1 */>

                    <div className="step-header"> <span className="step-label">Add Fillet on the key groove</span>

                    </div>

                    <div className="step-description">

                      <p className="p-flush">INPUT: <strong className="text-highlight">Radius = 3mm</strong>
                      </p>

                    </div>

                    <div className="image-wrapper-flush">

                      <img src={keyGrooveFilletResult} alt="Fillet Key Groove" className="software-screenshot screenshot-large" />

                    </div>

                  </div>

                </div>

              </div>
              {/* STEP 6 */}

              <div className={getStepClass('s5-6')}>

                <div className="step-header"> <span className="step-number">
                  6 </span> <span className="step-label">Add all Fairings (Chamfer and Fillet)</span>

                </div>

                <div className="image-wrapper-flush">

                  <img src={finalPartFairing} alt="Final Part Fairing" className="software-screenshot screenshot-medium" />

                </div>

              </div>

              <div className={getStepClass('s5-7')}>

                <div className="step-header"> <span className="step-number">
                  7 </span> <span className="step-label">Create 3D Part Name</span>

                </div>

              </div>
              {/* STEP 8 */}

              <div className={getStepClass('s5-8')}>

                <div className="step-header"> <span className="step-number">
                  8 </span> <span className="step-label">Check the properties of the Top 3D Part</span>

                </div>

              </div>
              {/* STEP 9 */}

              <div className={getStepClass('s5-9')}>

                <div className="step-header"> <span className="step-number">
                  9 </span> <span className="step-label">Set all necessary informations (Material, Layer, Color)</span>

                </div>

              </div>

              <div className={getStepClass('s5-10')}>

                <div className="step-header"> <span className="step-number">
                  10 </span> <span className="step-label">Go to <strong className="text-highlight">File &gt; Save</strong> to save the file.</span>

                </div>

              </div>

            </div>
          ) : (

            <div className="content-placeholder">

              <p>Content for
                {subLessonId} will be provided soon.
              </p>

            </div>
          )}

          <div className="lesson-navigation"> <button className="nav-button" onClick={onPrevLesson}><ChevronLeft size={18} /> Previous</button> <button className="nav-button next" onClick={onNextLesson}>{nextLabel || 'Next Lesson'} <ChevronRight size={18} /></button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default OperationSampleLesson; 
