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
import mainDrawing2 from '../../assets/3D_Image_File/operation_sample_2.jpg';
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
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem(`${subLessonId}-tab`) || 'sample1';
  });

  const {
    scrollProgress,
    containerRef,
    speak,
    stop,
    isSpeaking,
    currentIndex
  } = useLessonCore(`${subLessonId}-${activeTab}`);

  const handleNext = () => {
    if (activeTab === 'sample1') setActiveTab('sample2');
    else if (onNextLesson) onNextLesson();
  };

  const handlePrev = () => {
    if (activeTab === 'sample2') setActiveTab('sample1');
    else if (onPrevLesson) onPrevLesson();
  };

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

  const getStepClass = (stepId: string) => "instruction-step";

  return (

    <div className="course-lesson-container" ref={containerRef}>
      {/* Sticky Progress Bar */}
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      <div className="lesson-tabs">
        <button className={`tab-button ${activeTab === 'sample1' ? 'active' : ''}`} onClick={() => setActiveTab('sample1')}>OPERATION SAMPLE 1</button>
        <button className={`tab-button ${activeTab === 'sample2' ? 'active' : ''}`} onClick={() => setActiveTab('sample2')}>OPERATION SAMPLE 2</button>
      </div>

      <section className="lesson-intro">
        <h3 className="section-title">
          {activeTab === 'sample1' ? 'Operation Sample 1 ' : 'Operation Sample 2'}
          <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(activeTab === 'sample1' ? opSample1Steps : opSample2Steps)} onStop={stop} />
        </h3>

        {activeTab === 'sample1' ? (
          <div>
            <div className="screenshot-wrapper mt-4">
              <img src={mainDrawing} alt="3D Modeling Samples" className="software-screenshot" style={{width: "900px", height: "700px"}} />
            </div>
          </div>
        ) : (
          <div>
                <p className="p-flush">3D Modeling Using 2D Sketch, Key Groove, Retainer Ring Groove</p>
            <div className="screenshot-wrapper mt-4">
              <img src={mainDrawing2} alt="Sample 2 Technical Drawing" className="software-screenshot" style={{width: "900px", height: "700px", marginTop: "1rem"}}/>
            </div>
          </div>
        )}
      </section>

      <div className="lesson-grid single-card">
        {activeTab === 'sample1' ? (
          <div className="lesson-card tab-content fade-in">
            <div className="card-header">
              <h4>HERE IS THE STEP-BY-STEP PROCEDURE OF CREATING 3D MODEL</h4>
              <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(opSample1Steps)} onStop={stop} />
            </div>

            <div className={`${getStepClass('s1-1')} ${currentIndex === 0 ? 'reading-active' : ''}`} style={{ marginBottom:"-2rem"}}>
              <div className="step-header">
                <span className="step-number">1 </span>
                <span className="step-label">Open a new drawing</span>
              </div>
                <div className="step-description">
                    <p className="p-flush mb-4" style={{marginLeft: "3rem", marginTop: "-1rem"}}>Go to File &gt; New</p>
                </div>
                <div className="step-description">
                    <p className="p-flush mb-4" style={{marginLeft: "3rem", marginTop: "-1rem"}}>Save the drawing</p>
                </div>
                <div className="step-description">
                    <p className="p-flush mb-4" style={{marginLeft: "3rem", marginTop: "-1rem"}}>File &gt; Save As &gt; Use drawing number as File Name</p>
                </div>
                <div className="step-description">
                    <p className="p-flush mb-4" style={{marginLeft: "3rem", marginTop: "-1rem"}}><strong className='red-text'>Check if Normal or Mirror Part (See Mirrored Part lesson tab)</strong></p>
                </div>
                <div className="step-description">
                    <p className="p-flush mb-4" style={{marginLeft: "3rem", marginTop: "-1rem"}}>Press Save</p>
                </div>
            </div>  

            <div className={`${getStepClass('s1-2')} ${currentIndex === 1 ? 'reading-active' : ''}`} style={{ marginBottom:"-2rem"}}>
              <div className="step-header">
                <span className="step-number">2 </span>
                <span className="step-label">Arrange Box</span>
              </div>
              <div className="step-description">
                <div className="screenshot-wrapper" style={{ position: 'relative', display: 'inline-block' }}>
                  <img src={arrangeBoxTool} alt="Arrange Box Tool" className="software-screenshot screenshot-medium" style={{ width: '400px' }} />
                  <div className="input-overlay" style={{ 
                    position: 'absolute', 
                    top: '9rem', 
                    left: '1px', 
                    backgroundColor: 'rgba(var(--bg-card-rgb), 0.9)', 
                    padding: '1rem', 
                    zIndex: 5
                  }}>
                    <p className="p-flush"><strong style={{fontWeight: '900', color: "white"}}>INPUT:</strong> Depth = 16mm</p>
                    <p className="p-flush" style={{marginTop: "0.2rem", marginLeft: "3.8rem"}}>Width = 100mm</p>
                    <p className="p-flush" style={{marginTop: "0.2rem", marginLeft: "3.8rem"}}>Height = 210mm</p>
                    <p className="p-flush" style={{marginTop: "0.2rem", marginLeft: "3.8rem"}}>Coordinates (0, 0, 0)</p>
                  </div>
                </div>
              </div>
            </div>

            <div className={`${getStepClass('s1-3')} ${currentIndex === 2 ? 'reading-active' : ''}`}>
              <div className="step-header">
                <span className="step-number">3 </span>
                <span className="step-label">Select and <strong className="text-highlight">Arrange Machine Part</strong></span>
              </div>
              <div className="step-description">
                <div className="screenshot-wrapper">
                  <img src={machinePartTool} alt="Select and Arrange Machine Part" className="software-screenshot" style={{ width:"900px", marginBottom:"-2rem"}} />
                </div>
              </div>
            </div>

            <div className={`${getStepClass('s1-4')} ${currentIndex === 3 ? 'reading-active' : ''}`} style={{ marginBottom:"-2rem"}}>
              <div className="step-header">
                <span className="step-number">4 </span>
                <span className="step-label">Point the hole on the face where the hole is located</span>
              </div>
              <div className="step-description">
                <div className="step-description" style={{marginTop: "1rem"}}>
                    <p className="p-flush mb-4" style={{marginLeft: "3rem", marginTop: "-1rem"}}>Press
                        <img src={pressQIcon} alt="Press Q" className="screenshot-click--inline" style={{ width: '150px', margin: '-15px 10px'}} /> to make the tool change its orientation
                    </p>
                </div>
                </div>
                <div className="step-description" style={{marginTop: "2rem"}}>
                    <p className="p-flush mb-4" style={{marginLeft: "3rem", marginTop: "-1rem"}}>Click on the center tool 
                     <img src={centerTool} alt="Center Tool" className="screenshot-click--inline" style={{ width: '30px', margin: '-12px 10px'}} />
                    </p>
                </div>
                <div className="step-description" style={{marginTop: "2rem"}}>
                    <p className="p-flush mb-4" style={{marginLeft: "3rem", marginTop: "-1rem"}}>Left-click on the selected point &gt; GO 
                      <img src={leftClick} alt="Left Click" className="screenshot-click--inline" style={{ width: '30px', margin: '-12px 10px'}} />
                    </p>
                </div>

                <div className="screenshot-wrapper mt-4">
                  <img src={opSample1} alt="Operation Sample 1 Result" className="software-screenshot screenshot-medium" style={{marginLeft: "3rem", marginTop:"2rem", width: '300px' }} />
                </div>
              </div>

            <div className={`${getStepClass('s1-5')} ${currentIndex === 4 ? 'reading-active' : ''}`} style={{ marginBottom:"-2rem"}}>
              <div className="step-header">
                <span className="step-number">5 </span>
                <span className="step-label">Move Component</span>
              </div>
              <div className="step-description">
                <div className="screenshot-wrapper">
                  <img src={moveTool} alt="Move Component Tool" className="software-screenshot" style={{ width: '200px' }} />
                </div>
                 <div className="step-description">
                <div className="screenshot-wrapper" style={{ position: 'relative', display: 'inline-block' }}>
                  <img src={opSample1Move} alt="Move Component Result" className="software-screenshot" style={{ height: '280px', marginLeft: "21rem", marginTop: "-8.5rem" }} />
                  <div className="input-overlay" style={{ 
                    position: 'absolute', 
                    top: '0rem', 
                    left: '1px', 
                    backgroundColor: 'rgba(var(--bg-card-rgb), 0.9)', 
                    padding: '1rem', 
                    zIndex: 5
                  }}>
                    <p className="p-flush"><strong style={{fontWeight: '900', color: "white"}}>Select the hole Component &gt; GO </strong><img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '30px', margin: '0 8px' }} /></p>
                    <p className="p-flush"><strong style={{fontWeight: '900', color: "white", marginLeft: "2rem"}}>INPUT:</strong> MOVELENGX = 0</p>
                    <p className="p-flush" style={{marginTop: "0.2rem", marginLeft: "5.6rem"}}>MOVELENGY = 183mm</p>
                    <p className="p-flush" style={{marginTop: "0.2rem", marginLeft: "5.6rem"}}>MOVELENGZ = 0</p>
                  </div>
                </div>
              </div>      
              </div>
            </div>


            <div className={getStepClass('s2-6')}>
              <div className="step-header">
                <span className="step-number">6 </span>
                <span className="step-label">For making long hole details, first create a tool entity.</span>
              </div>
              <div className="step-description">
                    <p className="p-flush mb-4" style={{marginLeft: "3rem", marginTop: "-1rem"}}>Arrange Box</p>
              </div>
              <div className="step-description">
                   <p className="p-flush" style={{marginLeft: "1.2rem", marginTop: "-1rem"}}><strong style={{fontWeight: '900', color: "white", marginLeft: "2rem"}}>INPUT:</strong> DEPTH = 16mm</p>
              </div>
              <p className="p-flush" style={{marginTop: "-1rem", marginLeft: "6.8rem"}}>WIDTH= 14mm</p>
              <p className="p-flush" style={{marginTop: "-1rem", marginLeft: "6.8rem"}}>HEIGHT = 38mm</p>
               <div className="step-description">
                    <p className="p-flush mb-4" style={{marginLeft: "3rem", marginTop: "-1rem"}}>Position the tool entity on the location to be cut</p>
              </div>
               <div className="step-description">
                    <p className="p-flush mb-4" style={{marginLeft: "3rem", marginTop: "-1rem"}}>Use subtract to create the cut 
                      <img src={booleanSubtractIcon} alt="Subtract Tool" className="screenshot-click--inline" style={{ width: '120px', margin: '-55px 8px' }} /></p>
              </div>
              <div className="screenshot-wrapper mt-4">
                <div className={`${getStepClass('s1-5')} ${currentIndex === 4 ? 'reading-active' : ''}`} >
                  <img src={subtractResult} alt="Subtract Result" className="software-screenshot" style={{ width: "900px", marginTop: "3rem", marginBottom:"-2rem" }} />
                </div>
              </div>
            </div>

            <div className={getStepClass('s2-7')}>
              <div className="step-header">
                <span className="step-number">7 </span>
                <span className="step-label">FILLET EDGE</span>
              </div>
              <div className="step-description">
                <div className="screenshot-wrapper">
                  <img src={filletTool} alt="Fillet Tool" className="software-screenshot" style={{ height: '150px' }} />
                </div>
                <div style={{ marginTop:" 1rem"}}>
                  <p className="p-flush">Set Radius = 7mm</p>
                </div>
                  <div style={{ marginTop:" -1rem"}}>
                  <p className="p-flush">Pick all the edges to be filleted &gt; GO  
                  <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '40px', margin: '0 8px'}} /></p>
                </div>
                <div className="screenshot-wrapper mt-4">
                  <img src={filletResult} alt="Fillet Result" className="software-screenshot" style={{ width: "900px", marginTop: "1rem"}} />
                </div>
              </div>
            </div>

            <div className={getStepClass('s2-8')}>
              <div className="step-header">
                <span className="step-number">8 </span>
                <span className="step-label">COPY COMPONENT</span>
              </div>
              <div className="step-description">
                <div className="screenshot-wrapper">
                  <img src={copyTool} alt="Copy Tool" className="software-screenshot screenshot-small" style={{ height: '150px', marginBottom: "1rem" }} />
                </div>
                <div className="screenshot-wrapper mt-4">
                  <img src={copyResult} alt="Copy Result" className="software-screenshot" style={{width: "900px"}} />
                </div>
              </div>
            </div>

            <div className={getStepClass('s2-9')}>
              <div className="step-header">
                <span className="step-number">9 </span>
                <span className="step-label">CHAMFER EDGE</span>
              </div>
              <div className="step-description">
                <div className="screenshot-wrapper">
                  <img src={chamferTool} alt="Chamfer Tool" className="software-screenshot screenshot-small" style={{ height: '150px', marginBottom: "1rem" }} />
                </div>
                <div className="info-box mt-4">
                  <p className="p-flush">Set Chamfer Length = 20mm</p>
                </div>
               <div style={{ marginTop:" -1rem"}}>
                  <p className="p-flush">Select all edges to be chamfered &gt; GO  
                  <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '40px', margin: '0 8px'}} /></p>
                </div>
                <div>
                  <img src={chamferResult} alt="Chamfer Result" className="software-screenshot" style={{ width: '150px', marginTop: "1rem"}} />
                </div>
              </div>
            </div>

            <div className={getStepClass('s2-10')} style={{ marginBottom:"-2rem"}}>
              <div className="step-header">
                <span className="step-number">10 </span>
                <span className="step-label">CREATE 3D PART NAME</span>
              </div>
              <div className="step-description">
                <div className="screenshot-wrapper">
                  <img src={createPartTool} alt="Create Part Tool" className="software-screenshot screenshot-small" style={{ height: '150px' }} />
                </div>
                <div className="screenshot-wrapper" style={{ position: 'relative', display: 'inline-block' }}>
                   <img src={enterPartName} alt="Enter Part Name" className="software-screenshot" style={{ height: '280px', marginLeft: "18rem", marginTop: "-9.5rem" }} />
                  <div className="input-overlay" style={{ 
                    position: 'absolute', 
                    top: '0rem', 
                    left: '1px', 
                    backgroundColor: 'rgba(var(--bg-card-rgb), 0.9)', 
                    padding: '1rem', 
                    zIndex: 5
                  }}>
                    <p className="p-flush"><strong style={{fontWeight: '900', color: "white"}}>Select the entity &gt; GO </strong><img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '30px', margin: '0 8px' }} /></p>
                    <p className="p-flush"><strong style={{fontWeight: '900', color: "white", marginLeft: "0rem"}}>Enter the 3D Part Name</strong ></p>
                  </div>
                </div>
              </div> 
            </div>

            <div className={getStepClass('s2-11')}>
              <div className="step-header">
                <span className="step-number">11 </span>
                <span className="step-label">Check the properties of the Top 3D Part</span>
              </div>
                <div className="flex-row-center--wrap" style={{ gap: '1rem' }}>
                  <div className="screenshot-wrapper">
                    <img src={propertiesWindow} alt="Properties Window" className="software-screenshot screenshot-medium" />
                  </div>
                </div>
              </div>

            <div className={getStepClass('s2-12')}>
              <div className="step-header">
                <span className="step-number">12 </span>
                <span className="step-label">Set all necessary informations (Material, Layer, Color)</span>
              </div>
                <div className="flex-row-center--wrap" style={{ gap: '1rem' }}>
                  <div className="screenshot-wrapper">
                    <img src={layerInfo} alt="Layer Information" className="software-screenshot screenshot-medium" />
                  </div>
                </div>
              </div>

               <div className={getStepClass('s2-13')} style={{ marginBottom:"-2rem"}}>
              <div className="step-header">
                <span className="step-number">13 </span>
                <span className="step-label">Save the file</span>
              </div>
              <div className="step-description">
                <p className="p-flush mb-4" style={{marginLeft: "3rem", marginTop: "-1rem"}}>File &gt; Save</p>
              </div>
              </div>


            <div className="lesson-navigation">
              <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button>
              <button className="nav-button next" onClick={handleNext}>{nextLabel || 'Next Lesson'} <ChevronRight size={18} /></button>
            </div>
          </div>
        ) : (
          <div className="lesson-card tab-content fade-in">
            <div className="card-header">
              <h4>STEP-BY-STEP PROCEDURE</h4>
              <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(opSample2Steps)} onStop={stop} />
            </div>

            <div className={getStepClass('s3-1')}>
              <div className="step-header">
                <span className="step-number">1 </span>
                <span className="step-label">Open and Save drawing as Drawing Number.</span>
              </div>
            </div>

            <div className="section-divider"></div>

            <div className={getStepClass('s3-2')}>
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

                <div className="tool-block mt-8">
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

                <div className="tool-block mt-8">
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
            </div>

            <div className="section-divider"></div>

            <div className={getStepClass('s4-3')}>
              <div className="step-header">
                <span className="step-number">3 </span>
                <span className="step-label">JOIN ALL SEGMENTS &gt; <strong className="text-highlight">UNION</strong></span>
              </div>
            </div>

            <div className="section-divider"></div>

            <div className={getStepClass('s4-4')}>
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

            <div className="section-divider"></div>

            <div className={getStepClass('s5-5')}>
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

            <div className={getStepClass('s5-6')}>
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

            <div className={getStepClass('s5-7')}>
              <div className="step-header">
                <span className="step-number">7 </span>
                <span className="step-label">CREATE 3D PART & SAVE</span>
              </div>
              <div className="step-description">
                <p className="p-flush">Follow standard naming and save via <strong className="text-highlight">File &gt; Save</strong>.</p>
              </div>
            </div>

            <div className="lesson-navigation">
              <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button>
              <button className="nav-button next" onClick={handleNext}>{nextLabel || 'Next Lesson'} <ChevronRight size={18} /></button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OperationSampleLesson;
