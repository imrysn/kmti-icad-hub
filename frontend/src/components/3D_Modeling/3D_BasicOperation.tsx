

import React,
{

  useState,

  useEffect, useRef
} from 'react';

import {
  MousePointer2,
  Keyboard,
  Box as BoxIcon,
  Circle,
  ChevronLeft,
  ChevronRight,
  ArrowDown,
  ArrowRight,
  Info,
  Zap,
  Play
} from 'lucide-react';
import { useLessonCore } from '../../hooks/useLessonCore';

import { ReadAloudButton } from '../ReadAloudButton';
import { KaraokeLessonText } from '../KaraokeLessonText';
import VideoTutorialViewer, { TutorialStep } from './VideoTutorialViewer';
import {
  cylinderTutorialSteps,
  boxTutorialSteps,
  polygonTutorialSteps,
  coneTutorialSteps,
  torusTutorialSteps
} from './VideoTutorialData/basicOp1TutorialSteps';
import '../../styles/3D_Modeling/CourseLesson.css';
/* ── Shared Asset Imports ────────────────────────────────────────────────── */

import leftClick from '../../assets/3D_Image_File/left_click.png';

// Video imports for replacing preview images
import vidCylinder from '../../assets/3D_Video_Tutorial/basicOp_cylinder.mp4';
import vidBox from '../../assets/3D_Video_Tutorial/basicOp_box.mp4';
import vidPolygon from '../../assets/3D_Video_Tutorial/basicOp_polygon.mp4';
import vidCone from '../../assets/3D_Video_Tutorial/basicOp_cone.mp4';
import vidTorus from '../../assets/3D_Video_Tutorial/basicOp_torus.mp4';
import vidMove from '../../assets/3D_Video_Tutorial/basicOp_move.mp4';
import vidRotate from '../../assets/3D_Video_Tutorial/basicOp_rotate.mp4';
import vidCopy from '../../assets/3D_Video_Tutorial/basicOp_copy.mp4';
import vidMirror from '../../assets/3D_Video_Tutorial/basicOp_mirror.mp4';
/* ══════════════════════════════════════════════════════════════════════════ */
/* Basic Operation (1)  ECREATING BASIC SHAPES */
/* Lesson-item child ID: 'basic-op-1' */
/* Tabs: Cylinder | Box | Polygon | Cone | Torus */
/* ══════════════════════════════════════════════════════════════════════════ */

import cmdMenu from '../../assets/3D_Image_File/basic_operation1_command_menu.png';

import threeDView from '../../assets/3D_Image_File/basic_operation1_3d_view.png';

import arrangeCylinder from '../../assets/3D_Image_File/basic_operation1_arrange_cylinder.png';

import cylinderResult from '../../assets/3D_Image_File/basic_operation1_cylinder.png';

import itemEntry from '../../assets/3D_Image_File/basic_operation1_item_entry.png';

import keyEntry from '../../assets/3D_Image_File/basic_operation1_key_entry_area.png';

import arrangeBox from '../../assets/3D_Image_File/basic_operation1_arrange_box.png';

import itemEntryBox from '../../assets/3D_Image_File/basic_operation1_item_entry_box.png';

import boxResult from '../../assets/3D_Image_File/box.png';


import arrangePolygon from '../../assets/3D_Image_File/basic_operation1_arrange_polygon_prism.png';

import polygonResult from '../../assets/3D_Image_File/polygon.png';

import itemEntryPolygon from '../../assets/3D_Image_File/item_entry_polygon.png';

import arrangeCone from '../../assets/3D_Image_File/basic_operation2_arrange_cone.png';

import itemEntryCone from '../../assets/3D_Image_File/basic_operation2_item_entry_cone.png';

import coneResult from '../../assets/3D_Image_File/cone.png';

import arrangeTorus from '../../assets/3D_Image_File/basic_operation2_arrange_torus.png';

import torusResult from '../../assets/3D_Image_File/torus.png';

import itemEntryTorus from '../../assets/3D_Image_File/basic_operation2_item_entry_torus.png';
/* ══════════════════════════════════════════════════════════════════════════ */
/* Basic Operation (2)  EMOVE, ROTATE, COPY, MIRROR, DELETE */
/* Lesson-item child ID: 'basic-op-2' */
/* Tabs: Move | Rotate | Mirror | Copy | Rotate Copy | Mirror Copy | Delete */
/* ══════════════════════════════════════════════════════════════════════════ */

import operationsMenu from '../../assets/3D_Image_File/basic_operation1_move_rotate_copy_mirror_delete.png';

import moveMenu from '../../assets/3D_Image_File/basic_operation2_move.png';

import itemEntryMove from '../../assets/3D_Image_File/basic_operation2_item_entry_box.png';

import moveResult from '../../assets/3D_Image_File/basic_operation2_move_3.png';

import rotateIcon from '../../assets/3D_Image_File/basic_operation3_rotate.png';

import rotateAxis from '../../assets/3D_Image_File/basic_operation3_rotate_axis_rotation.png';

import rotateEntry from '../../assets/3D_Image_File/basic_operation3_rotate_item_entry.png';

import mirrorIcon from '../../assets/3D_Image_File/basic_operation3_mirror.png';

import mirrorResult from '../../assets/3D_Image_File/basic_operation3_mirrored.png';

import copyIcon from '../../assets/3D_Image_File/basic_operation3_copy.png';

import copyDistance from '../../assets/3D_Image_File/basic_operation3_copy_distance.png';

import copyResult from '../../assets/3D_Image_File/basic_operation3_copy_3.png';

import rotateCopyIcon from '../../assets/3D_Image_File/basic_operation3_rotatecopy.png';

import rotateCopyAxis from '../../assets/3D_Image_File/basic_operation3_rotate_copy.png';

import mirrorCopyIcon from '../../assets/3D_Image_File/basic_operation3_mirror_copy.png';

import mirrorCopyResult from '../../assets/3D_Image_File/basic_operation3_mirrorcopy.png';

import deleteIcon from '../../assets/3D_Image_File/basic_operation3_delete.png';
/* ══════════════════════════════════════════════════════════════════════════ */
/* Basic Operation (3)  ESKETCH / EXTRUDE / REVOLVE / SHOW-HIDE / STRETCH / RESIZE */
/* Lesson-item child ID: 'basic-op-3' */
/* Tabs: Sketch/Extrude/Revolve | Show/Hide | Stretch | Resize */
/* ══════════════════════════════════════════════════════════════════════════ */

import sketchIcon from '../../assets/3D_Image_File/basic_operation4_sketch.jpg';

import sketchResultImg from '../../assets/3D_Image_File/basic_operation4_sketch1.jpg';

import sketchIntroImg from '../../assets/3D_Image_File/basic_operation_(3)_sketch.jpg';

import extrudeRevolveMenu from '../../assets/3D_Image_File/basic_operation4_extrude_revolve.png';

import extrudeOneSide from '../../assets/3D_Image_File/basic_operation4_extrusion_oneside.png';
/* cspell:disable-line */

import extrudeBothSide from '../../assets/3D_Image_File/basic_operation4_extrusion_bothside.png';
/* cspell:disable-line */

import revolveIcon from '../../assets/3D_Image_File/basic_operation4_revolve.png';

import revolveP1 from '../../assets/3D_Image_File/basic_operation4_revolve_p1.png';

import revolveP2 from '../../assets/3D_Image_File/basic_operation4_revolve_p2.png';

import showHideMenu from '../../assets/3D_Image_File/basic_operation4_show_hide.jpg';

import showHideEntity from '../../assets/3D_Image_File/basic_operation4_show_hide_entity.png';

import showHideDraftingEntity from '../../assets/3D_Image_File/basic_operation4_showhide_drafting_entity.png';
/* cspell:disable-line */

import hideUnselectedEntity from '../../assets/3D_Image_File/basic_operation4_hide_unselected_entity.png';

import hideUnselectedEntity1 from '../../assets/3D_Image_File/basic_operation4_hide_unselected_entity_1.png';

