import React from 'react';
import WrittenTutorialPanel, { WrittenTutorialStep } from './WrittenTutorialPanel';

interface FoundationsVideoReadingLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  steps: WrittenTutorialStep[];
}

const FoundationsVideoReadingLayout: React.FC<FoundationsVideoReadingLayoutProps> = ({ children, title, description, steps }) => (
  <div className="foundations-video-reading-layout">
    <div className="foundations-video-reading-layout__video">{children}</div>
    <WrittenTutorialPanel title={title} description={description} steps={steps} />
  </div>
);

export default FoundationsVideoReadingLayout;
