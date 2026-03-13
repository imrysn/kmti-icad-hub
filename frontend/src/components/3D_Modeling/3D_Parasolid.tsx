/**
 * 3D_Parasolid.tsx — Loading Parasolid lessons
 */
import React from 'react';
import { ChevronLeft, ChevronRight, FileDown, Info } from 'lucide-react';
import '../../styles/3D_Modeling/CourseLesson.css';

// Assets
import importIcon from '../../assets/3D_Image_File/parasolid_import.jpg';
import linkDialogImg from '../../assets/3D_Image_File/parasolid_link_dialog.jpg';
import nameChangeDialogImg from '../../assets/3D_Image_File/name_change_dialog.jpg';
import savePartImg from '../../assets/3D_Image_File/save-the-part-parasolid.jpg';
import otherInfoImg from '../../assets/3D_Image_File/other-info-parasolid..jpg';
import lightenBrepIcon from '../../assets/3D_Image_File/lighten_brep_solid.jpg';
import brepDialogImg from '../../assets/3D_Image_File/dialog_box_brep.jpg';
import messagePaneImg from '../../assets/3D_Image_File/message_pane_brep.jpg';
import treeViewNameImg from '../../assets/3D_Image_File/3d_part_name.jpg';
import propertiesWindowImg from '../../assets/3D_Image_File/change_properties_window.jpg';
import materialSettingIcon from '../../assets/3D_Image_File/material_setting(1)_set_material.jpg';
import leftClick from '../../assets/3D_Image_File/left_click.jpg';

interface ParasolidLessonProps {
  subLessonId?: string;
  onNextLesson?: () => void;
}

