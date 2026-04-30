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
import gasDischarge from '../../assets/3D_Image_File/standard2_gas_discharge.png';
import oilGroove from '../../assets/3D_Image_File/standard2_oil_groove.png';
import sprocketNote from '../../assets/3D_Image_File/standard2_sprocket.png';
import sprocketColoring from '../../assets/3D_Image_File/standard3_sprocket_3d.png';
import sprocketKeywayLoc from '../../assets/3D_Image_File/standard3_location_of_sprocket_keyway.png';
import boltLengthCalc from '../../assets/3D_Image_File/standard6_bolt_length.png';
import pillowBlock1 from '../../assets/3D_Image_File/standard6_pillow_block_1.png';
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
  const [activeTab, setActiveTab] = useState<"pointer" | "scale" | "gas" | "oil" | "sprocket" | "screw" | "stainless" | "hardware" | "bolt" | "bolt length" | "bolting setup" | "SLOTTED HOLE" | "CONNECTIONS" | "sgp pipes">(() => {
    if (subLessonId === 'standard-4') {
      return (localStorage.getItem(`${subLessonId}-tab`) as any) || 'screw';
    }
    if (subLessonId === 'standard-6') {
      return (localStorage.getItem(`${subLessonId}-tab`) as any) || 'bolt length';
    }
    if (subLessonId !== 'standard-1') return 'pointer';
    return (localStorage.getItem(`${subLessonId}-tab`) as any) || 'pointer';
  });

  useEffect(() => {
    if (subLessonId === 'standard-1') {
      const savedTab = localStorage.getItem(`${subLessonId}-tab`);
      if (savedTab && ['pointer', 'scale', 'gas', 'oil', 'sprocket'].includes(savedTab)) {
        setActiveTab(savedTab as any);
      } else {
        setActiveTab('pointer');
      }
    } else if (subLessonId === 'standard-4') {
      const savedTab = localStorage.getItem(`${subLessonId}-tab`);
      if (savedTab && ['screw', 'stainless', 'hardware', 'bolt'].includes(savedTab)) {
        setActiveTab(savedTab as any);
      } else {
        setActiveTab('screw');
      }
    } else if (subLessonId === 'standard-6') {
      const savedTab = localStorage.getItem(`${subLessonId}-tab`);
      if (savedTab && ['bolt length', 'bolting setup', 'SLOTTED HOLE', 'CONNECTIONS', 'sgp pipes'].includes(savedTab)) {
        setActiveTab(savedTab as any);
      } else {
        setActiveTab('bolt length');
      }
    }
  }, [subLessonId]);

  useEffect(() => {
    if (subLessonId === 'standard-1' || subLessonId === 'standard-4' || subLessonId === 'standard-6') {
      const isValidFor1 = subLessonId === 'standard-1' && ['pointer', 'scale', 'gas', 'oil', 'sprocket'].includes(activeTab);
      const isValidFor4 = subLessonId === 'standard-4' && ['screw', 'stainless', 'hardware', 'bolt'].includes(activeTab);
      const isValidFor6 = subLessonId === 'standard-6' && ['bolt length', 'bolting setup', 'SLOTTED HOLE', 'CONNECTIONS', 'sgp pipes'].includes(activeTab);
      
      if (isValidFor1 || isValidFor4 || isValidFor6) {
        localStorage.setItem(`${subLessonId}-tab`, activeTab);
      }
    }
  }, [subLessonId, activeTab]);

  const {
    scrollProgress,
    containerRef,
    speak,
    stop,
    isSpeaking,
    currentIndex
  } = useLessonCore((subLessonId === 'standard-1' || subLessonId === 'standard-4') ? `${subLessonId}-${activeTab}` : subLessonId);

  const getStepClass = (stepId: string) => "instruction-step";

  const pointerSteps = [
    "Step 1: Scale Pointer: Apply standard dimensions to both 3D modeling and 2D detailing. The image shows the required pointer geometry.",
    "Step 2: V-Groove Pointer: For V-groove pointers, apply the same standard on 3D and 2D. The pointer color must be Red #3."
  ];

  const scaleSteps = [
    "Step 1: Scale Specifications: On 3D models, text and linear graduations must be Black. On 2D drawings, text must be Yellow #4, and linear graduations must be Skin Color #15."
  ];

  const gasSteps = [
    "Step 1: Gas Discharge: To avoid deformation from heat during welding, add one ρE drill hole per square pipe for gas discharge."
  ];

  const oilSteps = [
    "Step 1: Oil Groove: Manufacturing depth should be 1.5mm. Ensure drill and tap holes are smaller than the groove width to maintain oil flow."
  ];

  const sprocketSteps = [
    "Step 1: Sprocket: When detailing sprockets in 2D, always include the standard safety color note as shown."
  ];

  const handleNext = () => {
    if (subLessonId === 'standard-1') {
      if (activeTab === 'pointer') setActiveTab('scale');
      else if (activeTab === 'scale') setActiveTab('gas');
      else if (activeTab === 'gas') setActiveTab('oil');
      else if (activeTab === 'oil') setActiveTab('sprocket');
      else if (onNextLesson) onNextLesson();
    } else if (subLessonId === 'standard-4') {
      if (activeTab === 'screw') setActiveTab('stainless');
      else if (activeTab === 'stainless') setActiveTab('hardware');
      else if (activeTab === 'hardware') setActiveTab('bolt');
      else if (onNextLesson) onNextLesson();
    } else if (subLessonId === 'standard-6') {
      if (activeTab === 'bolt length') setActiveTab('bolting setup');
      else if (activeTab === 'bolting setup') setActiveTab('SLOTTED HOLE');
      else if (activeTab === 'SLOTTED HOLE') setActiveTab('CONNECTIONS');
      else if (activeTab === 'CONNECTIONS') setActiveTab('sgp pipes');
      else if (onNextLesson) onNextLesson();
    } else if (onNextLesson) {
      onNextLesson();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrev = () => {
    if (subLessonId === 'standard-1') {
      if (activeTab === 'sprocket') setActiveTab('oil');
      else if (activeTab === 'oil') setActiveTab('gas');
      else if (activeTab === 'gas') setActiveTab('scale');
      else if (activeTab === 'scale') setActiveTab('pointer');
      else if (onPrevLesson) onPrevLesson();
    } else if (subLessonId === 'standard-4') {
      if (activeTab === 'bolt') setActiveTab('hardware');
      else if (activeTab === 'hardware') setActiveTab('stainless');
      else if (activeTab === 'stainless') setActiveTab('screw');
      else if (onPrevLesson) onPrevLesson();
    } else if (subLessonId === 'standard-6') {
      if (activeTab === 'sgp pipes') setActiveTab('CONNECTIONS');
      else if (activeTab === 'CONNECTIONS') setActiveTab('SLOTTED HOLE');
      else if (activeTab === 'SLOTTED HOLE') setActiveTab('bolting setup');
      else if (activeTab === 'bolting setup') setActiveTab('bolt length');
      else if (onPrevLesson) onPrevLesson();
    } else if (onPrevLesson) {
      onPrevLesson();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- Content Mapping ---
  const LESSON_DATA: Record<string, { title: string; steps: string[] }> = {
    'standard-1': {
      title: 'KEMCO STANDARDS',
      steps: [
        ...pointerSteps,
        ...scaleSteps,
        ...gasSteps,
        ...oilSteps,
        ...sprocketSteps
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

      {subLessonId !== 'standard-1' && subLessonId !== 'standard-4' && subLessonId !== 'standard-6' && (
        <section className={`lesson-intro ${isSpeaking && currentIndex === -1 ? 'reading-active' : ''}`}>
          <h3 className="section-title">
            {currentLesson.title}
            <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(currentLesson.steps)} onStop={stop} />
          </h3>
        </section>
      )}

      {subLessonId === 'standard-1' && (
        <div className="lesson-tabs">
          {[
            { id: 'pointer', label: 'SCALE POINTER' },
            { id: 'scale', label: 'SCALE' },
            { id: 'gas', label: 'GAS DISCHARGE' },
            { id: 'oil', label: 'OIL GROOVE' },
            { id: 'sprocket', label: 'SPROCKET' }
          ].map(tab => (
            <button 
              key={tab.id}
              className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id as any)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}

      {subLessonId === 'standard-4' && (
        <div className="lesson-tabs">
          {[
            { id: 'screw', label: 'SCREW' },
            { id: 'stainless', label: 'STAINLESS STEEL' },
            { id: 'hardware', label: 'HARDWARE' },
            { id: 'bolt', label: 'BOLT' }
          ].map(tab => (
            <button 
              key={tab.id}
              className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id as any)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}

      {subLessonId === 'standard-6' && (
        <div className="lesson-tabs">
          {[
            { id: 'bolt length', label: 'BOLT LENGTH' },
            { id: 'bolting setup', label: 'BOLTING SETUP' },
            { id: 'SLOTTED HOLE', label: 'SLOTTED HOLE' },
            { id: 'CONNECTIONS', label: 'CONNECTIONS' },
            { id: 'sgp pipes', label: 'SGP PIPES' }
          ].map(tab => (
            <button 
              key={tab.id}
              className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id as any)}
            >
              {tab.label}
            </button>
          ))}
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
                      <span className="step-label">Based on the image. We must apply it on <strong className='red-text'> 3D Modeling</strong> and <strong className='red-text'> 2D Detailing</strong>
                      </span>
                    </div>
                    <div className="flex-row-wrap mt-4" style={{ gap: '2rem' }}>
                      <div className="screenshot-wrapper">
                        <img src={scalePointer} alt="Scale Pointer Detail" className="software-screenshot"  style={{width: "900px"}}/>
                      </div>
                    </div>
                  </div>

                  <div className="section-divider"></div>

                  <div className={`${getStepClass("s1-2")} ${currentIndex === 1 ? 'reading-active' : ''}`} data-reading-index="1">
                    <div className="step-header">
                      <span className="step-label">Another type of <strong className='red-text'> Scale Pointer</strong> is by putting <strong className='red-text'>V groove</strong>. We must also apply this on <strong className='red-text'>3D</strong> and <strong className='red-text'>2D</strong></span>
                    </div>
                    <div className="flex-row-wrap mt-4" style={{ gap: '2rem' }}>
                      <div className="screenshot-wrapper">
                        <img src={scalePointerVGroove} alt="V-groove Pointer Detail" className="software-screenshot"  style={{width: "900px"}}/>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'scale' && (
                <>
                  <div className="card-header">
                    <h4>SCALE</h4>
                    <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(scaleSteps)} onStop={stop} />
                  </div>

                    <div className="step-description">
                      <div className="info-box mb-8">
                        <ul className="list-flush">
                          <li>On <strong className="text-highlight">3D</strong>: Text and linear graduations of scale are <strong className="red-text">Black</strong>.</li>
                          <li>On <strong className="text-highlight">2D</strong>: Text must be <strong className="red-text">Yellow #4</strong>, and linear graduations of scale must be <strong className="red-text">Skin Color #15</strong>.</li>
                        </ul>
                      </div>
                      <div className="screenshot-wrapper" style={{marginTop: "2rem"}}>
                        <img src={scale2D} alt="Scale in 2D" className="software-screenshot" style={{width: "900px"}} />
                      </div>
                      <div className="screenshot-wrapper mt-8">
                        <img src={scale3D} alt="Scale in 3D" className="software-screenshot" style={{marginTop: "2rem", width: "900px"}} />
                      </div>
                    </div>
                </>
              )}

              {activeTab === 'gas' && (
                <div className="fade-in">
                  <div className="card-header">
                    <h4>GAS DISCHARGE</h4>
                    <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(gasSteps)} onStop={stop} />
                  </div>
                  <p className='p-flush'>Deformation may happen due to the presence of heat and gas at time of welding. 
                    <br /> Holes added to square pipes for gas discharge. One φ4 Drill hole per square pipe is enough.</p>
                
                    <div className="step-description">
                      <div className="screenshot-wrapper">
                        <img src={gasDischarge} alt="Gas Discharge Layout" className="software-screenshot" style={{ width: "900px", marginTop: "2rem"}} />
                      </div>
                    </div>
                </div>
              )}

              {activeTab === 'oil' && (
                <div className="fade-in">
                  <div className="card-header">
                    <h4>OIL GROOVE</h4>
                    <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(oilSteps)} onStop={stop} />
                  </div>
                  <p className='p-flush'>Is a groove in the surface of a machine part that distributes lubricating oil injected through an oil hole.</p>
                  <div className="step-description">
                    <div className="flex-row-wrap mt-4" style={{ gap: '2rem' }}>
                      <div className="flex-1">
                        <ul className="list-flush">
                          <li>Follow oil way standard of KEM</li>
                          <li>Depth of manufacturing should be 1.5mm</li>
                          <li>In case drill hole and tap hole reach to ditch, the diameter of hole should be smaller than width of groove.</li>
                        </ul>
                      </div>
                      <div className="screenshot-wrapper" style={{marginTop: "2rem"}}>
                        <img src={oilGroove} alt="Oil Groove Detail" className="software-screenshot screenshot" style={{width: "900px"}} />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'sprocket' && (
                <div className="fade-in">
                  <div className="card-header">
                    <h4>SPROCKET</h4>
                    <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(sprocketSteps)} onStop={stop} />
                  </div>
                  <p className='p-flush'>In 2D detail of sprocket, there is a safety color note.</p>
                  <div className="step-description">
                    <div className="screenshot-wrapper mt-4" style={{marginTop: "2rem"}}>
                      <img src={sprocketNote} alt="Sprocket Safety Color Note" className="software-screenshot" style={{width: "900px", marginBottom: "2rem"}} />
                    </div>
                 <span className="step-label"> This is what we should do in 3D model. Because, as we know in actual, the teeth don't have paint.</span>
                <div className="screenshot-wrapper">
                    <img src={sprocketColoring} alt="Sprocket Coloring Standard" className="software-screenshot" style={{marginTop: "1rem", width: "600px", marginBottom: "2rem"}} />
                </div>
                 <span className="step-label">Location of Sprocket Keyway</span>
                 <div className="screenshot-wrapper">
                    <img src={sprocketKeywayLoc} alt="Sprocket Keyway Location Standard" className="software-screenshot" style={{marginTop: "1rem", width: "600px"}} />
                </div>
                <div className="instruction-box" style={{marginTop: "2rem"}}> 
                  <p className='p-flush'> <strong className='red-text'>Note:</strong></p>
                   <p className='p-flush'> 1. Location of keyway always indicated on special notes <br />  キー溝は歯山部中心に合わせ加工すること (Key groove should be machined at the center of the tooth) </p>
                   <p className='p-flush'> 2.  本図ハ市販品ノ追加加工図デアル  (Purchase part with additional process) <br />  <strong className='red-text'> 本図は市販品の追加加工図である (CORRECT)</strong></p>
                </div> 

                  </div>
                </div>
              )}
            </div>
          )}
       

          {subLessonId === 'standard-4' && (
            <div className="fade-in">
              <div className="card-header">
                <h4>
                  {activeTab === 'hardware' ? 'STANDARD OF SYMBOL OF HARDWARE' : 
                   activeTab === 'bolt' ? 'BOLT HOLE DIAMETER STANDARD' : 
                   'Kusakabe Standard Code for Screw, etc.'}
                </h4>
                <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(activeTab === 'hardware' || activeTab === 'bolt' ? LESSON_DATA['standard-5']?.steps || [] : currentLesson.steps)} onStop={stop} />
              </div>

              <div className={`instruction-step ${currentIndex === 0 ? 'reading-active' : ''}`} data-reading-index="0">
                {activeTab === 'screw' && (
                  <div className="lesson-table-container mt-4">
                    <table className="lesson-table">
                      <thead>
                        <tr>
                          <th>Types</th>
                          <th>Code</th>
                          <th>Size</th>
                          <th>Japanese Name</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr><td>Hexagon Head Bolt</td><td>HB</td><td>M10 x 20</td><td>六角ボルト</td></tr>
                        <tr><td>Hexagon Head Bolt (High Tension)</td><td>HBH</td><td>M10 x 20</td><td>六角ボルト（ハイテン10.9）</td></tr>
                        <tr><td>Hexagon Socket Flat Head Bolt</td><td>FB</td><td>M10 x 20</td><td>六角穴付さらボルト</td></tr>
                        <tr><td>Hexagon Head Screw (Full Length)</td><td>HS</td><td>M10 x 20</td><td>六角ボルト（全ネジ）</td></tr>
                        <tr><td>Hexagon Head Bolt (Full Length High Tension)</td><td>HSH</td><td>M10 x 20</td><td>六角ボルト（全ネジハイテン）</td></tr>
                        <tr><td>Hexagon Socket Head Cap Screw</td><td>CS</td><td>M10 x 20</td><td>六角穴付ボルト</td></tr>
                        <tr><td>Hexagon Socket Low Head Cap Screw</td><td>CSL</td><td>M10 x 20</td><td>六角穴付ボルト（低頭）</td></tr>
                        <tr><td>Hexagon Socket Button Head Screw</td><td>BS</td><td>M10 x 20</td><td>六角穴付ボタンボルト</td></tr>
                        <tr><td>Hexagon Nut 1 (Class 1)</td><td>HN1</td><td>M10</td><td>六角ナット（1種）</td></tr>
                        <tr><td>Hexagon Nut 2 (Class 2)</td><td>HN2</td><td>M10</td><td>六角ナット（2種）</td></tr>
                        <tr><td>Hexagon Nut 3 (Class 3)</td><td>HN3</td><td>M10</td><td>六角ナット（3種）</td></tr>
                        <tr><td>Spring Lock Washer (#2)</td><td>SW</td><td>M10</td><td>ばね座金（2号）</td></tr>
                        <tr><td>Spring Lock Washer (For Hexagon Socket head)</td><td>SWS</td><td>M10</td><td>方形ばね座金</td></tr>
                        <tr><td>Conical Spring Washer (Class 1)</td><td>CW1</td><td>M10</td><td>さらばね座金（1種）</td></tr>
                        <tr><td>Conical Spring Washer (Class 2)</td><td>CW2</td><td>M10</td><td>さらばね座金（2種）</td></tr>
                        <tr><td>Plain Washer (Normal Series)</td><td>FW</td><td>M10</td><td>平座金（並丸）</td></tr>
                        <tr><td>Plain Washer (Small Series)</td><td>FWS</td><td>M10</td><td>平座金（小並丸）</td></tr>
                        <tr><td>Plain Washer (Quenched)</td><td>FWH</td><td>M10</td><td>平座金（焼入れ）</td></tr>
                        <tr><td>Square Taper Washer (For U Section)</td><td>AW5</td><td>M10</td><td>傾斜座金（溝形鋼に適用）5°傾斜</td></tr>
                        <tr><td>Square Taper Washer (For I Section)</td><td>AW8</td><td>M10</td><td>傾斜座金（I形鋼に適用）8°傾斜</td></tr>
                        <tr><td>Cross Recessed Flat Head Screw</td><td>FS</td><td>M8 x 20</td><td>十字穴付き 皿小ネジ</td></tr>
                        <tr><td>Cross Recessed Flat Head Screw (Brass)</td><td>FSB</td><td>M8 x 20</td><td>十字穴付き 皿小ネジ (真鍮製)</td></tr>
                        <tr><td>Cross Recessed Pan Head Screw</td><td>PS</td><td>M8 x 20</td><td>十字穴付きなべ小ネジ</td></tr>
                        <tr><td>Cross Recessed Pan Head Screw Unichrome Plated</td><td>PS-U</td><td>M8 x 20</td><td>十字穴付きなべ小ネジ (ユニクロメッキ)</td></tr>
                        <tr><td>Hexagon Socket Head Set Screw (Flat Point)</td><td>SSF</td><td>M10 x 20</td><td>六角穴付止めネジ（平先）</td></tr>
                        <tr><td>Hexagon Socket Head Set Screw (Truncated Cone Point)</td><td>SSC</td><td>M10 x 20</td><td>六角穴付止めネジ（とがり先）</td></tr>
                        <tr><td>Hexagon Socket Head Set Screw (Long Dog Point)</td><td>SSD</td><td>M10 x 20</td><td>六角穴付止めネジ（棒先）</td></tr>
                        <tr><td>Hexagon Socket Head Set Screw (Cup Point)</td><td>SSH</td><td>M10 x 20</td><td>六角穴付止めネジ（くぼみ先）</td></tr>
                        <tr><td>Hexagon Socket Head Set Screw (Rounded Point)</td><td>SSR</td><td>M10 x 20</td><td>六角穴付止めネジ（丸先）</td></tr>
                        <tr><td>Spring Pin</td><td>SP</td><td>8 x 20</td><td>スプリングピン</td></tr>
                        <tr><td>Split Lock</td><td>CP</td><td>4 x 20</td><td>割りピン</td></tr>
                        <tr><td>Nord Lock</td><td>NL</td><td>M10</td><td>ノルトロック NOBEX 製</td></tr>
                        <tr><td>Rivet</td><td>PR</td><td>3.51 x 4.8</td><td>打ち込み鋲（パーカー鋲） 目盛用・黄銅</td></tr>
                        <tr><td>Taper Pin (With External Thread)</td><td>TPI</td><td>8 x 20</td><td>テーパーピン（おねじ付）</td></tr>
                        <tr><td>Taper Pin (With Internal Thread)</td><td>TPE</td><td>8 x 20</td><td>テーパーピン（めねじ付）</td></tr>
                        <tr><td>Straight Pin</td><td>PP</td><td>8 x 20</td><td>平行ピン</td></tr>
                      </tbody>
                    </table>
                  </div>
                )}
                
                {activeTab === 'stainless' && (
                  <div className="lesson-table-container mt-4">
                    <table className="lesson-table">
                      <thead>
                        <tr>
                          <th>Stainless Types</th>
                          <th>Code</th>
                          <th>Size</th>
                          <th>Japanese Name</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr><td>Hexagon Head Bolt</td><td>HB-S</td><td>M10 x 20</td><td>六角ボルト（SUS）</td></tr>
                        <tr><td>Hexagon Head Screw (Full Length)</td><td>HS-S</td><td>M10 x 20</td><td>六角ボルト（全ネジSUS）</td></tr>
                        <tr><td>Hexagon Socket Head Cap Screw</td><td>CS-S</td><td>M10 x 20</td><td>六角穴付ボルト（SUS）</td></tr>
                        <tr><td>Hexagon Socket Low Head Cap Screw</td><td>CSL-S</td><td>M10 x 20</td><td>六角穴付ボルト（低頭）</td></tr>
                        <tr><td>Hexagon Socket Button Head Screw</td><td>BS-S</td><td>M10 x 20</td><td>六角穴付ボタンボルト（SUS）</td></tr>
                        <tr><td>Hexagon Nut 1 (Class 1)</td><td>HN1-S</td><td>M10</td><td>六角ナット（1種）中H6（SUS）</td></tr>
                        <tr><td>Hexagon Nut 2 (Class 2)</td><td>HN2-S</td><td>M10</td><td>六角ナット（2種）中H6（SUS）</td></tr>
                        <tr><td>Hexagon Nut 3 (Class 3)</td><td>HN3-S</td><td>M10</td><td>六角ナット（2種）中H6（SUS）</td></tr>
                        <tr><td>Spring Lock Washer (#2)</td><td>SW-S</td><td>M10</td><td>ばね座金（2号SUS）</td></tr>
                        <tr><td>Plain Washer (Normal Series)</td><td>FW-S</td><td>M10</td><td>平座金（並丸SUS）</td></tr>
                        <tr><td>Hexagon Socket Head Set Screw (Flat Point)</td><td>SSF-S</td><td>M10 x 20</td><td>六角穴付止めネジ（平先SUS）</td></tr>
                        <tr><td>Hexagon Socket Head Set Screw (Truncated Cone Point)</td><td>SSC-S</td><td>M10 x 20</td><td>六角穴付止めネジ（とがり先SUS）</td></tr>
                        <tr><td>Hexagon Socket Head Set Screw (Long Dog Point)</td><td>SSD-S</td><td>M10 x 20</td><td>六角穴付止めネジ（棒先SUS）</td></tr>
                        <tr><td>Hexagon Socket Head Set Screw (Cup Point)</td><td>SSH-S</td><td>M10 x 20</td><td>六角穴付止めネジ（くぼみ先SUS）</td></tr>
                        <tr><td>Hexagon Socket Head Set Screw (Rounded Point)</td><td>SSR-S</td><td>M10 x 20</td><td>六角穴付止めネジ（丸先SUS）</td></tr>
                      </tbody>
                    </table>
                  </div>
                )}
                
                {activeTab === 'hardware' && (
                  <div className="lesson-table-container mt-4">
                    <table className="lesson-table">
                    <thead>
                      <tr>
                        <th>Type</th>
                        <th>Code</th>
                        <th>Size</th>
                        <th>Article (JIS)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td>Hexagon Head Bolt</td><td>HB</td><td>M10 x 20</td><td>JIS B 1180</td></tr>
                      <tr><td>Hexagon Head Bolt (High Tension 10.9)</td><td>HBH</td><td>M10 x 20</td><td>JIS B 1186</td></tr>
                      <tr><td>Hexagon Socket Flat Head Bolt</td><td>FB</td><td>M10 x 20</td><td>Japan Socket Screw工業協同組合</td></tr>
                      <tr><td>Hexagon Head Screw (Full Length)</td><td>HS</td><td>M10 x 20</td><td>JIS B 1180</td></tr>
                      <tr><td>Hexagon Head Bolt (Full Length High Tension)</td><td>HSH</td><td>M10 x 20</td><td>JIS B 1186 Added on 1999/11/29</td></tr>
                      <tr><td>Hexagon Socket Head Cap Screw</td><td>CS</td><td>M10 x 20</td><td>JIS B 1176</td></tr>
                      <tr><td>Hexagon Socket Low Head Cap Screw</td><td>CSL</td><td>M10 x 20</td><td>Added on 1999/11/29</td></tr>
                      <tr><td>Hexagon Socket Button Head Screw</td><td>BS</td><td>M10 x 20</td><td>JIS B 1174</td></tr>
                      <tr><td>Hexagon Nut 1 (Class 1)</td><td>HN1</td><td>M10</td><td>JIS B 1181</td></tr>
                      <tr><td>Hexagon Nut 2 (Class 2)</td><td>HN2</td><td>M10</td><td>JIS B 1181</td></tr>
                      <tr><td>Hexagon Nut 3 (Class 3)</td><td>HN3</td><td>M10</td><td>JIS B 1181</td></tr>
                      <tr><td>Spring Lock Washer (#2)</td><td>SW</td><td>M10</td><td>JIS B 1251</td></tr>
                      <tr><td>Spring Lock Washer (For Hexagon Socket head)</td><td>SWS</td><td>M10</td><td>DIN7980</td></tr>
                      <tr><td>Conical Spring Washer (Class 1)</td><td>CW1</td><td>M10</td><td>JIS B 1152</td></tr>
                      <tr><td>Conical Spring Washer (Class 2)</td><td>CW2</td><td>M10</td><td>JIS B 1152</td></tr>
                      <tr><td>Plain Washer (Normal Series)</td><td>FW</td><td>M10</td><td>JIS B 1156</td></tr>
                      <tr><td>Plain Washer (Small Series)</td><td>FWS</td><td>M10</td><td>JIS B 1156</td></tr>
                      <tr><td>Plain Washer (Quenched)</td><td>FWH</td><td>M10</td><td>-</td></tr>
                      <tr><td>Square Taper Washer (For U Section)</td><td>AW5</td><td>M10</td><td>Inclination 5°</td></tr>
                      <tr><td>Square Taper Washer (For I Section)</td><td>AW8</td><td>M10</td><td>Inclination 8°</td></tr>
                      <tr><td>Cross Recessed Flat Head Screw</td><td>FS</td><td>M8 x 20</td><td>JIS B 1111</td></tr>
                      <tr><td>Cross Recessed Flat Head Screw (Brass)</td><td>FSB</td><td>M8 x 20</td><td>JIS B 1111 Added on 1999/6/30</td></tr>
                      <tr><td>Cross Recessed Pan Head Screw</td><td>PS</td><td>M8 x 20</td><td>JIS B 1111 Added on 1999/11/29</td></tr>
                      <tr><td>Cross Recessed Pan Head Screw Unichorme Plated</td><td>PS-U</td><td>M8 x 20</td><td>JIS B 1111 Added on 2013/12/19</td></tr>
                      <tr><td>Hexagon Socket Head Set Screw (Flat Point)</td><td>SSF</td><td>M10 x 20</td><td>JIS B 1177</td></tr>
                      <tr><td>Hexagon Socket Head Set Screw (Truncated Cone Point)</td><td>SSC</td><td>M10 x 20</td><td>JIS B 1177</td></tr>
                      <tr><td>Hexagon Socket Head Set Screw (Long Dog Point)</td><td>SSD</td><td>M10 x 20</td><td>JIS B 1177</td></tr>
                      <tr><td>Hexagon Socket Head Set Screw (Cup Point)</td><td>SSH</td><td>M10 x 20</td><td>JIS B 1177</td></tr>
                      <tr><td>Hexagon Socket Head Set Screw (Rounded Point)</td><td>SSR</td><td>M10 x 20</td><td>JIS B 1177</td></tr>
                      <tr><td>Spring Pin</td><td>SP</td><td>8 x 20</td><td>JIS B 2808 Revised on 1999/9/3</td></tr>
                      <tr><td>Split Pin</td><td>CP</td><td>4 x 20</td><td>JIS B 1351 Revised on 1999/9/3</td></tr>
                      <tr><td>Nord Lock</td><td>NL</td><td>M10</td><td>NOBEX Added on 1999/6/30</td></tr>
                      <tr><td>Rivet</td><td>PR</td><td>3.51 x 4.8</td><td>For Measure - Chalcopyrite Added on 1999/12/7</td></tr>
                      <tr><td>Taper Pin (With External Thread)</td><td>TPI</td><td>8 x 20</td><td>JIS B 1352 Added on 2000/6/9</td></tr>
                      <tr><td>Taper Pin (With Internal Thread)</td><td>TPE</td><td>8 x 20</td><td>JIS B 1352 Added on 2000/6/9</td></tr>
                      <tr><td>Straight Pin</td><td>PP</td><td>8 x 20</td><td>JIS B 1354 Added on 2000/6/9</td></tr>
                    </tbody>
                    </table>
                  </div>
                )}

                {activeTab === 'bolt' && (
                  <div className="lesson-table-container mt-4">
                    <table className="lesson-table highlight-table">
                    <thead>
                      <tr>
                        <th>BOLT SIZE</th>
                        <th>CLASS 2 (MACHINE)</th>
                        <th>CLASS 3 (WELD)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td>M6</td><td>7</td><td>φ7</td></tr>
                      <tr><td>M8</td><td>9</td><td>10</td></tr>
                      <tr><td>M10</td><td>11</td><td>12</td></tr>
                      <tr><td>M12</td><td>14</td><td>15</td></tr>
                      <tr><td>M14</td><td>16</td><td>17</td></tr>
                      <tr><td>M16</td><td>18</td><td>19</td></tr>
                      <tr><td>M20</td><td>22</td><td>24</td></tr>
                      <tr><td>M24</td><td>26</td><td>28</td></tr>
                      <tr><td>M30</td><td>33</td><td>35</td></tr>
                      <tr><td>M36</td><td>39</td><td>42</td></tr>
                      <tr><td>M42</td><td>45</td><td>48</td></tr>
                      <tr><td>M48</td><td>52</td><td>56</td></tr>
                    </tbody>
                  </table>
                </div>
                )}
              </div>
            </div>
          )}

          {subLessonId === 'standard-6' && (
            <div className="fade-in">
              {activeTab === 'bolt length' && (
                <>
                  <div className="card-header">
                    <h4>BOLT LENGTH</h4>
                    <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(currentLesson.steps)} onStop={stop} />
                  </div>

                  <div className={`instruction-step ${currentIndex === 0 ? 'reading-active' : ''}`} data-reading-index="0">
                    <div className="step-description">
                      <div className="info-box">
                        <table style={{ border: 'none', background: 'transparent' }}>
                          <tbody>
                            <tr>
                              <td style={{ paddingRight: '20px' }}>Example:</td>
                              <td style={{ paddingRight: '20px' }}>Bolt size</td>
                              <td style={{ paddingLeft: '20px' }}>M8</td>
                            </tr>
                            <tr>
                              <td></td>
                              <td>Washer thickness</td>
                              <td style={{ paddingLeft: '20px' }}>2mm</td>
                            </tr>
                            <tr>
                              <td></td>
                              <td>Material thickness</td>
                              <td style={{ paddingLeft: '20px' }}>9mm</td>
                            </tr>
                          </tbody>
                        </table>
                        <br />
                        <p className="p-flush" style={{color: "white"}}>Bolt Length = (Bolt size x 1.5) + (Σ of thickness)</p>
                        <p className="p-flush" style={{color: "white"}}>Bolt Length = (8 x 1.5) + (2+9)</p>
                        <p className="p-flush" style={{color: "white"}}>Bolt Length = 12 + 11</p>
                        <p className="p-flush" style={{color: "white"}}><strong>Bolt Length = 23mm ≈ <span style={{ textDecoration: 'underline' }}>25mm</span></strong></p>
                        <br /> 
                        </div>
                        <div className='instruction-box' style={{marginBottom: "2rem"}}>
                        <p className="p-flush"><strong className="red-text">Note: </strong> </p>
                        <p className="p-flush" style={{ paddingLeft: '40px'}}>1. To avoid easily loosen of the bolt, bolt size is need to multiply by 1.5~2 to get the length of bolt fasten on thread part.</p>
                        <p className="p-flush" style={{ paddingLeft: '40px'}}>2. In case the result is not standard, it will round up to the nearest standard bolt length.</p>
                     </div>
                      <div className="screenshot-wrapper mt-4">
                        <img src={boltLengthCalc} alt="Bolt Length Visualization" className="software-screenshot" style={{width: "900px"}} />
                      </div>
                    </div>
                  </div>
                </>
              )}  

              {activeTab === 'bolting setup' && (
                <>
                  <div className="card-header">
                    <h4>BOLTING SETUP</h4>
                    <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(currentLesson.steps)} onStop={stop} />
                  </div>
                  <p className="p-flush">Bolting setup will depend on a case-by-case basis. These examples are the commonly used setup.</p>
                  <div className={`instruction-step ${currentIndex === 0 ? 'reading-active' : ''}`} data-reading-index="0">
                    <div className="step-description">
                      <div className='instruction-box' style={{marginTop: "1rem", marginBottom: "2rem"}}>
                        <p className="p-flush"><strong className="red-text">Note: </strong> </p>
                        <p className="p-flush" style={{ paddingLeft: '40px'}}>Hexagonal Bolt (HB) can be change to Capscrew (CS) if there will be problems at installation like tight spaces for tools (wrench) or hard to reach areas.</p>
                     </div>
                      <div className="mt-8">
                        <h4 style={{marginBottom: '10px' }}>Pillow Block</h4>
                        <p className="p-flush" style={{ textDecoration: 'underline', color: "white" }}>Bolting for Pillow Block:</p>
                        <p className="p-flush">Hexagonal Bolt (HB)</p>
                        <p className="p-flush">Spring Washer (SW)</p>
                        <p className="p-flush">Flat Washer (Hardening) - <strong className="red-text">SLOTTED</strong></p>
                        
                        <div className="flex-row-wrap mt-4" style={{ gap: '2rem', marginTop: "2rem"}}>
                          <div className="screenshot-wrapper">
                            <img src={pillowBlock1} alt="Pillow Block Setup 1" className="software-screenshot" style={{width: "900px", marginBottom: "2rem"}} />
                          </div>
                        </div>
                      </div>

                      <div className="mt-8">
                        <p className="p-flush" style={{ textDecoration: 'underline', color: "white" }}>For Flange-type Pillow Block:</p>
                        <p className="p-flush">Hexagonal Bolt (HB)</p>
                        <p className="p-flush">Spring Washer (SW)</p>
                        
                        <div className="screenshot-wrapper mt-4">
                          <img src={pillowBlock3} alt="Flange Setup" className="software-screenshot" style={{ width: "300px", marginTop: "2rem"}} />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'SLOTTED HOLE' && (
                <>
                  <div className="card-header">
                    <h4>SLOTTED HOLE</h4>
                    <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(LESSON_DATA['standard-7']?.steps || [])} onStop={stop} />
                  </div>
                  <p className="p-flush">For Parts that need adjustments.</p>
                  <div className={`instruction-step ${currentIndex === 0 ? 'reading-active' : ''}`} data-reading-index="0">
                    <div className="step-description">
                      
                      <div className='instruction-box' style={{marginTop: "1rem", marginBottom: "2rem"}}>
                        <p className="p-flush"><strong className="red-text">Note: </strong> Slotted holes need Flat washer (FW). For normal bolting, Spring Washer (SW) is enough.</p>
                      </div>

                      <div className="mt-8">
                        <p className="p-flush"> <strong style={{color: "white"}}>CASE 1: </strong><br/>Slotted + Threaded Hole</p>
                        <br/>
                        <p className="p-flush">Hexagonal Bolt (HB)</p>
                        <p className="p-flush">Spring Washer (SW)</p>
                        <p className="p-flush">FlatWasher (Hardening)</p>
                        
                        <div className="flex-row-wrap mt-4" style={{ gap: '2rem', marginBottom: '2rem' }}>
                          <div className="screenshot-wrapper">
                            <img src={slottedThreaded} alt="Slotted Threaded Case" className="software-screenshot" style={{width: "900px", marginTop: "2rem"}} />
                          </div>
                        </div>
                      </div>

                      <div className="mt-8">
                        <p className="p-flush"><strong style={{color: "white"}}>CASE 2: </strong><br/>Slotted + Drill hole</p>
                        <br/>
                        <p className="p-flush">Hexagonal Bolt (HB)</p>
                        <p className="p-flush">Flatwasher (FWH)</p>
                        <p className="p-flush">Spring Washer (SW)</p>
                        <p className="p-flush">Hex Nut (HN1)</p>
                        
                        <div className="flex-row-wrap mt-4" style={{ gap: '2rem' }}>
                          <div className="screenshot-wrapper">
                            <img src={slottedDrill} alt="Slotted Drill Case" className="software-screenshot" style={{width: "900px", marginTop: "2rem"}} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'CONNECTIONS' && (
                <>
                  <div className="card-header">
                    <h4>CONNECTIONS</h4>
                    <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(LESSON_DATA['standard-7']?.steps || [])} onStop={stop} />
                  </div>
                  <div className={`instruction-step ${currentIndex === 0 ? 'reading-active' : ''}`} data-reading-index="0">
                    <div className="step-description">
                      <div className="mt-8">
                        <p className="p-flush"> <strong style={{color: "white"}}>CASE 1: </strong><br/>On C-Channel</p>
                        <br/>
                        <p className="p-flush">Hexagonal Bolt (HB)</p>
                        <p className="p-flush">Taper washer (AW5)</p>
                        <p className="p-flush">Flatwasher (FWH) - <strong className="red-text">IF SLOTTED</strong></p>
                        <p className="p-flush">Spring Washer (SW)</p>
                        <p className="p-flush">Hex Nut (HN1)</p>
                        
                        <div className="flex-row-wrap mt-4" style={{ gap: '2rem', marginBottom: '2rem' }}>
                          <div className="screenshot-wrapper">
                            <img src={connectionCChannel} alt="C-Channel Connection" className="software-screenshot" style={{width: "900px", marginTop: "2rem"}} />
                          </div>
                        </div>
                      </div>

                      <div className="mt-8">
                        <p className="p-flush"> <strong style={{color: "white"}}>CASE 2: </strong><br/>Both Drill hole</p>
                        <br/>
                        <p className="p-flush">Hex Sockethead Cap Screw (CS)</p>
                        <p className="p-flush">Spring Washer (SW)</p>
                        <p className="p-flush">Hex Nut (HN1)</p>
                        
                        <div className="flex-row-wrap mt-4" style={{ gap: '2rem' }}>
                          <div className="screenshot-wrapper">
                            <img src={connectionBothDrill} alt="Dual Drill Connection" className="software-screenshot" style={{width: "900px", marginTop: "2rem"}} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'sgp pipes' && (
                <>
                  <div className="card-header">
                    <h4>SGP PIPES</h4>
                    <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(LESSON_DATA['standard-8']?.steps || [])} onStop={stop} />
                  </div>
                  <div className={`instruction-step ${currentIndex === 0 ? 'reading-active' : ''}`} data-reading-index="0">
                    <div className="step-description">
                      <div className="mt-8">
                        <div style={{marginLeft: "2rem"}}>
                          <p className="p-flush">a. <strong className="red-text">SGP (White)</strong></p>
                          <p className="p-flush" style={{marginLeft: "1.5rem"}}>Apply for fluid(Oil, Air and Coolant)</p>
                          <p className="p-flush mt-2">b. <strong className="red-text">SGP (Black)</strong></p>
                          <p className="p-flush" style={{marginLeft: "1.5rem"}}>Apply for Structural Parts/Fabricated Parts.</p>
                        </div>
                        
                        <p className="p-flush mt-4" style={{marginTop: "1rem", textIndent: "2rem"}}>This two types of SGP Pipes will be added on Icad Material List and must be strictly applied on all the drawings to avoid mistakes on purchasing of pipes. This means, we need to identify the 2 types of pipes separately. We will apply it on 3D modeling and 2D detailing of parts.</p>
                        <p className="p-flush mt-4" style={{marginTop: "1rem",  textIndent: "2rem"}}>Inspite of having distinction of White and Black, it does not mean that we also apply it on the 3D Modeling. The color that we will apply on SGP Pipes will based on its usage and application. We must not be confused about the color of SGP Pipes.</p>

                        <div className="flex-row-wrap mt-8" style={{ gap: '2rem' }}>
                          <div className="flex-1">
                            <div className="screenshot-wrapper">
                              <img src={sgpPipesRed} alt="SGP White Pipes" className="software-screenshot" style={{width: "500px", marginTop: "2rem", marginBottom: "1rem"}} />
                            </div>
                            <p className="p-flush mt-2">Red Colored Pipes are <strong className="red-text">SGP (White) Pipes</strong>.</p>
                            <p className="p-flush">ex. Pipes for Outfitting</p>
                          </div>
                          <div className="flex-1">
                            <div className="screenshot-wrapper">
                              <img src={sgpPipesYellow} alt="SGP Black Pipes" className="software-screenshot" style={{width: "300px", marginTop: "2rem", marginBottom: "1rem"}} />
                            </div>
                            <p className="p-flush mt-2">Yellow Colored Pipes are <strong className="red-text">SGP (Black) Pipes</strong>.</p>
                            <p className="p-flush">ex. Hand Rails</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
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
