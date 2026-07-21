import React from "react";
import hiddenVisibleImg from "../../../../../assets/Solidworks/2D_Operation/2D_HIdden_Visible.png";
import modelViewImg from "../../../../../assets/Solidworks/2D_Operation/2D_Model_View.png";
import checkImg from "../../../../../assets/Solidworks/2D_Operation/2D_Check.png";

const InsertMainViewsContent: React.FC = () => {
    return (
        <div className="instruction-step" style={{ padding: '0', marginTop: '1.5rem', marginBottom: '2rem' }}>
            <div className="step-description">
                <div className="instruction-box" style={{ border: 'none', background: 'transparent', padding: 0 }}>
                    <p className="p-flush red-text">
                        ※ In page 21, No.3 Insert Parts, Use No.1 for inserting the part.
                    </p>
                </div>
                
                <ol style={{ paddingLeft: '1.25rem', margin: '1rem 0', color: 'var(--text-normal)', lineHeight: '2.2' }}>
                    <li>
                        On Display Style, Click the Hidden Lines Visible <img src={hiddenVisibleImg} alt="Hidden Lines Visible" style={{ height: '24px', verticalAlign: 'middle', display: 'inline-block', marginLeft: '4px' }} />
                    </li>
                    <li>
                        Click Use Custom Scale then set the scale to 1:2.
                    </li>
                    <li>
                        Click on the sheet to drop the part.
                    </li>
                    <li>
                        Click <img src={checkImg} alt="Check" style={{ height: '18px', verticalAlign: 'middle', display: 'inline-block', marginLeft: '4px' }} />
                    </li>
                </ol>

                <div className="image-wrapper" style={{ marginTop: '1rem' }}>
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
