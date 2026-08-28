import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLessonCore } from "../../../../../hooks/useLessonCore";
import "../../../../../styles/3D_Modeling/CourseLesson.css";
import VideoTutorialViewer from '../../3D_Modeling/VideoTutorialViewer';
import { SOLIDWORKS_TUTORIAL_STEPS } from './VideoTutorialData/solidworksInterfaceTutorial';

import mainInterface from "../../../../../assets/Solidworks/3D_Fv/SW_UI_Main.png";
import mouseLeft from "../../../../../assets/Solidworks/3D_Fv/Solidwork_Left.png";
import mouseRight from "../../../../../assets/Solidworks/3D_Fv/Solidwork_Right.png";
import mouseScroll from "../../../../../assets/Solidworks/3D_Fv/Solidwork_Scroll.png";
import menubar1 from "../../../../../assets/Solidworks/3D_Fv/Solidwork_Menubar1.png";
import menubar2 from "../../../../../assets/Solidworks/3D_Fv/Solidwork_Menubar2.png";
import partMode from "../../../../../assets/Solidworks/3D_Fv/Solidwork_Part.png";
import assemblyMode from "../../../../../assets/Solidworks/3D_Fv/Solidwork_Assembly.png";
import drawingMode from "../../../../../assets/Solidworks/3D_Fv/Solidwork_Drawing.png";
import toolbar from "../../../../../assets/Solidworks/3D_Fv/Solidwork_Toolbar.png";
import treeview1 from "../../../../../assets/Solidworks/3D_Fv/Solidworks_TreeView.png";
import treeview2 from "../../../../../assets/Solidworks/3D_Fv/Solidworks_TreeView.png";
import treeview3 from "../../../../../assets/Solidworks/3D_Fv/Solidworks_TreeView.png";
import coordinate1 from "../../../../../assets/Solidworks/3D_Fv/Solidwork_Coordinate1.png";
import coordinate2 from "../../../../../assets/Solidworks/3D_Fv/Solidwork_Coordinate2.png";
import coordinate3 from "../../../../../assets/Solidworks/3D_Fv/Solidwork_Coordinate3.png";
import coordinate4 from "../../../../../assets/Solidworks/3D_Fv/Solidwork_Coordinate4.png";
import coordinate5 from "../../../../../assets/Solidworks/3D_Fv/Solidwork_Coordinate5.png";
import coordinate6 from "../../../../../assets/Solidworks/3D_Fv/Solidwork_Coordinate6.png";
import coordinate7 from "../../../../../assets/Solidworks/3D_Fv/Solidwork_Coordinate7.png";
import coordinate8 from "../../../../../assets/Solidworks/3D_Fv/Solidwork_Coordinate8.png";
import statusbar from "../../../../../assets/Solidworks/3D_Fv/Solidwork_Statusbar.png";

interface SolidworkInterfaceProps {
    onNextLesson?: () => void;
    onPrevLesson?: () => void;
    nextLabel?: string;
}

/* ------------------------------------------------------------------ */
/*  Main Lesson Component                                              */
/* ------------------------------------------------------------------ */

const coordinateImages = [
    { src: coordinate1, alt: "Front view", label: "Front" },
    { src: coordinate2, alt: "Back view", label: "Back" },
    { src: coordinate3, alt: "Left view", label: "Left" },
    { src: coordinate4, alt: "Right view", label: "Right" },
    { src: coordinate5, alt: "Top view", label: "Top" },
    { src: coordinate6, alt: "Bottom view", label: "Bottom" },
    { src: coordinate7, alt: "Isometric view", label: "Isometric" },
    { src: coordinate8, alt: "Trimetric view", label: "Trimetric" },
];

