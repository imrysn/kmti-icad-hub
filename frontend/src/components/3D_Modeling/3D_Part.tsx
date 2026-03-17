/**
 * 3D_Part.tsx — 3D Part management lessons
 */
import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Box as BoxIcon, Info, CheckCircle2, Zap } from 'lucide-react';
import '../../styles/3D_Modeling/CourseLesson.css';
import '../../styles/3D_Modeling/CourseLesson.css';

// 3D Part (1) Assets
import partMenu1 from '../../assets/3D_Image_File/3d_part(1)_3d_part.jpg';
import createPartIcon from '../../assets/3D_Image_File/3d_part(1)_create_3d_part.jpg';
import modalInfo1 from '../../assets/3D_Image_File/3d_part(1)_creating_3d_part_3.jpg';
import treeViewInfo1 from '../../assets/3D_Image_File/3d_part(1)_creating_3d_part_4.jpg';
import materialDescriptionImg from '../../assets/3D_Image_File/3d_part(1)_material_description.jpg';

// 3D Part (2) Assets
import partMenu2 from '../../assets/3D_Image_File/3d_part(2)_change_3d_part_name.jpg';
import changePartIcon from '../../assets/3D_Image_File/3d_part(2)_change_3d_part_name_1.jpg';
import modalInfo2 from '../../assets/3D_Image_File/3d_part(2)_change_3d_part_name_3.jpg';
import treeViewInfo2 from '../../assets/3D_Image_File/3d_part(2)_change_3d_part_name_4.jpg';

import leftClick from '../../assets/3D_Image_File/left_click.jpg';

interface PartLessonProps {
  subLessonId?: string;
  onNextLesson?: () => void;
}

