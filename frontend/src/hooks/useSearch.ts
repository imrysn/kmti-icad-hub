import { useState } from 'react';
import { api } from '../services/api';
import { SearchResult } from '../types';

export const useSearch = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchResult[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const performSearch = async () => {
        if (!query.trim()) return;

        setLoading(true);
        setError(null);
        try {
            const data = await api.search(query);
            setResults(data.results);
        } catch (err) {
            setError('Search failed');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return {
        query,
        setQuery,
        results,
        loading,
        error,
        performSearch
    };
};
