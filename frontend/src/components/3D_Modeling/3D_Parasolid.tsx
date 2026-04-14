/** * 3D_Parasolid.tsx – Loading Parasolid lessons */

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLessonCore } from "../../hooks/useLessonCore";
import { ReadAloudButton } from "../ReadAloudButton";
import '../../styles/3D_Modeling/CourseLesson.css';

/* Assets */
import importIcon from '../../assets/3D_Image_File/parasolid_import.png';
import linkDialogImg from '../../assets/3D_Image_File/parasolid_link_dialog.png';
import nameChangeDialogImg from '../../assets/3D_Image_File/name_change_dialog.png';
import otherInfoImg from '../../assets/3D_Image_File/other_info_parasolid.png';
import loadingParasolidImg from '../../assets/3D_Image_File/loading_parasolid.png';
import parasolid43Img from '../../assets/3D_Image_File/parasolid4.3.png';
import lightenBrepIcon from '../../assets/3D_Image_File/lighten_brep_solid.png';
import brepDialogImg from '../../assets/3D_Image_File/dialog_box_brep.png';
import messagePaneImg from '../../assets/3D_Image_File/message_pane_brep.png';
import leftClick from '../../assets/3D_Image_File/left_click.png';

interface ParasolidLessonProps {
  nextLabel?: string;
  subLessonId?: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const ParasolidLesson: React.FC<ParasolidLessonProps> = ({ subLessonId = 'parasolid-1', onNextLesson, onPrevLesson, nextLabel }) => {
  const {
    scrollProgress,
    containerRef,
    speak,
    stop,
    isSpeaking,
    currentIndex
  } = useLessonCore(subLessonId);

  const importSteps = [
    "Step 1: Select Import from the icon menu.",
    "Step 2: The Parasolid Link dialog will appear. Browse to the folders containing your parasolid files.",
    "Step 3: After selecting your file, click OK then GO. When the Name Change dialog appears, click Cancel to release part names on the tree view."
  ];

  const editSteps = [
    "Step 4: Select Lighten B-rep Solid from the menu to reduce file size.",
    "Step 5: In the dialog box, select No form changes and click OK.",
    "Step 6: Select the purchase part and click GO. Check the message pane to verify if the process was successful.",
    "Step 7: Save the part by going to File, Save As, and using the purchase part code as the filename.",
    "Step 8: Set important part info by right-clicking the top 3D part on the tree view, selecting Properties, and entering your comments."
  ];

  const getStepClass = (stepId: string) => "instruction-step";
  const isPart1 = subLessonId === 'parasolid-1';

  return (
    <div className="course-lesson-container" ref={containerRef}>
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      <section className="lesson-intro">
        <h3 className="section-title">
          {isPart1 ? 'LOADING OF PARASOLID' : 'PARASOLID EXPORT & EDIT'}
          <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(isPart1 ? importSteps : editSteps)} onStop={stop} />
        </h3>
        {isPart1 && (
          <>
            <p className="p-flush">Tools use to import and export parasolid data, and edit B-Rep solid. This tool is use for creating 3D Purchase Parts.</p>
            <div className="instruction-box">
              <div className="image-wrapper">
                <img src={loadingParasolidImg} alt="Loading Parasolid" className="software-screenshot screenshot-small" />
              </div>
            </div>
          </>
        )}
      </section>

      <div className="lesson-grid single-card">
        <div className="lesson-card">
          {isPart1 ? (
            <div className="fade-in">
              <h3>IMPORT</h3>
              <div className={`${getStepClass('p1-1')} ${currentIndex === 0 ? 'reading-active' : ''}`}>
                <div className="step-header">
                  <span className="step-number">1</span>
                  <span className="step-label">Select <strong className="text-highlight">Import</strong> from the icon menu.</span>
                </div>
                <div className="image-wrapper-flush">
                  <img src={importIcon} alt="Import Icon" className="software-screenshot screenshot-small" />
                </div>
              </div>

              <div className={`${getStepClass('p1-2')} ${currentIndex === 1 ? 'reading-active' : ''}`}>
                <div className="step-header">
                  <span className="step-number">2</span>
                  <span className="step-label">The Parasolid Link dialog box will appear. User will be able to browse folders which contain parasolid files to be imported on ICAD.</span>
                </div>
                <div className="image-wrapper-flush">
                  <img src={linkDialogImg} alt="Parasolid Link Dialog" className="software-screenshot screenshot-wide" />
                </div>
              </div>

              <div className={`${getStepClass('p1-3')} ${currentIndex === 2 ? 'reading-active' : ''}`}>
                <div className="step-header">
                  <span className="step-number">3</span>
                  <span className="step-label">
                    Press OK after selecting the parasolid file &gt; <strong className="text-highlight">GO</strong>
                    <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '40px', verticalAlign: 'middle', margin: '0 4px' }} />
                  </span>
                </div>
                <p className="p-flush">The Name change dialog box will appear &gt; Pick Cancel</p>
                <p className="p-flush">All Part names of purchase parts must be release on the tree view.</p>
                <div className="image-wrapper-flush">
                  <img src={nameChangeDialogImg} alt="Name Change Dialog" className="software-screenshot screenshot-wide" />
                </div>
              </div>
            </div>
          ) : (
            <div className="fade-in">
              <h3>4.) LIGHTEN B-REP SOLID</h3>
              <p className="p-flush">Use this tool to lighten up the file size.</p>

