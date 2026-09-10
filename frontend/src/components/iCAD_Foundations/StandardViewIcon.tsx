import { useId } from 'react';

/** Vector redraw of the six shaded-face cubes and two face-selection symbols. */
export default function StandardViewIcon({ index }: { index: number }) {
  const id = useId().replace(/:/g, '');
  const faces = [
    '14,30 30,14 66,14 50,30', // Top
    '14,30 50,30 50,66 14,66', // Front
    '50,30 66,14 66,50 50,66', // Right
    '14,30 30,14 30,50 14,66', // Left
    '30,14 66,14 66,50 30,50', // Back
    '14,66 30,50 66,50 50,66', // Bottom
  ];
  return <svg viewBox="0 0 80 80" className="foundation-view-cube" aria-hidden="true">
    <defs>
      <linearGradient id={`${id}-face`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#879cc9" /><stop offset="0.42" stopColor="#465887" />
        <stop offset="0.7" stopColor="#263a69" /><stop offset="1" stopColor="#596d9d" />
      </linearGradient>
      <linearGradient id={`${id}-edge`} x1="0" y1="0" x2="1" y2="1">
        <stop stopColor="#d5e4ef" /><stop offset="1" stopColor="#829cb8" />
      </linearGradient>
      <radialGradient id={`${id}-point`} cx="30%" cy="25%" r="75%">
        <stop stopColor="#ffb5a4" /><stop offset="0.45" stopColor="#f43720" /><stop offset="1" stopColor="#c70e0a" />
      </radialGradient>
    </defs>
    {index < 6 ? <g strokeLinejoin="round">
      <path d="M14 30L30 14H66V50L50 66H14Z" fill="#edf2f5" fillOpacity="0.45" />
      <path d="M30 14V50H66M30 50L14 66" fill="none" stroke="#b2c6cc" strokeWidth="2" />
      <polygon points={faces[index]} fill={`url(#${id}-face)`} stroke="#60749a" strokeWidth="1.5" />
      <path d="M14 30L30 14H66V50L50 66H14V30H50L66 14M50 30V66" fill="none" stroke={`url(#${id}-edge)`} strokeWidth="2.5" />
      <path d="M16 31L31 16H64" fill="none" stroke="#f1f7ff" strokeOpacity="0.65" strokeWidth="1" />
    </g> : <g strokeLinejoin="round">
      <path d="M13 56L29 19L65 28V37L53 68L13 62Z" fill="#dbe4ef" stroke="#657790" strokeWidth="2" />
      <path d="M13 56L29 16L65 26L51 61Z" fill={`url(#${id}-face)`} stroke="#5b6b8c" strokeWidth="2" />
      <path d="M15 59L51 65L63 36" fill="none" stroke="#f6f8fd" strokeWidth="3" />
      {index === 7 && [[29,16],[65,26],[51,61]].map(([cx,cy]) =>
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="6.5" fill={`url(#${id}-point)`} stroke="#fff0e3" strokeWidth="1.5" />)}
    </g>}
  </svg>;
}
