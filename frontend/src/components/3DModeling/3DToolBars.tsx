/**
 * 3DToolBars.tsx  —  Tool Bars lesson
 *
 * Lesson-item ID: 'toolbars'
 * No sub-lessons.
 *
 * Contains the ICAD_TOOLBARS data (previously in MentorMode.tsx) and
 * passes it to the reusable <ToolbarExplorer> component.
 *
 * To add a new toolbar: append an entry to ICAD_TOOLBARS below and
 * import its image from src/assets/3D_Image_File/.
 */
import React from 'react';
import ToolbarExplorer from './ToolbarExplorer';
import '../../styles/3DModeling/CourseLesson.css';
import '../../styles/3DModeling/3DToolBars.css';

// Toolbar image imports
import tbFile from '../../assets/3D_Image_File/tool_bars_file.jpg';
import tb2dView from '../../assets/3D_Image_File/tool_bars_2d_view.jpg';
import tbSwitchDisplay from '../../assets/3D_Image_File/tool_bars_switch_display.jpg';
import tbScreenOps from '../../assets/3D_Image_File/tool_bars_screen_operations.jpg';
import tb3dView from '../../assets/3D_Image_File/tool_bars_3d_view.jpg';
import tbUserViews from '../../assets/3D_Image_File/tool_bars_user_views.jpg';
import tbEdit from '../../assets/3D_Image_File/tool_bars_edit.jpg';
import tbShading from '../../assets/3D_Image_File/tool_bars_shading.jpg';
import tbSectionDisplay from '../../assets/3D_Image_File/tool_bars_section_display.jpg';
import tb2dStandard from '../../assets/3D_Image_File/tool_bars_2d_standard_screen.jpg';
import tbSysInfo from '../../assets/3D_Image_File/tool_bars_system_information.jpg';
import tbScreenMem from '../../assets/3D_Image_File/tool_bars_screen_memory.jpg';
import tbEntryControl from '../../assets/3D_Image_File/tool_bars_entry_control.jpg';

import {
  Save, Monitor, Layers, ZoomIn, Box, Compass, Edit2, Sun,
  Scissors, Layout, Info, Cpu, MousePointer2
} from 'lucide-react';

// ── Tool Bars Lesson ───────────────────────────────────────────────────────
// Lesson-item ID: 'toolbars'
// No sub-lessons – single ToolbarExplorer view of available iCAD toolbars.

const ICAD_TOOLBARS = [ // cspell:disable-line
  {
    id: 'file',
    title: 'File',
    description: 'Contains new, open, save, print',
    features: ['New', 'Open', 'Save', 'Print'],
    imageSrc: tbFile,
    icon: <Save size={18} />
  },
  {
    id: '2d-view',
    title: '2D View',
    description: 'Contains Previous View, Switch Views, Next View',
    features: ['Previous View', 'Switch Views', 'Next View'],
    imageSrc: tb2dView,
    icon: <Monitor size={18} />
  },
  {
    id: 'switch-display',
    title: 'Switch Display',
    description: 'Contains Change Projection Method, Switch Dimensions',
    features: ['Projection Method', 'Switch Dimensions'],
    imageSrc: tbSwitchDisplay,
    icon: <Layers size={18} />
  },
  {
    id: 'screen-ops',
    title: 'Screen Operations',
    description: 'Contains Set Zoom Area, Zoom In/Out, Zoom to Fit, Re-Display, Previous Zoom',
    features: ['Zoom Area', 'Zoom In/Out', 'Zoom to Fit', 'Re-Display'],
    imageSrc: tbScreenOps,
    icon: <ZoomIn size={18} />
  },
  {
    id: '3d-view',
    title: '3D View',
    description: 'Contains Top, Front, Right, Left, Back, Bottom, Set a Plane, Set using 3-Points',
    features: ['Top/Front/Right', 'Isometric', 'Set Plane', '3-Points'],
    imageSrc: tb3dView,
    icon: <Box size={18} />
  },
  {
    id: 'user-views',
    title: 'User Views',
    description: 'Contains User View 1,2,3,4 (ISOMETRIC VIEW)',
    features: ['User View 1', 'User View 2', 'User View 3', 'User View 4'],
    imageSrc: tbUserViews,
    icon: <Compass size={18} />
  },
  {
    id: 'edit',
    title: 'Edit',
    description: 'Contains Undo, Redo',
    features: ['Undo', 'Redo'],
    imageSrc: tbEdit,
    icon: <Edit2 size={18} />
  },
  {
    id: 'shading',
    title: 'Shading',
    description: 'Contains Shading, Shading with Frame, Hidden Lines Removed, Wireframe',
    features: ['Shading', 'Shading w/ Frame', 'Hidden Lines', 'Wireframe'],
    imageSrc: tbShading,
    icon: <Sun size={18} />
  },
  {
    id: 'section',
    title: 'Section Display',
    description: 'Contains Open Work Plane, Switch to Section Display',
    features: ['Open Work Plane', 'Switch Section Display'],
    imageSrc: tbSectionDisplay,
    icon: <Scissors size={18} />
  },
  {
    id: '2d-standard',
    title: '2D Standard Screen',
    description: 'Contains Set Standard Screen Range, Set Display Scree, Display Standard Screen',
    features: ['Standard Range', 'Display Screen', 'Display Standard'],
    imageSrc: tb2dStandard,
    icon: <Layout size={18} />
  },
  {
    id: 'sys-info',
    title: 'System Information',
    description: 'Setting for attributes of entities to be created',
    features: ['Line Type', 'Color', 'Layer', 'Scale', 'Grid'],
    imageSrc: tbSysInfo,
    icon: <Info size={18} />
  },
  {
    id: 'screen-mem',
    title: 'Screen Memory',
    description: 'Stores the currently displayed screen',
    features: ['Memory Slots 1-6'],
    imageSrc: tbScreenMem,
    icon: <Cpu size={18} />
  },
  {
    id: 'entry-control',
    title: 'Entry Control',
    description: 'The method for entity selection and coordinate entry can be specified',
    features: ['Entity Selection', 'Coordinate Entry', 'AP/Magnet Tools'],
    imageSrc: tbEntryControl,
    icon: <MousePointer2 size={18} />
  },
];

const ToolBarsLesson: React.FC = () => {
  return (
    <div className="interactive-toolbars-lesson">
      <p style={{ marginBottom: '2rem', color: '#64748b' }}>
        Select a toolbar from the side navigation to explore active commands and features available in each category.
      </p>
      <ToolbarExplorer toolbars={ICAD_TOOLBARS} />
    </div>
  );
};

export default ToolBarsLesson;
