import React, { useState, useRef, useEffect, useCallback } from "react";
import Menu_Bar_Japanese_Tutorial from "./Menu_Bar/Menu_Bar";
import Command_Menu_Japanese_Tutorial from "./Command_Menu/Command_Menu";
import Tree_View_Japanese_Tutorial from "./Tree_View/Tree_View";
import { ReadAloudButton } from "../../../../ReadAloudButton";
import { useTTSContext } from "../../../../../context/TTSContext";
import ExitCourseButton from "../../Exit_Course_Button/ExitCourseButton";

const FALLBACK_NAVBAR_HEIGHT = 60;
const TOPBAR_HEIGHT = 52;
const STUCK_BUTTON_GAP = 12;

interface Interface_LessonProps {
    onExit?: () => void;
}

function Interface_Lesson({ onExit }: Interface_LessonProps) {
    const [activeTab, setActiveTab] = useState("MENU BAR");
    const [hoveredTab, setHoveredTab] = useState<string | null>(null);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const { rate, voices, selectedVoiceURI } = useTTSContext();
    const tabs = ["MENU BAR", "COMMAND MENU", "TREE VIEW"];
    const activeIndex = tabs.indexOf(activeTab);

    const sentinelRef = useRef<HTMLDivElement>(null);
    const [isButtonStuck, setIsButtonStuck] = useState(false);
    const [navbarHeight, setNavbarHeight] = useState(FALLBACK_NAVBAR_HEIGHT);

    const titleForTab = (tab: string) =>
        tab === "MENU BAR" ? "Menu Bar" : tab === "COMMAND MENU" ? "Command Menu" : "Tree View";

    const handleStartReading = () => {
        const utterance = new SpeechSynthesisUtterance(titleForTab(activeTab));
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

    // Total height of everything fixed at the top (global navbar + our
    // Exit Course bar) that visually covers the sentinel before it

    const obscuredHeight = navbarHeight + TOPBAR_HEIGHT;

    // Watch the sentinel using a shrunk root: rootMargin's negative top
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
        borderBottom: '1px solid var(--border-color)',
        flexShrink: 0,
        zIndex: 900,
    };

    return (
        <div style={{ width: "100%", minHeight: "100%", height: "auto", display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "var(--bg-dark)", fontFamily: "var(--font-main)", overflowY: "auto", paddingBottom: "140px", position: "relative" }}>

            {/* Fixed top bar — Exit Course only, pinned just below the global navbar */}
            <div style={topBarStyle} data-icad-topbar>
                <ExitCourseButton onExit={() => onExit?.()} />
            </div>

            {/* Fixed Read Lesson button — appears once the header's original
                button becomes visually hidden behind the fixed bars above */}
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

            {/* Spacer so page content starts below the fixed top bar instead of underneath it */}
            <div style={{ width: "100%", height: `${TOPBAR_HEIGHT}px`, flexShrink: 0 }} />

            {/* Header */}
            <div style={{ position: "relative", width: "94.15%", padding: "56px 32px 40px", display: "flex", flexDirection: "column", alignItems: "center" }}>

                <div style={{
                    fontSize: "13px",
                    fontWeight: 800,
                    letterSpacing: "1.5px",
                    color: "var(--color-primary)",
                    textTransform: "uppercase",
                    marginTop: "6px",
                    marginBottom: "1px"
                }}>
                    Lesson {activeIndex + 1} of {tabs.length}
                </div>

                <div style={{
                    fontSize: "40px",
                    margin: "0px 0px 16px",
                    fontWeight: 800,
                    color: "var(--text-white)",
                    fontFamily: "Outfit, sans-serif",
                    letterSpacing: "0.5px"
                }}>
                    {titleForTab(activeTab)}
                </div>

                {/* Sentinel + original in-header Read Lesson button */}
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

            {/* Tab Pill Switcher */}
            <div style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "var(--glass-bg)",
                padding: "9.6px",
                borderRadius: "10px",
                border: "1px solid var(--border-color)",
                margin: '32px 339.109px 100px',
                gap: "8px"
            }}>
                {tabs.map((tab) => {
                    const isActive = activeTab === tab;
                    const isHovered = hoveredTab === tab;
                    return (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            style={{
                                padding: "8px 16px",
                                border: !isActive && isHovered ? "1px solid #57606A" : "1px solid transparent",
                                borderRadius: "8px",
                                backgroundColor: isActive ? "#DD4DFA" : "transparent",
                                color: isActive ? "#ffffff" : isHovered ? "#DD4DFA" : "var(--text-muted)",
                                fontWeight: "bold",
                                fontSize: "12.8px",
                                letterSpacing: "0.3px",
                                cursor: "pointer",
                                transition: "all 0.2s ease",
                                fontFamily: "Outfit, sans-serif",
                            }}
                            onMouseEnter={() => setHoveredTab(tab)}
                            onMouseLeave={() => setHoveredTab(null)}
                        >
                            {tab}
                        </button>
                    );
                })}
            </div>

            {/* Content */}
            <div style={{ width: "100%", flex: 1, minHeight: "60vh", height: "auto", padding: "0px 32px 96px" }}>
                {activeTab === "MENU BAR" ? (
                    <Menu_Bar_Japanese_Tutorial />
                ) : activeTab === "COMMAND MENU" ? (
                    <Command_Menu_Japanese_Tutorial />
                ) : activeTab === "TREE VIEW" ? (
                    <Tree_View_Japanese_Tutorial />
                ) : (
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%", color: "var(--text-main)" }}>
                        <h2>{activeTab} Content</h2>
                    </div>
                )}
            </div>

        </div>
    );
}

export default Interface_Lesson;