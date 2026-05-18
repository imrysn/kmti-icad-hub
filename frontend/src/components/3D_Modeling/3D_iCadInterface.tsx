import React, { useState, useEffect, useRef, useMemo } from "react";
import { ChevronLeft, ChevronRight, Layout, Info, MousePointer2, Zap } from 'lucide-react';
import { useLessonCore } from "../../hooks/useLessonCore";
import { ReadAloudButton } from "../ReadAloudButton";
import { KaraokeLessonText } from "../KaraokeLessonText";
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
    "The workspace is divided into several key functional areas designed for maximum modeling efficiency.",
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

  const interfaceAreas = [
    { id: 1, name: 'Title Bar' },
    { id: 2, name: 'Menu Bar' },
    { id: 3, name: 'Command Menu' },
    { id: 4, name: 'Tree View' },
    { id: 5, name: 'Workspace' },
    { id: 6, name: 'Icon Menu' },
    { id: 7, name: 'Item Entry' },
    { id: 8, name: 'Key Entry' },
    { id: 9, name: 'Tool Bar' },
    { id: 10, name: 'Message Pane' },
  ];

  return (
    <div className={`course-lesson-container`} ref={containerRef}>
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      <section className="lesson-intro">
        <h3 className={`section-title ${currentIndex === 0 ? "reading-active" : ""}`} data-reading-index="0">
          iCAD WINDOW STRUCTURE
          <ReadAloudButton isSpeaking={isSpeaking} onStart={() => {
            const introTitle = "iCAD WINDOW STRUCTURE";
            const introDesc = "Functional areas of the workspace designed for maximum modeling efficiency.";
            speak([introTitle, introDesc, ...interfaceSteps]);
          }} onStop={stop} />
        </h3>
        <p className={`lesson-subtitle ${currentIndex === 1 ? "reading-active" : ""}`} data-reading-index="1">
          Functional areas of the workspace designed for maximum modeling efficiency.
        </p>
      </section>

      {/* Main Interactive Stage */}
      <div className="lesson-grid interactive-layout single-card">
        <div className={`lesson-card tab-content fade-in ${currentIndex >= 2 ? 'reading-active' : ''}`} 
             data-reading-index={currentIndex >= 2 && currentIndex <= 13 ? "2" : undefined}>
          <div className="card-header">
            <div className="header-with-icon">
              <div className="icon-box"><Layout size={18} /></div>
              <h3>iCAD Window Structure</h3>
            </div>
          </div>

          <div className={`compact-intro-area ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2">
            <KaraokeLessonText
              text={interfaceSteps[0]}
              isActive={isSpeaking && currentIndex === 2}
              currentCharIndex={currentCharIndex}
              className="p-flush"
            />
          </div>

          <div className="interactive-stage-container">
            <InteractiveImageMap
              imageSrc={icadWindowStructure}
              externalIndex={currentIndex - 4}
              externalCharIndex={currentCharIndex}
            />
          </div>

          <div className="quick-select-grid">
            <p className="grid-label">QUICK ACCESS AREAS</p>
            <div className="chips-container">
              {interfaceAreas.map((area) => (
                <div
                  key={area.id}
                  className={`area-chip ${currentIndex - 4 === area.id - 1 ? 'active' : ''}`}
                >
                  <span className="chip-index">{area.id}</span>
                  <span className="chip-name">{area.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lesson-navigation">
            <button className="nav-button" onClick={() => { if (onPrevLesson) onPrevLesson(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}><ChevronLeft size={18} /> Previous</button>
            <button className="nav-button next" onClick={() => { if (onNextLesson) onNextLesson(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>{nextLabel || 'Next Lesson'} <ChevronRight size={18} /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IcadInterfaceLesson;

