/** * 3D_OperationSample.tsx – Operation Sample lessons */

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Box as BoxIcon, Info } from 'lucide-react';
import { useLessonCore } from '../../hooks/useLessonCore';
import { ReadAloudButton } from "../ReadAloudButton";
import '../../styles/3D_Modeling/CourseLesson.css';

/* Shared Assets */
import leftClick from '../../assets/3D_Image_File/left_click.png';
import pressQIcon from '../../assets/3D_Image_File/press_q.png';
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
import mainDrawing2 from '../../assets/3D_Image_File/operation_sample_2.jpg';
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
  const [activeTab, setActiveTab] = useState<'sample1' | 'sample2'>(() => {
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
    "Step 1: Open a new drawing. Go to File, New. Save the drawing as the File Name. Check if Normal or Mirror Part. Press Save.",
    "Step 2: Use Arrange Box. Input Depth 16mm, Width 100mm, Height 210mm at Coordinates 0,0,0.",
    "Step 3: Select and Arrange Machine Part using the standard KEM holes.",
    "Step 4: Point the hole on the face. Press Muhenkan plus Q to orient it, select the center point, and left-click GO.",
    "Step 5: Use Move Component on the hole. Input MOVELENGY 183mm to move it to the correct location.",
    "Step 6: For making long hole details, first create a tool entity. Arrange a Box 16 by 14 by 38mm. Position it and use subtract to create the cut.",
    "Step 7: Apply FilletEdge with a 7mm radius. Pick all the edges to be filleted and click GO.",
    "Step 8: Use Copy Component to duplicate the slot features. Input the specific X and Y movements.",
    "Step 9: Apply Chamfer Edge with a 20mm length. Select the edges and click GO.",
    "Step 10: Create 3D PartName. Select the entity, click GO, and enter the part name.",
    "Step 11: Check the properties of the Top 3D Part. Delete command artifacts and add comments.",
    "Step 12: Set all necessary informations like Material, Layer, and Color.",
    "Step 13: Save the file via File, Save."
  ];

  const opSample2Steps = [
    "Step 1: Open a new drawing. Go to File, New. Save the drawing as the File Name. Check if Normal or Mirror Part. Press Save.",
    "Step 2: Create the part by segments. Segments must be attached together after modeling. Model Segments A, B, C, D, and E using Arrange Cylinder, Work Plane, and Revolve operations.",
    "Step 3: Join all segments. Use UNION.",
    "Step 4: For Key Groove: Create the tool entity first. Use Arrange Box with Depth 6mm, Width 3.5mm, and Height 43mm. Position the tool entity.",
    "Step 5: Subtract the tool entity. Add Fillet on the key groove with Radius 3mm.",
    "Step 6: Add all Fairings including Chamfer and Fillet.",
    "Step 7: Create 3D Part Name.",
    "Step 8: Check the properties of the Top 3D Part.",
    "Step 9: Set all necessary informations such as Material, Layer, and Color.",
    "Step 10: Save the file via File, Save."
  ];

  const handleNext = () => {
    if (activeTab === 'sample1') setActiveTab('sample2');
    else if (onNextLesson) onNextLesson();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrev = () => {
    if (activeTab === 'sample2') setActiveTab('sample1');
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
        <button className={`tab-button ${activeTab === 'sample1' ? 'active' : ''}`} onClick={() => setActiveTab('sample1')}>OPERATION SAMPLE 1</button>
        <button className={`tab-button ${activeTab === 'sample2' ? 'active' : ''}`} onClick={() => setActiveTab('sample2')}>OPERATION SAMPLE 2</button>
      </div>

      <section className={`lesson-intro mt-4 ${isSpeaking && currentIndex === -1 ? 'reading-active' : ''}`}>
        <h3 className="section-title" style={{ textTransform: 'uppercase' }}>
          {activeTab === 'sample1' ? 'SAMPLE OF 3D MODELING OF PARTS' :
           '3D MODELING USING 2D SKETCH, KEY GROOVE, RETAINER RING GROOVE'}
        </h3>
        {activeTab === 'sample1' && (
          <div className="screenshot-wrapper mt-4">
            <img src={mainDrawing} alt="Bracket Technical Drawing" className="software-screenshot" style={{ width: "900px", height: "auto" }} />
          </div>
        )}
        {activeTab === 'sample2' && (
          <div className="screenshot-wrapper mt-4">
            <img src={mainDrawing2} alt="Shaft Technical Drawing" className="software-screenshot" style={{ width: "900px", height: "auto" }} />
          </div>
        )}
      </section>

      <div className="lesson-grid single-card">
        {activeTab === 'sample1' && (
          <div className="lesson-card tab-content fade-in">
            <div className="card-header" style={{ marginBottom: "2rem" }}>
              <h4>HERE IS THE STEP-BY-STEP PROCEDURE OF CREATING 3D MODEL</h4>
              <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(opSample1Steps)} onStop={stop} />
            </div>

            {/* Step 1 */}
            <div className={`${getStepClass('s1-1')} ${currentIndex === 0 ? 'reading-active' : ''}`} data-reading-index="0" style={{marginTop: "-2rem"}}>
              <div className="step-header">
                <span className="step-number">1</span>
                <span className="step-label">Open a new drawing</span>
              </div>
              <p className="p-flush" style={{ marginLeft: "3rem", marginTop: "-1rem" }}>Go to File &gt; New</p>
              <p className="p-flush" style={{ marginLeft: "3rem", marginTop: "-1rem" }}>Save the drawing</p>
              <p className="p-flush" style={{ marginLeft: "3rem", marginTop: "-1rem" }}>File &gt; Save As &gt; Use drawing number as File Name.</p>
              <p className="p-flush red-text" style={{ marginLeft: "3rem", marginTop: "-1rem" }}>Check if Normal or Mirror Part (See page 37)</p>
              <p className="p-flush" style={{ marginLeft: "3rem", marginTop: "-1rem" }}>Press Save</p>
            </div>

            {/* Step 2 */}
            <div className={`${getStepClass('s1-2')} ${currentIndex === 1 ? 'reading-active' : ''}`} data-reading-index="1" style={{marginTop: "-3rem"}}>
              <div className="step-header" style={{ marginBottom: "1rem" }}>
                <span className="step-number">2 </span>
                <span className="step-label">Arrange Box</span>
              </div>
              <div className="flex-row-wrap" style={{ gap: '2rem', marginLeft: "3rem" }}>
                <div>
                  <div className="screenshot-wrapper mb-4">
                    <img src={arrangeBoxTool} alt="Arrange Box Tool" className="software-screenshot" style={{ height: '300px' }} />
                  </div>
                  <div style={{ marginTop: "-7rem"}}>
                  <p className="p-flush">INPUT: Depth = 16mm</p>
                  <p className="p-flush" style={{ paddingLeft: '3.7rem' }}>Width = 100mm</p>
                  <p className="p-flush" style={{ paddingLeft: '3.7rem' }}>Height = 210mm</p>
                  <p className="p-flush" style={{ paddingLeft: '3.7rem' }}>Coordinates (0,0,0)</p>
                </div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className={`${getStepClass('s1-3')} ${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2" style={{marginTop: "-2rem"}}>
              <div className="step-header" style={{ marginBottom: "1rem" }}>
                <span className="step-number">3</span>
                <span className="step-label">Select and Arrange Machine Part</span>
              </div>
              <div style={{ marginLeft: "3rem" }}>
                <div className="screenshot-wrapper mb-4">
                  <img src={machinePartTool} alt="Machine Part Tool" className="software-screenshot" style={{ width: '900px' }} />
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className={`${getStepClass('s1-4')} ${currentIndex === 3 ? 'reading-active' : ''}`} data-reading-index="3" style={{marginTop: "-2rem"}}>
              <div className="step-header" style={{ marginBottom: "1rem" }}>
                <span className="step-number">4</span>
                <span className="step-label">Point the hole on the face where the hole is located.</span>
              </div>
              <div style={{ marginLeft: "3rem" }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                  <p className="p-flush">Press </p>
                  <img src={pressQIcon} alt="Muhenkan + Q" style={{ height: '30px', margin: '0 0.5rem' }} />
                  <p className="p-flush"> to make the tool change its orientation.</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                  <p className="p-flush">Click on the center point </p>
                  <img src={centerTool} alt="Center Tool" style={{ height: '20px', margin: '0 0.5rem' }} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                  <p className="p-flush">Left-click on the selected point &gt; GO </p>
                  <img src={leftClick} alt="Left Click" style={{ height: '30px', margin: '0 0.5rem' }} />
                </div>
                <div className="screenshot-wrapper">
                  <img src={opSample1} alt="Placed Hole" className="software-screenshot" style={{ height: '300px' }} />
                </div>
              </div>
            </div>

            {/* Step 5 */}
            <div className={`${getStepClass('s1-5')} ${currentIndex === 4 ? 'reading-active' : ''}`} data-reading-index="4" style={{marginTop: "-2rem"}}>
              <div className="step-header" style={{ marginBottom: "1rem" }}>
                <span className="step-number">5</span>
                <span className="step-label">Move Component</span>
              </div>
              <div style={{ marginLeft: "3rem" }}>
                <div className="screenshot-wrapper mb-4">
                  <img src={moveTool} alt="Move Tool" className="software-screenshot" style={{ height: '100px' }} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                  <p className="p-flush">Select the hole component &gt; GO </p>
                  <img src={leftClick} alt="Left Click" style={{ height: '30px', margin: '0 0.5rem' }} />
                </div>
                <p className="p-flush">INPUT: MOVELENGX = 0</p>
                <p className="p-flush" style={{ paddingLeft: '4rem' }}>MOVELENGY = 183mm</p>
                <p className="p-flush" style={{ paddingLeft: '4rem' }}>MOVELENGZ = 0</p>
              </div>
              <div className="screenshot-wrapper">
                  <img src={opSample1Move} alt="Move Hole" className="software-screenshot" style={{ height: '300px', marginLeft: "25rem", marginTop: "-20rem" }} />
                </div>
            </div>

            {/* Step 6 */}
            <div className={`${getStepClass('s1-6')} ${currentIndex === 5 ? 'reading-active' : ''}`} data-reading-index="5" style={{marginTop: "-2rem"}}>
              <div className="step-header">
                <span className="step-number">6</span>
                <span className="step-label">For making long hole details, first create a tool entity.</span>
              </div>
              <div style={{ marginLeft: "3rem" }}>
                <p className="p-flush">Arrange Box</p>
                <p className="p-flush">INPUT: Depth = 16mm</p>
                <p className="p-flush" style={{ paddingLeft: '3.9rem' }}>Width = 14mm</p>
                <p className="p-flush" style={{ paddingLeft: '3.9rem' }}>Height = 38mm</p>
                <p className="p-flush mt-4">Position the tool entity on the location to be cut</p>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', marginTop: '-3rem' }}>
                  <p className="p-flush">Use subtract to create the cut. </p>
                  <div className="screenshot-wrapper" style={{ marginLeft: '1rem', padding: '0.2rem', marginTop: "4rem" }}>
                    <img src={booleanSubtractIcon} alt="Subtract Tool" className="software-screenshot" style={{ height: '80px' }} />
                  </div>
                </div>
                <div className="screenshot-wrapper mt-4">
                  <img src={subtractResult} alt="Subtract Result" className="software-screenshot" style={{ height: '300px' }} />
                </div>
              </div>
            </div>

            {/* Step 7 */}
            <div className={`${getStepClass('s1-7')} ${currentIndex === 6 ? 'reading-active' : ''}`} data-reading-index="6" style={{marginTop: "-2rem"}}>
              <div className="step-header">
                <span className="step-number">7</span>
                <span className="step-label">FilletEdge</span>
              </div>
              <div style={{ marginLeft: "3rem" }}>
                <div className="screenshot-wrapper mb-4">
                  <img src={filletTool} alt="Fillet Tool" className="software-screenshot" style={{ height: '150px', marginBottom: "1rem" }} />
                </div>
                <p className="p-flush">SetRadius = 7mm</p>
                <div style={{ display: 'flex', alignItems: 'center'}}>
                  <p className="p-flush">Pick all the edges to be filleted &gt; GO </p>
                  <img src={leftClick} alt="Left Click" style={{ height: '30px', margin: '0 0.5rem' }} />
                </div>
                <div className="screenshot-wrapper mt-4">
                  <img src={filletResult} alt="Fillet Result" className="software-screenshot" style={{ height: '300px', marginTop: "1rem" }} />
                </div>
              </div>
            </div>

            {/* Step 8 */}
            <div className={`${getStepClass('s1-8')} ${currentIndex === 7 ? 'reading-active' : ''}`} data-reading-index="7" style={{marginTop: "-2rem"}}>
              <div className="step-header">
                <span className="step-number">8</span>
                <span className="step-label">Copy Component</span>
              </div>
              <div style={{ marginLeft: "3rem" }}>
                <div className="screenshot-wrapper mb-4">
                  <img src={copyTool} alt="Copy Tool" className="software-screenshot" style={{ height: '100px', marginBottom: "1rem" }} />
                </div>
                <div className="screenshot-wrapper mt-4 mb-4">
                  <img src={copyResult} alt="Copy Result" className="software-screenshot" style={{ width: '900px' }} />
                </div>
               
              </div>
            </div>

            {/* Step 9 */}
            <div className={`${getStepClass('s1-9')} ${currentIndex === 8 ? 'reading-active' : ''}`} data-reading-index="8" style={{marginTop: "-2rem"}}>
              <div className="step-header">
                <span className="step-number">9</span>
                <span className="step-label">Chamfer Edge</span>
              </div>
              <div style={{ marginLeft: "3rem" }}>
                <div className="screenshot-wrapper mb-4">
                  <img src={chamferTool} alt="Chamfer Tool" className="software-screenshot" style={{ height: '100px', marginBottom: "1rem" }} />
                </div>
                <p className="p-flush">SetChamfer Length = 20mm</p>
                <div style={{ display: 'flex', alignItems: 'center'}}>
                  <p className="p-flush">Select all edges to be chamfered &gt; GO </p>
                  <img src={leftClick} alt="Left Click" style={{ height: '30px', margin: '0 0.5rem' }} />
                </div>
                <div className="screenshot-wrapper mt-4">
                  <img src={chamferResult} alt="Chamfer Result" className="software-screenshot" style={{ height: '300px', marginTop: "1rem" }} />
                </div>
              </div>
            </div>

            {/* Step 10 */}
            <div className={`${getStepClass('s1-10')} ${currentIndex === 9 ? 'reading-active' : ''}`} data-reading-index="9" style={{marginTop: "-2rem"}}>
              <div className="step-header">
                <span className="step-number">10</span>
                <span className="step-label">Create 3D PartName</span>
              </div>
              <div style={{ marginLeft: "3rem" }}>
                <div className="screenshot-wrapper mb-4">
                  <img src={createPartTool} alt="Create Part Tool" className="software-screenshot" style={{ height: '100px', marginBottom: "1rem" }} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center'}}>
                  <p className="p-flush">Select the entity &gt; GO </p>
                  <img src={leftClick} alt="Left Click" style={{ height: '30px', margin: '0 0.5rem' }} />
                </div>
                <p className="p-flush">Enter the 3D Part Name</p>
                <div className="screenshot-wrapper mt-4">
                  <img src={enterPartName} alt="Enter Part Name" className="software-screenshot" style={{ width: '300px', marginTop: "1rem"   }} />
                </div>
              </div>
            </div>

            {/* Step 11 */}
            <div className={`${getStepClass('s1-11')} ${currentIndex === 10 ? 'reading-active' : ''}`} data-reading-index="10" style={{marginTop: "-2rem"}}>
              <div className="step-header">
                <span className="step-number">11</span>
                <span className="step-label">Check the properties of the Top 3D Part</span>
              </div>
              <div style={{ marginLeft: "3rem" }}>
                <div className="screenshot-wrapper mt-4">
                  <img src={propertiesWindow} alt="Properties Window" className="software-screenshot" style={{ width: '900px' }} />
                </div>
              </div>
            </div>

            {/* Step 12 */}
            <div className={`${getStepClass('s1-12')} ${currentIndex === 11 ? 'reading-active' : ''}`} data-reading-index="11" style={{marginTop: "-2rem"}}>
              <div className="step-header">
                <span className="step-number">12</span>
                <span className="step-label">Set all necessary informations (Material, Layer, Color)</span>
              </div>
              <div style={{ marginLeft: "3rem" }}>
                  <div className="screenshot-wrapper mt-4">
                    <img src={layerInfo} alt="Layer Information" className="software-screenshot" style={{ width: "900px" }} />
                  </div>
              </div>
            </div>

            {/* Step 13 */}
            <div className={`${getStepClass('s1-13')} ${currentIndex === 12 ? 'reading-active' : ''}`} data-reading-index="12"  style={{marginTop: "-2rem"}}>
              <div className="step-header">
                <span className="step-number">13</span>
                <span className="step-label">Save the file</span>
              </div>
              <div style={{ marginLeft: "3rem" }}>
                <p className="p-flush">File &gt; Save</p>
              </div>
            </div>

          </div>
        )}

        {activeTab === 'sample2' && (
          <div className="lesson-card tab-content fade-in">
            <div className="card-header" style={{ marginBottom: "2rem" }}>
              <h4>LET US TRY THIS DRAWING SAMPLE</h4>
              <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(opSample2Steps)} onStop={stop} />
            </div>

            {/* Step 1 */}
            <div className={`${getStepClass('s2-1')} ${currentIndex === 0 ? 'reading-active' : ''}`} data-reading-index="0" style={{marginBottom: "-3rem", marginTop: "-2rem"}}>
              <div className="step-header">
                <span className="step-number">1</span>
                <span className="step-label">Open a new drawing</span>
              </div>
              <p className="p-flush" style={{ marginLeft: "3rem", marginTop: "-1rem" }}>Go to File &gt; New</p>
              <p className="p-flush" style={{ marginLeft: "3rem", marginTop: "-1rem" }}>Save the drawing</p>
              <p className="p-flush" style={{ marginLeft: "3rem", marginTop: "-1rem" }}>File &gt; Save As &gt; Use drawing number as File Name &gt; Press Save</p>
              <p className="p-flush red-text" style={{ marginLeft: "3rem", marginTop: "-1rem" }}>*Check if Normal or Mirror Part(See Mirrored Part lesson tab)</p>
            </div>

            {/* Step 2 */}
            <div className={`${getStepClass('s2-2')} ${currentIndex === 1 ? 'reading-active' : ''}`} data-reading-index="1" style={{marginTop: "-3rem"}}>
              <div className="step-header" style={{ marginBottom: "1rem" }}>
                <span className="step-number">2</span>
                <span className="step-label" style={{marginTop: "2rem"}}>In order to create this part, it must be done by segments. Segments must be attach together after modeling.</span>
              </div>
              <div className="screenshot-wrapper mt-4">
                <img src={segmentOverview} alt="Segment Overview" className="software-screenshot" style={{ width: "900px", height: "auto" }} />
              </div>

              {/* Segments A and B */}
              <div className="flex-row-wrap mt-8" style={{ gap: '2rem', alignItems: 'flex-start', justifyContent: 'center' }}>
                <div style={{ flex: "1", marginBottom: "3rem"}}>  
                  <p className="p-flush" style={{ marginBottom: "1rem", color: "white"}}><u>SEGMENT A</u></p>
                  <p className="p-flush red-text" style={{ marginTop: "1rem" }}>Use Arrange Cylinder</p>
                  <p className="p-flush" style={{ marginTop: "0rem" }}>Create 3 cylinders to make the retainer ring groove &gt; [UNION]</p>
                  <p className="p-flush" style={{ marginTop: "0rem" }}>Cylinder 1: Diameter = 20mm    Height= 3.65mm    Coordinates (0,0,0)</p>
                  <p className="p-flush" style={{ marginTop: "0rem" }}>Cylinder 2: Diameter = 19mm    Height= 1.35mm</p>
                  <p className="p-flush" style={{ marginTop: "0rem" }}>Cylinder 3: Diameter = 20mm    Height= 64.5mm</p>
                  <div className="screenshot-wrapper mt-4">
                    <img src={segmentAResult} alt="Segment A" className="software-screenshot" style={{ width: "900px", height: "auto", marginTop: "1rem"}} />
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <p className="p-flush" style={{ marginBottom: "1rem", color: "white"}}><u>SEGMENT B</u></p>
                  <p className="p-flush red-text" style={{ marginTop: "-1rem" }}>Use Arrange Cylinder</p>
                  <p className="p-flush">INPUT: Diameter = 30mm</p>
                  <p className="p-flush" style={{marginLeft: "3.5rem"}}>Height = 22.25mm</p>
                  <p className="p-flush" style={{marginLeft: "3.5rem"}}>Use Center tool &gt; Attach to Segment A</p>
                  <div className="screenshot-wrapper mt-4">
                    <img src={segmentBResult} alt="Segment B" className="software-screenshot" style={{ width: "500px", height: "auto", marginTop: "1rem", marginBottom: "2rem"}} />
                  </div>
                </div>
              </div>

              {/* Segment C */}
              <div className="mt-8">
                <p className="p-flush" style={{ marginBottom: "1rem", color: "white"}}><u>SEGMENT C</u></p>
                <p className="p-flush">In this case, 2D Sketch is recommended in creating the 3D model for this part in order to get the required<br />dimensions precisely. Dimensions enclosed in parentheses are close but not exact with the original dimension.</p>
                <div className="screenshot-wrapper mt-4">
                  <img src={mainDrawing3} alt="Segment C Technical Drawing" className="software-screenshot" style={{ width: "900px", height: "400px", marginTop: "1rem", marginBottom: "2rem" }}  />
                </div>
                
                <div className="screenshot-wrapper mt-4">
                  <img src={workPlaneImg} alt="Work Plane" className="software-screenshot" style={{ width: "900px", marginBottom: "2rem" }} />
                </div>

                  <div className="screenshot-wrapper">
                    <img src={revolveImg} alt="Revolve Result" className="software-screenshot" style={{ width: "900px", marginTop: "2rem" }} />
                  </div>            
              </div>
            </div>

            {/* Step 3 */}
            <div className={`${getStepClass('s2-3')} ${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2" style={{marginTop: "-2rem"}}>
              <div className="step-header">
                <span className="step-number">3</span>
                <span className="step-label">Join all segments. &gt; Use <span className="red-text">UNION</span></span>
              </div>
            </div>

            {/* Step 4 */}
            <div className={`${getStepClass('s2-4')} ${currentIndex === 3 ? 'reading-active' : ''}`} data-reading-index="3" style={{ marginTop: "-2rem" }}>
              <div className="step-header">
                <span className="step-number">4</span>
                <span className="step-label">For Key Groove</span>
              </div>
              <p className="p-flush" style={{ marginLeft: "3rem", marginTop: "-1rem" }}>Create the tool entity first</p>
              <div className="screenshot-wrapper mt-4">
                <img src={keyGrooveBox} alt="Key Groove Box" className="software-screenshot" style={{ width: "900px" }} />
              </div>
            </div>

            {/* Step 5 */}
            <div className={`${getStepClass('s2-5')} ${currentIndex === 4 ? 'reading-active' : ''}`} data-reading-index="4"  style={{marginTop: "-2rem"}}>
              <div className="step-header">
                <span className="step-number">5</span>
                <span className="step-label">Subtract the tool entity</span>
              </div>
              <div className="flex-row-wrap mt-4" style={{ gap: '2rem', alignItems: 'flex-start', justifyContent: 'center' }}>
                <div style={{ flex: 1 }}>
                  <div className="screenshot-wrapper mt-4">
                    <img src={keyGrooveSubtractResult} alt="Key Groove Subtract" className="software-screenshot" style={{ width: "900px" }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Step 6 */}
            <div className={`${getStepClass('s2-6')} ${currentIndex === 5 ? 'reading-active' : ''}`} data-reading-index="5" style={{marginTop: "-2rem"}}>
              <div className="step-header">
                <span className="step-number">6</span>
                <span className="step-label">Add all Fairings (Chamfer and Fillet)</span>
              </div>
              <div className="screenshot-wrapper mt-4">
                <img src={finalPartFairing} alt="Final Part" className="software-screenshot" style={{ width: "900px" }} />
              </div>
            </div>

            {/* Step 7 */}
            <div className={`${getStepClass('s2-7')} ${currentIndex === 6 ? 'reading-active' : ''}`} data-reading-index="6" style={{marginTop: "-2rem"}}>
              <div className="step-header">
                <span className="step-number">7</span>
                <span className="step-label">Create 3D Part Name</span>
              </div>
            </div>

            {/* Step 8 */}
            <div className={`${getStepClass('s2-8')} ${currentIndex === 7 ? 'reading-active' : ''}`} data-reading-index="7" style={{marginTop: "-2rem"}}>
              <div className="step-header">
                <span className="step-number">8</span>
                <span className="step-label">Check the properties of the Top 3D Part</span>
              </div>
            </div>

            {/* Step 9 */}
            <div className={`${getStepClass('s2-9')} ${currentIndex === 8 ? 'reading-active' : ''}`} data-reading-index="8" style={{marginTop: "-2rem"}}>
              <div className="step-header">
                <span className="step-number">9</span>
                <span className="step-label">Set all necessary informations (Material, Layer, Color)</span>
              </div>
            </div>

            {/* Step 10 */}
            <div className={`${getStepClass('s2-10')} ${currentIndex === 9 ? 'reading-active' : ''}`} data-reading-index="9" style={{marginTop: "-2rem"}}>
              <div className="step-header">
                <span className="step-number">10</span>
                <span className="step-label">Save the file</span>
              </div>
              <p className="p-flush" style={{ marginLeft: "3rem", marginTop: "-1rem" }}>File &gt; Save</p>
            </div>
          </div>
        )}

        <div className="lesson-navigation">
          <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button>
          <button className="nav-button next" onClick={handleNext}>
            {activeTab === 'sample2' ? (nextLabel || 'Next Lesson') : 'Next'} <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OperationSampleLesson;
