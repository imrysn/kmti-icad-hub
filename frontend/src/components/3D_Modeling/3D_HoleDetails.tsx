/**
 * 3D_HoleDetails.tsx  —  "Creating Hole Details on Parts" Lesson
 */
import React, { useState, useEffect, useRef } from 'react';
import { MousePointer2, ChevronLeft, ChevronRight, Info, CheckCircle2, Zap } from 'lucide-react';
import '../../styles/3D_Modeling/CourseLesson.css';
import '../../styles/3D_Modeling/CourseLesson.css';

// Asset Imports
import arrangeMachinePart from '../../assets/3D_Image_File/hole_details_arrange_machine_part.png';
import partsPlacement from '../../assets/3D_Image_File/hole_details_parts_placement.png';
import listTools from '../../assets/3D_Image_File/hole_details_list_tools.png';
import holeResult from '../../assets/3D_Image_File/hole_details_hole.png';
import tappedHoles from '../../assets/3D_Image_File/hole_details_tapped_holes.png';
import leftClick from '../../assets/3D_Image_File/left_click.png';



interface HoleDetailsLessonProps {
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const HoleDetailsLesson: React.FC<HoleDetailsLessonProps> = ({ onNextLesson, onPrevLesson }) => {
  const [activeTab, setActiveTab] = useState<'holeDetails'>('holeDetails');
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
    };
    return () => {
      if (currentContainer) currentContainer.removeEventListener('scroll', handleScroll);
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

  const getStepClass = (stepId: string) => `instruction-step interactive ${completedSteps.has(stepId) ? 'completed' : ''}`;

  const tabs = [
    { id: 'holeDetails', label: 'Hole Details' }
  ];

  return (
    <div className="course-lesson-container" ref={containerRef}>
      {/* Sticky Progress Bar */}
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>
      <section className="lesson-intro">
        <h3>CREATING HOLE DETAILS ON PARTS</h3>
        <p className="p-flush">We have standard tools for creating holes such as drill holes, tapping holes and counterbores on the parts.</p>
        <div className="instruction-box">
          <div className="image-wrapper-flush">
            <img src={partsPlacement} alt="Part Placement" className="software-screenshot screenshot-large" />
          </div>
        </div>
      </section>

      <div className="lesson-grid single-card">
        <div className="lesson-card tab-content">
          <div className="lesson-tabs">
            {tabs.map(tab => (
              <button key={tab.id} className={`tab-button active`}>{tab.label}</button>
            ))}
          </div>

          <div className="tab-content-area">
            <div className="tab-pane">
              <div className={getStepClass('hole-1')} onClick={() => toggleStep('hole-1')}>
                <div className="step-header">
                  <span className={`step-number ${completedSteps.has('hole-1') ? 'completed' : ''}`}>
                    {completedSteps.has('hole-1') ? <CheckCircle2 size={16} /> : '1'}
                  </span>
                  <span className="step-label">Select <strong className="text-highlight">Arrange Machine Part</strong> from the icon menu.</span>
                </div>
                <div className="step-description" style={{ paddingLeft: '2.5rem' }}>
                  <div className="image-wrapper-flush" style={{ marginTop: '0.8rem' }}>
                    <img src={arrangeMachinePart} alt="Arrange Machine Part" className="software-screenshot screenshot-small" />
                  </div>
                </div>
              </div>

              <div className={getStepClass('hole-2')} onClick={() => toggleStep('hole-2')}>
                <div className="step-header">
                  <span className={`step-number ${completedSteps.has('hole-2') ? 'completed' : ''}`}>
                    {completedSteps.has('hole-2') ? <CheckCircle2 size={16} /> : '2'}
                  </span>
                  <span className="step-label">A window will appear showing the list of tools available.</span>
                </div>
                <div className="step-description" style={{ paddingLeft: '2.5rem' }}>
                  <div className="image-wrapper-flush" style={{ marginTop: '0.8rem' }}>
                    <img src={listTools} alt="List of available tools" className="software-screenshot screenshot-wide" />
                  </div>
                </div>
              </div>

              <div className={getStepClass('hole-3')} onClick={() => toggleStep('hole-3')}>
                <div className="step-header">
                  <span className={`step-number ${completedSteps.has('hole-3') ? 'completed' : ''}`}>
                    {completedSteps.has('hole-3') ? <CheckCircle2 size={16} /> : '3'}
                  </span>
                  <span className="step-label">After setting the specifications, click <strong className="text-highlight">OK</strong>.</span>
                </div>
                <div className="step-description" style={{ paddingLeft: '2.5rem' }}></div>
              </div>

              <div className={getStepClass('hole-4')} onClick={() => toggleStep('hole-4')}>
                <div className="step-header">
                  <span className={`step-number ${completedSteps.has('hole-4') ? 'completed' : ''}`}>
                    {completedSteps.has('hole-4') ? <CheckCircle2 size={16} /> : '4'}
                  </span>
                  <span className="step-label">Click the location of the hole on the solid entity &gt; <strong className="text-highlight">GO</strong><img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '2rem', display: 'inline-block', verticalAlign: 'middle', margin: '0 0.25rem' }} /> to create the cut.</span>
                </div>
                <div className="step-description" style={{ paddingLeft: '2.5rem' }}>
                  <div className="image-wrapper-flush" style={{ marginTop: '0.8rem' }}>
                    <img src={holeResult} alt="Hole Creation Result" className="software-screenshot screenshot-wide" />
                  </div>
                </div>
              </div>

              <div className="info-box" style={{ marginTop: '2rem' }}>
                <p className="p-flush"><strong className="text-highlight">Note:</strong> Tapped holes must be painted green to indicate that those are threaded and to distinguish it from drill holes.</p>
                <div className="image-wrapper-flush" style={{ marginTop: '1rem' }}>
                  <img src={tappedHoles} alt="Tapped Holes Examples" className="software-screenshot screenshot-wide" />
                </div>
              </div>

            </div>
          </div>

          <div className="lesson-navigation">
            <button className="nav-button" onClick={onPrevLesson}><ChevronLeft size={18} /> Previous</button>
            <button className="nav-button next" onClick={onNextLesson}>Next Lesson <ChevronRight size={18} /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HoleDetailsLesson;
