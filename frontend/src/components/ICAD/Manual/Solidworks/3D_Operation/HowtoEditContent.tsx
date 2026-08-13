import React from "react";
import editSketchImg from "../../../../../assets/Solidworks/3D_Operation/3D_Edit_Sketch.png";
import bossExtrude1Img from "../../../../../assets/Solidworks/3D_Operation/3D_Boss_Extrude1.png";
import editSketch1Img from "../../../../../assets/Solidworks/3D_Operation/3D_Edit_Sketch1.png";
import editSketch2Img from "../../../../../assets/Solidworks/3D_Operation/3D_Edit_Sketch2.png";
import checkImg from "../../../../../assets/Solidworks/3D_Operation/3D_Check.png";
import exitSketchImg from "../../../../../assets/Solidworks/3D_Operation/3D_Exit_Sketch.png";
import exitSketch1Img from "../../../../../assets/Solidworks/3D_Operation/3D_Exit_Sketch1.png";
import rebuildImg from "../../../../../assets/Solidworks/3D_Operation/3D_Rebuild.png";
import modelImg from "../../../../../assets/Solidworks/3D_Operation/3D_Model.png";
import editFeatureImg from "../../../../../assets/Solidworks/3D_Operation/3D_Edit_Feature.png";
import editFeature1Img from "../../../../../assets/Solidworks/3D_Operation/3D_Edit_Feature1.png";
import bossExtrudePropertyManagerImg from "../../../../../assets/Solidworks/3D_Operation/3D_Boss_Extrude_Property_Manager.png";
import doubleClickImg from "../../../../../assets/Solidworks/3D_Operation/3D_Double_Click.png";
import clickEditFeaturesImg from "../../../../../assets/Solidworks/3D_Operation/3D_Click_Edit_Features.png";
import newMatingImg from "../../../../../assets/Solidworks/3D_Operation/3D_New_Mating.png";
import ConcentricImg from "../../../../../assets/Solidworks/3D_Operation/3D_Concentric.png";

// Fallback if 3D_New_Mating.png doesn't exist, we'll try to let Vite complain, 
// but normally it's safe to assume the user uploaded it since they said "image19 -> 3D_New_Mating.png".

