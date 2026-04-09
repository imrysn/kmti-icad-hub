import React from 'react';
import { Zap, Video, Image, FileText } from 'lucide-react'; import { SearchResult, MediaAsset } from '../../../types';

interface SearchResultsProps {
    results: SearchResult[];
    query: string;
    loading: boolean;
    setSelectedMedia: (media: MediaAsset | null) => void;
}

const renderMediaIcon = (type: string) => {
    switch (type) {
        case 'video': return <Video size={16} />;
        case 'image': return <Image size={16} />;
        default: return <FileText size={16} />;
    }
};

export const SearchResults: React.FC<SearchResultsProps> = ({ results, query, loading, setSelectedMedia }) => {
    return (
        <div className="results-container">
            {results.map((result, idx) => (
                <div key={`${result.source}-${idx}`} className="result-card">
                    <div className="result-header">
                        <Zap size={18} color="#6366f1" />
                        <span className="result-source">{result.source}</span>
                    </div>

                    <div className="result-content">
                        <p>{result.content}</p>
                    </div>

                    {result.media && result.media.length > 0 && (
                        <div className="media-attachments">
                            <div className="media-label">Related Media:</div>
                            {result.media.map((media: MediaAsset, mIdx: number) => (
                                <button key={mIdx} className="media-chip" onClick={() => setSelectedMedia(media)}
                                >
                                    {renderMediaIcon(media.media_type)}
                                    <span>{media.description}</span>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            ))}

            {results.length === 0 && query && !loading && (
                <div className="no-results">
                    <p>No results found. Try rephrasing your question.</p>
                </div>
            )}
        </div>
    );
};
