/**
 * 3D_MirroredPart.tsx — Lessons on Normal vs Mirrored Parts
 */
import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Info, Play, Move, CheckCircle2, Zap } from 'lucide-react';
import '../../styles/3D_Modeling/CourseLesson.css';

// Shared Assets
import leftClick from '../../assets/3D_Image_File/left_click.jpg';

// Mirrored Part (1) Assets
import mirrorCopyTool from '../../assets/3D_Image_File/mirrored_part(1)_mirror_copy_tool.jpg';
import mirrorImageText from '../../assets/3D_Image_File/mirrored_part(1)_mirror_image.jpg';
import mirrorPartA from '../../assets/3D_Image_File/mirrored_part(1)_mirror_part.jpg';
import normalPartA from '../../assets/3D_Image_File/mirrored_part(1)_normal_part.jpg';
import mirrorNotes from '../../assets/3D_Image_File/mirrored_notes.jpg';

// Mirrored Part (2) Assets
import originLocation from '../../assets/3D_Image_File/mirrored_part(2)_location_of_origin.jpg';
import mirrorTool from '../../assets/3D_Image_File/mirrored_part(2)_mirror.jpg';
import pick3Points from '../../assets/3D_Image_File/mirrored_part(2)_pick3_points.jpg';
import pick3PointsPartA from '../../assets/3D_Image_File/mirrored_part(2)_pick3_points_part_a.jpg';

interface MirroredPartLessonProps {
  subLessonId?: string;
  onNextLesson?: () => void;
}

