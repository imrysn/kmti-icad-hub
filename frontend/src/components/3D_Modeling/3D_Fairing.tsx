import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Zap } from 'lucide-react';
import { useLessonCore } from '../../hooks/useLessonCore';
import { useTTSAutoplay } from "../../hooks/useTTSAutoplay";
import { ReadAloudButton } from "../ReadAloudButton";
import { KaraokeLessonText } from "../KaraokeLessonText";
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
    currentIndex,
    currentCharIndex,
    registerText
  } = useLessonCore("fairing");

  useEffect(() => {
    localStorage.setItem('fairing-tab', activeTab);
  }, [activeTab]);

  const chamferSteps = [
    "CHAMFER",
    "Use for creating chamfer dimensions.",
    "Step 1: Select Chamfer edge from the icon menu",
    "Step 2: Specify chamfer length on the item entry",
    "Step 3: Select the edge of the entity to be chamfered > GO",
    "Note: Several edges can be chamfered all at once.",
    "RESULT"
  ];

  const filletSteps = [
    "FILLET",
    "Use for rounding specified corners.",
    "Step 1: Select Fillet edge from the icon menu.",
    "Step 2: Specify the fillet radius on the item entry.",
    "Step 3: Select the edge of the entity to be fillet then click GO",
    "Note: Several edges can be fillet all at once.",
    "RESULT"
  ];

  const shellSteps = [
    "SHELL",
    "Use for hollowing solid entities using the specified wall thickness.",
    "Step 1: Select Shell from the icon menu.",
    "Step 2: Select the two endfaces of the solid entity then click GO.",
    "Step 3: Specify the thickness on the item entry then click GO twice.",
    "RESULT"
  ];

  const handleNext = (isAuto = false) => {
    stop();
    if (!isAuto) {
      sessionStorage.setItem('tts-autoplay-active', 'false');
    }
    if (activeTab === 'chamfer') setActiveTab('fillet');
    else if (activeTab === 'fillet') setActiveTab('shell');
    else if (onNextLesson) onNextLesson();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrev = (isAuto = false) => {
    stop();
    if (!isAuto) {
      sessionStorage.setItem('tts-autoplay-active', 'false');
    }
    if (activeTab === 'fillet') setActiveTab('chamfer');
    else if (activeTab === 'shell') setActiveTab('fillet');
    else if (onPrevLesson) onPrevLesson();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const introTitle = "Fairing";
  const introSubtitle = "Chamfer, Fillet, and Shell operations.";

  const commonIntroSteps = [
    introTitle,
    introSubtitle
  ];

  const chamferStepsTTS = [...commonIntroSteps, ...chamferSteps];
  const filletStepsTTS = [...commonIntroSteps, ...filletSteps];
  const shellStepsTTS = [...commonIntroSteps, ...shellSteps];


  useEffect(() => {
    const steps = activeTab === 'chamfer' ? chamferStepsTTS :
                  activeTab === 'fillet' ? filletStepsTTS : shellStepsTTS;
    const startIdx = activeTab === 'chamfer' ? 0 : 2;
    registerText(steps, startIdx);
  }, [activeTab, registerText]);

  const currentTabSteps = activeTab === 'chamfer' ? chamferStepsTTS :
                          activeTab === 'fillet' ? filletStepsTTS : shellStepsTTS;
  const tabsList = [{ id: 'chamfer' }, { id: 'fillet' }, { id: 'shell' }];
  const startIdx2 = activeTab === 'chamfer' ? 0 : 2;

  useTTSAutoplay(
    isSpeaking,
    currentIndex,
    activeTab,
    currentTabSteps.length,
    tabsList,
    handleNext,
    speak,
    currentTabSteps,
    startIdx2
  );

  return (
    <div className="course-lesson-container" ref={containerRef}>
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      <div className="lesson-tabs">
        <button key="chamfer" className={`tab-button ${activeTab === 'chamfer' ? 'active' : ''}`} onClick={() => { stop(); sessionStorage.setItem('tts-autoplay-active', 'false'); setActiveTab('chamfer'); }}>Chamfer</button>
        <button key="fillet" className={`tab-button ${activeTab === 'fillet' ? 'active' : ''}`} onClick={() => { stop(); sessionStorage.setItem('tts-autoplay-active', 'false'); setActiveTab('fillet'); }}>Fillet</button>
        <button key="shell" className={`tab-button ${activeTab === 'shell' ? 'active' : ''}`} onClick={() => { stop(); sessionStorage.setItem('tts-autoplay-active', 'false'); setActiveTab('shell'); }}>Shell</button>
      </div>

      <section className="lesson-intro">
        <h3 className={`section-title ${currentIndex === 0 ? "reading-active" : ""}`} data-reading-index="0">
          <KaraokeLessonText
            as="span"
            text={introTitle}
            isActive={isSpeaking && currentIndex === 0}
            currentCharIndex={currentCharIndex}
          />
          
        </h3>
        <KaraokeLessonText
          className={`lesson-subtitle ${currentIndex === 1 ? "reading-active" : ""}`}
          data-reading-index="1"
          text={introSubtitle}
          isActive={isSpeaking && currentIndex === 1}
          currentCharIndex={currentCharIndex}
        />
        <div>
          <img src={chamferIcon} alt="Fairing Menu" className="software-screenshot mt-4" style={{ height: '350px' }} />
        </div>
      </section>

      <div className="lesson-grid single-card">
        {activeTab === 'chamfer' && (
          <div className="lesson-card tab-content fade-in">
            <div className="card-header">
              <h4 className={`${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
                <KaraokeLessonText
                  as="span"
                  text="CHAMFER"
                  isActive={isSpeaking && currentIndex === 2}
                  currentCharIndex={currentCharIndex}
                />
              </h4>
            </div>
            <KaraokeLessonText
              as="p"
              className={`p-flush ${currentIndex === 3 ? 'reading-active' : ''}`}
              style={{ marginTop: "-2rem" }}
              data-reading-index="3"
              text="Use for creating chamfer dimensions."
              isActive={isSpeaking && currentIndex === 3}
              currentCharIndex={currentCharIndex}
            />

            <div className={`instruction-step ${currentIndex === 4 ? 'reading-active' : ''}`} data-reading-index="4">
              <div className="step-header">
                <span className="step-number">1 </span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text="Select Chamfer edge from the icon menu"
                  isActive={isSpeaking && currentIndex === 4}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <img src={chamferEntry} alt="Chamfer Item Entry" className="software-screenshot mt-4" style={{ width: '200px', marginBottom: '-2rem' }} />
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 5 ? 'reading-active' : ''}`} data-reading-index="5">
              <div className="step-header">
                <span className="step-number">2 </span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text="Specify chamfer length on the item entry"
                  isActive={isSpeaking && currentIndex === 5}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <img src={chamferResult} alt="Chamfer Process" className="software-screenshot mt-4" style={{ width: '500px', marginBottom: '-1rem' }} />
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 6 ? 'reading-active' : ''}`} data-reading-index="6">
              <div className="step-header">
                <span className="step-number">3 </span>
                <span className="step-label" style={{ marginTop: "-1.5rem" }}>
                  <KaraokeLessonText
                    as="span"
                    text="Select the edge of the entity to be chamfered > GO"
                    isActive={isSpeaking && currentIndex === 6}
                    currentCharIndex={currentCharIndex}
                  />
                  <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '40px', margin: '0 8px' }} />
                </span>
              </div>
              <div className={`instruction-box ${currentIndex === 7 ? "reading-active" : ""}`} data-reading-index="7" style={{ marginTop: '1rem' }}>
                <KaraokeLessonText
                  as="p"
                  className="p-flush red-text"
                  text="Note: Several edges can be chamfered all at once."
                  isActive={isSpeaking && currentIndex === 7}
                  currentCharIndex={currentCharIndex}
                />
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 8 ? 'reading-active' : ''}`} data-reading-index="8">
              <div className="card-header">
                <h4 className={`${currentIndex === 8 ? 'reading-active' : ''}`} data-reading-index="8">
                  <KaraokeLessonText
                    as="span"
                    text="RESULT"
                    isActive={isSpeaking && currentIndex === 8}
                    currentCharIndex={currentCharIndex}
                  />
                </h4>
              </div>
              <img src={chamferResult2} alt="Chamfer Result" className="software-screenshot screenshot-medium mt-8" style={{ width: '700px' }} />
            </div>

            <div className="lesson-navigation">
              <button className="nav-button" onClick={() => handlePrev()}><ChevronLeft size={18} /> Previous</button>
              <button className="nav-button next" onClick={() => handleNext()}>Next <ChevronRight size={18} /></button>
            </div>
          </div>
        )}

        {activeTab === 'fillet' && (
          <div className="lesson-card tab-content fade-in">
            <div className="card-header">
              <h4 className={`${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
                <KaraokeLessonText
                  as="span"
                  text="FILLET"
                  isActive={isSpeaking && currentIndex === 2}
                  currentCharIndex={currentCharIndex}
                />
              </h4>
            </div>
            <KaraokeLessonText
              as="p"
              className={`p-flush ${currentIndex === 3 ? 'reading-active' : ''}`}
              style={{ marginTop: "-2rem" }}
              data-reading-index="3"
              text="Use for rounding specified corners"
              isActive={isSpeaking && currentIndex === 3}
              currentCharIndex={currentCharIndex}
            />



            <div className={`instruction-step ${currentIndex === 4 ? 'reading-active' : ''}`} data-reading-index="4">
              <div className="step-header">
                <span className="step-number">1 </span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text="Select Fillet edge from the icon menu"
                  isActive={isSpeaking && currentIndex === 4}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <img src={filletIcon} alt="Fillet Icon" className="software-screenshot mt-4" style={{ width: '200px', marginBottom: '-3rem' }} />
              </div>
            </div>


            <div className={`instruction-step ${currentIndex === 5 ? 'reading-active' : ''}`} data-reading-index="5">
              <div className="step-header">
                <span className="step-number">2 </span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text="Specify the fillet radius on the item entry"
                  isActive={isSpeaking && currentIndex === 5}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <img src={filletEntry} alt="Fillet Item Entry" className="software-screenshot mt-4" style={{ width: '500px', marginBottom: '-3rem' }} />
              </div>
            </div>


            <div className={`instruction-step ${currentIndex === 6 ? 'reading-active' : ''}`} data-reading-index="6">
              <div className="step-header">
                <span className="step-number">3 </span>
                <span className="step-label" style={{ marginTop: '-1.5rem' }}>
                  <KaraokeLessonText
                    as="span"
                    text="Select the edge of the entity to be fillet > GO"
                    isActive={isSpeaking && currentIndex === 6}
                    currentCharIndex={currentCharIndex}
                  />
                  <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '40px', margin: '0 8px' }} />
                </span>
              </div>
            </div>
            <div className={`instruction-box ${currentIndex === 7 ? "reading-active" : ""}`} data-reading-index="7" style={{ marginTop: '-1.5rem' }}>
              <KaraokeLessonText
                as="p"
                className="p-flush red-text"
                text="Note: Several edges can be fillet all at once"
                isActive={isSpeaking && currentIndex === 7}
                currentCharIndex={currentCharIndex}
              />
            </div>

            <div className={`instruction-step ${currentIndex === 8 ? 'reading-active' : ''}`} data-reading-index="8">
              <div className="card-header">
                <h4 className={`${currentIndex === 8 ? 'reading-active' : ''}`} data-reading-index="8">
                  <KaraokeLessonText
                    as="span"
                    text="RESULT"
                    isActive={isSpeaking && currentIndex === 8}
                    currentCharIndex={currentCharIndex}
                  />
                </h4>
              </div>
              <img src={filletResult} alt="Fillet Result" className="software-screenshot screenshot-medium mt-8" style={{ width: '350px' }} />
            </div>

            <div className="lesson-navigation">
              <button className="nav-button" onClick={() => handlePrev()}><ChevronLeft size={18} /> Previous</button>
              <button className="nav-button next" onClick={() => handleNext()}>Next <ChevronRight size={18} /></button>
            </div>
          </div>
        )}

        {activeTab === 'shell' && (
          <div className="lesson-card tab-content fade-in">
            <div className="card-header">
              <h4 className={`${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
                <KaraokeLessonText
                  as="span"
                  text="SHELL"
                  isActive={isSpeaking && currentIndex === 2}
                  currentCharIndex={currentCharIndex}
                />
              </h4>
            </div>
            <KaraokeLessonText
              as="p"
              className={`p-flush ${currentIndex === 3 ? 'reading-active' : ''}`}
              style={{ marginTop: "-2rem" }}
              data-reading-index="3"
              text="Use for hollowing solid entities using the specified wall thickness"
              isActive={isSpeaking && currentIndex === 3}
              currentCharIndex={currentCharIndex}
            />


            <div className={`instruction-step ${currentIndex === 4 ? 'reading-active' : ''}`} data-reading-index="4">
              <div className="step-header">
                <span className="step-number">1 </span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text="Select Shell from the icon menu"
                  isActive={isSpeaking && currentIndex === 4}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <img src={shellIcon} alt="Shell Icon" className="software-screenshot mt-4" style={{ width: '200px', marginBottom: "-1rem" }} />
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 5 ? 'reading-active' : ''}`} data-reading-index="5">
              <div className="step-header">
                <span className="step-number">2 </span>
                <span className="step-label" style={{ marginTop: "-1.5rem" }}>
                  <KaraokeLessonText
                    as="span"
                    text="Select the two endfaces of the solid entity > GO"
                    isActive={isSpeaking && currentIndex === 5}
                    currentCharIndex={currentCharIndex}
                  />
                  <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '40px', margin: '0 8px' }} />
                </span>
              </div>
              <div className="step-description">
                <img src={shellFaces} alt="Select Endfaces" className="software-screenshot screenshot-medium mt-4" style={{ width: '500px' }} />
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 6 ? 'reading-active' : ''}`} data-reading-index="6">
              <div className="step-header">
                <span className="step-number">3 </span>
                <span className="step-label" style={{ marginTop: "-1.5rem" }}>
                  <KaraokeLessonText
                    as="span"
                    text="Specify the desired thickness of the solid entity after shell on the item entry > double GO"
                    isActive={isSpeaking && currentIndex === 6}
                    currentCharIndex={currentCharIndex}
                  />
                  <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '40px', margin: '0 8px' }} />
                </span>
              </div>
              <div className="step-description">
                <img src={shellEntry} alt="Shell Thickness Entry" className="software-screenshot screenshot-wide mt-4" />
              </div>
            </div>


            <div className={`instruction-step ${currentIndex === 7 ? 'reading-active' : ''}`} data-reading-index="7">
              <div className="card-header">
                <h4 className={`${currentIndex === 7 ? 'reading-active' : ''}`} data-reading-index="7">
                  <KaraokeLessonText
                    as="span"
                    text="RESULT"
                    isActive={isSpeaking && currentIndex === 7}
                    currentCharIndex={currentCharIndex}
                  />
                </h4>
              </div>
              <img src={shellResult} alt="Shell Result" className="software-screenshot screenshot-medium mt-8" style={{ width: '490px' }} />
            </div>

            <div className="lesson-navigation">
              <button className="nav-button" onClick={() => handlePrev()}><ChevronLeft size={18} /> Previous</button>
              <button className="nav-button next" onClick={() => handleNext()}>{nextLabel || 'Next Lesson'} <ChevronRight size={18} /></button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FairingLesson;
