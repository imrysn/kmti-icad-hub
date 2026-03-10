/**
 * 3D_Part.tsx — 3D Part management lessons
 */
import React from 'react';
import { ChevronLeft, ChevronRight, Box as BoxIcon, Info } from 'lucide-react';
import '../../styles/3D_Modeling/CourseLesson.css';
import '../../styles/3D_Modeling/3D_Part.css';

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

  return (
    <div className="course-lesson-container">
      <section className="lesson-intro">
        <h3><BoxIcon size={28} className="lesson-intro-icon" /> {isPart1 ? 'CREATING 3D PART' : 'CHANGE 3D PART NAME'}</h3>
        <p>
          {isPart1
            ? 'Tool use to name 3D parts and provide information. 3D part name must always be set since it is a vital part for the 2D Design.'
            : 'Tool use to Changes 3D part names, drawing names (of external 3D parts), and comments.'}
        </p>
        <div className="instruction-box">
          <div className="image-wrapper">
            <img src={isPart1 ? partMenu1 : partMenu2} alt="3D Part Menu" className="software-screenshot screenshot-small" />
          </div>
        </div>
      </section>

      <div className="lesson-grid single-card">
        <div className="lesson-card">
          {isPart1 ? (
            <div className="lesson-content fade-in">
              <h3 className="section-title">CREATE 3D PART</h3>

              <div className="instruction-step">
                <div className="step-header">
                  <span className="step-label">1</span>
                  <span className="step-label">Select <strong className="text-highlight">Create 3D Part</strong> from the icon menu.</span>
                </div>
                <div className="image-wrapper-flush">
                  <img src={createPartIcon} alt="Create 3D Part Icon" className="software-screenshot screenshot-small" />
                </div>
              </div>

              <div className="instruction-step">
                <div className="step-header">
                  <span className="step-number">2</span>
                  <span className="step-label">Select a single entity &gt; </span>
                  <img src={leftClick} alt="Left click" className="software-screenshot screenshot-click" />
                </div>
              </div>

              <div className="instruction-step">
                <div className="step-header">
                  <span className="step-number">3</span>
                  <span className="step-label">A window will appear showing the informations to fill-up.</span>
                </div>
                <div className="image-wrapper-flush">
                  <img src={modalInfo1} alt="Create 3D Part Window" className="software-screenshot" />
                </div>
              </div>

              <div className="instruction-step">
                <div className="step-header">
                  <span className="step-number">4</span>
                  <span className="step-label">All created 3D Part will appear on the tree view.</span>
                </div>
                <div className="image-wrapper-flush">
                  <img src={treeViewInfo1} alt="Tree View Status" className="software-screenshot screenshot-large" />
                </div>
              </div>

              <div className="material-details-section" style={{ marginTop: '3rem' }}>
                <h3 className="section-title">Material Description</h3>
                <p className="note-text">*Use BATSU = ×</p>
                <p className="note-text">*In cases of round-shaped materials, use FAI φ</p>

                <div className="material-grid" style={{ marginTop: '1.5rem' }}>
                  <img src={materialDescriptionImg} alt="Material Description and Plate Thickness" className="full-width-image" style={{ border: '1px solid #eee', borderRadius: '4px' }} />
                </div>
              </div>
            </div>
          ) : (
            <div className="lesson-content fade-in">
              <h3 className="section-title">CHANGE 3D PART NAME</h3>

              <div className="instruction-step">
                <div className="step-header">
                  <span className="step-number">1</span>
                  <span className="step-label">Select <strong className="text-highlight">Change 3D Part Name</strong> from the icon menu.</span>
                </div>
                <div className="image-wrapper-flush">
                  <img src={changePartIcon} alt="Change 3D Part Name Icon" className="software-screenshot screenshot-small" />
                </div>
              </div>

              <div className="instruction-step">
                <div className="step-header">
                  <span className="step-number">2</span>
                  <span className="step-label">Select an entity or Right-click on the 3D Space.</span>
                </div>
              </div>

              <div className="instruction-step">
                <div className="step-header">
                  <span className="step-number">3</span>
                  <span className="step-label">A window will appear showing the informations to fill-up.</span>
                </div>
                <div className="image-wrapper-flush">
                  <img src={modalInfo2} alt="Change Name Window" className="software-screenshot" />
                </div>
              </div>

              <div className="instruction-step">
                <div className="step-header">
                  <span className="step-number">4</span>
                  <span className="step-label">A dialog box will appear asking whether to change the 2D Part Name together with the 3D Part Name &gt; Select <strong className="text-highlight">Yes</strong>.</span>
                </div>
                <div className="image-wrapper-flush">
                  <img src={treeViewInfo2} alt="Dialog and Tree View Update" className="software-screenshot" />
                </div>
                <p className="note-text" style={{ marginTop: '1rem' }}>2D part name will be generated once orthographic projections were made on the 2D dimension. Every view creates 2D part names once the part is visible on that certain view.</p>
              </div>

              <div className="warning-box">
                <div className="flex items-center gap-2 mb-2">
                  <Info size={20} className="text-error" />
                  <strong className="text-danger">NOTE:</strong>
                </div>
                <p className="text-highlight">
                  ALL 3D PART NAMES AND 2D PART NAMES MUST ALWAYS MATCH EACH OTHER.
                  DIFFERENCES ON THE 3D AND 2D PART NAME WILL CUT THE LINK.
                </p>
              </div>
            </div>
          )}

          <div className="lesson-navigation">
            <button className="nav-button" disabled><ChevronLeft size={18} /> Previous</button>
            <button className="nav-button next" onClick={onNextLesson}>
              {isPart1 ? 'Next Lesson' : 'Finish'} <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartLesson;
