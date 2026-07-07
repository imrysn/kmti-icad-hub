import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLessonCore } from '../../../hooks/useLessonCore';
import { KaraokeLessonText } from '../../KaraokeLessonText';
import {
  showHideSteps,
  stretchSteps,
  resizeSteps
} from '../VideoTutorialData/basicOpStepsData';

// Asset Imports
import leftClick from '../../../assets/3D_Image_File/left_click.png';
import showHideMenu from '../../../assets/3D_Image_File/basic_operation4_show_hide.jpg';
import fairingChamferImg from '../../../assets/3D_Image_File/fairing_chamfer.jpg';
import showHideEntity from '../../../assets/3D_Image_File/basic_operation4_show_hide_entity.png';
import showHideDraftingEntity from '../../../assets/3D_Image_File/basic_operation4_showhide_drafting_entity.png';
import hideUnselectedEntity from '../../../assets/3D_Image_File/basic_operation4_hide_unselected_entity.png';
import hideUnselectedEntity1 from '../../../assets/3D_Image_File/basic_operation4_hide_unselected_entity_1.png';
import stretchIcon from '../../../assets/3D_Image_File/basic_operation5_stretch.png';
import stretchItemEntry from '../../../assets/3D_Image_File/basic_operation5_item_entry_stretch.png';
import stretchImg1 from '../../../assets/3D_Image_File/basic_operation5_stretch1.png';
import stretchImg2 from '../../../assets/3D_Image_File/basic_operation5_stretch2.png';
import resizeIcon from '../../../assets/3D_Image_File/basic_operation5_resize.png';
import resizeItemEntry from '../../../assets/3D_Image_File/basic_operation5_item_entry_resize.png';
import resize3_2 from '../../../assets/3D_Image_File/basic_operation5_resize3_2.png';

interface SubLessonProps {
  subLessonId: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
  nextLabel?: string;
}

