import React from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLessonCore } from "../../../../../hooks/useLessonCore";
import "../../../../../styles/3D_Modeling/CourseLesson.css";

// --- Components ---
import PartModelingContent from "./PartModelingContent";
import SketchingBaseContent from "./SketchingBaseContent";
import ExtrudingBaseContent from "./ExtrudingBaseContent";
import CuttingBaseContent from "./CuttingBaseContent";
import AddingHolesContent from "./AddingHolesContent";
import InsertingChamferContent from "./InsertingChamferContent";
import EditingPropertiesContent from "./EditingPropertiesContent";
import PartSavingContent from "./PartSavingContent";
import SheetMetalContent from "./SheetMetalContent";
import BendedPlateContent from "./BendedPlateContent";
import CreatingAssemblyContent from "./CreatingAssemblyContent";
import LinearPatternContent from "./LinearPatternContent";
import MirrorComponentContent from "./MirrorComponentContent";
import GettingMaterialWeightContent from "./Getting the Mat'l WtContent";
import AssemblySavingContent from "./AssemblySavingContent";
import { HowToEditSketchContent, HowToEditFeatureContent, HowToEditMatingsContent } from "./HowtoEditContent";

interface PartModelingProps {
    onNextLesson?: () => void;
    onPrevLesson?: () => void;
    nextLabel?: string;
    subLessonId?: string;
}

const PartModelingLesson: React.FC<PartModelingProps> = ({
    onNextLesson,
    onPrevLesson,
    nextLabel,
    subLessonId,
}) => {
    const { scrollProgress, containerRef } = useLessonCore(subLessonId || "sw-part-modeling");

    const sectionTitle = subLessonId === 'sw-sketching-base'
        ? 'SKETCHING THE BASE'
        : subLessonId === 'sw-extruding-base'
            ? 'EXTRUDING THE BASE'
            : subLessonId === 'sw-cutting-base'
                ? 'CUTTING THE BASE'
                : subLessonId === 'sw-adding-holes'
                    ? 'ADDING OF HOLES'
                    : subLessonId === 'sw-inserting-chamfer'
                        ? 'INSERTING CHAMFER'
                        : subLessonId === 'sw-editing-properties'
                            ? 'EDITING PROPERTIES OF PART'
                            : subLessonId === 'sw-part-saving'
                                ? 'PART SAVING'
                                : subLessonId === 'sw-sheet-metal'
                                    ? 'SHEET METAL (CREATING OTHER PART)'
                                    : subLessonId === 'sw-bended-plate'
                                        ? 'GETTING THE TOTAL LENGTH OF BENDED PLATE'
                                        : subLessonId === 'sw-material-weight'
                                            ? 'GETTING THE MAT\'L WT (MATERIAL WEIGHT) OF A PART'
                                            : subLessonId === 'sw-creating-assembly'
                                                ? 'CREATING ASSEMBLY'
                                                : subLessonId === 'sw-assembly-saving'
                                                    ? 'ASSEMBLY SAVING'
                                                    : subLessonId === 'sw-linear-pattern'
                                                        ? 'LINEAR PATTERN'
                                                        : subLessonId === 'sw-mirror-component'
                                                            ? 'MIRROR COMPONENT'
                                                        : subLessonId === 'sw-how-to-edit-sketch'
                                                            ? 'HOW TO EDIT SKETCH'
                                                        : subLessonId === 'sw-how-to-edit-feature'
                                                            ? 'HOW TO EDIT FEATURE'
                                                        : subLessonId === 'sw-how-to-edit-matings'
                                                            ? 'HOW TO EDIT MATINGS'
                                                            : '3D PART MODELING';

    return (
        <div className="course-lesson-container" ref={containerRef}>
            <div className="lesson-progress-container">
                <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
            </div>

            <div className="lesson-grid single-card">
                <div className="lesson-card fade-in">

                    {/* Header */}
                    <div className="card-header">
                        <h4 className="section-title">{sectionTitle}</h4>
                    </div>

                    {subLessonId === 'sw-part-modeling' && <PartModelingContent />}
                    {subLessonId === 'sw-sketching-base' && <SketchingBaseContent />}
                    {subLessonId === 'sw-extruding-base' && <ExtrudingBaseContent />}
                    {subLessonId === 'sw-cutting-base' && <CuttingBaseContent />}
                    {subLessonId === 'sw-adding-holes' && <AddingHolesContent />}
                    {subLessonId === 'sw-inserting-chamfer' && <InsertingChamferContent />}
                    {subLessonId === 'sw-editing-properties' && <EditingPropertiesContent />}
                    {subLessonId === 'sw-part-saving' && <PartSavingContent />}
                    {subLessonId === 'sw-sheet-metal' && <SheetMetalContent />}
                    {subLessonId === 'sw-bended-plate' && <BendedPlateContent />}
                    {subLessonId === 'sw-material-weight' && <GettingMaterialWeightContent />}
                    {subLessonId === 'sw-creating-assembly' && <CreatingAssemblyContent />}
                    {subLessonId === 'sw-assembly-saving' && <AssemblySavingContent />}
                    {subLessonId === 'sw-linear-pattern' && <LinearPatternContent />}
                    {subLessonId === 'sw-mirror-component' && <MirrorComponentContent />}
                    {subLessonId === 'sw-how-to-edit-sketch' && <HowToEditSketchContent />}
                    {subLessonId === 'sw-how-to-edit-feature' && <HowToEditFeatureContent />}
                    {subLessonId === 'sw-how-to-edit-matings' && <HowToEditMatingsContent />}

                    {/* Lesson Navigation */}
                    <div className="lesson-navigation" style={{ marginTop: "2rem" }}>
                        <button
                            className="nav-button"
                            onClick={() => { if (onPrevLesson) onPrevLesson(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                        >
                            <ChevronLeft size={18} /> Previous
                        </button>
                        <button
                            className="nav-button next"
                            onClick={() => { if (onNextLesson) onNextLesson(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                        >
                            {nextLabel || 'Next'} <ChevronRight size={18} />
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default PartModelingLesson;
