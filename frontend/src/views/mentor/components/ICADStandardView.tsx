import React from 'react';
import { IcadKemcoJisStandards } from './icad/IcadKemcoJisStandards';

interface Props {
    setSelectedCourse: (course: any) => void;
}

export const ICADStandardView: React.FC<Props> = ({ setSelectedCourse }) => {
    return (
        <div className="mentor-mode course-selector-view animate-fade-in">
            <div className="mentor-header">
                <h1>ICAD Standard</h1>
                <p>Select your learning path to begin the deep dive</p>
            </div>
            <div className="course-selection">
                <div className="course-grid">
                    <IcadKemcoJisStandards setSelectedCourse={setSelectedCourse} />
                </div>
            </div>
        </div>
    );
};
