import React from 'react';
import { ArrowRight } from 'lucide-react';
import '../../styles/2D_Drawing/CourseLesson.css';
import '../../styles/2D_Drawing/2D_LineProperties.css';

const LinePropertiesLesson: React.FC = () => {
  return (
    <div className="course-lesson-container">
      <section className="lesson-intro">
        <h3><ArrowRight size={28} className="lesson-intro-icon" /> Line Properties (4)</h3>
        <p>This lesson covers Line Properties in 2D Drawing.</p>
      </section>
      <div className="lesson-grid single-card">
        <div className="lesson-card">
          <p>Placeholder for Line Properties content. Sub-lessons: (4)</p>
        </div>
      </div>
    </div>
  );
};

export default LinePropertiesLesson;
