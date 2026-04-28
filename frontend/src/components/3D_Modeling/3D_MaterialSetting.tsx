import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLessonCore } from "../../hooks/useLessonCore";
import { ReadAloudButton } from "../ReadAloudButton";
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
import materialsListImg from "../../assets/3D_Image_File/material_list.png";

interface MaterialSettingLessonProps {
  nextLabel?: string;
  subLessonId?: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const MaterialSettingLesson: React.FC<MaterialSettingLessonProps> = ({ subLessonId = "material-1", onNextLesson, onPrevLesson, nextLabel }) => {
  const [activeTab, setActiveTab] = useState<"set" | "unlisted">(() => {
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
    currentIndex
  } = useLessonCore(`${subLessonId}-${activeTab}`);

  const material1Steps = [
    "Step 1: Select Set Material from the icon menu.",
    "Step 2: Select the entity or entities you want to assign and click GO.",
    "Step 3: Choose a material from the list to assign notation, specific gravity, and color.",
    "Step 4: After confirming, a dialog appears and the entities will be highlighted to show they have been set.",
    "Step 5: To change a material, re-select Set Material and choose OK in the overwrite dialog."
  ];

  const material2Steps = [
    "Important Note: If a specific material like S35C is not in the list, you can use a similar one like S45C for weight calculations.",
    "Ensure you correctly specify the actual material name in the Bill of Materials manually during detailing."
  ];

  const tabs = [
    { id: "set", label: "MATERIAL SETTING" },
    { id: "unlisted", label: "UNLISTED MATERIALS" },
  ];

  const handleNext = () => {
    if (activeTab === "set") setActiveTab("unlisted");
    else if (onNextLesson) onNextLesson();
  };

  const handlePrev = () => {
    if (activeTab === "unlisted") setActiveTab("set");
    else if (onPrevLesson) onPrevLesson();
  };

  return (
    <div className="course-lesson-container" ref={containerRef}>
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

      {activeTab === 'set' && (
        <section className="lesson-intro">
          <h3 className="section-title">
            Material Setting
          </h3>
          <div>
            <p className="p-flush">
              Setting material is important in order to measure the weigth of the part based on the material's specific gravity and it is a factor to consider in adding layer and color to the part.
            </p>
            <div className="screenshot-wrapper mt-4">
              <img src={materialSettingImg} alt="Material Setting" className="software-screenshot screenshot-small" style={{ height: '350px', marginTop: "1rem" }} />
            </div>
          </div>
        </section>
      )}

      <div className="lesson-grid single-card">
        <div className="fade-in">
          {activeTab === 'set' && (
            <div className="lesson-card tab-content">
              <div className="card-header">
                <h4>MATERIAL SETTING</h4>
                <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(material1Steps)} onStop={stop} />
              </div>

              <div className={`instruction-step ${currentIndex === 0 ? "reading-active" : ""}`}>
                <div className="step-header">
                  <span className="step-number">1 </span>
                  <span className="step-label">Select the <strong className="red-text">Set Material</strong> from the icon menu.</span>
                </div>
                <div className="step-description">
                  <div className="screenshot-wrapper">
                    <img src={setMaterialIcon} alt="Set Material Icon" className="software-screenshot" style={{ height: '100px', marginBottom: '-3rem' }} />
                  </div>
                </div>
              </div>

              <div className={`instruction-step ${currentIndex === 1 ? "reading-active" : ""}`}>
                <div className="step-header" style={{ marginBottom: '-2rem' }}>
                  <span className="step-number">2 </span>
                  <span className="step-label" style={{ marginTop: "-1.5rem"}}>Select the entity/entities &gt; <strong className="text-highlight">GO</strong>
                    <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '40px', margin: '0 8px' }} />
                  </span>
                </div>
              </div>

              <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`}>
                <div className="step-header">
                  <span className="step-number">3 </span>
                  <span className="step-label">The Material Setting Window will appear. Select the material from the list &gt; Press OK</span>
                </div>
                <span className="p-flush" style={{ marginTop: "2rem"}}>This list consists of the materials and their corresponding Notation, Specific Gravity and Color. <br /> 
                However, we follow the color base on the <strong className="red-text">color codes</strong> Materials that don't have color code must be machine color <strong className="red-text">(WHITE)</strong>.</span>
                
                  <div className="screenshot-wrapper">
                    <img src={materialListImg} alt="Material Settings Window" className="software-screenshot" style={{ width: '900px'}} />
                  </div>

              </div>

              <div className={`instruction-step ${currentIndex === 3 ? "reading-active" : ""}`}>
                <div className="step-header">
                  <span className="step-number">4 </span>
                  <span className="step-label" style={{ marginBottom: "-3.5rem"}}>After setting the material, a dialog box will appear &gt; Select OK. <br /> Parts that already have material set will be highlighted to show distinction with parts that does not have yet.</span>
                </div>
             
                  <div className="screenshot-wrapper">
                    <img src={step4ResultImg} alt="Material Distinction result" className="software-screenshot" style={{ width: '900px', marginTop: "4rem"}} />
                  </div>
              </div>

              <div className={`instruction-step ${currentIndex === 4 ? "reading-active" : ""}`}>
                <div className="step-header">
                  <span className="step-number">5 </span>
                  <span className="step-label" style={{ marginBottom: "-3.5rem"}}>In case there are changes in the material, select <strong className="red-text">Set Material</strong> from the icon menu. <br /> 
                  A dialog box will appear. It tells that the selected entity's material info had already been set and asks whether you like to proceed in changing the material or not. </span>
                </div>
                <div className="step-description">
                  <div className="screenshot-wrapper">
                    <img src={step5DialogImg} alt="Material Overwrite Dialog" className="software-screenshot" style={{ width: '400px', marginTop: "4rem" }} />
                  </div>
                </div>
              </div>

              <span className="p-flush">Select OK &gt; Material Settings window will appear &gt; Reselect new material for the part.</span> 
              <span className="p-flush" style={{marginTop: "-1rem"}}>OR</span> 
              <span className="p-flush" style={{marginTop: "-1rem"}}>Select Cancel &gt; No changes will be made </span>

              <div className="lesson-navigation">
                <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button>
                <button className="nav-button next" onClick={handleNext}>Next <ChevronRight size={18} /></button>
              </div>
            </div>
          )}
          {activeTab === 'unlisted' && (
            <div className="lesson-card tab-content">
              <div className="card-header">
                <h4>MATERIAL THAT ARE NOT INCLUDED ON ICAD MATERIAL</h4>
                <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(material2Steps)} onStop={stop} />
              </div>
      
              <div className="screenshot-wrapper">
                  <img src={mat2VerifyImg} alt="2D Drawing Reference" className="software-screenshot screenshot-wide" />
              </div>
                <div className="instruction-box instruction-box--warning mt-8">
                  <p className="p-flush"> On ICAD, <strong className="red-text">S35C</strong> is not included on the material list. In this case, we can use <strong className="red-text">S45C</strong>
                  as material on 3D. In case of 2D detailing, we need to put S35C on BOM instead of S45C. S45C is use as material for S35C in order to compute for the material weight and final weight of the part. However, there is no need to release the material on 3D part since the specific gravity of the two materials are almost the same. </p>
                </div>
                <div className="screenshot-wrapper mt-8">
                  <img src={mat2RefImg} alt="3D Information Verification" className="software-screenshot screenshot-wide" />
                </div>
           

              <div className="section-divider"></div>

              <div className="instruction-step">
                <div className="card-header"><h4>Other materials that are not on ICAD Material List includes: </h4></div>
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
                        <td>VP (塩化ビニール管)</td>
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
