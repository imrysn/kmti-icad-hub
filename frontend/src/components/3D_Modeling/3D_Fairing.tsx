/**
 * 3D_Fairing.tsx   E Fairing operations lessons (Chamfer, Fillet, Shell)
 */
import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Box as BoxIcon, CheckCircle2, Zap } from 'lucide-react';
import '../../styles/3D_Modeling/CourseLesson.css';
import '../../styles/3D_Modeling/CourseLesson.css';

// Fairing Assets
import fairingMenu from '../../assets/3D_Image_File/basic_operation(1)_move_rotate_copy_mirror_delete.png';  // This is the general
import chamferIcon from '../../assets/3D_Image_File/fairing_chamfer.png';
import chamferEntry from '../../assets/3D_Image_File/fairing_chamfer_1.png';
import chamferResult from '../../assets/3D_Image_File/fairing_chamfer_2.png';
import chamferResult2 from '../../assets/3D_Image_File/fairing_chamfer11.png';
import filletIcon from '../../assets/3D_Image_File/fairing_fillet_1.png';
import filletEntry from '../../assets/3D_Image_File/fairing_fillet_2.png';
import filletResult from '../../assets/3D_Image_File/fairing_fillet_3.png';
import shellIcon from '../../assets/3D_Image_File/fairing_shell_1.png';
import shellFaces from '../../assets/3D_Image_File/fairing_shell_2.png';
import shellEntry from '../../assets/3D_Image_File/fairing_shell_3.png';
import shellResult from '../../assets/3D_Image_File/fairing_shell_3.1.png';
import leftClick from '../../assets/3D_Image_File/left_click.png';

