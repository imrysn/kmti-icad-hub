import toolbar from '../../assets/icad-foundations/toolbar.jpg';
import menu from '../../assets/icad-foundations/menu-bar.jpg';
import working from '../../assets/icad-foundations/workspace.jpg';
import input from '../../assets/icad-foundations/inputarea.jpg';
import message from '../../assets/icad-foundations/message-area.jpg';
import tree from '../../assets/icad-foundations/treeview.jpg';
import './FoundationScreenAreas.css';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ZoomIn, ZoomOut, RotateCcw, X } from 'lucide-react';
import { useTranslation } from '../../context/LanguageContext';

function CardImage({ src, title }: { src: string; title: string }) {
  const [open, setOpen] = useState(false);
  const { language } = useTranslation();
  return <>
    <button type="button" className="screen-image-open" onClick={() => setOpen(true)} aria-label={`${language === 'ja' ? '画像を全画面で表示' : 'Open full-screen image'}: ${title}`}>
      <img src={src} alt={title} className="foundations-screen-area__image" loading="lazy" />
    </button>
    {open && <FullScreenImage src={src} title={title} onClose={() => setOpen(false)} />}
  </>;
}

function FullScreenImage({ src, title, onClose }: { src: string; title: string; onClose: () => void }) {
  const [zoom, setZoom] = useState(1);
  const dialog = useRef<HTMLDialogElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const { language } = useTranslation();
  const ja = language === 'ja';
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.current!.showModal();
    return () => { dialog.current?.close(); document.body.style.overflow = previous; };
  }, []);
  return createPortal(<dialog ref={dialog} className="screen-image-fullscreen" aria-label={title} onCancel={event => { event.preventDefault(); onClose(); }}>
    <header className="screen-image-header"><strong>{title}</strong><button type="button" onClick={onClose} aria-label={ja ? '閉じる' : 'Close image'}><X size={24} /></button></header>
    <div ref={viewport} className="screen-image-viewport" tabIndex={0} role="region"
      aria-label={`${title} — ${ja ? '拡大画像をスクロールして確認' : 'Scroll to explore the enlarged image'}`}>
      <div className="screen-image-canvas" style={{ width: `${zoom * 100}%`, height: `${zoom * 100}%` }}>
        <img src={src} alt={title} className="foundations-screen-area__image" loading="lazy" />
      </div>
    </div>
    <div className="screen-image-controls" role="group" aria-label={`${title} ${ja ? '画像の拡大縮小' : 'image zoom'}`}>
      <button type="button" aria-label={ja ? '縮小' : 'Zoom out'} disabled={zoom === 1} onClick={() => setZoom(value => Math.max(1, value - 0.5))}><ZoomOut size={18} /></button>
      <output aria-live="polite">{zoom * 100}%</output>
      <button type="button" aria-label={ja ? '拡大' : 'Zoom in'} disabled={zoom === 4} onClick={() => setZoom(value => Math.min(4, value + 0.5))}><ZoomIn size={18} /></button>
      <button type="button" aria-label={ja ? '拡大率をリセット' : 'Reset zoom'} onClick={() => {
        setZoom(1);
        if (viewport.current) { viewport.current.scrollTop = 0; viewport.current.scrollLeft = 0; }
      }}><RotateCcw size={17} /></button>
    </div>
  </dialog>, document.body);
}

// Keep the image order explicitly supplied for the six cards.
const images = [menu, toolbar, working, input, message, tree];
export default function FoundationScreenAreas({ text }: { text: string }) {
  const areas = text.split('\n\n').map(block => {
    const [title, ...body] = block.split('\n');
    return { title: title.replace(/\*\*/g, ''), body: body.join('\n') };
  });
  return <ol className="foundations-screen-areas">
    {areas.map((area, index) => <li className="foundations-screen-area" key={area.title}>
      <div className="foundations-screen-area__text">
        <h5><span aria-hidden="true">{index + 1}</span>{area.title}</h5>
        <p>{area.body}</p>
      </div>
      <CardImage src={images[index]} title={area.title} />
    </li>)}
  </ol>;
}
