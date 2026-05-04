import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLessonCore } from "../../hooks/useLessonCore";
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
  const [activeTab, setActiveTab] = React.useState<'import' | 'edit'>(() => {
    return (localStorage.getItem('parasolid-tab') as any) || 'import';
  });

  const {
    scrollProgress,
    containerRef,
    speak,
    stop,
    isSpeaking,
    currentIndex,
    currentCharIndex
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrev = () => {
    if (activeTab === 'edit') setActiveTab('import');
    else if (onPrevLesson) onPrevLesson();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getStepClass = (stepId: string) => "instruction-step";

  const tabs = [
    { id: 'import', label: 'IMPORT' },
    { id: 'edit', label: 'Lighten B-Rep Solid' },
  ];

  const introTitle = activeTab === 'import' ? 'Loading of Parasolid Data' : 'Parasolid Export & Edit';
  const introSubtitle = "Tools used to import and export parasolid data, and edit B-Rep solid for 3D Purchase Parts.";

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
            onClick={() => setActiveTab(tab.id as any)} 
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
          <ReadAloudButton isSpeaking={isSpeaking} onStart={() => {
            const steps = activeTab === 'import' ? importSteps : editSteps;
            speak([introTitle, introSubtitle, ...steps]);
          }} onStop={stop} />
        </h3>
        <KaraokeLessonText
          className={`lesson-subtitle ${currentIndex === 1 ? "reading-active" : ""}`}
          data-reading-index="1"
          text={introSubtitle}
          isActive={isSpeaking && currentIndex === 1}
          currentCharIndex={currentCharIndex}
        />
        <div className="screenshot-wrapper mt-4">
          <img src={loadingParasolidImg} alt="Loading Parasolid" className="software-screenshot screenshot-small" style={{ width: "250px", marginTop: "1rem" }} />
        </div>
      </section>

      <div className="lesson-grid single-card">
        <div className="lesson-card tab-content fade-in">
          {activeTab === 'import' ? (
            <div className="fade-in">
              <div className="card-header">
                <h4>IMPORT PROCEDURE</h4>
              </div>

              <div className={`${getStepClass('p1-1')} ${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
                <div className="step-header">
                  <span className="step-number">1 </span>
                  <KaraokeLessonText
                    as="span"
                    className="step-label"
                    text="Select Import from the icon menu."
                    isActive={isSpeaking && currentIndex === 2}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
                <div className="step-description">
                  <div className="screenshot-wrapper">
                    <img src={importIcon} alt="Import Icon" className="software-screenshot screenshot-small" style={{ height: '150px' }} />
                  </div>
                </div>
              </div>



              <div className={`${getStepClass('p1-2')} ${currentIndex === 3 ? 'reading-active' : ''}`} data-reading-index="3">
                <div className="step-header">
                  <span className="step-number">2 </span>
                  <KaraokeLessonText
                    as="span"
                    className="step-label"
                    text="The Parasolid Link dialog will appear. Browse to the folders containing your parasolid files."
                    isActive={isSpeaking && currentIndex === 3}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
                <div className="step-description">
                  <div className="screenshot-wrapper mt-4">
                    <img src={linkDialogImg} alt="Parasolid Link Dialog" className="software-screenshot" style={{width: "900px"}} />
                  </div>
                </div>
              </div>



              <div className={`${getStepClass('p1-3')} ${currentIndex === 4 ? 'reading-active' : ''}`} data-reading-index="4">
                <div className="step-header">
                  <span className="step-number">3 </span>
                  <KaraokeLessonText
                    as="span"
                    className="step-label"
                    style={{marginTop: "-1.5rem"}}
                    text="After selecting your file, click OK then GO. When the Name Change dialog appears, click Cancel to release part names on the tree view."
                    isActive={isSpeaking && currentIndex === 4}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
                <div className="step-description">
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
              </div>
              <p className='p-flush' style={{ marginTop: "-2rem" }}>Optimize the B-Rep solid to reduce overall file size.</p>

              <div className={`${getStepClass('p2-1')} ${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
                <div className="step-header">
                  <span className="step-number">1 </span>
                  <KaraokeLessonText
                    as="span"
                    className="step-label"
                    text="Select Lighten B-rep Solid from the menu to reduce file size."
                    isActive={isSpeaking && currentIndex === 2}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
                <div className="step-description">
                  <div className="screenshot-wrapper">
                    <img src={lightenBrepIcon} alt="Lighten B-rep Solid Icon" className="software-screenshot" style={{ width: "250px", marginTop: "1rem"}}/>
                  </div>
                </div>
              </div>

              <div className="section-divider"></div>

              <div className={`${getStepClass('p2-2')} ${currentIndex === 3 ? 'reading-active' : ''}`} data-reading-index="3">
                <div className="step-header">
                  <span className="step-number">2 </span>
                  <KaraokeLessonText
                    as="span"
                    className="step-label"
                    text="In the dialog box, select No form changes and click OK."
                    isActive={isSpeaking && currentIndex === 3}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
                <div className="step-description">
                  <div className="screenshot-wrapper">
                    <img src={brepDialogImg} alt="Level Settings Dialog" className="software-screenshot" style={{width: "400px"}} />
                  </div>
                </div>
              </div>

              <div className="section-divider"></div>

              <div className={`${getStepClass('p2-3')} ${currentIndex === 4 ? 'reading-active' : ''}`} data-reading-index="4">
                <div className="step-header">
                  <span className="step-number">3 </span>
                  <KaraokeLessonText
                    as="span"
                    className="step-label"
                    style={{marginTop: "-1.5rem"}}
                    text="Select the purchase part and click GO. Check the message pane to verify if the process was successful."
                    isActive={isSpeaking && currentIndex === 4}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
                <div className="step-description">
                  <div className="screenshot-wrapper mt-4">
                    <img src={messagePaneImg} alt="Message Pane Success" className="software-screenshot" style={{ width: "450px", marginBottom: "1rem"}} />
                  </div>
                </div>
              </div>

              <div className={`${getStepClass('p2-4')} ${currentIndex === 5 ? 'reading-active' : ''}`} data-reading-index="5">
                <div className="step-header">
                  <span className="step-number">4 </span>
                  <KaraokeLessonText
                    as="span"
                    className="step-label"
                    text="Save the part by going to File, Save As, and using the purchase part code as the filename."
                    isActive={isSpeaking && currentIndex === 5}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
              </div>

              <div className={`${getStepClass('p2-5')} ${currentIndex === 6 ? 'reading-active' : ''}`} data-reading-index="6">
                <div className="step-header">
                  <span className="step-number">5 </span>
                  <KaraokeLessonText
                    as="span"
                    className="step-label"
                    text="Set important part info by right-clicking the top 3D part on the tree view, selecting Properties, and entering your comments."
                    isActive={isSpeaking && currentIndex === 6}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
                <div className="step-description">
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

