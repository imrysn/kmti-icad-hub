/** * 3D_ToolBars.tsx — Tool Bars lesson */

import React, { useState, useEffect, useRef } from "react";

import ToolbarExplorer from "./ToolbarExplorer";

import "../../styles/3D_Modeling/CourseLesson.css";

import { Zap } from "lucide-react";
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

import {
  Save,
  Monitor,
  Layers,
  ZoomIn,
  Box,
  Compass,
  Edit2,
  Sun,
  Scissors,
  Layout,
  Info,
  Cpu,
  MousePointer2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const ICAD_TOOLBARS = [
  {
    id: "file",
    title: "File",
    description: "Contains new, open, save, print",
    features: ["New", "Open", "Save", "Print"],
    imageSrc: tbFile,
    icon: <Save size={18} />,
  },

  {
    id: "2d-view",
    title: "2D View",
    description: "Contains Previous View, Switch Views, Next View",
    features: ["Previous View", "Switch Views", "Next View"],
    imageSrc: tb2dView,
    icon: <Monitor size={18} />,
  },

  {
    id: "switch-display",
    title: "Switch Display",
    description: "Contains Change Projection Method, Switch Dimensions",
    features: ["Projection Method", "Switch Dimensions"],
    imageSrc: tbSwitchDisplay,
    icon: <Layers size={18} />,
  },

  {
    id: "screen-ops",
    title: "Screen Operations",
    description:
      "Contains Set Zoom Area, Zoom In/Out, Zoom to Fit, Re-Display, Previous Zoom",
    features: ["Zoom Area", "Zoom In/Out", "Zoom to Fit", "Re-Display"],
    imageSrc: tbScreenOps,
    icon: <ZoomIn size={18} />,
  },

  {
    id: "3d-view",
    title: "3D View",
    description:
      "Contains Top, Front, Right, Left, Back, Bottom, Set a Plane, Set using 3-Points",
    features: ["Top/Front/Right", "Isometric", "Set Plane", "3-Points"],
    imageSrc: tb3dView,
    icon: <Box size={18} />,
  },

  {
    id: "user-views",
    title: "User Views",
    description: "Contains User View 1,2,3,4 (ISOMETRIC VIEW)",
    features: ["User View 1", "User View 2", "User View 3", "User View 4"],
    imageSrc: tbUserViews,
    icon: <Compass size={18} />,
  },

  {
    id: "edit",
    title: "Edit",
    description: "Contains Undo, Redo",
    features: ["Undo", "Redo"],
    imageSrc: tbEdit,
    icon: <Edit2 size={18} />,
  },

  {
    id: "shading",
    title: "Shading",
    description:
      "Contains Shading, Shading with Frame, Hidden Lines Removed, Wireframe",
    features: ["Shading", "Shading w/ Frame", "Hidden Lines", "Wireframe"],
    imageSrc: tbShading,
    icon: <Sun size={18} />,
  },

  {
    id: "section",
    title: "Section Display",
    description: "Contains Open Work Plane, Switch to Section Display",
    features: ["Open Work Plane", "Switch Section Display"],
    imageSrc: tbSectionDisplay,
    icon: <Scissors size={18} />,
  },

  {
    id: "2d-standard",
    title: "2D Standard Screen",
    description:
      "Contains Set Standard Screen Range, Set Display Scree, Display Standard Screen",
    features: ["Standard Range", "Display Screen", "Display Standard"],
    imageSrc: tb2dStandard,
    icon: <Layout size={18} />,
  },

  {
    id: "sys-info",
    title: "System Information",
    description: "Setting for attributes of entities to be created",
    features: ["Line Type", "Color", "Layer", "Scale", "Grid"],
    imageSrc: tbSysInfo,
    icon: <Info size={18} />,
  },

  {
    id: "screen-mem",
    title: "Screen Memory",
    description: "Stores the currently displayed screen",
    features: ["Memory Slots 1-6"],
    imageSrc: tbScreenMem,
    icon: <Cpu size={18} />,
  },

  {
    id: "entry-control",
    title: "Entry Control",
    description:
      "The method for entity selection and coordinate entry can be specified",
    features: ["Entity Selection", "Coordinate Entry", "AP/Magnet Tools"],
    imageSrc: tbEntryControl,
    icon: <MousePointer2 size={18} />,
  },
];

interface ToolBarsLessonProps {
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const ToolBarsLesson: React.FC<ToolBarsLessonProps> = ({
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

    return () => {
      if (currentContainer) {
        currentContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

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
          <Layout size={28} className="lesson-intro-icon" /> ICAD TOOLBARS
        </h3>
      </section>
      <div className="lesson-grid single-card">
        <div className="lesson-card">
          {" "}
          <ToolbarExplorer toolbars={ICAD_TOOLBARS} />
          <div className="lesson-navigation">
            {" "}
            <button className="nav-button" onClick={onPrevLesson}>
              <ChevronLeft size={18} /> Previous
            </button>{" "}
            <button className="nav-button next" onClick={onNextLesson}>
              Next Lesson <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolBarsLesson;
