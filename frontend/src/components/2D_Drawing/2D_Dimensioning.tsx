import { ChevronLeft,ChevronRight } from 'lucide-react';
import React,{ useEffect,useState } from "react";
import { useLessonCore } from "../../hooks/useLessonCore";
import { useTTSAutoplay } from "../../hooks/useTTSAutoplay";
import { KaraokeLessonText } from "../KaraokeLessonText";
import { useTranslation } from "../../context/LanguageContext";

import "../../styles/2D_Drawing/CourseLesson.css";

/* Importing assets for Dimensioning (1) */
import standardDimMenuImg from "../../assets/2D_Image_File/2D_dimensioning(1)_a.1_standard_dimension.png";
import seriesDimMenuImg from "../../assets/2D_Image_File/2D_dimensioning(1)_a.2_series_dimension.png";
import diimensioningImg from "../../assets/2D_Image_File/2D_dimensioning(1)_diimensioning.png";

/* Importing assets for Dimensioning (2) */
import editDimDrawingImg from "../../assets/2D_Image_File/2D_dimensioning_b.1_edit_dimension_charac.png";
import chamferRadiusImg from "../../assets/2D_Image_File/2D_dimensioning_chamfer_radius.png";
import toleranceImg from "../../assets/2D_Image_File/2D_dimensioning_tolerance.png";

/* Importing assets for Dimensioning (3) */
import partNoteMenuImg from "../../assets/2D_Image_File/2D_dimensioning(3)_part_note.png";
import polishedMaterialImg from "../../assets/2D_Image_File/2D_dimensioning_b.2_polished_material.png";

/* Importing assets for Dimensioning (4) */
import changePosition1Img from "../../assets/2D_Image_File/2D_dimensioning(4)_b.4_change_position_1 (1).png";

/* Importing assets for Dimensioning (5) */
import breakViewWorkflowImg from "../../assets/2D_Image_File/2D_dimensioning(5)_c_dimensions_for_breakviews_1.png";

