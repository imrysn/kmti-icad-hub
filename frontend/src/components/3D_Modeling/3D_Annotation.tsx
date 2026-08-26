import { useTranslation } from '../../context/LanguageContext';
import { ChevronLeft,ChevronRight } from 'lucide-react';
import React,{ useEffect,useState } from "react";
import { useLessonCore } from "../../hooks/useLessonCore";
import { useTTSAutoplay } from "../../hooks/useTTSAutoplay";
import './CourseLesson.css';
import { KaraokeLessonText } from "../KaraokeLessonText";

/* Assets */
import attrIcon from "../../assets/3d-images/annotation11.png";
import angularIcon from "../../assets/3d-images/annotation1_angular.png";
import angularImage from "../../assets/3d-images/annotation1_angular1.png";
import diameterIcon from "../../assets/3d-images/annotation1_circular.png";
import linearIcon from "../../assets/3d-images/annotation1_linear.png";
import linearImage from "../../assets/3d-images/annotation1_linear1.png";
import noteIcon from "../../assets/3d-images/annotation1_note_string_entry.png";
import annotation1NoteStringEntry1 from "../../assets/3d-images/annotation1_note_string_entry1.png";
import textIcon from "../../assets/3d-images/annotation1_text_entry.png";
import textResult from "../../assets/3d-images/annotation1_text_entry1.png";
import annotationTop from "../../assets/3d-images/annotation1_top.png";
import editsIcon from "../../assets/3d-images/annotation2_edits_drafting.png";
import attrWindow from "../../assets/3d-images/change_properties_window.png";
import positionIcon from "../../assets/3d-images/changes_position_drafting_entities.png";
import diameterImage from "../../assets/3d-images/dimaeter_dimension.jpg";
import editsWindow from "../../assets/3d-images/edit_dimension_characters_window.png";
import leftClick from "../../assets/3d-images/left_click.png";
import noteWindow from "../../assets/3d-images/note_string_entry_window.png";
import textWindow from "../../assets/3d-images/text_entry_window.png";

type AnnotationTab = "linear" | "diameter" | "angular" | "notes" | "character" | "edits" | "attributes" | "position";

interface AnnotationLessonProps {
  nextLabel?: string;
  subLessonId?: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const AnnotationLesson: React.FC<AnnotationLessonProps> = ({ onNextLesson, onPrevLesson, nextLabel }) => {
  const { t } = useTranslation();

  const [activeTab, setActiveTab] = useState<AnnotationTab>(() => {
    return (localStorage.getItem('annotationActiveTab') as AnnotationTab) || "linear";
  });

  useEffect(() => {
    localStorage.setItem('annotationActiveTab', activeTab);
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
  } = useLessonCore("annotation");

  const linearSteps = [
    t('annotation.linearSteps.step0'),
    t('annotation.angularSteps.step1'),
    t('annotation.linearSteps.step2')
  ];

  const diameterSteps = [
    t('annotation.diameterSteps.step0'),
    t('annotation.diameterSteps.step1'),
    t('annotation.diameterSteps.step2')
  ];

  const angularSteps = [
    t('annotation.angularSteps.step0'),
    t('annotation.angularSteps.step1'),
    t('annotation.angularSteps.step2')
  ];

  const notesSteps = [
    t('annotation.notesSteps.step0'),
    t('annotation.notesSteps.step1'),
    t('annotation.notesSteps.step2'),
    t('annotation.notesSteps.step3'),
    t('annotation.notesSteps.step4')
  ];

  const characterSteps = [
    t('annotation.characterSteps.step0'),
    t('annotation.characterSteps.step1'),
    t('annotation.characterSteps.step2'),
    t('annotation.characterSteps.step3')
  ];

  const editsSteps = [
    t('annotation.editsSteps.step0'),
    t('annotation.attributesSteps.step1'),
    t('annotation.editsSteps.step2'),
    t('annotation.editsSteps.step3')
  ];

  const attributesSteps = [
    t('annotation.attributesSteps.step0'),
    t('annotation.attributesSteps.step1'),
    t('annotation.attributesSteps.step2'),
    t('annotation.attributesSteps.step3')
  ];

  const positionSteps = [
    t('annotation.positionSteps.step0'),
  ];

  const introTitle = t('annotation.introTitle');
  const introSubtitle = t('annotation.introSubtitle');

  const commonIntroSteps = [
    introTitle,
    introSubtitle
  ];

  const linearStepsTTS = [...commonIntroSteps, ...linearSteps];
  const diameterStepsTTS = [...commonIntroSteps, ...diameterSteps];
  const angularStepsTTS = [...commonIntroSteps, ...angularSteps];
  const notesStepsTTS = [...commonIntroSteps, ...notesSteps];
  const characterStepsTTS = [...commonIntroSteps, ...characterSteps];
  const editsStepsTTS = [...commonIntroSteps, ...editsSteps];
  const attributesStepsTTS = [...commonIntroSteps, ...attributesSteps];
  const positionStepsTTS = [...commonIntroSteps, ...positionSteps];

  const handleTabChange = (tab: AnnotationTab) => {
    stop();
    sessionStorage.setItem('tts-autoplay-active', 'false');
    setActiveTab(tab);
  };

  const handleNext = (isAuto = false) => {
    stop();
    if (!isAuto) {
      sessionStorage.setItem('tts-autoplay-active', 'false');
    }
    const tabs: AnnotationTab[] = ["linear", "diameter", "angular", "notes", "character", "edits", "attributes", "position"];
    const currentIndex = tabs.indexOf(activeTab);
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      if (onNextLesson) onNextLesson();
    }
  };

  const handlePrev = (isAuto = false) => {
    stop();
    if (!isAuto) {
      sessionStorage.setItem('tts-autoplay-active', 'false');
    }
    const tabs: AnnotationTab[] = ["linear", "diameter", "angular", "notes", "character", "edits", "attributes", "position"];
    const currentIndex = tabs.indexOf(activeTab);
    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      if (onPrevLesson) onPrevLesson();
    }
  };

