/** * ToolbarExplorer.tsx  EReusable toolbar selector component * * Displays a list of toolbars in a sidebar. Selecting one shows its * image, description, and features in the main panel. * * Props: * toolbars  Earray of ToolbarItem objects (defined in 3DToolBars.tsx) * * Each ToolbarItem: * id unique string * title display name * description short summary text * features string[] bullet points * imageSrc imported image asset * icon JSX icon element (from lucide-react) * * Used by: 3DToolBars.tsx */

import React, { useState, useRef, useEffect } from "react";
import {
  Info,
  ChevronRight,
  Settings,
  Zap,
  Volume2,
  VolumeX
} from 'lucide-react';
import { useTTS } from "../../hooks/useTTS";
import { KaraokeLessonText } from "../KaraokeLessonText";
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
  externalIndex?: number;
  externalCharIndex?: number;
}

const ToolbarExplorer: React.FC<ToolbarExplorerProps> = ({ 
    toolbars, 
    nextLabel,
    externalIndex = -1,
    externalCharIndex = 0
}) => {
  const { speak, stop, isSpeaking: isInternalSpeaking, currentCharIndex: internalCharIndex } = useTTS();
  const [selectedId, setSelectedId] = useState<string>(() => {
    return localStorage.getItem('toolbar-explorer-selected-id') || toolbars[0]?.id || "";
  });
  const containerRef = useRef<HTMLDivElement>(null);

  const isGlobalSpeaking = externalIndex >= 0;
  const isAnySpeaking = isInternalSpeaking || isGlobalSpeaking;
  const activeCharIndex = isInternalSpeaking ? internalCharIndex : externalCharIndex;

  // Auto-select based on external index (Global Narration)
  useEffect(() => {
    if (externalIndex >= 0 && externalIndex < toolbars.length) {
      setSelectedId(toolbars[externalIndex].id);
    }
  }, [externalIndex, toolbars]);

  useEffect(() => {
    localStorage.setItem('toolbar-explorer-selected-id', selectedId);
  }, [selectedId]);

  const activeToolbar =
    toolbars.find((t) => t.id === selectedId) || toolbars[0];

  const handleToolbarClick = (id: string) => {
    if (selectedId === id && isInternalSpeaking) {
        stop();
    } else {
        setSelectedId(id);
        const toolbar = toolbars.find(t => t.id === id);
        if (toolbar && !isGlobalSpeaking) {
            speak([`${toolbar.title}: ${toolbar.description}`]);
        }
    }
  };

  return (
    <div className={`toolbar-explorer-container glass-panel ${isAnySpeaking ? 'is-speaking' : ''}`}>
      <div className="toolbar-explorer-main">
        {/* Sidebar List */}
        <div className="toolbar-nav">
          <div className="nav-header">
            <Settings size={18} className="animate-spin-slow" />
            <span>Available Toolbars</span>
          </div>

          <div className="nav-list" ref={containerRef}>
            {toolbars.map((toolbar, index) => (
              <div 
                key={toolbar.id} 
                className={`toolbar-item ${selectedId === toolbar.id ? "active" : ""}`} 
                onClick={() => handleToolbarClick(toolbar.id)}
                data-reading-index={index + 2}
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
                  <div className="title-row">
                    <h3>{activeToolbar.title}</h3>
                    <button 
                        className={`tts-mini-toggle ${isAnySpeaking ? 'active' : ''}`}
                        onClick={() => {
                            if (isInternalSpeaking) stop();
                            else speak([`${activeToolbar.title}: ${activeToolbar.description}`]);
                        }}
                    >
                        {isAnySpeaking ? <VolumeX size={16} /> : <Volume2 size={16} />}
                    </button>
                  </div>
                  <KaraokeLessonText 
                    text={activeToolbar.description} 
                    isActive={isAnySpeaking} 
                    currentCharIndex={activeCharIndex - (activeToolbar.title.length + 2)} 
                    className="toolbar-description"
                  />
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
