import React, { useState } from 'react';
import { CheckCircle2, Menu, X } from 'lucide-react';
import { IcadCommandsGrid } from './icad/IcadCommandsGrid';
import { IcadGuideGrid } from './icad/IcadGuideGrid';
import { IcadMenuSetupGrid } from './icad/IcadMenuSetupGrid';
import Commands from '../../../components/ICAD/Command/Icad_Commands/DraftingDropdown/DraftingDropdownLayout';
import DrawDropdownLayout from '../../../components/ICAD/Command/Icad_Commands/DrawDropdownLayout/DrawDropdownLayout';

interface Props {
    setSelectedCourse: (course: any) => void;
}

// Sidebar lesson entry
const SIDEBAR_LESSONS = [
    { id: 'commands', label: 'iCAD Drafting Commands' },
    { id: 'drawDropdown', label: 'iCAD Draw Commands' },
];

export const ICADCommandView: React.FC<Props> = ({ setSelectedCourse }) => {
    const [commandsPage, setCommandsPage] = useState<string | null>(null);
    const [activeLesson, setActiveLesson] = useState<string | null>(null);
    const [sidebarOpen, setSidebarOpen] = useState(true);

    // ── Full-page Commands view (LessonViewer-like layout) ──────────────────
    if (commandsPage === 'icad-commands') {
        const totalLessons = SIDEBAR_LESSONS.length;
        const currentIndex = SIDEBAR_LESSONS.findIndex(l => l.id === activeLesson);

        return (
            <div style={{ display: 'flex', height: '100%', background: 'var(--bg-deep, #0d0d1a)', overflow: 'hidden' }}>

                {/* ── Left Sidebar ── */}
                {sidebarOpen && (
                    <div style={{
                        width: '220px',
                        minWidth: '220px',
                        background: 'var(--bg-sidebar, #111128)',
                        borderRight: '1px solid rgba(255,255,255,0.07)',
                        display: 'flex',
                        flexDirection: 'column',
                        overflowY: 'auto',
                    }}>
                        {/* Sidebar header */}
                        <div style={{
                            padding: '1rem',
                            borderBottom: '1px solid rgba(255,255,255,0.07)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}>
                            <span style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-primary, #fff)', letterSpacing: '0.02em' }}>
                                iCAD Commands
                            </span>
                            <button
                                onClick={() => setSidebarOpen(false)}
                                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted, #888)', padding: '2px' }}
                            >
                                <X size={14} />
                            </button>
                        </div>

                        {/* Lesson list */}
                        <div style={{ padding: '0.5rem 0' }}>
                            {SIDEBAR_LESSONS.map((lesson) => {
                                const isActive = activeLesson === lesson.id;
                                return (
                                    <button
                                        key={lesson.id}
                                        onClick={() => setActiveLesson(lesson.id)}
                                        style={{
                                            width: '100%',
                                            textAlign: 'left',
                                            padding: '0.65rem 1rem',
                                            background: isActive ? 'rgba(99,102,241,0.15)' : 'transparent',
                                            borderLeft: isActive ? '3px solid var(--primary, #6366f1)' : '3px solid transparent',
                                            border: 'none',
                                            borderLeftStyle: 'solid',
                                            color: isActive ? 'var(--primary, #6366f1)' : 'var(--text-secondary, #aaa)',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.6rem',
                                            fontSize: '0.82rem',
                                            transition: 'all 0.15s',
                                        }}
                                    >
                                        <CheckCircle2 size={14} style={{ opacity: isActive ? 1 : 0.4, color: isActive ? 'var(--primary)' : 'inherit' }} />
                                        {lesson.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* ── Main content area ── */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

                    {/* Top bar */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.75rem 1.5rem',
                        borderBottom: '1px solid rgba(255,255,255,0.07)',
                        background: 'var(--bg-surface, #1a1a2e)',
                        flexShrink: 0,
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            {!sidebarOpen && (
                                <button
                                    onClick={() => setSidebarOpen(true)}
                                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '4px' }}
                                >
                                    <Menu size={18} />
                                </button>
                            )}
                            {/* Lesson counter */}
                            <div style={{ textAlign: 'center' }}>
                                <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--primary, #6366f1)', fontWeight: 600, letterSpacing: '0.05em' }}>
                                    Lesson {activeLesson ? currentIndex + 1 : 0} of {totalLessons}
                                </p>
                                <h2 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary, #fff)' }}>
                                    {activeLesson ? SIDEBAR_LESSONS.find(l => l.id === activeLesson)?.label : 'Select a Lesson'}
                                </h2>
                            </div>
                        </div>

                        {/* Exit button */}
                        <button
                            className="exit-course-btn"
                            onClick={() => { setCommandsPage(null); setActiveLesson(null); }}
                        >
                            EXIT COURSE
                        </button>
                    </div>

                    {/* Content */}
                    <div style={{ flex: 1, overflowY: 'auto', padding: '2rem' }}>
                        {activeLesson ? (
                            <Commands />
                        ) : (
                            /* "Select a Lesson" placeholder */
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: '100%',
                                gap: '1rem',
                                color: 'var(--text-muted, #888)',
                            }}>
                                <div style={{
                                    width: '520px',
                                    maxWidth: '90%',
                                    aspectRatio: '16/9',
                                    background: 'linear-gradient(135deg, #ff6ec7 0%, #a855f7 50%, #6366f1 100%)',
                                    borderRadius: '12px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '1rem',
                                    color: 'rgba(255,255,255,0.7)',
                                    fontWeight: 500,
                                }}>
                                    iCAD Command Reference
                                </div>
                                <p style={{ margin: 0, fontSize: '0.9rem' }}>
                                    Click a lesson in the sidebar to begin.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    // ── Default grid view ────────────────────────────────────────────────────
    return (
        <div className="mentor-mode course-selector-view animate-fade-in">
            <div className="mentor-header">
                <h1>ICAD Command</h1>
                <p>Select your learning path to begin the deep dive</p>
            </div>
            <div className="course-selection">
                <div className="course-grid">
                    <IcadCommandsGrid
                        setSelectedCourse={setSelectedCourse}
                        onLaunchCommands={() => setCommandsPage('icad-commands')}
                    />
                    <IcadGuideGrid setSelectedCourse={setSelectedCourse} />
                    <IcadMenuSetupGrid setSelectedCourse={setSelectedCourse} />
                </div>
            </div>
        </div>
    );
};
