import React,{ useEffect,useState } from "react";

import {
ChevronLeft,
ChevronRight
} from 'lucide-react';
import { useLessonCore } from "../../hooks/useLessonCore";
import { useTTSAutoplay } from "../../hooks/useTTSAutoplay";
import "../../styles/3D_Modeling/CourseLesson.css";
import { KaraokeLessonText } from "../KaraokeLessonText";
import { useTranslation } from "../../context/LanguageContext";

/* 2D > 3D (1) Assets */
import commandMenu from "../../assets/3D_Image_File/2d_3d1_1.png";
import extrudeDialog from "../../assets/3D_Image_File/2d_3d2_extrude1.png";
import revolveSteps from "../../assets/3D_Image_File/2d_3d2spiral.png";
import commandMenu2 from "../../assets/3D_Image_File/2d_3d_1_command_menu2.png";
import extrudeIcon from "../../assets/3D_Image_File/2d_3d_1_extrude.png";
import pickCrossSection from "../../assets/3D_Image_File/2d_3d_1_pick_cross_section.png";
import revolveIcon from "../../assets/3D_Image_File/2d_3d_2_revolve.png";
import spiralSketch from "../../assets/3D_Image_File/2d_3d_2_revolve_spiral_form_sketch.png";
import spiralIcon from "../../assets/3D_Image_File/2d_3d_2_spiral_form.png";
import spiralRotation from "../../assets/3D_Image_File/2d_3d_2_spiral_form_axis_rotation.png";
import spiralRotation1 from "../../assets/3D_Image_File/2d_3d_2_spiral_form_axis_rotation1.png";
import spiralItemEntry from "../../assets/3D_Image_File/2d_3d_2_spiral_form_item_entry.png";
import openWorkPlaneImg2 from "../../assets/3D_Image_File/2d_3d_open_work_plane.png";
import openWorkPlaneImg from "../../assets/3D_Image_File/2d_3d_open_work_plane1.png";
import workPlaneImg from "../../assets/3D_Image_File/2d_3d_work_plane.png";
import leftClick from "../../assets/3D_Image_File/left_click.png";


interface SubLessonProps {
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
  nextLabel?: string;
}

