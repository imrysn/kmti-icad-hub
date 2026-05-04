import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLessonCore } from "../../hooks/useLessonCore";
import { ReadAloudButton } from "../ReadAloudButton";
import { KaraokeLessonText } from "../KaraokeLessonText";
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
    currentIndex,
    currentCharIndex
  } = useLessonCore(`${subLessonId}-${activeTab}`);

  useEffect(() => {
    localStorage.setItem(`${subLessonId}-tab`, activeTab);
  }, [activeTab, subLessonId]);

  const handleNext = () => {
    if (activeTab === 'part1') {
      setActiveTab('part2');
    } else if (onNextLesson) {
      onNextLesson();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrev = () => {
    if (activeTab === 'part2') {
      setActiveTab('part1');
    } else if (onPrevLesson) {
      onPrevLesson();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const introTitle = activeTab === 'part1' ? "PURCHASE PARTS MODELING" : "SERVER UPLOAD PROTOCOL";
  const introSubtitle = activeTab === 'part1' ? 
    "Relationship between vendor data, ICAD formatting, and assembly integration." : 
    "Protocol for synchronizing purchase parts with the central repository.";

  return (
    <div className={`course-lesson-container`} ref={containerRef}>
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      <div className="lesson-tabs">
        <button className={`tab-button ${activeTab === 'part1' ? 'active' : ''}`} onClick={() => setActiveTab('part1')}>PURCHASE PARTS MODELING</button>
        <button className={`tab-button ${activeTab === 'part2' ? 'active' : ''}`} onClick={() => setActiveTab('part2')}>SERVER UPLOAD PROTOCOL</button>
      </div>

      <section className="lesson-intro">
        <h3 className={`section-title ${currentIndex === 0 ? "reading-active" : ""}`} data-reading-index="0">
          <KaraokeLessonText
            as="span"
            text={introTitle}
            isActive={isSpeaking && currentIndex === 0}
            currentCharIndex={currentCharIndex}
          />
          <ReadAloudButton isSpeaking={isSpeaking} onStart={() => {
            const introDesc = introSubtitle;
            const content = activeTab === 'part1' ? 
              "Follow the technical flowchart to understand the 3D modeling workflow." : 
              "Follow the server upload protocol to finalize parts on the server.";
            speak([introTitle, introDesc, content]);
          }} onStop={stop} />
        </h3>
        <KaraokeLessonText
          className={`lesson-subtitle ${currentIndex === 1 ? "reading-active" : ""}`}
          data-reading-index="1"
          text={introSubtitle}
          isActive={isSpeaking && currentIndex === 1}
          currentCharIndex={currentCharIndex}
        />
      </section>



      <div className="lesson-grid single-card">
        <div className="lesson-card tab-content fade-in">
          <div className="fade-in">
            <div className="card-header">
              <h4>{activeTab === 'part1' ? "WORKFLOW OVERVIEW" : "SERVER UPLOAD PROTOCOL"}</h4>
            </div>

            <div className={`screenshot-wrapper ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2" style={{marginTop: "3rem"}}>
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

