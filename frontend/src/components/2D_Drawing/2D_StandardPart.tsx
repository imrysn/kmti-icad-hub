import { ChevronLeft,ChevronRight } from 'lucide-react';
import React,{ useEffect,useState } from "react";
import { useLessonCore } from "../../hooks/useLessonCore";
import { useTTSAutoplay } from "../../hooks/useTTSAutoplay";
import { KaraokeLessonText } from "../KaraokeLessonText";
import { useTranslation } from "../../context/LanguageContext";

import "../../styles/2D_Drawing/CourseLesson.css";

/* Importing assets for Standard Part Detail (1) */
import pcdImg from "../../assets/2D_Image_File/2D_tandard_part_detail(1)_pcd.png";
import standardPartDetailImg from "../../assets/2D_Image_File/2D_tandard_part_detail(1)_standard_parts.jpg";
import taperedThreadImg from "../../assets/2D_Image_File/2D_tandard_part_detail(1)_tapered_thread.png";

/* Importing assets for Standard Part Detail (2) */
import oilGroove1Img from "../../assets/2D_Image_File/2D_tandard_part_detail(2)_oil_groove_1.png";
import oilGroove2Img from "../../assets/2D_Image_File/2D_tandard_part_detail(2)_oil_groove_2.png";

/* Importing assets for Standard Part Detail (3) */
import shaftKeyPlate1Img from "../../assets/2D_Image_File/2D_tandard_part_detail(3)_shaft_key_plate_1.png";
import shaftKeyPlate3Img from "../../assets/2D_Image_File/2D_tandard_part_detail(3)_shaft_key_plate_3.png";

/* Importing assets for Standard Part Detail (4) */
import collarImg from "../../assets/2D_Image_File/2D_tandard_part_detail(4)_collar.png";

/* Importing assets for Standard Part Detail (5) */
import collar1Img from "../../assets/2D_Image_File/2D_tandard_part_detail(4)_collar_1.png";
import collar2Img from "../../assets/2D_Image_File/2D_tandard_part_detail(4)_collar_2.png";

/* Importing assets for Standard Part Detail (6) */
import reliefProcess2Img from "../../assets/2D_Image_File/2D_standard_part_detail(6)_relief_process_2.jpg";
import scaleImg from "../../assets/2D_Image_File/2D_standard_part_detail(6)_scale.jpg";
import reliefProcess1Img from "../../assets/2D_Image_File/2D_tandard_part_detail(6)_relief_process_1.png";

/* Importing assets for Standard Part Detail (7) */
import reliefWorkflowImg from "../../assets/2D_Image_File/2D_tandard_part_detail(7)_relief_process_3.png";
import reliefDialogImg from "../../assets/2D_Image_File/2D_tandard_part_detail(7)_relief_process_4.jpg";

