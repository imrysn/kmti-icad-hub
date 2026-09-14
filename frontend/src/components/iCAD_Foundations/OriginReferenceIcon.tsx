import { useId } from 'react';

/** Isometric reference redrawn with the original plate and cylinder proportions. */
export default function OriginReferenceIcon() {
  const id=useId();
  return <svg viewBox="0 0 165 220" role="img" aria-label="3D part with highlighted origin">
    <defs>
      <linearGradient id={`${id}-cylinder`} x1="0.2" y1="0.1" x2="0.8" y2="0.9">
        <stop stopColor="#fff"/><stop offset=".5" stopColor="#fdfdfd"/><stop offset="1" stopColor="#a7a7a7"/>
      </linearGradient>
      <linearGradient id={`${id}-bore`} x2="1" y2="1"><stop stopColor="#109619"/><stop offset="1" stopColor="#25e83b"/></linearGradient>
    </defs>
    <path d="M74 22 85 15 157 64 147 71Z" fill="#fff" stroke="#929292" strokeWidth=".7"/>
    <path d="M147 71 157 64 157 196 147 203Z" fill="#f4f4f4" stroke="#929292" strokeWidth=".7"/>
    <path d="M74 22 147 71 147 203 74 154Z" fill="#aaa" stroke="#8c8c8c" strokeWidth=".8"/>
    <g fill="#fff" stroke="#888" strokeWidth=".7">
      <ellipse cx="85" cy="46" rx="4.6" ry="8.5" transform="rotate(-22 85 46)"/>
      <ellipse cx="133" cy="79" rx="4.6" ry="8.5" transform="rotate(-22 133 79)"/>
      <ellipse cx="133" cy="177" rx="4.6" ry="8.5" transform="rotate(-22 133 177)"/>
    </g>
    <path d="M17 131 99 79C109 71 121 82 129 98C138 118 135 135 127 142L42 201Z" fill={`url(#${id}-cylinder)`} stroke="#999" strokeWidth=".7"/>
    <ellipse cx="29" cy="167" rx="19" ry="37" transform="rotate(-20 29 167)" fill="#aaa" stroke="#777" strokeWidth=".8"/>
    <ellipse cx="29" cy="167" rx="10" ry="19" transform="rotate(-20 29 167)" fill={`url(#${id}-bore)`} stroke="#128d1a" strokeWidth=".6"/>
    <g strokeWidth="1.8" strokeLinecap="round">
      <path d="M110 180V163" stroke="#2022cf"/><path d="m110 159-2 5h4Z" fill="#2022cf" stroke="none"/>
      <path d="m110 180 14 10" stroke="#ef2525"/><path d="m127 192-5-1 2-3Z" fill="#ef2525" stroke="none"/>
      <path d="m110 180-12 8" stroke="#eedb00"/><path d="m94 191 3-5 2 3Z" fill="#eedb00" stroke="none"/>
    </g>
    <rect x="92" y="158" width="35" height="38" fill="none" stroke="#ff1616" strokeWidth="1.8"/>
  </svg>;
}
