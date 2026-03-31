import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, CheckCircle2, Layout, ScanLine, Scale, Info, Play } from 'lucide-react';
import '../../styles/2D_Drawing/CourseLesson.css';
import '../../styles/2D_Drawing/2D_OrthographicView.css';

// Importing assets for Create Orthographic View (1)
import drawingTemplateImg from '../../assets/2D_Image_File/2D_create_orthographic_view_(1)_1.png'; // Section 1: Template
import createViewImg from '../../assets/2D_Image_File/2D_create_orthographic_view_(1)_a.png'; // Section a: Creation/Deletion
import scalingImg from '../../assets/2D_Image_File/2D_create_orthographic_view_(1)_b.png'; // Section b: Scale

// Importing assets for Create Orthographic View (2)
import hiddenLineDialogImg from '../../assets/2D_Image_File/2D_create_orthographic_view_(2)_c.2.jpg'; // Section c: Dialog
import hiddenLineResultImg from '../../assets/2D_Image_File/2D_create_orthographic_view_(2)_c.png'; // Section c: Result
import tangentLineDialogImg from '../../assets/2D_Image_File/2D_create_orthographic_view_(2)_d.2.jpg'; // Section d: Dialog
import tangentLineResultImg from '../../assets/2D_Image_File/2D_create_orthographic_view_(2)_d.png'; // Section d: Result

