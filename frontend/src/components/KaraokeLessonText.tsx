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
    // Helper to strip HTML tags for character indexing logic
    const stripTags = (str: string) => str.replace(/<[^>]*>?/gm, '');

    if (!isActive) {
        return <Tag className={className} style={style} dangerouslySetInnerHTML={{ __html: text }} />;
    }

    // Split by whitespace, but ignore spaces inside HTML tags
    const words = text.split(/(\s+(?![^<>]*>))/);
    let charAcc = 0;

    return (
        <Tag className={`${className} lesson-karaoke-wrapper`} style={style}>
            {words.map((word, i) => {
                const plainWord = stripTags(word);
                const start = charAcc;
                charAcc += plainWord.length;
                const isWordActive = currentCharIndex >= start && currentCharIndex < charAcc;
                const isWordPast = currentCharIndex >= charAcc;

                return (
                    <span 
                        key={i} 
                        className={`lesson-karaoke-word ${isWordActive ? 'is-active' : ''} ${isWordPast ? 'is-past' : ''}`}
                        dangerouslySetInnerHTML={{ __html: word }}
                    />
                );
            })}
        </Tag>
    );
};
