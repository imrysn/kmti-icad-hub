import { useFoundationVisuals } from './FoundationVisualContext';
import { useId } from 'react';

export type OperationCommand =
  | 'move'
  | 'copy'
  | 'rotate'
  | 'rotateCopy'
  | 'mirror'
  | 'mirrorCopy'
  | 'delete'
  | 'resize';

export default function FoundationOperationCommandIcon({
  command,
  title,
  className = '',
}: {
  command: OperationCommand;
  title?: string;
  className?: string;
}) {
  const id = useId().replace(/:/g, '');
  const foundation = useFoundationVisuals();
  if (foundation && (command === 'mirror' || command === 'mirrorCopy')) return (
    <svg viewBox="0 0 32 32" preserveAspectRatio="xMidYMid meet" role="img" aria-label={title || command}
      className={`foundation-operation-command-icon foundation-operation-menu ${className}`.trim()}>
      <defs>
        <linearGradient id={`${id}-mirror-badge`} x2="0" y2="1"><stop stopColor="#80a9dd"/><stop offset="1" stopColor="#234a91"/></linearGradient>
      </defs>
      {/* Upright reflected faces, matching the supplied iCAD command rather than a cube. */}
      <g fill="none" stroke="#858c98" strokeWidth="1" strokeLinejoin="round" strokeDasharray="1.5 1.5">
        <path d="m13 5-8 5v10l8 5Z"/>
        <path d="m5 10 8 7V5"/>
      </g>
      <path d="M16 3v23" fill="none" stroke="#7c8088" strokeWidth="1.5"/>
      <path d="m19 4 8 6v10l-8 5Z" fill="#a4a7ac" stroke="#7b8089" strokeWidth="1" strokeLinejoin="round"/>
      <path d="m19 4 8 6-8 8Z" fill="#fafafa" stroke="#7b8089" strokeWidth=".8" strokeLinejoin="round"/>
      {/* The reference sweeps from the left underneath the faces to an up-right head. */}
      <path d="M9 26C13 30 21 30 25 25" fill="none" stroke="#263c78" strokeWidth="2.4"/>
      <polygon points="28,22.5 27.5,28.5 21.5,25.5" fill="#263c78"/>
      {command==='mirrorCopy' && <g>
        <circle cx="25" cy="6" r="4.7" fill={`url(#${id}-mirror-badge)`} stroke="#26477e" strokeWidth=".8"/>
        <path d="M22 6h6M25 3v6" stroke="white" strokeWidth="1.25"/>
      </g>}
    </svg>
  );

  return (
    <svg
      viewBox="0 0 32 32"
      role="img"
      aria-label={title || command}
      className={`foundation-operation-command-icon foundation-operation-menu ${className}`.trim()}
    >
      <defs>
        {/* Shading gradients for the 3D isometric cube */}
        <linearGradient id={`${id}-cube-top`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#dde3e9" />
        </linearGradient>
        <linearGradient id={`${id}-cube-left`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#eaeff3" />
          <stop offset="100%" stopColor="#c2cbd5" />
        </linearGradient>
        <linearGradient id={`${id}-cube-right`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#b0bcc8" />
          <stop offset="100%" stopColor="#8c99a7" />
        </linearGradient>

        {/* Copy / plus badge gradient */}
        <linearGradient id={`${id}-badge-grad`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2e70cc" />
          <stop offset="100%" stopColor="#18458e" />
        </linearGradient>
      </defs>

      {/* F10.1 Move & F10.2 Copy */}
      {(command === 'move' || command === 'copy') && (
        <g>
          {/* 3D Cube */}
          <polygon
            points="16,5.5 23.5,9.5 16,13.5 8.5,9.5"
            fill={`url(#${id}-cube-top)`}
            stroke="#505c68"
            strokeWidth="0.9"
            strokeLinejoin="round"
          />
          <polygon
            points="8.5,9.5 16,13.5 16,21.5 8.5,17.5"
            fill={`url(#${id}-cube-left)`}
            stroke="#505c68"
            strokeWidth="0.9"
            strokeLinejoin="round"
          />
          <polygon
            points="16,13.5 23.5,9.5 23.5,17.5 16,21.5"
            fill={`url(#${id}-cube-right)`}
            stroke="#505c68"
            strokeWidth="0.9"
            strokeLinejoin="round"
          />
          {/* Horizontal Double Arrow */}
          <rect x="8.5" y="24.5" width="15" height="2" fill="#1d3b76" />
          <polygon
            points="4.5,25.5 9.5,22 9.5,29"
            fill="#1d3b76"
            stroke="#1d3b76"
            strokeWidth="0.5"
            strokeLinejoin="round"
          />
          <polygon
            points="27.5,25.5 22.5,22 22.5,29"
            fill="#1d3b76"
            stroke="#1d3b76"
            strokeWidth="0.5"
            strokeLinejoin="round"
          />
          {/* Plus Badge for Copy */}
          {command === 'copy' && (
            <g>
              <circle
                cx="24"
                cy="8"
                r="4.5"
                fill={`url(#${id}-badge-grad)`}
                stroke="#163d80"
                strokeWidth="0.8"
              />
              <path
                d="M22,8 h4 M24,6 v4"
                stroke="#ffffff"
                strokeWidth="1.5"
                strokeLinecap="square"
              />
            </g>
          )}
        </g>
      )}

      {/* F10.3 Rotate & F10.4 Rotate Copy */}
      {(command === 'rotate' || command === 'rotateCopy') && (
        <g>
          {/* Circular Rotation Arrow */}
          <path
            d="M11,7 A10.5,10.5 0 1,1 6.5,19"
            fill="none"
            stroke="#1d3b76"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <polygon
            points="6.5,7 12,3.5 12,10.5"
            fill="#1d3b76"
            stroke="#1d3b76"
            strokeWidth="0.5"
            strokeLinejoin="round"
          />
          {/* Centered 3D Cube */}
          <polygon
            points="16,8.5 22.5,12 16,15.5 9.5,12"
            fill={`url(#${id}-cube-top)`}
            stroke="#505c68"
            strokeWidth="0.9"
            strokeLinejoin="round"
          />
          <polygon
            points="9.5,12 16,15.5 16,22.5 9.5,19"
            fill={`url(#${id}-cube-left)`}
            stroke="#505c68"
            strokeWidth="0.9"
            strokeLinejoin="round"
          />
          <polygon
            points="16,15.5 22.5,12 22.5,19 16,22.5"
            fill={`url(#${id}-cube-right)`}
            stroke="#505c68"
            strokeWidth="0.9"
            strokeLinejoin="round"
          />
          {/* Plus Badge for Rotate Copy */}
          {command === 'rotateCopy' && (
            <g>
              <circle
                cx="24"
                cy="8"
                r="4.5"
                fill={`url(#${id}-badge-grad)`}
                stroke="#163d80"
                strokeWidth="0.8"
              />
              <path
                d="M22,8 h4 M24,6 v4"
                stroke="#ffffff"
                strokeWidth="1.5"
                strokeLinecap="square"
              />
            </g>
          )}
        </g>
      )}

      {/* F10.5 Mirror & F10.6 Mirror Copy */}
      {(command === 'mirror' || command === 'mirrorCopy') && (
        <g>
          {/* Center Vertical Mirror Plane / Axis */}
          <line
            x1="16"
            y1="3"
            x2="16"
            y2="24"
            stroke="#75828f"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          {/* Left Side: Dashed Wireframe Half-Cube */}
          <polygon
            points="16,7.5 10,11 16,14.5"
            fill="none"
            stroke="#7e8b98"
            strokeWidth="1"
            strokeDasharray="1.5 1"
            strokeLinejoin="round"
          />
          <line
            x1="10"
            y1="11"
            x2="10"
            y2="18"
            stroke="#7e8b98"
            strokeWidth="1"
            strokeDasharray="1.5 1"
          />
          <line
            x1="10"
            y1="18"
            x2="16"
            y2="21.5"
            stroke="#7e8b98"
            strokeWidth="1"
            strokeDasharray="1.5 1"
          />
          <line
            x1="16"
            y1="14.5"
            x2="16"
            y2="21.5"
            stroke="#7e8b98"
            strokeWidth="1"
            strokeDasharray="1.5 1"
          />
          {/* Right Side: Solid Shaded Half-Cube */}
          <polygon
            points="16,7.5 22,11 16,14.5"
            fill={`url(#${id}-cube-top)`}
            stroke="#505c68"
            strokeWidth="0.9"
            strokeLinejoin="round"
          />
          <polygon
            points="16,14.5 22,11 22,18 16,21.5"
            fill={`url(#${id}-cube-right)`}
            stroke="#505c68"
            strokeWidth="0.9"
            strokeLinejoin="round"
          />
          {/* Curved Reflection Arrow Underneath */}
          <path
            d="M9.5,24.5 Q15.5,28 21.5,24"
            fill="none"
            stroke="#1d3b76"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <polygon
            points="24.5,22.5 20.5,21 21.5,25.5"
            fill="#1d3b76"
            stroke="#1d3b76"
            strokeWidth="0.5"
            strokeLinejoin="round"
          />
          {/* Plus Badge for Mirror Copy */}
          {command === 'mirrorCopy' && (
            <g>
              <circle
                cx="24"
                cy="8"
                r="4.5"
                fill={`url(#${id}-badge-grad)`}
                stroke="#163d80"
                strokeWidth="0.8"
              />
              <path
                d="M22,8 h4 M24,6 v4"
                stroke="#ffffff"
                strokeWidth="1.5"
                strokeLinecap="square"
              />
            </g>
          )}
        </g>
      )}

      {/* F10.7 Delete */}
      {command === 'delete' && (
        <polygon
          points="9.5,6 16,12.5 22.5,6 26,9.5 19.5,16 26,22.5 22.5,26 16,19.5 9.5,26 6,22.5 12.5,16 6,9.5"
          fill="#d80808"
          stroke="#940303"
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
      )}

      {/* F10.8 Resize */}
      {command === 'resize' && (
        <g>
          {/* Outer Expanded Cube (Translucent Mint-Green) */}
          <polygon
            points="16,4.5 25.5,9.5 16,14.5 6.5,9.5"
            fill="#c3ebda"
            fillOpacity="0.45"
            stroke="#687888"
            strokeWidth="0.9"
            strokeLinejoin="round"
          />
          <polygon
            points="6.5,9.5 16,14.5 16,24.5 6.5,19.5"
            fill="#b0e0cb"
            fillOpacity="0.4"
            stroke="#687888"
            strokeWidth="0.9"
            strokeLinejoin="round"
          />
          <polygon
            points="16,14.5 25.5,9.5 25.5,19.5 16,24.5"
            fill="#9cd2bb"
            fillOpacity="0.4"
            stroke="#687888"
            strokeWidth="0.9"
            strokeLinejoin="round"
          />
          {/* Inner Solid Green Cube (Original Solid) */}
          <polygon
            points="16,16 20.5,18.5 16,21 11.5,18.5"
            fill="#00e676"
            stroke="#005d28"
            strokeWidth="0.7"
            strokeLinejoin="round"
          />
          <polygon
            points="11.5,18.5 16,21 16,26 11.5,23.5"
            fill="#00b853"
            stroke="#005d28"
            strokeWidth="0.7"
            strokeLinejoin="round"
          />
          <polygon
            points="16,21 20.5,18.5 20.5,23.5 16,26"
            fill="#008f3f"
            stroke="#005d28"
            strokeWidth="0.7"
            strokeLinejoin="round"
          />
          {/* Vertical Expansion Arrow */}
          <line
            x1="16"
            y1="16"
            x2="16"
            y2="9.5"
            stroke="#064e23"
            strokeWidth="1.8"
            strokeLinecap="square"
          />
          <polygon
            points="16,5.5 13,10.5 19,10.5"
            fill="#064e23"
            stroke="#064e23"
            strokeWidth="0.4"
            strokeLinejoin="round"
          />
        </g>
      )}
    </svg>
  );
}
