/**
 * 3D_Fairing.tsx  —  Fairing operations lessons (Chamfer, Fillet, Shell)
 */
import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Box as BoxIcon, CheckCircle2, Zap } from 'lucide-react';
import '../../styles/3D_Modeling/CourseLesson.css';
import '../../styles/3D_Modeling/CourseLesson.css';

// Fairing Assets
import fairingMenu from '../../assets/3D_Image_File/basic_operation(1)_move_rotate_copy_mirror_delete.jpg'; // This is the general menu, I'll check if there's a specific one or use a general one.
import chamferIcon from '../../assets/3D_Image_File/fairing_chamfer.jpg';
import chamferEntry from '../../assets/3D_Image_File/fairing_chamfer_1.jpg';
import chamferResult from '../../assets/3D_Image_File/fairing_chamfer_2.jpg';
import chamferResult2 from '../../assets/3D_Image_File/fairing_chamfer11.jpg';
import filletIcon from '../../assets/3D_Image_File/fairing_fillet_1.jpg';
import filletEntry from '../../assets/3D_Image_File/fairing_fillet_2.jpg';
import filletResult from '../../assets/3D_Image_File/fairing_fillet_3.jpg';
import shellIcon from '../../assets/3D_Image_File/fairing_shell_1.jpg';
import shellFaces from '../../assets/3D_Image_File/fairing_shell_2.jpg';
import shellEntry from '../../assets/3D_Image_File/fairing_shell_3.jpg';
import shellResult from '../../assets/3D_Image_File/fairing_shell_3.1.jpg';
import leftClick from '../../assets/3D_Image_File/left_click.jpg';

interface FairingLessonProps {
  onNextLesson?: () => void;
}

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

