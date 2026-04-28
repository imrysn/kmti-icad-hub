import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Info } from 'lucide-react';
import { ReadAloudButton } from "../ReadAloudButton";
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
    currentIndex
  } = useLessonCore(`${subLessonId}-${activeTab}`);

  const createSteps = [
    "Step 1: Select Create 3D Part from the icon menu.",
    "Step 2: Select a single entity and click GO.",
    "Step 3: A window will appear. Fill up the required part information.",
    "Step 4: Once created, the 3D Part will appear in the tree view.",
    "Step 5: Refer to the material description for notation and plate thickness standards."
  ];

  const changeSteps = [
    "Step 1: Select Change 3D Part Name from the icon menu.",
    "Step 2: Select an entity or right-click on the 3D space.",
    "Step 3: Edit the information in the window that appears.",
    "Step 4: When asked to change the 2D Part Name together with the 3D name, select Yes."
  ];

  const tabs = [
    { id: "create", label: "Create 3D Part" },
    { id: "change", label: "Change 3D Part Name" },
  ];

  const handleNext = () => {
    if (activeTab === "create") setActiveTab("change");
    else if (onNextLesson) onNextLesson();
  };

  const handlePrev = () => {
    if (activeTab === "change") setActiveTab("create");
    else if (onPrevLesson) onPrevLesson();
  };

  return (
    <div className={`course-lesson-container ${isSpeaking ? 'is-reading' : ''}`} ref={containerRef}>
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
        <h3 className="section-title">
          {activeTab === 'create' ? 'Creating 3D Part' : 'Creating 3D Part'}
        </h3>
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
                <h4>CREATE 3D PART</h4>
                <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(createSteps)} onStop={stop} />
              </div>
              <p className='p-flush' style={{ marginTop: "-2rem" }}>Tool use to name 3D parts and provide information. <br /> 3D part name must always be set since it is a vital part for the 2D Detailing.</p>

              <div className={`instruction-step ${currentIndex === 0 ? 'reading-active' : ''}`} data-reading-index="0">
                <div className="step-header">
                  <span className="step-number">1 </span>
                  <span className="step-label">Select <strong className="red-text">Create 3D Part</strong> from the icon menu.</span>
                </div>
                <div className="step-description">
                  <div className="screenshot-wrapper">
                    <img src={createPartIcon} alt="Create 3D Part Icon" className="software-screenshot" style={{ height: '180px' }} />
                  </div>
                </div>
              </div>

              <div className={`instruction-step ${currentIndex === 1 ? 'reading-active' : ''}`} data-reading-index="1">
                <div className="step-header" style={{ marginBottom: '-2rem' }}>
                  <span className="step-number">2 </span>
                  <span className="step-label" style={{ marginTop: "-1.5rem" }}> Select a single entity &gt; GO
                    <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '40px', margin: '0 8px' }} />
                  </span>
                </div>
              </div>

              <div className="section-divider"></div>

              <div className={`instruction-step ${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
                <div className="step-header">
                  <span className="step-number">3 </span>
                  <span className="step-label">A window will appear showing the informations to fill-up.</span>
                </div>
                <div className="step-description">
                  <div className="screenshot-wrapper">
                    <img src={modalInfo1} alt="Create 3D Part Window" className="software-screenshot" style={{ marginBottom: '-2rem' }} />
                  </div>
                </div>
              </div>

              <div className="section-divider"></div>

              <div className={`instruction-step ${currentIndex === 3 ? 'reading-active' : ''}`} data-reading-index="3">
                <div className="step-header">
                  <span className="step-number">4 </span>
                  <span className="step-label">All created 3D Part will appear on the tree view.</span>
                </div>
                <div className="step-description">
                  <div className="screenshot-wrapper">
                    <img src={treeViewInfo1} alt="Tree View Status" className="software-screenshot" style={{ height: '300px' }} />
                  </div>
                </div>
              </div>

              <div className="section-divider"></div>

              <div className={`instruction-step ${currentIndex === 4 ? 'reading-active' : ''}`} data-reading-index="4">
                <div className="step-header">
                  <span className="step-label">MATERIAL DESCRIPTION</span>
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
                <h4>CHANGE 3D PART NAME</h4>
                <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(changeSteps)} onStop={stop} />
              </div>
              <p className='p-flush' style={{ marginTop: "-2rem" }}>Tool use to Changes 3D part names, drawing names (of external 3D parts), and comments.</p>

              <div className={`instruction-step ${currentIndex === 0 ? 'reading-active' : ''}`} data-reading-index="0">
                <div className="step-header">
                  <span className="step-number">1 </span>
                  <span className="step-label">Select <strong className="text-highlight">Change 3D Part Name</strong> from the menu.</span>
                </div>
                <div className="step-description">
                  <div className="screenshot-wrapper">
                    <img src={changePartIcon} alt="Change 3D Part Name Icon" className="software-screenshot" style={{ height: '180px' }} />
                  </div>
                </div>
              </div>

              <div className={`instruction-step ${currentIndex === 1 ? 'reading-active' : ''}`} data-reading-index="1">
                <div className="step-header" style={{ marginBottom: '-2rem' }}>
                  <span className="step-number">2 </span>
                  <span className="step-label">Select an entity or Right-click on the 3D space.</span>
                </div>
              </div>

              <div className="section-divider"></div>

              <div className={`instruction-step ${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
                <div className="step-header">
                  <span className="step-number">3 </span>
                  <span className="step-label">Edit the information in the dialog box.</span>
                </div>
                <div className="step-description">
                  <div className="screenshot-wrapper">
                    <img src={modalInfo2} alt="Change Name Window" className="software-screenshot" style={{ width: '900px' }} />
                  </div>
                </div>
              </div>

              <div className="section-divider"></div>

              <div className={`instruction-step ${currentIndex === 3 ? 'reading-active' : ''}`} data-reading-index="3">
                <div className="step-header">
                  <span className="step-number">4 </span>
                  <span className="step-label">Update both 3D and 2D names by selecting <strong className="text-highlight">Yes</strong>.</span>
                </div>
                <div className="step-description">
                  <div className="screenshot-wrapper">
                    <img src={treeViewInfo2} alt="Dialog and Tree View Update" className="software-screenshot screenshot-wide" />
                  </div>
                </div>
              </div>

              <div className="instruction-box" style={{ marginTop: "2rem" }}>
                <p className="p-flush"><strong className='red-text'>Note:</strong>  <br /> All 3D Part Names and 2D part names must always match each other. Differences on the 3D and 2D part name will cut the link</p>
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
