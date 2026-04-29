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
    isSpeaking,
    currentIndex
  } = useLessonCore(subLessonId);

  const purchaseSteps = [
    "Purchase Part 3D Modeling: Follow the technical flowchart to understand the relationship between vendor data, ICAD formatting, and final assembly integration.",
    "Uploading Parts: Once the 3D model is finalized, follow the server upload protocol to synchronize the purchase part with the central repository for project-wide use."
  ];

  const isPart1 = subLessonId === "purchase-parts-1";

  return (
    <div className={`course-lesson-container ${isSpeaking ? 'is-reading' : ''}`} ref={containerRef}>
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      <section className="lesson-intro">
        <h4 className="section-title">
          {isPart1
            ? "Purchase part 3d modeling"
            : "Sample flow chart for uploading purchase parts on the server"}
          <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(isPart1 ? [purchaseSteps[0]] : [purchaseSteps[1]])} onStop={stop} />
        </h4>
      </section>

      <div className="lesson-grid single-card">
        <div className={`lesson-card tab-content fade-in ${isSpeaking && currentIndex === 0 ? 'reading-active' : ''}`} data-reading-index="0">
          <div className="fade-in">
            <div className="card-header">
              <h4>{isPart1 ? "WORKFLOW OVERVIEW" : "SERVER UPLOAD PROTOCOL"}</h4>
              <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(isPart1 ? [purchaseSteps[0]] : [purchaseSteps[1]])} onStop={stop} />
            </div>

            <div className="screenshot-wrapper">
              <img
                src={isPart1 ? purchasePartsFlowchart : uploadingFlowchart}
                alt={isPart1 ? "Purchase Part 3D Modeling Flowchart" : "Sample Flow Chart for Uploading Purchase Parts on the Server"}
                className="software-screenshot screenshot-wide"
              />
            </div>
          </div>

          <div className="lesson-navigation">
            <button className="nav-button" onClick={onPrevLesson}><ChevronLeft size={18} /> Previous</button>
            <button className="nav-button next" onClick={onNextLesson}>{nextLabel || 'Next Lesson'} <ChevronRight size={18} /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchasePartsLesson;
