import React from 'react';
import { ArrowRight } from 'lucide-react';
import '../../styles/2D_Drawing/CourseLesson.css';
import '../../styles/2D_Drawing/2D_AdditionalView.css';

const AdditionalViewLesson: React.FC = () => {
  return (
    <div className="course-lesson-container">
      <section className="lesson-intro">
        <h3><ArrowRight size={28} className="lesson-intro-icon" /> Additional View (4)</h3>
        <p>This lesson covers Additional Views in 2D Drawing.</p>
      </section>
      <div className="lesson-grid single-card">
        <div className="lesson-card">
          <p>Placeholder for Additional View content. Sub-lessons: (4)</p>
        </div>
      </div>
    </div>
  );
};

export default AdditionalViewLesson;