const PartLesson: React.FC<PartLessonProps> = ({ subLessonId = '3d-part-1', onNextLesson }) => {
  const isPart1 = subLessonId === '3d-part-1';
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reset steps when passing to different sublesson
    setCompletedSteps(new Set());
  }, [subLessonId]);

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
        <h3 className="section-title">{isPart1 ? 'CREATING 3D PART' : 'CHANGE 3D PART NAME'}</h3>
        <p className="p-flush">
          {isPart1
            ? 'Tool use to name 3D parts and provide information.3D part name must always be set since it is a vital part for the 2D Design.'
            : 'Tool use to Changes 3D part names, drawing names (of external 3D parts), and comments.'}
        </p>
        <div className="instruction-box">
          <div className="image-wrapper-flush">
            <img src={isPart1 ? partMenu1 : partMenu2} alt="3D Part Menu" className="software-screenshot screenshot-small" />
          </div>
        </div>
      </section>

      <div className="lesson-grid single-card">
        <div className="lesson-card">
          <div className="lesson-content">
            {isPart1 ? (
              <div className="tab-pane fade-in">
                <div className={getStepClass('create-1')} onClick={() => toggleStep('create-1')}>
                  <div className="step-header">
                    <span className={`step-number ${completedSteps.has('create-1') ? 'completed' : ''}`}>
                      {completedSteps.has('create-1') ? <CheckCircle2 size={16} /> : '1'}
                    </span>
                    <span className="step-label">Select Tool</span>
                  </div>
                  <div className="step-description">
                    <p className="p-flush">Select <strong className="text-highlight">Create 3D Part</strong> from the icon menu.</p>
                  </div>
                  <div className="image-wrapper-flush">
                    <img src={createPartIcon} alt="Create 3D Part Icon" className="software-screenshot screenshot-small" />
                  </div>
                </div>

                <div className={getStepClass('create-2')} onClick={() => toggleStep('create-2')} style={{ marginTop: '1.5rem' }}>
                  <div className="step-header">
                    <span className={`step-number ${completedSteps.has('create-2') ? 'completed' : ''}`}>
                      {completedSteps.has('create-2') ? <CheckCircle2 size={16} /> : '2'}
                    </span>
                    <span className="step-label">Select Entity</span>
                  </div>
                  <div className="step-description">
                    <div className="flex-row-center" style={{ gap: '1rem' }}>
                      <p className="p-flush">Select a single entity &gt; <strong className="text-highlight">GO</strong></p>
                      <div className="image-wrapper-flush">
                        <img src={leftClick} alt="Left click" className="software-screenshot screenshot-click--inline" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className={getStepClass('create-3')} onClick={() => toggleStep('create-3')} style={{ marginTop: '1.5rem' }}>
                  <div className="step-header">
                    <span className={`step-number ${completedSteps.has('create-3') ? 'completed' : ''}`}>
                      {completedSteps.has('create-3') ? <CheckCircle2 size={16} /> : '3'}
                    </span>
                    <span className="step-label">Part Information</span>
                  </div>
                  <div className="step-description">
                    <p className="p-flush">A window will appear showing the informations to fill-up.</p>
                  </div>
                  <div className="image-wrapper-flush">
                    <img src={modalInfo1} alt="Create 3D Part Window" className="software-screenshot screenshot-wide" />
                  </div>
                </div>

                <div className={getStepClass('create-4')} onClick={() => toggleStep('create-4')} style={{ marginTop: '1.5rem' }}>
                  <div className="step-header">
                    <span className={`step-number ${completedSteps.has('create-4') ? 'completed' : ''}`}>
                      {completedSteps.has('create-4') ? <CheckCircle2 size={16} /> : '4'}
                    </span>
                    <span className="step-label">Tree View</span>
                  </div>
                  <div className="step-description">
                    <p className="p-flush">All created 3D Part will appear on the tree view.</p>
                  </div>
                  <div className="image-wrapper-flush">
                    <img src={treeViewInfo1} alt="Tree View Status" className="software-screenshot screenshot-large" />
                  </div>
                </div>

                <div className="section-divider"></div>

                <div className={getStepClass('create-5')} onClick={() => toggleStep('create-5')}>
                  <div className="step-header">
                    <span className={`step-number ${completedSteps.has('create-5') ? 'completed' : ''}`}>
                      {completedSteps.has('create-5') ? <CheckCircle2 size={16} /> : <Info size={16} />}
                    </span>
                    <span className="step-label">Material Description</span>
                  </div>
                  <div className="image-wrapper-flush" style={{ marginTop: '1rem' }}>
                    <img src={materialDescriptionImg} alt="Material Description and Plate Thickness" className="software-screenshot screenshot-wide" />
                  </div>
                </div>

                <div style={{ marginTop: '2rem' }}>

                </div>
              </div>
            ) : (
              <div className="tab-pane fade-in">
                <div className={getStepClass('change-1')} onClick={() => toggleStep('change-1')}>
                  <div className="step-header">
                    <span className={`step-number ${completedSteps.has('change-1') ? 'completed' : ''}`}>
                      {completedSteps.has('change-1') ? <CheckCircle2 size={16} /> : '1'}
                    </span>
                    <span className="step-label">Select Tool</span>
                  </div>
                  <div className="step-description">
                    <p className="p-flush">Select <strong className="text-highlight">Change 3D Part Name</strong> from the icon menu.</p>
                  </div>
                  <div className="image-wrapper-flush">
                    <img src={changePartIcon} alt="Change 3D Part Name Icon" className="software-screenshot screenshot-small" />
                  </div>
                </div>

                <div className={getStepClass('change-2')} onClick={() => toggleStep('change-2')} style={{ marginTop: '1.5rem' }}>
                  <div className="step-header">
                    <span className={`step-number ${completedSteps.has('change-2') ? 'completed' : ''}`}>
                      {completedSteps.has('change-2') ? <CheckCircle2 size={16} /> : '2'}
                    </span>
                    <span className="step-label">Select Entity</span>
                  </div>
                  <div className="step-description">
                    <p className="p-flush">Select an entity or Right-click on the 3D Space.</p>
                  </div>
                </div>

                <div className={getStepClass('change-3')} onClick={() => toggleStep('change-3')} style={{ marginTop: '1.5rem' }}>
                  <div className="step-header">
                    <span className={`step-number ${completedSteps.has('change-3') ? 'completed' : ''}`}>
                      {completedSteps.has('change-3') ? <CheckCircle2 size={16} /> : '3'}
                    </span>
                    <span className="step-label">Update Information</span>
                  </div>
                  <div className="step-description">
                    <p className="p-flush">A window will appear showing the informations to fill-up.</p>
                  </div>
                  <div className="image-wrapper-flush">
                    <img src={modalInfo2} alt="Change Name Window" className="software-screenshot screenshot-wide" />
                  </div>
                </div>

                <div className={getStepClass('change-4')} onClick={() => toggleStep('change-4')} style={{ marginTop: '1.5rem' }}>
                  <div className="step-header">
                    <span className={`step-number ${completedSteps.has('change-4') ? 'completed' : ''}`}>
                      {completedSteps.has('change-4') ? <CheckCircle2 size={16} /> : '4'}
                    </span>
                    <span className="step-label">Sync with 2D</span>
                  </div>
                  <div className="step-description">
                    <p className="p-flush">A dialog box will appear asking whether to change the 2D Part Name together with the 3D Part Name &gt; Select <strong className="text-highlight">Yes</strong>.</p>
                  </div>
                  <div className="image-wrapper-flush" style={{ marginTop: '1rem' }}>
                    <img src={treeViewInfo2} alt="Dialog and Tree View Update" className="software-screenshot screenshot-wide" />
                  </div>
                </div>

                <div style={{ marginTop: '2rem' }}>

                </div>
              </div>
            )}
          </div>

          <div className="lesson-navigation">
            <button className="nav-button" disabled><ChevronLeft size={18} /> Previous</button>
            <button className="nav-button next" onClick={onNextLesson}>{isPart1 ? 'Next Lesson' : 'Finish'} <ChevronRight size={18} /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartLesson;
