import { useTranslation } from '../../context/LanguageContext';
import { ChevronLeft,ChevronRight } from 'lucide-react';
import React,{ useEffect,useState } from 'react';
import { useLessonCore } from "../../hooks/useLessonCore";
import { useTTSAutoplay } from "../../hooks/useTTSAutoplay";
import './CourseLesson.css';
import { KaraokeLessonText } from "../KaraokeLessonText";

/* Assets */
import brepDialogImg from '../../assets/3d-images/dialog_box_brep.png';
import leftClick from '../../assets/3d-images/left_click.png';
import lightenBrepIcon from '../../assets/3d-images/lighten_brep_solid.png';
import loadingParasolidImg from '../../assets/3d-images/loading_parasolid.png';
import messagePaneImg from '../../assets/3d-images/message_pane_brep.png';
import nameChangeDialogImg from '../../assets/3d-images/name_change_dialog.png';
import otherInfoImg from '../../assets/3d-images/other_info_parasolid.png';
import parasolid43Img from '../../assets/3d-images/parasolid4.3.png';
import importIcon from '../../assets/3d-images/parasolid_import.png';
import linkDialogImg from '../../assets/3d-images/parasolid_link_dialog.png';

interface ParasolidLessonProps {
  nextLabel?: string;
  subLessonId?: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const ParasolidLesson: React.FC<ParasolidLessonProps> = ({ subLessonId = 'parasolid-1', onNextLesson, onPrevLesson, nextLabel }) => {
  const { t } = useTranslation();

  const [activeTab, setActiveTab] = useState<'import' | 'edit'>(() => {
    return (localStorage.getItem('parasolid-tab') as any) || 'import';
  });

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

  useEffect(() => {
    localStorage.setItem('parasolid-tab', activeTab);
  }, [activeTab]);

  const importSteps = [
    t('parasolid.importSteps.step0'),
    t('parasolid.importSteps.step1'),
    t('parasolid.importSteps.step2'),
    t('parasolid.importSteps.step3'),
    t('parasolid.importSteps.step4'),
    t('parasolid.importSteps.step5'),
    t('parasolid.editSteps.step5'),
    t('parasolid.importSteps.step7'),
    t('parasolid.editSteps.step7'),
    t('parasolid.editSteps.step8'),
    t('parasolid.editSteps.step9'),
    t('parasolid.editSteps.step10'),
    t('parasolid.editSteps.step11')
  ];

  const editSteps = [
    t('parasolid.editSteps.step0'),
    t('parasolid.editSteps.step1'),
    t('parasolid.editSteps.step2'),
    t('parasolid.editSteps.step3'),
    t('parasolid.editSteps.step4'),
    t('parasolid.editSteps.step5'),
    t('parasolid.editSteps.step6'),
    t('parasolid.editSteps.step7'),
    t('parasolid.editSteps.step8'),
    t('parasolid.editSteps.step9'),
    t('parasolid.editSteps.step10'),
    t('parasolid.editSteps.step11')
  ];

  const handleNext = (isAuto = false) => {
    stop();
    if (!isAuto) {
      sessionStorage.setItem('tts-autoplay-active', 'false');
    }
    if (activeTab === 'import') setActiveTab('edit');
    else if (onNextLesson) onNextLesson();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrev = (isAuto = false) => {
    stop();
    if (!isAuto) {
      sessionStorage.setItem('tts-autoplay-active', 'false');
    }
    if (activeTab === 'edit') setActiveTab('import');
    else if (onPrevLesson) onPrevLesson();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getStepClass = (_stepId: string) => "instruction-step";

  const tabs = [
    { id: 'import', label: 'IMPORT' },
    { id: 'edit', label: 'Lighten B-Rep Solid' },
  ];

  const introTitle = activeTab === 'import' ? t('common.parasolid.title') : t('common.parasolid.title');
  const introSubtitle = t('parasolid.introSubtitle');

  const commonIntroSteps = [
    introTitle,
    introSubtitle
  ];

  const importStepsTTS = [...commonIntroSteps, ...importSteps];
  const editStepsTTS = [...commonIntroSteps, ...editSteps];

  useEffect(() => {
    const steps = activeTab === 'import' ? importStepsTTS : editStepsTTS;
    const startIdx = activeTab === 'import' ? 0 : 2;
    registerText(steps, startIdx);
  }, [activeTab, registerText]);

  const currentTabSteps = activeTab === 'import' ? importStepsTTS : editStepsTTS;
  const startIdx2 = activeTab === 'import' ? 0 : 2;
  const tabsList = [{ id: 'import' }, { id: 'edit' }];

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
      <div className="lesson-tabs">
        {tabs.map(tab => (
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
        <img src={loadingParasolidImg} alt={t('common.loading_parasolid')} className="software-screenshot screenshot-small mt-4" style={{ width: "250px", marginTop: "1rem" }} />
      </section>

      <div className="lesson-grid single-card">
        <div className="lesson-card tab-content fade-in">
          {activeTab === 'import' ? (
            <div className="fade-in">
              <div className={`card-header ${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
                <h4 style={{marginBottom: "2rem"}}>IMPORT</h4>
              </div>

              <div className={`${getStepClass('p1-1')} ${currentIndex === 3 ? 'reading-active' : ''}`} data-reading-index="3">
                <div className="step-header">
                  <span className="step-number">1 </span>
                  <KaraokeLessonText
                    as="span"
                    className="step-label"
                    text={t('parasolid.importSteps.step1')}
                    isActive={isSpeaking && currentIndex === 3}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
                <div className="step-description">
                    <img src={importIcon} alt={t('common.import_parasolid_tool')} className="software-screenshot mt-4" style={{ height: 'auto', width: '200px', marginBottom: "-2rem"}} />
                </div>
              </div>

              <div className={`${getStepClass('p1-2')} ${currentIndex === 4 ? 'reading-active' : ''}`} data-reading-index="4">
                <div className="step-header">
                  <span className="step-number">2 </span>
                  <KaraokeLessonText
                    as="span"
                    className="step-label"
                    style={{marginTop: "2rem"}}
                    text={t('common.the_parasolid_link_dialog_box')}

                    isActive={isSpeaking && currentIndex === 4}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
                <div className="step-description">
                    <img src={linkDialogImg} alt={t('common.parasolid_link_dialog')} className="software-screenshot mt-4" style={{width: "900px"}} />
                </div>
              </div>
              <div className={`${getStepClass('p1-3')} ${currentIndex === 5 ? 'reading-active' : ''}`} data-reading-index="5">
                <div className="step-header">
                  <span className="step-number">3 </span>
                  <div className="step-label" style={{marginTop: "-1.5rem"}}>
                  <KaraokeLessonText
                    as="span"
                    text={t('parasolid.importSteps.step3')}
                    isActive={isSpeaking && currentIndex === 5}
                    currentCharIndex={currentCharIndex}
                  />
                  <img src={leftClick} alt={t('common.left_click')} className="screenshot-click--inline" style={{ width: '40px', margin: '0 8px' }} />
                </div>
                </div>
                 <div className={`step-label ${currentIndex === 6 ? 'reading-active' : ''}`} data-reading-index="6" style={{ marginTop: "-1rem", marginLeft: "3rem" }}>
                  <KaraokeLessonText
                    as="span"
                    text={t('parasolid.importSteps.step4')}
                    isActive={isSpeaking && currentIndex === 6}
                    currentCharIndex={currentCharIndex}
                  />
                  </div>
                  <div className={`step-label ${currentIndex === 7 ? 'reading-active' : ''}`} data-reading-index="7" style={{ marginTop: "-1rem", marginLeft: "3rem" }}>
                  <KaraokeLessonText
                    as="span"
                    text={t('parasolid.importSteps.step5')}
                    isActive={isSpeaking && currentIndex === 7}
                    currentCharIndex={currentCharIndex}
                  />
                  </div>
                <div className="step-description">
                    <img src={nameChangeDialogImg} alt={t('common.name_change_dialog')} className="software-screenshot screenshot-wide mt-4" />
                </div>
              </div>

              <div className={`${getStepClass('p2-4')} ${currentIndex === 8 ? 'reading-active' : ''}`} data-reading-index="8">
                <div className="step-header">
                  <span className="step-number">4 </span>
                  <KaraokeLessonText
                    as="span"
                    className="step-label"
                    text={t('parasolid.editSteps.step5')}
                    isActive={isSpeaking && currentIndex === 8}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
                <div className={`step-label ${currentIndex === 9 ? 'reading-active' : ''}`} data-reading-index="9" style={{ marginTop: "-1rem", marginLeft: "3rem" }}>
                  <KaraokeLessonText
                    as="span"
                    text={t('parasolid.editSteps.step6')}
                    isActive={isSpeaking && currentIndex === 9}
                    currentCharIndex={currentCharIndex}
                  />
                  </div>
              </div>

              <div className={`${getStepClass('p2-5')} ${currentIndex === 10 ? 'reading-active' : ''}`} data-reading-index="10" style={{ marginTop: "-2rem" }}>
                <div className="step-header">
                  <span className="step-number">5 </span>
                  <KaraokeLessonText
                    as="span"
                    className="step-label"
                    text={t('parasolid.editSteps.step7')}
                    isActive={isSpeaking && currentIndex === 10}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
                 <div className={`step-label ${currentIndex === 11 ? 'reading-active' : ''}`} data-reading-index="11" style={{ marginTop: "-1rem", marginLeft: "3rem" }}>
                  <KaraokeLessonText
                    as="span"
                    text={t('parasolid.editSteps.step8')}
                    isActive={isSpeaking && currentIndex === 11}
                    currentCharIndex={currentCharIndex}
                  />
                  </div>
                  <div className={`step-label ${currentIndex === 12 ? 'reading-active' : ''}`} data-reading-index="12" style={{ marginTop: "-1rem", marginLeft: "4rem" }}>
                  <KaraokeLessonText
                    as="p"
                    text={t('parasolid.editSteps.step9')}
                    isActive={isSpeaking && currentIndex === 12}
                    currentCharIndex={currentCharIndex}
                  />
                  </div>
                   <div className={`step-label ${currentIndex === 13 ? 'reading-active' : ''}`} data-reading-index="13" style={{ marginTop: "-1rem", marginLeft: "4rem" }}>
                  <KaraokeLessonText
                    as="p"
                    text={t('parasolid.editSteps.step10')}
                    isActive={isSpeaking && currentIndex === 13}
                    currentCharIndex={currentCharIndex}
                  />
                  </div>
                  <div className={`step-label ${currentIndex === 14 ? 'reading-active' : ''}`} data-reading-index="14" style={{ marginTop: "-1rem", marginLeft: "4rem" }}>
                  <KaraokeLessonText
                    as="p"
                    text={t('parasolid.editSteps.step11')}
                    isActive={isSpeaking && currentIndex === 14}
                    currentCharIndex={currentCharIndex}
                  />
                  </div>

                  <div className="step-description">
                  <img src={parasolid43Img} alt={t('common.material_and_data_entry_info')} className="software-screenshot mt-4" style={{marginBottom: "1rem", width: "900px"}} />

                  <img src={otherInfoImg} alt={t('common.other_information_reference')} className="software-screenshot mt-8" />

                </div>
                </div>
            </div>
          ) : (
            <div className="fade-in">
              <div className={`card-header ${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
                <h4>{t('common.parasolid.lighten')}</h4>
              </div>
              <p className='p-flush' style={{marginBottom: "2rem"}}>Use this tool to lighten up the file size</p>

              <div className={`${getStepClass('p2-1')} ${currentIndex === 3 ? 'reading-active' : ''}`} data-reading-index="3">
                <div className="step-header">
                  <span className="step-number">1 </span>
                  <KaraokeLessonText
                    as="span"
                    className="step-label"
                    text={t('parasolid.editSteps.step1')}
                    isActive={isSpeaking && currentIndex === 3}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
                <div className="step-description">
                    <img src={lightenBrepIcon} alt={t('common.lighten_b_rep_tool')} className="software-screenshot mt-4" style={{ height: 'auto', width: '200px' }} />
                </div>
              </div>


              <div className={`${getStepClass('p2-2')} ${currentIndex === 4 ? 'reading-active' : ''}`} data-reading-index="4" >
                <div className="step-header" style={{ marginTop: "-2rem" }}>
                  <span className="step-number">2 </span>
                  <KaraokeLessonText
                    as="span"
                    className="step-label"
                    text={t('parasolid.editSteps.step2')}
                    isActive={isSpeaking && currentIndex === 4}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
                <div className="step-description">
                    <img src={brepDialogImg} alt={t('common.level_settings_dialog')} className="software-screenshot mt-4" style={{width: "400px"}} />
                </div>
              </div>


              <div className={`${getStepClass('p2-3')} ${currentIndex === 5 ? 'reading-active' : ''}`} data-reading-index="5">
                <div className="step-header" style={{ marginTop: "-2rem" }}>
                  <span className="step-number">3 </span>
                  <KaraokeLessonText
                    as="span"
                    className="step-label"
                    text={t('parasolid.editSteps.step3')}
                    isActive={isSpeaking && currentIndex === 5}
                    currentCharIndex={currentCharIndex}
                  />
                   <img src={leftClick} alt={t('common.left_click')} className="screenshot-click--inline" style={{ width: '40px', margin: '0 8px' }} />
                </div>
                <div className={`step-label ${currentIndex === 6 ? 'reading-active' : ''}`} data-reading-index="6" style={{ marginTop: "-1rem", marginLeft: "3rem" }}>
                  <KaraokeLessonText
                    as="span"
                    text={t('parasolid.editSteps.step4')}
                    isActive={isSpeaking && currentIndex === 6}
                    currentCharIndex={currentCharIndex}
                  />
                  </div>
                <div className="step-description">
                    <img src={messagePaneImg} alt={t('common.message_pane_success')} className="software-screenshot mt-4" style={{ width: "450px", marginBottom: "1rem"}} />
                </div>
              </div>

              <div className={`${getStepClass('p2-4')} ${currentIndex === 7 ? 'reading-active' : ''}`} data-reading-index="7">
                <div className="step-header" style={{ marginTop: "-2rem" }}>
                  <span className="step-number">4 </span>
                  <KaraokeLessonText
                    as="span"
                    className="step-label"
                    text={t('parasolid.editSteps.step5')}
                    isActive={isSpeaking && currentIndex === 7}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
                <div className={`step-label ${currentIndex === 8 ? 'reading-active' : ''}`} data-reading-index="8" style={{ marginTop: "-1rem", marginLeft: "3rem" }}>
                  <KaraokeLessonText
                    as="span"
                    text={t('parasolid.editSteps.step6')}
                    isActive={isSpeaking && currentIndex === 8}
                    currentCharIndex={currentCharIndex}
                  />
                  </div>
              </div>

              <div className={`${getStepClass('p2-5')} ${currentIndex === 9 ? 'reading-active' : ''}`} data-reading-index="9">
                <div className="step-header" style={{ marginTop: "-2rem" }}>
                  <span className="step-number">5 </span>
                  <KaraokeLessonText
                    as="span"
                    className="step-label"
                    text={t('parasolid.editSteps.step7')}
                    isActive={isSpeaking && currentIndex === 9}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
                 <div className={`step-label ${currentIndex === 10 ? 'reading-active' : ''}`} data-reading-index="10" style={{ marginTop: "-1rem", marginLeft: "3rem"}}>
                  <KaraokeLessonText
                    as="span"
                    text={t('parasolid.editSteps.step8')}
                    isActive={isSpeaking && currentIndex === 10}
                    currentCharIndex={currentCharIndex}
                  />
                  </div>
                  <div className={`step-label ${currentIndex === 11 ? 'reading-active' : ''}`} data-reading-index="11" style={{ marginTop: "-1rem", marginLeft: "4rem" }}>
                  <KaraokeLessonText
                    as="p"
                    text={t('parasolid.editSteps.step9')}
                    isActive={isSpeaking && currentIndex === 11}
                    currentCharIndex={currentCharIndex}
                  />
                  </div>
                   <div className={`step-label ${currentIndex === 12 ? 'reading-active' : ''}`} data-reading-index="12" style={{ marginTop: "-1rem", marginLeft: "4rem" }}>
                  <KaraokeLessonText
                    as="p"
                    text={t('parasolid.editSteps.step10')}
                    isActive={isSpeaking && currentIndex === 12}
                    currentCharIndex={currentCharIndex}
                  />
                  </div>
                  <div className={`step-label ${currentIndex === 13 ? 'reading-active' : ''}`} data-reading-index="13" style={{ marginTop: "-1rem", marginLeft: "4rem" }}>
                  <KaraokeLessonText
                    as="p"
                    text={t('parasolid.editSteps.step11')}
                    isActive={isSpeaking && currentIndex === 13}
                    currentCharIndex={currentCharIndex}
                  />
                  </div>
                </div>

                <div className="step-description">
                  <img src={parasolid43Img} alt={t('common.material_and_data_entry_info')} className="software-screenshot mt-4" style={{marginBottom: "1rem", width: "900px"}} />
                  <img src={otherInfoImg} alt={t('common.other_information_reference')} className="software-screenshot mt-8" />

                </div>
              </div>
            )}



          <div className="lesson-navigation">
            <button className="nav-button" onClick={() => handlePrev()}><ChevronLeft size={18} /> {t('common.previous')}</button>
            <button className="nav-button next" onClick={() => handleNext()}>{nextLabel || t('common.next')} <ChevronRight size={18} /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParasolidLesson;

