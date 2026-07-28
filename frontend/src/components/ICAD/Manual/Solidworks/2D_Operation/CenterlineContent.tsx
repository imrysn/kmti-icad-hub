import React from "react";
import checkImg from "../../../../../assets/Solidworks/2D_Operation/2D_Check.png";
import centerLineImg from "../../../../../assets/Solidworks/2D_Operation/2D_Center_Line.png";
import twoEdgesImg from "../../../../../assets/Solidworks/2D_Operation/2D_Two_Edges.png";

const CenterlineContent: React.FC = () => {
    return (
        <>
            <div className="instruction-step">
                <div className="step-header">
                    <span className="step-number">1</span>
                    <span className="step-label">In Annotation, click Center line.</span>
                </div>
                <div className="step-description">
                    <div className="image-wrapper" style={{ marginTop: '0.2rem' }}>
                        <img src={centerLineImg} alt="Center line" className="software-screenshot" />
                    </div>
                </div>
            </div>

            <div className="instruction-step">
                <div className="step-header">
                    <span className="step-number">2</span>
                    <span className="step-label">Select two edges to manually insert centerlines.</span>
                </div>
                <div className="step-description">
                    <div className="image-wrapper" style={{ marginTop: '0.2rem' }}>
                        <img src={twoEdgesImg} alt="Two edges" className="software-screenshot screenshot-wide" />
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
            </div>
        </>
    );
};

export default CenterlineContent;