interface StandardPartLessonProps {
  nextLabel?: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const StandardPartLesson: React.FC<StandardPartLessonProps> = ({
  onNextLesson,
  onPrevLesson,
  nextLabel,
}) => {
  const { t, language, translateContent } = useTranslation();
  const TABS = [
    { id: '1', label: t('2d.pcd_tapered_standard') },
    { id: '2', label: t('2d.oil_groove') },
    { id: '3', label: t('2d.shaft_and_key') },
    { id: '4', label: t('2d.standard.collar') },
    { id: '6', label: t('2d.scaling_rules') },
    { id: '7', label: t('2d.relief_process') }
  ];

  const [activeTab, setActiveTab] = useState<string>(() => {
    return localStorage.getItem('2d-standard-part-active-tab') || TABS[0].id;
  });

  const { scrollProgress, containerRef, speak, stop, isSpeaking, currentIndex, currentCharIndex, registerText } = useLessonCore(`2d-standard-part-${activeTab}`);

  useEffect(() => {
    localStorage.setItem('2d-standard-part-active-tab', activeTab);
    stop();
  }, [activeTab, stop]);

  const handleNext = (isAuto = false) => {
    stop();
    if (!isAuto) {
      sessionStorage.setItem('tts-autoplay-active', 'false');
    }

    const currentIndex = TABS.findIndex(tab => tab.id === activeTab);
    if (currentIndex < TABS.length - 1) {
      setActiveTab(TABS[currentIndex + 1].id);
    } else if (onNextLesson) {
      onNextLesson();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrev = (isAuto = false) => {
    stop();
    if (!isAuto) {
      sessionStorage.setItem('tts-autoplay-active', 'false');
    }

    const currentIndex = TABS.findIndex(tab => tab.id === activeTab);
    if (currentIndex > 0) {
      setActiveTab(TABS[currentIndex - 1].id);
    } else if (onPrevLesson) {
      onPrevLesson();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const LESSON_DATA: Record<string, { title: string; subtitle: string; steps: string[] }> = {
    '2d-standard-part-1': {
      title: t('2d.pcd_tapered_standard'),
      subtitle: t('2d.pitch_center_diameter_rc_tapered_threads'),
      steps: [
        t('2d.is_no_longer_used_for_kemco_drawing_to_a'),
        t('2d.based_on_the_drawing_we_must_apply_it_on'),
        t('2d.boxed_portion_of_the_template_is_the_onl')
      ]
    },
    '2d-standard-part-2': {
      title: t('2d.oil_groove'),
      subtitle: t('2d.lubrication_groove_detailing_and_oil_hol'),
      steps: [
        t('2d.is_a_groove_in_the_surface_of_a_machine_')
      ]
    },
    '2d-standard-part-3': {
      title: t('2d.shaft_and_key'),
      subtitle: t('2d.tolerances_and_processing_of_shaft_keywa'),
      steps: [
        t('2d.the_shape_after_cutting_must_be_free_fro'),
        t('2d.as_much_as_possible_follow_the_way_of_de')
      ]
    },
    '2d-standard-part-4': {
      title: 'COLLAR',
      subtitle: 'Detailing collar dimensions and alignment.',
      steps: [
        "Used in machine, fitted on a shaft to prevent sliding movement. Also serves as mechanical stopper and stroke limiters.",
        "Can used to hold urethane rubber and serve as stopper. To avoid over press of the material during tightening that causes the urethane to distort.",
        "As much as possible, follow the way of detailing in this reference."
      ]
    },
    '2d-standard-part-6': {
      title: 'SCALING RULES',
      subtitle: 'Selecting standard and non-standard scales.',
      steps: [
        "Follow the standard scale given by KEMCO.",
        "On parts drawing, standard scale must be always used.",
        "On assembly drawing, standard scale should be used, but non-standard scale can be used as a second option."
      ]
    },
    '2d-standard-part-7': {
      title: 'RELIEF PROCESS',
      subtitle: 'Tool clearance and shaft shoulder processing.',
      steps: [
        "Often used at the end of the shoulder portion of a shaft to provide clearance for the cutting tool and also to avoid damaging it.",
        "There are four steps to show the detail on the template. Choose the required template and click OK."
      ]
    }
  };

  const currentLesson = LESSON_DATA[`2d-standard-part-${activeTab}`] || LESSON_DATA['2d-standard-part-1'];

  const currentTabSteps = [
    currentLesson.title,
    currentLesson.subtitle,
    ...(currentLesson.steps || [])
  ].filter(Boolean);

  const tabsList = TABS.map(t => ({ id: t.id }));

  useEffect(() => {
    registerText(currentTabSteps, 0);
  }, [activeTab, language, registerText]);

  useTTSAutoplay(
    isSpeaking,
    currentIndex,
    activeTab,
    currentTabSteps.length,
    tabsList,
    handleNext,
    speak,
    currentTabSteps,
    0
  );

  return (
    <div className="course-lesson-container" ref={containerRef}>
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      <div className="lesson-tabs">
        {TABS.map(tab => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="lesson-grid single-card">
        <div className="lesson-card">
          <div className="fade-in">

            <div className="flex-col tab-content fade-in">
              {activeTab === '1' && (
                <div className="flex-col">
                  <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2" style={{ marginTop: "-2rem" }}>
                    <div className="step-header" style={{ marginLeft: "3rem" }}>
                      <span className="step-number">d</span>
                      <KaraokeLessonText
                        as="span"
                        className="step-label"
                        text={t('2d.standard.pcd')}
                        isActive={isSpeaking && currentIndex === 2}
                        currentCharIndex={currentCharIndex}
                      />
                    </div>
                    <div className="step-description" >
                      <div className="red-text mb-4">
                        <KaraokeLessonText
                          text={currentLesson.steps[0]}
                          isActive={isSpeaking && currentIndex === 2}
                          currentCharIndex={currentCharIndex}
                        />
                      </div>
                      <img src={pcdImg} alt="PCD Elimination" className="software-screenshot screenshot-wide" />
                    </div>
                  </div>

                  <div className={`instruction-step ${currentIndex === 3 ? "reading-active" : ""}`} data-reading-index="3">
                    <div className="step-header" style={{ marginLeft: "3rem" }}>
                      <span className="step-number">e</span>
                      <KaraokeLessonText
                        as="span"
                        className="step-label"
                        text={t('2d.standard.tapered_threads')}
                        isActive={isSpeaking && currentIndex === 3}
                        currentCharIndex={currentCharIndex}
                      />
                    </div>
                    <div className="step-description">
                      <KaraokeLessonText
                        className="p-flush mb-4"
                        text={currentLesson.steps[1]}
                        isActive={isSpeaking && currentIndex === 3}
                        currentCharIndex={currentCharIndex}
                      />
                      <img src={taperedThreadImg} alt="Tapered Threads" className="software-screenshot screenshot-wide" />
                    </div>
                  </div>

                  <div className={`instruction-step ${currentIndex === 4 ? "reading-active" : ""}`} data-reading-index="4">
                    <div className="step-header" style={{ marginLeft: "3rem" }}>
                      <span className="step-number">f</span>
                      <KaraokeLessonText
                        as="span"
                        className="step-label"
                        text={t('2d.standard.parts')}
                        isActive={isSpeaking && currentIndex === 4}
                        currentCharIndex={currentCharIndex}
                      />
                    </div>
                    <div className="step-description">
                      <KaraokeLessonText
                        className="p-flush mb-4"
                        text={currentLesson.steps[2]}
                        isActive={isSpeaking && currentIndex === 4}
                        currentCharIndex={currentCharIndex}
                      />
                      <img src={standardPartDetailImg} alt="Standard Parts" className="software-screenshot screenshot-wide" />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === '2' && (
                <div className="flex-col">
                  {/* General Description */}
                  <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2" style={{ marginTop: "-2rem" }}>
                    <div className="step-header">
                      <span className="step-number">a</span>
                      <KaraokeLessonText
                        as="span"
                        className="step-label"
                        text={currentLesson.title}
                        isActive={isSpeaking && currentIndex === 2}
                        currentCharIndex={currentCharIndex}
                      />
                    </div>
                    <div className="step-description">
                      <KaraokeLessonText
                        className="p-flush mb-2"
                        text={currentLesson.steps[0]}
                        isActive={isSpeaking && currentIndex === 2}
                        currentCharIndex={currentCharIndex}
                      />
                      <p className="font-semibold text-red-400 mt-2" style={{ color: 'red', fontWeight: "600", margin: "0.5rem 0" }}>
                        {t('2d.standard.oil_groove_types')}
                      </p>
                    </div>
                  </div>

                  {/* 1. For Flat Surface */}
                  <div className={`instruction-step ${currentIndex === 3 ? "reading-active" : ""}`} data-reading-index="3" style={{ marginTop: "-1rem" }}>
                    <div className="step-header" style={{ marginLeft: "3rem" }}>
                      <span className="step-number">1</span>
                      <KaraokeLessonText
                        as="span"
                        className="step-label"
                        text={t('2d.standard.flat_surface')}
                        isActive={isSpeaking && currentIndex === 3}
                        currentCharIndex={currentCharIndex}
                      />
                    </div>
                    <div className="step-description">
                      <KaraokeLessonText
                        className="p-flush mb-4"
                        text={currentLesson.steps[1]}
                        isActive={isSpeaking && currentIndex === 3}
                        currentCharIndex={currentCharIndex}
                      />

                      <div className="mb-4">
                        <img src={oilGroove1Img} alt="Oil Groove Flat Detail" className="software-screenshot screenshot-wide" style={{ marginTop: "-2rem", marginBottom: "-1rem" }} />
                      </div>

                      <div className="instruction-box mt-4 mb-4">
                        <ul className="space-y-2 text-sm" style={{ listStyleType: "none", paddingLeft: 0, margin: 0 }}>
                          <li style={{ marginBottom: "0.5rem", display: "flex", alignItems: "flex-start" }}>
                            <span style={{ marginRight: "0.5rem" }}>●</span>
                            <span>{t('2d.standard.flat_surface_detail')}</span>
                          </li>
                          <li style={{ marginBottom: "0.5rem", display: "flex", alignItems: "flex-start" }}>
                            <span style={{ marginRight: "0.5rem" }}>●</span>
                            <span>{t('2d.standard.grease_depth')}</span>
                          </li>
                          <li style={{ marginBottom: "0.5rem", display: "flex", alignItems: "flex-start" }}>
                            <span style={{ marginRight: "0.5rem" }}>●</span>
                            <span>{t('2d.standard.groove_hole_diameter')}</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* 2. For Circular Portion */}
                  <div className={`instruction-step ${currentIndex === 4 ? "reading-active" : ""}`} data-reading-index="4" style={{ marginTop: "-1rem" }}>
                    <div className="step-header" style={{ marginLeft: "3rem" }}>
                      <span className="step-number">2</span>
                      <KaraokeLessonText
                        as="span"
                        className="step-label"
                        text={t('2d.standard.circular_portion')}
                        isActive={isSpeaking && currentIndex === 4}
                        currentCharIndex={currentCharIndex}
                      />
                    </div>
                    <div className="step-description">
                      <KaraokeLessonText
                        className="p-flush mb-4"
                        text={currentLesson.steps[2]}
                        isActive={isSpeaking && currentIndex === 4}
                        currentCharIndex={currentCharIndex}
                      />

                      <div className="mb-4">
                        <img src={oilGroove2Img} alt="Oil Groove Circular Detail" className="software-screenshot screenshot-wide" style={{ marginTop: "-2rem", marginBottom: "-1rem" }} />
                      </div>

                      <div className="instruction-box mt-4 mb-4">
                        <ul className="space-y-2 text-sm" style={{ listStyleType: "none", paddingLeft: 0, margin: 0 }}>
                          <li style={{ marginBottom: "0.5rem", display: "flex", alignItems: "flex-start" }}>
                            <span style={{ marginRight: "0.5rem" }}>●</span>
                            <span>{t('2d.standard.circular_detail')}</span>
                          </li>
                          <li style={{ marginBottom: "0.5rem", display: "flex", alignItems: "flex-start" }}>
                            <span style={{ marginRight: "0.5rem" }}>●</span>
                            <span>Compared to grooving of flat surfaces, radius 2 cannot achieve on actual. But the surface should be smooth finish <strong style={{ color: 'red' }}>R (滑らかに仕上)</strong>.</span>
                          </li>
                          <li style={{ marginBottom: "0.5rem", display: "flex", alignItems: "flex-start" }}>
                            <span style={{ marginRight: "0.5rem" }}>●</span>
                            <span>{t('2d.standard.grease_depth')}</span>
                          </li>
                          <li style={{ marginBottom: "0.5rem", display: "flex", alignItems: "flex-start" }}>
                            <span style={{ marginRight: "0.5rem" }}>●</span>
                            <span>{t('2d.standard.groove_hole_diameter')}</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === '3' && (
                <div className="flex-col">
                  {/* General section */}
                  <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2" style={{ marginTop: "-2rem" }}>
                    <div className="step-header">
                      <span className="step-number">b</span>
                      <KaraokeLessonText
                        as="span"
                        className="step-label"
                        text={t('2d.standard.shaft_key_plate')}
                        isActive={isSpeaking && currentIndex === 2}
                        currentCharIndex={currentCharIndex}
                      />
                    </div>

                    <div className="step-description">
                      <p className="font-semibold mb-4" style={{ color: 'red', fontWeight: "600" }}>
                        {t('2d.standard.shaft_key_dimensions')}
                      </p>

                      <div className="mb-4">
                        <img src={shaftKeyPlate1Img} alt="Shaft Key Plates Diagram" className="software-screenshot screenshot-wide mb-4" />
                      </div>

                      <div className="instruction-box mt-4 mb-4">
                        <p style={{ color: "red", fontWeight: "bold", marginBottom: "0.5rem" }}>{t('2d.note')}</p>
                        <ul className="space-y-2 text-sm" style={{ listStyleType: "none", paddingLeft: 0, margin: 0 }}>
                          <li style={{ marginBottom: "0.5rem", display: "flex", alignItems: "flex-start" }}>
                            <span style={{ marginRight: "0.5rem" }}>●</span>
                            <span>{t('2d.standard.no_burrs')}</span>
                          </li>
                          <li style={{ marginBottom: "0.5rem", display: "flex", alignItems: "flex-start" }}>
                            <span style={{ marginRight: "0.5rem" }}>●</span>
                            <span>{t('2d.standard.flat_bar')}</span>
                          </li>
                          <li style={{ marginBottom: "0.5rem", display: "flex", alignItems: "flex-start" }}>
                            <span style={{ marginRight: "0.5rem" }}>●</span>
                            <span>{t('2d.standard.keyway_tolerance')} <span style={{ fontSize: "1.2em", fontWeight: "bold" }}>f <span style={{ display: "inline-block", verticalAlign: "middle", fontSize: "0.6em", lineHeight: "1.2", marginLeft: "0.1rem" }}><div style={{ textAlign: "left" }}>+0.3</div><div style={{ textAlign: "left" }}>+0.2</div></span></span></span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Sample Drawing */}
                  <div className={`instruction-step ${currentIndex === 3 ? "reading-active" : ""}`} data-reading-index="3" style={{ marginTop: "1rem" }}>
                    <div className="step-description">
                      <p className="font-semibold mb-4" style={{ color: 'red', fontWeight: "600", marginTop: "-1rem" }}>
                        ※ Sample Drawing
                      </p>

                      <div className="mb-4">
                        <img src={shaftKeyPlate3Img} alt="Key Plate Sample Drawing" className="software-screenshot screenshot-wide" style={{ marginTop: "-3rem", marginBottom: "-1rem" }} />
                      </div>

                      <div className="instruction-box mt-4 mb-4">
                        <ul className="space-y-2 text-sm" style={{ listStyleType: "none", paddingLeft: 0, margin: 0 }}>
                          <li style={{ display: "flex", alignItems: "flex-start" }}>
                            <span style={{ marginRight: "0.5rem" }}>●</span>
                            <span>{t('2d.standard.keyway_reference')}</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                </div>
              )}

              {activeTab === '4' && (
                <div className="flex-col">
                  <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2" style={{ marginTop: "-2rem" }}>
                    <div className="step-header">
                      <span className="step-number">1</span>
                      <KaraokeLessonText
                        as="span"
                        className="step-label"
                        text={t('2d.standard.collar')}
                        isActive={isSpeaking && currentIndex === 2}
                        currentCharIndex={currentCharIndex}
                      />
                    </div>
                    <div className="step-description">
                      <KaraokeLessonText
                        className="p-flush mb-4"
                        text={currentLesson.steps[0]}
                        isActive={isSpeaking && currentIndex === 2}
                        currentCharIndex={currentCharIndex}
                      />
                      <p className="font-semibold mb-4" style={{ color: 'red', fontWeight: "600", marginTop: "-1rem", marginBottom: "2rem" }}>
                        ※ Tolerance for Collar
                      </p>

                      <img src={collarImg} alt="Collar Standard" className="software-screenshot screenshot-wide" />
                    </div>
                  </div>

                  {/* OST-2 Example 3 */}
                  <div className={`instruction-step ${currentIndex === 3 ? "reading-active" : ""}`} data-reading-index="3" style={{ marginTop: "2rem" }}>
                    <div className="step-description">
                      <p className="font-semibold mb-4" style={{ color: 'red', fontWeight: "600", fontStyle: "italic", marginTop: "-2rem", fontSize: "1.3rem", marginLeft: "1.5rem" }}>
                        {t('2d.standard.example_3')}
                      </p>

                      <div className="mb-4">
                        <img src={collar1Img} alt="OST-2 Overview" className="software-screenshot screenshot-wide" style={{ marginLeft: "1rem", marginTop: "-2rem" }} />
                      </div>

                      <div className="instruction-box mt-4 mb-4">
                        <ul className="space-y-2 text-sm" style={{ listStyleType: "none", paddingLeft: 0, margin: 0 }}>
                          <li style={{ marginBottom: "0.5rem", display: "flex", alignItems: "flex-start" }}>
                            <span style={{ marginRight: "0.5rem" }}>●</span>
                            <span>{t('2d.standard.collar_urethane')}</span>
                          </li>
                          <li style={{ display: "flex", alignItems: "flex-start" }}>
                            <span style={{ marginRight: "0.5rem" }}>●</span>
                            <span>{t('2d.standard.collar_tightening')}</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Sample Drawing */}
                  <div className={`instruction-step ${currentIndex === 4 ? "reading-active" : ""}`} data-reading-index="4" style={{ marginTop: "1rem" }}>
                    <div className="step-description">
                      <p className="font-semibold mb-4" style={{ color: 'red', fontWeight: "600", marginTop: "-1rem" }}>
                        ※ Sample Drawing
                      </p>

                      <div className="mb-4">
                        <img src={collar2Img} alt="OST-2 Details" className="software-screenshot screenshot-wide mb-4" />
                      </div>

                      <div className="instruction-box mt-4 mb-4">
                        <ul className="space-y-2 text-sm" style={{ listStyleType: "none", paddingLeft: 0, margin: 0 }}>
                          <li style={{ display: "flex", alignItems: "flex-start" }}>
                            <span style={{ marginRight: "0.5rem" }}>●</span>
                            <span>{t('2d.standard.follow_reference')}</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === '6' && (
                <div className="flex-col">
                  <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2" style={{ marginTop: "-2rem" }}>
                    <div className="step-header">
                      <span className="step-number">g</span>
                      <KaraokeLessonText
                        as="span"
                        className="step-label"
                        text={t('2d.orthographic.scale')}
                        isActive={isSpeaking && currentIndex === 2}
                        currentCharIndex={currentCharIndex}
                      />
                    </div>
                    <div className="step-description">
                      <div className="mb-4">
                        <img src={scaleImg} alt="Standard Scales" className="software-screenshot screenshot-wide" />
                      </div>

                      <div className="instruction-box mt-4 mb-4">
                        <ul className="space-y-2 text-sm" style={{ listStyleType: "none", paddingLeft: 0, margin: 0 }}>
                          <li style={{ marginBottom: "0.5rem", display: "flex", alignItems: "flex-start" }}>
                            <span style={{ marginRight: "0.5rem" }}>●</span>
                            <span>{t('2d.standard.follow_scale')}</span>
                          </li>
                          <li style={{ marginBottom: "0.5rem", display: "flex", alignItems: "flex-start" }}>
                            <span style={{ marginRight: "0.5rem" }}>●</span>
                            <span>{t('2d.on_parts_drawing_standard_scale_must_be_')}</span>
                          </li>
                          <li style={{ display: "flex", alignItems: "flex-start" }}>
                            <span style={{ marginRight: "0.5rem" }}>●</span>
                            <span>{t('2d.on_assembly_drawing_standard_scale_shoul')}</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === '7' && (
                <div className="flex-col">
                  <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2" style={{ marginTop: "-2rem" }}>
                    <div className="step-header">
                      <span className="step-number">h</span>
                      <KaraokeLessonText
                        as="span"
                        className="step-label"
                        text={t('2d.relief_process')}
                        isActive={isSpeaking && currentIndex === 2}
                        currentCharIndex={currentCharIndex}
                      />
                    </div>
                    <div className="step-description">
                      <KaraokeLessonText
                        className="p-flush mb-4"
                        text={currentLesson.steps[0]}
                        isActive={isSpeaking && currentIndex === 2}
                        currentCharIndex={currentCharIndex}
                      />

                      <p className="font-semibold mb-4" style={{ color: 'red', marginTop: "1rem" }}>
                        {t('2d.standard.in_2d')}
                      </p>

                      <div className="mb-4">
                        <img src={reliefProcess1Img} alt="Relief Process 2D" className="software-screenshot screenshot-wide mb-4" />
                      </div>

                      <div className="instruction-box mt-4 mb-4" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <ul className="space-y-2 text-sm" style={{ listStyleType: "none", paddingLeft: 0, margin: 0, flex: 1 }}>
                          <li style={{ marginBottom: "0.5rem", display: "flex", alignItems: "flex-start" }}>
                            <span style={{ marginRight: "0.5rem" }}>●</span>
                            <span>{t('2d.standard.relief_shaft')}</span>
                          </li>
                          <li style={{ display: "flex", alignItems: "flex-start" }}>
                            <span style={{ marginRight: "0.5rem" }}>●</span>
                            <span>{t('2d.standard.relief_2d')}</span>
                          </li>
                        </ul>
                        <img
                          src={reliefProcess2Img}
                          alt="Relief Process Detailing"
                          style={{ width: "55px", flexShrink: 0, marginTop: "-1rem", marginRight: "-1.5rem", border: "1px solid var(--border-color)", borderRadius: "4px" }}
                        />
                      </div>

                      <div className="instruction-box mt-4 mb-4">
                        <p style={{ color: "red", fontWeight: "bold", marginBottom: "0.5rem" }}>{t('2d.note')}</p>
                        <ul className="space-y-2 text-sm" style={{ listStyleType: "none", paddingLeft: 0, margin: 0 }}>
                          <li style={{ marginBottom: "0.5rem", display: "flex", alignItems: "flex-start" }}>
                            <span style={{ marginRight: "0.5rem" }}>●</span>
                            <span>{t('2d.standard.relief_corners')}</span>
                          </li>
                          <li style={{ display: "flex", alignItems: "flex-start" }}>
                            <span style={{ marginRight: "0.5rem" }}>●</span>
                            <span>{t('2d.standard.relief_oil')}</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Relief Workflow Steps */}
                  <div className={`instruction-step ${currentIndex === 3 ? "reading-active" : ""}`} data-reading-index="3" style={{ marginTop: "-1rem" }}>
                    <div className="step-description">
                      <p className="mb-4" style={{ color: 'red' }}>
                        ※ There are four (4) steps to show the detail on the template
                      </p>

                      <div className="mb-4">
                        <img src={reliefWorkflowImg} alt="Relief Workflow Steps" className="software-screenshot screenshot-medium" />
                      </div>

                      <div className="mb-4 mt-4">
                        <p className="mb-2">Choose required template (Relief process detail)</p>
                        <ul className="space-y-2 text-sm" style={{ listStyleType: "none", paddingLeft: 0, margin: 0 }}>
                          <li style={{ display: "flex", alignItems: "flex-start" }}>
                            <span style={{ marginRight: "0.5rem" }}>●</span>
                            <span>Click <strong style={{ fontWeight: "bold" }}>OK</strong></span>
                          </li>
                        </ul>
                      </div>

                      <div className="mb-4">
                        <img src={reliefDialogImg} alt="Relief Placement" className="software-screenshot screenshot-wide" />
                      </div>

                      <p className="mt-4">
                        <span style={{ color: 'red' }}>※</span> Designated location of relief process detail is on the global view of the drawing.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="lesson-navigation">
            <button className="nav-button" onClick={() => handlePrev()}>
              <ChevronLeft size={18} /> {t('2d.previous')}
            </button>
            <button className="nav-button next" onClick={() => handleNext()}>
              {nextLabel ? translateContent(nextLabel) : t('2d.next')} <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StandardPartLesson;
