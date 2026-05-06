import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Info } from 'lucide-react';
import { ReadAloudButton } from "../ReadAloudButton";
import { KaraokeLessonText } from "../KaraokeLessonText";
import { useLessonCore } from "../../hooks/useLessonCore";
import '../../styles/3D_Modeling/CourseLesson.css';

// --- Assets ---
import partMenu1 from '../../assets/3D_Image_File/3d_part1_create_3d_part.png';
import createPartIcon from '../../assets/3D_Image_File/3d_part1_create_3d_part.png';
import modalInfo1 from '../../assets/3D_Image_File/3d_part1_creating_3d_part_3.png';
import treeViewInfo1 from '../../assets/3D_Image_File/3d_part1_creating_3d_part_4.png';
import materialDescriptionImg from '../../assets/3D_Image_File/3d_part1_material_description.png';
import partMenu2 from '../../assets/3D_Image_File/3d_part2_change_3d_part_name.png';
import changePartIcon from '../../assets/3D_Image_File/3d_part2_change_3d_part_name_1.png';
import modalInfo2 from '../../assets/3D_Image_File/3d_part2_change_3d_part_name_3.png';
import treeViewInfo2 from '../../assets/3D_Image_File/3d_part2_change_3d_part_name_4.png';
import leftClick from '../../assets/3D_Image_File/left_click.png';

interface PartLessonProps {
  nextLabel?: string; subLessonId?: string; onNextLesson?: () => void; onPrevLesson?: () => void;
}

