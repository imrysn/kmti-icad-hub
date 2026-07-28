import React from "react";
import checkImg from "../../../../../assets/Solidworks/2D_Operation/2D_Check.png";
import smartDimensionImg from "../../../../../assets/Solidworks/2D_Operation/2D_Smart_Dimension.png";
import smartDimension3Img from "../../../../../assets/Solidworks/2D_Operation/2D_Smart_Dimension3.png";
import numberHolesImg from "../../../../../assets/Solidworks/2D_Operation/2D_Number_Holes.png";

const DimensioningHoleContent: React.FC = () => {
    return (
        <>
            <div className="instruction-step">
                <div className="step-header">
                    <span className="step-number">1</span>
                    <span className="step-label" style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                        Click <strong>Smart Dimension</strong> 
                        <img src={smartDimensionImg} alt="Smart Dimension" style={{ height: '40px', verticalAlign: 'middle', display: 'inline-block', margin: '0 8px' }} />
                        &gt; Select the hole to dimension.
                    </span>
                </div>
                <div className="step-description">
                    <div className="image-wrapper" style={{ marginTop: '0.2rem' }}>
                        <img src={smartDimension3Img} alt="Select hole to dimension" className="software-screenshot" />
                    </div>
                </div>
            </div>

            <div className="instruction-step">
                <div className="step-header">
                    <span className="step-number">2</span>
                    <span className="step-label">Edit the dimension properties if needed.</span>
                </div>
            </div>

            <div className="instruction-step">
                <div className="step-header">
                    <span className="step-number">3</span>
                    <span className="step-label">Click <img src={checkImg} alt="Check" style={{ height: '18px', verticalAlign: 'middle', display: 'inline-block', marginLeft: '4px' }} /></span>
                </div>
                <div className="step-description">
                    <div className="image-wrapper" style={{ marginTop: '0.2rem' }}>
                        <img src={numberHolesImg} alt="Number of Holes" className="software-screenshot screenshot-wide" />
                    </div>
                    <div className="instruction-box" style={{ marginTop: '0.5rem' }}>
                        <p className="p-flush red-text">
                            ※ Number of Holes are depending on the number of holes/slot holes in the part/assembly.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DimensioningHoleContent;