export const HowToEditSketchContent: React.FC = () => (
    <div style={{ padding: '1rem 0', color: 'var(--text-color)' }}>
        <div style={{ marginBottom: '1.5rem' }}>
              <span className="step-number" style={{ transform: 'translateY(33px)'}}>1</span>
            <img src={editSketchImg} alt="How to edit Sketch" style={{ maxWidth: '500px', marginLeft: '40px' }} className="software-screenshot" />
        </div>

        {/* Method 1 — Steps 1.1 to 1.5 */}
        <div className="instruction-step">
            <div className="step-header" style={{ padding: '8px 0px' }}>
                <span className="step-number"style={{ marginLeft: '50px'}}>1.1</span>
                <span className="step-label">
                    Click the feature to be edited.{' '}
                    <img src={bossExtrude1Img} alt="Boss-Extrude1" style={{ height: '50px', verticalAlign: 'middle', marginLeft: '0.5rem' }} />
                </span>
            </div>
        </div>

        <div className="instruction-step">
            <div className="step-header" style={{ padding: '8px 0px' }}>
                <span className="step-number" style={{ marginLeft: '50px'}}>1.2</span>
                <span className="step-label">
                    This will appear, click <strong>Edit Sketch</strong>{' '}
                    <img src={editSketch1Img} alt="Edit Sketch icon" style={{ height: '50px', verticalAlign: 'middle' }} />{' '}
                    icon.
                </span>
            </div>
            <div className="step-description">
                <img src={editSketch2Img} alt="Edit Sketch selection" style={{ marginTop: '0.5rem', maxWidth: '300px', marginLeft: '30px', display: 'block' }} className="software-screenshot" />
            </div>
        </div>

        <div className="instruction-step">
            <div className="step-header" style={{ padding: '8px 0px' }}>
                <span className="step-number" style={{ marginLeft: '50px'}}>1.3</span>
                <span className="step-label">
                    Sketch of the selected feature will show. <strong>Double-click</strong> the dimension needs to be edited.
                </span>
            </div>
        </div>

        <div className="instruction-step">
            <div className="step-header" style={{ padding: '8px 0px' }}>
                <span className="step-number" style={{ marginLeft: '50px'}}>1.4</span>
                <span className="step-label">
                    Input the required dimension, Click{' '}
                    <img src={checkImg} alt="Check icon" style={{ height: '30px', verticalAlign: 'middle' }} />
                </span>
            </div>
        </div>

        <div className="instruction-step">
            <div className="step-header" style={{ padding: '8px 0px' }}>
                <span className="step-number" style={{ marginLeft: '50px'}}>1.5</span>
                <span className="step-label">
                    Exit sketch{' '}
                    <img src={exitSketchImg} alt="Exit sketch icon" style={{ height: '50px', verticalAlign: 'middle' }} />
                </span>
            </div>
            <div className="step-description">
                <span className="step-number" style={{transform: 'translateY(162px)'}}>2</span>
                <img src={exitSketch1Img} alt="Exit sketch result" style={{ marginTop: '1.5rem', maxWidth: '600px', display: 'block' , marginLeft: '45px'}} className="software-screenshot" />
            </div>
        </div>

        {/* Method 2 — Steps 2.1 to 2.3 */}
        <div className="instruction-step">
            <div className="step-header" style={{ padding: '8px 0px' }}>
                <span className="step-number" style={{ marginLeft: '50px'}}>2.1</span>
                <span className="step-label" style={{transform: 'translateY(15px)'}}>
                    Another option is to <strong>double click</strong> the part. Dimensions will automatically show. <strong>Double-click</strong> and edit the dimension.
                </span>
            </div>
        </div>

        <div className="instruction-step">
            <div className="step-header" style={{ padding: '8px 0px' }}>
                <span className="step-number" style={{ marginLeft: '50px'}}>2.2</span>
                <span className="step-label">
                    Click{' '}
                    <img src={checkImg} alt="Check icon" style={{ height: '30px', verticalAlign: 'middle' }} />
                </span>
            </div>
        </div>

        <div className="instruction-step">
            <div className="step-header" style={{ padding: '8px 0px' }}>
                <span className="step-number" style={{ marginLeft: '50px'}}>2.3</span>
                <span className="step-label">
                    Click <strong>Rebuild</strong>{' '}
                    <img src={rebuildImg} alt="Rebuild icon" style={{ height: '50px', verticalAlign: 'middle' }} />{' '}
                    or press "Ctrl + b"
                </span>
            </div>
            <div className="step-description">
                <div style={{ marginLeft: '1.25rem', color: 'var(--text-muted)' }}>(It will update the 3D Model)</div>
                <img src={modelImg} alt="Updated 3D Model" style={{ marginTop: '1rem', maxWidth: '900px', marginLeft: '100px', display: 'block' }} className="software-screenshot" />
            </div>
        </div>
    </div>
);

