import { useTranslation } from '../../context/LanguageContext';
import { ChevronLeft,ChevronRight } from 'lucide-react';
import React,{ useEffect,useState } from "react";
import { useLessonCore } from "../../hooks/useLessonCore";
import { useTTSAutoplay } from "../../hooks/useTTSAutoplay";
import "../../styles/3D_Modeling/CourseLesson.css";
import { KaraokeLessonText } from "../KaraokeLessonText";
import { ReadAloudButton } from "../ReadAloudButton";

/* Material Setting (1) Assets */
import leftClick from "../../assets/3D_Image_File/left_click.png";
import materialListImg from "../../assets/3D_Image_File/material_setting1_material_list.png";
import materialSettingImg from "../../assets/3D_Image_File/material_setting1_material_setting.png";
import step4ResultImg from "../../assets/3D_Image_File/material_setting1_material_setting_4.png";
import step5DialogImg from "../../assets/3D_Image_File/material_setting1_material_setting_5.png";
import setMaterialIcon from "../../assets/3D_Image_File/material_setting1_set_material.png";

/* Material Setting (2) Assets */
import mat2RefImg from "../../assets/3D_Image_File/material_setting2_material.png";
import mat2VerifyImg from "../../assets/3D_Image_File/material_setting2_material_not_included.png";

interface MaterialSettingLessonProps {
  nextLabel?: string;
  subLessonId?: string;
  onNextLesson?: () => void; 
  onPrevLesson?: () => void;
}

