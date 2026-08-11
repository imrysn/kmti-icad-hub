import React from "react";
import checkImg from "../../../../../assets/Solidworks/2D_Operation/2D_Check.png";
import notesImg from "../../../../../assets/Solidworks/2D_Operation/2D_Notes.png";
import plImg from "../../../../../assets/Solidworks/2D_Operation/2D_PL.png";
import arrowTypeImg from "../../../../../assets/Solidworks/2D_Operation/2D_Arrow_Type.png";
import rightClickImg from "../../../../../assets/Solidworks/2D_Operation/2D_Right_Click.png";

const AddingNotesContent: React.FC = () => {
    return (
        <>
            <div className="instruction-step">
                <div className="step-header"  style={{padding:'8px 0px'}}>
                    <span className="step-number">1</span>
                    <span className="step-label">Under Annotation, click Note.</span>
                </div>
                <div className="step-description">
                    <div className="image-wrapper" style={{ marginTop: '0.2rem' }}>
                        <img src={notesImg} alt="Notes" className="software-screenshot screenshot-wide" />
                    </div>
                </div>
            </div>

            <div className="instruction-step">
                <div className="step-header"  style={{padding:'8px 0px'}}>
                    <span className="step-number">2</span>
                    <span className="step-label">Click on the edge or face of part to add note.</span>
                </div>
            </div>

            <div className="instruction-step">
                <div className="step-header"  style={{padding:'8px 0px'}}>
                    <span className="step-number">3</span>
                    <span className="step-label">Position the Note then type PL2.3.</span>
                </div>
            </div>

            <div className="instruction-step">
                <div className="step-header"  style={{padding:'8px 0px'}}>
                    <span className="step-number">4</span>
                    <span className="step-label">Click <img src={checkImg} alt="Check" style={{ height: '18px', verticalAlign: 'middle', display: 'inline-block', marginLeft: '4px' }} /></span>
                </div>
                <div className="step-description">
                    <div className="image-wrapper" style={{ marginTop: '0.2rem', width:'700px' }}>
                        <img src={plImg} alt="PL Note" className="software-screenshot screenshot-wide" />
                    </div>

                    <div className="image-wrapper" style={{ marginTop: '0.2rem' , marginLeft:'46rem' , transform: 'translateY(-300px)'}}>
                        <img src={arrowTypeImg} alt="Arrow Type" className="software-screenshot" />
                    </div>

                    <div className="instruction-box" style={{ marginTop: '-15rem' }}>
                        <p className="p-flush red-text">
                            <img src={rightClickImg} alt="Right Click" style={{ height: '40px', verticalAlign: 'middle', display: 'inline-block', marginRight: '8px' }} />
                            ※ To change the arrow head, right click on the arrow head then pick on the Arrow head types.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddingNotesContent;