// Importing assets for Create Orthographic View (3)
import highPrecisionDialogImg from '../../assets/2D_Image_File/2D_create_orthographic_view_(3)_e1.jpg'; // Section e: Dialog
import highPrecisionResultImg from '../../assets/2D_Image_File/2D_create_orthographic_view_(3)_e.png'; // Section e: Result

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

                    <div className="info-box" style={{ marginTop: '1.5rem', background: 'var(--bg-secondary)' }}>
                      <p className="p-flush" style={{ color: 'red' }}>
                        Note: When changing the scale of a standard view, other standard views also change the scale. Cross section view and detail view need to chnage the scale separately.
                      </p>

                    </div>

                  </div>
                </div>
              </>
            ) : subLessonId === '2d-orthographic-2' ? (
              <>
                {/* Section c: Hidden Line */}
                <div className={getStepClass('ov2-c')} onClick={() => toggleStep('ov2-c')}>
                  <div className="step-header">
                    <span className={`step-number ${completedSteps.has('ov2-c') ? 'completed' : ''}`}>
                      {completedSteps.has('ov2-c') ? <CheckCircle2 size={16} strokeWidth={3} /> : 'c'}
                    </span>
                    <span className="step-label">
                      <strong style={{ color: 'red' }}>Hidden Line</strong> - the hidden line is not automatically shown when orthographic view was inserted. It can be shown through the Projection Properties.
                    </span>
                  </div>
                  <div className="step-description">
                    <div className="flex-row--top" style={{ gap: '1.5rem', marginTop: '1rem' }}>
                      <div style={{ position: 'relative' }}>

                        <div className="annotation-pointing-box" style={{
                          border: '1.5px solid red',
                          borderRadius: '12px',
                          padding: '1rem',
                          maxWidth: '220px',
                          background: 'white',
                          marginTop: '1rem'
                        }}>
                          <p className="p-flush" style={{ fontSize: '0.85rem', color: 'black' }}>The box for hidden lines must be checked in order for the hidden lines of a certain view to show.</p>
                          <p className="p-flush" style={{ fontSize: '0.85rem', color: 'red', marginTop: '0.5rem' }}><i>Note: If the hidden lines must be shown in all views, then this process must be done in all views.</i></p>
                        </div>
                      </div>
                      <img src={hiddenLineDialogImg} alt="Hidden Line Dialog" className="software-screenshot screenshot-small" style={{ border: '1px solid #ddd' }} />
                      <div className="flex-1">
                        <img src={hiddenLineResultImg} alt="Hidden Line Result" className="software-screenshot screenshot-large" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="section-divider-sm" style={{ margin: '2rem 0' }}></div>

                {/* Section d: Tangent Line */}
                <div className={getStepClass('ov2-d')} onClick={() => toggleStep('ov2-d')}>
                  <div className="step-header">
                    <span className={`step-number ${completedSteps.has('ov2-d') ? 'completed' : ''}`}>
                      {completedSteps.has('ov2-d') ? <CheckCircle2 size={16} strokeWidth={3} /> : 'd'}
                    </span>
                    <span className="step-label">
                      <strong style={{ color: 'red' }}>Tangent Line</strong> - shows and hides lines from fillets of a view. The tangent lines from chamfers are shown automatically during insertion of orthographic view.
                    </span>
                  </div>
                  <div className="step-description">
                    <div className="flex-row--top" style={{ gap: '1.5rem', marginTop: '1rem' }}>
                      <div style={{ position: 'relative' }}>

                        <div className="annotation-pointing-box" style={{
                          border: '1.5px solid red',
                          borderRadius: '12px',
                          padding: '1rem',
                          maxWidth: '220px',
                          background: 'white',
                          marginTop: '1rem'
                        }}>
                          <p className="p-flush" style={{ fontSize: '0.85rem', color: 'black' }}>The box for tangent line must be checked in order for the tangent lines of a certain view to show.</p>
                          <p className="p-flush" style={{ fontSize: '0.85rem', color: 'red', marginTop: '0.5rem' }}><i>Note: If the tangent line must be shown in all views, then this process must be done in all views.</i></p>
                        </div>
                      </div> <img src={tangentLineDialogImg} alt="Tangent Line Dialog" className="software-screenshot screenshot-small" style={{ border: '1px solid #ddd' }} />
                      <div className="flex-1">
                        <img src={tangentLineResultImg} alt="Tangent Line Result" className="software-screenshot screenshot-wide" />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : subLessonId === '2d-orthographic-3' ? (
              <>
                {/* Section e: High Precision */}
                <div className={getStepClass('ov3-e')} onClick={() => toggleStep('ov3-e')}>
                  <div className="step-header">
                    <span className={`step-number ${completedSteps.has('ov3-e') ? 'completed' : ''}`}>
                      {completedSteps.has('ov3-e') ? <CheckCircle2 size={16} strokeWidth={3} /> : 'e'}
                    </span>
                    <span className="step-label">
                      <strong style={{ color: 'red' }}>High Precision</strong> - used for better projection of small components or parts on a part or assembly. When High precision is unchecked, some lines in the detail drawing are broken and some lines are missing. This is commonly used on assembly drawings but can also be used for parts, if necessary.
                    </span>
                  </div>
                  <div className="step-description">
                    <div className="flex-row--top" style={{ gap: '1.5rem', marginTop: '1rem' }}>
                      <div style={{ position: 'relative' }}>
                        <div className="annotation-pointing-box" style={{
                          border: '1.5px solid red',
                          borderRadius: '12px',
                          padding: '1rem',
                          maxWidth: '220px',
                          background: 'white',
                          marginTop: '1rem'
                        }}>
                          <p className="p-flush" style={{ fontSize: '0.85rem', color: 'black' }}>The box for high precision must be checked if there are broken lines and details missing on the assembly.</p>
                          <p className="p-flush" style={{ fontSize: '0.85rem', color: 'red', marginTop: '0.5rem' }}><i>Note: If this scenario are shown in all views, then this process must be done in all views.</i></p>
                        </div>
                      </div>
                      <img src={highPrecisionDialogImg} alt="High Precision Dialog" className="software-screenshot screenshot-small" style={{ border: '1px solid #ddd' }} />
                      <div className="flex-1">
                        <img src={highPrecisionResultImg} alt="High Precision Result" className="software-screenshot screenshot-large" />
                      </div>
                    </div>
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
