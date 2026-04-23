import React from 'react';
import { ChevronLeft, ChevronRight, Info, Play } from 'lucide-react';
import { ReadAloudButton } from "../ReadAloudButton";
import { useLessonCore } from "../../hooks/useLessonCore";
import '../../styles/3D_Modeling/CourseLesson.css';

// --- Assets ---
import pointerColor from '../../assets/3D_Image_File/standard1pointer_color.png';
import pointerColorVGroove from '../../assets/3D_Image_File/standard1_pointer_color_vgroove.png';
import scale2D from '../../assets/3D_Image_File/standard1_scale_2d.png';
import scale3D from '../../assets/3D_Image_File/standard1_scale_3d.png';
import scalePointer from '../../assets/3D_Image_File/standard1_scale_pointer.png';
import scalePointerVGroove from '../../assets/3D_Image_File/standard1_scale_pointer_vgroove.png';
import gasDischarge from '../../assets/3D_Image_File/standard2_gas_discharge.png';
import oilGroove from '../../assets/3D_Image_File/standard2_oil_groove.png';
import sprocketNote from '../../assets/3D_Image_File/standard2_sprocket.png';
import sprocketColoring from '../../assets/3D_Image_File/standard3_sprocket_3d.png';
import sprocketKeywayLoc from '../../assets/3D_Image_File/standard3_location_of_sprocket_keyway.png';
import screwStandard1 from '../../assets/3D_Image_File/standard4_screw_1.png';
import screwStandard2 from '../../assets/3D_Image_File/standard4_screw_2.png';
import hardwareSymbolStandard from '../../assets/3D_Image_File/standard5_screw_1.png';
import boltHoleStandard from '../../assets/3D_Image_File/standard5_screw_2.png';
import boltLengthCalc from '../../assets/3D_Image_File/standard6_bolt_length.png';
import pillowBlock1 from '../../assets/3D_Image_File/standard6_pillow_block_1.png';
import pillowBlock2 from '../../assets/3D_Image_File/standard6_pillow_block_2.png';
import pillowBlock3 from '../../assets/3D_Image_File/standard6_pillow_block_3.png';
import slottedThreaded from '../../assets/3D_Image_File/standard7_case1.png';
import slottedDrill from '../../assets/3D_Image_File/standard7_case2.png';
import connectionCChannel from '../../assets/3D_Image_File/standard7_connections_case1.png';
import connectionBothDrill from '../../assets/3D_Image_File/standard7_connections_case2.png';
import sgpPipesRed from '../../assets/3D_Image_File/standard8_SGP_pipes_red.png';
import sgpPipesYellow from '../../assets/3D_Image_File/standard8_SGP_pipes_yellow.png';


interface StandardLessonProps {
  nextLabel?: string; subLessonId?: string; onNextLesson?: () => void; onPrevLesson?: () => void;
}

/**
 * StandardLesson component for KEMCO Standard Lessons 1-8.
 * Refactored to use centralized useLessonCore hook for state and TTS.
 */
