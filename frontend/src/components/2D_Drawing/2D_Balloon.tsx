import React, { useState, useEffect, useRef } from "react";

import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react'; import { ReadAloudButton } from "../ReadAloudButton";
import { useTTS } from "../../hooks/useTTS";

import balloonPartMenuImg from "../../assets/2D_Image_File/2D_balloon_part_drawing.png";

import balloonPartDiagramImg from "../../assets/2D_Image_File/2D_balloon_part_drawing_2.jpg";

import balloonPartInputImg from "../../assets/2D_Image_File/2D_balloon_part_drawing_3.png";

import balloonAssemblyMenuImg from "../../assets/2D_Image_File/2D_balloon_assembly_drawing_1.png";

interface BalloonLessonProps {
  nextLabel?: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const BalloonLesson: React.FC<BalloonLessonProps> = ({
  onNextLesson,
  onPrevLesson, nextLabel }) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const { speak, stop, isSpeaking, currentIndex } = useTTS();

  const balloonSteps = [
    "Part Drawing: Select the part balloon command. Click L1 on the part, then P1 to locate the balloon. Note that balloons should not overlap with lines or dimensions.",
    "Assembly Drawing: Select the add balloon command from the icon menu to annotate your assembly drawings."
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
      </div>
      <section className="lesson-intro">
        <h3 className="section-title">
          {" "}
          18. Balloon
          <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(balloonSteps)}
            onStop={stop}
          />
        </h3>
      </section>
      <div className="lesson-grid single-card">
        <div className="lesson-card">
          {" "}
          {/* a. Part drawing Section */}
          <div className={`lesson-section ${currentIndex === 0 ? "reading-active" : ""}`}>
            {" "}
            <h4> a. Part drawing </h4>
            <div className="flex-col">
              <div className="image-wrapper-flush">
                <img src={balloonPartMenuImg} alt="Part Balloon Menu Selection" className="software-screenshot screenshot-wide" />
              </div>
            </div>
            <div className="flex-col">


              <div className="image-wrapper-flush" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
                <img src={balloonPartDiagramImg} alt="Part Balloon Landmark Diagram (P1, L1)" className="software-screenshot" style={{ maxWidth: '400px' }} />
                <div className="flex-col" style={{ width: '100%', alignItems: 'center' }}>
                  <img src={balloonPartInputImg} alt="Part Balloon Input Box" className="software-screenshot screenshot-medium" />
                </div>
              </div>


            </div>          </div>{" "}
          {/* b. Assembly drawing Section */}
          <div className={`lesson-section ${currentIndex === 1 ? "reading-active" : ""}`}>
            {" "}
            <h4> b. Assembly drawing </h4>
            <div className="flex-col">
              <div className="image-wrapper-flush">
                <img src={balloonAssemblyMenuImg} alt="Add Balloon Menu Selection" className="software-screenshot screenshot-wide" />
              </div>
            </div>
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
              {nextLabel || 'Next Lesson'} <ChevronRight size={18} />{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalloonLesson;



