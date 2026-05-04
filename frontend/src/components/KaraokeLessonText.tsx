import React from 'react';

interface KaraokeLessonTextProps {
    text: string;
    isActive: boolean;
    currentCharIndex: number;
    className?: string;
    style?: React.CSSProperties;
    as?: 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div';
}

export const KaraokeLessonText: React.FC<KaraokeLessonTextProps> = ({ 
    text, 
    isActive, 
    currentCharIndex,
    className = "",
    style,
    as: Tag = 'p'
}) => {
    if (!isActive) return <Tag className={className} style={style}>{text}</Tag>;

    const words = text.split(/(\s+)/);
    let charAcc = 0;

    return (
        <Tag className={`${className} lesson-karaoke-wrapper`} style={style}>
            {words.map((word, i) => {
                const start = charAcc;
                charAcc += word.length;
                const isWordActive = currentCharIndex >= start && currentCharIndex < charAcc;
                const isWordPast = currentCharIndex >= charAcc;

                return (
                    <span 
                        key={i} 
                        className={`lesson-karaoke-word ${isWordActive ? 'is-active' : ''} ${isWordPast ? 'is-past' : ''}`}
                    >
                        {word}
                    </span>
                );
            })}
        </Tag>
    );
};
