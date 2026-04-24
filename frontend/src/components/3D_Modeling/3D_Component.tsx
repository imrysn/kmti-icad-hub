/** * 3D_Component.tsx – Component operations lessons (1 and 2) */

import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useLessonCore } from '../../hooks/useLessonCore';
import { ReadAloudButton } from "../ReadAloudButton";
import '../../styles/3D_Modeling/CourseLesson.css';

/* Component (1) Assets */
import componentMenu from '../../assets/3D_Image_File/component1_move_copy_delete.png';
import moveIcon from '../../assets/3D_Image_File/component1_move.png';
import moveResult from '../../assets/3D_Image_File/component1_move_2.png';
import moveEntry from '../../assets/3D_Image_File/component1_move_entry.png';
import copyIcon from '../../assets/3D_Image_File/component1_copy.png';
import copyDistance from '../../assets/3D_Image_File/component1_copy_2.png';
import copyFinal from '../../assets/3D_Image_File/component1_copy_3.png';
import mirrorIcon from '../../assets/3D_Image_File/component1_mirror.png';
import mirrorResult from '../../assets/3D_Image_File/component1_mirror_3.png';
import rotateIcon from '../../assets/3D_Image_File/component1_rotate.png';
import rotateResult from '../../assets/3D_Image_File/component1_rotate_3.png';
import rotateEntry from '../../assets/3D_Image_File/component1_rotate_4.png';
import leftClick from '../../assets/3D_Image_File/left_click.png';

/* Component (2) Assets */
import repeatCopyIcon from '../../assets/3D_Image_File/component2_repeat_copy.png';
import repeatCopyResult from '../../assets/3D_Image_File/component2_repeat_copy2.png';
import rotateCopyIcon from '../../assets/3D_Image_File/component2_rotate_copy.png';
import rotateCopyPoints from '../../assets/3D_Image_File/component2_rotate_copy_3.png';
import rotateCopyEntry from '../../assets/3D_Image_File/component2_rotate_copy_4.png';
import mirrorCopyIcon from '../../assets/3D_Image_File/component2_mirror_copy.png';
import mirrorCopyResult from '../../assets/3D_Image_File/component2_mirror_copy_2.png';
import deleteIcon from '../../assets/3D_Image_File/component2_delete.png';

interface SubLessonProps { onNextLesson?: () => void; onPrevLesson?: () => void; nextLabel?: string; }

