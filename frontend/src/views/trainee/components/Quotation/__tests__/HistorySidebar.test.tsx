import { fireEvent,render,screen,waitFor } from '@testing-library/react'
import { beforeEach,describe,expect,it,vi } from 'vitest'

const { getHistoryMock, restoreHistoryMock } = vi.hoisted(() => ({
  getHistoryMock: vi.fn(),
  restoreHistoryMock: vi.fn(),
}))

vi.mock('../../../../../services/api', () => ({
  quotationApi: {
    getHistory: getHistoryMock,
    restoreHistory: restoreHistoryMock,
  },
}))

import { HistorySidebar } from '../HistorySidebar'

const snapshot = {
  id: 7,
  timestamp: '2026-07-23T08:00:00Z',
  label: 'Before rate update',
  author: 'Test User',
}

describe('HistorySidebar', () => {
  beforeEach(() => {
    getHistoryMock.mockReset()
    restoreHistoryMock.mockReset()
    getHistoryMock.mockResolvedValue({ data: { history: [snapshot] } })
    restoreHistoryMock.mockResolvedValue({ data: { tasks: [{ id: 1 }] } })
    vi.spyOn(window, 'confirm').mockReturnValue(true)
  })

  it('loads history when expanded and previews a snapshot', async () => {
    const onPreview = vi.fn()
    render(<HistorySidebar quotId={42} onRestore={vi.fn()} onPreview={onPreview} />)

    fireEvent.click(screen.getByRole('button', { name: 'Version History' }))
    expect(await screen.findByText('Before rate update')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Preview' }))

    await waitFor(() => expect(onPreview).toHaveBeenCalledWith({ tasks: [{ id: 1 }] }, snapshot.timestamp))
    expect(restoreHistoryMock).toHaveBeenCalledWith(42, 7)
  })

  it('requires confirmation before restoring', async () => {
    const onRestore = vi.fn()
    render(<HistorySidebar quotId={42} onRestore={onRestore} />)
    fireEvent.click(screen.getByRole('button', { name: 'Version History' }))
    await screen.findByText('Before rate update')
    fireEvent.click(screen.getByRole('button', { name: 'Restore' }))

    await waitFor(() => expect(onRestore).toHaveBeenCalledWith({ tasks: [{ id: 1 }] }))
    expect(window.confirm).toHaveBeenCalledOnce()
  })

  it('shows a recoverable error when history cannot be loaded', async () => {
    getHistoryMock.mockRejectedValueOnce(new Error('offline'))
    render(<HistorySidebar quotId={42} onRestore={vi.fn()} />)
    fireEvent.click(screen.getByRole('button', { name: 'Version History' }))

    expect(await screen.findByRole('alert')).toHaveTextContent('Unable to load version history.')
    expect(screen.getByRole('button', { name: 'Try again' })).toBeInTheDocument()
  })
})
