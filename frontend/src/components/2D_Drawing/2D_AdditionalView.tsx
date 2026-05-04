import React from "react";

import { ChevronLeft, ChevronRight } from 'lucide-react'; import { ReadAloudButton } from "../ReadAloudButton";
import { useLessonCore } from "../../hooks/useLessonCore";

import "../../styles/2D_Drawing/CourseLesson.css";
/* Importing assets for Additional View (1) */

import additionalView1Img1 from "../../assets/2D_Image_File/2D_additional_view(1)_a.png";

/* Importing assets for Additional View (2) */

import additionalView2ImgB from "../../assets/2D_Image_File/2D_additional_view(2)_b.png";

import additionalView2ImgC from "../../assets/2D_Image_File/2D_additional_view(2)_c.png";
/* Importing assets for Additional View (3) */

import additionalView3ImgD from "../../assets/2D_Image_File/2D_additional_view(3)_d.png";

import additionalView3ImgE from "../../assets/2D_Image_File/2D_additional_view(3)_e.png";
/* Importing assets for Additional View (4) */

import additionalView4ImgF from "../../assets/2D_Image_File/2D_additional_view(4)_f.png";

interface AdditionalViewLessonProps {
  nextLabel?: string;
  subLessonId?: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const AdditionalViewLesson: React.FC<AdditionalViewLessonProps> = ({
  subLessonId = "2d-additional-view-1",
  onNextLesson,
  onPrevLesson, nextLabel }) => {
  const { scrollProgress, containerRef, speak, stop, isSpeaking, currentIndex } = useLessonCore(subLessonId);

  const additionalView1Steps = [
    "Cross Section View: Follow steps 1 through 4 to create a basic cross section. Note that the text height of the section name must match the dimension text height."
  ];

  const additionalView2Steps = [
    "Partial Section: Use this tool to create a cross-section of a specific part area. Select the view, define the boundary, and set the depth.",
    "Detail Drawing: Use this to show a specific view area on a larger scale for better clarity."
  ];

  const additionalView3Steps = [
    "Isometric View: Follow the projection steps to place a 3D isometric representation on your 2D drawing.",
    "Cross-sectional Depth: Set the depth to eliminate unnecessary background parts from your section view."
  ];

  const additionalView4Steps = [
    "Trim: This is another way to eliminate unneeded parts from a view. Note that Trim cannot be applied to Detail Drawings."
  ];

  return (
    <div className="course-lesson-container" ref={containerRef}>
      {" "}
      {/* Sticky Progress Bar */}
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>
      <section className="lesson-intro">
        <h3 className={`section-title ${currentIndex === 0 ? "reading-active" : ""}`} data-reading-index="0">
          20. ADDITIONAL VIEW
          <ReadAloudButton isSpeaking={isSpeaking} onStart={() => {
            const introTitle = "20. ADDITIONAL VIEW";
            const introSubtitle = "Creating and managing specialized cross-sections, details, and isometric projections in 2D drafting.";
            const currentSteps = subLessonId === "2d-additional-view-1" ? additionalView1Steps :
                                subLessonId === "2d-additional-view-2" ? additionalView2Steps :
                                subLessonId === "2d-additional-view-3" ? additionalView3Steps : additionalView4Steps;
            speak([introTitle, introSubtitle, ...currentSteps]);
          }}
            onStop={stop}
          />
        </h3>
        <p className={`lesson-subtitle ${currentIndex === 1 ? "reading-active" : ""}`} data-reading-index="1">
          Creating and managing specialized cross-sections, details, and isometric projections in 2D drafting.
        </p>
      </section>
      <div className="lesson-grid single-card">
        <div className="lesson-card">
          {" "}
          {subLessonId === "2d-additional-view-1" ? (
            <div className="flex-col">
              {" "}
              {/* a. Cross Section View Section */}
              <div id="cross-section-view" className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2">
                <div className="step-header" style={{ marginBottom: "1rem" }}>
                  <span className="step-number">a.</span>
                  <span className="step-label">Cross Section View</span>
                </div>
                {/* Steps 1-4 */}
                <div>
                  <img src={additionalView1Img1} alt="Cross Section View Steps 1-4" className="software-screenshot screenshot-wide" />
                </div>{" "}
              </div>{" "}
              {/* Footer Note */}
              <div className="info-box">
                <p>
                  {" "}
                  <div className="red-text"><strong>Note:</strong></div>The text height of the section name should be the same
                  with dimension text height.
                </p>
              </div>
            </div>
          ) : subLessonId === "2d-additional-view-2" ? (
            <div className="flex-col">
              {" "}
              {/* b. Partial Section Section */}
              <div id="partial-section" className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2">
                {" "}
                <div className="step-header" style={{ marginBottom: "1rem" }}>
                  <span className="step-number">b.</span>
                  <span className="step-label">Partial Section</span>
                </div>
                <p className="p-flush" style={{ marginBottom: "1rem" }}>
                  - use to make a cross-section of a part partially
                </p>
                <div>
                  <img src={additionalView2ImgB} alt="Partial Section Operations" className="software-screenshot screenshot-wide" />
                </div>
              </div>{" "}
              {/* c. Detail Drawing Section */}
              <div id="detail-drawing" className={`instruction-step ${currentIndex === 3 ? "reading-active" : ""}`} data-reading-index="3">
                {" "}
                <div className="step-header" style={{ marginBottom: "1rem" }}>
                  <span className="step-number">c.</span>
                  <span className="step-label">Detail drawing</span>
                </div>
                <p className="p-flush" style={{ marginBottom: "1rem" }}>use to detail a view on a bigger scale from a different view. </p>


                <div>
                  <img src={additionalView2ImgC} alt="Detail Drawing Procedure" className="software-screenshot screenshot-wide" />
                </div>
              </div>
            </div>
          ) : subLessonId === "2d-additional-view-3" ? (
            <div className="flex-col">
              {" "}
              {/* d. Isometric View Section */}
              <div id="isometric-view" className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2">
                <div className="step-header" style={{ marginBottom: "1rem" }}>
                  <span className="step-number">d.</span>
                  <span className="step-label">Isometric View</span>
                </div>
                <div>
                  <img src={additionalView3ImgD} alt="Isometric View Steps" className="software-screenshot screenshot-wide" />
                </div>
              </div>{" "}
              {/* e. Cross-sectional depth Section */}
              <div id="cross-sectional-depth" className={`instruction-step ${currentIndex === 3 ? "reading-active" : ""}`} data-reading-index="3">
                {" "}
                <div className="step-header" style={{ marginBottom: "1rem" }}>
                  <span className="step-number">e.</span>
                  <span className="step-label">Cross-sectional depth</span>
                </div>
                <p style={{ marginBottom: "1rem" }}>
                  There are some instances that the cross-sectional view have
                  parts which is not related to the desired view to be seen, we
                  can set the cross-sectional depth to eliminate the unnecessary
                  parts.
                </p>
                <div>
                  <img src={additionalView3ImgE} alt="Cross-sectional depth Steps" className="software-screenshot screenshot-wide" />
                </div>
              </div>
            </div>
          ) : subLessonId === "2d-additional-view-4" ? (
            <div className="flex-col">
              {" "}
              {/* f. Trim Section */}
              <div id="trim-view" className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2">
                <div className="step-header" style={{ marginBottom: "1rem" }}>
                  <span className="step-number">f.</span>
                  <span className="step-label">Trim</span>
                </div>
                <p style={{ marginBottom: "1rem" }}>
                  Another way to eliminate parts that are not needed on a certain view. This can not be applied on Detail Drawing.
                </p>
                <div>
                  <img src={additionalView4ImgF} alt="Trim View Steps" className="software-screenshot screenshot-wide" />
                </div>
              </div>
            </div>
          ) : (
            <div className="content-placeholder">
              <p>
                Lesson content for
                {subLessonId} will be provided soon.
              </p>
            </div>
          )}{" "}
          {/* Navigation */}
          <div className="lesson-navigation">
            {" "}
            <button className="nav-button" onClick={onPrevLesson}>
              {" "}
              <ChevronLeft size={18} /> Previous{" "}
            </button>{" "}
            <button className="nav-button next" onClick={onNextLesson}>
              {" "}
              {nextLabel || 'Next Lesson'} <ChevronRight size={18} />{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdditionalViewLesson;



