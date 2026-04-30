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
  const [activeTab, setActiveTab] = React.useState<'import' | 'edit'>(() => {
    return (localStorage.getItem('parasolid-tab') as any) || 'import';
  });

  const {
    scrollProgress,
    containerRef,
    speak,
    stop,
    isSpeaking,
    currentIndex
  } = useLessonCore(`${subLessonId}-${activeTab}`);

  React.useEffect(() => {
    localStorage.setItem('parasolid-tab', activeTab);
  }, [activeTab]);

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

  const handleNext = () => {
    if (activeTab === 'import') setActiveTab('edit');
    else if (onNextLesson) onNextLesson();
  };

  const handlePrev = () => {
    if (activeTab === 'edit') setActiveTab('import');
    else if (onPrevLesson) onPrevLesson();
  };

  const getStepClass = (stepId: string) => "instruction-step";

  const tabs = [
    { id: 'import', label: 'IMPORT' },
    { id: 'edit', label: 'Lighten B-Rep Solid' },
  ];

  return (
    <div className={`course-lesson-container ${isSpeaking ? 'is-reading' : ''}`} ref={containerRef}>
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>
      <div className="lesson-tabs">
        {tabs.map(tab => (
          <button 
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? "active" : ""}`} 
            onClick={() => setActiveTab(tab.id as any)} 
          >
            {tab.label}
          </button>
        ))}
      </div>

      <section className={`lesson-intro ${isSpeaking && currentIndex === -1 ? 'reading-active' : ''}`}>
        <h3 className="section-title">
          {activeTab === 'import' ? 'Loading of Parasolid Data' : 'Parasolid Export & Edit'}
          <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(activeTab === 'import' ? importSteps : editSteps)} onStop={stop} />
        </h3>
        <div>
          <p className="p-flush">Tools used to import and export parasolid data, and edit B-Rep solid. This tool is used for creating 3D Purchase Parts.</p>
          <div className="screenshot-wrapper mt-4">
            <img src={loadingParasolidImg} alt="Loading Parasolid" className="software-screenshot screenshot-small" style={{ width: "250px", marginTop: "1rem" }} />
          </div>
        </div>
      </section>

      <div className="lesson-grid single-card">
        <div className={`lesson-card tab-content fade-in ${isSpeaking ? 'reading-active' : ''}`}>
          {activeTab === 'import' ? (
            <div className="fade-in">
              <div className="card-header">
                <h4>IMPORT PROCEDURE</h4>
                <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(importSteps)} onStop={stop} />
              </div>

              <div className={`${getStepClass('p1-1')} ${currentIndex === 0 ? 'reading-active' : ''}`} data-reading-index="0">
                <div className="step-header">
                  <span className="step-number">1 </span>
                  <span className="step-label">Select <strong className="text-highlight">Import</strong> from the icon menu.</span>
                </div>
                <div className="step-description">
                  <div className="screenshot-wrapper">
                    <img src={importIcon} alt="Import Icon" className="software-screenshot screenshot-small" style={{ height: '150px' }} />
                  </div>
                </div>
              </div>



              <div className={`${getStepClass('p1-2')} ${currentIndex === 1 ? 'reading-active' : ''}`} data-reading-index="1">
                <div className="step-header">
                  <span className="step-number">2 </span>
                  <span className="step-label">The <strong className="text-highlight">Parasolid Link</strong> dialog box will appear.</span>
                </div>
                <div className="step-description">
                  <p className="p-flush">Browse for folders which contain parasolid files to be imported.</p>
                  <div className="screenshot-wrapper mt-4">
                    <img src={linkDialogImg} alt="Parasolid Link Dialog" className="software-screenshot" style={{width: "900px"}} />
                  </div>
                </div>
              </div>



              <div className={`${getStepClass('p1-3')} ${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
                <div className="step-header">
                  <span className="step-number">3 </span>
                  <span className="step-label" style={{marginTop: "-1.5rem"}}>
                    Select file &gt; OK &gt; <strong className="text-highlight">GO</strong>
                    <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '40px', margin: '0 8px' }} />
                  </span>
                </div>
                <div className="step-description">
                  <p className="p-flush" style={{marginBottom: "2rem"}}>When the Name Change dialog appears &gt; Click <strong className="text-highlight">Cancel</strong>.</p>
                  <div className="instruction-box mt-4" style={{marginBottom: "2rem"}}>
                    <p className="p-flush"><strong>TIP:</strong> Purchase part names must be released on the tree view.</p>
                  </div>
                  <div className="screenshot-wrapper mt-4">
                    <img src={nameChangeDialogImg} alt="Name Change Dialog" className="software-screenshot screenshot-wide" />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="fade-in">
              <div className="card-header">
                <h4>LIGHTEN B-REP SOLID</h4>
                <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(editSteps)} onStop={stop} />
              </div>
              <p className='p-flush' style={{ marginTop: "-2rem" }}>Optimize the B-Rep solid to reduce overall file size.</p>

              <div className={`${getStepClass('p2-1')} ${currentIndex === 0 ? 'reading-active' : ''}`} data-reading-index="0">
                <div className="step-header">
                  <span className="step-number">1 </span>
                  <span className="step-label">Select <strong className="text-highlight">Lighten B-rep Solid</strong> from the icon menu.</span>
                </div>
                <div className="step-description">
                  <div className="screenshot-wrapper">
                    <img src={lightenBrepIcon} alt="Lighten B-rep Solid Icon" className="software-screenshot" style={{ width: "250px", marginTop: "1rem"}}/>
                  </div>
                </div>
              </div>

              <div className="section-divider"></div>

              <div className={`${getStepClass('p2-2')} ${currentIndex === 1 ? 'reading-active' : ''}`} data-reading-index="1">
                <div className="step-header">
                  <span className="step-number">2 </span>
                  <span className="step-label">A dialog box will appear. Select <strong className="text-highlight">No form changes</strong> &gt; OK</span>
                </div>
                <div className="step-description">
                  <div className="screenshot-wrapper">
                    <img src={brepDialogImg} alt="Level Settings Dialog" className="software-screenshot" style={{width: "400px"}} />
                  </div>
                </div>
              </div>

              <div className="section-divider"></div>

              <div className={`${getStepClass('p2-3')} ${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
                <div className="step-header">
                  <span className="step-number">3 </span>
                  <span className="step-label" style={{marginTop: "-1.5rem"}}>
                    Select the purchase part &gt; <strong className="text-highlight">GO</strong>
                    <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '40px', margin: '0 8px' }} />
                  </span>
                </div>
                <div className="step-description">
                  <p className="p-flush" style={{marginLeft: "3rem", marginTop: "-1rem", marginBottom: "1rem"}}>Check the message pane to verify success.</p>
                  <div className="screenshot-wrapper mt-4">
                    <img src={messagePaneImg} alt="Message Pane Success" className="software-screenshot" style={{ width: "450px", marginBottom: "1rem"}} />
                  </div>
                </div>
              </div>

              <div className={`${getStepClass('p2-4')} ${currentIndex === 3 || currentIndex === 4 ? 'reading-active' : ''}`} data-reading-index="3">
                <div className="step-header">
                  <span className="step-number">4 </span>
                  <span className="step-label">Set Part Properties & Information</span>
                </div>
                <div className="step-description">
                  <p className="p-flush" style={{marginLeft: "3rem", marginTop: "-1rem", marginBottom: "1rem"}}>Right-click top part &gt; <strong className="text-highlight">Properties</strong> &gt; Enter comments.</p>
                  <div className="screenshot-wrapper mt-4">
                    <img src={parasolid43Img} alt="Material and Data Entry Info" className="software-screenshot screenshot-wide" />
                  </div>
                  <div className="screenshot-wrapper mt-8">
                    <img src={otherInfoImg} alt="Other Information Reference" className="software-screenshot screenshot-wide" />
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="lesson-navigation">
            <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button>
            <button className="nav-button next" onClick={handleNext}>{nextLabel || 'Next Lesson'} <ChevronRight size={18} /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParasolidLesson;
