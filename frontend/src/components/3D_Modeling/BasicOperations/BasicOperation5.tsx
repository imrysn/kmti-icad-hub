import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLessonCore } from '../../../hooks/useLessonCore';
import { KaraokeLessonText } from '../../KaraokeLessonText';
import { shapeSteelsSteps } from '../VideoTutorialData/basicOpStepsData';

// Asset Imports
import shapeSteels1 from '../../../assets/3D_Image_File/basic_operation6_shape_steels1.png';
import shapeSteelsTypes from '../../../assets/3D_Image_File/basic_operation6_shape_steels.png';
import arrangeMachinePartMenu from '../../../assets/3D_Image_File/basic_operation6_arrange_machine_part.png';
import arrangeMachinePartWindow from '../../../assets/3D_Image_File/basic_operation6_arrange_machine_part_window.png';
import keyEntryArea from '../../../assets/3D_Image_File/basic_operation1_key_entry_area.png';
import shapeSteels2 from '../../../assets/3D_Image_File/basic_operation6_shape_steels2.png';

interface SubLessonProps {
  subLessonId: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
  nextLabel?: string;
}

const BasicOperation5: React.FC<SubLessonProps> = ({ subLessonId, onNextLesson, onPrevLesson, nextLabel }) => {
  const [activeTab, setActiveTab] = useState<'shapeSteels'>(() => {
    return (localStorage.getItem(`${subLessonId}-tab`) as any) || 'shapeSteels';
  });
  const { scrollProgress, containerRef, isSpeaking, currentIndex, currentCharIndex, registerText } = useLessonCore(subLessonId);

  useEffect(() => {
    localStorage.setItem(`${subLessonId}-tab`, activeTab);
  }, [subLessonId, activeTab]);

  const tabs = [{ id: 'shapeSteels', label: 'Shape Steels' }];

  useEffect(() => {
    const introTitle = "Creating Shape Steels";
    const introDesc = "Learn how to arrange machine parts and steel profiles in 3D space.";
    registerText([introTitle, introDesc, ...shapeSteelsSteps], 0);
  }, [registerText]);

  return (
    <div className={`course-lesson-container`} ref={containerRef}>
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      <div className="lesson-tabs">
        {tabs.map(tab => (<button key={tab.id} className={`tab-button ${activeTab === tab.id ? 'active' : ''}`} onClick={() => setActiveTab(tab.id as any)}>{tab.label}</button>))}
      </div>

      <section className="lesson-intro">
        <h3 className={`section-title ${currentIndex === 0 ? "reading-active" : ""}`} data-reading-index="0">
          <KaraokeLessonText
            as="span"
            text="Creating Shape Steels"
            isActive={isSpeaking && currentIndex === 0}
            currentCharIndex={currentCharIndex}
          />
        </h3>
        <KaraokeLessonText
          className={`lesson-subtitle ${currentIndex === 1 ? "reading-active" : ""}`}
          data-reading-index="1"
          text="Learn how to arrange machine parts and steel profiles in 3D space."
          isActive={isSpeaking && currentIndex === 1}
          currentCharIndex={currentCharIndex}
        />
        <img src={shapeSteels1} alt="Shape Steels Overview" className="software-screenshot" style={{ height: 'auto', width: "400px" }} />
      </section>

      <div className="lesson-grid single-card">
        {activeTab === 'shapeSteels' && (
          <div className="lesson-card tab-content fade-in">
            <div className="card-header">
              <h4 className={`${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
                <KaraokeLessonText
                  as="span"
                  text="Shape Steels Includes:"
                  isActive={isSpeaking && currentIndex === 2}
                  currentCharIndex={currentCharIndex}
                />
              </h4>
            </div>

            <div className={`instruction-step ${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
              <div className="step-description">
                <img src={shapeSteelsTypes} alt="Shape Steels Options" className="software-screenshot" style={{ width: '900px' }} />
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 3 ? 'reading-active' : ''}`} data-reading-index="3">
              <div className="step-header">
                <span className="step-number">1 </span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text="Select the Arrange Machine Part from the icon menu"
                  isActive={isSpeaking && currentIndex === 3}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <img src={arrangeMachinePartMenu} alt="Arrange Machine Part Menu" className="software-screenshot screenshot-small" style={{ width: '14rem' }} />
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 4 ? 'reading-active' : ''}`} data-reading-index="4">
              <div className="step-header">
                <span className="step-number">2 </span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text="The Arrange Machine Part window will appear. Select and provide the necessary specifications &gt; Press OK"
                  isActive={isSpeaking && currentIndex === 4}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <img src={arrangeMachinePartWindow} alt="Arrange Machine Part Window" className="software-screenshot" style={{ width: '900px', height: 'auto' }} />
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 5 ? 'reading-active' : ''}`} data-reading-index="5">
              <div className="step-header">
                <span className="step-number">3 </span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text="In the Key Entry Area, enter the coordinates for the position (origin point)"
                  isActive={isSpeaking && currentIndex === 5}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <img src={keyEntryArea} alt="Key Entry Area" className="software-screenshot" style={{ height: 'auto', width: "200px", marginBottom: "2rem" }} />
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
                <img src={shapeSteels2} alt="Shape Steels Result" className="software-screenshot screenshot-large" style={{ width: '900px', height: 'auto' }} />
              </div>
            </div>

            <div className="lesson-navigation">
              <button className="nav-button" onClick={onPrevLesson}><ChevronLeft size={18} /> Previous</button>
              <button className="nav-button next" onClick={onNextLesson}>{nextLabel || 'Next Lesson'} <ChevronRight size={18} /></button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BasicOperation5;