              <div className={`${getStepClass('p2-1')} ${currentIndex === 0 ? 'reading-active' : ''}`}>
                <div className="step-header">
                  <span className="step-number">1</span>
                  <span className="step-label">Select <strong className="text-highlight">Lighten B-rep Solid</strong> from the icon menu.</span>
                </div>
                <div className="image-wrapper-flush">
                  <img src={lightenBrepIcon} alt="Lighten B-rep Solid Icon" className="software-screenshot screenshot-small" />
                </div>
              </div>

              <div className={`${getStepClass('p2-2')} ${currentIndex === 1 ? 'reading-active' : ''}`}>
                <div className="step-header">
                  <span className="step-number">2</span>
                  <span className="step-label">A dialog box will appear. Select No form changes &gt; <strong className="text-highlight">OK</strong></span>
                </div>
                <div className="image-wrapper-flush">
                  <img src={brepDialogImg} alt="Level Settings Dialog" className="software-screenshot screenshot-medium" />
                </div>
              </div>

              <div className={`${getStepClass('p2-3')} ${currentIndex === 2 ? 'reading-active' : ''}`}>
                <div className="step-header">
                  <span className="step-number">3</span>
                  <span className="step-label">
                    Select the purchase part &gt; <strong className="text-highlight">GO</strong>
                    <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '40px', verticalAlign: 'middle', margin: '0 4px' }} />
                  </span>
                </div>
                <p className="p-flush">Check the message pane to see if the process is successful</p>
                <div className="image-wrapper-flush">
                  <img src={messagePaneImg} alt="Message Pane Success" className="software-screenshot screenshot-medium" />
                </div>
              </div>

              <div className="section-divider" />

              <div className={`${getStepClass('p2-4')} ${currentIndex === 3 ? 'reading-active' : ''}`}>
                <div className="step-header">
                  <span className="step-number">5</span>
                  <span className="step-label">Save the part</span>
                </div>
                <p className="p-flush">Go to <strong>File &gt; Save As &gt; Use the Purchase part code as File name.</strong></p>
              </div>

              <div className="section-divider" />

              <div className={`${getStepClass('p2-5')} ${currentIndex === 4 ? 'reading-active' : ''}`}>
                <div className="step-header">
                  <span className="step-number">6</span>
                  <span className="step-label">Set all important information of the part</span>
                </div>
                <div className="step-description">
                  <p className="p-flush">Other way to add comment to the Part</p>
                  <ul className="interaction-list--plain">
                    <li><strong>1.)</strong> Right-click the Top 3D Part on the tree view</li>
                    <li><strong>2.)</strong> Select Properties. The Property dialog box will appear.</li>
                    <li><strong>3.)</strong> Enter the comment for the specific part &gt; Press OK</li>
                  </ul>
                  <div className="image-wrapper-flush" style={{ marginTop: '1.5rem' }}>
                    <img src={parasolid43Img} alt="Material and Data Entry Info" className="software-screenshot screenshot-wide" />
                  </div>
                  <div className="image-wrapper-flush" style={{ marginTop: '1.5rem' }}>
                    <img src={otherInfoImg} alt="Other Information Reference" className="software-screenshot screenshot-wide" />
                  </div>
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

export default ParasolidLesson;
