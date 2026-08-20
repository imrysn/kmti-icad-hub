import { Minus,Square,X } from 'lucide-react';
import React from 'react';
import kmtiLogo from '../assets/logo/kmti-training-hub.png';
import '../styles/WindowControls.css';
import platform from '../services/platformService';

interface WindowControlsProps {
  buttonsOnly?: boolean;
}

const WindowControls: React.FC<WindowControlsProps> = ({ buttonsOnly = false }) => {
  if (!platform.isDesktopApp) {
    return null;
  }

  const handleMinimize = () => {
    platform.minimize();
  };

  const handleMaximize = () => {
    platform.maximize();
  };

  const handleClose = () => {
    platform.close();
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
          <img src={kmtiLogo} alt="KMTI" className="window-mini-logo" onError={(e) => (e.currentTarget.style.display = 'none')}
          />
          <span>KMTI Training Hub</span>
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
