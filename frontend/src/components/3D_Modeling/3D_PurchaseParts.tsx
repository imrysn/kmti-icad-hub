/** * 3D_PurchaseParts.tsx – 3D Purchase Parts lessons */

import React from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLessonCore } from "../../hooks/useLessonCore";
import { ReadAloudButton } from "../ReadAloudButton";
import "../../styles/3D_Modeling/CourseLesson.css";

/* Assets */
import purchasePartsFlowchart from "../../assets/3D_Image_File/3d_purchase_parts.png";
import uploadingFlowchart from "../../assets/3D_Image_File/3d_purchase.png";

interface PurchasePartsLessonProps {
  nextLabel?: string;
  subLessonId?: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const PurchasePartsLesson: React.FC<PurchasePartsLessonProps> = ({ subLessonId = "purchase-parts-1", onNextLesson, onPrevLesson, nextLabel }) => {
  const {
    scrollProgress,
    containerRef,
    speak,
    stop,
    isSpeaking
  } = useLessonCore(subLessonId);

  const purchaseSteps = [
    "Purchase Part 3D Modeling: Follow the technical flowchart to understand the relationship between vendor data, ICAD formatting, and final assembly integration.",
    "Uploading Parts: Once the 3D model is finalized, follow the server upload protocol to synchronize the purchase part with the central repository for project-wide use."
  ];

  const isPart1 = subLessonId === "purchase-parts-1";

  return (
    <div className="course-lesson-container" ref={containerRef}>
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      <section className="lesson-intro">
        <h3 className="section-title">
          {isPart1
            ? "Purchase part 3d modeling"
            : "Sample flow chart for uploading purchase parts on the server"}
          <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(purchaseSteps)} onStop={stop} />
        </h3>
      </section>

      <div className="lesson-grid single-card">
        <div className="lesson-card">
          <div className="tab-pane fade-in">
            <div className="image-wrapper-flush">
              <img
                src={isPart1 ? purchasePartsFlowchart : uploadingFlowchart}
                alt={isPart1 ? "Purchase Part 3D Modeling Flowchart" : "Sample Flow Chart for Uploading Purchase Parts on the Server"}
                className="software-screenshot screenshot-wide"
                style={{ height: '830px', width: '700px', marginLeft: '100px' }}
              />
            </div>
          </div>

          <div className="lesson-navigation">
            <button className="nav-button" onClick={onPrevLesson}>
              <ChevronLeft size={18} /> Previous
            </button>
            <button className="nav-button next" onClick={onNextLesson}>
              {nextLabel || 'Next Lesson'} <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchasePartsLesson;
