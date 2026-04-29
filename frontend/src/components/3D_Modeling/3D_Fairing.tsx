/** * 3D_Fairing.tsx — Fairing operations lessons (Chamfer, Fillet, Shell) */

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Zap } from 'lucide-react';
import { useLessonCore } from '../../hooks/useLessonCore';
import { ReadAloudButton } from "../ReadAloudButton";
import '../../styles/3D_Modeling/CourseLesson.css';

/* Fairing Assets */
import chamferIcon from '../../assets/3D_Image_File/fairing_chamfer.jpg';
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

const FairingLesson: React.FC<FairingLessonProps> = ({ onNextLesson, onPrevLesson, nextLabel }) => {
  const [activeTab, setActiveTab] = useState<'chamfer' | 'fillet' | 'shell'>(() => {
    return (localStorage.getItem('fairing-tab') as any) || 'chamfer';
  });

  const {
    scrollProgress,
    containerRef,
    speak,
    stop,
    isSpeaking,
    currentIndex
  } = useLessonCore(`fairing-${activeTab}`);

  useEffect(() => {
    localStorage.setItem('fairing-tab', activeTab);
  }, [activeTab]);

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
    <div className={`course-lesson-container ${isSpeaking ? 'is-reading' : ''}`} ref={containerRef}>
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      <div className="lesson-tabs">
        <button key="chamfer" className={`tab-button ${activeTab === 'chamfer' ? 'active' : ''}`} onClick={() => setActiveTab('chamfer')}>Chamfer</button>
        <button key="fillet" className={`tab-button ${activeTab === 'fillet' ? 'active' : ''}`} onClick={() => setActiveTab('fillet')}>Fillet</button>
        <button key="shell" className={`tab-button ${activeTab === 'shell' ? 'active' : ''}`} onClick={() => setActiveTab('shell')}>Shell</button>
      </div>

      <section className="lesson-intro">
        <h3 className="section-title">Fairing</h3>
        <div>
          <div className="screenshot-wrapper mt-4">
            <img src={chamferIcon} alt="Fairing Menu" className="software-screenshot" style={{ height: '350px' }} />
          </div>
        </div>
      </section>

      <div className="lesson-grid single-card">
        {activeTab === 'chamfer' && (
          <div className="lesson-card tab-content fade-in">
            <div className="card-header">
              <h4>CHAMFER</h4>
              <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(chamferSteps)} onStop={stop} />
            </div>
            <p className='p-flush' style={{ marginTop: "-2rem" }}>Use for creating chamfer dimensions.</p>

            <div className={`instruction-step ${currentIndex === 0 ? 'reading-active' : ''}`}>
              <div className="step-header">
                <span className="step-number">1 </span>
                <span className="step-label">Select <strong className="red-text">Chamfer edge</strong> from the icon menu.</span>
              </div>
              <div className="step-description">
                <div className="screenshot-wrapper">
                  <img src={chamferEntry} alt="Chamfer Item Entry" className="software-screenshot" style={{ width: '200px', marginBottom: '-2rem' }} />
                </div>
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 1 ? 'reading-active' : ''}`}>
              <div className="step-header">
                <span className="step-number">2 </span>
                <span className="step-label">Specify chamfer length on the item entry.</span>
              </div>
              <div className="step-description">
                <div className="screenshot-wrapper">
                  <img src={chamferResult} alt="Chamfer Process" className="software-screenshot" style={{ width: '900px', marginBottom: '-2rem' }} />
                </div>
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 2 ? 'reading-active' : ''}`}>
              <div className="step-header">
                <span className="step-number">3 </span>
                <span className="step-label" style={{ marginTop: "-1.5rem" }}>Select the edge to be chamfered &gt; GO
                  <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '40px', margin: '0 8px' }} />
                </span>
              </div>

              <div className="instruction-box" style={{ marginTop: '2rem' }}>
                <p className="p-flush">
                  <strong className="red-text">Note:</strong> Several edges can be chamfered all at once.
                </p>
              </div>
              <div className="section-divider" style={{ margin: "1rem" }}></div>
              <div className="instruction-step">
                <div className="card-header"><h4>RESULT</h4></div>
                <div className="screenshot-wrapper mt-8">
                  <img src={chamferResult2} alt="Chamfer Result" className="software-screenshot" style={{ width: '900px' }} />
                </div>
              </div>
            </div>

            <div className="lesson-navigation">
              <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button>
              <button className="nav-button next" onClick={handleNext}>Next <ChevronRight size={18} /></button>
            </div>
          </div>
        )}

        {activeTab === 'fillet' && (
          <div className="lesson-card tab-content fade-in">
            <div className="card-header">
              <h4>FILLET</h4>
              <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(filletSteps)} onStop={stop} />
            </div>
            <p className='p-flush' style={{ marginTop: "-2rem" }}>Use for rounding specified corners.</p>



            <div className={`instruction-step ${currentIndex === 0 ? 'reading-active' : ''}`}>
              <div className="step-header">
                <span className="step-number">1 </span>
                <span className="step-label">Select <strong className="red-text">Fillet edge</strong> from the icon menu.</span>
              </div>
              <div className="step-description">
                <div className="screenshot-wrapper">
                  <img src={filletIcon} alt="Fillet Icon" className="software-screenshot" style={{ width: '200px', marginBottom: '-3rem' }} />
                </div>
              </div>
            </div>


            <div className={`instruction-step ${currentIndex === 1 ? 'reading-active' : ''}`}>
              <div className="step-header">
                <span className="step-number">2 </span>
                <span className="step-label">Specify fillet radius on the item entry.</span>
              </div>
              <div className="step-description">
                <div className="screenshot-wrapper">
                  <img src={filletEntry} alt="Fillet Item Entry" className="software-screenshot" style={{ width: '500px', marginBottom: '-3rem' }} />
                </div>
              </div>
            </div>

            <div className="section-divider"></div>

            <div className={`instruction-step ${currentIndex === 2 ? 'reading-active' : ''}`}>
              <div className="step-header">
                <span className="step-number">3 </span>
                <span className="step-label" style={{ marginTop: "-1.5rem" }}>Select the edge to be fillet &gt; <strong className="text-highlight">GO</strong>
                  <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '40px', margin: '0 8px' }} />
                </span>
              </div>
              <div className="instruction-box" style={{ marginTop: '2rem' }}>
                <p className="p-flush">
                  <strong className="red-text">Note:</strong> Several edges can be fillet all at once.
                </p>
              </div>
            </div>

            <div className="instruction-step">
              <div className="card-header"><h4>RESULT</h4></div>
              <div className="screenshot-wrapper mt-8">
                <img src={filletResult} alt="Fillet Result" className="software-screenshot screenshot-medium" style={{ width: '360px' }} />
              </div>
            </div>

            <div className="lesson-navigation">
              <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button>
              <button className="nav-button next" onClick={handleNext}>Next <ChevronRight size={18} /></button>
            </div>
          </div>
        )}

        {activeTab === 'shell' && (
          <div className="lesson-card tab-content fade-in">
            <div className="card-header">
              <h4>SHELL</h4>
              <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(shellSteps)} onStop={stop} />
            </div>
            <p className='p-flush' style={{ marginTop: "-2rem" }}>Use for hollowing solid entities using the specified wall thickness.</p>


            <div className={`instruction-step ${currentIndex === 0 ? 'reading-active' : ''}`}>
              <div className="step-header">
                <span className="step-number">1 </span>
                <span className="step-label">Select <strong className="red-text">Shell</strong> from the icon menu.</span>
              </div>
              <div className="step-description">
                <div className="screenshot-wrapper">
                  <img src={shellIcon} alt="Shell Icon" className="software-screenshot" style={{ width: '200px' }} />
                </div>
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 1 ? 'reading-active' : ''}`}>
              <div className="step-header">
                <span className="step-number">2 </span>
                <span className="step-label" style={{ marginTop: "-1.5rem" }}>Select the two endfaces of the solid entity &gt; GO
                  <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '40px', margin: '0 8px' }} />
                </span>
              </div>
              <div className="step-description">
                <div className="screenshot-wrapper">
                  <img src={shellFaces} alt="Select Endfaces" className="software-screenshot screenshot-medium" style={{ width: '500px' }} />
                </div>
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 2 ? 'reading-active' : ''}`}>
              <div className="step-header">
                <span className="step-number">3 </span>
                <span className="step-label" style={{ marginTop: "-1.5rem" }}>Specify thickness on item entry &gt; double GO
                  <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '40px', margin: '0 8px' }} />
                </span>
              </div>
              <div className="step-description">
                <div className="screenshot-wrapper">
                  <img src={shellEntry} alt="Shell Thickness Entry" className="software-screenshot screenshot-wide" />
                </div>
              </div>
            </div>

            <div className="section-divider"></div>

            <div className="instruction-step">
              <div className="card-header"><h4>RESULT</h4></div>
              <div className="screenshot-wrapper mt-8">
                <img src={shellResult} alt="Shell Result" className="software-screenshot screenshot-medium" style={{ width: '490px' }} />
              </div>
            </div>

            <div className="lesson-navigation">
              <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button>
              <button className="nav-button next" onClick={handleNext}>{nextLabel || 'Next Lesson'} <ChevronRight size={18} /></button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FairingLesson;
