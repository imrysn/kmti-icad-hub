/**
 * 3D_Parasolid.tsx — Loading Parasolid lessons
 */
import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, FileDown, Info, CheckCircle2 } from 'lucide-react';
import '../../styles/3D_Modeling/CourseLesson.css';

// Assets
import importIcon from '../../assets/3D_Image_File/parasolid_import.png';
import linkDialogImg from '../../assets/3D_Image_File/parasolid_link_dialog.png';
import nameChangeDialogImg from '../../assets/3D_Image_File/name_change_dialog.png';
import savePartImg from '../../assets/3D_Image_File/save-the-part-parasolid.png';
import otherInfoImg from '../../assets/3D_Image_File/other_info_parasolid.png';
import loadingParasolidImg from '../../assets/3D_Image_File/loading_parasolid.png';
import parasolid43Img from '../../assets/3D_Image_File/parasolid4.3.png';
import lightenBrepIcon from '../../assets/3D_Image_File/lighten_brep_solid.png';
import brepDialogImg from '../../assets/3D_Image_File/dialog_box_brep.png';
import messagePaneImg from '../../assets/3D_Image_File/message_pane_brep.png';
import treeViewNameImg from '../../assets/3D_Image_File/3d_part_name.png';
import propertiesWindowImg from '../../assets/3D_Image_File/change_properties_window.png';
import materialSettingIcon from '../../assets/3D_Image_File/material_setting(1)_set_material.png';
import leftClick from '../../assets/3D_Image_File/left_click.png';

