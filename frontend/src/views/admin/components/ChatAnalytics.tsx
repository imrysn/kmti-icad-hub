import React, { useState, useEffect, useCallback } from 'react';
import {
    MessageSquare, Users, Zap, Clock, TrendingUp,
    Search, Trash2, RefreshCw, ChevronLeft, ChevronRight,
    Brain, FileText, ChevronDown, ChevronUp,
    ThumbsUp, ThumbsDown, Database, X
} from 'lucide-react';
import { adminService } from '../../../services/adminService';
import '../../../styles/ChatAnalytics.css';

interface ChatLogEntry {
    id: number;
    username: string;
    message: string;
    answer: string;
    sources_used: string | null;
    source_count: number;
    tokens_estimated: number;
    response_time_ms: number;
    had_media: boolean;
    created_at: string;
}

interface Stats {
    total_queries: number;
    total_tokens_estimated: number;
    avg_response_ms: number;
    top_users: { username: string; count: number }[];
    queries_per_day: { day: string; count: number }[];
    top_sources: { source: string; count: number }[];
}

interface FeedbackStats {
    total_up: number;
    total_down: number;
    satisfaction_rate: number | null;
    worst_rated: { log_id: number; message: string; down_count: number }[];
}

interface CacheStats {
    total_entries: number;
    active_entries: number;
    total_hits_saved: number;
    top_cached_queries: { query: string; hits: number; expires_at: string }[];
}

const PAGE_SIZE = 20;

// Inline bar for relative values
const MiniBar: React.FC<{ value: number; max: number; color?: string }> = ({ value, max, color = '#6366f1' }) => (
    <div className="ca-mini-bar-track">
        <div
            className="ca-mini-bar-fill"
            style={{ width: `${max > 0 ? (value / max) * 100 : 0}%`, background: color }}
        />
    </div>
);

