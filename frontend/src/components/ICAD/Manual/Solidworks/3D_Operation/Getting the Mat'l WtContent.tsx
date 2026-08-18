import React from "react";
import rollbackBarImg from "../../../../../assets/Solidworks/3D_Operation/3D_Rollback_Bar.png";
import rebuildImg from "../../../../../assets/Solidworks/3D_Operation/3D_Rebuild.png";
import filePropertiesImg from "../../../../../assets/Solidworks/3D_Operation/3D_File_Properties.png";
import custom2Img from "../../../../../assets/Solidworks/3D_Operation/3D_Custom2.png";
import lastFeatureImg from "../../../../../assets/Solidworks/3D_Operation/3D_Last_Feature.png";

const GettingMaterialWeightContent: React.FC = () => (
    <>
        {/* Step 1 */}
        <div className="instruction-step">
            <div className="step-header" style={{ padding: '8px 0px' }}>
                <span className="step-number">1</span>
                <span className="step-label">Locate Rollback Bar</span>
            </div>
            <div className="step-description">
                <p className="p-flush" style={{ color: 'var(--text-muted)' }}>
                    Place the pointer on the <strong>rollback bar</strong> under the <strong>last feature</strong> in the FeatureManager design tree.
                </p>
            </div>
        </div>

        {/* Step 2 */}
        <div className="instruction-step">
            <div className="step-header" style={{ padding: '8px 0px' }}>
                <span className="step-number">2</span>
                <span className="step-label">Drag Rollback Bar</span>
            </div>
            <div className="step-description">
                <p className="p-flush" style={{ color: 'var(--text-muted)' }}>
                    Drag the <strong>rollback bar</strong> up and place it directly under <strong>Boss-Extrude1</strong>.
                </p>
                <div className="image-wrapper" style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
                    <img src={rollbackBarImg} alt="Rollback Bar under Boss-Extrude1" className="software-screenshot screenshot-wide" />
                </div>
            </div>
        </div>

        {/* Step 3 */}
        <div className="instruction-step">
            <div className="step-header" style={{ padding: '8px 0px' }}>
                <span className="step-number">3</span>
                <span className="step-label">Rebuild Model</span>
            </div>
            <div className="step-description">
                <p className="p-flush" style={{ color: 'var(--text-muted)' }}>
                    Click <strong>Rebuild</strong>{' '}
                    <span className="image-wrapper-flush">
                        <img src={rebuildImg} alt="Rebuild" style={{ height: '32px', verticalAlign: 'middle' }} />
                    </span>
                    {' '}or press <strong>Ctrl + B</strong> on your keyboard.
                </p>
            </div>
        </div>

        {/* Step 4 */}
        <div className="instruction-step">
            <div className="step-header" style={{ padding: '8px 0px' }}>
                <span className="step-number">4</span>
                <span className="step-label">Open File Properties</span>
            </div>
            <div className="step-description">
                <p className="p-flush" style={{ color: 'var(--text-muted)' }}>
                    In the <strong>Menu Bar</strong>, click <strong>File Properties</strong>{' '}
                    <span className="image-wrapper-flush">
                        <img src={filePropertiesImg} alt="File Properties" style={{ height: '32px', verticalAlign: 'middle' }} />
                    </span>
                    .
                </p>
            </div>
        </div>

        {/* Step 5 */}
        <div className="instruction-step">
            <div className="step-header" style={{ padding: '8px 0px' }}>
                <span className="step-number">5</span>
                <span className="step-label">Input Material Weight Property</span>
            </div>
            <div className="step-description">
                <p className="p-flush" style={{ color: 'var(--text-muted)' }}>
                    Input the evaluated <strong>Wt/Pc Evaluated Value</strong> (indicated by the red underline in the properties dialog) to the <strong>Mat'l Wt Value</strong> field (indicated by the red arrow).
                </p>
            </div>
        </div>

        {/* Step 6 */}
        <div className="instruction-step">
            <div className="step-header" style={{ padding: '8px 0px' }}>
                <span className="step-number">6</span>
                <span className="step-label">Confirm Properties</span>
            </div>
            <div className="step-description">
                <p className="p-flush" style={{ color: 'var(--text-muted)' }}>
                    Click <strong>OK</strong> to save the changes.
                </p>
                <div className="image-wrapper" style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
                    <img src={custom2Img} alt="Custom Properties Dialog" className="software-screenshot screenshot-wide" />
                </div>
            </div>
        </div>

        {/* Step 7 */}
        <div className="instruction-step">
            <div className="step-header" style={{ padding: '8px 0px' }}>
                <span className="step-number">7</span>
                <span className="step-label">Restore Rollback Bar</span>
            </div>
            <div className="step-description">
                <p className="p-flush" style={{ color: 'var(--text-muted)' }}>
                    Drag the <strong>rollback bar</strong> back down under the <strong>last feature</strong>.
                </p>
                <div className="image-wrapper" style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
                    <img src={lastFeatureImg} alt="Last Feature Rollback" className="software-screenshot screenshot-wide" />
                </div>

                <div className="instruction-box" style={{ marginTop: '1.5rem' }}>
                    <p className="p-flush red-text" style={{ marginBottom: '0.5rem' }}>
                        ※ If the part is not processed, just input the <strong>Wt/Pc Evaluated Value</strong> to <strong>Mat'l Wt Value</strong> directly.
                    </p>
                    <p className="p-flush red-text">
                        ※ For <strong>Bended Plate</strong>, make sure to <strong>Suppress</strong> all post-processing features (like <strong>Hole Wizard</strong>, <strong>Cut-Extrude</strong>, <strong>Chamfer</strong>, etc.) before taking the <strong>Material weight</strong>.
                    </p>
                </div>
            </div>
        </div>
    </>
);

export default GettingMaterialWeightContent;
