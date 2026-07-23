import React from 'react'
import { act, render } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const { speakMock, stopMock, speakingState } = vi.hoisted(() => ({
  speakMock: vi.fn(),
  stopMock: vi.fn(),
  speakingState: { value: false },
}))

vi.mock('../../../../context/TTSContext', () => ({
  useTTSContext: () => ({
    speak: (text: string[]) => speakMock(text),
    stop: () => stopMock(),
    isSpeaking: speakingState.value,
  }),
}))

import { KMTISensei } from '../KMTISensei'

describe('KMTISensei', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    speakMock.mockClear()
    stopMock.mockClear()
    speakingState.value = false
  })

  afterEach(() => vi.useRealTimers())

  it('starts Kokoro narration once and does not cancel it on context rerenders', () => {
    const view = render(
      <React.StrictMode>
        <KMTISensei text="Welcome to the quotation tutorial." autoSpeak />
      </React.StrictMode>,
    )

    act(() => vi.advanceTimersByTime(150))
    expect(speakMock).toHaveBeenCalledTimes(1)
    expect(speakMock).toHaveBeenCalledWith(['Welcome to the quotation tutorial.'])

    speakMock.mockClear()
    stopMock.mockClear()
    view.rerender(
      <React.StrictMode>
        <KMTISensei text="Welcome to the quotation tutorial." autoSpeak />
      </React.StrictMode>,
    )
    act(() => vi.runOnlyPendingTimers())

    expect(speakMock).not.toHaveBeenCalled()
    expect(stopMock).not.toHaveBeenCalled()
  })

  it('shows active playback UI and advances after narration finishes', () => {
    const onNarrationEnd = vi.fn()
    const view = render(<KMTISensei text="Read this step." autoSpeak onNarrationEnd={onNarrationEnd} />)

    act(() => vi.advanceTimersByTime(150))
    speakingState.value = true
    view.rerender(<KMTISensei text="Read this step." autoSpeak onNarrationEnd={onNarrationEnd} />)

    const speaker = view.getByRole('button', { name: 'Stop tutorial narration' })
    expect(speaker).toHaveClass('is-speaking')
    expect(speaker).toHaveAttribute('aria-pressed', 'true')

    speakingState.value = false
    view.rerender(<KMTISensei text="Read this step." autoSpeak onNarrationEnd={onNarrationEnd} />)
    act(() => vi.advanceTimersByTime(350))

    expect(onNarrationEnd).toHaveBeenCalledOnce()
  })
})