const MaterialSettingLesson: React.FC<MaterialSettingLessonProps> = ({ subLessonId = "material-1", onNextLesson, onPrevLesson, nextLabel }) => {
  const { t } = useTranslation();

  const [activeTab, setActiveTab] = useState<"set" | "unlisted" | "procedure">(() => {
    return (localStorage.getItem(`${subLessonId}-tab`) as any) || 'set';
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

  const material1Steps = [
    t('materialsetting.material1Steps.step0'),
    t('materialsetting.material1Steps.step1'),
    t('materialsetting.material1Steps.step2'),
    t('materialsetting.material1Steps.step3'),
    t('materialsetting.material1Steps.step4'),
    t('materialsetting.material1Steps.step5'),
    t('materialsetting.material1Steps.step6'),
    t('materialsetting.material1Steps.step7'),
    t('materialsetting.material1Steps.step8'),
    t('materialsetting.material1Steps.step9'),
    t('materialsetting.material1Steps.step10'),
    t('materialsetting.material1Steps.step11')
  ];

  const material2Steps = [
    t('materialsetting.material2Steps.step0'),
    t('materialsetting.material2Steps.step1'),
    t('materialsetting.material2Steps.step2')
  ];

  const tabs = [
    { id: "set", label: t('materialsetting.material1Steps.step0') },
    { id: "unlisted", label: "UNLISTED MATERIALS" },
  ];

  const handleNext = (isAuto = false) => {
    stop();
    if (!isAuto) {
      sessionStorage.setItem('tts-autoplay-active', 'false');
    }
    if (activeTab === "set") setActiveTab("unlisted");
    else if (onNextLesson) onNextLesson();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrev = (isAuto = false) => {
    stop();
    if (!isAuto) {
      sessionStorage.setItem('tts-autoplay-active', 'false');
    }
    if (activeTab === "unlisted") setActiveTab("set");
    else if (onPrevLesson) onPrevLesson();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const introTitle = t('materialsetting.introTitle');
  const introSubtitle = t('materialsetting.introSubtitle');

  const commonIntroSteps = [
    introTitle,
    introSubtitle
  ];

  const material1StepsTTS = [...commonIntroSteps, ...material1Steps];
  const material2StepsTTS = [...commonIntroSteps, ...material2Steps];


  useEffect(() => {
    const steps = activeTab === 'set' ? material1StepsTTS : material2StepsTTS;
    const startIdx = activeTab === 'set' ? 0 : 2;
    registerText(steps, startIdx);
  }, [activeTab, registerText]);

  const currentTabSteps = activeTab === 'set' ? material1StepsTTS : material2StepsTTS;
  const tabsList = [{ id: 'set' }, { id: 'unlisted' }];
  const startIdx2 = activeTab === 'set' ? 0 : 2;

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
          <ReadAloudButton isSpeaking={isSpeaking} onStart={() => {
            const steps = activeTab === 'set' ? material1Steps : material2Steps;
          speak([introTitle, introSubtitle, ...steps], 0);
          }} onStop={stop} />
        </h3>
        <KaraokeLessonText
          className={`lesson-subtitle ${currentIndex === 1 ? "reading-active" : ""}`}
          data-reading-index="1"
          text={introSubtitle}
          isActive={isSpeaking && currentIndex === 1}
          currentCharIndex={currentCharIndex}
        />
        {activeTab === 'set' && (
          <img src={materialSettingImg} alt={t('materialsetting.introTitle')} className="software-screenshot" style={{ height: 'auto', width: "200px", marginTop: "1rem" }} />
        )}
      </section>

      <div className="lesson-grid single-card">
        <div className="fade-in">
          {activeTab === 'set' && (
            <div className="lesson-card tab-content">
              <div className="card-header">
                <h4 className={`${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
                  <KaraokeLessonText
                    as="span"
                    text={t('materialsetting.material1Steps.step0')}
                    isActive={isSpeaking && currentIndex === 2}
                    currentCharIndex={currentCharIndex}
                  />
                </h4>
              </div>

              {/* Step 1 */}
              <div className={`instruction-step ${currentIndex === 3 ? "reading-active" : ""}`} data-reading-index="3">
                <div className="step-header">
                  <span className="step-number">1 </span>
                  <KaraokeLessonText
                    as="span"
                    className="step-label"
                    text={t('materialsetting.material1Steps.step1')}
                    isActive={isSpeaking && currentIndex === 3}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
                <div className="step-description">
                  <img src={setMaterialIcon} alt={t('common.set_material_icon')} className="software-screenshot mt-4" style={{ height: 'auto', width: "200px", marginBottom: '-3rem' }} />
                </div>
              </div>


              {/* Step 2 */}
              <div className={`instruction-step ${currentIndex === 4 ? "reading-active" : ""}`} data-reading-index="4">
                <div className="step-header" style={{ marginTop: "-1rem" }}>
                  <span className="step-number">2 </span>
                  <KaraokeLessonText
                    as="span"
                    className="step-label"
                    text={t('materialsetting.material1Steps.step2')}
                    isActive={isSpeaking && currentIndex === 4}
                    currentCharIndex={currentCharIndex}
                  />
                  <img src={leftClick} alt={t('common.left_click')} className="screenshot-click--inline" style={{ width: '40px', margin: '0 8px', marginTop: "-2rem" }} />
                </div>
              </div>


              {/* Step 3 */}
              <div className={`instruction-step ${currentIndex === 5 ? "reading-active" : ""}`} data-reading-index="5" style={{ marginTop: "-2rem" }}>
                <div className="step-header">
                  <span className="step-number">3 </span>
                  <KaraokeLessonText
                    as="span"
                    className="step-label"
                    text={t('materialsetting.material1Steps.step3')}
                    isActive={isSpeaking && currentIndex === 5}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
                <div className="step-description">
                  <KaraokeLessonText
                    className="p-flush mb-4"
                    text={t('materialsetting.material1Steps.step4')}
                    isActive={isSpeaking && currentIndex === 6}
                    currentCharIndex={currentCharIndex}
                  />
                  <img src={materialListImg} alt={t('common.material_settings_window')} className="software-screenshot mt-4" style={{ width: '900px', marginTop: "1rem" }} />
                </div>
              </div>

              {/* Step 4 */}
              <div className={`instruction-step ${currentIndex === 7 ? "reading-active" : ""}`} data-reading-index="7">
                <div className="step-header">
                  <span className="step-number">4 </span>
                  <KaraokeLessonText
                    as="span"
                    className="step-label"
                    text={t('materialsetting.material1Steps.step5')}
                    isActive={isSpeaking && currentIndex === 7}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
                <div className="step-description">
                  <KaraokeLessonText
                    className="p-flush mb-4"
                    text={t('materialsetting.material1Steps.step6')}
                    isActive={isSpeaking && currentIndex === 8}
                    currentCharIndex={currentCharIndex}
                  />
                  <img src={step4ResultImg} alt={t('common.material_distinction_result')} className="software-screenshot screenshot-wide mt-4" style={{ marginTop: "1rem" }} />
                </div>
              </div>

              {/* Step 5 */}
              <div className={`instruction-step ${currentIndex === 9 ? "reading-active" : ""}`} data-reading-index="9">
                <div className="step-header">
                  <span className="step-number">5 </span>
                  <KaraokeLessonText
                    as="span"
                    className="step-label"
                    text={t('materialsetting.material1Steps.step7')}
                    isActive={isSpeaking && currentIndex === 9}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
                <div className="step-description">
                  <KaraokeLessonText
                    className="p-flush mb-4"
                    text={t('materialsetting.material1Steps.step8')}
                    isActive={isSpeaking && currentIndex === 10}
                    currentCharIndex={currentCharIndex}
                  />
                </div>

                <div className="step-description">
                  <img src={step5DialogImg} alt={t('common.material_overwrite_dialog')} className="software-screenshot screenshot-medium mt-4" style={{ height: '190px' }} />
                </div>
              </div>

              <div className="step-description">
                <KaraokeLessonText
                  className="p-flush mb-4"
                  text={t('materialsetting.material1Steps.step9')}
                  isActive={isSpeaking && currentIndex === 11}
                  currentCharIndex={currentCharIndex}
                />
              </div>

              <div className="step-description" style={{ marginTop: "-1rem" }}>
                <KaraokeLessonText
                  className="p-flush mb-4"
                  text={t('materialsetting.material1Steps.step10')}
                  isActive={isSpeaking && currentIndex === 12}
                  currentCharIndex={currentCharIndex}
                />
              </div>

              <div className="step-description" style={{ marginTop: "-1rem" }}>
                <KaraokeLessonText
                  className="p-flush mb-4"
                  text={t('materialsetting.material1Steps.step11')}
                  isActive={isSpeaking && currentIndex === 13}
                  currentCharIndex={currentCharIndex}
                />
              </div>


              <div className="lesson-navigation">
                <button className="nav-button" onClick={() => handlePrev()}><ChevronLeft size={18} /> {t('common.previous')}</button>
                <button className="nav-button next" onClick={() => handleNext()}>{t('common.next')} <ChevronRight size={18} /></button>
              </div>
            </div>
          )}

          {activeTab === 'unlisted' && (
            <div className="lesson-card tab-content">
              <div className="card-header">
                <h4 className={`${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
                  <KaraokeLessonText
                    as="span"
                    text={t('materialsetting.material2Steps.step0')}
                    isActive={isSpeaking && currentIndex === 2}
                    currentCharIndex={currentCharIndex}
                  />
                </h4>
              </div>

              <div className={`instruction-step ${currentIndex === 3 ? "reading-active" : ""}`} data-reading-index="3">
                <img src={mat2VerifyImg} alt={t('common.2d_drawing_reference')} className="software-screenshot screenshot-wide mt-4" style={{ marginBottom: "1rem" }} />
                <div className="instruction-box instruction-box--warning mt-8">
                  <KaraokeLessonText
                    className="p-flush"
                    text={t('materialsetting.material2Steps.step1')}
                    isActive={isSpeaking && currentIndex === 3}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
                <img src={mat2RefImg} alt={t('common.3d_information_verification')} className="software-screenshot screenshot-wide mt-8" style={{ marginTop: "1rem" }} />
              </div>

              <div className={`instruction-step ${currentIndex === 4 ? "reading-active" : ""}`} data-reading-index="4">
                <div className="card-header">
                  <h4 className={`${currentIndex === 4 ? 'reading-active' : ''}`} data-reading-index="4">
                    <KaraokeLessonText
                      as="span"
                      text={t('materialsetting.material2Steps.step2')}
                      isActive={isSpeaking && currentIndex === 4}
                      currentCharIndex={currentCharIndex}
                    />
                  </h4>
                </div>
                <div className="lesson-table-container" style={{ marginTop: "2rem", maxWidth: "900px" }}>
                  <table className="lesson-table">
                    <thead>
                      <tr>
                        <th>{t('common.table.material')}</th>
                        <th>{t('common.table.equivalent_material')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>S35C</td>
                        <td>S45C</td>
                      </tr>
                      <tr>
                        <td>C1220</td>
                        <td>C1100</td>
                      </tr>
                      <tr>
                        <td>CuP</td>
                        <td>C1100</td>
                      </tr>
                      <tr>
                        <td>C1020</td>
                        <td>C1100</td>
                      </tr>
                      <tr>
                        <td>BSP</td>
                        <td>C2680</td>
                      </tr>
                      <tr>
                        <td>PVC</td>
                        <td>VP(塩化ビニール管)</td>
                      </tr>
                    </tbody>
                  </table>
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

export default MaterialSettingLesson;

