import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ImageControlBar } from '../../Image_Control/ImageControlBar';
import { SPOTLIGHTS, MenuItem } from './Tree_View_Left_CLick/Tree_View_Left';
import Tree_View from '../../../../../../assets/Commands/Japanese_Tutorial/Tree_View.jpg';

// Recursive dropdown that supports nested `children` — hovering an item
// with children flies out a submenu to its right, native-menu style.
function DropdownMenu({ items }: { items: MenuItem[] }) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <ul style={{
            listStyle: "none",
            margin: 0,
            padding: "2px 0",
            minWidth: "160px",
            fontSize: "8.8px",
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            color: "#333",
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
                                <DropdownMenu items={item.children!} />
                            </div>
                        )}
                    </li>
                );
            })}
        </ul>
    );
}

function Tree_View_Japanese_Tutorial() {
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isLabelDropdownOpen, setIsLabelDropdownOpen] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [stepIndex, setStepIndex] = useState(-1);

    // Right-click context menu: which item's menu is open, and where the
    // cursor was when it was triggered (position is a % of the container,
    // same coordinate space as everything else, so it scales/repositions
    // correctly between normal and fullscreen).
    const [contextMenu, setContextMenu] = useState<{ index: number; x: number; y: number } | null>(null);

    // Automation states
    const [cursorPos, setCursorPos] = useState<{ x: number, y: number } | null>(null);

    const containerRef = useRef<HTMLDivElement>(null);

    // Handle automated sequence: walk through each spotlight, opening its dropdown in turn
    useEffect(() => {
        let timeout: NodeJS.Timeout;

        if (isPlaying) {
            if (stepIndex === -1) {
                // start from first step
                setStepIndex(0);
                setIsLabelDropdownOpen(false);
                setContextMenu(null);
            } else if (stepIndex < SPOTLIGHTS.length) {
                const spotlight = SPOTLIGHTS[stepIndex];

                // Determine which position to use
                const pos = isFullscreen ? spotlight.fullscreenPos : spotlight.normalPos;

                setCursorPos({ x: pos.x + pos.w / 2, y: pos.y + pos.h / 2 });
                setIsLabelDropdownOpen(false);
                setContextMenu(null);

                // Wait 0.5s for cursor to move, then click
                timeout = setTimeout(() => {
                    setIsLabelDropdownOpen(true);

                    // Show dropdown for 2 seconds, then go to next
                    timeout = setTimeout(() => {
                        setIsLabelDropdownOpen(false);

                        // Wait a tiny bit before moving to next
                        timeout = setTimeout(() => {
                            setStepIndex(prev => prev + 1);
                        }, 200);

                    }, 2000);

                }, 500);

            } else {
                // End of sequence
                setIsPlaying(false);
                setStepIndex(-1);
                setCursorPos(null);
            }
        } else {
            // Paused or stopped
            setCursorPos(null);
        }

        return () => clearTimeout(timeout);
    }, [isPlaying, stepIndex, isFullscreen]);


    const handlePrevStep = () => {
        setIsPlaying(false);
        setCursorPos(null);
        setContextMenu(null);
        if (stepIndex > 0) {
            setStepIndex(stepIndex - 1);
            setIsLabelDropdownOpen(true);
        }
    };

    const handleNextStep = () => {
        setIsPlaying(false);
        setCursorPos(null);
        setContextMenu(null);
        if (stepIndex < SPOTLIGHTS.length - 1) {
            setStepIndex(stepIndex === -1 ? 0 : stepIndex + 1);
            setIsLabelDropdownOpen(true);
        }
    };

    const handleTogglePlay = () => {
        setIsPlaying(prev => !prev);
    };

    const handleStop = () => {
        setIsPlaying(false);
        setStepIndex(-1);
        setIsLabelDropdownOpen(false);
        setContextMenu(null);
        setCursorPos(null);
    };

    const handleContainerClick = () => {
        setIsLabelDropdownOpen(false);
        setStepIndex(-1);
        setCursorPos(null);
        setContextMenu(null);
    }

    const imageContainerMarkup = (
        <div
            ref={containerRef}
            className={`image-fullscreen-container ${isFullscreen ? 'is-expanded-fullscreen' : ''}`}
            onClick={handleContainerClick}
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
                width: "100%",
                maxWidth: "1000px",
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
                    width: isFullscreen ? "min(100vw, calc(100vh * 16 / 9))" : "100%",
                    height: isFullscreen ? "min(100vh, calc(100vw * 9 / 16))" : "100%",
                    maxWidth: "100%",
                    maxHeight: "100%",
                    aspectRatio: "16 / 9",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    overflow: "hidden"
                }}
            >
                <img
                    src={Tree_View}
                    alt="Tree View Image"
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "fill", // stretch to edges perfectly so coordinates match
                        outline: "none"
                    }}
                />

                {/* Render ALL label invisible buttons so they can be manually clicked anytime */}
                {SPOTLIGHTS.map((spot, i) => {
                    const pos = isFullscreen ? spot.fullscreenPos : spot.normalPos;
                    const isActive = stepIndex === i;
                    const isContextActive = contextMenu?.index === i;

                    return (
                        <div key={spot.label}>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsPlaying(false);
                                    setContextMenu(null); // left-click always closes any open right-click menu
                                    if (stepIndex === i) {
                                        setIsLabelDropdownOpen(!isLabelDropdownOpen);
                                    } else {
                                        setStepIndex(i);
                                        setIsLabelDropdownOpen(true);
                                    }
                                }}
                                onContextMenu={(e) => {
                                    e.preventDefault(); // suppress the browser's native right-click menu
                                    e.stopPropagation();
                                    setIsPlaying(false);
                                    setIsLabelDropdownOpen(false); // right-click always closes any open left-click dropdown

                                    if (!spot.contextMenuItems || spot.contextMenuItems.length === 0) {
                                        setContextMenu(null);
                                        return;
                                    }

                                    const rect = containerRef.current?.getBoundingClientRect();
                                    if (!rect) return;

                                    const xPct = ((e.clientX - rect.left) / rect.width) * 100;
                                    const yPct = ((e.clientY - rect.top) / rect.height) * 100;
                                    setContextMenu({ index: i, x: xPct, y: yPct });
                                }}
                                title={spot.label}
                                style={{
                                    position: "absolute",
                                    left: `${pos.x}%`,
                                    top: `${pos.y}%`,
                                    width: `${pos.w}%`,
                                    height: `${pos.h}%`,
                                    zIndex: 30,
                                    pointerEvents: "auto",
                                    backgroundColor: isActive ? "rgba(234, 0, 255, 0.29)" : "transparent",
                                    border: "none",
                                    cursor: "pointer",
                                    outline: "none",
                                    transition: "background-color 0.2s ease",
                                }}
                                onMouseEnter={(e) => {
                                    if (!isActive) e.currentTarget.style.backgroundColor = "rgba(236, 117, 247, 0.27)";
                                }}
                                onMouseLeave={(e) => {
                                    if (!isActive) e.currentTarget.style.backgroundColor = "transparent";
                                }}
                            />

                            {/* Native HTML/CSS Dropdown Menu (left-click) — supports nested children submenus */}
                            {isActive && isLabelDropdownOpen && spot.menuItems && spot.menuItems.length > 0 && (
                                <div
                                    onClick={(e) => e.stopPropagation()}
                                    style={{
                                        position: "absolute",
                                        left: `${pos.x + pos.w}%`,
                                        top: `${pos.y}%`,
                                        marginLeft: "2px",
                                        zIndex: 20,
                                        pointerEvents: "auto",
                                        backgroundColor: "#f2f2f2", // Windows native menu background color
                                        border: "1px solid #a0a0a0",
                                        boxShadow: "2px 2px 5px rgba(0,0,0,0.2)",
                                        transition: "opacity 0.2s ease-out"
                                    }}>
                                    <DropdownMenu items={spot.menuItems} />
                                </div>
                            )}

                            {/* Right-click context menu — appears at the cursor's click position, not the item's position */}
                            {isContextActive && spot.contextMenuItems && spot.contextMenuItems.length > 0 && (
                                <div
                                    onClick={(e) => e.stopPropagation()}
                                    onContextMenu={(e) => e.preventDefault()}
                                    style={{
                                        position: "absolute",
                                        left: `${contextMenu!.x}%`,
                                        top: `${contextMenu!.y}%`,
                                        zIndex: 60, // above every spotlight button (30), left-click dropdown (20), and the automation cursor (50)
                                        pointerEvents: "auto",
                                        backgroundColor: "#f2f2f2",
                                        border: "1px solid #a0a0a0",
                                        boxShadow: "2px 2px 5px rgba(0,0,0,0.2)",
                                        transition: "opacity 0.2s ease-out"
                                    }}>
                                    <DropdownMenu items={spot.contextMenuItems} />
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
                            transition: "top 0.5s ease-out",
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
                />
            </div>
        </div>
    );

    return (
        <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", fontFamily: "var(--font-main)" }}>
            <div style={{ width: "100%", flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
                {isFullscreen ? createPortal(imageContainerMarkup, document.body) : imageContainerMarkup}
            </div>
        </div>
    );
}

export default Tree_View_Japanese_Tutorial;