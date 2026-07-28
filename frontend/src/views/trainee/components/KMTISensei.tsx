import { useCallback,useEffect,useRef } from 'react'
import { useTTSContext } from '../../../context/TTSContext'

interface Props {
  title?: string
  message?: string
  text?: string
  visible?: boolean
  onClose?: () => void
  onNext?: () => void
  position?: 'top' | 'bottom' | 'left' | 'right' | 'center'
  step?: number
  totalSteps?: number
  autoSpeak?: boolean
  disableKaraoke?: boolean
  onNarrationEnd?: () => void
}

export const KMTISensei = ({
  title,
  message,
  text,
  visible = true,
  onClose,
  onNext,
  step,
  totalSteps,
  autoSpeak = false,
  onNarrationEnd,
}: Props) => {
  const narration = message || text || ''
  const { speak: speakWithManualVoice, stop, isSpeaking } = useTTSContext()
  const speakRef = useRef(speakWithManualVoice)
  const stopRef = useRef(stop)
  const onNarrationEndRef = useRef(onNarrationEnd)
  const playbackRequestedRef = useRef(false)
  const playbackStartedRef = useRef(false)
  const completionHandledRef = useRef(false)
  speakRef.current = speakWithManualVoice
  stopRef.current = stop
  onNarrationEndRef.current = onNarrationEnd

  const speak = useCallback(() => {
    if (!narration) return
    playbackRequestedRef.current = true
    playbackStartedRef.current = false
    completionHandledRef.current = false
    speakRef.current([narration])
  }, [narration])

  useEffect(() => {
    if (!playbackRequestedRef.current) return
    if (isSpeaking) {
      playbackStartedRef.current = true
      return
    }
    if (!playbackStartedRef.current || completionHandledRef.current) return

    completionHandledRef.current = true
    const timer = window.setTimeout(() => onNarrationEndRef.current?.(), 350)
    return () => window.clearTimeout(timer)
  }, [isSpeaking])

  useEffect(() => {
    if (!visible || !autoSpeak) return
    // Defer auto-play so React Strict Mode can finish its development-only
    // mount/cleanup cycle before the audio request is created.
    const timer = window.setTimeout(speak, 150)
    return () => {
      window.clearTimeout(timer)
      stopRef.current()
    }
  }, [visible, autoSpeak, speak])

  if (!visible) return null

  return (
    <div className="kmti-sensei-cell">
      <div className="kmti-sensei-copy">
        {title && <strong>{title}</strong>}
        <p>{narration}</p>
        {step && totalSteps && <small>Step {step} of {totalSteps}</small>}
      </div>
      {narration && (
        <button
          type="button"
          className={`kmti-sensei-speak${isSpeaking ? ' is-speaking' : ''}`}
          onClick={isSpeaking ? stop : speak}
          aria-label={isSpeaking ? 'Stop tutorial narration' : 'Read tutorial instruction aloud'}
          aria-pressed={isSpeaking}
          title={isSpeaking ? 'Stop narration' : 'Read aloud'}
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M15.5 8.5a5 5 0 0 1 0 7" />
            <path d="M18.5 5.5a9 9 0 0 1 0 13" />
          </svg>
        </button>
      )}
      {(onClose || onNext) && (
        <div className="kmti-sensei-actions">
          {onClose && <button type="button" onClick={onClose}>Close</button>}
          {onNext && <button type="button" onClick={onNext}>Next</button>}
        </div>
      )}
    </div>
  )
}

export default KMTISensei
