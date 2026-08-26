import { useTranslation } from '../../context/LanguageContext';
import { ChevronLeft,ChevronRight } from 'lucide-react';
import React,{ useEffect,useState } from "react";
import { useLessonCore } from "../../hooks/useLessonCore";
import { useTTSAutoplay } from "../../hooks/useTTSAutoplay";
import './CourseLesson.css';
import { KaraokeLessonText } from "../KaraokeLessonText";
import { ReadAloudButton } from "../ReadAloudButton";

/* Shared Assets */
import mirrorNotes from "../../assets/3d-images/mirrored_notes.png";
import mirrorCopyTool from "../../assets/3d-images/mirrored_part1_mirror_copy_tool.jpg";
import mirrorPartA from "../../assets/3d-images/mirrored_part1_mirror_part.png";
import normalPartA from "../../assets/3d-images/mirrored_part1_normal_part.png";
import originLocation from "../../assets/3d-images/mirrored_part2_location_of_origin.png";
import mirrorTool from "../../assets/3d-images/mirrored_part2_mirror.png";
import pick3Points from "../../assets/3d-images/mirrored_part2_pick3_points.png";
import pick3PointsPartA from "../../assets/3d-images/mirrored_part2_pick3_points_part_a.png";

interface MirroredPartLessonProps {
  nextLabel?: string;
  subLessonId?: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const MirroredPartLesson: React.FC<MirroredPartLessonProps> = ({ subLessonId = "mirrored-1", onNextLesson, onPrevLesson, nextLabel }) => {
  const { t } = useTranslation();

  const [activeTab, setActiveTab] = useState<"mirrored-part" | "3d-modeling">(() => {
    return (localStorage.getItem('mirroredActiveTab') as "mirrored-part" | "3d-modeling") || "mirrored-part";
  });

  useEffect(() => {
    localStorage.setItem('mirroredActiveTab', activeTab);
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

  const mirrored1Steps = [
    t('mirroredpart.mirrored1Steps.step0'),
    t('mirroredpart.mirrored1Steps.step1'),
    t('mirroredpart.mirrored1Steps.step2'),
    t('mirroredpart.mirrored1Steps.step3'),
    t('mirroredpart.mirrored1Steps.step4'),
    t('mirroredpart.mirrored1Steps.step5')
  ];

  const mirrored2Steps = [
    t('mirroredpart.mirrored2Steps.step0'),
    t('mirroredpart.mirrored2Steps.step1'),
    t('mirroredpart.mirrored2Steps.step2'),
    t('mirroredpart.mirrored2Steps.step3'),
    t('mirroredpart.mirrored2Steps.step4')
  ];

  const introTitle = activeTab === 'mirrored-part' ? t('common.mirror.title1') : t('common.mirror.title2');
  const introSubtitle = activeTab === 'mirrored-part' ? t('common.mirror.desc1') : t('common.mirror.desc2');

  const commonIntroSteps = [
    introTitle,
    introSubtitle
  ];

  const mirrored1StepsTTS = [...commonIntroSteps, ...mirrored1Steps];
  const mirrored2StepsTTS = [...commonIntroSteps, ...mirrored2Steps];

  const handleTabChange = (tab: "mirrored-part" | "3d-modeling") => {
    stop();
    sessionStorage.setItem('tts-autoplay-active', 'false');
    setActiveTab(tab);
  };

  const handleNext = (isAuto = false) => {
    stop();
    if (!isAuto) {
      sessionStorage.setItem('tts-autoplay-active', 'false');
    }
    if (activeTab === "mirrored-part") {
      setActiveTab("3d-modeling");
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
    if (activeTab === "3d-modeling") {
      setActiveTab("mirrored-part");
    } else if (onPrevLesson) {
      onPrevLesson();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const steps = activeTab === 'mirrored-part' ? mirrored1StepsTTS : mirrored2StepsTTS;
    const startIdx = activeTab === 'mirrored-part' ? 0 : 2;
    registerText(steps, startIdx);
  }, [activeTab, registerText]);

  const currentTabSteps = activeTab === 'mirrored-part' ? mirrored1StepsTTS : mirrored2StepsTTS;
  const startIdx2 = activeTab === 'mirrored-part' ? 0 : 2;
  const tabsList = [{ id: 'mirrored-part' }, { id: '3d-modeling' }];

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

  const isMirrored1 = activeTab === "mirrored-part";

  return (
    <div className={`course-lesson-container`} ref={containerRef}>
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      <div className="lesson-tabs">
        <button
          className={`tab-button ${activeTab === 'mirrored-part' ? 'active' : ''}`}
          onClick={() => handleTabChange('mirrored-part')}
        >
          {t('common.mirror.tab1')}
        </button>
        <button
          className={`tab-button ${activeTab === '3d-modeling' ? 'active' : ''}`}
          onClick={() => handleTabChange('3d-modeling')}
        >
          {t('common.mirror.tab2')}
        </button>
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
            const steps = activeTab === 'mirrored-part' ? mirrored1Steps : mirrored2Steps;
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
      </section>

      <div className="lesson-grid single-card">
        <div className="lesson-card tab-content fade-in">
          {isMirrored1 ? (
            <div className="fade-in">
              <div className={`card-header ${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
                 <h4>
                  <KaraokeLessonText
                    as="span"
                    className="red-text"
                    text={t('mirroredpart.mirrored1Steps.step0')}
                    isActive={isSpeaking && currentIndex === 2}
                    currentCharIndex={currentCharIndex}
                  />
                 </h4>
              </div>

              <div className={`instruction-step ${currentIndex === 3 ? "reading-active" : ""}`} data-reading-index="3">
                <div className="step-description">
                  <KaraokeLessonText
                    as="div"
                    text={t('mirroredpart.mirrored1Steps.step1')}
                    isActive={isSpeaking && currentIndex === 3}
                    currentCharIndex={currentCharIndex}
                  />
                  <div className="mt-4">
                    <p className="p-flush">MTXXXXX<strong className="red-text">N</strong>01</p>
                  </div>

                  <div className="flex-row-wrap mt-4" style={{ gap: '2rem', alignItems: 'center' }}>
                    <p style={{ marginTop: "2rem", marginBottom: "-3rem"}} className="p-flush">{t('common.mirrored.example_normal')}</p>
                    <img src={normalPartA} alt={t('common.normal_part_example')} className="software-screenshot mt-4" style={{ height: "300px" }} />
                  </div>
                </div>
              </div>


              <div className={`instruction-step ${currentIndex === 4 ? "reading-active" : ""}`} data-reading-index="4">
                <div className={`card-header ${currentIndex === 4 ? 'reading-active' : ''}`} data-reading-index="4">
                  <h4>
                    <KaraokeLessonText
                      as="span"
                      className="red-text"
                      text={t('mirroredpart.mirrored1Steps.step2')}
                      isActive={isSpeaking && currentIndex === 4}
                      currentCharIndex={currentCharIndex}
                    />
                  </h4>
                </div>
                <div className="step-description">
                  <KaraokeLessonText
                    as="div"
                    text={t('mirroredpart.mirrored1Steps.step3')}
                    isActive={isSpeaking && currentIndex === 5}
                    currentCharIndex={currentCharIndex}
                  />
                  <div className="mt-4" style={{ marginTop: "1rem" }}>
                    <p className="p-flush">MTXXXXX<strong className="red-text">A</strong>01</p>
                    <p className="p-flush">MTXXXXX<strong className="red-text">B</strong>01</p>
                  </div>

                    <p className="p-flush" style={{marginTop: "1rem"}}>{t('common.mirrored.mirror_a_original')}</p>
                    <p className="p-flush">{t('common.mirrored.mirror_b_copy')}</p>
                    <p className="p-flush red-text" >{t('common.mirrored.mirror_a_note')}</p>
                    <p className="p-flush">{t('common.mirrored.example_mirror')}</p>

                    <img src={mirrorPartA} alt={t('common.mirror_part_a_and_b')} className="software-screenshot mt-4" style={{ width: "900px", marginTop: "2rem" }} />
                </div>
              </div>


              <div className={`instruction-step ${currentIndex === 6 ? "reading-active" : ""}`} data-reading-index="6">
                <div className="step-description">
                  <KaraokeLessonText
                    as="div"
                    text={t('mirroredpart.mirrored1Steps.step4')}
                    isActive={isSpeaking && currentIndex === 6}
                    currentCharIndex={currentCharIndex}
                  />
                    <img src={mirrorCopyTool} alt={t('common.mirror_copy_tool')} className="software-screenshot mt-4 mb-4" style={{ height: '60px', display: 'block', margin: '0 auto 0 0', marginTop: "1rem", marginBottom: "1rem"}} />

                  <div className={`${currentIndex === 7 ? "reading-active" : ""}`} data-reading-index="7">
                    <KaraokeLessonText
                      as="div"
                      style={{marginBottom: "2rem"}}
                      text={t('mirroredpart.mirrored1Steps.step5')}
                      isActive={isSpeaking && currentIndex === 7}
                      currentCharIndex={currentCharIndex}
                    />
                  </div>


                  <div className="instruction-box">
                    <p className="p-flush mt-8" style={{marginBottom: "1rem"}}><strong className="red-text">{t('common.mirrored.note_normal_mirror')}</strong></p>
                    <p className="p-flush mt-8" style={{marginBottom: "1rem"}}>{t('common.mirrored.note_reference_drawing')}</p>
                    <p className="p-flush" style={{marginBottom: "0.5rem"}}>{t("common.mirrored.note_mirror_image_pt1")} <strong className="red-text">{t("common.mirrored.note_mirror_image_pt2")}</strong>{t("common.mirrored.note_mirror_image_pt3")}</p>
                    <img src={mirrorNotes} alt={t('common.mirror_image_notes')} className="software-screenshot mt-4" style={{ height: '60px', display: 'block', margin: '0 auto 0 0' }} />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="fade-in">
              <div className={`card-header ${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2" style={{marginBottom: "2rem"}}>
                <h4>{t('common.mirror.title2')}</h4>
              </div>

              <div className={`instruction-step ${currentIndex === 3 ? "reading-active" : ""}`} data-reading-index="3">
                <div className="step-header">
                  <span className="step-number">1 </span>
                  <KaraokeLessonText
                    as="span"
                    className="step-label"
                    text={t('mirroredpart.mirrored2Steps.step1')}
                    isActive={isSpeaking && currentIndex === 3}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
                <div className="step-description">
                    <img src={originLocation} alt={t('common.location_of_origin')} className="software-screenshot screenshot-wide mt-4" style={{ width: "600px" }} />
                </div>
              </div>


              <div className={`instruction-step ${currentIndex === 4 ? "reading-active" : ""}`} data-reading-index="4">
                <div className="step-header">
                  <span className="step-number">2 </span>
                  <KaraokeLessonText
                    as="span"
                    className="step-label"
                    text={t('mirroredpart.mirrored2Steps.step2')}
                    isActive={isSpeaking && currentIndex === 4}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
              </div>


              <div className={`instruction-step ${currentIndex === 5 ? "reading-active" : ""}`} data-reading-index="5">
                <div className="step-header" style={{ marginTop: "-2rem" }}>
                  <span className="step-number">3 </span>
                  <KaraokeLessonText
                    as="span"
                    className="step-label"
                    text={t('mirroredpart.mirrored2Steps.step3')}
                    isActive={isSpeaking && currentIndex === 5}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
              </div>


              <div className={`instruction-step ${currentIndex === 6 ? "reading-active" : ""}`} data-reading-index="6">
                <div className="step-header" style={{ marginTop: "-2rem" }}>
                  <span className="step-number">4 </span>
                  <KaraokeLessonText
                    as="span"
                    className="step-label"
                    text={t('mirroredpart.mirrored2Steps.step4')}
                    isActive={isSpeaking && currentIndex === 6}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
                <div className="step-description">
                    <img src={mirrorTool} alt={t('common.mirror_tool')} className="software-screenshot mt-4" style={{ width: "200px", marginBottom: "1rem" }} />
                   <span className="p-flush" style={{marginBottom: "1rem"}}>{t('common.mirrored.pick_3_points')}</span>
                    <img src={pick3Points} alt={t('common.mirror_plane_visualization')} className="software-screenshot mt-4" style={{ width: "600px", marginBottom: "3rem", marginTop: "2rem"}} />
                  <span className="p-flush">{t('common.mirrored.outcome_part_b')}</span>
                    <img src={pick3PointsPartA} alt={t('common.outcome_part_b')} className="software-screenshot mt-4" style={{ width: "600px", marginBottom: "3rem", marginTop: "2rem"}} />
                  <div className="instruction-box">
                    <span className="p-flush red-text" style={{marginBottom: "1rem"}}>{t('common.mirrored.note_origin')}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="lesson-navigation">
            {onPrevLesson && (
  <button className="nav-button" onClick={() => handlePrev()}><ChevronLeft size={18} /> {t('common.previous')}</button>
)}
            <button className="nav-button next" onClick={() => handleNext()}>{activeTab === '3d-modeling' ? nextLabel || t('common.next') : t('common.next')} <ChevronRight size={18} /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MirroredPartLesson;

