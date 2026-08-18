import { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import commmandmenu from '../../../../../assets/Commands/Japanese_Tutorial/commmandmenu.jpg';
import { ImageControlBar } from '../Image_Control/ImageControlBar';
import { SPOTLIGHTS, MenuItem } from './CommandData';
import { ReadAloudButton } from '../../../../ReadAloudButton';
import { useTTSContext } from '../../../../../context/TTSContext';
import ExitCourseButton from '../../Exit_Course_Button/ExitCourseButton';
import { LessonHeaderBanner } from '../../../../LessonHeaderBanner';

const FALLBACK_NAVBAR_HEIGHT = 60;
const TOPBAR_HEIGHT = 56;
const STUCK_BUTTON_GAP = 20;
const STICKY_TRIGGER_BUFFER = 24;

const BORDER_COLOR = "#B5179E";

interface Command_Menu_Japanese_TutorialProps {
    onExit?: () => void;
    lessonNumber?: number;
    totalLessons?: number;
}

type Pos = { x: number; y: number; w: number; h: number };

// Independent per-button pink border coordinates — one entry per SPOTLIGHTS
// index, in the same % coordinate space as normalPos/fullscreenPos. This is
// a ONE-TIME copy of each button's starting position at module load, kept
// as its own separate array from here on. Adjust any x/y/w/h below to move
// or resize that button's border WITHOUT touching CommandData.ts, and
// editing CommandData.ts positions later will NOT move these borders.
const SPOTLIGHT_BORDERS: { normal: Pos; fullscreen: Pos }[] = SPOTLIGHTS.map(spot => ({
    normal: { ...spot.normalPos },
    fullscreen: { ...spot.fullscreenPos },
}));

// Recursive dropdown that supports nested `children` — hovering an item
// with children flies out a submenu to its right, native-menu style.
// Top-level items are arranged into 2 columns (column-major, like a
// native multi-column context menu); nested submenus stay single-column.
function DropdownMenu({ items, columns = 2 }: { items: MenuItem[]; columns?: number }) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const rows = Math.ceil(items.length / columns);

    return (
        <ul style={{
            listStyle: "none",
            margin: 0,
            padding: "2px 0",
            minWidth: columns > 1 ? `${160 * columns}px` : "160px",
            fontSize: "11px",
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            color: "#333",
            display: columns > 1 ? "grid" : "block",
            gridTemplateColumns: columns > 1 ? `repeat(${columns}, 1fr)` : undefined,
            gridTemplateRows: columns > 1 ? `repeat(${rows}, auto)` : undefined,
            gridAutoFlow: columns > 1 ? "row" : undefined,
            columnGap: columns > 1 ? "4px" : undefined,
        }}>
            {items.map((item, index) => {
                if (item.isDivider) {
                    return (
                        <li key={index} style={{
                            height: "1px",
                            backgroundColor: "#d7d7d7",
                            margin: "3px 0"
                        }} />
                    );
                }

                const hasChildren = !!(item.children && item.children.length > 0);
                const isHovered = hoveredIndex === index;

                return (
                    <li
                        key={index}
                        style={{
                            padding: "4px 24px 4px 12px",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            cursor: "default",
                            position: "relative",
                            backgroundColor: isHovered ? "rgba(0, 120, 215, 0.1)" : "transparent",
                            color: isHovered ? "#000" : "#333",
                        }}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            {item.label}
                        </span>
                        <span style={{ display: "flex", alignItems: "center", gap: "8px", color: "#666" }}>
                            {item.shortcut && <span>{item.shortcut}</span>}
                            {(item.hasSubmenu || hasChildren) && (
                                <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="9 18 15 12 9 6"></polyline>
                                </svg>
                            )}
                        </span>

                        {hasChildren && isHovered && (
                            <div
                                style={{
                                    position: "absolute",
                                    left: "100%",
                                    top: "-2px",
                                    marginLeft: "2px",
                                    zIndex: 21,
                                    backgroundColor: "#f2f2f2",
                                    border: "1px solid #a0a0a0",
                                    boxShadow: "2px 2px 5px rgba(0,0,0,0.2)",
                                }}
                            >
                                <DropdownMenu items={item.children!} columns={1} />
                            </div>
                        )}
                    </li>
                );
            })}
        </ul>
    );
}

