import React from "react";
import csImg from "../../../../../assets/Solidworks/3D_Operation/3D_CS.png";
import saveImg from "../../../../../assets/Solidworks/3D_Operation/3D_Save.png";

const PartSavingContent: React.FC = () => (
    <>
        {/* Step 1 */}
        <div className="instruction-step">
            <div className="step-header" style={{ padding: '8px 0px' }}>
                <span className="step-number">1</span>
                <span className="step-label">Save File</span>
            </div>
            <div className="step-description">
                <p className="p-flush" style={{ color: 'var(--text-muted)' }}>
                    In <strong>Menu Bar</strong>, click <strong>Save</strong>{' '}
                    <span className="image-wrapper-flush">
                        <img src={csImg} alt="Save icon" style={{ height: '32px', verticalAlign: 'middle' }} />
                    </span>
                    {' '}or press <strong>Ctrl + S</strong> on your keyboard to save the file.
                </p>
            </div>
        </div>

        {/* Step 2 */}
        <div className="instruction-step">
            <div className="step-header" style={{ padding: '8px 0px' }}>
                <span className="step-number">2</span>
                <span className="step-label">Save As Dialog Box</span>
            </div>
            <div className="step-description">
                <p className="p-flush" style={{ color: 'var(--text-muted)' }}>
                    When the dialog box appears, edit the <strong>File Name</strong>, then click <strong>Save</strong>.
                </p>
                
                <div className="image-wrapper" style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
                    <img src={saveImg} alt="Save Dialog Box" className="software-screenshot screenshot-wide" />
                </div>

                <p className="p-flush" style={{ color: 'var(--text-muted)', marginBottom: '1rem', fontSize: '1rem' }}>
                    Filename Extension: Part - <strong style={{ color: 'red' }}>.SLDPRT</strong>
                </p>

                <div className="instruction-box">
                    <p className="p-flush red-text">※ Make a new folder for the parts.</p>
                </div>
            </div>
        </div>
    </>
);

export default PartSavingContent;
