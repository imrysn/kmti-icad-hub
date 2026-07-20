import React from "react";
import treeview1 from "../../../../../assets/Solidworks/Introduction/Solidwork_Treeview1.png";
import treeview2 from "../../../../../assets/Solidworks/Introduction/Solidwork_Treeview2.png";
import treeview3 from "../../../../../assets/Solidworks/Introduction/Solidwork_Treeview3.png";

const FeatureManagerTreeViewContent: React.FC = () => (
    <div style={{ padding: '1rem 0', color: 'var(--text-color)' }}>
        <div className="instruction-step">
            <p className="p-flush" style={{ color: 'var(--text-muted)' }}>
                It displays all the features used in 3D modeling, parts inserted in 3D assemblies including their features, and the views used in 2D detailing including the Bill of Materials.
            </p>
            <div className="course-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginTop: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                    <img
                        src={treeview1}
                        alt="FeatureManager Tree View — Part features"
                        className="software-screenshot"
                        style={{ maxWidth: '100%', height: 'auto', objectFit: 'contain' }}
                    />
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                    <img
                        src={treeview2}
                        alt="FeatureManager Tree View — Assembly parts and features"
                        className="software-screenshot"
                        style={{ maxWidth: '100%', height: 'auto', objectFit: 'contain' }}
                    />
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                    <img
                        src={treeview3}
                        alt="FeatureManager Tree View — Drawing views and Bill of Materials"
                        className="software-screenshot"
                        style={{ maxWidth: '100%', height: 'auto', objectFit: 'contain' }}
                    />
                </div>
            </div>
        </div>
    </div>
);

export default FeatureManagerTreeViewContent;
