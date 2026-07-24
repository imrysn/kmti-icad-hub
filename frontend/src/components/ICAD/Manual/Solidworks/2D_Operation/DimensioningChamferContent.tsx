import React from "react";
import checkImg from "../../../../../assets/Solidworks/2D_Operation/2D_Check.png";
import chamferDimensionImg from "../../../../../assets/Solidworks/2D_Operation/2D_Chamfer_Dimension.png";
import chamferEdgeImg from "../../../../../assets/Solidworks/2D_Operation/2D_Chamfer_Edge.png";

const DimensioningChamferContent: React.FC = () => {
    return (
        <>
            <div className="instruction-step">
                <div className="step-header">
                    <span className="step-number">1</span>
                    <span className="step-label">Under Smart Dimension.</span>
                </div>
            </div>

            <div className="instruction-step">
                <div className="step-header">
                    <span className="step-number">2</span>
                    <span className="step-label">Click Chamfer Dimension.</span>
                </div>
                <div className="step-description">
                    <div className="image-wrapper" style={{ marginTop: '0.2rem' }}>
                        <img src={chamferDimensionImg} alt="Chamfer Dimension" className="software-screenshot screenshot-wide" />
                    </div>
                    <div className="image-wrapper" style={{ marginTop: '0.2rem' }}>
                        <img src={chamferEdgeImg} alt="Chamfer Edge" className="software-screenshot" />
                    </div>
                    <ol style={{ paddingLeft: '1.25rem', margin: '1.5rem 0 0 0', color: 'var(--text-normal)', lineHeight: '2.2' }}>
                        <li>Select the chamfered edge.</li>
                        <li>Select one of the lead-in edges.</li>
                        <li>Place the dimension.</li>
                        <li>Click <img src={checkImg} alt="Check" style={{ height: '18px', verticalAlign: 'middle', display: 'inline-block', marginLeft: '4px' }} /></li>
                    </ol>
                </div>
            </div>
        </>
    );
};

export default DimensioningChamferContent;
