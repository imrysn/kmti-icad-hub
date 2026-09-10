import { useId } from 'react';

/** Vector redraw of the mounted cylindrical part and its origin marker. */
export default function CurrentOriginIcon({ markOrigin = false, markXAxis = false, markYAxis = false, newOrigin = false }: { markOrigin?: boolean; markXAxis?: boolean; markYAxis?: boolean; newOrigin?: boolean }) {
  const id = useId();
  if (markXAxis) return <svg className="foundation-current-origin-icon" width="144" height="144" viewBox="60 40 430 450" aria-hidden="true">
    <defs>
      <linearGradient id={`${id}-front-body`} x1="0" y1="0" x2="0.2" y2="1">
        <stop stopColor="#f5f5f5" /><stop offset="0.3" stopColor="#a4a4a2" /><stop offset="1" stopColor="#aaa" />
      </linearGradient>
      <linearGradient id={`${id}-front-hole`} x2="0" y2="1">
        <stop stopColor="#138e1b" /><stop offset="1" stopColor="#08d92a" />
      </linearGradient>
    </defs>
    <path d="M75 113 87 113 153 480 141 477Z" fill="#aaa9a6" />
    <path d="M87 113 344 54 416 422 153 480Z" fill="#fafafa" stroke="#a5abb2" strokeWidth="2" />
    <g fill="#aaa9a6" stroke="#d2d2d2" strokeWidth="3">
      <ellipse cx="129" cy="141" rx="13" ry="18" />
      <ellipse cx="320" cy="99" rx="13" ry="18" />
      <ellipse cx="185" cy="434" rx="13" ry="18" />
      <ellipse cx="374" cy="391" rx="13" ry="18" />
    </g>
    <path d="M224 175C161 184 142 308 194 350L374 376 385 190Z" fill={`url(#${id}-front-body)`} />
    <ellipse cx="383" cy="283" rx="87" ry="94" fill="#fafafa" stroke="#a5abb2" strokeWidth="2" />
    <path d="M374 237 396 240 416 255 425 273 424 297 411 318 391 329 369 326 350 313 340 293 340 271 353 249Z" fill={`url(#${id}-front-hole)`} />
    <g strokeWidth="6" strokeLinejoin="round">
      <path d="m284 451-10-55" stroke="#2520c5" /><path d="m274 385-4 18 11-2Z" fill="#2520c5" />
      <path d="m284 451 47-11" stroke="#ed3032" /><path d="m344 437-17-3 2 12Z" fill="#ed3032" />
      <path d="m284 451 18 4" stroke="#f2d500" />
    </g>
    <circle cx="416" cy="422" r="18" fill="#ff1616" stroke="#fff" strokeWidth="5" />
  </svg>;
  return <svg className="foundation-current-origin-icon" width="144" height="144" viewBox="50 75 395 395" aria-hidden="true">
    <defs>
      <linearGradient id={`${id}-body`} x1="0.7" y1="0.2" x2="0.25" y2="0.8" gradientUnits="objectBoundingBox">
        <stop stopColor="#ffffff" /><stop offset="0.42" stopColor="#eeeeee" /><stop offset="0.75" stopColor="#a4a4a2" />
      </linearGradient>
      <linearGradient id={`${id}-hole`} x2="0.7" y2="1">
        <stop stopColor="#a4a4a2" /><stop offset="1" stopColor="#ffffff" />
      </linearGradient>
      <linearGradient id={`${id}-green`} x2="0.25" y2="1">
        <stop stopColor="#128e19" /><stop offset="1" stopColor="#09e331" />
      </linearGradient>
    </defs>
    <path d="M67 181 226 88 247 100 88 193Z" fill="#fff" />
    <path d="M67 181 88 193 88 438 67 425Z" fill="#aaa9a6" />
    <path d="M88 193 247 100 247 345 88 438Z" fill="#e3e3e3" stroke="#a5abb2" strokeWidth="2" />
    <g fill={`url(#${id}-hole)`}>
      <ellipse cx="109" cy="204" rx="9" ry="15" transform="rotate(28 109 204)" />
      <ellipse cx="226" cy="137" rx="9" ry="15" transform="rotate(28 226 137)" />
      <ellipse cx="109" cy="401" rx="9" ry="15" transform="rotate(28 109 401)" />
    </g>
    <g strokeWidth="6" strokeLinejoin="round" transform={newOrigin ? 'translate(-80 45)' : undefined}>
      <path d="M168 393V345" stroke="#2520c5" /><path d="m168 393 39-23" stroke="#ed3032" />
      {newOrigin && <><path d="m168 337-6 15h12Z" fill="#2520c5" /><path d="m214 366-15 2 6 10Z" fill="#ed3032" /></>}
      <path d="m168 393 40 22" stroke="#f2e500" />
      <path d="m217 420-15-3 5-8Z" fill="#f2e500" />
    </g>
    <path d="M144 342C96 314 111 247 155 215Q181 193 206 206L410 326 351 450Z" fill={`url(#${id}-body)`} />
    <ellipse cx="380" cy="391" rx="47" ry="71" transform="rotate(25 380 391)" fill="#e5e5e3" stroke="#a5abb2" strokeWidth="2" />
    <ellipse cx="380" cy="391" rx="22" ry="35" transform="rotate(25 380 391)" fill={`url(#${id}-green)`} />
    {markOrigin && <circle cx="88" cy="438" r="18" fill="#ff1616" stroke="#fff" strokeWidth="5" />}
    {markYAxis && <circle cx="247" cy="100" r="18" fill="#ff1616" stroke="#fff" strokeWidth="5" />}
  </svg>;
}