interface FairingLessonProps {
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const FairingLesson: React.FC<FairingLessonProps> = ({ onNextLesson, onPrevLesson }) => {
  const [activeTab, setActiveTab] = useState<'chamfer' | 'fillet' | 'shell'>('chamfer');
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
  }, []);

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

  const handleNext = () => {
    if (activeTab === 'chamfer') setActiveTab('fillet');
    else if (activeTab === 'fillet') setActiveTab('shell');
    else if (onNextLesson) onNextLesson();
  };

  const handlePrev = () => {
    if (activeTab === 'fillet') setActiveTab('chamfer');
    else if (activeTab === 'shell') setActiveTab('fillet');
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
        <h3>FAIRING</h3>
        <div className="instruction-box">
          <div className="image-wrapper-flush">
            <img src={chamferIcon} alt="Fairing Menu" className="software-screenshot screenshot-small" />
          </div>
        </div>
      </section>

      <div className="lesson-grid single-card">
        <div className="lesson-card tab-content">
          <div className="lesson-tabs">
            <button key="chamfer" className={`tab-button ${activeTab === 'chamfer' ? 'active' : ''}`} onClick={() => setActiveTab('chamfer')}>Chamfer</button>
            <button key="fillet" className={`tab-button ${activeTab === 'fillet' ? 'active' : ''}`} onClick={() => setActiveTab('fillet')}>Fillet</button>
            <button key="shell" className={`tab-button ${activeTab === 'shell' ? 'active' : ''}`} onClick={() => setActiveTab('shell')}>Shell</button>
          </div>

          <div className="tab-content-area">
            {activeTab === 'chamfer' && (
              <div className="tab-pane fade-in">
                <div className="card-header"><h4>CHAMFER</h4></div>
                <p style={{ margin: '1rem' }}>Use for creating chamfer dimensions.</p>

                <div className={getStepClass('chamfer-1')} onClick={() => toggleStep('chamfer-1')}>
                  <div className="step-header">
                    <span className={`step-number ${completedSteps.has('chamfer-1') ? 'completed' : ''}`}>
                      {completedSteps.has('chamfer-1') ? <CheckCircle2 size={16} /> : '1'}
                    </span>
                    <span className="step-label">Select <strong className="text-highlight">Chamfer edge</strong> from the icon menu.</span>
                  </div>
                  <div className="step-description">
                    <div className="image-wrapper-flush">
                      <img src={chamferEntry} alt="Chamfer Item Entry" className="software-screenshot screenshot-medium" />
                    </div>
                  </div>
                </div>

                <div className={getStepClass('chamfer-2')} onClick={() => toggleStep('chamfer-2')} style={{ marginTop: '1.5rem' }}>
                  <div className="step-header">
                    <span className={`step-number ${completedSteps.has('chamfer-2') ? 'completed' : ''}`}>
                      {completedSteps.has('chamfer-2') ? <CheckCircle2 size={16} /> : '2'}
                    </span>
                    <span className="step-label">Specify chamfer length on the item entry.</span>
                  </div>
                  <div className="step-description">
                    <div className="image-wrapper-flush">
                      <img src={chamferResult} alt="Chamfer Result" className="software-screenshot screenshot-large" />
                    </div>
                  </div>

                </div>

                <div className={getStepClass('chamfer-3')} onClick={() => toggleStep('chamfer-3')} style={{ marginTop: '1.5rem' }}>
                  <div className="step-header">
                    <span className={`step-number ${completedSteps.has('chamfer-3') ? 'completed' : ''}`}>
                      {completedSteps.has('chamfer-3') ? <CheckCircle2 size={16} /> : '3'}
                    </span>
                    <span className="step-label">Select the edge of the entity to be chamfered &gt; <strong className="text-highlight">GO</strong> <img src={leftClick} alt="Left click" className="software-screenshot screenshot-click--inline" style={{ verticalAlign: 'middle', marginLeft: '0.25rem' }} /></span>
                  </div>
                  <div className="step-description" style={{ paddingLeft: '2.5rem' }}>
                    <p className="p-flush" style={{ color: 'var(--primary-red)', fontWeight: 'bold', fontSize: '0.85rem' }}>*Note: Several edges can be chamfered all at once.</p>
                  </div>
                </div>

                <div className="section-divider"></div>

                <div className="tool-block">
                  <h4 className="section-title">RESULT</h4>
                  <div className="flex-row-center--wrap" style={{ gap: '1rem' }}>
                    <div className="image-wrapper-flush">
                      <img src={chamferResult2} alt="Chamfer Additional Result" className="software-screenshot screenshot-large" />
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: '2rem' }}></div>
              </div>
            )}

            {activeTab === 'fillet' && (
              <div className="tab-pane fade-in">
                <div className="card-header"><h4>FILLET</h4></div>
                <p style={{ marginBottom: '1rem' }}>Use for rounding specified corners.</p>

                <div className={getStepClass('fillet-1')} onClick={() => toggleStep('fillet-1')}>
                  <div className="step-header">
                    <span className={`step-number ${completedSteps.has('fillet-1') ? 'completed' : ''}`}>
                      {completedSteps.has('fillet-1') ? <CheckCircle2 size={16} /> : '1'}
                    </span>
                    <span className="step-label">Select <strong className="text-highlight">Fillet edge</strong> from the icon menu.</span>
                  </div>
                  <div className="step-description">
                    <div className="image-wrapper-flush">
                      <img src={filletIcon} alt="Fillet Icon" className="software-screenshot screenshot-small" />
                    </div>
                  </div>
                </div>

                <div className={getStepClass('fillet-2')} onClick={() => toggleStep('fillet-2')} style={{ marginTop: '1.5rem' }}>
                  <div className="step-header">
                    <span className={`step-number ${completedSteps.has('fillet-2') ? 'completed' : ''}`}>
                      {completedSteps.has('fillet-2') ? <CheckCircle2 size={16} /> : '2'}
                    </span>
                    <span className="step-label">Specify fillet radius on the item entry.</span>
                  </div>
                  <div className="step-description">
                    <div className="image-wrapper-flush">
                      <img src={filletEntry} alt="Fillet Item Entry" className="software-screenshot screenshot-large" />
                    </div>
                  </div>
                </div>

                <div className={getStepClass('fillet-3')} onClick={() => toggleStep('fillet-3')} style={{ marginTop: '1.5rem' }}>
                  <div className="step-header">
                    <span className={`step-number ${completedSteps.has('fillet-3') ? 'completed' : ''}`}>
                      {completedSteps.has('fillet-3') ? <CheckCircle2 size={16} /> : '3'}
                    </span>
                    <span className="step-label">Select the edge of the entity to be fillet &gt; <strong className="text-highlight">GO</strong> <img src={leftClick} alt="Left click" className="software-screenshot screenshot-click--inline" style={{ verticalAlign: 'middle', marginLeft: '0.25rem' }} /></span>
                  </div>
                  <div className="step-description" style={{ paddingLeft: '2.5rem' }}>
                    <p className="p-flush" style={{ color: 'var(--primary-red)', fontWeight: 'bold', fontSize: '0.85rem' }}>*Note: Several edges can be fillet all at once.</p>
                  </div>
                </div>

                <div className="section-divider"></div>

                <div className="tool-block">
                  <h4 className="section-title">RESULT</h4>
                  <div className="flex-row-center--wrap" style={{ gap: '1rem' }}>
                    <div className="image-wrapper-flush">
                      <img src={filletResult} alt="Fillet Result" className="software-screenshot screenshot-medium" />
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: '2rem' }}></div>
              </div>
            )}

            {activeTab === 'shell' && (
              <div className="tab-pane fade-in">
                <div className="card-header"><h4>SHELL</h4></div>
                <p style={{ marginBottom: '1rem' }}>Use for hollowing solid entities using the specified wall thickness.</p>

                <div className={getStepClass('shell-1')} onClick={() => toggleStep('shell-1')}>
                  <div className="step-header">
                    <span className={`step-number ${completedSteps.has('shell-1') ? 'completed' : ''}`}>
                      {completedSteps.has('shell-1') ? <CheckCircle2 size={16} /> : '1'}
                    </span>
                    <span className="step-label">Select <strong className="text-highlight">Shell</strong> from the icon menu.</span>
                  </div>
                  <div className="step-description">
                    <div className="image-wrapper-flush">
                      <img src={shellIcon} alt="Shell Icon" className="software-screenshot screenshot-small" />
                    </div>
                  </div>
                </div>

                <div className={getStepClass('shell-2')} onClick={() => toggleStep('shell-2')} style={{ marginTop: '1.5rem' }}>
                  <div className="step-header">
                    <span className={`step-number ${completedSteps.has('shell-2') ? 'completed' : ''}`}>
                      {completedSteps.has('shell-2') ? <CheckCircle2 size={16} /> : '2'}
                    </span>
                    <span className="step-label">Select the two endfaces of the solid entity &gt; GO<img src={leftClick} alt="Left click" className="software-screenshot screenshot-click--inline" style={{ verticalAlign: 'middle', marginLeft: '0.25rem' }} /></span>
                  </div>
                  <div className="step-description">
                    <div className="image-wrapper-flush" style={{ marginTop: '1rem' }}>
                      <img src={shellFaces} alt="Select Endfaces" className="software-screenshot screenshot-medium" />
                    </div>
                  </div>
                </div>

                <div className={getStepClass('shell-3')} onClick={() => toggleStep('shell-3')} style={{ marginTop: '1.5rem' }}>
                  <div className="step-header">
                    <span className={`step-number ${completedSteps.has('shell-3') ? 'completed' : ''}`}>
                      {completedSteps.has('shell-3') ? <CheckCircle2 size={16} /> : '3'}
                    </span>
                    <span className="step-label">Specify thickness on item entry &gt; double <strong className="text-highlight">GO</strong> <img src={leftClick} alt="Left click" className="software-screenshot screenshot-click--inline" style={{ verticalAlign: 'middle', marginLeft: '0.25rem' }} /></span>
                  </div>
                  <div className="step-description">
                    <div className="image-wrapper-flush" style={{ marginTop: '1rem' }}>
                      <img src={shellEntry} alt="Shell Thickness Entry" className="software-screenshot screenshot-large" />
                    </div>
                  </div>
                </div>

                <div className="section-divider"></div>

                <div className="tool-block">
                  <h4 className="section-title">RESULT</h4>
                  <div className="flex-row-center--wrap" style={{ gap: '1rem' }}>
                    <div className="image-wrapper-flush">
                      <img src={shellResult} alt="Shell Result" className="software-screenshot screenshot-medium" />
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: '2rem' }}></div>
              </div>
            )}
          </div>

          <div className="lesson-navigation">
            <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button>
            <button className="nav-button next" onClick={handleNext}>{activeTab === 'shell' ? 'Next Lesson' : 'Next'} <ChevronRight size={18} /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FairingLesson;