const PartLesson: React.FC<PartLessonProps> = ({
  subLessonId = '3d-part-1',
  onNextLesson,
  onPrevLesson,
  nextLabel
}) => {
  const [activeTab, setActiveTab] = useState<"create" | "change">(() => {
    return (localStorage.getItem(`${subLessonId}-tab`) as any) || 'create';
  });

  useEffect(() => {
    localStorage.setItem(`${subLessonId}-tab`, activeTab);
  }, [subLessonId, activeTab]);

  const {
    scrollProgress,
    containerRef,
    speak,
    stop,
    isSpeaking,
    currentIndex,
    currentCharIndex
  } = useLessonCore(`${subLessonId}-${activeTab}`);

  const createSteps = [
    "CREATE 3D PART",
    "Tool use to name 3D parts and provide information. 3D part name must always be set since it is a vital part for the 2D Detailing.",
    "Step 1: Select Create 3D Part from the icon menu.",
    "Step 2: Select a single entity then GO",
    "Step 3: A window will appear showing the informations to fill-up.",
    "Step 4: All created 3D Part will appear on the tree view.",
    "Refer to the material description for notation and plate thickness standards."
  ];

  const changeSteps = [
    "CHANGE 3D PART NAME",
    "Tool use to change 3D part names, drawing names of external 3D parts, and comments.",
    "Step 1: Select Change 3D Part Name from the icon menu.",
    "Step 2: Select an entity or right-click on the 3D space.",
    "Step 3: A window will appear showing the informations to fill-up.",
    "Step 4: A dialog box will appear asking whether to change the 2D Part Name together with the 3D Part Name then Select Yes",
    "Note: All 3D Part Names and 2D part names must always match each other. Differences on the 3D and 2D part name will cut the link"
  ];
  const tabs = [
    { id: "create", label: "Create 3D Part" },
    { id: "change", label: "Change 3D Part Name" },
  ];

  const handleNext = () => {
    if (activeTab === "create") setActiveTab("change");
    else if (onNextLesson) onNextLesson();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrev = () => {
    if (activeTab === "change") setActiveTab("create");
    else if (onPrevLesson) onPrevLesson();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const introTitle = activeTab === 'create' ? 'Creating 3D Part' : 'Changing 3D Part Name';
  const introSubtitle = activeTab === 'create' ? "Tool use to name 3D parts and provide information." : "Tool use to Changes 3D part names, drawing names, and comments.";

  return (
    <div className={`course-lesson-container`} ref={containerRef}>
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      <div className="lesson-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => setActiveTab(tab.id as any)}
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
            const steps = activeTab === 'create' ? createSteps : changeSteps;
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
          <div className="screenshot-wrapper mt-4">
            <img
              src={activeTab === 'create' ? partMenu2 : partMenu2}
              alt={activeTab === 'create' ? "3D Part Menu" : "Change 3D Part Menu"}
              className="software-screenshot screenshot-small"
              style={{ height: '200px' }}
            />
          </div>
        </div>
      </section>

      <div className="lesson-grid single-card">
        <div className="fade-in">
          {activeTab === 'create' && (
            <div className="lesson-card tab-content">
              <div className="card-header">
                <h4 className={`${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
                  <KaraokeLessonText
                    as="span"
                    text="CREATE 3D PART"
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
                text="Tool use to name 3D parts and provide information. 3D part name must always be set since it is a vital part for the 2D Detailing."
                isActive={isSpeaking && currentIndex === 3}
                currentCharIndex={currentCharIndex}
              />

              <div className={`instruction-step ${currentIndex === 4 ? 'reading-active' : ''}`} data-reading-index="4">
                <div className="step-header">
                  <span className="step-number">1 </span>
                  <KaraokeLessonText
                    as="span"
                    className="step-label"
                    text="Select Create 3D Part from the icon menu."
                    isActive={isSpeaking && currentIndex === 4}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
                <div className="step-description">
                  <div className="screenshot-wrapper">
                    <img src={createPartIcon} alt="Create 3D Part Icon" className="software-screenshot" style={{ height: '180px' }} />
                  </div>
                </div>
              </div>

              <div className={`instruction-step ${currentIndex === 5 ? 'reading-active' : ''}`} data-reading-index="5">
                <div className="step-header" style={{ marginBottom: '-2rem' }}>
                  <span className="step-number">2 </span>
                  <KaraokeLessonText
                    as="span"
                    className="step-label"
                    text="Select a single entity > GO"
                    isActive={isSpeaking && currentIndex === 5}
                    currentCharIndex={currentCharIndex}
                  />
                  <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '40px', marginTop: '-2rem' }} />
                </div>
              </div>

              <div className={`instruction-step ${currentIndex === 6 ? 'reading-active' : ''}`} data-reading-index="6">
                <div className="step-header">
                  <span className="step-number">3 </span>
                  <KaraokeLessonText
                    as="span"
                    className="step-label"
                    text="A window will appear showing the informations to fill-up."
                    isActive={isSpeaking && currentIndex === 6}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
                <div className="step-description">
                  <div className="screenshot-wrapper">
                    <img src={modalInfo1} alt="Create 3D Part Window" className="software-screenshot" style={{ marginBottom: '-2rem' }} />
                  </div>
                </div>
              </div>  

              <div className={`instruction-step ${currentIndex === 7 ? 'reading-active' : ''}`} data-reading-index="7">
                <div className="step-header">
                  <span className="step-number">4 </span>
                  <KaraokeLessonText
                    as="span"
                    className="step-label"
                    text="All created 3D Part will appear on the tree view."
                    isActive={isSpeaking && currentIndex === 7}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
                <div className="step-description">
                  <div className="screenshot-wrapper">
                    <img src={treeViewInfo1} alt="Tree View Status" className="software-screenshot" style={{ height: '300px' }} />
                  </div>
                </div>
              </div>

              <div className={`instruction-step ${currentIndex === 8 ? 'reading-active' : ''}`} data-reading-index="8">
                <div className="step-header">
                  <KaraokeLessonText
                    as="span"
                    className="step-label"
                    text="Refer to the material description for notation and plate thickness standards."
                    isActive={isSpeaking && currentIndex === 8}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
                <div className="step-description">
                  <div className="screenshot-wrapper">
                    <img src={materialDescriptionImg} alt="Material Description" className="software-screenshot" style={{ width: '900px' }} />
                  </div>
                </div>
              </div>

              <div className="lesson-navigation">
                <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button>
                <button className="nav-button next" onClick={handleNext}>Next <ChevronRight size={18} /></button>
              </div>
            </div>
          )}

          {activeTab === 'change' && (
            <div className="lesson-card tab-content">
              <div className="card-header mt-8">
                <h4 className={`${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
                  <KaraokeLessonText
                    as="span"
                    text="CHANGE 3D PART NAME"
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
                text="Tool use to change 3D part names, drawing names of external 3D parts, and comments."
                isActive={isSpeaking && currentIndex === 3}
                currentCharIndex={currentCharIndex}
              />

              <div className={`instruction-step ${currentIndex === 4 ? 'reading-active' : ''}`} data-reading-index="4">
                <div className="step-header">
                  <span className="step-number">1 </span>
                  <KaraokeLessonText
                    as="span"
                    className="step-label"
                    text="Select Change 3D Part Name from the icon menu."
                    isActive={isSpeaking && currentIndex === 4}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
                <div className="step-description">
                  <div className="screenshot-wrapper">
                    <img src={changePartIcon} alt="Change 3D Part Name Icon" className="software-screenshot" style={{ height: '180px' }} />
                  </div>
                </div>
              </div>

              <div className={`instruction-step ${currentIndex === 5 ? 'reading-active' : ''}`} data-reading-index="5">
                <div className="step-header" style={{ marginBottom: '-2rem' }}>
                  <span className="step-number">2 </span>
                  <KaraokeLessonText
                    as="span"
                    className="step-label"
                    text="Select an entity or right-click on the 3D space."
                    isActive={isSpeaking && currentIndex === 5}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
              </div>

              <div className={`instruction-step ${currentIndex === 6 ? 'reading-active' : ''}`} data-reading-index="6">
                <div className="step-header">
                  <span className="step-number">3 </span>
                  <KaraokeLessonText
                    as="span"
                    className="step-label"
                    text="A window will appear showing the informations to fill-up."
                    isActive={isSpeaking && currentIndex === 6}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
                <div className="step-description">
                  <div className="screenshot-wrapper">
                    <img src={modalInfo2} alt="Change Name Window" className="software-screenshot" style={{ width: '900px', marginBottom: "-2rem" }} />
                  </div>
                </div>
              </div>

              <div className={`instruction-step ${currentIndex === 7 ? 'reading-active' : ''}`} data-reading-index="7">
                <div className="step-header">
                  <span className="step-number">4 </span>
                  <KaraokeLessonText
                    as="span"
                    className="step-label"
                    style={{marginTop : "2rem"}}
                    text="A dialog box will appear asking whether to change the 2D Part Name together with the 3D Part Name > Select Yes"
                    isActive={isSpeaking && currentIndex === 7}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
                <div className="step-description">
                  <div className="screenshot-wrapper">
                    <img src={treeViewInfo2} alt="Dialog and Tree View Update" className="software-screenshot screenshot-wide" />
                  </div>
                </div>

                <div className={`instruction-box ${currentIndex === 8 ? "reading-active" : ""}`} data-reading-index="8" style={{ marginTop: "2rem" }}>
                  <KaraokeLessonText
                    as="p"
                    className="p-flush red-text"
                    text="Note: All 3D Part Names and 2D part names must always match each other. Differences on the 3D and 2D part name will cut the link"
                    isActive={isSpeaking && currentIndex === 8}
                    currentCharIndex={currentCharIndex}
                  />
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
    </div>
  );
};

export default PartLesson;

