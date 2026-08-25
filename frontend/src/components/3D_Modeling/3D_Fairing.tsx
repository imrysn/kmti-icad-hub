import { useTranslation } from '../../context/LanguageContext';
import { ChevronLeft,ChevronRight } from 'lucide-react';
import React,{ useEffect,useState } from 'react';
import { useLessonCore } from '../../hooks/useLessonCore';
import { useTTSAutoplay } from "../../hooks/useTTSAutoplay";
import './CourseLesson.css';
import { KaraokeLessonText } from "../KaraokeLessonText";

/* Fairing Assets */
import chamferIcon from '../../assets/3d-images/fairing_chamfer.jpg';
import chamferResult2 from '../../assets/3d-images/fairing_chamfer11.png';
import chamferEntry from '../../assets/3d-images/fairing_chamfer_1.png';
import chamferResult from '../../assets/3d-images/fairing_chamfer_2.png';
import filletIcon from '../../assets/3d-images/fairing_fillet_1.png';
import filletEntry from '../../assets/3d-images/fairing_fillet_2.png';
import filletResult from '../../assets/3d-images/fairing_fillet_3.png';
import shellIcon from '../../assets/3d-images/fairing_shell_1.png';
import shellFaces from '../../assets/3d-images/fairing_shell_2.png';
import shellResult from '../../assets/3d-images/fairing_shell_3.1.png';
import shellEntry from '../../assets/3d-images/fairing_shell_3.png';
import leftClick from '../../assets/3d-images/left_click.png';

interface FairingLessonProps {
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
  nextLabel?: string;
}

