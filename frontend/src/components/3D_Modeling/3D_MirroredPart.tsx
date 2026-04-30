/** * 3D_MirroredPart.tsx – Lessons on Normal vs Mirrored Parts */

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLessonCore } from "../../hooks/useLessonCore";
import { ReadAloudButton } from "../ReadAloudButton";
import "../../styles/3D_Modeling/CourseLesson.css";

/* Shared Assets */
import leftClick from "../../assets/3D_Image_File/left_click.png";
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
    currentIndex
  } = useLessonCore(`mirrored-${activeTab}`);

  const mirrored1Steps = [
    "Normal Parts: These are exactly the same as the original after mirroring. They use the suffix N in the drawing number.",
    "Mirror Parts: These are symmetrically opposite, labeled A for the original and B for the mirror copy. B cannot exist without A.",
    "Identification: Use the Mirror Copy tool. If the copy is identical to the original, it's a Normal Part. If hole locations or features change, it's a Mirror Part."
  ];

  const mirrored2Steps = [
    "Step 1: Identify the proper location of the part's origin.",
    "Step 2: Complete the 3D model of the original part and save it as Part A.",
    "Step 3: Save a copy of Part A as Part B before performing the mirror operation.",
    "Step 4: Use the Mirror tool. Pick 3 points consecutively starting from the origin to create the Part B outcome. Ensure the origin remains in the same relative location."
  ];

  const handleTabChange = (tab: "mirrored-part" | "3d-modeling") => {
    setActiveTab(tab);
  };

  const handleNext = () => {
    if (activeTab === "mirrored-part") {
      handleTabChange("3d-modeling");
      containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      if (onNextLesson) onNextLesson();
    }
  };

  const handlePrev = () => {
    if (activeTab === "3d-modeling") {
      handleTabChange("mirrored-part");
      containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      if (onPrevLesson) onPrevLesson();
    }
  };

  const isMirrored1 = activeTab === "mirrored-part";

  return (
    <div className={`course-lesson-container ${isSpeaking ? 'is-reading' : ''}`} ref={containerRef}>
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
      <div className="lesson-grid single-card">
        <div className={`lesson-card tab-content fade-in ${isSpeaking ? 'reading-active' : ''}`}>
          {isMirrored1 ? (
            <div className="fade-in">
              <div className="card-header">
                <h4>MIRRORED PARTS</h4>
                <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(mirrored1Steps)} onStop={stop} />
              </div>
              <p className='p-flush'>Based on KEMCO Standard</p>

              <div className={`instruction-step ${currentIndex === 0 ? "reading-active" : ""}`} data-reading-index="0">
                <div className="step-description">
                  <p className="p-flush"><strong className="red-text">NORMAL PARTS</strong></p>
                  <p className="p-flush">Parts that are exactly the same as the original part if you create a mirror copy of it. No changes will be recognized.</p>
                  <p className="p-flush">Normal parts have drawing number with <strong className="red-text">N</strong>.</p>
                  
                  <div className="mt-4" style={{ marginLeft: "2rem" }}>
                    <p className="p-flush">MTXXXXX<strong className="red-text">N</strong>01</p>
                  </div>
                  
                  <p className="p-flush mt-4">Here is an example of a normal part.</p>
                  
                  <div className="flex-row-wrap mt-4" style={{ gap: '2rem', alignItems: 'center' }}>
                    <div className="screenshot-wrapper">
                      <img src={normalPartA} alt="Normal Part Example" className="software-screenshot" style={{ height: "300px" }} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="section-divider"></div>

              <div className={`instruction-step ${currentIndex === 1 ? "reading-active" : ""}`} data-reading-index="1">
                <div className="step-description">
                  <p className="p-flush"><strong className="red-text">MIRROR PARTS</strong></p>
                  <p className="p-flush">Parts that are symmetrically the same.</p>
                  <p className="p-flush">Mirror parts have drawing number with <strong className="red-text">A</strong> and <strong className="red-text">B</strong>.</p>
                  
                  <div className="mt-4" style={{ marginLeft: "2rem" }}>
                    <p className="p-flush">MTXXXXX<strong className="red-text">A</strong>01</p>
                    <p className="p-flush">MTXXXXX<strong className="red-text">B</strong>01</p>
                  </div>

                  <p className="p-flush mt-4">Mirror Parts A are the original part.</p>
                  <p className="p-flush">Mirror Parts B are the mirror copy of Mirror Parts A. Mirror Parts B cannot exist without Mirror Parts A.</p>
                  <p className="p-flush"><strong className="red-text">*Note:</strong> If there are no existing part to be mirrored, use <strong className="red-text">A</strong> when naming the part.</p>
                  <p className="p-flush mt-4">Here is an example of mirror parts.</p>

                  <div className="screenshot-wrapper mt-4 text-center">
                    <img src={mirrorPartA} alt="Mirror Part A and B" className="software-screenshot" style={{ width: "900px", marginTop: "2rem" }} />
                  </div>
                </div>
              </div>

              <div className="section-divider"></div>

              <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2">
                <div className="step-description">
                  <p className="p-flush">To check if a part is normal or mirror part:</p>
                  <p className="p-flush">Use Mirror copy tool on the icon menu.</p>
                  
                  <div className="screenshot-wrapper mt-4 mb-4">
                    <img src={mirrorCopyTool} alt="Mirror Copy Tool" className="software-screenshot" style={{ height: '60px', display: 'block', margin: '0 auto 0 0', marginTop: "1rem" }} />
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', marginTop: '1rem' }}>
                    <p className="p-flush" style={{ whiteSpace: 'nowrap', marginRight: '1rem' }}>Place mirror copy over the original part.</p>
                  </div>

                  <div style={{ marginLeft: "3rem", marginTop: "1rem", marginBottom: "2rem" }}>
                    <p className="p-flush">If there are no changes or the part details are all exactly the same, it is a Normal Part.</p>
                    <p className="p-flush mt-2">If there are changes that can be recognize like hole location, cutouts or fairings</p>
                    <p className="p-flush">and if its function as a part can no longer be the same as the function of Mirror Part A, it is a Mirror Part.</p>
                  </div>

                  <div className="instruction-box">
                  <p className="p-flush mt-8"><strong className="red-text">※Be careful in identifying Normal and Mirror parts because it may cause trouble in assigning of drawing numbers.</strong></p>
                  <p className="p-flush mt-8">※Be careful if you see this note on the reference drawings:</p>
                  <p className="p-flush">This means <strong className="red-text">Mirror Image</strong>.</p>
                  <div className="screenshot-wrapper mt-4">
                    <img src={mirrorNotes} alt="Mirror Image Notes" className="software-screenshot" style={{ height: '60px', display: 'block', margin: '0 auto 0 0' }} />
                  </div>
                </div>
              </div>
            </div>
            </div>
          ) : (
            <div className="fade-in">
              <div className="card-header" style={{marginBottom: "2rem"}}>
                <h4>3D MODELING OF MIRROR PARTS</h4>
                <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(mirrored2Steps)} onStop={stop} />
              </div>

              <div className={`instruction-step ${currentIndex === 0 ? "reading-active" : ""}`} data-reading-index="0">
                <div className="step-header">
                  <span className="step-number">1 </span>
                  <span className="step-label">Identify the proper location of origin of the part.</span>
                </div>
                <div className="step-description">
                  <div className="screenshot-wrapper mt-4">
                    <img src={originLocation} alt="Location of Origin" className="software-screenshot screenshot-wide" style={{ width: "600px" }} />
                  </div>
                </div>
              </div>

              <div className="section-divider"></div>

              <div className={`instruction-step ${currentIndex === 1 ? "reading-active" : ""}`} data-reading-index="1">
                <div className="step-header">
                  <span className="step-number">2 </span>
                  <span className="step-label">After doing the 3D modeling of the part, Save it as <strong className="red-text">Part A</strong>.</span>
                </div>
              </div>

              <div className="section-divider"></div>

              <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2">
                <div className="step-header">
                  <span className="step-number">3 </span>
                  <span className="step-label">In doing the 3D model of the mirror part, <strong className="red-text">Part A</strong> must be saved to another file as <strong className="red-text">Part B</strong>.</span>
                </div>
              </div>

              <div className="section-divider"></div>

              <div className={`instruction-step ${currentIndex === 3 ? "reading-active" : ""}`} data-reading-index="3">
                <div className="step-header">
                  <span className="step-number">4 </span>
                  <span className="step-label">Use Mirror to convert the 3D Model of Part A to Part B.</span>
                </div>
                <div className="step-description">
                  <div className="screenshot-wrapper mt-4">
                    <img src={mirrorTool} alt="Mirror Tool" className="software-screenshot" style={{ height: '100px', marginBottom: "1rem" }} />
                  </div>
                  
                  <p className="p-flush mt-4" style={{marginBottom: "1rem"}}>Pick 3 points consecutively from the Part, <strong className="red-text">starting from the origin</strong>.</p>
                  <div className="screenshot-wrapper mt-4">
                    <img src={pick3Points} alt="Mirror Plane Visualization" className="software-screenshot" style={{ width: "600px", marginBottom: "2rem"}} />
                  </div>
                  
                  <p className="p-flush mt-8" style={{marginBottom: "1rem"}}>After doing the command, this will be the outcome as Part B.</p>
                  <div className="screenshot-wrapper mt-4">
                    <img src={pick3PointsPartA} alt="Outcome Part B" className="software-screenshot" style={{ width: "600px", marginBottom: "2rem" }} />
                  </div>
                  
                  <div className="mt-8">
                    <p className="p-flush"><strong className="red-text">※The Origin of Part B must be the same location as in Part A.</strong></p>
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
