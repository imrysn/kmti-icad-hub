/**
 * 3D_Boolean.tsx  —  Boolean operations lessons (1 and 2)
 */
import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, MousePointer2, ArrowRight, Box as BoxIcon, CheckCircle2, Zap, Info } from 'lucide-react';
import '../../styles/3D_Modeling/CourseLesson.css';
import '../../styles/3D_Modeling/CourseLesson.css';

// Boolean (1) Assets
import booleanOpMenu from '../../assets/3D_Image_File/boolean(1)_boolean_operation.jpg';
import unionIcon from '../../assets/3D_Image_File/boolean(1)_union.jpg';
import select3D from '../../assets/3D_Image_File/boolean(1)_select3d.jpg';
import subtractIcon from '../../assets/3D_Image_File/boolean(1)_subtract.jpg';
import subtractEntity from '../../assets/3D_Image_File/boolean(1)_subtract_entity.jpg';
import subtractAfter from '../../assets/3D_Image_File/boolean(1)_subtract_after_subtraction.jpg';
import subtractRetain from '../../assets/3D_Image_File/boolean(1)_subtract_retain_entities.jpg';
import booleanSubtract from '../../assets/3D_Image_File/boolean(1)_boolean_subtract.jpg';
import leftClick from '../../assets/3D_Image_File/left_click.jpg';

// Boolean (2) Assets
import intersectIcon from '../../assets/3D_Image_File/boolean(2)_intersect.jpg';
import intersectingEntities from '../../assets/3D_Image_File/boolean(2)_intersecting_entities.jpg';
import selectEntity from '../../assets/3D_Image_File/boolean(2)_select_entity.jpg';
import selectOk from '../../assets/3D_Image_File/boolean(2)_select_ok.jpg';
import componentIcon from '../../assets/3D_Image_File/boolean(2)_component.jpg';
import componentSeparate from '../../assets/3D_Image_File/boolean(2)_component_separate_all_components.jpg';
import componentOk from '../../assets/3D_Image_File/boolean(2)_component_select_ok.jpg';
import componentSeparated from '../../assets/3D_Image_File/boolean(2)_component_separated.jpg';

interface BooleanLessonProps {
  subLessonId: string;
  onNextLesson?: () => void;
}

// Sub-components Boolean1 and Boolean2 were integrated into the main BooleanLesson component for better structure.


const ProTip: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="pro-tip-card">
    <div className="pro-tip-icon-wrapper">
      <Zap size={20} fill="currentColor" />
    </div>
    <div className="pro-tip-content">
      <h5>{title}</h5>
      <p>{children}</p>
    </div>
  </div>
);

