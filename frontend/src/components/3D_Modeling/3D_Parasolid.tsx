import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLessonCore } from "../../hooks/useLessonCore";
import { useTTSAutoplay } from "../../hooks/useTTSAutoplay";
import { ReadAloudButton } from "../ReadAloudButton";
import { KaraokeLessonText } from "../KaraokeLessonText";
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
  const [activeTab, setActiveTab] = useState<'import' | 'edit'>(() => {
    return (localStorage.getItem('parasolid-tab') as any) || 'import';
  });

  const {
    scrollProgress,
    containerRef,
    speak,
    stop,
    isSpeaking,
    currentIndex,
    currentCharIndex,
    registerText
  } = useLessonCore(subLessonId);

  useEffect(() => {
    localStorage.setItem('parasolid-tab', activeTab);
  }, [activeTab]);

  const importSteps = [
    "IMPORT",
    "Step 1: Select Import from the icon menu.",
    "Step 2: The Parasolid Link dialog box will appear. User will be able to browse folders which contain parasolid files to be imported on ICAD.",
    "Step 3: Press OK after selecting the parasolid file then GO",
    "The Name Change dialog box will appear then Pick Cancel",
    "All Part names of purchase parts must be release on the tree view.",
    "Step 4: Save the part",
    "Go to File then  Save As then Use the Purchase part code as File name.",
    "Step 5: Set all important informations of the part:",
    "Other way to add comment to the Part.",
    "1.) Right-click the Top 3D Part on the tree view",
    "2.) Select Properties. The Property dialog box will appear.",
    "3.) Enter the comment for the specific part then Press OK"
  ];

  const editSteps = [
    "LIGHTEN B-REP SOLID",
    "Step 1: Select Lighten B-rep Solid from the icon menu.",
    "Step 2: A dialog box will appear. Select No form changes then OK",
    "Step 3: Select the purchase part then GO",
    "Check the message pane to see if the process is successful.",
    "Step 4: Save the part",
    "Go to File then Save As then Use the Purchase part code as File name.",
    "Step 5: Set all important informations of the part:",
    "Other way to add comment to the Part.",
    "1.) Right-click the Top 3D Part on the tree view",
    "2.) Select Properties. The Property dialog box will appear.",
    "3.) Enter the comment for the specific part then Press OK"
  ];

  const handleNext = (isAuto = false) => {
    stop();
    if (!isAuto) {
      sessionStorage.setItem('tts-autoplay-active', 'false');
    }
    if (activeTab === 'import') setActiveTab('edit');
    else if (onNextLesson) onNextLesson();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrev = (isAuto = false) => {
    stop();
    if (!isAuto) {
      sessionStorage.setItem('tts-autoplay-active', 'false');
    }
    if (activeTab === 'edit') setActiveTab('import');
    else if (onPrevLesson) onPrevLesson();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getStepClass = (stepId: string) => "instruction-step";

  const tabs = [
    { id: 'import', label: 'IMPORT' },
    { id: 'edit', label: 'Lighten B-Rep Solid' },
  ];

  const introTitle = activeTab === 'import' ? 'Loading of Parasolid' : 'Loading of Parasolid';
  const introSubtitle = "Tools used to import and export parasolid data, and edit B-Rep solid for 3D Purchase Parts. This tool is use for creating 3D Purchase Parts.";

  const commonIntroSteps = [
    introTitle,
    introSubtitle
  ];

  const importStepsTTS = [...commonIntroSteps, ...importSteps];
  const editStepsTTS = [...commonIntroSteps, ...editSteps];

  useEffect(() => {
    const steps = activeTab === 'import' ? importStepsTTS : editStepsTTS;
    const startIdx = activeTab === 'import' ? 0 : 2;
    registerText(steps, startIdx);
  }, [activeTab, registerText]);

  const currentTabSteps = activeTab === 'import' ? importStepsTTS : editStepsTTS;
  const startIdx2 = activeTab === 'import' ? 0 : 2;
  const tabsList = [{ id: 'import' }, { id: 'edit' }];

  useTTSAutoplay(
    isSpeaking,
    currentIndex,
    activeTab,
    currentTabSteps.length,
    tabsList,
    handleNext,
    speak,
    currentTabSteps,
    startIdx2
  );

  return (
    <div className={`course-lesson-container`} ref={containerRef}>
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>
      <div className="lesson-tabs">
        {tabs.map(tab => (
          <button 
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? "active" : ""}`} 
            onClick={() => { stop(); sessionStorage.setItem('tts-autoplay-active', 'false'); setActiveTab(tab.id as any); }} 
          >
            {tab.label}
          </button>
        ))}
      </div>

      <section className="lesson-intro">
        <h3 className={`section-title ${currentIndex === 0 ? "reading-active" : ""}`} data-reading-index="0">
          <KaraokeLessonText
            as="span"
            text={introTitle}
            isActive={isSpeaking && currentIndex === 0}
            currentCharIndex={currentCharIndex}
          />
        </h3>
        <KaraokeLessonText
          className={`lesson-subtitle ${currentIndex === 1 ? "reading-active" : ""}`}
          data-reading-index="1"
          text={introSubtitle}
          isActive={isSpeaking && currentIndex === 1}
          currentCharIndex={currentCharIndex}
        />
        <img src={loadingParasolidImg} alt="Loading Parasolid" className="software-screenshot screenshot-small mt-4" style={{ width: "250px", marginTop: "1rem" }} />
      </section>

      <div className="lesson-grid single-card">
        <div className="lesson-card tab-content fade-in">
          {activeTab === 'import' ? (
            <div className="fade-in">
              <div className={`card-header ${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
                <h4 style={{marginBottom: "2rem"}}>IMPORT</h4>
              </div>

              <div className={`${getStepClass('p1-1')} ${currentIndex === 3 ? 'reading-active' : ''}`} data-reading-index="3">
                <div className="step-header">
                  <span className="step-number">1 </span>
                  <KaraokeLessonText
                    as="span"
                    className="step-label"
                    text="Select Import from the icon menu."
                    isActive={isSpeaking && currentIndex === 3}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
                <div className="step-description">
                    <img src={importIcon} alt="Import Parasolid Tool" className="software-screenshot mt-4" style={{ height: 'auto', width: '200px', marginBottom: "-2rem"}} />
                </div>
              </div>

              <div className={`${getStepClass('p1-2')} ${currentIndex === 4 ? 'reading-active' : ''}`} data-reading-index="4">
                <div className="step-header">
                  <span className="step-number">2 </span>
                  <KaraokeLessonText
                    as="span"
                    className="step-label"
                    style={{marginTop: "2rem"}}
                    text={`The Parasolid Link dialog box will appear.
                     <br /> User will be able to browse folders which contain parasolid files to be imported on ICAD.`}

                    isActive={isSpeaking && currentIndex === 4}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
                <div className="step-description">
                    <img src={linkDialogImg} alt="Parasolid Link Dialog" className="software-screenshot mt-4" style={{width: "900px"}} />
                </div>
              </div>
              <div className={`${getStepClass('p1-3')} ${currentIndex === 5 ? 'reading-active' : ''}`} data-reading-index="5">
                <div className="step-header">
                  <span className="step-number">3 </span>
                  <div className="step-label" style={{marginTop: "-1.5rem"}}>
                  <KaraokeLessonText
                    as="span"
                    text="Press OK after selecting the parasolid file > GO"
                    isActive={isSpeaking && currentIndex === 5}
                    currentCharIndex={currentCharIndex}
                  />
                  <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '40px', margin: '0 8px' }} />
                </div>  
                </div>
                 <div className={`step-label ${currentIndex === 6 ? 'reading-active' : ''}`} data-reading-index="6" style={{ marginTop: "-1rem", marginLeft: "3rem" }}>
                  <KaraokeLessonText
                    as="span"
                    text="The Name Change dialog box will appear > Pick Cancel"
                    isActive={isSpeaking && currentIndex === 6}
                    currentCharIndex={currentCharIndex}
                  />
                  </div>
                  <div className={`step-label ${currentIndex === 7 ? 'reading-active' : ''}`} data-reading-index="7" style={{ marginTop: "-1rem", marginLeft: "3rem" }}>
                  <KaraokeLessonText
                    as="span"
                    text="All Part names of purchase parts must be release on the tree view."
                    isActive={isSpeaking && currentIndex === 7}
                    currentCharIndex={currentCharIndex}
                  />
                  </div>
                <div className="step-description">
                    <img src={nameChangeDialogImg} alt="Name Change Dialog" className="software-screenshot screenshot-wide mt-4" />
                </div>
              </div>
              
              <div className={`${getStepClass('p2-4')} ${currentIndex === 8 ? 'reading-active' : ''}`} data-reading-index="8">
                <div className="step-header">
                  <span className="step-number">4 </span>
                  <KaraokeLessonText
                    as="span"
                    className="step-label"
                    text="Save the part"
                    isActive={isSpeaking && currentIndex === 8}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
                <div className={`step-label ${currentIndex === 9 ? 'reading-active' : ''}`} data-reading-index="9" style={{ marginTop: "-1rem", marginLeft: "3rem" }}>
                  <KaraokeLessonText
                    as="span"
                    text="Go to File > Save As > Use the Purchase part code as File name."
                    isActive={isSpeaking && currentIndex === 9}
                    currentCharIndex={currentCharIndex}
                  />
                  </div>
              </div>

              <div className={`${getStepClass('p2-5')} ${currentIndex === 10 ? 'reading-active' : ''}`} data-reading-index="10" style={{ marginTop: "-2rem" }}>
                <div className="step-header">
                  <span className="step-number">5 </span>
                  <KaraokeLessonText
                    as="span"
                    className="step-label"
                    text="Set all important informations of the part:"
                    isActive={isSpeaking && currentIndex === 10}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
                 <div className={`step-label ${currentIndex === 11 ? 'reading-active' : ''}`} data-reading-index="11" style={{ marginTop: "-1rem", marginLeft: "3rem" }}>
                  <KaraokeLessonText
                    as="span"
                    text="Other way to add comment to the Part."
                    isActive={isSpeaking && currentIndex === 11}
                    currentCharIndex={currentCharIndex}
                  />
                  </div>
                  <div className={`step-label ${currentIndex === 12 ? 'reading-active' : ''}`} data-reading-index="12" style={{ marginTop: "-1rem", marginLeft: "4rem" }}>
                  <KaraokeLessonText
                    as="p"
                    text="1.) Right-click the Top 3D Part on the tree view"
                    isActive={isSpeaking && currentIndex === 12}
                    currentCharIndex={currentCharIndex}
                  />
                  </div>
                   <div className={`step-label ${currentIndex === 13 ? 'reading-active' : ''}`} data-reading-index="13" style={{ marginTop: "-1rem", marginLeft: "4rem" }}>
                  <KaraokeLessonText
                    as="p"
                    text="2.) Select Properties. The Property dialog box will appear."
                    isActive={isSpeaking && currentIndex === 13}
                    currentCharIndex={currentCharIndex}
                  />
                  </div>
                  <div className={`step-label ${currentIndex === 14 ? 'reading-active' : ''}`} data-reading-index="14" style={{ marginTop: "-1rem", marginLeft: "4rem" }}>
                  <KaraokeLessonText
                    as="p"
                    text="3.) Enter the comment for the specific part > Press OK"
                    isActive={isSpeaking && currentIndex === 14}
                    currentCharIndex={currentCharIndex}
                  />
                  </div>

                  <div className="step-description">
                  <img src={parasolid43Img} alt="Material and Data Entry Info" className="software-screenshot mt-4" style={{marginBottom: "1rem", width: "900px"}} />

                  <img src={otherInfoImg} alt="Other Information Reference" className="software-screenshot mt-8" />

                </div>
                </div>
            </div>
          ) : (
            <div className="fade-in">
              <div className={`card-header ${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
                <h4>LIGHTEN B-REP SOLID</h4>
              </div>
              <p className='p-flush' style={{marginBottom: "2rem"}}>Use this tool to lighten up the file size</p>

              <div className={`${getStepClass('p2-1')} ${currentIndex === 3 ? 'reading-active' : ''}`} data-reading-index="3">
                <div className="step-header">
                  <span className="step-number">1 </span>
                  <KaraokeLessonText
                    as="span"
                    className="step-label"
                    text="Select Lighten B-rep Solid from the icon menu."
                    isActive={isSpeaking && currentIndex === 3}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
                <div className="step-description">
                    <img src={lightenBrepIcon} alt="Lighten B-rep Tool" className="software-screenshot mt-4" style={{ height: 'auto', width: '200px' }} />
                </div>
              </div>


              <div className={`${getStepClass('p2-2')} ${currentIndex === 4 ? 'reading-active' : ''}`} data-reading-index="4" >
                <div className="step-header" style={{ marginTop: "-2rem" }}>
                  <span className="step-number">2 </span>
                  <KaraokeLessonText
                    as="span"
                    className="step-label"
                    text="A dialog box will appear. Select No form changes > OK"
                    isActive={isSpeaking && currentIndex === 4}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
                <div className="step-description">
                    <img src={brepDialogImg} alt="Level Settings Dialog" className="software-screenshot mt-4" style={{width: "400px"}} />
                </div>
              </div>


              <div className={`${getStepClass('p2-3')} ${currentIndex === 5 ? 'reading-active' : ''}`} data-reading-index="5">
                <div className="step-header" style={{ marginTop: "-2rem" }}>
                  <span className="step-number">3 </span>
                  <KaraokeLessonText
                    as="span"
                    className="step-label"
                    text="Select the purchase part > GO"
                    isActive={isSpeaking && currentIndex === 5}
                    currentCharIndex={currentCharIndex}
                  />
                   <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '40px', margin: '0 8px' }} />
                </div>
                <div className={`step-label ${currentIndex === 6 ? 'reading-active' : ''}`} data-reading-index="6" style={{ marginTop: "-1rem", marginLeft: "3rem" }}>
                  <KaraokeLessonText
                    as="span"
                    text="Check the message pane to see if the process is successful."
                    isActive={isSpeaking && currentIndex === 6}
                    currentCharIndex={currentCharIndex}
                  />
                  </div>
                <div className="step-description">
                    <img src={messagePaneImg} alt="Message Pane Success" className="software-screenshot mt-4" style={{ width: "450px", marginBottom: "1rem"}} />
                </div>
              </div>
                
              <div className={`${getStepClass('p2-4')} ${currentIndex === 7 ? 'reading-active' : ''}`} data-reading-index="7">
                <div className="step-header" style={{ marginTop: "-2rem" }}>
                  <span className="step-number">4 </span>
                  <KaraokeLessonText
                    as="span"
                    className="step-label"
                    text="Save the part"
                    isActive={isSpeaking && currentIndex === 7}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
                <div className={`step-label ${currentIndex === 8 ? 'reading-active' : ''}`} data-reading-index="8" style={{ marginTop: "-1rem", marginLeft: "3rem" }}>
                  <KaraokeLessonText
                    as="span"
                    text="Go to File > Save As > Use the Purchase part code as File name."
                    isActive={isSpeaking && currentIndex === 8}
                    currentCharIndex={currentCharIndex}
                  />
                  </div>
              </div>

              <div className={`${getStepClass('p2-5')} ${currentIndex === 9 ? 'reading-active' : ''}`} data-reading-index="9">
                <div className="step-header" style={{ marginTop: "-2rem" }}>
                  <span className="step-number">5 </span>
                  <KaraokeLessonText
                    as="span"
                    className="step-label"
                    text="Set all important informations of the part:"
                    isActive={isSpeaking && currentIndex === 9}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
                 <div className={`step-label ${currentIndex === 10 ? 'reading-active' : ''}`} data-reading-index="10" style={{ marginTop: "-1rem", marginLeft: "3rem"}}>
                  <KaraokeLessonText
                    as="span"
                    text="Other way to add comment to the Part."
                    isActive={isSpeaking && currentIndex === 10}
                    currentCharIndex={currentCharIndex}
                  />
                  </div>
                  <div className={`step-label ${currentIndex === 11 ? 'reading-active' : ''}`} data-reading-index="11" style={{ marginTop: "-1rem", marginLeft: "4rem" }}>
                  <KaraokeLessonText
                    as="p"
                    text="1.) Right-click the Top 3D Part on the tree view"
                    isActive={isSpeaking && currentIndex === 11}
                    currentCharIndex={currentCharIndex}
                  />
                  </div>
                   <div className={`step-label ${currentIndex === 12 ? 'reading-active' : ''}`} data-reading-index="12" style={{ marginTop: "-1rem", marginLeft: "4rem" }}>
                  <KaraokeLessonText
                    as="p"
                    text="2.) Select Properties. The Property dialog box will appear."
                    isActive={isSpeaking && currentIndex === 12}
                    currentCharIndex={currentCharIndex}
                  />
                  </div>
                  <div className={`step-label ${currentIndex === 13 ? 'reading-active' : ''}`} data-reading-index="13" style={{ marginTop: "-1rem", marginLeft: "4rem" }}>
                  <KaraokeLessonText
                    as="p"
                    text="3.) Enter the comment for the specific part > Press OK"
                    isActive={isSpeaking && currentIndex === 13}
                    currentCharIndex={currentCharIndex}
                  />
                  </div>
                </div>
               
                <div className="step-description">
                  <img src={parasolid43Img} alt="Material and Data Entry Info" className="software-screenshot mt-4" style={{marginBottom: "1rem", width: "900px"}} />
                  <img src={otherInfoImg} alt="Other Information Reference" className="software-screenshot mt-8" />

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

