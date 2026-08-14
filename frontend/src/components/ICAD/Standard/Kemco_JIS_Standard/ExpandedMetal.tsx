import React, { useEffect } from "react";
import { useLessonCore } from "../../../../hooks/useLessonCore";
import { useTTSAutoplay } from "../../../../hooks/useTTSAutoplay";
import "../../../../styles/2D_Drawing/CourseLesson.css";
import ImageGalleryViewer from "../ImageGalleryViewer";
import expandedMetal1Img from "../../../../assets/Standard/Kemco_JIS_Standard/expanded_metal1.png";
import expandedMetal2Img from "../../../../assets/Standard/Kemco_JIS_Standard/expanded_metal2.png";

interface ExpandedMetalProps { nextLabel?: string; onNextLesson?: () => void; onPrevLesson?: () => void; }
const reminderSteps = ["Please review the Expanded Metal reference"];
const images = [
  { src: expandedMetal1Img, label: "Expanded Metal — Type 1", alt: "Expanded Metal 1", number: 1 },
  { src: expandedMetal2Img, label: "Expanded Metal — Type 2", alt: "Expanded Metal 2", number: 2 },
];

const ExpandedMetal: React.FC<ExpandedMetalProps> = ({ onNextLesson, onPrevLesson, nextLabel }) => {
  const { scrollProgress, containerRef, speak, stop, isSpeaking, currentIndex, registerText } = useLessonCore("expanded-metal");
  useEffect(() => { registerText(reminderSteps, 0); }, [registerText]);
  const tabsList = [{ id: "expanded-metal" }];
  useTTSAutoplay(isSpeaking, currentIndex, "expanded-metal", reminderSteps.length, tabsList, () => { if (onNextLesson) onNextLesson(); }, speak, reminderSteps, 0);
  const handleNext = () => { stop(); if (onNextLesson) onNextLesson(); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const handlePrev = () => { stop(); if (onPrevLesson) onPrevLesson(); window.scrollTo({ top: 0, behavior: "smooth" }); };
  return (
    <div className="course-lesson-container" ref={containerRef}>
      <div className="lesson-progress-container"><div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} /></div>
      <ImageGalleryViewer images={images} onPrev={handlePrev} onNext={handleNext} nextLabel={nextLabel} prevDisabled={!onPrevLesson} />
    </div>
  );
};
export default ExpandedMetal;