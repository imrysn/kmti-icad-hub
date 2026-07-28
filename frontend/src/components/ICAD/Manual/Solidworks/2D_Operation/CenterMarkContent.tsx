import React from "react";
import checkImg from "../../../../../assets/Solidworks/2D_Operation/2D_Check.png";
import centerMarkImg from "../../../../../assets/Solidworks/2D_Operation/2D_Center_Mark.png";
import centerMark1Img from "../../../../../assets/Solidworks/2D_Operation/2D_Center_Mark1.png";

const CenterMarkContent: React.FC = () => {
    return (
        <>
            <div className="instruction-step">
                <div className="step-header">
                    <span className="step-number">1</span>
                    <span className="step-label">In Annotation, click Center Mark.</span>
                </div>
                <div className="step-description">
                    <div className="image-wrapper" style={{ marginTop: '0.2rem' }}>
                        <img src={centerMarkImg} alt="Center Mark Properties" className="software-screenshot" />
                    </div>
                </div>
            </div>

            <div className="instruction-step">
                <div className="step-header">
                    <span className="step-number">2</span>
                    <span className="step-label">Select hole/slot hole.</span>
                </div>
                <div className="step-description">
                    <div className="image-wrapper" style={{ marginTop: '0.2rem' }}>
                        <img src={centerMark1Img} alt="Select hole" className="software-screenshot screenshot-wide" />
                    </div>
                </div>
            </div>

            <div className="instruction-step">
                <div className="step-header">
<<<<<<< HEAD
                    <span className="step-number">3 </span>
                    <span className="step-label">Click <img src={checkImg} alt="Check" style={{ height: '25px', verticalAlign: 'middle', display: 'inline-block', marginLeft: '4px' }} /></span>
=======
                    <span className="step-number">3</span>
                    <span className="step-label">Click <img src={checkImg} alt="Check" style={{ height: '18px', verticalAlign: 'middle', display: 'inline-block', marginLeft: '4px' }} /></span>
>>>>>>> origin/rainiel
                </div>
                <div className="step-description">
                    <div className="instruction-box" style={{ marginTop: '0.5rem' }}>
                        <p className="p-flush red-text">
                            ※ Click the holes to manually insert center mark.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CenterMarkContent;
