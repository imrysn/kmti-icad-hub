import { useId } from 'react';
import { useFoundationVisuals } from './FoundationVisualContext';

export type PlacementShape = 'box' | 'cylinder' | 'polygon' | 'cone' | 'torus';

export default function FoundationShapePlacementIcon({ shape, title }: { shape: PlacementShape; title: string }) {
  const id = useId().replace(/:/g, '');
  const foundationVisuals = useFoundationVisuals();
  if (foundationVisuals) return (
    <svg viewBox="0 0 32 32" role="img" aria-label={title} className="foundation-shape-icon">
      <defs>
        <linearGradient id={`${id}-body`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#d5e0ed"/><stop offset=".48" stopColor="#b4c4da"/><stop offset="1" stopColor="#8e9fb9"/>
        </linearGradient>
        <linearGradient id={`${id}-top`} x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#edf4fb"/><stop offset="1" stopColor="#c2d1e5"/>
        </linearGradient>
        <linearGradient id={`${id}-side`} x1="0" y1="0" x2="1" y2="0">
          <stop stopColor="#bac9dd"/><stop offset="1" stopColor="#899bb6"/>
        </linearGradient>
      </defs>
      <g stroke="#6c788a" strokeWidth="1.15" strokeLinejoin="round">
        {shape === 'box' && <>
          <path d="M6 13 19 22 28 16V21L19 27 6 19Z" fill={`url(#${id}-body)`}/>
          <path d="M6 13 15 7 28 16 19 22Z" fill={`url(#${id}-top)`}/>
          <path d="M19 22V27" fill="none" stroke="#8a98ac"/>
          <path d="M7.5 13 15 8 26 15.7" fill="none" stroke="#e7eef6" strokeWidth=".65"/>
        </>}
        {shape === 'cylinder' && <>
          <path d="M8 10V24C8 30 24 30 24 24V10Z" fill={`url(#${id}-body)`}/>
          <ellipse cx="16" cy="10" rx="8" ry="4.4" fill={`url(#${id}-top)`}/>
          <path d="M9.5 9.5C11 5.8 21 5.8 22.5 9.5" fill="none" stroke="#f2f6fb" strokeWidth=".7"/>
          <path d="M9.2 15V23.5" fill="none" stroke="#d9e3ef" strokeWidth=".6"/>
        </>}
        {shape === 'polygon' && <>
          <path d="M9 9 15 6 21 7 25 11 24 25 17 28 10 25Z" fill={`url(#${id}-body)`}/>
          <path d="M9 9 15 6 21 7 25 11 18 14 10 12Z" fill={`url(#${id}-top)`}/>
          <path d="M18 14 25 11 24 25 17 28Z" fill={`url(#${id}-side)`} stroke="#8492a6" strokeWidth=".65"/>
          <path d="M10 12 10.8 24.5" fill="none" stroke="#dce5ef" strokeWidth=".7"/>
          <path d="M10 9.5 15 7 21 8" fill="none" stroke="#f0f5fa" strokeWidth=".65"/>
        </>}
        {shape === 'cone' && <>
          <path d="M12.4 7.8 8 23.5C6.2 29 25.8 29 24 23.5L19.6 7.8Z" fill={`url(#${id}-body)`}/>
          <ellipse cx="16" cy="7.8" rx="3.6" ry="2.8" fill={`url(#${id}-top)`} strokeWidth=".85"/>
          <path d="M12.2 11 8.9 23.5" fill="none" stroke="#dce6f1" strokeWidth=".75"/>
        </>}
        {shape === 'torus' && <>
          <path d="M19.3 5.5C13.4 7.1 9.2 12.5 9.2 18C9.2 23.1 12.5 27 17.4 28.1C19.2 28.6 21 26.9 20.7 25.1C20.5 23.8 18.3 22.5 17.3 21.4C15.5 19.5 15.8 17.1 17.3 15.1C18.4 13.6 20.7 12.7 21.2 11C21.7 9.4 21 6.8 19.3 5.5Z" fill={`url(#${id}-body)`}/>
          <path d="M19.3 5.5C17.7 6.4 17.9 9.9 21.2 11" fill="none" stroke="#8898ad" strokeWidth=".8"/>
          <path d="M17.4 28.1C15.9 26.5 17.4 23.7 19.2 23.7" fill="none" stroke="#8898ad" strokeWidth=".65"/>
          <path d="M16.2 8.4C10.5 12.8 9.6 20.5 14.8 24.6" fill="none" stroke="#dfe9f4" strokeWidth=".85"/>
        </>}
      </g>
    </svg>
  );

  return (
    <svg viewBox="0 0 32 32" role="img" aria-label={title} className="foundation-shape-icon">
      <defs>
        {/* Box gradients */}
        <linearGradient id={`${id}-box-top`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f2f7fc" />
          <stop offset="45%" stopColor="#c6dcf0" />
          <stop offset="100%" stopColor="#9dbede" />
        </linearGradient>
        <linearGradient id={`${id}-box-left`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7e9fc2" />
          <stop offset="100%" stopColor="#557599" />
        </linearGradient>
        <linearGradient id={`${id}-box-right`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9dc0e1" />
          <stop offset="100%" stopColor="#7396b9" />
        </linearGradient>

        {/* Cylinder gradients */}
        <linearGradient id={`${id}-cyl-body`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#6e8eae" />
          <stop offset="22%" stopColor="#b3d0ea" />
          <stop offset="45%" stopColor="#e8f3fc" />
          <stop offset="75%" stopColor="#a0c2e1" />
          <stop offset="100%" stopColor="#7595b4" />
        </linearGradient>
        <linearGradient id={`${id}-cyl-top`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f6fbff" />
          <stop offset="60%" stopColor="#cfe3f5" />
          <stop offset="100%" stopColor="#9ec0df" />
        </linearGradient>

        {/* Polygon gradients */}
        <linearGradient id={`${id}-poly-top`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f5faff" />
          <stop offset="50%" stopColor="#cee2f4" />
          <stop offset="100%" stopColor="#a1c3e3" />
        </linearGradient>
        <linearGradient id={`${id}-poly-left`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6a89ac" />
          <stop offset="100%" stopColor="#547293" />
        </linearGradient>
        <linearGradient id={`${id}-poly-mid`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#b8d5f0" />
          <stop offset="100%" stopColor="#86a9cb" />
        </linearGradient>
        <linearGradient id={`${id}-poly-right`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#89abca" />
          <stop offset="100%" stopColor="#6586a7" />
        </linearGradient>

        {/* Cone gradients */}
        <linearGradient id={`${id}-cone-body`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#6e8eae" />
          <stop offset="25%" stopColor="#b0cee9" />
          <stop offset="46%" stopColor="#e5f1fb" />
          <stop offset="75%" stopColor="#9ebfe0" />
          <stop offset="100%" stopColor="#7595b4" />
        </linearGradient>
        <linearGradient id={`${id}-cone-top`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f5faff" />
          <stop offset="100%" stopColor="#b8d4ed" />
        </linearGradient>

        {/* Torus gradients */}
        <linearGradient id={`${id}-torus-body`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#b3d1ed" />
          <stop offset="35%" stopColor="#e2f0fb" />
          <stop offset="70%" stopColor="#96badc" />
          <stop offset="100%" stopColor="#6787a9" />
        </linearGradient>
        <linearGradient id={`${id}-torus-cap`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#eaf4fd" />
          <stop offset="100%" stopColor="#97bada" />
        </linearGradient>
      </defs>

      {shape === 'box' && (
        <g stroke="#485c72" strokeWidth="1.1" strokeLinejoin="round">
          <polygon points="4.5,13.5 15.5,23.5 15.5,29.5 4.5,19.5" fill={`url(#${id}-box-left)`} />
          <polygon points="15.5,23.5 27.5,14.5 27.5,20.5 15.5,29.5" fill={`url(#${id}-box-right)`} />
          <polygon points="15.5,4.5 27.5,14.5 15.5,23.5 4.5,13.5" fill={`url(#${id}-box-top)`} />
          <path d="M5.5,13.5 L15.5,5.5 L26.5,14.5" fill="none" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.65" />
        </g>
      )}

      {shape === 'cylinder' && (
        <g stroke="#485c72" strokeWidth="1.1" strokeLinejoin="round">
          <path d="M7.5,9.5 V22.5 A8.5,4.5 0 0,0 24.5,22.5 V9.5 Z" fill={`url(#${id}-cyl-body)`} />
          <ellipse cx="16" cy="9.5" rx="8.5" ry="4.5" fill={`url(#${id}-cyl-top)`} />
          <ellipse cx="16" cy="9.5" rx="7.7" ry="3.8" fill="none" stroke="#ffffff" strokeWidth="0.7" strokeOpacity="0.6" />
        </g>
      )}

      {shape === 'polygon' && (
        <g stroke="#485c72" strokeWidth="1.1" strokeLinejoin="round">
          <polygon points="6.5,12.5 10.5,16.5 10.5,27.5 6.5,23.5" fill={`url(#${id}-poly-left)`} />
          <polygon points="10.5,16.5 21.5,16.5 21.5,27.5 10.5,27.5" fill={`url(#${id}-poly-mid)`} />
          <polygon points="21.5,16.5 25.5,12.5 25.5,23.5 21.5,27.5" fill={`url(#${id}-poly-right)`} />
          <polygon points="10.5,7.5 21.5,7.5 25.5,12.5 21.5,16.5 10.5,16.5 6.5,12.5" fill={`url(#${id}-poly-top)`} />
          <path d="M7.5,12.5 L11,8.3 L21,8.3" fill="none" stroke="#ffffff" strokeWidth="0.7" strokeOpacity="0.6" />
        </g>
      )}

      {shape === 'cone' && (
        <g stroke="#485c72" strokeWidth="1.1" strokeLinejoin="round">
          <path d="M11.8,8.5 L7.5,23.5 A8.5,4.5 0 0,0 24.5,23.5 L20.2,8.5 Z" fill={`url(#${id}-cone-body)`} />
          <ellipse cx="16" cy="8.5" rx="4.2" ry="2.2" fill={`url(#${id}-cone-top)`} />
          <ellipse cx="16" cy="8.5" rx="3.5" ry="1.7" fill="none" stroke="#ffffff" strokeWidth="0.6" strokeOpacity="0.6" />
        </g>
      )}

      {shape === 'torus' && (
        <g stroke="#485c72" strokeWidth="1.1" strokeLinejoin="round">
          <path d="M18,7.5 C11.5,9.5 9.5,16 11,18.5 C12,21 14,23.5 17.5,25.5 C19,25.5 20,24.5 19.5,23 C14.5,18 15,13 19.8,10 C19.5,8.5 18.8,7.5 18,7.5 Z" fill={`url(#${id}-torus-body)`} />
          <ellipse cx="19" cy="8.8" rx="2.3" ry="1.5" transform="rotate(-30 19 8.8)" fill={`url(#${id}-torus-cap)`} />
          <ellipse cx="18.2" cy="24.2" rx="2.4" ry="1.5" transform="rotate(35 18.2 24.2)" fill={`url(#${id}-torus-cap)`} />
        </g>
      )}
    </svg>
  );
}
