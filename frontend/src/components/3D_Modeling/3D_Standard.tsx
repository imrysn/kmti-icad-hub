import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Info, Play } from 'lucide-react';
import { ReadAloudButton } from "../ReadAloudButton";
import { useLessonCore } from "../../hooks/useLessonCore";
import '../../styles/3D_Modeling/CourseLesson.css';

// --- Assets ---
import scale2D from '../../assets/3D_Image_File/standard1_scale_2d.png';
import scale3D from '../../assets/3D_Image_File/standard1_scale_3d.png';
import scalePointer from '../../assets/3D_Image_File/standard1_scale_pointer.png';
import scalePointerVGroove from '../../assets/3D_Image_File/standard1_scale_pointer_vgroove.png';
import pointerColorVGroove from '../../assets/3D_Image_File/standard1_pointer_color_vgroove,,.png'; // Restored
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
  const [activeTab, setActiveTab] = useState<"pointer" | "scale">(() => {
    if (subLessonId !== 'standard-1') return 'pointer';
    return (localStorage.getItem(`${subLessonId}-tab`) as any) || 'pointer';
  });

  useEffect(() => {
    if (subLessonId === 'standard-1') {
      localStorage.setItem(`${subLessonId}-tab`, activeTab);
    }
  }, [subLessonId, activeTab]);

  const {
    scrollProgress,
    containerRef,
    speak,
    stop,
    isSpeaking,
    currentIndex
  } = useLessonCore(subLessonId === 'standard-1' ? `${subLessonId}-${activeTab}` : subLessonId);

  const getStepClass = (stepId: string) => "instruction-step";

  const pointerSteps = [
    "Step 1: Scale Pointer: Apply standard dimensions to both 3D modeling and 2D detailing. The image shows the required pointer geometry.",
    "Step 2: V-Groove Pointer: For V-groove pointers, apply the same standard on 3D and 2D. The pointer color must be Red #3."
  ];

  const scaleSteps = [
    "Step 1: Scale Specifications: On 3D models, text and linear graduations must be Black. On 2D drawings, text must be Yellow #4, and linear graduations must be Skin Color #15."
  ];

  const handleNext = () => {
    if (subLessonId === 'standard-1' && activeTab === 'pointer') {
      setActiveTab('scale');
    } else if (onNextLesson) {
      onNextLesson();
    }
  };

  const handlePrev = () => {
    if (subLessonId === 'standard-1' && activeTab === 'scale') {
      setActiveTab('pointer');
    } else if (onPrevLesson) {
      onPrevLesson();
    }
  };

  // --- Content Mapping ---
  const LESSON_DATA: Record<string, { title: string; steps: string[] }> = {
    'standard-1': {
      title: 'Scale Pointer & Scale',
      steps: [
        "Scale Pointer: Apply standard dimensions to both 3D modeling and 2D detailing. The image shows the required pointer geometry.",
        "V-Groove Pointer: For V-groove pointers, apply the same standard on 3D and 2D. The pointer color must be Red #3.",
        "Scale Specifications: On 3D models, text and linear graduations must be Black. On 2D drawings, text must be Yellow #4, and linear graduations must be Skin Color #15."
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
    <div className={`course-lesson-container ${isSpeaking ? 'is-reading' : ''}`} ref={containerRef}>
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      <section className={`lesson-intro ${isSpeaking && currentIndex === -1 ? 'reading-active' : ''}`}>
        <h3 className="section-title">
          {subLessonId === 'standard-1' ? (activeTab === 'pointer' ? 'Scale Pointer Standards' : 'Scale Specifications') : currentLesson.title}
          <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(subLessonId === 'standard-1' ? (activeTab === 'pointer' ? pointerSteps : scaleSteps) : currentLesson.steps)}
            onStop={stop}
          />
        </h3>
      </section>

      {subLessonId === 'standard-1' && (
        <div className="lesson-tabs">
          <button 
            className={`tab-button ${activeTab === 'pointer' ? 'active' : ''}`}
            onClick={() => setActiveTab('pointer')}
          >
            SCALE POINTER
          </button>
          <button 
            className={`tab-button ${activeTab === 'scale' ? 'active' : ''}`}
            onClick={() => setActiveTab('scale')}
          >
            SCALE
          </button>
        </div>
      )}

      <div className="lesson-grid single-card">
        <div className={`lesson-card tab-content ${isSpeaking ? 'reading-active' : ''}`}>
          {subLessonId === 'standard-1' && (
            <div className="fade-in">
              {activeTab === 'pointer' && (
                <>
                  <div className="card-header">
                    <h4>SCALE POINTER</h4>
                    <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(pointerSteps)} onStop={stop} />
                  </div>

                  <div className={`${getStepClass("s1-1")} ${currentIndex === 0 ? 'reading-active' : ''}`} data-reading-index="0">
                    <div className="step-header">
                      <span className="step-number">1 </span>
                      <span className="step-label">Apply dimensions to both <strong className="text-highlight">3D Modeling</strong> and <strong className="text-highlight">2D Detailing</strong>.</span>
                    </div>
                    <div className="flex-row-wrap mt-4" style={{ gap: '2rem' }}>
                      <div className="screenshot-wrapper">
                        <img src={scalePointer} alt="Scale Pointer Detail" className="software-screenshot screenshot-medium" />
                      </div>
                    </div>
                  </div>

                  <div className="section-divider"></div>

                  <div className={`${getStepClass("s1-2")} ${currentIndex === 1 ? 'reading-active' : ''}`} data-reading-index="1">
                    <div className="step-header">
                      <span className="step-number">2 </span>
                      <span className="step-label">For <strong className="text-highlight">V-groove</strong> pointers, apply the same standard on 3D and 2D.</span>
                    </div>
                    <div className="flex-row-wrap mt-4" style={{ gap: '2rem' }}>
                      <div className="screenshot-wrapper">
                        <img src={scalePointerVGroove} alt="V-groove Pointer Detail" className="software-screenshot screenshot-medium" />
                      </div>
                      <div className="flex-1">
                        <p className="p-flush"><strong>Pointer Color:</strong></p>
                        <p className="p-flush text-highlight" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Red #3</p>
                        <div className="screenshot-wrapper mt-4">
                          <img src={pointerColorVGroove} alt="V-groove Color 3D" className="software-screenshot screenshot-small" />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'scale' && (
                <>
                  <div className="card-header">
                    <h4>SCALE SPECIFICATIONS</h4>
                    <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(scaleSteps)} onStop={stop} />
                  </div>

                  <div className={`${getStepClass("s1-3")} ${currentIndex === 0 ? 'reading-active' : ''}`} data-reading-index="0">
                    <div className="step-header">
                      <span className="step-number">1 </span>
                      <span className="step-label">Visual standards for Scale text and graduations.</span>
                    </div>
                    <div className="step-description">
                      <div className="info-box mb-8">
                        <ul className="list-flush">
                          <li>On <strong className="text-highlight">3D</strong>: Text and linear graduations must be <strong className="text-highlight">Black</strong>.</li>
                          <li>On <strong className="text-highlight">2D</strong>: Text must be <strong className="text-highlight">Yellow #4</strong>, and linear graduations must be <strong className="text-highlight">Skin Color #15</strong>.</li>
                        </ul>
                      </div>
                      <div className="screenshot-wrapper">
                        <img src={scale2D} alt="Scale in 2D" className="software-screenshot" style={{width: "900px"}} />
                      </div>
                      <div className="screenshot-wrapper mt-8">
                        <img src={scale3D} alt="Scale in 3D" className="software-screenshot" style={{marginTop: "1rem", width: "900px"}} />
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {subLessonId === 'standard-2' && (
            <div className="fade-in">
              <div className="card-header">
                <h4>GAS DISCHARGE & OIL GROOVE</h4>
                <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(currentLesson.steps)} onStop={stop} />
              </div>

              <div className={`instruction-step ${currentIndex === 0 ? 'reading-active' : ''}`} data-reading-index="0">
                <div className="step-header">
                  <span className="step-number">1 </span>
                  <span className="step-label">Add one <strong className="text-highlight">ρE Drill hole</strong> per square pipe for gas discharge.</span>
                </div>
                <div className="step-description">
                  <div className="screenshot-wrapper">
                    <img src={gasDischarge} alt="Gas Discharge Layout" className="software-screenshot screenshot-wide" />
                  </div>
                  <div className="instruction-box instruction-box--warning mt-4">
                    <p className="p-flush">On 2D Detail, add the note: <strong className="text-highlight" style={{ fontSize: "1.2rem" }}>（エアー抜き）</strong></p>
                  </div>
                </div>
              </div>

              <div className="section-divider"></div>

              <div className={`instruction-step ${currentIndex === 1 ? 'reading-active' : ''}`} data-reading-index="1">
                <div className="step-header">
                  <span className="step-number">2 </span>
                  <span className="step-label">Manufacturing depth for <strong className="text-highlight">Oil Grooves</strong> should be 1.5mm.</span>
                </div>
                <div className="step-description">
                  <div className="flex-row-wrap mt-4" style={{ gap: '2rem' }}>
                    <div className="flex-1">
                      <ul className="list-flush">
                        <li>Follow KEM oil way standards.</li>
                        <li>Drill/tap holes must be <strong className="text-highlight">smaller</strong> than groove width.</li>
                      </ul>
                    </div>
                    <div className="screenshot-wrapper">
                      <img src={oilGroove} alt="Oil Groove Detail" className="software-screenshot screenshot-medium" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="section-divider"></div>

              <div className={`instruction-step ${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
                <div className="step-header">
                  <span className="step-number">3 </span>
                  <span className="step-label">Include the <strong className="text-highlight">safety color note</strong> in 2D sprocket details.</span>
                </div>
                <div className="step-description">
                  <div className="screenshot-wrapper mt-4">
                    <img src={sprocketNote} alt="Sprocket Safety Color Note" className="software-screenshot screenshot-wide" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {subLessonId === 'standard-3' && (
            <div className="fade-in">
              <div className="card-header">
                <h4>SPROCKET STANDARDS</h4>
                <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(currentLesson.steps)} onStop={stop} />
              </div>

              <div className={`instruction-step ${currentIndex === 0 ? 'reading-active' : ''}`} data-reading-index="0">
                <div className="step-header">
                  <span className="step-number">1 </span>
                  <span className="step-label">Actual sprocket teeth remain <strong className="text-highlight">unpainted</strong>.</span>
                </div>
                <div className="step-description">
                  <div className="screenshot-wrapper">
                    <img src={sprocketColoring} alt="Sprocket Coloring Standard" className="software-screenshot screenshot-medium" />
                  </div>
                  <div className="info-box mt-4">
                    <p className="p-flush text-caption">*Only the functional surfaces should reflect manufacturing reality.</p>
                  </div>
                </div>
              </div>

              <div className="section-divider"></div>

              <div className={`instruction-step ${currentIndex === 1 ? 'reading-active' : ''}`} data-reading-index="1">
                <div className="step-header">
                  <span className="step-number">2 </span>
                  <span className="step-label">Sprocket <strong className="text-highlight">Keyway</strong> location standards.</span>
                </div>
                <div className="step-description">
                  <div className="screenshot-wrapper">
                    <img src={sprocketKeywayLoc} alt="Keyway Location Standards" className="software-screenshot screenshot-medium" />
                  </div>
                  <div className="flex-row-wrap mt-4" style={{ gap: '1rem' }}>
                    <div className="instruction-box flex-1">
                      <p className="p-flush">Parts diagrams: Keyway at <strong className="text-highlight">center of tooth</strong>.</p>
                    </div>
                    <div className="instruction-box flex-1">
                      <p className="p-flush">Purchased parts: Keyway typically at <strong className="text-highlight">valley</strong>.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {subLessonId === 'standard-4' && (
            <div className="fade-in">
              <div className="card-header">
                <h4>SCREW STANDARDS</h4>
                <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(currentLesson.steps)} onStop={stop} />
              </div>

              <div className={`instruction-step ${currentIndex === 0 ? 'reading-active' : ''}`} data-reading-index="0">
                <p className="p-flush mb-8">Follow the Kusakabe standard codes for screws and structural components.</p>
                <div className="screenshot-wrapper">
                  <img src={screwStandard1} alt="Kusakabe Screw Codes 1" className="software-screenshot screenshot-wide" />
                </div>
                <div className="screenshot-wrapper mt-8">
                  <img src={screwStandard2} alt="Kusakabe Screw Codes 2" className="software-screenshot screenshot-wide" />
                </div>
              </div>
            </div>
          )}

          {subLessonId === 'standard-5' && (
            <div className="fade-in">
              <div className="card-header">
                <h4>HARDWARE & BOLT HOLES</h4>
                <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(currentLesson.steps)} onStop={stop} />
              </div>

              <div className={`instruction-step ${currentIndex === 0 ? 'reading-active' : ''}`} data-reading-index="0">
                <h4 className="section-title">Hardware Symbols</h4>
                <div className="screenshot-wrapper">
                  <img src={hardwareSymbolStandard} alt="Hardware Symbols" className="software-screenshot screenshot-wide" />
                </div>
                <div className="section-divider"></div>
                <h4 className="section-title">Bolt Hole Diameter Table</h4>
                <div className="screenshot-wrapper">
                  <img src={boltHoleStandard} alt="Bolt Hole Diameters" className="software-screenshot screenshot-wide" />
                </div>
              </div>
            </div>
          )}

          {subLessonId === 'standard-6' && (
            <div className="fade-in">
              <div className="card-header">
                <h4>BOLT LENGTH & SETUP</h4>
                <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(currentLesson.steps)} onStop={stop} />
              </div>

              <div className={`instruction-step ${currentIndex === 0 ? 'reading-active' : ''}`} data-reading-index="0">
                <div className="step-header">
                  <span className="step-number">1 </span>
                  <span className="step-label">Bolt Length Calculation</span>
                </div>
                <div className="step-description">
                  <div className="info-box">
                    <p className="p-flush"><strong className="text-highlight">(Size × 1.5) + Thickness</strong> = Required Length (Round Up)</p>
                  </div>
                  <div className="screenshot-wrapper mt-4">
                    <img src={boltLengthCalc} alt="Bolt Length Visualization" className="software-screenshot screenshot-wide" />
                  </div>
                </div>
              </div>

              <div className="section-divider"></div>

              <div className={`instruction-step ${currentIndex === 1 ? 'reading-active' : ''}`} data-reading-index="1">
                <div className="step-header">
                  <span className="step-number">2 </span>
                  <span className="step-label">Standard Bolting Setup</span>
                </div>
                <div className="step-description">
                  <div className="flex-row-wrap mt-4" style={{ gap: '2rem' }}>
                    <div className="flex-1">
                      <p className="p-flush"><strong className="text-highlight">Pillow Block:</strong> HB + SW + FW (Hardening)</p>
                      <div className="screenshot-wrapper mt-4">
                        <img src={pillowBlock1} alt="Pillow Block Setup" className="software-screenshot screenshot-small" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="p-flush"><strong className="text-highlight">Flange Type:</strong> HB + SW</p>
                      <div className="screenshot-wrapper mt-4">
                        <img src={pillowBlock2} alt="Flange Setup 1" className="software-screenshot screenshot-small" />
                      </div>
                      <div className="screenshot-wrapper mt-4">
                        <img src={pillowBlock3} alt="Flange Setup 2" className="software-screenshot screenshot-small" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {subLessonId === 'standard-7' && (
            <div className="fade-in">
              <div className="card-header">
                <h4>SLOTTED HOLES & CONNECTIONS</h4>
                <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(currentLesson.steps)} onStop={stop} />
              </div>

              <div className={`instruction-step ${currentIndex === 0 ? 'reading-active' : ''}`} data-reading-index="0">
                <div className="step-header">
                  <span className="step-number">1 </span>
                  <span className="step-label">Slotted holes always require a <strong className="text-highlight">Flat Washer (FW)</strong>.</span>
                </div>
                <div className="flex-row-wrap mt-4" style={{ gap: '2rem' }}>
                  <div className="flex-1">
                    <p className="p-flush text-highlight">Case 1: Slotted + Threaded</p>
                    <div className="screenshot-wrapper mt-4">
                      <img src={slottedThreaded} alt="Slotted Threaded Case" className="software-screenshot screenshot-medium" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="p-flush text-highlight">Case 2: Slotted + Drill</p>
                    <div className="screenshot-wrapper mt-4">
                      <img src={slottedDrill} alt="Slotted Drill Case" className="software-screenshot screenshot-medium" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="section-divider"></div>

              <div className={`instruction-step ${currentIndex === 1 ? 'reading-active' : ''}`} data-reading-index="1">
                <div className="step-header">
                  <span className="step-number">2 </span>
                  <span className="step-label">Standard <strong className="text-highlight">Connections</strong> for C-Channels and Dual Drills.</span>
                </div>
                <div className="flex-row-wrap mt-4" style={{ gap: '2rem' }}>
                  <div className="flex-1">
                    <p className="p-flush text-highlight">C-Channel: HB+AW5+SW+HN1</p>
                    <div className="screenshot-wrapper mt-4">
                      <img src={connectionCChannel} alt="C-Channel Connection" className="software-screenshot screenshot-medium" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="p-flush text-highlight">Dual Drill: CS+SW+HN1</p>
                    <div className="screenshot-wrapper mt-4">
                      <img src={connectionBothDrill} alt="Dual Drill Connection" className="software-screenshot screenshot-medium" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {subLessonId === 'standard-8' && (
            <div className="fade-in">
              <div className="card-header">
                <h4>SGP PIPES</h4>
                <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(currentLesson.steps)} onStop={stop} />
              </div>

              <div className={`instruction-step ${currentIndex === 0 ? 'reading-active' : ''}`} data-reading-index="0">
                <div className="flex-row-wrap mb-8" style={{ gap: '2rem' }}>
                  <div className="flex-1 instruction-box">
                    <p className="p-flush"><strong className="text-highlight">SGP White:</strong> For fluids (Oil, Air, Coolant). Use <strong className="text-highlight">Red</strong> in 3D.</p>
                  </div>
                  <div className="flex-1 instruction-box">
                    <p className="p-flush"><strong className="text-highlight">SGP Black:</strong> For structural parts. Use <strong className="text-highlight">Yellow</strong> in 3D.</p>
                  </div>
                </div>
                <div className="flex-row-wrap" style={{ gap: '2rem' }}>
                  <div className="flex-1">
                    <div className="screenshot-wrapper">
                      <img src={sgpPipesRed} alt="SGP White Pipes" className="software-screenshot screenshot-medium" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="screenshot-wrapper">
                      <img src={sgpPipesYellow} alt="SGP Black Pipes" className="software-screenshot screenshot-medium" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="lesson-navigation">
            <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button>
            <button className="nav-button next" onClick={handleNext}>{nextLabel || 'Next Lesson'} <ChevronRight size={18} /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StandardLesson;
