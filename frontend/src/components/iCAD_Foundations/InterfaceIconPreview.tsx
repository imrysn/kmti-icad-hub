import { useEffect, useLayoutEffect, useRef, useState, type ReactNode, type RefObject } from 'react';
import { createPortal } from 'react-dom';
import { LocateFixed, X } from 'lucide-react';
import InterfaceSvgIcon from './InterfaceSvgIcon';
import interfaceImage from '../../assets/icad-foundations/icadinterface.jpg';
import { interfaceIconRegion, regionStyle } from './interfaceIconLocations';
import '../LessonModalTheme.css';

export interface CustomIconPreview {
  artwork: ReactNode;
  screen: string;
  region: ReturnType<typeof interfaceIconRegion>;
  aspectRatio: number;
  highlightColor?: string;
}
export default function InterfaceIconPreview({index,toolbar,title,japanese,custom}: {index:number;toolbar:boolean;title:string;japanese:boolean;custom?:CustomIconPreview}) {
  const [open,setOpen]=useState(false);
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
    <button type="button" className="foundation-interface-icon-button" onClick={openPreview} title={japanese?'クリックして拡大表示':'Click to enlarge'} aria-label={`${japanese?'拡大表示':'Enlarge'}: ${title}`}>
      {custom?.artwork ?? <InterfaceSvgIcon index={index} toolbar={toolbar} title={title}/>}
    </button>
    {open && <ExpandedIcon dialog={modal} index={index} toolbar={toolbar} title={title} japanese={japanese} onClose={closePreview} custom={custom}/>}
  </>;
}

function ExpandedIcon({dialog,index,toolbar,title,japanese,onClose,custom}: {custom?:CustomIconPreview;dialog:RefObject<HTMLDialogElement>;index:number;toolbar:boolean;title:string;japanese:boolean;onClose:()=>void}) {
  const enlargedIcon=useRef<HTMLDivElement>(null);
  const fullscreenClose=useRef<HTMLButtonElement>(null);
  const movingIcon=useRef<HTMLDivElement>(null);
  const stage=useRef<HTMLDivElement>(null);
  const startRect=useRef<DOMRect | null>(null);
  const [phase,setPhase]=useState<'enlarged'|'moving'|'located'>('enlarged');
  const [imageReady,setImageReady]=useState(false);
  const [imageFailed,setImageFailed]=useState(false);
  const region=custom?.region ?? interfaceIconRegion(index,toolbar);
  const atLocation=phase!=='enlarged';
  useEffect(()=>{
    if(atLocation) fullscreenClose.current?.focus({preventScroll:true});
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
    if(!imageReady || phase==='located') return;
    const timer=window.setTimeout(()=>{
      if(phase==='enlarged') beginLocation();
      else setPhase('located');
    },1000);
    return ()=>window.clearTimeout(timer);
  },[phase,imageReady]);
  useEffect(()=>{
    const node=dialog.current!;
    const overflow=document.body.style.overflow;
    document.body.style.overflow='hidden';
    node.showModal();
    return ()=>{node.close();document.body.style.overflow=overflow;};
  },[]);
  return createPortal(<dialog ref={dialog} className="foundation-interface-icon-dialog" data-phase={phase} aria-label={title} onCancel={event=>{event.preventDefault();onClose();}}>
    <div ref={stage} className="foundation-interface-icon-dialog__stage" data-phase={phase} style={custom ? {aspectRatio:custom.aspectRatio,width:`min(100vw, calc(100dvh * ${custom.aspectRatio}))`,height:`min(100dvh, calc(100vw / ${custom.aspectRatio}))`} : undefined}>
      <img className="foundation-interface-icon-dialog__screen" src={custom?.screen ?? interfaceImage} alt={japanese?'iCAD SX の画面全体':'Full iCAD SX interface'} onLoad={()=>setImageReady(true)} onError={()=>setImageFailed(true)}/>
      <div ref={movingIcon} className="foundation-interface-icon-dialog__moving-icon" style={regionStyle(region.landing)} aria-hidden="true">
        {custom?.artwork ?? <InterfaceSvgIcon index={index} toolbar={toolbar} title={title} expanded/>}
      </div>
      <div className="foundation-interface-icon-dialog__location" style={{...regionStyle(region.bounds), ...(custom?.highlightColor ? {borderColor:custom.highlightColor} : {})}} aria-hidden="true"/>
    </div>
    {atLocation ? <button ref={fullscreenClose} className="foundation-interface-fullscreen-close" type="button" onClick={onClose} aria-label={japanese?'閉じる':'Close enlarged icon'}><X size={22}/></button> : <div className="foundation-interface-preview-panel lesson-modal-surface">
    <header>
      <p className="foundation-interface-preview-eyebrow">{japanese?'アイコンの確認':'Icon preview'}</p>
      <h3>{title}</h3>
      <button type="button" onClick={onClose} aria-label={japanese?'閉じる':'Close enlarged icon'}><X size={24}/></button>
    </header>
    <div ref={enlargedIcon} className="foundation-interface-preview-artwork">{custom?.artwork ?? <InterfaceSvgIcon index={index} toolbar={toolbar} title={title} expanded/>}</div>
    <footer>
      <p className={`foundation-interface-preview-status${imageFailed?' is-error':''}`} role="status">{imageFailed
        ? (japanese?'画面画像を読み込めませんでした。拡大アイコンをご確認ください。':'The interface image could not load. You can still view the enlarged icon.')
          : (japanese?'拡大アイコンを確認すると、画面上の位置が表示されます。':'Take a closer look, then watch where it belongs.')}</p>
      <button className="lesson-modal-primary-button" type="button" disabled={!imageReady} onClick={beginLocation}>
        <LocateFixed size={17}/>
        {japanese?'画面上の位置を表示':'Show location'}
      </button>
    </footer>
    </div>}
  </dialog>,document.body);
}
