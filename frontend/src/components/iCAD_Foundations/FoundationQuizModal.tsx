import { useEffect, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

/** Native modal makes the entire app inert and contains keyboard focus. */
export default function FoundationQuizModal({ children, onClose }: { children: ReactNode; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = dialogRef.current!;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.showModal();
    return () => {
      dialog.close();
      previousFocus?.focus();
      document.body.style.overflow = previousOverflow;
    };
  }, []);
  return createPortal(<dialog ref={dialogRef} className="foundations-quiz-modal"
    aria-label="Knowledge Check" onCancel={event => { event.preventDefault(); onClose(); }}>
    {children}
  </dialog>, document.body);
}
