import React, { useState, useEffect } from 'react';
import { IcadCommandsGrid } from './icad/IcadCommandsGrid';
import { IcadGuideGrid } from './icad/IcadGuideGrid';
import { IcadMenuSetupGrid } from './icad/IcadMenuSetupGrid';
import Icad_Commands from '../../../components/ICAD/Command/Icad_Commands/Icad_Commands';
import Icad_Guide from '../../../components/ICAD/Command/Icad_Guide/Icad_Guide';
import Icad_Menu_Setup from '../../../components/ICAD/Command/Icad_Menu_Setup/menuSetup';
import { useContentAvailability } from '../../../hooks/useContentAvailability';

const ICAD_COMMANDS_SAFE_DEFAULT = {
    resource_key: 'icad_commands',
    display_name: 'iCAD Commands',
    status: 'coming_soon' as const,
    message: 'This course is currently being prepared and is not yet available.',
};



interface Props {
    setSelectedCourse: (course: any) => void;
}

export const ICADCommandView: React.FC<Props> = ({ setSelectedCourse }) => {
    const { byKey } = useContentAvailability();
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

    useEffect(() => {
        if (commandsPage && byKey.icad_commands && byKey.icad_commands.status !== 'available') setCommandsPage(null);
        if (guidePage && byKey.icad_guide && byKey.icad_guide.status !== 'available') setGuidePage(null);
        if (menuSetupPage && byKey.icad_menu_setup && byKey.icad_menu_setup.status !== 'available') setMenuSetupPage(null);
    }, [byKey, commandsPage, guidePage, menuSetupPage]);

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
                    <Icad_Guide onExit={() => setGuidePage(null)} />
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
                    <Icad_Menu_Setup onExit={() => setMenuSetupPage(null)} />
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
                        availability={byKey.icad_commands || ICAD_COMMANDS_SAFE_DEFAULT}
                    />
                    <IcadGuideGrid
                        setSelectedCourse={setSelectedCourse}
                        onLaunchGuide={() => setGuidePage('icad_guide')}
                        availability={byKey.icad_guide}
                    />
                    <IcadMenuSetupGrid
                        setSelectedCourse={setSelectedCourse}
                        onLaunchMenuSetUp={() => setMenuSetupPage('icad_menu_setup')}
                        availability={byKey.icad_menu_setup}
                    />
                </div>
            </div>
        </div>
    );
};