const FairingLesson: React.FC<FairingLessonProps> = ({ onNextLesson, onPrevLesson, nextLabel }) => {
  const { t } = useTranslation();

  const [activeTab, setActiveTab] = useState<'chamfer' | 'fillet' | 'shell'>(() => {
    return (localStorage.getItem('fairing-tab') as any) || 'chamfer';
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
  } = useLessonCore("fairing");

  useEffect(() => {
    localStorage.setItem('fairing-tab', activeTab);
  }, [activeTab]);

  const chamferSteps = [
    t('fairing.chamferSteps.step0'),
    t('fairing.chamferSteps.step1'),
    t('fairing.chamferSteps.step2'),
    t('fairing.chamferSteps.step3'),
    t('fairing.chamferSteps.step4'),
    t('fairing.chamferSteps.step5'),
    t('fairing.shellSteps.step5')
  ];

  const filletSteps = [
    t('fairing.filletSteps.step0'),
    t('fairing.filletSteps.step1'),
    t('fairing.filletSteps.step2'),
    t('fairing.filletSteps.step3'),
    t('fairing.filletSteps.step4'),
    t('fairing.filletSteps.step5'),
    t('fairing.shellSteps.step5')
  ];

  const shellSteps = [
    t('fairing.shellSteps.step0'),
    t('fairing.shellSteps.step1'),
    t('fairing.shellSteps.step2'),
    t('fairing.shellSteps.step3'),
    t('fairing.shellSteps.step4'),
    t('fairing.shellSteps.step5')
  ];

  const handleNext = (isAuto = false) => {
    stop();
    if (!isAuto) {
      sessionStorage.setItem('tts-autoplay-active', 'false');
    }
    if (activeTab === 'chamfer') setActiveTab('fillet');
    else if (activeTab === 'fillet') setActiveTab('shell');
    else if (onNextLesson) onNextLesson();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrev = (isAuto = false) => {
    stop();
    if (!isAuto) {
      sessionStorage.setItem('tts-autoplay-active', 'false');
    }
    if (activeTab === 'fillet') setActiveTab('chamfer');
    else if (activeTab === 'shell') setActiveTab('fillet');
    else if (onPrevLesson) onPrevLesson();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const introTitle = t('fairing.introTitle');
  const introSubtitle = t('fairing.introSubtitle');

  const commonIntroSteps = [
    introTitle,
    introSubtitle
  ];

  const chamferStepsTTS = [...commonIntroSteps, ...chamferSteps];
  const filletStepsTTS = [...commonIntroSteps, ...filletSteps];
  const shellStepsTTS = [...commonIntroSteps, ...shellSteps];


  useEffect(() => {
    const steps = activeTab === 'chamfer' ? chamferStepsTTS :
                  activeTab === 'fillet' ? filletStepsTTS : shellStepsTTS;
    const startIdx = activeTab === 'chamfer' ? 0 : 2;
    registerText(steps, startIdx);
  }, [activeTab, registerText]);

  const currentTabSteps = activeTab === 'chamfer' ? chamferStepsTTS :
                          activeTab === 'fillet' ? filletStepsTTS : shellStepsTTS;
  const tabsList = [{ id: 'chamfer' }, { id: 'fillet' }, { id: 'shell' }];
  const startIdx2 = activeTab === 'chamfer' ? 0 : 2;

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
    <div className="course-lesson-container" ref={containerRef}>
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      <div className="lesson-tabs">
        <button key="chamfer" className={`tab-button ${activeTab === 'chamfer' ? 'active' : ''}`} onClick={() => { stop(); sessionStorage.setItem('tts-autoplay-active', 'false'); setActiveTab('chamfer'); }}>{t("fairing.tab.chamfer")}</button>
        <button key="fillet" className={`tab-button ${activeTab === 'fillet' ? 'active' : ''}`} onClick={() => { stop(); sessionStorage.setItem('tts-autoplay-active', 'false'); setActiveTab('fillet'); }}>{t("fairing.tab.fillet")}</button>
        <button key="shell" className={`tab-button ${activeTab === 'shell' ? 'active' : ''}`} onClick={() => { stop(); sessionStorage.setItem('tts-autoplay-active', 'false'); setActiveTab('shell'); }}>{t("fairing.tab.shell")}</button>
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
          <img src={chamferIcon} alt={t('common.fairing_menu')} className="software-screenshot mt-4" style={{ height: '350px' }} />
        </div>
      </section>

      <div className="lesson-grid single-card">
        {activeTab === 'chamfer' && (
          <div className="lesson-card tab-content fade-in">
            <div className="card-header">
              <h4 className={`${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
                <KaraokeLessonText
                  as="span"
                  text={t('fairing.chamferSteps.step0')}
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
              text={t('fairing.chamferSteps.step1')}
              isActive={isSpeaking && currentIndex === 3}
              currentCharIndex={currentCharIndex}
            />

            <div className={`instruction-step ${currentIndex === 4 ? 'reading-active' : ''}`} data-reading-index="4">
              <div className="step-header">
                <span className="step-number">1 </span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text={t('fairing.chamferSteps.step2')}
                  isActive={isSpeaking && currentIndex === 4}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <img src={chamferEntry} alt={t('common.chamfer_item_entry')} className="software-screenshot mt-4" style={{ width: '200px', marginBottom: '-2rem' }} />
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 5 ? 'reading-active' : ''}`} data-reading-index="5">
              <div className="step-header">
                <span className="step-number">2 </span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text={t('fairing.chamferSteps.step3')}
                  isActive={isSpeaking && currentIndex === 5}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <img src={chamferResult} alt={t('common.chamfer_process')} className="software-screenshot mt-4" style={{ width: '500px', marginBottom: '-1rem' }} />
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 6 ? 'reading-active' : ''}`} data-reading-index="6">
              <div className="step-header">
                <span className="step-number">3 </span>
                <span className="step-label" style={{ marginTop: "-1.5rem" }}>
                  <KaraokeLessonText
                    as="span"
                    text={t('fairing.chamferSteps.step4')}
                    isActive={isSpeaking && currentIndex === 6}
                    currentCharIndex={currentCharIndex}
                  />
                  <img src={leftClick} alt={t('common.left_click')} className="screenshot-click--inline" style={{ width: '40px', margin: '0 8px' }} />
                </span>
              </div>
              <div className={`instruction-box ${currentIndex === 7 ? "reading-active" : ""}`} data-reading-index="7" style={{ marginTop: '1rem' }}>
                <KaraokeLessonText
                  as="p"
                  className="p-flush red-text"
                  text={t('fairing.chamferSteps.step5')}
                  isActive={isSpeaking && currentIndex === 7}
                  currentCharIndex={currentCharIndex}
                />
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 8 ? 'reading-active' : ''}`} data-reading-index="8">
              <div className="card-header">
                <h4 className={`${currentIndex === 8 ? 'reading-active' : ''}`} data-reading-index="8">
                  <KaraokeLessonText
                    as="span"
                    text={t('fairing.shellSteps.step5')}
                    isActive={isSpeaking && currentIndex === 8}
                    currentCharIndex={currentCharIndex}
                  />
                </h4>
              </div>
              <img src={chamferResult2} alt={t('common.chamfer_result')} className="software-screenshot screenshot-medium mt-8" style={{ width: '700px' }} />
            </div>

            <div className="lesson-navigation">
              <button className="nav-button" onClick={() => handlePrev()}><ChevronLeft size={18} /> {t('common.previous')}</button>
              <button className="nav-button next" onClick={() => handleNext()}>{t('common.next')} <ChevronRight size={18} /></button>
            </div>
          </div>
        )}

        {activeTab === 'fillet' && (
          <div className="lesson-card tab-content fade-in">
            <div className="card-header">
              <h4 className={`${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
                <KaraokeLessonText
                  as="span"
                  text={t('fairing.filletSteps.step0')}
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
              text={t('fairing.filletSteps.step1')}
              isActive={isSpeaking && currentIndex === 3}
              currentCharIndex={currentCharIndex}
            />



            <div className={`instruction-step ${currentIndex === 4 ? 'reading-active' : ''}`} data-reading-index="4">
              <div className="step-header">
                <span className="step-number">1 </span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text={t('fairing.filletSteps.step2')}
                  isActive={isSpeaking && currentIndex === 4}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <img src={filletIcon} alt={t('common.fillet_icon')} className="software-screenshot mt-4" style={{ width: '200px', marginBottom: '-3rem' }} />
              </div>
            </div>


            <div className={`instruction-step ${currentIndex === 5 ? 'reading-active' : ''}`} data-reading-index="5">
              <div className="step-header">
                <span className="step-number">2 </span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text={t('fairing.filletSteps.step3')}
                  isActive={isSpeaking && currentIndex === 5}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <img src={filletEntry} alt={t('common.fillet_item_entry')} className="software-screenshot mt-4" style={{ width: '500px', marginBottom: '-3rem' }} />
              </div>
            </div>


            <div className={`instruction-step ${currentIndex === 6 ? 'reading-active' : ''}`} data-reading-index="6">
              <div className="step-header">
                <span className="step-number">3 </span>
                <span className="step-label" style={{ marginTop: '-1.5rem' }}>
                  <KaraokeLessonText
                    as="span"
                    text={t('fairing.filletSteps.step4')}
                    isActive={isSpeaking && currentIndex === 6}
                    currentCharIndex={currentCharIndex}
                  />
                  <img src={leftClick} alt={t('common.left_click')} className="screenshot-click--inline" style={{ width: '40px', margin: '0 8px' }} />
                </span>
              </div>
            </div>
            <div className={`instruction-box ${currentIndex === 7 ? "reading-active" : ""}`} data-reading-index="7" style={{ marginTop: '-1.5rem' }}>
              <KaraokeLessonText
                as="p"
                className="p-flush red-text"
                text={t('fairing.filletSteps.step5')}
                isActive={isSpeaking && currentIndex === 7}
                currentCharIndex={currentCharIndex}
              />
            </div>

            <div className={`instruction-step ${currentIndex === 8 ? 'reading-active' : ''}`} data-reading-index="8">
              <div className="card-header">
                <h4 className={`${currentIndex === 8 ? 'reading-active' : ''}`} data-reading-index="8">
                  <KaraokeLessonText
                    as="span"
                    text={t('fairing.shellSteps.step5')}
                    isActive={isSpeaking && currentIndex === 8}
                    currentCharIndex={currentCharIndex}
                  />
                </h4>
              </div>
              <img src={filletResult} alt={t('common.fillet_result')} className="software-screenshot screenshot-medium mt-8" style={{ width: '350px' }} />
            </div>

            <div className="lesson-navigation">
              <button className="nav-button" onClick={() => handlePrev()}><ChevronLeft size={18} /> {t('common.previous')}</button>
              <button className="nav-button next" onClick={() => handleNext()}>{t('common.next')} <ChevronRight size={18} /></button>
            </div>
          </div>
        )}

        {activeTab === 'shell' && (
          <div className="lesson-card tab-content fade-in">
            <div className="card-header">
              <h4 className={`${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
                <KaraokeLessonText
                  as="span"
                  text={t('fairing.shellSteps.step0')}
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
              text={t('fairing.shellSteps.step1')}
              isActive={isSpeaking && currentIndex === 3}
              currentCharIndex={currentCharIndex}
            />


            <div className={`instruction-step ${currentIndex === 4 ? 'reading-active' : ''}`} data-reading-index="4">
              <div className="step-header">
                <span className="step-number">1 </span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text={t('fairing.shellSteps.step2')}
                  isActive={isSpeaking && currentIndex === 4}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <img src={shellIcon} alt={t('common.shell_icon')} className="software-screenshot mt-4" style={{ width: '200px', marginBottom: "-1rem" }} />
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 5 ? 'reading-active' : ''}`} data-reading-index="5">
              <div className="step-header">
                <span className="step-number">2 </span>
                <span className="step-label" style={{ marginTop: "-1.5rem" }}>
                  <KaraokeLessonText
                    as="span"
                    text={t('fairing.shellSteps.step3')}
                    isActive={isSpeaking && currentIndex === 5}
                    currentCharIndex={currentCharIndex}
                  />
                  <img src={leftClick} alt={t('common.left_click')} className="screenshot-click--inline" style={{ width: '40px', margin: '0 8px' }} />
                </span>
              </div>
              <div className="step-description">
                <img src={shellFaces} alt={t('common.select_endfaces')} className="software-screenshot screenshot-medium mt-4" style={{ width: '500px' }} />
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 6 ? 'reading-active' : ''}`} data-reading-index="6">
              <div className="step-header">
                <span className="step-number">3 </span>
                <span className="step-label" style={{ marginTop: "-1.5rem" }}>
                  <KaraokeLessonText
                    as="span"
                    text={t('fairing.shellSteps.step4')}
                    isActive={isSpeaking && currentIndex === 6}
                    currentCharIndex={currentCharIndex}
                  />
                  <img src={leftClick} alt={t('common.left_click')} className="screenshot-click--inline" style={{ width: '40px', margin: '0 8px' }} />
                </span>
              </div>
              <div className="step-description">
                <img src={shellEntry} alt={t('common.shell_thickness_entry')} className="software-screenshot screenshot-wide mt-4" />
              </div>
            </div>


            <div className={`instruction-step ${currentIndex === 7 ? 'reading-active' : ''}`} data-reading-index="7">
              <div className="card-header">
                <h4 className={`${currentIndex === 7 ? 'reading-active' : ''}`} data-reading-index="7">
                  <KaraokeLessonText
                    as="span"
                    text={t('fairing.shellSteps.step5')}
                    isActive={isSpeaking && currentIndex === 7}
                    currentCharIndex={currentCharIndex}
                  />
                </h4>
              </div>
              <img src={shellResult} alt={t('common.shell_result')} className="software-screenshot screenshot-medium mt-8" style={{ width: '490px' }} />
            </div>

            <div className="lesson-navigation">
              <button className="nav-button" onClick={() => handlePrev()}><ChevronLeft size={18} /> {t('common.previous')}</button>
              <button className="nav-button next" onClick={() => handleNext()}>{nextLabel || t('common.next')} <ChevronRight size={18} /></button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FairingLesson;
