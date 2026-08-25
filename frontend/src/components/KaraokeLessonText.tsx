import React from 'react';
import { useTranslation } from '../context/LanguageContext';
import './KaraokeLessonText.css';

interface KaraokeLessonTextProps {
    text: string;
    isActive?: boolean;
    currentCharIndex?: number;
    className?: string;
    style?: React.CSSProperties;
    as?: 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div';
}

export const KaraokeLessonText: React.FC<KaraokeLessonTextProps> = ({
    text,
    isActive = false,
    currentCharIndex = 0,
    className = "",
    style,
    as: Tag = 'p'
}) => {
    const { translateContent } = useTranslation();
    const translatedText = translateContent(text || "");
    const stripRegex = /^\s*(?:step|\u30b9\u30c6\u30c3\u30d7)\s*\d+\s*[:\uff1a.\-]?\s*/i;
    const match = translatedText.match(stripRegex);
    const strippedLength = match ? match[0].length : 0;
    const displayText = translatedText.slice(strippedLength);

    if (!isActive || currentCharIndex === 0) {
        return (
            <Tag className={`karaoke-lesson-text ${className}`.trim()} style={style}>
                <span dangerouslySetInnerHTML={{ __html: displayText }} />
            </Tag>
        );
    }

    let startIdx = currentCharIndex - strippedLength;
    if (startIdx < 0) {
        startIdx = 0;
    }

    // Skip spaces
    while (startIdx < displayText.length && displayText[startIdx] === ' ') {
        startIdx++;
    }

    let nextSpace = displayText.indexOf(' ', startIdx);
    if (nextSpace === -1) nextSpace = displayText.length;

    const pre = displayText.substring(0, startIdx);
    const current = displayText.substring(startIdx, nextSpace);
    const post = displayText.substring(nextSpace);

    return (
        <Tag className={`karaoke-lesson-text ${className}`.trim()} style={style}>
            <span className="karaoke-lesson-text__spoken">{pre}</span>
            <span className="karaoke-lesson-text__active">{current}</span>
            <span className="karaoke-lesson-text__upcoming">{post}</span>
        </Tag>
    );
};
