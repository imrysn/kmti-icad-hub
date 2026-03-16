/**
 * 3D_PurchaseParts.tsx — 3D Purchase Parts lessons
 */
import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Package, Info } from 'lucide-react';
import '../../styles/3D_Modeling/CourseLesson.css';

// Reusable ProTip Component
const ProTip: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="pro-tip-card">
    <div className="pro-tip-icon-wrapper">
      <Info size={20} />
    </div>
    <div className="pro-tip-content">
      <h5>{title}</h5>
      <div className="pro-tip-text">{children}</div>
    </div>
  </div>
);

// Assets
import purchasePartsFlowchart from '../../assets/3D_Image_File/3d_purchase_parts.jpg';
import uploadingFlowchart from '../../assets/3D_Image_File/3d_purchase.jpg';

interface PurchasePartsLessonProps {
  subLessonId?: string;
  onNextLesson?: () => void;
}

const PurchasePartsLesson: React.FC<PurchasePartsLessonProps> = ({ subLessonId = 'purchase-parts-1', onNextLesson }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const element = containerRef.current;
      const totalHeight = element.scrollHeight - element.clientHeight;
      if (totalHeight === 0) {
        setScrollProgress(100);
        return;
      }
      const progress = (element.scrollTop / totalHeight) * 100;
      setScrollProgress(progress);
    };

    const currentContainer = containerRef.current;
    if (currentContainer) {
      currentContainer.addEventListener('scroll', handleScroll);
      handleScroll();
    }

    return () => {
      if (currentContainer) {
        currentContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, [subLessonId]);

  const isPart1 = subLessonId === 'purchase-parts-1';

  return (
    <div className="course-lesson-container" ref={containerRef}>
      {/* Sticky Progress Bar */}
      <div className="lesson-progress-container">
        <div 
          className="lesson-progress-bar" 
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
      <section className="lesson-intro">
        <h3 className="section-title">
          <Package size={28} className="lesson-intro-icon" /> 
          {isPart1 ? '3D PURCHASE PARTS' : 'UPLOADING TO SERVER'}
        </h3>
        <p className="p-flush">
          {isPart1
            ? 'Workflow for handling 3D modeling of purchased parts, from server check to final storage.'
            : 'Workflow for uploading and categorizing purchase parts data on the server.'}
        </p>
      </section>

      <div className="lesson-grid single-card">
        <div className="lesson-card">
          <div className="lesson-content">
            <div className="tab-pane">
              <div className="instruction-box">
                <p className="p-flush">{isPart1 ? 'PURCHASE PART 3D MODELING FLOWCHART' : 'SAMPLE FLOW CHART FOR UPLOADING PURCHASE PARTS ON THE SERVER'}</p>
              </div>
              <div className="image-wrapper-flush" style={{ marginTop: '1.5rem' }}>
                <img
                  src={isPart1 ? purchasePartsFlowchart : uploadingFlowchart}
                  alt={isPart1 ? "Purchase Part 3D Modeling Flowchart" : "Sample Flow Chart for Uploading Purchase Parts on the Server"}
                  className="software-screenshot screenshot-wide"
                />
              </div>

              <div style={{ marginTop: '2rem' }}>
                <ProTip title={isPart1 ? "Workflow Awareness" : "Server Integrity"}>
                  {isPart1 
                    ? "Understanding this flowchart is essential for efficient collaboration. It ensures that every team member follows the same path for component creation and approval."
                    : "Always categorize parts correctly during upload. This maintains a clean server database and allows for faster retrieval by the procurement and assembly teams."}
                </ProTip>
              </div>
            </div>
          </div>

          <div className="lesson-navigation">
            <button className="nav-button" disabled={isPart1} onClick={() => {}}><ChevronLeft size={18} /> Previous</button>
            <button className="nav-button next" onClick={onNextLesson}>{isPart1 ? 'Next Lesson' : 'Finish'} <ChevronRight size={18} /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchasePartsLesson;
