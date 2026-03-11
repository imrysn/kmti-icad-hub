import React from 'react';
import { ArrowRight } from 'lucide-react';
import '../../styles/2D_Drawing/CourseLesson.css';
import '../../styles/2D_Drawing/2D_Dimensioning.css';

const DimensioningLesson: React.FC = () => {
  return (
    <div className="course-lesson-container">
      <section className="lesson-intro">
        <h3><ArrowRight size={28} className="lesson-intro-icon" /> Dimensioning (5)</h3>
        <p>This lesson covers Dimensioning in 2D Drawing.</p>
      </section>
      <div className="lesson-grid single-card">
        <div className="lesson-card">
          <p>Placeholder for Dimensioning content. Sub-lessons: (5)</p>
        </div>
      </div>
    </div>
  );
};

export default DimensioningLesson;
