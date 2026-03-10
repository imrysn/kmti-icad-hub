import React from 'react';
import { ArrowRight } from 'lucide-react';
import '../../styles/2D_Drawing/CourseLesson.css';
import '../../styles/2D_Drawing/2D_SurfaceApplication.css';

const SurfaceApplicationLesson: React.FC = () => {
  return (
    <div className="course-lesson-container">
      <section className="lesson-intro">
        <h3><ArrowRight size={28} className="lesson-intro-icon" /> Application of Surface (2)</h3>
        <p>This lesson covers the application of surface treatments in 2D Drawing.</p>
      </section>
      <div className="lesson-grid single-card">
        <div className="lesson-card">
          <p>Placeholder for Application of Surface content. Sub-lessons: (2)</p>
        </div>
      </div>
    </div>
  );
};

export default SurfaceApplicationLesson;
