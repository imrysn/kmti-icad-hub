import React from "react";
import partMode from "../../../../../assets/Solidworks/3D_Fv/Solidwork_Part.png";
import assemblyMode from "../../../../../assets/Solidworks/3D_Fv/Solidwork_Assembly.png";
import drawingMode from "../../../../../assets/Solidworks/3D_Fv/Solidwork_Drawing.png";

const CommandManagerContent: React.FC = () => (
    <div style={{ padding: '1rem 0', color: 'var(--text-color)' }}>
        <div className="instruction-step">
            <p className="p-flush" style={{ color: 'var(--text-muted)' }}>
                It is a toolbar that consists of different toolbars containing sets of commands for every function.
            </p>

            {/* Part Mode */}
            <div style={{ marginTop: '1.5rem' }}>
                <div className="step-header">
                    <span className="step-label">Part Mode CommandManager</span>
                </div>
                <p className="p-flush" style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                    It is a set of toolbars that consists of different commands that are commonly used during the designing process.
                </p>
                <img
                    src={partMode}
                    alt="Part Mode CommandManager — Features, Sketch, Sheet Metal, Evaluate, DimXpert, Office Products"
                    className="software-screenshot screenshot-wide"
                    style={{ marginTop: '1rem' }}
                />
            </div>

            {/* Assembly Mode */}
            <div style={{ marginTop: '2rem' }}>
                <div className="step-header">
                    <span className="step-label">Assembly Mode CommandManager</span>
                </div>
                <p className="p-flush" style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                    It is a set of toolbars that consists of different commands that are used to assemble parts and simulate an assembly.
                </p>
                <img
                    src={assemblyMode}
                    alt="Assembly Mode CommandManager — Assembly, Layout, Sketch, Evaluate, Office Products"
                    className="software-screenshot screenshot-wide"
                    style={{ marginTop: '1rem' }}
                />
            </div>

            {/* Drawing Mode */}
            <div style={{ marginTop: '2rem' }}>
                <div className="step-header">
                    <span className="step-label">Drawing Mode CommandManager</span>
                </div>
                <p className="p-flush" style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                    It is a set of toolbars that consists of different commands that are commonly used during the drawing process.
                </p>
                <img
                    src={drawingMode}
                    alt="Drawing Mode CommandManager — View Layout, Annotation, Sketch, Evaluate, Office Products"
                    className="software-screenshot screenshot-wide"
                    style={{ marginTop: '1rem' }}
                />
            </div>
        </div>
    </div>
);

export default CommandManagerContent;
