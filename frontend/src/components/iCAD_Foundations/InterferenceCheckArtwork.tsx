import InterferencePreviewNotes from './InterferencePreviewNotes';
import { useId } from 'react';
import InterfaceIconPreview from './InterfaceIconPreview';
import screen from '../../assets/icad-foundations/interference/command-interface.png';
import selected from '../../assets/icad-foundations/interference/selected-entities.png';
import detected from '../../assets/icad-foundations/interference/detected-interferences.png';
import './InterferenceCheckArtwork.css';

export function InterferenceCheckIcon() {
  const gradient = useId();
  return <svg className="foundation-single-command" viewBox="0 0 36 36" role="img" aria-label="指定要素で干渉チェックする">
    <defs><linearGradient id={gradient}><stop stopColor="#999"/><stop offset=".4" stopColor="#fff"/><stop offset="1" stopColor="#aaa"/></linearGradient></defs>
    <g stroke="#505050" strokeWidth="1.1" strokeLinejoin="round">
      <path d="M12 10h12v17H12Z" fill={`url(#${gradient})`}/>
      <path d="M8 27v2c0 5 20 5 20 0v-2" fill={`url(#${gradient})`}/>
      <ellipse cx="18" cy="27" rx="10" ry="4" fill="#e7e7e7"/>
      <path d="M13 20v4c0 3 10 3 10 0v-4" fill="#df1515"/>
      <ellipse cx="18" cy="20" rx="5" ry="2.2" fill="#ff4242" stroke="#a52020"/>
      <path d="M13 12v4c0 3 10 3 10 0v-4" fill="#df1515"/>
      <ellipse cx="18" cy="12" rx="5" ry="2.2" fill="#ff4242" stroke="#a52020"/>
      <path d="M8 7v2c0 5 20 5 20 0V7" fill={`url(#${gradient})`}/>
      <ellipse cx="18" cy="7" rx="10" ry="3.7" fill="#efefef"/>
    </g>
  </svg>;
}

export default function InterferenceCheckArtwork({ step, japanese }: { step: number; japanese: boolean }) {
  const titles = japanese ? ['干渉チェックを選択', '高速検出の選択を解除', 'チェックする要素を選択', '干渉を分析']
    : ['Select Interference Check', 'Unselect High-Speed Detection', 'Select the Entities to Check', 'Analyze the Interference'];
  const title = titles[step];
  const source = step < 2 ? screen : step === 2 ? selected : detected;
  const size: [number, number] = step < 2 ? [1920,1080] : step === 2 ? [218,180] : [213,180];
  const region: [number, number, number, number] = step === 0 ? [1751,157,31,33] : step === 1 ? [6,833,119,17] : [0,0,1920,1080];
  const artwork = step === 0 ? <InterferenceCheckIcon /> : step === 1
    ? <InterferenceDetectionMenu title={title} />
    : <img src={source} alt={title} width={size[0]} height={size[1]} />;
  return <span className={`interference-check-artwork interference-check-artwork--${step}`}>
    <InterfaceIconPreview index={step} toolbar={false} title={title} japanese={japanese}
      custom={{ artwork, screen: source, screenSize: size, screenFit: step < 2 ? 'viewport' : 'comfortable',
        screenOverlay: step === 3 ? <InterferencePreviewNotes japanese={japanese}/> : undefined,
        region: { bounds: region, landing: step === 1 ? [6,680,120,171] : region } }} />
  </span>;
}

function InterferenceDetectionMenu({ title }: { title: string }) {
  const id = useId();
  const rows = [
    { y: 1, label: '干渉チェック', tone: 'red' },
    { y: 27, label: '干渉チェック', tone: 'blue' },
    { y: 45, label: 'クリアランスチェック', tone: 'gray' },
    { y: 63, label: '一覧表示', tone: 'gray' },
    { y: 89, label: '総当たり', tone: 'blue' },
    { y: 107, label: '要素周辺', tone: 'gray' },
    { y: 125, label: 'パーツ対パーツ', tone: 'gray' },
    { y: 151, label: '高速検出', tone: 'blue' },
  ];
  return <svg viewBox="0 0 120 168" className="interference-detection-mode" role="img" aria-label={title}>
    <defs>{[['red','#f2c4c4','#dd8989'],['blue','#e7f5ff','#9ec9ee'],['gray','#fafafa','#c7c7c7']].map(([tone,top,bottom]) =>
      <linearGradient key={tone} id={`${id}-${tone}`} x2="0" y2="1"><stop stopColor={top}/><stop offset="1" stopColor={bottom}/></linearGradient>)}</defs>
    {rows.map(({y,label,tone}) => <g key={y}>
      <rect x="1" y={y} width="118" height="15" rx="2" fill={`url(#${id}-${tone})`} stroke={tone === 'blue' ? '#1687df' : '#909090'} strokeWidth=".7"/>
      <text x="5" y={y+11} fontFamily="'MS UI Gothic', 'Yu Gothic', sans-serif" fontSize="10.5" fill="#111">{label}</text>
    </g>)}
  </svg>;
}