export const HowToEditFeatureContent: React.FC = () => (
    <div style={{ padding: '1rem 0', color: 'var(--text-color)' }}>
        {/* Method 1 — Steps 1.1 to 1.4 */}
        <div className="instruction-step">
             <span className="step-number">1</span>
            <div className="step-header" style={{ padding: '8px 0px' }}>
                <span className="step-number" style={{ marginLeft: '50px'}}>1.1</span>
                <span className="step-label">Click or right click the feature to be edited.</span>
            </div>
        </div>

        <div className="instruction-step">
            <div className="step-header" style={{ padding: '8px 0px' }}>
                <span className="step-number" style={{ marginLeft: '50px'}}>1.2</span>
                <span className="step-label">
                    Click <strong>Edit Feature</strong>{' '}
                    <img src={editFeatureImg} alt="Edit Feature icon" style={{ height: '50px', verticalAlign: 'middle' }} />{' '}
                    icon.
                </span>
            </div>
            <div className="step-description">
                <img src={editFeature1Img} alt="Edit Feature selection" style={{ marginTop: '0.5rem', maxWidth: '300px', display: 'block' }} className="software-screenshot" />
            </div>
        </div>

        <div className="instruction-step">
            <div className="step-header" style={{ padding: '8px 0px' }}>
                <span className="step-number" style={{ marginLeft: '50px'}}>1.3</span>
                <span className="step-label">
                    The <strong>Boss-Extrude Property Manager</strong> will appear, edit the depth/thickness.
                </span>
            </div>
            <div className="step-description">
                <img src={bossExtrudePropertyManagerImg} alt="Boss-Extrude Property Manager" style={{ marginTop: '0.5rem', maxWidth: '400px', display: 'block' }} className="software-screenshot" />
            </div>
        </div>

        <div className="instruction-step">
            <div className="step-header" style={{ padding: '8px 0px' }}>
                <span className="step-number" style={{ marginLeft: '50px'}}>1.4</span>
                <span className="step-label">
                    Click{' '}
                    <img src={checkImg} alt="Check icon" style={{ height: '30px', verticalAlign: 'middle' }} />
                </span>
            </div>
        </div>

        {/* Method 2 — Steps 2.1 to 2.3 */}
        <div className="instruction-step">
            <span className="step-number" style={{marginTop:'5rem'}}>2</span>
            <div className="step-header" style={{ padding: '8px 0px' }}>
                <span className="step-number" style={{ marginLeft: '50px'}}>2.1</span>
                <span className="step-label" style={{transform: 'translateY(18px)'}}>
                    Another option is to <strong>double click</strong> the part. Dimensions will automatically show. <strong>Double-click</strong> and edit the dimension.
                </span>
            </div>
            <div className="step-description">
                <img src={doubleClickImg} alt="Double click part" style={{ marginTop: '1rem', maxWidth: '600px', display: 'block' }} className="software-screenshot" />
            </div>
        </div>

        <div className="instruction-step">
            <div className="step-header" style={{ padding: '8px 0px' }}>
                <span className="step-number" style={{ marginLeft: '50px'}}>2.2</span>
                <span className="step-label">
                    Click{' '}
                    <img src={checkImg} alt="Check icon" style={{ height: '30px', verticalAlign: 'middle' }} />
                </span>
            </div>
        </div>

        <div className="instruction-step">
            <div className="step-header" style={{ padding: '8px 0px' }}>
                <span className="step-number" style={{ marginLeft: '50px'}}>2.3</span>
                <span className="step-label">
                    Click <strong>Rebuild</strong>{' '}
                    <img src={rebuildImg} alt="Rebuild icon" style={{ height: '50px', verticalAlign: 'middle' }} />{' '}
                    or press "Ctrl + b"
                </span>
            </div>
            <div className="step-description">
                <div style={{ marginTop: '0.5rem', color: 'var(--text-muted)' }}>(It will update the 3D Model)</div>
            </div>
        </div>
    </div>
);

export const HowToEditMatingsContent: React.FC = () => (
    <div style={{ padding: '1rem 0', color: 'var(--text-color)' }}>
        <div style={{ marginBottom: '1.5rem' }}>
            <img src={ConcentricImg} alt="Concentric Mating" style={{ maxWidth: '500px' }} className="software-screenshot" />
        </div>
        <div className="instruction-step">
            <div className="step-header" style={{ padding: '8px 0px' }}>
                <span className="step-number">1</span>
                <span className="step-label">Click or right click the mate to be edited.</span>
            </div>
        </div>

        <div className="instruction-step">
            <div className="step-header" style={{ padding: '8px 0px' }}>
                <span className="step-number">2</span>
                <span className="step-label">
                    This will appear, click <strong>Edit Feature</strong>{' '}
                    <img src={editFeatureImg} alt="Edit Feature icon" style={{ height: '50px', verticalAlign: 'middle' }} />{' '}
                    icon.
                </span>
            </div>
            <div className="step-description">
                <img src={clickEditFeaturesImg} alt="Click Edit Features" style={{ marginTop: '0.5rem', maxWidth: '250px', display: 'block' }} className="software-screenshot" />
            </div>
        </div>

        <div className="instruction-step">
            <div className="step-header" style={{ padding: '8px 0px' }}>
                <span className="step-number">3</span>
                <span className="step-label" style={{transform: 'translateY(16px)'}}>
                    <strong>Mating Property Manager</strong> will appear. 
                    <span>
                    Right click for selection or click the face/plane previously selected to unselect them.
                    </span>
                </span>
            </div>
        </div>

        <div className="instruction-step">
            <div className="step-header" style={{ padding: '8px 0px' }}>
                <span className="step-number">4</span>
                <span className="step-label">Select new face/plane.</span>
            </div>
            <div className="step-description">
                <img src={newMatingImg} alt="New Mating selection" style={{ marginTop: '0.5rem', maxWidth: '400px', display: 'block' }} className="software-screenshot" />
            </div>
        </div>

        <div className="instruction-step">
            <div className="step-header" style={{ padding: '8px 0px' }}>
                <span className="step-number">5</span>
                <span className="step-label">
                    Click{' '}
                    <img src={checkImg} alt="Check icon" style={{ height: '30px', verticalAlign: 'middle' }} />
                </span>
            </div>
        </div>
    </div>
);