  useEffect(() => {
    const steps = activeTab === 'linear' ? linearStepsTTS :
                  activeTab === 'diameter' ? diameterStepsTTS :
                  activeTab === 'angular' ? angularStepsTTS :
                  activeTab === 'notes' ? notesStepsTTS :
                  activeTab === 'character' ? characterStepsTTS :
                  activeTab === 'edits' ? editsStepsTTS :
                  activeTab === 'attributes' ? attributesStepsTTS : positionStepsTTS;
    const startIdx = activeTab === 'linear' ? 0 : 2;
    registerText(steps, startIdx);
  }, [activeTab, registerText]);

  const currentTabSteps = activeTab === 'linear' ? linearStepsTTS :
                          activeTab === 'diameter' ? diameterStepsTTS :
                          activeTab === 'angular' ? angularStepsTTS :
                          activeTab === 'notes' ? notesStepsTTS :
                          activeTab === 'character' ? characterStepsTTS :
                          activeTab === 'edits' ? editsStepsTTS :
                          activeTab === 'attributes' ? attributesStepsTTS : positionStepsTTS;
  const startIdx2 = activeTab === 'linear' ? 0 : 2;
  const tabsList = [
    { id: 'linear' }, { id: 'diameter' }, { id: 'angular' }, { id: 'notes' },
    { id: 'character' }, { id: 'edits' }, { id: 'attributes' }, { id: 'position' }
  ];

  useTTSAutoplay(
    isSpeaking,
    currentIndex,
    activeTab,
    currentTabSteps.length,
    tabsList,
    handleNext,
    speak,
    currentTabSteps,
    startIdx2
  );

