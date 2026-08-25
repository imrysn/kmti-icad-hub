import { useTranslation } from '../../context/LanguageContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React,{ useEffect,useState } from 'react';
import { useLessonCore } from "../../hooks/useLessonCore";
import { useTTSAutoplay } from "../../hooks/useTTSAutoplay";
import './CourseLesson.css';
import { KaraokeLessonText } from "../KaraokeLessonText";

// --- Assets ---
import scale2D from '../../assets/3d-images/standard1_scale_2d.png';
import scale3D from '../../assets/3d-images/standard1_scale_3d.png';
import scalePointer from '../../assets/3d-images/standard1_scale_pointer.png';
import scalePointerVGroove from '../../assets/3d-images/standard1_scale_pointer_vgroove.png';
import gasDischarge from '../../assets/3d-images/standard2_gas_discharge.png';
import oilGroove from '../../assets/3d-images/standard2_oil_groove.png';
import sprocketNote from '../../assets/3d-images/standard2_sprocket.png';
import sprocketKeywayLoc from '../../assets/3d-images/standard3_location_of_sprocket_keyway.png';
import sprocketColoring from '../../assets/3d-images/standard3_sprocket_3d.png';
import boltLengthCalc from '../../assets/3d-images/standard6_bolt_length.png';
import pillowBlock1 from '../../assets/3d-images/standard6_pillow_block_1.png';
import pillowBlock3 from '../../assets/3d-images/standard6_pillow_block_3.png';
import slottedThreaded from '../../assets/3d-images/standard7_case1.png';
import slottedDrill from '../../assets/3d-images/standard7_case2.png';
import connectionCChannel from '../../assets/3d-images/standard7_connections_case1.png';
import connectionBothDrill from '../../assets/3d-images/standard7_connections_case2.png';
import sgpPipesRed from '../../assets/3d-images/standard8_SGP_pipes_red.png';
import sgpPipesYellow from '../../assets/3d-images/standard8_SGP_pipes_yellow.png';



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
  onPrevLesson,
  nextLabel
}) => {
  const { t } = useTranslation();

  const [activeTab, setActiveTab] = useState<"pointer" | "scale" | "gas" | "oil" | "sprocket" | "screw" | "stainless" | "hardware" | "bolt" | "bolt length" | "bolting setup" | "SLOTTED HOLE" | "CONNECTION OF ALUMINUM FRAME" | "CONNECTIONS" | "sgp pipes">(() => {
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

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  const {
    scrollProgress,
    containerRef,
    speak,
    stop,
    isSpeaking,
    currentIndex,
    currentCharIndex,
    registerText
  } = useLessonCore(subLessonId);

  const getStepClass = (_stepId: string) => "instruction-step";

  const pointerSteps = [
    t('standard.pointerSteps.step0'),
    t('standard.pointerSteps.step1'),
    t('standard.pointerSteps.step2')
  ];

  const scaleSteps = [
    t('standard.scaleSteps.step0'),
    t('standard.scaleSteps.step1')
  ];

  const gasSteps = [
    t('standard.gasSteps.step0'),
    t('standard.gasSteps.step1')
  ];

  const oilSteps = [
    t('standard.oilSteps.step0'),
    t('standard.oilSteps.step1'),
    t('standard.oilSteps.step2')
  ];

  const sprocketSteps = [
    t('standard.sprocketSteps.step0'),
    t('standard.sprocketSteps.step1'),
    t('standard.sprocketSteps.step2'),
    t('standard.sprocketSteps.step3'),
    t('standard.sprocketSteps.step4')
  ];

  const boltLengthSteps = [
    t('standard.boltLengthSteps.step0'),
    t('standard.boltLengthSteps.step1'),
    t('standard.boltLengthSteps.step2')
  ];

  const boltingSetupSteps = [
    t('standard.boltingSetupSteps.step0'),
    t('standard.boltingSetupSteps.step1'),
    t('standard.boltingSetupSteps.step2'),
    t('standard.boltingSetupSteps.step3'),
    t('standard.boltingSetupSteps.step4')
  ];

  const slottedHoleSteps = [
    t('standard.slottedHoleSteps.step0'),
    t('standard.slottedHoleSteps.step1'),
    t('standard.slottedHoleSteps.step2'),
    t('standard.slottedHoleSteps.step3'),
    t('standard.slottedHoleSteps.step4')
  ];

  const connectionSteps = [
    t('standard.connectionSteps.step0'),
    t('standard.connectionSteps.step1'),
    t('standard.connectionSteps.step2')
  ];

  const sgpPipeSteps = [
    t('standard.sgpPipeSteps.step0'),
    t('standard.sgpPipeSteps.step1'),
    t('standard.sgpPipeSteps.step2')
  ];

  const handleNext = () => {
    stop();
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
    stop();
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


  // Register text dynamically on tab/activeTab changes
  useEffect(() => {
    let steps: string[] = [];
    let startIdx = 0;
    if (subLessonId === 'standard-1') {
      steps = activeTab === 'pointer' ? pointerSteps :
        activeTab === 'scale' ? scaleSteps :
          activeTab === 'gas' ? gasSteps :
            activeTab === 'oil' ? oilSteps : sprocketSteps;
      startIdx = activeTab === 'pointer' ? 0 : 1; // standard intro bypass
    } else if (subLessonId === 'standard-4') {
      steps = activeTab === 'screw' ? ["Kusakabe Screw Codes: Follow these standard codes for screws, including specific designations for stainless steel parts."] :
        activeTab === 'stainless' ? ["Stainless Steel Parts: Always check chemical properties and standard grades when modeling stainless parts."] :
          activeTab === 'hardware' ? (LESSON_DATA['standard-5']?.steps || []) :
            (LESSON_DATA['standard-5']?.steps || []);
    } else if (subLessonId === 'standard-6') {
      steps = activeTab === 'bolt length' ? boltLengthSteps :
        activeTab === 'bolting setup' ? boltingSetupSteps :
          activeTab === 'SLOTTED HOLE' ? slottedHoleSteps :
            activeTab === 'CONNECTIONS' ? connectionSteps : sgpPipeSteps;
      startIdx = activeTab === 'bolt length' ? 0 : 1;
    }
    if (steps.length > 0) {
      registerText(steps, startIdx);
    }
  }, [subLessonId, activeTab, registerText]);

  // Autoplay hook integration
  const currentTabSteps =
    subLessonId === 'standard-1' ? (
      activeTab === 'pointer' ? pointerSteps :
        activeTab === 'scale' ? scaleSteps :
          activeTab === 'gas' ? gasSteps :
            activeTab === 'oil' ? oilSteps : sprocketSteps
    ) : subLessonId === 'standard-4' ? (
      activeTab === 'screw' ? ["Kusakabe Screw Codes: Follow these standard codes for screws, including specific designations for stainless steel parts."] :
        activeTab === 'stainless' ? ["Stainless Steel Parts: Always check chemical properties and standard grades when modeling stainless parts."] :
          activeTab === 'hardware' ? (LESSON_DATA['standard-5']?.steps || []) :
            (LESSON_DATA['standard-5']?.steps || [])
    ) : subLessonId === 'standard-6' ? (
      activeTab === 'bolt length' ? boltLengthSteps :
        activeTab === 'bolting setup' ? boltingSetupSteps :
          activeTab === 'SLOTTED HOLE' ? slottedHoleSteps :
            activeTab === 'CONNECTIONS' ? connectionSteps : sgpPipeSteps
    ) : [];

  const currentStartIdx =
    subLessonId === 'standard-1' ? (activeTab === 'pointer' ? 0 : 1) :
      subLessonId === 'standard-6' ? (activeTab === 'bolt length' ? 0 : 1) : 0;

  const currentTabsList =
    subLessonId === 'standard-1' ? [
      { id: 'pointer' }, { id: 'scale' }, { id: 'gas' }, { id: 'oil' }, { id: 'sprocket' }
    ] : subLessonId === 'standard-4' ? [
      { id: 'screw' }, { id: 'stainless' }, { id: 'hardware' }, { id: 'bolt' }
    ] : subLessonId === 'standard-6' ? [
      { id: 'bolt length' }, { id: 'bolting setup' }, { id: 'SLOTTED HOLE' }, { id: 'CONNECTIONS' }, { id: 'sgp pipes' }
    ] : [];

  useTTSAutoplay(
    isSpeaking,
    currentIndex,
    activeTab,
    currentTabSteps.length,
    currentTabsList,
    handleNext,
    speak,
    currentTabSteps,
    currentStartIdx
  );

  return (
    <div className={`course-lesson-container ${isSpeaking ? 'is-reading' : ''}`} ref={containerRef}>
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      {subLessonId !== 'standard-1' && subLessonId !== 'standard-4' && subLessonId !== 'standard-6' && (
        <section className={`lesson-intro ${isSpeaking && currentIndex === -1 ? 'reading-active' : ''}`}>
          <h3 className="section-title">
            {currentLesson.title}

          </h3>
        </section>
      )}

      {subLessonId === 'standard-1' && (
        <div className="lesson-tabs">
          {[
            { id: 'pointer', label: t('standard.tabs.pointer') },
            { id: 'scale', label: t('standard.tabs.scale') },
            { id: 'gas', label: t('standard.tabs.gas') },
            { id: 'oil', label: t('standard.tabs.oil') },
            { id: 'sprocket', label: t('standard.tabs.sprocket') }
          ].map(tab => (
            <button
              key={tab.id}
              className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => { stop(); setActiveTab(tab.id as any); }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}

      {subLessonId === 'standard-4' && (
        <div className="lesson-tabs">
          {[
            { id: 'screw', label: t('standard.tabs.screw') },
            { id: 'stainless', label: t('standard.tabs.stainless') },
            { id: 'hardware', label: t('standard.tabs.hardware') },
            { id: 'bolt', label: t('standard.tabs.bolt') }
          ].map(tab => (
            <button
              key={tab.id}
              className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => { stop(); setActiveTab(tab.id as any); }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}

      {subLessonId === 'standard-6' && (
        <div className="lesson-tabs">
          {[
            { id: 'bolt length', label: t('standard.tabs.bolt_length') },
            { id: 'bolting setup', label: t('standard.tabs.bolting_setup') },
            { id: 'SLOTTED HOLE', label: t('standard.tabs.slotted_hole') },
            { id: 'CONNECTIONS', label: t('standard.tabs.connections') },
            { id: 'sgp pipes', label: t('standard.tabs.sgp_pipes') }
          ].map(tab => (
            <button
              key={tab.id}
              className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => { stop(); setActiveTab(tab.id as any); }}
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
                  <div className={`card-header ${currentIndex === 0 ? 'reading-active' : ''}`} data-reading-index="0">
                    <h4>
                      <KaraokeLessonText
                        as="span"
                        text={t('standard.pointerSteps.step0')}
                        isActive={isSpeaking && currentIndex === 0}
                        currentCharIndex={currentCharIndex}
                      />
                    </h4>

                  </div>

                  <div className={`${getStepClass("s1-1")} ${currentIndex === 1 ? 'reading-active' : ''}`} data-reading-index="1">
                    <div className="step-header">
                      <KaraokeLessonText
                        as="span"
                        className="step-label"
                        text={t('standard.pointerSteps.step1')}
                        isActive={isSpeaking && currentIndex === 1}
                        currentCharIndex={currentCharIndex}
                      />
                    </div>
                    <div className="flex-row-wrap mt-4" style={{ gap: '2rem' }}>
                      <img src={scalePointer} alt={t('common.scale_pointer_detail')} className="software-screenshot mt-4" style={{ width: "900px" }} />
                    </div>
                  </div>


                  <div className={`${getStepClass("s1-2")} ${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
                    <div className="step-header">
                      <KaraokeLessonText
                        as="span"
                        className="step-label"
                        text={t('standard.pointerSteps.step2')}
                        isActive={isSpeaking && currentIndex === 2}
                        currentCharIndex={currentCharIndex}
                      />
                    </div>
                    <div className="flex-row-wrap mt-4" style={{ gap: '2rem' }}>
                      <img src={scalePointerVGroove} alt={t('common.v_groove_pointer_detail')} className="software-screenshot mt-4" style={{ width: "900px" }} />
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'scale' && (
                <>
                  <div className={`card-header ${currentIndex === 0 ? 'reading-active' : ''}`} data-reading-index="0">
                    <h4>
                      <KaraokeLessonText
                        as="span"
                        text={t('standard.scaleSteps.step0')}
                        isActive={isSpeaking && currentIndex === 0}
                        currentCharIndex={currentCharIndex}
                      />
                    </h4>

                  </div>

                  <div className={`step-description ${currentIndex === 1 ? 'reading-active' : ''}`} data-reading-index="1">
                    <div className="info-box mb-8">
                      <KaraokeLessonText
                        as="div"
                        text={t('standard.scaleSteps.step1')}
                        isActive={isSpeaking && currentIndex === 1}
                        currentCharIndex={currentCharIndex}
                      />
                    </div>
                    <img src={scale2D} alt={t('common.scale_in_2d')} className="software-screenshot mt-8" style={{ width: "900px" }} />
                    <img src={scale3D} alt={t('common.scale_in_3d')} className="software-screenshot mt-8" style={{ marginTop: "2rem", width: "900px" }} />
                  </div>
                </>
              )}

              {activeTab === 'gas' && (
                <div className="fade-in">
                  <div className={`card-header ${currentIndex === 0 ? 'reading-active' : ''}`} data-reading-index="0">
                    <h4>
                      <KaraokeLessonText
                        as="span"
                        text={t('standard.gasSteps.step0')}
                        isActive={isSpeaking && currentIndex === 0}
                        currentCharIndex={currentCharIndex}
                      />
                    </h4>

                  </div>
                  <div className={`instruction-step ${currentIndex === 1 ? 'reading-active' : ''}`} data-reading-index="1">
                    <KaraokeLessonText
                      as="div"
                      className='p-flush'
                      text={t('standard.gasSteps.step1')}
                      isActive={isSpeaking && currentIndex === 1}
                      currentCharIndex={currentCharIndex}
                    />
                  </div>

                  <div className="step-description">
                    <img src={gasDischarge} alt={t('common.gas_discharge_layout')} className="software-screenshot mt-8" style={{ width: "900px", marginTop: "2rem" }} />
                  </div>
                </div>
              )}

              {activeTab === 'oil' && (
                <div className="fade-in">
                  <div className={`card-header ${currentIndex === 0 ? 'reading-active' : ''}`} data-reading-index="0">
                    <h4>
                      <KaraokeLessonText
                        as="span"
                        text={t('standard.oilSteps.step0')}
                        isActive={isSpeaking && currentIndex === 0}
                        currentCharIndex={currentCharIndex}
                      />
                    </h4>

                  </div>
                  <div className={`instruction-step ${currentIndex === 1 ? 'reading-active' : ''}`} data-reading-index="1">
                    <KaraokeLessonText
                      as="div"
                      className='p-flush'
                      text={t('standard.oilSteps.step1')}
                      isActive={isSpeaking && currentIndex === 1}
                      currentCharIndex={currentCharIndex}
                    />
                  </div>
                  <div className={`step-description ${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
                    <div className="flex-row-wrap mt-4" style={{ gap: '2rem' }}>
                      <div className="flex-1">
                        <ul className="list-flush">
                          <li>{t('standard.oil.list1')}</li>
                          <li>{t('standard.oil.list2')}</li>
                          <li>{t('standard.oil.list3')}</li>
                        </ul>
                      </div>
                      <img src={oilGroove} alt={t('common.oil_groove_detail')} className="software-screenshot mt-8" style={{ width: "900px" }} />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'sprocket' && (
                <div className="fade-in">
                  <div className={`card-header ${currentIndex === 0 ? 'reading-active' : ''}`} data-reading-index="0">
                    <h4>
                      <KaraokeLessonText
                        as="span"
                        text={t('standard.sprocketSteps.step0')}
                        isActive={isSpeaking && currentIndex === 0}
                        currentCharIndex={currentCharIndex}
                      />
                    </h4>

                  </div>
                  <div className={`instruction-step ${currentIndex === 1 ? 'reading-active' : ''}`} data-reading-index="1">
                    <KaraokeLessonText
                      as="div"
                      className='p-flush'
                      text={t('standard.sprocketSteps.step1')}
                      isActive={isSpeaking && currentIndex === 1}
                      currentCharIndex={currentCharIndex}
                    />
                  </div>
                  <div className={`step-description`}>
                    <img src={sprocketNote} alt={t('common.sprocket_safety_color_note')} className="software-screenshot mt-8" style={{ width: "900px", marginBottom: "2rem" }} />

                    <div className={`${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2" style={{ marginBottom: "2rem" }}>
                      <KaraokeLessonText
                        as="span"
                        className="step-label"
                        text={t('standard.sprocketSteps.step2')}
                        isActive={isSpeaking && currentIndex === 2}
                        currentCharIndex={currentCharIndex}
                      />
                      <img src={sprocketColoring} alt={t('common.sprocket_coloring_standard')} className="software-screenshot mt-4" style={{ marginTop: "1rem", width: "600px" }} />
                    </div>

                    <div className={`${currentIndex === 3 ? 'reading-active' : ''}`} data-reading-index="3" style={{ marginBottom: "2rem" }}>
                      <KaraokeLessonText
                        as="span"
                        className="step-label"
                        text={t('standard.sprocketSteps.step3')}
                        isActive={isSpeaking && currentIndex === 3}
                        currentCharIndex={currentCharIndex}
                      />
                      <img src={sprocketKeywayLoc} alt={t('common.sprocket_keyway_location_standard')} className="software-screenshot mt-4" style={{ marginTop: "1rem", width: "600px" }} />
                      <div className={`instruction-box ${currentIndex === 4 ? 'reading-active' : ''}`} data-reading-index="4" style={{ marginTop: "2rem" }}>
                        <p className='p-flush'> <strong className='red-text'>{t('standard.misc.note')}</strong></p>
                        <KaraokeLessonText
                          as="div"
                          className='p-flush'
                          text={t('standard.sprocketSteps.step4')}
                          isActive={isSpeaking && currentIndex === 4}
                          currentCharIndex={currentCharIndex}
                        />
                      </div>
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
                  {activeTab === 'hardware' ? t('standard.titles.hardware') :
                    activeTab === 'bolt' ? t('standard.titles.bolt') :
                      t('standard.titles.screw')}
                </h4>

              </div>

              <div className={`instruction-step ${currentIndex === 0 ? 'reading-active' : ''}`} data-reading-index="0">
                {activeTab === 'screw' && (
                  <div className="lesson-table-container mt-4">
                    <table className="lesson-table">
                      <thead>
                        <tr>
                          <th>{t('common.table.types')}</th>
                          <th>{t('common.table.code')}</th>
                          <th>{t('common.table.size')}</th>
                          <th>{t('common.table.japanese_name')}</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr><td>{t('standard.table.hexagon_head_bolt')}</td><td>HB</td><td>M10 x 20</td><td>六角ボルト</td></tr>
                        <tr><td>{t('standard.table.hexagon_head_bolt_high_tension')}</td><td>HBH</td><td>M10 x 20</td><td>六角ボルト（ハイテン10.9）</td></tr>
                        <tr><td>{t('standard.table.hexagon_socket_flat_head_bolt')}</td><td>FB</td><td>M10 x 20</td><td>六角穴付さらボルト</td></tr>
                        <tr><td>{t('standard.table.hexagon_head_screw_full_length')}</td><td>HS</td><td>M10 x 20</td><td>六角ボルト（全ネジ）</td></tr>
                        <tr><td>{t('standard.table.hexagon_head_bolt_full_length_high_tension')}</td><td>HSH</td><td>M10 x 20</td><td>六角ボルト（全ネジハイテン）</td></tr>
                        <tr><td>{t('standard.table.hexagon_socket_head_cap_screw')}</td><td>CS</td><td>M10 x 20</td><td>六角穴付ボルト</td></tr>
                        <tr><td>{t('standard.table.hexagon_socket_low_head_cap_screw')}</td><td>CSL</td><td>M10 x 20</td><td>六角穴付ボルト（低頭）</td></tr>
                        <tr><td>{t('standard.table.hexagon_socket_button_head_screw')}</td><td>BS</td><td>M10 x 20</td><td>六角穴付ボタンボルト</td></tr>
                        <tr><td>{t('standard.table.hexagon_nut_1_class_1')}</td><td>HN1</td><td>M10</td><td>六角ナット（1種）</td></tr>
                        <tr><td>{t('standard.table.hexagon_nut_2_class_2')}</td><td>HN2</td><td>M10</td><td>六角ナット（2種）</td></tr>
                        <tr><td>{t('standard.table.hexagon_nut_3_class_3')}</td><td>HN3</td><td>M10</td><td>六角ナット（3種）</td></tr>
                        <tr><td>{t('standard.table.spring_lock_washer_2')}</td><td>SW</td><td>M10</td><td>ばね座金（2号）</td></tr>
                        <tr><td>{t('standard.table.spring_lock_washer_for_hexagon_socket_head')}</td><td>SWS</td><td>M10</td><td>方形ばね座金</td></tr>
                        <tr><td>{t('standard.table.conical_spring_washer_class_1')}</td><td>CW1</td><td>M10</td><td>さらばね座金（1種）</td></tr>
                        <tr><td>{t('standard.table.conical_spring_washer_class_2')}</td><td>CW2</td><td>M10</td><td>さらばね座金（2種）</td></tr>
                        <tr><td>{t('standard.table.plain_washer_normal_series')}</td><td>FW</td><td>M10</td><td>平座金（並丸）</td></tr>
                        <tr><td>{t('standard.table.plain_washer_small_series')}</td><td>FWS</td><td>M10</td><td>平座金（小並丸）</td></tr>
                        <tr><td>{t('standard.table.plain_washer_quenched')}</td><td>FWH</td><td>M10</td><td>平座金（焼入れ）</td></tr>
                        <tr><td>{t('standard.table.square_taper_washer_for_u_section')}</td><td>AW5</td><td>M10</td><td>傾斜座金（溝形鋼に適用）5°傾斜</td></tr>
                        <tr><td>{t('standard.table.square_taper_washer_for_i_section')}</td><td>AW8</td><td>M10</td><td>傾斜座金（I形鋼に適用）8°傾斜</td></tr>
                        <tr><td>{t('standard.table.cross_recessed_flat_head_screw')}</td><td>FS</td><td>M8 x 20</td><td>十字穴付き 皿小ネジ</td></tr>
                        <tr><td>{t('standard.table.cross_recessed_flat_head_screw_brass')}</td><td>FSB</td><td>M8 x 20</td><td>十字穴付き 皿小ネジ (真鍮製)</td></tr>
                        <tr><td>{t('standard.table.cross_recessed_pan_head_screw')}</td><td>PS</td><td>M8 x 20</td><td>十字穴付きなべ小ネジ</td></tr>
                        <tr><td>{t('standard.table.cross_recessed_pan_head_screw_unichrome_plated')}</td><td>PS-U</td><td>M8 x 20</td><td>十字穴付きなべ小ネジ (ユニクロメッキ)</td></tr>
                        <tr><td>{t('standard.table.hexagon_socket_head_set_screw_flat_point')}</td><td>SSF</td><td>M10 x 20</td><td>六角穴付止めネジ（平先）</td></tr>
                        <tr><td>{t('standard.table.hexagon_socket_head_set_screw_truncated_cone_point')}</td><td>SSC</td><td>M10 x 20</td><td>六角穴付止めネジ（とがり先）</td></tr>
                        <tr><td>{t('standard.table.hexagon_socket_head_set_screw_long_dog_point')}</td><td>SSD</td><td>M10 x 20</td><td>六角穴付止めネジ（棒先）</td></tr>
                        <tr><td>{t('standard.table.hexagon_socket_head_set_screw_cup_point')}</td><td>SSH</td><td>M10 x 20</td><td>六角穴付止めネジ（くぼみ先）</td></tr>
                        <tr><td>{t('standard.table.hexagon_socket_head_set_screw_rounded_point')}</td><td>SSR</td><td>M10 x 20</td><td>六角穴付止めネジ（丸先）</td></tr>
                        <tr><td>{t('standard.table.spring_pin')}</td><td>SP</td><td>8 x 20</td><td>スプリングピン</td></tr>
                        <tr><td>{t('standard.table.split_lock')}</td><td>CP</td><td>4 x 20</td><td>割りピン</td></tr>
                        <tr><td>{t('standard.table.nord_lock')}</td><td>NL</td><td>M10</td><td>ノルトロック NOBEX 製</td></tr>
                        <tr><td>{t('standard.table.rivet')}</td><td>PR</td><td>3.51 x 4.8</td><td>打ち込み鋲（パーカー鋲） 目盛用・黄銅</td></tr>
                        <tr><td>{t('standard.table.taper_pin_with_external_thread')}</td><td>TPI</td><td>8 x 20</td><td>テーパーピン（おねじ付）</td></tr>
                        <tr><td>{t('standard.table.taper_pin_with_internal_thread')}</td><td>TPE</td><td>8 x 20</td><td>テーパーピン（めねじ付）</td></tr>
                        <tr><td>{t('standard.table.straight_pin')}</td><td>PP</td><td>8 x 20</td><td>平行ピン</td></tr>
                      </tbody>
                    </table>
                  </div>
                )}

                {activeTab === 'stainless' && (
                  <div className="lesson-table-container mt-4">
                    <table className="lesson-table">
                      <thead>
                        <tr>
                          <th>{t('common.table.stainless_types')}</th>
                          <th>{t('common.table.code')}</th>
                          <th>{t('common.table.size')}</th>
                          <th>{t('common.table.japanese_name')}</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr><td>{t('standard.table.hexagon_head_bolt')}</td><td>HB-S</td><td>M10 x 20</td><td>六角ボルト（SUS）</td></tr>
                        <tr><td>{t('standard.table.hexagon_head_screw_full_length')}</td><td>HS-S</td><td>M10 x 20</td><td>六角ボルト（全ネジSUS）</td></tr>
                        <tr><td>{t('standard.table.hexagon_socket_head_cap_screw')}</td><td>CS-S</td><td>M10 x 20</td><td>六角穴付ボルト（SUS）</td></tr>
                        <tr><td>{t('standard.table.hexagon_socket_low_head_cap_screw')}</td><td>CSL-S</td><td>M10 x 20</td><td>六角穴付ボルト（低頭）</td></tr>
                        <tr><td>{t('standard.table.hexagon_socket_button_head_screw')}</td><td>BS-S</td><td>M10 x 20</td><td>六角穴付ボタンボルト（SUS）</td></tr>
                        <tr><td>{t('standard.table.hexagon_nut_1_class_1')}</td><td>HN1-S</td><td>M10</td><td>六角ナット（1種）中H6（SUS）</td></tr>
                        <tr><td>{t('standard.table.hexagon_nut_2_class_2')}</td><td>HN2-S</td><td>M10</td><td>六角ナット（2種）中H6（SUS）</td></tr>
                        <tr><td>{t('standard.table.hexagon_nut_3_class_3')}</td><td>HN3-S</td><td>M10</td><td>六角ナット（2種）中H6（SUS）</td></tr>
                        <tr><td>{t('standard.table.spring_lock_washer_2')}</td><td>SW-S</td><td>M10</td><td>ばね座金（2号SUS）</td></tr>
                        <tr><td>{t('standard.table.plain_washer_normal_series')}</td><td>FW-S</td><td>M10</td><td>平座金（並丸SUS）</td></tr>
                        <tr><td>{t('standard.table.hexagon_socket_head_set_screw_flat_point')}</td><td>SSF-S</td><td>M10 x 20</td><td>六角穴付止めネジ（平先SUS）</td></tr>
                        <tr><td>{t('standard.table.hexagon_socket_head_set_screw_truncated_cone_point')}</td><td>SSC-S</td><td>M10 x 20</td><td>六角穴付止めネジ（とがり先SUS）</td></tr>
                        <tr><td>{t('standard.table.hexagon_socket_head_set_screw_long_dog_point')}</td><td>SSD-S</td><td>M10 x 20</td><td>六角穴付止めネジ（棒先SUS）</td></tr>
                        <tr><td>{t('standard.table.hexagon_socket_head_set_screw_cup_point')}</td><td>SSH-S</td><td>M10 x 20</td><td>六角穴付止めネジ（くぼみ先SUS）</td></tr>
                        <tr><td>{t('standard.table.hexagon_socket_head_set_screw_rounded_point')}</td><td>SSR-S</td><td>M10 x 20</td><td>六角穴付止めネジ（丸先SUS）</td></tr>
                      </tbody>
                    </table>
                  </div>
                )}

                {activeTab === 'hardware' && (
                  <div className="lesson-table-container mt-4">
                    <table className="lesson-table">
                      <thead>
                        <tr>
                          <th>{t('common.table.type')}</th>
                          <th>{t('common.table.code')}</th>
                          <th>{t('common.table.size')}</th>
                          <th>{t('common.table.article_jis')}</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr><td>{t('standard.table.hexagon_head_bolt')}</td><td>HB</td><td>M10 x 20</td><td>JIS B 1180</td></tr>
                        <tr><td>{t('standard.table.hexagon_head_bolt_high_tension_10_9')}</td><td>HBH</td><td>M10 x 20</td><td>JIS B 1186</td></tr>
                        <tr><td>{t('standard.table.hexagon_socket_flat_head_bolt')}</td><td>FB</td><td>M10 x 20</td><td>Japan Socket Screw工業協同組合</td></tr>
                        <tr><td>{t('standard.table.hexagon_head_screw_full_length')}</td><td>HS</td><td>M10 x 20</td><td>JIS B 1180</td></tr>
                        <tr><td>{t('standard.table.hexagon_head_bolt_full_length_high_tension')}</td><td>HSH</td><td>M10 x 20</td><td>JIS B 1186 Added on 1999/11/29</td></tr>
                        <tr><td>{t('standard.table.hexagon_socket_head_cap_screw')}</td><td>CS</td><td>M10 x 20</td><td>JIS B 1176</td></tr>
                        <tr><td>{t('standard.table.hexagon_socket_low_head_cap_screw')}</td><td>CSL</td><td>M10 x 20</td><td>Added on 1999/11/29</td></tr>
                        <tr><td>{t('standard.table.hexagon_socket_button_head_screw')}</td><td>BS</td><td>M10 x 20</td><td>JIS B 1174</td></tr>
                        <tr><td>{t('standard.table.hexagon_nut_1_class_1')}</td><td>HN1</td><td>M10</td><td>JIS B 1181</td></tr>
                        <tr><td>{t('standard.table.hexagon_nut_2_class_2')}</td><td>HN2</td><td>M10</td><td>JIS B 1181</td></tr>
                        <tr><td>{t('standard.table.hexagon_nut_3_class_3')}</td><td>HN3</td><td>M10</td><td>JIS B 1181</td></tr>
                        <tr><td>{t('standard.table.spring_lock_washer_2')}</td><td>SW</td><td>M10</td><td>JIS B 1251</td></tr>
                        <tr><td>{t('standard.table.spring_lock_washer_for_hexagon_socket_head')}</td><td>SWS</td><td>M10</td><td>DIN7980</td></tr>
                        <tr><td>{t('standard.table.conical_spring_washer_class_1')}</td><td>CW1</td><td>M10</td><td>JIS B 1152</td></tr>
                        <tr><td>{t('standard.table.conical_spring_washer_class_2')}</td><td>CW2</td><td>M10</td><td>JIS B 1152</td></tr>
                        <tr><td>{t('standard.table.plain_washer_normal_series')}</td><td>FW</td><td>M10</td><td>JIS B 1156</td></tr>
                        <tr><td>{t('standard.table.plain_washer_small_series')}</td><td>FWS</td><td>M10</td><td>JIS B 1156</td></tr>
                        <tr><td>{t('standard.table.plain_washer_quenched')}</td><td>FWH</td><td>M10</td><td>-</td></tr>
                        <tr><td>{t('standard.table.square_taper_washer_for_u_section')}</td><td>AW5</td><td>M10</td><td>Inclination 5°</td></tr>
                        <tr><td>{t('standard.table.square_taper_washer_for_i_section')}</td><td>AW8</td><td>M10</td><td>Inclination 8°</td></tr>
                        <tr><td>{t('standard.table.cross_recessed_flat_head_screw')}</td><td>FS</td><td>M8 x 20</td><td>JIS B 1111</td></tr>
                        <tr><td>{t('standard.table.cross_recessed_flat_head_screw_brass')}</td><td>FSB</td><td>M8 x 20</td><td>JIS B 1111 Added on 1999/6/30</td></tr>
                        <tr><td>{t('standard.table.cross_recessed_pan_head_screw')}</td><td>PS</td><td>M8 x 20</td><td>JIS B 1111 Added on 1999/11/29</td></tr>
                        <tr><td>{t('standard.table.cross_recessed_pan_head_screw_unichorme_plated')}</td><td>PS-U</td><td>M8 x 20</td><td>JIS B 1111 Added on 2013/12/19</td></tr>
                        <tr><td>{t('standard.table.hexagon_socket_head_set_screw_flat_point')}</td><td>SSF</td><td>M10 x 20</td><td>JIS B 1177</td></tr>
                        <tr><td>{t('standard.table.hexagon_socket_head_set_screw_truncated_cone_point')}</td><td>SSC</td><td>M10 x 20</td><td>JIS B 1177</td></tr>
                        <tr><td>{t('standard.table.hexagon_socket_head_set_screw_long_dog_point')}</td><td>SSD</td><td>M10 x 20</td><td>JIS B 1177</td></tr>
                        <tr><td>{t('standard.table.hexagon_socket_head_set_screw_cup_point')}</td><td>SSH</td><td>M10 x 20</td><td>JIS B 1177</td></tr>
                        <tr><td>{t('standard.table.hexagon_socket_head_set_screw_rounded_point')}</td><td>SSR</td><td>M10 x 20</td><td>JIS B 1177</td></tr>
                        <tr><td>{t('standard.table.spring_pin')}</td><td>SP</td><td>8 x 20</td><td>JIS B 2808 Revised on 1999/9/3</td></tr>
                        <tr><td>{t('standard.table.split_pin')}</td><td>CP</td><td>4 x 20</td><td>JIS B 1351 Revised on 1999/9/3</td></tr>
                        <tr><td>{t('standard.table.nord_lock')}</td><td>NL</td><td>M10</td><td>NOBEX Added on 1999/6/30</td></tr>
                        <tr><td>{t('standard.table.rivet')}</td><td>PR</td><td>3.51 x 4.8</td><td>For Measure - Chalcopyrite Added on 1999/12/7</td></tr>
                        <tr><td>{t('standard.table.taper_pin_with_external_thread')}</td><td>TPI</td><td>8 x 20</td><td>JIS B 1352 Added on 2000/6/9</td></tr>
                        <tr><td>{t('standard.table.taper_pin_with_internal_thread')}</td><td>TPE</td><td>8 x 20</td><td>JIS B 1352 Added on 2000/6/9</td></tr>
                        <tr><td>{t('standard.table.straight_pin')}</td><td>PP</td><td>8 x 20</td><td>JIS B 1354 Added on 2000/6/9</td></tr>
                      </tbody>
                    </table>
                  </div>
                )}

                {activeTab === 'bolt' && (
                  <div className="lesson-table-container mt-4">
                    <table className="lesson-table highlight-table">
                      <thead>
                        <tr>
                          <th>{t('common.table.bolt_size')}</th>
                          <th>{t('common.table.class2')}</th>
                          <th>{t('common.table.class3')}</th>
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
                  <div className={`card-header ${currentIndex === 0 ? 'reading-active' : ''}`} data-reading-index="0">
                    <h4>
                      <KaraokeLessonText
                        as="span"
                        text={t('standard.boltLengthSteps.step0')}
                        isActive={isSpeaking && currentIndex === 0}
                        currentCharIndex={currentCharIndex}
                      />
                    </h4>

                  </div>

                  <div className={`instruction-step ${currentIndex === 1 ? 'reading-active' : ''}`} data-reading-index="1">
                    <div className="step-description">
                      <div className="info-box">
                        <KaraokeLessonText
                          as="div"
                          text={t('standard.boltLengthSteps.step1')}
                          isActive={isSpeaking && currentIndex === 1}
                          currentCharIndex={currentCharIndex}
                          style={{ marginBottom: '1rem' }}
                        />
                        <table style={{ border: 'none', background: 'transparent' }}>
                          <tbody>
                            <tr>
                              <td style={{ paddingRight: '20px' }}>{t('standard.misc.example')}</td>
                              <td style={{ paddingRight: '20px' }}>{t('standard.misc.bolt_size')}</td>
                              <td style={{ paddingLeft: '20px' }}>M8</td>
                            </tr>
                            <tr>
                              <td></td>
                              <td>{t('standard.misc.washer_thickness')}</td>
                              <td style={{ paddingLeft: '20px' }}>2mm</td>
                            </tr>
                            <tr>
                              <td></td>
                              <td>{t('standard.misc.material_thickness')}</td>
                              <td style={{ paddingLeft: '20px' }}>9mm</td>
                            </tr>
                          </tbody>
                        </table>
                        <br />
                        <p className="p-flush">Bolt Length = (Bolt size x 1.5) + (Σ of thickness)</p>
                        <p className="p-flush">Bolt Length = (8 x 1.5) + (2+9)</p>
                        <p className="p-flush">Bolt Length = 12 + 11</p>
                        <p className="p-flush"><strong>Bolt Length = 23mm ≈ <span style={{ textDecoration: 'underline' }}>25mm</span></strong></p>
                        <br />
                      </div>
                      <div className={`instruction-box ${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2" style={{ marginBottom: "2rem" }}>
                        <p className="p-flush"><strong className="red-text">Note: </strong> </p>
                        <KaraokeLessonText
                          as="div"
                          text={t('standard.boltLengthSteps.step2')}
                          isActive={isSpeaking && currentIndex === 2}
                          currentCharIndex={currentCharIndex}
                          style={{ paddingLeft: '40px' }}
                        />
                      </div>
                      <img src={boltLengthCalc} alt={t('common.bolt_length_visualization')} className="software-screenshot mt-4" style={{ width: "900px" }} />
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'bolting setup' && (
                <>
                  <div className={`card-header ${currentIndex === 0 ? 'reading-active' : ''}`} data-reading-index="0">
                    <h4>
                      <KaraokeLessonText
                        as="span"
                        text={t('standard.boltingSetupSteps.step0')}
                        isActive={isSpeaking && currentIndex === 0}
                        currentCharIndex={currentCharIndex}
                      />
                    </h4>

                  </div>
                  <div className={`p-flush ${currentIndex === 1 ? 'reading-active' : ''}`} data-reading-index="1">
                    <KaraokeLessonText
                      as="span"
                      text={t('standard.boltingSetupSteps.step1')}
                      isActive={isSpeaking && currentIndex === 1}
                      currentCharIndex={currentCharIndex}
                    />
                  </div>

                  <div className={`instruction-box ${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2" style={{ marginTop: "1rem", marginBottom: "2rem" }}>
                    <p className="p-flush"><strong className="red-text">Note: </strong> </p>
                    <KaraokeLessonText
                      as="div"
                      text={t('standard.boltingSetupSteps.step2')}
                      isActive={isSpeaking && currentIndex === 2}
                      currentCharIndex={currentCharIndex}
                      style={{ paddingLeft: '40px' }}
                    />
                  </div>

                  <div className={`instruction-step ${currentIndex === 3 ? 'reading-active' : ''}`} data-reading-index="3">
                    <div className="step-description">
                      <div className="mt-8">
                        <h4 style={{ marginBottom: '10px' }}>{t('standard.misc.pillow_block')}</h4>
                        <KaraokeLessonText
                          as="div"
                          text=""
                          isActive={isSpeaking && currentIndex === 3}
                          currentCharIndex={currentCharIndex}
                          style={{ marginBottom: '1rem' }}
                        />
                        <p className="p-flush" style={{ textDecoration: 'underline' }}>{t('standard.pillow.bolting_for')}</p>
                        <p className="p-flush">{t('standard.misc.hb')}</p>
                        <p className="p-flush">{t('standard.misc.sw')}</p>
                        <p className="p-flush">{t('standard.misc.fwh_slotted1')} - <strong className="red-text">{t('standard.misc.fwh_slotted2')}</strong></p>

                        <div className="flex-row-wrap mt-4" style={{ gap: '2rem', marginTop: "2rem" }}>
                          <img src={pillowBlock1} alt={t('common.pillow_block_setup_1')} className="software-screenshot mt-8" style={{ width: "900px", marginBottom: "2rem" }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={`instruction-step ${currentIndex === 4 ? 'reading-active' : ''}`} data-reading-index="4">
                    <div className="step-description">
                      <div className="mt-8">
                        <p className="p-flush" style={{ textDecoration: 'underline' }}>{t('standard.pillow.flange_type')}</p>
                        <p className="p-flush">{t('standard.misc.hb')}</p>
                        <p className="p-flush">{t('standard.misc.sw')}</p>

                        <img src={pillowBlock3} alt={t('common.flange_setup')} className="software-screenshot mt-8" style={{ width: "300px", marginTop: "2rem" }} />
                      </div>
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'SLOTTED HOLE' && (
                <>
                  <div className={`card-header ${currentIndex === 0 ? 'reading-active' : ''}`} data-reading-index="0">
                    <h4>
                      <KaraokeLessonText
                        as="span"
                        text={t('standard.slottedHoleSteps.step0')}
                        isActive={isSpeaking && currentIndex === 0}
                        currentCharIndex={currentCharIndex}
                      />
                    </h4>

                  </div>
                  <div className={`p-flush ${currentIndex === 1 ? 'reading-active' : ''}`} data-reading-index="1">
                    <KaraokeLessonText
                      as="span"
                      text={t('standard.slottedHoleSteps.step1')}
                      isActive={isSpeaking && currentIndex === 1}
                      currentCharIndex={currentCharIndex}
                    />
                  </div>
                  <div className={`instruction-step ${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
                    <div className="step-description">
                      <div className='instruction-box' style={{ marginTop: "1rem", marginBottom: "2rem" }}>
                        <p className="p-flush"><strong className="red-text">Note: </strong> </p>
                        <KaraokeLessonText
                          as="div"
                          text={t('standard.slottedHoleSteps.step2')}
                          isActive={isSpeaking && currentIndex === 2}
                          currentCharIndex={currentCharIndex}
                          style={{ paddingLeft: '1rem' }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className={`instruction-step ${currentIndex === 3 ? 'reading-active' : ''}`} data-reading-index="3">
                    <div className="step-description">
                      <div className="mt-8">
                        <KaraokeLessonText
                          as="div"
                          text=""
                          isActive={isSpeaking && currentIndex === 3}
                          currentCharIndex={currentCharIndex}
                          style={{ marginBottom: '1rem' }}
                        />
                        <p className="p-flush"> <strong>CASE 1: </strong><br />{t('standard.misc.slotted_threaded_hole')}</p>
                        <br />
                        <p className="p-flush">{t('standard.misc.hb')}</p>
                        <p className="p-flush">{t('standard.misc.sw')}</p>
                        <p className="p-flush">{t('standard.misc.fwh')}</p>

                        <div className="flex-row-wrap mt-4" style={{ gap: '2rem', marginBottom: '2rem' }}>
                          <img src={slottedThreaded} alt={t('common.slotted_threaded_case')} className="software-screenshot mt-8" style={{ width: "900px", marginTop: "2rem" }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={`instruction-step ${currentIndex === 4 ? 'reading-active' : ''}`} data-reading-index="4">
                    <div className="step-description">
                      <div className="mt-8">
                        <KaraokeLessonText
                          as="div"
                          text=""
                          isActive={isSpeaking && currentIndex === 4}
                          currentCharIndex={currentCharIndex}
                          style={{ marginBottom: '1rem' }}
                        />
                        <p className="p-flush"><strong>CASE 2: </strong><br />{t('standard.misc.slotted_drill_hole')}</p>
                        <br />
                        <p className="p-flush">{t('standard.misc.hb')}</p>
                        <p className="p-flush">{t('standard.misc.fwh_only')}</p>
                        <p className="p-flush">{t('standard.misc.sw')}</p>
                        <p className="p-flush">{t('standard.misc.hn1')}</p>

                        <div className="flex-row-wrap mt-4" style={{ gap: '2rem' }}>
                          <img src={slottedDrill} alt={t('common.slotted_drill_case')} className="software-screenshot mt-8" style={{ width: "900px", marginTop: "2rem" }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'CONNECTIONS' && (
                <>
                  <div className={`card-header ${currentIndex === 0 ? 'reading-active' : ''}`} data-reading-index="0">
                    <h4>
                      <KaraokeLessonText
                        as="span"
                        text={t('standard.connectionSteps.step0')}
                        isActive={isSpeaking && currentIndex === 0}
                        currentCharIndex={currentCharIndex}
                      />
                    </h4>

                  </div>
                  <div className={`instruction-step ${currentIndex === 1 ? 'reading-active' : ''}`} data-reading-index="1">
                    <div className="step-description">
                      <div className="mt-8">
                        <KaraokeLessonText
                          as="div"
                          text=""
                          isActive={isSpeaking && currentIndex === 1}
                          currentCharIndex={currentCharIndex}
                          style={{ marginBottom: '1rem' }}
                        />
                        <p className="p-flush"> <strong>CASE 1: </strong><br />{t('standard.misc.on_c_channel')}</p>
                        <br />
                        <p className="p-flush">{t('standard.misc.hb')}</p>
                        <p className="p-flush">{t('standard.misc.aw5')}</p>
                        <p className="p-flush">{t('standard.misc.fwh_if_slotted1')} - <strong className="red-text">{t('standard.misc.fwh_if_slotted2')}</strong></p>
                        <p className="p-flush">{t('standard.misc.sw')}</p>
                        <p className="p-flush">{t('standard.misc.hn1')}</p>

                        <div className="flex-row-wrap mt-4" style={{ gap: '2rem', marginBottom: '2rem' }}>
                          <img src={connectionCChannel} alt={t('common.c_channel_connection')} className="software-screenshot mt-8" style={{ width: "900px", marginTop: "2rem" }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={`instruction-step ${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
                    <div className="step-description">
                      <div className="mt-8">
                        <p className="p-flush"> <strong>CASE 2: </strong><br />{t('standard.misc.both_drill_hole')}</p>
                        <br />
                        <p className="p-flush">{t('standard.misc.cs')}</p>
                        <p className="p-flush">{t('standard.misc.sw')}</p>
                        <p className="p-flush">{t('standard.misc.hn1')}</p>

                        <div className="flex-row-wrap mt-4" style={{ gap: '2rem' }}>
                          <img src={connectionBothDrill} alt={t('common.dual_drill_connection')} className="software-screenshot mt-8" style={{ width: "900px", marginTop: "2rem" }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'sgp pipes' && (
                <>
                  <div className={`card-header ${currentIndex === 0 ? 'reading-active' : ''}`} data-reading-index="0">
                    <h4>
                      <KaraokeLessonText
                        as="span"
                        text={t('standard.sgpPipeSteps.step0')}
                        isActive={isSpeaking && currentIndex === 0}
                        currentCharIndex={currentCharIndex}
                      />
                    </h4>

                  </div>
                  <div className={`instruction-step ${currentIndex === 1 ? 'reading-active' : ''}`} data-reading-index="1">
                    <div className="step-description">
                      <div className="mt-8">
                        <div>
                          <p className="p-flush">a. <strong className="red-text">{t('standard.sgp.white')}</strong></p>
                          <p className="p-flush">{t('standard.sgp.apply_fluid')}</p>
                          <p className="p-flush mt-2">b. <strong className="red-text">{t('standard.sgp.black')}</strong></p>
                          <p className="p-flush">{t('standard.sgp.apply_structural')}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={`instruction-step ${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
                    <div className="step-description">
                      <div className="mt-8">
                        <p className="p-flush mt-4" style={{ marginTop: "1rem", textIndent: "2rem" }}>{t('standard.sgp.p1')}</p>
                        <p className="p-flush mt-4" style={{ marginTop: "1rem", textIndent: "2rem" }}>{t('standard.sgp.p2')}</p>

                        <div className="flex-row-wrap mt-8" style={{ gap: '2rem' }}>
                          <div className="flex-1">
                            <img src={sgpPipesRed} alt={t('common.sgp_white_pipes')} className="software-screenshot mt-8" style={{ width: "500px", marginTop: "2rem", marginBottom: "1rem" }} />
                            <p className="p-flush mt-2">{t("standard.sgp.red_pipes1")} <strong className="red-text">{t("standard.sgp.red_pipes2")}</strong>.</p>
                            <p className="p-flush">{t('standard.sgp.ex_outfitting')}</p>
                          </div>
                          <div className="flex-1">
                            <img src={sgpPipesYellow} alt={t('common.sgp_black_pipes')} className="software-screenshot mt-8" style={{ width: "300px", marginTop: "2rem", marginBottom: "1rem" }} />
                            <p className="p-flush mt-2">{t("standard.sgp.yellow_pipes1")} <strong className="red-text">{t("standard.sgp.yellow_pipes2")}</strong>.</p>
                            <p className="p-flush">{t('standard.sgp.ex_handrails')}</p>
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
            <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> {t('common.previous')}</button>
            <button className="nav-button next" onClick={handleNext}>
              {(subLessonId === 'standard-1' && activeTab === 'sprocket') ||
               (subLessonId === 'standard-4' && activeTab === 'bolt') ||
               (subLessonId === 'standard-6' && activeTab === 'sgp pipes')
                ? (nextLabel || t('common.next'))
                : t('common.next')} <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StandardLesson;
