import React, { useState, useRef, useEffect, useCallback } from "react";
import Tree_View_Japanese_Tutorial from "./Tree_View/Tree_View";
import { ReadAloudButton } from "../../../../ReadAloudButton";
import { useTTSContext } from "../../../../../context/TTSContext";
import ExitCourseButton from "../../Exit_Course_Button/ExitCourseButton";
import { LessonHeaderBanner } from "../../../../LessonHeaderBanner";
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

    return (
        <div style={{ width: "100%", minHeight: "100%", height: "auto", display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "var(--bg-surface)", fontFamily: "var(--font-main)", overflowY: "auto", paddingBottom: "140px", position: "relative" }}>

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
        [data-theme='light'] .icad-lesson-counter {
            color: #B5179E;
        }
        `}</style>

            {isButtonStuck && (
                <div className="lesson-action-cluster" style={{
                    position: "fixed",
                    top: `${navbarHeight + TOPBAR_HEIGHT + STUCK_BUTTON_GAP}px`,
                    left: "32px",
                    right: "24px",
                    zIndex: 900,
                }}>
                    <ExitCourseButton onExit={() => onExit?.()} />
                    <ReadAloudButton
                        isSpeaking={isSpeaking}
                        onStart={handleStartReading}
                        onStop={handleStopReading}
                    />
                </div>
            )}

            <LessonHeaderBanner
                title="Menu Bar & Tree View iCAD Guide"
                lessonNumber={lessonNumber}
                totalLessons={totalLessons}
                stickySentinelRef={sentinelRef}
                actions={!isButtonStuck ? (
                    <>
                        <ExitCourseButton onExit={() => onExit?.()} />
                        <ReadAloudButton isSpeaking={isSpeaking} onStart={handleStartReading} onStop={handleStopReading} />
                    </>
                ) : undefined}
            />

            {/* Content — Tree View section */}
            <div style={{ width: "100%", flex: 1, minHeight: "60vh", height: "auto", padding: "0px 32px 96px" }}>
                <Tree_View_Japanese_Tutorial />
            </div>

        </div>
    );
}

export default Interface_Lesson;
