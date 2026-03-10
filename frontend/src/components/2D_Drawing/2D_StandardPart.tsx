import React from 'react';
import { ArrowRight } from 'lucide-react';
import '../../styles/2D_Drawing/CourseLesson.css';
import '../../styles/2D_Drawing/2D_StandardPart.css';

const StandardPartLesson: React.FC = () => {
  return (
    <div className="course-lesson-container">
      <section className="lesson-intro">
        <h3><ArrowRight size={28} className="lesson-intro-icon" /> Standard Part Detail (7)</h3>
        <p>This lesson covers Standard Part Detail in 2D Drawing.</p>
      </section>
      <div className="lesson-grid single-card">
        <div className="lesson-card">
          <p>Placeholder for Standard Part Detail content. Sub-lessons: (7)</p>
        </div>
      </div>
    </div>
  );
};

export default StandardPartLesson;
