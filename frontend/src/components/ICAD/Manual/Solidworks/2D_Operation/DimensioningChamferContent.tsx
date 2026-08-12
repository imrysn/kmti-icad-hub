import React from "react";
import checkImg from "../../../../../assets/Solidworks/2D_Operation/2D_Check.png";
import chamferDimensionImg from "../../../../../assets/Solidworks/2D_Operation/2D_Chamfer_Dimension.png";
import chamferEdgeImg from "../../../../../assets/Solidworks/2D_Operation/2D_Chamfer_Edge.png";

const DimensioningChamferContent: React.FC = () => {
    return (
        <>
            <div className="instruction-step">
                <div className="step-header"  style={{padding:'8px 0px'}}>
                    <span className="step-number">1</span>
                    <span className="step-label">Under Smart Dimension.</span>
                </div>
            </div>

            <div className="instruction-step">
                <div className="step-header"  style={{padding:'8px 0px'}}>
                    <span className="step-number">2</span>
                    <span className="step-label">Click Chamfer Dimension.</span>
                </div>
                <div className="step-description">
                    <div className="image-wrapper" style={{ marginTop: '0.2rem' }}>
                        <img src={chamferDimensionImg} alt="Chamfer Dimension" className="software-screenshot screenshot-wide" />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem', marginTop: '1rem' }}>
                        <div className="image-wrapper" style={{ flexShrink: 0 }}>
                            <img src={chamferEdgeImg} alt="Chamfer Edge" className="software-screenshot" />
                        </div>
                        <ol style={{ paddingLeft: '7.5rem', margin: '0', color: 'var(--text-muted)', lineHeight: '2.2', flex: 1 }}>
                            <div>Select the chamfered edge.</div>
                            Select one of the lead-in edges.
                            <div></div>
                            Place the dimension.
                            <div>Click <img src={checkImg} alt="Check" style={{ height: '25px', verticalAlign: 'middle', display: 'inline-block', marginLeft: '4px' }} />
                            </div>
                        </ol>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DimensioningChamferContent;
