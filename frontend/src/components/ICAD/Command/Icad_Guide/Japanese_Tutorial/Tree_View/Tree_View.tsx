import { useState, useRef } from 'react';
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

// 1920x1080 frame coordinates — Single Vertical Tree View Panel Box
const SPOTLIGHTS: SpotlightConfig[] = [
    { label: "Tree View", startTime: 0.7, endTime: 300.0, pxX: 140, pxY: 108, pxW: 244, pxH: 918 }
];

function Tree_View_Japanese_Tutorial() {
    const [videoError, setVideoError] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [isEnded, setIsEnded] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const activeSpotlight = !isEnded ? SPOTLIGHTS.find(
        (spot) => currentTime >= spot.startTime && currentTime <= spot.endTime
    ) : undefined;

    const jumpToTime = (time: number) => {
        if (videoRef.current) {
            setIsEnded(false);
            videoRef.current.currentTime = time;
            videoRef.current.play().catch(() => { });
        }
    };

    // Calculate percent positions relative to 1920x1080 frame
    const spotX = activeSpotlight ? (activeSpotlight.pxX / 1920) * 100 : 0;
    const spotY = activeSpotlight ? (activeSpotlight.pxY / 1080) * 100 : 0;
    const spotW = activeSpotlight ? (activeSpotlight.pxW / 1920) * 100 : 0;
    const spotH = activeSpotlight ? (activeSpotlight.pxH / 1080) * 100 : 0;

    return (
        <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", fontFamily: "var(--font-main)" }}>

            {/* Quick jump navigation chips */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "center", marginBottom: "16px" }}>
                {SPOTLIGHTS.map((spot) => {
                    const isActive = activeSpotlight?.label === spot.label;
                    return (
                        <button
                            key={spot.label}
                            onClick={() => jumpToTime(spot.startTime)}
                            style={{
                                padding: "4px 12px",
                                fontSize: "12px",
                                fontWeight: "600",
                                borderRadius: "16px",
                                border: isActive ? "1px solid #ff1493" : "1px solid var(--border-color)",
                                backgroundColor: isActive ? "rgba(255, 20, 147, 0.2)" : "var(--bg-surface)",
                                color: isActive ? "#ff1493" : "var(--text-muted)",
                                cursor: "pointer",
                                transition: "all 0.2s ease"
                            }}
                        >
                            {spot.label} ({spot.startTime}s)
                        </button>
                    );
                })}
            </div>

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
                    <div
                        ref={containerRef}
                        className="video-fullscreen-container"
                        style={{
                            position: "relative",
                            width: "80%",
                            maxWidth: "1000px",
                            aspectRatio: "16 / 9",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            overflow: "hidden",
                            borderRadius: "8px",
                            boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
                            backgroundColor: "var(--bg-dark)"
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
                                objectFit: "contain",
                                outline: "none",
                                filter: "brightness(1.3)"
                            }}
                        >
                            Your browser does not support HTML5 video playback.
                        </video>

                        {/* Custom Floating Pill Video Controls Bar */}
                        <VideoControlBar
                            videoRef={videoRef}
                            containerRef={containerRef}
                            onPrevStep={() => jumpToTime(0)}
                            onNextStep={() => jumpToTime(0)}
                        />

                        {/* Spotlight Dimming Overlay with Cutout Mask */}
                        {activeSpotlight && (
                            <>
                                {/* Dimmed backdrop with cutout for active highlight area */}
                                <div
                                    style={{
                                        position: "absolute",
                                        inset: 0,
                                        pointerEvents: "none",
                                        backgroundColor: "rgba(0, 0, 0, 0.65)",
                                        backdropFilter: "brightness(0.4) saturate(0.3)",
                                        clipPath: `polygon(
                                            0% 0%,
                                            100% 0%,
                                            100% 100%,
                                            0% 100%,
                                            0% 0%,
                                            ${spotX}% ${spotY}%,
                                            ${spotX}% ${spotY + spotH}%,
                                            ${spotX + spotW}% ${spotY + spotH}%,
                                            ${spotX + spotW}% ${spotY}%,
                                            ${spotX}% ${spotY}%
                                        )`,
                                        transition: "clip-path 0.25s ease-out",
                                        zIndex: 8
                                    }}
                                />

                                {/* Brightness Booster — makes inside of spotlight extra bright */}
                                <div
                                    style={{
                                        position: "absolute",
                                        left: `${spotX}%`,
                                        top: `${spotY}%`,
                                        width: `${spotW}%`,
                                        height: `${spotH}%`,
                                        pointerEvents: "none",
                                        backdropFilter: "brightness(3.0) saturate(1.4)",
                                        transition: "all 0.25s ease-out",
                                        zIndex: 9
                                    }}
                                />

                                {/* Highlight Box with Deep Pink Border and Soft Outer Glow */}
                                <div
                                    style={{
                                        position: "absolute",
                                        left: `${spotX}%`,
                                        top: `${spotY}%`,
                                        width: `${spotW}%`,
                                        height: `${spotH}%`,
                                        pointerEvents: "none",
                                        boxSizing: "border-box",
                                        border: "2.5px solid #ff1493",
                                        boxShadow: "0 0 10px #ff1493, 0 0 4px #ff1493",
                                        borderRadius: "2px",
                                        zIndex: 10,
                                        transition: "all 0.25s ease-out"
                                    }}
                                >
                                    {/* Category Label Badge */}
                                    <div
                                        style={{
                                            position: "absolute",
                                            left: "calc(100% + 8px)",
                                            top: 0,
                                            backgroundColor: "rgba(20, 20, 30, 0.9)",
                                            color: "#ff1493",
                                            border: "1.5px solid #ff1493",
                                            padding: "3px 10px",
                                            borderRadius: "6px",
                                            fontSize: "12px",
                                            fontWeight: "bold",
                                            whiteSpace: "nowrap",
                                            boxShadow: "0 2px 10px rgba(0,0,0,0.7), 0 0 8px rgba(255, 20, 147, 0.4)",
                                            backdropFilter: "blur(4px)"
                                        }}
                                    >
                                        {activeSpotlight.label}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Tree_View_Japanese_Tutorial;