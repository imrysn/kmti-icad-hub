import { useEffect, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

/** Native modal makes the entire app inert and contains keyboard focus. */
export default function FoundationQuizModal({ children }: { children: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = dialogRef.current!;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.showModal();
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, []);
  return createPortal(<dialog ref={dialogRef} className="foundations-quiz-modal"
    aria-label="Knowledge Check" onCancel={event => event.preventDefault()}>
    {children}
  </dialog>, document.body);
}
