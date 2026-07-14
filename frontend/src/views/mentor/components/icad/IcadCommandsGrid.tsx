import React, { useState, useEffect } from 'react';
import { PlayCircle } from 'lucide-react';
import Commands from '../../../../components/ICAD/Command/Icad_Commands/Commands';

interface Props {
    setSelectedCourse: (course: any) => void;
}

export const IcadCommandsGrid: React.FC<Props> = ({ setSelectedCourse }) => {
    const [showCommands, setShowCommands] = useState(false);

    // Log showCommands changes
    useEffect(() => {
        console.log('showCommands state:', showCommands);
    }, [showCommands]);

    const handleLaunch = () => {
        // Keep existing course selection for potential sidebar logic
        setSelectedCourse({
            id: 'mock-icad-commands',
            title: 'iCAD Commands',
            description: 'Placeholder for future content.',
            course_type: 'Command'
        });
        console.log('Launching iCAD Commands');
        setShowCommands(true);
    };

    return (
        <div className="course-card card-2d">
            {/* Grid view – only show when commands are not active */}
            {!showCommands && (
                <>
                    <div className="card-header">
                        <h3>iCAD Commands</h3>
                    </div>
                    <p>Placeholder for future content.</p>
                    <div className="card-graphic-container card-2d-graphic-container">
                        <div className="card-2d-image" style={{ height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.05)', color: 'var(--text-muted)' }}>
                            Graphic Placeholder
                        </div>
                    </div>
                    <button
                        className="primary"
                        onClick={handleLaunch}
                    >
                        Launch Module <PlayCircle size={18} />
                    </button>
                </>
            )}
            {/* Render the full Commands workspace once launched */}
            {showCommands && (
                <div className="commands-view-wrapper" style={{ padding: '2rem', width: '100%', overflowY: 'auto', background: 'magenta' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '1.5rem' }}>
                        <button className="exit-course-btn" onClick={() => setShowCommands(false)}>
                            RETURN TO HUB
                        </button>
                    </div>
                    <Commands />
                </div>
            )}
        </div>
    );
};