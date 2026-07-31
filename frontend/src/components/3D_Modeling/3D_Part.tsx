import { useTranslation } from '../../context/LanguageContext';
import { ChevronLeft,ChevronRight } from 'lucide-react';
import React,{ useEffect,useState } from 'react';
import { useLessonCore } from "../../hooks/useLessonCore";
import { useTTSAutoplay } from "../../hooks/useTTSAutoplay";
import '../../styles/3D_Modeling/CourseLesson.css';
import { KaraokeLessonText } from "../KaraokeLessonText";

// --- Assets ---
import createPartIcon from '../../assets/3D_Image_File/3d_part1_create_3d_part.png';
import modalInfo1 from '../../assets/3D_Image_File/3d_part1_creating_3d_part_3.png';
import treeViewInfo1 from '../../assets/3D_Image_File/3d_part1_creating_3d_part_4.png';
import materialDescriptionImg from '../../assets/3D_Image_File/3d_part1_material_description.png';
import partMenu2 from '../../assets/3D_Image_File/3d_part2_change_3d_part_name.png';
import changePartIcon from '../../assets/3D_Image_File/3d_part2_change_3d_part_name_1.png';
import modalInfo2 from '../../assets/3D_Image_File/3d_part2_change_3d_part_name_3.png';
import treeViewInfo2 from '../../assets/3D_Image_File/3d_part2_change_3d_part_name_4.png';
import leftClick from '../../assets/3D_Image_File/left_click.png';

interface PartLessonProps {
  nextLabel?: string; subLessonId?: string; onNextLesson?: () => void; onPrevLesson?: () => void;
}