const BasicOperation4: React.FC<SubLessonProps> = ({ subLessonId, onNextLesson, onPrevLesson, nextLabel }) => {
  const [activeTab, setActiveTab] = useState<'showHide' | 'stretch' | 'resize'>(() => {
    return (localStorage.getItem(`${subLessonId}-tab`) as any) || 'showHide';
  });
  const { scrollProgress, containerRef, stop, isSpeaking, currentIndex, currentCharIndex, registerText } = useLessonCore(subLessonId);

  useEffect(() => {
    localStorage.setItem(`${subLessonId}-tab`, activeTab);
  }, [subLessonId, activeTab]);

  const tabs = [
    { id: 'showHide', label: 'Show/Hide' },
    { id: 'stretch', label: 'Stretch' },
    { id: 'resize', label: 'Resize' }
  ];

  const handleNext = (isAuto: boolean = false) => {
    stop();
    if (!isAuto) {
      sessionStorage.setItem('tts-autoplay-active', 'false');
    }
    const i = tabs.findIndex(t => t.id === activeTab);
    if (i < tabs.length - 1) { setActiveTab(tabs[i + 1].id as any); } else if (onNextLesson) onNextLesson();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrev = (isAuto: boolean = false) => {
    stop();
    if (!isAuto) {
      sessionStorage.setItem('tts-autoplay-active', 'false');
    }
    const i = tabs.findIndex(t => t.id === activeTab);
    if (i > 0) { setActiveTab(tabs[i - 1].id as any); } else if (onPrevLesson) onPrevLesson();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const introTitle = activeTab === 'showHide' ? "Show / Hide"
      : activeTab === 'stretch' ? "Stretch / Shape / Cut"
      : "Resize";
    const introDesc = activeTab === 'showHide'
      ? "Tools use to switch between displaying and hiding entities."
      : activeTab === 'stretch'
      ? "Tools used to modify the length and form of solid entities."
      : "Tool used to scale up or scale down a solid entity.";
    const steps = activeTab === 'showHide' ? showHideSteps
      : activeTab === 'stretch' ? stretchSteps
      : resizeSteps;
    registerText([introTitle, introDesc, ...steps], 0);
  }, [activeTab, registerText]);

  return (
    <div className={`course-lesson-container`} ref={containerRef}>
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      <div className="lesson-tabs">
        {tabs.map(tab => (<button key={tab.id} className={`tab-button ${activeTab === tab.id ? 'active' : ''}`} onClick={() => { stop(); sessionStorage.setItem('tts-autoplay-active', 'false'); setActiveTab(tab.id as any); }}>{tab.label}</button>))}
      </div>

      {activeTab === 'showHide' && (
        <section className="lesson-intro">
          <h3 className={`section-title ${currentIndex === 0 ? "reading-active" : ""}`} data-reading-index="0">
            <KaraokeLessonText
              as="span"
              text="Show / Hide"
              isActive={isSpeaking && currentIndex === 0}
              currentCharIndex={currentCharIndex}
            />
          </h3>
          <KaraokeLessonText
            className={`lesson-subtitle ${currentIndex === 1 ? "reading-active" : ""}`}
            data-reading-index="1"
            text="Tools use to switch between displaying and hiding entities."
            isActive={isSpeaking && currentIndex === 1}
            currentCharIndex={currentCharIndex}
          />
          <img src={showHideMenu} alt="Show/Hide Intro" className="software-screenshot screenshot-small mt-8" style={{ width: '192px' }} />
        </section>
      )}

      {activeTab === 'stretch' && (
        <section className="lesson-intro">
          <h3 className={`section-title ${currentIndex === 0 ? "reading-active" : ""}`} data-reading-index="0">
            <KaraokeLessonText
              as="span"
              text="Stretch / Shape / Cut"
              isActive={isSpeaking && currentIndex === 0}
              currentCharIndex={currentCharIndex}
            />
          </h3>
          <KaraokeLessonText
            className={`lesson-subtitle ${currentIndex === 1 ? "reading-active" : ""}`}
            data-reading-index="1"
            text="Tools used to modify the length and form of solid entities."
            isActive={isSpeaking && currentIndex === 1}
            currentCharIndex={currentCharIndex}
          />
          <img src={fairingChamferImg} alt="Stretch and Shape Intro" className="software-screenshot screenshot-small mt-8" style={{ width: '192px' }} />
        </section>
      )}

      <div className="lesson-grid single-card">
        {activeTab === 'showHide' && (
          <div className="lesson-card tab-content fade-in">
            <div className="card-header">
              <h4 className={`${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
                <KaraokeLessonText
                  as="span"
                  text="SHOW / HIDE ENTITY"
                  isActive={isSpeaking && currentIndex === 2}
                  currentCharIndex={currentCharIndex}
                />
              </h4>
            </div>

            <div className={`instruction-step ${currentIndex === 3 ? 'reading-active' : ''}`} data-reading-index="3">
              <div className="step-header">
                <span className="step-number">1 </span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text="Select Show/Hide from the icon menu"
                  isActive={isSpeaking && currentIndex === 3}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <img src={showHideEntity} alt="Show/Hide Entity Icon" className="software-screenshot screenshot-small" style={{ width: '280px', marginBottom: "-3rem" }} />
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 4 ? 'reading-active' : ''}`} data-reading-index="4">
              <div className="step-header">
                <span className="step-number">2 </span>
                <div className="step-label" style={{ marginTop: "-1.5rem" }}>
                  <KaraokeLessonText
                    as="span"
                    text="Select the entities for showing/hiding > GO"
                    isActive={isSpeaking && currentIndex === 4}
                    currentCharIndex={currentCharIndex}
                  />
                  <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '40px', margin: '0 8px' }} />
                </div>
              </div>
            </div>

            <div className="card-header mt-12">
              <h4 className={`${currentIndex === 5 ? 'reading-active' : ''}`} data-reading-index="5">
                <KaraokeLessonText
                  as="span"
                  text="SHOW/HIDE DRAFTING ENTITY"
                  isActive={isSpeaking && currentIndex === 5}
                  currentCharIndex={currentCharIndex}
                />
              </h4>
            </div>

            <div className={`instruction-step ${currentIndex === 6 ? 'reading-active' : ''}`} data-reading-index="6">
              <div className="step-header">
                <span className="step-number">1 </span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text="Select Show/Hide Drafting Entity from the icon menu"
                  isActive={isSpeaking && currentIndex === 6}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <img src={showHideDraftingEntity} alt="Show/Hide Drafting Entity Icon" className="software-screenshot screenshot-small" style={{ width: '280px', marginBottom: "-3rem" }} />
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 7 ? 'reading-active' : ''}`} data-reading-index="7">
              <div className="step-header">
                <span className="step-number">2 </span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text="Right-click to show/hide all drafting entities"
                  isActive={isSpeaking && currentIndex === 7}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <p className={`p-flush ${currentIndex === 8 ? "reading-active" : ""}`} data-reading-index="8" style={{ marginTop: "-1rem" }}>Drafting Entities include:</p>
              <div className="lesson-table-container" style={{ marginTop: "2rem", maxWidth: "900px" }}>
                <table className="lesson-table">
                  <thead>
                    <tr>
                      <th>DIMENSIONS</th>
                      <th>NOTES</th>
                      <th>SYMBOLS</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Linear/Circular/Angular</td>
                      <td>Text</td>
                      <td>Arrow/Arrow View</td>
                    </tr>
                    <tr>
                      <td>Chamfer/Fillet</td>
                      <td>Part Notes</td>
                      <td>Cutting Lines</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>Welding</td>
                      <td>Machining/Finishing</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>Balloon</td>
                      <td>Hatch</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="card-header mt-12">
              <h4 className={`${currentIndex === 9 ? 'reading-active' : ''}`} data-reading-index="9">
                <KaraokeLessonText
                  as="span"
                  text="HIDE UNSELECTED ENTITY"
                  isActive={isSpeaking && currentIndex === 9}
                  currentCharIndex={currentCharIndex}
                />
              </h4>
            </div>

            <div className={`instruction-step ${currentIndex === 10 ? 'reading-active' : ''}`} data-reading-index="10">
              <div className="step-header">
                <span className="step-number">1 </span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text="Select Hide Unselected Entity from the icon menu"
                  isActive={isSpeaking && currentIndex === 10}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <img src={hideUnselectedEntity} alt="Hide Unselected Entity Icon" className="software-screenshot screenshot-small" style={{ width: '280px', marginBottom: "-3rem" }} />
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 11 ? 'reading-active' : ''}`} data-reading-index="11">
              <div className="step-header">
                <span className="step-number">2 </span>
                <div className="step-label" style={{ marginTop: "-1.5rem" }}>
                  <KaraokeLessonText
                    as="span"
                    text="Select all entities to be retain > GO"
                    isActive={isSpeaking && currentIndex === 11}
                    currentCharIndex={currentCharIndex}
                  />
                  <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '40px', margin: '0 8px' }} />
                </div>
              </div>
              <div className="step-description">
                <p className={`p-flush ${currentIndex === 12 ? "reading-active" : ""}`} data-reading-index="12" style={{ marginTop: "-1rem" }}>All unselected entities will be hidden.</p>
                <img src={hideUnselectedEntity1} alt="Hide Unselected Entity Example" className="software-screenshot" style={{ width: '900px' }} />
              </div>
            </div>

            <div className="lesson-navigation">
              <button className="nav-button" onClick={() => handlePrev()}><ChevronLeft size={18} /> Previous</button>
              <button className="nav-button next" onClick={() => handleNext()}>Next <ChevronRight size={18} /></button>
            </div>
          </div>
        )}

        {activeTab === 'stretch' && (
          <div className="lesson-card tab-content fade-in">
            <div className="card-header">
              <h4 className={`${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
                <KaraokeLessonText
                  as="span"
                  text="STRETCH / SHAPE / CUT"
                  isActive={isSpeaking && currentIndex === 2}
                  currentCharIndex={currentCharIndex}
                />
              </h4>
            </div>

            <div className={`instruction-step ${currentIndex === 3 ? 'reading-active' : ''}`} data-reading-index="3">
              <div className="step-header">
                <span className="step-number">1 </span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text="Select Stretch from the icon menu"
                  isActive={isSpeaking && currentIndex === 3}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <img src={stretchIcon} alt="Stretch Icon" className="software-screenshot screenshot-small" style={{ width: '280px', marginBottom: "-3rem" }} />
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 4 ? 'reading-active' : ''}`} data-reading-index="4">
              <div className="step-header">
                <span className="step-number">2 </span>
                <div className="step-label" style={{ marginTop: "-1.5rem" }}>
                  <KaraokeLessonText
                    as="span"
                    text="Select the face to be stretch &gt; GO"
                    isActive={isSpeaking && currentIndex === 4}
                    currentCharIndex={currentCharIndex}
                  />
                  <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '40px', margin: '0 8px' }} />
                </div>
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 5 ? 'reading-active' : ''}`} data-reading-index="5" style={{ marginTop: "-2rem" }}>
              <div className="step-header">
                <span className="step-number">3 </span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text="Specify the desired length of the solid entity on the item entry"
                  isActive={isSpeaking && currentIndex === 5}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <p className={`p-flush opacity-80 text-sm mb-4 ${currentIndex === 6 ? "reading-active" : ""}`} data-reading-index="6" style={{ marginBottom: "2rem", marginTop: "-1rem" }}> Also works for circular surfaces.</p>
                <img src={stretchItemEntry} alt="Stretch Item Entry" className="software-screenshot" style={{ width: '850px', height: 'auto' }} />
                <img src={stretchImg1} alt="Stretch Drag Example" className="software-screenshot screenshot-large mt-8" style={{ width: '900px', marginTop: "2rem" }} />
              </div>
            </div>

            <div>
              <h4 className={`text-highlight mb-4 ${currentIndex === 7 ? "reading-active" : ""}`} data-reading-index="7">
                <KaraokeLessonText
                  as="span"
                  text="OR"
                  isActive={isSpeaking && currentIndex === 7}
                  currentCharIndex={currentCharIndex}
                />
              </h4>
              <div className={`instruction-step ${currentIndex === 8 ? 'reading-active' : ''}`} data-reading-index="8">
                <div className="step-header">
                  <div className="step-label">
                    <KaraokeLessonText
                      as="span"
                      text="Select face >  GO"
                      isActive={isSpeaking && currentIndex === 8}
                      currentCharIndex={currentCharIndex}
                    />
                    <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '40px', margin: '0 8px' }} />
                    <KaraokeLessonText
                      as="span"
                      text=" > Left-click on the 3D Space"
                      isActive={isSpeaking && currentIndex === 8}
                      currentCharIndex={currentCharIndex - 17}
                    />
                  </div>
                </div>
                <div className="step-description">
                  <p className={`p-flush mt-4 ${currentIndex === 9 ? "reading-active" : ""}`} data-reading-index="9" style={{ marginTop: "-1rem" }}>
                    <KaraokeLessonText
                      as="span"
                      text="A linear scale will appear on the 3D Space"
                      isActive={isSpeaking && currentIndex === 9}
                      currentCharIndex={currentCharIndex}
                    />
                  </p>
                  <p className={`p-flush mt-4 ${currentIndex === 10 ? "reading-active" : ""}`} data-reading-index="10" style={{ marginBottom: "2rem" }}>
                    <KaraokeLessonText
                      as="span"
                      text="Specify the additional length of stretch > Press Enter or Left-Click on the scale."
                      isActive={isSpeaking && currentIndex === 10}
                      currentCharIndex={currentCharIndex}
                    />
                  </p>
                  <img src={stretchImg2} alt="Stretch Scale Example" className="software-screenshot screenshot-large mt-6" style={{ width: '900px' }} />
                </div>
              </div>
            </div>

            <div className="lesson-navigation">
              <button className="nav-button" onClick={() => handlePrev()}><ChevronLeft size={18} /> Previous</button>
              <button className="nav-button next" onClick={() => handleNext()}>Next <ChevronRight size={18} /></button>
            </div>
          </div>
        )}

        {activeTab === 'resize' && (
          <div className="lesson-card tab-content fade-in">
            <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h4 className={`${currentIndex === 0 ? 'reading-active' : ''}`} data-reading-index="0">
                <KaraokeLessonText
                  as="span"
                  text="RESIZE"
                  isActive={isSpeaking && currentIndex === 0}
                  currentCharIndex={currentCharIndex}
                />
              </h4>
            </div>

            <div className={`instruction-step ${currentIndex === 1 ? 'reading-active' : ''}`} data-reading-index="1">
              <div className="step-header">
                <span className="step-number">1 </span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text="Select Resize from the icon menu"
                  isActive={isSpeaking && currentIndex === 1}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <img src={resizeIcon} alt="Resize Icon" className="software-screenshot screenshot-small" style={{ width: '280px', marginBottom: "-4rem" }} />
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
              <div className="step-header">
                <span className="step-number">2 </span>
                <div className="step-label" style={{ marginBottom: "1.5rem" }}>
                  <KaraokeLessonText
                    as="span"
                    text="Select the entity for resizing > GO"
                    isActive={isSpeaking && currentIndex === 2}
                    currentCharIndex={currentCharIndex}
                  />
                  <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '40px', margin: '0 8px' }} />
                </div>
              </div>
            </div>

            <div className={`instruction-step ${currentIndex === 3 ? 'reading-active' : ''}`} data-reading-index="3" style={{ marginTop: "-4rem" }}>
              <div className="step-header">
                <span className="step-number">3 </span>
                <div className="step-label" style={{ marginTop: "1.5rem" }}>
                  <KaraokeLessonText
                    as="span"
                    text="Using resize allows the user to scale up or scale down the size of the solid entity. Specify the scale on the item entry > Left-click on the 3D Space"
                    isActive={isSpeaking && currentIndex === 3}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
              </div>
              <div className="step-description">
                <div className="flex-row-center--wrap mt-6" style={{ gap: '2rem' }}>
                  <img src={resizeItemEntry} alt="Resize Item Entry" className="software-screenshot" style={{ width: '200px', height: 'auto' }} />
                  <img src={resize3_2} alt="Resize Scale Result" className="software-screenshot screenshot-large mt-8" style={{ width: '900px', marginTop: "2rem" }} />
                </div>
              </div>
            </div>

            <div className="lesson-navigation">
              <button className="nav-button" onClick={() => handlePrev()}><ChevronLeft size={18} /> Previous</button>
              <button className="nav-button next" onClick={() => handleNext()}>Next Lesson <ChevronRight size={18} /></button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BasicOperation4;
