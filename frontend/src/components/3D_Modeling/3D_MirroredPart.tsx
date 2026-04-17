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
        <div className="lesson-card">
          {isMirrored1 ? (
            <div className="tab-pane fade-in">
              <div className={`${getStepClass("mp1-1")} ${currentIndex === 0 ? "reading-active" : ""}`}>
                <div className="step-header">
                  <span className="step-number">1</span>
                  <span className="step-label">NORMAL PARTS</span>
                </div>
                <div className="step-description">
                  <p className="p-flush">Parts that are exactly the same as the original part if you create a mirror copy of it. No changes will be recognized.</p>
                  <p className="p-flush">Normal parts have drawing number with <strong className="text-highlight">N</strong>.</p>
                  <div className="drawing-number-box">RTXXXXXX<strong>N</strong>01</div>
                  <p className="p-flush">Here is an example of a normal part.</p>
                  <div className="flex-row-center">
                    <div>
                      <img src={normalPartA} alt="Normal Part Example" className="software-screenshot screenshot-medium" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="section-divider" />

              <div className={`${getStepClass("mp1-2")} ${currentIndex === 1 ? "reading-active" : ""}`}>
                <div className="step-header">
                  <span className="step-number">2</span>
                  <span className="step-label">MIRROR PARTS</span>
                </div>
                <div className="step-description">
                  <p className="p-flush">Parts that are symmetrically the same.</p>
                  <p className="p-flush">Mirror parts have drawing number with <strong className="text-highlight">A</strong> and <strong className="text-highlight">B</strong>.</p>
                  <div className="flex-column">
                    <div className="drawing-number-box">RTXXXXX<strong>A</strong>01</div>
                    <div className="drawing-number-box">RTXXXXX<strong>B</strong>01</div>
                  </div>
                  <ul className="interaction-list--plain" style={{ marginTop: '1rem' }}>
                    <li>Mirror Parts <strong className="text-highlight">A</strong> are the original part.</li>
                    <li>Mirror Parts <strong className="text-highlight">B</strong> are the mirror copy of Mirror Parts A.</li>
                    <li>Mirror Parts B cannot exist without Mirror Parts A.</li>
                  </ul>
                  <p className="p-flush" style={{ marginTop: '1rem' }}><strong>Note:</strong> If there are no existing part to be mirrored, use <strong>A</strong> when naming the part.</p>
                  <div>
                    <img src={mirrorPartA} alt="Mirror Part A and B" className="software-screenshot screenshot-large" />
                  </div>
                </div>
              </div>

              <div className="section-divider" />

              <div className={`${getStepClass("mp1-3")} ${currentIndex === 2 ? "reading-active" : ""}`}>
                <div className="step-header">
                  <span className="step-number">3</span>
                  <span className="step-label">Use Mirror copy tool on the icon menu.</span>
                </div>
                <div className="step-description">
                  <div>
                    <img src={mirrorCopyTool} alt="Mirror Copy Tool" className="software-screenshot screenshot-medium" style={{ height: '80px' }} />
                  </div>
                  <div className="info-box">
                    <p className="p-flush"><strong>Place mirror copy over the original part.</strong></p>
                    <ul className="interaction-list--plain">
                      <li>If there are no changes or the part details are all exactly the same, it is a Normal Part.</li>
                      <li>If there are changes that can be recognize like hole location, cutouts or fairings, it is a Mirror Part.</li>
                    </ul>
                    <p className="p-flush" style={{ marginTop: '1rem' }}><strong>NOTE:</strong> Be careful in identifying parts because it affects drawing number assignment.</p>
                    <p className="p-flush"><strong>NOTE:</strong> Watch for <strong>Mirror Image</strong> notes on reference drawings.</p>
                  </div>
                  <div>
                    <img src={mirrorNotes} alt="Mirror Image Notes" className="software-screenshot screenshot-small" style={{ height: '80px' }} />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="tab-pane fade-in">
              <h4 className="section-title" style={{ marginRight: '645px' }}>Mirroring procedure</h4>
              <div className={`${getStepClass("mp2-1")} ${currentIndex === 0 ? "reading-active" : ""}`}>
                <div className="step-header">
                  <span className="step-number">1</span>
                  <span className="step-label">Identify the proper location of origin of the part.</span>
                </div>
                <div>
                  <img src={originLocation} alt="Location of Origin" className="software-screenshot screenshot-large" />
                </div>
              </div>

              <div className={`${getStepClass("mp2-2")} ${currentIndex === 1 ? "reading-active" : ""}`} style={{ marginTop: '1.5rem' }}>
                <div className="step-header">
                  <span className="step-number">2</span>
                  <span className="step-label">After doing 3D modeling of the part, Save it as <strong>Part A</strong></span>
                </div>
              </div>

              <div className={`${getStepClass("mp2-3")} ${currentIndex === 2 ? "reading-active" : ""}`} style={{ marginTop: '1.5rem' }}>
                <div className="step-header">
                  <span className="step-number">3</span>
                  <span className="step-label">In doing the 3D model of the mirror part, Part A must be saved to another file as Part B.</span>
                </div>
              </div>

              <div className={`${getStepClass("mp2-4")} ${currentIndex === 3 ? "reading-active" : ""}`} style={{ marginTop: '1.5rem' }}>
                <div className="step-header">
                  <span className="step-number">4</span>
                  <span className="step-label">Use mirror to convert the 3D Model of Part A to Part B.</span>
                </div>
                <div className="step-description">
                  <div>
                    <img src={mirrorTool} alt="Mirror Tool" className="software-screenshot screenshot-small" style={{ height: '200px' }} />
                  </div>
                  <br />
                  <p className="p-flush">Pick 3 points consecutively from the Part, <strong>starting from the origin.</strong></p>
                  <div>
                    <img src={pick3Points} alt="Mirror Plane Visualization" className="software-screenshot screenshot-medium" />
                  </div>
                  <br />
                  <p className="p-flush">After doing the command, this will be the outcome as Part B.</p>
                  <div>
                    <img src={pick3PointsPartA} alt="Picking Points on Part A" className="software-screenshot screenshot-large" />
                  </div>
                  <p className="p-flush"><strong>Note:</strong> The <strong>Origin Part B</strong> must be at the <strong>same location as in Part A.</strong></p>
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

export default MirroredPartLesson;
