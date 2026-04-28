import React from "react";
import { ChevronLeft, ChevronRight, Save, Monitor, Layers, ZoomIn, Box, Compass, Edit2, Sun, Scissors, Layout, Info, Cpu, MousePointer2 } from 'lucide-react';
import { useLessonCore } from "../../hooks/useLessonCore";
import { ReadAloudButton } from "../ReadAloudButton";
import ToolbarExplorer from "./ToolbarExplorer";
import "../../styles/3D_Modeling/CourseLesson.css";

/* Toolbar image imports */
import tbFile from "../../assets/3D_Image_File/tool_bars_file.png";
import tb2dView from "../../assets/3D_Image_File/tool_bars_2d_view.png";
import tbSwitchDisplay from "../../assets/3D_Image_File/tool_bars_switch_display.png";
import tbScreenOps from "../../assets/3D_Image_File/tool_bars_screen_operations.png";
import tb3dView from "../../assets/3D_Image_File/tool_bars_3d_view.png";
import tbUserViews from "../../assets/3D_Image_File/tool_bars_user_views.png";
import tbEdit from "../../assets/3D_Image_File/tool_bars_edit.png";
import tbShading from "../../assets/3D_Image_File/tool_bars_shading.png";
import tbSectionDisplay from "../../assets/3D_Image_File/tool_bars_section_display.png";
import tb2dStandard from "../../assets/3D_Image_File/tool_bars_2d_standard_screen.png";
import tbSysInfo from "../../assets/3D_Image_File/tool_bars_system_information.png";
import tbScreenMem from "../../assets/3D_Image_File/tool_bars_screen_memory.png";
import tbEntryControl from "../../assets/3D_Image_File/tool_bars_entry_control.png";

const ICAD_TOOLBARS = [
  { id: "file", title: "File", description: "Contains new, open, save, print", features: ["New", "Open", "Save", "Print"], imageSrc: tbFile, icon: <Save size={18} /> },
  { id: "2d-view", title: "2D View", description: "Contains Previous View, Switch Views, Next View", features: ["Previous View", "Switch Views", "Next View"], imageSrc: tb2dView, icon: <Monitor size={18} /> },
  { id: "switch-display", title: "Switch Display", description: "Contains Change Projection Method, Switch Dimensions", features: ["Projection Method", "Switch Dimensions"], imageSrc: tbSwitchDisplay, icon: <Layers size={18} /> },
  { id: "screen-ops", title: "Screen Operations", description: "Contains Set Zoom Area, Zoom In/Out, Zoom to Fit, Re-Display, Previous Zoom", features: ["Zoom Area", "Zoom In/Out", "Zoom to Fit", "Re-Display"], imageSrc: tbScreenOps, icon: <ZoomIn size={18} /> },
  { id: "3d-view", title: "3D View", description: "Contains Top, Front, Right, Left, Back, Bottom, Set a Plane, Set using 3-Points", features: ["Top/Front/Right", "Isometric", "Set Plane", "3-Points"], imageSrc: tb3dView, icon: <Box size={18} /> },
  { id: "user-views", title: "User Views", description: "Contains User View 1, 2, 3, 4 (ISOMETRIC VIEWS)", features: ["User View 1",  "User View 2", "User View 3", "User View 4"], imageSrc: tbUserViews, icon: <Compass size={18} /> },
  { id: "edit", title: "Edit", description: "Contains Undo, Redo", features: ["Undo", "Redo"], imageSrc: tbEdit, icon: <Edit2 size={18} /> },
  { id: "shading", title: "Shading", description: "Contains Shading, Shading with Frame, Hidden Lines Removed, Wireframe", features: ["Shading", "Shading w/ Frame", "Hidden Lines", "Wireframe"], imageSrc: tbShading, icon: <Sun size={18} /> },
  { id: "section", title: "Section Display", description: "Contains Open Work Plane, Switch to Section Display", features: ["Open Work Plane", "Switch Section Display"], imageSrc: tbSectionDisplay, icon: <Scissors size={18} /> },
  { id: "2d-standard", title: "2D Standard Screen", description: "Contains Set Standard Screen Range, Set Display Screen, Display Standard Screen", features: ["Standard Range", "Display Screen", "Display Standard"], imageSrc: tb2dStandard, icon: <Layout size={18} /> },
  { id: "sys-info", title: "System Information", description: "Setting for attributes of entities to be created", features: ["Line Type", "Color", "Layer", "Scale", "Grid"], imageSrc: tbSysInfo, icon: <Info size={18} /> },
  { id: "screen-mem", title: "Screen Memory", description: "Stores the currently displayed screen", features: ["Memory Slots 1-6"], imageSrc: tbScreenMem, icon: <Cpu size={18} /> },
  { id: "entry-control", title: "Entry Control", description: "The method for entity selection and coordinate entry can be specified", features: ["Entity Selection", "Coordinate Entry", "AP/Magnet Tools"], imageSrc: tbEntryControl, icon: <MousePointer2 size={18} /> },
];

interface ToolBarsLessonProps {
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
  nextLabel?: string;
}

const ToolBarsLesson: React.FC<ToolBarsLessonProps> = ({ onNextLesson, onPrevLesson, nextLabel }) => {
  const {
    scrollProgress,
    containerRef,
    speak,
    stop,
    isSpeaking
  } = useLessonCore('toolbars');

  const toolbarNarration = [
    "iCAD Toolbars: The software features a comprehensive set of toolbars optimized for both 2D and 3D operations. Each toolbar is designed to provide quick access to essential modeling commands.",
    "Interactive Explorer: Use the interactive toolbar explorer below to see detailed information about each icon group, including File management, View controls, Shading options, and System settings."
  ];

  return (
    <div className="course-lesson-container" ref={containerRef}>
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>


      <div className="lesson-grid single-card">
        <div className="lesson-card tab-content fade-in">
          <div className="card-header">
          <h3>TOOL BARS</h3>
            <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(toolbarNarration)} onStop={stop} />
          </div>
          <p className="p-flush">Click through the categories below to explore the function of each toolbar icon group.</p>
          
          <ToolbarExplorer toolbars={ICAD_TOOLBARS} />

          <div className="lesson-navigation">
            <button className="nav-button" onClick={onPrevLesson}><ChevronLeft size={18} /> Previous</button>
            <button className="nav-button next" onClick={onNextLesson}>{nextLabel || 'Next Lesson'} <ChevronRight size={18} /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolBarsLesson;
