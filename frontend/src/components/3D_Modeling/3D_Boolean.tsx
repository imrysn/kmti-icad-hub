/**
 * 3D_Boolean.tsx  —  Boolean operations lessons (1 and 2)
 */
import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, MousePointer2, ArrowRight, Box as BoxIcon, CheckCircle2, Zap, Info } from 'lucide-react';
import '../../styles/3D_Modeling/CourseLesson.css';
import '../../styles/3D_Modeling/CourseLesson.css';

// Boolean (1) Assets
import booleanOpMenu from '../../assets/3D_Image_File/boolean(1)_boolean_operation.png';
import unionIcon from '../../assets/3D_Image_File/boolean(1)_union.png';
import select3D from '../../assets/3D_Image_File/boolean(1)_select3d.png';
import subtractIcon from '../../assets/3D_Image_File/boolean(1)_subtract.png';
import subtractEntity from '../../assets/3D_Image_File/boolean(1)_subtract_entity.png';
import subtractAfter from '../../assets/3D_Image_File/boolean(1)_subtract_after_subtraction.png';
import subtractRetain from '../../assets/3D_Image_File/boolean(1)_subtract_retain_entities.png';
import booleanSubtract from '../../assets/3D_Image_File/boolean(1)_boolean_subtract.png';
import leftClick from '../../assets/3D_Image_File/left_click.png';

// Boolean (2) Assets
import intersectIcon from '../../assets/3D_Image_File/boolean(2)_intersect.png';
import intersectingEntities from '../../assets/3D_Image_File/boolean(2)_intersecting_entities.png';
import selectEntity from '../../assets/3D_Image_File/boolean(2)_select_entity.png';
import selectOk from '../../assets/3D_Image_File/boolean(2)_select_ok.png';
import componentIcon from '../../assets/3D_Image_File/boolean(2)_component.png';
import componentSeparate from '../../assets/3D_Image_File/boolean(2)_component_separate_all_components.png';
import componentOk from '../../assets/3D_Image_File/boolean(2)_component_select_ok.png';
import componentSeparated from '../../assets/3D_Image_File/boolean(2)_component_separated.png';

