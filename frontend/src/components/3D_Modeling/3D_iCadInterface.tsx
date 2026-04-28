import React, { useState, useEffect, useRef } from "react";
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
    isSpeaking,
    currentIndex,
    currentCharIndex
  } = useLessonCore('interface');

  const interfaceSteps = [
    "iCAD Window Structure: The workspace is divided into several key functional areas designed for maximum modeling efficiency.",
    "Navigation and Commands: Use the pulsing hotspots on the diagram to explore the specific purpose of the command menus, the hierarchical tree view, and the primary 3D viewport where your designs come to life.",
    "Title bar: Displays the name of the program and typically the name of the currently active document.",
    "Menu bar: Contains drop down menus such as File, View, Information, Set, Tool, Window and Help.",
    "Command Menu: Contains sets of available commands associated with different functions. Preferably use on 2D.",
    "Tree view: Displays the 3D parts and groups for the drawing currently being worked on.",
    "Workspace: Area where 3D Modeling and Assembly operations are done.",
    "Icon Menu: Contains commands to perform operations on 3D Modeling. Other options can be found on the command menu.",
    "Item Entry: Used for entering the values and characters necessary for command execution.",
    "Key Entry: Coordinates and other values can be entered from the Key Entry Area.",
    "Tool Bar: Contains set of tool bars that can be display or hide. These tool bars are the following.",
    "Message Pane: Displays messages related to operations. Messages displayed in red are error messages."
  ];

  return (
    <div className={`course-lesson-container ${isSpeaking && currentIndex < 2 ? 'is-reading' : ''}`} ref={containerRef}>
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      <section 
        className={`lesson-intro ${isSpeaking && currentIndex === 0 ? 'reading-active' : ''}`}
        data-reading-index="0"
      >
        <h3 className="section-title">
          <span>iCAD Window Structure</span>
          <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(interfaceSteps, 0)} onStop={stop} />
        </h3>
        <p className="section-description">
          Explore the core workspace of iCAD. Select a pulsing hotspot on the interface diagram to learn about its specific functions.
        </p>
      </section>

      <div className="lesson-grid single-card">
        <div 
          className={`lesson-card tab-content fade-in ${isSpeaking && currentIndex === 1 ? 'reading-active' : ''}`}
          data-reading-index="1"
        >
          <div className="card-header">
            <h3>iCAD Window Structure Overview</h3>
            <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(interfaceSteps, 1)} onStop={stop} />
          </div>
          <p className="p-flush mb-8">Hover over the pulsing hotspots to learn about each area of the iCAD interface.</p>

          <InteractiveImageMap 
            imageSrc={icadWindowStructure} 
            externalIndex={currentIndex - 2} 
            externalCharIndex={currentCharIndex}
          />

          <div className="lesson-navigation">
            <button className="nav-button" onClick={onPrevLesson}><ChevronLeft size={18} /> Previous</button>
            <button className="nav-button next" onClick={onNextLesson}>{nextLabel || 'Next Lesson'} <ChevronRight size={18} /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IcadInterfaceLesson;
