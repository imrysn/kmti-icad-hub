import { useId, type CSSProperties } from 'react';

/** Toolbar groups traced from toolbar.jpg. Artwork stays native SVG at every scale. */
export default function ToolbarReferenceSvg({ index, title, overview = false, highlightFront = false, highlightUndo = false }: { index: number; title: string; overview?: boolean; highlightFront?: boolean; highlightUndo?: boolean }) {
  const id = useId().replace(/:/g, '');
  const paint = (name: string) => `url(#${id}-${name})`;
  const widths = [108, 84, 56, 160, 210, 104, 60, 128, 60, 84, 264, 184, 520];
  const width = widths[index] ?? 84;
  const ink = '#3f4d72';
  const cube = (x: number, face: number) => <g transform={`translate(${x} 6)`} stroke="#637992" strokeWidth=".75" strokeLinejoin="round">
    <path d="M1 6 7 0H21L15 6Z" fill={face === 0 ? paint('navy') : '#d9e5ed'} />
    <path d="M1 6H15V20H1Z" fill={face === 1 ? paint('navy') : '#cbdce7'} />
    <path d="M15 6 21 0V14L15 20Z" fill={face === 2 ? paint('navy') : '#a3b9cf'} />
    {face === 3 && <path d="M1 6 7 0V14L1 20Z" fill={paint('navy')} />}
    {face === 4 && <path d="M7 0H21V14H7Z" fill={paint('navy')} opacity=".8" />}
    {face === 5 && <path d="M1 20 7 14H21L15 20Z" fill={paint('navy')} />}
    <path d="M1 6H15V20 M15 6 21 0" fill="none" stroke="#f5faff" strokeWidth=".65" />
  </g>;
  const steppedSolid = (x: number, side: number) => <g transform={`translate(${x} 6)`} stroke="#335fac" strokeWidth=".7" strokeLinejoin="round">
    {side === 0 ? <><path d="M2 11 9 7V2L14 0 19 3V16L11 21 2 17Z" fill={paint('blue')} /><path d="M2 11 8 14 19 8 M8 14V20 M9 7 14 10" fill="none" stroke="#567abe" /></>
      : side === 1 ? <><path d="M4 5 10 1 18 4V20L12 22 4 17Z" fill={paint('blue')} /><path d="M4 5 12 9 18 4 M12 9V22" fill="none" stroke="#6f9aec" /></>
        : side === 2 ? <><path d="M3 3 8 0 14 3V8L19 10V17L11 21 3 17Z" fill={paint('blue')} /><path d="M3 3 9 6V20 M9 6 14 3 M14 8 9 11" fill="none" stroke="#79a6f3" /></>
          : <><path d="M3 3 8 0 14 3V10L20 13V20L14 22 3 16Z" fill={paint('blue')} /><path d="M3 3 9 6V13L20 18 M9 6 14 3" fill="none" stroke="#79a6f3" /></>}
  </g>;
  const cylinder = (x: number, mode: number) => <g transform={`translate(${x} 5)`} stroke={mode === 3 ? '#4998aa' : '#718b68'} strokeWidth=".75">
    <path d="M4 5V20C4 25 16 25 16 20V5" fill={mode === 0 ? '#eee' : mode === 1 ? paint('green') : mode === 2 ? '#71a354' : 'none'} />
    <ellipse cx="10" cy="5" rx="6" ry="3.5" fill={mode < 3 ? (mode === 0 ? '#f3f3ef' : '#9ccb7f') : 'none'} />
    {mode >= 3 && <><ellipse cx="10" cy="20" rx="6" ry="3.5" fill="none" /><ellipse cx="10" cy="13" rx="6" ry="3.5" fill="none" opacity=".55" /></>}
  </g>;
  const magnifier = (x: number, sign: string) => <g transform={`translate(${x} 5)`}>
    <path d="M8 14 2 22" stroke="#777e7c" strokeWidth="4" /><path d="M8 14 2 22" stroke="#bfc5c3" strokeWidth="1.5" />
    <circle cx="12" cy="9" r="7" fill={paint('lens')} stroke="#778483" strokeWidth="1.2" />
    {sign && <path d={sign === '+' ? 'M8 9H16 M12 5V13' : 'M8 9H16'} fill="none" stroke={ink} strokeWidth="1.7" />}
  </g>;
  const undoArrow = (x: number, mirrored = false) => <g transform={`translate(${x} 5) ${mirrored ? 'translate(22 0) scale(-1 1)' : ''}`}>
    <path d="M2 6 8 0V4C23 2 24 13 18 22C19 12 14 10 8 11V16Z" fill={paint('navy')} stroke="#677791" strokeWidth=".65" />
  </g>;
  const field = (x: number, y: number, w: number, value = '') => <g>
    <rect x={x} y={y} width={w} height="12" fill="#fff" stroke="#8a8a88" strokeWidth=".7" />
    {value && <text x={x + 3} y={y + 9.5}>{value}</text>}
    <path d={`M${x + w - 8} ${y + 4.5} ${x + w - 5.5} ${y + 7} ${x + w - 3} ${y + 4.5}`} fill="none" stroke="#555" strokeWidth=".8" />
  </g>;
  const checkbox = (x: number, y: number) => <g>
    <rect x={x} y={y + 1.5} width="9" height="9" fill="#fff" stroke="#555" strokeWidth=".7" />
    <path d={`M${x + 1.8} ${y + 6} ${x + 4} ${y + 8.5} ${x + 7.8} ${y + 3.3}`} fill="none" stroke="#222" strokeWidth="1.3" />
  </g>;
  if (overview) {
    const rows = [[1, 0, 2, 8, 6, 5, 3, 4, 7, 11], [9, 12]];
    return <svg className="foundation-native-interface-icon" viewBox="0 0 1254 98" role="img" aria-label={title}>
      <rect width="1254" height="98" fill="#eee" stroke="#bcbcb8" />
      {rows.map((row, r) => row.map((group, n) => <svg key={`${r}-${group}`} x={row.slice(0, n).reduce((sum, item) => sum + widths[item], 0)} y={r * 34} width={widths[group]} height="34" viewBox={`0 0 ${widths[group]} 34`}>
        <ToolbarReferenceSvg index={group} title={title} />
      </svg>))}
      <path d="M0 68H1254" stroke="#a3a3a0" />
      <g fontSize="13" fontFamily="'MS UI Gothic', 'Yu Gothic', sans-serif" fill="#262626" className="notranslate">
        <text x="4" y="87">線種</text><rect x="38" y="74" width="50" height="16" fill="#858583" /><path d="M43 81H81" stroke="white" strokeWidth="2" /><text x="92" y="87">⌄　線色　□　レイヤ　1　⌄　グリッド　0.0　⌄　尺度　1/1　⌄　中心マーク　パーツ　⌄　☑ ナビ　☑ クロス</text>
      </g>
    </svg>;
  }
  return <svg className="foundation-native-interface-icon foundation-toolbar-group-icon" style={{'--toolbar-aspect':width / 34} as CSSProperties} viewBox={`0 0 ${width} 34`} role="img" aria-label={title}>
    <defs>
      <linearGradient id={`${id}-navy`} x1="0" y1="0" x2="0" y2="1"><stop stopColor="#a7b5ce" /><stop offset=".5" stopColor="#637ba4" /><stop offset="1" stopColor="#354367" /></linearGradient>
      <linearGradient id={`${id}-blue`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#8fb5f5" /><stop offset=".5" stopColor="#6393e3" /><stop offset="1" stopColor="#3b69ba" /></linearGradient>
      <linearGradient id={`${id}-green`}><stop stopColor="#477e35" /><stop offset=".48" stopColor="#a1cf84" /><stop offset="1" stopColor="#5b9a40" /></linearGradient>
      <linearGradient id={`${id}-lens`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="white" /><stop offset="1" stopColor="#b3c6d2" /></linearGradient>
      <linearGradient id={`${id}-button`} x1="0" y1="0" x2="0" y2="1"><stop stopColor="#e5ebf8" /><stop offset="1" stopColor="#a8badc" /></linearGradient>
      <linearGradient id={`${id}-metal`} x1="0" y1="0" x2="0" y2="1"><stop stopColor="#fafafa" /><stop offset="1" stopColor="#b3b4b1" /></linearGradient>
    </defs>
    <rect x=".5" y=".5" width={width - 1} height="33" fill="#f0f0ef" stroke="#c1c1bc" />
    <path d="M4 5V29" stroke="#a3a39e" strokeWidth="1" strokeDasharray="1 3" />
    <path d="M6 5V29" stroke="white" strokeWidth="1" strokeDasharray="1 3" />
    {index === 0 && <g strokeLinejoin="round">
      <path d="M13 5H25L30 11V27H13Z" fill="#fff" stroke="#7b7d79" /><path d="M25 5V11H30" fill="#ddd" stroke="#7b7d79" />
      <path d="M39 10V7H47L50 10H60V25H39Z" fill="#c6903e" stroke="#876b3d" /><path d="M38 14 61 10 58 26 38 28Z" fill="#efbc65" stroke="#a97838" /><path d="M41 15 58 12" stroke="#ffe3a8" />
      <path d="M67 6H85V27H67Z" fill="#686c6a" stroke="#454947" /><path d="M71 6H82V14H71Z M71 20H82V27H71Z" fill="#fafafa" stroke="#b9bdb8" /><path d="M78 7V12" stroke="#656a67" strokeWidth="2" />
      <path d="M91 12H105V25H89V15Z" fill={paint('metal')} stroke="#6d706e" /><path d="M93 5H103V14H93Z M92 20H103V29H92Z" fill="#fff" stroke="#777b77" /><path d="M94 23H102 M94 26H102" stroke="#aaa" /><path d="M91 16H94" stroke="#445d49" />
    </g>}
    {index === 1 && <g fill={paint('navy')} stroke="#526287" strokeWidth=".6">
      <path d="M13 17 24 9V14H34V20H24V25Z" />
      <path d="M43 7 38 14H42V24H52V28L60 23 52 18V22H46V14H49Z" />
      <path d="M79 17 68 9V14H58V20H68V25Z" />
    </g>}
    {index === 2 && <>
      <g stroke="#547644" strokeWidth=".7"><path d="M12 9 19 5 26 9 19 13Z" fill="#a1c38d" /><path d="M12 9V17L19 23V13Z" fill="#608e4e" /><path d="M19 13 26 9V17L19 23Z" fill="#81a363" /></g>
      <path d="M27 17 31 21 27 25Z" fill="#365873" />
      <rect x="35" y="6" width="17" height="23" fill="#d3d7d7" stroke="#abb1b2" />
      <text x="43.5" y="16" textAnchor="middle" fontSize="10" fontFamily="Arial, sans-serif" fontWeight="700" fill="#bc5138">2D</text><text x="43.5" y="27" textAnchor="middle" fontSize="10" fontFamily="Arial, sans-serif" fontWeight="700" fill="#285e96">3D</text>
    </>}
    {index === 3 && <>
      {magnifier(10, '')}{magnifier(36, '+')}{magnifier(62, '−')}
      <g stroke={ink} strokeWidth="1.5" fill="none"><path d="M92 9 98 15 104 9 M92 27 98 21 104 27 M88 12H93V7 M103 7V12H108 M88 24H93V29 M103 29V24H108" />
        <path d="M122 10C113 13 114 24 121 25 M132 25C140 21 137 10 131 10" /><path d="M121 6 124 10 120 14 M132 21 129 25 133 29" />
        <path d="M154 13H147V21H154Z M147 17H138 M139 13 135 17 139 21" /></g>
    </>}
    {index === 4 && <>
      {highlightFront && <rect x="34" y="4" width="24" height="25" fill="none" stroke="#0087ef" strokeWidth="2"/>}
      {[0, 1, 2, 3, 4, 5].map(n => <g key={n}>{cube(10 + n * 25, n)}</g>)}
      <g transform="translate(161 7)" stroke="#62738f" strokeWidth=".8"><path d="M1 7 8 0 21 4 16 20 0 17Z" fill={paint('navy')} /><path d="M1 7 14 11 21 4 M14 11 16 20" fill="none" stroke="#b6c5d9" /></g>
      <g transform="translate(186 7)"><path d="M2 20 8 9 16 11 12 23Z" fill="#788da7" stroke="#506b85" /><path d="M4 22 9 12 14 14" fill="none" stroke="#edf5ff" /><circle cx="7" cy="3" r="3" fill="#c73128" /><circle cx="16" cy="7" r="3" fill="#df4430" /><circle cx="19" cy="1" r="2" fill="#df4430" /></g>
    </>}
    {index === 5 && <>{[0, 1, 2, 3].map(n => <g key={n}>{steppedSolid(10 + 23 * n, n)}</g>)}</>}
    {index === 12 && <g stroke="#969d9c" fill="#d4d7d2" strokeWidth="1">
      <path d="M15 7 21 5 26 10 22 16 28 23 23 27 17 22 13 23 11 18 14 14Z" fill="#b0b3b0" />
      <path d="M36 7H56V27H36Z M40 11H52V23H40Z" fill="none" strokeWidth="2" /><path d="M40 10 48 13 45 16 50 22 46 24 42 18 39 21Z" fill="#aaafaa" />
      <path d="M65 11H84V24H65Z M72 5V29 M61 17H89" fill="none" strokeWidth="2" /><path d="M68 8 72 4 76 8 M69 26 72 30 76 26 M64 13 60 17 64 21 M86 13 90 17 86 21" fill="#aebecd" stroke="#a0afbe" />
      <path d="M101 6 96 11H100V16H95V12L90 18 95 23V19H100V24H96L101 29 106 24H102V19H107V23L113 18 107 12V16H102V11H106Z" fill="#adb8c9" stroke="#9ca6b9" />
      <path d="M125 7 135 14 131 26H118L115 14Z M125 11 131 15 128 23H120L119 15Z" fillRule="evenodd" />
      <g transform="translate(144 9) rotate(-42 9 9)" fill="none" strokeWidth="3"><rect x="0" y="0" width="10" height="15" rx="4" /><rect x="6" y="6" width="10" height="15" rx="4" /></g>
      <rect x="168" y="8" width="20" height="20" fill="#c7d4c3" /><rect x="193" y="8" width="20" height="20" fill="#e0e2db" />
      <g fontSize="12" fontFamily="Arial, sans-serif" fontWeight="700" fill="#9da795" stroke="none"><text x="170" y="23">GR</text><text x="195" y="23">GR</text></g>
      <path d="M221 8H239V27H221Z M232 12 225 18 232 23V20H238V16H232Z" fill="none" strokeWidth="2" /><path d="M246 7H252V28H246Z M248 11H250 M248 24H250" fill="none" />
    </g>}
    {index === 7 && <>{[0, 1, 2, 3, 4].map(n => <g key={n}>{cylinder(10 + n * 23, n)}</g>)}</>}
    {index === 11 && <>{['m', '1', '2', '3', '4', '5', '6'].map((label, n) => <g key={label}>
      <rect x={10 + n * 24} y="8" width="21" height="21" fill={paint('button')} stroke="#d9e2f2" />
      <path d={`M${11 + n * 24} 28V9H${30 + n * 24}`} fill="none" stroke="#f1f5fb" />
      <text x={20.5 + n * 24} y="24" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="17" fontWeight="700" fill="#3e578b">{label}</text>
    </g>)}</>}
    {index === 9 && <g stroke="#6f8bac" strokeWidth="1">
      <rect x="11" y="8" width="20" height="19" fill={paint('button')} /><path d="M15 12H27V23H15Z" fill="none" strokeDasharray="2 2" /><text x="16" y="21" fontFamily="Arial, sans-serif" fontSize="10" fill="#516583" stroke="none">m</text>
      <rect x="37" y="8" width="20" height="19" fill={paint('navy')} /><rect x="41" y="12" width="12" height="11" fill="#d3e1ef" />
      <rect x="63" y="8" width="18" height="19" fill="#b9cee4" /><path d="M67 12H70 M67 12V15 M76 12H73 M76 12V15 M67 23H70 M67 23V20 M76 23H73 M76 23V20" fill="none" stroke="#486893" />
    </g>}
    {index === 8 && <>
      <path d="M12 25 12 8 19 12 19 25 12 25 27 29 27 14 19 12 M12 25 21 22" fill="#e4eaf0" stroke="#8896a2" strokeWidth=".8" />
      <path d="M17 23V14 M17 23 24 26 M17 23 12 26" stroke="#507cab" strokeWidth="1.5" />
      <g stroke="#bb9455" strokeWidth=".8"><path d="M40 11V23C40 29 54 29 54 23V11" fill="#e5c785" /><ellipse cx="47" cy="11" rx="7" ry="4" fill="#ffe7ad" /><ellipse cx="47" cy="23" rx="7" ry="4" fill="#f0be64" /><path d="M42 15H52" stroke="#f0edbd" /></g><path d="M42 7 45 4 49 4 52 7" stroke="#adcecf" fill="none" />
    </>}
    {index === 6 && <>{undoArrow(10)}{undoArrow(34, true)}{highlightUndo && <rect x="9" y="3" width="25" height="27" fill="none" stroke="#0087ef" strokeWidth="1.5"/>}</>}
    {index === 10 && <g fontSize="9" fontFamily="'MS UI Gothic', 'Yu Gothic', sans-serif" fill="#262626" className="notranslate">
      <text x="10" y="13.5">線種</text>{field(30, 4, 44)}<path d="M33 10H64" stroke="#333" strokeWidth="1.5" />
      <text x="80" y="13.5">線色</text><rect x="100" y="4" width="16" height="12" fill="#858583" /><rect x="104" y="7" width="8" height="6" fill="#fff" />
      <text x="122" y="13.5">レイヤ</text>{field(150, 4, 30, '1')}
      <text x="186" y="13.5">グリッド</text>{field(223, 4, 36, '0.0')}
      <text x="10" y="27.5">尺度</text>{field(30, 18, 36, '1/1')}
      <text x="72" y="27.5">中ボタン</text>{field(109, 18, 60, 'パンニング')}
      {checkbox(176, 18)}<text x="187" y="27.5">ナビ</text>
      {checkbox(210, 18)}<text x="221" y="27.5">クロス</text>
    </g>}
    {index === 12 && <g strokeLinejoin="round" transform="translate(256 0)">
      <path d="M4 5V29" stroke="#a3a39e" strokeDasharray="1 3" /><path d="M6 5V29" stroke="white" strokeDasharray="1 3" />
      <g stroke="#474a4b" strokeWidth="1.4"><path d="M36 24H58 M65 20H87 M92 20H114 M126 8V29 M117 19H136 M179 7V29 M170 18H192" /><path d="M203 12 210 18 203 24" fill="none" strokeWidth="4" /></g>
      {[22, 45, 76, 103, 126, 180, 203].map((x, n) => <circle key={x} cx={x} cy={n === 1 ? 22 : 19} r="2.3" fill="#d73d36" stroke="#ed9b8c" strokeWidth=".5" />)}
      <rect x="140" y="6" width="23" height="24" fill="#f1c55d" stroke="#a08a55" /><rect x="143" y="8" width="17" height="20" fill="#ffe595" stroke="#f7f3bd" /><text x="151.5" y="24" fontSize="15" fontFamily="Arial, sans-serif" textAnchor="middle" fill="#685138">AP</text>
      <path d="M194 14 198 18 194 22" stroke="#b1bcc7" strokeWidth="3" fill="none" /><circle cx="213" cy="18" r="3" fill="#a6a5a2" /><path d="M228 6V26 M219 21H239" stroke="#4a4d50" strokeWidth="1.4" /><path d="M224 18V26 M232 18V26" stroke="#bb3933" strokeWidth="2" /><text x="226" y="14" fontSize="9" fontFamily="Arial, sans-serif" fill="#333">10</text>
      {[0, 1, 2].flatMap(col => [0, 1, 2, 3].map(row => <circle key={`${col}-${row}`} cx={246 + col * 6} cy={9 + row * 6} r="1.4" fill="#465a82" />))}
    </g>}
  </svg>;
}
