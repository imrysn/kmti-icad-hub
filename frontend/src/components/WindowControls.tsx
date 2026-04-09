import React from 'react';
import { X, Minus, Square } from 'lucide-react';
import '../styles/WindowControls.css';

interface WindowControlsProps {
  buttonsOnly?: boolean;
}

const WindowControls: React.FC<WindowControlsProps> = ({ buttonsOnly = false }) => {
  const handleMinimize = () => {
    if (window.electronAPI) window.electronAPI.minimize();
  };

  const handleMaximize = () => {
    if (window.electronAPI) window.electronAPI.maximize();
  };

  const handleClose = () => {
    if (window.electronAPI) window.electronAPI.close();
  };

  if (buttonsOnly) {
    return (
      <div className="window-buttons-group integrated">
        <button className="win-btn win-minimize" onClick={handleMinimize} title="Minimize">
          <Minus size={14} />
        </button>
        <button className="win-btn win-maximize" onClick={handleMaximize} title="Maximize">
          <Square size={12} />
        </button>
        <button className="win-btn win-close" onClick={handleClose} title="Close">
          <X size={14} />
        </button>
      </div>
    );
  }

  return (
    <div className="window-controls-container">
      {/* Draggable Area */}
      <div className="window-drag-region">
        <div className="window-title-content">
          <img src="/kmti_logo.png" alt="KMTI" className="window-mini-logo" onError={(e) => (e.currentTarget.style.display = 'none')} 
          />
          <span>KMTI iCAD Hub</span>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="window-buttons-group">
        <button className="win-btn win-minimize" onClick={handleMinimize} title="Minimize">
          <Minus size={14} />
        </button>
        <button className="win-btn win-maximize" onClick={handleMaximize} title="Maximize">
          <Square size={12} />
        </button>
        <button className="win-btn win-close" onClick={handleClose} title="Close">
          <X size={14} />
        </button>
      </div>
    </div>
  );
};

export default WindowControls;
