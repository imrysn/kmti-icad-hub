import React from 'react';
import { useTranslation } from '../context/LanguageContext';

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
    const { translateContent } = useTranslation();
    return <Tag className={className} style={style} dangerouslySetInnerHTML={{ __html: translateContent(text || "") }} />;
};
