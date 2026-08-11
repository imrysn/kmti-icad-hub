import React, { useState, useEffect, useCallback } from 'react';
import ExitCourseButton from '../Exit_Course_Button/ExitCourseButton';
import Command_Menu_Japanese_Tutorial from './Command_Menu/Command_Menu';

const FALLBACK_NAVBAR_HEIGHT = 60;

interface Icad_CommandsProps {
    onExit?: () => void;
}

function Icad_Commands({ onExit }: Icad_CommandsProps) {
    const [navbarHeight, setNavbarHeight] = useState(FALLBACK_NAVBAR_HEIGHT);

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
    };

    return (
        <div style={{ width: "100%", minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "var(--bg-dark)" }}>
            {/* Fixed top bar — Exit Course only, pinned just below the global navbar */}
            <div style={topBarStyle} data-icad-topbar>
                <ExitCourseButton onExit={() => onExit?.()} />
            </div>

            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                <Command_Menu_Japanese_Tutorial />
            </div>
        </div>
    );
}

export default Icad_Commands;