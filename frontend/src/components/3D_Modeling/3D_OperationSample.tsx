/**
 * 3D_OperationSample.tsx — Operation Sample lessons
 */
import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Play, Box as BoxIcon, Info, CheckCircle2 } from 'lucide-react';
import '../../styles/3D_Modeling/CourseLesson.css';

// Shared Assets
import leftClick from '../../assets/3D_Image_File/left_click.jpg';
import centerTool from '../../assets/3D_Image_File/center_tool.jpg';

// Operation Sample (1) Assets
import mainDrawing from '../../assets/3D_Image_File/sample_3d_modeling_parts.jpg';
import arrangeBoxTool from '../../assets/3D_Image_File/arrange_box_operation_sample1.jpg';
import machinePartTool from '../../assets/3D_Image_File/select_and_arrange_machine_part.png';
import moveTool from '../../assets/3D_Image_File/component(1)_move.jpg';
import opSample1 from '../../assets/3D_Image_File/operation_sample(1).jpg';
import opSample1Move from '../../assets/3D_Image_File/operation_sample(1)1.jpg';

// Step 6 Assets
import subtractTool from '../../assets/3D_Image_File/boolean(1)_boolean_subtract.jpg';
import subtractResult from '../../assets/3D_Image_File/subtract_operation_sample2.png';

// Step 7 Assets
import filletTool from '../../assets/3D_Image_File/fillet_edge.jpg';
import filletResult from '../../assets/3D_Image_File/filleted.png';

// Step 8 Assets
import copyTool from '../../assets/3D_Image_File/component(1)_copy.jpg';
import copyResult from '../../assets/3D_Image_File/copy_component.png';

// Step 9 Assets
import chamferTool from '../../assets/3D_Image_File/chamfer_edge.jpg';
import chamferResult from '../../assets/3D_Image_File/chamfered.jpg';

// Step 10 Assets
import createPartTool from '../../assets/3D_Image_File/3d_part(1)_create_3d_part.jpg';
import enterPartName from '../../assets/3D_Image_File/enter_3d_part_name.jpg';

// Step 11 Assets
import propertiesWindow from '../../assets/3D_Image_File/3d_properties.jpg';

// Step 12 Assets
import materialSettings from '../../assets/3D_Image_File/material_setting(1)_material_setting.jpg';
import layerInfo from '../../assets/3D_Image_File/materials._layer.png';

// Step 13 Assets
import fileMenu from '../../assets/3D_Image_File/tool_bars_file.jpg';

// Operation Sample (3) Assets
import mainDrawing3 from '../../assets/3D_Image_File/operation_sample3.jpg';
import segmentOverview from '../../assets/3D_Image_File/operation_sample3_segment.jpg';
import segmentAResult from '../../assets/3D_Image_File/operation_sample3_segmet_a.jpg';
import segmentBResult from '../../assets/3D_Image_File/operation_sample3_segmet_b.jpg';
import unionTool from '../../assets/3D_Image_File/boolean(1)_union.jpg';

// Operation Sample (4) Assets
import mainDrawing4 from '../../assets/3D_Image_File/operation_sample(3).jpg';
import workPlaneImg from '../../assets/3D_Image_File/operation_sample4_work_plane.jpg';
import sketchImg from '../../assets/3D_Image_File/operation_sample4_revolving.jpg';
import revolveImg from '../../assets/3D_Image_File/operation_sample4_revolve.jpg';
import segmentDResult from '../../assets/3D_Image_File/operation_sample4_segment_d.jpg';
import segmentEResult from '../../assets/3D_Image_File/operation_sample4_segment_e.jpg';
import keyGrooveBox from '../../assets/3D_Image_File/operation_sample4_4.jpg';
import keyGroovePos from '../../assets/3D_Image_File/operation_sample4_4_position_tool_entity.jpg';
import arrangeBoxIcon from '../../assets/3D_Image_File/basic_operation(1)_arrange_box.jpg';

// Operation Sample (5) Assets
import keyGrooveSubtractResult from '../../assets/3D_Image_File/operation_sample5_4_subtract_tool.jpg';
import keyGrooveFilletResult from '../../assets/3D_Image_File/operation_sample5_4_add_fillet_radius.png';
import finalPartFairing from '../../assets/3D_Image_File/operation_sample5_6.jpg';

interface OperationSampleLessonProps {
  subLessonId?: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const OperationSampleLesson: React.FC<OperationSampleLessonProps> = ({ subLessonId = 'op-sample-1', onNextLesson, onPrevLesson }) => {
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
      // Initial trigger
      handleScroll();
    }

