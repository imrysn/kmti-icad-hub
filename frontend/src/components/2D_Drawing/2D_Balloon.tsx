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
            <div className="flex-row">
              <div className="flex-col">
                <div className="info-box">
                  <p>
                    {" "}
                    Select the command for part balloon. Click{" "}
                    <strong>L1</strong> of the part that needs balloon, then{" "}
                    <strong>P1</strong> to locate it properly.
                  </p>
                </div>

                <div className="image-wrapper-flush">
                  <img src={balloonPartDiagramImg} alt="Part Balloon Landmark Diagram (P1, L1)" className="software-screenshot screenshot-wide" />{" "}
                  {/* Part Balloon Input Box Overlay */}
                  <div>
                    <img src={balloonPartInputImg} alt="Part Balloon Input Box" />
                  </div>
                </div>
              </div>

              <div className="info-box">
                <p>
                  {" "}
                  A balloon will be placed where the part image is clearly
                  shown.
                  <br />
                  <br /> <strong>Notes:</strong>
                  <br /> 1. Balloons should not overlap with other lines or
                  dimensions.
                  <br />
                  <br /> 2. If the details on the BOM are properly linked, part
                  balloons are automatically displayed.
                  <br />
                  <br /> 3. If part balloon is not displayed, the drawing and
                  the BOM properties is not linked. Do not manually input the
                  letters / numbers in item entry box.
                  <br />
                  <br /> 4. Text should not change using edit characters.
                </p>
              </div>
            </div>
          </div>{" "}
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