interface BooleanLessonProps {
  subLessonId: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

// Sub-components Boolean1 and Boolean2 were integrated into the main BooleanLesson component for better structure.


const BooleanLesson: React.FC<BooleanLessonProps> = ({ subLessonId, onNextLesson, onPrevLesson }) => {
  const [activeTab1, setActiveTab1] = useState<'union' | 'subtract'>('union');
  const [activeTab2, setActiveTab2] = useState<'intersect' | 'separate'>('intersect');
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
  }, [activeTab1, activeTab2, subLessonId]);

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

  const tabs1 = [
    { id: 'union', label: 'Union' },
    { id: 'subtract', label: 'Subtract' }
  ];

  const tabs2 = [
    { id: 'intersect', label: 'Intersect' },
    { id: 'separate', label: 'Separate Entity' }
  ];

  const handleNext1 = () => {
    if (activeTab1 === 'union') setActiveTab1('subtract');
    else if (onNextLesson) onNextLesson();
  };

  const handlePrev1 = () => {
    if (activeTab1 === 'subtract') setActiveTab1('union');
    else if (onPrevLesson) onPrevLesson();
  };

  const handleNext2 = () => {
    if (activeTab2 === 'intersect') setActiveTab2('separate');
    else if (onNextLesson) onNextLesson();
  };

  const handlePrev2 = () => {
    if (activeTab2 === 'separate') setActiveTab2('intersect');
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
          <BoxIcon size={28} className="lesson-intro-icon" />
          BOOLEAN OPERATIONS
        </h3>
        <div className="instruction-box" style={{ marginTop: '1.5rem', border: 'none', background: 'transparent' }}>
          <div className="image-wrapper-flush" style={{ margin: '0 auto' }}>
            <img src={booleanOpMenu} alt="Boolean Operation Menu" className="software-screenshot screenshot-small" />
          </div>
        </div>
      </section>

      {subLessonId === 'boolean-1' ? (
        <>
          <div className="lesson-tabs">
            {tabs1.map(tab => (
              <button key={tab.id} className={`tab-button ${activeTab1 === tab.id ? 'active' : ''}`} onClick={() => setActiveTab1(tab.id as any)}>{tab.label}</button>
            ))}
          </div>
          <div className="lesson-grid single-card">
            {activeTab1 === 'union' && (
              <div className="lesson-card tab-content">
                <div className="card-header"><h4>UNION</h4></div>
                <p style={{ marginTop: '-1rem' }}>Tool for joining 3D entities into a single entity.</p>
                <div className={getStepClass('bl1u-1')} onClick={() => toggleStep('bl1u-1')}>
                  <div className="step-header">
                    <span className={`step-number ${completedSteps.has('bl1u-1') ? 'completed' : ''}`}>
                      {completedSteps.has('bl1u-1') ? <CheckCircle2 size={16} /> : '1'}
                    </span>
                    <span className="step-label">Select <strong className="text-highlight">Union</strong> from the menu.</span>
                  </div>
                  <div className="step-description" style={{ paddingLeft: '2.5rem' }}>
                    <div className="image-wrapper-flush" style={{ marginTop: '0.8rem' }}>
                      <img src={unionIcon} alt="Union Icon" className="software-screenshot screenshot-small" />
                    </div>
                  </div>
                </div>

                <div className={getStepClass('bl1u-2')} onClick={() => toggleStep('bl1u-2')}>
                  <div className="step-header">
                    <span className={`step-number ${completedSteps.has('bl1u-2') ? 'completed' : ''}`}>
                      {completedSteps.has('bl1u-2') ? <CheckCircle2 size={16} /> : '2'}
                    </span>
                    <span className="step-label">Select all 3D entities for joining &gt; <strong>GO</strong> <img src={leftClick} alt="Left click" className="software-screenshot screenshot-click--inline" style={{ verticalAlign: 'middle', marginLeft: '0.25rem' }} /></span>
                  </div>
                  <div className="step-description" style={{ paddingLeft: '2.5rem' }}>
                    {/* Select Entities content moved to label */}
                    <div className="flex-row-center--wrap" style={{ gap: '1.5rem' }}>
                      <div className="image-wrapper-flush">
                        <img src={select3D} alt="Select 3D entities" className="software-screenshot screenshot-large" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lesson-navigation">
                  <button className="nav-button" onClick={handlePrev1}><ChevronLeft size={18} /> Previous</button>
                  <button className="nav-button next" onClick={handleNext1}>Next <ChevronRight size={18} /></button>
                </div>
              </div>
            )}
            {activeTab1 === 'subtract' && (
              <div className="lesson-card tab-content">
                <div className="card-header"><h4>SUBTRACT</h4></div>
                <p className="p-flush" style={{ marginTop: '-1rem' }}>Tool for creating cutout on 3D entities.</p>


                <div className={getStepClass('bl1s-1')} onClick={() => toggleStep('bl1s-1')}>
                  <div className="step-header">
                    <span className={`step-number ${completedSteps.has('bl1s-1') ? 'completed' : ''}`}>
                      {completedSteps.has('bl1s-1') ? <CheckCircle2 size={16} /> : '1'}
                    </span>
                    <span className="step-label">Select <strong className="text-highlight">Subtract</strong> from the icon menu.</span>
                  </div>
                  <div className="step-description" style={{ paddingLeft: '2.5rem' }}>
                    <div className="image-wrapper-flush" style={{ marginTop: '0.8rem' }}>
                      <img src={subtractIcon} alt="Subtract Icon" className="software-screenshot screenshot-small" />
                    </div>
                  </div>
                </div>

                <div className={getStepClass('bl1s-2')} onClick={() => toggleStep('bl1s-2')}>
                  <div className="step-header">
                    <span className={`step-number ${completedSteps.has('bl1s-2') ? 'completed' : ''}`}>
                      {completedSteps.has('bl1s-2') ? <CheckCircle2 size={16} /> : '2'}
                    </span>
                    <span className="step-label">First, select the Target entity</span>
                  </div>
                  <div className="step-description" style={{ paddingLeft: '2.5rem' }}>
                    <div className="flex-row-wrap" style={{ gap: '2rem' }}>
                      <div className="flex-1">
                        <div className="interaction-list--plain">
                          <p className="p-flush"><strong className="text-highlight">Target Entity:</strong> Main Part</p>
                          <p className="p-flush" style={{ marginTop: '0.5rem' }}><strong className="text-highlight">Tool Entity:</strong> Entities to be subtracted on the target entity.</p>
                        </div>
                      </div>
                      <div className="image-wrapper-flush" style={{ marginTop: '-3rem' }}>
                        <img src={subtractEntity} alt="Target and Tool Entity" className="software-screenshot screenshot-medium" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className={getStepClass('bl1s-3')} onClick={() => toggleStep('bl1s-3')}>
                  <div className="step-header">
                    <span className={`step-number ${completedSteps.has('bl1s-3') ? 'completed' : ''}`}>
                      {completedSteps.has('bl1s-3') ? <CheckCircle2 size={16} /> : '3'}
                    </span>
                    <span className="step-label">Select the tool entities &gt; <strong className="text-highlight">GO</strong> <img src={leftClick} alt="Left click" className="software-screenshot screenshot-click--inline" style={{ verticalAlign: 'middle', marginLeft: '0.25rem' }} /></span>
                  </div>
                  <p className="p-flush" style={{ marginTop: '-0.5rem', marginLeft: '2.5rem' }}>Tool entities will disappear and become components after subtraction.</p>
                  <div className="step-description" style={{ paddingLeft: '2.5rem' }}>
                    <div className="flex-row-center--wrap" style={{ marginTop: '1rem', gap: '1.5rem' }}>
                      <div className="image-wrapper-flush">
                        <img src={subtractAfter} alt="Subtraction Result" className="software-screenshot screenshot-large" />
                      </div>
                    </div>
                  </div>
                </div>



                <div className="tool-block">
                  <p className="p-flush">This subtract tool will retain the tool entities after subtraction.</p>
                  <div className="flex-row-center--wrap" style={{ marginTop: '1rem', gap: '1.5rem' }}>
                    <div className="image-wrapper-flush">
                      <img src={subtractRetain} alt="Subtract and retain entities" className="software-screenshot screenshot-small" />
                    </div>
                    <div className="image-wrapper-flush">
                      <img src={booleanSubtract} alt="Boolean Subtract Icon" className="software-screenshot screenshot-large" />
                    </div>
                  </div>
                </div>


                <div className="lesson-navigation">
                  <button className="nav-button" onClick={handlePrev1}><ChevronLeft size={18} /> Previous</button>
                  <button className="nav-button next" onClick={handleNext1}>Next Lesson <ChevronRight size={18} /></button>
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="lesson-tabs">
            {tabs2.map(tab => (
              <button key={tab.id} className={`tab-button ${activeTab2 === tab.id ? 'active' : ''}`} onClick={() => setActiveTab2(tab.id as any)}>{tab.label}</button>
            ))}
          </div>
          <div className="lesson-grid single-card">
            {activeTab2 === 'intersect' && (
              <div className="lesson-card tab-content">
                <div className="card-header"><h4>INTERSECT</h4></div>
                <p style={{ marginTop: '-1rem' }}>Tool that creates entity of the product of two intersecting entities.</p>


                <div className={getStepClass('bl2i-1')} onClick={() => toggleStep('bl2i-1')}>
                  <div className="step-header">
                    <span className={`step-number ${completedSteps.has('bl2i-1') ? 'completed' : ''}`}>
                      {completedSteps.has('bl2i-1') ? <CheckCircle2 size={16} /> : '1'}
                    </span>
                    <span className="step-label">Select <strong className="text-highlight">Intersect</strong> from the menu.</span>
                  </div>
                  <div className="step-description" style={{ paddingLeft: '2.5rem' }}>
                    <div className="image-wrapper-flush" style={{ marginTop: '0.8rem' }}>
                      <img src={intersectIcon} alt="Intersect Icon" className="software-screenshot screenshot-small" />
                    </div>
                  </div>
                </div>

                <div className={getStepClass('bl2i-2')} onClick={() => toggleStep('bl2i-2')}>
                  <div className="step-header">
                    <span className={`step-number ${completedSteps.has('bl2i-2') ? 'completed' : ''}`}>
                      {completedSteps.has('bl2i-2') ? <CheckCircle2 size={16} /> : '2'}
                    </span>
                    <span className="step-label">Select the intersecting entities &gt; <strong className="text-highlight">GO</strong> <img src={leftClick} alt="Left click" className="software-screenshot screenshot-click--inline" style={{ verticalAlign: 'middle', marginLeft: '0.25rem' }} /></span>
                  </div>
                  <p className="p-flush" style={{ marginTop: '-0.5rem', marginLeft: '2.5rem' }}>Intersecting entities will not disappear after the process</p>
                  <div className="step-description" style={{ paddingLeft: '2.5rem' }}>
                    <div className="flex-row-center--wrap" style={{ marginTop: '1rem', gap: '1.5rem' }}>
                      <div className="image-wrapper-flush">
                        <img src={intersectingEntities} alt="Intersecting Entities" className="software-screenshot screenshot-large" />
                      </div>
                    </div>
                  </div>
                </div>


                <div className="lesson-navigation">
                  <button className="nav-button" onClick={handlePrev2}><ChevronLeft size={18} /> Previous</button>
                  <button className="nav-button next" onClick={handleNext2}>Next <ChevronRight size={18} /></button>
                </div>
              </div>
            )}
            {activeTab2 === 'separate' && (
              <div className="lesson-card tab-content">
                <div className="card-header"><h4>SEPARATE ENTITY</h4></div>
                <p className="p-flush" style={{ marginTop: '-1rem' }}>Tool use to reverse the boolean operations by creating CSG solid.</p>
                <p className="p-flush"><strong className="text-highlight">Component</strong></p>
                <p className="p-flush" style={{ marginTop: '-0.5rem' }}>By-product of boolean operations (entities joined by union, cutout, holes)</p>
                <div className="image-wrapper-flush" style={{ marginTop: '-1rem' }}>
                  <img src={componentIcon} alt="Component Icon" className="software-screenshot screenshot-small" />
                </div>
                <p className="p-flush" style={{ marginTop: '-1rem' }}><strong>This tool is use to separate specified entities from the solid entity.</strong></p>



                <div className={getStepClass('bl2s-1')} onClick={() => toggleStep('bl2s-1')}>
                  <div className="step-description" style={{ paddingLeft: '0.5rem' }}>
                    <div className="flex-col" style={{ gap: '1rem' }}>
                      <div className="step-header">
                        <span className="step-number">1</span>
                        <span className="step-label">Select the desired components to be separate from the solid entity &gt; GO<img src={leftClick} alt="Left click" className="software-screenshot screenshot-click--inline" style={{ verticalAlign: 'middle', marginLeft: '0.25rem' }} /></span>
                      </div>
                      <div className="step-header" style={{ marginTop: '1rem' }}>
                        <span className="step-number">2</span>
                        <span className="step-label">Separated components will be displayed in a form of CSG solid. Select OK</span>
                      </div>
                    </div>
                    <div className="flex-row-center--wrap" style={{ marginTop: '1.5rem', gap: '1.5rem' }}>

                      <div className="image-wrapper-flush" style={{ marginTop: '-5rem' }}>
                        <img src={componentOk} alt="Confirm Dialog" className="software-screenshot screenshot-medium" />
                      </div>

                      <div className="image-wrapper-flush" style={{ marginLeft: '10rem' }}>
                        <img src={componentSeparated} alt="Separated Result" className="software-screenshot screenshot-medium" />
                      </div>
                    </div>
                    <div className="image-wrapper-flush" style={{ marginLeft: '4rem', marginTop: '-5rem' }}>
                      <img src={componentSeparate} alt="Separate All Components Icon" className="software-screenshot screenshot-small" />
                    </div>
                  </div>

                </div>

                <div className="section-divider"></div>

                <div className={getStepClass('bl2s-2')} onClick={() => toggleStep('bl2s-2')}>
                  <p className="p-flush" style={{ marginTop: '-1rem' }}><strong>This tool is use to separate all components from the solid entity.</strong></p>
                  <div className="step-description" style={{ paddingLeft: '0.5rem' }}>
                    <div className="flex-col" style={{ gap: '1rem' }}>
                      <div className="step-header">
                        <span className="step-number">1</span>
                        <span className="step-label" style={{ marginTop: '-1rem' }}>Select the entire solid entity &gt; <strong className="text-highlight">GO</strong> <img src={leftClick} alt="Left click" className="software-screenshot screenshot-click--inline" /></span>
                      </div>
                      <div className="step-header" style={{ marginTop: '1rem' }}>
                        <span className="step-number">2</span>
                        <span className="step-label" style={{ marginTop: '0.5rem' }}>Separate components will be displayed in a form of CSG solid. Select OK</span>
                      </div>
                    </div>
                    <div className="flex-row-center--wrap" style={{ marginTop: '1.5rem', gap: '1.5rem' }}>

                      <div className="image-wrapper-flush">
                        <img src={selectOk} alt="Confirm Dialog" className="software-screenshot screenshot-medium" />
                      </div>
                      <div className="image-wrapper-flush" style={{ marginLeft: '10rem' }}>
                        <img src={selectEntity} alt="All Separated Result" className="software-screenshot screenshot-medium" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lesson-navigation">
                  <button className="nav-button" onClick={handlePrev2}><ChevronLeft size={18} /> Previous</button>
                  <button className="nav-button next" onClick={handleNext2}>Finish <ChevronRight size={18} /></button>
                </div>
              </div>
            )}
          </div>
        </>
      )
      }
    </div >
  );
};

export default BooleanLesson;
