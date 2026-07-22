import React, { useEffect, useRef, useState } from 'react'
import { KMTISensei } from '../KMTISensei'
import './styles/QuotationTutorial.css'

interface TutorialStep {
  title: string
  content: string
  targetSelector: string
  placement: 'top' | 'bottom' | 'left' | 'right' | 'center'
}

interface Props {
  isOpen: boolean
  onClose: () => void
  onComplete: () => void
}

const STEPS: TutorialStep[] = [
  { title: 'Welcome to the Lobby', content: 'This is the gateway to the KMTI Quotation system. Before we dive into the editor, let\'s look at how to manage your workspaces.', targetSelector: '.quot-entry-card', placement: 'center' },
  { title: 'Active Workspaces', content: 'Any currently active collaborative sessions will appear here. You can join them instantly with a single click.', targetSelector: '.quot-entry-sessions', placement: 'right' },
  { title: 'Initialize New Session', content: 'Need a fresh start? Use this button to create a new workspace. You can set a custom name and an optional password for privacy.', targetSelector: '.btn-start-workspace', placement: 'top' },
  { title: 'Quotation Library', content: 'Looking for past work? The library contains all previously saved quotations. You can load any of them back into a live session for further editing.', targetSelector: '.btn-open-library', placement: 'top' },
  { title: 'Ready to Explore?', content: 'Great! Now that you know the basics of the lobby, let\'s enter a sample workspace to see how the actual quotation engine works.', targetSelector: '.quot-entry-card', placement: 'center' },
]

const cancelSpeech = () => window.speechSynthesis?.cancel()

