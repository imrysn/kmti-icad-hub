import React, { useState, useEffect, useRef } from "react";

import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";

import "../../styles/2D_Drawing/CourseLesson.css";
/* Importing assets for Heat Treatment */

import heatTreatmentImg1 from "../../assets/2D_Image_File/2D_heat_treatment_(1).jpg";

import heatTreatmentImg2 from "../../assets/2D_Image_File/2D_heat_treatment_(2).jpg";

import heatTreatmentProcessImg2 from "../../assets/2D_Image_File/2D_heat_treatment_(2)_heat_treatment_process.jpg";

import heatTreatmentProcessImg3 from "../../assets/2D_Image_File/2D_heat_treatment_(3)_heat_treatment_process.jpg.png";

import heatTreatmentProcessImg4 from "../../assets/2D_Image_File/2D_heat_treatment_(4)_heat_treatment_process.jpg";

interface HeatTreatmentLessonProps {
  subLessonId?: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const HeatTreatmentLesson: React.FC<HeatTreatmentLessonProps> = ({
  subLessonId = "2d-heat-treatment-1",
  onNextLesson,
  onPrevLesson,
}) => {
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
        <div
          className="lesson-progress-bar"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
      <section className="lesson-intro">
        <h3 className="section-title">
          {" "}
          <ArrowLeft size={28} className="lesson-intro-icon" /> Heat Treatment (
          {subLessonId.split("-").pop()})
        </h3>

        <p className="lesson-subtitle">
          {" "}
          Technical specifications and reference data for engineering heat
          treatment processes including thermal refining, hardening, and
          nitriding.
        </p>
      </section>
      <div className="lesson-grid single-card">
        <div className="lesson-card">
          <div className="flex-col">
            {" "}
            {subLessonId === "2d-heat-treatment-1" ? (
              <div className="lesson-section">
                <div className="image-wrapper-flush">
                  <img
                    src={heatTreatmentImg1}
                    alt="Heat Treatment Material and Specification Table"
                    className="software-screenshot screenshot-wide"
                  />
                </div>
              </div>
            ) : subLessonId === "2d-heat-treatment-2" ? (
              <div className="flex-col">
                {" "}
                {/* Part 2 - Material Table Continuation */}
                <div className="lesson-section">
                  <div className="image-wrapper-flush">
                    <img
                      src={heatTreatmentImg2}
                      alt="Heat Treatment Material and Specification Table Continued"
                      className="software-screenshot screenshot-wide"
                    />
                  </div>
                </div>{" "}
                {/* Rev Notes Section */}
                <div className="lesson-section">
                  <div className="flex-col">
                    {" "}
                    {[
                      { rev: "Rev2", text: "Expression of hardness" },

                      {
                        rev: "Rev3",
                        text: "KEM Style is the same as usual. Follow JIS for English words",
                      },

                      {
                        rev: "Rev6",
                        text: "It's hard to make warp because parsonite hardening process treatment is done by 480°C. Ion nitriding treatment is done by 580°C. We set HV400 and HV300 to cut treatment time to avoid a warp.",
                      },

                      {
                        rev: "Rev9",
                        text: "Traditionally, the blade of SW is HS78±2, and results of checking hardness is 78 or 79. Also, there is no report about performance, so we keep this hardness standard.",
                      },

                      {
                        rev: "Rev10",
                        text: "We have changed hardness standards of through hardening for S50C and S55C and induction hardening.",
                      },

                      {
                        rev: "Rev11",
                        text: "Describe thermal refining hardness for each material. It follows the standard of JIS.",
                      },
                    ].map((item, idx) => (
                      <div key={idx} className="flex-row">
                        {" "}
                        <span>{item.rev}:</span> <span>{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>{" "}
                {/* Heat Treatment Process Table */}
                <div className="lesson-section">
                  {" "}
                  <h4> Heat Treatment Process </h4>
                  <div className="image-wrapper-flush">
                    <img
                      src={heatTreatmentProcessImg2}
                      alt="Heat Treatment Process Table"
                      className="software-screenshot screenshot-wide"
                    />
                  </div>
                </div>
              </div>
            ) : subLessonId === "2d-heat-treatment-3" ? (
              <div className="flex-col">
                <div className="lesson-section">
                  {" "}
                  <h4> Heat Treatment Process (Continued) </h4>
                  <div className="image-wrapper-flush">
                    <img
                      src={heatTreatmentProcessImg3}
                      alt="Heat Treatment Process Table Continued"
                      className="software-screenshot screenshot-wide"
                    />
                  </div>
                </div>
              </div>
            ) : subLessonId === "2d-heat-treatment-4" ? (
              <div className="flex-col">
                <div className="lesson-section">
                  {" "}
                  <h4> Heat Treatment Process (Final) </h4>
                  <div className="image-wrapper-flush">
                    <img
                      src={heatTreatmentProcessImg4}
                      alt="Heat Treatment Process Table Final"
                      className="software-screenshot screenshot-wide"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="content-2d-placeholder">
                <h3>Content coming soon</h3>

                <p>
                  Sub-lesson
                  {subLessonId} content is under implementation.
                </p>
              </div>
            )}
          </div>{" "}
          {/* Navigation */}
          <div className="lesson-navigation">
            {" "}
            <button className="nav-button" onClick={onPrevLesson}>
              {" "}
              <ChevronLeft size={18} /> Previous{" "}
            </button>{" "}
            <button className="nav-button next" onClick={onNextLesson}>
              {" "}
              Next Lesson <ChevronRight size={18} />{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeatTreatmentLesson;