const PartLesson: React.FC<PartLessonProps> = ({
  subLessonId = '3d-part-1',
  onNextLesson,
  onPrevLesson,
  nextLabel
}) => {
  const { t } = useTranslation();

  const [activeTab, setActiveTab] = useState<"create" | "change">(() => {
    return (localStorage.getItem(`${subLessonId}-tab`) as any) || 'create';
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

  const createSteps = [
    t('part.createSteps.step0'),
    t('part.createSteps.step1'),
    t('part.createSteps.step2'),
    t('part.createSteps.step3'),
    t('part.changeSteps.step4'),
    t('part.createSteps.step5'),
    t('part.createSteps.step6')
  ];

  const changeSteps = [
    t('part.changeSteps.step0'),
    t('part.changeSteps.step1'),
    t('part.changeSteps.step2'),
    t('part.changeSteps.step3'),
    t('part.changeSteps.step4'),
    t('part.changeSteps.step5'),
    t('part.changeSteps.step6')
  ];
  const tabs = [
    { id: "create", label: t('part.tabs.create') || "Create 3D Part" },
    { id: "change", label: t('part.tabs.change') || "Change 3D Part Name" },
  ];

  const handleNext = (isAuto = false) => {
    stop();
    if (!isAuto) {
      sessionStorage.setItem('tts-autoplay-active', 'false');
    }
    if (activeTab === "create") setActiveTab("change");
    else if (onNextLesson) onNextLesson();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrev = (isAuto = false) => {
    stop();
    if (!isAuto) {
      sessionStorage.setItem('tts-autoplay-active', 'false');
    }
    if (activeTab === "change") setActiveTab("create");
    else if (onPrevLesson) onPrevLesson();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const introTitle = activeTab === 'create' ? t('common.part.title_create') : t('common.part.title_change');
  const introSubtitle = activeTab === 'create' ? t('common.part.desc_create') : t('common.part.desc_change');

  const commonIntroSteps = [
    introTitle,
    introSubtitle
  ];

  const createStepsTTS = [...commonIntroSteps, ...createSteps];
  const changeStepsTTS = [...commonIntroSteps, ...changeSteps];


  useEffect(() => {
    const steps = activeTab === 'create' ? createStepsTTS : changeStepsTTS;
    const startIdx = activeTab === 'create' ? 0 : 2;
    registerText(steps, startIdx);
  }, [activeTab, registerText]);

  const currentTabSteps = activeTab === 'create' ? createStepsTTS : changeStepsTTS;
  const tabsList = [{ id: 'create' }, { id: 'change' }];
  const startIdx2 = activeTab === 'create' ? 0 : 2;

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

        </h3>
        <KaraokeLessonText
          className={`lesson-subtitle ${currentIndex === 1 ? "reading-active" : ""}`}
          data-reading-index="1"
          text={introSubtitle}
          isActive={isSpeaking && currentIndex === 1}
          currentCharIndex={currentCharIndex}
        />
        <div>
          <img
            src={activeTab === 'create' ? partMenu2 : partMenu2}
            alt={activeTab === 'create' ? "3D Part Menu" : "Change 3D Part Menu"}
            className="software-screenshot"
            style={{ height: 'auto', width: "200px" }}
          />
        </div>
      </section>

      <div className="lesson-grid single-card">
        <div className="fade-in">
          {activeTab === 'create' && (
            <div className="lesson-card tab-content">
              <div className="card-header">
                <h4 className={`${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
                  <KaraokeLessonText
                    as="span"
                    text={t('part.createSteps.step0')}
                    isActive={isSpeaking && currentIndex === 2}
                    currentCharIndex={currentCharIndex}
                  />
                </h4>
              </div>
              <KaraokeLessonText
                as="p"
                className={`p-flush ${currentIndex === 3 ? 'reading-active' : ''}`}
                style={{ marginTop: "-2rem" }}
                data-reading-index="3"
                text={t('part.createSteps.step1')}
                isActive={isSpeaking && currentIndex === 3}
                currentCharIndex={currentCharIndex}
              />

              <div className={`instruction-step ${currentIndex === 4 ? 'reading-active' : ''}`} data-reading-index="4">
                <div className="step-header">
                  <span className="step-number">1 </span>
                  <KaraokeLessonText
                    as="span"
                    className="step-label"
                    text={t('part.createSteps.step2')}
                    isActive={isSpeaking && currentIndex === 4}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
                <div className="step-description">
                  <img src={createPartIcon} alt={t('common.create_3d_part_icon')} className="software-screenshot mt-4" style={{ height: 'auto', width: "200px" }} />
                </div>
              </div>

              <div className={`instruction-step ${currentIndex === 5 ? 'reading-active' : ''}`} data-reading-index="5">
                <div className="step-header" style={{ marginBottom: '-2rem' }}>
                  <span className="step-number">2 </span>
                  <KaraokeLessonText
                    as="span"
                    className="step-label"
                    text={t('part.createSteps.step3')}
                    isActive={isSpeaking && currentIndex === 5}
                    currentCharIndex={currentCharIndex}
                  />
                  <img src={leftClick} alt={t('common.left_click')} className="screenshot-click--inline" style={{ width: '40px', marginTop: '-2rem' }} />
                </div>
              </div>

              <div className={`instruction-step ${currentIndex === 6 ? 'reading-active' : ''}`} data-reading-index="6">
                <div className="step-header">
                  <span className="step-number">3 </span>
                  <KaraokeLessonText
                    as="span"
                    className="step-label"
                    text={t('part.changeSteps.step4')}
                    isActive={isSpeaking && currentIndex === 6}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
                <div className="step-description">
                  <img src={modalInfo1} alt={t('common.create_3d_part_window')} className="software-screenshot mt-4" style={{ marginBottom: '-2rem' }} />
                </div>
              </div>

              <div className={`instruction-step ${currentIndex === 7 ? 'reading-active' : ''}`} data-reading-index="7">
                <div className="step-header">
                  <span className="step-number">4 </span>
                  <KaraokeLessonText
                    as="span"
                    className="step-label"
                    text={t('part.createSteps.step5')}
                    isActive={isSpeaking && currentIndex === 7}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
                <div className="step-description">
                  <img src={treeViewInfo1} alt={t('common.tree_view_status')} className="software-screenshot mt-4" style={{ height: '300px' }} />
                </div>
              </div>

              <div className={`instruction-step ${currentIndex === 8 ? 'reading-active' : ''}`} data-reading-index="8">
                <div className="step-header">
                  <KaraokeLessonText
                    as="span"
                    className="step-label"
                    text={t('part.createSteps.step6')}
                    isActive={isSpeaking && currentIndex === 8}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
                <div className="step-description">
                  <img src={materialDescriptionImg} alt={t('common.material_description')} className="software-screenshot mt-4" style={{ width: '900px' }} />
                </div>
              </div>

              <div className="lesson-navigation">
                <button className="nav-button" onClick={() => handlePrev()}><ChevronLeft size={18} /> {t('common.previous')}</button>
                <button className="nav-button next" onClick={() => handleNext()}>{t('common.next')} <ChevronRight size={18} /></button>
              </div>
            </div>
          )}

          {activeTab === 'change' && (
            <div className="lesson-card tab-content">
              <div className="card-header mt-8">
                <h4 className={`${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
                  <KaraokeLessonText
                    as="span"
                    text={t('part.changeSteps.step0')}
                    isActive={isSpeaking && currentIndex === 2}
                    currentCharIndex={currentCharIndex}
                  />
                </h4>
              </div>
              <KaraokeLessonText
                as="p"
                className={`p-flush ${currentIndex === 3 ? 'reading-active' : ''}`}
                style={{ marginTop: "-2rem" }}
                data-reading-index="3"
                text={t('part.changeSteps.step1')}
                isActive={isSpeaking && currentIndex === 3}
                currentCharIndex={currentCharIndex}
              />

              <div className={`instruction-step ${currentIndex === 4 ? 'reading-active' : ''}`} data-reading-index="4">
                <div className="step-header">
                  <span className="step-number">1 </span>
                  <KaraokeLessonText
                    as="span"
                    className="step-label"
                    text={t('part.changeSteps.step2')}
                    isActive={isSpeaking && currentIndex === 4}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
                <div className="step-description">
                  <img src={changePartIcon} alt={t('common.change_3d_part_name_icon')} className="software-screenshot mt-4" style={{ height: 'auto', width: "200px" }} />
                </div>
              </div>

              <div className={`instruction-step ${currentIndex === 5 ? 'reading-active' : ''}`} data-reading-index="5">
                <div className="step-header" style={{ marginBottom: '-2rem' }}>
                  <span className="step-number">2 </span>
                  <KaraokeLessonText
                    as="span"
                    className="step-label"
                    text={t('part.changeSteps.step3')}
                    isActive={isSpeaking && currentIndex === 5}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
              </div>

              <div className={`instruction-step ${currentIndex === 6 ? 'reading-active' : ''}`} data-reading-index="6">
                <div className="step-header">
                  <span className="step-number">3 </span>
                  <KaraokeLessonText
                    as="span"
                    className="step-label"
                    text={t('part.changeSteps.step4')}
                    isActive={isSpeaking && currentIndex === 6}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
                <div className="step-description">
                  <img src={modalInfo2} alt={t('common.change_name_window')} className="software-screenshot mt-4" style={{ width: '900px', marginBottom: "-2rem" }} />
                </div>
              </div>

              <div className={`instruction-step ${currentIndex === 7 ? 'reading-active' : ''}`} data-reading-index="7">
                <div className="step-header">
                  <span className="step-number">4 </span>
                  <KaraokeLessonText
                    as="span"
                    className="step-label"
                    style={{ marginTop: "2rem" }}
                    text={t('part.changeSteps.step5')}
                    isActive={isSpeaking && currentIndex === 7}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
                <div className="step-description">
                  <img src={treeViewInfo2} alt={t('common.dialog_and_tree_view_update')} className="software-screenshot screenshot-wide mt-4" />
                </div>

                <div className={`instruction-box ${currentIndex === 8 ? "reading-active" : ""}`} data-reading-index="8" style={{ marginTop: "2rem" }}>
                  <KaraokeLessonText
                    as="p"
                    className="p-flush red-text"
                    text={t('part.changeSteps.step6')}
                    isActive={isSpeaking && currentIndex === 8}
                    currentCharIndex={currentCharIndex}
                  />
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

export default PartLesson;