export const LobbyTutorial: React.FC<Props> = ({ isOpen, onClose, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [spotlightStyle, setSpotlightStyle] = useState<React.CSSProperties>({})
  const [cardStyle, setCardStyle] = useState<React.CSSProperties>({})
  const [pointerPos, setPointerPos] = useState({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const step = STEPS[currentStep]

  useEffect(() => {
    if (!isOpen) return
    setCurrentStep(0)
    const previouslyFocused = document.activeElement as HTMLElement | null
    const frame = requestAnimationFrame(() => closeButtonRef.current?.focus())
    return () => {
      cancelAnimationFrame(frame)
      previouslyFocused?.focus()
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Tab') {
        const controls = Array.from(cardRef.current?.querySelectorAll<HTMLElement>('button:not(:disabled), [href], [tabindex]:not([tabindex="-1"])') || [])
        if (controls.length > 0) {
          const first = controls[0]
          const last = controls[controls.length - 1]
          if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
          else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
        }
      } else if (event.key === 'Escape') {
        cancelSpeech()
        onClose()
      } else if (event.key === 'ArrowRight') {
        cancelSpeech()
        setCurrentStep(value => Math.min(value + 1, STEPS.length - 1))
      } else if (event.key === 'ArrowLeft') {
        cancelSpeech()
        setCurrentStep(value => Math.max(value - 1, 0))
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  useEffect(() => {
    if (!isOpen) return
    let timer: ReturnType<typeof setTimeout> | undefined
    let currentTarget: Element | null = null

    const updatePosition = () => {
      if (timer) clearTimeout(timer)
      currentTarget?.classList.remove('tutorial-target-highlight')
      currentTarget = document.querySelector(step.targetSelector)

      if (!currentTarget || step.placement === 'center') {
        if (!currentTarget) console.warn(`[tutorial] Target not found: ${step.targetSelector}`)
        setSpotlightStyle({ clipPath: 'inset(0 0 0 0)' })
        setCardStyle({ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' })
        setPointerPos({ x: -100, y: -100 })
        return
      }

      const target = currentTarget
      target.scrollIntoView({ behavior: 'smooth', block: 'center' })
      timer = setTimeout(() => {
        const rect = target.getBoundingClientRect()
        const padding = 10
        const x1 = rect.left - padding
        const y1 = rect.top - padding
        const x2 = rect.right + padding
        const y2 = rect.bottom + padding
        setSpotlightStyle({ clipPath: `polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, ${x1}px ${y1}px, ${x1}px ${y2}px, ${x2}px ${y2}px, ${x2}px ${y1}px, ${x1}px ${y1}px)` })

        const cardWidth = cardRef.current?.offsetWidth || 420
        const cardHeight = cardRef.current?.offsetHeight || 300
        const gap = 20
        let top = rect.top + rect.height / 2 - cardHeight / 2
        let left = rect.left + rect.width / 2 - cardWidth / 2
        if (step.placement === 'bottom') top = y2 + gap
        if (step.placement === 'top') top = y1 - cardHeight - gap
        if (step.placement === 'left') left = x1 - cardWidth - gap
        if (step.placement === 'right') left = x2 + gap
        left = Math.max(20, Math.min(left, window.innerWidth - cardWidth - 20))
        if (top < 20) top = y2 + gap
        if (top + cardHeight > window.innerHeight - 20) top = y1 - cardHeight - gap
        top = Math.max(20, Math.min(top, window.innerHeight - cardHeight - 20))
        setCardStyle({ top: `${top}px`, left: `${left}px` })
        setPointerPos({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 })
        target.classList.add('tutorial-target-highlight')
      }, 300)
    }

    updatePosition()
    window.addEventListener('resize', updatePosition)
    window.addEventListener('scroll', updatePosition, true)
    const observer = typeof ResizeObserver !== 'undefined' && currentTarget ? new ResizeObserver(updatePosition) : null
    if (observer && currentTarget) observer.observe(currentTarget)
    return () => {
      window.removeEventListener('resize', updatePosition)
      window.removeEventListener('scroll', updatePosition, true)
      observer?.disconnect()
      if (timer) clearTimeout(timer)
      currentTarget?.classList.remove('tutorial-target-highlight')
    }
  }, [isOpen, currentStep, step])

  if (!isOpen) return null

  const close = () => { cancelSpeech(); onClose() }
  const next = () => {
    cancelSpeech()
    if (currentStep < STEPS.length - 1) setCurrentStep(value => value + 1)
    else onComplete()
  }
  const back = () => { cancelSpeech(); setCurrentStep(value => Math.max(value - 1, 0)) }

  return (
    <div className="quot-tutorial-overlay lobby-tutorial">
      <div className="quot-tutorial-spotlight" style={spotlightStyle} onClick={close} aria-hidden="true" />
      {pointerPos.x > 0 && <div className="quot-tutorial-pointer" style={{ left: pointerPos.x - 10, top: pointerPos.y - 10 }} />}
      <div className="quot-tutorial-card-container" style={cardStyle} ref={cardRef}>
        <div className="quot-tutorial-card" role="dialog" aria-modal="true" aria-labelledby="lobby-tutorial-title">
          <div className="quot-tutorial-header">
            <span className="quot-tutorial-step-count">Lobby Tour • Step {currentStep + 1} of {STEPS.length}</span>
            <button ref={closeButtonRef} type="button" className="quot-tutorial-close" onClick={close} aria-label="Close lobby tutorial">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
            </button>
          </div>
          <h3 id="lobby-tutorial-title" className="quot-tutorial-title">{step.title}</h3>
          <div className="quot-tutorial-body"><KMTISensei key={currentStep} text={step.content} autoSpeak disableKaraoke /></div>
          <div className="quot-tutorial-actions">
            <button type="button" className="tutorial-btn-skip" onClick={close}>Exit</button>
            <div className="quot-tutorial-nav">
              <button type="button" className="tutorial-btn tutorial-btn-outline" onClick={back} disabled={currentStep === 0}>Back</button>
              <button type="button" className="tutorial-btn tutorial-btn-primary" onClick={next}>
                {currentStep === STEPS.length - 1 ? 'Go to Workspace' : 'Next'}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6" /></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