const FairingLesson: React.FC<FairingLessonProps> = ({ onNextLesson }) => {
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
                <div className="instruction-box">
                  <p className="p-flush">Use for creating chamfer dimensions.</p>
                </div>

                <div className={getStepClass('chamfer-1')} onClick={() => toggleStep('chamfer-1')}>
                  <div className="step-header">
                    <span className={`step-number ${completedSteps.has('chamfer-1') ? 'completed' : ''}`}>
                      {completedSteps.has('chamfer-1') ? <CheckCircle2 size={16} /> : '1'}
                    </span>
                    <span className="step-label">Select Tool</span>
                  </div>
                  <div className="step-description">
                    <p className="p-flush">Select <strong className="text-highlight">Chamfer edge</strong> from the icon menu.</p>
                  </div>
                  <div className="image-wrapper-flush">
                    <img src={chamferIcon} alt="Chamfer Icon" className="software-screenshot screenshot-small" />
                  </div>
                </div>

                <div className={getStepClass('chamfer-2')} onClick={() => toggleStep('chamfer-2')} style={{ marginTop: '1.5rem' }}>
                  <div className="step-header">
                    <span className={`step-number ${completedSteps.has('chamfer-2') ? 'completed' : ''}`}>
                      {completedSteps.has('chamfer-2') ? <CheckCircle2 size={16} /> : '2'}
                    </span>
                    <span className="step-label">Specify Length</span>
                  </div>
                  <div className="step-description">
                    <p className="p-flush">Specify chamfer length on the item entry.</p>
                  </div>
                  <div className="image-wrapper-flush">
                    <img src={chamferEntry} alt="Chamfer Item Entry" className="software-screenshot screenshot-medium" />
                  </div>
                </div>

                <div className={getStepClass('chamfer-3')} onClick={() => toggleStep('chamfer-3')} style={{ marginTop: '1.5rem' }}>
                  <div className="step-header">
                    <span className={`step-number ${completedSteps.has('chamfer-3') ? 'completed' : ''}`}>
                      {completedSteps.has('chamfer-3') ? <CheckCircle2 size={16} /> : '3'}
                    </span>
                    <span className="step-label">Select Edge</span>
                  </div>
                  <div className="step-description">
                    <div className="flex-row-center" style={{ gap: '1rem' }}>
                      <p className="p-flush">Select the edge of the entity to be chamfered &gt; <strong className="text-highlight">GO</strong></p>
                      <div className="image-wrapper-flush">
                        <img src={leftClick} alt="Left click" className="software-screenshot screenshot-click--inline" />
                      </div>
                    </div>
                    <p className="p-flush" style={{ marginTop: '0.5rem', color: 'var(--primary-red)', fontWeight: 'bold', fontSize: '0.85rem' }}>*Note: Several edges can be chamfered all at once.</p>
                  </div>
                  <div className="flex-row-center--wrap" style={{ marginTop: '1rem', gap: '1rem' }}>
                    <div className="image-wrapper-flush">
                      <img src={chamferResult} alt="Chamfer Result" className="software-screenshot screenshot-medium" />
                    </div>
                    <div className="image-wrapper-flush">
                      <img src={chamferResult2} alt="Chamfer Additional Result" className="software-screenshot screenshot-medium" />
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: '2rem' }}>
                  <ProTip title="Pro Tip: Chain Selection">
                    You can click multiple edges sequentially before hitting GO to chamfer them all simultaneously with the same length, saving valuable design time!
                  </ProTip>
                </div>
              </div>
            )}

            {activeTab === 'fillet' && (
              <div className="tab-pane fade-in">
                <div className="card-header"><h4>FILLET</h4></div>
                <div className="instruction-box">
                  <p className="p-flush">Use for rounding specified corners.</p>
                </div>

                <div className={getStepClass('fillet-1')} onClick={() => toggleStep('fillet-1')}>
                  <div className="step-header">
                    <span className={`step-number ${completedSteps.has('fillet-1') ? 'completed' : ''}`}>
                      {completedSteps.has('fillet-1') ? <CheckCircle2 size={16} /> : '1'}
                    </span>
                    <span className="step-label">Select Tool</span>
                  </div>
                  <div className="step-description">
                    <p className="p-flush">Select <strong className="text-highlight">Fillet edge</strong> from the icon menu.</p>
                  </div>
                  <div className="image-wrapper-flush">
                    <img src={filletIcon} alt="Fillet Icon" className="software-screenshot screenshot-small" />
                  </div>
                </div>

                <div className={getStepClass('fillet-2')} onClick={() => toggleStep('fillet-2')} style={{ marginTop: '1.5rem' }}>
                  <div className="step-header">
                    <span className={`step-number ${completedSteps.has('fillet-2') ? 'completed' : ''}`}>
                      {completedSteps.has('fillet-2') ? <CheckCircle2 size={16} /> : '2'}
                    </span>
                    <span className="step-label">Specify Radius</span>
                  </div>
                  <div className="step-description">
                    <p className="p-flush">Specify fillet radius on the item entry.</p>
                  </div>
                  <div className="image-wrapper-flush">
                    <img src={filletEntry} alt="Fillet Item Entry" className="software-screenshot screenshot-medium" />
                  </div>
                </div>

                <div className={getStepClass('fillet-3')} onClick={() => toggleStep('fillet-3')} style={{ marginTop: '1.5rem' }}>
                  <div className="step-header">
                    <span className={`step-number ${completedSteps.has('fillet-3') ? 'completed' : ''}`}>
                      {completedSteps.has('fillet-3') ? <CheckCircle2 size={16} /> : '3'}
                    </span>
                    <span className="step-label">Select Edge</span>
                  </div>
                  <div className="step-description">
                    <div className="flex-row-center" style={{ gap: '1rem' }}>
                      <p className="p-flush">Select the edge of the entity to be fillet &gt; <strong className="text-highlight">GO</strong></p>
                      <div className="image-wrapper-flush">
                        <img src={leftClick} alt="Left click" className="software-screenshot screenshot-click--inline" />
                      </div>
                    </div>
                    <p className="p-flush" style={{ marginTop: '0.5rem', color: 'var(--primary-red)', fontWeight: 'bold', fontSize: '0.85rem' }}>*Note: Several edges can be fillet all at once.</p>
                  </div>
                  <div className="image-wrapper-flush" style={{ marginTop: '1rem' }}>
                    <img src={filletResult} alt="Fillet Result" className="software-screenshot screenshot-medium" />
                  </div>
                </div>

                <div style={{ marginTop: '2rem' }}>
                  <ProTip title="Pro Tip: Safety and Aesthetics">
                    Fillets are not only aesthetically pleasing but are critical for making manufactured parts safe to handle by removing sharp edges (deburring) in the final product.
                  </ProTip>
                </div>
              </div>
            )}

            {activeTab === 'shell' && (
              <div className="tab-pane fade-in">
                <div className="card-header"><h4>SHELL</h4></div>
                <div className="instruction-box">
                  <p className="p-flush">Use for hollowing solid entities using the specified wall thickness.</p>
                </div>

                <div className={getStepClass('shell-1')} onClick={() => toggleStep('shell-1')}>
                  <div className="step-header">
                    <span className={`step-number ${completedSteps.has('shell-1') ? 'completed' : ''}`}>
                      {completedSteps.has('shell-1') ? <CheckCircle2 size={16} /> : '1'}
                    </span>
                    <span className="step-label">Select Tool</span>
                  </div>
                  <div className="step-description">
                    <p className="p-flush">Select <strong className="text-highlight">Shell</strong> from the icon menu.</p>
                  </div>
                  <div className="image-wrapper-flush">
                    <img src={shellIcon} alt="Shell Icon" className="software-screenshot screenshot-small" />
                  </div>
                </div>

                <div className={getStepClass('shell-2')} onClick={() => toggleStep('shell-2')} style={{ marginTop: '1.5rem' }}>
                  <div className="step-header">
                    <span className={`step-number ${completedSteps.has('shell-2') ? 'completed' : ''}`}>
                      {completedSteps.has('shell-2') ? <CheckCircle2 size={16} /> : '2'}
                    </span>
                    <span className="step-label">Select Faces</span>
                  </div>
                  <div className="step-description">
                    <div className="flex-row-center" style={{ gap: '1rem' }}>
                      <p className="p-flush">Select the two endfaces of the solid entity &gt; </p>
                      <div className="image-wrapper-flush">
                        <img src={leftClick} alt="Left click" className="software-screenshot screenshot-click--inline" />
                      </div>
                    </div>
                  </div>
                  <div className="image-wrapper-flush" style={{ marginTop: '1rem' }}>
                    <img src={shellFaces} alt="Select Endfaces" className="software-screenshot screenshot-medium" />
                  </div>
                </div>

                <div className={getStepClass('shell-3')} onClick={() => toggleStep('shell-3')} style={{ marginTop: '1.5rem' }}>
                  <div className="step-header">
                    <span className={`step-number ${completedSteps.has('shell-3') ? 'completed' : ''}`}>
                      {completedSteps.has('shell-3') ? <CheckCircle2 size={16} /> : '3'}
                    </span>
                    <span className="step-label">Set Thickness</span>
                  </div>
                  <div className="step-description">
                    <div className="flex-row-center" style={{ gap: '1rem' }}>
                      <p className="p-flush">Specify thickness on item entry &gt; double <strong className="text-highlight">GO</strong></p>
                      <div className="image-wrapper-flush">
                        <img src={leftClick} alt="Left click" className="software-screenshot screenshot-click--inline" />
                      </div>
                    </div>
                  </div>
                  <div className="flex-row-center--wrap" style={{ marginTop: '1rem', gap: '1rem' }}>
                    <div className="image-wrapper-flush">
                      <img src={shellEntry} alt="Shell Thickness Entry" className="software-screenshot screenshot-medium" />
                    </div>
                    <div className="image-wrapper-flush">
                      <img src={shellResult} alt="Shell Result" className="software-screenshot screenshot-medium" />
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: '2rem' }}>
                  <ProTip title="Pro Tip: Open vs Closed Shell">
                    If you don't select any faces to remove, shell will hollow out the inside leaving a completely closed solid. Selecting a face basically "removes" it to create the opening!
                  </ProTip>
                </div>
              </div>
            )}
          </div>

          <div className="lesson-navigation">
            <button className="nav-button" onClick={handlePrev} disabled={activeTab === 'chamfer'}><ChevronLeft size={18} /> Previous</button>
            <button className="nav-button next" onClick={handleNext}>{activeTab === 'shell' ? 'Finish' : 'Next'} <ChevronRight size={18} /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FairingLesson;
