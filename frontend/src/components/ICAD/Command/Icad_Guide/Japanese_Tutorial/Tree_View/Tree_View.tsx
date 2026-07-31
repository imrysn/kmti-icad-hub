import { useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import Tree_ViewVideo from '../../../../../../assets/Commands/Japanese_Tutorial/Tree_View.mp4';
import { VideoControlBar } from '../../Video_Control/VideoControlBar';

interface SpotlightConfig {
    label: string;
    startTime: number;
    endTime: number;
    pxX: number;
    pxY: number;
    pxW: number;
    pxH: number;
}

const SPOTLIGHTS: SpotlightConfig[] = [
    { label: "Tree View", startTime: 0.7, endTime: 20.3, pxX: 125, pxY: 155, pxW: 249, pxH: 865 }
];

function Tree_View_Japanese_Tutorial() {
    const [videoError, setVideoError] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [isEnded, setIsEnded] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const activeSpotlightIndex = !isEnded
        ? SPOTLIGHTS.findIndex(
            (spot) => currentTime >= spot.startTime && currentTime <= spot.endTime
        )
        : -1;

    const activeSpotlight = activeSpotlightIndex !== -1 ? SPOTLIGHTS[activeSpotlightIndex] : undefined;

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
    const spotY = activeSpotlight ? ((activeSpotlight.pxY - 24) / 1042) * 100 : 0;
    const spotW = activeSpotlight ? (activeSpotlight.pxW / 1920) * 100 : 0;
    const spotH = activeSpotlight ? (activeSpotlight.pxH / 1042) * 100 : 0;

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

            }}
        >
            {/* 16:9 Video Frame Container — maintains 100% precise spotlight positioning in fullscreen */}
            <div
                style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    maxWidth: "100%",
                    maxHeight: "100%",
                    aspectRatio: isFullscreen ? undefined : "1920 / 1042",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    overflow: "hidden"
                }}
            >
                <video
                    ref={videoRef}
                    src={Tree_ViewVideo}
                    preload="auto"
                    onPlay={() => setIsEnded(false)}
                    onEnded={() => setIsEnded(true)}
                    onTimeUpdate={(e) => {
                        setCurrentTime(e.currentTarget.currentTime);
                        if (isEnded) setIsEnded(false);
                    }}
                    onError={(e) => {
                        console.error("Video error in Tree_View:", e.currentTarget.error);
                        if (e.currentTarget.error && e.currentTarget.error.code === 4) {
                            setVideoError(true);
                        }
                    }}
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        outline: "none"
                    }}
                >
                    Your browser does not support HTML5 video playback.
                </video>

                {/* Spotlight box */}
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
                            border: "2px solid #B5179E",
                            borderRadius: "2px",
                            zIndex: 10,
                            transition: "all 0.25s ease-out"
                        }}
                    >
                        <div
                            style={{
                                position: "absolute",
                                left: "calc(100% + 8px)",
                                top: 0,
                                backgroundColor: "rgba(20, 20, 30, 0.9)",
                                color: "#B5179E",
                                border: "1px solid #B5179E",
                                padding: "3px 10px",
                                borderRadius: "6px",
                                fontSize: "12px",
                                fontWeight: "bold",
                                whiteSpace: "nowrap",
                                boxShadow: " 0 0 8px rgba(255, 20, 147, 0.4)",

                            }}
                        >
                            {activeSpotlight.label}
                        </div>
                    </div>
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
                            File: Tree_View.mp4
                        </p>
                    </div>
                ) : (
                    isFullscreen ? createPortal(videoContainerMarkup, document.body) : videoContainerMarkup
                )}
            </div>
        </div>
    );
}

export default Tree_View_Japanese_Tutorial;