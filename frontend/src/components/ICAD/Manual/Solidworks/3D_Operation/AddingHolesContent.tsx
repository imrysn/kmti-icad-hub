import React from "react";
import holeImg from "../../../../../assets/Solidworks/3D_Operation/3D_Hole.png";
import typeImg from "../../../../../assets/Solidworks/3D_Operation/3D_Type.png";
import type1Img from "../../../../../assets/Solidworks/3D_Operation/3D_Type1.png";
import posImg from "../../../../../assets/Solidworks/3D_Operation/3D_Pos.png";
import pos1Img from "../../../../../assets/Solidworks/3D_Operation/3D_Pos1.png";
import checkImg from "../../../../../assets/Solidworks/3D_Operation/3D_Check.png";

const AddingHolesContent: React.FC = () => (
    <>

        <div className="instruction-step">
            <div className="step-header"  style={{padding:'8px 0px'}}>
                <span className="step-number">1</span>
                <span className="step-label">
                    In <strong>Features</strong> tab, click <strong>Hole Wizard</strong>.
                </span>
                <span className="image-wrapper-flush" style={{ flex: '0 0 auto' }}>
                    <img src={holeImg} alt="Hole Wizard" style={{ display: 'block', height: '55px', width: 'auto' }} />
                </span>
            </div>
        </div>


        <div className="instruction-step">
            <div className="step-header"  style={{padding:'8px 0px'}}>
                <span className="step-number">2</span>
                <span className="step-label">In</span>
                <span className="image-wrapper-flush" style={{ flex: '0 0 auto' }}>
                    <img src={typeImg} alt="Type Tab" style={{ display: 'block', height: '40px', width: 'auto' }} />
                </span>
                <span className="step-label">
                    select <strong>Hole Type</strong>, <strong>Hole Specifications</strong>, and <strong>End Condition</strong> of feature.
                </span>
            </div>
            <div className="step-description">
                <div className="image-wrapper" style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
                    <img src={type1Img} alt="Hole Type Settings" className="software-screenshot screenshot-wide" style={{ maxWidth: '100%', height: 'auto' }} />
                </div>
            </div>
        </div>


        <div className="instruction-step">
            <div className="step-header" style={{padding:'8px 0px'}}>
                <span className="step-number">3</span>
                <span className="step-label">In</span>
                <span className="image-wrapper-flush" style={{ flex: '0 0 auto' }}>
                    <img src={posImg} alt="Positions Tab" style={{ display: 'block', height: '40px', width: 'auto' }} />
                </span>
                <span className="step-label">set the position of holes.</span>
            </div>
            <div className="step-description">
                <ol style={{ paddingLeft: '1.25rem', margin: '0.75rem 0', color: 'var(--text-muted)', lineHeight: '2.2' }}>
                    
                   
                    <span>Select face / plane for holes.</span>
                    <div>
                <span>  Place the hole.</span></div>
                        <div className="image-wrapper" style={{ marginTop: '1rem', marginBottom: '1rem' }}>
                            <img src={pos1Img} alt="Place the hole" className="software-screenshot screenshot-wide" />
                        </div>
                    
                    Insert dimension / relation in holes.
                </ol>
            </div>
        </div>


        <div className="instruction-step">
            <div className="step-header" style={{padding:'8px 0px'}}>
                <span className="step-number">4</span>
                <span className="step-label">Click</span>
                <span className="image-wrapper-flush" style={{ flex: '0 0 auto' }}>
                    <img src={checkImg} alt="Check button" style={{ display: 'block', height: '28px', width: 'auto' }} />
                </span>
            </div>
        </div>
    </>
);

export default AddingHolesContent;
