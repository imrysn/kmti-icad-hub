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
    const translatedText = translateContent(text || "");
    // Step numbers are already represented by the visual badge beside an instruction.
    // Remove the duplicated written prefix for every lesson wrapper.
    const displayText = translatedText.replace(/^\s*(?:step|\u30b9\u30c6\u30c3\u30d7)\s*\d+\s*[:\uff1a.\-]?\s*/i, '');

    return <Tag className={className} style={style} dangerouslySetInnerHTML={{ __html: displayText }} />;
};
