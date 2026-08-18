import React, { useEffect } from "react";
import { useLessonCore } from "../../../../hooks/useLessonCore";
import { useTTSAutoplay } from "../../../../hooks/useTTSAutoplay";
import "../../../../styles/2D_Drawing/CourseLesson.css";
import ImageGalleryViewer from "../ImageGalleryViewer";

/* Static Assets — Images 1, 2, 3 */
import steelTable1Img from "../../../../assets/Standard/Kemco_JIS_Standard/steel_material_table1.png";
import steelTable2Img from "../../../../assets/Standard/Kemco_JIS_Standard/steel_material_table2.png";
import steelTable3Img from "../../../../assets/Standard/Kemco_JIS_Standard/steel_material_table3.png";

/* Gallery Assets — Image 4 (Flat Bar) */
import flatBar1Img from "../../../../assets/Standard/Kemco_JIS_Standard/Flat_Bar1.png";
import flatBar2Img from "../../../../assets/Standard/Kemco_JIS_Standard/Flat_Bar2.png";
import flatBar3Img from "../../../../assets/Standard/Kemco_JIS_Standard/Flat_Bar3.png";
import flatBar4Img from "../../../../assets/Standard/Kemco_JIS_Standard/Flat_Bar4.png";

/* Gallery Assets — Image 5 (Round Bar) */
import roundBar1Img from "../../../../assets/Standard/Kemco_JIS_Standard/Round_Bar1.png";
import roundBar2Img from "../../../../assets/Standard/Kemco_JIS_Standard/Round_Bar2.png";
import roundBar3Img from "../../../../assets/Standard/Kemco_JIS_Standard/Round_Bar3.png";

interface GeneralStandardSteelLessonProps {
  nextLabel?: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
  subLessonId?: string;
}

const reminderSteps = [
  "Please review the General Standard Steel Material Table.",
  "Ensure standard steel materials are selected according to this table.",
];

const GeneralStandardSteelLesson: React.FC<GeneralStandardSteelLessonProps> = ({
  onNextLesson,
  onPrevLesson,
  nextLabel,
  subLessonId = 'general-standard-steel-main'
}) => {
  const {
    scrollProgress,
    containerRef,
    speak,
    stop,
    isSpeaking,
    currentIndex,
    registerText,
  } = useLessonCore("kemco-general-standard-steel");

  useEffect(() => {
    registerText(reminderSteps, 0);
  }, [registerText]);

  let currentGalleryImages: { src: string; label: string; number: number; }[] = [];
  if (!subLessonId || subLessonId === 'general-standard-steel-main' || subLessonId === 'general-standard-steel') {
    currentGalleryImages = [
      { src: steelTable1Img, label: "Flat Bar (Polished) SS400-D", number: 1 },
      { src: steelTable2Img, label: "Flat Bar (Polished) S45C-D", number: 2 },
      { src: steelTable3Img, label: "Square Steel (Black-SS400, S50C) & Round Bar (Black Coated) S25C, S45C, SCM440", number: 3 },
    ];
  } else if (subLessonId === 'general-standard-steel-flat') {
    currentGalleryImages = [
      { src: flatBar1Img, label: "Flat Bar 1", number: 1 },
      { src: flatBar2Img, label: "Flat Bar 2", number: 2 },
      { src: flatBar3Img, label: "Flat Bar 3", number: 3 },
      { src: flatBar4Img, label: "Flat Bar 4", number: 4 },
    ];
  } else if (subLessonId === 'general-standard-steel-round') {
    currentGalleryImages = [
      { src: roundBar1Img, label: "Round Bar Size Chart (Polished)", number: 1 },
      { src: roundBar2Img, label: "Round Bar Size Chart (Polished)", number: 2 },
      { src: roundBar3Img, label: "Square/Hexagonal (Polished)", number: 3 },
    ];
  }

  const tabsList = [{ id: "kemco-general-standard-steel" }];

  useTTSAutoplay(
    isSpeaking,
    currentIndex,
    "kemco-general-standard-steel",
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

      <ImageGalleryViewer
        images={currentGalleryImages}
        showCounter={true}
        onPrev={handlePrev}
        onNext={handleNext}
        nextLabel={nextLabel}
        prevDisabled={!onPrevLesson}
      />
    </div>
  );
};

export default GeneralStandardSteelLesson;
