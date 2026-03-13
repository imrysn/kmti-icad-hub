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
import materialSettingImg from '../../assets/3D_Image_File/material_setting(1)_material_setting.jpg';
import leftClick from '../../assets/3D_Image_File/left_click.jpg';


// Material Setting (2) Assets
import mat2RefImg from '../../assets/3D_Image_File/material_setting(2)_material.jpg';
import mat2VerifyImg from '../../assets/3D_Image_File/material_setting(2)_material_not_included.jpg';
import materialsListImg from '../../assets/3D_Image_File/material_list.jpg';

interface MaterialSettingLessonProps {
  subLessonId?: string;
  onNextLesson?: () => void;
}

const MaterialSettingLesson: React.FC<MaterialSettingLessonProps> = ({ subLessonId = 'material-1', onNextLesson }) => {
  const isMaterial1 = subLessonId === 'material-1';

  return (
    <div className="course-lesson-container">
      <section className="lesson-intro">
        <h3><Layers size={28} className="lesson-intro-icon" /> {isMaterial1 ? 'MATERIAL SETTING' : 'MATERIAL NOT INCLUDED ON ICAD MATERIAL LIST'}</h3>
        <p>Setting material is important in order to measure the weight of the part based on the material's specific gravity and it is a factor to consider in adding layer and color to the part.</p>

        {isMaterial1 && (
          <div className="instruction-box">
            <div className="image-wrapper">
              <img src={materialSettingImg} alt="Material Setting" className="software-screenshot screenshot-small" />
            </div>
          </div>
        )}
      </section>


      <div className="lesson-grid single-card">
        <div className="lesson-card">
          <div className="lesson-content fade-in">

            {isMaterial1 ? (
              <>
                <div className="instruction-step">
                  <div className="step-header">
                    <span className="step-number">1</span>
                    <span className="step-label">Select the <span style={{ color: 'red' }}>Set Material</span> from the icon menu.</span>
                  </div>
                  <div className="image-wrapper-flush">
                    <img src={setMaterialIcon} alt="Set Material Icon" className="software-screenshot screenshot-small" />
                  </div>
                </div>

                <div className="instruction-step">
                  <div className="step-header">
                    <span className="step-number">2</span>
                    <span className="step-label">Select the entity/entities &gt; GO </span>
                    <img src={leftClick} alt="Left click" className="software-screenshot screenshot-click" />
                  </div>
                </div>

                <div className="instruction-step">
                  <div className="step-header">
                    <span className="step-number">3</span>
                    <span className="step-label">The Material Setting Window will appear. Select the material from the list &gt; Press OK</span>
                  </div>
                  <p className="step-description">
                    The list consists of the materials and their corresponding Notation, Specific Gravity and Color. <br /> However, we follow the color base on the <span style={{ color: 'red' }}>color codes</span>. Materials that don't have color code must be machine color <span style={{ color: 'red' }}>(WHITE)</span>.
                  </p>
                  <div className="image-wrapper-flush">
                    <img src={materialListImg} alt="Material Settings Window" className="software-screenshot screenshot-wide" />
                  </div>
                </div>

                <div className="instruction-step" style={{ marginTop: '1rem' }}>
                  <div className="step-header">
                    <span className="step-number">4</span>
                    <span className="step-label">After setting the material, a dialog box will appear &gt; Select OK.</span>
                  </div>
                  <p className="step-description">
                    Parts that already have material set will be highlighted to show distinction with parts that does not have yet.
                  </p>
                  <div className="image-wrapper-flush">
                    <img src={step4ResultImg} alt="Material Distinction and Shading Display Dialog" className="software-screenshot screenshot-wide" />
                  </div>
                </div>

                <div className="instruction-step" style={{ marginTop: '1rem' }}>
                  <div className="step-header">
                    <span className="step-number">5</span>
                    <span className="step-label">In case there are changes in the material, select <span style={{ color: 'red' }}>Set Material</span> from the icon menu.</span>
                  </div>
                  <p className="step-description">
                    A dialog box will appear. It tells that the selected entity's material info had already been set and asks whether you like to proceed in changing the material or not.
                  </p>
                  <div className="image-wrapper-flush" style={{ marginLeft: '2.5rem' }}>
                    <img src={step5DialogImg} alt="Material Overwrite Dialog" className="software-screenshot screenshot-medium" />
                  </div>

                  <div className="instruction-step-indent">
                    <p>Select OK &gt; Material Settings window will appear &gt; Reselect new material for the part</p>
                    <p>OR</p>
                    <p>Select Cancel &gt; No changes will be made.</p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <section className="mt-6">

                  <div className="flex flex-col gap-6">
                    <div className="image-card max-w-2xl mx-auto">
                      <img src={mat2VerifyImg} alt="2D Drawing Reference" className="software-screenshot screenshot-wide" />
                    </div>

                    <p className="step-description" style={{ marginTop: '1rem', marginBottom: '1rem' }} >
                      On ICAD, <strong className="text-highlight">S35C</strong> is not included on the material list. In this case, we can use <strong className="text-highlight">S45C</strong> as material on 3D.
                      In case of 2D detailing, we need to put S35C on BOM instead of S45C. S45C is used as material for S35C in order to compute for the material weight and final weight of the part.
                      However, there is no need to release the material on 3D part since the specific gravity of the two materials are almost the same.
                    </p>

                    <div className="image-card max-w-2xl mx-auto">
                      <img src={mat2RefImg} alt="3D Information Verification" className="software-screenshot screenshot-wide" />
                    </div>

                    <div className="mt-4" style={{ marginTop: '3rem' }} >
                      <p className="font-semibold mb-3">Other materials that are not on ICAD Material List includes:</p>
                      <div className="image-wrapper-flush" style={{ marginTop: '1rem' }}>
                        <img src={materialsListImg} alt="Materials List" className="software-screenshot screenshot-wide" />
                      </div>
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
    </div >
  );
};

export default MaterialSettingLesson;
