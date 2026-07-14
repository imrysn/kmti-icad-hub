import React from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLessonCore } from "../../../../../hooks/useLessonCore";
import "../../../../../styles/3D_Modeling/CourseLesson.css";

// --- Assets ---
import controlImg from "../../../../../assets/Solidworks/3D_Operation/3D_Control.png";
import partImg from "../../../../../assets/Solidworks/3D_Operation/3D_Part.png";
import techImg from "../../../../../assets/Solidworks/3D_Operation/3D_Tech.png";
import kmTechImg from "../../../../../assets/Solidworks/3D_Operation/3D_KMTech.png";
import xImg from "../../../../../assets/Solidworks/3D_Operation/3D_X.png";
import clickImg from "../../../../../assets/Solidworks/3D_Operation/3D_Click.png";
import originImg from "../../../../../assets/Solidworks/3D_Operation/3D_Origin.png";
import thenImg from "../../../../../assets/Solidworks/3D_Operation/3D_Then.png";
import appearImg from "../../../../../assets/Solidworks/3D_Operation/3D_Appear.png";
import f1Img from "../../../../../assets/Solidworks/3D_Operation/3D_F1.png";
import f2Img from "../../../../../assets/Solidworks/3D_Operation/3D_F2.png";
import sImg from "../../../../../assets/Solidworks/3D_Operation/3D_S.png";
import planeImg from "../../../../../assets/Solidworks/3D_Operation/3D_Plane.png";
import cornerImg from "../../../../../assets/Solidworks/3D_Operation/3D_Corner.png";
import checkImg from "../../../../../assets/Solidworks/3D_Operation/3D_Check.png";
import sketchImg from "../../../../../assets/Solidworks/3D_Operation/3D_Sketch.png";
import callImg from "../../../../../assets/Solidworks/3D_Operation/3D_Call.png";
import smartImg from "../../../../../assets/Solidworks/3D_Operation/3D_Smart.png";
import modifyImg from "../../../../../assets/Solidworks/3D_Operation/3D_Modify.png";
import underImg from "../../../../../assets/Solidworks/3D_Operation/3D_Under.png";
import fullyImg from "../../../../../assets/Solidworks/3D_Operation/3D_Fully.png";
import overImg from "../../../../../assets/Solidworks/3D_Operation/3D_Over.png";
import extrudeImg from "../../../../../assets/Solidworks/3D_Operation/3D_Extrude.png";
import bossImg from "../../../../../assets/Solidworks/3D_Operation/3D_Boss.png";
import baseImg from "../../../../../assets/Solidworks/3D_Operation/3D_Base.png";

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

                    {subLessonId === 'sw-part-modeling' && (<>

                    {/* Step 1 */}
                    <div className="instruction-step">
                        <div className="step-header">
                            <span className="step-number">1 </span>
                            <span className="step-label">Open a SolidWorks window.</span>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="instruction-step">
                        <div className="step-header">
                            <span className="step-number">2 </span>
                            <span className="step-label">Create New File.</span>
                        </div>
                        <div className="step-description">
                            <p className="p-flush" style={{ color: 'var(--text-muted)' }}>
                                In Menu Bar, click New{' '}
                                <span className="image-wrapper-flush">
                                    <img src={controlImg} alt="New icon" style={{ height: '24px', verticalAlign: 'middle' }} />
                                </span>
                                {' '}or CTRL + N key.
                            </p>
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className="instruction-step">
                        <div className="step-header">
                            <span className="step-number">3 </span>
                            <span className="step-label">Select New Part Document.</span>
                        </div>
                        <div className="step-description">
                            <p className="p-flush" style={{ color: 'var(--text-muted)' }}>
                                The New SolidWorks Document Dialog box will appear:
                            </p>

                            <ol style={{ paddingLeft: '1.25rem', margin: '0.75rem 0', color: 'var(--text-muted)', lineHeight: '2.2' }}>
                                <li>Click K M Tech.</li>
                                <li>
                                    Select K&amp;M PART{'                '}
                                    <span className="image-wrapper-flush">
                                        <img src={partImg} alt="K&M PART icon" style={{ height: '40px', verticalAlign: 'middle' }} />
                                    </span>
                                </li>
                                <li>Click OK or Double click K&amp;M PART.</li>
                            </ol>

                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', marginTop: '1rem' }}>
                                <div style={{ flex: '1 1 300px', minWidth: '250px' }}>
                                    <div className="image-wrapper">
                                        <img
                                            src={techImg}
                                            alt="K M Tech tab in New SolidWorks Document dialog"
                                            className="software-screenshot"
                                            style={{ maxWidth: '100%', height: 'auto' }}
                                        />
                                    </div>
                                </div>
                                <div style={{ flex: '1 1 300px', minWidth: '250px' }}>
                                    <div className="image-wrapper">
                                        <img
                                            src={kmTechImg}
                                            alt="K&M PART template selection"
                                            className="software-screenshot"
                                            style={{ maxWidth: '100%', height: 'auto' }}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="instruction-box" style={{ marginTop: '1.5rem' }}>
                                <p className="p-flush red-text">
                                    ※ This is where all the KMTI
                                    <br />
                                    Standard Templates were saved.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Step 4 */}
                    <div className="instruction-step">
                        <div className="step-header">
                            <span className="step-number">4 </span>
                            <span className="step-label">Set the Material.</span>
                        </div>
                        <div className="step-description">
                            <p className="p-flush red-text">
                                ※ SS400 is the default Material.
                            </p>
                            <p className="p-flush red-text" style={{ marginTop: '0.25rem' }}>
                                ※ Edit the Material if the required Material is not SS400.
                            </p>

                            <ol style={{ paddingLeft: '1.25rem', margin: '0.75rem 0', color: 'var(--text-muted)', lineHeight: '2.2' }}>
                                <li>Right click on the SS400, then click Edit Material.</li>
                                <li>Select the required Material, then click Apply.</li>
                                <li>
                                    Click{' '}
                                    <span className="image-wrapper-flush">
                                        <img src={xImg} alt="Close button" style={{ height: '22px', verticalAlign: 'middle' }} />
                                    </span>
                                    {' '}after.
                                </li>
                            </ol>

                            <div className="image-wrapper" style={{ marginTop: '1rem' }}>
                                <img
                                    src={clickImg}
                                    alt="Edit Material context menu and Material dialog"
                                    className="software-screenshot screenshot-wide"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Step 5 */}
                    <div className="instruction-step">
                        <div className="step-header">
                            <span className="step-number">5 </span>
                            <span className="step-label">Show the Origin.</span>
                        </div>
                        <div className="step-description">
                            <p className="p-flush" style={{ color: 'var(--text-muted)' }}>
                                In View tab, select{' '}
                                <span className="image-wrapper-flush">
                                    <img src={originImg} alt="Origins" style={{ height: '24px', verticalAlign: 'middle' }} />
                                </span>
                            </p>
                            <p className="p-flush" style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                                or
                            </p>
                            <p className="p-flush" style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                                in Heads-up View, click Hide/Show Items{' '}
                                <span className="image-wrapper-flush">
                                    <img src={thenImg} alt="Hide/Show Items then Origin" style={{ height: '24px', verticalAlign: 'middle' }} />
                                </span>
                            </p>

                            <div className="image-wrapper" style={{ marginTop: '1.5rem' }}>
                                <img
                                    src={appearImg}
                                    alt="Origin will appear in the graphics area"
                                    className="software-screenshot screenshot-wide"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Step 6 */}
                    <div className="instruction-step">
                        <div className="step-header">
                            <span className="step-number">6 </span>
                            <span className="step-label">Select plane to be used.</span>
                        </div>
                        <div className="step-description">
                            <p className="p-flush" style={{ color: 'var(--text-muted)' }}>
                                In <strong>FeatureManager Design Tree</strong>, click <strong>Front Plane</strong> then this will appear
                            </p>

                            <div className="image-wrapper" style={{ marginTop: '1rem', marginBottom: '1rem' }}>
                                <img src={f1Img} alt="FeatureManager Front Plane" style={{ height: 'auto', maxWidth: '100%' }} className="software-screenshot" />
                            </div>

                            <p className="p-flush" style={{ color: 'var(--text-muted)' }}>
                                click{' '}
                                <span className="image-wrapper-flush">
                                    <img src={f2Img} alt="Click" style={{ height: '24px', verticalAlign: 'middle' }} />
                                </span>
                            </p>

                            <p className="p-flush" style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                                or in <strong>Sketch</strong> tab, click{' '}
                                <span className="image-wrapper-flush">
                                    <img src={sImg} alt="Sketch tab click" style={{ height: '24px', verticalAlign: 'middle' }} />
                                </span>
                            </p>

                            <blockquote style={{ borderLeft: '4px solid var(--border-color)', paddingLeft: '1rem', margin: '1rem 0', color: 'var(--text-muted)' }}>
                                Select plane
                            </blockquote>

                            <div className="image-wrapper" style={{ marginTop: '1rem', marginBottom: '1rem' }}>
                                <img
                                    src={planeImg}
                                    alt="Select plane"
                                    className="software-screenshot screenshot-wide"
                                />
                            </div>

                            <p className="p-flush red-text" style={{ marginTop: '0.5rem' }}>
                                ※ The display changes so the Front Plane faces the user.
                            </p>
                            <p className="p-flush red-text" style={{ marginTop: '0.25rem' }}>
                                ※ Consider the orientation / position of the part on how it will be assembled.<br />
                                &emsp;&emsp;(Refer to assy drawing)
                            </p>
                        </div>
                    </div>

                    </>)}

                    {subLessonId === 'sw-sketching-base' && (<>

                    {/* Step 7 */}
                    <div className="instruction-step">
                        <div className="step-header">
                            <span className="step-number">7 </span>
                            <span className="step-label">Add sketch geometry.</span>
                        </div>
                        <div className="step-description">
                            <p className="p-flush" style={{ color: 'var(--text-muted)' }}>
                                In the <strong>Sketch</strong> tab, click <strong>Corner Rectangle</strong>{' '}
                                <span className="image-wrapper-flush">
                                    <img src={cornerImg} alt="Corner Rectangle" style={{ height: '24px', verticalAlign: 'middle' }} />
                                </span>
                            </p>

                            <blockquote style={{ borderLeft: '4px solid var(--border-color)', paddingLeft: '1rem', margin: '1rem 0', color: 'var(--text-muted)' }}>
                                Draw a sketch<br />
                                then check{' '}
                                <span className="image-wrapper-flush">
                                    <img src={checkImg} alt="Check" style={{ height: '24px', verticalAlign: 'middle' }} />
                                </span>
                            </blockquote>
                        </div>
                    </div>

                    {/* Step 8 */}
                    <div className="instruction-step">
                        <div className="step-header">
                            <span className="step-number">8 </span>
                            <span className="step-label">Add sketch relations (if necessary).</span>
                        </div>
                        <div className="step-description">
                            <div className="image-wrapper" style={{ marginTop: '0.5rem' }}>
                                <img
                                    src={sketchImg}
                                    alt="Sketch display"
                                    className="software-screenshot screenshot-wide"
                                />
                            </div>

                            <div className="image-wrapper" style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                                <img
                                    src={callImg}
                                    alt="Sketch Relation Callouts"
                                    className="software-screenshot"
                                    style={{ maxWidth: '100%', height: 'auto' }}
                                />
                                <p className="p-flush" style={{ color: 'var(--text-muted)', marginTop: '0.5rem', fontWeight: 'bold' }}>
                                    Sketch Relation Callouts
                                </p>
                            </div>

                            <div className="instruction-box" style={{ marginTop: '1.5rem', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', padding: '1rem 0' }}>
                                <p className="p-flush red-text">
                                    ※ Suggested sketch relation will appear on FeatureManager Design Tree, once sketches and/or origins are both selected.
                                </p>
                                <p className="p-flush red-text" style={{ marginTop: '0.5rem' }}>
                                    ※ Sketch relation helps the sketch become fully defined by adding the correct sketch relation.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Step 9 */}
                    <div className="instruction-step">
                        <div className="step-header">
                            <span className="step-number">9 </span>
                            <span className="step-label">Insert dimension/s.</span>
                        </div>
                        <div className="step-description">
                            <ol style={{ paddingLeft: '1.25rem', margin: '0.75rem 0', color: 'var(--text-muted)', lineHeight: '2.2' }}>
                                <li>
                                    In <strong>Sketch</strong> tab, click <strong>Smart Dimension</strong>{' '}
                                    <span className="image-wrapper-flush">
                                        <img src={smartImg} alt="Smart Dimension" style={{ height: '24px', verticalAlign: 'middle' }} />
                                    </span>
                                </li>
                                <li>Select line(s) to be dimensioned.</li>
                                <li>This dialog box will appear after selecting line(s).</li>
                                <li>Input the required dimension.</li>
                                <li>
                                    Click{' '}
                                    <span className="image-wrapper-flush">
                                        <img src={checkImg} alt="Check" style={{ height: '24px', verticalAlign: 'middle' }} />
                                    </span>
                                </li>
                            </ol>

                            <p className="p-flush" style={{ color: 'var(--text-muted)', marginTop: '1rem' }}>
                                Display
                            </p>

                            <div className="image-wrapper" style={{ marginTop: '0.5rem' }}>
                                <img
                                    src={modifyImg}
                                    alt="Modify dimension display"
                                    className="software-screenshot screenshot-wide"
                                />
                            </div>

                            <p className="p-flush red-text" style={{ marginTop: '1.5rem' }}>
                                ※ Make all the sketches fully defined.
                            </p>
                        </div>
                    </div>

                    {/* Sketch Statuses */}
                    <div className="instruction-step" style={{ marginTop: '2rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            {/* Under Defined */}
                            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                                <div className="image-wrapper" style={{ flexShrink: 0 }}>
                                    <img src={underImg} alt="Under Defined Sketch" style={{ height: 'auto', maxWidth: '200px' }} className="software-screenshot" />
                                </div>
                                <div>
                                    <p className="p-flush" style={{ color: 'var(--text-muted)', fontWeight: 'bold', marginBottom: '0.5rem' }}>Under Defined Sketch</p>
                                    <p className="p-flush" style={{ color: 'var(--text-muted)' }}>
                                        is due to lack of dimensions or relations and it has <strong>Blue Sketch</strong>.
                                    </p>
                                </div>
                            </div>

                            {/* Fully Defined */}
                            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                                <div className="image-wrapper" style={{ flexShrink: 0 }}>
                                    <img src={fullyImg} alt="Fully Defined Sketch" style={{ height: 'auto', maxWidth: '200px' }} className="software-screenshot" />
                                </div>
                                <div>
                                    <p className="p-flush" style={{ color: 'var(--text-muted)', fontWeight: 'bold', marginBottom: '0.5rem' }}>Fully Defined Sketch</p>
                                    <p className="p-flush" style={{ color: 'var(--text-muted)' }}>
                                        has complete dimensions and relations and it has <strong>Black Sketch</strong>.
                                    </p>
                                </div>
                            </div>

                            {/* Over Defined */}
                            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                                <div className="image-wrapper" style={{ flexShrink: 0 }}>
                                    <img src={overImg} alt="Over Defined Sketch" style={{ height: 'auto', maxWidth: '200px' }} className="software-screenshot" />
                                </div>
                                <div>
                                    <p className="p-flush" style={{ color: 'var(--text-muted)', fontWeight: 'bold', marginBottom: '0.5rem' }}>Over Defined Sketch</p>
                                    <p className="p-flush" style={{ color: 'var(--text-muted)' }}>
                                        is due to repeated or over dimensioning.<br />
                                        It also happens on improper adding of relation on the sketch.<br />
                                        Some of its dimensions, sketch or relation are <strong>Yellow or Red Sketch</strong>.
                                    </p>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1rem' }}>
                                        <div style={{ padding: '0.5rem', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-surface)' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <div style={{ width: '16px', height: '16px', backgroundColor: 'red' }}></div>
                                                <span style={{ fontSize: '0.85rem' }}>Item is Unsolvable</span>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem' }}>
                                                <div style={{ width: '16px', height: '16px', backgroundColor: 'yellow' }}></div>
                                                <span style={{ fontSize: '0.85rem' }}>Item Conflicts</span>
                                            </div>
                                        </div>
                                        <p className="p-flush" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                            It will appear on <strong>over defined sketch</strong>.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    </>)}

                    {subLessonId === 'sw-extruding-base' && (<>

                    {/* Step 10 */}
                    <div className="instruction-step">
                        <div className="step-header">
                            <span className="step-number">10 </span>
                            <span className="step-label">Extrude the sketch into a solid.</span>
                        </div>
                        <div className="step-description">
                            <div className="image-wrapper" style={{ marginTop: '1rem', marginBottom: '1.5rem' }}>
                                <img
                                    src={extrudeImg}
                                    alt="Extrude display"
                                    className="software-screenshot screenshot-wide"
                                />
                            </div>

                            <ol style={{ paddingLeft: '1.25rem', margin: '0.75rem 0', color: 'var(--text-muted)', lineHeight: '2.2' }}>
                                <li>
                                    In <strong>Features</strong> tab, click <strong>Extruded Boss/Base</strong>.{' '}
                                    <span className="image-wrapper-flush">
                                        <img src={bossImg} alt="Extruded Boss/Base" style={{ height: '24px', verticalAlign: 'middle' }} />
                                    </span>
                                    <br />
                                    (<strong>Boss-Extrude</strong> Property Manager will appear)
                                </li>
                                <li>In end condition, select <strong>Blind</strong>.</li>
                                <li>Change the Depth to <strong>4.5mm</strong>.</li>
                                <li>
                                    Click{' '}
                                    <span className="image-wrapper-flush">
                                        <img src={checkImg} alt="Check" style={{ height: '24px', verticalAlign: 'middle' }} />
                                    </span>
                                </li>
                            </ol>

                            <div className="image-wrapper" style={{ marginTop: '1.5rem' }}>
                                <img
                                    src={baseImg}
                                    alt="Base extruded"
                                    className="software-screenshot screenshot-wide"
                                />
                            </div>
                        </div>
                    </div>

                    </>)}

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
