import React, { useRef, useState, useEffect } from "react";
import {
    Play,
    Pause,
    Square,
    ChevronLeft,
    ChevronRight,
    ChevronDown,
    Maximize,
    Minimize,
    GripHorizontal,
    LayoutGrid,
    X
} from "lucide-react";
import "./Image_Control_Theme/ImageControlBar.css";

export interface ReferenceItem {
    label: string;
    index?: number;
}

export interface ReferenceSection {
    title: string;
    items: (string | ReferenceItem)[];
    indexOffset?: number; // global step index of the first item in this section
}

const DEFAULT_REFERENCE_ITEMS: (string | ReferenceItem)[] = [
    "Menu Bar",
    "Command Manager",
    "Part Mode Command Manager",
    "Assembly Mode Command Manager",
    "Drawing Mode Command Manager",
    "Heads-up View Toolbar",
    "FeatureManager Tree View",
    "Graphics Area",
    "Coordinate System",
    "Status Bar"
];

interface ImageControlBarProps {
    containerRef?: React.RefObject<HTMLDivElement>;
    isFullscreen?: boolean;
    onToggleFullscreen?: () => void;
    onPrevStep?: () => void;
    onNextStep?: () => void;
    canGoPrev?: boolean;
    canGoNext?: boolean;
    isPlaying: boolean;
    onTogglePlay: () => void;
    onStop: () => void;

    // Reference / Browse Modal Props
    referenceTitle?: string;
    referenceItems?: (string | ReferenceItem)[];
    referenceSections?: ReferenceSection[];
    currentStepIndex?: number;
    onSelectStep?: (index: number) => void;
    isBrowseOpen?: boolean;
    onToggleBrowse?: () => void;
}

