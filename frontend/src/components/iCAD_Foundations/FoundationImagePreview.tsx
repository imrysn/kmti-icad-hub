import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import './FoundationImagePreview.css';

export default function FoundationImagePreview({ src, alt, japanese = false }: { src: string; alt: string; japanese?: boolean }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const ownsFullscreen = useRef(false);
  const active = useRef(false);
  const leaveFullscreen = () => {
    if (!ownsFullscreen.current) return;
    ownsFullscreen.current = false;
    if (document.fullscreenElement === document.documentElement) void document.exitFullscreen().catch(() => {});
  };
  const close = () => {
    active.current = false;
    dialog.current?.close();
    leaveFullscreen();
  };
  useEffect(() => {
    const changed = () => {
      if (ownsFullscreen.current && !document.fullscreenElement) {
        ownsFullscreen.current = false;
        active.current = false;
        dialog.current?.close();
      }
    };
    document.addEventListener('fullscreenchange', changed);
    return () => {
      active.current = false;
      document.removeEventListener('fullscreenchange', changed);
      leaveFullscreen();
    };
  }, []);
  const open = () => {
    active.current = true;
    dialog.current?.showModal();
    if (!document.fullscreenElement && document.documentElement.requestFullscreen) {
      void document.documentElement.requestFullscreen().then(() => {
        ownsFullscreen.current = true;
        if (!active.current) { leaveFullscreen(); return; }
        // Keep the dialog above the document after it enters fullscreen.
        dialog.current?.close();
        dialog.current?.showModal();
      }).catch(() => {});
    }
  };
  return <>
    <button type="button" className="foundation-image-preview-trigger" onClick={open} aria-label={japanese ? "画像を全画面表示" : "View image fullscreen"}>
      <img src={src} alt={alt} loading="lazy" />
    </button>
    <dialog ref={dialog} className="foundation-image-preview" aria-label={japanese ? "全画面の実例" : "Full-size example"} onCancel={event => { event.preventDefault(); close(); }}>
      <img src={src} alt={alt} />
      <button type="button" className="foundation-image-preview-close" onClick={close} aria-label={japanese ? "画像を閉じる" : "Close image"}><X size={22} /></button>
    </dialog>
  </>;
}
