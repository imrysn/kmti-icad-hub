import React from "react";
import hiddenVisibleImg from "../../../../../assets/Solidworks/2D_Operation/2D_HIdden_Visible.png";
import modelViewImg from "../../../../../assets/Solidworks/2D_Operation/2D_Model_View.png";
import checkImg from "../../../../../assets/Solidworks/2D_Operation/2D_Check.png";

const InsertMainViewsContent: React.FC = () => {
    return (
        <div className="instruction-step" style={{ padding: '0', marginTop: '0.5rem', marginBottom: '2rem' }}>
            <div className="step-description">
                <ol style={{ paddingLeft: '1.25rem', margin: '1rem 0', color: 'var(--text-normal)', lineHeight: '2.2' }}>


                    <div className="step-header" style={{padding:'8px 0px' }}>
                <span className="step-number">1</span>
           On Display Style, Click the <strong>Hidden Lines Visible</strong> <img src={hiddenVisibleImg} alt="Hidden Lines Visible" style={{ height: '50px', verticalAlign: 'middle', display: 'inline-block', marginLeft: '4px' }} />
            </div>
                    
                            <div className="step-header" style={{padding:'8px 0px'}}>
                <span className="step-number">2</span>
              Click Use <strong>Custom Scale</strong> then set the scale to 1:2.
             </div>
                  <div className="step-header" style={{padding:'8px 0px'}}>
                <span className="step-number">3</span>
                 Click on the sheet to drop the part.
            </div>
             
                      <div className="step-header" style={{padding:'8px 0px'}}>
                <span className="step-number">4</span>
                        Click <img src={checkImg} alt="Check" style={{ height: '25px', verticalAlign: 'middle', display: 'inline-block', marginLeft: '4px' }} />
                    </div>
                </ol>

                <div className="image-wrapper" style={{ marginTop: '0.2rem' }}>
                    <img
                        src={modelViewImg}
                        alt="Insert Main Views"
                        className="software-screenshot screenshot-wide"
                    />
                </div>
            </div>
        </div>
    );
};

export default InsertMainViewsContent;
