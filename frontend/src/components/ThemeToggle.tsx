import React from 'react';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  theme: string;
  onToggle: () => void;
}

/** ThemeToggle.tsx — Modern Theme Switching Button */
const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, onToggle }) => {
  return (
    <button onClick={onToggle} className="theme-toggle-btn" aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`} title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
      {theme === 'dark' ? (
        <Sun size={20} className="theme-toggle-icon sun" />
      ) : (
        <Moon size={20} className="theme-toggle-icon moon" />
      )}
    </button>
  );
};

export default ThemeToggle;
