import React from 'react';
import { ArrowRight } from 'lucide-react';
import '../../styles/2D_Drawing/CourseLesson.css';
import '../../styles/2D_Drawing/2D_NormalMirrorParts.css';

const NormalMirrorPartsLesson: React.FC = () => {
  return (
    <div className="course-lesson-container">
      <section className="lesson-intro">
        <h3><ArrowRight size={28} className="lesson-intro-icon" /> Normal and Mirror Parts (2)</h3>
        <p>This lesson covers Normal and Mirror Parts in 2D Drawing.</p>
      </section>
      <div className="lesson-grid single-card">
        <div className="lesson-card">
          <p>Placeholder for Normal and Mirror Parts content. Sub-lessons: (2)</p>
        </div>
      </div>
    </div>
  );
};

export default NormalMirrorPartsLesson;
