import React from 'react';
import { ArrowRight } from 'lucide-react';
import '../../styles/2D_Drawing/CourseLesson.css';
import '../../styles/2D_Drawing/2D_HeatTreatment.css';

const HeatTreatmentLesson: React.FC = () => {
  return (
    <div className="course-lesson-container">
      <section className="lesson-intro">
        <h3><ArrowRight size={28} className="lesson-intro-icon" /> Heat Treatment (4)</h3>
        <p>This lesson covers Heat Treatment specifications in 2D Drawing.</p>
      </section>
      <div className="lesson-grid single-card">
        <div className="lesson-card">
          <p>Placeholder for Heat Treatment content. Sub-lessons: (4)</p>
        </div>
      </div>
    </div>
  );
};

export default HeatTreatmentLesson;
