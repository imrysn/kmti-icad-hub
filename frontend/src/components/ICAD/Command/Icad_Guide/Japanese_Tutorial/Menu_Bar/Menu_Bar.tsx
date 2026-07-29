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
    const spotY = activeSpotlight ? ((activeSpotlight.pxY - 30 + 9 + 8) / 1022) * 100 : 0;

    // Small box pinned near the label button's footprint — the spotlight cutout now matches this size
    const smallBoxW = (90 / 1920) * 100;
    const smallBoxH = (26 / 1022) * 100;
    const spotW = smallBoxW;
    const spotH = smallBoxH;

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
                aspectRatio: "1920 / 1022",
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
                    width: "100%",
                    height: "100%",
                    maxWidth: "100%",
                    maxHeight: "100%",
                    aspectRatio: "1920 / 1022",
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

                {/* Spotlight Dimming Overlay with Cutout Mask */}
                {activeSpotlight && (
                    <>
                        {/* Top band: full width, above the box */}
                        <div
                            style={{
                                position: "absolute",
                                left: 0,
                                top: 0,
                                width: "100%",
                                height: `${spotY}%`,
                                pointerEvents: "none",
                                backgroundColor: "rgba(0, 0, 0, 0.65)",
                                backdropFilter: "brightness(0.4) saturate(0.3)",
                                transition: "all 0.25s ease-out",
                                zIndex: 8
                            }}
                        />
                        {/* Bottom band: full width, below the box */}
                        <div
                            style={{
                                position: "absolute",
                                left: 0,
                                top: `${spotY + spotH}%`,
                                width: "100%",
                                height: `${100 - (spotY + spotH)}%`,
                                pointerEvents: "none",
                                backgroundColor: "rgba(0, 0, 0, 0.65)",
                                backdropFilter: "brightness(0.4) saturate(0.3)",
                                transition: "all 0.25s ease-out",
                                zIndex: 8
                            }}
                        />
                        {/* Left band: only spans the box's vertical range */}
                        <div
                            style={{
                                position: "absolute",
                                left: 0,
                                top: `${spotY}%`,
                                width: `${spotX}%`,
                                height: `${spotH}%`,
                                pointerEvents: "none",
                                backgroundColor: "rgba(0, 0, 0, 0.65)",
                                backdropFilter: "brightness(0.4) saturate(0.3)",
                                transition: "all 0.25s ease-out",
                                zIndex: 8
                            }}
                        />
                        {/* Right band: only spans the box's vertical range */}
                        <div
                            style={{
                                position: "absolute",
                                left: `${spotX + spotW}%`,
                                top: `${spotY}%`,
                                width: `${100 - (spotX + spotW)}%`,
                                height: `${spotH}%`,
                                pointerEvents: "none",
                                backgroundColor: "rgba(0, 0, 0, 0.65)",
                                backdropFilter: "brightness(0.4) saturate(0.3)",
                                transition: "all 0.25s ease-out",
                                zIndex: 8
                            }}
                        />

                        {/* Spotlight border box — follows each spotlight's position in sequence, but stays a fixed small size */}
                        <div
                            style={{
                                position: "absolute",
                                left: `${spotX}%`,
                                top: `${spotY}%`,
                                width: `${smallBoxW}%`,
                                height: `${smallBoxH}%`,
                                pointerEvents: "none",
                                boxSizing: "border-box",
                                border: "2.5px solid #ff1493",
                                boxShadow: "0 0 10px #ff1493, 0 0 4px #ff1493",
                                borderRadius: "2px",
                                zIndex: 10,
                                transition: "all 0.25s ease-out"
                            }}
                        >
                            <div
                                style={{
                                    position: "absolute",
                                    left: "calc(100% + 6px)",
                                    top: "-8px",
                                    zIndex: 20,
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
                                        color: "#ff00f2ff",
                                        border: "1px solid #ff00d4ff",
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
                        </div>

                        {/* Image pop-up positioned below the spotlight box, expanded to a larger readable size */}
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
                                    border: "1.5px solid #ff1493",
                                    borderRadius: "4px",
                                    boxShadow: "0 4px 16px rgba(0,0,0,0.8)",
                                    zIndex: 15,
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