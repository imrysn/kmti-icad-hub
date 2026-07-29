import React, { useState, useEffect } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { IcadCommandsGrid } from './icad/IcadCommandsGrid';
import { IcadGuideGrid } from './icad/IcadGuideGrid';
import { IcadMenuSetupGrid } from './icad/IcadMenuSetupGrid';
import Icad_Commands from '../../../components/ICAD/Command/Icad_Commands/Icad_Commands';
import Icad_Guide from '../../../components/ICAD/Command/Icad_Guide/Icad_Guide';
import Icad_Menu_Setup from '../../../components/ICAD/Command/Icad_Menu_Setup/menuSetup';
import { useUI } from '../../../context/UIContext';



interface Props {
    setSelectedCourse: (course: any) => void;
}

// Sidebar lesson entry
const SIDEBAR_LESSONS = [
    { id: 'icad_commands', label: 'iCAD Commands' },
    { id: 'icad_guide', label: 'iCAD Guide' },
    { id: 'icad_menu_setup', label: 'iCAD Menu Setup' },
];

export const ICADCommandView: React.FC<Props> = ({ setSelectedCourse }) => {
    const { requestConfirmation } = useUI();
    const [commandsPage, setCommandsPage] = useState<string | null>(null);
    const [guidePage, setGuidePage] = useState<string | null>(null);
    const [menuSetupPage, setMenuSetupPage] = useState<string | null>(null);
    const [isExitHovered, setIsExitHovered] = useState(false);


    useEffect(() => {
        const handleReset = () => {
            setCommandsPage(null);
            setGuidePage(null);
            setMenuSetupPage(null);
        };
        window.addEventListener('resetCourseView', handleReset);
        return () => window.removeEventListener('resetCourseView', handleReset);
    }, []);



    const handleExitCourse = async () => {
        const confirmed = await requestConfirmation({
            title: 'SUSPEND LEARNING SESSION',
            message: 'Are you sure you want to disconnect? Your current progress has been safely synchronized. You will be returned to the module hub.',
            confirmText: 'Suspend Session',
            type: 'info'
        });
        if (confirmed) {
            setSelectedCourse(null);
        }
    };

    // ── Full-page Commands view (LessonViewer-like layout) ──────────────────
    if (commandsPage === 'icad_commands') {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--bg-dark)', overflow: 'hidden' }}>

                {/* Top bar */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    padding: '0.54rem 1.2rem',
                    borderBottom: '1px solid var(--border-color)',
                    background: '#000000 var(--bg-surface)',
                    flexShrink: 0,
                }}>



                    {/* Exit button */}
                    <button
                        className="exit-course-btn"
                        onClick={handleExitCourse}
                        style={{
                            fontSize: '12.8px',
                            padding: '8px 16px',
                            letterSpacing: '0.5px',
                            borderRadius: '4px',
                            backgroundColor: 'rgba(127, 29, 29, 0.35)',
                            color: '#FCA5A5',
                            boxSizing: 'border-box',
                            lineHeight: '1.6',
                            fontWeight: 300
                        }}
                    >
                        EXIT COURSE
                    </button>
                </div>

                {/* Content — centered */}
                <div style={{
                    flex: 1,
                    overflowY: 'auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '2rem',
                }}>
                    <Icad_Commands />
                </div>
            </div>
        );
    }

    if (guidePage === 'icad_guide') {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--bg-dark)', overflow: 'hidden' }}>

                {/* Top bar */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    padding: '0.54rem 1.2rem',
                    borderBottom: '1px solid var(--border-color)',
                    background: '#000000 var(--bg-surface)',
                    flexShrink: 0,
                }}>



                    {/* Exit button */}
                    <button
                        className="exit-course-btn"
                        onClick={handleExitCourse}
                        onMouseEnter={() => setIsExitHovered(true)}
                        onMouseLeave={() => setIsExitHovered(false)}
                        style={{
                            fontSize: '12.8px',
                            padding: '10px 16px 6px',
                            letterSpacing: '0.3px',
                            borderRadius: '6px',
                            border: '1px solid #7c1818d2',
                            backgroundColor: 'rgb(248, 81, 73)',
                            color: isExitHovered ? '#ffffff' : '#FCA5A5',
                            boxSizing: 'border-box',
                            lineHeight: '1.6',
                            fontWeight: 700,
                            transition: 'color 0.15s ease',
                            textAlign: 'center'
                        }}
                    >
                        EXIT COURSE
                    </button>
                </div>

                {/* Content — full bleed so Icad_Guide IDE layout fills the space */}
                <div style={{
                    flex: 1,
                    overflow: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                    <Icad_Guide />
                </div>
            </div>
        );
    }

    if (menuSetupPage === 'icad_menu_setup') {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--bg-dark)', overflow: 'hidden' }}>

                {/* Top bar */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    padding: '0.54rem 1.2rem',
                    borderBottom: '1px solid var(--border-color)',
                    background: '#000000 var(--bg-surface)',
                    flexShrink: 0,
                }}>


                    {/* Exit button */}
                    <button
                        className="exit-course-btn"
                        onClick={handleExitCourse}
                        style={{
                            fontSize: '12.8px',
                            padding: '8px 16px',
                            letterSpacing: '0.5px',

                            borderRadius: '4px',

                            backgroundColor: 'transparent',
                            boxSizing: 'border-box',
                            lineHeight: '1.6',
                            fontWeight: 300
                        }}
                    >
                        EXIT COURSE
                    </button>
                </div>

                {/* Content — centered */}
                <div style={{
                    flex: 1,
                    overflowY: 'auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '2rem',
                }}>
                    <Icad_Menu_Setup />
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
                        onLaunchCommands={() => setCommandsPage('icad_commands')}
                    />
                    <IcadGuideGrid
                        setSelectedCourse={setSelectedCourse}
                        onLaunchGuide={() => setGuidePage('icad_guide')}
                    />
                    <IcadMenuSetupGrid
                        setSelectedCourse={setSelectedCourse}
                        onLaunchMenuSetUp={() => setMenuSetupPage('icad_menu_setup')}
                    />
                </div>
            </div>
        </div>
    );
};