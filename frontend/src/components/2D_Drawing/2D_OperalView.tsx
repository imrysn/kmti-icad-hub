import React, { useState, useEffect, useRef } from "react";

import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react'; import { ReadAloudButton } from "../ReadAloudButton";
import { useTTS } from "../../hooks/useTTS";

import "../../styles/2D_Drawing/CourseLesson.css";
/* Importing assets for Operate View (1) */

import operateView1ImgA from "../../assets/2D_Image_File/2D_operate_view(1)_a.jpg";

import operateView1ImgA1 from "../../assets/2D_Image_File/2D_operate_view(1)_a1.jpg";

import operateView1ImgB2 from "../../assets/2D_Image_File/2D_operate_view(1)_b2.jpg";

import operateView1ImgB2_2 from "../../assets/2D_Image_File/2D_operate_view(1)_b2_2.png";

interface OperalViewLessonProps {
  nextLabel?: string;
  subLessonId?: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const OperalViewLesson: React.FC<OperalViewLessonProps> = ({
  subLessonId = "2d-operate-view-1",
  onNextLesson,
  onPrevLesson, nextLabel }) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const { speak, stop, isSpeaking } = useTTS();

  const operateSteps = [
    "Move View: Use this command to reposition your technical views on the template. For Isometric views, you can move them freely. For Orthographic views, use the alignment tools to ensure they remain parallel and correctly projected from one another."
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
          21. Operate View
          <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(operateSteps)}
            onStop={stop}
          />
        </h3>
      </section>
      <div className="lesson-grid single-card">
        <div className="lesson-card">
          {" "}
          {subLessonId === "2d-operate-view-1" ? (
            <div className="flex-col">
              {" "}
              {/* a. Move view */}
              <div id="move-view">
                {" "}
                <h4> a. Move view </h4>
                <div className="flex-row">
                  <div className="image-wrapper-flush" /* sanitized: flex: 1 */>
                    <img src={operateView1ImgA} alt="Move View" className="software-screenshot screenshot-wide" />
                  </div>
                </div>
              </div>{" "}
              {/* a.1) Isometric view */}
              <div id="isometric-view-move">
                {" "}
                <h4> a.1) Isometric view </h4>
                <div className="flex-row">
                  <div className="image-wrapper-flush" /* sanitized: flex: 1 */>
                    <img src={operateView1ImgA1} alt="Isometric View Move" className="software-screenshot screenshot-wide" />
                  </div>
                </div>
              </div>{" "}
              {/* b.2) Orthographic view */}
              <div id="orthographic-view-move">
                {" "}
                <h4> b.2) Orthographic view </h4>
                <div className="flex-col">
                  <div className="image-wrapper-flush">
                    <img src={operateView1ImgB2} alt="Orthographic View Move" className="software-screenshot screenshot-wide" />
                  </div>

                  <div className="image-wrapper-flush">
                    <img src={operateView1ImgB2_2} alt="Orthographic View Align" className="software-screenshot screenshot-wide" />
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

export default OperalViewLesson;



