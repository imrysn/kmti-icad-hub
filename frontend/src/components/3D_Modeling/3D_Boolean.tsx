import { ChevronLeft,ChevronRight } from 'lucide-react';
import React,{ useEffect,useState } from "react";
import { useTranslation } from '../../context/LanguageContext';
import { useLessonCore } from "../../hooks/useLessonCore";
import { useTTSAutoplay } from "../../hooks/useTTSAutoplay";
import './CourseLesson.css';
import { KaraokeLessonText } from "../KaraokeLessonText";

/* Boolean (1) Assets */
import booleanOpMenu from "../../assets/3d-images/boolean1_boolean_operation.png";
import booleanSubtract from "../../assets/3d-images/boolean1_boolean_subtract.png";
import select3D from "../../assets/3d-images/boolean1_select3d.png";
import subtractIcon from "../../assets/3d-images/boolean1_subtract.png";
import subtractAfter from "../../assets/3d-images/boolean1_subtract_after_subtraction.png";
import subtractEntity from "../../assets/3d-images/boolean1_subtract_entity.png";
import subtractRetain from "../../assets/3d-images/boolean1_subtract_retain_entities.png";
import unionIcon from "../../assets/3d-images/boolean1_union.png";
import leftClick from "../../assets/3d-images/left_click.png";

/* Boolean (2) Assets */
import componentIcon from "../../assets/3d-images/boolean2_component.png";
import componentOk from "../../assets/3d-images/boolean2_component_select_ok.png";
import componentSeparate from "../../assets/3d-images/boolean2_component_separate_all_components.png";
import componentSeparated from "../../assets/3d-images/boolean2_component_separated.png";
import intersectIcon from "../../assets/3d-images/boolean2_intersect.png";
import intersectingEntities from "../../assets/3d-images/boolean2_intersecting_entities.png";
import selectEntity from "../../assets/3d-images/boolean2_select_entity.png";
import selectOk from "../../assets/3d-images/boolean2_select_ok.png";

interface BooleanLessonProps {
  nextLabel?: string;
  subLessonId: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const BooleanLesson: React.FC<BooleanLessonProps> = ({ subLessonId, onNextLesson, onPrevLesson, nextLabel }) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<"union" | "subtract" | "intersect" | "separate">(() => {
    return (localStorage.getItem(`${subLessonId}-tab`) as any) || 'union';
  });

  useEffect(() => {
    localStorage.setItem(`${subLessonId}-tab`, activeTab);
  }, [subLessonId, activeTab]);

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

  const unionSteps = [
    t('boolean.union.title'),
    t('boolean.union.desc'),
    t('boolean.union.step1'),
    t('boolean.union.step2'),
  ];

  const subtractSteps = [
    t('boolean.subtract.title'),
    t('boolean.subtract.desc'),
    t('boolean.subtract.step1'),
    t('boolean.subtract.step2'),
    t('boolean.subtract.step3'),
    t('boolean.subtract.note'),
  ];

  const intersectSteps = [
    t('boolean.intersect.title'),
    t('boolean.intersect.desc'),
    t('boolean.intersect.step1'),
    t('boolean.intersect.step2'),
    t('boolean.intersect.note'),
  ];

  const separateSteps = [
    t('boolean.separate.title'),
    t('boolean.separate.desc'),
    t('boolean.separate.note'),
    t('boolean.separate.step1'),
    t('boolean.separate.step2'),
    t('boolean.separate.desc2'),
    t('boolean.separate.step3'),
    t('boolean.separate.step4')
  ];

  const tabs = [
    { id: "union", label: t("boolean.tab.union") },
    { id: "subtract", label: t("boolean.tab.subtract") },
    { id: "intersect", label: t("boolean.tab.intersect") },
    { id: "separate", label: t("boolean.tab.separate") },
  ];

