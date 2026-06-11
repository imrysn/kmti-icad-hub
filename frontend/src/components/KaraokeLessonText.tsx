import React from 'react';

interface KaraokeLessonTextProps {
    text: string;
    isActive?: boolean;
    currentCharIndex?: number;
    currentSentenceIndex?: number;
    className?: string;
    style?: React.CSSProperties;
    as?: 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div';
}

export const KaraokeLessonText: React.FC<KaraokeLessonTextProps> = ({ 
    text, 
    className = "",
    style,
    as: Tag = 'p'
}) => {
    return <Tag className={className} style={style} dangerouslySetInnerHTML={{ __html: text || "" }} />;
};
