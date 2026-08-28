import React from "react";
import sImg from "../../../../../assets/Solidworks/3D_Operation/3D_S.png";
import frontFaceImg from "../../../../../assets/Solidworks/3D_Operation/3D_Front_Face.png";
import ex26Img from "../../../../../assets/Solidworks/3D_Operation/3D_EX26.png";
import cutImg from "../../../../../assets/Solidworks/3D_Operation/3D_Cut.png";
import exCutImg from "../../../../../assets/Solidworks/3D_Operation/3D_Ex_Cut.png";
import checkImg from "../../../../../assets/Solidworks/3D_Operation/3D_Check.png";

const CuttingBaseContent: React.FC = () => (
    <>
        <div className="instruction-step">
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div className="step-header" style={{ marginBottom: 0 , padding:'8px 0px' }}>
                        <span className="step-number">1</span>
                        <span className="step-label" style={{ fontWeight: 'normal', color: 'var(--text-muted)' }}>
                            Click <strong>Spacebar</strong> then select <strong>Front</strong>.
                        </span>
                    </div>
                    <div className="step-header" style={{ marginBottom: 0 , padding:'8px 0px' }}>
                        <span className="step-number">2</span>
                        <span className="step-label" style={{ fontWeight: 'normal', color: 'var(--text-muted)' }}>
                            In <strong>Sketch</strong> tab, select <strong>Sketch</strong>
                        </span>
                        <span className="image-wrapper-flush" style={{ flex: '0 0 auto' }}>
                            <img src={sImg} alt="Sketch Tab" style={{ display: 'block', height: '50px', width: 'auto' }} />
                        </span>
                    </div>
                    <div className="step-header" style={{ marginBottom: 0 , padding:'8px 0px' }}>
                        <span className="step-number">3</span>
                        <span className="step-label" style={{ fontWeight: 'normal', color: 'var(--text-muted)' }}>
                            Click the <strong>front face</strong>.
                        </span>
                    </div>
                </div>

                <div style={{ flex: '0 0 auto', display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                    <div className="image-wrapper">
                        <img src={frontFaceImg} alt="Front Face" className="software-screenshot" style={{ maxHeight: '300px', width: 'auto' }} />
                    </div>
                </div>
            </div>

            {/* Step 4 */}
            <div className="step-header" style={{ marginBottom: '1rem', padding: '8px 0px' }}>
                <span className="step-number">4</span>
                <span className="step-label" style={{ fontWeight: 'normal', color: 'var(--text-muted)' }}>
                    Draw the sketch to be cut. <span className="red-text" style={{ fontSize: "15px" }}>(Please see Lesson "Sketching the base" No.9 for adding sketch relation &amp; dimension)</span>
                </span>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'center', marginTop: '1rem', marginBottom: '1.5rem' }}>
                <div className="image-wrapper" style={{ flex: '0 0 auto' }}>
                    <img src={ex26Img} alt="Sketch to be cut" className="software-screenshot" style={{ maxHeight: '450px', width: 'auto' }} />
                </div>
                <div className="instruction-box" style={{ flex: '1 1 300px', margin: 0 }}>
                    <p className="p-flush red-text">※ Enclose the sketch first, ensure that the lines intersect / coincide with each other.</p>
                </div>
            </div>
        </div>

        <div className="instruction-step">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div className="step-header" style={{ marginBottom: 0 , padding:'8px 0px'}}>
                        <span className="step-number">5</span>
                        <span className="step-label" style={{ fontWeight: 'normal', color: 'var(--text-muted)' }}>
                            In <strong>Features</strong> tab, click <strong>Extruded Cut</strong>
                        </span>
                        <span className="image-wrapper-flush" style={{ flex: '0 0 auto' }}>
                            <img src={cutImg} alt="Extruded Cut" style={{ display: 'block', height: '50px', width: 'auto' }} />
                        </span>
                    </div>
                    <div className="step-header" style={{ marginBottom: 0 , padding:'8px 0px'}}>
                        <span className="step-number">6</span>
                        <span className="step-label" style={{ fontWeight: 'normal', color: 'var(--text-muted)' }}>
                            <strong>Cut-Extrude</strong> property manager will come up. In End Condition, select <strong>Through All</strong>.
                        </span>
                    </div>
                     <div className="image-wrapper">
                        <img src={exCutImg} alt="Cut-Extrude PropertyManager" className="software-screenshot" style={{ maxHeight: '400px', width: 'auto' }} />
                    </div>
                    <div className="step-header" style={{ marginBottom: 0 , padding:'8px 0px'}}>
                        <span className="step-number">7</span>
                        <span className="step-label" style={{ fontWeight: 'normal', color: 'var(--text-muted)' }}>
                            Click
                        </span>
                        <span className="image-wrapper-flush" style={{ flex: '0 0 auto' }}>
                            <img src={checkImg} alt="Check button" style={{ display: 'block', height: '28px', width: 'auto' }} />
                        </span>
                    </div>
                </div>

                <div style={{ flex: '0 0 auto', display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                   
                </div>
            </div>
        </div>
    </>
);

export default CuttingBaseContent;
