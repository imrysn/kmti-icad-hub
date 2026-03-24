/**
 * 3D_Origin.tsx  —  Origin lesson
 */
import React, { useState, useEffect, useRef } from 'react';
import { MousePointer2, Info, ChevronLeft, ChevronRight, Compass, CheckCircle2, Zap } from 'lucide-react';
import '../../styles/3D_Modeling/CourseLesson.css';

// Asset Imports
import originOverview from '../../assets/3D_Image_File/origin.png';
import toolSelection from '../../assets/3D_Image_File/origin_change_3d_part_layout.png';
import interactionSteps from '../../assets/3D_Image_File/origin_change_3d_part_layout_2345.png';

interface OriginLessonProps {
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const OriginLesson: React.FC<OriginLessonProps> = ({ onNextLesson, onPrevLesson }) => {
  const [activeTab, setActiveTab] = useState<'projections' | 'layout'>('projections');
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const element = containerRef.current;
      const totalHeight = element.scrollHeight - element.clientHeight;
      if (totalHeight === 0) {
        setScrollProgress(100);
        return;
      }
      const progress = (element.scrollTop / totalHeight) * 100;
      setScrollProgress(progress);
    };

    const currentContainer = containerRef.current;
    if (currentContainer) {
      currentContainer.addEventListener('scroll', handleScroll);
      handleScroll();
    }

    return () => {
      if (currentContainer) {
        currentContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, [activeTab]);

  const toggleStep = (stepId: string) => {
    setCompletedSteps(prev => {
      const next = new Set(prev);
      if (next.has(stepId)) next.delete(stepId);
      else next.add(stepId);
      return next;
    });
  };

  const getStepClass = (stepId: string) => {
    return `instruction-step interactive ${completedSteps.has(stepId) ? 'completed' : ''}`;
  };

  const tabs = [
    { id: 'projections', label: 'Standard Projections' },
    { id: 'layout', label: 'Change 3D Part Layout' }
  ];
  const handleNext = () => {
    if (activeTab === 'projections') setActiveTab('layout');
    else if (onNextLesson) onNextLesson();
  };
  const handlePrev = () => {
    if (activeTab === 'layout') setActiveTab('projections');
    else if (onPrevLesson) onPrevLesson();
  };

  return (
    <div className="course-lesson-container" ref={containerRef}>
      {/* Sticky Progress Bar */}
      <div className="lesson-progress-container">
        <div
          className="lesson-progress-bar"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <section className="lesson-intro">
        <h3 className="section-title">
          <Compass size={28} className="lesson-intro-icon" />
          ORIGIN
        </h3>
        <p className="p-flush">A point where the coordinates of the X, Y and Z-axis are (0, 0, 0). It also sets the layout/orientation of views of an object/entity. Origin location is a case-by-case basis. It depends on  the shape/structure of the part.</p>
        <div className="info-box" style={{ marginTop: '1rem' }}>
          <p className="p-flush">※ The origin must be in the same position in 3D and 2D.</p>
        </div>
      </section>

      <div className="lesson-grid single-card">
        <div className="lesson-card tab-content">
          <div className="lesson-tabs">
            {tabs.map(tab => (
              <button key={tab.id} className={`tab-button ${activeTab === tab.id ? 'active' : ''}`} onClick={() => setActiveTab(tab.id as any)}>{tab.label}</button>
            ))}
          </div>

          <div className="tab-content-area">
            {activeTab === 'projections' && (
              <div className="tab-pane">
                <div className="card-header"><h4>Standard Projections</h4></div>
                <div className="image-wrapper-flush image-zoom-container" style={{ marginTop: '1rem' }}>
                  <img src={originOverview} alt="Origin Overview and Views" className="software-screenshot screenshot-large" />
                </div>

              </div>
            )}
            {activeTab === 'layout' && (
              <div className="tab-pane">
                <div className="card-header"><h4>Change 3D Part Layout</h4></div>
                <p className="p-flush" style={{ marginBottom: '1rem' }}>Use this tool to set the location of origin.</p>

                <div className={getStepClass('o-1')} onClick={() => toggleStep('o-1')}>
                  <div className="step-header">
                    <span className={`step-number ${completedSteps.has('o-1') ? 'completed' : ''}`}>
                      {completedSteps.has('o-1') ? <CheckCircle2 size={16} /> : '1'}
                    </span>
                    <span className="step-label">Select <strong className="text-highlight">Change 3D Part Layout</strong> from the icon menu.</span>
                  </div>
                  <div className="step-description" style={{ paddingLeft: '2.5rem' }}>
                    <div className="image-wrapper-flush image-zoom-container" style={{ marginTop: '0.8rem' }}>
                      <img src={toolSelection} alt="Tool Selection" className="software-screenshot screenshot-medium" />
                    </div>
                  </div>
                </div>

                <div className={getStepClass('o-2')} onClick={() => toggleStep('o-2')}>
                  <div className="step-header">
                    <span className={`step-number ${completedSteps.has('o-2') ? 'completed' : ''}`}>
                      {completedSteps.has('o-2') ? <CheckCircle2 size={16} /> : '2'}
                    </span>
                    <span className="step-label">Right-click to show the current location of the origin.</span>
                  </div>
                </div>

                <div className={getStepClass('o-3')} onClick={() => toggleStep('o-3')}>
                  <div className="step-header">
                    <span className={`step-number ${completedSteps.has('o-3') ? 'completed' : ''}`}>
                      {completedSteps.has('o-3') ? <CheckCircle2 size={16} /> : '3'}
                    </span>
                    <span className="step-label">Left-click on the point of the desired new location of origin.</span>
                  </div>
                </div>

                <div className={getStepClass('o-4')} onClick={() => toggleStep('o-4')}>
                  <div className="step-header">
                    <span className={`step-number ${completedSteps.has('o-4') ? 'completed' : ''}`}>
                      {completedSteps.has('o-4') ? <CheckCircle2 size={16} /> : '4'}
                    </span>
                    <span className="step-label">Left-click on a 2nd point to set the X-axis.</span>
                  </div>
                </div>

                <div className={getStepClass('o-5')} onClick={() => toggleStep('o-5')}>
                  <div className="step-header">
                    <span className={`step-number ${completedSteps.has('o-5') ? 'completed' : ''}`}>
                      {completedSteps.has('o-5') ? <CheckCircle2 size={16} /> : '5'}
                    </span>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span className="step-label" style={{ marginTop: '0.25rem' }}>Left-click on a 3rd point to set the Y-axis.</span>
                      <p className="p-flush-small" style={{ marginTop: '0.5rem', color: 'var(--text-muted)' }}>The XY-plane will be the front view.</p>
                    </div>
                  </div>
                  <div className="step-description" style={{ paddingLeft: '2.5rem' }}>
                    <div className="image-wrapper-flush image-zoom-container" style={{ marginTop: '0.5rem' }}>
                      <img src={interactionSteps} alt="Interaction Steps" className="software-screenshot screenshot-large" />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="lesson-navigation">
            <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button>
            <button className="nav-button next" onClick={handleNext}>{activeTab === 'layout' ? 'Next Lesson' : 'Next'} <ChevronRight size={18} /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OriginLesson;
