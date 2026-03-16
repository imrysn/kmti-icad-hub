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
          {isMirrored1 ? 'MIRRORED PARTS (1)' : 'MIRRORED PARTS (2)'}
        </h3>
        <p className="p-flush">
          {isMirrored1 
            ? 'Based on KEMCO Standard, we distinguish between Normal Parts and Mirror Parts based on their symmetry and drawing numbers.' 
            : 'Technical procedure for creating mirror copies and identifying symmetry in 3D modeling.'}
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
                    
                    <div className="flex-row-center" style={{ gap: '2rem', marginTop: '1.5rem', justifyContent: 'flex-start' }}>
                      <div className="drawing-number-box" style={{ padding: '0.5rem 1rem', border: '1px solid var(--border-color)', borderRadius: '4px' }}>
                        RTXXXXXX<strong style={{ color: 'var(--primary-red)', textDecoration: 'underline' }}>N</strong>01
                      </div>
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
                    <p className="p-flush">Parts that are symmetrically the same, but not identical.</p>
                    <p className="p-flush" style={{ marginTop: '0.5rem' }}>Mirror parts have drawing number with <strong className="text-highlight">A</strong> and <strong className="text-highlight">B</strong>.</p>
                    
                    <ul className="interaction-list--plain" style={{ marginTop: '1rem', color: 'var(--text-muted)' }}>
                      <li>• Mirror Parts <strong className="text-highlight">A</strong> are the original part.</li>
                      <li>• Mirror Parts <strong className="text-highlight">B</strong> are the mirror copy of Mirror Parts A.</li>
                      <li>• Mirror Parts B cannot exist without Mirror Parts A.</li>
                    </ul>

                    <div className="flex-row--top" style={{ gap: '2rem', marginTop: '2rem' }}>
                      <div style={{ flex: 1, textAlign: 'center' }}>
                        <div className="image-wrapper-flush">
                          <img src={mirrorPartA} alt="Mirror Part A and B" className="software-screenshot screenshot-large" />
                        </div>
                        <div className="flex-row-center" style={{ gap: '4rem', marginTop: '1rem', justifyContent: 'center' }}>
                          <p className="p-flush">RTXXXXXX<strong style={{ color: 'var(--primary-red)', textDecoration: 'underline' }}>A</strong>01</p>
                          <p className="p-flush">RTXXXXXX<strong style={{ color: 'var(--primary-red)', textDecoration: 'underline' }}>B</strong>01</p>
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
                    <span className="step-label">Checking Symmetry</span>
                  </div>
                  <div className="step-description" style={{ paddingLeft: '2.5rem' }}>
                    <div className="flex-row-center" style={{ gap: '1rem', marginBottom: '1.5rem' }}>
                      <p className="p-flush">Use the <strong className="text-highlight">Mirror copy tool</strong> on the parent and place it over the original.</p>
                      <img src={mirrorCopyTool} alt="Mirror Copy Tool" className="software-screenshot screenshot-click--inline" style={{ border: '1px solid var(--primary-red)' }} />
                    </div>
                    
                    <div className="info-box" style={{ background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid var(--primary-red)' }}>
                      <ul className="interaction-list--plain">
                        <li style={{ marginBottom: '0.5rem' }}>• If details align perfectly (holes, cutouts), it's a <strong className="text-highlight">Normal Part (N)</strong>.</li>
                        <li>• If features are offset and the part cannot be rotated to match, it's a <strong className="text-highlight">Mirror Part (A/B)</strong>.</li>
                      </ul>
                    </div>

                    <div className="flex-row-center" style={{ marginTop: '2rem', gap: '2rem', justifyContent: 'flex-start' }}>
                      <div style={{ border: '2px solid var(--primary-red)', padding: '1rem', borderRadius: '4px' }}>
                        <p className="p-flush" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>勝手違い</p>
                      </div>
                      <p className="p-flush" style={{ color: 'var(--primary-red)', fontWeight: 'bold', fontSize: '1.2rem' }}>Mirror Image</p>
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
                    <span className="step-label">Select Mirror Tool</span>
                  </div>
                  <div className="step-description" style={{ paddingLeft: '2.5rem' }}>
                    <div className="flex-row-center" style={{ gap: '1rem', justifyContent: 'flex-start', marginTop: '0.5rem' }}>
                      <p className="p-flush">Select the <strong className="text-highlight">Mirror</strong> tool from the component operations menu.</p>
                      <img src={mirrorTool} alt="Mirror Tool" className="software-screenshot screenshot-click--inline" />
                    </div>
                  </div>
                </div>

                <div className={getStepClass('mp2-2')} onClick={() => toggleStep('mp2-2')} style={{ marginTop: '2.5rem' }}>
                  <div className="step-header">
                    <span className={`step-number ${completedSteps.has('mp2-2') ? 'completed' : ''}`}>
                      {completedSteps.has('mp2-2') ? <CheckCircle2 size={16} /> : '2'}
                    </span>
                    <span className="step-label">Pick 3 Points to define the Mirror Plane</span>
                  </div>
                  <div className="step-description" style={{ paddingLeft: '2.5rem' }}>
                    <div className="flex-row--top" style={{ gap: '2rem', marginTop: '1rem' }}>
                      <div style={{ flex: 1 }}>
                        <p className="p-flush">Define the plane by picking three points on the original part or drafting space.</p>
                        <div className="image-wrapper-flush" style={{ marginTop: '1rem' }}>
                          <img src={pick3PointsPartA} alt="Picking Points on Part A" className="software-screenshot screenshot-medium" />
                        </div>
                      </div>
                      <div style={{ flex: 1 }}>
                        <div className="image-wrapper-flush">
                          <img src={pick3Points} alt="Mirror Plane Visualization" className="software-screenshot screenshot-medium" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={getStepClass('mp2-3')} onClick={() => toggleStep('mp2-3')} style={{ marginTop: '2.5rem' }}>
                  <div className="step-header">
                    <span className={`step-number ${completedSteps.has('mp2-3') ? 'completed' : ''}`}>
                      {completedSteps.has('mp2-3') ? <CheckCircle2 size={16} /> : '3'}
                    </span>
                    <span className="step-label">Check Location of Origin</span>
                  </div>
                  <div className="step-description" style={{ paddingLeft: '2.5rem' }}>
                    <div className="flex-row--top" style={{ gap: '2rem', marginTop: '1rem' }}>
                      <div style={{ flex: 1 }}>
                        <p className="p-flush">Ensure the origin of the mirrored part is correctly positioned relative to the parent assembly.</p>
                        <p className="text-muted" style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
                          The origin should realistically represent the zero-point for machining the mirrored version.
                        </p>
                      </div>
                      <div className="image-wrapper-flush">
                        <img src={originLocation} alt="Location of Origin" className="software-screenshot screenshot-medium" />
                      </div>
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
