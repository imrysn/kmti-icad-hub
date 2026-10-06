import { useId } from 'react';

const labels = {
  'linear-dimension': '長さ寸法を作成する', 'diameter-dimension': '径寸法を作成する',
  'angular-dimension': '角度寸法', 'notes-leader-lines': '注記を作成する',
  'character-strings': '文字を作成する', 'edit-characters': '製図文字を編集する',
  'change-attributes': '製図属性を編集する', 'change-position': '製図位置を編集する',
};
export type AnnotationCommand = keyof typeof labels;

// Outlined lettering avoids changes caused by font substitution.
function Ten() {
  return <path d="M10 5.5 12 4v8 M10.5 12h3 M19 4c-4 0-4 8 0 8s4-8 0-8Z" />;
}
function Abc() {
  return <path d="M5 25c.5-2 5-2 5 0v5 M10 26H7c-3 0-3 4 0 4 2 0 3-1 3-2 M14 21v9 M14 26c0-3 5-3 5 1s-5 4-5 1 M27 25c-4-3-7 5-2 5l2-1" />;
}
function Dimension() {
  return <><Ten /><path d="M9 13v17 M23 13v17 M3 16h26" />
    <path d="m3 16 4-2v4Zm26 0-4-2v4Z" fill="currentColor" stroke="none" /></>;
}

/** Continuous vector geometry based on the supplied iCAD toolbar references. */
export default function AnnotationCommandIcon({ command, title, reference }: {
  command: AnnotationCommand; title?: string; reference: string;
}) {
  const pencilId = useId();
  return <svg className="foundation-single-command" width="76" height="76"
    viewBox="0 0 34 34" role="img" aria-label={title || labels[command]}
    data-command-reference={reference} data-vector-construction="geometry" style={{ color: '#46484d' }}>
    <g transform="translate(1 1)" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      {command === 'linear-dimension' && <Dimension />}
      {command === 'diameter-dimension' && <>
        <path d="M3 4c18-2 19 24 0 24 M3 16h25 M23 13l-4 3 4 3" />
        <path d="M26 3c-5 0-7 9-2 9s7-9 2-9ZM22 13l7-11" />
      </>}
      {command === 'angular-dimension' && <>
        <path d="M29 3 3 29h27 M10 22a10 10 0 0 1 3 7" strokeWidth="2" />
        <path d="m20 17-4 6h6 M20 17v10 M28 17h-4v5c6-2 5 6 0 4" strokeWidth="1.2" />
        <path d="M30 16a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2Z" strokeWidth=".9" />
      </>}
      {command === 'notes-leader-lines' && <>
        <path d="m4 28 10-13h14 M17 11l4-9 4 9 M18.5 8h5" strokeWidth="2" />
        <path d="m3 29 1-5 3 2Z" fill="currentColor" />
      </>}
      {command === 'character-strings' && <>
        <path d="M3 7h27v18H10l-7 6Z" stroke="#96999c" strokeWidth="1.5" />
        <g transform="translate(2 -5) scale(.85)"><Abc /></g>
      </>}
      {command === 'edit-characters' && <>
        <defs><linearGradient id={pencilId} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#9ab3d2" /><stop offset=".45" stopColor="#5476a5" /><stop offset="1" stopColor="#294567" />
        </linearGradient></defs>
        <path d="m8 16 14-14c1.5-1.5 5 2 3.5 3.5L11.5 19Z" fill={`url(#${pencilId})`} strokeWidth="1.2" />
        <path d="m8 16-1 5 4.5-2Z" fill="#ddd7c3" strokeWidth="1" />
        <path d="m7 21 .5-2 1.5 1Z" fill="#34363c" stroke="none" />
        <path d="m10 16 13-13" stroke="#afc1d8" strokeWidth=".7" /><Abc />
      </>}
      {command === 'change-attributes' && <>
        <Dimension />
        <path d="M15 13c-2 4-1 7 3 8l8 9c3 2 6-1 4-4l-9-8c0-4-3-7-6-6l3 4-2 2-3-3Z" fill="#dedfe0" strokeWidth="1.3" />
        <path d="m21 22 6 6" stroke="#f9f9f9" strokeWidth="1" />
      </>}
      {command === 'change-position' && <>
        <path d="M9 3v27 M23 3v27 M3 9h26 M4 23h3m3 0h3m3 0h3m3 0h3m3 0h1" />
        <path d="m3 9 4-2v4Zm26 0-4-2v4Z" fill="currentColor" stroke="none" />
        <path d="m4 21-2 2 2 2 2-2Zm24 0-2 2 2 2 2-2Z" strokeWidth="1" />
        <path d="m16 14-4 5h8Z" fill="#52638e" stroke="#52638e" strokeWidth=".6" />
      </>}
    </g>
  </svg>;
}
