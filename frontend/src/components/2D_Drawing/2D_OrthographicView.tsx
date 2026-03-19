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
          CREATE ORTHOGRAPHIC VIEW (1)
        </h3>
        <p className="p-flush">
          Learn how to insert drawing templates, generate your views from 3D models, and manage the scale of your projection.
          <br />
          <span className="note-red">NOTE: The New version of iCad (V8L1) all codes are in Japanese writings.</span>
        </p>
      </section>

      <div className="lesson-grid single-card">
        <div className="lesson-card">
          <div className="lesson-content">

            {/* Section 1: Inserting Drawing Template */}
            <div className={getStepClass('ov1-1')} onClick={() => toggleStep('ov1-1')}>
              <div className="step-header">
                <span className={`step-number ${completedSteps.has('ov1-1') ? 'completed' : ''}`}>
                  {completedSteps.has('ov1-1') ? <CheckCircle2 size={16} strokeWidth={3} /> : '1'}
                </span>
                <span className="step-label">INSERTING DRAWING TEMPLATE</span>
              </div>
              <div className="step-description">
                <p className="p-flush">Click on the icon for the <strong>Template</strong> to see the list of drawing templates.</p>
                <div className="image-wrapper-flush">
                  <img src={drawingTemplateImg} alt="Inserting Drawing Template" className="software-screenshot screenshot-wide" />
                </div>
                <div className="info-box" style={{ background: 'var(--bg-secondary)', padding: '1.25rem', borderRadius: '8px', borderLeft: '4px solid var(--primary-red)' }}>
                  <ul className="interaction-list--plain" style={{ marginBottom: 0 }}>
                    <li><strong style={{ color: 'var(--primary-red)' }}>For Assembly Drawing:</strong> Use ASSY templates (A1, A2, etc.)</li>
                    <li style={{ marginTop: '0.5rem' }}><strong style={{ color: 'var(--primary-red)' }}>For Parts Drawing:</strong> Use PARTS templates (A1, A3, etc.)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="section-divider"></div>

            {/* Section a: Creating Orthographic View / Delete Views */}
            <div className={getStepClass('ov1-2')} onClick={() => toggleStep('ov1-2')}>
              <div className="step-header">
                <span className={`step-number ${completedSteps.has('ov1-2') ? 'completed' : ''}`}>
                  {completedSteps.has('ov1-2') ? <CheckCircle2 size={16} strokeWidth={3} /> : '2'}
                </span>
                <span className="step-label">CREATING ORTHOGRAPHIC VIEW / DELETE VIEWS</span>
              </div>
              <div className="step-description">
                <p className="p-flush">After selecting the <strong>Create Three-view Detail</strong> icon, the front view will prompt you to pick a point for location. Drag your cursor to add more views.</p>
                
                <div className="view-mapping-grid">
                  <div className="mapping-item">
                    <span className="mapping-direction">Upward</span>
                    <span className="mapping-result">⇒ Top View</span>
                  </div>
                  <div className="mapping-item">
                    <span className="mapping-direction">Downward</span>
                    <span className="mapping-result">⇒ Bottom View</span>
                  </div>
                  <div className="mapping-item">
                    <span className="mapping-direction">Left Direction</span>
                    <span className="mapping-result">⇒ Left View</span>
                  </div>
                  <div className="mapping-item">
                    <span className="mapping-direction">Right Direction</span>
                    <span className="mapping-result">⇒ Right View</span>
                  </div>
                </div>

                <div className="image-wrapper-flush">
                  <img src={createViewImg} alt="Creating Orthographic Views" className="software-screenshot screenshot-wide" />
                </div>

                <div className="info-box" style={{ marginTop: '1.5rem', borderLeft: '3px solid var(--text-muted)' }}>
                  <p className="p-flush note-red">
                    If the projected front view is wrong and needed to change, the <strong>Delete</strong> icon will delete all projected views at once at once (template, title block and BOM are not included).
                  </p>
                </div>
              </div>
            </div>

            <div className="section-divider"></div>

            {/* Section b: Scale */}
            <div className={getStepClass('ov1-3')} onClick={() => toggleStep('ov1-3')}>
              <div className="step-header">
                <span className={`step-number ${completedSteps.has('ov1-3') ? 'completed' : ''}`}>
                  {completedSteps.has('ov1-3') ? <CheckCircle2 size={16} strokeWidth={3} /> : '3'}
                </span>
                <span className="step-label">SCALE OF PROJECTION</span>
              </div>
              <div className="step-description">
                <p className="p-flush">Set the scale of the selected view using the <strong>Projection Properties</strong>. Do not change the scale on the tool bar as dimensions and notes will not update.</p>
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
