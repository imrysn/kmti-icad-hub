import menuScreen from '../../assets/icad-foundations/modeling/professional/move.png';
import { useId } from 'react';

export type OperationTopic = 'move' | 'copy' | 'rotate' | 'rotateCopy' | 'mirror' | 'mirrorCopy' | 'delete';
const selected: Record<OperationTopic, number> = {move:0,copy:1,delete:3,rotate:4,rotateCopy:5,mirror:6,mirrorCopy:7};

/** Preserve the actual iCAD symbols; only the command highlight is vector artwork. */
export default function OperationMenuSvg({topic}:{topic:OperationTopic}) {
  const clipId=useId();
  const cell=selected[topic];
  const x=2+(cell%4)*32;
  const y=22+Math.floor(cell/4)*32;
  return <svg className="foundation-operation-menu" viewBox="0 0 134 185" role="img" aria-label={`Move, Copy, Delete menu — ${topic}`}>
    <defs><clipPath id={clipId}><rect width="134" height="185"/></clipPath></defs>
    <g clipPath={`url(#${clipId})`}>
      <image href={menuScreen} x="-1748" y="-398" width="1920" height="1080"/>
    </g>
    <rect x={x} y={y} width="32" height="32" fill="none" stroke="#0087ef" strokeWidth="2"/>
  </svg>;
}
