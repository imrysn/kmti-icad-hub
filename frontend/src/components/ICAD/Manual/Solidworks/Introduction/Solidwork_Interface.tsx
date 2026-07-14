import React, { useState, useRef, useCallback } from "react";
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
import menubar1 from "../../../../../assets/Solidworks/Introduction/Solidwork_Menubar1.png";
import menubar2 from "../../../../../assets/Solidworks/Introduction/Solidwork_Menubar2.png";
import partMode from "../../../../../assets/Solidworks/Introduction/Solidwork_Part.png";
import assemblyMode from "../../../../../assets/Solidworks/Introduction/Solidwork_Assembly.png";
import drawingMode from "../../../../../assets/Solidworks/Introduction/Solidwork_Drawing.png";
import toolbar from "../../../../../assets/Solidworks/Introduction/Solidwork_Toolbar.png";
import treeview1 from "../../../../../assets/Solidworks/Introduction/Solidwork_Treeview1.png";
import treeview2 from "../../../../../assets/Solidworks/Introduction/Solidwork_Treeview2.png";
import treeview3 from "../../../../../assets/Solidworks/Introduction/Solidwork_Treeview3.png";
import coordinate1 from "../../../../../assets/Solidworks/Introduction/Solidwork_Coordinate1.png";
import coordinate2 from "../../../../../assets/Solidworks/Introduction/Solidwork_Coordinate2.png";
import coordinate3 from "../../../../../assets/Solidworks/Introduction/Solidwork_Coordinate3.png";
import coordinate4 from "../../../../../assets/Solidworks/Introduction/Solidwork_Coordinate4.png";
import coordinate5 from "../../../../../assets/Solidworks/Introduction/Solidwork_Coordinate5.png";
import coordinate6 from "../../../../../assets/Solidworks/Introduction/Solidwork_Coordinate6.png";
import coordinate7 from "../../../../../assets/Solidworks/Introduction/Solidwork_Coordinate7.png";
import coordinate8 from "../../../../../assets/Solidworks/Introduction/Solidwork_Coordinate8.png";
import statusbar from "../../../../../assets/Solidworks/Introduction/Solidwork_Statusbar.png";

interface SolidworkInterfaceProps {
    onNextLesson?: () => void;
    onPrevLesson?: () => void;
    nextLabel?: string;
}

