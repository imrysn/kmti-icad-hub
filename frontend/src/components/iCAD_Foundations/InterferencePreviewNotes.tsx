import { useId } from 'react';

export default function InterferencePreviewNotes({ list = false, japanese }: { list?: boolean; japanese: boolean }) {
  const arrow = useId();
  // The overlay uses normalized screen coordinates; keep lettering undistorted.
  const textScale = (list ? 200 / 167 : 213 / 180) * 1080 / 1920;
  const textTransform = (y: number) => `translate(0 ${y * (1 - textScale)}) scale(1 ${textScale})`;
  return <g fontFamily="Arial, 'Yu Gothic', sans-serif" fill="#222">
    <defs><marker id={arrow} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="9" markerHeight="9" orient="auto-start-reverse"><path d="m1 1 8 4-8 4" fill="none" stroke="#e32626" strokeWidth="1.2"/></marker></defs>
    <rect x="25" y="-155" width="1870" height="130" fill="#fff" stroke="#e32626" strokeWidth="3"/>
    {list ? <>
      <text x="960" y="-105" transform={textTransform(-105)} textAnchor="middle" fontSize="43">{japanese ? '一覧の3Dパーツ名を選択すると、' : 'Select a 3D Part Name in the list to automatically'}</text>
      <text x="960" y="-52" transform={textTransform(-52)} textAnchor="middle" fontSize="43">{japanese ? '対応する干渉箇所が自動的に表示されます。' : 'display its corresponding interference area.'}</text>
      <path d="M480-25 165 365" fill="none" stroke="#e32626" strokeWidth="3" markerEnd={`url(#${arrow})`}/>
    </> : <>
      <text x="960" y="-73" transform={textTransform(-73)} textAnchor="middle" fontSize="50">{japanese ? '干渉箇所は赤いCGSソリッドで表示されます。' : 'Interference areas appear as red CGS solids.'}</text>
      <path d="M960-25 670 0" fill="none" stroke="#e32626" strokeWidth="3"/>
      <rect x="25" y="1105" width="1870" height="130" fill="#fff" stroke="#e32626" strokeWidth="3"/>
      <text x="960" y="1158" transform={textTransform(1158)} textAnchor="middle" fontSize="43">{japanese ? '干渉のある部品はワイヤーフレーム表示に切り替わり、' : 'Parts with interferences switch to Wireframe'}</text>
      <text x="960" y="1210" transform={textTransform(1210)} textAnchor="middle" fontSize="43">{japanese ? '重なり箇所を確認できます。' : 'so the overlapping areas are visible.'}</text>
      <path d="M620 1105 620 1080" fill="none" stroke="#e32626" strokeWidth="3"/>
    </>}
  </g>;
}
