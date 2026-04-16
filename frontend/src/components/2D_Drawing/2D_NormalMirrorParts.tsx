import React, { useState, useEffect, useRef } from "react";

import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react'; import { ReadAloudButton } from "../ReadAloudButton";
import { useTTS } from "../../hooks/useTTS";

import "../../styles/2D_Drawing/CourseLesson.css";
/* Import images */

import img2 from "../../assets/2D_Image_File/2D_normal_and_mirror_parts(1)_2.png";

import imgA1 from "../../assets/2D_Image_File/2D_normal_and_mirror_parts(2)_a_1.png";

import imgA2 from "../../assets/2D_Image_File/2D_normal_and_mirror_parts(2)_a_2.png";

interface NormalMirrorPartsLessonProps {
  nextLabel?: string;
  subLessonId?: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const NormalMirrorPartsLesson: React.FC<NormalMirrorPartsLessonProps> = ({
  subLessonId = "2d-normal-mirror-1",
  onNextLesson,
  onPrevLesson, nextLabel }) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const { speak, stop, isSpeaking } = useTTS();

  const mirror1Steps = [
    "Definitions: Normal parts use an 'N' designation, while mirror parts are symmetrical, designated with 'A' and 'B' numbers. First, finalize the 'A' drawing completely.",
    "Drafting Rules: Save a copy as the 'B' designation. Mirror the part in 3D, then update the 2D views. Change the right side view to a left side view, update the isometric view, and ensure the title block reflects the new drawing number."
  ];

  const mirror2Steps = [
    "Mirror Command: Use the dedicated mirror command for rapid 2D detailing. Select the entities and define the mirror axis to create symmetrical representations instantly."
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
  }, []);

  return (
    <div className="course-lesson-container" ref={containerRef}>
      {" "}
      {/* Sticky Progress Bar */}
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>{" "}
      {/* Intro Banner */}
      <section className="lesson-intro">
        <h3 className="section-title">
          {" "}
          22. Normal and Mirror parts
          <ReadAloudButton isSpeaking={isSpeaking} onStart={() => {
            if (subLessonId === "2d-normal-mirror-1") speak(mirror1Steps);
            else speak(mirror2Steps);
          }}
            onStop={stop}
          />
        </h3>
      </section>
      <div className="lesson-grid single-card">
        <div className="lesson-card">
          {" "}
          {subLessonId === "2d-normal-mirror-1" ? (
            <div className="normal-mirror-wrapper">
              {" "}
              {/* Definitions */}
              <div className="def-container">
                <div className="def-row">
                  <div className="def-label">
                    {" "}
                    <span className="red-bold">Normal</span>
                  </div>

                  <div className="def-value">
                    {" "}
                    <span>
                      Example drawing number RTXXXXXX
                      <span className="red-bold">N</span>01
                    </span>
                  </div>
                </div>

                <div className="def-row">
                  <div className="def-label">
                    {" "}
                    <span className="red-bold">Mirror parts</span>
                  </div>

                  <div className="def-value">
                    {" "}
                    <span>are parts that are symmetrically the same.</span>
                    <br />{" "}
                    <span>
                      Example drawing number RTXXXXXX
                      <span className="red-bold">A</span>01 &amp; RTXXXXXX
                      <span className="red-bold">B</span>01
                    </span>
                  </div>
                </div>

                <div className="rule-title">
                  {" "}
                  <span className="red-bold">
                    ※ Rule on how to detail a mirror parts
                  </span>
                </div>
              </div>{" "}
              {/* Main Grid Content */}
              <div className="mirror-grid-layout">
                {/* Upper Left & Upper Right Row */}
                <div className="mirror-row flex-top">
                  <div className="mirror-col left-col">
                  </div>

                  <div className="mirror-col right-col">
                    <div className="image-wrapper-flush toolbar-img-wrapper" style={{ width: '100%' }}>
                      <img src={img2} alt="Toolbar" className="software-screenshot toolbar screenshot-wide" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : subLessonId === "2d-normal-mirror-2" ? (
            <div className="normal-mirror-wrapper">
              <div className="step-header">
                <div className="step-number">a</div>{" "}
                <h4>Mirror Command on detailing</h4>
              </div>

              <div className="image-wrapper-flush" style={{ width: '100%' }}>
                <img src={imgA1} alt="Mirror Command Menu" className="software-screenshot screenshot-wide" />
              </div>

              <div className="image-wrapper-bordered" style={{ width: '100%', marginTop: '1.5rem' }}>
                <img src={imgA2} alt="Mirroring result" className="software-screenshot screenshot-wide" />
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

export default NormalMirrorPartsLesson;



