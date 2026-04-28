import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface ReadAloudButtonProps {
  isSpeaking: boolean;
  onStart: () => void;
  onStop: () => void;
}

export const ReadAloudButton: React.FC<ReadAloudButtonProps> = ({ isSpeaking, onStart, onStop }) => {
  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSpeaking) {
      onStop();
    } else {
      onStart();
    }
  };

  return (
    <button className={`tts-button ${isSpeaking ? 'speaking' : ''}`} onClick={handleToggle} title={isSpeaking ? "Stop Reading" : "Read Lesson Aloud"}>
      {isSpeaking ? <VolumeX size={18} /> : <Volume2 size={18} />}
      <span>{isSpeaking ? "Stop Reading" : "Read Lesson"}</span>
    </button>
  );
};
