import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ImageControlBar } from '../../../Icad_Commands/Image_Control/ImageControlBar';
import { SPOTLIGHTS as TREE_SPOTLIGHTS, MenuItem } from './Tree_View_Right_CLick/Tree_View_Right';
import { SPOTLIGHTS as MENU_BAR_SPOTLIGHTS } from '../Menu_Bar/MenuData';
import Tree_View from '../../../../../../assets/Commands/Japanese_Tutorial/Tree_View.jpg';

const SPOTLIGHTS = [...MENU_BAR_SPOTLIGHTS, ...TREE_SPOTLIGHTS];

const REFERENCE_SECTIONS = [
    {
        title: "MENU BAR GUIDE",
        items: MENU_BAR_SPOTLIGHTS.map(s => s.label),
        indexOffset: 0
    },
    {
        title: "TREE VIEW GUIDE",
        items: TREE_SPOTLIGHTS.map(s => s.label),
        indexOffset: MENU_BAR_SPOTLIGHTS.length
    }
];

// Group border boxes — fully independent of SPOTLIGHTS button coordinates.
// Adjust these x/y/w/h values directly (% of the image container, same
// coordinate space as normalPos/fullscreenPos) to reposition or resize
// either pink border. Changing a button's position elsewhere will NOT
// move these, and changing these will NOT move any button.
const MENU_BAR_BORDER = {
    normal: { x: 0, y: 1.5, w: 25, h: 2.8 },
    fullscreen: { x: 0, y: 1.5, w: 25, h: 2.8 },
};
const TREE_VIEW_BORDER = {
    normal: { x: 6.9, y: 14.5, w: 12.8, h: 80.5 },
    fullscreen: { x: 7, y: 14.5, w: 12.6, h: 80.5 },
};

