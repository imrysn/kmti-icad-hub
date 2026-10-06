import { useEffect, useLayoutEffect, useRef, useState, type ReactNode, type RefObject } from 'react';
import { createPortal } from 'react-dom';
import { LocateFixed, X } from 'lucide-react';
import InterfaceSvgIcon from './InterfaceSvgIcon';
import interfaceImage from '../../assets/icad-foundations/interface/icad-interface.jpg';
import { interfaceIconRegion, regionStyle } from './interfaceIconLocations';
import '../LessonModalTheme.css';

// Share requests across cards that point at the same interface capture.
const previewImages = new Map<string, HTMLImageElement>();
function preloadPreview(src: string) {
  if (previewImages.has(src)) return;
  const image = new Image();
  image.decoding = 'async';
  previewImages.set(src, image);
  image.onerror = () => previewImages.delete(src);
  image.src = src;
}

export interface CustomIconPreview {
  artwork: ReactNode;
  /** Present lesson artwork without revealing its source capture. */
  artworkOnly?: boolean;
  autoLocate?: boolean;
  screenOverlay?: ReactNode;
  screen: string;
  /** Keep cropped captures at their native size and aspect ratio. */
  screenSize?: [number, number];
  /** Fit full interface captures to the viewport rather than capping their native size. */
  screenFit?: 'viewport' | 'comfortable';
  region: ReturnType<typeof interfaceIconRegion>;
  highlightColor?: string;
}
export default function InterfaceIconPreview({index,toolbar,title,japanese,custom}: {index:number;toolbar:boolean;title:string;japanese:boolean;custom?:CustomIconPreview}) {
  const [open,setOpen]=useState(false);
  const trigger=useRef<HTMLButtonElement>(null);
  const screen=custom?.screen ?? interfaceImage;
  const warmPreview=()=>{if(!custom?.artworkOnly) preloadPreview(screen);};
  useEffect(()=>{
    if(custom?.artworkOnly || !trigger.current) return;
    if(!window.IntersectionObserver) {preloadPreview(screen);return;}
    const observer=new IntersectionObserver(entries=>{
      if(entries.some(entry=>entry.isIntersecting)) {
        preloadPreview(screen);
        observer.disconnect();
      }
    },{rootMargin:'200px'});
    observer.observe(trigger.current);
    return ()=>observer.disconnect();
  },[screen,custom?.artworkOnly]);
  const modal=useRef<HTMLDialogElement>(null);
  const active=useRef(false);
  const ownsFullscreen=useRef(false);
  const leaveFullscreen=()=>{
    if(!ownsFullscreen.current) return;
    ownsFullscreen.current=false;
    if(document.fullscreenElement===document.documentElement) void document.exitFullscreen?.().catch(()=>{});
  };
  const closePreview=()=>{
    active.current=false;
    setOpen(false);
    leaveFullscreen();
  };
  const openPreview=()=>{
    warmPreview();
    active.current=true;
    setOpen(true);
    // Request from the click itself: browsers require a user gesture for real fullscreen.
    if(!document.fullscreenElement && document.documentElement.requestFullscreen) {
      void document.documentElement.requestFullscreen().then(()=>{
        ownsFullscreen.current=true;
        if(!active.current) leaveFullscreen();
        else if(modal.current?.open) {
          // Fullscreen moves the app to the top layer; put the modal above it again.
          modal.current.close();
          modal.current.showModal();
        }
      }).catch(()=>{}); // The full-window dialog remains usable if fullscreen is unavailable.
    }
  };
  useEffect(()=>{
    const onFullscreenChange=()=>{
      if(ownsFullscreen.current && !document.fullscreenElement) {
        ownsFullscreen.current=false;
        active.current=false;
        setOpen(false);
      }
    };
    document.addEventListener('fullscreenchange',onFullscreenChange);
    return ()=>{
      active.current=false;
      document.removeEventListener('fullscreenchange',onFullscreenChange);
      leaveFullscreen();
    };
  },[]);
  return <>
    <button ref={trigger} type="button" className="foundation-interface-icon-button" onPointerEnter={warmPreview} onFocus={warmPreview} onClick={openPreview} title={japanese?'クリックして拡大表示':'Click to enlarge'} aria-label={`${japanese?'拡大表示':'Enlarge'}: ${title}`}>
      {custom?.artwork ?? <InterfaceSvgIcon index={index} toolbar={toolbar} title={title}/>}
    </button>
    {open && <ExpandedIcon dialog={modal} index={index} toolbar={toolbar} title={title} japanese={japanese} onClose={closePreview} custom={custom}/>}
  </>;
}

