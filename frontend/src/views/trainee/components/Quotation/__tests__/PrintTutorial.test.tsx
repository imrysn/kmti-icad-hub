import { fireEvent,render,screen } from '@testing-library/react'
import { beforeEach,describe,expect,it,vi } from 'vitest'
import { PrintTutorial } from '../PrintTutorial'

vi.mock('../../KMTISensei', () => ({
  KMTISensei: ({ text }: { text: string }) => <p>{text}</p>,
}))

describe('PrintTutorial', () => {
  beforeEach(() => {
    Element.prototype.scrollIntoView = vi.fn()
    Object.defineProperty(window, 'speechSynthesis', {
      configurable: true,
      value: { cancel: vi.fn() },
    })
  })

  it('closes without completing the training session', () => {
    const onClose = vi.fn()
    const onComplete = vi.fn()
    render(<PrintTutorial isOpen onClose={onClose} onComplete={onComplete} />)

    fireEvent.click(screen.getByRole('button', { name: 'Skip Guide' }))

    expect(onClose).toHaveBeenCalledOnce()
    expect(onComplete).not.toHaveBeenCalled()
  })

  it('completes only after Finish is selected', () => {
    const onClose = vi.fn()
    const onComplete = vi.fn()
    render(<PrintTutorial isOpen onClose={onClose} onComplete={onComplete} layoutVariant="kemco" />)

    for (let step = 0; step < 4; step += 1) {
      fireEvent.click(screen.getByRole('button', { name: 'Next' }))
    }
    fireEvent.click(screen.getByRole('button', { name: 'Finish' }))

    expect(onComplete).toHaveBeenCalledOnce()
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('omits Special UNIT (PAGE) guidance for KEMCO layouts', () => {
    render(<PrintTutorial isOpen onClose={vi.fn()} layoutVariant="kemco" />)

    expect(screen.getByText(/Step 1 of 5/)).toBeInTheDocument()
    expect(screen.queryByText('Unit Adjustment')).not.toBeInTheDocument()
  })

  it('supports Escape without completing the guide', () => {
    const onClose = vi.fn()
    const onComplete = vi.fn()
    render(<PrintTutorial isOpen onClose={onClose} onComplete={onComplete} />)

    fireEvent.keyDown(document, { key: 'Escape' })

    expect(onClose).toHaveBeenCalledOnce()
    expect(onComplete).not.toHaveBeenCalled()
  })
})