function Command_Menu_Japanese_Tutorial({ onExit, lessonNumber = 1, totalLessons = 1 }: Command_Menu_Japanese_TutorialProps) {
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [stepIndex, setStepIndex] = useState(-1);

    // TTS Read Aloud state
    const { rate, voices, selectedVoiceURI } = useTTSContext();
    const [isSpeaking, setIsSpeaking] = useState(false);

    // Sticky ReadAloudButton logic matching Interface_Lesson.tsx
    const sentinelRef = useRef<HTMLDivElement>(null);
    const [isButtonStuck, setIsButtonStuck] = useState(false);
    const [navbarHeight, setNavbarHeight] = useState(FALLBACK_NAVBAR_HEIGHT);

    // Automation state
    const [cursorPos, setCursorPos] = useState<{ x: number, y: number } | null>(null);
    const [hoveredSpotIndex, setHoveredSpotIndex] = useState<number | null>(null);

    const containerRef = useRef<HTMLDivElement>(null);

    // NOTE: isFullscreen is a plain CSS-driven toggle — the viewer expands
    // to fill only the browser's own page (position: fixed, 100vw/100vh)
    // via videoContainerMarkup below, rendered through a portal directly
    // into document.body so it sits above the app's navbar regardless of
    // any stacking context the navbar creates. It intentionally never
    // calls the native browser Fullscreen API, so the address bar, tabs,
    // and OS taskbar all stay visible instead of the page taking over the
    // whole monitor.

    // Lock background scroll while the portal-rendered overlay is open
    useEffect(() => {
        if (isFullscreen) {
            const previousOverflow = document.body.style.overflow;
            document.body.style.overflow = "hidden";
            return () => {
                document.body.style.overflow = previousOverflow;
            };
        }
    }, [isFullscreen]);

    const handleStartReading = () => {
        const textToRead = stepIndex >= 0 && SPOTLIGHTS[stepIndex] ? SPOTLIGHTS[stepIndex].label : "Command Menu";
        const utterance = new SpeechSynthesisUtterance(textToRead);
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

    useEffect(() => {
        return () => {
            window.speechSynthesis.cancel();
        };
    }, []);

    // Handle automated sequence
    useEffect(() => {
        let timeout: NodeJS.Timeout;

        if (isPlaying && stepIndex === -1) {
            setStepIndex(0);
            return;
        }

        if (stepIndex >= 0 && stepIndex < SPOTLIGHTS.length) {
            const spotlight = SPOTLIGHTS[stepIndex];
            const pos = isFullscreen ? spotlight.fullscreenPos : spotlight.normalPos;

            setCursorPos({ x: pos.x + pos.w / 2, y: pos.y + pos.h / 2 });

            if (isPlaying) {
                // Wait 0.5s for cursor to move, hold the highlight for 2s, then advance
                timeout = setTimeout(() => {
                    timeout = setTimeout(() => {
                        setStepIndex(prev => prev + 1);
                    }, 2000);
                }, 500);
            }
        } else if (stepIndex >= SPOTLIGHTS.length) {
            setIsPlaying(false);
            setStepIndex(-1);
            setCursorPos(null);
        } else {
            setCursorPos(null);
        }

        return () => clearTimeout(timeout);
    }, [isPlaying, stepIndex, isFullscreen]);


    const handlePrevStep = () => {
        setIsPlaying(false);
        setCursorPos(null);
        if (stepIndex > 0) {
            setStepIndex(stepIndex - 1);
        }
    };

    const handleNextStep = () => {
        setIsPlaying(false);
        setCursorPos(null);
        if (stepIndex < SPOTLIGHTS.length - 1) {
            setStepIndex(stepIndex === -1 ? 0 : stepIndex + 1);
        }
    };

    const handleTogglePlay = () => {
        setIsPlaying(prev => !prev);
    };

    const handleStop = () => {
        setIsPlaying(false);
        setStepIndex(-1);
        setCursorPos(null);
        handleStopReading();
    };

    const handleContainerClick = () => {
        setStepIndex(-1);
        setCursorPos(null);
    }

    const videoContainerMarkup = (
        <div
            ref={containerRef}
            className={`video-fullscreen-container ${isFullscreen ? 'is-expanded-fullscreen' : ''}`}
            onClick={handleContainerClick}
            style={isFullscreen ? {
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                backgroundColor: "#000000",
                zIndex: 2147483647, // max safe z-index; combined with the portal below, this guarantees the overlay sits above the app navbar
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden"
            } : {
                position: "relative",
                width: "100%", // maximize width in normal view
                maxWidth: "1000px", // increased max-width for bigger size
                aspectRatio: "16 / 9",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
                borderRadius: "8px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.5)"
            }}
        >
            <div
                style={{
                    position: "relative",
                    width: isFullscreen ? "100vw" : "100%",
                    height: isFullscreen ? "100vh" : "100%",
                    maxWidth: "100%",
                    maxHeight: "100%",
                    aspectRatio: isFullscreen ? undefined : "16 / 9",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    overflow: "hidden"
                }}
            >
                <img
                    src={commmandmenu}
                    alt="Command Menu Image"
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "fill", // stretch to edges perfectly so coordinates match
                        outline: "none"
                    }}
                />

                {/* Per-button pink borders — coordinates come from SPOTLIGHT_BORDERS
                    above, fully independent of each button's own hitbox position.
                    Rendered behind the buttons (zIndex 25 < 30) so clicks still work. */}
                {SPOTLIGHTS.map((spot, i) => {
                    if (stepIndex !== i) return null;
                    const borderPos = isFullscreen ? SPOTLIGHT_BORDERS[i].fullscreen : SPOTLIGHT_BORDERS[i].normal;
                    return (
                        <div
                            key={`border-${spot.label}`}
                            style={{
                                position: "absolute",
                                left: `${borderPos.x}%`,
                                top: `${borderPos.y}%`,
                                width: `${borderPos.w}%`,
                                height: `${borderPos.h}%`,
                                border: `2px solid ${BORDER_COLOR}`,
                                boxSizing: "border-box",
                                pointerEvents: "none",
                                zIndex: 25,
                            }}
                        />
                    );
                })}

                {/* Render ALL spotlight buttons so they can be manually clicked anytime */}
                {SPOTLIGHTS.map((spot, i) => {
                    const pos = isFullscreen ? spot.fullscreenPos : spot.normalPos;
                    const isActive = stepIndex === i;
                    const isHoverOpen = hoveredSpotIndex === i;
                    const showDropdown = isActive;

                    return (
                        <div key={spot.label}>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsPlaying(false);
                                    setStepIndex(i);
                                }}
                                onMouseEnter={() => setHoveredSpotIndex(i)}
                                onMouseLeave={() => setHoveredSpotIndex(null)}
                                style={{
                                    position: "absolute",
                                    left: `${pos.x}%`,
                                    top: `${pos.y}%`,
                                    width: `${pos.w}%`,
                                    height: `${pos.h}%`,
                                    zIndex: 30,
                                    pointerEvents: "auto",
                                    backgroundColor: isActive ? "rgba(234, 0, 255, 0.29)" : isHoverOpen ? "rgba(236, 117, 247, 0.27)" : "transparent",
                                    border: "none",
                                    cursor: "pointer",
                                    outline: "none",
                                    transition: "background-color 0.2s ease",
                                }}
                            />

                            {/* Instant black label tooltip shown on the right side of the spotlight button */}
                            {isHoverOpen && (
                                <div
                                    style={{
                                        position: "absolute",
                                        left: `${pos.x + pos.w + 0.5}%`,
                                        top: `${pos.y + pos.h / 2}%`,
                                        transform: "translateY(-50%)",
                                        backgroundColor: "#222222",
                                        color: "#ffffff",
                                        padding: "4px 8px",
                                        borderRadius: "3px",
                                        fontSize: "11px",
                                        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                                        fontWeight: 300,
                                        whiteSpace: "nowrap",
                                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.5)",
                                        zIndex: 70,
                                        pointerEvents: "none",
                                    }}
                                >
                                    {spot.label}
                                </div>
                            )}

                            {/* Dropdown menu — only spots with menuItems get one */}
                            {showDropdown && spot.menuItems && spot.menuItems.length > 0 && (
                                <div
                                    onClick={(e) => e.stopPropagation()}
                                    onMouseEnter={() => setHoveredSpotIndex(i)}
                                    onMouseLeave={() => setHoveredSpotIndex(null)}
                                    style={{
                                        position: "absolute",
                                        left: `${pos.x}%`,
                                        top: `${pos.y + pos.h}%`,
                                        zIndex: 60, // above every spotlight button (30) and the automation cursor (50)
                                        pointerEvents: "auto",
                                        backgroundColor: "#f2f2f2", // Windows native menu background color
                                        border: "1px solid #a0a0a0",
                                        boxShadow: "2px 2px 5px rgba(0,0,0,0.2)",
                                        transition: "opacity 0.2s ease-out"
                                    }}
                                >
                                    <DropdownMenu items={spot.menuItems} columns={2} />
                                </div>
                            )}
                        </div>
                    );
                })}

                {/* Animated Cursor for the sequence */}
                {cursorPos && (
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{
                            position: "absolute",
                            left: `${cursorPos.x}%`,
                            top: `${cursorPos.y}%`,
                            zIndex: 50,
                            pointerEvents: "none",
                            transition: "all 0.5s ease-out",
                            transform: "translate(-6px, -2px)",
                            filter: "drop-shadow(1px 2px 2px rgba(0,0,0,0.5))"
                        }}
                    >
                        <path
                            fill="white"
                            stroke="black"
                            strokeWidth="1.2"
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            d="M10 2.8
               a1.3 1.3 0 0 1 2.6 0v7.1
               a1.3 1.3 0 0 1 2.5-0.4l0.2 0.6
               a1.3 1.3 0 0 1 2.3 0.2l0.2 0.5
               a1.3 1.3 0 0 1 2.2 0.9v4.2
               c0 3.2-2.2 5.9-5.4 6.4
               c-0.3 0.05-0.6 0.08-0.9 0.08h-1.9
               c-1.3 0-2.5-0.6-3.3-1.6
               l-4.6-5.9
               a1.4 1.4 0 0 1 0.2-2
               a1.4 1.4 0 0 1 1.9 0.1
               l2 2.1
               V2.8z"
                        />
                    </svg>
                )}

                <ImageControlBar
                    containerRef={containerRef}
                    isFullscreen={isFullscreen}
                    onToggleFullscreen={() => setIsFullscreen(prev => !prev)}
                    onPrevStep={handlePrevStep}
                    onNextStep={handleNextStep}
                    canGoPrev={stepIndex > 0}
                    canGoNext={stepIndex < SPOTLIGHTS.length - 1}
                    isPlaying={isPlaying}
                    onTogglePlay={handleTogglePlay}
                    onStop={handleStop}
                    referenceTitle="COMMAND MENU GUIDE"
                    referenceItems={SPOTLIGHTS.map(s => s.label)}
                    currentStepIndex={stepIndex}
                    onSelectStep={(idx) => {
                        setIsPlaying(false);
                        setStepIndex(idx);
                    }}
                />
            </div>
        </div >
    );

    return (
        <div style={{
            width: "100%",
            minHeight: "100%",
            height: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "var(--bg-dark)",
            fontFamily: "var(--font-main)",
            overflowY: "auto",
            paddingBottom: "140px",
            position: "relative"
        }}>

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
                title="Command Menu"
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

            {/* Vertically scrollable content container matching Interface_Lesson.tsx */}
            <div style={{ width: "100%", flex: 1, minHeight: "60vh", height: "auto", padding: "0px 32px 96px", display: "flex", justifyContent: "center", alignItems: "center", marginTop: "32px" }}>
                {isFullscreen ? createPortal(videoContainerMarkup, document.body) : videoContainerMarkup}
            </div>
        </div>
    );
}

export default Command_Menu_Japanese_Tutorial;
