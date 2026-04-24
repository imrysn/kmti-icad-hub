/** * ToolbarExplorer.tsx  EReusable toolbar selector component * * Displays a list of toolbars in a sidebar. Selecting one shows its * image, description, and features in the main panel. * * Props: * toolbars  Earray of ToolbarItem objects (defined in 3DToolBars.tsx) * * Each ToolbarItem: * id unique string * title display name * description short summary text * features string[] bullet points * imageSrc imported image asset * icon JSX icon element (from lucide-react) * * Used by: 3DToolBars.tsx */

import React, { useState, useRef, useEffect } from "react";
import {
  Info,
  ChevronRight,
  Settings,
  Zap
} from 'lucide-react';
import "../../styles/3D_Modeling/ToolbarExplorer.css";

interface ToolbarItem {
  id: string;
  title: string;
  description: string;
  features: string[];
  imageSrc: string;
  icon: React.ReactNode;
}

interface ToolbarExplorerProps {
  nextLabel?: string;
  toolbars: ToolbarItem[];
}

const ToolbarExplorer: React.FC<ToolbarExplorerProps> = ({ toolbars, nextLabel }) => {
  const [selectedId, setSelectedId] = useState<string>(() => {
    return localStorage.getItem('toolbar-explorer-selected-id') || toolbars[0]?.id || "";
  });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem('toolbar-explorer-selected-id', selectedId);
  }, [selectedId]);

  const activeToolbar =
    toolbars.find((t) => t.id === selectedId) || toolbars[0];

  return (
    <div className="toolbar-explorer-container glass-panel">
      <div className="toolbar-explorer-main">
        {/* Sidebar List */}
        <div className="toolbar-nav">
          <div className="nav-header">
            <Settings size={18} className="animate-spin-slow" />
            <span>Available Toolbars</span>
          </div>

          <div className="nav-list" ref={containerRef}>
            {toolbars.map((toolbar) => (
              <div key={toolbar.id} className={`toolbar-item ${selectedId === toolbar.id ? "active" : ""}`} onClick={() => setSelectedId(toolbar.id)}
              >
                <div className="toolbar-item-icon">{toolbar.icon}</div>
                <div className="toolbar-item-content">
                  <span className="toolbar-item-title">{toolbar.title}</span>
                  <span className="toolbar-item-subtitle">
                    {toolbar.features[0]}...
                  </span>
                </div>
                <ChevronRight className="toolbar-item-arrow" size={14} />
              </div>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="toolbar-display">
          {activeToolbar && (
            <div className="display-card animate-in" key={activeToolbar.id}>
              <div className="display-header">
                <div className="display-header-icon">{activeToolbar.icon}</div>
                <div className="display-header-text">

                  <h3>{activeToolbar.title}</h3>
                  <p>{activeToolbar.description}</p>
                </div>
              </div>

              <div className="display-image-section">
                <div className="toolbar-image-wrapper">
                  <img src={activeToolbar.imageSrc} alt={activeToolbar.title} className="toolbar-image" />
                </div>
              </div>

              <div className="display-features">
                <div className="features-label">
                  <Zap size={14} /> <span>Commands Included</span>
                </div>
                <div className="features-grid">
                  {activeToolbar.features.map((feature, idx) => (
                    <div key={idx} className="feature-tag">
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ToolbarExplorer;
