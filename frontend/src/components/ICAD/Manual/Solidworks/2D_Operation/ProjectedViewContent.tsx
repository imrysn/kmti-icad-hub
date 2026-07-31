import React from "react";
import checkImg from "../../../../../assets/Solidworks/2D_Operation/2D_Check.png";
import projectViewImg from "../../../../../assets/Solidworks/2D_Operation/2D_Project_View.png";
import projectView1Img from "../../../../../assets/Solidworks/2D_Operation/2D_Project_View1.png";
import hiddenRemoveImg from "../../../../../assets/Solidworks/2D_Operation/2D_HIdden_Remove.png";

const ProjectedViewContent: React.FC = () => {
    return (
        <div className="instruction-step" style={{ padding: '0', marginTop: '0.5rem', marginBottom: '2rem' }}>
            <div className="step-description">
                 <div className="step-header" style={{marginBottom:'1rem' , padding:'8px 0px'}}>
                <span className="step-number">1</span>
                <span className="step-label"> Right click on the area of the View.</span>
            </div>

            <div className="step-header" style={{marginBottom:'1rem' , padding:'8px 0px'}}>
                <span className="step-number">2</span>
                <span className="step-label"> Click Projected View.</span>
            </div>

            <div className="step-header" style={{marginBottom:'1rem' , padding:'8px 0px'}}>
                <span className="step-number">3</span>
                <span className="step-label"> Position the view needed.</span>
            </div>

            <div className="step-header" style={{marginBottom:'1rem' , padding:'8px 0px'}}>
                <span className="step-number">4</span>
                <span className="step-label"> Click on the sheet to drop the view.</span>
            </div>

            <div className="step-header" style={{marginBottom:'1rem' , padding:'8px 0px'}}>
                <span className="step-number">5</span>
                <span className="step-label"> Click <img src={checkImg} alt="Check" style={{ height: '25px', verticalAlign: 'middle', display: 'inline-block', marginLeft: '4px' }} />.</span>
            </div>

                <div className="image-wrapper" style={{ marginTop: '0.2rem' }}>
                    <img
                        src={projectViewImg}
                        alt="Projected View Step 1"
                        className="software-screenshot screenshot-wide"
                    />
                </div>

                <div className="instruction-box" style={{ marginTop: '0.5rem' }}>
                    <p className="p-flush red-text">
                        ※ Projected View are automatically aligned to the Main view except views projected diagonally.
                    </p>
                </div>

                <div className="instruction-box" style={{ marginTop: '0.5rem' }}>
                    <p className="p-flush red-text">
                        ※ Project view until all the needed views are inserted.
                    </p>
                </div>

                <div className="image-wrapper" style={{ marginTop: '0.2rem' }}>
                    <img
                        src={projectView1Img}
                        alt="Projected View Step 2"
                        className="software-screenshot screenshot-wide"
                    />
                </div>

                <div className="instruction-box" style={{ marginTop: '0.5rem' }}>
                    <p className="p-flush red-text">※ Click the Isometric view.</p>
                    <p className="p-flush red-text" style={{ marginTop: '0.5rem' }}>
                        ※ On Display Style, Click Hidden Lines Removed <img src={hiddenRemoveImg} alt="Hidden Lines Removed" style={{ height: '30px', verticalAlign: 'middle', display: 'inline-block', marginLeft: '4px' }} />
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProjectedViewContent;
