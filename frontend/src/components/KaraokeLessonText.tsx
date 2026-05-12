import React, { useMemo, useEffect, useRef } from 'react';

interface KaraokeLessonTextProps {
    text: string;
    isActive: boolean;
    currentCharIndex: number;
    currentSentenceIndex?: number;
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
    const activeWordRef = useRef<HTMLSpanElement>(null);
    const stripTags = (str: string) => str.replace(/<[^>]*>?/gm, '');

    // Tokenize text into words while preserving spaces and HTML tags
    const wordTokens = useMemo(() => {
        // Regex to split by whitespace but keep the whitespace as a token
        // and ignore whitespace inside HTML tags
        const tokens = text.split(/(\s+(?![^<>]*>))/);
        let charAcc = 0;
        
        return tokens.map((token) => {
            const plain = stripTags(token);
            const start = charAcc;
            charAcc += plain.length;
            const end = charAcc;
            
            return {
                original: token,
                plain,
                start,
                end,
                isWhitespace: plain.length === 0
            };
        });
    }, [text]);

    // Auto-scroll to active word if it's not visible
    useEffect(() => {
        if (isActive && activeWordRef.current) {
            const element = activeWordRef.current;
            const rect = element.getBoundingClientRect();
            const isVisible = (
                rect.top >= 150 && 
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) - 150
            );

            if (!isVisible) {
                element.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                });
            }
        }
    }, [isActive, currentCharIndex]);

    if (!isActive) {
        return <Tag className={className} style={style} dangerouslySetInnerHTML={{ __html: text }} />;
    }

    return (
        <Tag className={`${className} lesson-karaoke-wrapper`} style={style}>
            {wordTokens.map((token, i) => {
                const isWordActive = !token.isWhitespace && currentCharIndex >= token.start && currentCharIndex < token.end;
                const isWordPast = !token.isWhitespace && currentCharIndex >= token.end;

                return (
                    <span 
                        key={i} 
                        ref={isWordActive ? activeWordRef : null}
                        className={`lesson-karaoke-word ${isWordActive ? 'is-active' : ''} ${isWordPast ? 'is-past' : ''}`}
                        dangerouslySetInnerHTML={{ __html: token.original }}
                    />
                );
            })}
        </Tag>
    );
};
