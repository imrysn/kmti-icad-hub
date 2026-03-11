import React from 'react';
import { ArrowRight } from 'lucide-react';
import '../../styles/2D_Drawing/CourseLesson.css';
import '../../styles/2D_Drawing/2D_OrthographicView.css';

const OrthographicViewLesson: React.FC = () => {
  return (
    <div className="course-lesson-container">
      <section className="lesson-intro">
        <h3><ArrowRight size={28} className="lesson-intro-icon" /> Create Orthographic View (3)</h3>
        <p>This lesson covers the creation of Orthographic Views in 2D Drawing.</p>
      </section>
      <div className="lesson-grid single-card">
        <div className="lesson-card">
          <p>Placeholder for Orthographic View content. Sub-lessons: (3)</p>
        </div>
      </div>
    </div>
  );
};

export default OrthographicViewLesson;