/* ── 2D > 3D (1) ── */
const TwoDTo3D1: React.FC<SubLessonProps> = ({ onNextLesson, onPrevLesson, nextLabel }) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<"workPlane" | "commandMenu">(() => {
    return (localStorage.getItem('2d-3d-1-tab') as any) || 'workPlane';
  });

  const {
    scrollProgress,
    containerRef,
    speak,
    stop,
    isSpeaking,
    currentIndex,
    currentCharIndex
,
    registerText
  } = useLessonCore("2d-3d-1");

  useEffect(() => {
    localStorage.setItem('2d-3d-1-tab', activeTab);
  }, [activeTab]);

  const workPlaneSteps = [
    t('2dto3d.tab1'),
    t('2dto3d.intro'),
    t('2dto3d.rotate')
  ];

  const menuSteps = [
    t('2dto3d.commandMenu.title'),
    t('2dto3d.commandMenu.desc')
  ];

  const tabs = [
    { id: "workPlane", label: t('2dto3d.workPlane') },
    { id: "commandMenu", label: t('2dto3d.commandMenu.title') }
  ];

  const handleNext = (isAuto = false) => {
    stop();
    if (!isAuto) {
      sessionStorage.setItem('tts-autoplay-active', 'false');
    }
    const i = tabs.findIndex((t) => t.id === activeTab);
    if (i < tabs.length - 1) {
      setActiveTab(tabs[i + 1].id as any);
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
    const i = tabs.findIndex((t) => t.id === activeTab);
    if (i > 0) {
      setActiveTab(tabs[i - 1].id as any);
    } else if (onPrevLesson) {
      onPrevLesson();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const steps = activeTab === 'workPlane' ? workPlaneSteps : menuSteps;
    registerText(steps, 0);
  }, [activeTab, registerText]);

  const currentTabSteps = activeTab === 'workPlane' ? workPlaneSteps : menuSteps;
  const tabsList = [{ id: 'workPlane' }, { id: 'commandMenu' }];

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
        {tabs.map((tab) => (<button key={tab.id} className={`tab-button ${activeTab === tab.id ? "active" : ""}`} onClick={() => { stop(); sessionStorage.setItem('tts-autoplay-active', 'false'); setActiveTab(tab.id as any); }} > {tab.label} </button>))}
      </div>



      <div className="lesson-grid single-card">
        {activeTab === 'workPlane' && (
          <div className="lesson-card tab-content fade-in">
            <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h4 className={`${currentIndex === 0 ? 'reading-active' : ''}`} data-reading-index="0">
                <KaraokeLessonText
                  as="span"
                  text={t('2dto3d.tab1')}
                  isActive={isSpeaking && currentIndex === 0}
                  currentCharIndex={currentCharIndex}
                />
              </h4>

            </div>
            <div className={`instruction-step ${currentIndex === 1 ? 'reading-active' : ''}`} data-reading-index="1" style={{ marginTop: "-3.4rem" }}>
              <KaraokeLessonText
                as="p"
                className="p-flush"
                text={t('2dto3d.intro')}
                isActive={isSpeaking && currentIndex === 1}
                currentCharIndex={currentCharIndex}
              />
              <img src={workPlaneImg} alt="X-Y Plane" className="software-screenshot screenshot-small mt-4" style={{ width: "10rem", marginTop: "-2rem" }} />
              <img src={openWorkPlaneImg} alt="Open Work Plane toolbar" className="software-screenshot screenshot-wide mt-4" />
            </div>

            <div className={`instruction-step ${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
              <KaraokeLessonText
                as="span"
                text={t('2dto3d.rotate')}
                isActive={isSpeaking && currentIndex === 2}
                currentCharIndex={currentCharIndex}
              />
              <img src={openWorkPlaneImg2} alt="Open Work Plane Orientation" className="software-screenshot mt-4" style={{ width: '10rem', marginTop: "1rem" }} />
            </div>

            <div className="lesson-navigation">
              <button className="nav-button" onClick={() => handlePrev()}><ChevronLeft size={18} />{t('common.previous')}</button>
              <button className="nav-button next" onClick={() => handleNext()}>{t('common.next')} <ChevronRight size={18} /></button>
            </div>
          </div>
        )}

        {activeTab === 'commandMenu' && (
          <div className="lesson-card tab-content fade-in">
            <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h4 className={`${currentIndex === 0 ? 'reading-active' : ''}`} data-reading-index="0">
                <KaraokeLessonText
                  as="span"
                  text={t('2dto3d.commandMenu.title')}
                  isActive={isSpeaking && currentIndex === 0}
                  currentCharIndex={currentCharIndex}
                />
              </h4>

            </div>
            <KaraokeLessonText
              as="p"
              className="p-flush mb-8"
              style={{ marginTop: "-2rem" }}
              text={t('2dto3d.commandMenu.desc')}
              isActive={isSpeaking && currentIndex === 1}
              currentCharIndex={currentCharIndex}
            />
            <div className={`instruction-step ${currentIndex === 1 ? 'reading-active' : ''}`} data-reading-index="1">
              <img src={commandMenu} alt="Command Menu" className="software-screenshot screenshot-wide mt-8" style={{ height: '545px', marginTop: "2rem" }} />
            </div>

            <div className="lesson-navigation">
              <button className="nav-button" onClick={() => handlePrev()}><ChevronLeft size={18} />{t('common.previous')}</button>
              <button className="nav-button next" onClick={() => handleNext()}>{nextLabel || t('common.next')} <ChevronRight size={18} /></button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


/* ── 2D > 3D (2) ── */
const TwoDTo3D2: React.FC<SubLessonProps> = ({ onNextLesson, onPrevLesson, nextLabel }) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<"extrude" | "revolve" | "spiral">(() => {
    return (localStorage.getItem('2d-3d-2-tab') as any) || 'extrude';
  });

  const {
    scrollProgress,
    containerRef,
    speak,
    stop,
    isSpeaking,
    currentIndex,
    currentCharIndex
,
    registerText
  } = useLessonCore("2d-3d-2");

  useEffect(() => {
    localStorage.setItem('2d-3d-2-tab', activeTab);
  }, [activeTab]);

  const introTitle = t('2dto3d.introTitle');
  const introSubtitle = t('2dto3d.introSubtitle');
  const introSubtitle2 = t('2dto3d.introSubtitle2');

  const commonIntroSteps = [
    introTitle,
    introSubtitle,
    introSubtitle2
  ];

  const extrudeSteps = [
    ...commonIntroSteps,
    t('2dto3d.extrude.title'),
    t('2dto3d.extrude.desc'),
    t('2dto3d.extrude.step1'),
    t('2dto3d.extrude.step2') + " " + t('2dto3d.extrude.step2hatch'),
    t('2dto3d.extrude.step3'),
    t('2dto3d.extrude.dialog'),
    t('2dto3d.extrude.dialogNote'),
    t('2dto3d.extrude.dialogCancel'),
    t('lesson.result')
  ];
  const revolveStepsTTS = [
    ...commonIntroSteps,
    t('2dto3d.revolve.title'),
    t('2dto3d.revolve.desc'),
    t('2dto3d.revolve.step1'),
    t('2dto3d.revolve.step2') + " " + t('2dto3d.revolve.step2hatch'),
    t('2dto3d.revolve.step3'),
    t('2dto3d.processOverview')
  ];
  const spiralSteps = [
    ...commonIntroSteps,
    t('2dto3d.spiral.title'),
    t('2dto3d.spiral.desc'),
    t('2dto3d.spiral.step1'),
    t('2dto3d.spiral.step2') + " " + t('2dto3d.spiral.step2hatch'),
    t('2dto3d.spiral.step3') + " " + t('2dto3d.spiral.step3note'),
    t('2dto3d.spiral.step4'),
    t('lesson.result')
  ];

  const tabs = [{ id: "extrude", label: t('2dto3d.extrude.tab') }, { id: "revolve", label: t('2dto3d.revolve.tab') }, { id: "spiral", label: t('2dto3d.spiral.tab') },];
  const handleNext = (isAuto = false) => {
    stop();
    if (!isAuto) {
      sessionStorage.setItem('tts-autoplay-active', 'false');
    }
    const i = tabs.findIndex((t) => t.id === activeTab);
    if (i < tabs.length - 1) {
      setActiveTab(tabs[i + 1].id as any);
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
    const i = tabs.findIndex((t) => t.id === activeTab);
    if (i > 0) {
      setActiveTab(tabs[i - 1].id as any);
    } else if (onPrevLesson) {
      onPrevLesson();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const steps = activeTab === 'extrude' ? extrudeSteps :
                  activeTab === 'revolve' ? revolveStepsTTS : spiralSteps;
    const startIdx = activeTab === 'extrude' ? 0 : 3;
    registerText(steps, startIdx);
  }, [activeTab, registerText]);

  const currentTabSteps2 = activeTab === 'extrude' ? extrudeSteps :
                           activeTab === 'revolve' ? revolveStepsTTS : spiralSteps;
  const tabsList2 = [{ id: 'extrude' }, { id: 'revolve' }, { id: 'spiral' }];
  const startIdx2 = activeTab === 'extrude' ? 0 : 3;

  useTTSAutoplay(
    isSpeaking,
    currentIndex,
    activeTab,
    currentTabSteps2.length,
    tabsList2,
    handleNext,
    speak,
    currentTabSteps2,
    startIdx2
  );
  return (
    <div className="course-lesson-container" ref={containerRef}>
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>
      <div className="lesson-tabs">
        {tabs.map((tab) => (<button key={tab.id} className={`tab-button ${activeTab === tab.id ? "active" : ""}`} onClick={() => { stop(); sessionStorage.setItem('tts-autoplay-active', 'false'); setActiveTab(tab.id as any); }} > {tab.label} </button>))}
      </div>

      <section className="lesson-intro">
        <h3 className={`section-title ${currentIndex === 0 ? "reading-active" : ""}`} data-reading-index="0">
          <KaraokeLessonText
            as="span"
            text={t('2dto3d.introTitle')}
            isActive={isSpeaking && currentIndex === 0}
            currentCharIndex={currentCharIndex}
          />

        </h3>
        <KaraokeLessonText
          className={`lesson-subtitle ${currentIndex === 1 ? "reading-active" : ""}`}
          data-reading-index="1"
          text={t('2dto3d.introSubtitle')}
          isActive={isSpeaking && currentIndex === 1}
          currentCharIndex={currentCharIndex}
        />
        <KaraokeLessonText
          className={`lesson-subtitle ${currentIndex === 2 ? "reading-active" : ""}`}
          data-reading-index="2"
          text={t('2dto3d.introSubtitle2')}
          isActive={isSpeaking && currentIndex === 2}
          currentCharIndex={currentCharIndex}
        />
        <img src={commandMenu2} alt="Extrude Tools" className="software-screenshot screenshot-small mt-4" style={{ height: '225px' }} />
      </section>

      <div className="lesson-grid single-card">
        {/* EXTRUDE */}
        {activeTab === "extrude" && (
          <div className="lesson-card tab-content fade-in">
            <div className="card-header">
              <h4 className={`${currentIndex === 3 ? "reading-active" : ""}`} data-reading-index="3">
                <KaraokeLessonText
                  as="span"
                  text={t('2dto3d.extrude.title')}
                  isActive={isSpeaking && currentIndex === 3}
                  currentCharIndex={currentCharIndex}
                />
              </h4>
            </div>
            <KaraokeLessonText
              as="p"
              className={`p-flush ${currentIndex === 4 ? "reading-active" : ""}`}
              style={{ marginTop: "-2rem" }}
              data-reading-index="4"
              text={t('2dto3d.extrude.desc')}
              isActive={isSpeaking && currentIndex === 4}
              currentCharIndex={currentCharIndex}
            />

            <div className={`instruction-step ${currentIndex === 5 ? "reading-active" : ""}`} data-reading-index="5">
              <div className="step-header">
                <span className="step-number">1 </span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text={t('2dto3d.extrude.step1')}
                  isActive={isSpeaking && currentIndex === 5}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <img src={extrudeIcon} alt="Extrude Icon Menu" className="software-screenshot mt-4" style={{ height: 'auto', width: "200px" }} />
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 6 ? "reading-active" : ""}`} data-reading-index="6">
              <div className="step-header">
                <span className="step-number" style={{ marginTop: "-3.5rem" }}>2 </span>
                <div className="step-label">
                  <KaraokeLessonText
                    as="span"
                    text={t('2dto3d.extrude.step2')}
                    isActive={isSpeaking && currentIndex === 6}
                    currentCharIndex={currentCharIndex}
                  />
                  <br />
                  <KaraokeLessonText
                    as="span"
                    text={t('2dto3d.extrude.step2hatch')}
                    isActive={isSpeaking && currentIndex === 6}
                    currentCharIndex={currentCharIndex}
                  />
                  <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '40px', margin: '0 8px' }} />
                </div>
              </div>
              <div className="step-description">
                <img src={pickCrossSection} alt="PICK EDGE" className="software-screenshot mt-8" style={{ width: '600px', marginTop: "2rem" }} />
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 7 ? "reading-active" : ""}`} data-reading-index="7">
              <div className="step-header">
                <span className="step-number">3 </span>
                <div className="step-label" style={{ marginTop: "-1.5rem" }}>
                  <KaraokeLessonText
                    as="span"
                    text={t('2dto3d.extrude.step3')}
                    isActive={isSpeaking && currentIndex === 7}
                    currentCharIndex={currentCharIndex}
                  />
                  <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '40px', margin: '0 8px' }} />
                </div>
              </div>
            </div>



            <div className={`instruction-box instruction-box--warning ${currentIndex === 8 || currentIndex === 9 || currentIndex === 10 ? "reading-active" : ""}`} data-reading-index="8">
              <KaraokeLessonText
                as="p"
                className="p-flush"
                style={{ marginBottom: "1rem" }}
                text={t('2dto3d.extrude.dialog')}
                isActive={isSpeaking && currentIndex === 8}
                currentCharIndex={currentCharIndex}
              />
              <KaraokeLessonText
                as="p"
                className="red-text"
                text={t('2dto3d.extrude.dialogNote')}
                isActive={isSpeaking && currentIndex === 9}
                currentCharIndex={currentCharIndex}
              />
              <KaraokeLessonText
                as="p"
                style={{ marginTop: "1rem" }}
                text={t('2dto3d.extrude.dialogCancel')}
                isActive={isSpeaking && currentIndex === 10}
                currentCharIndex={currentCharIndex}
              />
            </div>


            <div className={`instruction-step ${currentIndex === 11 ? 'reading-active' : ''}`} data-reading-index="11">
              <div className="card-header">
                <h4 className={`${currentIndex === 11 ? "reading-active" : ""}`} data-reading-index="11">
                  <KaraokeLessonText
                    as="span"
                    text={t('lesson.result')}
                    isActive={isSpeaking && currentIndex === 11}
                    currentCharIndex={currentCharIndex}
                  />
                </h4>
              </div>
              <div className="flex-row-wrap mt-8" style={{ gap: '2rem' }}>
                <img src={extrudeDialog} alt="Extrude Dialog" className="software-screenshot mt-8" style={{ width: '900px' }} />
              </div>
            </div>

            <div className="lesson-navigation">
              <button className="nav-button" onClick={() => handlePrev()}><ChevronLeft size={18} />{t('common.previous')}</button>
              <button className="nav-button next" onClick={() => handleNext()}>{t('common.next')} <ChevronRight size={18} /></button>
            </div>
          </div>
        )}

        {/* REVOLVE */}
        {activeTab === "revolve" && (
          <div className="lesson-card tab-content fade-in">
            <div className="card-header">
              <h4 className={`${currentIndex === 3 ? "reading-active" : ""}`} data-reading-index="3">
                <KaraokeLessonText
                  as="span"
                  text={t('2dto3d.revolve.title')}
                  isActive={isSpeaking && currentIndex === 3}
                  currentCharIndex={currentCharIndex}
                />
              </h4>
            </div>
            <KaraokeLessonText
              as="p"
              className={`p-flush ${currentIndex === 4 ? "reading-active" : ""}`}
              style={{ marginTop: "-2rem" }}
              data-reading-index="4"
              text={t('2dto3d.revolve.desc')}
              isActive={isSpeaking && currentIndex === 4}
              currentCharIndex={currentCharIndex}
            />

            <div className={`instruction-step ${currentIndex === 5 ? "reading-active" : ""}`} data-reading-index="5">
              <div className="step-header">
                <span className="step-number">1 </span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text={t('2dto3d.revolve.step1')}
                  isActive={isSpeaking && currentIndex === 5}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <img src={revolveIcon} alt="Revolve Icon" className="software-screenshot" style={{ height: 'auto', width: "200px", marginBottom: "-2rem" }} />
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 6 ? "reading-active" : ""}`} data-reading-index="6">
              <div className="step-header">
                <span className="step-number">2 </span>
                <div className="step-label" style={{ gap: '0px' }}>
                  <KaraokeLessonText
                    as="span"
                    text={t('2dto3d.revolve.step2')}
                    isActive={isSpeaking && currentIndex === 6}
                    currentCharIndex={currentCharIndex}
                  />
                  <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '40px', margin: '0 8px' }} />
                  <br />
                  <KaraokeLessonText
                    as="span"
                    text={t('2dto3d.revolve.step2hatch')}
                    isActive={isSpeaking && currentIndex === 6}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 7 ? "reading-active" : ""}`} data-reading-index="7">
              <div className="step-header">
                <span className="step-number">3 </span>
                <div className="step-label" style={{ marginTop: "-1.5rem" }}>
                  <KaraokeLessonText
                    as="span"
                    text={t('2dto3d.revolve.step3')}
                    isActive={isSpeaking && currentIndex === 7}
                    currentCharIndex={currentCharIndex}
                  />
                  <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '40px', margin: '0 8px' }} />
                </div>
              </div>
            </div>



            <div className={`instruction-step ${currentIndex === 8 ? 'reading-active' : ''}`} data-reading-index="8">
              <div className="card-header">
                <h4 className={`${currentIndex === 8 ? "reading-active" : ""}`} data-reading-index="8">
                  <KaraokeLessonText
                    as="span"
                    text={t('2dto3d.processOverview')}
                    isActive={isSpeaking && currentIndex === 8}
                    currentCharIndex={currentCharIndex}
                  />
                </h4>
              </div>
              <img src={revolveSteps} alt="Revolve Steps" className="software-screenshot mt-8" style={{ width: '950px', height: '350px', marginTop: "1rem" }} />
            </div>

            <div className="lesson-navigation">
              <button className="nav-button" onClick={() => handlePrev()}><ChevronLeft size={18} />{t('common.previous')}</button>
              <button className="nav-button next" onClick={() => handleNext()}>{t('common.next')} <ChevronRight size={18} /></button>
            </div>
          </div>
        )}

        {/* SPIRAL */}
        {activeTab === "spiral" && (
          <div className="lesson-card tab-content fade-in">
            <div className="card-header">
              <h4 className={`${currentIndex === 3 ? "reading-active" : ""}`} data-reading-index="3">
                <KaraokeLessonText
                  as="span"
                  text={t('2dto3d.spiral.title')}
                  isActive={isSpeaking && currentIndex === 3}
                  currentCharIndex={currentCharIndex}
                />
              </h4>
            </div>
            <KaraokeLessonText
              as="p"
              className={`p-flush ${currentIndex === 4 ? "reading-active" : ""}`}
              style={{ marginTop: "-2rem" }}
              data-reading-index="4"
              text={t('2dto3d.spiral.desc')}
              isActive={isSpeaking && currentIndex === 4}
              currentCharIndex={currentCharIndex}
            />

            <div className={`instruction-step ${currentIndex === 5 ? "reading-active" : ""}`} data-reading-index="5">
              <div className="step-header">
                <span className="step-number">1 </span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text={t('2dto3d.spiral.step1')}
                  isActive={isSpeaking && currentIndex === 5}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <img src={spiralSketch} alt="Spiral Sketch" className="software-screenshot" style={{ height: 'auto', width: '900px', marginBottom: "-2rem" }} />
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 6 ? "reading-active" : ""}`} data-reading-index="6">
              <div className="step-header">
                <span className="step-number">2 </span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text={t('2dto3d.spiral.step2')}
                  isActive={isSpeaking && currentIndex === 6}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <img src={spiralIcon} alt="Spiral Form Icon" className="software-screenshot" style={{ height: 'auto', width: "200px", marginBottom: "1rem" }} />
              </div>
              <KaraokeLessonText
                as="p"
                className="p-flush"
                style={{ marginTop: "-1rem" }}
                text={t('2dto3d.spiral.step2hatch')}
                isActive={isSpeaking && currentIndex === 6}
                currentCharIndex={currentCharIndex}
              />
            </div>

            <div className={`instruction-step ${currentIndex === 7 ? "reading-active" : ""}`} data-reading-index="7">
              <div className="step-header" style={{ marginTop: "-1rem" }}>
                <span className="step-number">3 </span>
                <div className="step-label" style={{ marginTop: "-1.5rem" }}>
                  <KaraokeLessonText
                    as="span"
                    text={t('2dto3d.spiral.step3')}
                    isActive={isSpeaking && currentIndex === 7}
                    currentCharIndex={currentCharIndex}
                  />
                  <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '40px', margin: '0 8px' }} />
                </div>
              </div>
              <div className={`instruction-box ${currentIndex === 7 ? "reading-active" : ""}`} data-reading-index="7" style={{ marginTop: '1rem' }}>
                <KaraokeLessonText
                  as="p"
                  className="p-flush red-text"
                  text={t('2dto3d.spiral.step3note')}
                  isActive={isSpeaking && currentIndex === 7}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="flex-row-center--wrap mt-4" style={{ gap: '2rem' }}>
                <img src={spiralItemEntry} alt="Spiral Item Entry" className="software-screenshot screenshot-wide mt-4" style={{ height: 'auto', width: '900px', marginBottom: "-2rem", marginTop: "1rem" }} />
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 8 ? "reading-active" : ""}`} data-reading-index="8">
              <div className="step-header">
                <span className="step-number">4 </span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text={t('2dto3d.spiral.step4')}
                  isActive={isSpeaking && currentIndex === 8}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <img src={spiralRotation1} alt="Spiral Axis Selection" className="software-screenshot screenshot-medium mt-4" style={{ width: '700px', height: 'auto' }} />
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 9 ? 'reading-active' : ''}`} data-reading-index="9">
              <div className="card-header">
                <h4 className={`${currentIndex === 9 ? "reading-active" : ""}`} data-reading-index="9">
                  <KaraokeLessonText
                    as="span"
                    text={t('lesson.result')}
                    isActive={isSpeaking && currentIndex === 9}
                    currentCharIndex={currentCharIndex}
                  />
                </h4>
              </div>
              <div className="flex-row-wrap mt-8" style={{ gap: '2rem' }}>
                <img src={spiralRotation} alt="Spiral Axis Result" className="software-screenshot" style={{ height: 'auto', width: '900px' }} />
              </div>
            </div>

            <div className="lesson-navigation">
              <button className="nav-button" onClick={() => handlePrev()}><ChevronLeft size={18} />{t('common.previous')}</button>
              <button className="nav-button next" onClick={onNextLesson}>{nextLabel || t('common.next')} <ChevronRight size={18} /></button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

interface TwoDTo3DLessonProps {
  nextLabel?: string;
  subLessonId: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const TwoDTo3DLesson: React.FC<TwoDTo3DLessonProps> = ({
  subLessonId,
  onNextLesson,
  onPrevLesson,
  nextLabel
}) => {
  switch (subLessonId) {
    case "2d-3d-1":
      return (
        <TwoDTo3D1 onNextLesson={onNextLesson} onPrevLesson={onPrevLesson} nextLabel={nextLabel} />
      );
    case "2d-3d-2":
      return (
        <TwoDTo3D2 onNextLesson={onNextLesson} onPrevLesson={onPrevLesson} nextLabel={nextLabel} />
      );
    default:
      return (
        <TwoDTo3D1 onNextLesson={onNextLesson} onPrevLesson={onPrevLesson} nextLabel={nextLabel} />
      );
  }
};

export default TwoDTo3DLesson;
