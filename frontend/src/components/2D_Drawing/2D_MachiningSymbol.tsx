import React from 'react';
import { ArrowRight } from 'lucide-react';
import '../../styles/2D_Drawing/CourseLesson.css';
import '../../styles/2D_Drawing/2D_MachiningSymbol.css';

const MachiningSymbolLesson: React.FC = () => {
  return (
    <div className="course-lesson-container">
      <section className="lesson-intro">
        <h3><ArrowRight size={28} className="lesson-intro-icon" /> Machining Symbol</h3>
        <p>This lesson covers Machining Symbols in 2D Drawing.</p>
      </section>
      <div className="lesson-grid single-card">
        <div className="lesson-card">
          <p>Placeholder for Machining Symbol content.</p>
        </div>
      </div>
    </div>
  );
};

export default MachiningSymbolLesson;
