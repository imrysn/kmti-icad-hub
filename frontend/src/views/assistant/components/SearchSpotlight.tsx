import React from 'react';
import { Search } from 'lucide-react'; import { SearchResultSkeleton } from '../../../components/SkeletonComponents';

interface SearchSpotlightProps {
    query: string;
    setQuery: (val: string) => void;
    performSearch: () => void;
    loading: boolean;
}

export const SearchSpotlight: React.FC<SearchSpotlightProps> = ({ query, setQuery, performSearch, loading }) => {
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    };

    return (
        <div className="spotlight-search">
            <div className="search-icon">
                <Search size={24} />
            </div>
            <label htmlFor="assistant-search" className="visually-hidden">Search knowledge base</label>
            <input id="assistant-search" type="text" placeholder="Ask a technical question..." value={query} onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
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
    );
};