const SolidworkInterfaceLesson: React.FC<SolidworkInterfaceProps> = ({
    onNextLesson,
    onPrevLesson,
    nextLabel,
}) => {
    const { scrollProgress, containerRef } = useLessonCore("sw-interface");
    const [activeTab, setActiveTab] = useState<'page1' | 'page2'>('page1');

    return (
        <div className="course-lesson-container" ref={containerRef}>
            <div className="lesson-progress-container">
                <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
            </div>

            <div className="lesson-tabs">
                <button
                    className={`tab-button ${activeTab === 'page1' ? 'active' : ''}`}
                    onClick={() => { setActiveTab('page1'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                >
                    Page 1
                </button>
                <button
                    className={`tab-button ${activeTab === 'page2' ? 'active' : ''}`}
                    onClick={() => { setActiveTab('page2'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                >
                    Page 2
                </button>
            </div>

            <div className="lesson-grid single-card">
                {activeTab === 'page1' && (
                    <div className="lesson-card fade-in" style={{ background: 'transparent', border: 'none', boxShadow: 'none', padding: 0, marginBottom: '2rem' }}>
                        <div className="interactive-stage-container" style={{ width: '100%' }}>
                            <VideoTutorialViewer 
                                steps={SOLIDWORKS_TUTORIAL_STEPS} 
                                imageSrc={mainInterface}
                                showBrowser={true}
                                moreContentStepIds={[7, 9]}
                                fullscreenImageFit="fill"
                            />
                        </div>
                    </div>
                )}

                <div className="lesson-card fade-in">
                    {activeTab === 'page1' && (
                        <>
                            {/* SECTION 1: Mouse Control */}
                            <div className="card-header" style={{ marginTop: "2rem" }}>
                                <h4 className="section-title">Mouse Control</h4>
                            </div>
                            <div className="instruction-step" style={{ paddingLeft: '1rem' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: "1rem" }}>
                                    
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                                        <img src={mouseLeft} alt="Left Mouse Button" style={{ width: '40px', objectFit: 'contain' }} />
                                        <span style={{ fontSize: '1rem', color: 'var(--text-primary)' }}><strong>Left</strong> - use to Select object.</span>
                                    </div>

                                    <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                                        <img src={mouseRight} alt="Right Mouse Button" style={{ width: '40px', objectFit: 'contain' }} />
                                        <span style={{ fontSize: '1rem', color: 'var(--text-primary)' }}><strong>Right</strong> - contains Shortcut Menu. It differs depending on the active cursor of mouse.</span>
                                    </div>

                                    <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                                        <img src={mouseScroll} alt="Scroll Wheel" style={{ width: '40px', objectFit: 'contain' }} />
                                        <div style={{ display: 'flex', gap: '4rem', fontSize: '1rem', color: 'var(--text-primary)' }}>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                                <span><strong>Scroll Up</strong> - Zoom Out</span>
                                                <span><strong>Scroll Down</strong> - Zoom In</span>
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                                <span><strong>Click Scroll</strong> - Rotate model</span>
                                                <span><strong>Ctrl + Scroll</strong> - Pan</span>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            {/* SECTION 2: Keyboard Shortcuts */}
                            <div className="card-header" style={{ marginTop: "2rem" }}>
                                <h4 className="section-title">Keyboard Shortcuts</h4>
                            </div>
                            <div className="instruction-step" style={{ paddingLeft: '1rem' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', marginTop: "1rem" }}>

                                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '2rem', flexWrap: 'wrap' }}>
                                        <div className="lesson-table-container" style={{ width: '350px' }}>
                                            <table className="lesson-table">
                                                 <thead>
                                                    <tr>
                                                        <th>Shortcut</th>
                                                        <th>Command</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr><td>Ctrl + N</td><td>New</td></tr>
                                                    <tr><td>Ctrl + O</td><td>Open</td></tr>
                                                    <tr><td>Ctrl + S</td><td>Save</td></tr>
                                                    <tr><td>Ctrl + C</td><td>Copy</td></tr>
                                                    <tr><td>Ctrl + V</td><td>Paste</td></tr>
                                                    <tr><td>Ctrl + Z</td><td>Undo</td></tr>
                                                    <tr><td>Ctrl + Y</td><td>Redo</td></tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div style={{ maxWidth: '350px', paddingTop: '0.5rem' }}>
                                            <p className="p-flush red-text">※ These are the commonly used keyboard shortcuts, it can be used not only in Solidworks but to other softwares as well.</p>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '2rem', flexWrap: 'wrap' }}>
                                        <div className="lesson-table-container" style={{ width: '350px' }}>
                                            <table className="lesson-table">
                                                <thead>
                                                    <tr>
                                                        <th>Shortcut</th>
                                                        <th>Command</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr><td>Spacebar</td><td>View Orientation</td></tr>
                                                    <tr><td>Ctrl + b</td><td>Rebuild</td></tr>
                                                    <tr><td>f</td><td>Fit to view</td></tr>
                                                    <tr><td>g</td><td>Magnify</td></tr>
                                                    <tr><td>l</td><td>Line</td></tr>
                                                    <tr><td>m</td><td>Measure</td></tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div style={{ maxWidth: '350px', paddingTop: '0.5rem' }}>
                                            <p className="p-flush red-text">※ It is the commonly used shortcuts in SolidWorks.</p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </>
                    )}

                    {activeTab === 'page2' && (
                        <>
                            {/* ======================================================= */}
                            {/* SECTION 3: Menu Bar                                      */}
                            {/* ======================================================= */}
                            <div className="card-header" style={{ marginTop: "2rem" }}>
                                <h4 className="section-title">Menu Bar</h4>
                            </div>
                            <div className="instruction-step">
                                <p className="p-flush" style={{ color: 'var(--text-muted)' }}>
                                    Contains the commonly used tool buttons, the Application Menu, Pin Icon (used to show/hide the Application Menu), and Commonly Used Tools such as Undo/Redo, Selection Tool, Rebuild, File Properties, and SOLIDWORKS Options settings.
                                </p>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', marginTop: '1rem' }}>
                                    <div style={{ flex: '1 1 300px', minWidth: '250px' }}>
                                        <img
                                            src={menubar1}
                                            alt="SolidWorks Menu Bar — Application Menu and Pin Icon"
                                            className="software-screenshot screenshot-wide"
                                        />
                                    </div>
                                    <div style={{ flex: '1 1 300px', minWidth: '250px' }}>
                                        <img
                                            src={menubar2}
                                            alt="SolidWorks Menu Bar — Commonly Used Tools"
                                            className="software-screenshot screenshot-wide"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* ======================================================= */}
                            {/* SECTION 4: Command Manager                               */}
                            {/* ======================================================= */}
                            <div className="card-header" style={{ marginTop: "2rem" }}>
                                <h4 className="section-title">Command Manager</h4>
                            </div>
                            <div className="instruction-step">
                                <p className="p-flush" style={{ color: 'var(--text-muted)' }}>
                                    It is a toolbar that consists of different toolbars containing sets of commands for every function.
                                </p>

                                {/* 4a. Part Mode */}
                                <div style={{ marginTop: '1.5rem' }}>
                                    <div className="step-header">
                                        <span className="step-label">Part Mode CommandManager</span>
                                    </div>
                                    <p className="p-flush" style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                                        It is a set of toolbars that consists of different commands that are commonly used during the designing process.
                                    </p>
                                    <img
                                        src={partMode}
                                        alt="Part Mode CommandManager — Features, Sketch, Sheet Metal, Evaluate, DimXpert, Office Products"
                                        className="software-screenshot screenshot-wide"
                                        style={{ marginTop: '1rem' }}
                                    />
                                </div>

                                {/* 4b. Assembly Mode */}
                                <div style={{ marginTop: '2rem' }}>
                                    <div className="step-header">
                                        <span className="step-label">Assembly Mode CommandManager</span>
                                    </div>
                                    <p className="p-flush" style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                                        It is a set of toolbars that consists of different commands that are used to assemble parts and simulate an assembly.
                                    </p>
                                    <img
                                        src={assemblyMode}
                                        alt="Assembly Mode CommandManager — Assembly, Layout, Sketch, Evaluate, Office Products"
                                        className="software-screenshot screenshot-wide"
                                        style={{ marginTop: '1rem' }}
                                    />
                                </div>

                                {/* 4c. Drawing Mode */}
                                <div style={{ marginTop: '2rem' }}>
                                    <div className="step-header">
                                        <span className="step-label">Drawing Mode CommandManager</span>
                                    </div>
                                    <p className="p-flush" style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                                        It is a set of toolbars that consists of different commands that are commonly used during the drawing process.
                                    </p>
                                    <img
                                        src={drawingMode}
                                        alt="Drawing Mode CommandManager — View Layout, Annotation, Sketch, Evaluate, Office Products"
                                        className="software-screenshot screenshot-wide"
                                        style={{ marginTop: '1rem' }}
                                    />
                                </div>
                            </div>

                            {/* ======================================================= */}
                            {/* SECTION 5: Heads-up View Toolbar                         */}
                            {/* ======================================================= */}
                            <div className="card-header" style={{ marginTop: "2rem" }}>
                                <h4 className="section-title">Heads-up View Toolbar</h4>
                            </div>
                            <div className="instruction-step">
                                <p className="p-flush" style={{ color: 'var(--text-muted)' }}>
                                    It contains quick-access view manipulation commands such as Section View, View Orientation, Display Style, Hide/Show Items, Edit Appearance, and others.
                                </p>
                                <img
                                    src={toolbar}
                                    alt="Heads-up View Toolbar — Section View, View Orientation, Display Style, Hide/Show Items, Edit Appearance"
                                    className="software-screenshot screenshot-wide"
                                    style={{ marginTop: '1rem' }}
                                />
                            </div>

                            {/* ======================================================= */}
                            {/* SECTION 6: FeatureManager Tree View                      */}
                            {/* ======================================================= */}
                            <div className="card-header" style={{ marginTop: "2rem" }}>
                                <h4 className="section-title">FeatureManager Tree View</h4>
                            </div>
                            <div className="instruction-step">
                                <p className="p-flush" style={{ color: 'var(--text-muted)' }}>
                                    It displays all the features used in 3D modeling, parts inserted in 3D assemblies including their features, and the views used in 2D detailing including the Bill of Materials.
                                </p>
                                <div className="course-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginTop: '1rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                        <img
                                            src={treeview1}
                                            alt="FeatureManager Tree View — Part features"
                                            className="software-screenshot"
                                            style={{ maxWidth: '100%', height: 'auto', objectFit: 'contain' }}
                                        />
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                        <img
                                            src={treeview2}
                                            alt="FeatureManager Tree View — Assembly parts and features"
                                            className="software-screenshot"
                                            style={{ maxWidth: '100%', height: 'auto', objectFit: 'contain' }}
                                        />
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                        <img
                                            src={treeview3}
                                            alt="FeatureManager Tree View — Drawing views and Bill of Materials"
                                            className="software-screenshot"
                                            style={{ maxWidth: '100%', height: 'auto', objectFit: 'contain' }}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* ======================================================= */}
                            {/* SECTION 7: Coordinate System                             */}
                            {/* ======================================================= */}
                            <div className="card-header" style={{ marginTop: "2rem" }}>
                                <h4 className="section-title">Coordinate System</h4>
                            </div>
                            <div className="instruction-step">
                                <p className="p-flush" style={{ color: 'var(--text-muted)' }}>
                                    It shows the position of the 3D model. It is located at the lower-left area of the Graphics Area.
                                </p>
                                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1.5rem', marginTop: '1.5rem' }}>
                                    {coordinateImages.map((img, idx) => (
                                        <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                                            <img
                                                src={img.src}
                                                alt={img.alt}
                                                style={{ height: '60px', objectFit: 'contain' }}
                                            />
                                            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>{img.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* ======================================================= */}
                            {/* SECTION 8: Status Bar                                    */}
                            {/* ======================================================= */}
                            <div className="card-header" style={{ marginTop: "2rem" }}>
                                <h4 className="section-title">Status Bar</h4>
                            </div>
                            <div className="instruction-step">
                                <p className="p-flush" style={{ color: 'var(--text-muted)' }}>
                                    It shows information about the user's current performance and also displays the function of a tool or command when the mouse pointer hovers over it. It is located at the bottom of the SOLIDWORKS interface.
                                </p>
                                <img
                                    src={statusbar}
                                    alt="SolidWorks Status Bar — displays tool information and current performance"
                                    className="software-screenshot screenshot-wide"
                                    style={{ marginTop: '1rem' }}
                                />
                            </div>
                        </>
                    )}

                    {/* Lesson Navigation */}
                    <div className="lesson-navigation">
                        {activeTab === 'page1' ? (
                            <>
                                <button
                                    className="nav-button"
                                    onClick={() => { if (onPrevLesson) onPrevLesson(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                                >
                                    <ChevronLeft size={18} /> Previous
                                </button>
                                <button
                                    className="nav-button next"
                                    onClick={() => { setActiveTab('page2'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                                >
                                    Next <ChevronRight size={18} />
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    className="nav-button"
                                    onClick={() => { setActiveTab('page1'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                                >
                                    <ChevronLeft size={18} /> Previous
                                </button>
                                <button
                                    className="nav-button next"
                                    onClick={() => { if (onNextLesson) onNextLesson(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                                >
                                    {nextLabel || 'Next Lesson'} <ChevronRight size={18} />
                                </button>
                            </>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default SolidworkInterfaceLesson;
