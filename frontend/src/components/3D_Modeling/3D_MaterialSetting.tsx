import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLessonCore } from "../../hooks/useLessonCore";
import { ReadAloudButton } from "../ReadAloudButton";
import { KaraokeLessonText } from "../KaraokeLessonText";
import "../../styles/3D_Modeling/CourseLesson.css";

/* Material Setting (1) Assets */
import setMaterialIcon from "../../assets/3D_Image_File/material_setting1_set_material.png";
import materialListImg from "../../assets/3D_Image_File/material_setting1_material_list.png";
import step4ResultImg from "../../assets/3D_Image_File/material_setting1_material_setting_4.png";
import step5DialogImg from "../../assets/3D_Image_File/material_setting1_material_setting_5.png";
import materialSettingImg from "../../assets/3D_Image_File/material_setting1_material_setting.png";
import leftClick from "../../assets/3D_Image_File/left_click.png";

/* Material Setting (2) Assets */
import mat2RefImg from "../../assets/3D_Image_File/material_setting2_material.png";
import mat2VerifyImg from "../../assets/3D_Image_File/material_setting2_material_not_included.png";

interface MaterialSettingLessonProps {
  nextLabel?: string;
  subLessonId?: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const MaterialSettingLesson: React.FC<MaterialSettingLessonProps> = ({ subLessonId = "material-1", onNextLesson, onPrevLesson, nextLabel }) => {
  const [activeTab, setActiveTab] = useState<"set" | "unlisted" | "procedure">(() => {
    return (localStorage.getItem(`${subLessonId}-tab`) as any) || 'set';
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

  const material1Steps = [
    "MATERIAL SETTING",
    "Step 1: Select the Set Material from the icon menu.",
    "Step 2: Select the entity/entities then GO",
    "Step 3: The Material Setting Window will appear. Select the material from the list then Press OK",
    "The list consists of the materials and their corresponding Notation, Specific Gravity and Color. However, we follow the color base on the color codes. Materials that don't have color code must be machine color (WHITE).",
    "Step 4: After setting the material, a dialog box will appear then Select OK",
    "Parts that already have material set will be highlighted to show distinction with parts that does not have yet.",
    "Step 5: In case there are changes in the material, select Set Material from the icon menu.",
    "A dialog box will appear. It tells that the selected entity's material info had already been set and asks whether you like to proceed in changing the material or not.",
    "Select OK then the Material Settings window will appear then reselect new material for the part",
    "OR",
    "Select Cancel then no changes will be made."
  ];

  const material2Steps = [
    "MATERIAL THAT ARE NOT INCLUDED ON ICAD MATERIAL LIST",
    "On ICAD, S35C is not included on the material list. In this case, we can use S45C as material on 3D. In case of 2D detailing, we need to put S35C on BOM instead of S45C. S45C is use as material for S35C in order to compute for the material weight and final weight of the part. However, there is no need to release the material on 3D part since the specific gravity of the two materials are almost the same.",
    "Other materials that are not on ICAD Material List include:"
  ];

  const tabs = [
    { id: "set", label: "MATERIAL SETTING" },
    { id: "unlisted", label: "UNLISTED MATERIALS" },
  ];

  const handleNext = () => {
    if (activeTab === "set") setActiveTab("unlisted");
    else if (onNextLesson) onNextLesson();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrev = () => {
    if (activeTab === "unlisted") setActiveTab("set");
    else if (onPrevLesson) onPrevLesson();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const introTitle = "Material Setting";
  const introSubtitle = "Setting material is important in order to measure the weight of the part based on the material's specific gravity and it is a factor to consider in adding layer and color to the part.";

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
            const steps = activeTab === 'set' ? material1Steps : material2Steps;
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
        {activeTab === 'set' && (
          <div className="screenshot-wrapper mt-4">
            <img src={materialSettingImg} alt="Material Setting" className="software-screenshot screenshot-small" style={{ height: '350px', marginTop: "1rem" }} />
          </div>
        )}
      </section>

      <div className="lesson-grid single-card">
        <div className="fade-in">
          {activeTab === 'set' && (
            <div className="lesson-card tab-content">
              <div className="card-header">
                <h4 className={`${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
                  <KaraokeLessonText
                    as="span"
                    text="MATERIAL SETTING"
                    isActive={isSpeaking && currentIndex === 2}
                    currentCharIndex={currentCharIndex}
                  />
                </h4>
              </div>

              {/* Step 1 */}
              <div className={`instruction-step ${currentIndex === 3 ? "reading-active" : ""}`} data-reading-index="3">
                <div className="step-header">
                  <span className="step-number">1 </span>
                  <KaraokeLessonText
                    as="span"
                    className="step-label"
                    text="Select the Set Material from the icon menu."
                    isActive={isSpeaking && currentIndex === 3}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
                <div className="step-description">
                  <div className="screenshot-wrapper">
                    <img src={setMaterialIcon} alt="Set Material Icon" className="software-screenshot" style={{ height: '100px', marginBottom: '-3rem' }} />
                  </div>
                </div>
              </div>

              <div className="section-divider"></div>

              {/* Step 2 */}
              <div className={`instruction-step ${currentIndex === 4 ? "reading-active" : ""}`} data-reading-index="4">
                <div className="step-header" style={{ marginTop: "-1rem" }}>
                  <span className="step-number">2 </span>
                  <KaraokeLessonText
                    as="span"
                    className="step-label"
                    text="Select the entity/entities > GO"
                    isActive={isSpeaking && currentIndex === 4}
                    currentCharIndex={currentCharIndex}
                  />
                   <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '40px', margin: '0 8px', marginTop: "-2rem" }} />
                </div>
              </div>


              {/* Step 3 */}
              <div className={`instruction-step ${currentIndex === 5 ? "reading-active" : ""}`} data-reading-index="5" style={{marginTop: "-2rem"}}>
                <div className="step-header">
                  <span className="step-number">3 </span>
                  <KaraokeLessonText
                    as="span"
                    className="step-label"
                    text="The Material Setting Window will appear. Select the material from the list > Press OK"
                    isActive={isSpeaking && currentIndex === 5}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
                <div className="step-description">
                  <KaraokeLessonText
                    className="p-flush mb-4"
                    text=" The list consists of the materials and their corresponding Notation, Specific Gravity and Color. However, we follow the color base on the color codes. Materials that don't have color code must be machine color (WHITE)."
                    isActive={isSpeaking && currentIndex === 6}
                    currentCharIndex={currentCharIndex}
                  />
                  <div className="screenshot-wrapper">
                    <img src={materialListImg} alt="Material Settings Window" className="software-screenshot" style={{ width: '900px', marginTop: "1rem" }} />
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div className={`instruction-step ${currentIndex === 7 ? "reading-active" : ""}`} data-reading-index="7">
                <div className="step-header">
                  <span className="step-number">4 </span>
                  <KaraokeLessonText
                    as="span"
                    className="step-label"
                    text="After setting the material, a dialog box will appear > Select OK"
                    isActive={isSpeaking && currentIndex === 7}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
                <div className="step-description">
                  <KaraokeLessonText
                    className="p-flush mb-4"
                    text="Parts that already have material set will be highlighted to show distinction with parts that does not have yet."
                    isActive={isSpeaking && currentIndex === 8}
                    currentCharIndex={currentCharIndex}
                  />
                  <div className="screenshot-wrapper">
                    <img src={step4ResultImg} alt="Material Distinction result" className="software-screenshot screenshot-wide" style={{ marginTop: "1rem"}} />
                  </div>
                </div>
              </div>

              {/* Step 5 */}
              <div className={`instruction-step ${currentIndex === 9 ? "reading-active" : ""}`} data-reading-index="9">
                <div className="step-header">
                  <span className="step-number">5 </span>
                  <KaraokeLessonText
                    as="span"
                    className="step-label"
                    text="In case there are changes in the material, select Set Material from the icon menu."
                    isActive={isSpeaking && currentIndex === 9}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
                <div className="step-description">
                  <KaraokeLessonText
                    className="p-flush mb-4"
                    text="A dialog box will appear. It tells that the selected entity's material info had already been set and asks whether you like to proceed in changing the material or not."
                    isActive={isSpeaking && currentIndex === 10}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
                
                <div className="step-description">
                  <div className="screenshot-wrapper">
                    <img src={step5DialogImg} alt="Material Overwrite Dialog" className="software-screenshot screenshot-medium" style={{ height: '190px' }} />
                  </div>
                </div>
              </div>
               
               <div className="step-description">
                  <KaraokeLessonText
                    className="p-flush mb-4"
                    text="Select OK > Material Settings window will appear > Reselect new material for the part"
                    isActive={isSpeaking && currentIndex === 11}
                    currentCharIndex={currentCharIndex}
                  />
                </div>

                 <div className="step-description" style={{marginTop: "-1rem"}}> 
                  <KaraokeLessonText
                    className="p-flush mb-4"
                    text="OR"
                    isActive={isSpeaking && currentIndex === 12}
                    currentCharIndex={currentCharIndex}
                  />
                </div>

                 <div className="step-description" style={{marginTop: "-1rem"}}>
                  <KaraokeLessonText
                    className="p-flush mb-4"
                    text="Select Cancel > No changes will be made."
                    isActive={isSpeaking && currentIndex === 13}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
              

              <div className="lesson-navigation">
                <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button>
                <button className="nav-button next" onClick={handleNext}>Next <ChevronRight size={18} /></button>
              </div>
            </div>
          )}

          {activeTab === 'unlisted' && (
            <div className="lesson-card tab-content">
              <div className="card-header">
                <h4 className={`${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
                  <KaraokeLessonText
                    as="span"
                    text="MATERIAL THAT ARE NOT INCLUDED ON ICAD MATERIAL LIST"
                    isActive={isSpeaking && currentIndex === 2}
                    currentCharIndex={currentCharIndex}
                  />
                </h4>
              </div>

              <div className={`instruction-step ${currentIndex === 3 ? "reading-active" : ""}`} data-reading-index="3">
                <div className="screenshot-wrapper">
                  <img src={mat2VerifyImg} alt="2D Drawing Reference" className="software-screenshot screenshot-wide" style={{marginBottom: "1rem"}}/>
                </div>
                <div className="instruction-box instruction-box--warning mt-8">
                  <KaraokeLessonText
                    className="p-flush"
                    text="On ICAD, S35C is not included on the material list. In this case, we can use S45C as material on 3D. In case of 2D detailing, we need to put S35C on BOM instead of S45C.  S45C is use as material for S35C in order to compute for the material weight and final weight of the part. However, there is no need to release the material on 3D part since the specific gravity of the two materials are almost the same."
                    isActive={isSpeaking && currentIndex === 3}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
                <div className="screenshot-wrapper mt-8">
                  <img src={mat2RefImg} alt="3D Information Verification" className="software-screenshot screenshot-wide" style={{marginTop: "1rem"}} />
                </div>
              </div>

              <div className={`instruction-step ${currentIndex === 4 ? "reading-active" : ""}`} data-reading-index="4">
                <div className="card-header">
                  <h4 className={`${currentIndex === 4 ? 'reading-active' : ''}`} data-reading-index="4">
                    <KaraokeLessonText
                      as="span"
                      text="Other materials that are not on ICAD Material List include: "
                      isActive={isSpeaking && currentIndex === 4}
                      currentCharIndex={currentCharIndex}
                    />
                  </h4>
                </div>
                <div className="lesson-table-container" style={{ marginTop: "2rem", marginLeft: "3rem", maxWidth: "800px" }}>
                  <table className="lesson-table">
                    <thead>
                      <tr>
                        <th>Material</th>
                        <th>Equivalent Material on Icad Material List</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>S35C</td>
                        <td>S45C</td>
                      </tr>
                      <tr>
                        <td>C1220</td>
                        <td>C1100</td>
                      </tr>
                      <tr>
                        <td>CuP</td>
                        <td>C1100</td>
                      </tr>
                      <tr>
                        <td>C1020</td>
                        <td>C1100</td>
                      </tr>
                      <tr>
                        <td>BSP</td>
                        <td>C2680</td>
                      </tr>
                      <tr>
                        <td>PVC</td>
                        <td>VP(塩化ビニール管)</td>
                      </tr>
                    </tbody>
                  </table>
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

export default MaterialSettingLesson;

