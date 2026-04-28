/** * 3D_MirroredPart.tsx – Lessons on Normal vs Mirrored Parts */

import React from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLessonCore } from "../../hooks/useLessonCore";
import { ReadAloudButton } from "../ReadAloudButton";
import "../../styles/3D_Modeling/CourseLesson.css";

/* Shared Assets */
import leftClick from "../../assets/3D_Image_File/left_click.png";
import mirrorCopyTool from "../../assets/3D_Image_File/mirrored_part1_mirror_copy_tool.png";
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
  const {
    scrollProgress,
    containerRef,
    speak,
    stop,
    isSpeaking,
    currentIndex
  } = useLessonCore(subLessonId);

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

  const getStepClass = (stepId: string) => "instruction-step";
  const isMirrored1 = subLessonId === "mirrored-1";

  return (
    <div className="course-lesson-container" ref={containerRef}>
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      <section className="lesson-intro">
        <h3 className="section-title">
          {isMirrored1 ? "Mirrored parts (1)" : "3d modeling of mirror parts"}
          <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(isMirrored1 ? mirrored1Steps : mirrored2Steps)} onStop={stop} />
        </h3>
        <p className="p-flush">{isMirrored1 ? "Based on KEMCO Standard" : ""}</p>
      </section>
      <div className="lesson-grid single-card">
        <div className="lesson-card tab-content fade-in">
          {isMirrored1 ? (
            <div className="fade-in">
              <div className="card-header">
                <h4>MIRRORED PARTS CLASSIFICATION</h4>
                <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(mirrored1Steps)} onStop={stop} />
              </div>

              <div className={`${getStepClass("mp1-1")} ${currentIndex === 0 ? "reading-active" : ""}`}>
                <div className="step-header">
                  <span className="step-number">1 </span>
                  <span className="step-label">NORMAL PARTS</span>
                </div>
                <div className="step-description">
                  <p className="p-flush">Parts that are exactly the same as the original after mirroring. They use the suffix <strong className="text-highlight">N</strong> in the drawing number.</p>
                  <div className="drawing-number-box mt-8">RTXXXXXX<strong>N</strong>01</div>
                  <div className="screenshot-wrapper mt-8">
                    <img src={normalPartA} alt="Normal Part Example" className="software-screenshot screenshot-wide" />
                  </div>
                </div>
              </div>

              <div className="section-divider"></div>

              <div className={`${getStepClass("mp1-2")} ${currentIndex === 1 ? "reading-active" : ""}`}>
                <div className="step-header">
                  <span className="step-number">2 </span>
                  <span className="step-label">MIRROR PARTS</span>
                </div>
                <div className="step-description">
                  <p className="p-flush">Symmetrically opposite parts, labeled <strong className="text-highlight">A</strong> (Original) and <strong className="text-highlight">B</strong> (Mirror).</p>
                  <div className="flex-row-wrap mt-8" style={{ gap: '1rem' }}>
                    <div className="drawing-number-box">RTXXXXX<strong>A</strong>01</div>
                    <div className="drawing-number-box">RTXXXXX<strong>B</strong>01</div>
                  </div>
                  <div className="instruction-box mt-8">
                    <p className="p-flush">Mirror Part <strong className="text-highlight">B</strong> cannot exist without Mirror Part <strong className="text-highlight">A</strong>.</p>
                  </div>
                  <div className="screenshot-wrapper mt-8">
                    <img src={mirrorPartA} alt="Mirror Part A and B" className="software-screenshot screenshot-wide" />
                  </div>
                </div>
              </div>

              <div className="section-divider"></div>

              <div className={`${getStepClass("mp1-3")} ${currentIndex === 2 ? "reading-active" : ""}`}>
                <div className="step-header">
                  <span className="step-number">3 </span>
                  <span className="step-label">IDENTIFICATION</span>
                </div>
                <div className="step-description">
                  <p className="p-flush">Use the <strong className="text-highlight">Mirror Copy</strong> tool. If features or hole locations change, it is a Mirror Part.</p>
                  <div className="screenshot-wrapper mt-4">
                    <img src={mirrorCopyTool} alt="Mirror Copy Tool" className="software-screenshot screenshot-small" style={{ height: '80px' }} />
                  </div>
                  <div className="instruction-box instruction-box--warning mt-8">
                    <p className="p-flush"><strong>TIP:</strong> Watch for <strong className="text-highlight">Mirror Image</strong> notes on reference drawings.</p>
                  </div>
                  <div className="screenshot-wrapper mt-8">
                    <img src={mirrorNotes} alt="Mirror Image Notes" className="software-screenshot screenshot-small" style={{ height: '80px' }} />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="fade-in">
              <div className="card-header">
                <h4>MIRRORING PROCEDURE</h4>
                <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(mirrored2Steps)} onStop={stop} />
              </div>

              <div className={`${getStepClass("mp2-1")} ${currentIndex === 0 ? "reading-active" : ""}`}>
                <div className="step-header">
                  <span className="step-number">1 </span>
                  <span className="step-label">Identify the proper location of the <strong className="text-highlight">origin</strong>.</span>
                </div>
                <div className="step-description">
                  <div className="screenshot-wrapper">
                    <img src={originLocation} alt="Location of Origin" className="software-screenshot screenshot-wide" />
                  </div>
                </div>
              </div>

              <div className="section-divider"></div>

              <div className={`${getStepClass("mp2-2")} ${currentIndex === 1 ? "reading-active" : ""}`}>
                <div className="step-header">
                  <span className="step-number">2 </span>
                  <span className="step-label">Complete Part A and save it.</span>
                </div>
              </div>

              <div className="section-divider"></div>

              <div className={`${getStepClass("mp2-3")} ${currentIndex === 2 ? "reading-active" : ""}`}>
                <div className="step-header">
                  <span className="step-number">3 </span>
                  <span className="step-label">Save a copy of Part A as <strong className="text-highlight">Part B</strong>.</span>
                </div>
              </div>

              <div className="section-divider"></div>

              <div className={`${getStepClass("mp2-4")} ${currentIndex === 3 ? "reading-active" : ""}`}>
                <div className="step-header">
                  <span className="step-number">4 </span>
                  <span className="step-label">Use the <strong className="text-highlight">Mirror</strong> tool to convert model.</span>
                </div>
                <div className="step-description">
                  <div className="screenshot-wrapper">
                    <img src={mirrorTool} alt="Mirror Tool" className="software-screenshot screenshot-small" style={{ height: '180px' }} />
                  </div>
                  <p className="p-flush mt-4">Pick 3 points consecutively starting <strong className="text-highlight">from the origin</strong>.</p>
                  <div className="flex-row-wrap mt-8" style={{ gap: '2rem' }}>
                    <div className="screenshot-wrapper">
                      <img src={pick3Points} alt="Mirror Plane Visualization" className="software-screenshot screenshot-medium" />
                    </div>
                    <div className="screenshot-wrapper">
                      <img src={pick3PointsPartA} alt="Picking Points on Part A" className="software-screenshot screenshot-medium" />
                    </div>
                  </div>
                  <div className="instruction-box instruction-box--warning mt-8">
                    <p className="p-flush">The Origin of Part B must remain in the <strong className="text-highlight">same relative location</strong> as Part A.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="lesson-navigation">
            <button className="nav-button" onClick={onPrevLesson}><ChevronLeft size={18} /> Previous</button>
            <button className="nav-button next" onClick={onNextLesson}>{nextLabel || 'Next Lesson'} <ChevronRight size={18} /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MirroredPartLesson;
