import React from "react";
import holeImg from "../../../../../assets/Solidworks/3D_Operation/3D_Hole.png";
import typeImg from "../../../../../assets/Solidworks/3D_Operation/3D_Type.png";
import posImg from "../../../../../assets/Solidworks/3D_Operation/3D_Pos.png";
import pos1Img from "../../../../../assets/Solidworks/3D_Operation/3D_Pos1.png";
import checkImg from "../../../../../assets/Solidworks/3D_Operation/3D_Check.png";

const AddingHolesContent: React.FC = () => (
    <>

        <div className="instruction-step">
            <div className="step-header">
                <span className="step-number">1 </span>
                <span className="step-label">
                    In <strong>Features</strong> tab, click <strong>Hole Wizard</strong>{' '}
                    <span className="image-wrapper-flush">
                        <img src={holeImg} alt="Hole Wizard" style={{ height: '32px', verticalAlign: 'middle' }} />
                    </span>
                    .
                </span>
            </div>
        </div>


        <div className="instruction-step">
            <div className="step-header">
                <span className="step-number">2 </span>
                <span className="step-label">
                    In{' '}
                    <span className="image-wrapper-flush">
                        <img src={typeImg} alt="Type Tab" style={{ height: '32px', verticalAlign: 'middle' }} />
                    </span>
                    {' '}select <strong>Hole Type</strong>, <strong>Hole Specifications</strong>, and <strong>End Condition</strong> of feature.
                </span>
            </div>
        </div>


        <div className="instruction-step">
            <div className="step-header">
                <span className="step-number">3 </span>
                <span className="step-label">
                    In{' '}
                    <span className="image-wrapper-flush">
                        <img src={posImg} alt="Positions Tab" style={{ height: '32px', verticalAlign: 'middle' }} />
                    </span>
                    {' '}set the position of holes.
                </span>
            </div>
            <div className="step-description">
                <ol style={{ paddingLeft: '1.25rem', margin: '0.75rem 0', color: 'var(--text-muted)', lineHeight: '2.2' }}>
                    <li>Select face / plane for holes.</li>
                    <li>Place the hole.
                        <div className="image-wrapper" style={{ marginTop: '1rem', marginBottom: '1rem' }}>
                            <img src={pos1Img} alt="Place the hole" className="software-screenshot screenshot-wide" />
                        </div>
                    </li>
                    <li>Insert dimension / relation in holes.</li>
                </ol>
            </div>
        </div>


        <div className="instruction-step">
            <div className="step-header">
                <span className="step-number">4 </span>
                <span className="step-label">
                    Click{' '}
                    <span className="image-wrapper-flush">
                        <img src={checkImg} alt="Check button" style={{ height: '24px', verticalAlign: 'middle' }} />
                    </span>
                    .
                </span>
            </div>
        </div>
    </>
);

export default AddingHolesContent;