// Expandable log row
const LogRow: React.FC<{ log: ChatLogEntry; onDelete: (id: number) => void }> = ({ log, onDelete }) => {
    const [expanded, setExpanded] = useState(false);
    const time = new Date(log.created_at).toLocaleString();
    const sources = log.sources_used ? log.sources_used.split(',').filter(Boolean) : [];

    return (
        <>
            <tr className={`ca-log-row ${expanded ? 'expanded' : ''}`} onClick={() => setExpanded(e => !e)}>
                <td className="ca-log-time">{time}</td>
                <td><span className="ca-username">{log.username}</span></td>
                <td className="ca-log-message">{log.message}</td>
                <td className="ca-center">{log.source_count}</td>
                <td className="ca-center">{log.tokens_estimated}</td>
                <td className="ca-center">{log.response_time_ms}ms</td>
                <td className="ca-center">
                    {log.had_media
                        ? <span className="ca-badge ca-badge-media">media</span>
                        : <span className="ca-badge ca-badge-text">text</span>}
                </td>
                <td className="ca-center">
                    <div className="ca-row-actions">
                        {expanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                        <button
                            className="ca-delete-btn"
                            onClick={(e) => { e.stopPropagation(); onDelete(log.id); }}
                            title="Delete log"
                        >
                            <Trash2 size={13} />
                        </button>
                    </div>
                </td>
            </tr>
            {expanded && (
                <tr className="ca-log-detail-row">
                    <td colSpan={8}>
                        <div className="ca-log-detail">
                            <div className="ca-detail-section">
                                <p className="ca-detail-label"><MessageSquare size={12} /> User Question</p>
                                <p className="ca-detail-text">{log.message}</p>
                            </div>
                            <div className="ca-detail-section">
                                <p className="ca-detail-label"><Brain size={12} /> AI Answer</p>
                                <p className="ca-detail-text">{log.answer}</p>
                            </div>
                            {sources.length > 0 && (
                                <div className="ca-detail-section">
                                    <p className="ca-detail-label"><FileText size={12} /> Sources Used</p>
                                    <div className="ca-source-chips">
                                        {sources.map((s, i) => (
                                            <span key={i} className="ca-source-chip">{s}</span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </td>
                </tr>
            )}
        </>
    );
};

export const ChatAnalytics: React.FC = () => {
    const [stats, setStats] = useState<Stats | null>(null);
    const [logs, setLogs] = useState<ChatLogEntry[]>([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(0);
    const [search, setSearch] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const [loading, setLoading] = useState(true);
    const [statsLoading, setStatsLoading] = useState(true);
    const [feedbackStats, setFeedbackStats] = useState<FeedbackStats | null>(null);
    const [cacheStats, setCacheStats] = useState<CacheStats | null>(null);
    const [clearingCache, setClearingCache] = useState(false);

    const fetchStats = useCallback(async () => {
        setStatsLoading(true);
        try {
            const [statsData, fbData, cacheData] = await Promise.all([
                adminService.getChatLogStats(),
                adminService.getFeedbackStats(),
                adminService.getCacheStats(),
            ]);
            setStats(statsData);
            setFeedbackStats(fbData);
            setCacheStats(cacheData);
        } catch { /* silent */ }
        finally { setStatsLoading(false); }
    }, []);

    const handleClearCache = async () => {
        setClearingCache(true);
        try {
            await adminService.clearCache();
            await fetchStats();
        } finally {
            setClearingCache(false);
        }
    };

    const fetchLogs = useCallback(async () => {
        setLoading(true);
        try {
            const data = await adminService.getChatLogs({
                limit: PAGE_SIZE,
                offset: page * PAGE_SIZE,
                username: search || undefined,
            });
            setLogs(data.logs);
            setTotal(data.total);
        } catch { /* silent */ }
        finally { setLoading(false); }
    }, [page, search]);

    useEffect(() => { fetchStats(); }, [fetchStats]);
    useEffect(() => { fetchLogs(); }, [fetchLogs]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setSearch(searchInput);
        setPage(0);
    };

    const handleDelete = async (id: number) => {
        await adminService.deleteChatLog(id);
        fetchLogs();
        fetchStats();
    };

    const totalPages = Math.ceil(total / PAGE_SIZE);
    const maxDayCount = stats ? Math.max(...stats.queries_per_day.map(d => d.count), 1) : 1;
    const maxUserCount = stats ? Math.max(...stats.top_users.map(u => u.count), 1) : 1;
    const maxSourceCount = stats ? Math.max(...stats.top_sources.map(s => s.count), 1) : 1;

    return (
        <div className="chat-analytics">

            {/* ── Stat Cards ── */}
            <div className="ca-stat-row">
                {[
                    {
                        icon: <MessageSquare size={16} />,
                        label: 'Total Queries',
                        value: statsLoading ? '—' : (stats?.total_queries ?? 0).toLocaleString(),
                        color: '#6366f1',
                    },
                    {
                        icon: <Zap size={16} />,
                        label: 'Est. Tokens Used',
                        value: statsLoading ? '—' : (stats?.total_tokens_estimated ?? 0).toLocaleString(),
                        color: '#f59e0b',
                    },
                    {
                        icon: <Clock size={16} />,
                        label: 'Avg Response Time',
                        value: statsLoading ? '—' : `${stats?.avg_response_ms ?? 0}ms`,
                        color: '#10b981',
                    },
                    {
                        icon: <Users size={16} />,
                        label: 'Unique Users',
                        value: statsLoading ? '—' : (stats?.top_users.length ?? 0).toString(),
                        color: '#3b82f6',
                    },
                ].map((card, i) => (
                    <div key={i} className="ca-stat-card" style={{ '--ca-accent': card.color } as any}>
                        <div className="ca-stat-icon">{card.icon}</div>
                        <div className="ca-stat-body">
                            <span className="ca-stat-value">{card.value}</span>
                            <span className="ca-stat-label">{card.label}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* ── Charts Row ── */}
            <div className="ca-charts-row">
                {/* Activity chart — last 14 days */}
                <div className="ca-chart-card">
                    <div className="ca-chart-header">
                        <TrendingUp size={14} />
                        <span>Queries — Last 14 Days</span>
                    </div>
                    {statsLoading ? (
                        <div className="ca-skeleton-bars">
                            {Array.from({ length: 14 }).map((_, i) => (
                                <div key={i} className="ca-skeleton-bar" style={{ height: `${20 + Math.random() * 60}%` }} />
                            ))}
                        </div>
                    ) : stats && stats.queries_per_day.length > 0 ? (
                        <div className="ca-bar-chart">
                            {stats.queries_per_day.map((d, i) => (
                                <div key={i} className="ca-bar-col" title={`${d.day}: ${d.count} queries`}>
                                    <div
                                        className="ca-bar"
                                        style={{ height: `${(d.count / maxDayCount) * 100}%` }}
                                    />
                                    <span className="ca-bar-label">
                                        {new Date(d.day).toLocaleDateString(undefined, { month: 'numeric', day: 'numeric' })}
                                    </span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="ca-empty-chart">No activity in the last 14 days</div>
                    )}
                </div>

                {/* Top users */}
                <div className="ca-chart-card ca-chart-card-sm">
                    <div className="ca-chart-header">
                        <Users size={14} />
                        <span>Most Active Users</span>
                    </div>
                    <div className="ca-rank-list">
                        {statsLoading
                            ? Array.from({ length: 5 }).map((_, i) => <div key={i} className="ca-rank-skeleton" />)
                            : stats?.top_users.length === 0
                                ? <p className="ca-empty-list">No data yet</p>
                                : stats?.top_users.map((u, i) => (
                                    <div key={i} className="ca-rank-row">
                                        <span className="ca-rank-num">{i + 1}</span>
                                        <span className="ca-rank-name">{u.username}</span>
                                        <MiniBar value={u.count} max={maxUserCount} />
                                        <span className="ca-rank-count">{u.count}</span>
                                    </div>
                                ))
                        }
                    </div>
                </div>

                {/* Top sources hit */}
                <div className="ca-chart-card ca-chart-card-sm">
                    <div className="ca-chart-header">
                        <FileText size={14} />
                        <span>Most Referenced Sources</span>
                    </div>
                    <div className="ca-rank-list">
                        {statsLoading
                            ? Array.from({ length: 5 }).map((_, i) => <div key={i} className="ca-rank-skeleton" />)
                            : stats?.top_sources.length === 0
                                ? <p className="ca-empty-list">No data yet</p>
                                : stats?.top_sources.map((s, i) => (
                                    <div key={i} className="ca-rank-row">
                                        <span className="ca-rank-num">{i + 1}</span>
                                        <span className="ca-rank-name ca-source-name-truncate">{s.source}</span>
                                        <MiniBar value={s.count} max={maxSourceCount} color="#10b981" />
                                        <span className="ca-rank-count">{s.count}</span>
                                    </div>
                                ))
                        }
                    </div>
                </div>
            </div>

            {/* ── Feedback + Cache Row ── */}
            <div className="ca-charts-row">
                {/* Feedback panel */}
                <div className="ca-chart-card">
                    <div className="ca-chart-header">
                        <ThumbsUp size={14} />
                        <span>User Feedback</span>
                    </div>
                    {statsLoading ? (
                        <div className="ca-rank-skeleton" style={{ height: 80 }} />
                    ) : feedbackStats ? (
                        <>
                            <div className="ca-feedback-summary">
                                <div className="ca-feedback-stat ca-feedback-up">
                                    <ThumbsUp size={16} />
                                    <span className="ca-feedback-count">{feedbackStats.total_up}</span>
                                    <span className="ca-feedback-label">Helpful</span>
                                </div>
                                <div className="ca-feedback-divider" />
                                <div className="ca-feedback-stat ca-feedback-down">
                                    <ThumbsDown size={16} />
                                    <span className="ca-feedback-count">{feedbackStats.total_down}</span>
                                    <span className="ca-feedback-label">Not helpful</span>
                                </div>
                                {feedbackStats.satisfaction_rate !== null && (
                                    <div className="ca-satisfaction-rate">
                                        <span className="ca-satisfaction-val">{feedbackStats.satisfaction_rate}%</span>
                                        <span className="ca-satisfaction-label">Satisfaction</span>
                                    </div>
                                )}
                            </div>
                            {feedbackStats.worst_rated.length > 0 && (
                                <div className="ca-worst-list">
                                    <p className="ca-worst-label"><ThumbsDown size={11} /> Needs improvement</p>
                                    {feedbackStats.worst_rated.slice(0, 3).map((w, i) => (
                                        <div key={i} className="ca-worst-row">
                                            <span className="ca-worst-msg">{w.message.slice(0, 60)}{w.message.length > 60 ? '…' : ''}</span>
                                            <span className="ca-worst-count">{w.down_count} ↓</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </>
                    ) : (
                        <p className="ca-empty-list">No feedback yet</p>
                    )}
                </div>

                {/* Cache panel */}
                <div className="ca-chart-card" style={{ gridColumn: 'span 2' } as any}>
                    <div className="ca-chart-header" style={{ justifyContent: 'space-between' } as any}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            <Database size={14} />
                            <span>Query Cache</span>
                        </div>
                        <button className="ca-clear-cache-btn" onClick={handleClearCache} disabled={clearingCache}>
                            {clearingCache ? <RefreshCw size={12} className="spinning" /> : <X size={12} />}
                            Clear cache
                        </button>
                    </div>
                    {statsLoading ? (
                        <div className="ca-rank-skeleton" style={{ height: 80 }} />
                    ) : cacheStats ? (
                        <>
                            <div className="ca-cache-stats-row">
                                <div className="ca-cache-stat">
                                    <span className="ca-stat-value" style={{ fontSize: '1.1rem' }}>{cacheStats.active_entries}</span>
                                    <span className="ca-stat-label">Active entries</span>
                                </div>
                                <div className="ca-cache-stat">
                                    <span className="ca-stat-value" style={{ fontSize: '1.1rem' }}>{cacheStats.total_hits_saved}</span>
                                    <span className="ca-stat-label">Gemini calls saved</span>
                                </div>
                                <div className="ca-cache-stat">
                                    <span className="ca-stat-value" style={{ fontSize: '1.1rem' }}>{cacheStats.total_entries}</span>
                                    <span className="ca-stat-label">Total entries</span>
                                </div>
                            </div>
                            {cacheStats.top_cached_queries.length > 0 && (
                                <div className="ca-rank-list" style={{ marginTop: '0.75rem' }}>
                                    {cacheStats.top_cached_queries.slice(0, 5).map((q, i) => (
                                        <div key={i} className="ca-rank-row">
                                            <span className="ca-rank-num">{i + 1}</span>
                                            <span className="ca-rank-name" style={{ width: 'auto', flex: 1 }}>{q.query.slice(0, 60)}{q.query.length > 60 ? '…' : ''}</span>
                                            <span className="ca-rank-count">{q.hits} hits</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </>
                    ) : (
                        <p className="ca-empty-list">No cache entries</p>
                    )}
                </div>
            </div>

            {/* ── Log Table ── */}
            <div className="ca-log-section">
                <div className="ca-log-header">
                    <div className="ca-log-title">
                        <MessageSquare size={15} />
                        <span>Conversation Logs</span>
                        <span className="ca-total-badge">{total.toLocaleString()} total</span>
                    </div>
                    <div className="ca-log-controls">
                        <form className="ca-search-form" onSubmit={handleSearch}>
                            <Search size={13} />
                            <input
                                type="text"
                                placeholder="Filter by username..."
                                value={searchInput}
                                onChange={e => setSearchInput(e.target.value)}
                                className="ca-search-input"
                            />
                        </form>
                        <button className="ca-refresh-btn" onClick={() => { fetchLogs(); fetchStats(); }} title="Refresh">
                            <RefreshCw size={14} className={loading ? 'spinning' : ''} />
                        </button>
                    </div>
                </div>

                <div className="ca-table-wrapper">
                    <table className="ca-table">
                        <thead>
                            <tr>
                                <th>Time</th>
                                <th>User</th>
                                <th>Question</th>
                                <th className="ca-center">Sources</th>
                                <th className="ca-center">Tokens</th>
                                <th className="ca-center">Latency</th>
                                <th className="ca-center">Type</th>
                                <th className="ca-center"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading
                                ? Array.from({ length: 8 }).map((_, i) => (
                                    <tr key={i} className="ca-skeleton-row">
                                        {Array.from({ length: 8 }).map((_, j) => (
                                            <td key={j}><div className="ca-skeleton-cell" /></td>
                                        ))}
                                    </tr>
                                ))
                                : logs.length === 0
                                    ? (
                                        <tr>
                                            <td colSpan={8} className="ca-empty-table">
                                                {search ? `No logs matching "${search}"` : 'No conversations logged yet. Chat activity will appear here.'}
                                            </td>
                                        </tr>
                                    )
                                    : logs.map(log => (
                                        <LogRow key={log.id} log={log} onDelete={handleDelete} />
                                    ))
                            }
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="ca-pagination">
                        <button
                            className="ca-page-btn"
                            onClick={() => setPage(p => Math.max(0, p - 1))}
                            disabled={page === 0}
                        >
                            <ChevronLeft size={14} />
                        </button>
                        <span className="ca-page-info">
                            Page {page + 1} of {totalPages}
                        </span>
                        <button
                            className="ca-page-btn"
                            onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
                            disabled={page >= totalPages - 1}
                        >
                            <ChevronRight size={14} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
