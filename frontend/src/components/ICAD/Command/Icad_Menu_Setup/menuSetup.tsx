import React, { useState, useRef, useEffect, useLayoutEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { menuData } from "./Menu_Data/menuData";
import { ReadAloudButton } from "../../../ReadAloudButton";
import { useTTSContext } from "../../../../context/TTSContext";
import ExitCourseButton from "../Exit_Course_Button/ExitCourseButton";
import { LessonHeaderBanner } from "../../../LessonHeaderBanner";

import "../Command_Page_Theme/CommandShared.css";
import "./Menu_Setup_Theme/Menu_Setup_Theme.css";

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

    const [navbarHeight, setNavbarHeight] = useState(FALLBACK_NAVBAR_HEIGHT);

    const [selected, setSelected] = useState<Category>("Function");
    const categories = Object.keys(menuData) as Category[];
    const selectedIndex = categories.indexOf(selected);

    const scrollLessonToTop = () => {
        requestAnimationFrame(() => {
            document.querySelector<HTMLElement>(".command-page-shell")
                ?.scrollTo({ top: 0, behavior: "smooth" });
        });
    };

    const handlePrevious = () => {
        if (selectedIndex <= 0) return;
        setSelected(categories[selectedIndex - 1]);
        scrollLessonToTop();
    };

    const handleNext = () => {
        if (selectedIndex < categories.length - 1) {
            setSelected(categories[selectedIndex + 1]);
            scrollLessonToTop();
            return;
        }

        onExit?.();
    };

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

    return (
        <div className="command-page-shell">

            {isButtonStuck && (
                <div className="lesson-action-cluster command-sticky-actions" style={{
                    top: `${navbarHeight + TOPBAR_HEIGHT + STUCK_BUTTON_GAP}px`,
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
                title="Menu Setup"
                lessonNumber={lessonNumber}
                totalLessons={totalLessons}
                subtitle="(Keywords)"
                stickySentinelRef={sentinelRef}
                actions={!isButtonStuck ? (
                    <>
                        <ExitCourseButton onExit={() => onExit?.()} />
                        <ReadAloudButton isSpeaking={isSpeaking} onStart={handleStartReading} onStop={handleStopReading} />
                    </>
                ) : undefined}
            />

            {/* Content — category tab bar + lesson card */}
            <div className="lesson-content-body">
                <div className="course-lesson-container command-content--menu-setup">

                {/* Pill-shaped category tab bar */}
                <div
                    role="tablist"
                    className="lesson-tabs command-tab-list"
                >
                    {categories.map((category) => {
                        const isActive = selected === category;
                        return (
                            <button
                                key={category}
                                role="tab"
                                aria-selected={isActive}
                                className={isActive ? "tab-button active" : "tab-button"}
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
                <div className="lesson-card fade-in">
                    <div className="card-header">
                        <h4 className="section-title">{selected}</h4>
                    </div>

                    <div className="command-table-scroll">
                        <table className="command-table">
                            <thead>
                                <tr>
                                    <th className="icad-th">
                                        Key
                                    </th>
                                    <th className="icad-th command-table__command">
                                        Command
                                    </th>
                                    <th className="icad-th">
                                        Content
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {menuData[selected].map((item) =>
                                    item.shortcuts.map((shortcut, index) => (
                                        <tr key={`${item.key}-${index}`} className="lesson-table-row">
                                            <td className="icad-td command-table__key">
                                                {index === 0 ? item.key : ""}
                                            </td>
                                            <td className="icad-td command-table__command">
                                                {shortcut.type}
                                            </td>
                                            <td className="icad-td command-table__content">
                                                {shortcut.command}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="lesson-navigation">
                        <button
                            className="nav-button"
                            onClick={handlePrevious}
                            disabled={selectedIndex === 0}
                        >
                            <ChevronLeft size={18} /> Previous
                        </button>
                        <button className="nav-button next" onClick={handleNext}>
                            {selectedIndex === categories.length - 1 ? "Next Lesson" : "Next"}
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </div>
                </div>
            </div>

        </div>
    );
}

export default MenuSetup;