import fairingChamferImg from '../../assets/3D_Image_File/fairing_chamfer.jpg';
import stretchIcon from '../../assets/3D_Image_File/basic_operation5_stretch.png';

import stretchItemEntry from '../../assets/3D_Image_File/basic_operation5_item_entry_stretch.png';

import stretchImg1 from '../../assets/3D_Image_File/basic_operation5_stretch1.png';

import stretchImg2 from '../../assets/3D_Image_File/basic_operation5_stretch2.png';

import resizeIcon from '../../assets/3D_Image_File/basic_operation5_resize.png';

import resizeItemEntry from '../../assets/3D_Image_File/basic_operation5_item_entry_resize.png';

import resize3_2 from '../../assets/3D_Image_File/basic_operation5_resize3_2.png';
/* ══════════════════════════════════════════════════════════════════════════ */
/* Basic Operation (4)  EARRANGE MACHINE PART / SHAPE STEELS */
/* Lesson-item child ID: 'basic-op-4' */
/* Tabs: Shape Steels */
/* ══════════════════════════════════════════════════════════════════════════ */

import arrangeMachinePartMenu from '../../assets/3D_Image_File/basic_operation6_arrange_machine_part.png';

import arrangeMachinePartWindow from '../../assets/3D_Image_File/basic_operation6_arrange_machine_part_window.png';

import shapeSteelsTypes from '../../assets/3D_Image_File/basic_operation6_shape_steels.png';

import shapeSteels1 from '../../assets/3D_Image_File/basic_operation6_shape_steels1.png';

import shapeSteels2 from '../../assets/3D_Image_File/basic_operation6_shape_steels2.png';

import keyEntryArea from '../../assets/3D_Image_File/basic_operation1_key_entry_area.png';
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