    return () => {
      if (currentContainer) {
        currentContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, [subLessonId]);

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

  const isSample1 = subLessonId === 'op-sample-1';
  const isSample2 = subLessonId === 'op-sample-2';
  const isSample3 = subLessonId === 'op-sample-3';
  const isSample4 = subLessonId === 'op-sample-4';
  const isSample5 = subLessonId === 'op-sample-5';

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
        <h3 className="section-title"><Play size={28} className="lesson-intro-icon" /> {
          isSample1 ? 'OPERATION SAMPLE (1)' :
            isSample2 ? 'OPERATION SAMPLE (2)' :
              isSample3 ? 'OPERATION SAMPLE (3)' :
                isSample4 ? 'OPERATION SAMPLE (4)' :
                  'OPERATION SAMPLE (5)'
        }</h3>

        {isSample1 ? (
          <div className="instruction-box" style={{ marginTop: '1.5rem' }}>
            <div className="image-wrapper-flush">
              <img src={mainDrawing} alt="3D Modeling Samples" className="software-screenshot screenshot-wide" />
            </div>
          </div>
        ) : isSample2 ? (
          <p className="p-flush">
          </p>
        ) : (
          <div className="instruction-box" style={{ marginTop: '1.5rem' }}>
            <h4 className="section-title">3D Modeling Using 2D Sketch, Key Groove, Retainer Ring Groove</h4>
            <div className="image-wrapper-flush">
              <img
                src={isSample4 ? mainDrawing4 : mainDrawing3}
                alt={isSample4 ? "Sample 4 Technical Drawing" : "Sample 3 Technical Drawing"}
                className="software-screenshot screenshot-wide"
              />
            </div>
            <p className="p-flush" style={{ marginTop: '1rem' }}>Let us try this drawing for example:</p>
          </div>
        )}
      </section>

      <div className="lesson-grid single-card">
        <div className="lesson-card">
          <div className="lesson-content">
            {isSample1 ? (
              <div className="tab-pane">
                <h4 className="section-title">HERE IS THE STEP-BY-STEP PROCEDURE OF CREATING 3D MODEL</h4>

                {/* STEP 1 */}
                <div className={getStepClass('s1-1')} onClick={() => toggleStep('s1-1')}>
                  <div className="step-header">
                    <span className={`step-number ${completedSteps.has('s1-1') ? 'completed' : ''}`}>
                      {completedSteps.has('s1-1') ? <CheckCircle2 size={16} /> : '1'}
                    </span>
                    <span className="step-label">Open a new drawing: Go to <strong className="text-highlight">File &gt; New</strong></span>
                  </div>
                  <div className="step-description" style={{ paddingLeft: '2.5rem' }}>
                    <p className="p-flush">Save the drawing: <strong className="text-highlight">File &gt; Save As</strong> &gt; Use drawing number as File Name &gt; Press <strong className="text-highlight">Save</strong>.</p>
                    <p className="p-flush" style={{ color: 'var(--primary-red)', marginTop: '0.5rem' }}>*Check if Normal or Mirror Part (See page 37)</p>
                  </div>
                </div>

                {/* STEP 2 */}
                <div className={getStepClass('s1-2')} onClick={() => toggleStep('s1-2')}>
                  <div className="step-header">
                    <span className={`step-number ${completedSteps.has('s1-2') ? 'completed' : ''}`}>
                      {completedSteps.has('s1-2') ? <CheckCircle2 size={16} /> : '2'}
                    </span>
                    <span className="step-label">Arrange Box</span>
                  </div>
                  <div className="flex-row-center--wrap" style={{ gap: '2rem', paddingLeft: '2.5rem' }}>
                    <div className="image-wrapper-flush">
                      <img src={arrangeBoxTool} alt="Arrange Box Tool" className="software-screenshot screenshot-medium" />
                    </div>
                    <div className="step-description">
                      <p className="p-flush"><strong>INPUT:</strong></p>
                      <ul className="interaction-list--plain">
                        <li>Depth = <strong className="text-highlight">16mm</strong></li>
                        <li>Width = <strong className="text-highlight">100mm</strong></li>
                        <li>Height = <strong className="text-highlight">210mm</strong></li>
                        <li>Coordinates <strong className="text-highlight">(0,0,0)</strong></li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* STEP 3 */}
                <div className={getStepClass('s1-3')} onClick={() => toggleStep('s1-3')}>
                  <div className="step-header">
                    <span className={`step-number ${completedSteps.has('s1-3') ? 'completed' : ''}`}>
                      {completedSteps.has('s1-3') ? <CheckCircle2 size={16} /> : '3'}
                    </span>
                    <span className="step-label">Select and Arrange Machine Part</span>
                  </div>
                  <div className="image-wrapper-flush" style={{ paddingLeft: '2.5rem' }}>
                    <img src={machinePartTool} alt="Select and Arrange Machine Part" className="software-screenshot screenshot-large" />
                  </div>
                </div>

                {/* STEP 4 */}
                <div className={getStepClass('s1-4')} onClick={() => toggleStep('s1-4')}>
                  <div className="step-header">
                    <span className={`step-number ${completedSteps.has('s1-4') ? 'completed' : ''}`}>
                      {completedSteps.has('s1-4') ? <CheckCircle2 size={16} /> : '4'}
                    </span>
                    <span className="step-label">Point the hole on the face where the hole is located.</span>
                  </div>
                  <div className="step-description" style={{ paddingLeft: '2.5rem' }}>
                    <div className="flex-row-center--wrap" style={{ gap: '2rem' }}>
                      <div style={{ flex: 1 }}>
                        <div className="flex-row-center" style={{ gap: '1rem', margin: '0.5rem 0' }}>
                          <p className="p-flush">Press <strong className="text-highlight">無変換 + Q</strong> to make the tool change its orientation.</p>
                        </div>
                        <div className="flex-row-center" style={{ gap: '1rem' }}>
                          <p className="p-flush">Click on the center <img src={centerTool} alt="Center Tool" className="software-screenshot screenshot-click--inline" /></p>
                        </div>
                        <div className="flex-row-center" style={{ gap: '1rem', marginTop: '0.5rem' }}>
                          <p className="p-flush">Left-click on the selected point &gt; <strong className="text-highlight">GO</strong> <img src={leftClick} alt="Left Click" className="software-screenshot screenshot-click--inline" /></p>
                        </div>
                      </div>
                      <div className="image-wrapper-flush">
                        <img src={opSample1} alt="Operation Sample 1 Result" className="software-screenshot screenshot-medium" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* STEP 5 */}
                <div className={getStepClass('s1-5')} onClick={() => toggleStep('s1-5')}>
                  <div className="step-header">
                    <span className={`step-number ${completedSteps.has('s1-5') ? 'completed' : ''}`}>
                      {completedSteps.has('s1-5') ? <CheckCircle2 size={16} /> : '5'}
                    </span>
                    <span className="step-label">Select the hole component &gt; <strong className="text-highlight">GO</strong>. Move it to the specified location.</span>
                  </div>
                  <div className="step-description" style={{ paddingLeft: '2.5rem' }}>
                    <div className="flex-row-center--wrap" style={{ gap: '2rem', alignItems: 'flex-start' }}>
                      <div className="image-wrapper-flush flex-no-shrink">
                        <img src={moveTool} alt="Move Component Tool" className="software-screenshot screenshot-small" />
                      </div>
                      <div style={{ flex: 1 }}>
                        <p className="p-flush"><strong>INPUT:</strong></p>
                        <ul className="interaction-list" style={{ marginTop: '0.5rem' }}>
                          <li>MOVELENGX = <strong className="text-highlight">0</strong></li>
                          <li>MOVELENGY = <strong className="text-highlight">183mm</strong></li>
                          <li>MOVELENGZ = <strong className="text-highlight">0</strong></li>
                        </ul>
                      </div>
                      <div className="image-wrapper-flush flex-no-shrink">
                        <img src={opSample1Move} alt="Move Component Result" className="software-screenshot screenshot-small" />
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            ) : subLessonId === 'op-sample-2' ? (
              <div className="tab-pane">
                <h4 className="section-title">SAMPLES OF 3D MODELING OF PARTS</h4>

                {/* STEP 6 */}
                <div className={getStepClass('s2-6')} onClick={() => toggleStep('s2-6')}>
                  <div className="step-header">
                    <span className={`step-number ${completedSteps.has('s2-6') ? 'completed' : ''}`}>
                      {completedSteps.has('s2-6') ? <CheckCircle2 size={16} /> : '6'}
                    </span>
                    <span className="step-label">Create a tool entity for the long hole using <strong className="text-highlight">Arrange Box</strong>. Use <strong className="text-highlight">Subtract</strong> to create the hole.</span>
                  </div>
                  <div className="step-description" style={{ paddingLeft: '2.5rem' }}>
                    <div className="flex-row-center--wrap" style={{ gap: '2rem', alignItems: 'flex-start' }}>
                      <div style={{ flex: 1 }}>
                        <p className="p-flush"><strong>INPUT:</strong></p>
                        <ul className="interaction-list" style={{ marginTop: '0.5rem' }}>
                          <li>Depth = <strong className="text-highlight">16mm</strong></li>
                          <li>Width = <strong className="text-highlight">14mm</strong></li>
                          <li>Height = <strong className="text-highlight">38mm</strong></li>
                        </ul>
                        <p className="p-flush" style={{ marginTop: '1rem' }}>Position the tool entity on the location to be cut then use <strong className="text-highlight">Subtract</strong>.</p>
                      </div>
                      <div className="image-wrapper-flush">
                        <img src={subtractResult} alt="Subtract Result" className="software-screenshot screenshot-large" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* STEP 7 */}
                <div className={getStepClass('s2-7')} onClick={() => toggleStep('s2-7')}>
                  <div className="step-header">
                    <span className={`step-number ${completedSteps.has('s2-7') ? 'completed' : ''}`}>
                      {completedSteps.has('s2-7') ? <CheckCircle2 size={16} /> : '7'}
                    </span>
                    <span className="step-label">Select <strong className="text-highlight">Fillet Edge</strong>. Pick all the edges to be filleted &gt; <strong className="text-highlight">GO</strong>.</span>
                  </div>
                  <div className="step-description" style={{ paddingLeft: '2.5rem' }}>
                    <div className="flex-row-center--wrap" style={{ gap: '2rem', alignItems: 'flex-start' }}>
                      <div style={{ flex: 1 }}>
                        <div className="image-wrapper-flush" style={{ marginBottom: '1rem' }}>
                          <img src={filletTool} alt="Fillet Tool" className="software-screenshot screenshot-small" />
                        </div>
                        <p className="p-flush">Set Radius = <strong className="text-highlight"> 7mm</strong></p>
                      </div>
                      <div className="image-wrapper-flush">
                        <img src={filletResult} alt="Fillet Result" className="software-screenshot screenshot-large" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* STEP 8 */}
                <div className={getStepClass('s2-8')} onClick={() => toggleStep('s2-8')}>
                  <div className="step-header">
                    <span className={`step-number ${completedSteps.has('s2-8') ? 'completed' : ''}`}>
                       {completedSteps.has('s2-8') ? <CheckCircle2 size={16} /> : '8'}
                    </span>
                    <span className="step-label">Select <strong className="text-highlight">Copy Component</strong>. Select the component and position appropriately.</span>
                  </div>
                  <div className="step-description" style={{ paddingLeft: '2.5rem' }}>
                    <div className="flex-row-center--wrap" style={{ gap: '2rem', alignItems: 'flex-start' }}>
                      <div style={{ flex: 1 }}>
                        <div className="image-wrapper-flush" style={{ marginBottom: '1rem', marginTop: '1rem' }}>
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
                <div className={getStepClass('s2-9')} onClick={() => toggleStep('s2-9')}>
                  <div className="step-header">
                    <span className={`step-number ${completedSteps.has('s2-9') ? 'completed' : ''}`}>
                      {completedSteps.has('s2-9') ? <CheckCircle2 size={16} /> : '9'}
                    </span>
                    <span className="step-label">Select <strong className="text-highlight">Chamfer Edge</strong>. Select all edges to be chamfered &gt; <strong className="text-highlight">GO</strong>.</span>
                  </div>
                  <div className="step-description" style={{ paddingLeft: '2.5rem' }}>
                    <div className="flex-row-center--wrap" style={{ gap: '2rem', alignItems: 'flex-start' }}>
                      <div style={{ flex: 1 }}>
                        <div className="image-wrapper-flush" style={{ marginBottom: '1rem', marginTop: '1rem' }}>
                          <img src={chamferTool} alt="Chamfer Tool" className="software-screenshot screenshot-small" />
                        </div>
                        <p className="p-flush">Set Chamfer Length = <strong className="text-highlight">20mm</strong></p>
                        <div className="flex-row-center" style={{ gap: '1rem', marginTop: '1rem' }}>
                           <img src={leftClick} alt="Left Click" className="software-screenshot screenshot-click--inline" />
                        </div>
                      </div>
                      <div className="image-wrapper-flush">
                        <img src={chamferResult} alt="Chamfer Result" className="software-screenshot screenshot-small" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* STEP 10 */}
                <div className={getStepClass('s2-10')} onClick={() => toggleStep('s2-10')}>
                  <div className="step-header">
                    <span className={`step-number ${completedSteps.has('s2-10') ? 'completed' : ''}`}>
                      {completedSteps.has('s2-10') ? <CheckCircle2 size={16} /> : '10'}
                    </span>
                    <span className="step-label">Select <strong className="text-highlight">Create 3D Part</strong>. Select the entity &gt; Enter Part Name.</span>
                  </div>
                  <div className="step-description" style={{ paddingLeft: '2.5rem' }}>
                    <div className="flex-row-center--wrap" style={{ gap: '2rem', alignItems: 'flex-start' }}>
                      <div style={{ flex: 1 }}>
                        <div className="image-wrapper-flush" style={{ marginBottom: '1rem', marginTop: '1rem' }}>
                          <img src={createPartTool} alt="Create Part Tool" className="software-screenshot screenshot-small" />
                        </div>
                        <div className="flex-row-center" style={{ gap: '1rem' }}>
                          <img src={leftClick} alt="Left Click" className="software-screenshot screenshot-click--inline" />
                        </div>
                      </div>
                      <div className="image-wrapper-flush">
                        <img src={enterPartName} alt="Enter Part Name" className="software-screenshot screenshot-medium" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* STEP 11 */}
                <div className={getStepClass('s2-11')} onClick={() => toggleStep('s2-11')}>
                  <div className="step-header">
                    <span className={`step-number ${completedSteps.has('s2-11') ? 'completed' : ''}`}>
                      {completedSteps.has('s2-11') ? <CheckCircle2 size={16} /> : '11'}
                    </span>
                    <span className="step-label">Check properties of Top 3D Part</span>
                  </div>
                  <div className="step-description" style={{ paddingLeft: '2.5rem' }}>
                    <div className="flex-row-center--wrap" style={{ gap: '2rem' }}>
                      <div className="image-wrapper-flush">
                        <img src={propertiesWindow} alt="Properties Window" className="software-screenshot screenshot-large" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* STEP 12 */}
                <div className={getStepClass('s2-12')} onClick={() => toggleStep('s2-12')}>
                  <div className="step-header">
                    <span className={`step-number ${completedSteps.has('s2-12') ? 'completed' : ''}`}>
                      {completedSteps.has('s2-12') ? <CheckCircle2 size={16} /> : '12'}
                    </span>
                    <span className="step-label">Set necessary infos (Material, Layer, Color).</span>
                  </div>
                  <div className="step-description" style={{ paddingLeft: '2.5rem' }}>
                    <div className="flex-row-center--wrap" style={{ gap: '2rem' }}>
                      <div className="image-wrapper-flush">
                        <img src={layerInfo} alt="Layer Information" className="software-screenshot screenshot-small" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* STEP 13 */}
                <div className={getStepClass('s2-13')} onClick={() => toggleStep('s2-13')}>
                  <div className="step-header">
                    <span className={`step-number ${completedSteps.has('s2-13') ? 'completed' : ''}`}>
                      {completedSteps.has('s2-13') ? <CheckCircle2 size={16} /> : '13'}
                    </span>
                    <span className="step-label">Go to <strong className="text-highlight">File &gt; Save</strong> to save the file.</span>
                  </div>
                </div>

              </div>
            ) : isSample3 ? (
              <div className="tab-pane">
                <h4 className="section-title">HERE IS THE STEP-BY-STEP PROCEDURE OF CREATING 3D MODEL</h4>

                <div className={getStepClass('s3-1')} onClick={() => toggleStep('s3-1')}>
                  <div className="step-header">
                    <span className={`step-number ${completedSteps.has('s3-1') ? 'completed' : ''}`}>
                      {completedSteps.has('s3-1') ? <CheckCircle2 size={16} /> : '1'}
                    </span>
                    <span className="step-label">Open a new drawing: Go to <strong className="text-highlight">File &gt; New</strong></span>
                  </div>
                  <div className="step-description" style={{ paddingLeft: '2.5rem' }}>
                    <p className="p-flush">Save the drawing: <strong className="text-highlight">File &gt; Save As</strong> &gt; Use drawing number as File Name &gt; Press <strong className="text-highlight">Save</strong>.</p>
                    <p className="p-flush" style={{ color: 'var(--primary-red)', marginTop: '0.5rem' }}>*Check if Normal or Mirror Part (See page 37)</p>
                  </div>
                </div>

                {/* STEP 2 */}
                <div className={getStepClass('s3-2')} onClick={() => toggleStep('s3-2')}>
                  <div className="step-header">
                    <span className={`step-number ${completedSteps.has('s3-2') ? 'completed' : ''}`}>
                      {completedSteps.has('s3-2') ? <CheckCircle2 size={16} /> : '2'}
                    </span>
                    <span className="step-label">Segment-based Modeling</span>
                  </div>
                  <div className="step-description" style={{ paddingLeft: '2.5rem' }}>
                    <p className="p-flush">In order to create this part, it must be done by segments. Segments must be attach together after modeling.</p>
                    <div className="image-wrapper-flush" style={{ marginTop: '1.5rem' }}>
                      <img src={segmentOverview} alt="Segments Overview" className="software-screenshot screenshot-large" />
                    </div>
                  </div>

                  <div className="flex-row" style={{ marginTop: '3rem', gap: '4rem', padding: '0 1rem', paddingLeft: '2.5rem' }}>
                    {/* SEGMENT A */}
                    <div style={{ flex: 1, minWidth: '300px' }}>
                      <h4 className="section-title" style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>SEGMENT A</h4>
                      <div className="flex-row-center" style={{ gap: '0.5rem', justifyContent: 'flex-start', marginBottom: '1rem' }}>
                        <p className="p-flush">Use <strong className="text-highlight">Arrange Cylinder</strong></p>
                      </div>
                      <div className="flex-row-center" style={{ gap: '0.5rem', justifyContent: 'flex-start', marginBottom: '1rem' }}>
                        <p className="p-flush">Create 3 cylinders to make the retainer ring groove &gt; <strong className="text-highlight">[UNION]</strong></p>
                      </div>
                      <ul className="interaction-list--plain" style={{ marginLeft: '1.5rem', marginBottom: '2rem' }}>
                        <li>Cylinder 1: <strong className="text-highlight">Diameter = 20mm, Height = 3.65mm, Coordinates (0,0,0)</strong></li>
                        <li>Cylinder 2: <strong className="text-highlight">Diameter = 19mm, Height = 1.35mm</strong></li>
                        <li>Cylinder 3: <strong className="text-highlight">Diameter = 20mm, Height = 64.5mm</strong></li>
                      </ul>
                      <div className="flex-row-center" style={{ gap: '1rem' }}>
                        <div className="image-wrapper-flush" style={{ marginBottom: '1rem' }}>
                          <img src={segmentAResult} alt="Segment A Result" className="software-screenshot screenshot-large" />
                        </div>
                      </div>
                    </div>

                    {/* SEGMENT B */}
                    <div style={{ flex: 1, minWidth: '300px' }}>
                      <h4 className="section-title" style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>SEGMENT B</h4>
                      <div className="flex-row-center" style={{ gap: '0.5rem', justifyContent: 'flex-start', marginBottom: '1rem' }}>
                        <p className="p-flush">Use <strong className="text-highlight">Arrange Cylinder</strong></p>

                      </div>
                      <p className="p-flush" style={{ fontWeight: 'bold', marginBottom: '1.5rem' }}>INPUT:</p>
                      <ul className="interaction-list--plain" style={{ marginLeft: '1.5rem', marginBottom: '2rem' }}>
                        <li>Diameter = <strong className="text-highlight">30mm</strong></li>
                        <li>Height = <strong className="text-highlight">22.25mm</strong></li>
                      </ul>
                      <div className="flex-row-center" style={{ gap: '0.5rem', justifyContent: 'flex-start', marginBottom: '1.5rem' }}>
                        <p className="p-flush">Use <strong className="text-highlight">Center tool</strong> &gt; Attach to Segment A</p>
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
                <div className={getStepClass('s4-1')} onClick={() => toggleStep('s4-1')}>
                  <div className="step-header">
                    <span className={`step-number ${completedSteps.has('s4-1') ? 'completed' : ''}`}>
                      {completedSteps.has('s4-1') ? <CheckCircle2 size={16} /> : '1'}
                    </span>
                    <span className="step-label">SEGMENT C</span>
                  </div>
                  <div style={{ paddingLeft: '2.5rem' }}>
                    <p className="p-flush">In this case, 2D Sketch is recommended in creating the 3D model for this part in order to get the required dimensions precisely. dimensions enclosed in parentheses are close but not exact with the original dimension.</p>

                    <div className="flex-row" style={{ marginTop: '2rem', gap: '2rem' }}>
                      <div style={{ flex: 1 }}>
                        <p className="p-flush" style={{ color: 'var(--primary-red)', marginBottom: '1rem' }}>Open Work Plane</p>
                        <p className="p-flush">Use <strong className="text-highlight">Center</strong> &gt; Place at end of Segment B</p>
                        <div className="image-wrapper-flush" style={{ marginTop: '1rem', marginBottom: '1rem' }}>
                          <img src={workPlaneImg} alt="Open Work Plane" className="software-screenshot screenshot-small" />
                        </div>
                      </div>
                      <div style={{ flex: 1 }}>
                        <p className="p-flush" style={{ color: 'var(--primary-red)', marginBottom: '1rem' }}>Sketch half of segment C (For revolving)</p>
                        <p className="p-flush" style={{ fontStyle: 'italic' }}>*These are the dimensions that must be prioritized.</p>
                        <div className="image-wrapper-flush" style={{ marginTop: '1rem' }}>
                          <img src={sketchImg} alt="Sketch half of Segment C" className="software-screenshot screenshot-medium" />
                        </div>
                      </div>
                    </div>

                    <div className="flex-row-center" style={{ marginTop: '2rem', gap: '2rem', justifyContent: 'flex-start' }}>
                      <div style={{ flex: 1 }}>
                        <div className="step-header" style={{ border: 'none', background: 'transparent', padding: 0, marginBottom: '0.5rem' }}>
                          <span className="step-label">Use <strong className="text-highlight">Revolve (2D &gt;&gt; 3D)</strong></span>
                        </div>
                        <div className="image-wrapper-flush" style={{ marginTop: '1rem' }}>
                          <img src={revolveImg} alt="Revolve Result" className="software-screenshot screenshot-medium" />
                        </div>
                      </div>
                      <div style={{ flex: 1 }}>
                        <h4 className="section-title" style={{ border: 'none', padding: 0, margin: 0, marginBottom: '1rem' }}>SEGMENT D</h4>
                        <div className="step-header" style={{ border: 'none', background: 'transparent', padding: 0, marginBottom: '0.5rem' }}>
                          <span className="step-label">Use <strong className="text-highlight">Arrange Cylinder</strong></span>
                        </div>
                        <ul className="interaction-list--plain" style={{ margin: '0.5rem 0 0.5rem 1.5rem' }}>
                          <p className="p-flush" style={{ fontWeight: 'bold' }}>INPUT:</p>
                          <li>Diameter = 20mm</li>
                          <li>Height = 32.5mm</li>
                        </ul>
                        <div className="step-header" style={{ border: 'none', background: 'transparent', padding: 0, marginBottom: '0.5rem' }}>
                          <span className="step-label">Use <strong className="text-highlight">Center tool</strong> &gt; Attach to Segment C</span>
                        </div>
                        <div className="image-wrapper-flush" style={{ marginTop: '1rem' }}>
                          <img src={segmentDResult} alt="Segment D Result" className="software-screenshot screenshot-medium" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="section-divider" style={{ margin: '1rem 0' }}></div>

                <div className={getStepClass('s4-2')} onClick={() => toggleStep('s4-2')}>
                  <div className="step-header">
                    <span className={`step-number ${completedSteps.has('s4-2') ? 'completed' : ''}`}>
                      {completedSteps.has('s4-2') ? <CheckCircle2 size={16} /> : '2'}
                    </span>
                    <span className="step-label">SEGMENT E</span>
                  </div>
                  <div className="step-description" style={{ paddingLeft: '2.5rem', marginTop: '1rem' }}>
                    <div className="step-header" style={{ border: 'none', background: 'transparent', padding: 0, marginBottom: '0.5rem' }}>
                      <span className="step-label">Use <strong className="text-highlight">Arrange Cylinder</strong></span>
                    </div>
                    <ul className="interaction-list--plain" style={{ margin: '0.5rem 0 0.5rem 1.5rem' }}>
                      <p className="p-flush" style={{ fontWeight: 'bold' }}>INPUT:</p>
                      <li>Diameter = 20mm</li>
                      <li>Height = 32.5mm</li>
                    </ul>
                    <div className="step-header" style={{ border: 'none', background: 'transparent', padding: 0, marginTop: '1rem', marginBottom: '0.5rem' }}>
                      <span className="step-label">Use <strong className="text-highlight">Center tool</strong> &gt; Attach to Segment D</span>
                    </div>
                    <div className="image-wrapper-flush" style={{ marginTop: '1rem' }}>
                      <img src={segmentEResult} alt="Segment E Result" className="software-screenshot screenshot-medium" />
                    </div>
                  </div>
                </div>

                <div className="section-divider" style={{ margin: '1rem 0' }}></div>

                {/* JOIN ALL SEGMENTS */}
                <div className={getStepClass('s4-3')} onClick={() => toggleStep('s4-3')}>
                  <div className="step-header">
                    <span className={`step-number ${completedSteps.has('s4-3') ? 'completed' : ''}`}>
                      {completedSteps.has('s4-3') ? <CheckCircle2 size={16} /> : '3'}
                    </span>
                    <span className="step-label">JOIN ALL SEGMENTS &gt; Use UNION</span>
                  </div>
                </div>

                <div className="section-divider" style={{ margin: '1rem 0' }}></div>

                {/* FOR KEY GROOVE */}
                <div className={getStepClass('s4-4')} onClick={() => toggleStep('s4-4')}>
                  <div className="step-header">
                    <span className={`step-number ${completedSteps.has('s4-4') ? 'completed' : ''}`}>
                      {completedSteps.has('s4-4') ? <CheckCircle2 size={16} /> : '4'}
                    </span>
                    <span className="step-label">For Key Groove</span>
                  </div>
                  <div className="flex-row" style={{ marginTop: '1rem', gap: '2rem', paddingLeft: '2.5rem' }}>
                    <div style={{ flex: 1 }}>
                      <div className="step-header" style={{ border: 'none', background: 'transparent', padding: 0, marginBottom: '0.5rem' }}>
                        <span className="step-label" style={{ color: 'var(--primary-red)' }}>Create the tool entity first</span>
                      </div>
                      <div className="step-header" style={{ border: 'none', background: 'transparent', padding: 0, marginBottom: '0.5rem' }}>
                        <span className="step-label">Use <strong className="text-highlight">Arrange Box</strong></span>
                      </div>
                      <ul className="interaction-list--plain" style={{ marginLeft: '1.5rem', marginBottom: '1.5rem' }}>
                        <p className="p-flush" style={{ fontWeight: 'bold' }}>INPUT:</p>
                        <li>Depth = 6mm</li>
                        <li>Width = 3.5mm</li>
                        <li>Height = 43mm</li>
                      </ul>
                      <div className="image-wrapper-flush">
                        <img src={keyGrooveBox} alt="Key Groove Box Tool" className="software-screenshot screenshot-medium" />
                      </div>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div className="step-header" style={{ border: 'none', background: 'transparent', padding: 0, marginTop: '12rem', marginBottom: '0.5rem' }}>
                        <span className="step-label" style={{ color: 'var(--primary-red)' }}>Position the tool entity</span>
                      </div>
                      <div className="image-wrapper-flush">
                        <img src={keyGroovePos} alt="Position the tool entity" className="software-screenshot screenshot-medium" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : isSample5 ? (
              <div className="tab-pane">
                <h4 className="section-title">FINAL FINISHING OPERATIONS</h4>

                {/* STEP 5 */}
                <div className={getStepClass('s5-5')} onClick={() => toggleStep('s5-5')}>
                  <div className="step-header">
                    <span className={`step-number ${completedSteps.has('s5-5') ? 'completed' : ''}`}>
                      {completedSteps.has('s5-5') ? <CheckCircle2 size={16} /> : '5'}
                    </span>
                    <span className="step-label">Subtract the tool entity</span>
                  </div>
                  <div className="flex-row" style={{ marginTop: '1.5rem', gap: '2rem', paddingLeft: '2.5rem' }}>
                    <div style={{ flex: 1 }}>
                      <div className="step-header" style={{ border: 'none', background: 'transparent', padding: 0, marginBottom: '1rem' }}>
                        <span className="step-label" style={{ color: 'var(--primary-red)' }}>Subtract the tool entity</span>
                      </div>
                      <div className="image-wrapper-flush">
                        <img src={keyGrooveSubtractResult} alt="Subtract Key Groove" className="software-screenshot screenshot-medium" />
                      </div>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div className="step-header" style={{ border: 'none', background: 'transparent', padding: 0, marginBottom: '0.5rem' }}>
                        <span className="step-label" style={{ color: 'var(--primary-red)' }}>Add Fillet on the key groove</span>
                      </div>
                      <div className="step-description">
                         <p className="p-flush">INPUT: <strong className="text-highlight">Radius = 3mm</strong></p>
                      </div>
                      <div className="image-wrapper-flush" style={{ marginTop: '0.5rem' }}>
                        <img src={keyGrooveFilletResult} alt="Fillet Key Groove" className="software-screenshot screenshot-medium" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* STEP 6 */}
                <div className={getStepClass('s5-6')} onClick={() => toggleStep('s5-6')}>
                  <div className="step-header">
                    <span className={`step-number ${completedSteps.has('s5-6') ? 'completed' : ''}`}>
                      {completedSteps.has('s5-6') ? <CheckCircle2 size={16} /> : '6'}
                    </span>
                    <span className="step-label">Add all Fairings (Chamfer and Fillet)</span>
                  </div>
                  <div className="image-wrapper-flush" style={{ marginTop: '1.5rem', paddingLeft: '2.5rem', marginBottom: '1rem' }}>
                    <img src={finalPartFairing} alt="Final Part Fairing" className="software-screenshot screenshot-medium" />
                  </div>
                </div>

                <div className={getStepClass('s5-7')} onClick={() => toggleStep('s5-7')}>
                  <div className="step-header">
                    <span className={`step-number ${completedSteps.has('s5-7') ? 'completed' : ''}`}>
                      {completedSteps.has('s5-7') ? <CheckCircle2 size={16} /> : '7'}
                    </span>
                    <span className="step-label">Create 3D Part Name</span>
                  </div>
                </div>

                {/* STEP 8 */}
                <div className={getStepClass('s5-8')} onClick={() => toggleStep('s5-8')}>
                  <div className="step-header">
                    <span className={`step-number ${completedSteps.has('s5-8') ? 'completed' : ''}`}>
                      {completedSteps.has('s5-8') ? <CheckCircle2 size={16} /> : '8'}
                    </span>
                    <span className="step-label">Check the properties of the Top 3D Part</span>
                  </div>
                </div>

                {/* STEP 9 */}
                <div className={getStepClass('s5-9')} onClick={() => toggleStep('s5-9')}>
                  <div className="step-header">
                    <span className={`step-number ${completedSteps.has('s5-9') ? 'completed' : ''}`}>
                      {completedSteps.has('s5-9') ? <CheckCircle2 size={16} /> : '9'}
                    </span>
                    <span className="step-label">Set all necessary informations (Material, Layer, Color)</span>
                  </div>
                </div>

                <div className={getStepClass('s5-10')} onClick={() => toggleStep('s5-10')}>
                  <div className="step-header">
                    <span className={`step-number ${completedSteps.has('s5-10') ? 'completed' : ''}`}>
                      {completedSteps.has('s5-10') ? <CheckCircle2 size={16} /> : '10'}
                    </span>
                    <span className="step-label">Go to <strong className="text-highlight">File &gt; Save</strong> to save the file.</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="content-placeholder">
                <p>Content for {subLessonId} will be provided soon.</p>
              </div>
            )}
          </div>

          <div className="lesson-navigation">
            <button className="nav-button" onClick={onPrevLesson}><ChevronLeft size={18} /> Previous</button>
            <button className="nav-button next" onClick={onNextLesson}>Next Lesson <ChevronRight size={18} /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OperationSampleLesson;