const BooleanLesson: React.FC<BooleanLessonProps> = ({ subLessonId, onNextLesson }) => {
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
  };

  const handleNext2 = () => {
    if (activeTab2 === 'intersect') setActiveTab2('separate');
    else if (onNextLesson) onNextLesson();
  };

  const handlePrev2 = () => {
    if (activeTab2 === 'separate') setActiveTab2('intersect');
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
                <p>Tool for joining 3D entities into a single entity.</p>
                <div className={getStepClass('bl1u-1')} onClick={() => toggleStep('bl1u-1')}>
                  <div className="step-header">
                    <span className={`step-number ${completedSteps.has('bl1u-1') ? 'completed' : ''}`}>
                      {completedSteps.has('bl1u-1') ? <CheckCircle2 size={16} /> : '1'}
                    </span>
                    <span className="step-label">Select Union Tool</span>
                  </div>
                  <div className="step-description" style={{ paddingLeft: '2.5rem' }}>
                    <p className="p-flush">Select <strong className="text-highlight">Union</strong> from the menu.</p>
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
                    <span className="step-label">Select Entities</span>
                  </div>
                  <div className="step-description" style={{ paddingLeft: '2.5rem' }}>
                    <p className="p-flush">Select all entities you want to join &gt; <strong>GO</strong> <img src={leftClick} alt="Left click" className="software-screenshot screenshot-click--inline" style={{ verticalAlign: 'middle', marginLeft: '0.25rem' }} /></p>
                    <div className="flex-row-center--wrap" style={{ marginTop: '1rem', gap: '1.5rem' }}>
                      <div className="image-wrapper-flush">
                        <img src={select3D} alt="Select 3D entities" className="software-screenshot screenshot-medium" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lesson-navigation">
                  <button className="nav-button" disabled><ChevronLeft size={18} /> Previous</button>
                  <button className="nav-button next" onClick={handleNext1}>Next <ChevronRight size={18} /></button>
                </div>
              </div>
            )}
            {activeTab1 === 'subtract' && (
              <div className="lesson-card tab-content">
                <div className="card-header"><h4>SUBTRACT</h4></div>
                <div className="instruction-box instruction-box--tight">
                  <p className="p-flush">Tool for creating cutout on 3D entities.</p>
                </div>

                <div className={getStepClass('bl1s-1')} onClick={() => toggleStep('bl1s-1')}>
                  <div className="step-header">
                    <span className={`step-number ${completedSteps.has('bl1s-1') ? 'completed' : ''}`}>
                      {completedSteps.has('bl1s-1') ? <CheckCircle2 size={16} /> : '1'}
                    </span>
                    <span className="step-label">Select Subtract Tool</span>
                  </div>
                  <div className="step-description" style={{ paddingLeft: '2.5rem' }}>
                    <p className="p-flush">Select <strong className="text-highlight">Subtract</strong> from the menu.</p>
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
                    <span className="step-label">Select Target</span>
                  </div>
                  <div className="step-description" style={{ paddingLeft: '2.5rem' }}>
                    <div className="flex-row-wrap" style={{ gap: '2rem' }}>
                      <div className="flex-1">
                        <div className="interaction-list--plain">
                          <p className="p-flush"><strong className="text-highlight">Target Entity:</strong> Main Part</p>
                          <p className="p-flush" style={{ marginTop: '0.5rem' }}><strong className="text-highlight">Tool Entity:</strong> Entities to be subtracted on the target entity.</p>
                        </div>
                      </div>
                      <div className="image-wrapper-flush" style={{ marginBottom: '-1rem' }}>
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
                    <span className="step-label">Perform Subtraction</span>
                  </div>
                  <div className="step-description" style={{ paddingLeft: '2.5rem' }}>
                    <p className="p-flush">Select the tool entities &gt; <strong className="text-highlight">GO</strong></p>
                    <div className="flex-row-center--wrap" style={{ marginTop: '1rem', gap: '1.5rem' }}>
                      <div className="image-wrapper-flush">
                        <img src={leftClick} alt="Left click" className="software-screenshot screenshot-click" />
                      </div>
                      <div className="image-wrapper-flush">
                        <img src={subtractAfter} alt="Subtraction Result" className="software-screenshot screenshot-medium" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="section-divider"></div>

                <div className="tool-block">
                  <h4 className="section-title">ADVANCED: RETAIN TOOL ENTITIES</h4>
                  <p className="p-flush">Normally, 'tools' disappear after subtraction. Use the <strong className="text-highlight">Retain Tool</strong> version if you need to keep the original cutting solids active.</p>
                  <div className="flex-row-center--wrap" style={{ marginTop: '1rem', gap: '1.5rem' }}>
                    <div className="image-wrapper-flush">
                      <img src={subtractRetain} alt="Subtract and retain entities" className="software-screenshot screenshot-small" />
                    </div>
                    <div className="image-wrapper-flush">
                      <img src={booleanSubtract} alt="Boolean Subtract Icon" className="software-screenshot screenshot-medium" />
                    </div>
                  </div>
                </div>


                <div className="lesson-navigation">
                  <button className="nav-button" onClick={handlePrev1}><ChevronLeft size={18} /> Previous</button>
                  <button className="nav-button next" onClick={handleNext1}>Finish <ChevronRight size={18} /></button>
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
                <div className="instruction-box instruction-box--tight">
                  <p className="p-flush">The 'Overlap' operation: Only keep the volume where two or more solids occupy the same space.</p>
                </div>

                <div className={getStepClass('bl2i-1')} onClick={() => toggleStep('bl2i-1')}>
                  <div className="step-header">
                    <span className={`step-number ${completedSteps.has('bl2i-1') ? 'completed' : ''}`}>
                      {completedSteps.has('bl2i-1') ? <CheckCircle2 size={16} /> : '1'}
                    </span>
                    <span className="step-label">Select Intersect</span>
                  </div>
                  <div className="step-description" style={{ paddingLeft: '2.5rem' }}>
                    <p className="p-flush">Select <strong className="text-highlight">Intersect</strong> from the menu.</p>
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
                    <span className="step-label">Select Entities</span>
                  </div>
                  <div className="step-description" style={{ paddingLeft: '2.5rem' }}>
                    <p className="p-flush">Select the intersecting solids &gt; <strong className="text-highlight">GO</strong></p>
                    <div className="flex-row-center--wrap" style={{ marginTop: '1rem', gap: '1.5rem' }}>
                      <div className="image-wrapper-flush">
                        <img src={leftClick} alt="Left click" className="software-screenshot screenshot-click" />
                      </div>
                      <div className="image-wrapper-flush">
                        <img src={intersectingEntities} alt="Intersecting Entities" className="software-screenshot screenshot-medium" />
                      </div>
                    </div>
                  </div>
                </div>

                <ProTip title="Pro Tip: Complex Profiles">
                  Intersection is incredibly powerful for creating complex curved profiles. By intersecting two extruded silhouettes from different planes, you can easily create shapes that would be difficult to sketch!
                </ProTip>

                <div className="lesson-navigation">
                  <button className="nav-button" disabled><ChevronLeft size={18} /> Previous</button>
                  <button className="nav-button next" onClick={handleNext2}>Next <ChevronRight size={18} /></button>
                </div>
              </div>
            )}
            {activeTab2 === 'separate' && (
              <div className="lesson-card tab-content">
                <div className="card-header"><h4>SEPARATE ENTITY</h4></div>
                <div className="instruction-box instruction-box--tight">
                  <p className="p-flush">The 'Undo' operation: Break a combined solid back into its original component parts.</p>
                </div>

                <div className="tool-block" style={{ padding: '1rem', background: 'rgba(52, 152, 219, 0.05)', borderRadius: '8px', marginBottom: '1.5rem' }}>
                  <p className="p-flush"><strong className="text-highlight">What is a Component?</strong> It's any byproduct of boolean operations (joined parts, cutouts, or holes) that still exists within the solid's history.</p>
                </div>

                <div className={getStepClass('bl2s-1')} onClick={() => toggleStep('bl2s-1')}>
                  <div className="step-header">
                    <span className="step-label step-label-primary">METHOD A: SEPARATE SPECIFIED ENTITIES</span>
                  </div>
                  <div className="step-description" style={{ paddingLeft: '0.5rem' }}>
                    <div className="flex-col" style={{ gap: '1rem' }}>
                      <div className="flex-row-center" style={{ gap: '1rem' }}>
                        <span className="step-number-pill">1</span>
                        <p className="p-flush">Select specific components to separate &gt; <strong className="text-highlight">GO</strong></p>
                        <div className="image-wrapper-flush">
                          <img src={leftClick} alt="Left click" className="software-screenshot screenshot-click--inline" />
                        </div>
                      </div>
                      <div className="flex-row-center" style={{ gap: '1rem' }}>
                        <span className="step-number-pill">2</span>
                        <p className="p-flush">Separated components will appear. Select <strong className="text-highlight">OK</strong>.</p>
                      </div>
                    </div>
                    <div className="flex-row-center--wrap" style={{ marginTop: '1.5rem', gap: '1.5rem' }}>
                      <div className="image-wrapper-flush">
                        <img src={componentIcon} alt="Component Icon" className="software-screenshot screenshot-small" />
                      </div>
                      <div className="image-wrapper-flush">
                        <img src={componentOk} alt="Confirm Dialog" className="software-screenshot screenshot-small" />
                      </div>
                      <div className="image-wrapper-flush">
                        <img src={componentSeparated} alt="Separated Result" className="software-screenshot screenshot-medium" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="section-divider"></div>

                <div className={getStepClass('bl2s-2')} onClick={() => toggleStep('bl2s-2')}>
                  <div className="step-header">
                    <span className="step-label step-label-primary">METHOD B: SEPARATE ALL COMPONENTS</span>
                  </div>
                  <div className="step-description" style={{ paddingLeft: '0.5rem' }}>
                    <div className="flex-col" style={{ gap: '1rem' }}>
                      <div className="flex-row-center" style={{ gap: '1rem' }}>
                        <span className="step-number-pill">1</span>
                        <p className="p-flush">Select the entire solid entity &gt; <strong className="text-highlight">GO</strong></p>
                        <div className="image-wrapper-flush">
                          <img src={leftClick} alt="Left click" className="software-screenshot screenshot-click--inline" />
                        </div>
                      </div>
                      <div className="flex-row-center" style={{ gap: '1rem' }}>
                        <span className="step-number-pill">2</span>
                        <p className="p-flush">All components will be separated at once. Select <strong className="text-highlight">OK</strong>.</p>
                      </div>
                    </div>
                    <div className="flex-row-center--wrap" style={{ marginTop: '1.5rem', gap: '1.5rem' }}>
                      <div className="image-wrapper-flush">
                        <img src={componentSeparate} alt="Separate All Components Icon" className="software-screenshot screenshot-small" />
                      </div>
                      <div className="image-wrapper-flush">
                        <img src={selectOk} alt="Confirm Dialog" className="software-screenshot screenshot-small" />
                      </div>
                      <div className="image-wrapper-flush">
                        <img src={selectEntity} alt="All Separated Result" className="software-screenshot screenshot-medium" />
                      </div>
                    </div>
                  </div>
                </div>

                <ProTip title="Pro Tip: Reverting Changes">
                  'Separate Entity' is your safety net. If you realize a hole was placed in the wrong spot after a subtraction, you don't need to 'Undo' everything—just separate that specific hole component and move it!
                </ProTip>

                <div className="lesson-navigation">
                  <button className="nav-button" onClick={handlePrev2}><ChevronLeft size={18} /> Previous</button>
                  <button className="nav-button next" onClick={handleNext2}>Finish <ChevronRight size={18} /></button>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default BooleanLesson;