/* ------------------------------------------------------------------ */
/*  Inline Image Carousel Component                                    */
/* ------------------------------------------------------------------ */
interface ImageCarouselProps {
    images: { src: string; alt: string }[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const trackRef = useRef<HTMLDivElement>(null);
    const touchStartX = useRef(0);
    const touchDeltaX = useRef(0);
    const isDragging = useRef(false);

    const goTo = useCallback((index: number) => {
        const clamped = Math.max(0, Math.min(index, images.length - 1));
        setCurrentSlide(clamped);
    }, [images.length]);

    const prev = useCallback(() => goTo(currentSlide - 1), [currentSlide, goTo]);
    const next = useCallback(() => goTo(currentSlide + 1), [currentSlide, goTo]);

    /* Keyboard navigation */
    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
        if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
    }, [prev, next]);

    /* Touch / pointer swipe support */
    const onPointerDown = useCallback((e: React.PointerEvent) => {
        touchStartX.current = e.clientX;
        touchDeltaX.current = 0;
        isDragging.current = true;
        (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    }, []);

    const onPointerMove = useCallback((e: React.PointerEvent) => {
        if (!isDragging.current) return;
        touchDeltaX.current = e.clientX - touchStartX.current;
    }, []);

    const onPointerUp = useCallback(() => {
        if (!isDragging.current) return;
        isDragging.current = false;
        const threshold = 50;
        if (touchDeltaX.current > threshold) prev();
        else if (touchDeltaX.current < -threshold) next();
    }, [prev, next]);

    /* Lazy load: only render images within ±1 of current slide */
    const shouldLoad = (index: number) => Math.abs(index - currentSlide) <= 1;

    return (
        <div
            style={{
                position: 'relative',
                width: '100%',
                overflow: 'hidden',
                borderRadius: '12px',
                border: '1px solid var(--glass-border)',
                background: 'rgba(255,255,255,0.03)',
            }}
            tabIndex={0}
            onKeyDown={handleKeyDown}
            role="region"
            aria-roledescription="carousel"
            aria-label="Coordinate System images"
        >
            {/* Track */}
            <div
                ref={trackRef}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerCancel={onPointerUp}
                style={{
                    display: 'flex',
                    transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    transform: `translateX(-${currentSlide * 100}%)`,
                    touchAction: 'pan-y',
                    cursor: 'grab',
                }}
            >
                {images.map((img, i) => (
                    <div
                        key={i}
                        role="group"
                        aria-roledescription="slide"
                        aria-label={`Slide ${i + 1} of ${images.length}`}
                        style={{
                            flex: '0 0 100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '1.5rem',
                            boxSizing: 'border-box',
                        }}
                    >
                        {shouldLoad(i) ? (
                            <img
                                src={img.src}
                                alt={img.alt}
                                loading="lazy"
                                style={{
                                    maxWidth: '100%',
                                    maxHeight: '320px',
                                    height: 'auto',
                                    objectFit: 'contain',
                                    borderRadius: '8px',
                                    userSelect: 'none',
                                    pointerEvents: 'none',
                                }}
                            />
                        ) : (
                            <div style={{ width: '100%', height: '200px' }} />
                        )}
                    </div>
                ))}
            </div>

            {/* Previous Button */}
            {currentSlide > 0 && (
                <button
                    onClick={prev}
                    aria-label="Previous slide"
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '0.5rem',
                        transform: 'translateY(-50%)',
                        background: 'var(--glass-bg)',
                        backdropFilter: 'blur(8px)',
                        border: '1px solid var(--glass-border)',
                        borderRadius: '50%',
                        width: '36px',
                        height: '36px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        color: 'var(--text-white)',
                        transition: 'all 0.2s ease',
                        zIndex: 2,
                    }}
                >
                    <ChevronLeft size={18} />
                </button>
            )}

            {/* Next Button */}
            {currentSlide < images.length - 1 && (
                <button
                    onClick={next}
                    aria-label="Next slide"
                    style={{
                        position: 'absolute',
                        top: '50%',
                        right: '0.5rem',
                        transform: 'translateY(-50%)',
                        background: 'var(--glass-bg)',
                        backdropFilter: 'blur(8px)',
                        border: '1px solid var(--glass-border)',
                        borderRadius: '50%',
                        width: '36px',
                        height: '36px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        color: 'var(--text-white)',
                        transition: 'all 0.2s ease',
                        zIndex: 2,
                    }}
                >
                    <ChevronRight size={18} />
                </button>
            )}

            {/* Dot Indicators */}
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '0.4rem',
                padding: '0.75rem 0',
            }}>
                {images.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => goTo(i)}
                        aria-label={`Go to slide ${i + 1}`}
                        style={{
                            width: currentSlide === i ? '20px' : '8px',
                            height: '8px',
                            borderRadius: '100px',
                            border: 'none',
                            background: currentSlide === i ? 'var(--primary)' : 'rgba(255,255,255,0.25)',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            padding: 0,
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

/* ------------------------------------------------------------------ */
/*  Main Lesson Component                                              */
/* ------------------------------------------------------------------ */

const coordinateImages = [
    { src: coordinate1, alt: "Coordinate System — Front view" },
    { src: coordinate2, alt: "Coordinate System — Back view" },
    { src: coordinate3, alt: "Coordinate System — Left view" },
    { src: coordinate4, alt: "Coordinate System — Right view" },
    { src: coordinate5, alt: "Coordinate System — Top view" },
    { src: coordinate6, alt: "Coordinate System — Bottom view" },
    { src: coordinate7, alt: "Coordinate System — Isometric view" },
    { src: coordinate8, alt: "Coordinate System — Trimetric view" },
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
                <div className="lesson-card fade-in">

                    {activeTab === 'page1' && (
                        <>
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
                                        <div className="card-graphic-container" style={{ background: 'transparent', padding: '1rem' }}>
                                            <img src={mouseLeft} alt="Left Mouse Button" style={{ maxHeight: '80px', objectFit: 'contain' }} />
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
                                        <div className="card-graphic-container" style={{ background: 'transparent', padding: '1rem' }}>
                                            <img src={mouseRight} alt="Right Mouse Button" style={{ maxHeight: '80px', objectFit: 'contain' }} />
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
                                        <div className="card-graphic-container" style={{ background: 'transparent', padding: '1rem' }}>
                                            <img src={mouseScroll} alt="Scroll Wheel" style={{ maxHeight: '80px', objectFit: 'contain' }} />
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
                            {/* SECTION 7: Coordinate System (Carousel)                  */}
                            {/* ======================================================= */}
                            <div className="card-header" style={{ marginTop: "2rem" }}>
                                <h4 className="section-title">Coordinate System</h4>
                            </div>
                            <div className="instruction-step">
                                <p className="p-flush" style={{ color: 'var(--text-muted)' }}>
                                    It shows the position of the 3D model. It is located at the lower-left area of the Graphics Area.
                                </p>
                                <div style={{ marginTop: '1rem' }}>
                                    <ImageCarousel images={coordinateImages} />
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
                    <div className="lesson-navigation" style={{ marginTop: "2rem" }}>
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
                                    Next Page <ChevronRight size={18} />
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    className="nav-button"
                                    onClick={() => { setActiveTab('page1'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                                >
                                    <ChevronLeft size={18} /> Previous Page
                                </button>
                                <button
                                    className="nav-button next"
                                    onClick={() => { if (onNextLesson) onNextLesson(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                                >
                                    {nextLabel || 'Next'} <ChevronRight size={18} />
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