const Component1: React.FC<SubLessonProps> = ({ onNextLesson, onPrevLesson, nextLabel }) => {
  const [activeTab, setActiveTab] = useState<'move' | 'copy' | 'mirror' | 'rotate'>(() => {
    return (localStorage.getItem('component-1-tab') as any) || 'move';
  });
  const { scrollProgress, containerRef, speak, stop, isSpeaking, currentIndex } = useLessonCore(`component-1-${activeTab}`);

  useEffect(() => {
    localStorage.setItem('component-1-tab', activeTab);
  }, [activeTab]);

  const moveSteps = ["Step 1: Select Move Component from the icon menu.", "Step 2: Select the component to move and click GO.", "Step 3: Specify the movement distance on the X, Y, and Z axes on the item entry then press Enter."];
  const copySteps = ["Step 1: Select Copy Component from the icon menu.", "Step 2: Select the component to copy and click GO.", "Step 3: Specify the distance and the number of copies needed then press Enter."];
  const mirrorSteps = ["Step 1: Select Mirror Component from the icon menu.", "Step 2: Select the components to be mirrored and click GO.", "Step 3: Select 3 points to set the mirror plane or left-click on a face."];
  const rotateSteps = ["Step 1: Select Rotate Component from the icon menu.", "Step 2: Select the component to rotate and click GO.", "Step 3: Select 2 points to set the axis of rotation.", "Step 4: Specify the desired angle of rotation on the item entry then press Enter."];

  const tabs = [{ id: 'move', label: 'Move' }, { id: 'copy', label: 'Copy' }, { id: 'mirror', label: 'Mirror' }, { id: 'rotate', label: 'Rotate' }];
  const handleNext = () => { const i = tabs.findIndex(t => t.id === activeTab); if (i < tabs.length - 1) setActiveTab(tabs[i + 1].id as any); else if (onNextLesson) onNextLesson(); };
  const handlePrev = () => { const i = tabs.findIndex(t => t.id === activeTab); if (i > 0) setActiveTab(tabs[i - 1].id as any); else if (onPrevLesson) onPrevLesson(); };

  return (
    <div className="course-lesson-container" ref={containerRef}>
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>
      <div className="lesson-tabs">
        {tabs.map(tab => (<button key={tab.id} className={`tab-button ${activeTab === tab.id ? 'active' : ''}`} onClick={() => setActiveTab(tab.id as any)}>{tab.label}</button>))}
      </div>

      <section className="lesson-intro">
        <h3 className="section-title">Component Operations (1)</h3>
      </section>

      <div className="lesson-grid single-card">
        {activeTab === 'move' && (
          <div className="lesson-card tab-content fade-in">
            <div className="card-header">
              <h4>MOVE COMPONENT</h4>
              <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(moveSteps)} onStop={stop} />
            </div>

            <div className={`instruction-step ${currentIndex === 0 ? 'reading-active' : ''}`}>
              <div className="step-header">
                <span className="step-number">1 </span>
                <span className="step-label">Select <strong className="text-highlight">Move Component</strong> from the icon menu.</span>
              </div>
              <div className="step-description">
                <div className="screenshot-wrapper">
                  <img src={moveIcon} alt="Move Component Icon" className="software-screenshot screenshot-small" style={{ width: '250px' }} />
                </div>
              </div>
            </div>

            <div className="section-divider"></div>

            <div className={`instruction-step ${currentIndex === 1 ? 'reading-active' : ''}`}>
              <div className="step-header">
                <span className="step-number">2 </span>
                <span className="step-label">Select component &gt; <strong className="text-highlight">GO</strong>
                  <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '32px', margin: '0 4px' }} />
                </span>
              </div>
            </div>

            <div className="section-divider"></div>

            <div className={`instruction-step ${currentIndex === 2 ? 'reading-active' : ''}`}>
              <div className="step-header">
                <span className="step-number">3 </span>
                <span className="step-label">Specify <strong className="text-highlight">X, Y, Z</strong> distance in item entry &gt; <strong className="text-highlight">Enter</strong>.</span>
              </div>
              <div className="step-description">
                <div className="screenshot-wrapper">
                  <img src={moveEntry} alt="Move Item Entry" className="software-screenshot screenshot-medium" />
                </div>
              </div>
            </div>

            <div className="section-divider"></div>

            <div className="instruction-step">
              <div className="card-header"><h4>RESULT</h4></div>
              <div className="screenshot-wrapper mt-8">
                <img src={moveResult} alt="Move Result" className="software-screenshot screenshot-medium" />
              </div>
            </div>

            <div className="lesson-navigation">
              <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button>
              <button className="nav-button next" onClick={handleNext}>{nextLabel || 'Next'} <ChevronRight size={18} /></button>
            </div>
          </div>
        )}

        {activeTab === 'copy' && (
          <div className="lesson-card tab-content fade-in">
            <div className="card-header">
              <h4>COPY COMPONENT</h4>
              <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(copySteps)} onStop={stop} />
            </div>

            <div className={`instruction-step ${currentIndex === 0 ? 'reading-active' : ''}`}>
              <div className="step-header">
                <span className="step-number">1 </span>
                <span className="step-label">Select <strong className="text-highlight">Copy Component</strong> from the icon menu.</span>
              </div>
              <div className="step-description">
                <div className="screenshot-wrapper">
                  <img src={copyIcon} alt="Copy Component Icon" className="software-screenshot screenshot-small" style={{ width: '250px' }} />
                </div>
              </div>
            </div>

            <div className="section-divider"></div>

            <div className={`instruction-step ${currentIndex === 1 ? 'reading-active' : ''}`}>
              <div className="step-header">
                <span className="step-number">2 </span>
                <span className="step-label">Select component &gt; <strong className="text-highlight">GO</strong>
                  <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '32px', margin: '0 4px' }} />
                </span>
              </div>
            </div>

            <div className="section-divider"></div>

            <div className={`instruction-step ${currentIndex === 2 ? 'reading-active' : ''}`}>
              <div className="step-header">
                <span className="step-number">3 </span>
                <span className="step-label">Specify <strong className="text-highlight">distance</strong> and <strong className="text-highlight">count</strong> &gt; <strong className="text-highlight">Enter</strong>.</span>
              </div>
              <div className="step-description">
                <div className="screenshot-wrapper">
                  <img src={copyFinal} alt="Copy Result Dialog" className="software-screenshot screenshot-medium" />
                </div>
              </div>
            </div>

            <div className="section-divider"></div>

            <div className="instruction-step">
              <div className="card-header"><h4>RESULT</h4></div>
              <div className="screenshot-wrapper mt-8">
                <img src={copyDistance} alt="Copy Distance Visual" className="software-screenshot screenshot-medium" />
              </div>
            </div>

            <div className="lesson-navigation">
              <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button>
              <button className="nav-button next" onClick={handleNext}>{nextLabel || 'Next'} <ChevronRight size={18} /></button>
            </div>
          </div>
        )}

        {activeTab === 'mirror' && (
          <div className="lesson-card tab-content fade-in">
            <div className="card-header">
              <h4>MIRROR COMPONENT</h4>
              <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(mirrorSteps)} onStop={stop} />
            </div>

            <div className={`instruction-step ${currentIndex === 0 ? 'reading-active' : ''}`}>
              <div className="step-header">
                <span className="step-number">1 </span>
                <span className="step-label">Select <strong className="text-highlight">Mirror Component</strong> from the icon menu.</span>
              </div>
              <div className="step-description">
                <div className="screenshot-wrapper">
                  <img src={mirrorIcon} alt="Mirror Component Icon" className="software-screenshot screenshot-small" style={{ width: '250px' }} />
                </div>
              </div>
            </div>

            <div className="section-divider"></div>

            <div className={`instruction-step ${currentIndex === 1 ? 'reading-active' : ''}`}>
              <div className="step-header">
                <span className="step-number">2 </span>
                <span className="step-label">Select components &gt; <strong className="text-highlight">GO</strong>.</span>
              </div>
            </div>

            <div className="section-divider"></div>

            <div className={`instruction-step ${currentIndex === 2 ? 'reading-active' : ''}`}>
              <div className="step-header">
                <span className="step-number">3 </span>
                <span className="step-label">Select <strong className="text-highlight">3 points</strong> for plane OR click a <strong className="text-highlight">face</strong>.</span>
              </div>
              <div className="step-description">
                <div className="screenshot-wrapper">
                  <img src={mirrorResult} alt="Mirror Result" className="software-screenshot screenshot-medium" />
                </div>
              </div>
            </div>

            <div className="lesson-navigation">
              <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button>
              <button className="nav-button next" onClick={handleNext}>{nextLabel || 'Next'} <ChevronRight size={18} /></button>
            </div>
          </div>
        )}

        {activeTab === 'rotate' && (
          <div className="lesson-card tab-content fade-in">
            <div className="card-header">
              <h4>ROTATE COMPONENT</h4>
              <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(rotateSteps)} onStop={stop} />
            </div>

            <div className={`instruction-step ${currentIndex === 0 ? 'reading-active' : ''}`}>
              <div className="step-header">
                <span className="step-number">1 </span>
                <span className="step-label">Select <strong className="text-highlight">Rotate Component</strong> from the icon menu.</span>
              </div>
              <div className="step-description">
                <div className="screenshot-wrapper">
                  <img src={rotateIcon} alt="Rotate Component Icon" className="software-screenshot screenshot-small" style={{ width: '250px' }} />
                </div>
              </div>
            </div>

            <div className="section-divider"></div>

            <div className={`instruction-step ${currentIndex === 1 ? 'reading-active' : ''}`}>
              <div className="step-header">
                <span className="step-number">2 </span>
                <span className="step-label">Select component &gt; <strong className="text-highlight">GO</strong>.</span>
              </div>
            </div>

            <div className="section-divider"></div>

            <div className={`instruction-step ${currentIndex === 2 ? 'reading-active' : ''}`}>
              <div className="step-header">
                <span className="step-number">3 </span>
                <span className="step-label">Select <strong className="text-highlight">2 points</strong> to define rotation axis.</span>
              </div>
            </div>

            <div className="section-divider"></div>

            <div className={`instruction-step ${currentIndex === 3 ? 'reading-active' : ''}`}>
              <div className="step-header">
                <span className="step-number">4 </span>
                <span className="step-label">Specify <strong className="text-highlight">angle</strong> in item entry &gt; <strong className="text-highlight">Enter</strong>.</span>
              </div>
              <div className="step-description">
                <div className="screenshot-wrapper">
                  <img src={rotateEntry} alt="Rotate Entry" className="software-screenshot screenshot-medium" />
                </div>
              </div>
            </div>

            <div className="section-divider"></div>

            <div className="instruction-step">
              <div className="card-header"><h4>RESULT</h4></div>
              <div className="screenshot-wrapper mt-8">
                <img src={rotateResult} alt="Rotate Result" className="software-screenshot screenshot-medium" />
              </div>
            </div>

            <div className="lesson-navigation">
              <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button>
              <button className="nav-button next" onClick={handleNext}>{nextLabel || 'Next'} <ChevronRight size={18} /></button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const Component2: React.FC<SubLessonProps> = ({ onNextLesson, onPrevLesson, nextLabel }) => {
  const [activeTab, setActiveTab] = useState<'repeat' | 'rotateCopy' | 'mirrorCopy' | 'delete'>(() => {
    return (localStorage.getItem('component-2-tab') as any) || 'repeat';
  });
  const { scrollProgress, containerRef, speak, stop, isSpeaking, currentIndex } = useLessonCore(`component-2-${activeTab}`);

  useEffect(() => {
    localStorage.setItem('component-2-tab', activeTab);
  }, [activeTab]);

  const repeatSteps = ["Step 1: Select Repeat Copy Tool from the menu.", "Step 2: Select the component to be duplicated and click GO."];
  const rotateCopySteps = ["Step 1: Select Rotate Component from the icon menu.", "Step 2: Select the component to rotate and click GO.", "Step 3: Select 2 points to set the axis of rotation.", "Step 4: Specify the desired angle of rotation on the item entry then press Enter."];
  const mirrorCopySteps = ["Mirror Copy: Use to create a duplicate by mirror movement. Same procedure as Mirror Component."];
  const deleteSteps = ["Step 1: Select Delete Component from the icon menu.", "Step 2: Select the components manually or in bulk that you wish to remove."];

  const tabs = [{ id: 'repeat', label: 'Repeat Copy' }, { id: 'rotateCopy', label: 'Rotate Copy' }, { id: 'mirrorCopy', label: 'Mirror Copy' }, { id: 'delete', label: 'Delete' }];
  const handleNext = () => { const i = tabs.findIndex(t => t.id === activeTab); if (i < tabs.length - 1) setActiveTab(tabs[i + 1].id as any); else if (onNextLesson) onNextLesson(); };
  const handlePrev = () => { const i = tabs.findIndex(t => t.id === activeTab); if (i > 0) setActiveTab(tabs[i - 1].id as any); else if (onPrevLesson) onPrevLesson(); };

  return (
    <div className="course-lesson-container" ref={containerRef}>
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>
      <div className="lesson-tabs">
        {tabs.map(tab => (<button key={tab.id} className={`tab-button ${activeTab === tab.id ? 'active' : ''}`} onClick={() => setActiveTab(tab.id as any)}>{tab.label}</button>))}
      </div>

      <section className="lesson-intro">
        <h3 className="section-title">Component Operations (2)</h3>
      </section>

      <div className="lesson-grid single-card">
        {activeTab === 'repeat' && (
          <div className="lesson-card tab-content fade-in">
            <div className="card-header">
              <h4>REPEAT COPY</h4>
              <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(repeatSteps)} onStop={stop} />
            </div>

            <div className={`instruction-step ${currentIndex === 0 ? 'reading-active' : ''}`}>
              <div className="step-header">
                <span className="step-number">1 </span>
                <span className="step-label">Select <strong className="text-highlight">Repeat Copy</strong> from the icon menu.</span>
              </div>
              <div className="step-description">
                <div className="screenshot-wrapper">
                  <img src={repeatCopyIcon} alt="Repeat Copy Icon" className="software-screenshot screenshot-small" style={{ width: '250px' }} />
                </div>
              </div>
            </div>

            <div className="section-divider"></div>

            <div className={`instruction-step ${currentIndex === 1 ? 'reading-active' : ''}`}>
              <div className="step-header">
                <span className="step-number">2 </span>
                <span className="step-label">Select component to be duplicated &gt; <strong className="text-highlight">GO</strong>.</span>
              </div>
              <div className="step-description">
                <div className="screenshot-wrapper">
                  <img src={repeatCopyResult} alt="Repeat Copy Result" className="software-screenshot screenshot-wide" />
                </div>
              </div>
            </div>

            <div className="lesson-navigation">
              <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button>
              <button className="nav-button next" onClick={handleNext}>{nextLabel || 'Next'} <ChevronRight size={18} /></button>
            </div>
          </div>
        )}

        {activeTab === 'rotateCopy' && (
          <div className="lesson-card tab-content fade-in">
            <div className="card-header">
              <h4>ROTATE COPY</h4>
              <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(rotateCopySteps)} onStop={stop} />
            </div>

            <div className={`instruction-step ${currentIndex === 0 ? 'reading-active' : ''}`}>
              <div className="step-header">
                <span className="step-number">1 </span>
                <span className="step-label">Select <strong className="text-highlight">Rotate Component</strong> from the icon menu.</span>
              </div>
              <div className="step-description">
                <div className="screenshot-wrapper">
                  <img src={rotateCopyIcon} alt="Rotate Copy Icon" className="software-screenshot screenshot-small" style={{ width: '250px' }} />
                </div>
              </div>
            </div>

            <div className="section-divider"></div>

            <div className={`instruction-step ${currentIndex === 1 ? 'reading-active' : ''}`}>
              <div className="step-header">
                <span className="step-number">2 </span>
                <span className="step-label">Select component(s) to rotate &gt; <strong className="text-highlight">GO</strong>.</span>
              </div>
            </div>

            <div className="section-divider"></div>

            <div className={`instruction-step ${currentIndex === 2 ? 'reading-active' : ''}`}>
              <div className="step-header">
                <span className="step-number">3 </span>
                <span className="step-label">Select <strong className="text-highlight">2 points</strong> to set the rotation axis.</span>
              </div>
              <div className="step-description">
                <div className="screenshot-wrapper">
                  <img src={rotateCopyPoints} alt="Rotate Copy Points" className="software-screenshot screenshot-wide" />
                </div>
              </div>
            </div>

            <div className="section-divider"></div>

            <div className={`instruction-step ${currentIndex === 3 ? 'reading-active' : ''}`}>
              <div className="step-header">
                <span className="step-number">4 </span>
                <span className="step-label">Specify <strong className="text-highlight">angle</strong> in item entry &gt; <strong className="text-highlight">Enter</strong>.</span>
              </div>
              <div className="step-description">
                <div className="screenshot-wrapper">
                  <img src={rotateCopyEntry} alt="Rotate Copy Entry" className="software-screenshot screenshot-wide" />
                </div>
              </div>
            </div>

            <div className="lesson-navigation">
              <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button>
              <button className="nav-button next" onClick={handleNext}>{nextLabel || 'Next'} <ChevronRight size={18} /></button>
            </div>
          </div>
        )}

        {activeTab === 'mirrorCopy' && (
          <div className="lesson-card tab-content fade-in">
            <div className="card-header">
              <h4>MIRROR COPY</h4>
              <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(mirrorCopySteps)} onStop={stop} />
            </div>

            <div className="instruction-step">
              <p className="p-flush text-highlight mb-8">Creates a duplicate by mirroring across a plane. Uses the same procedure as Mirror Component.</p>
              <div className="screenshot-wrapper">
                <img src={mirrorCopyIcon} alt="Mirror Copy Icon" className="software-screenshot screenshot-small" style={{ width: '250px' }} />
              </div>
              <div className="screenshot-wrapper mt-8">
                <img src={mirrorCopyResult} alt="Mirror Copy Result" className="software-screenshot screenshot-medium" />
              </div>
            </div>

            <div className="lesson-navigation">
              <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button>
              <button className="nav-button next" onClick={handleNext}>{nextLabel || 'Next'} <ChevronRight size={18} /></button>
            </div>
          </div>
        )}

        {activeTab === 'delete' && (
          <div className="lesson-card tab-content fade-in">
            <div className="card-header">
              <h4>DELETE COMPONENT</h4>
              <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(deleteSteps)} onStop={stop} />
            </div>

            <div className={`instruction-step ${currentIndex === 0 ? 'reading-active' : ''}`}>
              <div className="step-header">
                <span className="step-number">1 </span>
                <span className="step-label">Select <strong className="text-highlight">Delete Component</strong> from the icon menu.</span>
              </div>
              <div className="step-description">
                <div className="screenshot-wrapper">
                  <img src={deleteIcon} alt="Delete Component Icon" className="software-screenshot screenshot-small" style={{ width: '250px' }} />
                </div>
              </div>
            </div>

            <div className="section-divider"></div>

            <div className={`instruction-step ${currentIndex === 1 ? 'reading-active' : ''}`}>
              <div className="step-header">
                <span className="step-number">2 </span>
                <span className="step-label">Select the components to be removed.</span>
              </div>
            </div>

            <div className="lesson-navigation">
              <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button>
              <button className="nav-button next" onClick={onNextLesson}>{nextLabel || 'Next Lesson'} <ChevronRight size={18} /></button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

interface ComponentLessonProps { subLessonId: string; onNextLesson?: () => void; onPrevLesson?: () => void; nextLabel?: string; }

const ComponentLesson: React.FC<ComponentLessonProps> = ({ subLessonId, onNextLesson, onPrevLesson, nextLabel }) => {
  if (subLessonId === 'component-1') {
    return <Component1 onNextLesson={onNextLesson} onPrevLesson={onPrevLesson} nextLabel={nextLabel} />;
  }
  return <Component2 onNextLesson={onNextLesson} onPrevLesson={onPrevLesson} nextLabel={nextLabel} />;
};

export default ComponentLesson;