function ExpandedIcon({dialog,index,toolbar,title,japanese,onClose,custom}: {custom?:CustomIconPreview;dialog:RefObject<HTMLDialogElement>;index:number;toolbar:boolean;title:string;japanese:boolean;onClose:()=>void}) {
  const enlargedIcon=useRef<HTMLDivElement>(null);
  const movingIcon=useRef<HTMLDivElement>(null);
  const stage=useRef<HTMLDivElement>(null);
  const startRect=useRef<DOMRect | null>(null);
  const [phase,setPhase]=useState<'enlarged'|'moving'|'located'>('enlarged');
  const [imageReady,setImageReady]=useState(false);
  const [imageFailed,setImageFailed]=useState(false);
  const screenImage=useRef<HTMLImageElement>(null);
  useLayoutEffect(()=>{
    // Cached images can finish before React attaches its load handler.
    if(screenImage.current?.complete && screenImage.current.naturalWidth>0) setImageReady(true);
  },[]);
  const region=custom?.region ?? interfaceIconRegion(index,toolbar);
  const atLocation=phase!=='enlarged';
  useEffect(()=>{
    if(atLocation) dialog.current?.focus({preventScroll:true});
  },[atLocation]);
  const beginLocation=()=>{
    startRect.current=enlargedIcon.current?.getBoundingClientRect() ?? null;
    setPhase(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches?'located':'moving');
  };
  useLayoutEffect(()=>{
    if(phase!=='moving' || !startRect.current || !movingIcon.current || !stage.current) return;
    const start=startRect.current;
    const frame=stage.current.getBoundingClientRect();
    const end=movingIcon.current.getBoundingClientRect();
    const animation=movingIcon.current.animate?.([
      {left:`${start.left-frame.left}px`,top:`${start.top-frame.top}px`,width:`${start.width}px`,height:`${start.height}px`},
      {left:`${end.left-frame.left}px`,top:`${end.top-frame.top}px`,width:`${end.width}px`,height:`${end.height}px`},
    ],{duration:1000,easing:'cubic-bezier(.4,0,.2,1)'});
    return ()=>animation?.cancel();
  },[phase]);
  useEffect(()=>{
    if(custom?.artworkOnly || (custom?.autoLocate === false && phase === 'enlarged') || !imageReady || phase==='located') return;
    if(custom?.screenFit==='comfortable' || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setPhase('located');
      return;
    }
    const timer=window.setTimeout(()=>{
      if(phase==='enlarged') beginLocation();
      else setPhase('located');
    },1000);
    return ()=>window.clearTimeout(timer);
  },[phase,imageReady,custom?.artworkOnly,custom?.autoLocate,custom?.screenFit]);
  useEffect(()=>{
    const node=dialog.current!;
    const overflow=document.body.style.overflow;
    document.body.style.overflow='hidden';
    node.showModal();
    return ()=>{node.close();document.body.style.overflow=overflow;};
  },[]);
  return createPortal(<dialog ref={dialog} className="foundation-interface-icon-dialog" data-phase={phase} aria-label={title} onCancel={event=>{event.preventDefault();onClose();}} onClick={atLocation?onClose:undefined} tabIndex={-1}>
    {!custom?.artworkOnly && <div ref={stage} className="foundation-interface-icon-dialog__stage" data-phase={phase} style={custom?.screenSize ? {
      width:custom.screenFit === 'viewport'
        ? '100vw'
        : custom.screenFit === 'comfortable' ? `min(760px, 82vw, calc(60dvh * ${custom.screenSize[0]} / ${custom.screenSize[1]}))`
        : `min(${custom.screenSize[0]}px, calc(100vw - 32px), calc((100dvh - 32px) * ${custom.screenSize[0]} / ${custom.screenSize[1]}))`,
      maxWidth:custom.screenFit === 'viewport' ? `${100 * custom.screenSize[0] / custom.screenSize[1]}dvh` : undefined,
      height:'auto', aspectRatio:`${custom.screenSize[0]} / ${custom.screenSize[1]}`,
    } : undefined}>
      <img ref={screenImage} className="foundation-interface-icon-dialog__screen" decoding="async" loading="eager" src={custom?.screen ?? interfaceImage} alt={japanese?'iCAD SX の画面全体':'Full iCAD SX interface'} onLoad={()=>setImageReady(true)} onError={()=>setImageFailed(true)}/>
      {phase==='located' && custom?.screenOverlay && <svg viewBox="0 0 1920 1080" preserveAspectRatio="none" style={{overflow:'visible',position:'absolute',inset:0,width:'100%',height:'100%',pointerEvents:'none'}} role="img" aria-label={japanese ? '操作上の注記' : 'Instructional notes'}>{custom.screenOverlay}</svg>}
      <div ref={movingIcon} className="foundation-interface-icon-dialog__moving-icon" style={regionStyle(region.landing)} aria-hidden="true">
        {custom?.artwork ?? <InterfaceSvgIcon index={index} toolbar={toolbar} title={title} expanded/>}
      </div>
      <div className="foundation-interface-icon-dialog__location" style={{...regionStyle(region.bounds), ...(custom?.highlightColor ? {borderColor:custom.highlightColor} : {})}} aria-hidden="true"/>
    </div>}
    {atLocation ? <p className="foundation-interface-fullscreen-hint">{japanese?'画面をクリックするか Esc キーを押すと閉じます。':'Click anywhere or press Esc to close.'}</p> : <div className={`foundation-interface-preview-panel lesson-modal-surface${custom?.artworkOnly ? ' foundation-interface-preview-panel--artwork' : ''}`}>
    <header>
      <p className="foundation-interface-preview-eyebrow">{custom?.artworkOnly ? (japanese?'拡大表示':'Image preview') : (japanese?'アイコンの確認':'Icon preview')}</p>
      <h3>{title}</h3>
      <button type="button" onClick={onClose} aria-label={japanese?'閉じる':'Close enlarged icon'}><X size={24}/></button>
    </header>
    <div ref={enlargedIcon} className="foundation-interface-preview-artwork">{custom?.artwork ?? <InterfaceSvgIcon index={index} toolbar={toolbar} title={title} expanded/>}</div>
    {!custom?.artworkOnly && <footer>
      <p className={`foundation-interface-preview-status${imageFailed?' is-error':''}`} role="status">{imageFailed
        ? (japanese?'画面画像を読み込めませんでした。拡大アイコンをご確認ください。':'The interface image could not load. You can still view the enlarged icon.')
          : !imageReady ? (japanese?'画像を読み込み中…':'Loading image…')
          : (japanese?'拡大アイコンを確認すると、画面上の位置が表示されます。':'Take a closer look, then watch where it belongs.')}</p>
      <button className="lesson-modal-primary-button" type="button" disabled={!imageReady} onClick={beginLocation}>
        <LocateFixed size={17}/>
        {japanese?'画面上の位置を表示':'Show location'}
      </button>
    </footer>}
    </div>}
  </dialog>,document.body);
}