function DropdownMenu({ items }: { items: MenuItem[] }) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <ul style={{
            listStyle: "none",
            margin: 0,
            padding: "2px 0",
            minWidth: "210px",
            fontSize: "11px",
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
                const isDisabled = !!item.disabled;

                return (
                    <li
                        key={index}
                        style={{
                            padding: "2px 35px 1px 25px",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            cursor: "default",
                            position: "relative",
                            backgroundColor: isHovered ? "rgba(0, 120, 215, 0.1)" : "transparent",
                            color: isDisabled ? "#a0a0a0" : isHovered ? "#000" : "#333",
                        }}
                        onMouseEnter={() => !isDisabled && setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            {item.label}
                        </span>
                        <span style={{ display: "flex", alignItems: "center", gap: "8px", color: "#666" }}>
                            {item.shortcut && <span>{item.shortcut}</span>}
                        </span>

                        {(item.hasSubmenu || hasChildren) && (
                            <span style={{
                                position: "absolute",
                                right: "8px",
                                top: "50%",
                                transform: "translateY(-50%)",
                                display: "flex",
                                alignItems: "center",
                                color: "#666",
                            }}>
                                <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="9 18 15 12 9 6"></polyline>
                                </svg>
                            </span>
                        )}

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
        </ul >
    );
}

function Tree_View_Japanese_Tutorial() {
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [stepIndex, setStepIndex] = useState(-1);

    const [contextMenu, setContextMenu] = useState<{ index: number; x: number; y: number } | null>(null);

    const [cursorPos, setCursorPos] = useState<{ x: number, y: number } | null>(null);
    const [hoveredSpotIndex, setHoveredSpotIndex] = useState<number | null>(null);

    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let timeout: NodeJS.Timeout;

        if (isPlaying && stepIndex === -1) {
            setStepIndex(0);
            setContextMenu(null);
            return;
        }

        if (stepIndex >= 0 && stepIndex < SPOTLIGHTS.length) {
            const spotlight = SPOTLIGHTS[stepIndex];
            const pos = isFullscreen ? spotlight.fullscreenPos : spotlight.normalPos;

            setCursorPos({ x: pos.x + pos.w / 2, y: pos.y + pos.h / 2 });

            if (isPlaying) {
                setContextMenu(null);
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
        setContextMenu(null);
        if (stepIndex > 0) {
            setStepIndex(stepIndex - 1);
        }
    };

    const handleNextStep = () => {
        setIsPlaying(false);
        setContextMenu(null);
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
        setContextMenu(null);
        setCursorPos(null);
    };

    const handleContainerClick = () => {
        setStepIndex(-1);
        setCursorPos(null);
        setContextMenu(null);
    }

    const menuBarPos = isFullscreen ? MENU_BAR_BORDER.fullscreen : MENU_BAR_BORDER.normal;
    const treeViewPos = isFullscreen ? TREE_VIEW_BORDER.fullscreen : TREE_VIEW_BORDER.normal;

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
                    src={Tree_View}
                    alt="Tree View Image"
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "fill",
                        outline: "none"
                    }}
                />

                {/* One static pink border wrapping the Menu Bar strip, and one wrapping
                    the Tree View panel — coordinates come from MENU_BAR_BORDER /
                    TREE_VIEW_BORDER above, fully independent of button positions. */}
                <div style={{
                    position: "absolute",
                    left: `${menuBarPos.x}%`,
                    top: `${menuBarPos.y}%`,
                    width: `${menuBarPos.w}%`,
                    height: `${menuBarPos.h}%`,
                    border: "2px solid #B5179E",
                    boxSizing: "border-box",
                    pointerEvents: "none",
                    zIndex: 15,
                }} />
                <div style={{
                    position: "absolute",
                    left: `${treeViewPos.x}%`,
                    top: `${treeViewPos.y}%`,
                    width: `${treeViewPos.w}%`,
                    height: `${treeViewPos.h}%`,
                    border: "2px solid #B5179E",
                    boxSizing: "border-box",
                    pointerEvents: "none",
                    zIndex: 15,
                }} />

                {SPOTLIGHTS.map((spot, i) => {
                    const pos = isFullscreen ? spot.fullscreenPos : spot.normalPos;
                    const isActive = stepIndex === i;
                    const isContextActive = contextMenu?.index === i;
                    const isHoverOpen = hoveredSpotIndex === i;
                    const showMenu = (isActive || isContextActive);
                    const menuItems = spot.menuItems || spot.contextMenuItems;
                    const isMenuBarItem = i < MENU_BAR_SPOTLIGHTS.length; // gates tooltip label + dropdown side

                    return (
                        <div key={spot.label}>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsPlaying(false);
                                    setContextMenu(null);
                                    setStepIndex(i);
                                }}
                                onContextMenu={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setIsPlaying(false);

                                    const currentMenuItems = spot.menuItems || spot.contextMenuItems;
                                    if (!currentMenuItems || currentMenuItems.length === 0) {
                                        setContextMenu(null);
                                        return;
                                    }

                                    const rect = containerRef.current?.getBoundingClientRect();
                                    if (!rect) return;

                                    const xPct = ((e.clientX - rect.left) / rect.width) * 100;
                                    const yPct = ((e.clientY - rect.top) / rect.height) * 100;
                                    setContextMenu({ index: i, x: xPct, y: yPct });
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

                            {/* Tooltip label — only rendered for Menu Bar items, removed for Tree View */}
                            {isHoverOpen && isMenuBarItem && (
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
                                        fontWeight: 600,
                                        whiteSpace: "nowrap",
                                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.5)",
                                        zIndex: 70,
                                        pointerEvents: "none",
                                    }}
                                >
                                    {spot.label}
                                </div>
                            )}

                            {showMenu && menuItems && menuItems.length > 0 && (
                                <div
                                    onClick={(e) => e.stopPropagation()}
                                    onContextMenu={(e) => e.preventDefault()}
                                    onMouseEnter={() => setHoveredSpotIndex(i)}
                                    onMouseLeave={() => setHoveredSpotIndex(null)}
                                    style={
                                        isContextActive && contextMenu
                                            ? {
                                                position: "absolute",
                                                left: `${contextMenu.x}%`,
                                                top: `${contextMenu.y}%`,
                                                zIndex: 60,
                                                pointerEvents: "auto",
                                                backgroundColor: "#f2f2f2",
                                                border: "1px solid #a0a0a0",
                                                boxShadow: "2px 2px 5px rgba(0,0,0,0.2)",
                                            }
                                            : isMenuBarItem
                                                ? {
                                                    // Menu Bar: dropdown appears below the item
                                                    position: "absolute",
                                                    left: `${pos.x}%`,
                                                    top: `${pos.y + pos.h}%`,
                                                    marginTop: "-2px",
                                                    zIndex: 60,
                                                    pointerEvents: "auto",
                                                    backgroundColor: "#f2f2f2",
                                                    border: "1px solid #a0a0a0",
                                                    boxShadow: "2px 2px 5px rgba(0,0,0,0.2)",
                                                }
                                                : {
                                                    // Tree View: dropdown appears to the right of the item
                                                    position: "absolute",
                                                    left: `${pos.x + pos.w}%`,
                                                    top: `${pos.y}%`,
                                                    marginLeft: "-2px",
                                                    zIndex: 60,
                                                    pointerEvents: "auto",
                                                    backgroundColor: "#f2f2f2",
                                                    border: "1px solid #a0a0a0",
                                                    boxShadow: "2px 2px 5px rgba(0,0,0,0.2)",
                                                }
                                    }
                                >
                                    <DropdownMenu items={menuItems} />
                                </div>
                            )}
                        </div>
                    );
                })}

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
                            transform: "translate(-11px, -2px)",
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
                    referenceTitle="MENU BAR & TREE VIEW GUIDE"
                    referenceSections={REFERENCE_SECTIONS}
                    currentStepIndex={stepIndex}
                    onSelectStep={(idx) => {
                        setIsPlaying(false);
                        setStepIndex(idx);
                    }}
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