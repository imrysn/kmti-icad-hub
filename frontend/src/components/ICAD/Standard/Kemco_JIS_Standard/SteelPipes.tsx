import React, { useEffect } from "react";
import { useLessonCore } from "../../../../hooks/useLessonCore";
import { useTTSAutoplay } from "../../../../hooks/useTTSAutoplay";
import { KaraokeLessonText } from "../../../KaraokeLessonText";
import "../../../../styles/2D_Drawing/CourseLesson.css";
import ImageGalleryViewer from "../ImageGalleryViewer";

/* Static Assets */
import steelPipe1Img from "../../../../assets/Standard/Kemco_JIS_Standard/structural_steel_pipe1.png";
import steelPipe2Img from "../../../../assets/Standard/Kemco_JIS_Standard/structural_steel_pipe2.png";
import steelPipe3Img from "../../../../assets/Standard/Kemco_JIS_Standard/structural_steel_pipe3.png";

interface SteelPipesLessonProps {
  nextLabel?: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const reminderSteps = [
  "S45C Structural Carbon Steel Pipe - Inner Diameter Specified",
  "(Akashi-Approve) (STKM16A)",
];

const images = [
  { src: steelPipe1Img, label: "Structural Steel Pipe 1", number: 1 },
  { src: steelPipe2Img, label: "Structural Steel Pipe 2", number: 2 },
  { src: steelPipe3Img, label: "Structural Steel Pipe 3", number: 3 },
];

const SteelPipesLesson: React.FC<SteelPipesLessonProps> = ({
  onNextLesson,
  onPrevLesson,
  nextLabel,
}) => {
  const {
    scrollProgress,
    containerRef,
    speak,
    stop,
    isSpeaking,
    currentIndex,
    currentCharIndex,
    registerText,
  } = useLessonCore("steel-pipes");

  useEffect(() => {
    registerText(reminderSteps, 0);
  }, [registerText]);

  const tabsList = [{ id: "steel-pipes" }];

  useTTSAutoplay(
    isSpeaking,
    currentIndex,
    "steel-pipes",
    reminderSteps.length,
    tabsList,
    () => { if (onNextLesson) onNextLesson(); },
    speak,
    reminderSteps,
    0
  );

  const handleNext = () => {
    stop();
    if (onNextLesson) onNextLesson();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePrev = () => {
    stop();
    if (onPrevLesson) onPrevLesson();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="course-lesson-container" ref={containerRef}>
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      <div className="lesson-intro" style={{ border: "none", background: "none", boxShadow: "none", backdropFilter: "none", marginBottom: "0.5rem", padding: "1rem 0" }}>
        <div className="card-header">
          <h4 className="section-title"> S45C Structural Carbon Steel Pipe - Inner Diameter Specified </h4>
        </div>
        <KaraokeLessonText
          className={`lesson-subtitle ${currentIndex === 1 ? "reading-active" : ""}`}
          data-reading-index="1"
          text="(Akashi-Approve) (STKM16A)"
          isActive={isSpeaking && currentIndex === 1}
          currentCharIndex={currentCharIndex}
        />
      </div>

      <ImageGalleryViewer
        images={images}
        showCounter={false}
        onPrev={handlePrev}
        onNext={handleNext}
        nextLabel={nextLabel}
        prevDisabled={!onPrevLesson}
      />
    </div>
  );
};

export default SteelPipesLesson;