const BasicOperation1: React.FC<SubLessonProps> = ({ subLessonId, onNextLesson, onPrevLesson, nextLabel }) => {
  const [activeTab, setActiveTab] = useState<'cylinder' | 'box' | 'polygon' | 'cone' | 'torus'>(() => {
    return (localStorage.getItem(`${subLessonId}-tab`) as any) || 'cylinder';
  });
  const { scrollProgress, containerRef, speak, stop, isSpeaking, currentIndex, currentCharIndex, registerText } = useLessonCore(subLessonId);

  useEffect(() => {
    localStorage.setItem(`${subLessonId}-tab`, activeTab);
  }, [subLessonId, activeTab]);

  const videoSectionRef = useRef<HTMLDivElement>(null);
  const beforeYouStartRef = useRef<HTMLDivElement>(null);

  // ── Unified narrated tour (single script, auto-switches tabs) ────────────
  // Memoised so the array reference is stable across renders, avoiding
  // spurious re-registrations in the registerText useEffect below.
  const lessonSteps = React.useMemo(() => [
    "Creating Basic Shapes",                                                         // 0 heading
    "In iCAD, there are many solid shapes available, but in this lesson we will cover five of the most commonly used ones: the Cylinder, the Box, the Polygon, the Cone, and the Torus.", // 1 overview
    "A Cylinder is a circular solid defined by its Diameter and Height — ideal for shafts, pins, bosses, and round posts.", // 2 → cylinder tab
    "A Box is a rectangular solid defined by Depth, Width, and Height. It forms the foundation of structural parts such as plates, brackets, and housings.", // 3 → box tab
    "A Polygon is a prismatic solid with a regular polygonal cross-section. You define it by the Number of Sides, the circumscribed Path Diameter, and the Height — useful for hexagonal bolts and multi-sided columns.", // 4 → polygon tab
    "A Cone is a tapered solid defined by the Number of Sides, Base Diameter, Top Face Diameter, and Height. Setting the top face diameter to zero creates a pointed cone.", // 5 → cone tab
    "A Torus is a donut-shaped solid defined by the Section Diameter, Path Radius, and Turn Angle. It is used for O-rings, gaskets, and curved pipe sections.", // 6 → torus tab
    "Before creating any shape, always start with the Front View. This ensures your model is correctly oriented from the beginning.", // 7 → back to cylinder, scroll to Before You Start
    "On the command menu, go to Arrange Solid and select Y Orientation to align the shape correctly along the Y axis.", // 8 → command menu step
    "Now that you know the available shapes and the setup steps, watch the video tutorial to see a step-by-step demonstration of how each shape is created in iCAD." // 9 → scroll to video
  ], []);

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
    { id: 'cylinder', label: 'Cylinder' },
    { id: 'box', label: 'Box' },
    { id: 'polygon', label: 'Polygon' },
    { id: 'cone', label: 'Cone' },
    { id: 'torus', label: 'Torus' }
  ];

  const handleNext = (isAuto: boolean = false) => {
    stop();
    if (!isAuto) {
      sessionStorage.setItem('tts-autoplay-active', 'false');
    }
    const i = tabs.findIndex(t => t.id === activeTab);
    if (i < tabs.length - 1) { setActiveTab(tabs[i + 1].id as any); } else if (onNextLesson) onNextLesson();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrev = (isAuto: boolean = false) => {
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
            as="span"
            text="Creating Basic Shapes"
            isActive={isSpeaking && currentIndex === 0}
            currentCharIndex={currentCharIndex}
          />
        </h3>

        {/* TTS index 1 — overview narration */}
        <div className={`instruction-step ${currentIndex === 1 ? 'reading-active' : ''}`} data-reading-index="1" style={{ marginTop: '0.5rem' }}>
          <KaraokeLessonText
            text="In iCAD, there are many solid shapes available, but in this lesson we will cover five of the most commonly used ones: the Cylinder, the Box, the Polygon, the Cone, and the Torus."
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
            <h4 style={{ margin: 0 }}>BEFORE YOU START</h4>
          </div>

          <div className={`instruction-step ${isSpeaking && currentIndex === 7 ? 'reading-active' : ''}`} data-reading-index="7" style={{ marginTop: '1.5rem' }}>
            <KaraokeLessonText
              text="Before creating any shape, always start with the Front View. This ensures your model is correctly oriented from the beginning."
              isActive={isSpeaking && currentIndex === 7}
              currentCharIndex={currentCharIndex}
            />
            <img src={threeDView} alt="3D View" className="software-screenshot mt-8" style={{ width: '350px' }} />
          </div>

          <div className={`instruction-box mt-8 instruction-step ${isSpeaking && currentIndex === 8 ? 'reading-active' : ''}`} data-reading-index="8">
            <KaraokeLessonText
              text="On the command menu, go to Arrange Solid and select Y Orientation to align the shape correctly along the Y axis."
              isActive={isSpeaking && currentIndex === 8}
              currentCharIndex={currentCharIndex}
            />
            <img src={cmdMenu} alt="Command Menu" className="software-screenshot" style={{ width: '200px', marginTop: '1rem' }} />
          </div>
        </div>


        {activeTab === 'cylinder' && (
          <div className="lesson-card tab-content fade-in" style={{ marginTop: '2rem' }}>
            <div className="card-header">
              <h4 style={{ margin: 0 }}>CYLINDER TUTORIAL</h4>
            </div>


            {/* Watch tutorial prompt — shown at step 9 (closing message) */}
            {currentIndex === 9 && isSpeaking && (
              <div className={`instruction-step reading-active`} data-reading-index="9" style={{ marginTop: '1rem' }}>
                <KaraokeLessonText
                  text="Now that you know the available shapes and the setup steps, watch the video tutorial to see a step-by-step demonstration of how each shape is created in iCAD."
                  isActive={true}
                  currentCharIndex={currentCharIndex}
                />
              </div>
            )}

            <div ref={videoSectionRef} style={{ height: '500px', width: '100%', marginTop: '2rem', marginBottom: '2rem' }}>
              <VideoTutorialViewer steps={cylinderTutorialSteps} />
            </div>

            <div className="lesson-navigation">
              <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button>
              <button className="nav-button next" onClick={handleNext}>Next<ChevronRight size={18} /></button>
            </div>
          </div>
        )}

        {activeTab === 'box' && (
          <div className="lesson-card tab-content fade-in" style={{ marginTop: '2rem' }}>
            <div className="card-header">
              <h4 style={{ margin: 0 }}>BOX TUTORIAL</h4>
            </div>


            <div style={{ height: '500px', width: '100%', marginTop: '2rem', marginBottom: '2rem' }}>
              <VideoTutorialViewer steps={boxTutorialSteps} />
            </div>

            <div className="lesson-navigation">
              <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button>
              <button className="nav-button next" onClick={handleNext}>Next<ChevronRight size={18} /></button>
            </div>
          </div>
        )}

        {activeTab === 'polygon' && (
          <div className="lesson-card tab-content fade-in" style={{ marginTop: '2rem' }}>
            <div className="card-header">
              <h4 style={{ margin: 0 }}>POLYGON TUTORIAL</h4>
            </div>


            <div style={{ height: '500px', width: '100%', marginTop: '2rem', marginBottom: '2rem' }}>
              <VideoTutorialViewer steps={polygonTutorialSteps} />
            </div>

            <div className="lesson-navigation">
              <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button>
              <button className="nav-button next" onClick={handleNext}>Next <ChevronRight size={18} /></button>
            </div>
          </div>
        )}

        {activeTab === 'cone' && (
          <div className="lesson-card tab-content fade-in" style={{ marginTop: '2rem' }}>
            <div className="card-header">
              <h4 style={{ margin: 0 }}>CONE TUTORIAL</h4>
            </div>


            <div style={{ height: '500px', width: '100%', marginTop: '2rem', marginBottom: '2rem' }}>
              <VideoTutorialViewer steps={coneTutorialSteps} />
            </div>

            <div className="lesson-navigation">
              <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button>
              <button className="nav-button next" onClick={handleNext}>Next <ChevronRight size={18} /></button>
            </div>
          </div>
        )}

        {activeTab === 'torus' && (
          <div className="lesson-card tab-content fade-in" style={{ marginTop: '2rem' }}>
            <div className="card-header">
              <h4 style={{ margin: 0 }}>TORUS TUTORIAL</h4>
            </div>


            <div style={{ height: '500px', width: '100%', marginTop: '2rem', marginBottom: '2rem' }}>
              <VideoTutorialViewer steps={torusTutorialSteps} />
            </div>

            <div className="lesson-navigation">
              <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button>
              <button className="nav-button next" onClick={handleNext}>Next Lesson <ChevronRight size={18} /></button>
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
  const { scrollProgress, containerRef, speak, stop, isSpeaking, currentIndex, currentCharIndex, registerText } = useLessonCore(subLessonId);

  useEffect(() => {
    localStorage.setItem(`${subLessonId}-tab`, activeTab);
  }, [subLessonId, activeTab]);

  const moveSteps = [
    "Step 1: Select Move from the icon menu.",
    "Step 2: Left-click on the entity to be moved and click GO.",
    "Step 3: Specify the movement distance on the X, Y, and Z-axis on the item entry. Press Enter. Or after step 2, select a point on the entity then left-click on the desired location."
  ];

  const rotateSteps = [
    "Step 1: Select Rotate from the icon menu.",
    "Step 2: Left-click on the entity to be rotated and click GO.",
    "Step 3: Select 2-points to set the axis of rotation.",
    "Step 4: Specify the desired angle of rotation on the item entry and press Enter."
  ];

  const mirrorSteps = [
    "Step 1: Select Mirror from the icon menu.",
    "Step 2: Left-click on the entity to be mirrored and click GO.",
    "Step 3: Select 3-points to set the plane where the entity will be mirrored or left-click on the face where the entity will be mirrored."
  ];

  const copySteps = [
    "Step 1: Select Copy from the icon menu.",
    "Step 2: Left-click on the entity to be copied and click GO.",
    "Step 3: Specify the distance on the X, Y and Z-axis and the number of copies needed then press Enter."
  ];

  const rotateCopySteps = [
    "Step 1: Same as rotate tool but makes a rotated duplicate of the entity."
  ];

  const mirrorCopySteps = [
    "Step 1: Same as mirror tool but makes a mirror duplicate of the entity."
  ];

  const deleteSteps = [
    "Step 1: Select Delete from the icon menu.",
    "Step 2: Left-click on the entity to delete."
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
    { id: 'move', label: 'Move' },
    { id: 'rotate', label: 'Rotate' },
    { id: 'mirror', label: 'Mirror' },
    { id: 'copy', label: 'Copy' },
    { id: 'rotateCopy', label: 'Rotate Copy' },
    { id: 'mirrorCopy', label: 'Mirror Copy' },
    { id: 'delete', label: 'Delete' }
  ];

  const handleNext = (isAuto: boolean = false) => {
    stop();
    if (!isAuto) {
      sessionStorage.setItem('tts-autoplay-active', 'false');
    }
    const i = tabs.findIndex(t => t.id === activeTab);
    if (i < tabs.length - 1) { setActiveTab(tabs[i + 1].id as any); } else if (onNextLesson) onNextLesson();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrev = (isAuto: boolean = false) => {
    stop();
    if (!isAuto) {
      sessionStorage.setItem('tts-autoplay-active', 'false');
    }
    const i = tabs.findIndex(t => t.id === activeTab);
    if (i > 0) { setActiveTab(tabs[i - 1].id as any); } else if (onPrevLesson) onPrevLesson();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const introTitle = "Move, Rotate, Copy, Mirror, Delete";
    const introDesc = "Use these tools to reposition, duplicate, or remove entities from your workspace.";
    const currentSteps = getSteps(activeTab as Op2Tab);
    const fullSteps = [introTitle, introDesc, activeTab.toUpperCase(), ...currentSteps];
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
          const introTitle = "Move, Rotate, Copy, Mirror, Delete";
          const introDesc = "Use these tools to reposition, duplicate, or remove entities from your workspace.";
          const currentSteps = getSteps(activeTab as Op2Tab);
          const startIdx = activeTab === 'move' ? 0 : 2;
          speak([introTitle, introDesc, activeTab.toUpperCase(), ...currentSteps], startIdx);
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
            text="Move, Rotate, Copy, Mirror, Delete"
            isActive={isSpeaking && currentIndex === 0}
            currentCharIndex={currentCharIndex}
          />
          
        </h3>
        <KaraokeLessonText
          className={`lesson-subtitle ${currentIndex === 1 ? "reading-active" : ""}`}
          data-reading-index="1"
          text="Use these tools to reposition, duplicate, or remove entities from your workspace."
          isActive={isSpeaking && currentIndex === 1}
          currentCharIndex={currentCharIndex}
        />
        <img src={operationsMenu} alt="Operations Menu" className="software-screenshot screenshot-small mt-8" style={{ width: '180px' }} />
      </section>

      <div className="lesson-grid single-card">
        {activeTab === 'move' && (
          <div className="lesson-card tab-content fade-in">
            <div className="card-header">
              <h4 className={`${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
                <KaraokeLessonText
                  as="span"
                  text="MOVE"
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
                  text="Select Move from the icon menu"
                  isActive={isSpeaking && currentIndex === 3}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <img src={moveMenu} alt="Move menu icon" className="software-screenshot screenshot-small" style={{ width: '190px', marginBottom: "-2rem" }} />
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 4 ? 'reading-active' : ''}`} data-reading-index="4" style={{ marginBottom: "-2rem" }}>
              <div className="step-header">
                <span className="step-number">2 </span>
                <div className="step-label" style={{ marginTop: "-1.5rem" }}>
                  <KaraokeLessonText
                    as="span"
                    text="Left-click on the entity to be moved > GO"
                    isActive={isSpeaking && currentIndex === 4}
                    currentCharIndex={currentCharIndex}
                  />
                  <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '40px', margin: '0 8px' }} />
                </div>
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 5 ? 'reading-active' : ''}`} data-reading-index="5">
              <div className="step-header">
                <span className="step-number">3 </span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text="Specify the movement distance on the X, Y and Z-axis on the item entry > Press Enter"
                  isActive={isSpeaking && currentIndex === 5}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <img src={itemEntryMove} alt="Item Entry Move" className="software-screenshot" style={{ width: '900px', height: 'auto' }} />
                <KaraokeLessonText
                  className="p-flush mt-4 text-highlight"
                  text="Or after step 2, select a point on the entity then left-click on the desired location"
                  isActive={isSpeaking && currentIndex === 5}
                  currentCharIndex={currentCharIndex}
                />
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 5 ? 'reading-active' : ''}`} data-reading-index="5">
              <div className="card-header"><h4>RESULT</h4></div>
              <PremiumVideoPlayer src={vidMove} className="software-screenshot screenshot-wide mt-8" style={{ width: '900px' }} />
            </div>

            <div className="lesson-navigation">
              <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button>
              <button className="nav-button next" onClick={handleNext}>Next <ChevronRight size={18} /></button>
            </div>
          </div>
        )}

        {activeTab === 'rotate' && (
          <div className="lesson-card tab-content fade-in">
            <div className="card-header">
              <h4 className={`${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
                <KaraokeLessonText
                  as="span"
                  text="ROTATE"
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
                  text="Select Rotate from the icon menu"
                  isActive={isSpeaking && currentIndex === 3}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <img src={rotateIcon} alt="Rotate icon" className="software-screenshot screenshot-small" style={{ width: '190px', marginBottom: "-4rem" }} />
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 4 ? 'reading-active' : ''}`} data-reading-index="4" style={{ marginBottom: "-4rem" }}>
              <div className="step-header">
                <span className="step-number">2 </span>
                <div className="step-label" style={{ marginBottom: "1.5rem" }}>
                  <KaraokeLessonText
                    as="span"
                    text="Left-click on the entity to be rotated > GO"
                    isActive={isSpeaking && currentIndex === 4}
                    currentCharIndex={currentCharIndex}
                  />
                  <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '40px', margin: '0 8px' }} />
                </div>
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 5 ? 'reading-active' : ''}`} data-reading-index="5" style={{ marginBottom: "-3rem" }}>
              <div className="step-header">
                <span className="step-number">3 </span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text="Select 2-points to set the axis of rotation"
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
                  text="Specify the desired angle of rotation on the item entry > Press Enter"
                  isActive={isSpeaking && currentIndex === 6}
                  currentCharIndex={currentCharIndex}
                />
              </div>

              <div className="step-description">
                <img src={rotateEntry} alt="Rotate Item Entry" className="software-screenshot screenshot-medium" style={{ width: '900px' }} />
              </div>
            </div>

            <div className="card-header"><h4>RESULT</h4></div>
            <PremiumVideoPlayer src={vidRotate} className="software-screenshot" style={{ width: '900px', marginBottom: "-3rem" }} />

            <div className="lesson-navigation">
              <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button>
              <button className="nav-button next" onClick={handleNext}>Next <ChevronRight size={18} /></button>
            </div>
          </div>
        )}

        {activeTab === 'mirror' && (
          <div className="lesson-card tab-content fade-in">
            <div className="card-header">
              <h4 className={`${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
                <KaraokeLessonText
                  as="span"
                  text="MIRROR"
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
                  text="Select Mirror from the icon menu"
                  isActive={isSpeaking && currentIndex === 3}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <img src={mirrorIcon} alt="Mirror icon" className="software-screenshot screenshot-small" style={{ width: '190px', marginBottom: "-4rem" }} />
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 4 ? 'reading-active' : ''}`} data-reading-index="4" style={{ marginBottom: "-5rem" }}>
              <div className="step-header">
                <span className="step-number">2 </span>
                <div className="step-label" style={{ marginBottom: "1.5rem" }}>
                  <KaraokeLessonText
                    as="span"
                    text="Left-click on the entity to be mirrored > GO"
                    isActive={isSpeaking && currentIndex === 4}
                    currentCharIndex={currentCharIndex}
                  />
                  <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '40px', margin: '0 8px' }} />
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
                  text="Select 3-points to set the plane where the entity will be mirrored or left-click on the face where the entity will be mirrored"
                  isActive={isSpeaking && currentIndex === 5}
                  currentCharIndex={currentCharIndex}
                />
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 6 ? 'reading-active' : ''}`} data-reading-index="6">
              <div className="card-header"><h4>RESULT</h4></div>
              <PremiumVideoPlayer src={vidMirror} className="software-screenshot mt-8" style={{ width: '900px' }} />
            </div>

            <div className="lesson-navigation">
              <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button>
              <button className="nav-button next" onClick={handleNext}>Next <ChevronRight size={18} /></button>
            </div>
          </div>
        )}

        {activeTab === 'copy' && (
          <div className="lesson-card tab-content fade-in">
            <div className="card-header">
              <h4 className={`${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
                <KaraokeLessonText
                  as="span"
                  text="COPY"
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
                  text="Select Copy from the icon menu"
                  isActive={isSpeaking && currentIndex === 3}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <img src={copyIcon} alt="Copy icon" className="software-screenshot screenshot-small" style={{ width: '250px', marginBottom: "-2rem" }} />
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 4 ? 'reading-active' : ''}`} data-reading-index="4" style={{ marginBottom: "-2rem" }}>
              <div className="step-header">
                <span className="step-number">2 </span>
                <div className="step-label" style={{ marginTop: "-1.5rem" }}>
                  <KaraokeLessonText
                    as="span"
                    text="Left-click on the entity to be copied > GO"
                    isActive={isSpeaking && currentIndex === 4}
                    currentCharIndex={currentCharIndex}
                  />
                  <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '40px', margin: '0 8px' }} />
                </div>
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 5 ? 'reading-active' : ''}`} data-reading-index="5">
              <div className="step-header">
                <span className="step-number">3 </span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text="Specify the distance on the X, Y and Z-axis and the number of copies needed > Press Enter"
                  isActive={isSpeaking && currentIndex === 5}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <img src={copyDistance} alt="Copy Distance" className="software-screenshot screenshot-wide" style={{ width: '1000px', height: "100px" }} />
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 6 ? 'reading-active' : ''}`} data-reading-index="6">
              <div className="card-header"><h4>RESULT</h4></div>
              <PremiumVideoPlayer src={vidCopy} className="software-screenshot screenshot-large mt-8" style={{ maxWidth: '600px' }} />
            </div>

            <div className="lesson-navigation">
              <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button>
              <button className="nav-button next" onClick={handleNext}>Next <ChevronRight size={18} /></button>
            </div>
          </div>
        )}

        {activeTab === 'rotateCopy' && (
          <div className="lesson-card tab-content fade-in">
            <div className="card-header">
              <h4 className={`${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
                <KaraokeLessonText
                  as="span"
                  text="ROTATE COPY"
                  isActive={isSpeaking && currentIndex === 2}
                  currentCharIndex={currentCharIndex}
                />
              </h4>
            </div>
            <p className={`p-flush ${currentIndex === 3 ? "reading-active" : ""}`} data-reading-index="3" style={{ marginTop: "-2rem" }}>Same as rotate tool but makes a rotated duplicate of the entity.</p>

            <div className="step-description">
              <img src={rotateCopyIcon} alt="Rotate Copy icon" className="software-screenshot screenshot-small" style={{ width: '250px' }} />
            </div>


            <div className={`instruction-step ${currentIndex === 4 ? 'reading-active' : ''}`} data-reading-index="4">
              <div className="card-header"><h4>RESULT</h4></div>
              <img src={rotateCopyAxis} alt="Rotate Copy Result" className="software-screenshot screenshot-large mt-8" style={{ width: '900px' }} />
            </div>

            <div className="lesson-navigation">
              <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button>
              <button className="nav-button next" onClick={handleNext}>Next <ChevronRight size={18} /></button>
            </div>
          </div>
        )}

        {activeTab === 'mirrorCopy' && (
          <div className="lesson-card tab-content fade-in">
            <div className="card-header">
              <h4 className={`${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
                <KaraokeLessonText
                  as="span"
                  text="MIRROR COPY"
                  isActive={isSpeaking && currentIndex === 2}
                  currentCharIndex={currentCharIndex}
                />
              </h4>
            </div>
            <p className={`p-flush ${currentIndex === 3 ? "reading-active" : ""}`} data-reading-index="3" style={{ marginTop: "-2rem" }}>Same as mirror tool but makes a mirror duplicate of the entity.</p>

            <div className="step-description">
              <img src={mirrorCopyIcon} alt="Mirror Copy icon" className="software-screenshot screenshot-small" style={{ width: '250px' }} />
            </div>

            <div className={`instruction-step ${currentIndex === 5 ? 'reading-active' : ''}`} data-reading-index="5">
              <div className="card-header"><h4>RESULT</h4></div>
              <img src={mirrorCopyResult} alt="Mirror Copy Preview" className="software-screenshot screenshot-large mt-8" style={{ width: '900px' }} />
            </div>

            <div className="lesson-navigation">
              <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button>
              <button className="nav-button next" onClick={handleNext}>Next <ChevronRight size={18} /></button>
            </div>
          </div>
        )}

        {activeTab === 'delete' && (
          <div className="lesson-card tab-content fade-in">
            <div className="card-header">
              <h4 className={`${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
                <KaraokeLessonText
                  as="span"
                  text="DELETE"
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
                  text="Select Delete from the icon menu"
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
                  text="Left-click on the entity to delete"
                  isActive={isSpeaking && currentIndex === 4}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <img src={deleteIcon} alt="Delete icon" className="software-screenshot screenshot-small" style={{ width: '300px' }} />
              </div>
            </div>

            <div className="lesson-navigation">
              <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button>
              <button className="nav-button next" onClick={handleNext}>{nextLabel || 'Next'} <ChevronRight size={18} /></button>
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
  const { scrollProgress, containerRef, speak, stop, isSpeaking, currentIndex, currentCharIndex, registerText } = useLessonCore(subLessonId);

  useEffect(() => {
    localStorage.setItem(`${subLessonId}-tab`, activeTab);
  }, [subLessonId, activeTab]);

  const sketchSteps = [
    "SKETCH",
    "Tool used to create lines."
  ];

  const extrudeSteps = [
    "EXTRUDE",
    "Step 1: Select Extrude from the icon menu.",
    "Step 2: Select the perimeter of the sketch to be extrude then GO. A hatch will appear indicating the specified area to be extruded.",
    "Step 3: Specify the height of extrusion. Can also be set on the item entry.",
    "Step 4: Press ENTER to finalize."
  ];

  const revolveSteps = [
    "REVOLVE",
    "Step 1: Select Revolve from the icon menu.",
    "Step 2: Select the perimeter of the sketch to be revolve then GO",
    "Step 3: Select the axis of rotation (pick points or edge) then GO. A hatch will appear indicating the specified area to be revolved."
  ];

  const tabs = [
    { id: 'sketch', label: 'SKETCH' },
    { id: 'extrude', label: 'EXTRUDE' },
    { id: 'revolve', label: 'REVOLVE' }
  ];

  const handleNext = (isAuto: boolean = false) => {
    stop();
    if (!isAuto) {
      sessionStorage.setItem('tts-autoplay-active', 'false');
    }
    const i = tabs.findIndex(t => t.id === activeTab);
    if (i < tabs.length - 1) { setActiveTab(tabs[i + 1].id as any); } else if (onNextLesson) onNextLesson();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrev = (isAuto: boolean = false) => {
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
      const introTitle = "Sketch";
      const introDesc = "Tools use to create lines, circles and arcs in the 3D space for creating section forms for modeling.";
      registerText([introTitle, introDesc, ...sketchSteps], 0);
    } else {
      const introTitle = "Extrude and Revolve";
      const introDesc = "Tools use to create solids from sketch in the 3D space.";
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
                text="Sketch"
                isActive={isSpeaking && currentIndex === 0}
                currentCharIndex={currentCharIndex}
              />
              
            </h3>
            <KaraokeLessonText
              className={`lesson-subtitle ${currentIndex === 1 ? "reading-active" : ""}`}
              data-reading-index="1"
              text="Tools use to create lines, circles and arcs in the 3D space for creating section forms for modeling."
              isActive={isSpeaking && currentIndex === 1}
              currentCharIndex={currentCharIndex}
            />
            <img src={sketchIntroImg} alt="Sketch Intro" className="software-screenshot screenshot-small mt-8" style={{ width: '280px' }} />
          </>
        ) : (
          <>
            <h3 className={`section-title ${currentIndex === 0 ? "reading-active" : ""}`} data-reading-index="0">
              <KaraokeLessonText
                as="span"
                text="Extrude and Revolve"
                isActive={isSpeaking && currentIndex === 0}
                currentCharIndex={currentCharIndex}
              />
              
            </h3>
            <KaraokeLessonText
              className={`lesson-subtitle ${currentIndex === 1 ? "reading-active" : ""}`}
              data-reading-index="1"
              text="Tools use to create solids from sketch in the 3D space"
              isActive={isSpeaking && currentIndex === 1}
              currentCharIndex={currentCharIndex}
            />
            <img src={extrudeRevolveMenu} alt="Extrude and Revolve Intro" className="software-screenshot screenshot-small mt-8" style={{ width: '280px' }} />
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
                  text="SKETCH"
                  isActive={isSpeaking && currentIndex === 2}
                  currentCharIndex={currentCharIndex}
                />
              </h4>
            </div>
            <KaraokeLessonText
              className={`p-flush ${currentIndex === 3 ? 'reading-active' : ''}`}
              data-reading-index="3"
              style={{ marginTop: "-2rem" }}
              text="Tool used to create lines"
              isActive={isSpeaking && currentIndex === 3}
              currentCharIndex={currentCharIndex}
            />

            <div className="step-description">
              <div className="flex-row-center--wrap" style={{ gap: '2rem' }}>
                <img src={sketchIcon} alt="Sketch Tool" className="software-screenshot screenshot-small" style={{ width: '280px' }} />
              </div>
            </div>

            <div className="step-description" style={{ marginTop: "3rem" }}>
              <img src={sketchResultImg} alt="Sketch Result" className="software-screenshot mt-4" style={{ width: "600px" }} />
            </div>

            <div className="lesson-navigation">
              <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button>
              <button className="nav-button next" onClick={handleNext}>Next <ChevronRight size={18} /></button>
            </div>
          </div>
        )}

        {activeTab === 'extrude' && (
          <div className={`lesson-card tab-content fade-in ${isSpeaking ? 'reading-active' : ''}`}>
            <div className="card-header mt-12">
              <h4 className={`${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
                <KaraokeLessonText
                  as="span"
                  text="EXTRUDE"
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
                  text="Select Extrude from the icon menu"
                  isActive={isSpeaking && currentIndex === 3}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description" style={{ marginTop: "1rem" }}>
                <div className="mt-6" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                  <div>
                    <img src={extrudeOneSide} alt="Extrusion One Side" className="software-screenshot screenshot-small" style={{ width: '100%', marginBottom: "1rem" }} />
                    <div className="text-center font-bold text-lg mt-4" style={{ marginLeft: "-8rem" }}>EXTRUSION (ONE SIDE)</div>
                  </div>
                  <div>
                    <img src={extrudeBothSide} alt="Extrude Both Side" className="software-screenshot screenshot-small" style={{ width: '100%', marginBottom: "1rem" }} />
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
                    text="Select the perimeter of the sketch to be extruded > GO"
                    isActive={isSpeaking && currentIndex === 4}
                    currentCharIndex={currentCharIndex}
                  />
                  <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '40px', margin: '0 8px' }} />
                  <br />
                  <KaraokeLessonText
                    as="span"
                    text="A hatch will appear indicating the specified area to be extruded."
                    isActive={isSpeaking && currentIndex === 4}
                    currentCharIndex={currentCharIndex - 55}
                  />
                </div>
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 5 ? 'reading-active' : ''}`} data-reading-index="5" style={{ marginBottom: "-2rem" }}>
              <div className="step-header">
                <span className="step-number">3 </span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text="Specify the height of extrusion. Can also be set on the item entry"
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
                  text="Press ENTER"
                  isActive={isSpeaking && currentIndex === 6}
                  currentCharIndex={currentCharIndex}
                />
              </div>


              <div className={`instruction-step ${currentIndex === 6 ? 'reading-active' : ''}`} data-reading-index="6">
                <div className="card-header"><h4>PROCESS OVERVIEW</h4></div>
                <div className="flex-row-wrap mt-8" style={{ gap: '2rem' }}>
                  <img src={extrudeOneSide} alt="Extrude Process Overview" className="software-screenshot" style={{ width: "900px", marginTop: "2rem" }} />
                </div>
              </div>
            </div>

            <div className="lesson-navigation">
              <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button>
              <button className="nav-button next" onClick={handleNext}>Next <ChevronRight size={18} /></button>
            </div>
          </div>


        )}

        {activeTab === 'revolve' && (
          <div className={`lesson-card tab-content fade-in ${isSpeaking ? 'reading-active' : ''}`}>
            <div className="card-header mt-12">
              <h4 className={`${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
                <KaraokeLessonText
                  as="span"
                  text="REVOLVE"
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
                  text="Select Revolve from the icon menu"
                  isActive={isSpeaking && currentIndex === 3}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <img src={revolveIcon} alt="Revolve Icon" className="software-screenshot mt-4" style={{ width: '280px', marginBottom: "1rem" }} />
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 4 ? 'reading-active' : ''}`} data-reading-index="4" style={{ marginBottom: "-2rem" }}>
              <div className="step-header" style={{ marginBottom: "2rem" }}>
                <span className="step-number">2 </span>
                <div className="step-label" style={{ marginTop: "-1.5rem" }}>
                  <KaraokeLessonText
                    as="span"
                    text="Select the perimeter of the sketch to be revolved > GO"
                    isActive={isSpeaking && currentIndex === 4}
                    currentCharIndex={currentCharIndex}
                  />
                  <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '40px', margin: '0 8px' }} />
                </div>
              </div>


              <div className={`step-header ${currentIndex === 5 ? 'reading-active' : ''}`} data-reading-index="5">
                <span className="step-number">3 </span>
                <div className="step-label" style={{ marginTop: "0.5rem" }}>
                  <KaraokeLessonText
                    as="span"
                    text="Select the axis of rotation (pick points or edge) > GO"
                    isActive={isSpeaking && currentIndex === 5}
                    currentCharIndex={currentCharIndex}
                  />
                  <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '40px', margin: '0 8px' }} />
                  <br />
                  <KaraokeLessonText
                    as="span"
                    text="A hatch will appear indicating the specified area to be revolved."
                    isActive={isSpeaking && currentIndex === 5}
                    currentCharIndex={currentCharIndex - 55}
                  />
                </div>
              </div>


              <div className={`instruction-step ${currentIndex === 5 ? 'reading-active' : ''}`} data-reading-index="5">
                <div className="card-header"><h4>PROCESS OVERVIEW</h4></div>
                <div className="flex-row-wrap mt-8" style={{ gap: '2rem' }}>
                  <img src={revolveP2} alt="Revolve Result" className="software-screenshot" style={{ "width": "900px" }} />
                </div>
              </div>
            </div>


            <div className="lesson-navigation">
              <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button>
              <button className="nav-button next" onClick={handleNext}>{nextLabel || 'Next'} <ChevronRight size={18} /></button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/* ── Basic Operation (4): Show/Hide / Stretch / Resize ── */


const BasicOperation4: React.FC<SubLessonProps> = ({ subLessonId, onNextLesson, onPrevLesson, nextLabel }) => {
  const [activeTab, setActiveTab] = useState<'showHide' | 'stretch' | 'resize'>(() => {
    return (localStorage.getItem(`${subLessonId}-tab`) as any) || 'showHide';
  });
  const { scrollProgress, containerRef, speak, stop, isSpeaking, currentIndex, currentCharIndex, registerText } = useLessonCore(subLessonId);

  useEffect(() => {
    localStorage.setItem(`${subLessonId}-tab`, activeTab);
  }, [subLessonId, activeTab]);

  const showHideSteps = [
    "SHOW / HIDE ENTITY",
    "Step 1: Select Show/Hide from the icon menu.",
    "Step 2: Select the entities for showing/hiding then GO",
    "SHOW/HIDE DRAFTING ENTITY",
    "Step 1: Select Show/Hide Drafting Entity from the icon menu.",
    "Step 2: Right-click to show/hide all drafting entities.",
    "Drafting Entities include: Dimensions, Notes and Symbols.",
    "HIDE UNSELECTED ENTITY",
    "Step 1: Select Hide Unselected Entity from the icon menu.",
    "Step 2: Select all entities to be retain then GO",
    "All unselected entities will be hidden."
  ];

  const stretchSteps = [
    "STRETCH / SHAPE / CUT",
    "Step 1: Select Stretch from the icon menu.",
    "Step 2: Select the face to be stretch then GO",
    "Step 3: Specify the desired length of the solid entity on the item entry.",
    "Also works for circular surfaces.",
    "OR",
    "Select face then GO then Left-click on the 3D Space",
    "A linear scale will appear on the 3D Space",
    "Specify the additional length of stretch then Press Enter or Left-Click on the scale."
  ];

  const resizeSteps = [
    "RESIZE",
    "Step 1: Select Resize from the icon menu.",
    "Step 2: Select the entity for resizing then GO.",
    "Step 3: Using resize allows the user to scale up or scale down the size of the solid entity. Specify the scale on the item entry > Left-click on the 3D Space."
  ];

  const tabs = [
    { id: 'showHide', label: 'Show/Hide' },
    { id: 'stretch', label: 'Stretch' },
    { id: 'resize', label: 'Resize' }];

  const handleNext = (isAuto: boolean = false) => {
    stop();
    if (!isAuto) {
      sessionStorage.setItem('tts-autoplay-active', 'false');
    }
    const i = tabs.findIndex(t => t.id === activeTab);
    if (i < tabs.length - 1) { setActiveTab(tabs[i + 1].id as any); } else if (onNextLesson) onNextLesson();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrev = (isAuto: boolean = false) => {
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
    const introTitle = activeTab === 'showHide' ? "Show / Hide"
      : activeTab === 'stretch' ? "Stretch / Shape / Cut"
      : "Resize";
    const introDesc = activeTab === 'showHide'
      ? "Tools use to switch between displaying and hiding entities."
      : activeTab === 'stretch'
      ? "Tools used to modify the length and form of solid entities."
      : "Tool used to scale up or scale down a solid entity.";
    const steps = activeTab === 'showHide' ? showHideSteps
      : activeTab === 'stretch' ? stretchSteps
      : resizeSteps;
    registerText([introTitle, introDesc, ...steps], 0);
  }, [activeTab, registerText]);

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
              text="Show / Hide"
              isActive={isSpeaking && currentIndex === 0}
              currentCharIndex={currentCharIndex}
            />
            
          </h3>
          <KaraokeLessonText
            className={`lesson-subtitle ${currentIndex === 1 ? "reading-active" : ""}`}
            data-reading-index="1"
            text="Tools use to switch between displaying and hiding entities."
            isActive={isSpeaking && currentIndex === 1}
            currentCharIndex={currentCharIndex}
          />
          <img src={showHideMenu} alt="Show/Hide Intro" className="software-screenshot screenshot-small mt-8" style={{ width: '192px' }} />
        </section>
      )}

      {activeTab === 'stretch' && (
        <section className="lesson-intro">
          <h3 className={`section-title ${currentIndex === 0 ? "reading-active" : ""}`} data-reading-index="0">
            <KaraokeLessonText
              as="span"
              text="Stretch / Shape / Cut"
              isActive={isSpeaking && currentIndex === 0}
              currentCharIndex={currentCharIndex}
            />
            
          </h3>
          <KaraokeLessonText
            className={`lesson-subtitle ${currentIndex === 1 ? "reading-active" : ""}`}
            data-reading-index="1"
            text="Tools used to modify the length and form of solid entities."
            isActive={isSpeaking && currentIndex === 1}
            currentCharIndex={currentCharIndex}
          />
          <img src={fairingChamferImg} alt="Stretch and Shape Intro" className="software-screenshot screenshot-small mt-8" style={{ width: '192px' }} />
        </section>
      )}





      <div className="lesson-grid single-card">
        {activeTab === 'showHide' && (
          <div className="lesson-card tab-content fade-in">
            <div className="card-header">
              <h4 className={`${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
                <KaraokeLessonText
                  as="span"
                  text="SHOW / HIDE ENTITY"
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
                  text="Select Show/Hide from the icon menu"
                  isActive={isSpeaking && currentIndex === 3}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <img src={showHideEntity} alt="Show/Hide Entity Icon" className="software-screenshot screenshot-small" style={{ width: '280px', marginBottom: "-3rem" }} />
              </div>
            </div>


            <div className={`instruction-step ${currentIndex === 4 ? 'reading-active' : ''}`} data-reading-index="4">
              <div className="step-header">
                <span className="step-number">2 </span>
                <div className="step-label" style={{ marginTop: "-1.5rem" }}>
                  <KaraokeLessonText
                    as="span"
                    text="Select the entities for showing/hiding > GO"
                    isActive={isSpeaking && currentIndex === 4}
                    currentCharIndex={currentCharIndex}
                  />
                  <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '40px', margin: '0 8px' }} />
                </div>
              </div>
            </div>

            <div className="card-header mt-12">
              <h4 className={`${currentIndex === 5 ? 'reading-active' : ''}`} data-reading-index="5">
                <KaraokeLessonText
                  as="span"
                  text="SHOW/HIDE DRAFTING ENTITY"
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
                  text="Select Show/Hide Drafting Entity from the icon menu"
                  isActive={isSpeaking && currentIndex === 6}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <img src={showHideDraftingEntity} alt="Show/Hide Drafting Entity Icon" className="software-screenshot screenshot-small" style={{ width: '280px', marginBottom: "-3rem" }} />
              </div>
            </div>


            <div className={`instruction-step ${currentIndex === 7 ? 'reading-active' : ''}`} data-reading-index="7">
              <div className="step-header">
                <span className="step-number">2 </span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text="Right-click to show/hide all drafting entities"
                  isActive={isSpeaking && currentIndex === 7}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <p className={`p-flush ${currentIndex === 8 ? "reading-active" : ""}`} data-reading-index="8" style={{ marginTop: "-1rem" }}>Drafting Entities include:</p>
              <div className="lesson-table-container" style={{ marginTop: "2rem", maxWidth: "900px" }}>
                <table className="lesson-table">
                  <thead>
                    <tr>
                      <th>DIMENSIONS</th>
                      <th>NOTES</th>
                      <th>SYMBOLS</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Linear/Circular/Angular</td>
                      <td>Text</td>
                      <td>Arrow/Arrow View</td>
                    </tr>
                    <tr>
                      <td>Chamfer/Fillet</td>
                      <td>Part Notes</td>
                      <td>Cutting Lines</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>Welding</td>
                      <td>Machining/Finishing</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>Balloon</td>
                      <td>Hatch</td>
                    </tr>
                  </tbody>
                </table>
              </div>

            </div>


            <div className="card-header mt-12">
              <h4 className={`${currentIndex === 9 ? 'reading-active' : ''}`} data-reading-index="9">
                <KaraokeLessonText
                  as="span"
                  text="HIDE UNSELECTED ENTITY"
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
                  text="Select Hide Unselected Entity from the icon menu"
                  isActive={isSpeaking && currentIndex === 10}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <img src={hideUnselectedEntity} alt="Hide Unselected Entity Icon" className="software-screenshot screenshot-small" style={{ width: '280px', marginBottom: "-3rem" }} />
              </div>
            </div>


            <div className={`instruction-step ${currentIndex === 11 ? 'reading-active' : ''}`} data-reading-index="11">
              <div className="step-header">
                <span className="step-number">2 </span>
                <div className="step-label" style={{ marginTop: "-1.5rem" }}>
                  <KaraokeLessonText
                    as="span"
                    text="Select all entities to be retain > GO"
                    isActive={isSpeaking && currentIndex === 11}
                    currentCharIndex={currentCharIndex}
                  />
                  <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '40px', margin: '0 8px' }} />
                </div>
              </div>
              <div className="step-description">
                <p className={`p-flush ${currentIndex === 12 ? "reading-active" : ""}`} data-reading-index="12" style={{ marginTop: "-1rem" }}>All unselected entities will be hidden.</p>
                <img src={hideUnselectedEntity1} alt="Hide Unselected Entity Example" className="software-screenshot" style={{ width: '900px' }} />
              </div>
            </div>

            <div className="lesson-navigation">
              <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button>
              <button className="nav-button next" onClick={handleNext}>Next <ChevronRight size={18} /></button>
            </div>
          </div>
        )}

        {activeTab === 'stretch' && (
          <div className="lesson-card tab-content fade-in">
            <div className="card-header">
              <h4 className={`${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
                <KaraokeLessonText
                  as="span"
                  text="STRETCH / SHAPE / CUT"
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
                  text="Select Stretch from the icon menu"
                  isActive={isSpeaking && currentIndex === 3}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <img src={stretchIcon} alt="Stretch Icon" className="software-screenshot screenshot-small" style={{ width: '280px', marginBottom: "-3rem" }} />
              </div>
            </div>


            <div className={`instruction-step ${currentIndex === 4 ? 'reading-active' : ''}`} data-reading-index="4">
              <div className="step-header">
                <span className="step-number">2 </span>
                <div className="step-label" style={{ marginTop: "-1.5rem" }}>
                  <KaraokeLessonText
                    as="span"
                    text="Select the face to be stretch &gt; GO"
                    isActive={isSpeaking && currentIndex === 4}
                    currentCharIndex={currentCharIndex}
                  />
                  <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '40px', margin: '0 8px' }} />
                </div>
              </div>
            </div>


            <div className={`instruction-step ${currentIndex === 5 ? 'reading-active' : ''}`} data-reading-index="5" style={{ marginTop: "-2rem" }}>
              <div className="step-header">
                <span className="step-number">3 </span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text="Specify the desired length of the solid entity on the item entry"
                  isActive={isSpeaking && currentIndex === 5}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <p className={`p-flush opacity-80 text-sm mb-4 ${currentIndex === 6 ? "reading-active" : ""}`} data-reading-index="6" style={{ marginBottom: "2rem", marginTop: "-1rem" }}> Also works for circular surfaces.</p>
                <img src={stretchItemEntry} alt="Stretch Item Entry" className="software-screenshot" style={{ width: '850px', height: 'auto' }} />
                <img src={stretchImg1} alt="Stretch Drag Example" className="software-screenshot screenshot-large mt-8" style={{ width: '900px', marginTop: "2rem" }} />
              </div>
            </div>


            <div>
              <h4 className={`text-highlight mb-4 ${currentIndex === 7 ? "reading-active" : ""}`} data-reading-index="7">
                <KaraokeLessonText
                  as="span"
                  text="OR"
                  isActive={isSpeaking && currentIndex === 7}
                  currentCharIndex={currentCharIndex}
                />
              </h4>
              <div className={`instruction-step ${currentIndex === 8 ? 'reading-active' : ''}`} data-reading-index="8">
                <div className="step-header">
                  <div className="step-label">
                    <KaraokeLessonText
                      as="span"
                      text="Select face >  GO"
                      isActive={isSpeaking && currentIndex === 8}
                      currentCharIndex={currentCharIndex}
                    />
                    <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '40px', margin: '0 8px' }} />
                    <KaraokeLessonText
                      as="span"
                      text=" > Left-click on the 3D Space"
                      isActive={isSpeaking && currentIndex === 8}
                      currentCharIndex={currentCharIndex - 17}
                    />
                  </div>
                </div>
                <div className="step-description">
                  <p className={`p-flush mt-4 ${currentIndex === 9 ? "reading-active" : ""}`} data-reading-index="9" style={{ marginTop: "-1rem" }}>
                    <KaraokeLessonText
                      as="span"
                      text="A linear scale will appear on the 3D Space"
                      isActive={isSpeaking && currentIndex === 9}
                      currentCharIndex={currentCharIndex}
                    />
                  </p>
                  <p className={`p-flush mt-4 ${currentIndex === 10 ? "reading-active" : ""}`} data-reading-index="10" style={{ marginBottom: "2rem" }}>
                    <KaraokeLessonText
                      as="span"
                      text="Specify the additional length of stretch > Press Enter or Left-Click on the scale."
                      isActive={isSpeaking && currentIndex === 10}
                      currentCharIndex={currentCharIndex}
                    />
                  </p>
                  <img src={stretchImg2} alt="Stretch Scale Example" className="software-screenshot screenshot-large mt-6" style={{ width: '900px' }} />
                </div>
              </div>
            </div>

            <div className="lesson-navigation">
              <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button>
              <button className="nav-button next" onClick={handleNext}>Next <ChevronRight size={18} /></button>
            </div>
          </div>
        )}

        {activeTab === 'resize' && (
          <div className="lesson-card tab-content fade-in">
            <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h4 className={`${currentIndex === 0 ? 'reading-active' : ''}`} data-reading-index="0">
                <KaraokeLessonText
                  as="span"
                  text="RESIZE"
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
                  text="Select Resize from the icon menu"
                  isActive={isSpeaking && currentIndex === 1}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <img src={resizeIcon} alt="Resize Icon" className="software-screenshot screenshot-small" style={{ width: '280px', marginBottom: "-4rem" }} />
              </div>
            </div>


            <div className={`instruction-step ${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
              <div className="step-header">
                <span className="step-number">2 </span>
                <div className="step-label" style={{ marginBottom: "1.5rem" }}>
                  <KaraokeLessonText
                    as="span"
                    text="Select the entity for resizing > GO"
                    isActive={isSpeaking && currentIndex === 2}
                    currentCharIndex={currentCharIndex}
                  />
                  <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '40px', margin: '0 8px' }} />
                </div>
              </div>
            </div>


            <div className={`instruction-step ${currentIndex === 3 ? 'reading-active' : ''}`} data-reading-index="3" style={{ marginTop: "-4rem" }}>
              <div className="step-header">
                <span className="step-number">3 </span>
                <div className="step-label" style={{ marginTop: "1.5rem" }}>
                  <KaraokeLessonText
                    as="span"
                    text="Using resize allows the user to scale up or scale down the size of the solid entity. Specify the scale on the item entry > Left-click on the 3D Space"
                    isActive={isSpeaking && currentIndex === 3}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
              </div>
              <div className="step-description">
                <div className="flex-row-center--wrap mt-6" style={{ gap: '2rem' }}>
                  <img src={resizeItemEntry} alt="Resize Item Entry" className="software-screenshot" style={{ width: '200px', height: 'auto' }} />
                  <img src={resize3_2} alt="Resize Scale Result" className="software-screenshot screenshot-large mt-8" style={{ width: '900px', marginTop: "2rem" }} />
                </div>
              </div>
            </div>

            <div className="lesson-navigation">
              <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button>
              <button className="nav-button next" onClick={handleNext}>Next Lesson <ChevronRight size={18} /></button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}; /* ── Basic Operation (5): Shape Steels ── */

const BasicOperation5: React.FC<SubLessonProps> = ({ subLessonId, onNextLesson, onPrevLesson, nextLabel }) => {
  const [activeTab, setActiveTab] = useState<'shapeSteels'>(() => {
    return (localStorage.getItem(`${subLessonId}-tab`) as any) || 'shapeSteels';
  });
  // Note: speak and stop are not used in this component's single-tab layout.
  const { scrollProgress, containerRef, isSpeaking, currentIndex, currentCharIndex, registerText } = useLessonCore(subLessonId);

  useEffect(() => {
    localStorage.setItem(`${subLessonId}-tab`, activeTab);
  }, [subLessonId, activeTab]);

  const shapeSteelsSteps = [
    "Shape Steels Includes: C-CHANNEL, H-BEAM, I-BEAM, EQUAL ANGLE BAR, UNEQUAL ANGLE BAR, UNEQUAL SIDED ANGLE BAR",
    "Step 1: Select Arrange Machine Part from the icon menu.",
    "Step 2: The Arrange Machine Part window will appear. Select and provide the necessary specifications tehn Press OK",
    "Step 3: In the Key Entry Area, enter the coordinates for the position (origin point)"
  ];

  const tabs = [{ id: 'shapeSteels', label: 'Shape Steels' }];

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
            text="Creating Shape Steels"
            isActive={isSpeaking && currentIndex === 0}
            currentCharIndex={currentCharIndex}
          />
          
        </h3>
        <KaraokeLessonText
          className={`lesson-subtitle ${currentIndex === 1 ? "reading-active" : ""}`}
          data-reading-index="1"
          text="Learn how to arrange machine parts and steel profiles in 3D space."
          isActive={isSpeaking && currentIndex === 1}
          currentCharIndex={currentCharIndex}
        />
        <img src={shapeSteels1} alt="Shape Steels Overview" className="software-screenshot" style={{ height: 'auto', width: "400px" }} />
      </section>

      <div className="lesson-grid single-card">
        {activeTab === 'shapeSteels' && (
          <div className="lesson-card tab-content fade-in">
            <div className="card-header">
              <h4 className={`${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
                <KaraokeLessonText
                  as="span"
                  text="Shape Steels Includes:"
                  isActive={isSpeaking && currentIndex === 2}
                  currentCharIndex={currentCharIndex}
                />
              </h4>
            </div>

            <div className={`instruction-step ${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
              <div className="step-description">
                <img src={shapeSteelsTypes} alt="Shape Steels Options" className="software-screenshot" style={{ width: '900px' }} />
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 3 ? 'reading-active' : ''}`} data-reading-index="3">
              <div className="step-header">
                <span className="step-number">1 </span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text="Select the Arrange Machine Part from the icon menu"
                  isActive={isSpeaking && currentIndex === 3}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <img src={arrangeMachinePartMenu} alt="Arrange Machine Part Menu" className="software-screenshot screenshot-small" style={{ width: '14rem' }} />
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 4 ? 'reading-active' : ''}`} data-reading-index="4">
              <div className="step-header">
                <span className="step-number">2 </span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text="The Arrange Machine Part window will appear. Select and provide the necessary specifications &gt; Press OK"
                  isActive={isSpeaking && currentIndex === 4}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <img src={arrangeMachinePartWindow} alt="Arrange Machine Part Window" className="software-screenshot" style={{ width: '900px', height: 'auto' }} />
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 5 ? 'reading-active' : ''}`} data-reading-index="5">
              <div className="step-header">
                <span className="step-number">3 </span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text="In the Key Entry Area, enter the coordinates for the position (origin point)"
                  isActive={isSpeaking && currentIndex === 5}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <img src={keyEntryArea} alt="Key Entry Area" className="software-screenshot" style={{ height: 'auto', width: "200px", marginBottom: "2rem" }} />
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 6 ? 'reading-active' : ''}`} data-reading-index="6">
              <div className="card-header">
                <h4 className={`${currentIndex === 6 ? 'reading-active' : ''}`} data-reading-index="6">
                  <KaraokeLessonText
                    as="span"
                    text="RESULT"
                    isActive={isSpeaking && currentIndex === 6}
                    currentCharIndex={currentCharIndex}
                  />
                </h4>
              </div>
              <div className="flex-row-wrap mt-8" style={{ gap: '2rem' }}>
                <img src={shapeSteels2} alt="Shape Steels Result" className="software-screenshot screenshot-large" style={{ width: '900px', height: 'auto' }} />
              </div>
            </div>

            <div className="lesson-navigation">
              <button className="nav-button" onClick={onPrevLesson}><ChevronLeft size={18} /> Previous</button>
              <button className="nav-button next" onClick={onNextLesson}>{nextLabel || 'Next Lesson'} <ChevronRight size={18} /></button>
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

