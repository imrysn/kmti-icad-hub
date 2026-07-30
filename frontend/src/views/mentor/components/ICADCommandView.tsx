import React, { useState, useEffect } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { IcadCommandsGrid } from './icad/IcadCommandsGrid';
import { IcadGuideGrid } from './icad/IcadGuideGrid';
import { IcadMenuSetupGrid } from './icad/IcadMenuSetupGrid';
import Icad_Commands from '../../../components/ICAD/Command/Icad_Commands/Icad_Commands';
import Icad_Guide from '../../../components/ICAD/Command/Icad_Guide/Icad_Guide';
import Icad_Menu_Setup from '../../../components/ICAD/Command/Icad_Menu_Setup/menuSetup';



interface Props {
    setSelectedCourse: (course: any) => void;
}

// Sidebar lesson entry
const SIDEBAR_LESSONS = [
    { id: 'icad_commands', label: 'iCAD Commands' },
    { id: 'icad_guide', label: 'iCAD Guide' },
    { id: 'icad_menu_setup', label: 'iCAD Menu Setup' },
];

// Shared "top bar" wrapper style
const topBarStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0.54rem 1.2rem',
    borderBottom: '1px solid var(--border-color)',
    background: 'var(--bg-surface)',
    flexShrink: 0,
};

export const ICADCommandView: React.FC<Props> = ({ setSelectedCourse }) => {
    const [commandsPage, setCommandsPage] = useState<string | null>(null);
    const [guidePage, setGuidePage] = useState<string | null>(null);
    const [menuSetupPage, setMenuSetupPage] = useState<string | null>(null);


    useEffect(() => {
        const handleReset = () => {
            setCommandsPage(null);
            setGuidePage(null);
            setMenuSetupPage(null);
        };
        window.addEventListener('resetCourseView', handleReset);
        return () => window.removeEventListener('resetCourseView', handleReset);
    }, []);

    // ── Full-page Commands view (LessonViewer-like layout) ──────────────────
    if (commandsPage === 'icad_commands') {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--bg-dark)', overflow: 'hidden' }}>


                {/* Content — full bleed so Icad_Commands IDE layout fills the space */}
                <div style={{
                    flex: 1,
                    overflow: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                    <Icad_Commands />
                </div>
            </div>
        );
    }

    if (guidePage === 'icad_guide') {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--bg-dark)', overflow: 'hidden' }}>

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

                {/* Content — full bleed so Icad_Menu_Setup  fills the space */}
                <div style={{
                    flex: 1,
                    overflow: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
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