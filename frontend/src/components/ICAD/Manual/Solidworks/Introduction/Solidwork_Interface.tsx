import React from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLessonCore } from "../../../../../hooks/useLessonCore";
import "../../../../../styles/3D_Modeling/CourseLesson.css";

// --- Assets ---
import mainInterface from "../../../../../assets/Solidworks/Introduction/Solidwork_Interface.png";
import mouseLeft from "../../../../../assets/Solidworks/Introduction/Solidwork_Left.png";
import mouseRight from "../../../../../assets/Solidworks/Introduction/Solidwork_Right.png";
import mouseScroll from "../../../../../assets/Solidworks/Introduction/Solidwork_Scroll.png";
import keyboardCommon from "../../../../../assets/Solidworks/Introduction/SolidworkKeyboard1.png";
import keyboardSolidworks from "../../../../../assets/Solidworks/Introduction/Solidwork_Keyboard2.png";

interface SolidworkInterfaceProps {
    onNextLesson?: () => void;
    onPrevLesson?: () => void;
    nextLabel?: string;
}

const SolidworkInterfaceLesson: React.FC<SolidworkInterfaceProps> = ({
    onNextLesson,
    onPrevLesson,
    nextLabel,
}) => {
    const { scrollProgress, containerRef } = useLessonCore("sw-interface");

    return (
        <div className="course-lesson-container" ref={containerRef}>
            <div className="lesson-progress-container">
                <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
            </div>

            <div className="lesson-grid single-card">
                <div className="lesson-card fade-in">

                    {/* Header */}
                    <div className="card-header">
                        <h4 className="section-title">SolidWorks Interface</h4>
                    </div>
                    <div className="instruction-step" style={{ marginTop: "1rem" }}>
                        <img
                            src={mainInterface}
                            alt="SolidWorks Interface"
                            className="software-screenshot screenshot-wide"
                            style={{ marginBottom: "1.5rem" }}
                        />
                    </div>

                    {/* SECTION 1: Mouse Control */}
                    <div className="card-header" style={{ marginTop: "2rem" }}>
                        <h4 className="section-title">Mouse Control</h4>
                    </div>
                    <div className="instruction-step">
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', marginTop: "1rem" }}>

                            <div className="course-card card-2d" style={{ flex: '1 1 200px', minWidth: '200px', maxWidth: '100%', display: 'flex', flexDirection: 'column' }}>
                                <div className="card-header">
                                    <h3>Left Mouse Button</h3>
                                </div>
                                <div className="card-graphic-container card-2d-graphic-container" style={{ background: 'transparent', padding: '1rem', minHeight: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <img src={mouseLeft} alt="Left Mouse Button" style={{ maxHeight: '100px', objectFit: 'contain' }} />
                                </div>
                                <div style={{ flexGrow: 1, padding: '0 1rem 1rem' }}>
                                    <ul style={{ paddingLeft: '1.25rem', margin: 0, color: 'var(--text-muted)' }}>
                                        <li>Left - Used to select objects.</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="course-card card-2d" style={{ flex: '1 1 200px', minWidth: '200px', maxWidth: '100%', display: 'flex', flexDirection: 'column' }}>
                                <div className="card-header">
                                    <h3>Right Mouse Button</h3>
                                </div>
                                <div className="card-graphic-container card-2d-graphic-container" style={{ background: 'transparent', padding: '1rem', minHeight: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <img src={mouseRight} alt="Right Mouse Button" style={{ maxHeight: '100px', objectFit: 'contain' }} />
                                </div>
                                <div style={{ flexGrow: 1, padding: '0 1rem 1rem' }}>
                                    <ul style={{ paddingLeft: '1.25rem', margin: 0, color: 'var(--text-muted)' }}>
                                        <li>Right - Opens the shortcut menu.</li>
                                        <li>The available commands change depending on the current cursor position or selected object.</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="course-card card-2d" style={{ flex: '1 1 200px', minWidth: '200px', maxWidth: '100%', display: 'flex', flexDirection: 'column' }}>
                                <div className="card-header">
                                    <h3>Scroll Wheel</h3>
                                </div>
                                <div className="card-graphic-container card-2d-graphic-container" style={{ background: 'transparent', padding: '1rem', minHeight: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <img src={mouseScroll} alt="Scroll Wheel" style={{ maxHeight: '100px', objectFit: 'contain' }} />
                                </div>
                                <div style={{ flexGrow: 1, padding: '0 1rem 1rem' }}>
                                    <ul style={{ paddingLeft: '1.25rem', margin: 0, color: 'var(--text-muted)' }}>
                                        <li>Scroll Up — Zoom Out</li>
                                        <li>Scroll Down — Zoom In</li>
                                        <li>Click Scroll Wheel — Rotate Model</li>
                                        <li>Ctrl + Scroll Wheel — Pan</li>
                                    </ul>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* SECTION 2: Keyboard Shortcuts */}
                    <div className="card-header" style={{ marginTop: "2rem" }}>
                        <h4 className="section-title">Keyboard Shortcuts</h4>
                    </div>
                    <div className="instruction-step">
                        <div className="course-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginTop: "1rem" }}>

                            <div className="course-card card-2d" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                                <div className="card-header">
                                    <h3>Common Keyboard Shortcuts</h3>
                                </div>
                                <p style={{ padding: '0 1rem', marginBottom: '1rem', color: 'var(--text-muted)' }}>
                                    These are the commonly used keyboard shortcuts. They can be used not only in SolidWorks but also in many other software applications.
                                </p>
                                <div className="card-graphic-container card-2d-graphic-container" style={{ background: 'transparent', padding: '1rem', flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <img src={keyboardCommon} alt="Common Keyboard Shortcuts" style={{ maxWidth: '100%', height: 'auto', objectFit: 'contain' }} />
                                </div>
                            </div>

                            <div className="course-card card-2d" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                                <div className="card-header">
                                    <h3>SolidWorks Keyboard Shortcuts</h3>
                                </div>
                                <p style={{ padding: '0 1rem', marginBottom: '1rem', color: 'var(--text-muted)' }}>
                                    These are the commonly used keyboard shortcuts specifically for SolidWorks.
                                </p>
                                <div className="card-graphic-container card-2d-graphic-container" style={{ background: 'transparent', padding: '1rem', flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <img src={keyboardSolidworks} alt="SolidWorks Keyboard Shortcuts" style={{ maxWidth: '100%', height: 'auto', objectFit: 'contain' }} />
                                </div>
                            </div>

                        </div>
                    </div>

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

export default SolidworkInterfaceLesson;