interface DimensioningLessonProps {
  nextLabel?: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const DimensioningLesson: React.FC<DimensioningLessonProps> = ({
  onNextLesson,
  onPrevLesson,
  nextLabel
}) => {
  const { t, language, translateContent } = useTranslation();
  const TABS = [
    { id: '1', label: t('2d.dimensioning.adding') },
    { id: '2', label: t('2d.dimensioning.editing') },
    { id: '3', label: t('2d.part_note') },
    { id: '4', label: t('2d.change_position') },
    { id: '5', label: t('2d.dimensioning.breakviews') }
  ];

  const [activeTab, setActiveTab] = useState<string>(() => {
    return localStorage.getItem('2d-dimensioning-active-tab') || TABS[0].id;
  });

  const { scrollProgress, containerRef, speak, stop, isSpeaking, currentIndex, currentCharIndex, registerText } = useLessonCore(`2d-dimensioning-${activeTab}`);

  useEffect(() => {
    localStorage.setItem('2d-dimensioning-active-tab', activeTab);
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
    '2d-dimensioning-1': {
      title: t('2d.dimensioning.title'),
      subtitle: t('2d.applying_technical_dimensions_and_tolera'),
      steps: [
        t('2d.put_all_the_dimensions_symbols_and_notes'),
        t('2d.this_is_the_basic_command_for_adding_dim'),
        t('2d.use_this_for_continuous_linear_dimension')
      ]
    },
    '2d-dimensioning-2': {
      title: t('2d.dimensioning.title'),
      subtitle: t('2d.applying_technical_dimensions_and_tolera'),
      steps: [
        t('2d.to_add_symbols_like_the_diameter_mark_se'),
        t('2d.if_fitting_tolerance_is_required_use_the'),
        t('2d.these_marks_are_generated_automatically_'),
        t('2d.grinded_materials_like_s45c_d_and_ss400_')
      ]
    },
    '2d-dimensioning-3': {
      title: t('2d.part_note'),
      subtitle: t('2d.guidelines_for_adding_technical_notes_an'),
      steps: [
        t('2d.use_this_tool_for_automatic_hole_detaili')
      ]
    },
    '2d-dimensioning-4': {
      title: t('2d.change_position'),
      subtitle: t('2d.adjusting_dimension_placement_for_clarit'),
      steps: [
        t('2d.ensure_dimensions_have_enough_space_betw')
      ]
    },
    '2d-dimensioning-5': {
      title: t('2d.dimension_for_breakviews'),
      subtitle: t('2d.technical_guide_for_dimensioning_compone'),
      steps: [
        t('2d.there_are_parts_that_are_too_long_for_th')
      ]
    }
  };

  const currentLesson = LESSON_DATA[`2d-dimensioning-${activeTab}`] || LESSON_DATA['2d-dimensioning-1'];
  const polishedMaterialHeaders = language === 'ja'
    ? ['コード', '詳細', '公差等級 JIC B 0401', '表面粗さの範囲']
    : ['Code', 'Details', 'Tolerance Level JIC B 0401', 'Surface Roughness Range'];
  const polishedMaterialRows = language === 'ja'
    ? [
        ['S45C-D', '研削された S45C 材です。これらの直径寸法は、図面に基づく加工で保証されます。', 'h9', '3.2a 超／12.5S 超'],
        ['S45C-CG', '研削された S45C 材です。これらの直径寸法は、センタレス研削盤による加工で保証されます。', 'h7', '3.2a 超／12.5S 超'],
        ['SS400-D', '研削された SS400 材です。これらの直径寸法は、図面に基づく加工で保証されます。', 'h9', '3.2a 超／12.5S 超']
      ]
    : [
        ['S45C-D', 'S45C materials which are grinded. These diameter dimensions are assured by processing of drawing', 'h9', 'over 3.2a / over 12.5S'],
        ['S45C-CG', 'S45C materials which are grinded. These diameter dimensions are assured by processing of centerless grinding machine', 'h7', 'over 3.2a / over 12.5S'],
        ['SS400-D', 'SS400 materials which are grinded. These diameter dimensions are assured by processing of drawing', 'h9', 'over 3.2a / over 12.5S']
      ];

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
        <div className="lesson-card main-dimensioning-card">
          <div className="fade-in">
            <div className="flex-col tab-content fade-in">
              {activeTab === '1' && (
                <div className="flex-col">
                  <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2" style={{ marginTop: "-2rem" }}>
                    <div className="step-header">
                      <span className="step-number">8</span>
                      <KaraokeLessonText
                        as="span"
                        className="step-label"
                        text={t('2d.dimensioning.title')}
                        isActive={isSpeaking && currentIndex === 2}
                        currentCharIndex={currentCharIndex}
                      />
                    </div>
                    <div className="step-description">
                      <KaraokeLessonText
                        className="p-flush"
                        text={currentLesson.steps[0]}
                        isActive={isSpeaking && currentIndex === 2}
                        currentCharIndex={currentCharIndex}
                      />
                      <img src={diimensioningImg} alt="Dimensioning Overview" className="software-screenshot screenshot-wide mt-4" />
                    </div>
                  </div>

                  <div className={`instruction-step ${currentIndex === 3 ? "reading-active" : ""}`} data-reading-index="3">
                    <div className="step-header">
                      <span className="step-number">a</span>
                      <KaraokeLessonText
                        as="span"
                        className="step-label"
                        text={t('2d.dimensioning.adding')}
                        isActive={isSpeaking && currentIndex === 3}
                        currentCharIndex={currentCharIndex}
                      />
                    </div>

                    <div className="step-header" style={{ marginLeft: "3rem" }}>
                      <span className="step-number">a.1</span>
                      <KaraokeLessonText
                        as="span"
                        className="step-label"
                        text={t('2d.dimensioning.standard')}
                        isActive={isSpeaking && currentIndex === 3}
                        currentCharIndex={currentCharIndex}
                      />
                    </div>

                    <div className="step-description">
                      <KaraokeLessonText
                        className="p-flush"
                        text={currentLesson.steps[1]}
                        isActive={isSpeaking && currentIndex === 3}
                        currentCharIndex={currentCharIndex}
                      />
                      <img src={standardDimMenuImg} alt="Standard Dimension Menu" className="software-screenshot screenshot-wide" style={{ marginTop: "-1rem", marginBottom: "-1rem" }} />
                    </div>
                  </div>

                  <div className={`instruction-step ${currentIndex === 4 ? "reading-active" : ""}`} data-reading-index="4">
                    <div className="step-header" style={{ marginLeft: "3rem" }}>
                      <span className="step-number">a.2</span>
                      <KaraokeLessonText
                        as="span"
                        className="step-label"
                        text={t('2d.dimensioning.series')}
                        isActive={isSpeaking && currentIndex === 4}
                        currentCharIndex={currentCharIndex}
                      />
                    </div>
                    <div className="step-description">
                      <KaraokeLessonText
                        className="p-flush"
                        text={currentLesson.steps[2]}
                        isActive={isSpeaking && currentIndex === 4}
                        currentCharIndex={currentCharIndex}
                      />
                      <img src={seriesDimMenuImg} alt="Series Dimension Menu" className="software-screenshot screenshot-wide" style={{ marginTop: "-1rem" }} />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === '2' && (
                <div className="flex-col">
                  <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2" style={{ marginTop: "-2rem" }}>
                    <div className="step-header">
                      <span className="step-number">b</span>
                      <KaraokeLessonText
                        as="span"
                        className="step-label"
                        text={t('2d.dimensioning.editing')}
                        isActive={isSpeaking && currentIndex === 2}
                        currentCharIndex={currentCharIndex}
                      />
                    </div>
                    <div className="step-header" style={{ marginLeft: "3rem" }}>
                      <span className="step-number">b.1</span>
                      <KaraokeLessonText
                        as="span"
                        className="step-label"
                        text={t('2d.dimensioning.edit_characters')}
                        isActive={isSpeaking && currentIndex === 2}
                        currentCharIndex={currentCharIndex}
                      />
                    </div>
                    <div className="step-description">
                      <KaraokeLessonText
                        className="p-flush"
                        text={currentLesson.steps[0]}
                        isActive={isSpeaking && currentIndex === 2}
                        currentCharIndex={currentCharIndex}
                      />
                      <img src={editDimDrawingImg} alt="Edit Dimension Guide" className="software-screenshot screenshot-wide" style={{ marginTop: "-1rem", marginBottom: "-1rem" }} />
                    </div>
                  </div>

                  <div className={`instruction-step ${currentIndex === 3 ? "reading-active" : ""}`} data-reading-index="3">
                    <div>
                      <KaraokeLessonText
                        as="span"
                        className="step-label"
                        text={t('2d.dimensioning.tolerance')}
                        isActive={isSpeaking && currentIndex === 3}
                        currentCharIndex={currentCharIndex}
                      />
                    </div>
                    <div className="step-description">
                      <KaraokeLessonText
                        className="p-flush"
                        text={currentLesson.steps[1]}
                        isActive={isSpeaking && currentIndex === 3}
                        currentCharIndex={currentCharIndex}
                      />
                      <img src={toleranceImg} alt="Tolerance Guide" className="software-screenshot screenshot-wide" style={{ marginBottom: "-1rem" }} />
                    </div>
                  </div>

                  <div className={`instruction-step ${currentIndex === 4 ? "reading-active" : ""}`} data-reading-index="4">
                    <div>
                      <KaraokeLessonText
                        as="span"
                        className="step-label"
                        text={t('2d.dimensioning.chamfer_radius')}
                        isActive={isSpeaking && currentIndex === 4}
                        currentCharIndex={currentCharIndex}
                      />
                    </div>
                    <div className="step-description">
                      <KaraokeLessonText
                        className="p-flush"
                        text={currentLesson.steps[2]}
                        isActive={isSpeaking && currentIndex === 4}
                        currentCharIndex={currentCharIndex}
                      />
                      <img src={chamferRadiusImg} alt="Chamfer and Radius Marks" className="software-screenshot screenshot-wide mt-4" />
                    </div>
                  </div>

                  <div className={`instruction-step ${currentIndex === 5 ? "reading-active" : ""}`} data-reading-index="5">
                    <div className="step-header">
                      <span className="step-number">b.2</span>
                      <KaraokeLessonText
                        as="span"
                        className="step-label"
                        text={t('2d.dimensioning.polished_material')}
                        isActive={isSpeaking && currentIndex === 5}
                        currentCharIndex={currentCharIndex}
                      />
                    </div>
                    <div className="step-description">
                      <KaraokeLessonText
                        className="p-flush"
                        text={currentLesson.steps[3]}
                        isActive={isSpeaking && currentIndex === 5}
                        currentCharIndex={currentCharIndex}
                      />
                      <img src={polishedMaterialImg} alt="Polished Material Dialog" className="software-screenshot screenshot-wide mt-4" />

                      <div className="lesson-table-container mt-4">
                        <table className="lesson-table">
                          <thead>
                            <tr>
                              {polishedMaterialHeaders.map(header => <th key={header}>{header}</th>)}
                            </tr>
                          </thead>
                          <tbody>
                            {polishedMaterialRows.map(row => (
                              <tr key={row[0]}>{row.map((cell, index) => <td key={`${row[0]}-${index}`}>{cell}</td>)}</tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                    </div>
                  </div>
                </div>
              )}

              {activeTab === '3' && (
                <div className="flex-col">
                  <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2" style={{ marginTop: "-2rem" }}>
                    <div className="step-header">
                      <span className="step-number">11</span>
                      <KaraokeLessonText
                        as="span"
                        className="step-label"
                        text={t('2d.part_note')}
                        isActive={isSpeaking && currentIndex === 2}
                        currentCharIndex={currentCharIndex}
                      />
                    </div>
                    <div className="step-description">
                      <KaraokeLessonText
                        className="p-flush"
                        text={currentLesson.steps[0]}
                        isActive={isSpeaking && currentIndex === 2}
                        currentCharIndex={currentCharIndex}
                      />
                      <img src={partNoteMenuImg} alt="Part Note Menu" className="software-screenshot screenshot-wide mt-4" />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === '4' && (
                <div className="flex-col">
                  <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2" style={{ marginTop: "-2rem" }}>
                    <div className="step-header" style={{ marginLeft: "3rem" }}>
                      <span className="step-number">b.4</span>
                      <KaraokeLessonText
                        as="span"
                        className="step-label"
                        text={t('2d.change_position')}
                        isActive={isSpeaking && currentIndex === 2}
                        currentCharIndex={currentCharIndex}
                      />
                    </div>
                    <div className="step-description">
                      <KaraokeLessonText
                        className="p-flush"
                        text={currentLesson.steps[0]}
                        isActive={isSpeaking && currentIndex === 2}
                        currentCharIndex={currentCharIndex}
                      />
                      <img src={changePosition1Img} alt="Change Position Overview" className="software-screenshot screenshot-wide mt-4" />
                      <div className="instruction-box mt-4">
                        <KaraokeLessonText
                          as="p"
                          text={t('2d.dimensioning.alignment_note')}
                          isActive={isSpeaking && currentIndex === 2}
                          currentCharIndex={currentCharIndex}
                          style={{ margin: 0, lineHeight: 1.5 }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === '5' && (
                <div className="flex-col">
                  <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2" style={{ marginTop: "-2rem" }}>
                    <div className="step-header" style={{ marginLeft: "3rem" }}>
                      <span className="step-number">c</span>
                      <KaraokeLessonText
                        as="span"
                        className="step-label"
                        text={t('2d.dimension_for_breakviews')}
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
                      <img src={breakViewWorkflowImg} alt="Dimension for Breakviews Guide" className="software-screenshot screenshot-wide mt-4" />
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

export default DimensioningLesson;
