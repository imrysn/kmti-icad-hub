import React from "react";
import oneImg from "../../../../../assets/Solidworks/3D_Operation/3D_1.png";
import chamferImg from "../../../../../assets/Solidworks/3D_Operation/3D_Chamfer.png";
import chamfer1Img from "../../../../../assets/Solidworks/3D_Operation/3D_Chamfer1.png";
import edgeImg from "../../../../../assets/Solidworks/3D_Operation/3D_Edges.png";
import checkImg from "../../../../../assets/Solidworks/3D_Operation/3D_Check.png";

const InsertingChamferContent: React.FC = () => (
    <>
        {/* Step 1 */}
        <div className="instruction-step">
            <div className="step-header">
                <span className="step-number">1</span>
                <span className="step-label">Click <strong>Spacebar</strong> then select <strong>Isometric</strong>.</span>
            </div>
            <div className="step-description">
                <div className="image-wrapper" style={{ marginTop: '1.5rem' }}>
                    <img src={oneImg} alt="Isometric view" className="software-screenshot screenshot-wide" />
                </div>
            </div>
        </div>

        {/* Step 2 */}
        <div className="instruction-step">
            <div className="step-header">
                <span className="step-number">2</span>
                <span className="step-label">In <strong>Features</strong> tab, under <strong>Fillet</strong>,</span>
            </div>
            <div className="step-description">
                <p className="p-flush" style={{ color: 'var(--text-muted)' }}>
                    Click{' '}
                    <span className="image-wrapper-flush">
                        <img src={chamferImg} alt="Chamfer icon" style={{ height: '30px', verticalAlign: 'middle' }} />
                    </span>
                </p>
            </div>
        </div>

        {/* Step 3 */}
        <div className="instruction-step">
            <div className="step-header">
                <span className="step-number">3</span>
                <span className="step-label">Change <strong>Distance</strong> to <strong>5 mm</strong>.</span>
            </div>
            <div className="step-description">
                <div className="image-wrapper" style={{ marginTop: '1.5rem' }}>
                    <img src={chamfer1Img} alt="Chamfer PropertyManager" className="software-screenshot screenshot-wide" />
                </div>
            </div>
        </div>

        {/* Step 4 */}
        <div className="instruction-step">
            <div className="step-header">
                <span className="step-number">4</span>
                <span className="step-label">Select edges to be Chamfered.</span>
            </div>
            <div className="step-description">
                <div className="instruction-box" style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
                    <p className="p-flush red-text" style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Important Note:</p>
                    <p className="p-flush red-text">
                        ※ Selected edges and faces will be added to <strong>Selected Entities</strong>.
                        <span className="image-wrapper-flush" style={{ marginLeft: '0.5rem' }}>
                            <img src={edgeImg} alt="Selected edges" style={{ height: '35px', verticalAlign: 'middle' }} />
                        </span>
                    </p>
                </div>
            </div>
        </div>

        {/* Step 5 */}
        <div className="instruction-step">
            <div className="step-header">
                <span className="step-number">5</span>
                <span className="step-label">
                    Click{' '}
                    <span className="image-wrapper-flush">
                        <img src={checkImg} alt="Check icon" style={{ height: '28px', verticalAlign: 'middle' }} />
                    </span>
                </span>
            </div>
        </div>
    </>
);

export default InsertingChamferContent;
