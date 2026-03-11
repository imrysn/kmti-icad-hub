import React from 'react';
import { ArrowRight } from 'lucide-react';
import '../../styles/2D_Drawing/CourseLesson.css';
import '../../styles/2D_Drawing/2D_WeldingSymbol.css';

const WeldingSymbolLesson: React.FC = () => {
  return (
    <div className="course-lesson-container">
      <section className="lesson-intro">
        <h3><ArrowRight size={28} className="lesson-intro-icon" /> Welding Symbol</h3>
        <p>This lesson covers Welding Symbols in 2D Drawing.</p>
      </section>
      <div className="lesson-grid single-card">
        <div className="lesson-card">
          <p>Placeholder for Welding Symbol content.</p>
        </div>
      </div>
    </div>
  );
};

export default WeldingSymbolLesson;
