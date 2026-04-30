/** * 3D_PurchaseParts.tsx – 3D Purchase Parts lessons */

import React, { useState, useEffect } from "react";
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
  const [activeTab, setActiveTab] = useState<'part1' | 'part2'>(() => {
    return (localStorage.getItem(`${subLessonId}-tab`) as any) || 'part1';
  });

  const {
    scrollProgress,
    containerRef,
    speak,
    stop,
    isSpeaking,
    currentIndex
  } = useLessonCore(`${subLessonId}-${activeTab}`);

  useEffect(() => {
    localStorage.setItem(`${subLessonId}-tab`, activeTab);
  }, [activeTab, subLessonId]);

  const handleNext = () => {
    if (activeTab === 'part1') {
      setActiveTab('part2');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (onNextLesson) {
      onNextLesson();
    }
  };

  const handlePrev = () => {
    if (activeTab === 'part2') {
      setActiveTab('part1');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (onPrevLesson) {
      onPrevLesson();
    }
  };

  const purchaseSteps = [
    "Purchase Part 3D Modeling: Follow the technical flowchart to understand the relationship between vendor data, ICAD formatting, and final assembly integration.",
    "Uploading Parts: Once the 3D model is finalized, follow the server upload protocol to synchronize the purchase part with the central repository for project-wide use."
  ];

  return (
    <div className={`course-lesson-container ${isSpeaking ? 'is-reading' : ''}`} ref={containerRef}>
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      <div className="lesson-tabs">
        <button className={`tab-button ${activeTab === 'part1' ? 'active' : ''}`} onClick={() => setActiveTab('part1')}>PURCHASE PARTS MODELING</button>
        <button className={`tab-button ${activeTab === 'part2' ? 'active' : ''}`} onClick={() => setActiveTab('part2')}>SERVER UPLOAD PROTOCOL</button>
      </div>



      <div className="lesson-grid single-card">
        <div className={`lesson-card tab-content fade-in ${isSpeaking && currentIndex === 0 ? 'reading-active' : ''}`} data-reading-index="0">
          <div className="fade-in">
            <div className="card-header">
              <h4>{activeTab === 'part1' ? "WORKFLOW OVERVIEW" : "SERVER UPLOAD PROTOCOL"}</h4>
              <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak([purchaseSteps[activeTab === 'part1' ? 0 : 1]])} onStop={stop} />
            </div>

            <div className="screenshot-wrapper" style={{marginTop: "3rem"}}>
              <img
                src={activeTab === 'part1' ? purchasePartsFlowchart : uploadingFlowchart}
                alt={activeTab === 'part1' ? "Purchase Part 3D Modeling Flowchart" : "Sample Flow Chart for Uploading Purchase Parts on the Server"}
                className="software-screenshot screenshot-wide"
              />
            </div>
          </div>  

          <div className="lesson-navigation">
            <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button>
            <button className="nav-button next" onClick={handleNext}>{activeTab === 'part1' ? 'Next Part' : (nextLabel || 'Next Lesson')} <ChevronRight size={18} /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchasePartsLesson;
