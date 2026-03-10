import React from 'react';
import { ArrowRight } from 'lucide-react';
import '../../styles/2D_Drawing/CourseLesson.css';
import '../../styles/2D_Drawing/2D_OperalView.css';

const OperalViewLesson: React.FC = () => {
  return (
    <div className="course-lesson-container">
      <section className="lesson-intro">
        <h3><ArrowRight size={28} className="lesson-intro-icon" /> Operal View (2)</h3>
        <p>This lesson covers Operal Views in 2D Drawing.</p>
      </section>
      <div className="lesson-grid single-card">
        <div className="lesson-card">
          <p>Placeholder for Operal View content. Sub-lessons: (2)</p>
        </div>
      </div>
    </div>
  );
};

export default OperalViewLesson;
