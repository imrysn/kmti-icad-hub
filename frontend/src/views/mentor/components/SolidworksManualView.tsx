import React from 'react';
import { SolidworksIntroduction } from './solidworks/SolidworksIntroduction';
import { Solidworks3DOperation } from './solidworks/Solidworks3DOperation';
import { Solidworks2DOperation } from './solidworks/Solidworks2DOperation';

interface Props {
    setSelectedCourse: (course: any) => void;
}

export const SolidworksManualView: React.FC<Props> = ({ setSelectedCourse }) => {
    return (
        <div className="mentor-mode course-selector-view animate-fade-in">
            <div className="mentor-header">
                <h1>SOLIDWORKS Manual</h1>
                <p>Select your learning path to begin the deep dive</p>
            </div>
            <div className="course-selection">
                <div className="course-grid">
                    <SolidworksIntroduction setSelectedCourse={setSelectedCourse} />
                    <Solidworks3DOperation setSelectedCourse={setSelectedCourse} />
                    <Solidworks2DOperation setSelectedCourse={setSelectedCourse} />
                </div>
            </div>
        </div>
    );
};
