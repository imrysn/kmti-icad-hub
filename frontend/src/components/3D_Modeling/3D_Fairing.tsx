/** * 3D_Fairing.tsx — Fairing operations lessons (Chamfer, Fillet, Shell) */

import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Box as BoxIcon, Zap } from 'lucide-react';
import { ReadAloudButton } from "../ReadAloudButton";
import { useTTS } from "../../hooks/useTTS";
import '../../styles/3D_Modeling/CourseLesson.css';

/* Fairing Assets */
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
  nextLabel?: string;
}

const FairingLesson: React.FC<FairingLessonProps> = ({
  onNextLesson,
  onPrevLesson,
  nextLabel
}) => {
  const [activeTab, setActiveTab] = useState<'chamfer' | 'fillet' | 'shell'>('chamfer');
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { speak, stop, isSpeaking, currentIndex } = useTTS();

  const chamferSteps = [
    "Step 1: Select Chamfer edge from the icon menu.",
    "Step 2: Specify the chamfer length on the item entry.",
    "Step 3: Select the edge of the entity to be chamfered and click GO. Note that several edges can be chamfered at once."
  ];

  const filletSteps = [
    "Step 1: Select Fillet edge from the icon menu.",
    "Step 2: Specify the fillet radius on the item entry.",
    "Step 3: Select the edge of the entity to be fillet and click GO. Note that several edges can be fillet at once."
  ];

  const shellSteps = [
    "Step 1: Select Shell from the icon menu.",
    "Step 2: Select the two endfaces of the solid entity and click GO.",
    "Step 3: Specify the thickness on the item entry then click GO twice."
  ];

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
      if (currentContainer) currentContainer.removeEventListener('scroll', handleScroll);
    };
  }, [activeTab]);

  const getStepClass = (stepId: string) => "instruction-step";

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
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      <section className="lesson-intro">
        <h3 className="section-title">
          FAIRING
          <ReadAloudButton isSpeaking={isSpeaking} onStart={() => {
            if (activeTab === 'chamfer') speak(chamferSteps);
            else if (activeTab === 'fillet') speak(filletSteps);
            else speak(shellSteps);
          }}
            onStop={stop}
          />
        </h3>
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
                <p>Use for creating chamfer dimensions.</p>
                <div className={`${getStepClass('chamfer-1')} ${currentIndex === 0 ? 'reading-active' : ''}`}>
                  <div className="step-header">
                    <span className="step-number">1</span>
                    <span className="step-label">Select <strong className="text-highlight">Chamfer edge</strong> from the icon menu.</span>
                  </div>
                  <div className="step-description">
                    <div className="image-wrapper-flush">
                      <img src={chamferEntry} alt="Chamfer Item Entry" className="software-screenshot screenshot-medium" />
                    </div>
                  </div>
                </div>

                <div className={`${getStepClass('chamfer-2')} ${currentIndex === 1 ? 'reading-active' : ''}`} style={{ marginTop: '1.5rem' }}>
                  <div className="step-header">
                    <span className="step-number">2</span>
                    <span className="step-label">Specify chamfer length on the item entry.</span>
                  </div>
                  <div className="step-description">
                    <div className="image-wrapper-flush">
                      <img src={chamferResult} alt="Chamfer Result" className="software-screenshot screenshot-large" />
                    </div>
                  </div>
                </div>

                <div className={`${getStepClass('chamfer-3')} ${currentIndex === 2 ? 'reading-active' : ''}`} style={{ marginTop: '1.5rem' }}>
                  <div className="step-header">
                    <span className="step-number">3</span>
                    <span className="step-label">Select the edge of the entity to be chamfered &gt; <strong className="text-highlight">GO</strong>
                      <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '40px', verticalAlign: 'middle', margin: '0 4px' }} /></span>

                  </div>
                  <div className="step-description" style={{ paddingLeft: '2.5rem' }}>
                    <p className="p-flush">*Note: Several edges can be chamfered all at once.</p>
                  </div>
                </div>

                <div className="section-divider"></div>
                <div className="tool-block">
                  <h4 className="section-title">RESULT</h4>
                  <div className="flex-row-center--wrap">
                    <div className="image-wrapper-flush">
                      <img src={chamferResult2} alt="Chamfer Additional Result" className="software-screenshot screenshot-large" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'fillet' && (
              <div className="tab-pane fade-in">
                <div className="card-header"><h4>FILLET</h4></div>
                <p>Use for rounding specified corners.</p>
                <div className={`${getStepClass('fillet-1')} ${currentIndex === 0 ? 'reading-active' : ''}`}>
                  <div className="step-header">
                    <span className="step-number">1</span>
                    <span className="step-label">Select <strong className="text-highlight">Fillet edge</strong> from the icon menu.</span>
                  </div>
                  <div className="step-description">
                    <div className="image-wrapper-flush">
                      <img src={filletIcon} alt="Fillet Icon" className="software-screenshot screenshot-small" />
                    </div>
                  </div>
                </div>

                <div className={`${getStepClass('fillet-2')} ${currentIndex === 1 ? 'reading-active' : ''}`} style={{ marginTop: '1.5rem' }}>
                  <div className="step-header">
                    <span className="step-number">2</span>
                    <span className="step-label">Specify fillet radius on the item entry.</span>
                  </div>
                  <div className="step-description">
                    <div className="image-wrapper-flush">
                      <img src={filletEntry} alt="Fillet Item Entry" className="software-screenshot screenshot-large" />
                    </div>
                  </div>
                </div>

                <div className={`${getStepClass('fillet-3')} ${currentIndex === 2 ? 'reading-active' : ''}`} style={{ marginTop: '1.5rem' }}>
                  <div className="step-header">
                    <span className="step-number">3</span>
                    <span className="step-label">Select the edge of the entity to be fillet &gt; <strong className="text-highlight">GO</strong>
                      <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '40px', verticalAlign: 'middle', margin: '0 4px' }} /></span>
                  </div>
                  <div className="step-description" style={{ paddingLeft: '2.5rem' }}>
                    <p className="p-flush">*Note: Several edges can be fillet all at once.</p>
                  </div>
                </div>

                <div className="section-divider"></div>
                <div className="tool-block">
                  <h4 className="section-title">RESULT</h4>
                  <div className="flex-row-center--wrap">
                    <div className="image-wrapper-flush">
                      <img src={filletResult} alt="Fillet Result" className="software-screenshot screenshot-medium" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'shell' && (
              <div className="tab-pane fade-in">
                <div className="card-header"><h4>SHELL</h4></div>
                <p>Use for hollowing solid entities using the specified wall thickness.</p>
                <div className={`${getStepClass('shell-1')} ${currentIndex === 0 ? 'reading-active' : ''}`}>
                  <div className="step-header">
                    <span className="step-number">1</span>
                    <span className="step-label">Select <strong className="text-highlight">Shell</strong> from the icon menu.</span>
                  </div>
                  <div className="step-description">
                    <div className="image-wrapper-flush">
                      <img src={shellIcon} alt="Shell Icon" className="software-screenshot screenshot-small" />
                    </div>
                  </div>
                </div>

                <div className={`${getStepClass('shell-2')} ${currentIndex === 1 ? 'reading-active' : ''}`} style={{ marginTop: '1.5rem' }}>
                  <div className="step-header">
                    <span className="step-number">2</span>
                    <span className="step-label">Select the two endfaces of the solid entity &gt; <strong className="text-highlight">GO</strong>
                      <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '40px', verticalAlign: 'middle', margin: '0 4px' }} /></span>
                  </div>
                  <div className="step-description">
                    <div className="image-wrapper-flush">
                      <img src={shellFaces} alt="Select Endfaces" className="software-screenshot screenshot-medium" />
                    </div>
                  </div>
                </div>

                <div className={`${getStepClass('shell-3')} ${currentIndex === 2 ? 'reading-active' : ''}`} style={{ marginTop: '1.5rem' }}>
                  <div className="step-header">
                    <span className="step-number">3</span>
                    <span className="step-label">Specify thickness on item entry &gt; double <strong className="text-highlight">GO</strong>
                      <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '40px', verticalAlign: 'middle', margin: '0 4px' }} /></span>
                  </div>
                  <div className="step-description">
                    <div className="image-wrapper-flush">
                      <img src={shellEntry} alt="Shell Thickness Entry" className="software-screenshot screenshot-large" />
                    </div>
                  </div>
                </div>

                <div className="section-divider"></div>
                <div className="tool-block">
                  <h4 className="section-title">RESULT</h4>
                  <div className="flex-row-center--wrap">
                    <div className="image-wrapper-flush">
                      <img src={shellResult} alt="Shell Result" className="software-screenshot screenshot-medium" />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="lesson-navigation">
            <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button>
            <button className="nav-button next" onClick={handleNext}>
              {activeTab === 'shell' ? (nextLabel || 'Next Lesson') : 'Next'} <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FairingLesson;