const StandardLesson: React.FC<StandardLessonProps> = ({
  subLessonId = 'standard-1',
  onNextLesson,
  onPrevLesson
  , nextLabel }) => {
  const {
    scrollProgress,
    containerRef,
    speak,
    stop,
    isSpeaking,
    currentIndex
  } = useLessonCore(subLessonId);

  // --- Content Mapping ---
  const LESSON_DATA: Record<string, { title: string; steps: string[] }> = {
    'standard-1': {
      title: 'Scale Pointer',
      steps: [
        "Scale Pointer: Apply these details to both 3D modeling and 2D detailing. The image shows the standard pointer dimensions.",
        "V-Groove Pointer: Another type of scale pointer uses a V-groove. Ensure this is applied consistently on both 3D and 2D drawings.",
        "Scale Specifications: On 3D models, text and graduations must be black. On 2D drawings, use yellow for text and skin color for linear graduations."
      ]
    },
    'standard-2': {
      title: 'GAS DISCHARGE, OIL GROOVE & SPROCKET', steps: [
        "Gas Discharge: To avoid deformation from heat during welding, add one ρE drill hole per square pipe for gas discharge.",
        "Oil Groove: Manufacturing depth should be 1.5mm. Ensure drill and tap holes are smaller than the groove width to maintain oil flow.",
        "Sprocket: When detailing sprockets in 2D, always include the standard safety color note as shown."
      ]
    },
    'standard-3': {
      title: 'SPROCKET COLORING & KEYWAY', steps: [
        "Sprocket Coloring: In 3D modeling, teeth should remain unpainted to reflect actual manufacturing where the teeth have no paint.",
        "Keyway Location: Always check special notes for keyway placement. The standard is to machine the key groove at the center of the tooth."
      ]
    },
    'standard-4': { title: 'KUSAKABE STANDARD CODE FOR SCREW', steps: ["Kusakabe Screw Codes: Follow these standard codes for screws, including specific designations for stainless steel parts."] },
    'standard-5': { title: 'HARDWARE SYMBOLS & BOLT HOLES', steps: ["Hardware Symbols: Utilize these standard hardware symbols and refer to the bolt hole diameter table for precise modeling."] },
    'standard-6': {
      title: 'BOLT LENGTH & BOLTING SETUP', steps: [
        "Bolt Length: Calculate length using the formula: Bolt size times 1.5 plus the sum of material thicknesses. Round up to the nearest standard length.",
        "Bolting Setup: Standard setup varies. For pillow blocks, use a hexagonal bolt, spring washer, and flat washer. Use capscrews for tight spaces."
      ]
    },
    'standard-7': {
      title: 'SLOTTED HOLE', steps: [
        "Slotted Hole: Use these for parts requiring adjustment. Remember that slotted holes always require a flat washer for proper fastening.",
        "Connections: For C-channel connections, use taper washers and hex nuts. For dual drill holes, hex socket head capscrews are preferred."
      ]
    },
    'standard-8': { title: 'SGP PIPES', steps: ["SGP Pipes: Distinguish between White SGP for fluids like oil and air, and Black SGP for structural parts. Use red for white pipes and yellow for black pipes in your models."] }
  };

  const currentLesson = LESSON_DATA[subLessonId] || { title: `STANDARD (${subLessonId})`, steps: [] };

  return (
    <div className="course-lesson-container" ref={containerRef}>
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      <section className="lesson-intro">
        <h3 className="section-title">
          {currentLesson.title}
          <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(currentLesson.steps)}
            onStop={stop}
          />
        </h3>
        {currentLesson.steps.length === 0 && (
          <p className="p-flush">Other KEMCO standard components and design conventions.</p>
        )}
      </section>

      <div className="lesson-grid single-card">
        <div className="lesson-card">
          {subLessonId === 'standard-1' && (
            <div className="tab-pane">              <div className={`instruction-step ${currentIndex === 0 ? 'reading-active' : ''}`}>
                <div className="step-header">
                  <h4 className="section-title">Scale Pointer</h4>
                </div>
                <div className="step-header">
                  <span className="step-number">1</span>
                  <p className="p">Based on the image. We must apply it on <strong className="text-highlight">3D Modeling</strong> and <strong className="text-highlight">2D Detailing</strong>.</p>
                </div>
                <div className="flex-row-wrap mt-4">
                  <div className="screenshot-wrapper">
                    <img src={scalePointer} alt="Scale Pointer Detail" className="software-screenshot screenshot-large" style={{ width: '650px', height: '400px' }} />
                  </div>
                  <div className="mt-8 ml-8">
                    <p className="p-flush"><strong>Pointer Color:</strong></p>
                    <p className="p-flush text-highlight" style={{ fontSize: '1.5rem' }}>Red #3</p>
                    <div className="screenshot-wrapper mt-4">
                      <img src={pointerColor} alt="Pointer Color 3D" className="software-screenshot screenshot-medium" />
                    </div>
                  </div>
                </div>
              </div>


              <div className="section-divider" />
              <div className={`instruction-step ${currentIndex === 1 ? 'reading-active' : ''}`}>
                <div className="step-header">
                  <span className="step-number">2</span>
                  <p className="p-flush">Another type of <strong className="text-highlight">Scale Pointer</strong> is by putting <strong className="text-highlight">V-groove</strong>. We must also apply this on 3D and 2D.</p>
                </div>
                <div className="flex-row-wrap mt-4">
                  <div className="screenshot-wrapper">
                    <img src={scalePointerVGroove} alt="V-groove Pointer Detail" className="software-screenshot screenshot-wide" style={{ width: '650px', height: '400px' }} />
                  </div>
                  <div className="mt-8 ml-8">
                    <p className="p-flush"><strong>Pointer Color:</strong></p>
                    <p className="p-flush text-highlight" style={{ fontSize: '1.5rem' }}>Red #3</p>
                    <div className="screenshot-wrapper mt-4">
                      <img src={pointerColorVGroove} alt="V-groove Color 3D" className="software-screenshot screenshot-medium" />
                    </div>
                  </div>
                </div>
              </div>


              <div className="section-divider" />

              <div className={`instruction-step ${currentIndex === 2 ? 'reading-active' : ''}`}>
                <div className="step-header">
                  <span className="step-number">3</span>
                  <p className="p-flush">Scale Specifications</p>
                </div>
                <div className="step-description">
                  <div className="info-box">
                    <ul className="interaction-list--plain">
                      <li>On <strong className="text-highlight">3D</strong>, Text and linear graduations of scale are <strong>black</strong>.</li>
                      <li>On <strong className="text-highlight">2D</strong>, Text must be <strong>yellow #4</strong> and linear graduations of scale must be <strong>skin color #15</strong>.</li>
                    </ul>
                  </div>
                  <div className="flex-col">
                    <div>
                      <img src={scale2D} alt="Scale in 2D" className="software-screenshot screenshot-wide" style={{ width: '700px' }} />
                    </div>
                    <br />
                    <br />
                    <div>
                      <img src={scale3D} alt="Scale in 3D" className="software-screenshot screenshot-wide" style={{ width: '910px', height: '70px' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {subLessonId === 'standard-2' && (
            <div className="tab-pane">
              <div className={`instruction-step ${currentIndex === 0 ? 'reading-active' : ''}`}>
                <div className="step-header">
                  <h4 className="section-title">Gas Discharge</h4>
                </div>
                <div className="step-header">
                  <span className="step-number">1</span>
                  <p className="p">Deformation may happen due to the presence of heat and gas at time of welding. Holes added to square pipes for gas discharge. One <strong className="text-highlight">ρE Drill hole</strong> per square pipe is enough.</p>
                </div>
                <div className="screenshot-wrapper mt-4">
                  <img src={gasDischarge} alt="Gas Discharge Layout" className="software-screenshot screenshot-wide" />
                </div>
                <div className="instruction-box mt-4">
                  <p>On the 2D Detail, add the note for air discharge.</p>
                  <p className="text-highlight" style={{ fontSize: "1.5rem", fontWeight: 'bold' }}>（エアー抜き）</p>
                </div>
              </div>

              <div className="section-divider" />

              <div className={`instruction-step ${currentIndex === 1 ? 'reading-active' : ''}`}>
                <div className="step-header">
                  <h4 className="section-title">Oil Groove</h4>
                </div>
                <div className="step-header">
                  <span className="step-number">2</span>
                  <p className="p">Is a groove in the surface of a machine part that distributes lubricating oil injected through an oil hole.</p>
                </div>
                <div className="flex-row-wrap mt-4">
                  <div className="flex-1">
                    <ul className="interaction-list--plain">
                      <li>Follow oil way standard of KEM.</li>
                      <li>Depth of manufacturing should be <strong>1.5mm</strong>.</li>
                      <li>In case drill/tap holes reach to ditch, the diameter must be <strong>smaller than width of groove</strong>.</li>
                    </ul>
                  </div>
                  <div className="screenshot-wrapper">
                    <img src={oilGroove} alt="Oil Groove Detail" className="software-screenshot screenshot-large" style={{ width: '650px' }} />
                  </div>
                </div>
              </div>

              <div className="section-divider" />

              <div className={`instruction-step ${currentIndex === 2 ? 'reading-active' : ''}`}>
                <div className="step-header">

                  <h4 className="section-title">Sprocket</h4>
                </div>
                <div className="step-header">
                  <span className="step-number">3</span>
                  <p className="p">In 2D detail of sprocket, there is a <strong>safety color note</strong>.</p>
                </div>
                <div className="screenshot-wrapper mt-4">
                  <img src={sprocketNote} alt="Sprocket Safety Color Note" className="software-screenshot screenshot-wide" />
                </div>
              </div>
            </div>
          )}

          {subLessonId === 'standard-3' && (
            <div className="tab-pane">
              <div className={`instruction-step ${currentIndex === 0 ? 'reading-active' : ''}`}>
                <p>This is what we should do in 3D model. Because, as we know in actual, the teeth don't have paint.</p>
                <div className="step-header">
                  <span className="step-number">1</span>
                  <h4 className="section-title">Actual sprocket teeth are unpainted.</h4>
                </div>
                <div className="screenshot-wrapper mt-4">
                  <img src={sprocketColoring} alt="Sprocket Coloring NG vs GOOD" className="software-screenshot screenshot-wide" style={{ width: "410px" }} />
                </div>
                <div className="info-box mt-4">
                  <p className="p-flush">※ All selected entity will be color yellow</p>
                  <p className="p-flush">※ Only the selected surface will be color yellow</p>
                </div>
              </div>

              <div className="section-divider" />

              <div className={`instruction-step ${currentIndex === 1 ? 'reading-active' : ''}`}>
                <div className="step-header">
                  <span className="step-number">2</span>
                  <h4 className="section-title">Location of Sprocket Keyway</h4>
                </div>
                <div className="screenshot-wrapper mt-4">
                  <img src={sprocketKeywayLoc} alt="Keyway Location Standards" className="software-screenshot screenshot-wide" style={{ width: '600px' }} />
                </div>
                <div className="flex-row-wrap mt-4" style={{ gap: '1rem' }}>
                  <div className="instruction-box flex-1">
                    <p className="p-flush">When arranging parts diagram, keyway location will be at the center of the tooth.</p>
                  </div>
                  <div className="instruction-box flex-1">
                    <p className="p-flush">Keyway on sprocket as purchase part will be arrange on the valley. (MANUFACTURER STANDARD).</p>
                  </div>
                </div>
                <div className="info-box mt-4">
                  <p className="p-flush"><strong>Note</strong>: 1. Location of keyway always indicated on special notes.</p>
                  <p className="p-flush">キー溝E歯山部中忁E合わせ加工すること (Key groove centered on tooth)</p>
                  <p className="p-flush">2. 本図は市販品E追加加工図である (Purchased part with additional process)</p>
                </div>
              </div>
            </div>
          )}

          {subLessonId === 'standard-4' && (
            <div className="tab-pane">
              <div className={`instruction-step ${currentIndex === 0 ? 'reading-active' : ''}`}>
                <p>This is what we should do in 3D model. Because, as we know in actual, the teeth don't have paint. </p>
                <div className="step-header">
                  <span className="step-number">1</span>
                  <h4 className="section-title">Kusakabe Standard Code for Screw, etc.</h4>
                </div>
                <div className="flex-col">
                  <div className="screenshot-wrapper">
                    <img src={screwStandard1} alt="Kusakabe Screw Codes 1" className="software-screenshot screenshot-wide" />
                  </div>
                  <div className="screenshot-wrapper mt-8">
                    <img src={screwStandard2} alt="Kusakabe Screw Codes 2 (Stainless)" className="software-screenshot screenshot-wide" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {subLessonId === 'standard-5' && (
            <div className="tab-pane">
              <div className={`instruction-step ${currentIndex === 0 ? 'reading-active' : ''}`}>
                <div className="step-header">
                  <span className="step-number">1</span>
                  <h4 className="section-title">STANDARD OF SYMBOL OF HARDWARE</h4>
                </div>
                <div className="screenshot-wrapper">
                  <img src={hardwareSymbolStandard} alt="Hardware Symbol Standards" className="software-screenshot screenshot-wide" />
                </div>
              </div>

              <div className="section-divider" />

              <div className="screenshot-wrapper">
                <img src={boltHoleStandard} alt="Bolt Hole Diameter Standard Table" className="software-screenshot screenshot-wide" />
              </div>
            </div>
          )}

          {subLessonId === 'standard-6' && (
            <div className="tab-pane">
              <div className={`instruction-step ${currentIndex === 0 ? 'reading-active' : ''}`}>
                <div className="step-header">
                  <span className="step-number">1</span>
                  <h4 className="section-title">BOLT LENGTH</h4>
                </div>
                <p className="p-flush"><strong>Example:</strong> (Bolt size × 1.5) + (Thickness) = (8 × 1.5) + 11 = 23mm ≈ 25mm</p>
                <div className="info-box mt-4">
                  <p className="p-flush"><strong>Note</strong>: To avoid easily loosen of the bolt, bolt size is need to multiply size by 1.5-2. </p>
                  <p>In case the result is not standard, it will round up to the nearest standard bolt length.</p>
                </div>
                <div className="screenshot-wrapper mt-4">
                  <img src={boltLengthCalc} alt="Bolt Length Visualization" className="software-screenshot screenshot-wide" />
                </div>
              </div>

              <div className="section-divider" />

              <div className={`instruction-step ${currentIndex === 1 ? 'reading-active' : ''}`}>
                <div className="step-header">
                  <span className="step-number">2</span>
                  <h4 className="section-title">BOLTING SETUP</h4>
                </div>
                <p className="lesson-subtitle">Bolting setup will depend on a case-by-case basis. These examples are the commonly used to setup.</p>
                <div className="instruction-box">
                  <p className="p-flush"><strong>Note</strong>: Hexagonal Bolt (HB) can be change to Capscrew (CS) if there will be problems at installation like tight spaces for tools (wrench) or hard to reach areas.</p>
                </div>
                <div className="flex-row-wrap mt-8" style={{ gap: '2rem' }}>
                  <div className="flex-1">
                    <p className="text-highlight" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Pillow Block</p>
                    <p style={{ textDecoration: 'underline' }}>Bolting for Pillow Block:</p>
                    <ul className="interaction-list--plain">
                      <li>Hexagonal Bolt (HB)</li>
                      <li>Spring Washer (SW)</li>
                      <li>Flat Washer (Hardening)</li>
                    </ul>
                    <div className="screenshot-wrapper mt-4">
                      <img src={pillowBlock1} alt="Pillow Block Setup" className="software-screenshot screenshot-medium" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-highlight" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Flange Pillow Block 1</p>
                    <p style={{ textDecoration: 'underline' }}>For Flange-type Pillow Block:</p>
                    <ul className="interaction-list--plain">
                      <li>Hexagonal Bolt (HB)</li>
                      <li>Spring Washer (SW)</li>
                    </ul>
                    <div className="screenshot-wrapper mt-4">
                      <img src={pillowBlock2} alt="Flange Pillow Block 1" className="software-screenshot screenshot-medium" />
                    </div>
                    <div className="screenshot-wrapper mt-4">
                      <img src={pillowBlock3} alt="Flange Pillow Block 2" className="software-screenshot screenshot-medium" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {subLessonId === 'standard-7' && (
            <div className="tab-pane">
              <div className={`instruction-step ${currentIndex === 0 ? 'reading-active' : ''}`}>
                <p className="lesson-subtitle">For Parts that need adjustments.</p>
                <div className="instruction-box">
                  <p className="p-flush"><strong>Note:</strong > Slotted holes need Flat washer (FW). Spring Washer (SW) is enough.</p>
                </div>

                <div className="step-header">
                  <span className="step-number">1</span>
                  <h4 className="section-title">SLOTTED HOLE</h4>
                </div>
                <div className="flex-row-wrap mt-4" style={{ gap: '2rem' }}>
                  <div className="flex-1">
                    <p className="text-highlight" style={{ fontWeight: 'bold' }}>Case 1: Slotted + Threaded</p>
                    <ul className="interaction-list--plain mt-2">
                      <li>Hexagonal Bolt (HB)</li>
                      <li>Spring Washer (SW)</li>
                      <li>Flat Washer (Hardening)</li>
                    </ul>
                    <div className="screenshot-wrapper mt-4">
                      <img src={slottedThreaded} alt="Slotted + Threaded Case" className="software-screenshot screenshot-large" style={{ width: '600px' }} />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-highlight" style={{ fontWeight: 'bold' }}>Case 2: Slotted + Drill</p>
                    <ul className="interaction-list--plain mt-2">
                      <li>Hexagonal Bolt (HB)</li>
                      <li>Flat washer (FWH)</li>
                      <li>Spring Washer (SW)</li>
                      <li>Hex Nut (HN1)</li>
                    </ul>
                    <div className="screenshot-wrapper mt-4">
                      <img src={slottedDrill} alt="Slotted + Drill Case" className="software-screenshot screenshot-large" style={{ width: '600px' }} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="section-divider" />

              <div className={`instruction-step ${currentIndex === 1 ? 'reading-active' : ''}`}>
                <div className="step-header">
                  <span className="step-number">2</span>
                  <h4 className="section-title">CONNECTIONS</h4>
                </div>
                <div className="flex-row-wrap mt-4" style={{ gap: '2rem' }}>
                  <div className="flex-1">
                    <p className="text-highlight" style={{ fontWeight: 'bold' }}>Case 1: C-Channel</p>
                    <ul className="interaction-list--plain mt-2">
                      <li>Hexagonal Bolt (HB)</li>
                      <li>Taper washer (AW5)</li>
                      <li>Flat Washer (FHW) - IF SLOTTED</li>
                      <li>Spring Washer (SW)</li>
                      <li>Hex Nut (HN1)</li>
                    </ul>
                    <div className="screenshot-wrapper mt-4">
                      <img src={connectionCChannel} alt="C-Channel Connection" className="software-screenshot screenshot-large" style={{ width: '600px' }} />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-highlight" style={{ fontWeight: 'bold' }}>Case 2: Dual Drill</p>
                    <ul className="interaction-list--plain mt-2">
                      <li>Hex Socket Cap Screw (CS)</li>
                      <li>Spring Washer (SW)</li>
                      <li>Hex Nut (HN1)</li>
                    </ul>
                    <div className="screenshot-wrapper mt-4">
                      <img src={connectionBothDrill} alt="Both Drill Connection" className="software-screenshot screenshot-large" style={{ width: '600px' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {subLessonId === 'standard-8' && (
            <div className="tab-pane">
              <div className={`instruction-step ${currentIndex === 0 ? 'reading-active' : ''}`}>
                <div className="step-header">
                  <h4 className="section-title">SGP PIPES</h4>
                </div>
                <div className="flex-row-wrap mt-4" style={{ gap: '2rem' }}>
                  <div className="flex-1">
                    <p className="text-highlight" style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>a. SGP (White)</p>
                    <p className="p-flush">Apply for fluid (Oil, Air and Coolant)</p>
                  </div>
                  <div className="flex-1">
                    <p className="text-highlight" style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>b. SGP (Black)</p>
                    <p className="p-flush">Apply for structural</p>
                  </div>
                </div>
                <div className="instruction-box mt-4">
                  <p>These two types of SGP Pipes will be added on iCAD Material List and must be strictly applied on all the drawings to avoid mistakes on purchasing of pipes. This means, we need to identify the 2 types of pipes separately. We will apply it on 3D modeling and 2D detailing of parts.</p>
                </div>
                <p className="p-flush mt-4">In spite of having distinction of White and Black, it does not mean that we also apply it on the 3D Modeling. The color that we will apply on SGP Pipes will based on its usage and application. We must not be confused about the color of SGP Pipes.</p>

                <div className="flex-row-wrap mt-8" style={{ gap: '2rem' }}>
                  <div className="flex-1">
                    <div className="screenshot-wrapper">
                      <img src={sgpPipesRed} alt="SGP White (Red) Pipes" className="software-screenshot screenshot-large" />
                    </div>
                    <div className="mt-4">
                      <p><strong>Red = SGP White</strong> (Fluid)</p>
                      <p><em>ex. Pipes for cutting Outfitting</em></p>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="screenshot-wrapper">
                      <img src={sgpPipesYellow} alt="SGP Black (Yellow) Pipes" className="software-screenshot screenshot-medium" />
                    </div>
                    <div className="mt-4">
                      <p><strong>Yellow = SGP Black</strong> (Structural)</p>
                      <p><em>ex. Hand Rails</em></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {!Object.keys(LESSON_DATA).includes(subLessonId) && (
            <div className="tab-pane">
              <div className="content-placeholder">
                <Play size={48} className="content-placeholder_icon" />
                <p>Content for <strong>{subLessonId}</strong> will be provided soon.</p>
              </div>
            </div>
          )}

          <div className="lesson-navigation">
            <button className="nav-button" onClick={onPrevLesson}>
              <ChevronLeft size={18} /> Previous
            </button>
            <button className="nav-button next" onClick={onNextLesson}>
              {nextLabel || 'Next Lesson'} <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StandardLesson;
