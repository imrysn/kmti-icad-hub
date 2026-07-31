import { useState, useRef } from 'react';
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
                style={{
                    position: "relative",
                    width: isFullscreen ? "min(100vw, calc(100vh * 1.84261))" : "100%",
                    height: isFullscreen ? "min(100vh, calc(100vw * 0.542708))" : "100%",
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

                {/* Spotlight */}
                {activeSpotlight && (
                    <>
                        {/* Visual Spotlight Outline Frame */}
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

                        {/* Visible Label Tag Button — The exact clickable target element */}
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsLabelDropdownOpen(prev => !prev);
                            }}
                            title={`Click to toggle ${activeSpotlight.label} dropdown`}
                            style={{
                                position: "absolute",
                                left: `calc(${spotX + spotW}% + 6px)`,
                                top: `calc(${spotY}% - 6px)`,
                                zIndex: 30,
                                pointerEvents: "auto",
                                backgroundColor: "#020202",
                                color: "#B5179E",
                                border: "1.5px solid #B5179E",
                                padding: "4px 10px",
                                borderRadius: "4px",
                                fontSize: "12px",
                                fontWeight: 600,
                                whiteSpace: "nowrap",
                                cursor: "pointer",
                                boxShadow: "0 2px 10px rgba(0,0,0,0.7)",
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                userSelect: "none",
                                outline: "none",
                                transition: "all 0.25s ease-out"
                            }}
                        >
                            {activeSpotlight.label}
                        </button>

                        {/* Dropdown Image pop-up */}
                        {isLabelDropdownOpen && activeSpotlight.dropdownImage && (
                            <img
                                src={activeSpotlight.dropdownImage}
                                alt={`${activeSpotlight.label} dropdown`}
                                style={{
                                    position: "absolute",
                                    left: `${spotX}%`,
                                    top: `${spotY + spotH}%`,
                                    marginTop: "6px",
                                    width: DROPDOWN_WIDTHS[activeSpotlight.label] ?? "20%",
                                    height: "auto",
                                    objectFit: "contain",
                                    border: "1.5px solid #B5179E",
                                    borderRadius: "4px",
                                    zIndex: 20,
                                    pointerEvents: "auto",
                                    transition: "all 0.25s ease-out"
                                }}
                            />
                        )}
                    </>
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