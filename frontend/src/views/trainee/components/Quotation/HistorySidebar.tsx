import { useCallback,useEffect,useRef,useState } from 'react'
import { quotationApi } from '../../../../services/api'
import type { IQuotationHistory } from '../../../../types/quotation'
import './HistorySidebar.css'

const ClockIcon = ({ size = 16, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
  </svg>
)

const RefreshIcon = ({ size = 16, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
  </svg>
)

function parseDate(timestamp?: string): Date | null {
  if (!timestamp) return null
  const date = new Date(timestamp)
  return Number.isNaN(date.getTime()) ? null : date
}

function formatTimeAgo(timestamp: string) {
  const date = parseDate(timestamp)
  if (!date) return 'Unknown time'
  const minutes = Math.max(0, Math.floor((Date.now() - date.getTime()) / 60000))
  if (minutes < 1) return 'just now'
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  return date.toLocaleDateString([], { month: 'short', day: 'numeric' })
}

function groupItemsByDate(items: IQuotationHistory[]) {
  const groups: Record<string, IQuotationHistory[]> = {}
  const today = new Date().toLocaleDateString()
  const yesterday = new Date(Date.now() - 86400000).toLocaleDateString()

  items.forEach(item => {
    const date = parseDate(item.timestamp)
    const dateText = date?.toLocaleDateString()
    let key = 'Unknown date'
    if (date && dateText === today) key = 'Today'
    else if (date && dateText === yesterday) key = 'Yesterday'
    else if (date) key = date.toLocaleDateString([], { month: 'long', day: 'numeric', year: 'numeric' })
    if (!groups[key]) groups[key] = []
    groups[key].push(item)
  })
  return groups
}

interface Props {
  quotId: number | undefined
  onRestore: (data: any) => void
  onPreview?: (data: any, timestamp: string) => void
  previewingTs?: string | null
}

export function HistorySidebar({ quotId, onRestore, onPreview, previewingTs }: Props) {
  const [expanded, setExpanded] = useState(false)
  const [snapshots, setSnapshots] = useState<IQuotationHistory[]>([])
  const [loading, setLoading] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [restoringId, setRestoringId] = useState<number | null>(null)
  const [previewLoadingId, setPreviewLoadingId] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)
  const requestIdRef = useRef(0)

  const fetchHistory = useCallback(async (silent = false) => {
    if (!quotId) return
    silent ? setIsRefreshing(true) : setLoading(true)
    setError(null)
    const requestId = ++requestIdRef.current
    try {
      const response = await quotationApi.getHistory(quotId)
      if (requestId === requestIdRef.current) setSnapshots(response.data.history || [])
    } catch (fetchError) {
      console.error('[history] Failed to fetch:', fetchError)
      if (requestId === requestIdRef.current) setError('Unable to load version history.')
    } finally {
      if (requestId === requestIdRef.current) {
        setLoading(false)
        setIsRefreshing(false)
      }
    }
  }, [quotId])

  useEffect(() => {
    requestIdRef.current += 1
    setSnapshots([])
    setPreviewLoadingId(null)
    setRestoringId(null)
    setError(null)
  }, [quotId])

  useEffect(() => {
    if (expanded && quotId) fetchHistory()
  }, [expanded, quotId, fetchHistory])

  useEffect(() => {
    if (!quotId || !expanded) return
    const refresh = (event: Event) => {
      const customEvent = event as CustomEvent<{ quotId?: number }>
      if (customEvent.detail?.quotId === quotId) fetchHistory(true)
    }
    window.addEventListener('quot:history-refresh', refresh)
    return () => window.removeEventListener('quot:history-refresh', refresh)
  }, [quotId, expanded, fetchHistory])

  const handlePreview = async (snapshot: IQuotationHistory) => {
    if (!quotId || !onPreview || previewingTs === snapshot.timestamp) return
    setPreviewLoadingId(snapshot.id)
    setError(null)
    try {
      const response = await quotationApi.restoreHistory(quotId, snapshot.id)
      onPreview(response.data, snapshot.timestamp)
    } catch (previewError) {
      console.error('[history] Failed to preview:', previewError)
      setError('Failed to preview this version. Please try again.')
    } finally {
      setPreviewLoadingId(null)
    }
  }

  const handleRestore = async (snapshot: IQuotationHistory) => {
    if (!quotId) return
    if (!window.confirm(`Restore “${snapshot.label || 'this version'}”? Your current editor values will be replaced.`)) return
    setRestoringId(snapshot.id)
    setError(null)
    try {
      const response = await quotationApi.restoreHistory(quotId, snapshot.id)
      onRestore(response.data)
    } catch (restoreError) {
      console.error('[history] Failed to restore:', restoreError)
      setError('Failed to restore this version. Please try again.')
    } finally {
      setRestoringId(null)
    }
  }

  const busy = restoringId !== null || previewLoadingId !== null

  return (
    <aside className={`history-sidebar ${expanded ? 'history-sidebar--expanded' : ''}`} aria-label="Quotation version history">
      <button type="button" className="history-sidebar__toggle" onClick={() => setExpanded(value => !value)} title={expanded ? 'Collapse history' : 'Version History'} aria-expanded={expanded} aria-controls="quotation-history-panel">
        <ClockIcon size={16} />
        {expanded && <span className="history-sidebar__title">Version History</span>}
      </button>

      {expanded && (
        <div className="history-sidebar__content" id="quotation-history-panel">
          <div className="history-sidebar__header-actions">
            <span className="history-sidebar__summary">{snapshots.length} saved {snapshots.length === 1 ? 'version' : 'versions'}</span>
            {quotId && !loading && (
              <button type="button" className={`history-sidebar__refresh ${isRefreshing ? 'history-sidebar__refresh--active' : ''}`} onClick={() => fetchHistory(true)} disabled={isRefreshing} aria-label="Refresh version history">
                <RefreshIcon size={13} />
                <span>{isRefreshing ? 'Refreshing…' : 'Refresh'}</span>
              </button>
            )}
          </div>

          <div className="history-sidebar__scroll-area">
            {error && <div className="history-sidebar__error" role="alert"><span>{error}</span><button type="button" onClick={() => fetchHistory()}>Try again</button></div>}
            {!quotId && <p className="history-sidebar__empty">Waiting for database connection…</p>}
            {quotId && loading && snapshots.length === 0 && <p className="history-sidebar__empty" role="status">Loading versions…</p>}
            {quotId && !loading && !error && snapshots.length === 0 && <p className="history-sidebar__empty">No snapshots yet.</p>}

            {Object.entries(groupItemsByDate(snapshots)).map(([dateKey, items]) => (
              <section className="history-group" key={dateKey} aria-labelledby={`history-group-${dateKey.replace(/\W+/g, '-').toLowerCase()}`}>
                <h3 className="history-group-header" id={`history-group-${dateKey.replace(/\W+/g, '-').toLowerCase()}`}>{dateKey}</h3>
                {items.map(snapshot => {
                  const date = parseDate(snapshot.timestamp)
                  const time = date ? date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Unknown time'
                  const isPreviewing = previewingTs === snapshot.timestamp
                  const isPreviewLoading = previewLoadingId === snapshot.id
                  const isRestoring = restoringId === snapshot.id
                  return (
                    <article key={snapshot.id} className={`timeline-item ${isPreviewing ? 'timeline-item--previewing' : ''} ${isPreviewLoading ? 'timeline-item--loading' : ''} ${isRestoring ? 'timeline-item--restoring' : ''}`}>
                      <div className="timeline-marker" aria-hidden="true" />
                      <div className="timeline-content">
                        <div className="timeline-header">
                          <span className="timeline-time">{time}</span>
                          <div className="timeline-actions">
                            {onPreview && <button type="button" className="timeline-action-btn" onClick={() => handlePreview(snapshot)} title="Preview this version" disabled={busy || isPreviewing}>{isPreviewLoading ? 'Loading…' : isPreviewing ? 'Viewing' : 'Preview'}</button>}
                            <button type="button" className="timeline-action-btn timeline-action-btn--restore" onClick={() => handleRestore(snapshot)} title="Restore this version" disabled={busy}>{isRestoring ? 'Restoring…' : 'Restore'}</button>
                          </div>
                        </div>
                        <div className="timeline-desc"><span className="timeline-primary-label">{snapshot.label || 'System Snapshot'}</span><span className="timeline-author"> • {snapshot.author || 'Unknown user'}</span></div>
                        <div className="timeline-meta">{date ? date.toLocaleDateString([], { month: 'short', day: 'numeric' }) : 'Unknown date'} • {formatTimeAgo(snapshot.timestamp)}</div>
                      </div>
                    </article>
                  )
                })}
              </section>
            ))}
          </div>
        </div>
      )}
    </aside>
  )
}