const ParasolidLesson: React.FC<ParasolidLessonProps> = ({ subLessonId = 'parasolid-1', onNextLesson }) => {
  const isPart1 = subLessonId === 'parasolid-1';

  return (
    <div className="course-lesson-container">
      <section className="lesson-intro">
        <h3><FileDown size={28} className="lesson-intro-icon" /> {isPart1 ? 'LOADING OF PARASOLID' : 'PARASOLID EXPORT & EDIT'}</h3>
        <p>
          {isPart1
            ? 'Tools use to import and export parasolid data, and edit B-Rep solid. This tool is use for creating 3D Purchase Parts.'
            : 'Advanced options for exporting and editing B-Rep solids.'}
        </p>
      </section>

      <div className="lesson-grid single-card">
        <div className="lesson-card">
          {isPart1 ? (
            <div className="lesson-content fade-in">
              <h3 className="section-title">IMPORT</h3>

              <div className="instruction-step">
                <div className="step-header">
                  <span className="step-number">1</span>
                  <span className="step-label">Select <strong className="text-highlight">Import</strong> from the icon menu.</span>
                </div>
                <div className="image-wrapper-flush">
                  <img src={importIcon} alt="Import Icon" className="software-screenshot screenshot-small" />
                </div>
              </div>

              <div className="instruction-step" style={{ marginTop: '2rem' }}>
                <div className="step-header">
                  <span className="step-number">2</span>
                  <span className="step-label">The Parasolid Link dialog box will appear. User will be able to browse folders which contain parasolid files to be imported on ICAD.</span>
                </div>
                <div className="image-wrapper-flush">
                  <img src={linkDialogImg} alt="Parasolid Link Dialog" className="software-screenshot screenshot-wide" />
                </div>
                <div className="instruction-box info" style={{ marginTop: '1rem' }}>
                  <p><Info size={18} /> <strong>File Extensions:</strong> ICAD supports .xmt_txt, .xmt_bin, .x_t, and .x_b Parasolid files.</p>
                </div>
              </div>

              <div className="instruction-step" style={{ marginTop: '2.5rem' }}>
                <div className="step-header">
                  <span className="step-number">3</span>
                  <span className="step-label">Press OK after selecting the parasolid file. The Name Change dialog box will appear &gt; Pick <strong>Cancel</strong>.</span>
                </div>
                <div className="image-wrapper-flush">
                  <img src={nameChangeDialogImg} alt="Name Change Dialog" className="software-screenshot screenshot-small" />
                </div>
                <p className="p-flush" style={{ marginTop: '1rem' }}>All Part names of purchase parts must be release on the tree view.</p>
                <div className="image-wrapper-flush" style={{ marginTop: '1rem' }}>
                  <img src={otherInfoImg} alt="Tree View Release" className="software-screenshot screenshot-large" />
                </div>
                <div className="instruction-box warning" style={{ marginTop: '1rem' }}>
                  <p>Right-click on the 3D Part name on the tree view then pick <strong>Cancel</strong> to release.</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="lesson-content fade-in">
              <h3 className="section-title">4.) LIGHTEN B-REP SOLID</h3>
              <p className="p-flush">Use this tool to lighten up the file size.</p>

              <div className="instruction-step">
                <div className="step-header">
                  <span className="step-number">1</span>
                  <span className="step-label">Select <strong className="text-highlight">Lighten B-rep Solid</strong> from the icon menu.</span>
                </div>
                <div className="image-wrapper-flush">
                  <img src={lightenBrepIcon} alt="Lighten B-rep Solid Icon" className="software-screenshot screenshot-small" />
                </div>
              </div>

              <div className="instruction-step" style={{ marginTop: '1.5rem' }}>
                <div className="step-header">
                  <span className="step-number">2</span>
                  <span className="step-label">A dialog box will appear. Select <strong>No form changes</strong> &gt; OK.</span>
                </div>
                <div className="image-wrapper-flush">
                  <img src={brepDialogImg} alt="Level Settings Dialog" className="software-screenshot screenshot-small" />
                </div>
              </div>

              <div className="instruction-step" style={{ marginTop: '1.5rem' }}>
                <div className="step-header">
                  <span className="step-number">3</span>
                  <span className="step-label">Select the purchase part.</span>
                  <img src={leftClick} alt="Left click" className="software-screenshot screenshot-click" />
                </div>
                <p className="p-flush" style={{ marginTop: '1rem' }}>Check the message pane to see if the process is successful.</p>
                <div className="image-wrapper-flush" style={{ marginTop: '0.5rem' }}>
                  <img src={messagePaneImg} alt="Message Pane Success" className="software-screenshot screenshot-medium" />
                </div>
              </div>

              <div className="section-divider"></div>
              <h3 className="section-title" style={{ marginTop: '1.5rem' }}>5.) SAVE THE PART</h3>
              <p>Go to <strong>File &gt; Save As &gt; Use the Purchase part code as File name.</strong></p>

              <div className="section-divider"></div>
              <h3 className="section-title" style={{ marginTop: '1.5rem' }}>6.) SET ALL IMPORTANT INFORMATIONS OF THE PART</h3>
              <p className="p-flush">Other way to add comment to the Part:</p>

              <div className="instruction-step">
                <div className="step-header">
                  <span className="step-number">1</span>
                  <span className="step-label">Right-click the Top 3D Part on the tree view.</span>
                </div>
                <div className="image-wrapper-flush">
                  <img src={treeViewNameImg} alt="Tree View Selection" className="software-screenshot screenshot-small" />
                </div>
              </div>

              <div className="instruction-step" style={{ marginTop: '1.5rem' }}>
                <div className="step-header">
                  <span className="step-number">2</span>
                  <span className="step-label">Select <strong>Properties</strong>. The Property dialog box will appear.</span>
                </div>
              </div>

              <div className="instruction-step" style={{ marginTop: '1rem' }}>
                <div className="step-header">
                  <span className="step-number">3</span>
                  <span className="step-label">Enter the comment for the specific part &gt; Press OK.</span>
                </div>
                <div className="image-wrapper-flush">
                  <img src={propertiesWindowImg} alt="Property Dialog Box" className="software-screenshot screenshot-medium" />
                </div>
              </div>

              <div className="instruction-box info" style={{ marginTop: '2rem' }}>
                <p><Info size={18} /> <strong>Note:</strong> Purchase parts color depends on its color on actual. Threaded portions must be color green.</p>
                <div className="image-wrapper-flush" style={{ marginTop: '1rem', textAlign: 'center' }}>
                  <img src={materialSettingIcon} alt="Material Setting Icons" className="software-screenshot screenshot-medium" />
                </div>
              </div>
            </div>
          )}

          <div className="lesson-navigation">
            <button className="nav-button" disabled={isPart1} onClick={() => { }}>
              <ChevronLeft size={18} /> Previous
            </button>
            <button className="nav-button next" onClick={onNextLesson}>
              {isPart1 ? 'Next Lesson' : 'Finish'} <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParasolidLesson;
