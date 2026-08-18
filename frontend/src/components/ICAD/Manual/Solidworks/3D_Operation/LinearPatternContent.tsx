import React from "react";
import linearComponentImg from "../../../../../assets/Solidworks/3D_Operation/3D_Linear_Component.png";
import linearPatternImg from "../../../../../assets/Solidworks/3D_Operation/3D_Linear_Pattern.png";
import checkImg from "../../../../../assets/Solidworks/3D_Operation/3D_Check.png";
import localPatternImg from "../../../../../assets/Solidworks/3D_Operation/3D_Local_Pattern.png";

const LinearPatternContent: React.FC = () => (
    <>
        {/* Step 1 */}
        <div className="instruction-step">
            <div className="step-header" style={{ padding: '8px 0px' }}>
                <span className="step-number">1</span>
                <span className="step-label">Select Linear Component Pattern</span>
            </div>
            <div className="step-description">
                <p className="p-flush" style={{ color: 'var(--text-muted)' }}>
                    In the <strong>Assembly</strong> tab, click <strong>Linear Component Pattern</strong>{' '}
                    <span className="image-wrapper-flush">
                        <img src={linearComponentImg} alt="Linear Component" style={{ height: '32px', verticalAlign: 'middle' }} />
                    </span>
                    {' '}from the pattern dropdown menu.
                </p>
            </div>
        </div>

        {/* Step 2 */}
        <div className="instruction-step">
            <div className="step-header" style={{ padding: '8px 0px' }}>
                <span className="step-number">2</span>
                <span className="step-label">Input Pattern Properties</span>
            </div>
            <div className="step-description">
                <p className="p-flush" style={{ color: 'var(--text-muted)' }}>
                    Input the distance, quantity, and select the components you want to pattern.
                </p>
                <div className="image-wrapper" style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
                    <img src={linearPatternImg} alt="Linear Pattern PropertyManager" className="software-screenshot screenshot-wide" />
                </div>
                <div className="instruction-box" style={{ marginTop: '1.5rem' }}>
                    <p className="p-flush red-text">
                        ※ For <strong>Pattern Direction</strong>, select an edge of a part. The preview arrow will determine the direction of the pattern.
                    </p>
                    <p className="p-flush red-text" style={{ marginTop: '0.5rem' }}>
                        ※ Always count and include the original seed component when inputting the <strong>Number of Instances</strong>.
                    </p>
                </div>
            </div>
        </div>

        {/* Step 3 */}
        <div className="instruction-step">
            <div className="step-header" style={{ padding: '8px 0px' }}>
                <span className="step-number">3</span>
                <span className="step-label">Confirm Pattern</span>
            </div>
            <div className="step-description">
                <p className="p-flush" style={{ color: 'var(--text-muted)' }}>
                    Click{' '}
                    <span className="image-wrapper-flush">
                        <img src={checkImg} alt="Check" style={{ height: '24px', verticalAlign: 'middle' }} />
                    </span>
                    {' '}to apply the pattern to the assembly.
                </p>
                <div className="image-wrapper" style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
                    <img src={localPatternImg} alt="Local Pattern Result" className="software-screenshot screenshot-wide" />
                </div>
            </div>
        </div>
    </>
);

export default LinearPatternContent;
