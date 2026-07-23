import React from "react";
import smartDimension2Img from "../../../../../assets/Solidworks/2D_Operation/2D_Smart_Dimension2.png";
import dragDimensionImg from "../../../../../assets/Solidworks/2D_Operation/2D_Drag_Dimension.png";
import checkImg from "../../../../../assets/Solidworks/2D_Operation/2D_Check.png";

const AddDimensionsAndNotesContent: React.FC = () => {
    return (
        <>
            <div className="instruction-step">
                <div className="step-header">
                    <span className="step-number">1 </span>
                    <span className="step-label">Under Annotation, Select Smart Dimension.</span>
                </div>
                <div className="step-description">
                    <div className="image-wrapper" style={{ marginTop: '0.2rem' }}>
                        <img src={smartDimension2Img} alt="Smart Dimension" className="software-screenshot screenshot-wide" />
                    </div>
                </div>
            </div>

            <div className="instruction-step">
                <div className="step-header">
                    <span className="step-number">2 </span>
                    <span className="step-label">Select line(s) &gt; drag dimension</span>
                </div>
                <div className="step-description">
                    <div className="image-wrapper" style={{ marginTop: '0.2rem' }}>
                        <img src={dragDimensionImg} alt="Drag Dimension" className="software-screenshot screenshot-wide" />
                    </div>
                </div>
            </div>

            <div className="instruction-step">
                <div className="step-header">
                    <span className="step-number">3 </span>
                    <span className="step-label">Click <img src={checkImg} alt="Check" style={{ height: '18px', verticalAlign: 'middle', display: 'inline-block', marginLeft: '4px' }} /></span>
                </div>
            </div>

            <div className="instruction-step">
                <div className="step-header">
                    <span className="step-number">4 </span>
                    <span className="step-label">Repeat Step 1 to 3</span>
                </div>
                <div className="step-description">
                    <p className="p-flush" style={{ color: 'var(--text-muted)' }}>
                        Until all the necessary dimensions are indicated.
                    </p>
                    <div className="instruction-box" style={{ marginTop: '0.2rem' }}>
                        <p className="p-flush red-text">
                            ※ It includes dimensioning of radius.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddDimensionsAndNotesContent;
