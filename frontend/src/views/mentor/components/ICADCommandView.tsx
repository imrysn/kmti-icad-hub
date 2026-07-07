import React from 'react';
import { IcadCommandsGrid } from './icad/IcadCommandsGrid';
import { IcadGuideGrid } from './icad/IcadGuideGrid';
import { IcadMenuSetupGrid } from './icad/IcadMenuSetupGrid';

interface Props {
    setSelectedCourse: (course: any) => void;
}

export const ICADCommandView: React.FC<Props> = ({ setSelectedCourse }) => {
    return (
        <div className="mentor-mode course-selector-view animate-fade-in">
            <div className="mentor-header">
                <h1>ICAD Command</h1>
                <p>Select your learning path to begin the deep dive</p>
            </div>
            <div className="course-selection">
                <div className="course-grid">
                    <IcadCommandsGrid setSelectedCourse={setSelectedCourse} />
                    <IcadGuideGrid setSelectedCourse={setSelectedCourse} />
                    <IcadMenuSetupGrid setSelectedCourse={setSelectedCourse} />
                </div>
            </div>
        </div>
    );
};
