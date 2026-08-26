/** * 3D_Component.tsx  EComponent operations lessons (Consolidated) */

import {
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useLessonCore } from '../../hooks/useLessonCore';
import { useTTSAutoplay } from "../../hooks/useTTSAutoplay";
import { useTranslation } from '../../context/LanguageContext';
import './CourseLesson.css';
import { KaraokeLessonText } from "../KaraokeLessonText";

/* Component (1) Assets */
import copyIcon from '../../assets/3d-images/component1_copy.png';
import copyDistance from '../../assets/3d-images/component1_copy_2.png';
import copyFinal from '../../assets/3d-images/component1_copy_3.png';
import mirrorIcon from '../../assets/3d-images/component1_mirror.png';
import mirrorResult from '../../assets/3d-images/component1_mirror_3.png';
import moveIcon from '../../assets/3d-images/component1_move.png';
import moveResult from '../../assets/3d-images/component1_move_2.png';
import componentMenu from '../../assets/3d-images/component1_move_copy_delete.png';
import moveEntry from '../../assets/3d-images/component1_move_entry.png';
import rotateIcon from '../../assets/3d-images/component1_rotate.png';
import rotateResult from '../../assets/3d-images/component1_rotate_3.png';
import rotateEntry from '../../assets/3d-images/component1_rotate_4.png';
import leftClick from '../../assets/3d-images/left_click.png';

/* Component (2) Assets */
import deleteIcon from '../../assets/3d-images/component2_delete.png';
import mirrorCopyIcon from '../../assets/3d-images/component2_mirror_copy.png';
import mirrorCopyResult from '../../assets/3d-images/component2_mirror_copy_2.png';
import repeatCopyIcon from '../../assets/3d-images/component2_repeat_copy.png';
import repeatCopyResult from '../../assets/3d-images/component2_repeat_copy2.png';
import rotateCopyIcon from '../../assets/3d-images/component2_rotate_copy.png';
import rotateCopyPoints from '../../assets/3d-images/component2_rotate_copy_3.png';
import rotateCopyEntry from '../../assets/3d-images/component2_rotate_copy_4.png';

interface ComponentLessonProps {
  subLessonId: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
  nextLabel?: string;
}

