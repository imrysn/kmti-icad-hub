import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLessonCore } from "../../hooks/useLessonCore";
import { useTTSAutoplay } from "../../hooks/useTTSAutoplay";
import { ReadAloudButton } from "../ReadAloudButton";
import { KaraokeLessonText } from "../KaraokeLessonText";
import "../../styles/3D_Modeling/CourseLesson.css";

/* Shared Assets */
import mirrorCopyTool from "../../assets/3D_Image_File/mirrored_part1_mirror_copy_tool.jpg";
import mirrorPartA from "../../assets/3D_Image_File/mirrored_part1_mirror_part.png";
import normalPartA from "../../assets/3D_Image_File/mirrored_part1_normal_part.png";
import mirrorNotes from "../../assets/3D_Image_File/mirrored_notes.png";
import originLocation from "../../assets/3D_Image_File/mirrored_part2_location_of_origin.png";
import mirrorTool from "../../assets/3D_Image_File/mirrored_part2_mirror.png";
import pick3Points from "../../assets/3D_Image_File/mirrored_part2_pick3_points.png";
import pick3PointsPartA from "../../assets/3D_Image_File/mirrored_part2_pick3_points_part_a.png";

interface MirroredPartLessonProps {
  nextLabel?: string;
  subLessonId?: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const MirroredPartLesson: React.FC<MirroredPartLessonProps> = ({ subLessonId = "mirrored-1", onNextLesson, onPrevLesson, nextLabel }) => {
  const [activeTab, setActiveTab] = useState<"mirrored-part" | "3d-modeling">(() => {
    return (localStorage.getItem('mirroredActiveTab') as "mirrored-part" | "3d-modeling") || "mirrored-part";
  });

  useEffect(() => {
    localStorage.setItem('mirroredActiveTab', activeTab);
  }, [activeTab]);

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

  const mirrored1Steps = [
    "NORMAL PARTS",
    "Parts that are exactly the same as the original part if you create a mirror copy of it. No changes will be recognized. Normal parts have drawing number with N.",
    "MIRROR PARTS",
    "Parts that are symmetrically the same. Mirror parts have drawing number with A and B.",
    "To check if a part is normal or mirror part: Use Mirror copy tool on the icon menu",
    "Place mirror copy over the original part. If there are no changes or the part details are all exactly the same, it is a Normal Part. If there are changes that can be recognize like hole location, cutouts or fairings and if its function as a part can no longer be the same as the function of Mirror Part A, it is a Mirror Part."
  ];

  const mirrored2Steps = [
    "3D MODELING OF MIRROR PARTS",
    "Step 1: Identify the proper location of origin of the part.",
    "Step 2: After doing the 3D modeling of the part, Save it as Part A",
    "Step 3: In doing the 3D model of the mirror part, Part A must be saved to another file as Part B.",
    "Step 4: Use Mirror to convert the 3D Model of Part A to Part B"
  ];

  const introTitle = activeTab === 'mirrored-part' ? 'MIRRORED PARTS' : '3D MODELING OF MIRROR PARTS';
  const introSubtitle = activeTab === 'mirrored-part' ? "Based on KEMCO Standard" : "Step-by-step guide on how to create and mirror parts correctly.";

  const commonIntroSteps = [
    introTitle,
    introSubtitle
  ];

  const mirrored1StepsTTS = [...commonIntroSteps, ...mirrored1Steps];
  const mirrored2StepsTTS = [...commonIntroSteps, ...mirrored2Steps];

  const handleTabChange = (tab: "mirrored-part" | "3d-modeling") => {
    stop();
    sessionStorage.setItem('tts-autoplay-active', 'false');
    setActiveTab(tab);
  };

  const handleNext = (isAuto = false) => {
    stop();
    if (!isAuto) {
      sessionStorage.setItem('tts-autoplay-active', 'false');
    }
    if (activeTab === "mirrored-part") {
      setActiveTab("3d-modeling");
    } else if (onNextLesson) {
      onNextLesson();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrev = (isAuto = false) => {
    stop();
    if (!isAuto) {
      sessionStorage.setItem('tts-autoplay-active', 'false');
    }
    if (activeTab === "3d-modeling") {
      setActiveTab("mirrored-part");
    } else if (onPrevLesson) {
      onPrevLesson();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const steps = activeTab === 'mirrored-part' ? mirrored1StepsTTS : mirrored2StepsTTS;
    const startIdx = activeTab === 'mirrored-part' ? 0 : 2;
    registerText(steps, startIdx);
  }, [activeTab, registerText]);

  const currentTabSteps = activeTab === 'mirrored-part' ? mirrored1StepsTTS : mirrored2StepsTTS;
  const startIdx2 = activeTab === 'mirrored-part' ? 0 : 2;
  const tabsList = [{ id: 'mirrored-part' }, { id: '3d-modeling' }];

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

  const isMirrored1 = activeTab === "mirrored-part";

  return (
    <div className={`course-lesson-container`} ref={containerRef}>
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      <div className="lesson-tabs">
        <button
          className={`tab-button ${activeTab === 'mirrored-part' ? 'active' : ''}`}
          onClick={() => handleTabChange('mirrored-part')}
        >
          Mirrored Part
        </button>
        <button
          className={`tab-button ${activeTab === '3d-modeling' ? 'active' : ''}`}
          onClick={() => handleTabChange('3d-modeling')}
        >
          3D MODELING OF MIRROR PARTS
        </button>
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
            const steps = activeTab === 'mirrored-part' ? mirrored1Steps : mirrored2Steps;
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
      </section>

      <div className="lesson-grid single-card">
        <div className="lesson-card tab-content fade-in">
          {isMirrored1 ? (
            <div className="fade-in">
              <div className={`card-header ${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
                 <h4>
                  <KaraokeLessonText
                    as="span"
                    className="red-text"
                    text="NORMAL PARTS"
                    isActive={isSpeaking && currentIndex === 2}
                    currentCharIndex={currentCharIndex}
                  />
                 </h4>
              </div>

              <div className={`instruction-step ${currentIndex === 3 ? "reading-active" : ""}`} data-reading-index="3">
                <div className="step-description">
                  <KaraokeLessonText
                    as="div"
                    text="Parts that are exactly the same as the original part if you create a mirror copy of it. No changes will be recognized. 
                    <br /> 
                    Normal parts have drawing number with N."
                    isActive={isSpeaking && currentIndex === 3}
                    currentCharIndex={currentCharIndex}
                  />
                  <div className="mt-4">
                    <p className="p-flush">MTXXXXX<strong className="red-text">N</strong>01</p>
                  </div>
                  
                  <div className="flex-row-wrap mt-4" style={{ gap: '2rem', alignItems: 'center' }}>
                    <p style={{ marginTop: "2rem", marginBottom: "-3rem"}} className="p-flush">Here is an example of a normal part.</p>
                    <img src={normalPartA} alt="Normal Part Example" className="software-screenshot mt-4" style={{ height: "300px" }} />
                  </div>
                </div>
              </div>


              <div className={`instruction-step ${currentIndex === 4 ? "reading-active" : ""}`} data-reading-index="4">
                <div className={`card-header ${currentIndex === 4 ? 'reading-active' : ''}`} data-reading-index="4">
                  <h4>
                    <KaraokeLessonText
                      as="span"
                      className="red-text"
                      text="MIRROR PARTS"
                      isActive={isSpeaking && currentIndex === 4}
                      currentCharIndex={currentCharIndex}
                    />
                  </h4>
                </div>
                <div className="step-description">
                  <KaraokeLessonText
                    as="div"
                    text="Parts that are symmetrically the same.
                    <br />
                    Mirror parts have drawing number with A and B."
                    isActive={isSpeaking && currentIndex === 5}
                    currentCharIndex={currentCharIndex}
                  />
                  <div className="mt-4" style={{ marginTop: "1rem" }}>
                    <p className="p-flush">MTXXXXX<strong className="red-text">A</strong>01</p>
                    <p className="p-flush">MTXXXXX<strong className="red-text">B</strong>01</p>
                  </div>

                    <p className="p-flush" style={{marginTop: "1rem"}}>Mirror Parts A are the original part</p>
                    <p className="p-flush">Mirror Parts B are the mirror copy of Mirror Parts A. Mirror Parts B cannot exist without Mirror Parts A.</p>
                    <p className="p-flush red-text" >*Note: If there are no existing part to be mirrored, use A when naming the part.</p>
                    <p className="p-flush">Here is an example of mirror parts.</p>

                    <img src={mirrorPartA} alt="Mirror Part A and B" className="software-screenshot mt-4" style={{ width: "900px", marginTop: "2rem" }} />
                </div>
              </div>


              <div className={`instruction-step ${currentIndex === 6 ? "reading-active" : ""}`} data-reading-index="6">
                <div className="step-description">
                  <KaraokeLessonText
                    as="div"
                    text="To check if a part is normal or mirror part:
                    <br />
                    Use Mirror copy tool on the icon menu"
                    isActive={isSpeaking && currentIndex === 6}
                    currentCharIndex={currentCharIndex}
                  />
                    <img src={mirrorCopyTool} alt="Mirror Copy Tool" className="software-screenshot mt-4 mb-4" style={{ height: '60px', display: 'block', margin: '0 auto 0 0', marginTop: "1rem", marginBottom: "1rem"}} />

                  <div className={`${currentIndex === 7 ? "reading-active" : ""}`} data-reading-index="7">
                    <KaraokeLessonText
                      as="div"
                      style={{marginBottom: "2rem"}}
                      text="Place mirror copy over the original part. 
                      <br /><br />
                      If there are no changes or the part details are all exactly the same, it is a Normal Part. 
                      <br /><br />
                      If there are changes that can be recognize like hole location, cutouts or fairings and if its function as a part can no longer be the same as the function of Mirror Part A, it is a Mirror Part."
                      isActive={isSpeaking && currentIndex === 7}
                      currentCharIndex={currentCharIndex}
                    />
                  </div>


                  <div className="instruction-box">
                    <p className="p-flush mt-8" style={{marginBottom: "1rem"}}><strong className="red-text">※Be careful in identifying Normal and Mirror parts because it may cause trouble in assigning of drawing numbers.</strong></p>
                    <p className="p-flush mt-8" style={{marginBottom: "1rem"}}>※Be careful if you see this note on the reference drawings:</p>
                    <p className="p-flush" style={{marginBottom: "0.5rem"}}>This means <strong className="red-text">Mirror Image</strong>.</p>
                    <img src={mirrorNotes} alt="Mirror Image Notes" className="software-screenshot mt-4" style={{ height: '60px', display: 'block', margin: '0 auto 0 0' }} />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="fade-in">
              <div className={`card-header ${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2" style={{marginBottom: "2rem"}}>
                <h4>3D MODELING OF MIRROR PARTS</h4>
              </div>

              <div className={`instruction-step ${currentIndex === 3 ? "reading-active" : ""}`} data-reading-index="3">
                <div className="step-header">
                  <span className="step-number">1 </span>
                  <KaraokeLessonText
                    as="span"
                    className="step-label"
                    text="Identify the proper location of origin of the part."
                    isActive={isSpeaking && currentIndex === 3}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
                <div className="step-description">
                    <img src={originLocation} alt="Location of Origin" className="software-screenshot screenshot-wide mt-4" style={{ width: "600px" }} />
                </div>
              </div>


              <div className={`instruction-step ${currentIndex === 4 ? "reading-active" : ""}`} data-reading-index="4">
                <div className="step-header">
                  <span className="step-number">2 </span>
                  <KaraokeLessonText
                    as="span"
                    className="step-label"
                    text="After doing the 3D modeling of the part, Save it as Part A"
                    isActive={isSpeaking && currentIndex === 4}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
              </div>


              <div className={`instruction-step ${currentIndex === 5 ? "reading-active" : ""}`} data-reading-index="5">
                <div className="step-header" style={{ marginTop: "-2rem" }}>
                  <span className="step-number">3 </span>
                  <KaraokeLessonText
                    as="span"
                    className="step-label"
                    text="In doing the 3D model of the mirror part, Part A must be saved to another file as Part B."
                    isActive={isSpeaking && currentIndex === 5}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
              </div>


              <div className={`instruction-step ${currentIndex === 6 ? "reading-active" : ""}`} data-reading-index="6">
                <div className="step-header" style={{ marginTop: "-2rem" }}>
                  <span className="step-number">4 </span>
                  <KaraokeLessonText
                    as="span"
                    className="step-label"
                    text="Use Mirror to convert the 3D Model of Part A to Part B"
                    isActive={isSpeaking && currentIndex === 6}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
                <div className="step-description">
                    <img src={mirrorTool} alt="Mirror Tool" className="software-screenshot mt-4" style={{ width: "200px", marginBottom: "1rem" }} />
                   <span className="p-flush" style={{marginBottom: "1rem"}}>Pick 3 points consecutively from the Part, starting from the origin.</span>
                    <img src={pick3Points} alt="Mirror Plane Visualization" className="software-screenshot mt-4" style={{ width: "600px", marginBottom: "3rem", marginTop: "2rem"}} />
                  <span className="p-flush">After doing the command, this will be the outcome as Part B.</span>
                    <img src={pick3PointsPartA} alt="Outcome Part B" className="software-screenshot mt-4" style={{ width: "600px", marginBottom: "3rem", marginTop: "2rem"}} />
                  <div className="instruction-box">
                    <span className="p-flush red-text" style={{marginBottom: "1rem"}}>※ The Origin of Part B must be the same location as in Part A.</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="lesson-navigation">
            <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button>
            <button className="nav-button next" onClick={handleNext}>{activeTab === '3d-modeling' ? nextLabel || 'Next Lesson' : 'Next'} <ChevronRight size={18} /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MirroredPartLesson;

