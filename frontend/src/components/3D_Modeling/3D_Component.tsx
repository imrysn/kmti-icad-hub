/** * 3D_Component.tsx  EComponent operations lessons (1 and 2) */

import React,
 {

useState,

useEffect, useRef } from 'react';

import { ChevronLeft, ChevronRight, MousePointer2, Box as BoxIcon, Zap, ArrowRight } from 'lucide-react'; import { ReadAloudButton } from "../ReadAloudButton";
import { useTTS } from "../../hooks/useTTS";

import '../../styles/3D_Modeling/CourseLesson.css';

import '../../styles/3D_Modeling/CourseLesson.css';
 /* Component (1) Assets */

import componentMenu from '../../assets/3D_Image_File/component(1)_move_copy_delete.png';

import moveIcon from '../../assets/3D_Image_File/component(1)_move.png';

import moveResult from '../../assets/3D_Image_File/component(1)_move_2.png';

import moveEntry from '../../assets/3D_Image_File/component(1)_move_entry.png';

import copyIcon from '../../assets/3D_Image_File/component(1)_copy.png';

import copyDistance from '../../assets/3D_Image_File/component(1)_copy_2.png';

import copyFinal from '../../assets/3D_Image_File/component(1)_copy_3.png';

import mirrorIcon from '../../assets/3D_Image_File/component(1)_mirror.png';

import mirrorResult from '../../assets/3D_Image_File/component(1)_mirror_3.png';

import rotateIcon from '../../assets/3D_Image_File/component(1)_rotate.png';

import rotateResult from '../../assets/3D_Image_File/component(1)_rotate_3.png';

import rotateEntry from '../../assets/3D_Image_File/component(1)_rotate_4.png';

import leftClick from '../../assets/3D_Image_File/left_click.png';

interface ComponentLessonProps
 {
  nextLabel?: string; subLessonId: string; onNextLesson?: () => void; onPrevLesson?: () => void; }

