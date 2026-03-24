/**
 * 3D_iCadInterface.tsx   E iCAD Interface lesson
 *
 * Lesson-item ID: 'interface'
 * No sub-lessons.
 *
 * Wraps the reusable <InteractiveImageMap> component with the
 * iCAD window structure image and all hotspot data defined inside
 * InteractiveImageMap.tsx.
 */
import React, { useState, useEffect, useRef } from 'react';
import { Info, Monitor, Zap, ChevronLeft, ChevronRight } from 'lucide-react';
import InteractiveImageMap from './InteractiveImageMap';
import icadWindowStructure from '../../assets/3D_Image_File/icad_window_structure.jpg'; // cspell:disable-line
import '../../styles/3D_Modeling/CourseLesson.css';

// ── iCAD Interface Lesson ──────────────────────────────────────────────────
// Lesson-item ID: 'interface'
// No sub-lessons  Esingle interactive map view of the iCAD 3D window.

interface IcadInterfaceLessonProps {
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const IcadInterfaceLesson: React.FC<IcadInterfaceLessonProps> = ({ onNextLesson, onPrevLesson }) => {
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
      currentContainer.addEventListener('scroll', handleScroll);
      handleScroll();
    }

    return () => {
      if (currentContainer) {
        currentContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <div className="course-lesson-container" ref={containerRef}>
      {/* Sticky Progress Bar */}
      <div className="lesson-progress-container">
        <div
          className="lesson-progress-bar"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <section className="lesson-intro">
        <h3 className="section-title">
          <Monitor size={28} className="lesson-intro-icon" />
          iCAD WINDOW INTERFACE
        </h3>
      </section>

      <div className="lesson-grid single-card">
        <div className="lesson-card">
          <div className="lesson-content">
            <div className="image-zoom-container">
              <InteractiveImageMap imageSrc={icadWindowStructure} />
            </div>
          </div>
          <div className="lesson-navigation">
            <button className="nav-button" onClick={onPrevLesson} disabled={!onPrevLesson}><ChevronLeft size={18} /> Previous</button>
            <button className="nav-button next" onClick={onNextLesson} disabled={!onNextLesson}>Next Lesson <ChevronRight size={18} /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IcadInterfaceLesson;
