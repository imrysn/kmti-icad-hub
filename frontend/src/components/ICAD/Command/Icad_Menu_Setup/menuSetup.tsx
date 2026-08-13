import React, { useState, useRef, useEffect, useLayoutEffect, useCallback } from "react";
import { menuData } from "./Menu_Data/menuData";
import { ReadAloudButton } from "../../../ReadAloudButton";
import { useTTSContext } from "../../../../context/TTSContext";
import ExitCourseButton from "../Exit_Course_Button/ExitCourseButton";

type Category = keyof typeof menuData;

const FALLBACK_NAVBAR_HEIGHT = 60;
const TOPBAR_HEIGHT = 56;
const STUCK_BUTTON_GAP = 20;
const STICKY_TRIGGER_BUFFER = 24;

interface MenuSetupProps {
    onExit?: () => void;
    lessonNumber?: number;
    totalLessons?: number;
}

function MenuSetup({ onExit, lessonNumber = 1, totalLessons = 1 }: MenuSetupProps) {
    const { rate, voices, selectedVoiceURI } = useTTSContext();
    const [isSpeaking, setIsSpeaking] = useState(false);

    const sentinelRef = useRef<HTMLDivElement>(null);
    const [isButtonStuck, setIsButtonStuck] = useState(false);

    const tabMenuRef = useRef<HTMLDivElement>(null);
    const [isTabMenuStuck, setIsTabMenuStuck] = useState(false);

    const [navbarHeight, setNavbarHeight] = useState(FALLBACK_NAVBAR_HEIGHT);

    const [selected, setSelected] = useState<Category>("Function");
    const categories = Object.keys(menuData) as Category[];

    const handleStartReading = () => {
        const utterance = new SpeechSynthesisUtterance("Menu Setup Keywords");
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
        let maxBottom = 0;

        for (const selector of candidates) {
            // A selector like "header" or "nav" can match more than one element
            // (a nested header, a sidebar nav, etc). querySelectorAll + checking
            // every match — instead of trusting only the first hit — avoids
            // latching onto the wrong one.
            const elements = document.querySelectorAll<HTMLElement>(selector);
            elements.forEach((el) => {
                const style = window.getComputedStyle(el);
                if (style.position !== "fixed" && style.position !== "sticky") return;

                const rect = el.getBoundingClientRect();
                // Only count elements that are actually pinned to the very top
                // of the viewport. Without this check, any unrelated fixed/sticky
                // element elsewhere on the page (a taller nested header, a
                // sidebar nav, a banner) that happens to match one of the
                // selectors above gets picked up, inflating navbarHeight and
                // permanently pushing the Exit Course bar down.
                if (rect.top <= 1 && rect.height > 0) {
                    maxBottom = Math.max(maxBottom, rect.bottom);
                }
            });
        }

        return maxBottom > 0 ? maxBottom : FALLBACK_NAVBAR_HEIGHT;
    }, []);

    useLayoutEffect(() => {
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

    useEffect(() => {
        const tabMenu = tabMenuRef.current;
        if (!tabMenu) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsTabMenuStuck(!entry.isIntersecting);
            },
            {
                root: null,
                rootMargin: `-${obscuredHeight}px 0px 0px 0px`,
                threshold: 0,
            }
        );

        observer.observe(tabMenu);
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

            {/* Scoped styles for the lesson counter, tab bar, and table row hover —
                dark is the default (unprefixed) rule, matching the convention in
                Command_Page_Theme/CommadPage.css; [data-theme='light'] overrides it */}
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
        .menu-setup-tab {
            border-color: transparent;
            padding: 16px 14px;
            font-size: 14.4px;
            font-family: Inter, system-ui, -apple-system, sans-serif;
            text-align: center;
        }
        .menu-setup-tab:not(.active) {
            color: var(--text-muted);
            background: #21262D;
        }
        [data-theme='light'] .menu-setup-tab:not(.active) {
            background: #F1F2F4;
        }
        .menu-setup-tab.active {
            background: #DD4DFA;
            color: #fff;
        }
        .menu-setup-tab.active:hover {
            background: color-mix(in srgb, #DD4DFA 80%, black);
        }
        .menu-setup-tab:not(.active):hover {
            background: transparent;
            color: #fff;
            border-width: 1px;
            border-color: #DD4DFA;
        }
        [data-theme='light'] .menu-setup-tab:not(.active):hover {
            color: #DD4DFA;
            border-width: 1px;
            border-color: #94A3B8;
        }
        .icad-tablist {
            background: #21262D;
        }
        [data-theme='light'] .icad-tablist {
            background: #F1F2F4;
        }
        .icad-lesson-card {
            background: #111827;
        }
        [data-theme='light'] .icad-lesson-card {
            background: #fff;
        }
        .icad-th {
            background: #DD4DFA1A;
            color: #DD4DFA;
        }
        [data-theme='light'] .icad-th {
            background: #FCEDFE;
            color: #6366F1;
        }
        .icad-td {
            color: #F1F5F9;
        }
        [data-theme='light'] .icad-td {
            color: #334155;
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
                    Menu Setup
                </div>

                <div style={{ color: "var(--text-muted)", fontFamily: "Outfit, sans-serif", fontSize: "0.95rem" }}>
                    (Keywords)
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

            {/* Spacing between divider and tab menu */}
            <div style={{ height: "32px" }} />

            {/* Content — category tab bar + lesson card */}
            <div style={{ width: "100%", flex: 1, minHeight: "60vh", height: "auto", padding: "0px 32px 96px", display: "flex", flexDirection: "column", alignItems: "center", marginTop: "4rem" }}>

                {/* Pill-shaped category tab bar */}
                {isTabMenuStuck && (
                    <div style={{
                        position: "fixed",
                        top: `${navbarHeight + TOPBAR_HEIGHT + STUCK_BUTTON_GAP}px`,
                        left: 0,
                        right: 0,
                        display: "flex",
                        justifyContent: "center",
                        zIndex: 900,
                    }}>
                        <div
                            role="tablist"
                            className="icad-tablist"
                            style={{
                                display: "inline-flex",
                                gap: "4px",
                                border: "1px solid var(--border-color)",
                                borderRadius: "var(--radius-lg)",
                                padding: "6px",
                                boxShadow: "var(--shadow-card)",
                            }}
                        >
                            {categories.map((category) => {
                                const isActive = selected === category;
                                return (
                                    <button
                                        key={category}
                                        role="tab"
                                        aria-selected={isActive}
                                        className={isActive ? "menu-setup-tab active" : "menu-setup-tab"}
                                        onClick={() => setSelected(category)}
                                    >
                                        {category}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}
                <div
                    ref={tabMenuRef}
                    role="tablist"
                    className="icad-tablist"
                    style={{
                        display: "inline-flex",
                        gap: "4px",
                        border: "1px solid var(--border-color)",
                        borderRadius: "var(--radius-lg)",
                        padding: "6px",
                        boxShadow: "var(--shadow-card)",
                        visibility: isTabMenuStuck ? "hidden" : "visible",
                    }}
                >
                    {categories.map((category) => {
                        const isActive = selected === category;
                        return (
                            <button
                                key={category}
                                role="tab"
                                aria-selected={isActive}
                                className={isActive ? "menu-setup-tab active" : "menu-setup-tab"}
                                onClick={() => setSelected(category)}
                            >
                                {category}
                            </button>
                        );
                    })}
                </div>

                {/* Lesson card — sizes its width to the table's natural content
                    width (up to the available container), and its height always
                    grows to fit the full table (no collapse/expand). */}
                <div className="icad-lesson-card" style={{
                    width: "fit-content",
                    maxWidth: "100%",
                    minWidth: "min(600px, 100%)",
                    marginTop: "8rem",
                    border: "1px solid var(--border-color)",
                    borderRadius: "var(--radius-lg)",
                    boxShadow: "var(--shadow-card)",
                    padding: "28px 32px",
                    textAlign: "left",
                    boxSizing: "border-box",
                }}>
                    <div style={{
                        position: "relative",
                        paddingLeft: "16px",
                        marginBottom: "20px",
                        color: "var(--color-primary)",
                        fontFamily: "Outfit, sans-serif",
                        fontSize: "1.1rem",
                        fontWeight: 700,
                        letterSpacing: "0.03em",
                        textTransform: "uppercase",
                    }}>
                        <span style={{
                            position: "absolute",
                            left: 0,
                            top: "1px",
                            bottom: "1px",
                            width: "3px",
                            background: "var(--color-primary)",
                            borderRadius: "var(--radius-md)",
                        }} />
                        {selected}
                    </div>

                    <div style={{ width: "100%", overflowX: "auto" }}>
                        <table style={{ width: "max-content", minWidth: "100%", borderCollapse: "collapse", border: "1px solid var(--border-color)", color: "var(--text-main)", fontFamily: "Outfit, sans-serif" }}>
                            <thead>
                                <tr>
                                    <th className="icad-th" style={{
                                        textAlign: "center",
                                        padding: "12px",
                                        borderBottom: "2px solid var(--border-color)",
                                        borderRight: "1px solid var(--border-color)",
                                        fontFamily: "Outfit, sans-serif",
                                        fontSize: "0.8rem",
                                        fontWeight: 700,
                                        letterSpacing: "0.03em",
                                        textTransform: "uppercase",
                                        whiteSpace: "nowrap",
                                        minWidth: "96px",
                                    }}>
                                        Key
                                    </th>
                                    <th className="icad-th" style={{
                                        textAlign: "center",
                                        padding: "12px",
                                        borderBottom: "2px solid var(--border-color)",
                                        borderRight: "1px solid var(--border-color)",
                                        fontFamily: "Outfit, sans-serif",
                                        fontSize: "0.8rem",
                                        fontWeight: 700,
                                        letterSpacing: "0.03em",
                                        textTransform: "uppercase",
                                        whiteSpace: "nowrap",
                                        minWidth: "140px",
                                    }}>
                                        Command
                                    </th>
                                    <th className="icad-th" style={{
                                        textAlign: "center",
                                        padding: "12px",
                                        borderBottom: "2px solid var(--border-color)",
                                        fontFamily: "Outfit, sans-serif",
                                        fontSize: "0.8rem",
                                        fontWeight: 700,
                                        letterSpacing: "0.03em",
                                        textTransform: "uppercase",
                                        whiteSpace: "nowrap",
                                    }}>
                                        Content
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {menuData[selected].map((item) =>
                                    item.shortcuts.map((shortcut, index) => (
                                        <tr key={`${item.key}-${index}`} className="lesson-table-row">
                                            <td className="icad-td" style={{
                                                padding: "16px 20px 16px 8px",
                                                fontFamily: "Inter, system-ui, -apple-system, sans-serif",
                                                textAlign: "center",
                                                borderBottom: "1px solid var(--border-color)",
                                                borderRight: "1px solid var(--border-color)",
                                                fontSize: "14.4px",
                                                whiteSpace: "nowrap",
                                                minWidth: "96px",
                                            }}>
                                                {index === 0 ? item.key : ""}
                                            </td>
                                            <td className="icad-td" style={{
                                                padding: "16px 20px 16px 8px",
                                                fontFamily: "Inter, system-ui, -apple-system, sans-serif",
                                                textAlign: "center",
                                                borderBottom: "1px solid var(--border-color)",
                                                borderRight: "1px solid var(--border-color)",
                                                fontSize: "14.4px",
                                                whiteSpace: "nowrap",
                                                minWidth: "140px",
                                            }}>
                                                {shortcut.type}
                                            </td>
                                            <td className="icad-td" style={{
                                                padding: "16px 20px 16px 8px",
                                                fontFamily: "Inter, system-ui, -apple-system, sans-serif",
                                                textAlign: "center",
                                                borderBottom: "1px solid var(--border-color)",
                                                fontSize: "14.4px",
                                                whiteSpace: "nowrap",
                                            }}>
                                                {shortcut.command}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default MenuSetup;