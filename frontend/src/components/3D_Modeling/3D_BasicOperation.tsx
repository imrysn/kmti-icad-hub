

import React, {
  useEffect, useRef,
  useState
} from 'react';

import {
  ChevronLeft,
  ChevronRight,
  Play
} from 'lucide-react';
import { useLessonCore } from '../../hooks/useLessonCore';

import './CourseLesson.css';
import { KaraokeLessonText } from '../KaraokeLessonText';
import { useTranslation } from '../../context/LanguageContext';
import {
  boxTutorialSteps,
  coneTutorialSteps,
  cylinderTutorialSteps,
  polygonTutorialSteps,
  torusTutorialSteps
} from './VideoTutorialData/basicOp1TutorialSteps';
import VideoTutorialViewer from './VideoTutorialViewer';
/* ── Shared Asset Imports ────────────────────────────────────────────────── */

import leftClick from '../../assets/3d-images/left_click.png';

// Video imports for replacing preview images
import vidCopy from '../../assets/3D_Video_Tutorial/basicOp_copy.mp4';
import vidMirror from '../../assets/3D_Video_Tutorial/basicOp_mirror.mp4';
import vidMove from '../../assets/3D_Video_Tutorial/basicOp_move.mp4';
import vidRotate from '../../assets/3D_Video_Tutorial/basicOp_rotate.mp4';
/* ══════════════════════════════════════════════════════════════════════════ */
/* Basic Operation (1)  ECREATING BASIC SHAPES */
/* Lesson-item child ID: 'basic-op-1' */
/* Tabs: Cylinder | Box | Polygon | Cone | Torus */
/* ══════════════════════════════════════════════════════════════════════════ */

import cmdMenu from '../../assets/3d-images/basic_operation1_command_menu.png';

import threeDView from '../../assets/3d-images/basic_operation1_3d_view.png';

















/* ══════════════════════════════════════════════════════════════════════════ */
/* Basic Operation (2)  EMOVE, ROTATE, COPY, MIRROR, DELETE */
/* Lesson-item child ID: 'basic-op-2' */
/* Tabs: Move | Rotate | Mirror | Copy | Rotate Copy | Mirror Copy | Delete */
/* ══════════════════════════════════════════════════════════════════════════ */

import operationsMenu from '../../assets/3d-images/basic_operation1_move_rotate_copy_mirror_delete.png';

import moveMenu from '../../assets/3d-images/basic_operation2_move.png';

import itemEntryMove from '../../assets/3d-images/basic_operation2_item_entry_box.png';


import rotateIcon from '../../assets/3d-images/basic_operation3_rotate.png';


import rotateEntry from '../../assets/3d-images/basic_operation3_rotate_item_entry.png';

import mirrorIcon from '../../assets/3d-images/basic_operation3_mirror.png';


import copyIcon from '../../assets/3d-images/basic_operation3_copy.png';

import copyDistance from '../../assets/3d-images/basic_operation3_copy_distance.png';


import rotateCopyIcon from '../../assets/3d-images/basic_operation3_rotatecopy.png';

import rotateCopyAxis from '../../assets/3d-images/basic_operation3_rotate_copy.png';

import mirrorCopyIcon from '../../assets/3d-images/basic_operation3_mirror_copy.png';

import mirrorCopyResult from '../../assets/3d-images/basic_operation3_mirrorcopy.png';

import deleteIcon from '../../assets/3d-images/basic_operation3_delete.png';
/* ══════════════════════════════════════════════════════════════════════════ */
/* Basic Operation (3)  ESKETCH / EXTRUDE / REVOLVE / SHOW-HIDE / STRETCH / RESIZE */
/* Lesson-item child ID: 'basic-op-3' */
/* Tabs: Sketch/Extrude/Revolve | Show/Hide | Stretch | Resize */
/* ══════════════════════════════════════════════════════════════════════════ */

import sketchIcon from '../../assets/3d-images/basic_operation4_sketch.jpg';

import sketchResultImg from '../../assets/3d-images/basic_operation4_sketch1.jpg';

import sketchIntroImg from '../../assets/3d-images/basic_operation_(3)_sketch.jpg';

import extrudeRevolveMenu from '../../assets/3d-images/basic_operation4_extrude_revolve.png';

import extrudeOneSide from '../../assets/3d-images/basic_operation4_extrusion_oneside.png';
/* cspell:disable-line */

import extrudeBothSide from '../../assets/3d-images/basic_operation4_extrusion_bothside.png';
/* cspell:disable-line */

import revolveIcon from '../../assets/3d-images/basic_operation4_revolve.png';


import revolveP2 from '../../assets/3d-images/basic_operation4_revolve_p2.png';

import showHideMenu from '../../assets/3d-images/basic_operation4_show_hide.jpg';

import showHideEntity from '../../assets/3d-images/basic_operation4_show_hide_entity.png';

import showHideDraftingEntity from '../../assets/3d-images/basic_operation4_showhide_drafting_entity.png';
/* cspell:disable-line */

import hideUnselectedEntity from '../../assets/3d-images/basic_operation4_hide_unselected_entity.png';

import hideUnselectedEntity1 from '../../assets/3d-images/basic_operation4_hide_unselected_entity_1.png';

import stretchIcon from '../../assets/3d-images/basic_operation5_stretch.png';
import fairingChamferImg from '../../assets/3d-images/fairing_chamfer.jpg';

import stretchItemEntry from '../../assets/3d-images/basic_operation5_item_entry_stretch.png';

import stretchImg1 from '../../assets/3d-images/basic_operation5_stretch1.png';

import stretchImg2 from '../../assets/3d-images/basic_operation5_stretch2.png';

import resizeIcon from '../../assets/3d-images/basic_operation5_resize.png';

import resizeItemEntry from '../../assets/3d-images/basic_operation5_item_entry_resize.png';

import resize3_2 from '../../assets/3d-images/basic_operation5_resize3_2.png';
/* ══════════════════════════════════════════════════════════════════════════ */
/* Basic Operation (4)  EARRANGE MACHINE PART / SHAPE STEELS */
/* Lesson-item child ID: 'basic-op-4' */
/* Tabs: Shape Steels */
/* ══════════════════════════════════════════════════════════════════════════ */

import arrangeMachinePartMenu from '../../assets/3d-images/basic_operation6_arrange_machine_part.png';

import arrangeMachinePartWindow from '../../assets/3d-images/basic_operation6_arrange_machine_part_window.png';

import shapeSteelsTypes from '../../assets/3d-images/basic_operation6_shape_steels.png';

import shapeSteels1 from '../../assets/3d-images/basic_operation6_shape_steels1.png';

import shapeSteels2 from '../../assets/3d-images/basic_operation6_shape_steels2.png';

import keyEntryArea from '../../assets/3d-images/basic_operation1_key_entry_area.png';
/* ────────────────────────────────────────────────────────────────────────── */
/* Sub-lesson components */
/* ────────────────────────────────────────────────────────────────────────── */
interface PremiumVideoPlayerProps {
  src: string;
  style?: React.CSSProperties;
  className?: string;
}

const PremiumVideoPlayer: React.FC<PremiumVideoPlayerProps> = ({ src, style, className }) => {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);

  const handlePlayToggle = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().catch(err => console.log("Video play failed:", err));
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div
      className={`premium-video-wrapper ${className || ''}`}
      style={{
        position: 'relative',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 12px 36px rgba(0,0,0,0.4)',
        border: '1px solid rgba(255,255,255,0.08)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        ...style
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.015)';
        e.currentTarget.style.boxShadow = '0 20px 48px rgba(0,0,0,0.5)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = '0 12px 36px rgba(0,0,0,0.4)';
      }}
    >
      <video
        ref={videoRef}
        src={src}
        controls
        loop
        muted
        style={{ width: '100%', height: '100%', display: 'block' }}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      {!isPlaying && (
        <div
          onClick={handlePlayToggle}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.45)',
            backdropFilter: 'blur(2px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'opacity 0.3s ease',
            cursor: 'pointer',
            zIndex: 2,
          }}
        >
          <div
            className="play-btn-pulse"
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'rgba(168, 85, 247, 0.25)',
              border: '2px solid #a855f7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 20px rgba(168, 85, 247, 0.6)',
              animation: 'playPulse 2s infinite',
              transition: 'transform 0.2s ease, background-color 0.2s ease',
            }}
          >
            <Play size={36} fill="#ffffff" color="#ffffff" style={{ marginLeft: '4px' }} />
          </div>
        </div>
      )}
    </div>
  );
};

/* ── Basic Operation (1): Creating Basic Shapes ── */

interface SubLessonProps {
  subLessonId: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
  nextLabel?: string;
}

