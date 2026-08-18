import React from "react";
import solidworksTreeView from "../../../../../assets/Solidworks/3D_Fv/Solidworks_TreeView.png";

interface FeatureManagerTreeViewContentProps {
    hideText?: boolean;
}

const FeatureManagerTreeViewContent: React.FC<FeatureManagerTreeViewContentProps> = ({ hideText }) => (
    <div style={{ padding: hideText ? '0' : '1rem 0', color: 'var(--text-color)' }}>
        <div className="instruction-step" style={{ padding: hideText ? 0 : undefined }}>
            {!hideText && (
                <p className="p-flush" style={{ color: 'var(--text-muted)' }}>
                    It displays all the features used in 3D modeling, parts inserted in 3D assemblies including their features, and the views used in 2D detailing including the Bill of Materials.
                </p>
            )}
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '0rem' }}>
                <img
                    src={solidworksTreeView}
                    alt="FeatureManager Tree View"
                    className="software-screenshot"
                    style={{ maxWidth: '100%', maxHeight: hideText ? '250px' : '400px', objectFit: 'contain' }}
                />
            </div>
        </div>
    </div>
);

export default FeatureManagerTreeViewContent;
