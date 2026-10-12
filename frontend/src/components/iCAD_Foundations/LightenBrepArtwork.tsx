import { useId } from 'react';
import ParasolidStepPreview from './ParasolidStepPreview';
export function LightenBrepSolidIcon({ title }: { title?: string }) {
  const gradId = useId();
  return (
    <svg className="foundation-single-command" viewBox="0 0 36 36" role="img" aria-label={title || 'B-Repソリッドの軽量化'}>
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#a3f7a4" />
          <stop offset="60%" stopColor="#5cd862" />
          <stop offset="100%" stopColor="#3ebd45" />
        </linearGradient>
      </defs>
      {/* 3D thickness skirt */}
      <path
        d="M3 18 L12 24 C17 18 23 22 30 14 L30 18 C23 26 17 22 12 28 L3 22 Z"
        fill="#237a2c"
        stroke="#1a5e22"
        strokeWidth="0.8"
        strokeLinejoin="round"
      />
      {/* Top wavy surface */}
      <path
        d="M3 18 C4 12 11 12 16 10 L20 5 C23 8 26 11 30 12 L30 14 C25 20 17 18 12 24 Z"
        fill={`url(#${gradId})`}
        stroke="#1f6927"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      {/* Dark blue badge overlay at bottom right with white minus bar (-) */}
      <rect x="22" y="22" width="11" height="11" rx="1" fill="#142e4e" stroke="#0e1f35" strokeWidth="0.8" />
      <rect x="23" y="26" width="8" height="2.4" rx="0.5" fill="#ffffff" />
    </svg>
  );
}


export default function Artwork({step,japanese}:{step:number;japanese:boolean}) {
 return <ParasolidStepPreview kind="lighten" step={step} japanese={japanese} icon={<LightenBrepSolidIcon />} />;
}