const MirroredPartLesson: React.FC<MirroredPartLessonProps> = ({ subLessonId = 'mirrored-1', onNextLesson }) => {
  const isMirrored1 = subLessonId === 'mirrored-1';
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
    <div className="course-lesson-container" ref={containerRef}>
      {/* Sticky Progress Bar */}
      <div className="lesson-progress-container">
        <div
          className="lesson-progress-bar"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>      <section className="lesson-intro">
        <h3 className="section-title">
          <Play size={28} className="lesson-intro-icon" />
          {isMirrored1 ? 'MIRRORED PARTS (1)' : '3D MODELING OF MIRROR PARTS'}
        </h3>
        <p className="p-flush">
          {isMirrored1
            ? 'Based on KEMCO Standard'
            : ''}
        </p>
      </section>

      <div className="lesson-grid single-card">
        <div className="lesson-card">
          <div className="lesson-content">
            {isMirrored1 ? (
              <div className="tab-pane">
                {/* NORMAL PARTS */}
                <div className={getStepClass('mp1-1')} onClick={() => toggleStep('mp1-1')}>
                  <div className="step-header">
                    <span className={`step-number ${completedSteps.has('mp1-1') ? 'completed' : ''}`}>
                      {completedSteps.has('mp1-1') ? <CheckCircle2 size={16} /> : '1'}
                    </span>
                    <span className="step-label" style={{ color: 'var(--primary-red)' }}>NORMAL PARTS</span>
                  </div>
                  <div className="step-description" style={{ paddingLeft: '2.5rem' }}>
                    <p className="p-flush">Parts that are exactly the same as the original part if you create a mirror copy of it. No changes will be recognized.</p>
                    <p className="p-flush" style={{ marginTop: '0.5rem' }}>Normal parts have drawing number with <strong className="text-highlight">N</strong>.</p>
                    <div className="drawing-number-box" style={{ padding: '0.5rem 1rem', display: 'inline-block', marginTop: '0rem' }}>
                      RTXXXXXX<strong style={{ color: 'var(--primary-red)', textDecoration: 'underline' }}>N</strong>01
                    </div>
                    <p className="p-flush" style={{ marginTop: '0.5rem' }}>Here is an example of a normal part.</p>

                    <div className="flex-row-center" style={{ gap: '2rem', marginTop: '1.5rem', justifyContent: 'flex-start' }}>
                      <div className="image-wrapper-flush">
                        <img src={normalPartA} alt="Normal Part Example" className="software-screenshot screenshot-medium" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="section-divider"></div>

                {/* MIRROR PARTS */}
                <div className={getStepClass('mp1-2')} onClick={() => toggleStep('mp1-2')}>
                  <div className="step-header">
                    <span className={`step-number ${completedSteps.has('mp1-2') ? 'completed' : ''}`}>
                      {completedSteps.has('mp1-2') ? <CheckCircle2 size={16} /> : '2'}
                    </span>
                    <span className="step-label" style={{ color: 'var(--primary-red)' }}>MIRROR PARTS</span>
                  </div>
                  <div className="step-description" style={{ paddingLeft: '2.5rem' }}>
                    <p className="p-flush">Parts that are symmetrically the same.</p>
                    <p className="p-flush" style={{ marginTop: '0.5rem' }}>Mirror parts have drawing number with <strong className="text-highlight">A</strong> and <strong className="text-highlight">B</strong>.</p>
                    <div className="flex-column" style={{ gap: '0.5rem', marginTop: '0.5rem', alignItems: 'flex-start' }}>
                      <div className="drawing-number-box" style={{ padding: '0.5rem 1rem', display: 'inline-block' }}>
                        RTXXXXX<strong style={{ color: 'var(--primary-red)', textDecoration: 'underline' }}>A</strong>01
                      </div>
                      <div className="drawing-number-box" style={{ padding: '0.5rem 1rem', display: 'inline-block' }}>
                        RTXXXXX<strong style={{ color: 'var(--primary-red)', textDecoration: 'underline' }}>B</strong>01
                      </div>
                    </div>
                    <p className="p-flush" style={{ marginTop: '0.5rem' }}>Here is an example of a mirror part.</p>

                    <ul className="interaction-list--plain" style={{ marginTop: '1rem', color: 'var(--text-muted)' }}>
                      <li>Mirror Parts <strong className="text-highlight">A</strong> are the original part.</li>
                      <li>Mirror Parts <strong className="text-highlight">B</strong> are the mirror copy of Mirror Parts A.</li>
                      <li>Mirror Parts B cannot exist without Mirror Parts A.</li>
                    </ul>
                    <p className="p-flush" style={{ marginTop: '0.5rem' }}><strong>Note:</strong> If there are no existing part to be mirrored, use <strong style={{ color: 'var(--primary-red)', textDecoration: 'underline' }}>A</strong> when naming the part.</p>
                    <p className="p-flush" style={{ marginTop: '0.5rem' }}>Here is an example of mirror parts.</p>

                    <div className="flex-row--top" style={{ gap: '2rem', marginTop: '2rem' }}>
                      <div style={{ flex: 1, textAlign: 'center' }}>
                        <div className="image-wrapper-flush">
                          <img src={mirrorPartA} alt="Mirror Part A and B" className="software-screenshot screenshot-large" />
                        </div>

                      </div>
                    </div>
                  </div>
                </div>

                <div className="section-divider"></div>

                {/* IDENTIFICATION */}
                <div className={getStepClass('mp1-3')} onClick={() => toggleStep('mp1-3')}>
                  <div className="step-header">
                    <span className={`step-number ${completedSteps.has('mp1-3') ? 'completed' : ''}`}>
                      {completedSteps.has('mp1-3') ? <CheckCircle2 size={16} /> : '3'}
                    </span>
                    <span className="step-label">To check if a part is normal or mirror part:</span>
                  </div>
                  <div className="step-description" style={{ paddingLeft: '2.5rem' }}>
                    <div style={{ marginBottom: '1.5rem' }}>
                      <p className="p-flush">Use Mirror copy tool on the icon menu.</p>
                      <div className="image-wrapper-flush" style={{ marginTop: '1rem' }}>
                        <img src={mirrorCopyTool} alt="Mirror Copy Tool" className="software-screenshot screenshot-medium" style={{ border: '1px solid var(--primary-red)' }} />
                      </div>
                    </div>

                    <div className="info-box" style={{ background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid var(--primary-red)' }}>
                      <p className="p-flush"><strong>Place mirror copy over the original part.</strong></p>
                      <ul className="interaction-list--plain">
                        <li style={{ marginBottom: '0.5rem' }}>If there are no changes or the part details are all exaclty the same, it is a Normal Part.</li>
                        <li>If there are changes that can be recognize like hole location, cutouts or fairings and if its function as a part can no longer be the same as the function of Mirror Part A, it is a Mirror Part.</li>
                      </ul>
                      <p className="p-flush"><strong>NOTE:</strong> Be careful in identifying Normal and Mirror parts because it may cause trouble in assigning of drawing numbers.</p>
                      <p className="p-flush"><strong>NOTE:</strong> Be careful if you see this note on the reference drawings: This means <strong>Mirror Image</strong></p>
                    </div>

                    <div className="image-wrapper-flush" style={{ marginLeft: '1.5rem' }}>
                      <img src={mirrorNotes} alt="Mirror Image Notes" className="software-screenshot screenshot-small" />
                    </div>


                  </div>
                </div>

                <div style={{ marginTop: '2rem' }}>

                </div>
              </div>
            ) : (
              <div className="tab-pane">
                <h4 className="section-title">MIRRORING PROCEDURE</h4>

                <div className={getStepClass('mp2-1')} onClick={() => toggleStep('mp2-1')}>
                  <div className="step-header">
                    <span className={`step-number ${completedSteps.has('mp2-1') ? 'completed' : ''}`}>
                      {completedSteps.has('mp2-1') ? <CheckCircle2 size={16} /> : '1'}
                    </span>
                    <span className="step-label">Identify the proper location of origin of the part.</span>
                  </div>
                  <div className="step-description" style={{ paddingLeft: '2.5rem' }}>
                    <div className="image-wrapper-flush" style={{ marginTop: '1rem' }}>
                      <img src={pick3PointsPartA} alt="Picking Points on Part A" className="software-screenshot screenshot-large" />
                    </div>
                  </div>
                </div>

                <div className={getStepClass('mp2-2')} onClick={() => toggleStep('mp2-2')} style={{ marginTop: '1.5rem' }}>
                  <div className="step-header">
                    <span className={`step-number ${completedSteps.has('mp2-2') ? 'completed' : ''}`}>
                      {completedSteps.has('mp2-2') ? <CheckCircle2 size={16} /> : '2'}
                    </span>
                    <span className="step-label">After doing 3D modeling of the part, Save it as <strong>Part A</strong></span>
                  </div>
                  <div className="step-description" style={{ paddingLeft: '2.5rem' }}>
                    <div className="flex-row--top" style={{ gap: '2rem', marginTop: '0rem' }}>
                      <div style={{ flex: 1 }}>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={getStepClass('mp2-3')} onClick={() => toggleStep('mp2-3')} style={{ marginTop: '2.5rem' }}>
                  <div className="step-header">
                    <span className={`step-number ${completedSteps.has('mp2-3') ? 'completed' : ''}`}>
                      {completedSteps.has('mp2-3') ? <CheckCircle2 size={16} /> : '3'}
                    </span>
                    <span className="step-label">In doing the 3D model of the mirror part, Part A must be saved to another file as Part B.</span>
                  </div>
                  <div className="step-description" style={{ paddingLeft: '2.5rem' }}>
                    <div className="flex-row--top" style={{ gap: '2rem', marginTop: '0rem' }}>
                    </div>
                  </div>
                </div>

                {/* STEP 4 */}
                <div className={getStepClass('mp2-4')} onClick={() => toggleStep('mp2-4')} style={{ marginTop: '2.5rem' }}>
                  <div className="step-header">
                    <span className={`step-number ${completedSteps.has('mp2-4') ? 'completed' : ''}`}>
                      {completedSteps.has('mp2-4') ? <CheckCircle2 size={16} /> : '4'}
                    </span>
                    <span className="step-label">Use mirror to convert the 3D Model of Part A to Part B.</span>
                  </div>
                  <div className="step-description" style={{ paddingLeft: '2.5rem' }}>
                    <div className="image-wrapper-flush" style={{ marginTop: '1rem' }}>
                      <img src={mirrorTool} alt="Mirror Tool" className="software-screenshot screenshot-small" />
                    </div>
                    <div style={{ marginTop: '1rem' }}>
                      <p className="p-flush">
                        Pick 3 points consecutively from the Part, <strong style={{ textDecoration: 'underline' }}>starting from the origin.</strong>
                      </p>
                      <div className="image-wrapper-flush">
                        <img src={pick3Points} alt="Mirror Plane Visualization" className="software-screenshot screenshot-medium" />
                      </div>

                      <p className="p-flush" style={{ marginTop: '0.5rem' }}>
                        After doing the command, this will be the outcome as Part B.
                      </p>
                      <div className="image-wrapper-flush">
                        <img src={originLocation} alt="Location of Origin" className="software-screenshot screenshot-large" />
                      </div>
                      <p className="p-flush" style={{ marginTop: '0.5rem' }}>
                        <strong>Note:</strong> The <strong style={{ textDecoration: 'underline' }}>Origin Part B</strong> must be the <strong style={{ textDecoration: 'underline' }}>same location as in Part A.</strong>
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            )}
          </div>

          <div className="lesson-navigation">
            <button className="nav-button" disabled={isMirrored1}>
              <ChevronLeft size={18} /> Previous
            </button>
            <button className="nav-button next" onClick={onNextLesson}>
              {isMirrored1 ? 'Next Lesson' : 'Finish'} <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MirroredPartLesson;
