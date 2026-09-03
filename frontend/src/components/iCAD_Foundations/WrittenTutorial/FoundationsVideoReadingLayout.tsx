import React from 'react';
import WrittenTutorialPanel, { WrittenTutorialCopy, WrittenTutorialStep } from './WrittenTutorialPanel';

interface FoundationsVideoReadingLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  steps: WrittenTutorialStep[];
  writtenTutorialCopy?: Partial<WrittenTutorialCopy>;
}

const FoundationsVideoReadingLayout: React.FC<FoundationsVideoReadingLayoutProps> = ({
  children,
  title = '',
  description,
  steps,
  writtenTutorialCopy,
}) => (
  <div className="foundations-video-reading-layout">
    <div className="foundations-video-reading-layout__video">{children}</div>
    <WrittenTutorialPanel
      title={title}
      description={description}
      steps={steps}
      copy={writtenTutorialCopy}
    />
  </div>
);

export default FoundationsVideoReadingLayout;
