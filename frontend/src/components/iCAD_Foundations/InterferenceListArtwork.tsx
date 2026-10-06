import InterferencePreviewNotes from './InterferencePreviewNotes';
import InterfaceIconPreview from './InterfaceIconPreview';
import screen from '../../assets/icad-foundations/interference/list-command-interface.png';
import list from '../../assets/icad-foundations/interference/list-display-window.png';
import './InterferenceCheckArtwork.css';

export function InterferenceListIcon() {
  return <svg className="foundation-single-command" viewBox="0 0 36 36" role="img" aria-label="干渉一覧を表示する">
    <g stroke="#515151" strokeWidth="1.1" strokeLinejoin="round">
      <path d="M8 25v3c0 6 20 6 20 0v-3" fill="#bababa"/>
      <ellipse cx="18" cy="25" rx="10" ry="4.5" fill="#eee"/>
      <ellipse cx="18" cy="24" rx="3.7" ry="1.7" fill="#f02727" stroke="#bd2323"/>
      <path d="M10 5h16v9H10Z" fill="#ededed"/>
      <path d="M12 7.5h12M12 11h12M15 5v9M18 14v6m-3-3 3 3 3-3" fill="none"/>
    </g>
  </svg>;
}

export default function InterferenceListArtwork({ step, japanese }: { step: number; japanese: boolean }) {
  const titles = japanese ? ['干渉一覧ツールを選択', '一覧表示ウィンドウを確認', '3Dパーツ名を選択']
    : ['Select the Interference List Tool', 'Check the List Display Window', 'Select a 3D Part Name'];
  const title = titles[step];
  const source = step === 0 ? screen : list;
  const size: [number, number] = step === 0 ? [1920,1075] : [200,167];
  const region: [number, number, number, number] = step === 0 ? [1815,192 / 1075 * 1080,30,32 / 1075 * 1080]
    : step === 2 ? [8 / 200 * 1920, 56 / 167 * 1080, 88 / 200 * 1920, 11 / 167 * 1080] : [0,0,1920,1080];
  const artwork = step === 0 ? <InterferenceListIcon />
    : <span className="interference-list-image"><img src={source} alt={title} width={size[0]} height={size[1]} />
      {step === 2 && <span className="interference-list-row" aria-hidden="true" />}</span>;
  return <span className="interference-check-artwork interference-list-artwork">
    <InterfaceIconPreview index={step} toolbar={false} title={title} japanese={japanese}
      custom={{ artwork, screen: source, screenSize: size, screenFit: step === 0 ? 'viewport' : 'comfortable',
        screenOverlay: step === 2 ? <InterferencePreviewNotes list japanese={japanese}/> : undefined,
        region: { bounds: region, landing: region } }} />
  </span>;
}
