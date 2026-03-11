/**
 * 3D_MaterialSetting.tsx — Material Setting lessons
 */
import React from 'react';
import { ChevronLeft, ChevronRight, Layers } from 'lucide-react';
import '../../styles/3D_Modeling/CourseLesson.css';
import '../../styles/3D_Modeling/3D_MaterialSetting.css';

// Material Setting (1) Assets
import setMaterialIcon from '../../assets/3D_Image_File/material_setting(1)_set_material.jpg';
import materialListImg from '../../assets/3D_Image_File/material_setting(1)_material_list.jpg';
import step4ResultImg from '../../assets/3D_Image_File/material_setting(1)_material_setting_4.jpg';
import step5DialogImg from '../../assets/3D_Image_File/material_setting(1)_material_setting_5.jpg';
import leftClick from '../../assets/3D_Image_File/left_click.jpg';

// Material Setting (2) Assets
import mat2RefImg from '../../assets/3D_Image_File/material_setting(2)_material.jpg';
import mat2VerifyImg from '../../assets/3D_Image_File/material_setting(2)_material_not_included.jpg';

interface MaterialSettingLessonProps {
  subLessonId?: string;
  onNextLesson?: () => void;
}

const MaterialSettingLesson: React.FC<MaterialSettingLessonProps> = ({ subLessonId = 'material-1', onNextLesson }) => {
  const isMaterial1 = subLessonId === 'material-1';

  return (
    <div className="course-lesson-container">
      <section className="lesson-intro">
        <h3><Layers size={28} className="lesson-intro-icon" /> MATERIAL SETTING</h3>
        <p>Setting material is important in order to measure the weight of the part based on the material's specific gravity and it is a factor to consider in adding layer and colors.</p>
      </section>

      <div className="lesson-grid single-card">
        <div className="lesson-card">
          <div className="lesson-content fade-in">
            <h3 className="section-title">{isMaterial1 ? 'MATERIAL SETTING (1)' : 'MATERIAL SETTING (2)'}</h3>

            {isMaterial1 ? (
              <>
                <div className="instruction-step">
                  <div className="step-header">
                    <span className="step-number">1</span>
                    <span className="step-label">Select the <strong className="text-highlight">Set Material</strong> from the icon menu.</span>
                  </div>
                  <div className="image-wrapper-flush">
                    <img src={setMaterialIcon} alt="Set Material Icon" className="software-screenshot screenshot-small" />
                  </div>
                </div>

                <div className="instruction-step">
                  <div className="step-header">
                    <span className="step-number">2</span>
                    <span className="step-label">Select the entity/entities &gt; </span>
                    <img src={leftClick} alt="Left click" className="software-screenshot screenshot-click" />
                  </div>
                </div>

                <div className="instruction-step">
                  <div className="step-header">
                    <span className="step-number">3</span>
                    <span className="step-label">The Material Setting Window will appear. Select the material from the list &gt; Press <strong className="text-highlight">OK</strong>.</span>
                  </div>
                  <p className="step-description">
                    The list consists of the materials and their corresponding Notation, Specific Gravity and Color.
                    However, we follow the color base on the <strong className="text-highlight">color codes</strong>. Materials that don't have color code must be machine color (<strong className="text-highlight">WHITE</strong>).
                  </p>
                  <div className="image-wrapper-flush">
                    <img src={materialListImg} alt="Material Settings Window" className="software-screenshot" />
                  </div>
                </div>

                <div className="instruction-step">
                  <div className="step-header">
                    <span className="step-number">4</span>
                    <span className="step-label">After setting the material, a dialog box will appear &gt; Select <strong className="text-highlight">OK</strong>.</span>
                  </div>
                  <p className="step-description">
                    Parts that already have material set will be highlighted to show distinction with parts that does not have yet.
                  </p>
                  <div className="image-wrapper-flush">
                    <img src={step4ResultImg} alt="Material Distinction and Shading Display Dialog" className="software-screenshot" />
                  </div>
                </div>

                <div className="instruction-step">
                  <div className="step-header">
                    <span className="step-number">5</span>
                    <span className="step-label">In case there are changes in the material, select <strong className="text-highlight">Set Material</strong> from the icon menu.</span>
                  </div>
                  <p className="step-description">
                    A dialog box will appear. It tells that the selected entity's material info had already been set and asks whether you like to proceed in changing the material or not.
                  </p>
                  <div className="image-wrapper-flush">
                    <img src={step5DialogImg} alt="Material Overwrite Dialog" className="software-screenshot screenshot-large" />
                  </div>

                  <div className="instruction-step-indent">
                    <p>Select <strong className="text-highlight">OK</strong> &gt; Material Settings window will appear &gt; Reselect new material for the part</p>
                    <p><strong className="text-highlight">OR</strong></p>
                    <p>Select <strong className="text-highlight">Cancel</strong> &gt; No changes will be made.</p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <section className="mt-6">
                  <h4 className="font-bold text-lg mb-4 text-center">Material that are Not Included on Icad Material List</h4>

                  <div className="flex flex-col gap-6">
                    <div className="image-card max-w-2xl mx-auto">
                      <img src={mat2VerifyImg} alt="2D Drawing Reference" className="software-screenshot" />
                    </div>

                    <p className="step-description">
                      On ICAD, <strong className="text-highlight">S35C</strong> is not included on the material list. In this case, we can use <strong className="text-highlight">S45C</strong> as material on 3D.
                      In case of 2D detailing, we need to put S35C on BOM instead of S45C. S45C is used as material for S35C in order to compute for the material weight and final weight of the part.
                      However, there is no need to release the material on 3D part since the specific gravity of the two materials are almost the same.
                    </p>

                    <div className="image-card max-w-2xl mx-auto">
                      <img src={mat2RefImg} alt="3D Information Verification" className="software-screenshot" />
                    </div>

                    <div className="mt-4">
                      <p className="font-semibold mb-3">Other materials that are not on ICAD Material List includes:</p>
                      <table className="lesson-table">
                        <thead>
                          <tr>
                            <th>Material</th>
                            <th>Equivalent Material on Icad Material List</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr><td>S35C</td><td>S45C</td></tr>
                          <tr><td>C1220</td><td>C1100</td></tr>
                          <tr><td>CuP</td><td>C1100</td></tr>
                          <tr><td>C1020</td><td>C1100</td></tr>
                          <tr><td>BSP</td><td>C2680</td></tr>
                          <tr><td>PVC</td><td>VP (塩化ビニール管)</td></tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </section>
              </>
            )}
          </div>

          <div className="lesson-navigation">
            <button className="nav-button" disabled><ChevronLeft size={18} /> Previous</button>
            <button className="nav-button next" onClick={onNextLesson}>
              {isMaterial1 ? 'Next Lesson' : 'Finish'} <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaterialSettingLesson;
