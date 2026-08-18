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
            <div className="step-header"  style={{padding:'8px 0px'}}>
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
            <div className="step-header"  style={{padding:'8px 0px'}}>
                <span className="step-number">2</span>
                <span className="step-label">In <strong>Features</strong> tab, under <strong>Fillet</strong>, click</span>
                <span className="image-wrapper-flush" style={{ flex: '0 0 auto' }}>
                    <img src={chamferImg} alt="Chamfer icon" style={{ display: 'block', height: '30px', width: 'auto' }} />
                </span>
            </div>
        </div>

        {/* Step 3 */}
        <div className="instruction-step">
            <div className="step-header" style={{padding:'8px 0px'}}>
                <span className="step-number">3</span>
                <span className="step-label">Change <strong>Distance</strong> to <strong>5 mm</strong>.</span>
            </div>
        </div>

        {/* Step 4 */}
        <div className="instruction-step">
            <div className="step-header" style={{padding:'8px 0px'}}>
                <span className="step-number">4</span>
                <span className="step-label">Select edges to be Chamfered.</span>
            </div>
            <div className="step-description">
                <div className="instruction-box" style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
                    <p className="p-flush red-text" style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Important Note:</p>
                    <p className="p-flush red-text" style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                        ※ Selected edges and faces will be added to <strong>Selected Entities</strong>.
                        <span className="image-wrapper-flush" style={{ flex: '0 0 auto' }}>
                            <img src={edgeImg} alt="Selected edges" style={{ display: 'block', height: '35px', width: 'auto' }} />
                        </span>
                    </p>
                </div>
                  <div className="image-wrapper" style={{ marginTop: '1.5rem' }}>
                    <img src={chamfer1Img} alt="Chamfer PropertyManager" className="software-screenshot screenshot-wide" />
                </div>
            </div>
        </div>

        {/* Step 5 */}
        <div className="instruction-step">
            <div className="step-header" style={{padding:'8px 0px'}}>
                <span className="step-number">5</span>
                <span className="step-label">Click</span>
                <span className="image-wrapper-flush" style={{ flex: '0 0 auto' }}>
                    <img src={checkImg} alt="Check icon" style={{ display: 'block', height: '28px', width: 'auto' }} />
                </span>
            </div>
        </div>
    </>
);

export default InsertingChamferContent;
