import React from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLessonCore } from "../../hooks/useLessonCore";
import { ReadAloudButton } from "../ReadAloudButton";
import InteractiveImageMap from "./InteractiveImageMap";
import icadWindowStructure from "../../assets/3D_Image_File/icad_window_structure.png";
import "../../styles/3D_Modeling/CourseLesson.css";

interface IcadInterfaceLessonProps {
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
  nextLabel?: string;
}

const IcadInterfaceLesson: React.FC<IcadInterfaceLessonProps> = ({ onNextLesson, onPrevLesson, nextLabel }) => {
  const {
    scrollProgress,
    containerRef,
    speak,
    stop,
    isSpeaking
  } = useLessonCore('interface');

  const interfaceSteps = [
    "iCAD Window Structure: The workspace is divided into several key functional areas designed for maximum modeling efficiency.",
    "Navigation and Commands: Use the pulsing hotspots on the diagram to explore the specific purpose of the command menus, the hierarchical tree view, and the primary 3D viewport where your designs come to life."
  ];

  return (
    <div className="course-lesson-container" ref={containerRef}>
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      <section className="lesson-intro">
        <h3 className="section-title">
          <span>iCAD Window Interface</span>
          <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(interfaceSteps)} onStop={stop} />
        </h3>
        <p className="section-description">
          Explore the core workspace of iCAD. Select a pulsing hotspot on the interface diagram to learn about its specific functions.
        </p>
      </section>

      <div className="lesson-content-main animate-in">
        <InteractiveImageMap imageSrc={icadWindowStructure} />
        
        <div className="lesson-navigation">
          <button className="nav-button" onClick={onPrevLesson} disabled={!onPrevLesson}>
            <ChevronLeft size={18} /> Previous Lesson
          </button>

          <button className="nav-button next" onClick={onNextLesson} disabled={!onNextLesson}>
            {nextLabel || 'Next Lesson'} <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default IcadInterfaceLesson;
