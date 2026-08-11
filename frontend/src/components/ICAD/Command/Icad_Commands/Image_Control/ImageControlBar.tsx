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

    const isFullscreen = isExternalFullscreen !== undefined ? isExternalFullscreen : (isNativeFullscreen || isCssFallback);

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

    // Native Fullscreen change listeners
    useEffect(() => {
        const handleFullscreenChange = () => {
            const isNative = checkIsFullscreen();
            setIsNativeFullscreen(isNative);
            if (isNative) {
                setIsCssFallback(false);
            }
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

        const target = containerRef?.current as any;

        if (isFullscreen) {
            if (isNativeFullscreen) {
                const doc = document as any;
                const exitFS =
                    doc.exitFullscreen ||
                    doc.webkitExitFullscreen ||
                    doc.mozCancelFullScreen ||
                    doc.msExitFullscreen;

                if (exitFS) {
                    try {
                        const res = exitFS.call(doc);
                        if (res && typeof res.then === "function") {
                            res.catch((e: any) => console.error("[ImageControlBar] Error exiting native fullscreen:", e));
                        }
                    } catch (e) {
                        console.error("[ImageControlBar] Error exiting native fullscreen:", e);
                    }
                }
            }
            setIsCssFallback(false);
        } else {
            setIsCssFallback(true);
            if (target) {
                const requestFS =
                    target.requestFullscreen ||
                    target.webkitRequestFullscreen ||
                    target.mozRequestFullScreen ||
                    target.msRequestFullscreen ||
                    target.webkitEnterFullscreen;

                if (requestFS) {
                    try {
                        const res = requestFS.call(target);
                        if (res && typeof res.then === "function") {
                            res.catch((err: any) => {
                                console.warn("[ImageControlBar] Native requestFullscreen rejected (using viewport expansion fallback):", err);
                            });
                        }
                    } catch (err) {
                        console.warn("[ImageControlBar] Native requestFullscreen call threw:", err);
                    }
                }
            }
        }
    };

    return (
        <div
            className="icb-pill-wrapper"
            style={{
                position: "absolute",
                bottom: "18px",
                right: "18px",
                zIndex: 1000,
                transition: dragRef.current ? "none" : "all 0.2s ease",
                transform: `translate(${navPos.x}px, ${navPos.y}px)`
            }}
        >
            {/* Reference / Browse Floating Modal */}
            {isBrowseOpen && (
                <div
                    onClick={(e) => e.stopPropagation()}
                    style={{
                        position: "absolute",
                        bottom: "calc(100% + 14px)",
                        left: "0px",
                        width: "320px",
                        maxWidth: "calc(100vw - 36px)",
                        backgroundColor: isLight ? "var(--glass-bg)" : "rgba(10, 6, 14, 0.92)",
                        backdropFilter: "blur(var(--glass-blur))",
                        borderRadius: "20px",
                        border: "1px solid #DD4DFA",
                        boxShadow: isLight
                            ? "var(--shadow-card)"
                            : "var(--shadow-card), 0 0 25px rgba(221, 77, 250, 0.35)",
                        padding: "16px 18px",
                        zIndex: 1010,
                        fontFamily: "var(--font-main)"
                    }}
                >
                    {/* Header — title becomes a select-style dropdown when there are multiple sections */}
                    <div
                        style={{
                            position: "relative",
                            paddingTop: "0px",
                            paddingBottom: "12px",
                            paddingLeft: "18px",
                            paddingRight: "18px",
                            marginLeft: "-18px",
                            marginRight: "-18px",
                            marginBottom: "10px",
                            borderBottom: "1px solid rgba(255, 255, 255, 0.25)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between"
                        }}
                    >
                        {canSwitchSections ? (
                            <button
                                onClick={() => setIsTitleDropdownOpen(prev => !prev)}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "6px",
                                    background: "none",
                                    border: "none",
                                    padding: 0,
                                    cursor: "pointer",
                                    fontSize: "11px",
                                    fontWeight: "700",
                                    color: "#DD4DFA",
                                    letterSpacing: "1.2px",
                                    textTransform: "uppercase",
                                    fontFamily: "var(--font-heading)"
                                }}
                            >
                                <span>{activeSection ? activeSection.title : referenceTitle}</span>
                                <ChevronDown
                                    size={13}
                                    style={{
                                        transform: isTitleDropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                                        transition: "transform 0.2s ease"
                                    }}
                                />
                            </button>
                        ) : (
                            <span style={{
                                fontSize: "11px",
                                fontWeight: "700",
                                color: "#DD4DFA",
                                letterSpacing: "1.2px",
                                textTransform: "uppercase",
                                fontFamily: "var(--font-heading)"
                            }}>
                                {activeSection ? activeSection.title : referenceTitle}
                            </span>
                        )}

                        <button
                            onClick={() => toggleBrowse()}
                            style={{
                                background: "none",
                                border: "none",
                                color: "var(--text-muted)",
                                cursor: "pointer",
                                padding: "2px",
                                display: "flex",
                                alignItems: "center"
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
                            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
                        >
                            <X size={14} />
                        </button>

                        {/* Section-switcher dropdown, anchored under the title */}
                        {canSwitchSections && isTitleDropdownOpen && (
                            <div
                                style={{
                                    position: "absolute",
                                    top: "calc(100% + 6px)",
                                    left: 0,
                                    minWidth: "190px",
                                    backgroundColor: isLight ? "var(--glass-bg)" : "#1c1c22",
                                    border: "1px solid var(--glass-border)",
                                    borderRadius: "10px",
                                    boxShadow: "var(--shadow-card)",
                                    overflow: "hidden",
                                    zIndex: 30
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
                                                fontSize: "11px",
                                                fontWeight: "700",
                                                letterSpacing: "0.8px",
                                                textTransform: "uppercase",
                                                fontFamily: "var(--font-main)",
                                                backgroundColor: isSelected
                                                    ? "rgba(221, 77, 250, 0.1)"
                                                    : "transparent",
                                                color: isSelected
                                                    ? "#DD4DFA"
                                                    : "var(--text-muted)"
                                            }}
                                            onMouseEnter={(e) => {
                                                if (!isSelected) e.currentTarget.style.backgroundColor = "rgba(221, 77, 250, 0.05)";
                                            }}
                                            onMouseLeave={(e) => {
                                                if (!isSelected) e.currentTarget.style.backgroundColor = "transparent";
                                            }}
                                        >
                                            {section.title}
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* List of items for the currently selected section (or flat items when no sections) */}
                    <div
                        style={{
                            maxHeight: "380px",
                            overflowY: "auto",
                            display: "flex",
                            flexDirection: "column",
                            gap: "3px",
                            paddingRight: "2px"
                        }}
                    >
                        {itemsToRender.map((item, idx) => {
                            const label = typeof item === "string" ? item : item.label;
                            const localIdx = typeof item === "string" ? idx : (item.index !== undefined ? item.index : idx);
                            const itemIndex = activeIndexOffset + localIdx;
                            const isActive = currentStepIndex === itemIndex;
                            const isHovered = hoveredItemIndex === itemIndex;
                            const isHighlighted = isActive || isHovered;

                            return (
                                <div
                                    key={idx}
                                    onClick={() => { if (onSelectStep) onSelectStep(itemIndex); }}
                                    onMouseEnter={() => setHoveredItemIndex(itemIndex)}
                                    onMouseLeave={() => setHoveredItemIndex(null)}
                                    style={{
                                        position: "relative", display: "flex", alignItems: "center",
                                        gap: "12px", padding: "8px 12px 8px 16px", borderRadius: "10px",
                                        cursor: "pointer",
                                        backgroundColor: isActive
                                            ? "rgba(221, 77, 250, 0.1)"
                                            : isHovered ? "rgba(255, 255, 255, 0.06)" : "transparent",
                                        border: "1px solid transparent", transition: "all 0.15s ease"
                                    }}
                                >
                                    {isHighlighted && (
                                        <div style={{
                                            position: "absolute", left: "6px", top: "50%",
                                            transform: "translateY(-50%)",
                                            width: "4px", height: "60%",
                                            borderRadius: "4px",
                                            backgroundColor: "#DD4DFA"
                                        }} />
                                    )}
                                    <div style={{
                                        width: "24px", height: "24px", borderRadius: "6px", flexShrink: 0,
                                        backgroundColor: isActive ? "rgba(221, 77, 250, 0.25)" : "rgba(255, 255, 255, 0.1)",
                                        color: isActive ? "#DD4DFA" : isHovered ? "var(--text-primary)" : "var(--text-muted)",
                                        fontSize: "11px", fontWeight: "700",
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        transition: "all 0.15s ease"
                                    }}>
                                        {localIdx + 1}
                                    </div>
                                    <span style={{
                                        fontSize: "13px", fontWeight: isHighlighted ? "700" : "600",
                                        color: isActive ? "#DD4DFA" : "var(--text-primary)",
                                        fontFamily: "var(--font-main)",
                                        whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                                        transition: "all 0.15s ease"
                                    }}>
                                        {label}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Floating Control Pill Bar */}
            <div
                className="icb-pill"
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    backgroundColor: "#141419F2",
                    backdropFilter: "blur(12px)",
                    padding: "8px 16px",
                    borderRadius: "32px",
                    boxShadow: "var(--shadow-card), 0 0 0 1px rgba(255, 255, 255, 0.1)",
                    userSelect: "none"
                }}
            >
                {/* Grip Handle - Draggable */}
                <div
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                    onPointerCancel={handlePointerUp}
                    title="Drag control bar"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        color: "rgba(255, 255, 255, 0.6)",
                        paddingRight: "2px",
                        cursor: "grab",
                        touchAction: "none"
                    }}
                >
                    <GripHorizontal size={11} color="#636262cb" strokeWidth={2} />
                </div>

                {/* Browse / Close Button */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleBrowse();
                    }}
                    title="Toggle Interface Reference (B)"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "7px",
                        background: isBrowseOpen
                            ? "#DD4DFA"
                            : "rgba(12, 12, 12, 0.13)",
                        color: "#FFFFFF",
                        border: isBrowseOpen ? "none" : "1px solid rgba(255, 255, 255, 0.12)",
                        borderRadius: "20px",
                        padding: "6px 14px",
                        fontSize: "12.8px",
                        fontWeight: "600",
                        cursor: "pointer",
                        transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                        fontFamily: "var(--font-main)",
                        boxShadow: isBrowseOpen
                            ? "0 2px 8px rgba(221, 77, 250, 0.4)"
                            : "none"
                    }}
                    onMouseEnter={(e) => {
                        if (!isBrowseOpen) e.currentTarget.style.background = "rgba(255, 255, 255, 0.22)";
                        else e.currentTarget.style.opacity = "0.9";
                    }}
                    onMouseLeave={(e) => {
                        if (!isBrowseOpen) e.currentTarget.style.background = "rgba(255, 255, 255, 0.13)";
                        else e.currentTarget.style.opacity = "1";
                    }}
                >
                    {isBrowseOpen ? (
                        <>
                            <X size={15} color="#ffffff" strokeWidth={2.5} />
                            <span>Close</span>
                        </>
                    ) : (
                        <>
                            <LayoutGrid size={14} color="#ffffff" strokeWidth={2} />
                            <span>Browse</span>
                        </>
                    )}
                </button>

                {/* Play/Pause Pill Button */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onTogglePlay();
                    }}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "7px",
                        backgroundColor: "rgba(255, 255, 255, 0.16)",
                        color: "#FFFFFF",
                        border: "none",
                        borderRadius: "20px",
                        padding: "6px 14px",
                        fontSize: "12.8px",
                        fontWeight: "600",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        fontFamily: "var(--font-main)"
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.26)")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.16)")}
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
                            width: "36px",
                            height: "36px",
                            padding: "6px 12px",
                            borderRadius: "50%",
                            backgroundColor: "var(--glass-bg)",
                            backdropFilter: "blur(8px)",
                            color: "var(--text-white)",
                            border: "1px solid var(--glass-border)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            transition: "all 0.2s ease"
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.18)")}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--glass-bg)")}
                    >
                        <Square size={14} color="var(--text-white)" strokeWidth={2.2} />
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
                        width: "36px",
                        height: "36px",
                        padding: "6px 12px",
                        borderRadius: "50%",
                        backgroundColor: "var(--glass-bg)",
                        backdropFilter: "blur(8px)",
                        color: "var(--text-white)",
                        border: "1px solid var(--glass-border)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: canGoPrev ? "pointer" : "not-allowed",
                        opacity: canGoPrev ? 1 : 0.35,
                        transition: "all 0.2s ease"
                    }}
                    onMouseEnter={(e) => {
                        if (canGoPrev) e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.18)";
                    }}
                    onMouseLeave={(e) => {
                        if (canGoPrev) e.currentTarget.style.backgroundColor = "var(--glass-bg)";
                    }}
                >
                    <ChevronLeft size={18} color="var(--text-white)" strokeWidth={2.2} />
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
                        width: "36px",
                        height: "36px",
                        padding: "6px 12px",
                        borderRadius: "50%",
                        backgroundColor: "var(--glass-bg)",
                        backdropFilter: "blur(8px)",
                        color: "var(--text-white)",
                        border: "1px solid var(--glass-border)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: canGoNext ? "pointer" : "not-allowed",
                        opacity: canGoNext ? 1 : 0.35,
                        transition: "all 0.2s ease"
                    }}
                    onMouseEnter={(e) => {
                        if (canGoNext) e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.18)";
                    }}
                    onMouseLeave={(e) => {
                        if (canGoNext) e.currentTarget.style.backgroundColor = "var(--glass-bg)";
                    }}
                >
                    <ChevronRight size={18} color="var(--text-white)" strokeWidth={2.2} />
                </button>

                {/* Fullscreen Button */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleFullscreen();
                    }}
                    title={isFullscreen ? "Exit Fullscreen (F)" : "Fullscreen (F)"}
                    style={{
                        width: "36px",
                        height: "36px",
                        padding: "0px 20px",
                        borderRadius: "50%",
                        backgroundColor: "var(--glass-bg)",
                        backdropFilter: "blur(8px)",
                        color: "var(--text-white)",
                        border: "1px solid var(--glass-border)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        transition: "all 0.2s ease"
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.18)")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--glass-bg)")}
                >
                    {isFullscreen ? (
                        <Minimize size={17} color="var(--text-white)" strokeWidth={2.2} style={{ display: "block", flexShrink: 0 }} />
                    ) : (
                        <Maximize size={17} color="var(--text-white)" strokeWidth={2.2} style={{ display: "block", flexShrink: 0 }} />
                    )}
                </button>
            </div>
        </div>
    );
};