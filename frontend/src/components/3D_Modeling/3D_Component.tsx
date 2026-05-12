/** * 3D_Component.tsx – Component operations lessons (Consolidated) */

import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useLessonCore } from '../../hooks/useLessonCore';
import { ReadAloudButton } from "../ReadAloudButton";
import { KaraokeLessonText } from "../KaraokeLessonText";
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

interface ComponentLessonProps {
  subLessonId: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
  nextLabel?: string;
}

const ComponentLesson: React.FC<ComponentLessonProps> = ({ subLessonId, onNextLesson, onPrevLesson, nextLabel }) => {
  const [activeTab, setActiveTab] = useState<'move' | 'copy' | 'mirror' | 'rotate' | 'repeat' | 'rotateCopy' | 'mirrorCopy' | 'delete'>(() => {
    return (localStorage.getItem(`${subLessonId}-tab`) as any) || 'move';
  });

  const {
    scrollProgress,
    containerRef,
    speak,
    stop,
    isSpeaking,
    currentIndex,
    currentCharIndex
  } = useLessonCore(`${subLessonId}-${activeTab}`);

  useEffect(() => {
    localStorage.setItem(`${subLessonId}-tab`, activeTab);
  }, [subLessonId, activeTab]);

  const moveSteps = [
    "MOVE COMPONENT", 
    "Step 1: Select Move Component from the icon menu.", 
    "Select the component to move then GO", 
    "Specify the movement distance on the X,Y and Z-axis on the item entry. then Press Enter", 
    "RESULT"
  ];
  const copySteps = 
  ["COPY COMPONENT", 
    "Step 1: Select Copy Component from the icon menu.", 
    "Select the component to copy then GO", 
    "Specify the distance on the X,Y and Z-axis and the number of copies needed then Press Enter", 
    "RESULT"
  ];
  const mirrorSteps = [
    "MIRROR COMPONENT", 
    "Use to move/relocate a component by mirror movement.", 
    "Step 1: Select Mirror Component from the icon menu.",
    "Select the components to be mirror then GO", 
    "Select 3-points to set the plane where the entity will be mirrored or left-click on the face where the entity will be mirrored.", 
    "RESULT"
  ];
  const rotateSteps = [
    "ROTATE COMPONENT", 
    "Use to move/relocate a component by rotating on an axis.", 
    "Step 1: Select Rotate Component from the icon menu.", 
    "Select the component to rotate then GO",
    "Select 2 points to set the axis of rotation.", 
    "Step 4: Specify the desired angle of rotation on the item entry then press Enter.", 
    "RESULT"
    ];
  const repeatSteps = [
    "REPEAT COPY COMPONENT",
     "Use for continuous duplication of component.", 
     "RESULT"
    ];
  const rotateCopySteps = [
    "ROTATE COPY COMPONENT", 
    "Use to create a duplicate of a component by rotating on an axis.",
    "Step 1: Select Rotate Component from the icon menu.", 
    "Select the component to be rotated then GO", 
    "Step 3: Select 2 points to set the axis of rotation.", 
    "Step 4: Specify the desired angle of rotation on the item entry then press Enter.",
    "RESULT"
    ];
  const mirrorCopySteps = [
    "MIRROR COPY COMPONENT",
    "Use to create a duplicate of a component by mirror movement.", 
    "Same procedure with Mirror Component.",
    "RESULT"
    ];
  const deleteSteps = [
    "DELETE COMPONENT", 
    "Step 1: Select Delete Component from the icon menu.",
    "Select components to be deleted."
  ];

  const tabs = [
    { id: 'move', label: 'Move' },
    { id: 'copy', label: 'Copy' },
    { id: 'mirror', label: 'Mirror' },
    { id: 'rotate', label: 'Rotate' },
    { id: 'repeat', label: 'Repeat Copy' },
    { id: 'rotateCopy', label: 'Rotate Copy' },
    { id: 'mirrorCopy', label: 'Mirror Copy' },
    { id: 'delete', label: 'Delete' }
  ];

  const handleNext = () => {
    const i = tabs.findIndex(t => t.id === activeTab);
    if (i < tabs.length - 1) setActiveTab(tabs[i + 1].id as any);
    else if (onNextLesson) onNextLesson();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrev = () => {
    const i = tabs.findIndex(t => t.id === activeTab);
    if (i > 0) setActiveTab(tabs[i - 1].id as any);
    else if (onPrevLesson) onPrevLesson();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const introTitle = "Move / Copy / Delete Component";
  const introSubtitle = "These tools use to change the position, duplicate or delete components such as drill holes, cutouts, components or merged entities.";

  return (
    <div className="course-lesson-container" ref={containerRef}>
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>
      <div className="lesson-tabs" style={{ width: '900px', margin: '0 auto' }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id as any)}
            style={{ flex: 1, textAlign: 'center', padding: '0.5rem 0.6rem' }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <section className="lesson-intro">
        <h3 className={`section-title ${currentIndex === 0 ? "reading-active" : ""}`} data-reading-index="0">
          <KaraokeLessonText
            as="span"
            text={introTitle}
            isActive={isSpeaking && currentIndex === 0}
            currentCharIndex={currentCharIndex}
          />
          <ReadAloudButton isSpeaking={isSpeaking} onStart={() => {
            const steps = activeTab === 'move' ? moveSteps :
                           activeTab === 'copy' ? copySteps :
                           activeTab === 'mirror' ? mirrorSteps :
                           activeTab === 'rotate' ? rotateSteps :
                           activeTab === 'repeat' ? repeatSteps :
                           activeTab === 'rotateCopy' ? rotateCopySteps :
                           activeTab === 'mirrorCopy' ? mirrorCopySteps : deleteSteps;
            speak([introTitle, introSubtitle, ...steps]);
          }} onStop={stop} />
        </h3>
        <KaraokeLessonText
          className={`lesson-subtitle ${currentIndex === 1 ? "reading-active" : ""}`}
          data-reading-index="1"
          text={introSubtitle}
          isActive={isSpeaking && currentIndex === 1}
          currentCharIndex={currentCharIndex}
        />
        <div>
          <img src={componentMenu} alt="Component Operations Menu" className="software-screenshot mt-4" style={{ height: '350px' }} />
        </div>
      </section>

      <div className="lesson-grid single-card">
        {activeTab === 'move' && (
          <div className="lesson-card tab-content fade-in">
            <div className="card-header">
              <h4 className={`${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
                <KaraokeLessonText
                  as="span"
                  text="MOVE COMPONENT"
                  isActive={isSpeaking && currentIndex === 2}
                  currentCharIndex={currentCharIndex}
                />
              </h4>
            </div>

            <div className={`instruction-step ${currentIndex === 3 ? 'reading-active' : ''}`} data-reading-index="3">
              <div className="step-header">
                <span className="step-number">1 </span>
                <span className="step-label">
                  <KaraokeLessonText
                    as="span"
                    text="Select Move Component from the icon menu."
                    isActive={isSpeaking && currentIndex === 3}
                    currentCharIndex={currentCharIndex}
                  />
                </span>
              </div>
              <div className="step-description">
                    <img src={moveIcon} alt="Move Component Icon" className="software-screenshot mt-4" style={{ width: '200px', marginBottom: '-2rem' }} />
              </div>
            </div>


            <div className={`instruction-step ${currentIndex === 4 ? 'reading-active' : ''}`} data-reading-index="4" style={{ marginBottom: "-2rem"}}>
              <div className="step-header">
                <span className="step-number">2 </span>
                <span className="step-label" style={{ marginTop: "-1.5rem"}}>
                  <KaraokeLessonText
                    as="span"
                    text="Select the component to move &gt; GO"
                    isActive={isSpeaking && currentIndex === 4}
                    currentCharIndex={currentCharIndex}
                  />
                  <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '40px', margin: '0 8px' }} />
                </span>
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 5 ? 'reading-active' : ''}`} data-reading-index="5">
              <div className="step-header">
                <span className="step-number">3 </span>
                <span className="step-label">
                  <KaraokeLessonText
                    as="span"
                    text="Specify the movement distance on the X,Y and Z-axis on the item entry. Press Enter"
                    isActive={isSpeaking && currentIndex === 5}
                    currentCharIndex={currentCharIndex}
                  />
                </span>
              </div>
              <div className="step-description">
                    <img src={moveEntry} alt="Move Entry" className="software-screenshot mt-4" style={{ width: '900px' }} />
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 6 ? 'reading-active' : ''}`} data-reading-index="6">
              <div className="card-header">
                <h4 className={`${currentIndex === 6 ? 'reading-active' : ''}`} data-reading-index="6">
                  <KaraokeLessonText
                    as="span"
                    text="RESULT"
                    isActive={isSpeaking && currentIndex === 6}
                    currentCharIndex={currentCharIndex}
                  />
                </h4>
              </div>
              <div className="flex-row-wrap mt-8" style={{ gap: '2rem' }}>
                    <img src={moveResult} alt="Move Result" className="software-screenshot mt-8" style={{ width: '700px' }} />
              </div>
            </div>

            <div className="lesson-navigation">
              <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button>
              <button className="nav-button next" onClick={handleNext}>Next <ChevronRight size={18} /></button>
            </div>
          </div>
        )}

        {activeTab === 'copy' && (
          <div className="lesson-card tab-content fade-in">
            <div className="card-header">
              <h4 className={`${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
                <KaraokeLessonText
                  as="span"
                  text="COPY COMPONENT"
                  isActive={isSpeaking && currentIndex === 2}
                  currentCharIndex={currentCharIndex}
                />
              </h4>
            </div>

            <div className={`instruction-step ${currentIndex === 3 ? 'reading-active' : ''}`} data-reading-index="3">
              <div className="step-header">
                <span className="step-number">1 </span>
                <span className="step-label">
                  <KaraokeLessonText
                    as="span"
                    text="Select Copy Component from the icon menu."
                    isActive={isSpeaking && currentIndex === 3}
                    currentCharIndex={currentCharIndex}
                  />
                </span>
              </div>
              <div className="step-description">
                    <img src={copyIcon} alt="Copy Component Icon" className="software-screensho mt-4" style={{ width: '200px', marginBottom: '-2rem' }} />
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 4 ? 'reading-active' : ''}`} data-reading-index="4" style={{ marginBottom: "-2rem"}}>
              <div className="step-header">
                <span className="step-number">2 </span>
                <span className="step-label" style={{ marginTop: "-1.5rem"}}>
                  <KaraokeLessonText
                    as="span"
                    text="Select the component to copy &gt; GO"
                    isActive={isSpeaking && currentIndex === 4}
                    currentCharIndex={currentCharIndex}
                  />
                  <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '40px', margin: '0 8px' }} />
                </span>
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 5 ? 'reading-active' : ''}`} data-reading-index="5">
              <div className="step-header">
                <span className="step-number">3 </span>
                <span className="step-label">
                  <KaraokeLessonText
                    as="span"
                    text="Specify the distance on the X,Y and Z-axis and the number of copies needed &gt; Press Enter"
                    isActive={isSpeaking && currentIndex === 5}
                    currentCharIndex={currentCharIndex}
                  />
                </span>
              </div>
              <div className="step-description">
                    <img src={copyFinal} alt="Copy Final" className="software-screenshot mt-4" style={{ width: '900px' }} />
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 6 ? 'reading-active' : ''}`} data-reading-index="6">
              <div className="card-header">
                <h4 className={`${currentIndex === 6 ? 'reading-active' : ''}`} data-reading-index="6">
                  <KaraokeLessonText
                    as="span"
                    text="RESULT"
                    isActive={isSpeaking && currentIndex === 6}
                    currentCharIndex={currentCharIndex}
                  />
                </h4>
              </div>
              <div className="flex-row-wrap mt-8" style={{ gap: '2rem' }}>
                    <img src={copyDistance} alt="Copy Distance" className="software-screenshot mt-8" style={{ width: '700px' }} />
              </div>
            </div>


            <div className="lesson-navigation">
              <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button>
              <button className="nav-button next" onClick={handleNext}>Next <ChevronRight size={18} /></button>
            </div>
          </div>
        )}

        {activeTab === 'mirror' && (
          <div className="lesson-card tab-content fade-in">
            <div className="card-header">
              <h4 className={`${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
                <KaraokeLessonText
                  as="span"
                  text="MIRROR COMPONENT"
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
              text="Use to move/relocate a component by mirror movement."
              isActive={isSpeaking && currentIndex === 3}
              currentCharIndex={currentCharIndex}
            />

            <div className={`instruction-step ${currentIndex === 4 ? 'reading-active' : ''}`} data-reading-index="4">
              <div className="step-header">
                <span className="step-number">1 </span>
                <span className="step-label">
                  <KaraokeLessonText
                    as="span"
                    text="Select Mirror Component from the icon menu."
                    isActive={isSpeaking && currentIndex === 4}
                    currentCharIndex={currentCharIndex}
                  />
                </span>
              </div>
              <div className="step-description">
                    <img src={mirrorIcon} alt="Mirror Component Icon" className="software-screenshot screenshot-small mt-4" style={{ width: '200px', marginBottom: '-3rem' }} />
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 5 ? 'reading-active' : ''}`} data-reading-index="5" style={{ marginBottom: "-3rem"}}>
              <div className="step-header">
                <span className="step-number">2 </span>
                <span className="step-label" style={{ marginTop: "-1.5rem"}}>
                  <KaraokeLessonText
                    as="span"
                    text="Select the components to be mirror &gt; GO"
                    isActive={isSpeaking && currentIndex === 5}
                    currentCharIndex={currentCharIndex}
                  />
                  <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '40px', margin: '0 8px' }} />
                </span>
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 6 ? 'reading-active' : ''}`} data-reading-index="6">
              <div className="step-header">
                <span className="step-number">3 </span>
                <span className="step-label" style={{marginTop: "1.5rem"}}>
                  <KaraokeLessonText
                    as="span"
                    text="Select 3-points to set the plane where the entity will be mirrored or left-click on the face where the entity will be mirrored."
                    isActive={isSpeaking && currentIndex === 6}
                    currentCharIndex={currentCharIndex}
                  />
                </span>
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
              <div className="flex-row-wrap mt-8" style={{ gap: '2rem' }}>
                    <img src={mirrorResult} alt="Mirror Result" className="software-screenshot mt-8" style={{ width: '700px' }} />
              </div>
            </div>

            <div className="lesson-navigation">
              <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button>
              <button className="nav-button next" onClick={handleNext}>Next <ChevronRight size={18} /></button>
            </div>
          </div>
        )}

        {activeTab === 'rotate' && (
          <div className="lesson-card tab-content fade-in">
            <div className="card-header">
              <h4 className={`${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
                <KaraokeLessonText
                  as="span"
                  text="ROTATE COMPONENT"
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
              text="Use to move/relocate a component by rotating on an axis."
              isActive={isSpeaking && currentIndex === 3}
              currentCharIndex={currentCharIndex}
            />

            <div className={`instruction-step ${currentIndex === 4 ? 'reading-active' : ''}`} data-reading-index="4">
              <div className="step-header">
                <span className="step-number">1 </span>
                <span className="step-label">
                  <KaraokeLessonText
                    as="span"
                    text="Select Rotate Component from the icon menu."
                    isActive={isSpeaking && currentIndex === 4}
                    currentCharIndex={currentCharIndex}
                  />
                </span>
              </div>
              <div className="step-description">
                    <img src={rotateIcon} alt="Rotate Component Icon" className="software-screenshot mt-4" style={{ width: '200px', marginBottom: '-3rem' }} />
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 5 ? 'reading-active' : ''}`} data-reading-index="5" style={{ marginBottom: "-2rem"}}>
              <div className="step-header">
                <span className="step-number">2 </span>
                  <span className="step-label" style={{ marginTop: "-1.5rem"}}>
                  <KaraokeLessonText
                    as="span"
                    text="Select the component to rotate &gt; GO"
                    isActive={isSpeaking && currentIndex === 5}
                    currentCharIndex={currentCharIndex}
                  />
                  <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '40px', margin: '0 8px' }} />
                </span>
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 6 ? 'reading-active' : ''}`} data-reading-index="6" style={{ marginBottom: "-2rem"}}>
              <div className="step-header">
                <span className="step-number">3 </span>
                <span className="step-label">
                  <KaraokeLessonText
                    as="span"
                    text="Select 2 points to set the axis of rotation."
                    isActive={isSpeaking && currentIndex === 6}
                    currentCharIndex={currentCharIndex}
                  />
                </span>
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 7 ? 'reading-active' : ''}`} data-reading-index="7">
              <div className="step-header">
                <span className="step-number">4 </span>
                <span className="step-label">
                  <KaraokeLessonText
                    as="span"
                    text="Specify the desired angle of rotation on the item entry then press Enter."
                    isActive={isSpeaking && currentIndex === 7}
                    currentCharIndex={currentCharIndex}
                  />
                </span>
              </div>
              <div className="step-description">
                    <img src={rotateEntry} alt="Rotate Entry" className="software-screenshot mt-4" style={{ width: '900px' }} />
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
              <div className="flex-row-wrap mt-8" style={{ gap: '2rem' }}>
                    <img src={rotateResult} alt="Rotate Result" className="software-screenshot mt-8" style={{ width: '700px' }} />
              </div>
            </div>
            <div className="lesson-navigation">
              <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button>
              <button className="nav-button next" onClick={handleNext}>Next <ChevronRight size={18} /></button>
            </div>
          </div>
        )}

        {activeTab === 'repeat' && (
          <div className="lesson-card tab-content fade-in">
            <div className="card-header">
              <h4 className={`${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
                <KaraokeLessonText
                  as="span"
                  text="REPEAT COPY COMPONENT"
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
              text="Use for continuous duplication of component."
              isActive={isSpeaking && currentIndex === 3}
              currentCharIndex={currentCharIndex}
            />


            <div className={`instruction-step ${currentIndex === 3 ? 'reading-active' : ''}`} data-reading-index="3">
              <div className="step-description">
                    <img src={repeatCopyIcon} alt="Repeat Copy Icon" className="software-screenshot mt-4" style={{ width: '200px' }} />
              </div>
            </div>

            

            <div className={`instruction-step ${currentIndex === 4 ? 'reading-active' : ''}`} data-reading-index="4">
              <div className="card-header">
                <h4 className={`${currentIndex === 4 ? 'reading-active' : ''}`} data-reading-index="4">
                  <KaraokeLessonText
                    as="span"
                    text="RESULT"
                    isActive={isSpeaking && currentIndex === 4}
                    currentCharIndex={currentCharIndex}
                  />
                </h4>
              </div>
              <div className="flex-row-wrap mt-8" style={{ gap: '2rem' }}>
                    <img src={repeatCopyResult} alt="Repeat Copy Result" className="software-screenshot mt-8" style={{ width: '900px' }} />
              </div>
            </div>

            <div className="lesson-navigation">
              <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button>
              <button className="nav-button next" onClick={handleNext}>Next <ChevronRight size={18} /></button>
            </div>
          </div>
        )}

        {activeTab === 'rotateCopy' && (
          <div className="lesson-card tab-content fade-in">
            <div className="card-header">
              <h4 className={`${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
                <KaraokeLessonText
                  as="span"
                  text="ROTATE COPY COMPONENT"
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
              text="Use to create a duplicate of a component by rotating on an axis."
              isActive={isSpeaking && currentIndex === 3}
              currentCharIndex={currentCharIndex}
            />

            <div className={`instruction-step ${currentIndex === 4 ? 'reading-active' : ''}`} data-reading-index="4">
              <div className="step-header">
                <span className="step-number">1 </span>
                <span className="step-label">
                  <KaraokeLessonText
                    as="span"
                    text="Select Rotate Component from the icon menu."
                    isActive={isSpeaking && currentIndex === 4}
                    currentCharIndex={currentCharIndex}
                  />
                </span>
              </div>
              <div className="step-description">
                    <img src={rotateCopyIcon} alt="Rotate Copy Icon" className="software-screenshot mt-4" style={{ width: '200px', marginBottom: '-3rem' }} />
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 5 ? 'reading-active' : ''}`} data-reading-index="5" style={{ marginBottom: "-2rem"}}>
              <div className="step-header">
                <span className="step-number">2 </span>
                  <span className="step-label" style={{ marginTop: "-1.5rem"}}>
                  <KaraokeLessonText
                    as="span"
                    text="Select the component to be rotated &gt; GO"
                    isActive={isSpeaking && currentIndex === 5}
                    currentCharIndex={currentCharIndex}
                  />
                  <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '40px', margin: '0 8px' }} />
                </span>
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 6 ? 'reading-active' : ''}`} data-reading-index="6" style={{ marginBottom: "-2rem"}}>
              <div className="step-header">
                <span className="step-number">3 </span>
                <span className="step-label">
                  <KaraokeLessonText
                    as="span"
                    text="Select 2 points to set the axis of rotation."
                    isActive={isSpeaking && currentIndex === 6}
                    currentCharIndex={currentCharIndex}
                  />
                </span>
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 7 ? 'reading-active' : ''}`} data-reading-index="7">
              <div className="step-header">
                <span className="step-number">4 </span>
                <span className="step-label">
                  <KaraokeLessonText
                    as="span"
                    text="Specify the desired angle of rotation on the item entry then press Enter."
                    isActive={isSpeaking && currentIndex === 7}
                    currentCharIndex={currentCharIndex}
                  />
                </span>
              </div>
              <div className="step-description">
                    <img src={rotateCopyEntry} alt="Rotate Copy Entry" className="software-screenshot mt-4" style={{ width: '900px', marginBottom: '-3rem' }} />
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
              <div className="flex-row-wrap mt-8" style={{ gap: '2rem' }}>
                    <img src={rotateCopyPoints} alt="Rotate Copy Points" className="software-screenshot mt-8" style={{ width: '900px' }} />
              </div>
            </div>


            <div className="lesson-navigation">
              <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button>
              <button className="nav-button next" onClick={handleNext}>Next <ChevronRight size={18} /></button>
            </div>
          </div>
        )}

        {activeTab === 'mirrorCopy' && (
          <div className="lesson-card tab-content fade-in">
            <div className="card-header">
              <h4 className={`${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
                <KaraokeLessonText
                  as="span"
                  text="MIRROR COPY COMPONENT"
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
              text="Use to create a duplicate of a component by mirror movement."
              isActive={isSpeaking && currentIndex === 3}
              currentCharIndex={currentCharIndex}
            />


            <div className={`instruction-step ${currentIndex === 4 ? 'reading-active' : ''}`} data-reading-index="4">
                <img src={mirrorCopyIcon} alt="Mirror Copy Icon" className="software-screenshot mt-4" style={{ width: '200px' }} />
              <KaraokeLessonText
                as="p"
                text="Same procedure with Mirror Component."
                isActive={isSpeaking && currentIndex === 4}
                currentCharIndex={currentCharIndex}
                style={{ marginTop: "2rem" }}
              />

              <div className="card-header">
                <h4 className={`${currentIndex === 4 ? 'reading-active' : ''}`} data-reading-index="4">
                  <KaraokeLessonText
                    as="span"
                    text="RESULT"
                    isActive={isSpeaking && currentIndex === 4}
                    currentCharIndex={currentCharIndex}
                  />
                </h4>
              </div>
              <div className="flex-row-wrap mt-8" style={{ gap: '2rem' }}>
                <img src={mirrorCopyResult} alt="Mirror Copy Result" className="software-screenshot mt-4" style={{ width: '900px' }} />
              </div>
            </div>

            <div className="lesson-navigation">
              <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button>
              <button className="nav-button next" onClick={handleNext}>Next <ChevronRight size={18} /></button>
            </div>
          </div>
        )}

        {activeTab === 'delete' && (
          <div className="lesson-card tab-content fade-in">
            <div className="card-header">
              <h4 className={`${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
                <KaraokeLessonText
                  as="span"
                  text="DELETE COMPONENT"
                  isActive={isSpeaking && currentIndex === 2}
                  currentCharIndex={currentCharIndex}
                />
              </h4>
            </div>

            <div className={`instruction-step ${currentIndex === 3 ? 'reading-active' : ''}`} data-reading-index="3">
              <div className="step-header">
                <span className="step-number">1 </span>
                <span className="step-label">
                  <KaraokeLessonText
                    as="span"
                    text="Select Delete Component from the icon menu."
                    isActive={isSpeaking && currentIndex === 3}
                    currentCharIndex={currentCharIndex}
                  />
                </span>
              </div>
              <div className="step-description">
                    <img src={deleteIcon} alt="Delete Component Icon" className="software-screenshot mt-4" style={{ width: '200px', marginBottom: '-3rem' }} />
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 4 ? 'reading-active' : ''}`} data-reading-index="4">
              <div className="step-header">
                <span className="step-number">2 </span>
                <span className="step-label">
                  <KaraokeLessonText
                    as="span"
                    text="Select components to be deleted."
                    isActive={isSpeaking && currentIndex === 4}
                    currentCharIndex={currentCharIndex}
                  />
                </span>
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

export default ComponentLesson;
