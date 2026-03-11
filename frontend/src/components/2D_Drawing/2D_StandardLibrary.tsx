import React from 'react';
import { ArrowRight } from 'lucide-react';
import '../../styles/2D_Drawing/CourseLesson.css';
import '../../styles/2D_Drawing/2D_StandardLibrary.css';

const StandardLibraryLesson: React.FC = () => {
  return (
    <div className="course-lesson-container">
      <section className="lesson-intro">
        <h3><ArrowRight size={28} className="lesson-intro-icon" /> Standard Part Library</h3>
        <p>This lesson covers the Standard Part Library in 2D Drawing.</p>
      </section>
      <div className="lesson-grid single-card">
        <div className="lesson-card">
          <p>Placeholder for Standard Part Library content.</p>
        </div>
      </div>
    </div>
  );
};

export default StandardLibraryLesson;
