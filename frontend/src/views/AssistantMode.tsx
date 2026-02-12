import React from 'react';
import { Search, Zap, FileText, Video, Image } from 'lucide-react';
import { useSearch } from '../hooks/useSearch';
import { MediaAsset } from '../types';
import { SearchResultSkeleton } from '../components/SkeletonComponents';

import '../styles/AssistantMode.css';

/**
 * Assistant Mode: Spotlight-style search for employees
 * Features:
 * - Minimalist search interface
 * - Direct answers with references
 * - Quick multimedia access
 */
const AssistantMode: React.FC = () => {
  const { query, setQuery, results, loading, performSearch } = useSearch();
  const [selectedMedia, setSelectedMedia] = React.useState<MediaAsset | null>(null);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      performSearch();
    }
  };

  const renderMediaIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video size={16} />;
      case 'image': return <Image size={16} />;
      default: return <FileText size={16} />;
    }
  };

  return (
    <div className="assistant-mode">
      <div className="spotlight-search">
        <div className="search-icon">
          <Search size={24} />
        </div>
        <input
          type="text"
          placeholder="Ask a technical question..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          autoFocus
          className="spotlight-input"
        />
        {loading && (
          <div className="search-loading">
            <SearchResultSkeleton />
            <SearchResultSkeleton />
            <SearchResultSkeleton />
          </div>
        )}
      </div>

      <div className="results-container">
        {results.map((result, idx) => (
          <div key={idx} className="result-card">
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
                {result.media.map((media, mIdx) => (
                  <button
                    key={mIdx}
                    className="media-chip"
                    onClick={() => setSelectedMedia(media)}
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

      {selectedMedia && (
        <div className="media-modal" onClick={() => setSelectedMedia(null)}>
          <div className="media-modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>{selectedMedia.description}</h3>
            {selectedMedia.media_type === 'video' ? (
              <video
                controls
                autoPlay
                src={`${selectedMedia.media_url}#t=${selectedMedia.timestamp_start || 0}`}
              >
                Your browser does not support video.
              </video>
            ) : (
              <img src={selectedMedia.media_url} alt={selectedMedia.description} />
            )}
            <button onClick={() => setSelectedMedia(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssistantMode;
