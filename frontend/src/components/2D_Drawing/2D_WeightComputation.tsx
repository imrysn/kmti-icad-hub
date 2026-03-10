import React from 'react';
import { ArrowRight } from 'lucide-react';
import '../../styles/2D_Drawing/CourseLesson.css';
import '../../styles/2D_Drawing/2D_WeightComputation.css';

const WeightComputationLesson: React.FC = () => {
  return (
    <div className="course-lesson-container">
      <section className="lesson-intro">
        <h3><ArrowRight size={28} className="lesson-intro-icon" /> Material Weight Computation</h3>
        <p>This lesson covers Material Weight Computation in 2D Drawing.</p>
      </section>
      <div className="lesson-grid single-card">
        <div className="lesson-card">
          <p>Placeholder for Material Weight Computation content.</p>
        </div>
      </div>
    </div>
  );
};

export default WeightComputationLesson;
