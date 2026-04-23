/** * 3D_MaterialSetting.tsx – Material Setting lessons */

import React from "react";
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
  const {
    scrollProgress,
    containerRef,
    speak,
    stop,
    isSpeaking,
    currentIndex
  } = useLessonCore(subLessonId);

  const isMaterial1 = subLessonId === "material-1";

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

  const getStepClass = (stepId: string) => "instruction-step";

  return (
    <div className="course-lesson-container" ref={containerRef}>
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      <section className="lesson-intro">
        <h3 className="section-title">
          {isMaterial1 ? "Material setting" : "Material not included on iCAD material list"}
          <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(isMaterial1 ? material1Steps : material2Steps)} onStop={stop} />
        </h3>
        {isMaterial1 && (
          <div className="instruction-box">
            <p>
              Setting material is important in order to measure the weigth of the part based on the material's specific gravity and it is a factor to consider in adding layer and color to the part.
            </p>
            <div className="screenshot-wrapper mt-4">
              <img src={materialSettingImg} alt="Material Setting" className="software-screenshot screenshot-small" style={{ height: '350px' }} />
            </div>
          </div>
        )}
      </section>

      <div className="lesson-grid single-card">
        <div className="lesson-card">
          {isMaterial1 ? (
            <div className="tab-pane fade-in">
              <div className={`${getStepClass("ms-1")} ${currentIndex === 0 ? "reading-active" : ""}`}>
                <div className="step-header">
                  <span className="step-number">1</span>
                  <span className="step-label">Select <strong className="text-highlight">Set Material</strong> from the icon menu.</span>
                </div>
                <div className="step-description">
                  <div className="screenshot-wrapper">
                    <img src={setMaterialIcon} alt="Set Material Icon" className="software-screenshot screenshot-small" style={{ height: '100px' }} />
                  </div>
                </div>
              </div>

              <div className={`${getStepClass("ms-2")} ${currentIndex === 1 ? "reading-active" : ""}`}>
                <div className="step-header">
                  <span className="step-number">2</span>
                  <span className="step-label">
                    Select the entity/entities &gt; <strong className="text-highlight">GO</strong>
                    <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '40px', verticalAlign: 'middle', margin: '0 4px' }} />
                  </span>
                </div>
              </div>

              <div className={`${getStepClass("ms-3")} ${currentIndex === 2 ? "reading-active" : ""}`}>
                <div className="step-header">
                  <span className="step-number">3</span>
                  <span className="step-label">The Material Setting Window will appear. Select the material from the list &gt; Press <strong className="text-highlight">OK</strong></span>
                </div>
                <div className="step-description">
                  <p className="p-flush">The list consists of the materials and their corresponding Notation, Specific Gravity and Color.</p>
                  <p className="p-flush">However, we follow the color base on the <strong className="text-highlight">color codes.</strong> Materials that don't have a color code must be machine color <strong className="text-highlight">(WHITE).</strong></p>
                  <div className="screenshot-wrapper mt-4">
                    <img src={materialListImg} alt="Material Settings Window" className="software-screenshot screenshot-wide" style={{ height: '450px' }} />
                  </div>
                </div>
              </div>

              <div className={`${getStepClass("ms-4")} ${currentIndex === 3 ? "reading-active" : ""}`}>
                <div className="step-header">
                  <span className="step-number">4</span>
                  <span className="step-label">After setting the material, a dialog box will appear &gt; Select <strong className="text-highlight">OK</strong>.</span>
                </div>
                <div className="step-description">
                  <p className="p-flush">Parts that already have material set will be highlighted to show distinction with parts that does not have yet.</p>
                  <div className="screenshot-wrapper mt-4">
                    <img src={step4ResultImg} alt="Material Distinction result" className="software-screenshot screenshot-wide" style={{ height: '310px' }} />
                  </div>
                </div>
              </div>

              <div className={`${getStepClass("ms-5")} ${currentIndex === 4 ? "reading-active" : ""}`}>
                <div className="step-header">
                  <span className="step-number">5</span>
                  <span className="step-label">In case there are changes in the material, select <strong className="text-highlight">Set Material</strong> from the icon menu.</span>
                </div>
                <div className="step-description">
                  <p className="p-flush">A dialog box will appear. It tells that the selected entity's material info had already been set and asks whether you like to proceed in changing the material or not.</p>
                  <div className="screenshot-wrapper mt-4">
                    <img src={step5DialogImg} alt="Material Overwrite Dialog" className="software-screenshot screenshot-medium" style={{ height: '190px' }} />
                  </div>
                  <div className="step-header mt-4">
                    <span className="step-label">Select <strong className="text-highlight">OK</strong> &gt; Material Setting window will appear &gt; Reselect new material for the part</span>
                  </div>
                  <p className="p-flush"><strong>OR</strong> Select Cancel &gt; No changes will be made.</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="tab-pane fade-in">
              <div className="screenshot-wrapper">
                <img src={mat2VerifyImg} alt="2D Drawing Reference" className="software-screenshot screenshot-wide" style={{ width: '800px' }} />
              </div>
              <div className="instruction-box mt-4">
                <p className={`${currentIndex === 0 ? "reading-active" : ""}`}>
                  On iCAD, <strong className="text-highlight">S35C</strong> is not included on the material list in this case, we can use <strong className="text-highlight">S45C</strong> as material on 3D in case of 2D detailing, we need to put S35C on BOM instead of S45C. S45C is use as material for S35C in order to compute for the material weight and final weight of the part. However, there is no need to release the material on 3D part since the specific gravity of the two materials are almost the same.
                </p>
              </div>

              <div className="screenshot-wrapper mt-4">
                <img src={mat2RefImg} alt="3D Information Verification" className="software-screenshot screenshot-wide" style={{ width: '800px' }} />
              </div>

              <div className="section-divider" />

              <div className={`tool-block ${currentIndex === 1 ? "reading-active" : ""}`}>
                <h4 className="section-title">Other materials that are not on iCAD Material List includes:</h4>
                <div className="screenshot-wrapper mt-4">
                  <img src={materialsListImg} alt="Materials List" className="software-screenshot screenshot-wide" />
                </div>
              </div>
            </div>
          )}
          <div className="lesson-navigation">
            <button className="nav-button" onClick={onPrevLesson}>
              <ChevronLeft size={18} /> Previous
            </button>
            <button className="nav-button next" onClick={onNextLesson}>
              {nextLabel || 'Next Lesson'} <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaterialSettingLesson;
