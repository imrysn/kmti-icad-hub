import type { AnnotationCommand } from './AnnotationCommandIcon';

/** Transparent lesson artwork; the original capture remains the fullscreen source. */
export default function AnnotationModelPreview({ command, step, title }: {
  command: AnnotationCommand; step: number; title: string;
}) {
  const angular = command === 'angular-dimension';
  const linear = command === 'linear-dimension';
  const diameter = command === 'diameter-dimension';
  const note = command === 'notes-leader-lines';
  const characters = command === 'character-strings';
  const edited = command === 'edit-characters';
  const positioned = command === 'change-position';
  const dimension = linear && step > 1 || edited || command === 'change-attributes' || positioned;
  const selected = step === 1 && !positioned;
  const value = edited && step === 1 || linear ? '50' : '60';
  return <svg className="stretch-vector annotation-model-preview" viewBox={angular ? '0 0 360 150' : selected && (linear || note) ? '85 68 130 175' : '80 25 155 215'} role="img" aria-label={title}>
    <g stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="none">
      {angular ? <>
        <path d="M20 65 285 56V110H20Z" fill="#e9e9e9" stroke="#62666c" />
        <path d="m20 65 297-20M285 110h40M309 44l4 66m-8-57 4-9 5 8m-5 49 4 9 4-9" />
        {step > 1 && <text x="328" y="85" stroke="none" fill="currentColor" fontSize="19">3°</text>}
      </> : <>
        <path fill="#e9e9e9" stroke="#62666c" fillRule="evenodd" d="M95 78h110v154H95Z M115 98a6.5 6.5 0 1 0-13 0 6.5 6.5 0 1 0 13 0 M198 98a6.5 6.5 0 1 0-13 0 6.5 6.5 0 1 0 13 0 M115 214a6.5 6.5 0 1 0-13 0 6.5 6.5 0 1 0 13 0 M198 214a6.5 6.5 0 1 0-13 0 6.5 6.5 0 1 0 13 0" />
        <g stroke="#62666c"><circle cx="150" cy="155" r="33"/><circle cx="150" cy="155" r="17.5"/></g>
        {selected && (linear || note) && <path d="M95 78h110" stroke="#168ca1" strokeWidth="2.5"/>}
        {dimension && <>
          <path d="M95 73V48m110 25V48M95 52h110m-100-3-10 3 10 3m90-6 10 3-10 3"/>
          <text x="150" y={positioned ? 69 : 42} textAnchor="middle" fontSize="17" fill="currentColor" stroke="none">{value}</text>
        </>}
        {diameter && <>
          {selected && <circle cx="150" cy="155" r="33" stroke="#168ca1" strokeWidth="2"/>}
          <path d="m123 174 80-54m-75 46-5 8 10-2m36-33 9-4-4 9"/>
          {step > 1 && <text transform="translate(190 122) rotate(-34)" textAnchor="middle" fontSize="16" stroke="none" fill="currentColor">φ30</text>}
        </>}
        {note && step >= 4 && <>
          <path d="M150 78V51h76m-79 18 3 9 3-9"/>
          <text x="187" y="43" textAnchor="middle" fontSize="15" stroke="none" fill="currentColor">10X30X70</text>
        </>}
        {characters && <text x="150" y="51" textAnchor="middle" fontSize="19" stroke="none" fill="currentColor">PART A</text>}
      </>}
    </g>
  </svg>;
}
