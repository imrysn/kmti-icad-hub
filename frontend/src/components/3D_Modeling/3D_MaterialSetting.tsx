/**
 * 3D_MaterialSetting.tsx — Material Setting lessons
 */
import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Layers, CheckCircle2, Zap, Info } from 'lucide-react';
import '../../styles/3D_Modeling/CourseLesson.css';
import '../../styles/3D_Modeling/CourseLesson.css';

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
  onPrevLesson?: () => void;
}

const MaterialSettingLesson: React.FC<MaterialSettingLessonProps> = ({ subLessonId = 'material-1', onNextLesson, onPrevLesson }) => {
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const isMaterial1 = subLessonId === 'material-1';

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const element = containerRef.current;
      const totalHeight = element.scrollHeight - element.clientHeight;
      if (totalHeight === 0) {
        setScrollProgress(100);
        return;
      }
      const progress = (element.scrollTop / totalHeight) * 100;
      setScrollProgress(progress);
    };

    const currentContainer = containerRef.current;
    if (currentContainer) {
      currentContainer.addEventListener('scroll', handleScroll);
      handleScroll();
    }

    return () => {
      if (currentContainer) {
        currentContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, [subLessonId]);

  const toggleStep = (stepId: string) => {
    setCompletedSteps(prev => {
      const next = new Set(prev);
      if (next.has(stepId)) next.delete(stepId);
      else next.add(stepId);
      return next;
    });
  };

  const getStepClass = (stepId: string) => {
    return `instruction-step interactive ${completedSteps.has(stepId) ? 'completed' : ''}`;
  };

  return (
    <div className="course-lesson-container" ref={containerRef}>
      {/* Sticky Progress Bar */}
      <div className="lesson-progress-container">
        <div
          className="lesson-progress-bar"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
      <section className="lesson-intro">
        <h3 className="section-title">
          <Layers size={28} className="lesson-intro-icon" />
          {isMaterial1 ? 'MATERIAL SETTING' : 'MATERIAL NOT INCLUDED ON ICAD MATERIAL LIST'}
        </h3>



        {isMaterial1 && (
          <div className="instruction-box" style={{ marginTop: '1.5rem', border: 'none', background: 'transparent' }}>
            <p className="p-flush" style={{ marginBottom: '1.5rem' }}>Setting material is important in order to measure the weigth of the part based on the material's specific gravity and it is a factor to consider in adding layer and color to the part.</p>
            <div className="image-wrapper-flush" style={{ margin: '0 auto' }}>
              <img src={materialSettingImg} alt="Material Setting" className="software-screenshot screenshot-small" />
            </div>
          </div>
        )}
      </section>

      <div className="lesson-grid single-card">
        <div className="lesson-card">
          <div className="lesson-content">
            {isMaterial1 ? (
              <div className="tab-pane">
                <div className={getStepClass('ms-1')} onClick={() => toggleStep('ms-1')}>
                  <div className="step-header">
                    <span className={`step-number ${completedSteps.has('ms-1') ? 'completed' : ''}`}>
                      {completedSteps.has('ms-1') ? <CheckCircle2 size={16} /> : '1'}
                    </span>
                    <span className="step-label">Select <strong className="text-highlight">Set Material</strong> from the icon menu.</span>
                  </div>
                  <div className="step-description" style={{ paddingLeft: '2.5rem' }}>
                    <div className="image-wrapper-flush" style={{ marginTop: '0.8rem' }}>
                      <img src={setMaterialIcon} alt="Set Material Icon" className="software-screenshot screenshot-small" />
                    </div>
                  </div>
                </div>

                <div className={getStepClass('ms-2')} onClick={() => toggleStep('ms-2')}>
                  <div className="step-header">
                    <span className={`step-number ${completedSteps.has('ms-2') ? 'completed' : ''}`}>
                      {completedSteps.has('ms-2') ? <CheckCircle2 size={16} /> : '2'}
                    </span>
                    <span className="step-label">Select the entity/entities &gt; <strong className="text-highlight">GO</strong> <img src={leftClick} alt="Left click" className="software-screenshot screenshot-click--inline" style={{ verticalAlign: 'middle', marginLeft: '0.25rem' }} /></span>
                  </div>
                  <div className="step-description" style={{ paddingLeft: '2.5rem' }}>
                  </div>
                </div>

                <div className={getStepClass('ms-3')} onClick={() => toggleStep('ms-3')}>
                  <div className="step-header">
                    <span className={`step-number ${completedSteps.has('ms-3') ? 'completed' : ''}`}>
                      {completedSteps.has('ms-3') ? <CheckCircle2 size={16} /> : '3'}
                    </span>
                    <span className="step-label">The Material Setting Window will appear. Select the material from the list &gt; Press <strong className="text-highlight">OK</strong></span>
                  </div>
                  <div className="step-description" style={{ paddingLeft: '2.5rem' }}>
                    <p className="p-flush" style={{ marginTop: '0.5rem' }}>The list consists of the materials and their corresponding Notation, Specific Gravity and Color.</p>
                    <p className="p-flush">However, we follow the color base on the <strong className="text-highlight">color codes.</strong> Materials that don't have a color code must be machine color <strong className="text-highlight">(WHITE).</strong> </p>

                    <div className="image-wrapper-flush" style={{ marginTop: '1rem' }}>
                      <img src={materialListImg} alt="Material Settings Window" className="software-screenshot screenshot-wide" />
                    </div>
                  </div>
                </div>

                <div className={getStepClass('ms-4')} onClick={() => toggleStep('ms-4')}>
                  <div className="step-header">
                    <span className={`step-number ${completedSteps.has('ms-4') ? 'completed' : ''}`}>
                      {completedSteps.has('ms-4') ? <CheckCircle2 size={16} /> : '4'}
                    </span>
                    <span className="step-label">After setting the material, a dialog box will appear &gt; Select <strong className="text-highlight">OK</strong>.</span>
                  </div>
                  <div className="step-description" style={{ paddingLeft: '2.5rem' }}>
                    <p className="p-flush" style={{ marginTop: '0.5rem' }}>Parts that already have material set will be highlighted to show distinction with parts that does not have yet.</p>
                    <div className="image-wrapper-flush" style={{ marginTop: '1rem' }}>
                      <img src={step4ResultImg} alt="Material Distinction result" className="software-screenshot screenshot-wide" />
                    </div>
                  </div>
                </div>

                <div className={getStepClass('ms-5')} onClick={() => toggleStep('ms-5')}>
                  <div className="step-header">
                    <span className={`step-number ${completedSteps.has('ms-5') ? 'completed' : ''}`}>
                      {completedSteps.has('ms-5') ? <CheckCircle2 size={16} /> : '5'}
                    </span>
                    <span className="step-label">In case there are changes in the material, select <strong className="text-highlight">Set Material</strong> from the icon menu.</span>
                  </div>
                  <div className="step-description" style={{ paddingLeft: '2.5rem' }}>
                    <p className="p-flush" style={{ marginTop: '0.5rem' }}>A dialog box will appear. It tells that the selected entity's material info had already been set and asks whether you like to proceed in changing the material or not.</p>
                    <div className="image-wrapper-flush" style={{ marginTop: '1rem' }}>
                      <img src={step5DialogImg} alt="Material Overwrite Dialog" className="software-screenshot screenshot-medium" />
                    </div>
                    <div className="step-header" style={{ border: 'none', background: 'transparent', padding: 0, marginTop: '0.8rem', marginBottom: '0.5rem' }}>
                      <span className="step-label">Select <strong className="text-highlight">OK</strong> &gt; Material Setting window will appear &gt; Reselect new material for the part</span>
                    </div>
                    <p className="p-flush"><strong className="text-highlight">OR</strong></p>
                    <p className="p-flush">Select Cancel &gt; No changes will be made.</p>

                  </div>
                </div>

              </div>
            ) : (
              <div className="tab-pane">
                <div className="image-wrapper-flush">
                  <img src={mat2VerifyImg} alt="2D Drawing Reference" className="software-screenshot screenshot-wide" />
                </div>


                <p className="p-flush" style={{ marginBottom: '1.5rem', marginTop: '1.5rem' }}>On iCAD, <strong className="text-highlight">S35C</strong> is not included on the material list in this case, we can use <strong className="text-highlight">S45C</strong> as material on 3D in case of 2D detailing, we need to put S35C on BOM instead of S45C. S45C is use as material for S35C in order to compute for the material weight and final weight of the part. However, there is no need to release the material on 3D part since the specific gravity of the two materials are almost the same</p>
                <div className="image-wrapper-flush" style={{ marginTop: '1.5rem' }}>
                  <img src={mat2RefImg} alt="3D Information Verification" className="software-screenshot screenshot-wide" />
                </div>

                <div className="section-divider" style={{ margin: '2rem 0' }}></div>

                <div className="tool-block">
                  <h4 className="section-title">Other materials that are not on iCAD Material List includes:</h4>
                  <div className="image-wrapper-flush" style={{ marginTop: '1rem' }}>
                    <img src={materialsListImg} alt="Materials List" className="software-screenshot screenshot-wide" />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="lesson-navigation">
            <button className="nav-button" onClick={onPrevLesson}><ChevronLeft size={18} /> Previous</button>
            <button className="nav-button next" onClick={onNextLesson}>Next Lesson <ChevronRight size={18} /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaterialSettingLesson;