export const ImageControlBar: React.FC<ImageControlBarProps> = ({
    containerRef,
    isFullscreen: isExternalFullscreen,
    onToggleFullscreen,
    onPrevStep,
    onNextStep,
    canGoPrev = true,
    canGoNext = true,
    isPlaying,
    onTogglePlay,
    onStop,
    referenceTitle = "SOLIDWORKS INTERFACE REFERENCE",
    referenceItems,
    referenceSections,
    currentStepIndex,
    onSelectStep,
    isBrowseOpen: externalIsBrowseOpen,
    onToggleBrowse
}) => {
    const [isNativeFullscreen, setIsNativeFullscreen] = useState(false);
    const [isCssFallback, setIsCssFallback] = useState(false);
    const [navPos, setNavPos] = useState({ x: 0, y: 0 });
    const [internalIsBrowseOpen, setInternalIsBrowseOpen] = useState(false);
    const [hoveredItemIndex, setHoveredItemIndex] = useState<number | null>(null);
    const [activeSectionIndex, setActiveSectionIndex] = useState(0);
    const [isTitleDropdownOpen, setIsTitleDropdownOpen] = useState(false);
    const [isLight, setIsLight] = useState(
        () => document.documentElement.getAttribute('data-theme') === 'light'
    );

    // Track theme changes reactively
    useEffect(() => {
        const observer = new MutationObserver(() => {
            setIsLight(document.documentElement.getAttribute('data-theme') === 'light');
        });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
        return () => observer.disconnect();
    }, []);

    // Keep the active section in range if referenceSections shrinks/changes
    useEffect(() => {
        if (referenceSections && activeSectionIndex >= referenceSections.length) {
            setActiveSectionIndex(0);
        }
    }, [referenceSections, activeSectionIndex]);

    const isBrowseOpen = externalIsBrowseOpen !== undefined ? externalIsBrowseOpen : internalIsBrowseOpen;

    const toggleBrowse = () => {
        if (onToggleBrowse) {
            onToggleBrowse();
        }
        setInternalIsBrowseOpen(prev => !prev);
        setIsTitleDropdownOpen(false);
    };

    const dragRef = useRef<{ startX: number; startY: number; startNavX: number; startNavY: number } | null>(null);

    // CSS-only fullscreen: expands the container to fill the browser's own
    // viewport/page rather than escalating to the OS-level native Fullscreen
    // API. isNativeFullscreen is still tracked (in case the browser enters
    // native fullscreen through some other means, e.g. the user hitting F11
    // directly) but is no longer driven by this component's own toggle.
    const isFullscreen = isExternalFullscreen !== undefined ? isExternalFullscreen : isCssFallback;

    const hasSections = !!(referenceSections && referenceSections.length > 0);
    const activeSection = hasSections ? referenceSections![activeSectionIndex] : null;
    const canSwitchSections = hasSections && referenceSections!.length > 1;

    const itemsToRender = activeSection
        ? activeSection.items
        : (referenceItems && referenceItems.length > 0 ? referenceItems : DEFAULT_REFERENCE_ITEMS);

    const activeIndexOffset = activeSection?.indexOffset ?? 0;

    const checkIsFullscreen = () => {
        const doc = document as any;
        return !!(
            doc.fullscreenElement ||
            doc.webkitFullscreenElement ||
            doc.webkitCurrentFullScreenElement ||
            doc.mozFullScreenElement ||
            doc.msFullscreenElement
        );
    };

    // Pointer Dragging for control pill
    const handlePointerDown = (e: React.PointerEvent) => {
        dragRef.current = {
            startX: e.clientX,
            startY: e.clientY,
            startNavX: navPos.x,
            startNavY: navPos.y
        };
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    };

    const handlePointerMove = (e: React.PointerEvent) => {
        if (!dragRef.current) return;
        const dx = e.clientX - dragRef.current.startX;
        const dy = e.clientY - dragRef.current.startY;
        setNavPos({
            x: dragRef.current.startNavX + dx,
            y: dragRef.current.startNavY + dy
        });
    };

    const handlePointerUp = (e: React.PointerEvent) => {
        if (dragRef.current) {
            try {
                (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
            } catch (_) { }
            dragRef.current = null;
        }
    };

    // Native Fullscreen change listeners — kept as a passive safety net so
    // isNativeFullscreen stays accurate if native fullscreen is triggered
    // by something outside this component (e.g. the user pressing F11).
    useEffect(() => {
        const handleFullscreenChange = () => {
            const isNative = checkIsFullscreen();
            setIsNativeFullscreen(isNative);
        };

        const events = [
            "fullscreenchange",
            "webkitfullscreenchange",
            "mozfullscreenchange",
            "MSFullscreenChange"
        ];

        events.forEach(evt => document.addEventListener(evt, handleFullscreenChange));

        return () => {
            events.forEach(evt => document.removeEventListener(evt, handleFullscreenChange));
        };
    }, []);

    // Keyboard Shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const targetTag = (e.target as HTMLElement)?.tagName?.toLowerCase();
            if (targetTag === "input" || targetTag === "textarea" || (e.target as HTMLElement)?.isContentEditable) {
                return;
            }

            if (e.key === "Escape" && isFullscreen) {
                e.preventDefault();
                toggleFullscreen();
            } else if (e.key === " " || e.code === "Space") {
                e.preventDefault();
                onTogglePlay();
            } else if (e.key === "ArrowLeft") {
                e.preventDefault();
                if (onPrevStep && canGoPrev) onPrevStep();
            } else if (e.key === "ArrowRight") {
                e.preventDefault();
                if (onNextStep && canGoNext) onNextStep();
            } else if (e.key === "f" || e.key === "F") {
                e.preventDefault();
                toggleFullscreen();
            } else if (e.key === "b" || e.key === "B") {
                e.preventDefault();
                toggleBrowse();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [onPrevStep, onNextStep, isFullscreen, isPlaying, canGoPrev, canGoNext, onTogglePlay]);

    const toggleFullscreen = () => {
        if (onToggleFullscreen) {
            onToggleFullscreen();
            return;
        }

        // Intentionally CSS-only: this expands the container to fill the
        // browser's own viewport/page (handled by the consumer via
        // containerRef + isCssFallback), rather than calling the native
        // Fullscreen API, which would hand the entire monitor over to the
        // page and hide the browser chrome (tabs, address bar, etc).
        setIsCssFallback(prev => !prev);
    };

    return (
        <div
            className={`icb-pill-wrapper${isBrowseOpen ? ' is-browsing' : ''}`}
            style={{
                position: "absolute",
                bottom: "18px",
                right: "18px",
                zIndex: 1000,
                transition: dragRef.current ? "none" : "all 0.2s ease",
                transform: `translate(${navPos.x}px, ${navPos.y}px)`
            }}
        >
            {/* Floating Tutorial Control Card */}
            <div
                className={`gallery-control-pill${isBrowseOpen ? ' is-browsing' : ''}`}
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    background: "rgba(20, 20, 25, 0.95)",
                    backdropFilter: "blur(10px)",
                    borderRadius: "40px",
                    padding: "8px 16px",
                    border: "1px solid rgba(255,255,255,0.1)",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
                    color: "#fff",
                }}
            >
                {/* Grip Handle - Draggable */}
                <div
                    className="gallery-control-drag"
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                    onPointerCancel={handlePointerUp}
                    title="Drag control bar"
                    style={{
                        cursor: "grab",
                        padding: "8px",
                        marginRight: "4px",
                        borderRadius: "4px",
                        display: "flex",
                        alignItems: "center"
                    }}
                >
                    <GripHorizontal size={20} color="#888" />
                </div>

                {/* Browse / Close Button */}
                <div className="gallery-browse-anchor" style={{ position: "relative" }}>
                    <button
                        className={`gallery-browse-button${isBrowseOpen ? ' is-open' : ''}`}
                        onClick={(e) => {
                            e.stopPropagation();
                            toggleBrowse();
                        }}
                        title="Toggle Interface Reference (B)"
                        style={{
                            background: isBrowseOpen ? "#DD4DFA" : "rgba(255,255,255,0.1)",
                            border: "none",
                            color: "#fff",
                            padding: "6px 12px",
                            borderRadius: "20px",
                            fontSize: "0.8rem",
                            cursor: "pointer",
                            transition: "all 0.2s",
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            fontWeight: 500,
                            boxShadow: isBrowseOpen ? "0 0 18px rgba(221,77,250,0.5)" : "none",
                        }}
                    >
                        {isBrowseOpen ? (
                            <>
                                <X size={15} color="#ffffff" strokeWidth={2.5} />
                                <span>Close</span>
                            </>
                        ) : (
                            <>
                                <LayoutGrid size={15} color="#ffffff" strokeWidth={2} />
                                <span>Browse</span>
                            </>
                        )}
                    </button>

                    {isBrowseOpen && (
                        <div
                            className="gallery-browse-dropdown"
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                position: "absolute",
                                bottom: "calc(100% + 10px)",
                                right: 0,
                                width: "280px",
                                background: "var(--bg-surface, #0a0a12)",
                                border: "1px solid rgba(221,77,250,0.4)",
                                borderRadius: "14px",
                                boxShadow: "var(--shadow-card, 0 24px 60px rgba(0,0,0,0.9), 0 0 24px rgba(221,77,250,0.2))",
                                zIndex: 1000,
                                maxHeight: "440px",
                                overflowY: "auto",
                                padding: "0.5rem 0",
                            }}
                        >
                            {/* Header */}
                            <div
                                className="gallery-browse-header"
                                style={{
                                    padding: "0.65rem 1rem",
                                    fontSize: "0.65rem",
                                    fontWeight: 800,
                                    letterSpacing: "0.12em",
                                    textTransform: "uppercase",
                                    color: "#DD4DFA",
                                    borderBottom: "1px solid var(--border-color, rgba(255,255,255,0.07))",
                                    marginBottom: "0.25rem",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    position: "relative"
                                }}
                            >
                                {canSwitchSections ? (
                                    <div
                                        onClick={() => setIsTitleDropdownOpen(prev => !prev)}
                                        role="button"
                                        tabIndex={0}
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "4px",
                                            cursor: "pointer",
                                            flex: 1,
                                            minWidth: 0,
                                            overflow: "hidden"
                                        }}
                                    >
                                        <span className="gallery-browse-title" style={{ display: "block", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", minWidth: 0 }}>
                                            {activeSection ? activeSection.title : referenceTitle}
                                        </span>
                                        <ChevronDown
                                            size={12}
                                            style={{
                                                flexShrink: 0,
                                                transform: isTitleDropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                                                transition: "transform 0.2s ease"
                                            }}
                                        />
                                    </div>
                                ) : (
                                    <span className="gallery-browse-title" style={{ display: "block", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", minWidth: 0 }}>
                                        {activeSection ? activeSection.title : referenceTitle}
                                    </span>
                                )}

                                <button
                                    className="gallery-browse-close"
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        toggleBrowse();
                                    }}
                                    aria-label="Close image list"
                                    title="Close image list"
                                    style={{
                                        background: "transparent",
                                        border: "none",
                                        color: "var(--text-muted, rgba(255,255,255,0.75))",
                                        cursor: "pointer",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        padding: 0,
                                        flexShrink: 0,
                                        marginLeft: "8px"
                                    }}
                                >
                                    <X size={16} />
                                </button>

                                {/* Section-switcher dropdown, anchored under the title */}
                                {canSwitchSections && isTitleDropdownOpen && (
                                    <div
                                        style={{
                                            position: "absolute",
                                            top: "100%",
                                            left: "1rem",
                                            minWidth: "190px",
                                            background: "var(--bg-surface, #0a0a12)",
                                            border: "1px solid rgba(221,77,250,0.4)",
                                            borderRadius: "10px",
                                            boxShadow: "0 8px 24px rgba(0,0,0,0.6)",
                                            overflow: "hidden",
                                            zIndex: 30,
                                            marginTop: "4px"
                                        }}
                                    >
                                        {referenceSections!.map((section, idx) => {
                                            const isSelected = idx === activeSectionIndex;
                                            return (
                                                <button
                                                    key={section.title}
                                                    onClick={() => {
                                                        setActiveSectionIndex(idx);
                                                        setIsTitleDropdownOpen(false);
                                                    }}
                                                    style={{
                                                        display: "block",
                                                        width: "100%",
                                                        textAlign: "left",
                                                        padding: "10px 14px",
                                                        border: "none",
                                                        cursor: "pointer",
                                                        fontSize: "0.65rem",
                                                        fontWeight: 800,
                                                        letterSpacing: "0.1em",
                                                        textTransform: "uppercase",
                                                        background: isSelected ? "rgba(221, 77, 250, 0.15)" : "transparent",
                                                        color: isSelected ? "#DD4DFA" : "var(--text-muted, rgba(255,255,255,0.75))"
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        if (!isSelected) e.currentTarget.style.background = "var(--bg-hover, rgba(255,255,255,0.07))";
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        if (!isSelected) e.currentTarget.style.background = "transparent";
                                                    }}
                                                >
                                                    {section.title}
                                                </button>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>

                            {itemsToRender.map((item, idx) => {
                                const label = typeof item === "string" ? item : item.label;
                                const localIdx = typeof item === "string" ? idx : (item.index !== undefined ? item.index : idx);
                                const itemIndex = activeIndexOffset + localIdx;
                                const isActive = currentStepIndex === itemIndex;

                                return (
                                    <button
                                        key={idx}
                                        className={`gallery-browse-item${isActive ? ' is-active' : ''}`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            if (onSelectStep) onSelectStep(itemIndex);
                                        }}
                                        style={{
                                            width: "100%",
                                            background: isActive ? "rgba(221,77,250,0.18)" : "transparent",
                                            border: "none",
                                            borderLeft: isActive ? "3px solid #DD4DFA" : "3px solid transparent",
                                            padding: "0.6rem 1rem",
                                            textAlign: "left",
                                            cursor: "pointer",
                                            color: isActive ? "#DD4DFA" : "var(--text-muted, rgba(255,255,255,0.75))",
                                            fontSize: "0.82rem",
                                            fontWeight: isActive ? 700 : 400,
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "0.65rem",
                                            transition: "all 0.15s ease",
                                        }}
                                        onMouseEnter={(e) => {
                                            if (!isActive) {
                                                (e.currentTarget as HTMLButtonElement).style.background = "var(--bg-hover, rgba(255,255,255,0.04))";
                                                (e.currentTarget as HTMLButtonElement).style.color = "var(--text-main, #fff)";
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            if (!isActive) {
                                                (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                                                (e.currentTarget as HTMLButtonElement).style.color = "var(--text-muted, rgba(255,255,255,0.75))";
                                            }
                                        }}
                                    >
                                        <span
                                            className="gallery-browse-number"
                                            style={{
                                                display: "inline-flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                width: "22px",
                                                height: "22px",
                                                borderRadius: "6px",
                                                flexShrink: 0,
                                                background: isActive ? "rgba(221,77,250,0.3)" : "var(--bg-hover, rgba(255,255,255,0.07))",
                                                fontSize: "0.68rem",
                                                fontWeight: 800,
                                                color: isActive ? "#DD4DFA" : "var(--text-dim, rgba(255,255,255,0.4))",
                                            }}
                                        >
                                            {localIdx + 1}
                                        </span>
                                        <span
                                            style={{
                                                color: isActive ? "#DD4DFA" : "var(--text-main, rgba(255,255,255,0.85))",
                                                lineHeight: 1.4,
                                                flex: 1,
                                                fontSize: "0.82rem"
                                            }}
                                        >
                                            {label}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Play/Pause Pill Button */}
                <button
                    className="gallery-browse-button"
                    onClick={(e) => {
                        e.stopPropagation();
                        onTogglePlay();
                    }}
                    style={{
                        background: isPlaying ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.1)",
                        border: "none",
                        color: "#fff",
                        padding: "6px 12px",
                        borderRadius: "20px",
                        fontSize: "0.8rem",
                        cursor: "pointer",
                        transition: "all 0.2s",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        fontWeight: 500,
                    }}
                >
                    {isPlaying ? (
                        <>
                            <Pause size={15} color="#ffffff" strokeWidth={2.2} />
                            <span>Pause</span>
                        </>
                    ) : (
                        <>
                            <Play size={15} color="#ffffff" strokeWidth={2.2} />
                            <span>Play</span>
                        </>
                    )}
                </button>

                {/* Stop Button */}
                {isPlaying && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onStop();
                        }}
                        title="Stop"
                        style={{
                            background: "transparent",
                            border: "none",
                            color: "#fff",
                            padding: "6px",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <Square size={16} color="#FFFFFF" strokeWidth={2.2} />
                    </button>
                )}

                {/* Previous Step Button */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        if (canGoPrev && onPrevStep) onPrevStep();
                    }}
                    disabled={!canGoPrev}
                    title={canGoPrev ? "Previous Step (Left Arrow)" : "Already at the first step"}
                    style={{
                        background: "transparent",
                        border: "none",
                        color: "#fff",
                        padding: "6px",
                        cursor: canGoPrev ? "pointer" : "not-allowed",
                        opacity: canGoPrev ? 1 : 0.5,
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <ChevronLeft size={18} color="#FFFFFF" strokeWidth={2.2} />
                </button>

                {/* Next Step Button */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        if (canGoNext && onNextStep) onNextStep();
                    }}
                    disabled={!canGoNext}
                    title={canGoNext ? "Next Step (Right Arrow)" : "Already at the last step"}
                    style={{
                        background: "transparent",
                        border: "none",
                        color: "#fff",
                        padding: "6px",
                        cursor: canGoNext ? "pointer" : "not-allowed",
                        opacity: canGoNext ? 1 : 0.5,
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <ChevronRight size={18} color="#FFFFFF" strokeWidth={2.2} />
                </button>

                {/* Fullscreen Button */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleFullscreen();
                    }}
                    title={isFullscreen ? "Exit Fullscreen (F)" : "Fullscreen (F)"}
                    style={{
                        background: "transparent",
                        border: "none",
                        color: "#fff",
                        padding: "6px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        marginLeft: "4px"
                    }}
                >
                    {isFullscreen ? (
                        <Minimize size={17} color="#FFFFFF" strokeWidth={2.2} style={{ display: "block", flexShrink: 0 }} />
                    ) : (
                        <Maximize size={17} color="#FFFFFF" strokeWidth={2.2} style={{ display: "block", flexShrink: 0 }} />
                    )}
                </button>
            </div>
        </div>
    );
};
