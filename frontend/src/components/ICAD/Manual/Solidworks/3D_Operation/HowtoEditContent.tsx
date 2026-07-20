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

// Fallback if 3D_New_Mating.png doesn't exist, we'll try to let Vite complain, 
// but normally it's safe to assume the user uploaded it since they said "image19 -> 3D_New_Mating.png".

export const HowToEditSketchContent: React.FC = () => (
    <div style={{ padding: '1rem 0', color: 'var(--text-color)' }}>
        <div style={{ marginBottom: '1.5rem' }}>
            <img src={editSketchImg} alt="How to edit Sketch" style={{ maxWidth: '400px' }} className="software-screenshot" />
        </div>

        {/* Method 1 */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
            <div style={{ flexShrink: 0 }}>
                <span className="step-number">1</span>
            </div>
            <div style={{ flex: 1, color: 'var(--text-muted)', lineHeight: '2.2' }}>
                <div style={{ marginBottom: '1rem' }}>
                    <span>1. Click the feature to be edited.</span>
                    <img src={bossExtrude1Img} alt="Boss-Extrude1" style={{ height: '24px', marginLeft: '0.5rem', verticalAlign: 'middle' }} />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <span>2. This will appear, click <strong>Edit Sketch</strong></span>
                        <img src={editSketch1Img} alt="Edit Sketch icon" style={{ height: '24px' }} />
                        <span>icon.</span>
                    </div>
                    <img src={editSketch2Img} alt="Edit Sketch selection" style={{ marginTop: '0.5rem', maxWidth: '300px', display: 'block' }} className="software-screenshot" />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <span>3. Sketch of the selected feature will show. <strong>Double-click</strong> the dimension needs to be edited.</span>
                </div>

                <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span>4. Input the required dimension, Click</span>
                    <img src={checkImg} alt="Check icon" style={{ height: '20px' }} />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span>5. Exit sketch</span>
                        <img src={exitSketchImg} alt="Exit sketch icon" style={{ height: '24px' }} />
                    </div>
                    <img src={exitSketch1Img} alt="Exit sketch result" style={{ marginTop: '0.5rem', maxWidth: '400px', display: 'block' }} className="software-screenshot" />
                </div>
            </div>
        </div>

        {/* Method 2 */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem' }}>
            <div style={{ flexShrink: 0 }}>
                <span className="step-number">2</span>
            </div>
            <div style={{ flex: 1, color: 'var(--text-muted)', lineHeight: '2.2' }}>
                <div style={{ marginBottom: '1rem' }}>
                    <span>1. Another option is to <strong>double click</strong> the part. Dimensions will automatically show. <strong>Double-click</strong> and edit the dimension.</span>
                </div>

                <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span>2. Click</span>
                    <img src={checkImg} alt="Check icon" style={{ height: '20px' }} />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <span>3. Click <strong>Rebuild</strong></span>
                        <img src={rebuildImg} alt="Rebuild icon" style={{ height: '24px' }} />
                        <span>or press "Ctrl + b"</span>
                    </div>
                    <div style={{ marginLeft: '1.25rem', color: 'var(--text-muted)' }}>(It will update the 3D Model)</div>
                    <img src={modelImg} alt="Updated 3D Model" style={{ marginTop: '0.5rem', maxWidth: '400px', display: 'block' }} className="software-screenshot" />
                </div>
            </div>
        </div>
    </div>
);

export const HowToEditFeatureContent: React.FC = () => (
    <div style={{ padding: '1rem 0', color: 'var(--text-color)' }}>
        {/* Method 1 */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
            <div style={{ flexShrink: 0 }}>
                <span className="step-number">1</span>
            </div>
            <div style={{ flex: 1, color: 'var(--text-muted)', lineHeight: '2.2' }}>
                <div style={{ marginBottom: '1rem' }}>
                    <span>1. Click or right click the feature to be edited.</span>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <span>2. Click <strong>Edit Feature</strong></span>
                        <img src={editFeatureImg} alt="Edit Feature icon" style={{ height: '24px' }} />
                        <span>icon.</span>
                    </div>
                    <img src={editFeature1Img} alt="Edit Feature selection" style={{ marginTop: '0.5rem', maxWidth: '300px', display: 'block' }} className="software-screenshot" />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <span>3. The <strong>Boss-Extrude Property Manager</strong> will appear, edit the depth/thickness.</span>
                    <img src={bossExtrudePropertyManagerImg} alt="Boss-Extrude Property Manager" style={{ marginTop: '0.5rem', maxWidth: '400px', display: 'block' }} className="software-screenshot" />
                </div>

                <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span>4. Click</span>
                    <img src={checkImg} alt="Check icon" style={{ height: '20px' }} />
                </div>
            </div>
        </div>

        {/* Method 2 */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem' }}>
            <div style={{ flexShrink: 0 }}>
                <span className="step-number">2</span>
            </div>
            <div style={{ flex: 1, color: 'var(--text-muted)', lineHeight: '2.2' }}>
                <div style={{ marginBottom: '1rem' }}>
                    <span>1. Another option is to <strong>double click</strong> the part. Dimensions will automatically show. <strong>Double-click</strong> and edit the dimension.</span>
                    <img src={doubleClickImg} alt="Double click part" style={{ marginTop: '0.5rem', maxWidth: '400px', display: 'block' }} className="software-screenshot" />
                </div>

                <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span>2. Click</span>
                    <img src={checkImg} alt="Check icon" style={{ height: '20px' }} />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <span>3. Click <strong>Rebuild</strong></span>
                        <img src={rebuildImg} alt="Rebuild icon" style={{ height: '24px' }} />
                        <span>or press "Ctrl + b"</span>
                    </div>
                    <div style={{ marginLeft: '1.25rem', color: 'var(--text-muted)' }}>(It will update the 3D Model)</div>
                </div>
            </div>
        </div>
    </div>
);

export const HowToEditMatingsContent: React.FC = () => (
    <div style={{ padding: '1rem 0', color: 'var(--text-color)' }}>
        <div style={{ color: 'var(--text-muted)', lineHeight: '2.2' }}>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ fontWeight: 'bold', fontSize: '1.1rem', minWidth: '15px', marginTop: '0.25rem' }}>1.</div>
                <div>
                    <span>Click or right click the mate to be edited.</span>
                </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ fontWeight: 'bold', fontSize: '1.1rem', minWidth: '15px', marginTop: '0.25rem' }}>2.</div>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <span>This will appear, click <strong>Edit Feature</strong></span>
                        <img src={editFeatureImg} alt="Edit Feature icon" style={{ height: '24px' }} />
                        <span>icon.</span>
                    </div>
                    <img src={clickEditFeaturesImg} alt="Click Edit Features" style={{ marginTop: '0.5rem', maxWidth: '250px', display: 'block' }} className="software-screenshot" />
                </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ fontWeight: 'bold', fontSize: '1.1rem', minWidth: '15px', marginTop: '0.25rem' }}>3.</div>
                <div>
                    <span><strong>Mating Property Manager</strong> will appear. Right click for selection or click the face/plane previously selected to unselect them.</span>
                </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ fontWeight: 'bold', fontSize: '1.1rem', minWidth: '15px', marginTop: '0.25rem' }}>4.</div>
                <div>
                    <span>Select new face/plane.</span>
                    <img src={newMatingImg} alt="New Mating selection" style={{ marginTop: '0.5rem', maxWidth: '400px', display: 'block' }} className="software-screenshot" />
                </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ fontWeight: 'bold', fontSize: '1.1rem', minWidth: '15px', marginTop: '0.25rem' }}>5.</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span>Click</span>
                    <img src={checkImg} alt="Check icon" style={{ height: '20px' }} />
                </div>
            </div>
        </div>
    </div>
);