const BasicOperation1: React.FC<SubLessonProps> = ({ subLessonId, onNextLesson, onPrevLesson }) => {
  const [activeTab, setActiveTab] = useState<'cylinder' | 'box' | 'polygon' | 'cone' | 'torus'>(() => {
    return (localStorage.getItem(`${subLessonId}-tab`) as any) || 'cylinder';
  });
  const { t } = useTranslation();
  const { scrollProgress, containerRef, stop, isSpeaking, currentIndex, currentCharIndex, registerText } = useLessonCore(subLessonId);

  useEffect(() => {
    localStorage.setItem(`${subLessonId}-tab`, activeTab);
  }, [subLessonId, activeTab]);

  const mapSteps = React.useCallback((steps: any[], shapeId: string) => {
    return steps.map(s => {
      const stepNum = s.id.split('-')[1];
      const stepKey = stepNum === '0' ? 'intro' : (stepNum === (steps.length - 1).toString() ? 'outro' : `step${stepNum}`);
      return { 
        ...s, 
        title: s.customTitle || t(`basicOp.${shapeId}.title`), 
        text: s.customText || t(`basicOp.${shapeId}.${stepKey}`) 
      };
    });
  }, [t]);

  const videoSectionRef = useRef<HTMLDivElement>(null);
  const beforeYouStartRef = useRef<HTMLDivElement>(null);

  // ── Unified narrated tour (single script, auto-switches tabs) ────────────
  // Memoised so the array reference is stable across renders, avoiding
  // spurious re-registrations in the registerText useEffect below.
  const lessonSteps = React.useMemo(() => [
    t('basicOp1.heading'),                                                         // 0 heading
    t('basicOp1.overview'), // 1 overview
    t('basicOp1.cylinder.desc'), // 2 → cylinder tab
    t('basicOp1.box.desc'), // 3 → box tab
    t('basicOp1.polygon.desc'), // 4 → polygon tab
    t('basicOp1.cone.desc'), // 5 → cone tab
    t('basicOp1.torus.desc'), // 6 → torus tab
    t('basicOp1.start_front_view'), // 7 → back to cylinder, scroll to Before You Start
    t('basicOp1.arrange_y_orientation'), // 8 → command menu step
    t('basicOp1.video_intro') // 9 → scroll to video
  ], [t]);

  // Auto-switch tabs as TTS progresses through the narrated tour
  useEffect(() => {
    if (!isSpeaking) return;
    if (currentIndex === 2) setActiveTab('cylinder');
    else if (currentIndex === 3) setActiveTab('box');
    else if (currentIndex === 4) setActiveTab('polygon');
    else if (currentIndex === 5) setActiveTab('cone');
    else if (currentIndex === 6) setActiveTab('torus');
    else if (currentIndex === 7) {
      // Back to Cylinder, scroll to Before You Start card
      setActiveTab('cylinder');
      setTimeout(() => {
        beforeYouStartRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 600);
    } else if (currentIndex === 9) {
      // Scroll to video tutorial
      setTimeout(() => {
        videoSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 600);
    }
  }, [currentIndex, isSpeaking]);


  useEffect(() => {
    registerText(lessonSteps, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [registerText]);



  const tabs = [
    { id: 'cylinder', label: t('basicOp.cylinder.title') },
    { id: 'box', label: t('basicOp.box.title') },
    { id: 'polygon', label: t('basicOp.polygon.title') },
    { id: 'cone', label: t('basicOp.cone.title') },
    { id: 'torus', label: t('basicOp.torus.title') }
  ];

  const handleNext = (eOrIsAuto?: boolean | React.MouseEvent | React.MouseEvent<HTMLButtonElement>) => {
    const isAuto = typeof eOrIsAuto === 'boolean' ? eOrIsAuto : false;
    stop();
    if (!isAuto) {
      sessionStorage.setItem('tts-autoplay-active', 'false');
    }
    const i = tabs.findIndex(t => t.id === activeTab);
    if (i < tabs.length - 1) { setActiveTab(tabs[i + 1].id as any); } else if (onNextLesson) onNextLesson();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrev = (eOrIsAuto?: boolean | React.MouseEvent | React.MouseEvent<HTMLButtonElement>) => {
    const isAuto = typeof eOrIsAuto === 'boolean' ? eOrIsAuto : false;
    stop();
    if (!isAuto) {
      sessionStorage.setItem('tts-autoplay-active', 'false');
    }
    const i = tabs.findIndex(t => t.id === activeTab);
    if (i > 0) { setActiveTab(tabs[i - 1].id as any); } else if (onPrevLesson) onPrevLesson();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };







  return (
    <div className={`course-lesson-container`} ref={containerRef}>
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      <div className="lesson-tabs">
        {tabs.map(tab => (<button key={tab.id} className={`tab-button ${activeTab === tab.id ? 'active' : ''}`} onClick={() => { stop(); sessionStorage.setItem('tts-autoplay-active', 'false'); setActiveTab(tab.id as any); }}>{tab.label}</button>))}
      </div>

      <section className="lesson-intro">
        <h3 className={`section-title ${currentIndex === 0 ? 'reading-active' : ''}`} data-reading-index="0">
          <KaraokeLessonText
            text={lessonSteps[0]}
            isActive={isSpeaking && currentIndex === 0}
            currentCharIndex={currentCharIndex}
          />
        </h3>

        {/* TTS index 1 — overview narration */}
        <div className={`instruction-step ${currentIndex === 1 ? 'reading-active' : ''}`} data-reading-index="1" style={{ marginTop: '0.5rem' }}>
          <KaraokeLessonText
            text={lessonSteps[1]}
            isActive={isSpeaking && currentIndex === 1}
            currentCharIndex={currentCharIndex}
          />
        </div>

        {/* Shape intro — tab-specific, shown here in the main intro card */}
        {(() => {
          const tabIntroIdx: Record<string, number> = { cylinder: 2, box: 3, polygon: 4, cone: 5, torus: 6 };
          const idx = tabIntroIdx[activeTab] ?? 2;
          return (
            <div className={`instruction-step ${isSpeaking && currentIndex === idx ? 'reading-active' : ''}`} data-reading-index={idx} style={{ marginTop: '1rem' }}>
              <KaraokeLessonText
                text={lessonSteps[idx]}
                isActive={isSpeaking && currentIndex === idx}
                currentCharIndex={currentCharIndex}
              />
            </div>
          );
        })()}
      </section>

      <div className="lesson-grid single-card">
        {/* Prerequisite steps card — always visible, scrolled to at TTS step 7 */}
        <div className={`lesson-card ${isSpeaking && (currentIndex === 7 || currentIndex === 8) ? 'reading-active' : ''}`} ref={beforeYouStartRef}>
          <div className="card-header">
            <h4 style={{ margin: 0 }}>{t('lesson.before_you_start')}</h4>
          </div>

          <div className={`instruction-step ${isSpeaking && currentIndex === 7 ? 'reading-active' : ''}`} data-reading-index="7" style={{ marginTop: '1.5rem' }}>
            <KaraokeLessonText
              text={lessonSteps[7]}
              isActive={isSpeaking && currentIndex === 7}
              currentCharIndex={currentCharIndex}
            />
            <img src={threeDView} alt={t('common.3d_view')} className="software-screenshot mt-8" style={{ width: '350px' }} />
          </div>

          <div className={`instruction-box mt-8 instruction-step ${isSpeaking && currentIndex === 8 ? 'reading-active' : ''}`} data-reading-index="8">
            <KaraokeLessonText
              text={lessonSteps[8]}
              isActive={isSpeaking && currentIndex === 8}
              currentCharIndex={currentCharIndex}
            />
            <img src={cmdMenu} alt={t('common.command_menu')} className="software-screenshot" style={{ width: '200px', marginTop: '1rem' }} />
          </div>
        </div>


        {activeTab === 'cylinder' && (
          <div className="lesson-card tab-content fade-in" style={{ marginTop: '2rem' }}>
            <div className="card-header">
              <h4 style={{ margin: 0 }}>{t('basicOp.cylinder.title')}</h4>
            </div>


            {/* Watch tutorial prompt — shown at step 9 (closing message) */}
            {currentIndex === 9 && isSpeaking && (
              <div className={`instruction-step reading-active`} data-reading-index="9" style={{ marginTop: '1rem' }}>
                <KaraokeLessonText
                  text={lessonSteps[9]}
                  isActive={true}
                  currentCharIndex={currentCharIndex}
                />
              </div>
            )}

            <div ref={videoSectionRef} style={{ height: '500px', width: '100%', marginTop: '2rem', marginBottom: '2rem' }}>
              <VideoTutorialViewer steps={mapSteps(cylinderTutorialSteps, 'cylinder')} />
            </div>

            <div className="lesson-navigation">
              <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> {t('common.previous')}</button>
              <button className="nav-button next" onClick={handleNext}>{t('common.next')}<ChevronRight size={18} /></button>
            </div>
          </div>
        )}

        {activeTab === 'box' && (
          <div className="lesson-card tab-content fade-in" style={{ marginTop: '2rem' }}>
            <div className="card-header">
              <h4 style={{ margin: 0 }}>{t('basicOp.box.title')}</h4>
            </div>


            <div style={{ height: '500px', width: '100%', marginTop: '2rem', marginBottom: '2rem' }}>
              <VideoTutorialViewer steps={mapSteps(boxTutorialSteps, 'box')} />
            </div>

            <div className="lesson-navigation">
              <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> {t('common.previous')}</button>
              <button className="nav-button next" onClick={handleNext}>{t('common.next')}<ChevronRight size={18} /></button>
            </div>
          </div>
        )}

        {activeTab === 'polygon' && (
          <div className="lesson-card tab-content fade-in" style={{ marginTop: '2rem' }}>
            <div className="card-header">
              <h4 style={{ margin: 0 }}>{t('basicOp.polygon.title')}</h4>
            </div>


            <div style={{ height: '500px', width: '100%', marginTop: '2rem', marginBottom: '2rem' }}>
              <VideoTutorialViewer steps={mapSteps(polygonTutorialSteps, 'polygon')} />
            </div>

            <div className="lesson-navigation">
              <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> {t('common.previous')}</button>
              <button className="nav-button next" onClick={handleNext}>{t('common.next')} <ChevronRight size={18} /></button>
            </div>
          </div>
        )}

        {activeTab === 'cone' && (
          <div className="lesson-card tab-content fade-in" style={{ marginTop: '2rem' }}>
            <div className="card-header">
              <h4 style={{ margin: 0 }}>{t('basicOp.cone.title')}</h4>
            </div>


            <div style={{ height: '500px', width: '100%', marginTop: '2rem', marginBottom: '2rem' }}>
              <VideoTutorialViewer steps={mapSteps(coneTutorialSteps, 'cone')} />
            </div>

            <div className="lesson-navigation">
              <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> {t('common.previous')}</button>
              <button className="nav-button next" onClick={handleNext}>{t('common.next')} <ChevronRight size={18} /></button>
            </div>
          </div>
        )}

        {activeTab === 'torus' && (
          <div className="lesson-card tab-content fade-in" style={{ marginTop: '2rem' }}>
            <div className="card-header">
              <h4 style={{ margin: 0 }}>{t('basicOp.torus.title')}</h4>
            </div>


            <div style={{ height: '500px', width: '100%', marginTop: '2rem', marginBottom: '2rem' }}>
              <VideoTutorialViewer steps={mapSteps(torusTutorialSteps, 'torus')} />
            </div>

            <div className="lesson-navigation">
              <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> {t('common.previous')}</button>
              <button className="nav-button next" onClick={handleNext}>{t('common.next')} <ChevronRight size={18} /></button>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};

const BasicOperation2: React.FC<SubLessonProps> = ({ subLessonId, onNextLesson, onPrevLesson, nextLabel }) => {
  const [activeTab, setActiveTab] = useState<'move' | 'copy' | 'mirror' | 'rotate' | 'rotateCopy' | 'mirrorCopy' | 'delete'>(() => {
    return (localStorage.getItem(`${subLessonId}-tab`) as any) || 'move';
  });
  const { t } = useTranslation();
  const { scrollProgress, containerRef, speak, stop, isSpeaking, currentIndex, currentCharIndex, registerText } = useLessonCore(subLessonId);

  useEffect(() => {
    localStorage.setItem(`${subLessonId}-tab`, activeTab);
  }, [subLessonId, activeTab]);

  const moveSteps = [
    t('basicOp2.move.step1'),
    t('basicOp2.move.step2'),
    t('basicOp2.move.step3')
  ];

  const rotateSteps = [
    t('basicOp2.rotate.step1'),
    t('basicOp2.rotate.step2'),
    t('basicOp2.rotate.step3'),
    t('basicOp2.rotate.step4')
  ];

  const mirrorSteps = [
    t('basicOp2.mirror.step1'),
    t('basicOp2.mirror.step2'),
    t('basicOp2.mirror.step3')
  ];

  const copySteps = [
    t('basicOp2.copy.step1'),
    t('basicOp2.copy.step2'),
    t('basicOp2.copy.step3')
  ];

  const rotateCopySteps = [
    t('basicOp2.rotate_copy.desc')
  ];

  const mirrorCopySteps = [
    t('basicOp2.mirror_copy.desc')
  ];

  const deleteSteps = [
    t('basicOp2.delete.step1'),
    t('basicOp2.delete.step2')
  ];

  // Helper: returns the step array for the currently active tab.
  // Extracted to eliminate the repeated ternary chains throughout this component.
  type Op2Tab = 'move' | 'copy' | 'mirror' | 'rotate' | 'rotateCopy' | 'mirrorCopy' | 'delete';
  const getSteps = (tab: Op2Tab): string[] => {
    const map: Record<Op2Tab, string[]> = {
      move: moveSteps,
      rotate: rotateSteps,
      mirror: mirrorSteps,
      copy: copySteps,
      rotateCopy: rotateCopySteps,
      mirrorCopy: mirrorCopySteps,
      delete: deleteSteps,
    };
    return map[tab] ?? deleteSteps;
  };

  const tabs = [
    { id: 'move', label: t('basicOp2.move.title') },
    { id: 'rotate', label: t('basicOp2.rotate.title') },
    { id: 'mirror', label: t('basicOp2.mirror.title') },
    { id: 'copy', label: t('basicOp2.copy.title') },
    { id: 'rotateCopy', label: t('basicOp2.rotateCopy.title') },
    { id: 'mirrorCopy', label: t('basicOp2.mirrorCopy.title') },
    { id: 'delete', label: t('basicOp2.delete.title') }
  ];

  const handleNext = (eOrIsAuto?: boolean | React.MouseEvent | React.MouseEvent<HTMLButtonElement>) => {
    const isAuto = typeof eOrIsAuto === 'boolean' ? eOrIsAuto : false;
    stop();
    if (!isAuto) {
      sessionStorage.setItem('tts-autoplay-active', 'false');
    }
    const i = tabs.findIndex(t => t.id === activeTab);
    if (i < tabs.length - 1) { setActiveTab(tabs[i + 1].id as any); } else if (onNextLesson) onNextLesson();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrev = (eOrIsAuto?: boolean | React.MouseEvent | React.MouseEvent<HTMLButtonElement>) => {
    const isAuto = typeof eOrIsAuto === 'boolean' ? eOrIsAuto : false;
    stop();
    if (!isAuto) {
      sessionStorage.setItem('tts-autoplay-active', 'false');
    }
    const i = tabs.findIndex(t => t.id === activeTab);
    if (i > 0) { setActiveTab(tabs[i - 1].id as any); } else if (onPrevLesson) onPrevLesson();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const introTitle = t('basicOp2.heading');
    const introDesc = t('basicOp2.desc');
    const currentSteps = getSteps(activeTab as Op2Tab);
    const fullSteps = [introTitle, introDesc, t(`basicOp2.${activeTab}.title`), ...currentSteps];
    const startIdx = activeTab === 'move' ? 0 : 2;
    registerText(fullSteps, startIdx);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, registerText]);

  const wasSpeakingRef = React.useRef(false);
  const lastIndexRef = React.useRef(-1);
  const shouldAutoPlayRef = React.useRef(false);

  useEffect(() => {
    if (currentIndex !== -1) {
      lastIndexRef.current = currentIndex;
    }
  }, [currentIndex]);

  useEffect(() => {
    if (!isSpeaking && wasSpeakingRef.current) {
      const currentSteps = getSteps(activeTab as Op2Tab);
      const stepsLength = 3 + currentSteps.length;
      if (lastIndexRef.current === stepsLength - 1) {
        const i = tabs.findIndex(t => t.id === activeTab);
        if (i < tabs.length - 1) {
          shouldAutoPlayRef.current = true;
          handleNext();
        }
      }
    }
    wasSpeakingRef.current = isSpeaking;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSpeaking, activeTab]);

  const prevTabRef = React.useRef(activeTab);

  useEffect(() => {
    if (activeTab !== prevTabRef.current) {
      if (shouldAutoPlayRef.current) {
        shouldAutoPlayRef.current = false;
        setTimeout(() => {
          const introTitle = t('basicOp2.heading');
          const introDesc = t('basicOp2.desc');
          const currentSteps = getSteps(activeTab as Op2Tab);
          const startIdx = activeTab === 'move' ? 0 : 2;
          speak([introTitle, introDesc, t(`basicOp2.${activeTab}.title`), ...currentSteps], startIdx);
        }, 300);
      }
      prevTabRef.current = activeTab;
    }
  }, [activeTab, speak]);



  return (
    <div className={`course-lesson-container`} ref={containerRef}>
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      <div className="lesson-tabs">
        {tabs.map(tab => (<button key={tab.id} className={`tab-button ${activeTab === tab.id ? 'active' : ''}`} onClick={() => { stop(); sessionStorage.setItem('tts-autoplay-active', 'false'); setActiveTab(tab.id as any); }}>{tab.label}</button>))}
      </div>

      <section className="lesson-intro">
        <h3 className={`section-title ${currentIndex === 0 ? "reading-active" : ""}`} data-reading-index="0">
          <KaraokeLessonText
            as="span"
            text={t('basicOp2.heading')}
            isActive={isSpeaking && currentIndex === 0}
            currentCharIndex={currentCharIndex}
          />

        </h3>
        <KaraokeLessonText
          className={`lesson-subtitle ${currentIndex === 1 ? "reading-active" : ""}`}
          data-reading-index="1"
          text={t('basicOp2.desc')}
          isActive={isSpeaking && currentIndex === 1}
          currentCharIndex={currentCharIndex}
        />
        <img src={operationsMenu} alt={t('common.operations_menu')} className="software-screenshot screenshot-small mt-8" style={{ width: '180px' }} />
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
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text={moveSteps[0]}
                  isActive={isSpeaking && currentIndex === 3}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <img src={moveMenu} alt={t('common.move_menu_icon')} className="software-screenshot screenshot-small" style={{ width: '190px', marginBottom: "-2rem" }} />
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 4 ? 'reading-active' : ''}`} data-reading-index="4" style={{ marginBottom: "-2rem" }}>
              <div className="step-header">
                <span className="step-number">2 </span>
                <div className="step-label" style={{ marginTop: "-1.5rem" }}>
                  <KaraokeLessonText
                    as="span"
                    text={moveSteps[1]}
                    isActive={isSpeaking && currentIndex === 4}
                    currentCharIndex={currentCharIndex}
                  />
                  <img src={leftClick} alt={t('common.left_click')} className="screenshot-click--inline" style={{ width: '40px', margin: '0 8px' }} />
                </div>
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 5 ? 'reading-active' : ''}`} data-reading-index="5">
              <div className="step-header">
                <span className="step-number">3 </span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text={moveSteps[2]}
                  isActive={isSpeaking && currentIndex === 5}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <img src={itemEntryMove} alt={t('common.item_entry_move')} className="software-screenshot" style={{ width: '900px', height: 'auto' }} />

              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 5 ? 'reading-active' : ''}`} data-reading-index="5">
              <div className="card-header"><h4>{t('lesson.result')}</h4></div>
              <PremiumVideoPlayer src={vidMove} className="software-screenshot screenshot-wide mt-8" style={{ width: '900px' }} />
            </div>

            <div className="lesson-navigation">
              <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> {t('common.previous')}</button>
              <button className="nav-button next" onClick={handleNext}>{t('common.next')} <ChevronRight size={18} /></button>
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

            <div className={`instruction-step ${currentIndex === 3 ? 'reading-active' : ''}`} data-reading-index="3">
              <div className="step-header">
                <span className="step-number">1 </span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text={rotateSteps[0]}
                  isActive={isSpeaking && currentIndex === 3}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <img src={rotateIcon} alt={t('common.rotate_icon')} className="software-screenshot screenshot-small" style={{ width: '190px', marginBottom: "-4rem" }} />
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 4 ? 'reading-active' : ''}`} data-reading-index="4" style={{ marginBottom: "-4rem" }}>
              <div className="step-header">
                <span className="step-number">2 </span>
                <div className="step-label" style={{ marginBottom: "1.5rem" }}>
                  <KaraokeLessonText
                    as="span"
                    text={rotateSteps[1]}
                    isActive={isSpeaking && currentIndex === 4}
                    currentCharIndex={currentCharIndex}
                  />
                  <img src={leftClick} alt={t('common.left_click')} className="screenshot-click--inline" style={{ width: '40px', margin: '0 8px' }} />
                </div>
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 5 ? 'reading-active' : ''}`} data-reading-index="5" style={{ marginBottom: "-3rem" }}>
              <div className="step-header">
                <span className="step-number">3 </span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text={rotateSteps[2]}
                  isActive={isSpeaking && currentIndex === 5}
                  currentCharIndex={currentCharIndex}
                />
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 6 ? 'reading-active' : ''}`} data-reading-index="6">
              <div className="step-header">
                <span className="step-number">4 </span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text={rotateSteps[3]}
                  isActive={isSpeaking && currentIndex === 6}
                  currentCharIndex={currentCharIndex}
                />
              </div>

              <div className="step-description">
                <img src={rotateEntry} alt={t('common.rotate_item_entry')} className="software-screenshot screenshot-medium" style={{ width: '900px' }} />
              </div>
            </div>

            <div className="card-header"><h4>{t('lesson.result')}</h4></div>
            <PremiumVideoPlayer src={vidRotate} className="software-screenshot" style={{ width: '900px', marginBottom: "-3rem" }} />

            <div className="lesson-navigation">
              <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> {t('common.previous')}</button>
              <button className="nav-button next" onClick={handleNext}>{t('common.next')} <ChevronRight size={18} /></button>
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

            <div className={`instruction-step ${currentIndex === 3 ? 'reading-active' : ''}`} data-reading-index="3">
              <div className="step-header">
                <span className="step-number">1 </span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text={mirrorSteps[0]}
                  isActive={isSpeaking && currentIndex === 3}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <img src={mirrorIcon} alt={t('common.mirror_icon')} className="software-screenshot screenshot-small" style={{ width: '190px', marginBottom: "-4rem" }} />
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 4 ? 'reading-active' : ''}`} data-reading-index="4" style={{ marginBottom: "-5rem" }}>
              <div className="step-header">
                <span className="step-number">2 </span>
                <div className="step-label" style={{ marginBottom: "1.5rem" }}>
                  <KaraokeLessonText
                    as="span"
                    text={mirrorSteps[1]}
                    isActive={isSpeaking && currentIndex === 4}
                    currentCharIndex={currentCharIndex}
                  />
                  <img src={leftClick} alt={t('common.left_click')} className="screenshot-click--inline" style={{ width: '40px', margin: '0 8px' }} />
                </div>
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 5 ? 'reading-active' : ''}`} data-reading-index="5">
              <div className="step-header">
                <span className="step-number">3 </span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  style={{ marginTop: "1.5rem" }}
                  text={mirrorSteps[2]}
                  isActive={isSpeaking && currentIndex === 5}
                  currentCharIndex={currentCharIndex}
                />
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 6 ? 'reading-active' : ''}`} data-reading-index="6">
              <div className="card-header"><h4>{t('lesson.result')}</h4></div>
              <PremiumVideoPlayer src={vidMirror} className="software-screenshot mt-8" style={{ width: '900px' }} />
            </div>

            <div className="lesson-navigation">
              <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> {t('common.previous')}</button>
              <button className="nav-button next" onClick={handleNext}>{t('common.next')} <ChevronRight size={18} /></button>
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
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text={copySteps[0]}
                  isActive={isSpeaking && currentIndex === 3}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <img src={copyIcon} alt={t('common.copy_icon')} className="software-screenshot screenshot-small" style={{ width: '250px', marginBottom: "-2rem" }} />
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 4 ? 'reading-active' : ''}`} data-reading-index="4" style={{ marginBottom: "-2rem" }}>
              <div className="step-header">
                <span className="step-number">2 </span>
                <div className="step-label" style={{ marginTop: "-1.5rem" }}>
                  <KaraokeLessonText
                    as="span"
                    text={copySteps[1]}
                    isActive={isSpeaking && currentIndex === 4}
                    currentCharIndex={currentCharIndex}
                  />
                  <img src={leftClick} alt={t('common.left_click')} className="screenshot-click--inline" style={{ width: '40px', margin: '0 8px' }} />
                </div>
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 5 ? 'reading-active' : ''}`} data-reading-index="5">
              <div className="step-header">
                <span className="step-number">3 </span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text={copySteps[2]}
                  isActive={isSpeaking && currentIndex === 5}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <img src={copyDistance} alt={t('common.copy_distance')} className="software-screenshot screenshot-wide" style={{ width: '1000px', height: "100px" }} />
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 6 ? 'reading-active' : ''}`} data-reading-index="6">
              <div className="card-header"><h4>{t('lesson.result')}</h4></div>
              <PremiumVideoPlayer src={vidCopy} className="software-screenshot screenshot-large mt-8" style={{ maxWidth: '898px' }} />
            </div>

            <div className="lesson-navigation">
              <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> {t('common.previous')}</button>
              <button className="nav-button next" onClick={handleNext}>{t('common.next')} <ChevronRight size={18} /></button>
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
            <p className={`p-flush ${currentIndex === 3 ? "reading-active" : ""}`} data-reading-index="3" style={{ marginTop: "-2rem" }}>{rotateCopySteps[0]}</p>

            <div className="step-description">
              <img src={rotateCopyIcon} alt={t('common.rotate_copy_icon')} className="software-screenshot screenshot-small" style={{ width: '250px' }} />
            </div>


            <div className={`instruction-step ${currentIndex === 4 ? 'reading-active' : ''}`} data-reading-index="4">
              <div className="card-header"><h4>{t('lesson.result')}</h4></div>
              <img src={rotateCopyAxis} alt={t('common.rotate_copy_result')} className="software-screenshot screenshot-large mt-8" style={{ width: '900px' }} />
            </div>

            <div className="lesson-navigation">
              <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> {t('common.previous')}</button>
              <button className="nav-button next" onClick={handleNext}>{t('common.next')} <ChevronRight size={18} /></button>
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
            <p className={`p-flush ${currentIndex === 3 ? "reading-active" : ""}`} data-reading-index="3" style={{ marginTop: "-2rem" }}>{mirrorCopySteps[0]}</p>

            <div className="step-description">
              <img src={mirrorCopyIcon} alt={t('common.mirror_copy_icon')} className="software-screenshot screenshot-small" style={{ width: '250px' }} />
            </div>

            <div className={`instruction-step ${currentIndex === 5 ? 'reading-active' : ''}`} data-reading-index="5">
              <div className="card-header"><h4>{t('lesson.result')}</h4></div>
              <img src={mirrorCopyResult} alt={t('common.mirror_copy_preview')} className="software-screenshot screenshot-large mt-8" style={{ width: '900px' }} />
            </div>

            <div className="lesson-navigation">
              <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> {t('common.previous')}</button>
              <button className="nav-button next" onClick={handleNext}>{t('common.next')} <ChevronRight size={18} /></button>
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

            <div className={`instruction-step ${currentIndex === 3 ? 'reading-active' : ''}`} data-reading-index="3" style={{ marginBottom: "-2rem" }}>
              <div className="step-header">
                <span className="step-number">1 </span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text={t('basicOp2.delete.step1')}
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
                  text={t('basicOp2.delete.step2')}
                  isActive={isSpeaking && currentIndex === 4}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <img src={deleteIcon} alt={t('common.delete_icon')} className="software-screenshot screenshot-small" style={{ width: '300px' }} />
              </div>
            </div>

            <div className="lesson-navigation">
              <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> {t('common.previous')}</button>
              <button className="nav-button next" onClick={handleNext}>{nextLabel || t('common.next')} <ChevronRight size={18} /></button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const BasicOperation3: React.FC<SubLessonProps> = ({ subLessonId, onNextLesson, onPrevLesson, nextLabel }) => {
  const [activeTab, setActiveTab] = useState<'sketch' | 'extrude' | 'revolve'>(() => {
    return (localStorage.getItem(`${subLessonId}-tab`) as any) || 'sketch';
  });
  const { t } = useTranslation();
  const { scrollProgress, containerRef, speak, stop, isSpeaking, currentIndex, currentCharIndex, registerText } = useLessonCore(subLessonId);

  useEffect(() => {
    localStorage.setItem(`${subLessonId}-tab`, activeTab);
  }, [subLessonId, activeTab]);

  const sketchSteps = [
    t('basicOp3.sketch.step1'),
    t('basicOp3.sketch.step2')
  ];

  const extrudeSteps = [
    t('basicOp3.extrude.title'),
    t('basicOp3.extrude.step1'),
    t('basicOp3.extrude.step2'),
    t('basicOp3.extrude.step3'),
    t('basicOp3.extrude.step4')
  ];

  const revolveSteps = [
    t('basicOp3.revolve.title'),
    t('basicOp3.revolve.step1'),
    t('basicOp3.revolve.step2'),
    t('basicOp3.revolve.step3')
  ];

  const tabs = [
    { id: 'sketch', label: t('basicOp3.sketch.heading') },
    { id: 'extrude', label: t('basicOp3.extrude.title') },
    { id: 'revolve', label: t('basicOp3.revolve.title') }
  ];

  const handleNext = (eOrIsAuto?: boolean | React.MouseEvent | React.MouseEvent<HTMLButtonElement>) => {
    const isAuto = typeof eOrIsAuto === 'boolean' ? eOrIsAuto : false;
    stop();
    if (!isAuto) {
      sessionStorage.setItem('tts-autoplay-active', 'false');
    }
    const i = tabs.findIndex(t => t.id === activeTab);
    if (i < tabs.length - 1) { setActiveTab(tabs[i + 1].id as any); } else if (onNextLesson) onNextLesson();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrev = (eOrIsAuto?: boolean | React.MouseEvent | React.MouseEvent<HTMLButtonElement>) => {
    const isAuto = typeof eOrIsAuto === 'boolean' ? eOrIsAuto : false;
    stop();
    if (!isAuto) {
      sessionStorage.setItem('tts-autoplay-active', 'false');
    }
    const i = tabs.findIndex(t => t.id === activeTab);
    if (i > 0) { setActiveTab(tabs[i - 1].id as any); } else if (onPrevLesson) onPrevLesson();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (activeTab === 'sketch') {
      const introTitle = t('basicOp3.sketch.heading');
      const introDesc = t('basicOp3.sketch.desc');
      registerText([introTitle, introDesc, ...sketchSteps], 0);
    } else {
      const introTitle = t('basicOp3.extrude.heading');
      const introDesc = t('basicOp3.extrude.desc');
      const steps = activeTab === 'extrude' ? extrudeSteps : revolveSteps;
      const startIdx = activeTab === 'extrude' ? 0 : 2;
      registerText([introTitle, introDesc, ...steps], startIdx);
    }
  }, [activeTab, registerText]);

  const wasSpeakingRef = React.useRef(false);
  const lastIndexRef = React.useRef(-1);
  const shouldAutoPlayRef = React.useRef(false);

  useEffect(() => {
    if (currentIndex !== -1) {
      lastIndexRef.current = currentIndex;
    }
  }, [currentIndex]);

  useEffect(() => {
    if (!isSpeaking && wasSpeakingRef.current) {
      const stepsLength = activeTab === 'sketch'
        ? 2 + sketchSteps.length
        : 2 + (activeTab === 'extrude' ? extrudeSteps.length : revolveSteps.length);
      if (lastIndexRef.current === stepsLength - 1) {
        const i = tabs.findIndex(t => t.id === activeTab);
        if (i < tabs.length - 1) {
          shouldAutoPlayRef.current = true;
          handleNext();
        }
      }
    }
    wasSpeakingRef.current = isSpeaking;
  }, [isSpeaking, activeTab]);

  const prevTabRef = React.useRef(activeTab);

  useEffect(() => {
    if (activeTab !== prevTabRef.current) {
      if (shouldAutoPlayRef.current) {
        shouldAutoPlayRef.current = false;
        setTimeout(() => {
          if (activeTab === 'sketch') {
            const introTitle = "Sketch";
            const introDesc = "Tools use to create lines, circles and arcs in the 3D space for creating section forms for modeling.";
            speak([introTitle, introDesc, ...sketchSteps], 0);
          } else {
            const introTitle = "Extrude and Revolve";
            const introDesc = "Tools use to create solids from sketch in the 3D space.";
            const steps = activeTab === 'extrude' ? extrudeSteps : revolveSteps;
            const startIdx = activeTab === 'extrude' ? 0 : 2;
            speak([introTitle, introDesc, ...steps], startIdx);
          }
        }, 300);
      }
      prevTabRef.current = activeTab;
    }
  }, [activeTab, speak]);



  return (
    <div className={`course-lesson-container`} ref={containerRef}>
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      <div className="lesson-tabs">
        {tabs.map(tab => (<button key={tab.id} className={`tab-button ${activeTab === tab.id ? 'active' : ''}`} onClick={() => { stop(); sessionStorage.setItem('tts-autoplay-active', 'false'); setActiveTab(tab.id as any); }}>{tab.label}</button>))}
      </div>

      <section className="lesson-intro">
        {activeTab === 'sketch' ? (
          <>
            <h3 className={`section-title ${currentIndex === 0 ? "reading-active" : ""}`} data-reading-index="0">
              <KaraokeLessonText
                as="span"
                text={t('basicOp3.sketch.heading')}
                isActive={isSpeaking && currentIndex === 0}
                currentCharIndex={currentCharIndex}
              />

            </h3>
            <KaraokeLessonText
              className={`lesson-subtitle ${currentIndex === 1 ? "reading-active" : ""}`}
              data-reading-index="1"
              text={t('basicOp3.sketch.desc')}
              isActive={isSpeaking && currentIndex === 1}
              currentCharIndex={currentCharIndex}
            />
            <img src={sketchIntroImg} alt={t('common.sketch_intro')} className="software-screenshot screenshot-small mt-8" style={{ width: '280px' }} />
          </>
        ) : (
          <>
            <h3 className={`section-title ${currentIndex === 0 ? "reading-active" : ""}`} data-reading-index="0">
              <KaraokeLessonText
                as="span"
                text={t('basicOp3.extrude.heading')}
                isActive={isSpeaking && currentIndex === 0}
                currentCharIndex={currentCharIndex}
              />

            </h3>
            <KaraokeLessonText
              className={`lesson-subtitle ${currentIndex === 1 ? "reading-active" : ""}`}
              data-reading-index="1"
              text={t('basicOp3.extrude.desc')}
              isActive={isSpeaking && currentIndex === 1}
              currentCharIndex={currentCharIndex}
            />
            <img src={extrudeRevolveMenu} alt={t('common.extrude_and_revolve_intro')} className="software-screenshot screenshot-small mt-8" style={{ width: '280px' }} />
          </>
        )}
      </section>

      <div className="lesson-grid single-card">
        {activeTab === 'sketch' && (
          <div className={`lesson-card tab-content fade-in ${isSpeaking ? 'reading-active' : ''}`}>
            <div className="card-header mt-12">
              <h4 className={`${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
                <KaraokeLessonText
                  as="span"
                  text={sketchSteps[0]}
                  isActive={isSpeaking && currentIndex === 2}
                  currentCharIndex={currentCharIndex}
                />
              </h4>
            </div>
            <KaraokeLessonText
              className={`p-flush ${currentIndex === 3 ? 'reading-active' : ''}`}
              data-reading-index="3"
              style={{ marginTop: "-2rem" }}
              text={sketchSteps[1]}
              isActive={isSpeaking && currentIndex === 3}
              currentCharIndex={currentCharIndex}
            />

            <div className="step-description">
              <div className="flex-row-center--wrap" style={{ gap: '2rem' }}>
                <img src={sketchIcon} alt={t('common.sketch_tool')} className="software-screenshot screenshot-small" style={{ width: '280px' }} />
              </div>
            </div>

            <div className="step-description" style={{ marginTop: "3rem" }}>
              <img src={sketchResultImg} alt={t('common.sketch_result')} className="software-screenshot mt-4" style={{ width: "600px" }} />
            </div>

            <div className="lesson-navigation">
              <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> {t('common.previous')}</button>
              <button className="nav-button next" onClick={handleNext}>{t('common.next')} <ChevronRight size={18} /></button>
            </div>
          </div>
        )}

        {activeTab === 'extrude' && (
          <div className={`lesson-card tab-content fade-in ${isSpeaking ? 'reading-active' : ''}`}>
            <div className="card-header mt-12">
              <h4 className={`${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
                <KaraokeLessonText
                  as="span"
                  text={extrudeSteps[0]}
                  isActive={isSpeaking && currentIndex === 2}
                  currentCharIndex={currentCharIndex}
                />
              </h4>
            </div>

            <div className={`instruction-step ${currentIndex === 3 ? 'reading-active' : ''}`} data-reading-index="3">
              <div className="step-header">
                <span className="step-number">1 </span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text={extrudeSteps[1]}
                  isActive={isSpeaking && currentIndex === 3}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description" style={{ marginTop: "1rem" }}>
                <div className="mt-6" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                  <div>
                    <img src={extrudeOneSide} alt={t('common.extrusion_one_side')} className="software-screenshot screenshot-small" style={{ width: '100%', marginBottom: "1rem" }} />
                    <div className="text-center font-bold text-lg mt-4" style={{ marginLeft: "-8rem" }}>EXTRUSION (ONE SIDE)</div>
                  </div>
                  <div>
                    <img src={extrudeBothSide} alt={t('common.extrude_both_side')} className="software-screenshot screenshot-small" style={{ width: '100%', marginBottom: "1rem" }} />
                    <div className="text-center font-bold text-lg mt-4" style={{ marginLeft: "-8em" }}>EXTRUSION (BOTH SIDES)</div>
                  </div>
                </div>
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 4 ? 'reading-active' : ''}`} data-reading-index="4" style={{ marginBottom: "-2rem" }}>
              <div className="step-header">
                <span className="step-number">2 </span>
                <div className="step-label" style={{ marginTop: "0.5rem" }}>
                  <KaraokeLessonText
                    as="span"
                    text={extrudeSteps[2]}
                    isActive={isSpeaking && currentIndex === 4}
                    currentCharIndex={currentCharIndex}
                  />
                  <img src={leftClick} alt={t('common.left_click')} className="screenshot-click--inline" style={{ width: '40px', margin: '0 8px' }} />
                </div>
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 5 ? 'reading-active' : ''}`} data-reading-index="5" style={{ marginBottom: "-2rem" }}>
              <div className="step-header">
                <span className="step-number">3 </span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text={extrudeSteps[3]}
                  isActive={isSpeaking && currentIndex === 5}
                  currentCharIndex={currentCharIndex}
                />
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 6 ? 'reading-active' : ''}`} data-reading-index="6">
              <div className="step-header">
                <span className="step-number">4 </span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text={extrudeSteps[4]}
                  isActive={isSpeaking && currentIndex === 6}
                  currentCharIndex={currentCharIndex}
                />
              </div>


              <div className={`instruction-step ${currentIndex === 6 ? 'reading-active' : ''}`} data-reading-index="6">
                <div className="card-header"><h4>{t('lesson.process_overview')}</h4></div>
                <div className="flex-row-wrap mt-8" style={{ gap: '2rem' }}>
                  <img src={extrudeOneSide} alt={t('common.extrude_process_overview')} className="software-screenshot" style={{ width: "900px", marginTop: "2rem" }} />
                </div>
              </div>
            </div>

            <div className="lesson-navigation">
              <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> {t('common.previous')}</button>
              <button className="nav-button next" onClick={handleNext}>{t('common.next')} <ChevronRight size={18} /></button>
            </div>
          </div>


        )}

        {activeTab === 'revolve' && (
          <div className={`lesson-card tab-content fade-in ${isSpeaking ? 'reading-active' : ''}`}>
            <div className="card-header mt-12">
              <h4 className={`${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
                <KaraokeLessonText
                  as="span"
                  text={revolveSteps[0]}
                  isActive={isSpeaking && currentIndex === 2}
                  currentCharIndex={currentCharIndex}
                />
              </h4>
            </div>

            <div className={`instruction-step ${currentIndex === 3 ? 'reading-active' : ''}`} data-reading-index="3" style={{ marginBottom: "-2rem" }}>
              <div className="step-header">
                <span className="step-number">1 </span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text={revolveSteps[1]}
                  isActive={isSpeaking && currentIndex === 3}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <img src={revolveIcon} alt={t('common.revolve_icon')} className="software-screenshot mt-4" style={{ width: '280px', marginBottom: "1rem" }} />
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 4 ? 'reading-active' : ''}`} data-reading-index="4" style={{ marginBottom: "-2rem" }}>
              <div className="step-header" style={{ marginBottom: "2rem" }}>
                <span className="step-number">2 </span>
                <div className="step-label" style={{ marginTop: "-1.5rem" }}>
                  <KaraokeLessonText
                    as="span"
                    text={revolveSteps[2]}
                    isActive={isSpeaking && currentIndex === 4}
                    currentCharIndex={currentCharIndex}
                  />
                  <img src={leftClick} alt={t('common.left_click')} className="screenshot-click--inline" style={{ width: '40px', margin: '0 8px' }} />
                </div>
              </div>


              <div className={`step-header ${currentIndex === 5 ? 'reading-active' : ''}`} data-reading-index="5">
                <span className="step-number">3 </span>
                <div className="step-label" style={{ marginTop: "0.5rem" }}>
                  <KaraokeLessonText
                    as="span"
                    text={revolveSteps[3]}
                    isActive={isSpeaking && currentIndex === 5}
                    currentCharIndex={currentCharIndex}
                  />
                  <img src={leftClick} alt={t('common.left_click')} className="screenshot-click--inline" style={{ width: '40px', margin: '0 8px' }} />
                </div>
              </div>


              <div className={`instruction-step ${currentIndex === 5 ? 'reading-active' : ''}`} data-reading-index="5">
                <div className="card-header"><h4>{t('lesson.process_overview')}</h4></div>
                <div className="flex-row-wrap mt-8" style={{ gap: '2rem' }}>
                  <img src={revolveP2} alt={t('common.revolve_result')} className="software-screenshot" style={{ "width": "900px" }} />
                </div>
              </div>
            </div>


            <div className="lesson-navigation">
              <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> {t('common.previous')}</button>
              <button className="nav-button next" onClick={handleNext}>{nextLabel || t('common.next')} <ChevronRight size={18} /></button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/* ── Basic Operation (4): Show/Hide / Stretch / Resize ── */


const BasicOperation4: React.FC<SubLessonProps> = ({ subLessonId, onNextLesson, onPrevLesson }) => {
  const [activeTab, setActiveTab] = useState<'showHide' | 'stretch' | 'resize'>(() => {
    return (localStorage.getItem(`${subLessonId}-tab`) as any) || 'showHide';
  });
  const { t } = useTranslation();
  const { scrollProgress, containerRef, stop, isSpeaking, currentIndex, currentCharIndex, registerText } = useLessonCore(subLessonId);

  useEffect(() => {
    localStorage.setItem(`${subLessonId}-tab`, activeTab);
  }, [subLessonId, activeTab]);

  const showHideSteps = [
    t('basicOp4.showHide.title1'),
    t('basicOp4.showHide.step1'),
    t('basicOp4.showHide.step2'),
    t('basicOp4.showHide.title2'),
    t('basicOp4.showHide.step3'),
    t('basicOp4.showHide.step4'),
    t('basicOp4.showHide.step5'),
    t('basicOp4.showHide.title3'),
    t('basicOp4.showHide.step6'),
    t('basicOp4.showHide.step7'),
    t('basicOp4.showHide.step8')
  ];

  const stretchSteps = [
    t('basicOp4.stretch.title'),
    t('basicOp4.stretch.step1'),
    t('basicOp4.stretch.step2'),
    t('basicOp4.stretch.step3'),
    t('basicOp4.stretch.step4'),
    t('basicOp4.stretch.step5'),
    t('basicOp4.stretch.step6'),
    t('basicOp4.stretch.step7'),
    t('basicOp4.stretch.step8')
  ];

  const resizeSteps = [
    t('basicOp4.resize.title'),
    t('basicOp4.resize.step1'),
    t('basicOp4.resize.step2'),
    t('basicOp4.resize.step3')
  ];

  const tabs = [
    { id: 'showHide', label: t('basicOp4.showHide.heading') },
    { id: 'stretch', label: t('basicOp4.stretch.title') },
    { id: 'resize', label: t('basicOp4.resize.title') }
  ];

  const handleNext = (eOrIsAuto?: boolean | React.MouseEvent | React.MouseEvent<HTMLButtonElement>) => {
    const isAuto = typeof eOrIsAuto === 'boolean' ? eOrIsAuto : false;
    stop();
    if (!isAuto) {
      sessionStorage.setItem('tts-autoplay-active', 'false');
    }
    const i = tabs.findIndex(t => t.id === activeTab);
    if (i < tabs.length - 1) { setActiveTab(tabs[i + 1].id as any); } else if (onNextLesson) onNextLesson();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrev = (eOrIsAuto?: boolean | React.MouseEvent | React.MouseEvent<HTMLButtonElement>) => {
    const isAuto = typeof eOrIsAuto === 'boolean' ? eOrIsAuto : false;
    stop();
    if (!isAuto) {
      sessionStorage.setItem('tts-autoplay-active', 'false');
    }
    const i = tabs.findIndex(t => t.id === activeTab);
    if (i > 0) { setActiveTab(tabs[i - 1].id as any); } else if (onPrevLesson) onPrevLesson();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Register TTS text per active tab so karaoke indices stay correct
  // for each independently-structured sub-section.
  useEffect(() => {
    const introTitle = activeTab === 'showHide' ? t('basicOp4.showHide.heading')
      : activeTab === 'stretch' ? t('basicOp4.stretch.heading')
        : t('basicOp4.resize.heading');
    const introDesc = activeTab === 'showHide'
      ? t('basicOp4.showHide.desc')
      : activeTab === 'stretch'
        ? t('basicOp4.stretch.desc')
        : t('basicOp4.resize.desc');
    const steps = activeTab === 'showHide' ? showHideSteps
      : activeTab === 'stretch' ? stretchSteps
        : resizeSteps;
    registerText([introTitle, introDesc, ...steps], 0);
  }, [activeTab, registerText, t]);

  return (
    <div className={`course-lesson-container`} ref={containerRef}>
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      <div className="lesson-tabs">
        {tabs.map(tab => (<button key={tab.id} className={`tab-button ${activeTab === tab.id ? 'active' : ''}`} onClick={() => { stop(); sessionStorage.setItem('tts-autoplay-active', 'false'); setActiveTab(tab.id as any); }}>{tab.label}</button>))}
      </div>

      {activeTab === 'showHide' && (
        <section className="lesson-intro">
          <h3 className={`section-title ${currentIndex === 0 ? "reading-active" : ""}`} data-reading-index="0">
            <KaraokeLessonText
              as="span"
              text={t('common.show_hide')}
              isActive={isSpeaking && currentIndex === 0}
              currentCharIndex={currentCharIndex}
            />

          </h3>
          <KaraokeLessonText
            className={`lesson-subtitle ${currentIndex === 1 ? "reading-active" : ""}`}
            data-reading-index="1"
            text={t('basicOp4.showHide.desc')}
            isActive={isSpeaking && currentIndex === 1}
            currentCharIndex={currentCharIndex}
          />
          <img src={showHideMenu} alt={t('common.show_hide_intro')} className="software-screenshot screenshot-small mt-8" style={{ width: '192px' }} />
        </section>
      )}

      {activeTab === 'stretch' && (
        <section className="lesson-intro">
          <h3 className={`section-title ${currentIndex === 0 ? "reading-active" : ""}`} data-reading-index="0">
            <KaraokeLessonText
              as="span"
              text={t('basicOp4.stretch.heading')}
              isActive={isSpeaking && currentIndex === 0}
              currentCharIndex={currentCharIndex}
            />

          </h3>
          <KaraokeLessonText
            className={`lesson-subtitle ${currentIndex === 1 ? "reading-active" : ""}`}
            data-reading-index="1"
            text={t('basicOp4.stretch.desc')}
            isActive={isSpeaking && currentIndex === 1}
            currentCharIndex={currentCharIndex}
          />
          <img src={fairingChamferImg} alt={t('common.stretch_and_shape_intro')} className="software-screenshot screenshot-small mt-8" style={{ width: '192px' }} />
        </section>
      )}





      <div className="lesson-grid single-card">
        {activeTab === 'showHide' && (
          <div className="lesson-card tab-content fade-in">
            <div className="card-header">
              <h4 className={`${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
                <KaraokeLessonText
                  as="span"
                  text={showHideSteps[0]}
                  isActive={isSpeaking && currentIndex === 2}
                  currentCharIndex={currentCharIndex}
                />
              </h4>
            </div>

            <div className={`instruction-step ${currentIndex === 3 ? 'reading-active' : ''}`} data-reading-index="3">
              <div className="step-header">
                <span className="step-number">1 </span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text={showHideSteps[1]}
                  isActive={isSpeaking && currentIndex === 3}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <img src={showHideEntity} alt={t('common.show_hide_entity_icon')} className="software-screenshot screenshot-small" style={{ width: '280px', marginBottom: "-3rem" }} />
              </div>
            </div>


            <div className={`instruction-step ${currentIndex === 4 ? 'reading-active' : ''}`} data-reading-index="4">
              <div className="step-header">
                <span className="step-number">2 </span>
                <div className="step-label" style={{ marginTop: "-1.5rem" }}>
                  <KaraokeLessonText
                    as="span"
                    text={showHideSteps[2]}
                    isActive={isSpeaking && currentIndex === 4}
                    currentCharIndex={currentCharIndex}
                  />
                  <img src={leftClick} alt={t('common.left_click')} className="screenshot-click--inline" style={{ width: '40px', margin: '0 8px' }} />
                </div>
              </div>
            </div>

            <div className="card-header mt-12">
              <h4 className={`${currentIndex === 5 ? 'reading-active' : ''}`} data-reading-index="5">
                <KaraokeLessonText
                  as="span"
                  text={showHideSteps[3]}
                  isActive={isSpeaking && currentIndex === 5}
                  currentCharIndex={currentCharIndex}
                />
              </h4>
            </div>

            <div className={`instruction-step ${currentIndex === 6 ? 'reading-active' : ''}`} data-reading-index="6">
              <div className="step-header">
                <span className="step-number">1 </span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text={showHideSteps[4]}
                  isActive={isSpeaking && currentIndex === 6}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <img src={showHideDraftingEntity} alt={t('common.show_hide_drafting_entity_icon')} className="software-screenshot screenshot-small" style={{ width: '280px', marginBottom: "-3rem" }} />
              </div>
            </div>


            <div className={`instruction-step ${currentIndex === 7 ? 'reading-active' : ''}`} data-reading-index="7">
              <div className="step-header">
                <span className="step-number">2 </span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text={showHideSteps[5]}
                  isActive={isSpeaking && currentIndex === 7}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <p className={`p-flush ${currentIndex === 8 ? "reading-active" : ""}`} data-reading-index="8" style={{ marginTop: "-1rem" }}>{showHideSteps[6]}</p>
              <div className="lesson-table-container" style={{ marginTop: "2rem", maxWidth: "900px" }}>
                <table className="lesson-table">
                  <thead>
                    <tr>
                      <th>{t('table.dimensions')}</th>
                      <th>{t('table.notes')}</th>
                      <th>{t('table.symbols')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{t('table.linear_circular_angular')}</td>
                      <td>{t('table.text')}</td>
                      <td>{t('table.arrow_view')}</td>
                    </tr>
                    <tr>
                      <td>{t('table.chamfer_fillet')}</td>
                      <td>{t('table.part_notes')}</td>
                      <td>{t('table.cutting_lines')}</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>{t('table.welding')}</td>
                      <td>{t('table.machining_finishing')}</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>{t('table.balloon')}</td>
                      <td>{t('table.hatch')}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

            </div>


            <div className="card-header mt-12">
              <h4 className={`${currentIndex === 9 ? 'reading-active' : ''}`} data-reading-index="9">
                <KaraokeLessonText
                  as="span"
                  text={showHideSteps[7]}
                  isActive={isSpeaking && currentIndex === 9}
                  currentCharIndex={currentCharIndex}
                />
              </h4>
            </div>

            <div className={`instruction-step ${currentIndex === 10 ? 'reading-active' : ''}`} data-reading-index="10">
              <div className="step-header">
                <span className="step-number">1 </span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text={showHideSteps[8]}
                  isActive={isSpeaking && currentIndex === 10}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <img src={hideUnselectedEntity} alt={t('common.hide_unselected_entity_icon')} className="software-screenshot screenshot-small" style={{ width: '280px', marginBottom: "-3rem" }} />
              </div>
            </div>


            <div className={`instruction-step ${currentIndex === 11 ? 'reading-active' : ''}`} data-reading-index="11">
              <div className="step-header">
                <span className="step-number">2 </span>
                <div className="step-label" style={{ marginTop: "-1.5rem" }}>
                  <KaraokeLessonText
                    as="span"
                    text={showHideSteps[9]}
                    isActive={isSpeaking && currentIndex === 11}
                    currentCharIndex={currentCharIndex}
                  />
                  <img src={leftClick} alt={t('common.left_click')} className="screenshot-click--inline" style={{ width: '40px', margin: '0 8px' }} />
                </div>
              </div>
              <div className="step-description">
                <p className={`p-flush ${currentIndex === 12 ? "reading-active" : ""}`} data-reading-index="12" style={{ marginTop: "-1rem" }}>{showHideSteps[10]}</p>
                <img src={hideUnselectedEntity1} alt={t('common.hide_unselected_entity_example')} className="software-screenshot" style={{ width: '900px' }} />
              </div>
            </div>

            <div className="lesson-navigation">
              <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> {t('common.previous')}</button>
              <button className="nav-button next" onClick={handleNext}>{t('common.next')} <ChevronRight size={18} /></button>
            </div>
          </div>
        )}

        {activeTab === 'stretch' && (
          <div className="lesson-card tab-content fade-in">
            <div className="card-header">
              <h4 className={`${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
                <KaraokeLessonText
                  as="span"
                  text={stretchSteps[0]}
                  isActive={isSpeaking && currentIndex === 2}
                  currentCharIndex={currentCharIndex}
                />
              </h4>
            </div>

            <div className={`instruction-step ${currentIndex === 3 ? 'reading-active' : ''}`} data-reading-index="3">
              <div className="step-header">
                <span className="step-number">1 </span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text={stretchSteps[1]}
                  isActive={isSpeaking && currentIndex === 3}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <img src={stretchIcon} alt={t('common.stretch_icon')} className="software-screenshot screenshot-small" style={{ width: '280px', marginBottom: "-3rem" }} />
              </div>
            </div>


            <div className={`instruction-step ${currentIndex === 4 ? 'reading-active' : ''}`} data-reading-index="4">
              <div className="step-header">
                <span className="step-number">2 </span>
                <div className="step-label" style={{ marginTop: "-1.5rem" }}>
                  <KaraokeLessonText
                    as="span"
                    text={stretchSteps[2]}
                    isActive={isSpeaking && currentIndex === 4}
                    currentCharIndex={currentCharIndex}
                  />
                  <img src={leftClick} alt={t('common.left_click')} className="screenshot-click--inline" style={{ width: '40px', margin: '0 8px' }} />
                </div>
              </div>
            </div>


            <div className={`instruction-step ${currentIndex === 5 ? 'reading-active' : ''}`} data-reading-index="5" style={{ marginTop: "-2rem" }}>
              <div className="step-header">
                <span className="step-number">3 </span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text={stretchSteps[3]}
                  isActive={isSpeaking && currentIndex === 5}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <p className={`p-flush opacity-80 text-sm mb-4 ${currentIndex === 6 ? "reading-active" : ""}`} data-reading-index="6" style={{ marginBottom: "2rem", marginTop: "-1rem" }}> {stretchSteps[4]}</p>
                <img src={stretchItemEntry} alt={t('common.stretch_item_entry')} className="software-screenshot" style={{ width: '850px', height: 'auto' }} />
                <img src={stretchImg1} alt={t('common.stretch_drag_example')} className="software-screenshot screenshot-large mt-8" style={{ width: '900px', marginTop: "2rem" }} />
              </div>
            </div>


            <div>
              <h4 className={`text-highlight mb-4 ${currentIndex === 7 ? "reading-active" : ""}`} data-reading-index="7">
                <KaraokeLessonText
                  as="span"
                  text={stretchSteps[5]}
                  isActive={isSpeaking && currentIndex === 7}
                  currentCharIndex={currentCharIndex}
                />
              </h4>
              <div className={`instruction-step ${currentIndex === 8 ? 'reading-active' : ''}`} data-reading-index="8">
                <div className="step-header">
                  <div className="step-label">
                    <KaraokeLessonText
                      as="span"
                      text={stretchSteps[6]}
                      isActive={isSpeaking && currentIndex === 8}
                      currentCharIndex={currentCharIndex}
                    />
                    <img src={leftClick} alt={t('common.left_click')} className="screenshot-click--inline" style={{ width: '40px', margin: '0 8px' }} />
                    <KaraokeLessonText
                      as="span"
                      text={t('common.left_click_on_the_3d_5')}
                      isActive={isSpeaking && currentIndex === 8}
                      currentCharIndex={currentCharIndex - 17}
                    />
                  </div>
                </div>
                <div className="step-description">
                  <p className={`p-flush mt-4 ${currentIndex === 9 ? "reading-active" : ""}`} data-reading-index="9" style={{ marginTop: "-1rem" }}>
                    <KaraokeLessonText
                      as="span"
                      text={stretchSteps[7]}
                      isActive={isSpeaking && currentIndex === 9}
                      currentCharIndex={currentCharIndex}
                    />
                  </p>
                  <p className={`p-flush mt-4 ${currentIndex === 10 ? "reading-active" : ""}`} data-reading-index="10" style={{ marginBottom: "2rem" }}>
                    <KaraokeLessonText
                      as="span"
                      text={stretchSteps[8]}
                      isActive={isSpeaking && currentIndex === 10}
                      currentCharIndex={currentCharIndex}
                    />
                  </p>
                  <img src={stretchImg2} alt={t('common.stretch_scale_example')} className="software-screenshot screenshot-large mt-6" style={{ width: '900px' }} />
                </div>
              </div>
            </div>

            <div className="lesson-navigation">
              <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> {t('common.previous')}</button>
              <button className="nav-button next" onClick={handleNext}>{t('common.next')} <ChevronRight size={18} /></button>
            </div>
          </div>
        )}

        {activeTab === 'resize' && (
          <div className="lesson-card tab-content fade-in">
            <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h4 className={`${currentIndex === 0 ? 'reading-active' : ''}`} data-reading-index="0">
                <KaraokeLessonText
                  as="span"
                  text={resizeSteps[0]}
                  isActive={isSpeaking && currentIndex === 0}
                  currentCharIndex={currentCharIndex}
                />
              </h4>

            </div>

            <div className={`instruction-step ${currentIndex === 1 ? 'reading-active' : ''}`} data-reading-index="1">
              <div className="step-header">
                <span className="step-number">1 </span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text={resizeSteps[1]}
                  isActive={isSpeaking && currentIndex === 1}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <img src={resizeIcon} alt={t('common.resize_icon')} className="software-screenshot screenshot-small" style={{ width: '280px', marginBottom: "-4rem" }} />
              </div>
            </div>


            <div className={`instruction-step ${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
              <div className="step-header">
                <span className="step-number">2 </span>
                <div className="step-label" style={{ marginBottom: "1.5rem" }}>
                  <KaraokeLessonText
                    as="span"
                    text={resizeSteps[2]}
                    isActive={isSpeaking && currentIndex === 2}
                    currentCharIndex={currentCharIndex}
                  />
                  <img src={leftClick} alt={t('common.left_click')} className="screenshot-click--inline" style={{ width: '40px', margin: '0 8px' }} />
                </div>
              </div>
            </div>


            <div className={`instruction-step ${currentIndex === 3 ? 'reading-active' : ''}`} data-reading-index="3" style={{ marginTop: "-4rem" }}>
              <div className="step-header">
                <span className="step-number">3 </span>
                <div className="step-label" style={{ marginTop: "1.5rem" }}>
                  <KaraokeLessonText
                    as="span"
                    text={resizeSteps[3]}
                    isActive={isSpeaking && currentIndex === 3}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
              </div>
              <div className="step-description">
                <div className="flex-row-center--wrap mt-6" style={{ gap: '2rem' }}>
                  <img src={resizeItemEntry} alt={t('common.resize_item_entry')} className="software-screenshot" style={{ width: '200px', height: 'auto' }} />
                  <img src={resize3_2} alt={t('common.resize_scale_result')} className="software-screenshot screenshot-large mt-8" style={{ width: '900px', marginTop: "2rem" }} />
                </div>
              </div>
            </div>

            <div className="lesson-navigation">
              <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> {t('common.previous')}</button>
              <button className="nav-button next" onClick={handleNext}>{t('common.next')} <ChevronRight size={18} /></button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}; /* ── Basic Operation (5): Shape Steels ── */

const BasicOperation5: React.FC<SubLessonProps> = ({ subLessonId, onNextLesson, onPrevLesson, nextLabel }) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'shapeSteels'>(() => {
    return (localStorage.getItem(`${subLessonId}-tab`) as any) || 'shapeSteels';
  });
  // Note: speak and stop are not used in this component's single-tab layout.
  const { scrollProgress, containerRef, isSpeaking, currentIndex, currentCharIndex } = useLessonCore(subLessonId);

  useEffect(() => {
    localStorage.setItem(`${subLessonId}-tab`, activeTab);
  }, [subLessonId, activeTab]);


  const tabs = [{ id: 'shapeSteels', label: t('basicOp.shapeSteels.tab') }];

  return (
    <div className={`course-lesson-container`} ref={containerRef}>
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      <div className="lesson-tabs">
        {tabs.map(tab => (<button key={tab.id} className={`tab-button ${activeTab === tab.id ? 'active' : ''}`} onClick={() => setActiveTab(tab.id as any)}>{tab.label}</button>))}
      </div>

      <section className="lesson-intro">
        <h3 className={`section-title ${currentIndex === 0 ? "reading-active" : ""}`} data-reading-index="0">
          <KaraokeLessonText
            as="span"
            text={t('basicOp.shapeSteels.title')}
            isActive={isSpeaking && currentIndex === 0}
            currentCharIndex={currentCharIndex}
          />

        </h3>
        <KaraokeLessonText
          className={`lesson-subtitle ${currentIndex === 1 ? "reading-active" : ""}`}
          data-reading-index="1"
          text={t('basicOp.shapeSteels.intro')}
          isActive={isSpeaking && currentIndex === 1}
          currentCharIndex={currentCharIndex}
        />
        <img src={shapeSteels1} alt={t('common.shape_steels_overview')} className="software-screenshot" style={{ height: 'auto', width: "400px" }} />
      </section>

      <div className="lesson-grid single-card">
        {activeTab === 'shapeSteels' && (
          <div className="lesson-card tab-content fade-in">
            <div className="card-header">
              <h4 className={`${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
                <KaraokeLessonText
                  as="span"
                  text={t('basicOp.shapeSteels.includes')}
                  isActive={isSpeaking && currentIndex === 2}
                  currentCharIndex={currentCharIndex}
                />
              </h4>
            </div>

            <div className={`instruction-step ${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
              <div className="step-description">
                <img src={shapeSteelsTypes} alt={t('common.shape_steels_options')} className="software-screenshot" style={{ width: '900px' }} />
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 3 ? 'reading-active' : ''}`} data-reading-index="3">
              <div className="step-header">
                <span className="step-number">1 </span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text={t('basicOp.shapeSteels.step1')}
                  isActive={isSpeaking && currentIndex === 3}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <img src={arrangeMachinePartMenu} alt={t('common.arrange_machine_part_menu')} className="software-screenshot screenshot-small" style={{ width: '14rem' }} />
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 4 ? 'reading-active' : ''}`} data-reading-index="4">
              <div className="step-header">
                <span className="step-number">2 </span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text={t('basicOp.shapeSteels.step2')}
                  isActive={isSpeaking && currentIndex === 4}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <img src={arrangeMachinePartWindow} alt={t('common.arrange_machine_part_window')} className="software-screenshot" style={{ width: '900px', height: 'auto' }} />
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 5 ? 'reading-active' : ''}`} data-reading-index="5">
              <div className="step-header">
                <span className="step-number">3 </span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text={t('basicOp.shapeSteels.step3')}
                  isActive={isSpeaking && currentIndex === 5}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <img src={keyEntryArea} alt={t('common.key_entry_area')} className="software-screenshot" style={{ height: 'auto', width: "200px", marginBottom: "2rem" }} />
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
                <img src={shapeSteels2} alt={t('common.shape_steels_result')} className="software-screenshot screenshot-large" style={{ width: '900px', height: 'auto' }} />
              </div>
            </div>

            <div className="lesson-navigation">
              <button className="nav-button" onClick={onPrevLesson}><ChevronLeft size={18} /> {t('common.previous')}</button>
              <button className="nav-button next" onClick={onNextLesson}>{nextLabel || t('common.next')} <ChevronRight size={18} /></button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
/* Main export  Erenders the correct sub-lesson based on subLessonId prop */

interface BasicOperationLessonProps { subLessonId: string; onNextLesson?: () => void; onPrevLesson?: () => void; nextLabel?: string; }

const BasicOperationLesson: React.FC<BasicOperationLessonProps> = ({ subLessonId, onNextLesson, onPrevLesson, nextLabel }) => {
  switch (subLessonId) {
    case 'basic-op-1':
      return <BasicOperation1 subLessonId={subLessonId} onNextLesson={onNextLesson} onPrevLesson={onPrevLesson} nextLabel={nextLabel} />;
    case 'basic-op-2':
      return <BasicOperation2 subLessonId={subLessonId} onNextLesson={onNextLesson} onPrevLesson={onPrevLesson} nextLabel={nextLabel} />;
    case 'basic-op-3':
      return <BasicOperation3 subLessonId={subLessonId} onNextLesson={onNextLesson} onPrevLesson={onPrevLesson} nextLabel={nextLabel} />;
    case 'basic-op-4':
      return <BasicOperation4 subLessonId={subLessonId} onNextLesson={onNextLesson} onPrevLesson={onPrevLesson} nextLabel={nextLabel} />;
    case 'basic-op-5':
      return <BasicOperation5 subLessonId={subLessonId} onNextLesson={onNextLesson} onPrevLesson={onPrevLesson} nextLabel={nextLabel} />;
    default:
      return <BasicOperation1 subLessonId={subLessonId} onNextLesson={onNextLesson} onPrevLesson={onPrevLesson} nextLabel={nextLabel} />;
  }
};

export { BasicOperation1, BasicOperation2, BasicOperation3, BasicOperation4, BasicOperation5, BasicOperationLesson };
export default BasicOperationLesson;

