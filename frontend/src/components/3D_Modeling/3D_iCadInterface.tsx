/**
 * 3D_iCadInterface.tsx  —  iCAD Interface lesson
 *
 * Lesson-item ID: 'interface'
 * No sub-lessons.
 *
 * Wraps the reusable <InteractiveImageMap> component with the
 * iCAD window structure image and all hotspot data defined inside
 * InteractiveImageMap.tsx.
 */
import React from 'react';
import InteractiveImageMap from './InteractiveImageMap';
import icadWindowStructure from '../../assets/3D_Image_File/icad_window_structure.jpg'; // cspell:disable-line
import '../../styles/3D_Modeling/CourseLesson.css';
import '../../styles/3D_Modeling/3D_iCadInterface.css';

// ── iCAD Interface Lesson ──────────────────────────────────────────────────
// Lesson-item ID: 'interface'
// No sub-lessons – single interactive map view of the iCAD 3D window.

const IcadInterfaceLesson: React.FC = () => {
  return (
    <div className="interactive-interface-lesson">
      <InteractiveImageMap imageSrc={icadWindowStructure} />
    </div>
  );
};

export default IcadInterfaceLesson;
