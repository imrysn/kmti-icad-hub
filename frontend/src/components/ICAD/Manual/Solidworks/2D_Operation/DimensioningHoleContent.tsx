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
                    <span className="step-number">1 </span>
                    <span className="step-label">Click Smart Dimension</span>
                </div>
                <div className="step-description">
                    <div className="image-wrapper" style={{ marginTop: '1rem' }}>
                        <img src={smartDimensionImg} alt="Smart Dimension" className="software-screenshot" />
                    </div>
                    <p className="p-flush" style={{ color: 'var(--text-normal)', marginTop: '1.5rem' }}>
                        &gt; Select the hole to dimension.
                    </p>
                    <div className="image-wrapper" style={{ marginTop: '1rem' }}>
                        <img src={smartDimension3Img} alt="Select hole to dimension" className="software-screenshot" />
                    </div>
                </div>
            </div>

            <div className="instruction-step">
                <div className="step-header">
                    <span className="step-number">2 </span>
                    <span className="step-label">Edit the dimension properties if needed.</span>
                </div>
            </div>

            <div className="instruction-step">
                <div className="step-header">
                    <span className="step-number">3 </span>
                    <span className="step-label">Click <img src={checkImg} alt="Check" style={{ height: '18px', verticalAlign: 'middle', display: 'inline-block', marginLeft: '4px' }} /></span>
                </div>
                <div className="step-description">
                    <div className="image-wrapper" style={{ marginTop: '1rem' }}>
                        <img src={numberHolesImg} alt="Number of Holes" className="software-screenshot screenshot-wide" />
                    </div>
                    <div className="instruction-box" style={{ marginTop: '1.5rem', border: 'none', background: 'transparent', padding: 0 }}>
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
