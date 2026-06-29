import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Sliders, Play, Square, ChevronDown } from 'lucide-react';
import { useTTSContext } from '../context/TTSContext';

interface ReadAloudButtonProps {
  isSpeaking: boolean;
  onStart: () => void;
  onStop: () => void;
}

export const ReadAloudButton: React.FC<ReadAloudButtonProps> = ({ isSpeaking, onStart, onStop }) => {
  const { rate, setRate, voices, selectedVoiceURI, setSelectedVoiceURI } = useTTSContext();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleTogglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSpeaking) {
      onStop();
    } else {
      onStart();
    }
  };

  const handleToggleSettings = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  // Filter voices to English and Japanese since this is an international iCAD environment
  const filteredVoices = voices.filter(v => 
    v.lang.toLowerCase().startsWith('en') || 
    v.lang.toLowerCase().startsWith('ja')
  );

  const speedPresets = [0.8, 0.9, 1.0, 1.2, 1.5];

  return (
    <div className="tts-widget-container" ref={dropdownRef} style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
      <div 
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          background: 'rgba(15, 23, 42, 0.75)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '24px',
          padding: '2px',
          boxShadow: isSpeaking ? '0 0 16px rgba(6, 182, 212, 0.25)' : '0 4px 12px rgba(0, 0, 0, 0.2)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          whiteSpace: 'nowrap',
        }}
      >
        {/* Main Action Button */}
        <button
          onClick={handleTogglePlay}
          title={isSpeaking ? "Stop Reading" : "Read Lesson Aloud"}
          style={{
            background: isSpeaking ? 'rgba(6, 182, 212, 0.15)' : 'transparent',
            border: 'none',
            outline: 'none',
            color: isSpeaking ? '#22d3ee' : '#cbd5e1',
            padding: '8px 16px',
            fontSize: '0.85rem',
            fontWeight: 600,
            borderRadius: '20px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.2s ease',
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={(e) => {
            if (!isSpeaking) e.currentTarget.style.color = '#f1f5f9';
          }}
          onMouseLeave={(e) => {
            if (!isSpeaking) e.currentTarget.style.color = '#cbd5e1';
          }}
        >
          {isSpeaking ? (
            <>
              <VolumeX size={16} className="animate-pulse" style={{ color: '#22d3ee' }} />
              <span>Stop Reading</span>
            </>
          ) : (
            <>
              <Volume2 size={16} />
              <span>Read Lesson</span>
            </>
          )}
        </button>

        {/* Divider */}
        <span style={{ width: '1px', height: '18px', background: 'rgba(255,255,255,0.1)', margin: '0 4px' }} />

        {/* Settings Toggle Button */}
        <button
          onClick={handleToggleSettings}
          title="TTS Speech Settings"
          style={{
            background: isOpen ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
            border: 'none',
            outline: 'none',
            color: isOpen ? '#22d3ee' : '#cbd5e1',
            padding: '8px',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease',
          }}
        >
          <Sliders size={15} style={{ transform: isOpen ? 'rotate(90deg)' : 'none', transition: 'transform 0.3s ease' }} />
        </button>
      </div>

      {/* Settings Dropdown Popover (Glassmorphic Card) */}
      {isOpen && (
        <div 
          className="tts-popover animate-scale-in"
          style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            right: 0,
            width: '280px',
            background: 'rgba(15, 23, 42, 0.95)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '12px',
            padding: '16px',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.5)',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            pointerEvents: 'auto',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '8px' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#94a3b8', letterSpacing: '0.05em' }}>TTS VOICE SETTINGS</span>
            {isSpeaking && (
              <span style={{ fontSize: '0.7rem', background: '#0891b2', color: '#fff', padding: '2px 6px', borderRadius: '4px', fontWeight: 600 }}>Active</span>
            )}
          </div>

          {/* Speed presets */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#cbd5e1' }}>Speech Speed</label>
            <div style={{ display: 'flex', gap: '4px', width: '100%' }}>
              {speedPresets.map(preset => (
                <button
                  key={preset}
                  onClick={() => setRate(preset)}
                  style={{
                    flex: 1,
                    background: rate === preset ? 'rgba(6, 182, 212, 0.2)' : 'rgba(255, 255, 255, 0.03)',
                    border: rate === preset ? '1px solid #06b6d4' : '1px solid rgba(255, 255, 255, 0.05)',
                    borderRadius: '4px',
                    color: rate === preset ? '#22d3ee' : '#94a3b8',
                    padding: '4px 0',
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {preset}x
                </button>
              ))}
            </div>
          </div>

          {/* Voice Select */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#cbd5e1' }}>Language Voice</label>
            <select
              value={selectedVoiceURI || ''}
              onChange={(e) => setSelectedVoiceURI(e.target.value || null)}
              style={{
                background: 'rgba(30, 41, 59, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '6px',
                color: '#cbd5e1',
                padding: '8px 10px',
                fontSize: '0.75rem',
                outline: 'none',
                cursor: 'pointer',
                width: '100%',
              }}
            >
              <option value="">Default (Automatic Voice)</option>
              {voices.map(v => (
                <option key={v.voiceURI} value={v.voiceURI}>
                  {v.name} ({v.lang})
                </option>
              ))}
            </select>
          </div>

          {/* Inline Info */}
          <div style={{ fontSize: '0.65rem', color: '#64748b', fontStyle: 'italic', display: 'flex', gap: '4px', alignItems: 'center' }}>
            <span>Select a browser voice for standard text-to-speech.</span>
          </div>
        </div>
      )}
    </div>
  );
};
