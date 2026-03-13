import React from 'react';
import { useSearch } from '../../hooks/useSearch';
import { MediaAsset } from '../../types';

import { SearchSpotlight } from './components/SearchSpotlight';
import { SearchResults } from './components/SearchResults';
import { MediaModal } from './components/MediaModal';

import '../../styles/AssistantMode.css';

/**
 * Assistant Mode: Spotlight-style search for employees
 * Container Component holding state and search hook logic.
 */
const AssistantMode: React.FC = () => {
    const { query, setQuery, results, loading, performSearch } = useSearch();
    const [selectedMedia, setSelectedMedia] = React.useState<MediaAsset | null>(null);

    return (
        <div className="assistant-mode">
            <SearchSpotlight 
                query={query} 
                setQuery={setQuery} 
                performSearch={performSearch} 
                loading={loading} 
            />

            <SearchResults 
                results={results} 
                query={query} 
                loading={loading} 
                setSelectedMedia={setSelectedMedia} 
            />

            {selectedMedia && (
                <MediaModal 
                    selectedMedia={selectedMedia} 
                    setSelectedMedia={setSelectedMedia} 
                />
            )}
        </div>
    );
};

export default AssistantMode;
