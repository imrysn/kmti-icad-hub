import { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import menuBarVideo from '../../../../../../assets/Commands/Japanese_Tutorial/Menu_Bar.mp4';
import { VideoControlBar } from '../../Video_Control/VideoControlBar';
import { SpotlightConfig } from './File_Dropdown_Items/FileDropdownItems';

import View_Dropdown from '../../../../../../assets/Commands/Japanese_Tutorial/Menu_Bar_Label/View_Dropdown.png';
import File_Dropdown from '../../../../../../assets/Commands/Japanese_Tutorial/Menu_Bar_Label/File_Dropdown.png';
import Info_Dropdown from '../../../../../../assets/Commands/Japanese_Tutorial/Menu_Bar_Label/Infor_Dropdown.png';
import Settings_Dropdown from '../../../../../../assets/Commands/Japanese_Tutorial/Menu_Bar_Label/Settings_Dropdown.png';
import Tools_Dropdown from '../../../../../../assets/Commands/Japanese_Tutorial/Menu_Bar_Label/Tools_Dropdown.png';
import Window_Dropdown from '../../../../../../assets/Commands/Japanese_Tutorial/Menu_Bar_Label/Window_Dropdown.png';
import Help_Dropdown from '../../../../../../assets/Commands/Japanese_Tutorial/Menu_Bar_Label/Help_Dropdown.png';


const SPOTLIGHTS: SpotlightConfig[] = [
    { label: "File", startTime: 3.6, endTime: 4.8, pxX: 0, pxY: 34, pxW: 710, pxH: 570, dropdownImage: File_Dropdown },
    { label: "View", startTime: 4.8, endTime: 6.3, pxX: 64, pxY: 34, pxW: 240, pxH: 380, dropdownImage: View_Dropdown },
    { label: "Information", startTime: 6.3, endTime: 7.8, pxX: 120, pxY: 34, pxW: 248, pxH: 470, dropdownImage: Info_Dropdown },
    { label: "Settings", startTime: 7.8, endTime: 9.3, pxX: 197, pxY: 34, pxW: 307, pxH: 660, dropdownImage: Settings_Dropdown },
    { label: "Tools", startTime: 9.3, endTime: 11.1, pxX: 251, pxY: 34, pxW: 234, pxH: 220, dropdownImage: Tools_Dropdown },
    { label: "Window", startTime: 11.1, endTime: 12.9, pxX: 311, pxY: 34, pxW: 356, pxH: 520, dropdownImage: Window_Dropdown },
    { label: "Help", startTime: 12.9, endTime: 15.7, pxX: 390, pxY: 34, pxW: 242, pxH: 230, dropdownImage: Help_Dropdown }
];

const DROPDOWN_WIDTHS: Record<string, string> = {
    File: "42%",
    View: "17%",
    Information: "17%",
    Settings: "20%",
    Tools: "17%",
    Window: "22%",
    Help: "17%"
};

// Highlight box size (in the video's native 1920x1042 pixel space) for each
// menu label's button. Tune width/height per label so the spotlight cutout
// matches that button's actual footprint in the video, instead of every
// label sharing one fixed box size.
const LABEL_BOX_SIZES: Record<string, { width: number; height: number }> = {
    File: { width: 70, height: 26 },
    View: { width: 60, height: 26 },
    Information: { width: 81, height: 26 },
    Settings: { width: 57, height: 26 },
    Tools: { width: 63, height: 26 },
    Window: { width: 83, height: 26 },
    Help: { width: 66, height: 26 }
};
const DEFAULT_LABEL_BOX_SIZE = { width: 90, height: 26 };

function Menu_Bar_Japanese_Tutorial() {
    const [videoError, setVideoError] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [isEnded, setIsEnded] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isLabelDropdownOpen, setIsLabelDropdownOpen] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    // Ref to the 16:9 frame div that has overflow:hidden — used to compute
    // the label button's real on-screen position so it can be rendered
    // outside that clipping boundary via a portal.
    const frameRef = useRef<HTMLDivElement>(null);

    const [frameRect, setFrameRect] = useState<{ left: number; top: number; width: number; height: number } | null>(null);

    const activeSpotlightIndex = SPOTLIGHTS.findIndex(
        (spot) => currentTime >= spot.startTime && currentTime <= spot.endTime
    );
    const activeSpotlight = !isEnded && activeSpotlightIndex !== -1 ? SPOTLIGHTS[activeSpotlightIndex] : undefined;

    const jumpToTime = (time: number) => {
        if (videoRef.current) {
            setIsEnded(false);
            videoRef.current.currentTime = time;
            videoRef.current.play().catch(() => { });
        }
    };

    const handlePrevStep = () => {
        if (activeSpotlightIndex > 0) {
            jumpToTime(SPOTLIGHTS[activeSpotlightIndex - 1].startTime);
        } else {
            jumpToTime(SPOTLIGHTS[0].startTime);
        }
    };

    const handleNextStep = () => {
        if (activeSpotlightIndex !== -1 && activeSpotlightIndex < SPOTLIGHTS.length - 1) {
            jumpToTime(SPOTLIGHTS[activeSpotlightIndex + 1].startTime);
        } else {
            jumpToTime(SPOTLIGHTS[0].startTime);
        }
    };

    const spotX = activeSpotlight ? (activeSpotlight.pxX / 1920) * 100 : 0;
    const spotY = activeSpotlight ? ((activeSpotlight.pxY - 27 + 7 + 15) / 1042) * 100 : 0;

    // Box size matched to the active spotlight's own button footprint (falls
    // back to a sensible default if a label isn't in LABEL_BOX_SIZES)
    const activeBoxSize = activeSpotlight
        ? (LABEL_BOX_SIZES[activeSpotlight.label] ?? DEFAULT_LABEL_BOX_SIZE)
        : DEFAULT_LABEL_BOX_SIZE;
    const spotW = (activeBoxSize.width / 1920) * 100;
    const spotH = (activeBoxSize.height / 1042) * 100;

    // Keep frameRect in sync with the actual rendered size/position of the
    // 16:9 frame, so the portaled label button can be placed using real
    // screen pixels instead of percentages that get clipped by the frame's
    // overflow:hidden. Recomputes on fullscreen toggle, window resize, and
    // whenever a spotlight becomes active (position may shift on entry).
    useLayoutEffect(() => {
        const updateRect = () => {
            if (frameRef.current) {
                const rect = frameRef.current.getBoundingClientRect();
                setFrameRect({ left: rect.left, top: rect.top, width: rect.width, height: rect.height });
            }
        };

        updateRect();
        window.addEventListener("resize", updateRect);
        // capture:true so this fires even when a scrollable ANCESTOR (not
        // window) scrolls — scroll events don't bubble, but capture-phase
        // listeners on window still see them.
        window.addEventListener("scroll", updateRect, true);
        const settleTimer = setTimeout(updateRect, 50);

        return () => {
            window.removeEventListener("resize", updateRect);
            window.removeEventListener("scroll", updateRect, true);
            clearTimeout(settleTimer);
        };
    }, [isFullscreen, activeSpotlight]);
    // Real on-screen pixel position for the label button + its dropdown
    // image, derived from frameRect instead of percentages of a clipped
    // ancestor. This is what gets portaled to document.body.
    const labelButtonPos = activeSpotlight && frameRect
        ? {
            left: frameRect.left + (spotX / 100) * frameRect.width + (spotW / 100) * frameRect.width + 6,
            top: frameRect.top + (spotY / 100) * frameRect.height - 8,
        }
        : null;

    const dropdownImagePos = activeSpotlight && frameRect
        ? {
            left: frameRect.left + (spotX / 100) * frameRect.width,
            top: frameRect.top + ((spotY + spotH) / 100) * frameRect.height + 6,
            width: (parseFloat(DROPDOWN_WIDTHS[activeSpotlight.label] ?? "20") / 100) * frameRect.width,
        }
        : null;

    const videoContainerMarkup = (
        <div
            ref={containerRef}
            className={`video-fullscreen-container ${isFullscreen ? 'is-expanded-fullscreen' : ''}`}
            style={isFullscreen ? {
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                backgroundColor: "#000000",
                zIndex: 999999,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden"
            } : {
                position: "relative",
                width: "80%",
                maxWidth: "1000px",
                aspectRatio: "1920 / 1042",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
                borderRadius: "8px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.5)"
            }}
        >
            {/* 16:9 Video Frame Container — always locked to the video's aspect ratio so spotlight/box percentages stay aligned with the actual video, even in fullscreen */}
            <div
                ref={frameRef}
                style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    maxWidth: "100%",
                    maxHeight: "100%",
                    aspectRatio: "1920 / 1042",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    overflow: "hidden"
                }}
            >
                <video
                    ref={videoRef}
                    src={menuBarVideo}
                    preload="auto"
                    onPlay={() => setIsEnded(false)}
                    onEnded={() => setIsEnded(true)}
                    onTimeUpdate={(e) => {
                        setCurrentTime(e.currentTarget.currentTime);
                        if (isEnded) setIsEnded(false);
                    }}
                    onError={(e) => {
                        console.error("Video error in Menu_Bar:", e.currentTarget.error);
                        if (e.currentTarget.error && e.currentTarget.error.code === 4) {
                            setVideoError(true);
                        }
                    }}
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        outline: "none"
                    }}
                >
                    Your browser does not support HTML5 video playback.
                </video>

                {/* Spotlight box — stays inside the frame, unaffected by this fix
                    since only the interactive label button was being clipped */}
                {activeSpotlight && (
                    <div
                        style={{
                            position: "absolute",
                            left: `${spotX}%`,
                            top: `${spotY}%`,
                            width: `${spotW}%`,
                            height: `${spotH}%`,
                            pointerEvents: "none",
                            boxSizing: "border-box",
                            border: "2.5px solid #B5179E",
                            borderRadius: "2px",
                            zIndex: 10,
                            transition: "all 0.25s ease-out"
                        }}
                    />
                )}

                {/* Custom Floating Pill Video Controls Bar */}
                <VideoControlBar
                    videoRef={videoRef}
                    containerRef={containerRef}
                    isFullscreen={isFullscreen}
                    onToggleFullscreen={() => setIsFullscreen(prev => !prev)}
                    onPrevStep={handlePrevStep}
                    onNextStep={handleNextStep}
                    canGoPrev={activeSpotlightIndex > 0}
                    canGoNext={activeSpotlightIndex === -1 || activeSpotlightIndex < SPOTLIGHTS.length - 1}
                />
            </div>

            {/* Label button + dropdown image — portaled to document.body as
                position:fixed, computed from real screen coordinates. This
                is what fixes the dead-click-zone: these elements now live
                OUTSIDE the frame's overflow:hidden, so they can never be
                clipped regardless of label width or fullscreen state. */}
            {activeSpotlight && labelButtonPos && createPortal(
                <>
                    <div
                        style={{
                            position: "fixed",
                            left: `${labelButtonPos.left}px`,
                            top: `${labelButtonPos.top}px`,
                            zIndex: 1000001,
                            pointerEvents: "auto"
                        }}
                    >
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsLabelDropdownOpen(prev => !prev);
                            }}
                            style={{
                                backgroundColor: "#020202ff",
                                color: "#B5179E",
                                border: "1px solid #B5179E",
                                padding: "2px 8px",
                                borderRadius: "0px",
                                fontSize: "11px",
                                fontWeight: 500,
                                whiteSpace: "nowrap",
                                cursor: "pointer"
                            }}
                        >
                            {activeSpotlight.label}
                        </button>
                    </div>

                    {isLabelDropdownOpen && activeSpotlight.dropdownImage && dropdownImagePos && (
                        <img
                            src={activeSpotlight.dropdownImage}
                            alt={`${activeSpotlight.label} dropdown`}
                            style={{
                                position: "fixed",
                                left: `${dropdownImagePos.left}px`,
                                top: `${dropdownImagePos.top}px`,
                                width: `${dropdownImagePos.width}px`,
                                height: "auto",
                                objectFit: "contain",
                                border: "1.5px solid #B5179E",
                                borderRadius: "4px",
                                zIndex: 1000000,
                                pointerEvents: "auto",
                                transition: "all 0.25s ease-out"
                            }}
                        />
                    )}
                </>,
                document.body
            )}
        </div>
    );

    return (
        <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", fontFamily: "var(--font-main)" }}>

            <div style={{ width: "100%", flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
                {videoError ? (
                    <div style={{
                        width: "80%",
                        maxWidth: "1000px",
                        aspectRatio: "16 / 9",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "var(--bg-surface)",
                        color: "var(--color-error)"
                    }}>
                        <p style={{ margin: 0, fontWeight: 600, color: "var(--color-error)" }}>Unable to load video stream</p>
                        <p style={{ margin: "0.5rem 0 0 0", fontSize: "0.85rem", color: "var(--text-muted)" }}>
                            File: Menu_Bar.mp4
                        </p>
                    </div>
                ) : (
                    isFullscreen ? createPortal(videoContainerMarkup, document.body) : videoContainerMarkup
                )}
            </div>
        </div>
    );
}

export default Menu_Bar_Japanese_Tutorial;