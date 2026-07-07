import i18n from 'i18next';
import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLessonCore } from '../../../hooks/useLessonCore';
import VideoTutorialViewer from '../VideoTutorialViewer';
import { KaraokeLessonText } from '../../KaraokeLessonText';
import {
  moveTutorialSteps,
  rotateTutorialSteps,
  mirrorTutorialSteps,
  copyTutorialSteps
} from '../VideoTutorialData/basicOp2TutorialSteps';

import rotateCopyIcon from '../../../assets/3D_Image_File/basic_operation3_rotatecopy.png';
import rotateCopyAxis from '../../../assets/3D_Image_File/basic_operation3_rotate_copy.png';
import mirrorCopyIcon from '../../../assets/3D_Image_File/basic_operation3_mirror_copy.png';
import mirrorCopyResult from '../../../assets/3D_Image_File/basic_operation3_mirrorcopy.png';
import deleteIcon from '../../../assets/3D_Image_File/basic_operation3_delete.png';

interface SubLessonProps {
  subLessonId: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
  nextLabel?: string;
}

type Op2Tab = 'move' | 'rotate' | 'mirror' | 'copy' | 'rotateCopy' | 'mirrorCopy' | 'delete';

const BasicOperation2: React.FC<SubLessonProps> = ({ subLessonId, onNextLesson, onPrevLesson, nextLabel }) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<Op2Tab>(() => {
    return (localStorage.getItem(`${subLessonId}-tab`) as Op2Tab) || 'move';
  });
  const { scrollProgress, containerRef, speak, stop, isSpeaking, currentIndex, currentCharIndex, registerText } = useLessonCore(subLessonId);

  useEffect(() => {
    localStorage.setItem(`${subLessonId}-tab`, activeTab);
  }, [subLessonId, activeTab]);

  const tabs = [
    { id: 'move', label: 'Move' },
    { id: 'rotate', label: 'Rotate' },
    { id: 'mirror', label: 'Mirror' },
    { id: 'copy', label: 'Copy' },
    { id: 'rotateCopy', label: 'Rotate Copy' },
    { id: 'mirrorCopy', label: 'Mirror Copy' },
    { id: 'delete', label: 'Delete' }
  ];

  const getStepsText = (tab: Op2Tab): string[] => {
    switch (tab) {
      case 'rotateCopy':
        return [
          t('basic_op_2.rotate_copy_desc'),
          t('basic_op_2.result')
        ];
      case 'mirrorCopy':
        return [
          t('basic_op_2.mirror_copy_desc'),
          t('basic_op_2.result')
        ];
      case 'delete':
        return [
          t('basic_op_2.delete_step_1'),
          t('basic_op_2.delete_step_2')
        ];
      default:
        return [];
    }
  };

  useEffect(() => {
    const isVideoTab = ['move', 'rotate', 'mirror', 'copy'].includes(activeTab);
    if (!isVideoTab) {
      const introTitle = t('basic_op_2.intro_title');
      const introDesc = t('basic_op_2.intro_desc');
      const currentSteps = getStepsText(activeTab);
      const fullSteps = [introTitle, introDesc, activeTab.toUpperCase(), ...currentSteps];
      registerText(fullSteps, 2);
    }
  }, [activeTab, registerText]);

  useEffect(() => {
    const handlePlayTutorial = () => {
      const isVideoTab = ['move', 'rotate', 'mirror', 'copy'].includes(activeTab);
      if (!isVideoTab) {
        speak();
      }
    };
    
    const handleStopTutorial = () => {
      const isVideoTab = ['move', 'rotate', 'mirror', 'copy'].includes(activeTab);
      if (!isVideoTab) {
        stop();
      }
    };

    window.addEventListener('kmti-play-tutorial', handlePlayTutorial);
    window.addEventListener('kmti-stop-tutorial', handleStopTutorial);
    return () => {
      window.removeEventListener('kmti-play-tutorial', handlePlayTutorial);
      window.removeEventListener('kmti-stop-tutorial', handleStopTutorial);
    };
  }, [activeTab, speak, stop]);

  const handleNext = () => {
    stop();
    sessionStorage.setItem('tts-autoplay-active', 'false');
    const i = tabs.findIndex(t => t.id === activeTab);
    if (i < tabs.length - 1) { 
      setActiveTab(tabs[i + 1].id as Op2Tab); 
    } else if (onNextLesson) {
      onNextLesson();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrev = () => {
    stop();
    sessionStorage.setItem('tts-autoplay-active', 'false');
    const i = tabs.findIndex(t => t.id === activeTab);
    if (i > 0) { 
      setActiveTab(tabs[i - 1].id as Op2Tab); 
    } else if (onPrevLesson) {
      onPrevLesson();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getTutorialSteps = (tab: Op2Tab) => {
    switch (tab) {
      case 'move': return moveTutorialSteps;
      case 'rotate': return rotateTutorialSteps;
      case 'mirror': return mirrorTutorialSteps;
      case 'copy': return copyTutorialSteps;
      default: return [];
    }
  };

  const getSidebarCardData = (tab: Op2Tab) => {
    switch (tab) {
      case 'move':
        return {
          title: "Move Tool Guide",
          menuPath: "Solid Edit -> Move",
          shortcut: "Shortcut Key: M",
          description: "Relocates 3D entities in space either along global coordinate axes or by freehand drag-and-drop vector points.",
          steps: [
            "Select Move from the Solid Edit menu",
            "Left-click on the entity to move",
            "Right-click to confirm selection (Go)",
            "Enter X, Y, Z offsets OR click start and end points"
          ]
        };
      case 'rotate':
        return {
          title: "Rotate Tool Guide",
          menuPath: "Solid Edit -> Rotate",
          shortcut: "Shortcut Key: R",
          description: "Rotates 3D entities around a specific rotation axis defined by center points and direction vectors.",
          steps: [
            "Select Rotate from the menu",
            "Left-click on target entity",
            "Right-click to confirm selection (Go)",
            "Specify rotation center point",
            "Input rotation angle value and press Enter"
          ]
        };
      case 'mirror':
        return {
          title: "Mirror Tool Guide",
          menuPath: "Solid Edit -> Mirror",
          shortcut: "Shortcut Key: Alt + M",
          description: "Reflects an entity across a defined 3D plane of symmetry.",
          steps: [
            "Select Mirror from the menu",
            "Left-click target entity & confirm (Go)",
            "Select 3 points to define reflection plane"
          ]
        };
      case 'copy':
        return {
          title: "Copy Tool Guide",
          menuPath: "Solid Edit -> Copy",
          shortcut: "Shortcut Key: C",
          description: "Creates exact duplicates of target solid entities at a specified displacement vector.",
          steps: [
            "Select Copy from the Solid Edit menu",
            "Left-click target entity & confirm (Go)",
            "Enter X, Y, Z relative spacing values",
            "Press Enter to complete copy"
          ]
        };
      default:
        return null;
    }
  };

  const isVideoTab = ['move', 'rotate', 'mirror', 'copy'].includes(activeTab);

  return (
    <div className={`course-lesson-container`} ref={containerRef}>
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      <div className="lesson-tabs">
        {tabs.map(tab => (
          <button 
            key={tab.id} 
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`} 
            onClick={() => { stop(); sessionStorage.setItem('tts-autoplay-active', 'false'); setActiveTab(tab.id as Op2Tab); }}
          >
            {i18n.t('tabs.' + tab.id, tab.label)}
          </button>
        ))}
      </div>

      <div className="lesson-grid interactive-layout single-card" style={{ marginTop: '2rem', position: 'relative' }}>
        {isVideoTab ? (
          <div className="lesson-card tab-content fade-in" style={{ position: 'relative', width: '100%' }}>
            <div className="card-header">
              <h4 style={{ margin: 0 }}>{t('common.tutorial_header', { defaultValue: '{{tab}} TUTORIAL', tab: activeTab.toUpperCase() }).replace('{{tab}}', activeTab.toUpperCase())}</h4>
            </div>

            <div className="interactive-stage-container" style={{ height: '500px', width: '100%', marginTop: '2rem', marginBottom: '2rem' }}>
              <VideoTutorialViewer steps={getTutorialSteps(activeTab)} />
            </div>

            {/* Glassmorphism Floating Guide Overlay Card (Hidden for now) */}
            {false && (() => {
              const data = getSidebarCardData(activeTab);
              if (!data) return null;
              return (
                <div 
                  className="sidebar-helper-card" 
                  style={{ 
                    position: 'absolute', 
                    top: '7.5rem', 
                    right: '2rem', 
                    width: '280px', 
                    background: 'rgba(15, 23, 42, 0.85)', 
                    backdropFilter: 'blur(8px)', 
                    border: '1px solid var(--border-color)', 
                    borderRadius: '12px', 
                    padding: '1.25rem', 
                    zIndex: 40,
                    boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem', marginBottom: '0.75rem' }}>
                    <h4 style={{ margin: 0, fontSize: '1rem', color: 'var(--primary)', fontWeight: 700 }}>{data.title}</h4>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block', marginTop: '0.2rem' }}>{data.menuPath}</span>
                  </div>
                  
                  <div style={{ marginBottom: '0.75rem' }}>
                    <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-main)', lineHeight: '1.4' }}>{data.description}</p>
                    <span style={{ display: 'inline-block', marginTop: '0.4rem', background: 'rgba(168, 85, 247, 0.15)', color: '#c084fc', border: '1px solid rgba(168, 85, 247, 0.3)', padding: '2px 6px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 600 }}>{data.shortcut}</span>
                  </div>

                  <div>
                    <h5 style={{ margin: '0 0 0.5rem 0', fontSize: '0.8rem', color: 'var(--text-main)', fontWeight: 700 }}>
                      OPERATIONAL STEPS
                    </h5>
                    <ul style={{ margin: 0, paddingLeft: '1.1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {data.steps.map((step, idx) => (
                        <li key={idx} style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.3' }}>
                          {step}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })()}

            <div className="lesson-navigation">
              <button className="nav-button" onClick={() => handlePrev()}><ChevronLeft size={18} /> {t('common.previous')}</button>
              <button className="nav-button next" onClick={() => handleNext()}>{t('common.next')} <ChevronRight size={18} /></button>
            </div>
          </div>
        ) : (
          <div className="lesson-card tab-content fade-in">
            {activeTab === 'rotateCopy' && (
              <>
                <div className="card-header">
                  <h4 className={`${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
                    <KaraokeLessonText
                      as="span"
                      text={t('basic_op_2.rotate_copy_title')}
                      isActive={isSpeaking && currentIndex === 2}
                      currentCharIndex={currentCharIndex}
                    />
                  </h4>
                </div>
                <p className={`p-flush ${currentIndex === 3 ? "reading-active" : ""}`} data-reading-index="3" style={{ marginTop: "-2rem", color: '#94a3b8' }}>
                  <KaraokeLessonText
                    as="span"
                    text={t('basic_op_2.rotate_copy_desc')}
                    isActive={isSpeaking && currentIndex === 3}
                    currentCharIndex={currentCharIndex}
                  />
                </p>

                <div className="step-description">
                  <img src={rotateCopyIcon} alt="Rotate Copy icon" className="software-screenshot screenshot-small" style={{ width: '250px' }} />
                </div>

                <div className={`instruction-step ${currentIndex === 4 ? 'reading-active' : ''}`} data-reading-index="4">
                  <div className="card-header">
                    <h4>
                      <KaraokeLessonText
                        as="span"
                        text={t('basic_op_2.result')}
                        isActive={isSpeaking && currentIndex === 4}
                        currentCharIndex={currentCharIndex}
                      />
                    </h4>
                  </div>
                  <img src={rotateCopyAxis} alt="Rotate Copy Result" className="software-screenshot screenshot-large mt-8" style={{ width: '900px' }} />
                </div>
              </>
            )}

            {activeTab === 'mirrorCopy' && (
              <>
                <div className="card-header">
                  <h4 className={`${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
                    <KaraokeLessonText
                      as="span"
                      text={t('basic_op_2.mirror_copy_title')}
                      isActive={isSpeaking && currentIndex === 2}
                      currentCharIndex={currentCharIndex}
                    />
                  </h4>
                </div>
                <p className={`p-flush ${currentIndex === 3 ? "reading-active" : ""}`} data-reading-index="3" style={{ marginTop: "-2rem", color: '#94a3b8' }}>
                  <KaraokeLessonText
                    as="span"
                    text={t('basic_op_2.mirror_copy_desc')}
                    isActive={isSpeaking && currentIndex === 3}
                    currentCharIndex={currentCharIndex}
                  />
                </p>

                <div className="step-description">
                  <img src={mirrorCopyIcon} alt="Mirror Copy icon" className="software-screenshot screenshot-small" style={{ width: '250px' }} />
                </div>

                <div className={`instruction-step ${currentIndex === 4 ? 'reading-active' : ''}`} data-reading-index="4">
                  <div className="card-header">
                    <h4>
                      <KaraokeLessonText
                        as="span"
                        text={t('basic_op_2.result')}
                        isActive={isSpeaking && currentIndex === 4}
                        currentCharIndex={currentCharIndex}
                      />
                    </h4>
                  </div>
                  <img src={mirrorCopyResult} alt="Mirror Copy Preview" className="software-screenshot screenshot-large mt-8" style={{ width: '900px' }} />
                </div>
              </>
            )}

            {activeTab === 'delete' && (
              <>
                <div className="card-header">
                  <h4 className={`${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
                    <KaraokeLessonText
                      as="span"
                      text={t('basic_op_2.delete_title')}
                      isActive={isSpeaking && currentIndex === 2}
                      currentCharIndex={currentCharIndex}
                    />
                  </h4>
                </div>

                <div className={`instruction-step ${currentIndex === 3 ? 'reading-active' : ''}`} data-reading-index="3" style={{ marginBottom: "2rem" }}>
                  <div className="step-header">
                    <span className="step-number">1 </span>
                    <KaraokeLessonText
                      as="span"
                      className="step-label"
                      text={t('basic_op_2.delete_step_1')}
                      isActive={isSpeaking && currentIndex === 3}
                      currentCharIndex={currentCharIndex}
                    />
                  </div>
                </div>

                <div className={`instruction-step ${currentIndex === 4 ? 'reading-active' : ''}`} data-reading-index="4">
                  <div className="step-header">
                    <span className="step-number">2 </span>
                    <KaraokeLessonText
                      as="span"
                      className="step-label"
                      text={t('basic_op_2.delete_step_2')}
                      isActive={isSpeaking && currentIndex === 4}
                      currentCharIndex={currentCharIndex}
                    />
                  </div>
                  <div className="step-description">
                    <img src={deleteIcon} alt="Delete icon" className="software-screenshot screenshot-small" style={{ width: '300px' }} />
                  </div>
                </div>
              </>
            )}

            <div className="lesson-navigation">
              <button className="nav-button" onClick={() => handlePrev()}><ChevronLeft size={18} /> {t('common.previous')}</button>
              <button className="nav-button next" onClick={() => handleNext()}>{activeTab === 'delete' ? (nextLabel ? t('common.next_lesson') : t('common.next')) : t('common.next')} <ChevronRight size={18} /></button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BasicOperation2;
export type { SubLessonProps };
