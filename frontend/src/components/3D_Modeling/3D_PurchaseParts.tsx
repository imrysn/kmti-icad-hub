/**
 * 3D_PurchaseParts.tsx — 3D Purchase Parts lessons
 */
import React from 'react';
import { ChevronLeft, ChevronRight, Package } from 'lucide-react';
import '../../styles/3D_Modeling/CourseLesson.css';

// Assets
import purchasePartsFlowchart from '../../assets/3D_Image_File/3d_purchase_parts.jpg';
import uploadingFlowchart from '../../assets/3D_Image_File/3d_purchase.jpg';

interface PurchasePartsLessonProps {
  subLessonId?: string;
  onNextLesson?: () => void;
}

const PurchasePartsLesson: React.FC<PurchasePartsLessonProps> = ({ subLessonId = 'purchase-parts-1', onNextLesson }) => {
  const isPart1 = subLessonId === 'purchase-parts-1';

  return (
    <div className="course-lesson-container">
      <section className="lesson-intro">
        <h3><Package size={28} className="lesson-intro-icon" /> {isPart1 ? '3D PURCHASE PARTS' : 'UPLOADING TO SERVER'}</h3>
        <p>
          {isPart1
            ? 'Workflow for handling 3D modeling of purchased parts, from server check to final storage.'
            : 'Workflow for uploading and categorizing purchase parts data on the server.'}
        </p>
      </section>

      <div className="lesson-grid single-card">
        <div className="lesson-card">
          <div className="lesson-content fade-in">
            <h3 className="section-title">{isPart1 ? 'PURCHASE PART 3D MODELING FLOWCHART' : 'SAMPLE FLOW CHART FOR UPLOADING PURCHASE PARTS ON THE SERVER'}</h3>
            <div className="image-wrapper-flush" style={{ marginTop: '2rem', textAlign: 'center' }}>
              <img
                src={isPart1 ? purchasePartsFlowchart : uploadingFlowchart}
                alt={isPart1 ? "Purchase Part 3D Modeling Flowchart" : "Sample Flow Chart for Uploading Purchase Parts on the Server"}
                className="software-screenshot"
                style={{ maxWidth: '100%', height: 'auto', border: '1px solid #eee' }}
              />
            </div>
          </div>

          <div className="lesson-navigation">
            <button className="nav-button" disabled={isPart1} onClick={() => {}}>
              <ChevronLeft size={18} /> Previous
            </button>
            <button className="nav-button next" onClick={onNextLesson}>
              {isPart1 ? 'Next Lesson' : 'Finish'} <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchasePartsLesson;
