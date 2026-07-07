import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLessonCore } from '../../../hooks/useLessonCore';
import { KaraokeLessonText } from '../../KaraokeLessonText';
import VideoTutorialViewer from '../VideoTutorialViewer';
import {
  cylinderTutorialSteps,
  boxTutorialSteps,
  polygonTutorialSteps,
  coneTutorialSteps,
  torusTutorialSteps
} from '../VideoTutorialData/basicOp1TutorialSteps';

import threeDView from '../../../assets/3D_Image_File/basic_operation1_3d_view.png';
import cmdMenu from '../../../assets/3D_Image_File/basic_operation1_command_menu.png';

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
  const { scrollProgress, containerRef, stop, isSpeaking, currentIndex, currentCharIndex, registerText } = useLessonCore(subLessonId);

  useEffect(() => {
    localStorage.setItem(`${subLessonId}-tab`, activeTab);
  }, [subLessonId, activeTab]);

  const videoSectionRef = useRef<HTMLDivElement>(null);
  const beforeYouStartRef = useRef<HTMLDivElement>(null);

  const lessonSteps = React.useMemo(() => [
    "Creating Basic Shapes",
    "In iCAD, there are many solid shapes available, but in this lesson we will cover five of the most commonly used ones: the Cylinder, the Box, the Polygon, the Cone, and the Torus.",
    "A Cylinder is a circular solid defined by its Diameter and Height — ideal for shafts, pins, bosses, and round posts.",
    "A Box is a rectangular solid defined by Depth, Width, and Height. It forms the foundation of structural parts such as plates, brackets, and housings.",
    "A Polygon is a prismatic solid with a regular polygonal cross-section. You define it by the Number of Sides, the circumscribed Path Diameter, and the Height — useful for hexagonal bolts and multi-sided columns.",
    "A Cone is a tapered solid defined by the Number of Sides, Base Diameter, Top Face Diameter, and Height. Setting the top face diameter to zero creates a pointed cone.",
    "A Torus is a donut-shaped solid defined by the Section Diameter, Path Radius, and Turn Angle. It is used for O-rings, gaskets, and curved pipe sections.",
    "Before creating any shape, always start with the Front View. This ensures your model is correctly oriented from the beginning.",
    "On the command menu, go to Arrange Solid and select Y Orientation to align the shape correctly along the Y axis.",
    "Now that you know the available shapes and the setup steps, watch the video tutorial to see a step-by-step demonstration of how each shape is created in iCAD."
  ], []);

  useEffect(() => {
    if (!isSpeaking) return;
    if (currentIndex === 2) setActiveTab('cylinder');
    else if (currentIndex === 3) setActiveTab('box');
    else if (currentIndex === 4) setActiveTab('polygon');
    else if (currentIndex === 5) setActiveTab('cone');
    else if (currentIndex === 6) setActiveTab('torus');
    else if (currentIndex === 7) {
      setActiveTab('cylinder');
      setTimeout(() => {
        beforeYouStartRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 600);
    } else if (currentIndex === 9) {
      setTimeout(() => {
        videoSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 600);
    }
  }, [currentIndex, isSpeaking]);

  useEffect(() => {
    registerText(lessonSteps, 0);
  }, [registerText, lessonSteps]);

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

        <div className={`instruction-step ${currentIndex === 1 ? 'reading-active' : ''}`} data-reading-index="1" style={{ marginTop: '0.5rem' }}>
          <KaraokeLessonText
            text="In iCAD, there are many solid shapes available, but in this lesson we will cover five of the most commonly used ones: the Cylinder, the Box, the Polygon, the Cone, and the Torus."
            isActive={isSpeaking && currentIndex === 1}
            currentCharIndex={currentCharIndex}
          />
        </div>

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
              <button className="nav-button" onClick={() => handlePrev()}><ChevronLeft size={18} /> Previous</button>
              <button className="nav-button next" onClick={() => handleNext()}>Next<ChevronRight size={18} /></button>
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
              <button className="nav-button" onClick={() => handlePrev()}><ChevronLeft size={18} /> Previous</button>
              <button className="nav-button next" onClick={() => handleNext()}>Next<ChevronRight size={18} /></button>
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
              <button className="nav-button" onClick={() => handlePrev()}><ChevronLeft size={18} /> Previous</button>
              <button className="nav-button next" onClick={() => handleNext()}>Next <ChevronRight size={18} /></button>
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
              <button className="nav-button" onClick={() => handlePrev()}><ChevronLeft size={18} /> Previous</button>
              <button className="nav-button next" onClick={() => handleNext()}>Next <ChevronRight size={18} /></button>
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
              <button className="nav-button" onClick={() => handlePrev()}><ChevronLeft size={18} /> Previous</button>
              <button className="nav-button next" onClick={() => handleNext()}>Next Lesson <ChevronRight size={18} /></button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BasicOperation1;
export type { SubLessonProps };
