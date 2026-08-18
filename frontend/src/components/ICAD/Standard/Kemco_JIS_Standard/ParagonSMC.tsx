import React, { useEffect } from "react";
import { useLessonCore } from "../../../../hooks/useLessonCore";
import { useTTSAutoplay } from "../../../../hooks/useTTSAutoplay";
import "../../../../styles/2D_Drawing/CourseLesson.css";
import ImageGalleryViewer from "../ImageGalleryViewer";
import paragonSMCImg from "../../../../assets/Standard/Kemco_JIS_Standard/Paragon_Cylindrical_Coupling.png";

interface ParagonSMCProps { nextLabel?: string; onNextLesson?: () => void; onPrevLesson?: () => void; }
const reminderSteps = ["Please review the Paragon SMC reference"];
const images = [{ src: paragonSMCImg, label: "Paragon Cylindrical Coupling", alt: "Paragon SMC", number: 1 }];

const ParagonSMC: React.FC<ParagonSMCProps> = ({ onNextLesson, onPrevLesson, nextLabel }) => {
  const { scrollProgress, containerRef, speak, stop, isSpeaking, currentIndex, registerText } = useLessonCore("paragon-smc");
  useEffect(() => { registerText(reminderSteps, 0); }, [registerText]);
  const tabsList = [{ id: "paragon-smc" }];
  useTTSAutoplay(isSpeaking, currentIndex, "paragon-smc", reminderSteps.length, tabsList, () => { if (onNextLesson) onNextLesson(); }, speak, reminderSteps, 0);
  const handleNext = () => { stop(); if (onNextLesson) onNextLesson(); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const handlePrev = () => { stop(); if (onPrevLesson) onPrevLesson(); window.scrollTo({ top: 0, behavior: "smooth" }); };
  return (
    <div className="course-lesson-container" ref={containerRef}>
      <div className="lesson-progress-container"><div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} /></div>
      <ImageGalleryViewer images={images} onPrev={handlePrev} onNext={handleNext} nextLabel={nextLabel} prevDisabled={!onPrevLesson} />
    </div>
  );
};
export default ParagonSMC;