  const handleNext = (isAuto = false) => {
    stop();
    if (!isAuto) {
      sessionStorage.setItem('tts-autoplay-active', 'false');
    }
    if (activeTab === "union") setActiveTab("subtract");
    else if (activeTab === "subtract") setActiveTab("intersect");
    else if (activeTab === "intersect") setActiveTab("separate");
    else if (onNextLesson) onNextLesson();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrev = (isAuto = false) => {
    stop();
    if (!isAuto) {
      sessionStorage.setItem('tts-autoplay-active', 'false');
    }
    if (activeTab === "separate") setActiveTab("intersect");
    else if (activeTab === "intersect") setActiveTab("subtract");
    else if (activeTab === "subtract") setActiveTab("union");
    else if (onPrevLesson) onPrevLesson();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const introTitle = t("boolean.introTitle");
  const introSubtitle = t("boolean.introSubtitle");


  useEffect(() => {
    const steps = activeTab === 'union' ? unionSteps :
                  activeTab === 'subtract' ? subtractSteps :
                  activeTab === 'intersect' ? intersectSteps : separateSteps;
    registerText(steps, 0);
  }, [activeTab, registerText]);

  const currentTabSteps = activeTab === 'union' ? unionSteps :
                          activeTab === 'subtract' ? subtractSteps :
                          activeTab === 'intersect' ? intersectSteps : separateSteps;
  const tabsList = [{ id: 'union' }, { id: 'subtract' }, { id: 'intersect' }, { id: 'separate' }];

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
    <div className={`course-lesson-container`} ref={containerRef}>
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      <div className="lesson-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => { stop(); sessionStorage.setItem('tts-autoplay-active', 'false'); setActiveTab(tab.id as any); }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <section className="lesson-intro">
        <h3 className={`section-title ${currentIndex === 0 ? "reading-active" : ""}`} data-reading-index="0">
          <KaraokeLessonText
            as="span"
            text={introTitle}
            isActive={isSpeaking && currentIndex === 0}
            currentCharIndex={currentCharIndex}
          />

        </h3>
        <KaraokeLessonText
          className={`lesson-subtitle ${currentIndex === 1 ? "reading-active" : ""}`}
          data-reading-index="1"
          text={introSubtitle}
          isActive={isSpeaking && currentIndex === 1}
          currentCharIndex={currentCharIndex}
        />
        <img src={booleanOpMenu} alt={t('common.boolean_operation_menu')} className="software-screenshot" style={{ height: 'auto', width: "200px" }} />
      </section>

      <div className="lesson-grid single-card">
        <div className="fade-in">
          {activeTab === "union" && (
            <div className="lesson-card tab-content">
              <div className="card-header">
                <h4 className={`${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2">
                  <KaraokeLessonText
                    as="span"
                    text={t('boolean.union.title')}
                    isActive={isSpeaking && currentIndex === 2}
                    currentCharIndex={currentCharIndex}
                  />
                </h4>
              </div>
              <KaraokeLessonText
                as="p"
                className={`p-flush ${currentIndex === 3 ? "reading-active" : ""}`}
                style={{ marginTop: "-2rem" }}
                data-reading-index="3"
                text={t('boolean.union.desc')}
                isActive={isSpeaking && currentIndex === 3}
                currentCharIndex={currentCharIndex}
              />

              <div className={`instruction-step ${currentIndex === 4 ? "reading-active" : ""}`} data-reading-index="4">
                <div className="step-header">
                  <span className="step-number">1 </span>
                  <span className="step-label">
                    <KaraokeLessonText
                      as="span"
                      text={t('boolean.union.step1')}
                      isActive={isSpeaking && currentIndex === 4}
                      currentCharIndex={currentCharIndex}
                    />
                  </span>
                </div>
                <div className="step-description">
                  <img src={unionIcon} alt={t('common.union_icon')} className="software-screenshot " style={{ height: 'auto', width: "200px", marginBottom: "-1rem" }} />
                </div>
              </div>

              <div className={`instruction-step ${currentIndex === 5 ? "reading-active" : ""}`} data-reading-index="5">
                <div className="step-header">
                  <span className="step-number">2 </span>
                  <span className="step-label" style={{ marginTop: "-1.5rem" }}>
                    <KaraokeLessonText
                      as="span"
                      text={t('boolean.union.step2')}
                      isActive={isSpeaking && currentIndex === 5}
                      currentCharIndex={currentCharIndex}
                    />
                    <img src={leftClick} alt={t('common.left_click')} className="screenshot-click--inline" style={{ width: '40px', margin: '0 8px' }} />
                  </span>
                </div>

                <div className={`instruction-step ${currentIndex === 6 ? "reading-active" : ""}`} data-reading-index="6">
                  <div className="card-header">
                    <h4 className={`${currentIndex === 6 ? "reading-active" : ""}`} data-reading-index="6">
                      <KaraokeLessonText
                        as="span"
                        text={t('boolean.extra.step4')}
                        isActive={isSpeaking && currentIndex === 6}
                        currentCharIndex={currentCharIndex}
                      />
                    </h4>
                  </div>
                  <div className="flex-row-wrap mt-8" style={{ gap: '2rem' }}>
                    <img src={select3D} alt={t('common.select_3d_entities')} className="software-screenshot" style={{ width: '900px', marginTop: "1rem" }} />
                  </div>
                </div>
              </div>

              <div className="lesson-navigation">
                <button className="nav-button" onClick={() => handlePrev()}><ChevronLeft size={18} /> {t('common.previous')}</button>
                <button className="nav-button next" onClick={() => handleNext()}>{t('common.next')} <ChevronRight size={18} /></button>
              </div>
            </div>
          )}

          {activeTab === "subtract" && (
            <div className="lesson-card tab-content">
              <div className="card-header">
                <h4 className={`${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2">
                  <KaraokeLessonText
                    as="span"
                    text={t('boolean.subtract.title')}
                    isActive={isSpeaking && currentIndex === 2}
                    currentCharIndex={currentCharIndex}
                  />
                </h4>
              </div>
              <KaraokeLessonText
                as="p"
                className={`p-flush ${currentIndex === 3 ? "reading-active" : ""}`}
                style={{ marginTop: "-2rem" }}
                data-reading-index="3"
                text={t('boolean.extra.step0')}
                isActive={isSpeaking && currentIndex === 3}
                currentCharIndex={currentCharIndex}
              />

              <div className={`instruction-step ${currentIndex === 4 ? "reading-active" : ""}`} data-reading-index="4">
                <div className="step-header">
                  <span className="step-number">1 </span>
                  <span className="step-label">
                    <KaraokeLessonText
                      as="span"
                      text={t('boolean.extra.step1')}
                      isActive={isSpeaking && currentIndex === 4}
                      currentCharIndex={currentCharIndex}
                    />
                  </span>
                </div>
                <div className="step-description">
                  <img src={subtractIcon} alt={t('common.subtract_icon')} className="software-screenshot" style={{ height: 'auto', width: "200px", marginBottom: "-2rem" }} />
                </div>
              </div>

              <div className={`instruction-step ${currentIndex === 5 ? "reading-active" : ""}`} data-reading-index="5">
                <div className="step-header">
                  <span className="step-number">2 </span>
                  <span className="step-label">
                    <KaraokeLessonText
                      as="span"
                      text={t('boolean.subtract.step2')}
                      isActive={isSpeaking && currentIndex === 5}
                      currentCharIndex={currentCharIndex}
                    />
                  </span>
                </div>
                <div className="step-description">
                  <div className="flex-row-wrap mt-4" style={{ gap: '2rem' }}>
                    <div className="flex-1">
                      <ul className="list-flush">
                        <li><strong className="red-text">Target Entity:</strong> Main Part</li>
                        <li><strong className="red-text">Tool Entity:</strong> Entities to be subtracted on the target entity.</li>
                      </ul>
                    </div>
                    <img src={subtractEntity} alt={t('common.target_and_tool_entity')} className="software-screenshot screenshot-medium mt-4" style={{ height: 'auto', width: '900px', marginBottom: "-2rem" }} />
                  </div>
                </div>
              </div>

              <div className={`instruction-step ${currentIndex === 6 ? "reading-active" : ""}`} data-reading-index="6">
                <div className="step-header">
                  <span className="step-number">3 </span>
                  <span className="step-label" style={{ marginTop: "-1.5rem" }}>
                    <KaraokeLessonText
                      as="span"
                      text={t('boolean.extra.step2')}
                      isActive={isSpeaking && currentIndex === 6}
                      currentCharIndex={currentCharIndex}
                    />
                    <img src={leftClick} alt={t('common.left_click')} className="screenshot-click--inline" style={{ width: '40px', margin: '0 8px' }} />
                  </span>
                </div>
                <div className="step-description">
                  <KaraokeLessonText
                    as="p"
                    className={`p-flush ${currentIndex === 6 ? "reading-active" : ""}`}
                    style={{ marginTop: "-1rem" }}
                    data-reading-index="6"
                    text={t('boolean.extra.step3')}
                    isActive={isSpeaking && currentIndex === 6}
                    currentCharIndex={currentCharIndex}
                  />
                </div>


                <div className={`instruction-step ${currentIndex === 7 ? "reading-active" : ""}`} data-reading-index="7">
                  <div className="card-header">
                    <h4 className={`${currentIndex === 7 ? "reading-active" : ""}`} data-reading-index="7">
                      <KaraokeLessonText
                        as="span"
                        text={t('boolean.extra.step4')}
                        isActive={isSpeaking && currentIndex === 7}
                        currentCharIndex={currentCharIndex}
                      />
                    </h4>
                  </div>
                  <div className="flex-row-wrap mt-8" style={{ gap: '2rem' }}>
                    <img src={subtractAfter} alt={t('common.subtraction_result')} className="software-screenshot" style={{ width: '900px', marginTop: "2rem" }} />
                  </div>
                </div>
              </div>

              <div className="step-description mt-4">
                <KaraokeLessonText
                  as="span"
                  className={`p-flush ${currentIndex === 8 ? "reading-active" : ""}`}
                  data-reading-index="8"
                  text={t('boolean.extra.step5')}
                  isActive={isSpeaking && currentIndex === 8}
                  currentCharIndex={currentCharIndex}
                />
                <div className="flex-row-wrap mt-8" style={{ gap: '2rem' }}>
                  <img src={subtractRetain} alt={t('common.subtract_and_retain_entities')} className="software-screenshot" style={{ height: 'auto', width: "200px", marginBottom: "1rem", marginTop: "1rem" }} />


                  <div className={`instruction-step ${currentIndex === 9 ? "reading-active" : ""}`} data-reading-index="9">
                    <div className="card-header">
                      <h4 className={`${currentIndex === 9 ? "reading-active" : ""}`} data-reading-index="9">
                        <KaraokeLessonText
                          as="span"
                          text={t('boolean.extra.step4')}
                          isActive={isSpeaking && currentIndex === 9}
                          currentCharIndex={currentCharIndex}
                        />
                      </h4>
                    </div>
                    <div className="flex-row-wrap mt-8" style={{ gap: '2rem' }}>
                      <img src={booleanSubtract} alt={t('common.boolean_subtract_icon')} className="software-screenshot" style={{ width: '900px' }} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="lesson-navigation">
                <button className="nav-button" onClick={() => handlePrev()}><ChevronLeft size={18} /> {t('common.previous')}</button>
                <button className="nav-button next" onClick={() => handleNext()}>{t('common.next')} <ChevronRight size={18} /></button>
              </div>
            </div>
          )}

          {activeTab === "intersect" && (
            <div className="lesson-card tab-content">
              <div className="card-header">
                <h4 className={`${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2">
                  <KaraokeLessonText
                    as="span"
                    text={t('boolean.intersect.title')}
                    isActive={isSpeaking && currentIndex === 2}
                    currentCharIndex={currentCharIndex}
                  />
                </h4>
              </div>

              <KaraokeLessonText
                as="p"
                className={`p-flush ${currentIndex === 3 ? "reading-active" : ""}`}
                style={{ marginTop: "-2rem" }}
                data-reading-index="3"
                text={t('boolean.extra.step6')}
                isActive={isSpeaking && currentIndex === 3}
                currentCharIndex={currentCharIndex}
              />

              <div className={`instruction-step ${currentIndex === 4 ? "reading-active" : ""}`} data-reading-index="4">
                <div className="step-header">
                  <span className="step-number">1 </span>
                  <span className="step-label">
                    <KaraokeLessonText
                      as="span"
                      text={t('boolean.extra.step7')}
                      isActive={isSpeaking && currentIndex === 4}
                      currentCharIndex={currentCharIndex}
                    />
                  </span>
                </div>
                <div className="step-description">
                  <img src={intersectIcon} alt={t('common.intersect_icon')} className="software-screenshot" style={{ height: 'auto', width: "200px", marginBottom: "-1rem" }} />
                </div>
              </div>

              <div className={`instruction-step ${currentIndex === 5 ? "reading-active" : ""}`} data-reading-index="5">
                <div className="step-header">
                  <span className="step-number">2 </span>
                  <span className="step-label" style={{ marginTop: "-1.5rem" }}>
                    <KaraokeLessonText
                      as="span"
                      text={t('boolean.extra.step8')}
                      isActive={isSpeaking && currentIndex === 5}
                      currentCharIndex={currentCharIndex}
                    />
                    <img src={leftClick} alt={t('common.left_click')} className="screenshot-click--inline" style={{ width: '40px', margin: '0 8px' }} />
                  </span>
                </div>

                <div className="step-description">
                  <KaraokeLessonText
                    as="p"
                    className={`p-flush ${currentIndex === 6 ? "reading-active" : ""}`}
                    style={{ marginTop: "-1rem" }}
                    data-reading-index="6"
                    text={t('boolean.extra.step9')}
                    isActive={isSpeaking && currentIndex === 6}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
              </div>

              <div className={`instruction-step ${currentIndex === 7 ? "reading-active" : ""}`} data-reading-index="7">
                <div className="card-header">
                  <h4 className={`${currentIndex === 7 ? "reading-active" : ""}`} data-reading-index="7">
                    <KaraokeLessonText
                      as="span"
                      text={t('boolean.extra.step4')}
                      isActive={isSpeaking && currentIndex === 7}
                      currentCharIndex={currentCharIndex}
                    />
                  </h4>
                </div>
                <div className="flex-row-wrap mt-8" style={{ gap: '2rem' }}>
                  <img src={intersectingEntities} alt={t('common.intersecting_entities')} className="software-screenshot mt-8" style={{ width: '900px' }} />
                </div>
              </div>

              <div className="lesson-navigation">
                <button className="nav-button" onClick={() => handlePrev()}><ChevronLeft size={18} /> {t('common.previous')}</button>
                <button className="nav-button next" onClick={() => handleNext()}>{t('common.next')} <ChevronRight size={18} /></button>
              </div>
            </div>
          )}

          {activeTab === "separate" && (
            <div className="lesson-card tab-content">
              <div className="card-header">
                <h4 className={`${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2">
                  <KaraokeLessonText
                    as="span"
                    text={t('boolean.separate.title')}
                    isActive={isSpeaking && currentIndex === 2}
                    currentCharIndex={currentCharIndex}
                  />
                </h4>
              </div>

              <KaraokeLessonText
                as="p"
                className={`p-flush ${currentIndex === 3 ? "reading-active" : ""}`}
                style={{ marginTop: "-2rem" }}
                data-reading-index="3"
                text={t('boolean.extra.step10')}
                isActive={isSpeaking && currentIndex === 3}
                currentCharIndex={currentCharIndex}
              />

              <div className={`mt-4 ${currentIndex === 4 ? "reading-active" : ""}`} data-reading-index="4">
                <div className="flex-row-wrap" style={{ gap: '2rem' }}>
                  <p className="p-flush" style={{ minWidth: '250px' }}>
                    <strong className="red-text">Component:</strong>
                  </p>
                  <KaraokeLessonText
                    as="p"
                    className="p-flush"
                    text={t('boolean.extra.step11')}
                    isActive={isSpeaking && currentIndex === 4}
                    currentCharIndex={currentCharIndex}
                  />
                  <div className="flex-col">
                    <img src={componentIcon} alt={t('common.component_icon')} className="software-screenshot" style={{ height: 'auto', width: "200px" }} />
                    <KaraokeLessonText
                      as="p"
                      className="p-flush"
                      style={{ marginTop: "1rem" }}
                      text={t('boolean.extra.step12')}
                      isActive={isSpeaking && currentIndex === 4}
                      currentCharIndex={currentCharIndex}
                    />
                  </div>
                </div>
              </div>

              <div className={`instruction-step ${currentIndex === 5 ? "reading-active" : ""}`} data-reading-index="5">
                <div className="step-header">
                  <span className="step-number">1 </span>
                  <span className="step-label" style={{ marginTop: "-1.5rem" }}>
                    <KaraokeLessonText
                      as="span"
                      text={t('boolean.extra.step13')}
                      isActive={isSpeaking && currentIndex === 5}
                      currentCharIndex={currentCharIndex}
                    />
                    <img src={leftClick} alt={t('common.left_click')} className="screenshot-click--inline" style={{ width: '40px', margin: '0 8px' }} />
                  </span>
                </div>
              </div>

              <div className={`instruction-step ${currentIndex === 6 ? "reading-active" : ""}`} data-reading-index="6" style={{ marginTop: "-2rem" }}>
                <div className="step-header">
                  <span className="step-number">2 </span>
                  <span className="step-label">
                    <KaraokeLessonText
                      as="span"
                      text={t('boolean.extra.step14')}
                      isActive={isSpeaking && currentIndex === 6}
                      currentCharIndex={currentCharIndex}
                    />
                  </span>
                </div>

                <div className="flex-row-wrap mt-4" style={{ gap: '2rem' }}>
                  <img src={componentOk} alt={t('common.confirm_dialog')} className="software-screenshot mt-4" style={{ height: 'auto', width: '350px' }} />
                  <img src={componentSeparated} alt={t('common.separated_result')} className="software-screenshot mt-4" style={{ height: 'auto', width: '400px' }} />
                </div>
              </div>

              <div className={`mt-4 ${currentIndex === 7 ? "reading-active" : ""}`} data-reading-index="7" style={{ marginTop: "-3rem", marginBottom: "2rem" }}>
                <img src={componentSeparate} alt={t('common.separate_all_components')} className="software-screenshot" style={{ height: 'auto', width: "200px", marginBottom: "1rem" }} />
                <KaraokeLessonText
                  as="p"
                  className="p-flush"
                  style={{ marginTop: "1rem" }}
                  text={t('boolean.extra.step15')}
                  isActive={isSpeaking && currentIndex === 7}
                  currentCharIndex={currentCharIndex}
                />
              </div>

              <div className={`instruction-step ${currentIndex === 8 ? "reading-active" : ""}`} data-reading-index="8">
                <div className="step-header">
                  <span className="step-number">1 </span>
                  <span className="step-label" style={{ marginTop: "-1.5rem" }}>
                    <KaraokeLessonText
                      as="span"
                      text={t('boolean.extra.step16')}
                      isActive={isSpeaking && currentIndex === 8}
                      currentCharIndex={currentCharIndex}
                    />
                    <img src={leftClick} alt={t('common.left_click')} className="screenshot-click--inline" style={{ width: '40px', margin: '0 8px' }} />
                  </span>
                </div>
              </div>

              <div className={`instruction-step ${currentIndex === 9 ? "reading-active" : ""}`} data-reading-index="9" style={{ marginTop: "-2rem" }}>
                <div className="step-header">
                  <span className="step-number">2 </span>
                  <span className="step-label">
                    <KaraokeLessonText
                      as="span"
                      text={t('boolean.extra.step14')}
                      isActive={isSpeaking && currentIndex === 9}
                      currentCharIndex={currentCharIndex}
                    />
                  </span>
                </div>
                <div className="step-description">
                  <div className="flex-row-wrap" style={{ gap: '2rem' }}>
                    <img src={selectOk} alt={t('common.confirm_dialog_all')} className="software-screenshot screenshot-medium mt-4" style={{ height: 'auto', width: '350px' }} />
                    <img src={selectEntity} alt={t('common.all_separated_result')} className="software-screenshot screenshot-medium mt-4" style={{ height: 'auto', width: '400px' }} />
                  </div>
                </div>
              </div>

              <div className="lesson-navigation">
                <button className="nav-button" onClick={() => handlePrev()}><ChevronLeft size={18} /> {t('common.previous')}</button>
                <button className="nav-button next" onClick={() => handleNext()}>{nextLabel || t('common.next')} <ChevronRight size={18} /></button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BooleanLesson;
