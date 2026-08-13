import React, { useState, useRef, useEffect, useCallback } from "react";
import Tree_View_Japanese_Tutorial from "./Tree_View/Tree_View";
import { ReadAloudButton } from "../../../../ReadAloudButton";
import { useTTSContext } from "../../../../../context/TTSContext";
import ExitCourseButton from "../../Exit_Course_Button/ExitCourseButton";
import "../../Command_Page_Theme/CommadPage.css";

const FALLBACK_NAVBAR_HEIGHT = 60;
const TOPBAR_HEIGHT = 52;
const STUCK_BUTTON_GAP = 20;
const STICKY_TRIGGER_BUFFER = 24;

interface Interface_LessonProps {
    onExit?: () => void;
    lessonNumber?: number;
    totalLessons?: number;
}

function Interface_Lesson({ onExit, lessonNumber = 1, totalLessons = 1 }: Interface_LessonProps) {
    const { rate, voices, selectedVoiceURI } = useTTSContext();
    const [isSpeaking, setIsSpeaking] = useState(false);

    const sentinelRef = useRef<HTMLDivElement>(null);
    const [isButtonStuck, setIsButtonStuck] = useState(false);

    const [navbarHeight, setNavbarHeight] = useState(FALLBACK_NAVBAR_HEIGHT);

    const handleStartReading = () => {
        const utterance = new SpeechSynthesisUtterance("Menu Bar & Tree View iCAD Guide");
        utterance.rate = rate;
        const voice = voices.find((v) => v.voiceURI === selectedVoiceURI);
        if (voice) utterance.voice = voice;
        utterance.onend = () => setIsSpeaking(false);
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utterance);
        setIsSpeaking(true);
    };

    const handleStopReading = () => {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
    };

    const getGlobalNavbarHeight = useCallback((): number => {
        const candidates = ["header", "nav", ".app-topbar", ".app-navbar", ".main-navbar", "[data-app-navbar]"];
        for (const selector of candidates) {
            const el = document.querySelector(selector) as HTMLElement | null;
            if (el) {
                const style = window.getComputedStyle(el);
                if (style.position === "fixed" || style.position === "sticky") {
                    const rect = el.getBoundingClientRect();
                    if (rect.height > 0) return rect.height;
                }
            }
        }
        return FALLBACK_NAVBAR_HEIGHT;
    }, []);

    useEffect(() => {
        const measure = () => setNavbarHeight(getGlobalNavbarHeight());
        measure();
        window.addEventListener("resize", measure);
        return () => window.removeEventListener("resize", measure);
    }, [getGlobalNavbarHeight]);

    const obscuredHeight = navbarHeight + TOPBAR_HEIGHT + STICKY_TRIGGER_BUFFER;

    useEffect(() => {
        const sentinel = sentinelRef.current;
        if (!sentinel) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsButtonStuck(!entry.isIntersecting);
            },
            {
                root: null,
                rootMargin: `-${obscuredHeight}px 0px 0px 0px`,
                threshold: 0,
            }
        );

        observer.observe(sentinel);
        return () => observer.disconnect();
    }, [obscuredHeight]);

    const topBarStyle: React.CSSProperties = {
        position: "fixed",
        top: `${navbarHeight}px`,
        left: 0,
        right: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0.54rem 1.2rem',
        backgroundColor: 'var(--bg-dark)',
        flexShrink: 0,
        zIndex: 900,
        borderBottom: '1px solid var(--border-color)',
    };

    return (
        <div style={{ width: "100%", minHeight: "100%", height: "auto", display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "var(--bg-dark)", fontFamily: "var(--font-main)", overflowY: "auto", paddingBottom: "140px", position: "relative" }}>

            {/* Scoped color rule for the lesson counter — swap the media query for your
                app's actual theme selector if you toggle via a class/data-attribute
                rather than the OS-level color scheme */}
            <style>{`
        .icad-lesson-counter {
            font-family: Outfit, sans-serif;
            font-size: 16px;
            color: #DD4DFA;
            margin: 0 0 8px;
            text-align: center;
            word-spacing: 0.25em;
            letter-spacing: normal;
        }
        @media (prefers-color-scheme: light) {
            .icad-lesson-counter {
                color: #B5179E;
            }
        }
        `}</style>

            {/* Fixed top bar — Exit Course only, pinned just below the global navbar */}
            <div style={topBarStyle} data-icad-topbar>
                <ExitCourseButton onExit={() => onExit?.()} />
            </div>

            {isButtonStuck && (
                <div style={{
                    position: "fixed",
                    top: `${navbarHeight + TOPBAR_HEIGHT + STUCK_BUTTON_GAP}px`,
                    right: "24px",
                    zIndex: 900,
                }}>
                    <ReadAloudButton
                        isSpeaking={isSpeaking}
                        onStart={handleStartReading}
                        onStop={handleStopReading}
                    />
                </div>
            )}

            <div style={{ width: "100%", height: `${TOPBAR_HEIGHT}px`, flexShrink: 0 }} />

            {/* Header */}
            <div style={{ position: "relative", width: "94.15%", padding: "56px 32px 40px", display: "flex", flexDirection: "column", alignItems: "center" }}>

                <div className="icad-lesson-counter" style={{ fontWeight: "bold" }}>
                    {totalLessons ? `Lesson ${lessonNumber} of ${totalLessons}` : `Lesson ${lessonNumber}`}
                </div>

                <div style={{
                    fontSize: "40px",
                    margin: "0px 0px 16px",
                    fontWeight: 800,
                    color: "var(--text-white)",
                    fontFamily: "Outfit, sans-serif",
                    letterSpacing: "0.5px",
                    textAlign: "center",
                }}>
                    Menu Bar &amp; Tree View iCAD Guide
                </div>

                <div
                    ref={sentinelRef}
                    style={{
                        position: "absolute",
                        top: "50%",
                        right: "24px",
                        width: "1px",
                        height: "1px",
                        transform: "translateY(-50%)"
                    }}
                />
                {!isButtonStuck && (
                    <div style={{
                        position: "absolute",
                        top: "50%",
                        right: "24px",
                        transform: "translateY(-50%)"
                    }}>
                        <ReadAloudButton
                            isSpeaking={isSpeaking}
                            onStart={handleStartReading}
                            onStop={handleStopReading}
                        />
                    </div>
                )}

                <div style={{ width: "calc(100% - 40px)", maxWidth: "1200px", height: "1px", backgroundColor: "var(--border-color)", marginTop: "64px" }} />
            </div>

            {/* Content — Tree View section */}
            <div style={{ width: "100%", flex: 1, minHeight: "60vh", height: "auto", padding: "0px 32px 96px" }}>
                <Tree_View_Japanese_Tutorial />
            </div>

        </div>
    );
}

export default Interface_Lesson;