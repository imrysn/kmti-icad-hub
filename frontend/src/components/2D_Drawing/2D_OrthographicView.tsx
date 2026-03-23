import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, CheckCircle2, Layout, ScanLine, Scale, Info, Play } from 'lucide-react';
import '../../styles/2D_Drawing/CourseLesson.css';
import '../../styles/2D_Drawing/2D_OrthographicView.css';

// Importing assets for Create Orthographic View (1)
import drawingTemplateImg from '../../assets/2D_Image_File/2D_create_orthographic_view_(1)_1.png'; // Section 1: Template
import createViewImg from '../../assets/2D_Image_File/2D_create_orthographic_view_(1)_a.png'; // Section a: Creation/Deletion
import scalingImg from '../../assets/2D_Image_File/2D_create_orthographic_view_(1)_b.png'; // Section b: Scale

interface OrthographicViewLessonProps {
  subLessonId?: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const OrthographicViewLesson: React.FC<OrthographicViewLessonProps> = ({ subLessonId = '2d-orthographic-1', onNextLesson, onPrevLesson }) => {
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
    <div className="course-lesson-container orthographic-view-lesson" ref={containerRef}>
      {/* Sticky Progress Bar */}
      <div className="lesson-progress-container">
        <div
          className="lesson-progress-bar"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <section className="lesson-intro">
        <h3 className="section-title">
          <Layout size={28} strokeWidth={2.5} className="lesson-intro-icon" />
          {subLessonId === '2d-orthographic-1' ? 'CREATE ORTHOGRAPHIC VIEW (1)' :
            subLessonId === '2d-orthographic-2' ? 'CREATE ORTHOGRAPHIC VIEW (2)' :
              'CREATE ORTHOGRAPHIC VIEW (3)'}
        </h3>
        <p className="p-flush">
          {subLessonId === '2d-orthographic-1' ? (
            <>



            </>
          ) : (
            `No content currently available for this section.`
          )}
        </p>
      </section>

      <div className="lesson-grid single-card">
        <div className="lesson-card">
          <div className="lesson-content">
            {subLessonId === '2d-orthographic-1' ? (
              <>
                {/* Section 1: Inserting Drawing Template */}
                <div className={getStepClass('ov1-1')} onClick={() => toggleStep('ov1-1')}>
                  <div className="step-header">
                    <span className={`step-number ${completedSteps.has('ov1-1') ? 'completed' : ''}`}>
                      {completedSteps.has('ov1-1') ? <CheckCircle2 size={16} strokeWidth={3} /> : '1'}
                    </span>
                    <span className="step-label">INSERTING DRAWING TEMPLATE</span>
                  </div>
                  <div className="step-description">
                    <div className="image-wrapper-flush">
                      <img src={drawingTemplateImg} alt="Inserting Drawing Template" className="software-screenshot screenshot-wide" />
                    </div>
                  </div>
                </div>



                {/* Section a: Creating Orthographic View / Delete Views */}
                <div className={getStepClass('ov1-a')} onClick={() => toggleStep('ov1-a')}>
                  <div className="step-header">
                    <span className={`step-number ${completedSteps.has('ov1-a') ? 'completed' : ''}`}>
                      {completedSteps.has('ov1-a') ? <CheckCircle2 size={16} strokeWidth={3} /> : 'a'}
                    </span>
                    <span className="step-label">CREATING ORTHOGRAPHIC VIEW / DELETE VIEWS</span>
                  </div>
                  <div className="step-description">




                    <div className="image-wrapper-flush">
                      <img src={createViewImg} alt="Creating Orthographic Views" className="software-screenshot screenshot-wide" />
                    </div>

                  </div>
                </div>




                {/* Section b: Scale */}
                <div className={getStepClass('ov1-b')} onClick={() => toggleStep('ov1-b')}>
                  <div className="step-header">
                    <span className={`step-number ${completedSteps.has('ov1-b') ? 'completed' : ''}`}>
                      {completedSteps.has('ov1-b') ? <CheckCircle2 size={16} strokeWidth={3} /> : 'b'}
                    </span>
                    <span className="step-label">SCALE</span>
                  </div>
                  <div className="step-description">
                    <p className="p-flush">Set the scale of selected view. When changing the scale, take note to always use the Projection Properties.</p>
                    <p className="p-flush" style={{ color: 'red', textAlign: 'center' }}><i>Do not change the scale on the tool bar because the dimensions and notes will not update according to the set scale.</i></p>
                    <div className="image-wrapper-flush">
                      <img src={scalingImg} alt="Scaling and Projection Properties" className="software-screenshot screenshot-wide" />
                    </div>

                    <div className="info-box" style={{ marginTop: '1.5rem', background: 'var(--bg-secondary)', borderLeft: '4px solid var(--primary)' }}>
                      <p className="p-flush">
                        <ScanLine size={18} style={{ verticalAlign: 'middle', marginRight: '0.5rem', color: 'var(--primary)' }} />
                        When changing the scale of a standard view, other standard views also change the scale.
                      </p>
                      <p className="p-flush" style={{ marginTop: '0.75rem' }}>
                        <Scale size={18} style={{ verticalAlign: 'middle', marginRight: '0.5rem', color: 'var(--primary)' }} />
                        Cross section view and detail view need to change the scale separately.
                      </p>
                    </div>
                    <p className="note-red" style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                      Do not change the scale on the tool bar because the dimensions and notes will not update according to the set scale.
                    </p>
                  </div>
                </div>
              </>
            ) : null}
          </div>

          <div className="lesson-navigation">
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

export default OrthographicViewLesson;
