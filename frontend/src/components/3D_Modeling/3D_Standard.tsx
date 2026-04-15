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
import sgpPipesYellow from '../../assets/3D_Image_File/standard8_SGP_pipes_red.png';

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
            <div className="tab-pane">
              <div className={`instruction-step ${currentIndex === 0 ? 'reading-active' : ''}`}>
                <div className="step-header">
                  <span className="step-number">1</span>
                  <h4 className="section-title">Scale Pointer</h4>
                </div>
                <p className="p">Based on the image. We must apply it on <strong className="text-highlight">3D Modeling</strong> and <strong className="text-highlight">2D Detailing</strong>.</p>
                <div className="flex-row--top">
                  <div className="image-wrapper-flush">
                    <img src={scalePointer} alt="Scale Pointer Detail" className="software-screenshot screenshot-large" />
                  </div>
                  <div className="image-wrapper-flush">
                    <img src={pointerColor} alt="Pointer Color 3D" className="software-screenshot screenshot-medium" />
                  </div>
                </div>
              </div>

              <div className="section-divider" />

              <div className={`instruction-step ${currentIndex === 1 ? 'reading-active' : ''}`}>
                <div className="step-header">
                  <span className="step-number">2</span>
                  <p className="p-flush">Another type of <strong className="text-highlight">Scale Pointer</strong> is by putting <strong className="text-highlight">V-groove</strong>. We must also apply this on 3D and 2D.</p>
                </div>
                <div className="flex-row--top">
                  <div className="image-wrapper-flush">
                    <img src={scalePointerVGroove} alt="V-groove Pointer Detail" className="software-screenshot screenshot-wide" />
                  </div>
                  <div className="image-wrapper-flush">
                    <img src={pointerColorVGroove} alt="V-groove Color 3D" className="software-screenshot screenshot-medium" />
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
                    <div className="image-wrapper-flush">
                      <img src={scale2D} alt="Scale in 2D" className="software-screenshot screenshot-wide" />
                    </div>
                    <div className="image-wrapper-flush">
                      <img src={scale3D} alt="Scale in 3D" className="software-screenshot screenshot-wide" />
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
                  <span className="step-number">1</span>
                  <h4 className="section-title">Gas Discharge</h4>
                </div>
                <p className="p">Deformation may happen due to the presence of heat and gas at time of welding. Holes added to square pipes for gas discharge. One <strong className="text-highlight">ρE Drill hole</strong> per square pipe is enough.</p>
                <div className="image-wrapper-flush">
                  <img src={gasDischarge} alt="Gas Discharge Layout" className="software-screenshot screenshot-wide" />
                </div>
              </div>

              <div className="section-divider" />

              <div className={`instruction-step ${currentIndex === 1 ? 'reading-active' : ''}`}>
                <div className="step-header">
                  <span className="step-number">2</span>
                  <h4 className="section-title">Oil Groove</h4>
                </div>
                <p className="p">Is a groove in the surface of a machine part that distributes lubricating oil injected through an oil hole.</p>
                <div className="flex-row--top">
                  <ul className="interaction-list--plain">
                    <li>Follow oil way standard of KEM.</li>
                    <li>Depth of manufacturing should be <strong>1.5mm</strong>.</li>
                    <li>In case drill/tap holes reach to ditch, the diameter must be <strong>smaller than width of groove</strong>.</li>
                  </ul>
                  <div className="image-wrapper-flush">
                    <img src={oilGroove} alt="Oil Groove Detail" className="software-screenshot screenshot-large" />
                  </div>
                </div>
              </div>

              <div className="section-divider" />

              <div className={`instruction-step ${currentIndex === 2 ? 'reading-active' : ''}`}>
                <div className="step-header">
                  <span className="step-number">3</span>
                  <h4 className="section-title">Sprocket</h4>
                </div>
                <p className="p">In 2D detail of sprocket, there is a <strong>safety color note</strong>.</p>
                <div className="image-wrapper-flush">
                  <img src={sprocketNote} alt="Sprocket Safety Color Note" className="software-screenshot screenshot-wide" />
                </div>
              </div>
            </div>
          )}

          {subLessonId === 'standard-3' && (
            <div className="tab-pane">
              <div className={`instruction-step ${currentIndex === 0 ? 'reading-active' : ''}`}>
                <div className="step-header">
                  <span className="step-number">1</span>
                  <h4 className="section-title">Actual sprocket teeth are unpainted.</h4>
                </div>
                <div className="image-wrapper-flush">
                  <img src={sprocketColoring} alt="Sprocket Coloring NG vs GOOD" className="software-screenshot screenshot-wide" />
                </div>
              </div>
              <div className="section-divider" />
              <div className={`instruction-step ${currentIndex === 1 ? 'reading-active' : ''}`}>
                <div className="step-header">
                  <span className="step-number">2</span>
                  <h4 className="section-title">Location of Sprocket Keyway</h4>
                </div>
                <div className="image-wrapper-flush">
                  <img src={sprocketKeywayLoc} alt="Keyway Location Standards" className="software-screenshot screenshot-wide" />
                </div>
                <div className="info-box">
                  <p className="p-flush"><strong>Note</strong>: 1. Location of keyway always indicated on special notes.</p>
                  <p className="p-flush">キー溝�E歯山部中忁E��合わせ加工すること (Key groove centered on tooth)</p>
                  <p className="p-flush">2. 本図は市販品�E追加加工図である (Purchased part with additional process)</p>
                </div>
              </div>
            </div>
          )}

          {subLessonId === 'standard-4' && (
            <div className="tab-pane">
              <div className={`instruction-step ${currentIndex === 0 ? 'reading-active' : ''}`}>
                <div className="step-header">
                  <span className="step-number">1</span>
                  <h4 className="section-title">Kusakabe Standard Code for Screw, etc.</h4>
                </div>
                <div className="flex-col">
                  <div className="image-wrapper-flush">
                    <img src={screwStandard1} alt="Kusakabe Screw Codes 1" className="software-screenshot screenshot-wide" />
                  </div>
                  <div className="image-wrapper-flush">
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
                <div className="image-wrapper-flush">
                  <img src={hardwareSymbolStandard} alt="Hardware Symbol Standards" className="software-screenshot screenshot-wide" />
                </div>
              </div>
              <div className="section-divider" />
              <div className="image-wrapper-flush">
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
                <p className="p-flush"><strong>Example:</strong> (Bolt size ÁE1.5) + (Thickness) = (8 ÁE1.5) + 11 = 23mm ≁E25mm</p>
                <div className="info-box">
                  <p className="p-flush"><strong>Note</strong>: To ensure fastening, multiply size by 1.5-2x for thread length. Round up to nearest standard size.</p>
                </div>
                <div className="image-wrapper-flush">
                  <img src={boltLengthCalc} alt="Bolt Length Visualization" className="software-screenshot screenshot-wide" />
                </div>
              </div>
              <div className="section-divider" />
              <div className={`instruction-step ${currentIndex === 1 ? 'reading-active' : ''}`}>
                <div className="step-header">
                  <span className="step-number">2</span>
                  <h4 className="section-title">BOLTING SETUP</h4>
                </div>
                <div className="flex-row--top">
                  <div className="image-wrapper-flush">
                    <img src={pillowBlock1} alt="Pillow Block Setup" className="software-screenshot screenshot-medium" />
                  </div>
                  <div className="image-wrapper-flush">
                    <img src={pillowBlock2} alt="Flange Pillow Block 1" className="software-screenshot screenshot-medium" />
                  </div>
                  <div className="image-wrapper-flush">
                    <img src={pillowBlock3} alt="Flange Pillow Block 2" className="software-screenshot screenshot-medium" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {subLessonId === 'standard-7' && (
            <div className="tab-pane">
              <div className={`instruction-step ${currentIndex === 0 ? 'reading-active' : ''}`}>
                <div className="step-header">
                  <span className="step-number">1</span>
                  <h4 className="section-title">SLOTTED HOLE</h4>
                </div>
                <div className="flex-row--top">
                  <div className="image-wrapper-flush">
                    <img src={slottedThreaded} alt="Slotted + Threaded Case" className="software-screenshot screenshot-large" />
                    <p className="p-flush text-highlight">Case 1: Slotted + Threaded</p>
                  </div>
                  <div className="image-wrapper-flush">
                    <img src={slottedDrill} alt="Slotted + Drill Case" className="software-screenshot screenshot-large" />
                    <p className="p-flush text-highlight">Case 2: Slotted + Drill</p>
                  </div>
                </div>
              </div>
              <div className="section-divider" />
              <div className={`instruction-step ${currentIndex === 1 ? 'reading-active' : ''}`}>
                <div className="step-header">
                  <span className="step-number">2</span>
                  <h4 className="section-title">CONNECTIONS</h4>
                </div>
                <div className="flex-row--top">
                  <div className="image-wrapper-flush">
                    <img src={connectionCChannel} alt="C-Channel Connection" className="software-screenshot screenshot-large" />
                    <p className="p-flush text-highlight">Case 1: C-Channel</p>
                  </div>
                  <div className="image-wrapper-flush">
                    <img src={connectionBothDrill} alt="Both Drill Connection" className="software-screenshot screenshot-large" />
                    <p className="p-flush text-highlight">Case 2: Dual Drill</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {subLessonId === 'standard-8' && (
            <div className="tab-pane">
              <div className={`instruction-step ${currentIndex === 0 ? 'reading-active' : ''}`}>
                <div className="step-header">
                  <span className="step-number">1</span>
                  <h4 className="section-title">SGP PIPES</h4>
                </div>
                <div className="flex-row--top">
                  <div className="image-wrapper-flush">
                    <img src={sgpPipesRed} alt="SGP White (Red) Pipes" className="software-screenshot screenshot-large" />
                    <p className="p-flush"><strong>Red = SGP White</strong> (Fluid)</p>
                  </div>
                  <div className="image-wrapper-flush">
                    <img src={sgpPipesYellow} alt="SGP Black (Yellow) Pipes" className="software-screenshot screenshot-medium" />
                    <p className="p-flush"><strong>Yellow = SGP Black</strong> (Structural)</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {!Object.keys(LESSON_DATA).includes(subLessonId) && (
            <div className="tab-pane">
              <div className="content-placeholder">
                <Play size={48} className="content-placeholder__icon" />
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
