import React from 'react';
import { ArrowRight } from 'lucide-react';
import '../../styles/2D_Drawing/CourseLesson.css';
import '../../styles/2D_Drawing/2D_RevisionCode.css';

const RevisionCodeLesson: React.FC = () => {
  return (
    <div className="course-lesson-container">
      <section className="lesson-intro">
        <h3><ArrowRight size={28} className="lesson-intro-icon" /> Revision Code</h3>
        <p>This lesson covers Revision Codes in 2D Drawing.</p>
      </section>
      <div className="lesson-grid single-card">
        <div className="lesson-card">
          <p>Placeholder for Revision Code content.</p>
        </div>
      </div>
    </div>
  );
};

export default RevisionCodeLesson;
