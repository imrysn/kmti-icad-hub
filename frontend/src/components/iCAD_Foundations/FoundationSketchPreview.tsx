import { useId } from 'react';
import InterfaceIconPreview from './InterfaceIconPreview';
import screen from '../../assets/icad-foundations/modeling/professional/sketch.png';
import SketchMenuSvg from './SketchMenuSvg';

const regions: [number,number,number,number][] = [
  [1748,188,171,55],
  [1751,209,31,33],
  [782,398,518,404],
];

export default function FoundationSketchPreview({index,title,japanese}: {index:number;title:string;japanese:boolean}) {
  const clipId=useId();
  const region=regions[index];
  const artwork=index<2 ? <SketchMenuSvg title={title} lineOnly={index===1}/> : <svg className="foundation-operation-thumbnail" viewBox="0 0 518 404" role="img" aria-label={title}>
    <defs><linearGradient id={clipId} x2="0" y2="1"><stop stopColor="#ed7ecc"/><stop offset="1" stopColor="#c58aef"/></linearGradient></defs>
    <rect width="518" height="404" fill={`url(#${clipId})`}/>
    <path d="M16 137 388 16 502 338 341 388 278 204 62 272Z" fill="none" stroke="#373139" strokeWidth="1"/>
  </svg>;
  return <div className="foundation-file-menu-icon foundation-operation-preview">
    <InterfaceIconPreview index={index} toolbar={false} title={title} japanese={japanese}
      custom={{artwork,screen,region:{bounds:region,landing:region}}}/>
  </div>;
}
