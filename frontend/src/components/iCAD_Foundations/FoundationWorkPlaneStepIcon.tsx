import InterfaceIconPreview from './InterfaceIconPreview';
import openWorkPlaneScreen from '../../assets/icad-foundations/modeling/work-plane-open-full.png';
import removeWorkPlaneScreen from '../../assets/icad-foundations/modeling/work-plane-delete-full.png';
import contextWorkPlaneScreen from '../../assets/icad-foundations/modeling/work-plane-context-full.png';
import WorkPlaneCommandIconSvg from './WorkPlaneCommandIconSvg';
import './FoundationFileMenuIcon.css';

interface Props {
  step: 'open' | 'removeStep1' | 'removeStep2';
  japanese?: boolean;
}

const menuRows = ['アクティブ化(A)', '入力組立平面を固定(K)', '非表示(V)', '他の組立平面非表示(T)', '全て表示(W)', '全て非表示(H)', '断面表示(S)', '断面設定(D)', 'オフセット(O)', '座標軸操作(C)', '組立平面固定(L)', 'リセット(B)', '削除(E)', '最新の状態に更新(R)', '他次元要素参照(F)', '設定(P)'];
const rowY = [62,84,106,128,150,172,201,223,252,274,296,318,347,376,405,434];

/** Native menu labels and geometry transcribed from the stored iCAD SX capture. */
function WorkPlaneMenuSvg({remove, title}: {remove:boolean; title:string}) {
  if (remove) return <svg viewBox="0 0 264 80" role="img" aria-label={title}>
    <rect x="1" y="1" width="218" height="25" fill="#91c9f7" stroke="#bbb"/>
    <text x="32" y="18" fontFamily="Meiryo, MS Gothic, sans-serif" fontSize="12" fill="#111">削除(E)</text>
    <path d="m204 9 4 4-4 4" fill="none" stroke="#333"/>
    <rect x="4" y="30" width="259" height="49" fill="#f2f2f2" stroke="#bfc0c1"/>
    <text x="20" y="48" fontFamily="Meiryo, MS Gothic, sans-serif" fontSize="12" fill="#111">指定した組立平面削除(D)</text>
    <text x="20" y="70" fontFamily="Meiryo, MS Gothic, sans-serif" fontSize="12" fill="#111">３Ｄ化済の全組立平面削除(A)</text>
  </svg>;
  return <svg viewBox={remove ? '30 329 480 60' : '0 20 260 435'} role="img" aria-label={title}>
    {!remove && <path d="M0 27 34 49" fill="none" stroke="#39ffff" strokeWidth="2"/>}
    <path d="M36 51H254V450H36Z" fill="#777" opacity=".25"/>
    <rect x="33" y="49" width="218" height="398" fill="#f2f2f2" stroke="#c8c8c8"/>
    {[186,235,361,390,419].map(y=><path key={y} d={`M36 ${y}H247`} stroke="#d6d6d6" strokeWidth=".8"/>)}
    {remove && <rect x="36" y="336" width="211" height="22" fill="#91c9f7"/>}
    <rect x="36" y="394" width="22" height="22" fill="#91c9f7"/>
    <path d="m43 404 3 3 6-7" fill="none" stroke="#222" strokeWidth="1.2"/>
    {menuRows.map((label,i)=><g key={label}>
      <text x="67" y={rowY[i]} fontFamily="Meiryo, MS Gothic, sans-serif" fontSize="12" fill={[0,10,11].includes(i)?'#888':'#111'}>{label}</text>
      {[7,9,11,12].includes(i) && <path d={`m235 ${rowY[i]-7} 3 3-3 3`} fill="none" stroke={i===11?'#999':'#333'} strokeWidth="1"/>}
    </g>)}
    {remove && <>
      <rect x="249" y="336" width="258" height="49" fill="#777" opacity=".25"/>
      <rect x="246" y="333" width="259" height="49" fill="#f2f2f2" stroke="#bfc0c1"/>
      <text x="280" y="347" fontFamily="Meiryo, MS Gothic, sans-serif" fontSize="12" fill="#111">指定した組立平面削除(D)</text>
      <text x="280" y="370" fontFamily="Meiryo, MS Gothic, sans-serif" fontSize="12" fill="#111">３Ｄ化済の全組立平面削除(A)</text>
    </>}
  </svg>;
}

export default function FoundationWorkPlaneStepIcon({ step, japanese = false }: Props) {
  const open=step==='open';
  const remove=step==='removeStep2';
  const title=open ? (japanese?'組立平面開設':'Open Work Plane (組立平面開設)') : remove ? (japanese?'削除(E) → 指定した組立平面削除(D)':'Delete → Delete Specified Work Plane') : (japanese?'作業平面のコンテキストメニュー':'Work Plane Context Menu');
  // All three supplied captures use the 1920 × 1080 reference space.
  const region: [number,number,number,number]=open ? [413,43,25,29] : remove ? [1231,605,472,27] : [1314,365,220,400];
  return <div className={`foundation-file-menu-icon foundation-work-plane-icon foundation-work-plane-icon--${step}`}>
    <InterfaceIconPreview index={0} toolbar={false} title={title} japanese={japanese} custom={{
      artwork:open ? <WorkPlaneCommandIconSvg title={title}/> : <WorkPlaneMenuSvg remove={remove} title={title}/>,
      screen:open?openWorkPlaneScreen:remove?removeWorkPlaneScreen:contextWorkPlaneScreen,
      region:{bounds:region,landing:region},highlightColor:'#0087ef',
    }}/>
  </div>;
}