interface ParasolidLessonProps {
  subLessonId?: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const ParasolidLesson: React.FC<ParasolidLessonProps> = ({ subLessonId = 'parasolid-1', onNextLesson, onPrevLesson }) => {
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

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

  const isPart1 = subLessonId === 'parasolid-1';

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
          <FileDown size={28} className="lesson-intro-icon" />
          {isPart1 ? 'LOADING OF PARASOLID' : 'PARASOLID EXPORT & EDIT'}
        </h3>
        <p className="p-flush">
          {isPart1
            ? 'Tools use to import and export parasolid data, and edit B-Rep solid. This tool is use for creating 3D Purchase Parts.'
            : ''}

        </p>
        {isPart1 && (
          <div className="instruction-box">
            <div className="image-wrapper">
              <img src={loadingParasolidImg} alt="Loading Parasolid" className="software-screenshot screenshot-small" />
            </div>
          </div>
        )}
      </section>

      <div className="lesson-grid single-card">
        <div className="lesson-card">
          {isPart1 ? (
            <div className="lesson-content fade-in">
              <h3 className="section-title">IMPORT</h3>

              <div className={getStepClass('p1-1')} onClick={() => toggleStep('p1-1')}>
                <div className="step-header">
                  <span className={`step-number ${completedSteps.has('p1-1') ? 'completed' : ''}`}>
                    {completedSteps.has('p1-1') ? <CheckCircle2 size={16} /> : '1'}
                  </span>
                  <span className="step-label">Select <strong className="text-highlight">Import</strong> from the icon menu.</span>
                </div>
                <div style={{ paddingLeft: '2.5rem' }}>
                  <div className="image-wrapper-flush" style={{ marginTop: '1rem' }}>
                    <img src={importIcon} alt="Import Icon" className="software-screenshot screenshot-small" />
                  </div>
                </div>
              </div>

              <div className={getStepClass('p1-2')} onClick={() => toggleStep('p1-2')}>
                <div className="step-header">
                  <span className={`step-number ${completedSteps.has('p1-2') ? 'completed' : ''}`}>
                    {completedSteps.has('p1-2') ? <CheckCircle2 size={16} /> : '2'}
                  </span>
                  <span className="step-label">The Parasolid Link dialog box will appear. User will be able to browse folders which contain parasolid files to be imported on ICAD.</span>
                </div>
                <div style={{ paddingLeft: '2.5rem' }}>
                  <div className="image-wrapper-flush" style={{ marginTop: '1rem' }}>
                    <img src={linkDialogImg} alt="Parasolid Link Dialog" className="software-screenshot screenshot-wide" />
                  </div>
                </div>
              </div>

              <div className={getStepClass('p1-3')} onClick={() => toggleStep('p1-3')}>
                <div className="step-header">
                  <span className={`step-number ${completedSteps.has('p1-3') ? 'completed' : ''}`}>
                    {completedSteps.has('p1-3') ? <CheckCircle2 size={16} /> : '3'}
                  </span>
                  <span className="step-label">Press OK after selecting the parasolid file &gt; GO <img src={leftClick} alt="Left click" className="software-screenshot screenshot-click--inline" style={{ verticalAlign: 'middle', marginLeft: '0.25rem' }} /> </span>

                </div>
                <p className="p-flush" style={{ marginLeft: '2.5rem' }}>The Name change dialog box will appear &gt; Pick Cancel</p>
                <p className="p-flush" style={{ marginLeft: '2.5rem' }}>All Part names of purchase parts must be release on the tree view.</p>
                <div style={{ paddingLeft: '2.5rem' }}>

                  <div className="image-wrapper-flush" style={{ marginTop: '1rem' }}>
                    <img src={nameChangeDialogImg} alt="Name Change Dialog" className="software-screenshot screenshot-wide" />
                  </div>
                </div>
              </div>

            </div>
          ) : (
            <div className="lesson-content fade-in">
              <h3 className="section-title">4.) LIGHTEN B-REP SOLID</h3>
              <p className="p-flush" style={{ marginBottom: '1rem' }}>Use this tool to lighten up the file size.</p>

              <div className={getStepClass('p2-1')} onClick={() => toggleStep('p2-1')}>
                <div className="step-header">
                  <span className={`step-number ${completedSteps.has('p2-1') ? 'completed' : ''}`}>
                    {completedSteps.has('p2-1') ? <CheckCircle2 size={16} /> : '1'}
                  </span>
                  <span className="step-label">Select <strong className="text-highlight">Lighten B-rep Solid</strong> from the icon menu.</span>
                </div>
                <div style={{ paddingLeft: '2.5rem' }}>
                  <div className="image-wrapper-flush" style={{ marginBottom: '1rem' }}>
                    <img src={lightenBrepIcon} alt="Lighten B-rep Solid Icon" className="software-screenshot screenshot-small" />
                  </div>
                </div>
              </div>

              <div className={getStepClass('p2-2')} onClick={() => toggleStep('p2-2')}>
                <div className="step-header">
                  <span className={`step-number ${completedSteps.has('p2-2') ? 'completed' : ''}`}>
                    {completedSteps.has('p2-2') ? <CheckCircle2 size={16} /> : '2'}
                  </span>
                  <span className="step-label">A dialog box will appear. Select No form changes &gt; <strong className="text-highlight">OK</strong></span>
                </div>
                <div style={{ paddingLeft: '2.5rem' }}>
                  <div className="image-wrapper-flush" style={{ marginTop: '1rem' }}>
                    <img src={brepDialogImg} alt="Level Settings Dialog" className="software-screenshot screenshot-medium" />
                  </div>
                </div>
              </div>

              <div className={getStepClass('p2-3')} onClick={() => toggleStep('p2-3')}>
                <div className="step-header">
                  <span className={`step-number ${completedSteps.has('p2-3') ? 'completed' : ''}`}>
                    {completedSteps.has('p2-3') ? <CheckCircle2 size={16} /> : '3'}
                  </span>
                  <span className="step-label">Select the purchase part &gt; <strong className="text-highlight">GO</strong> <img src={leftClick} alt="Left click" className="software-screenshot screenshot-click--inline" style={{ verticalAlign: 'middle', marginLeft: '0.25rem' }} /></span>
                </div>
                <div style={{ paddingLeft: '2.5rem' }}>
                  <p className="p-flush" style={{ marginTop: '0.5rem' }}>Check the message pane to see if the process is successful</p>
                  <div className="image-wrapper-flush" style={{ marginTop: '0.5rem' }}>
                    <img src={messagePaneImg} alt="Message Pane Success" className="software-screenshot screenshot-medium" />
                  </div>
                </div>
              </div>

              <div className="section-divider"></div>
              <div className={getStepClass('p2-4')} onClick={() => toggleStep('p2-4')} style={{ marginBottom: '2.5rem' }}>
                <div className="step-header">
                  <span className={`step-number ${completedSteps.has('p2-4') ? 'completed' : ''}`}>
                    {completedSteps.has('p2-4') ? <CheckCircle2 size={16} /> : '5'}
                  </span>
                  <span className="step-label">Save the part</span>
                </div>
                <div className="step-description" style={{ paddingLeft: '2.5rem' }}>
                  <p className="p-flush">Go to <strong>File &gt; Save As &gt; Use the Purchase part code as File name.</strong></p>
                </div>
              </div>

              <div className="section-divider"></div>

              <div className={getStepClass('p2-5')} onClick={() => toggleStep('p2-5')}>
                <div className="step-header">
                  <span className={`step-number ${completedSteps.has('p2-5') ? 'completed' : ''}`}>
                    {completedSteps.has('p2-5') ? <CheckCircle2 size={16} /> : '6'}
                  </span>
                  <span className="step-label">Set all important information of the part</span>
                </div>
                <div className="step-description" style={{ paddingLeft: '2.5rem' }}>
                  <p className="p-flush">Other way to add comment to the Part</p>
                  <div className="interaction-list--plain" style={{ marginTop: '1rem' }}>
                    <p className="p-flush"><strong>1.)</strong> Right-click the Top 3D Part on the tree view</p>
                    <p className="p-flush"><strong>2.)</strong> Select Properties. The Property dialog box will appear.</p>
                    <p className="p-flush"><strong>3.)</strong> Enter the comment for the specific part &gt; Press OK</p>
                  </div>
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
              Next Lesson <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParasolidLesson;
