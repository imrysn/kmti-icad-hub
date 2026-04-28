import React from 'react';

interface KaraokeLessonTextProps {
    text: string;
    isActive: boolean;
    currentCharIndex: number;
    className?: string;
}

export const KaraokeLessonText: React.FC<KaraokeLessonTextProps> = ({ 
    text, 
    isActive, 
    currentCharIndex,
    className = "" 
}) => {
    if (!isActive) return <p className={className}>{text}</p>;

    const words = text.split(/(\s+)/);
    let charAcc = 0;

    return (
        <p className={`${className} lesson-karaoke-wrapper`}>
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
        </p>
    );
};
