import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, CheckCircle2, Layout, MousePointer2, List } from 'lucide-react';
import '../../styles/2D_Drawing/CourseLesson.css';
// Importing assets for Command Menu (1)
import selectableLineImg from '../../assets/2D_Image_File/2D_command_menu_(1)_selectable_and_unselectable_line.png'; // Section 2
import commandMenu1Img from '../../assets/2D_Image_File/2D_command_menu_(1)_command_menu.png'; // Section 3 - Part 1
import commandMenu2Img from '../../assets/2D_Image_File/2D_command_menu_(1)_command_menu_2.png'; // Section 3 - Part 2

// Importing assets for Command Menu (2)
import activeViewImg from '../../assets/2D_Image_File/2D_command_menu_(2)_active_view.png'; // Section 3
import componentHighlighted1Img from '../../assets/2D_Image_File/2D_command_menu_(2)_component_highlighled_1.png'; // Section 4 - Part 1
import componentHighlighted2Img from '../../assets/2D_Image_File/2D_command_menu_(2)_component_highlighled_2.png'; // Section 4 - Part 2

interface CommandMenuLessonProps {
  subLessonId?: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const CommandMenuLesson: React.FC<CommandMenuLessonProps> = ({ subLessonId = '2d-command-menu-1', onNextLesson, onPrevLesson }) => {
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
  }, [subLessonId]);

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

  return (
    <div className="course-lesson-container command-menu-lesson" ref={containerRef}>
      {/* Sticky Progress Bar */}
      <div className="lesson-progress-container">
        <div
          className="lesson-progress-bar"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <section className="lesson-intro">
        <h3>
          <Layout size={28} strokeWidth={2.5} className="lesson-intro-icon" />
          {subLessonId === '2d-command-menu-1' ? 'COMMAND MENU (1)' : 'COMMAND MENU (2)'}
        </h3>
        <p className="p-flush">Learn about line properties and the efficiency of using the command menu in 2D detailing.</p>
      </section>

      <div className="lesson-grid single-card">
        <div className="lesson-card">

          {subLessonId === '2d-command-menu-1' ? (
            <>
              {/* Section 2: Selectable and Unselectable Line Properties */}
              <div className={getStepClass('cm1-2')} onClick={() => toggleStep('cm1-2')}>
                <div className="step-header">
                  <span className={`step-number ${completedSteps.has('cm1-2') ? 'completed' : ''}`}>
                    {completedSteps.has('cm1-2') ? <CheckCircle2 size={16} strokeWidth={3} /> : '2'}
                  </span>
                  <span className="step-label" style={{ color: 'red' }}>Selectable and Unselectable Line Properties</span>
                </div>
                <div className="step-description">
                  <div className="flex-col" style={{ gap: '1rem', marginTop: '1rem' }}>
                    <div className="image-wrapper-flush">
                      <img src={selectableLineImg} alt="Selectable Line Properties" className="software-screenshot screenshot-wide" />
                    </div>
                    <div className="info-box" style={{ background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: '8px' }}>
                      <p className="p-flush">All line type, line weight, and color are selectable when system is started.</p>
                      <p className="p-flush" style={{ marginTop: '0.5rem' }}>Click on the entities to select and unselect line properties.</p>
                      <div className="flex-row-center" style={{ gap: '0.5rem', marginTop: '1rem' }}>
                        <div style={{ width: '350px', height: '36px', background: '#4a90e2', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '0.85rem' }}>
                          Entities highlighted in blue are selectables
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="section-divider" style={{ margin: '1rem 0' }}></div>

              {/* Section 3: Command Menu */}
              <div className={getStepClass('cm1-3')} onClick={() => toggleStep('cm1-3')}>
                <div className="step-header">
                  <span className={`step-number ${completedSteps.has('cm1-3') ? 'completed' : ''}`}>
                    {completedSteps.has('cm1-3') ? <CheckCircle2 size={16} strokeWidth={3} /> : '3'}
                  </span>
                  <span className="step-label">
                    <strong style={{ color: 'red' }}>Command Menu</strong> ← During 2D detailing, command menu is more effective to use rather than icon menu.
                  </span>
                </div>
                <div className="step-description">
                  <div className="flex-col" style={{ gap: '2rem', marginTop: '1.5rem' }}>
                    <div className="image-wrapper-flush">
                      <img src={commandMenu1Img} alt="Command Menu - Basic Tools" className="software-screenshot screenshot-wide" />
                    </div>
                    <div className="image-wrapper-flush">
                      <img src={commandMenu2Img} alt="Command Menu - Advanced Tools" className="software-screenshot screenshot-wide" />
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : subLessonId === '2d-command-menu-2' ? (
            <>
              {/* Section 3: Active View */}
              <div className={getStepClass('cm2-3')} onClick={() => toggleStep('cm2-3')}>
                <div className="step-header">
                  <span className={`step-number ${completedSteps.has('cm2-3') ? 'completed' : ''}`}>
                    {completedSteps.has('cm2-3') ? <CheckCircle2 size={16} strokeWidth={3} /> : '3'}
                  </span>
                  <span className="step-label" style={{ color: 'red' }}>Active View</span>
                </div>
                <div className="step-description">
                  <div className="flex-col" style={{ gap: '1rem', marginLeft: '2.5rem' }}>
                    <p className="p-flush">Each viewing has its own local view. <br /> Highlighted one is activated. It means, all changes performed in that activated view is valid. <br />Unactivated view cannot select any line, so that no command will be performed.</p>

                    <div className="image-wrapper-flush" style={{ marginTop: '-7rem' }}>
                      <img src={activeViewImg} alt="Active View and Local View" className="software-screenshot screenshot-large" />
                    </div>
                  </div>
                </div>
              </div>



              {/* Section 4: Component highlighted / unhighlighted */}
              <div className={getStepClass('cm2-4')} onClick={() => toggleStep('cm2-4')}>
                <div className="step-header">
                  <span className={`step-number ${completedSteps.has('cm2-4') ? 'completed' : ''}`}>
                    {completedSteps.has('cm2-4') ? <CheckCircle2 size={16} strokeWidth={3} /> : '4'}
                  </span>
                  <span className="step-label" style={{ color: 'red' }}>Component highlighted / unhighlighted</span>
                </div>
                <div className="step-description">
                  <div className="flex-row--top" style={{ gap: '2rem', marginTop: '1.5rem' }}>
                    <div className="flex-1">
                      <div className="image-wrapper-flush">
                        <img src={componentHighlighted1Img} alt="Chamfer line appearing too close" className="software-screenshot screenshot-large" />
                      </div>
                      <div className="info-box" style={{ border: '1.5px solid red', borderRadius: '12px', padding: '1rem', background: 'white', marginTop: '1rem' }}>
                        <p className="p-flush" style={{ fontSize: '0.85rem', color: 'red', fontWeight: 'bold' }}><i>NOTE: The process of removing the chamfer is per orthographic view.</i></p>
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="info-box" style={{ border: '1.5px solid red', borderRadius: '12px', padding: '1.5rem', background: 'white', marginBottom: '1.5rem' }}>
                        <p className="p-flush" style={{ fontSize: '0.9rem' }}>As shown, chamfer line appear in the drawing. It shows that it is too close to the object line.</p>
                        <p className="p-flush" style={{ fontSize: '0.9rem', marginTop: '0.8rem' }}>It may cause offsetting of line selection upon dimensioning, and during printing, these lines may appear much thicker than the others.</p>
                        <p className="p-flush" style={{ fontSize: '0.85rem', color: 'red', fontWeight: 'bold', marginTop: '0.8rem' }}>This chamfer line can be removed.</p>
                      </div>
                      <div className="image-wrapper-flush">
                        <img src={componentHighlighted2Img} alt="Properties for removing chamfer" className="software-screenshot screenshot-wide" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <p>Content for {subLessonId} is still being prepared.</p>
          )}


          <div className="lesson-navigation" style={{ marginTop: '5rem', borderTop: '1px solid #eee', paddingTop: '2.5rem' }}>
            <button className="nav-button" onClick={onPrevLesson}>
              <ChevronLeft size={18} /> Previous
            </button>
            <button className="nav-button next" onClick={onNextLesson}>
              Next Lesson <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommandMenuLesson;