const Component1: React.FC<{ onNextLesson?: () => void; onPrevLesson?: () => void }> = ({ onNextLesson, onPrevLesson 
, nextLabel }) =>
 {

const [activeTab, setActiveTab] = useState<'move' | 'copy' | 'mirror' | 'rotate'>('move'); const { speak, stop, isSpeaking, currentIndex } = useTTS(); const moveSteps = [ "Step 1: Select Move Component from the icon menu.", "Step 2: Select the component to move and click GO.", "Step 3: Specify the movement distance on the X, Y, and Z axes on the item entry then press Enter." ]; const copySteps = [ "Step 1: Select Copy Component from the icon menu.", "Step 2: Select the component to copy and click GO.", "Step 3: Specify the distance and the number of copies needed then press Enter." ]; const mirrorSteps = [ "Step 1: Select Mirror Component from the icon menu.", "Step 2: Select the components to be mirrored and click GO.", "Step 3: Select 3 points to set the mirror plane or left-click on a face." ]; const rotateSteps = [ "Step 1: Select Rotate Component from the icon menu.", "Step 2: Select the component to rotate and click GO.", "Step 3: Select 2 points to set the axis of rotation.", "Step 4: Specify the desired angle of rotation on the item entry then press Enter." ]; const getStepClass = (stepId: string) => "instruction-step"; const tabs = [ { id: 'move', label: 'Move' }, { id: 'copy', label: 'Copy' }, { id: 'mirror', label: 'Mirror' }, { id: 'rotate', label: 'Rotate' } ]; const handleNext = () => { if (activeTab === 'move') setActiveTab('copy'); else if (activeTab === 'copy') setActiveTab('mirror'); else if (activeTab === 'mirror') setActiveTab('rotate'); else if (onNextLesson) onNextLesson(); }; const handlePrev = () => { if (activeTab === 'copy') setActiveTab('move'); else if (activeTab === 'mirror') setActiveTab('copy'); else if (activeTab === 'rotate') setActiveTab('mirror'); else if (onPrevLesson) onPrevLesson(); }; return ( <div className="tab-content-area"> <div className="lesson-tabs"> {tabs.map(tab => ( <button key={tab.id} className={`tab-button ${activeTab === tab.id ? 'active' : ''}`} onClick={() => setActiveTab(tab.id as any)}>{tab.label}</button> ))} </div> {activeTab === 'move' && ( <div className="tab-pane fade-in"> <div className="card-header"><h4>MOVE COMPONENT</h4> <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(moveSteps)} onStop={stop} /> </div> <div className={`${getStepClass('move-1')} ${currentIndex === 0 ? 'reading-active' : ''}`}> <div className="step-header"> <span className="step-number"> 1 </span> <span className="step-label">Select <strong className="text-highlight">Move Component</strong> from the icon menu.</span> </div> <div className="step-description"> <div className="image-wrapper-flush"> <img src={moveIcon} alt="Move Component Icon" className="software-screenshot screenshot-small" /> </div> </div> </div> <div className={`${getStepClass('move-2')} ${currentIndex === 1 ? 'reading-active' : ''}`} /* sanitized: marginTop: '1.5rem' */> <div className="step-header"> <span className="step-number"> 2 </span> <span className="step-label">Select the component to be move &gt; <strong className="text-highlight">GO</strong> <img src={leftClick} alt="Left click" className="screenshot-click--inline" /></span> </div> <div className="step-description"> </div> </div> <div className={`${getStepClass('move-3')} ${currentIndex === 2 ? 'reading-active' : ''}`} /* sanitized: marginTop: '1.5rem' */> <div className="step-header"> <span className="step-number"> 3 </span> <span className="step-label">Specify the movement distance on the X, Y and Z-axis on the item entry &gt; Press <strong className="text-highlight">Enter</strong></span> </div> <div className="step-description"> <div className="flex-row-center--wrap"> <div className="image-wrapper-flush"> <img src={moveEntry} alt="Move Item Entry" className="software-screenshot screenshot-large" /> </div> </div> </div> </div> <div className="section-divider"> </div> <div className="tool-block"> <h4 className="section-title">RESULT</h4> <div className="flex-row-center--wrap"> <div className="image-wrapper-flush"> <img src={moveResult} alt="Move Result" className="software-screenshot screenshot-medium" /> </div> </div> </div> <div > </div> <div className="lesson-navigation"> <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button> <button className="nav-button next" onClick={handleNext}>{nextLabel || 'Next'} <ChevronRight size={18} /></button> </div> </div> )} {activeTab === 'copy' && ( <div className="tab-pane fade-in"> <div className="card-header"><h4>COPY COMPONENT</h4> <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(copySteps)} onStop={stop} /> </div> <div className={`${getStepClass('copy-1')} ${currentIndex === 0 ? 'reading-active' : ''}`}> <div className="step-header"> <span className="step-number"> 1 </span> <span className="step-label">Select <strong className="text-highlight">Copy Component</strong> from the icon menu.</span> </div> <div className="step-description"> <div className="image-wrapper-flush"> <img src={copyIcon} alt="Copy Component Icon" className="software-screenshot screenshot-small" /> </div> </div> </div> <div className={`${getStepClass('copy-2')} ${currentIndex === 1 ? 'reading-active' : ''}`} /* sanitized: marginTop: '1.5rem' */> <div className="step-header"> <span className="step-number"> 2 </span> <span className="step-label">Select the component to be copy &gt; <strong className="text-highlight">GO</strong> <img src={leftClick} alt="Left click" className="screenshot-click--inline" /></span> </div> <div className="step-description"> </div> </div> <div className={`${getStepClass('copy-3')} ${currentIndex === 2 ? 'reading-active' : ''}`} /* sanitized: marginTop: '1.5rem' */> <div className="step-header"> <span className="step-number"> 3 </span> <span className="step-label">Specify the distance on the X, Y and Z-axis and the number of copies needed &gt; Press <strong className="text-highlight">Enter</strong></span> </div> <div className="step-description"> <div className="flex-row-center--wrap"> <div className="image-wrapper-flush"> <img src={copyFinal} alt="Copy Result" className="software-screenshot screenshot-large" /> </div> </div> </div> </div> <div className="section-divider"> </div> <div className="tool-block"> <h4 className="section-title">RESULT</h4> <div className="flex-row-center--wrap"> <div className="image-wrapper-flush"> <img src={copyDistance} alt="Copy Distance/Number" className="software-screenshot screenshot-medium" /> </div> </div> </div> <div className="lesson-navigation"> <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button> <button className="nav-button next" onClick={handleNext}>{nextLabel || 'Next'} <ChevronRight size={18} /></button> </div> </div> )} {activeTab === 'mirror' && ( <div className="tab-pane fade-in"> <div className="card-header"><h4>MIRROR COMPONENT</h4> <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(mirrorSteps)} onStop={stop} /> </div> <p >Use to move/relocate a component by mirror movement. </p> <div className={`${getStepClass('mirror-1')} ${currentIndex === 0 ? 'reading-active' : ''}`}> <div className="step-header"> <span className="step-number"> 1 </span> <span className="step-label">Select <strong className="text-highlight">Mirror Component</strong> from the icon menu.</span> </div> <div className="step-description"> <div className="image-wrapper-flush"> <img src={mirrorIcon} alt="Mirror Component Icon" className="software-screenshot screenshot-small" /> </div> </div> </div> <div className={`${getStepClass('mirror-2')} ${currentIndex === 1 ? 'reading-active' : ''}`} /* sanitized: marginTop: '1.5rem' */> <div className="step-header"> <span className="step-number"> 2 </span> <span className="step-label">Select the components to be mirror &gt; <strong className="text-highlight">GO</strong> <img src={leftClick} alt="Left click" className="screenshot-click--inline" /></span> </div> <div className="step-description"> </div> </div> <div className={`${getStepClass('mirror-3')} ${currentIndex === 2 ? 'reading-active' : ''}`} /* sanitized: marginTop: '1.5rem' */> <div className="step-header"> <span className="step-number"> 3 </span> <span className="step-label">Select 3-points to set the plane where the entity will be mirrored or left-click on the face where the entity will be mirrored.</span> </div> <div className="step-description"> <div className="image-wrapper-flush"> <img src={mirrorResult} alt="Mirror Points and Result" className="software-screenshot screenshot-medium" /> </div> </div> </div> <div className="lesson-navigation"> <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button> <button className="nav-button next" onClick={handleNext}>{nextLabel || 'Next'} <ChevronRight size={18} /></button> </div> </div> )} {activeTab === 'rotate' && ( <div className="tab-pane fade-in"> <div className="card-header"><h4>ROTATE COMPONENT</h4> <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(rotateSteps)} onStop={stop} /> </div> <p >Use to move/relocate a component by rotating on an axis. </p> <div className={`${getStepClass('rotate-1')} ${currentIndex === 0 ? 'reading-active' : ''}`}> <div className="step-header"> <span className="step-number"> 1 </span> <span className="step-label">Select <strong className="text-highlight">Rotate Component</strong> from the icon menu.</span> </div> <div className="step-description"> <div className="image-wrapper-flush"> <img src={rotateIcon} alt="Rotate Component Icon" className="software-screenshot screenshot-small" /> </div> </div> </div> <div className={`${getStepClass('rotate-2')} ${currentIndex === 1 ? 'reading-active' : ''}`} /* sanitized: marginTop: '1.5rem' */> <div className="step-header"> <span className="step-number"> 2 </span> <span className="step-label">Select the component to be rotate &gt; <strong className="text-highlight">GO</strong> <img src={leftClick} alt="Left click" className="screenshot-click--inline" /></span> </div> <div className="step-description"> </div> </div> <div className={`${getStepClass('rotate-3')} ${currentIndex === 2 ? 'reading-active' : ''}`} /* sanitized: marginTop: '1.5rem' */> <div className="step-header"> <span className="step-number"> 3 </span> <span className="step-label">Select 2-points to set the axis of rotation.</span> </div> <div className="step-description"> </div> </div> <div className={`${getStepClass('rotate-4')} ${currentIndex === 3 ? 'reading-active' : ''}`} /* sanitized: marginTop: '1.5rem' */> <div className="step-header"> <span className="step-number"> 4 </span> <span className="step-label">Specify the desired angle of rotation on the item entry &gt; Press <strong className="text-highlight">Enter</strong></span> </div> <div className="step-description"> <div className="flex-row-center--wrap"> <div className="image-wrapper-flush"> <img src={rotateEntry} alt="Rotate Angle Entry" className="software-screenshot screenshot-large" /> </div> </div> </div> </div> <div className="section-divider"> </div> <div className="tool-block"> <h4 className="section-title">RESULT</h4> <div className="flex-row-center--wrap"> <div className="image-wrapper-flush"> <img src={rotateResult} alt="Rotate Result" className="software-screenshot screenshot-medium" /> </div> </div> </div> <div > </div> <div className="lesson-navigation"> <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button> <button className="nav-button next" onClick={handleNext}>{nextLabel || 'Next'} <ChevronRight size={18} /></button> </div> </div> )} </div> ); }; /* Component (2) Assets */ import repeatCopyIcon from '../../assets/3D_Image_File/component(2)_repeat_copy.png'; import repeatCopyResult from '../../assets/3D_Image_File/component(2)_repeat_copy2.png'; import rotateCopyIcon from '../../assets/3D_Image_File/component(2)_rotate_copy.png'; import rotateCopyPoints from '../../assets/3D_Image_File/component(2)_rotate_copy_3.png'; import rotateCopyEntry from '../../assets/3D_Image_File/component(2)_rotate_copy_4.png'; import mirrorCopyIcon from '../../assets/3D_Image_File/component(2)_mirror_copy.png'; import mirrorCopyResult from '../../assets/3D_Image_File/component(2)_mirror_copy_2.png'; import deleteIcon from '../../assets/3D_Image_File/component(2)_delete.png'; const Component2: React.FC<{ onNextLesson?: () => void; onPrevLesson?: () => void }> = ({ onNextLesson, onPrevLesson , nextLabel }) => { const [activeTab, setActiveTab] = useState<'repeat' | 'rotateCopy' | 'mirrorCopy' | 'delete'>('repeat'); const { speak, stop, isSpeaking, currentIndex } = useTTS(); const repeatSteps = [ "Step 1: Select Repeat Copy Tool from the menu.", "Step 2: Select the component to be duplicated and click GO." ]; const rotateCopySteps = [ "Step 1: Select Rotate Component from the icon menu.", "Step 2: Select the component to rotate and click GO.", "Step 3: Select 2 points to set the axis of rotation.", "Step 4: Specify the desired angle of rotation on the item entry then press Enter." ]; const mirrorCopySteps = [ "Mirror Copy: Use to create a duplicate by mirror movement. The procedure is the same as the standard Mirror Component tool." ]; const deleteSteps = [ "Step 1: Select Delete Component from the icon menu.", "Step 2: Select the components manually or in bulk that you wish to remove." ]; const getStepClass = (stepId: string) => "instruction-step"; const tabs = [ { id: 'repeat', label: 'Repeat Copy' }, { id: 'rotateCopy', label: 'Rotate Copy' }, { id: 'mirrorCopy', label: 'Mirror Copy' }, { id: 'delete', label: 'Delete' } ]; const handleNext = () => { if (activeTab === 'repeat') setActiveTab('rotateCopy'); else if (activeTab === 'rotateCopy') setActiveTab('mirrorCopy'); else if (activeTab === 'mirrorCopy') setActiveTab('delete'); else if (onNextLesson) onNextLesson(); }; const handlePrev = () => { if (activeTab === 'rotateCopy') setActiveTab('repeat'); else if (activeTab === 'mirrorCopy') setActiveTab('rotateCopy'); else if (activeTab === 'delete') setActiveTab('mirrorCopy'); else if (onPrevLesson) onPrevLesson(); }; return ( <div className="tab-content-area"> <div className="lesson-tabs"> {tabs.map(tab => ( <button key={tab.id} className={`tab-button ${activeTab === tab.id ? 'active' : ''}`} onClick={() => setActiveTab(tab.id as any)}>{tab.label}</button> ))} </div> {activeTab === 'repeat' && ( <div className="tab-pane fade-in"> <div className="card-header"><h4>REPEAT COPY COMPONENT</h4> <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(repeatSteps)} onStop={stop} /> </div> <p >Use for continuous duplication of component. </p> <div className={`${getStepClass('repeat-1')} ${currentIndex === 0 ? 'reading-active' : ''}`}> <div className="step-header"> <span className="step-number"> 1 </span> <span className="step-label">Select Repeat Copy Tool</span> </div> <div className="image-wrapper-flush"> <img src={repeatCopyIcon} alt="Repeat Copy Icon" className="software-screenshot screenshot-small" /> </div> </div> <div className={`${getStepClass('repeat-2')} ${currentIndex === 1 ? 'reading-active' : ''}`} /* sanitized: marginTop: '1.5rem' */> <div className="step-header"> <span className="step-number"> 2 </span> <span className="step-label">Select the component to be copied &gt; <strong className="text-highlight">GO</strong> <img src={leftClick} alt="Left click" className="screenshot-click--inline" /></span> </div> <div className="image-wrapper-flush"> <img src={repeatCopyResult} alt="Repeat Copy Result" className="software-screenshot screenshot-wide" /> </div> </div> <div > </div> <div className="lesson-navigation"> <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button> <button className="nav-button next" onClick={handleNext}>{nextLabel || 'Next'} <ChevronRight size={18} /></button> </div> </div> )} {activeTab === 'rotateCopy' && ( <div className="tab-pane fade-in"> <div className="card-header"><h4>ROTATE COPY COMPONENT</h4> <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(rotateCopySteps)} onStop={stop} /> </div> <p >Use to create a duplicate of a component by rotating on an axis. </p> <div className="image-wrapper-flush"> <img src={rotateCopyIcon} alt="Rotate Copy Icon" className="software-screenshot screenshot-small" /> </div> <div className={`${getStepClass('rotateCopy-1')} ${currentIndex === 0 ? 'reading-active' : ''}`}> <div className="step-header"> <span className="step-number"> 1 </span> <span className="step-label">Select <strong className="text-highlight">Rotate Component</strong> from the icon menu.</span> </div> <div className="step-description"> </div> </div> <div className={`${getStepClass('rotateCopy-2')} ${currentIndex === 1 ? 'reading-active' : ''}`} /* sanitized: marginTop: '1.5rem' */> <div className="step-header"> <span className="step-number"> 2 </span> <span className="step-label">Select the component/s to be rotated &gt; <strong className="text-highlight">GO</strong> <img src={leftClick} alt="Left click" className="screenshot-click--inline" /></span> </div> <div className="step-description"> </div> </div> <div className={`${getStepClass('rotateCopy-3')} ${currentIndex === 2 ? 'reading-active' : ''}`} /* sanitized: marginTop: '1.5rem' */> <div className="step-header"> <span className="step-number"> 3 </span> <span className="step-label">Select 2 points to set the axis of rotation.</span> </div> <div className="step-description"> <div className="image-wrapper-flush"> <img src={rotateCopyPoints} alt="Rotate Copy Points" className="software-screenshot screenshot-language" /> </div> </div> </div> <div className={`${getStepClass('rotateCopy-4')} ${currentIndex === 3 ? 'reading-active' : ''}`} /* sanitized: marginTop: '1.5rem' */> <div className="step-header"> <span className="step-number"> 4 </span> <span className="step-label">Specify the desired angle of rotation on the item entry &gt; Press <strong className="text-highlight">Enter</strong></span> </div> <div className="step-description"> <div className="image-wrapper-flush"> <img src={rotateCopyEntry} alt="Rotate Copy Entry" className="software-screenshot screenshot-wide" /> </div> </div> </div> <div className="lesson-navigation"> <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button> <button className="nav-button next" onClick={handleNext}>{nextLabel || 'Next'} <ChevronRight size={18} /></button> </div> </div> )} {activeTab === 'mirrorCopy' && ( <div className="tab-pane fade-in"> <div className="card-header"><h4>MIRROR COPY COMPONENT</h4> <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(mirrorCopySteps)} onStop={stop} /> </div> <p >Use to create a duplicate of a component by mirror movement. </p> <div className="image-wrapper-flush"> <img src={mirrorCopyIcon} alt="Mirror Copy Icon" className="software-screenshot screenshot-small" /> </div> <p className="p-flush">Same procedure with Mirror Component. </p> <div className="image-wrapper-flush"> <img src={mirrorCopyResult} alt="Mirror Copy Result" className="software-screenshot screenshot-large" /> </div> <div className="lesson-navigation"> <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button> <button className="nav-button next" onClick={handleNext}>{nextLabel || 'Next'} <ChevronRight size={18} /></button> </div> </div> ) } { activeTab === 'delete' && ( <div className="tab-pane fade-in"> <div className="card-header"><h4>DELETE COMPONENT</h4> <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(deleteSteps)} onStop={stop} /> </div> <div className={`${getStepClass('delete-1')} ${currentIndex === 0 ? 'reading-active' : ''}`}> <div className="step-header"> <span className="step-number"> 1 </span> <span className="step-label">Select <strong className="text-highlight">Delete Component</strong> from the icon menu.</span> </div> <div className="step-description"> <div className="image-wrapper-flush"> <img src={deleteIcon} alt="Delete Component Icon" className="software-screenshot screenshot-small" /> </div> </div> </div> <div className={`${getStepClass('delete-2')} ${currentIndex === 1 ? 'reading-active' : ''}`} /* sanitized: marginTop: '1.5rem' */> <div className="step-header"> <span className="step-number"> 2 </span> <span className="step-label">Select components to be deleted.</span> </div> <div className="step-description"> </div> </div> <div > </div> <div className="lesson-navigation"> <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button> <button className="nav-button next" onClick={handleNext}>{nextLabel || 'Next Lesson'} <ChevronRight size={18} /></button> </div> </div> ) } </div > ); }; const ComponentLesson: React.FC<ComponentLessonProps> = ({ subLessonId, onNextLesson, onPrevLesson , nextLabel }) => { const [scrollProgress, setScrollProgress] = useState(0);

const containerRef = useRef<HTMLDivElement>(null);

useEffect(() =>
 {

const handleScroll = () =>
 {

if (!containerRef.current) return;

const element = containerRef.current;

const totalHeight = element.scrollHeight - element.clientHeight;

if (totalHeight === 0)
 { setScrollProgress(100); return; }

const progress = (element.scrollTop / totalHeight) * 100; setScrollProgress(progress); 
};

const currentContainer = containerRef.current;

if (currentContainer) {
    currentContainer.addEventListener('scroll', handleScroll);
    handleScroll(); // Run once to initialize
  }

return () =>
 {

if (currentContainer)
 { currentContainer.removeEventListener('scroll', handleScroll); } 
}; }, [subLessonId]);

return (

<div className="course-lesson-container" ref={containerRef}>
 {/* Sticky Progress Bar */}

<div className="lesson-progress-container">

<div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />

</div>

<section className="lesson-intro">

<h3 className="section-title">MOVE/COPY/DELETE COMPONENT
</h3>

<p className="p-flush">These tools are used to change the position, duplicate or delete components such as drill holes, cutouts, components of merged entities.
</p>

<div className="instruction-box">

<div className="image-wrapper-flush">

<img src={componentMenu} alt="Component Operation Menu" className="software-screenshot screenshot-small" />

</div>

</div>

</section>

<div className="lesson-grid single-card">

<div className="lesson-card tab-content">
 {subLessonId === 'component-1' ? ( <Component1 onNextLesson={onNextLesson} onPrevLesson={onPrevLesson} />
 ) : ( <Component2 onNextLesson={onNextLesson} onPrevLesson={onPrevLesson} />
 )}

</div>

</div>

</div>
 ); 
};

export default ComponentLesson; 
