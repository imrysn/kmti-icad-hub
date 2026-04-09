import React, { useState, useEffect, useRef } from "react";

import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react'; import { ReadAloudButton } from "../ReadAloudButton";
import { useTTS } from "../../hooks/useTTS";

import "../../styles/2D_Drawing/CourseLesson.css";
/* Importing assets for Additional View (1) */

import additionalView1Img1 from "../../assets/2D_Image_File/2D_additional_view(1)_a.png";

import additionalView1Img2 from "../../assets/2D_Image_File/2D_additional_view(1)_a2.png";
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
  const [scrollProgress, setScrollProgress] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const { speak, stop, isSpeaking } = useTTS();

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
      currentContainer.addEventListener("scroll", handleScroll);
      handleScroll();
    }

    return () => currentContainer?.removeEventListener("scroll", handleScroll);
  }, [subLessonId]);

  return (
    <div className="course-lesson-container" ref={containerRef}>
      {" "}
      {/* Sticky Progress Bar */}
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>
      <section className="lesson-intro">
        <h3 className="section-title">
          {" "}
          20. ADDITIONAL
          VIEW
          <ReadAloudButton isSpeaking={isSpeaking} onStart={() => {
            if (subLessonId === "2d-additional-view-1") speak(additionalView1Steps);
            else if (subLessonId === "2d-additional-view-2") speak(additionalView2Steps);
            else if (subLessonId === "2d-additional-view-3") speak(additionalView3Steps);
            else if (subLessonId === "2d-additional-view-4") speak(additionalView4Steps);
          }}
            onStop={stop}
          />
        </h3>
      </section>
      <div className="lesson-grid single-card">
        <div className="lesson-card">
          {" "}
          {subLessonId === "2d-additional-view-1" ? (
            <div className="flex-col">
              {" "}
              {/* a. Cross Section View Section */}
              <div id="cross-section-view">
                {" "}
                <h4> a. Cross Section View </h4>
                {/* Steps 1-4 */}
                <div className="flex-row">
                  <div className="image-wrapper-flush" /* sanitized: flex: 1 */>
                    <img src={additionalView1Img1} alt="Cross Section View Steps 1-4" className="software-screenshot screenshot-wide" />
                  </div>
                </div>{" "}
                {/* Step 6 and Dialog Box Content */}
                <div className="flex-row">
                  <div className="image-wrapper-flush">
                    <img src={additionalView1Img2} alt="Cross Section View Dialog and Steps 5-6" className="software-screenshot screenshot-wide" />
                  </div>
                </div>
              </div>{" "}
              {/* Footer Note */}
              <div>
                <p>
                  {" "}
                  Note: The text height of the section name should be the same
                  with dimension text height.
                </p>
              </div>
            </div>
          ) : subLessonId === "2d-additional-view-2" ? (
            <div className="flex-col">
              {" "}
              {/* b. Partial Section Section */}
              <div id="partial-section">
                {" "}
                <h4>
                  {" "}
                  b. Partial Section{" "}
                  <span>
                    - use to make a cross-section of a part partially
                  </span>{" "}
                </h4>
                <div className="flex-row">
                  <div className="image-wrapper-flush" /* sanitized: flex: 1 */>
                    <img src={additionalView2ImgB} alt="Partial Section Operations" className="software-screenshot screenshot-wide" />
                  </div>
                </div>
              </div>{" "}
              {/* c. Detail Drawing Section */}
              <div id="detail-drawing">
                {" "}
                <h4>
                  {" "}
                  c. Detail drawing{" "}
                  <span>
                    - use to detail a view on a bigger scale from a different
                    view.
                  </span>{" "}
                </h4>
                <div className="flex-row">
                  <div className="image-wrapper-flush" /* sanitized: flex: 1 */>
                    <img src={additionalView2ImgC} alt="Detail Drawing Procedure" className="software-screenshot screenshot-wide" />
                  </div>
                </div>
              </div>
            </div>
          ) : subLessonId === "2d-additional-view-3" ? (
            <div className="flex-col">
              {" "}
              {/* d. Isometric View Section */}
              <div id="isometric-view">
                {" "}
                <h4> d. Isometric View </h4>
                <div className="flex-row">
                  <div className="image-wrapper-flush" /* sanitized: flex: 1 */>
                    <img src={additionalView3ImgD} alt="Isometric View Steps" className="software-screenshot screenshot-wide" />
                  </div>
                </div>
              </div>{" "}
              {/* e. Cross-sectional depth Section */}
              <div id="cross-sectional-depth">
                {" "}
                <h4> e. Cross-sectional depth </h4>
                <p>
                  {" "}
                  There are some instances that the cross-sectional view have
                  parts which is not related to the desired view to be seen, we
                  can set the cross-sectional depth to eliminate the unnecessary
                  parts.
                </p>
                <div className="flex-row">
                  <div className="image-wrapper-flush" /* sanitized: flex: 1 */>
                    <img src={additionalView3ImgE} alt="Cross-sectional depth Steps" className="software-screenshot screenshot-wide" />
                  </div>
                </div>
              </div>
            </div>
          ) : subLessonId === "2d-additional-view-4" ? (
            <div className="flex-col">
              {" "}
              {/* f. Trim Section */}
              <div id="trim-view">
                {" "}
                <h4>
                  {" "}
                  f. Trim{" "}
                  <span>
                    - another way to eliminate parts that are not needed on a
                    certain view. This can not be applied on Detail Drawing.
                  </span>{" "}
                </h4>
                <div className="flex-row">
                  <div className="image-wrapper-flush" /* sanitized: flex: 1 */>
                    <img src={additionalView4ImgF} alt="Trim View Steps" className="software-screenshot screenshot-wide" />
                  </div>
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



