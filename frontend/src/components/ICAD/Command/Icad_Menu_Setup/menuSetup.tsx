import { useState, useEffect, useCallback } from "react";
import "./Menu_Setup_Theme/Menu_Setup_Theme.css";
import { menuData } from "./Menu_Data/menuData";
import ExitCourseButton from "../Exit_Course_Button/ExitCourseButton";

type Category = keyof typeof menuData;

interface MenuSetupProps {
    onExit?: () => void;
}

const FALLBACK_NAVBAR_HEIGHT = 60;

export default function MenuSetup({ onExit }: MenuSetupProps) {
    const [selected, setSelected] = useState<Category>("Function");
    const [navbarHeight, setNavbarHeight] = useState(FALLBACK_NAVBAR_HEIGHT);

    const categories = Object.keys(menuData) as Category[];

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
        height: "56px",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: "0.54rem 1.2rem",
        backgroundColor: "var(--bg-dark)",
        flexShrink: 0,
        zIndex: 900,
        boxSizing: "border-box",
    };

    return (
        <div className="menu-setup-header" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>

            {/* Fixed top bar — Exit Course only, pinned just below the global navbar */}
            <div style={topBarStyle} data-icad-topbar>
                <ExitCourseButton onExit={() => onExit?.()} />
            </div>

            {/* Spacer to offset the fixed top bar */}
            <div style={{ width: "100%", height: "56px", flexShrink: 0 }} />

            <h1 style={{ marginTop: '50px' }}>Menu Setup</h1>
            <p style={{ marginBottom: '2rem' }}>(Keywords)</p>

            <div className="menu-container">

                <div className="sidebar">

                    <h3>Categories</h3>

                    {categories.map((category) => (
                        <button
                            key={category}
                            className={
                                selected === category
                                    ? "category active"
                                    : "category"
                            }
                            onClick={() => setSelected(category)}
                        >
                            ▶ {category}
                        </button>
                    ))}

                </div>

                <div className="content">

                    <h2>{selected}</h2>

                    <table>

                        <thead>
                            <tr>
                                <th>Key</th>
                                <th>Command</th>
                            </tr>
                        </thead>

                        <tbody>
                            {menuData[selected].map((item) =>
                                item.shortcuts.map((shortcut, index) => (
                                    <tr key={`${item.key}-${index}`}>
                                        <td>{index === 0 ? item.key : ""}</td>
                                        <td>{shortcut.type}</td>
                                        <td>{shortcut.command}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>

                    </table>

                </div>
            </div>
        </div>
    );
}