const ComponentLesson: React.FC<ComponentLessonProps> = ({ subLessonId, onNextLesson, onPrevLesson, nextLabel }) => {
  const [activeTab, setActiveTab] = useState<'move' | 'copy' | 'mirror' | 'rotate' | 'repeat' | 'rotateCopy' | 'mirrorCopy' | 'delete'>(() => {
    return (localStorage.getItem(`${subLessonId}-tab`) as any) || 'move';
  });
  const { t } = useTranslation();

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
    localStorage.setItem(`${subLessonId}-tab`, activeTab);
  }, [subLessonId, activeTab]);

  const moveSteps = [
    "MOVE COMPONENT",
    "Step 1: Select Move Component from the icon menu.",
    "Select the component to move then GO",
    "Specify the movement distance on the X,Y and Z-axis on the item entry. then Press Enter",
    "RESULT"
  ];
  const copySteps =
    ["COPY COMPONENT",
      "Step 1: Select Copy Component from the icon menu.",
      "Select the component to copy then GO",
      "Specify the distance on the X,Y and Z-axis and the number of copies needed then Press Enter",
      "RESULT"
    ];
  const mirrorSteps = [
    "MIRROR COMPONENT",
    "Use to move/relocate a component by mirror movement.",
    "Step 1: Select Mirror Component from the icon menu.",
    "Select the components to be mirror then GO",
    "Select 3-points to set the plane where the entity will be mirrored or left-click on the face where the entity will be mirrored.",
    "RESULT"
  ];
  const rotateSteps = [
    "ROTATE COMPONENT",
    "Use to move/relocate a component by rotating on an axis.",
    "Step 1: Select Rotate Component from the icon menu.",
    "Select the component to rotate then GO",
    "Select 2 points to set the axis of rotation.",
    "Step 4: Specify the desired angle of rotation on the item entry then press Enter.",
    "RESULT"
  ];
  const repeatSteps = [
    "REPEAT COPY COMPONENT",
    "Use for continuous duplication of component.",
    "RESULT"
  ];
  const rotateCopySteps = [
    "ROTATE COPY COMPONENT",
    "Use to create a duplicate of a component by rotating on an axis.",
    "Step 1: Select Rotate Component from the icon menu.",
    "Select the component to be rotated then GO",
    "Step 3: Select 2 points to set the axis of rotation.",
    "Step 4: Specify the desired angle of rotation on the item entry then press Enter.",
    "RESULT"
  ];
  const mirrorCopySteps = [
    "MIRROR COPY COMPONENT",
    "Use to create a duplicate of a component by mirror movement.",
    "Same procedure with Mirror Component.",
    "RESULT"
  ];
  const deleteSteps = [
    "DELETE COMPONENT",
    "Step 1: Select Delete Component from the icon menu.",
    "Select components to be deleted."
  ];

  const introTitle = t('component.heading');
  const introSubtitle = t('component.desc');

  const commonIntroSteps = [
    introTitle,
    introSubtitle
  ];

  const moveStepsTTS = [...commonIntroSteps, ...moveSteps];
  const copyStepsTTS = [...commonIntroSteps, ...copySteps];
  const mirrorStepsTTS = [...commonIntroSteps, ...mirrorSteps];
  const rotateStepsTTS = [...commonIntroSteps, ...rotateSteps];
  const repeatStepsTTS = [...commonIntroSteps, ...repeatSteps];
  const rotateCopyStepsTTS = [...commonIntroSteps, ...rotateCopySteps];
  const mirrorCopyStepsTTS = [...commonIntroSteps, ...mirrorCopySteps];
  const deleteStepsTTS = [...commonIntroSteps, ...deleteSteps];

  const tabs = [
    { id: 'move', label: t('basicOp2.move.title') },
    { id: 'copy', label: t('basicOp2.copy.title') },
    { id: 'mirror', label: t('basicOp2.mirror.title') },
    { id: 'rotate', label: t('basicOp2.rotate.title') },
    { id: 'repeat', label: t('component.repeat.title') },
    { id: 'rotateCopy', label: t('basicOp2.rotateCopy.title') },
    { id: 'mirrorCopy', label: t('basicOp2.mirrorCopy.title') },
    { id: 'delete', label: t('basicOp2.delete.title') }
  ];

  const handleNext = (isAuto = false) => {
    stop();
    if (!isAuto) { sessionStorage.setItem('tts-autoplay-active', 'false'); }
    const i = tabs.findIndex(t => t.id === activeTab);
    if (i < tabs.length - 1) setActiveTab(tabs[i + 1].id as any);
    else if (onNextLesson) onNextLesson();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrev = (isAuto = false) => {
    stop();
    if (!isAuto) { sessionStorage.setItem('tts-autoplay-active', 'false'); }
    const i = tabs.findIndex(t => t.id === activeTab);
    if (i > 0) setActiveTab(tabs[i - 1].id as any);
    else if (onPrevLesson) onPrevLesson();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  useEffect(() => {
    const steps = activeTab === 'move' ? moveStepsTTS :
      activeTab === 'copy' ? copyStepsTTS :
        activeTab === 'mirror' ? mirrorStepsTTS :
          activeTab === 'rotate' ? rotateStepsTTS :
            activeTab === 'repeat' ? repeatStepsTTS :
              activeTab === 'rotateCopy' ? rotateCopyStepsTTS :
                activeTab === 'mirrorCopy' ? mirrorCopyStepsTTS : deleteStepsTTS;
    const startIdx = activeTab === 'move' ? 0 : 2;
    registerText(steps, startIdx);
  }, [activeTab, registerText]);

  const currentTabSteps = activeTab === 'move' ? moveStepsTTS :
    activeTab === 'copy' ? copyStepsTTS :
      activeTab === 'mirror' ? mirrorStepsTTS :
        activeTab === 'rotate' ? rotateStepsTTS :
          activeTab === 'repeat' ? repeatStepsTTS :
            activeTab === 'rotateCopy' ? rotateCopyStepsTTS :
              activeTab === 'mirrorCopy' ? mirrorCopyStepsTTS : deleteStepsTTS;
  const startIdx2 = activeTab === 'move' ? 0 : 2;
  const tabsList = [
    { id: 'move' }, { id: 'copy' }, { id: 'mirror' }, { id: 'rotate' },
    { id: 'repeat' }, { id: 'rotateCopy' }, { id: 'mirrorCopy' }, { id: 'delete' }
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
    <div className="course-lesson-container" ref={containerRef}>
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>
      <div className="lesson-tabs" style={{ width: '900px', margin: '0 auto' }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => { stop(); sessionStorage.setItem('tts-autoplay-active', 'false'); setActiveTab(tab.id as any); }}
            style={{ flex: 1, textAlign: 'center', padding: '0.5rem 0.6rem' }}
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
          <img src={componentMenu} alt={t('common.component_operations_menu')} className="software-screenshot mt-4" style={{ height: '350px' }} />
        </div>
      </section>

      <div className="lesson-grid single-card">
        {activeTab === 'move' && (
          <div className="lesson-card tab-content fade-in">
            <div className="card-header">
              <h4 className={`${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
                <KaraokeLessonText
                  as="span"
                  text={t('basicOp2.move.title')}
                  isActive={isSpeaking && currentIndex === 2}
                  currentCharIndex={currentCharIndex}
                />
              </h4>
            </div>

            <div className={`instruction-step ${currentIndex === 3 ? 'reading-active' : ''}`} data-reading-index="3">
              <div className="step-header">
                <span className="step-number">1 </span>
                <span className="step-label">
                  <KaraokeLessonText
                    as="span"
                    text={t('basicOp2.move.step1')}
                    isActive={isSpeaking && currentIndex === 3}
                    currentCharIndex={currentCharIndex}
                  />
                </span>
              </div>
              <div className="step-description">
                <img src={moveIcon} alt={t('common.move_component_icon')} className="software-screenshot mt-4" style={{ width: '200px', marginBottom: '-2rem' }} />
              </div>
            </div>


            <div className={`instruction-step ${currentIndex === 4 ? 'reading-active' : ''}`} data-reading-index="4" style={{ marginBottom: "-2rem" }}>
              <div className="step-header">
                <span className="step-number">2 </span>
                <span className="step-label" style={{ marginTop: "-1.5rem" }}>
                  <KaraokeLessonText
                    as="span"
                    text={t('basicOp2.move.step2')}
                    isActive={isSpeaking && currentIndex === 4}
                    currentCharIndex={currentCharIndex}
                  />
                  <img src={leftClick} alt={t('common.left_click')} className="screenshot-click--inline" style={{ width: '40px', margin: '0 8px' }} />
                </span>
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 5 ? 'reading-active' : ''}`} data-reading-index="5">
              <div className="step-header">
                <span className="step-number">3 </span>
                <span className="step-label">
                  <KaraokeLessonText
                    as="span"
                    text={t('basicOp2.move.step3')}
                    isActive={isSpeaking && currentIndex === 5}
                    currentCharIndex={currentCharIndex}
                  />
                </span>
              </div>
              <div className="step-description">
                <img src={moveEntry} alt={t('common.move_entry')} className="software-screenshot mt-4" style={{ width: '900px' }} />
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 6 ? 'reading-active' : ''}`} data-reading-index="6">
              <div className="card-header">
                <h4 className={`${currentIndex === 6 ? 'reading-active' : ''}`} data-reading-index="6">
                  <KaraokeLessonText
                    as="span"
                    text={t('lesson.result')}
                    isActive={isSpeaking && currentIndex === 6}
                    currentCharIndex={currentCharIndex}
                  />
                </h4>
              </div>
              <div className="flex-row-wrap mt-8" style={{ gap: '2rem' }}>
                <img src={moveResult} alt={t('common.move_result')} className="software-screenshot mt-8" style={{ width: '700px' }} />
              </div>
            </div>

            <div className="lesson-navigation">
              {onPrevLesson && (
  <button className="nav-button" onClick={() => handlePrev()}><ChevronLeft size={18} /> {t('common.previous')}</button>
)}
              <button className="nav-button next" onClick={() => handleNext()}>{t('common.next')} <ChevronRight size={18} /></button>
            </div>
          </div>
        )}

        {activeTab === 'copy' && (
          <div className="lesson-card tab-content fade-in">
            <div className="card-header">
              <h4 className={`${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
                <KaraokeLessonText
                  as="span"
                  text={t('basicOp2.copy.title')}
                  isActive={isSpeaking && currentIndex === 2}
                  currentCharIndex={currentCharIndex}
                />
              </h4>
            </div>

            <div className={`instruction-step ${currentIndex === 3 ? 'reading-active' : ''}`} data-reading-index="3">
              <div className="step-header">
                <span className="step-number">1 </span>
                <span className="step-label">
                  <KaraokeLessonText
                    as="span"
                    text={t('basicOp2.copy.step1')}
                    isActive={isSpeaking && currentIndex === 3}
                    currentCharIndex={currentCharIndex}
                  />
                </span>
              </div>
              <div className="step-description">
                <img src={copyIcon} alt={t('common.copy_component_icon')} className="software-screensho mt-4" style={{ width: '200px', marginBottom: '-2rem' }} />
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 4 ? 'reading-active' : ''}`} data-reading-index="4" style={{ marginBottom: "-2rem" }}>
              <div className="step-header">
                <span className="step-number">2 </span>
                <span className="step-label" style={{ marginTop: "-1.5rem" }}>
                  <KaraokeLessonText
                    as="span"
                    text={t('basicOp2.copy.step2')}
                    isActive={isSpeaking && currentIndex === 4}
                    currentCharIndex={currentCharIndex}
                  />
                  <img src={leftClick} alt={t('common.left_click')} className="screenshot-click--inline" style={{ width: '40px', margin: '0 8px' }} />
                </span>
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 5 ? 'reading-active' : ''}`} data-reading-index="5">
              <div className="step-header">
                <span className="step-number">3 </span>
                <span className="step-label">
                  <KaraokeLessonText
                    as="span"
                    text={t('basicOp2.copy.step3')}
                    isActive={isSpeaking && currentIndex === 5}
                    currentCharIndex={currentCharIndex}
                  />
                </span>
              </div>
              <div className="step-description">
                <img src={copyFinal} alt={t('common.copy_final')} className="software-screenshot mt-4" style={{ width: '900px' }} />
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 6 ? 'reading-active' : ''}`} data-reading-index="6">
              <div className="card-header">
                <h4 className={`${currentIndex === 6 ? 'reading-active' : ''}`} data-reading-index="6">
                  <KaraokeLessonText
                    as="span"
                    text={t('lesson.result')}
                    isActive={isSpeaking && currentIndex === 6}
                    currentCharIndex={currentCharIndex}
                  />
                </h4>
              </div>
              <div className="flex-row-wrap mt-8" style={{ gap: '2rem' }}>
                <img src={copyDistance} alt={t('common.copy_distance')} className="software-screenshot mt-8" style={{ width: '700px' }} />
              </div>
            </div>


            <div className="lesson-navigation">
              {onPrevLesson && (
  <button className="nav-button" onClick={() => handlePrev()}><ChevronLeft size={18} /> {t('common.previous')}</button>
)}
              <button className="nav-button next" onClick={() => handleNext()}>{t('common.next')} <ChevronRight size={18} /></button>
            </div>
          </div>
        )}

        {activeTab === 'mirror' && (
          <div className="lesson-card tab-content fade-in">
            <div className="card-header">
              <h4 className={`${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
                <KaraokeLessonText
                  as="span"
                  text={t('basicOp2.mirror.title')}
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
              text={t('basicOp2.mirror.desc')}
              isActive={isSpeaking && currentIndex === 3}
              currentCharIndex={currentCharIndex}
            />

            <div className={`instruction-step ${currentIndex === 4 ? 'reading-active' : ''}`} data-reading-index="4">
              <div className="step-header">
                <span className="step-number">1 </span>
                <span className="step-label">
                  <KaraokeLessonText
                    as="span"
                    text={t('basicOp2.mirror.step1')}
                    isActive={isSpeaking && currentIndex === 4}
                    currentCharIndex={currentCharIndex}
                  />
                </span>
              </div>
              <div className="step-description">
                <img src={mirrorIcon} alt={t('common.mirror_component_icon')} className="software-screenshot screenshot-small mt-4" style={{ width: '200px', marginBottom: '-3rem' }} />
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 5 ? 'reading-active' : ''}`} data-reading-index="5" style={{ marginBottom: "-3rem" }}>
              <div className="step-header">
                <span className="step-number">2 </span>
                <span className="step-label" style={{ marginTop: "-1.5rem" }}>
                  <KaraokeLessonText
                    as="span"
                    text={t('basicOp2.mirror.step2')}
                    isActive={isSpeaking && currentIndex === 5}
                    currentCharIndex={currentCharIndex}
                  />
                  <img src={leftClick} alt={t('common.left_click')} className="screenshot-click--inline" style={{ width: '40px', margin: '0 8px' }} />
                </span>
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 6 ? 'reading-active' : ''}`} data-reading-index="6">
              <div className="step-header">
                <span className="step-number">3 </span>
                <span className="step-label" style={{ marginTop: "1.5rem" }}>
                  <KaraokeLessonText
                    as="span"
                    text={t('basicOp2.mirror.step3')}
                    isActive={isSpeaking && currentIndex === 6}
                    currentCharIndex={currentCharIndex}
                  />
                </span>
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 7 ? 'reading-active' : ''}`} data-reading-index="7">
              <div className="card-header">
                <h4 className={`${currentIndex === 7 ? 'reading-active' : ''}`} data-reading-index="7">
                  <KaraokeLessonText
                    as="span"
                    text={t('lesson.result')}
                    isActive={isSpeaking && currentIndex === 7}
                    currentCharIndex={currentCharIndex}
                  />
                </h4>
              </div>
              <div className="flex-row-wrap mt-8" style={{ gap: '2rem' }}>
                <img src={mirrorResult} alt={t('common.mirror_result')} className="software-screenshot mt-8" style={{ width: '700px' }} />
              </div>
            </div>

            <div className="lesson-navigation">
              {onPrevLesson && (
  <button className="nav-button" onClick={() => handlePrev()}><ChevronLeft size={18} /> {t('common.previous')}</button>
)}
              <button className="nav-button next" onClick={() => handleNext()}>{t('common.next')} <ChevronRight size={18} /></button>
            </div>
          </div>
        )}

        {activeTab === 'rotate' && (
          <div className="lesson-card tab-content fade-in">
            <div className="card-header">
              <h4 className={`${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
                <KaraokeLessonText
                  as="span"
                  text={t('basicOp2.rotate.title')}
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
              text={t('basicOp2.rotate.desc')}
              isActive={isSpeaking && currentIndex === 3}
              currentCharIndex={currentCharIndex}
            />

            <div className={`instruction-step ${currentIndex === 4 ? 'reading-active' : ''}`} data-reading-index="4">
              <div className="step-header">
                <span className="step-number">1 </span>
                <span className="step-label">
                  <KaraokeLessonText
                    as="span"
                    text={t('basicOp2.rotate.step1')}
                    isActive={isSpeaking && currentIndex === 4}
                    currentCharIndex={currentCharIndex}
                  />
                </span>
              </div>
              <div className="step-description">
                <img src={rotateIcon} alt={t('common.rotate_component_icon')} className="software-screenshot mt-4" style={{ width: '200px', marginBottom: '-3rem' }} />
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 5 ? 'reading-active' : ''}`} data-reading-index="5" style={{ marginBottom: "-2rem" }}>
              <div className="step-header">
                <span className="step-number">2 </span>
                <span className="step-label" style={{ marginTop: "-1.5rem" }}>
                  <KaraokeLessonText
                    as="span"
                    text={t('basicOp2.rotate.step2')}
                    isActive={isSpeaking && currentIndex === 5}
                    currentCharIndex={currentCharIndex}
                  />
                  <img src={leftClick} alt={t('common.left_click')} className="screenshot-click--inline" style={{ width: '40px', margin: '0 8px' }} />
                </span>
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 6 ? 'reading-active' : ''}`} data-reading-index="6" style={{ marginBottom: "-2rem" }}>
              <div className="step-header">
                <span className="step-number">3 </span>
                <span className="step-label">
                  <KaraokeLessonText
                    as="span"
                    text={t('basicOp2.rotate.step3')}
                    isActive={isSpeaking && currentIndex === 6}
                    currentCharIndex={currentCharIndex}
                  />
                </span>
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 7 ? 'reading-active' : ''}`} data-reading-index="7">
              <div className="step-header">
                <span className="step-number">4 </span>
                <span className="step-label">
                  <KaraokeLessonText
                    as="span"
                    text={t('basicOp2.rotate.step4')}
                    isActive={isSpeaking && currentIndex === 7}
                    currentCharIndex={currentCharIndex}
                  />
                </span>
              </div>
              <div className="step-description">
                <img src={rotateEntry} alt={t('common.rotate_entry')} className="software-screenshot mt-4" style={{ width: '900px' }} />
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 8 ? 'reading-active' : ''}`} data-reading-index="8">
              <div className="card-header">
                <h4 className={`${currentIndex === 8 ? 'reading-active' : ''}`} data-reading-index="8">
                  <KaraokeLessonText
                    as="span"
                    text={t('lesson.result')}
                    isActive={isSpeaking && currentIndex === 8}
                    currentCharIndex={currentCharIndex}
                  />
                </h4>
              </div>
              <div className="flex-row-wrap mt-8" style={{ gap: '2rem' }}>
                <img src={rotateResult} alt={t('common.rotate_result')} className="software-screenshot mt-8" style={{ width: '700px' }} />
              </div>
            </div>
            <div className="lesson-navigation">
              {onPrevLesson && (
  <button className="nav-button" onClick={() => handlePrev()}><ChevronLeft size={18} /> {t('common.previous')}</button>
)}
              <button className="nav-button next" onClick={() => handleNext()}>{t('common.next')} <ChevronRight size={18} /></button>
            </div>
          </div>
        )}

        {activeTab === 'repeat' && (
          <div className="lesson-card tab-content fade-in">
            <div className="card-header">
              <h4 className={`${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
                <KaraokeLessonText
                  as="span"
                  text={t('component.repeat.title')}
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
              text={t('component.repeat.desc')}
              isActive={isSpeaking && currentIndex === 3}
              currentCharIndex={currentCharIndex}
            />


            <div className={`instruction-step ${currentIndex === 3 ? 'reading-active' : ''}`} data-reading-index="3">
              <div className="step-description">
                <img src={repeatCopyIcon} alt={t('common.repeat_copy_icon')} className="software-screenshot mt-4" style={{ width: '200px' }} />
              </div>
            </div>



            <div className={`instruction-step ${currentIndex === 4 ? 'reading-active' : ''}`} data-reading-index="4">
              <div className="card-header">
                <h4 className={`${currentIndex === 4 ? 'reading-active' : ''}`} data-reading-index="4">
                  <KaraokeLessonText
                    as="span"
                    text={t('lesson.result')}
                    isActive={isSpeaking && currentIndex === 4}
                    currentCharIndex={currentCharIndex}
                  />
                </h4>
              </div>
              <div className="flex-row-wrap mt-8" style={{ gap: '2rem' }}>
                <img src={repeatCopyResult} alt={t('common.repeat_copy_result')} className="software-screenshot mt-8" style={{ width: '900px' }} />
              </div>
            </div>

            <div className="lesson-navigation">
              {onPrevLesson && (
  <button className="nav-button" onClick={() => handlePrev()}><ChevronLeft size={18} /> {t('common.previous')}</button>
)}
              <button className="nav-button next" onClick={() => handleNext()}>{t('common.next')} <ChevronRight size={18} /></button>
            </div>
          </div>
        )}

        {activeTab === 'rotateCopy' && (
          <div className="lesson-card tab-content fade-in">
            <div className="card-header">
              <h4 className={`${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
                <KaraokeLessonText
                  as="span"
                  text={t('basicOp2.rotateCopy.title')}
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
              text={t('basicOp2.rotateCopy.desc')}
              isActive={isSpeaking && currentIndex === 3}
              currentCharIndex={currentCharIndex}
            />

            <div className={`instruction-step ${currentIndex === 4 ? 'reading-active' : ''}`} data-reading-index="4">
              <div className="step-header">
                <span className="step-number">1 </span>
                <span className="step-label">
                  <KaraokeLessonText
                    as="span"
                    text={t('basicOp2.rotate.step1')}
                    isActive={isSpeaking && currentIndex === 4}
                    currentCharIndex={currentCharIndex}
                  />
                </span>
              </div>
              <div className="step-description">
                <img src={rotateCopyIcon} alt={t('common.rotate_copy_icon_1')} className="software-screenshot mt-4" style={{ width: '200px', marginBottom: '-3rem' }} />
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 5 ? 'reading-active' : ''}`} data-reading-index="5" style={{ marginBottom: "-2rem" }}>
              <div className="step-header">
                <span className="step-number">2 </span>
                <span className="step-label" style={{ marginTop: "-1.5rem" }}>
                  <KaraokeLessonText
                    as="span"
                    text={t('basicOp2.rotateCopy.step2')}
                    isActive={isSpeaking && currentIndex === 5}
                    currentCharIndex={currentCharIndex}
                  />
                  <img src={leftClick} alt={t('common.left_click')} className="screenshot-click--inline" style={{ width: '40px', margin: '0 8px' }} />
                </span>
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 6 ? 'reading-active' : ''}`} data-reading-index="6" style={{ marginBottom: "-2rem" }}>
              <div className="step-header">
                <span className="step-number">3 </span>
                <span className="step-label">
                  <KaraokeLessonText
                    as="span"
                    text={t('basicOp2.rotate.step3')}
                    isActive={isSpeaking && currentIndex === 6}
                    currentCharIndex={currentCharIndex}
                  />
                </span>
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 7 ? 'reading-active' : ''}`} data-reading-index="7">
              <div className="step-header">
                <span className="step-number">4 </span>
                <span className="step-label">
                  <KaraokeLessonText
                    as="span"
                    text={t('basicOp2.rotate.step4')}
                    isActive={isSpeaking && currentIndex === 7}
                    currentCharIndex={currentCharIndex}
                  />
                </span>
              </div>
              <div className="step-description">
                <img src={rotateCopyEntry} alt={t('common.rotate_copy_entry')} className="software-screenshot mt-4" style={{ width: '900px', marginBottom: '-3rem' }} />
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 8 ? 'reading-active' : ''}`} data-reading-index="8">
              <div className="card-header">
                <h4 className={`${currentIndex === 8 ? 'reading-active' : ''}`} data-reading-index="8">
                  <KaraokeLessonText
                    as="span"
                    text={t('lesson.result')}
                    isActive={isSpeaking && currentIndex === 8}
                    currentCharIndex={currentCharIndex}
                  />
                </h4>
              </div>
              <div className="flex-row-wrap mt-8" style={{ gap: '2rem' }}>
                <img src={rotateCopyPoints} alt={t('common.rotate_copy_points')} className="software-screenshot mt-8" style={{ width: '900px' }} />
              </div>
            </div>


            <div className="lesson-navigation">
              {onPrevLesson && (
  <button className="nav-button" onClick={() => handlePrev()}><ChevronLeft size={18} /> {t('common.previous')}</button>
)}
              <button className="nav-button next" onClick={() => handleNext()}>{t('common.next')} <ChevronRight size={18} /></button>
            </div>
          </div>
        )}

        {activeTab === 'mirrorCopy' && (
          <div className="lesson-card tab-content fade-in">
            <div className="card-header">
              <h4 className={`${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
                <KaraokeLessonText
                  as="span"
                  text={t('basicOp2.mirrorCopy.title')}
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
              text={t('basicOp2.mirrorCopy.desc')}
              isActive={isSpeaking && currentIndex === 3}
              currentCharIndex={currentCharIndex}
            />


            <div className={`instruction-step ${currentIndex === 4 ? 'reading-active' : ''}`} data-reading-index="4">
              <img src={mirrorCopyIcon} alt={t('common.mirror_copy_icon_1')} className="software-screenshot mt-4" style={{ width: '200px' }} />
              <KaraokeLessonText
                as="p"
                text={t('basicOp2.mirrorCopy.step1')}
                isActive={isSpeaking && currentIndex === 4}
                currentCharIndex={currentCharIndex}
                style={{ marginTop: "2rem" }}
              />

              <div className="card-header">
                <h4 className={`${currentIndex === 4 ? 'reading-active' : ''}`} data-reading-index="4">
                  <KaraokeLessonText
                    as="span"
                    text={t('lesson.result')}
                    isActive={isSpeaking && currentIndex === 4}
                    currentCharIndex={currentCharIndex}
                  />
                </h4>
              </div>
              <div className="flex-row-wrap mt-8" style={{ gap: '2rem' }}>
                <img src={mirrorCopyResult} alt={t('common.mirror_copy_result')} className="software-screenshot mt-4" style={{ width: '900px' }} />
              </div>
            </div>

            <div className="lesson-navigation">
              {onPrevLesson && (
  <button className="nav-button" onClick={() => handlePrev()}><ChevronLeft size={18} /> {t('common.previous')}</button>
)}
              <button className="nav-button next" onClick={() => handleNext()}>{t('common.next')} <ChevronRight size={18} /></button>
            </div>
          </div>
        )}

        {activeTab === 'delete' && (
          <div className="lesson-card tab-content fade-in">
            <div className="card-header">
              <h4 className={`${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
                <KaraokeLessonText
                  as="span"
                  text={t('basicOp2.delete.title')}
                  isActive={isSpeaking && currentIndex === 2}
                  currentCharIndex={currentCharIndex}
                />
              </h4>
            </div>

            <div className={`instruction-step ${currentIndex === 3 ? 'reading-active' : ''}`} data-reading-index="3">
              <div className="step-header">
                <span className="step-number">1 </span>
                <span className="step-label">
                  <KaraokeLessonText
                    as="span"
                    text={t('basicOp2.delete.step1')}
                    isActive={isSpeaking && currentIndex === 3}
                    currentCharIndex={currentCharIndex}
                  />
                </span>
              </div>
              <div className="step-description">
                <img src={deleteIcon} alt={t('common.delete_component_icon')} className="software-screenshot mt-4" style={{ width: '200px', marginBottom: '-3rem' }} />
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 4 ? 'reading-active' : ''}`} data-reading-index="4">
              <div className="step-header">
                <span className="step-number">2 </span>
                <span className="step-label">
                  <KaraokeLessonText
                    as="span"
                    text={t('basicOp2.delete.step2')}
                    isActive={isSpeaking && currentIndex === 4}
                    currentCharIndex={currentCharIndex}
                  />
                </span>
              </div>
            </div>

            <div className="lesson-navigation">
              {onPrevLesson && (
  <button className="nav-button" onClick={() => handlePrev()}><ChevronLeft size={18} /> {t('common.previous')}</button>
)}
              <button className="nav-button next" onClick={onNextLesson}>{nextLabel || t('common.next')} <ChevronRight size={18} /></button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComponentLesson;
