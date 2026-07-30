import React from "react";
import solidworksTreeView from "../../../../../assets/Solidworks/3D_Fv/Solidworks_TreeView.png";

const FeatureManagerTreeViewContent: React.FC = () => (
    <div style={{ padding: '1rem 0', color: 'var(--text-color)' }}>
        <div className="instruction-step">
            <p className="p-flush" style={{ color: 'var(--text-muted)' }}>
                It displays all the features used in 3D modeling, parts inserted in 3D assemblies including their features, and the views used in 2D detailing including the Bill of Materials.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '0rem' }}>
                <img
                    src={solidworksTreeView}
                    alt="FeatureManager Tree View"
                    className="software-screenshot"
                    style={{ maxWidth: '100%', height: '400px', objectFit: 'contain' }}
                />
            </div>
        </div>
    </div>
);

export default FeatureManagerTreeViewContent;
