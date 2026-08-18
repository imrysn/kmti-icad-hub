import React, { useEffect } from "react";
import { useLessonCore } from "../../../../hooks/useLessonCore";
import { useTTSAutoplay } from "../../../../hooks/useTTSAutoplay";
import "../../../../styles/2D_Drawing/CourseLesson.css";
import ImageGalleryViewer from "../ImageGalleryViewer";
import shaftKeywayImg from "../../../../assets/Standard/Kemco_JIS_Standard/Shaft_Keyway.png";

interface ShaftKeywayProps { nextLabel?: string; onNextLesson?: () => void; onPrevLesson?: () => void; }
const reminderSteps = ["Please review the Shaft Keyway reference"];
const images = [{ src: shaftKeywayImg, label: "Shaft Keyway", alt: "Shaft Keyway", number: 1 }];

const ShaftKeyway: React.FC<ShaftKeywayProps> = ({ onNextLesson, onPrevLesson, nextLabel }) => {
  const { scrollProgress, containerRef, speak, stop, isSpeaking, currentIndex, registerText } = useLessonCore("shaft-keyway");
  useEffect(() => { registerText(reminderSteps, 0); }, [registerText]);
  const tabsList = [{ id: "shaft-keyway" }];
  useTTSAutoplay(isSpeaking, currentIndex, "shaft-keyway", reminderSteps.length, tabsList, () => { if (onNextLesson) onNextLesson(); }, speak, reminderSteps, 0);
  const handleNext = () => { stop(); if (onNextLesson) onNextLesson(); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const handlePrev = () => { stop(); if (onPrevLesson) onPrevLesson(); window.scrollTo({ top: 0, behavior: "smooth" }); };
  return (
    <div className="course-lesson-container" ref={containerRef}>
      <div className="lesson-progress-container"><div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} /></div>
      <ImageGalleryViewer images={images} onPrev={handlePrev} onNext={handleNext} nextLabel={nextLabel} prevDisabled={!onPrevLesson} />
    </div>
  );
};
export default ShaftKeyway;