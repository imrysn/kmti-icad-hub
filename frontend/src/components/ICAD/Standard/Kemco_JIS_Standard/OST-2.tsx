import React, { useEffect } from "react";
import { useLessonCore } from "../../../../hooks/useLessonCore";
import { useTTSAutoplay } from "../../../../hooks/useTTSAutoplay";
import "../../../../styles/2D_Drawing/CourseLesson.css";
import ImageGalleryViewer from "../ImageGalleryViewer";
import ost2Img from "../../../../assets/Standard/Kemco_JIS_Standard/OST-2_Specification.png";

interface OST2SpecificationProps { nextLabel?: string; onNextLesson?: () => void; onPrevLesson?: () => void; }
const reminderSteps = ["Please review the OST-2 Specification reference"];
const images = [{ src: ost2Img, label: "OST-2 Specification", alt: "OST-2 Specification", number: 1 }];

const OST2Specification: React.FC<OST2SpecificationProps> = ({ onNextLesson, onPrevLesson, nextLabel }) => {
  const { scrollProgress, containerRef, speak, stop, isSpeaking, currentIndex, registerText } = useLessonCore("ost-2");
  useEffect(() => { registerText(reminderSteps, 0); }, [registerText]);
  const tabsList = [{ id: "ost-2" }];
  useTTSAutoplay(isSpeaking, currentIndex, "ost-2", reminderSteps.length, tabsList, () => { if (onNextLesson) onNextLesson(); }, speak, reminderSteps, 0);
  const handleNext = () => { stop(); if (onNextLesson) onNextLesson(); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const handlePrev = () => { stop(); if (onPrevLesson) onPrevLesson(); window.scrollTo({ top: 0, behavior: "smooth" }); };
  return (
    <div className="course-lesson-container" ref={containerRef}>
      <div className="lesson-progress-container"><div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} /></div>
      <ImageGalleryViewer images={images} onPrev={handlePrev} onNext={handleNext} nextLabel={nextLabel} prevDisabled={!onPrevLesson} />
    </div>
  );
};
export default OST2Specification;