  return (
    <div className={`course-lesson-container`} ref={containerRef}>
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
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
        <img src={annotationTop} alt={t('common.annotation_top')} className="software-screenshot mt-4" style={{ height: 'auto', width: '200px' }} />
      </section>

      <div className="lesson-tabs mt-8">
        <button className={`tab-button ${activeTab === 'linear' ? 'active' : ''}`} style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }} onClick={() => handleTabChange('linear')}>{t("annotation.tab.linear")}</button>
        <button className={`tab-button ${activeTab === 'diameter' ? 'active' : ''}`} style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }} onClick={() => handleTabChange('diameter')}>{t("annotation.tab.diameter")}</button>
        <button className={`tab-button ${activeTab === 'angular' ? 'active' : ''}`} style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }} onClick={() => handleTabChange('angular')}>{t("annotation.tab.angular")}</button>
        <button className={`tab-button ${activeTab === 'notes' ? 'active' : ''}`} style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }} onClick={() => handleTabChange('notes')}>{t("annotation.tab.notes")}</button>
        <button className={`tab-button ${activeTab === 'character' ? 'active' : ''}`} style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }} onClick={() => handleTabChange('character')}>{t("annotation.tab.character")}</button>
        <button className={`tab-button ${activeTab === 'edits' ? 'active' : ''}`} style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }} onClick={() => handleTabChange('edits')}>{t("annotation.tab.edits")}</button>
        <button className={`tab-button ${activeTab === 'attributes' ? 'active' : ''}`} style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }} onClick={() => handleTabChange('attributes')}>{t("annotation.tab.attributes")}</button>
        <button className={`tab-button ${activeTab === 'position' ? 'active' : ''}`} style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }} onClick={() => handleTabChange('position')}>{t("annotation.tab.position")}</button>
      </div>

      <div className="lesson-grid single-card">
        <div className="lesson-card tab-content fade-in">

          {activeTab === 'linear' && (
            <div className="fade-in">
              <div className="card-header" style={{ marginBottom: "1rem" }}>
                <h4 className={`${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
                  <KaraokeLessonText
                    as="span"
                    text={t('annotation.linearSteps.step0')}
                    isActive={isSpeaking && currentIndex === 2}
                    currentCharIndex={currentCharIndex}
                  />
                </h4>
              </div>
              <div className={`instruction-step ${currentIndex === 3 ? "reading-active" : ""}`} data-reading-index="3">
                <div className="step-description">

                  <img src={linearIcon} alt={t('common.linear_dimension_tool')} className="software-screenshot mt-4 mb-4" style={{ height: 'auto', width: "200px", marginBottom: "2rem" }} />
                  <div className="flex-row-wrap">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <div className={`step-header ${currentIndex === 3 ? "reading-active" : ""}`} style={{ marginBottom: "2rem" }}>
                        <span className="step-number">1 </span>
                        <KaraokeLessonText
                          as="span"
                          className="step-label"
                          text={t('common.select_edges_to_be_measured')}
                          isActive={isSpeaking && currentIndex === 3}
                          currentCharIndex={currentCharIndex}
                        />
                      </div>
                      <div className={`step-header ${currentIndex === 4 ? "reading-active" : ""}`} data-reading-index="4" style={{ marginBottom: "2rem" }}>
                        <span className="step-number">2 </span>
                        <KaraokeLessonText
                          as="span"
                          className="step-label"
                          text={t('common.left_click_on_the_3d')}
                          isActive={isSpeaking && currentIndex === 4}
                          currentCharIndex={currentCharIndex}
                        />
                      </div>
                    </div>
                    <img src={linearImage} alt={t('common.linear_dimension_result')} className="software-screenshot mt-4" style={{ height: '300px' }} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'diameter' && (
            <div className="fade-in">
              <div className="card-header" style={{ marginBottom: "1rem" }}>
                <h4 className={`${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
                  <KaraokeLessonText
                    as="span"
                    text={t('annotation.diameterSteps.step0')}
                    isActive={isSpeaking && currentIndex === 2}
                    currentCharIndex={currentCharIndex}
                  />
                </h4>
              </div>
              <div className={`instruction-step ${currentIndex === 3 ? "reading-active" : ""}`} data-reading-index="3">
                <div className="step-description">
                  <img src={diameterIcon} alt={t('common.diameter_dimension_tool')} className="software-screenshot mt-4 mb-4" style={{ height: 'auto', width: "200px", marginBottom: "2rem" }} />
                  <div className="flex-row-wrap" style={{ gap: '2rem', alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <div className={`step-header ${currentIndex === 3 ? "reading-active" : ""}`} style={{ marginBottom: "2rem" }}>
                        <span className="step-number">1 </span>
                        <KaraokeLessonText
                          as="span"
                          className="step-label"
                          text={t('common.select_the_edge_of_the')}
                          isActive={isSpeaking && currentIndex === 3}
                          currentCharIndex={currentCharIndex}
                        />
                      </div>
                      <div className={`step-header ${currentIndex === 4 ? "reading-active" : ""}`} data-reading-index="4" style={{ marginBottom: "2rem" }}>
                        <span className="step-number">2 </span>
                        <KaraokeLessonText
                          as="span"
                          className="step-label"
                          text={t('common.left_click_on_the_3d_1')}
                          isActive={isSpeaking && currentIndex === 4}
                          currentCharIndex={currentCharIndex}
                        />
                      </div>
                    </div>
                    <img src={diameterImage} alt={t('common.diameter_dimension_result')} className="software-screenshot mt-4" style={{ height: '300px' }} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'angular' && (
            <div className="fade-in">
              <div className="card-header" style={{ marginBottom: "1rem" }}>
                <h4 className={`${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
                  <KaraokeLessonText
                    as="span"
                    text={t('annotation.angularSteps.step0')}
                    isActive={isSpeaking && currentIndex === 2}
                    currentCharIndex={currentCharIndex}
                  />
                </h4>
              </div>
              <div className={`instruction-step ${currentIndex === 3 ? "reading-active" : ""}`} data-reading-index="3">
                <div className="step-description">
                  <img src={angularIcon} alt={t('common.angular_dimension_tool')} className="software-screenshot mt-4 mb-4" style={{ height: 'auto', width: "200px", marginBottom: "2rem" }} />
                  <div className="flex-row-wrap" style={{ gap: '2rem', alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <div className={`step-header ${currentIndex === 3 ? "reading-active" : ""}`} style={{ marginBottom: "2rem" }}>
                        <span className="step-number">1 </span>
                        <KaraokeLessonText
                          as="span"
                          className="step-label"
                          text={t('common.select_edges_to_be_measured')}
                          isActive={isSpeaking && currentIndex === 3}
                          currentCharIndex={currentCharIndex}
                        />
                      </div>
                      <div className={`step-header ${currentIndex === 4 ? "reading-active" : ""}`} data-reading-index="4" style={{ marginBottom: "2rem" }}>
                        <span className="step-number">2 </span>
                        <KaraokeLessonText
                          as="span"
                          className="step-label"
                          text={t('common.left_click_on_the_3d_2')}
                          isActive={isSpeaking && currentIndex === 4}
                          currentCharIndex={currentCharIndex}
                        />
                      </div>
                    </div>
                    <img src={angularImage} alt={t('common.angular_dimension_result')} className="software-screenshot mt-4" style={{ height: '200px' }} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notes' && (
            <div className="fade-in">
              <div className="card-header" style={{ marginBottom: "1rem" }}>
                <h4 className={`${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
                  <KaraokeLessonText
                    as="span"
                    text={t('annotation.notesSteps.step0')}
                    isActive={isSpeaking && currentIndex === 2}
                    currentCharIndex={currentCharIndex}
                  />
                </h4>
              </div>
              <div className={`instruction-step ${currentIndex === 3 ? "reading-active" : ""}`} data-reading-index="3">
                <div className="step-description">
                  <img src={noteIcon} alt={t('common.notes_tool')} className="software-screenshot mt-4 mb-4" style={{ height: 'auto', width: "200px", marginBottom: "2rem" }} />
                  <div className="flex-row-wrap" style={{ gap: '2rem', alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <div className={`step-header ${currentIndex === 3 ? "reading-active" : ""}`} style={{ marginBottom: "2rem" }}>
                        <span className="step-number">1 </span>
                        <span className="step-label" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                          <KaraokeLessonText
                            as="span"
                            text={t('common.pick_any_edge_of_the')}
                            isActive={isSpeaking && currentIndex === 3}
                            currentCharIndex={currentCharIndex}
                          />
                          <img src={leftClick} alt={t('common.left_click')} className="screenshot-click--inline" style={{ width: '40px', margin: '0 8px', marginBottom: "2rem" }} />
                        </span>
                      </div>
                      <div className={`step-header ${currentIndex === 4 ? "reading-active" : ""}`} data-reading-index="4">
                        <span className="step-number">2 </span>
                        <KaraokeLessonText
                          as="span"
                          className="step-label"
                          text={t('common.left_click_to_show_the')}
                          isActive={isSpeaking && currentIndex === 4}
                          currentCharIndex={currentCharIndex}
                        />
                      </div>
                      <img src={noteWindow} alt={t('common.note_string_entry_window')} className="software-screenshot mt-4 mb-4" style={{ width: '400px', marginBottom: "2rem" }} />
                      <div className={`step-header ${currentIndex === 5 ? "reading-active" : ""}`} data-reading-index="5" style={{ marginBottom: "2rem" }}>
                        <span className="step-number">3 </span>
                        <KaraokeLessonText
                          as="span"
                          className="step-label"
                          text={t('common.enter_the_note_then_press')}
                          isActive={isSpeaking && currentIndex === 5}
                          currentCharIndex={currentCharIndex}
                        />
                      </div>
                      <div className={`step-header ${currentIndex === 6 ? "reading-active" : ""}`} data-reading-index="6" style={{ marginBottom: "2rem" }}>
                        <span className="step-number">4 </span>
                        <KaraokeLessonText
                          as="span"
                          className="step-label"
                          text={t('common.left_click_on_the_3d_3')}
                          isActive={isSpeaking && currentIndex === 6}
                          currentCharIndex={currentCharIndex}
                        />
                      </div>
                    </div>
                    <img src={annotation1NoteStringEntry1} alt={t('common.angular_dimension')} className="software-screenshot mt-4" style={{ width: '450px', marginBottom: "2rem" }} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'character' && (
            <div className="fade-in">
              <div className="card-header" style={{ marginBottom: "1rem" }}>
                <h4 className={`${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
                  <KaraokeLessonText
                    as="span"
                    text={t('annotation.characterSteps.step0')}
                    isActive={isSpeaking && currentIndex === 2}
                    currentCharIndex={currentCharIndex}
                  />
                </h4>
              </div>
              <div className={`instruction-step ${currentIndex === 3 ? "reading-active" : ""}`} data-reading-index="3">
                <div className="step-description">
                  <img src={textIcon} alt={t('common.character_strings_tool')} className="software-screenshot mt-4 mb-4" style={{ height: 'auto', width: "200px", marginBottom: "2rem" }} />
                  <div className="flex-row-wrap" style={{ gap: '2rem', alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <div className={`step-header ${currentIndex === 3 ? "reading-active" : ""}`}>
                        <span className="step-number">1 </span>
                        <KaraokeLessonText
                          as="span"
                          className="step-label"
                          text={t('common.left_click_on_the_3d_4')}
                          isActive={isSpeaking && currentIndex === 3}
                          currentCharIndex={currentCharIndex}
                        />
                      </div>
                      <img src={textWindow} alt={t('common.text_entry_window')} className="software-screenshot mt-4 mb-4" style={{ width: '500px', marginBottom: "2rem" }} />
                      <div className={`step-header ${currentIndex === 4 ? "reading-active" : ""}`} data-reading-index="4" style={{ marginBottom: "2rem" }}>
                        <span className="step-number">2 </span>
                        <KaraokeLessonText
                          as="span"
                          className="step-label"
                          text={t('common.enter_the_note_then_press')}
                          isActive={isSpeaking && currentIndex === 4}
                          currentCharIndex={currentCharIndex}
                        />
                      </div>
                      <div className={`step-header ${currentIndex === 5 ? "reading-active" : ""}`} data-reading-index="5" style={{ marginBottom: "2rem" }}>
                        <span className="step-number">3 </span>
                        <KaraokeLessonText
                          as="span"
                          className="step-label"
                          text={t('common.left_click_on_the_3d_3')}
                          isActive={isSpeaking && currentIndex === 5}
                          currentCharIndex={currentCharIndex}
                        />
                      </div>
                    </div>
                    <img src={textResult} alt={t('common.attributes_window')} className="software-screenshot mt-4" style={{ width: '500px' }} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'edits' && (
            <div className="fade-in">
              <div className="card-header" style={{ marginBottom: "1rem" }}>
                <h4 className={`${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
                  <KaraokeLessonText
                    as="span"
                    text={t('annotation.editsSteps.step0')}
                    isActive={isSpeaking && currentIndex === 2}
                    currentCharIndex={currentCharIndex}
                  />
                </h4>
              </div>
              <div className={`instruction-step ${currentIndex === 3 ? "reading-active" : ""}`} data-reading-index="3">
                <div className="step-description">
                  <img src={editsIcon} alt={t('common.edits_tool')} className="software-screenshot mt-4 mb-4" style={{ height: 'auto', width: "200px", marginBottom: "2rem" }} />
                  <div className="flex-row-wrap" style={{ gap: '2rem', alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <div className={`step-header ${currentIndex === 3 ? "reading-active" : ""}`} style={{ marginBottom: "2rem" }}>
                        <span className="step-number">1 </span>
                        <KaraokeLessonText
                          as="span"
                          className="step-label"
                          text={t('common.select_drafting_entity_then_click')}
                          isActive={isSpeaking && currentIndex === 3}
                          currentCharIndex={currentCharIndex}
                        />
                        <img src={leftClick} alt={t('common.left_click')} className="screenshot-click--inline" style={{ width: '40px', margin: '0 8px', marginBottom: "2rem" }} />
                      </div>
                      <div className={`step-header ${currentIndex === 4 ? "reading-active" : ""}`} data-reading-index="4" style={{ marginBottom: "2rem", marginTop: "-1rem" }}>
                        <span className="step-number">2 </span>
                        <KaraokeLessonText
                          as="span"
                          className="step-label"
                          text={t('common.edit_dimension_characters_window_will')}
                          isActive={isSpeaking && currentIndex === 4}
                          currentCharIndex={currentCharIndex}
                        />
                      </div>
                      <div className={`step-header ${currentIndex === 5 ? "reading-active" : ""}`} data-reading-index="5" style={{ marginBottom: "2rem" }}>
                        <span className="step-number">3 </span>
                        <KaraokeLessonText
                          as="span"
                          className="step-label"
                          text={t('common.after_editing_the_dimension_characters')}
                          isActive={isSpeaking && currentIndex === 5}
                          currentCharIndex={currentCharIndex}
                        />
                      </div>
                    </div>
                    <img src={editsWindow} alt={t('common.edits_window')} className="software-screenshot mt-4" style={{ width: '900px' }} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'attributes' && (
            <div className="fade-in">
              <div className="card-header" style={{ marginBottom: "1rem" }}>
                <h4 className={`${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
                  <KaraokeLessonText
                    as="span"
                    text={t('annotation.attributesSteps.step0')}
                    isActive={isSpeaking && currentIndex === 2}
                    currentCharIndex={currentCharIndex}
                  />
                </h4>
              </div>
              <div className={`instruction-step ${currentIndex === 3 ? "reading-active" : ""}`} data-reading-index="3">
                <div className="step-description">
                  <img src={attrIcon} alt={t('common.attributes_tool')} className="software-screenshot mt-4 mb-4" style={{ height: 'auto', width: "200px", marginBottom: "2rem" }} />
                  <div className="flex-row-wrap" style={{ gap: '2rem', alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <div className={`step-header ${currentIndex === 3 ? "reading-active" : ""}`} style={{ marginBottom: "2rem" }}>
                        <span className="step-number">1 </span>
                        <KaraokeLessonText
                          as="span"
                          className="step-label"
                          text={t('common.select_drafting_entity_then_click')}
                          isActive={isSpeaking && currentIndex === 3}
                          currentCharIndex={currentCharIndex}
                        />
                        <img src={leftClick} alt={t('common.left_click')} className="screenshot-click--inline" style={{ width: '40px', margin: '0 8px', marginBottom: "2rem" }} />
                      </div>
                      <div className={`step-header ${currentIndex === 4 ? "reading-active" : ""}`} data-reading-index="4" style={{ marginBottom: "2rem", marginTop: "-1rem" }}>
                        <span className="step-number">2 </span>
                        <KaraokeLessonText
                          as="span"
                          className="step-label"
                          text={t('common.change_properties_window_will_appear')}
                          isActive={isSpeaking && currentIndex === 4}
                          currentCharIndex={currentCharIndex}
                        />
                      </div>
                      <div className={`step-header ${currentIndex === 5 ? "reading-active" : ""}`} data-reading-index="5" style={{ marginBottom: "2rem" }}>
                        <span className="step-number">3 </span>
                        <KaraokeLessonText
                          as="span"
                          className="step-label"
                          text={t('common.after_changing_the_properties_press')}
                          isActive={isSpeaking && currentIndex === 5}
                          currentCharIndex={currentCharIndex}
                        />
                      </div>
                    </div>
                    <img src={attrWindow} alt={t('common.attributes_window')} className="software-screenshot mt-4" style={{ width: '500px' }} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'position' && (
            <div className="fade-in">
              <div className="card-header" style={{ marginBottom: "1rem" }}>
                <h4 className={`${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
                  <KaraokeLessonText
                    as="span"
                    text={t('common.changes_the_position_of_drafting')}
                    isActive={isSpeaking && currentIndex === 2}
                    currentCharIndex={currentCharIndex}
                  />
                </h4>
              </div>
              <div className={`instruction-step ${currentIndex === 3 ? "reading-active" : ""}`} data-reading-index="3">
                <div className="step-description">
                  <img src={positionIcon} alt={t('common.position_tool')} className="software-screenshot mt-4 mb-4" style={{ height: 'auto', width: "200px", }} />
                </div>
              </div>
            </div>
          )}

          <div className="lesson-navigation">
            {onPrevLesson && (
  <button className="nav-button" onClick={() => handlePrev()}><ChevronLeft size={18} /> {t('common.previous')}</button>
)}
            <button className="nav-button next" onClick={() => handleNext()}>{activeTab === 'position' ? nextLabel || t('common.next') : 'Next'} <ChevronRight size={18} /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnotationLesson;

