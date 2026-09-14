import { useId } from 'react';
import ToolbarReferenceSvg from './ToolbarReferenceSvg';

/** Screen-area redraws follow the supplied iCAD SX screenshot's labels and control arrangement. */
export default function ScreenLayoutReferenceSvg({ index, title, expanded=false, highlightBox=false }: { index: number; title: string; expanded?: boolean; highlightBox?: boolean }) {
  const id = useId().replace(/:/g, '');
  const gray = `url(#${id}gray)`, blue = `url(#${id}blue)`, metal = `url(#${id}metal)`;
  const box = (x:number,y:number) => <g transform={`translate(${x} ${y})`} stroke="#687b8f" strokeWidth=".8"><path d="M0 7 10 1 22 7 12 14Z" fill="#ceddeb"/><path d="M0 7 12 14V26L0 19Z" fill="#aec0d0"/><path d="M12 14 22 7V20L12 26Z" fill="#8ba2ba"/></g>;
  const cylinder = (x:number,y:number) => <g transform={`translate(${x} ${y})`} stroke="#6e8198" strokeWidth=".8"><path d="M0 5V21C0 28 18 28 18 21V5" fill={metal}/><ellipse cx="9" cy="5" rx="9" ry="5" fill="#d2e1f0"/></g>;
  const views = expanded
    ? ['0 0 560 23','0 0 478 24','0 0 134 225','0 0 239 104','0 0 500 240','0 0 173 365','0 0 310 32','0 0 490 32','0 0 420 67','0 0 330 24']
    : ['0 0 200 23','0 0 225 24','0 0 134 112','0 0 239 104','0 0 260 125','0 0 173 160','0 0 310 32','0 0 240 32','0 0 420 67','0 0 205 24'];
  if(index===8) return expanded ? <ToolbarReferenceSvg index={0} title={title} overview /> : <svg className="foundation-native-interface-icon" viewBox="0 0 420 68" role="img" aria-label={title}><svg width="1254" height="98"><ToolbarReferenceSvg index={0} title={title} overview /></svg></svg>;
  return <svg className="foundation-native-interface-icon" viewBox={views[index]} role="img" aria-label={title} fontFamily="'MS UI Gothic', 'Yu Gothic UI', Meiryo, sans-serif" fontSize="12" fill="#151515">
    <defs>
      <linearGradient id={`${id}gray`} x2="0" y2="1"><stop stopColor="#fff"/><stop offset=".5" stopColor="#ededed"/><stop offset="1" stopColor="#c5c5c5"/></linearGradient>
      <linearGradient id={`${id}blue`} x2="0" y2="1"><stop stopColor="#a2b9f2"/><stop offset="1" stopColor="#5573d1"/></linearGradient>
      <linearGradient id={`${id}metal`}><stop stopColor="#819ab6"/><stop offset=".5" stopColor="#c4d5e6"/><stop offset="1" stopColor="#8da5bd"/></linearGradient>
      <linearGradient id={`${id}pink`} x2="0" y2="1"><stop stopColor="#f47bc9"/><stop offset="1" stopColor="#c48cf4"/></linearGradient>
    </defs>
    {index===0 ? <>
      <rect width="560" height="23" fill="#fff"/>
      <g transform="translate(2 3)" stroke="#5d5d5d" strokeWidth=".8"><path d="M0 5 8 0 16 5 8 10Z" fill="#c76851"/><path d="M0 5V8L8 13 16 8V5L8 10Z" fill="#d9d9d9"/><path d="M2 11 8 15 14 11" fill="none"/></g>
      <text x="23" y="16" fontFamily="Arial, 'Yu Gothic UI', sans-serif" fontSize="12">FUJITSU Manufacturing Industry Solution COLMINA 設計製造支援 iCAD SX - [新規図面4]</text>
    </> : index===1 ? <>
      <rect width="478" height="24" fill="#fafafa"/>
      <rect x="8" y="6" width="10" height="12" fill="#c5d9e0" stroke="#647681"/><path d="M10 8H15V15H10Z" fill="#111"/>
      {['ファイル(F)','表示(V)','情報表示(I)','設定(S)','ツール(T)','ウィンドウ(W)','ヘルプ(H)'].map((label,n)=><text key={label} x={[26,92,150,228,284,347,429][n]} y="17">{label}</text>)}
    </> : index===2 ? <>
      <rect x="1" y="1" width="132" height="223" fill="#e8e8e8" stroke="#929292"/>
      <rect x="5" y="5" width="123" height="16" rx="2" fill={blue} stroke="#546ca8"/>
      <text x="66" y="17" textAnchor="middle" fill="white">作　図</text>
      {['基本線','平行直交','水平線','垂直線','角度線','自由曲線','中心点円','通過点円','文書入力','応用作図','切断結合','ｵﾌｾｯﾄ','丸み','面取り','形状抽出','伸縮','応用編集','変更','移動','コピー','属性変更','削除'].map((label,n)=><g key={label}>
        <rect x={5+n%2*63} y={25+Math.floor(n/2)*17.5} width="60" height="16" rx="2" fill={gray} stroke="#8f8f8f" strokeWidth=".6"/>
        <text x={35+n%2*63} y={37+Math.floor(n/2)*17.5} textAnchor="middle" fill={n>=18?'#2448ac':'#151515'} fontSize="11.5">{label}</text>
      </g>)}
    </> : index===3 ? <>
      <rect x="1" y="1" width="237" height="102" fill="white" stroke="#8c8c8c"/>
      <rect x="3" y="3" width="233" height="23" fill="#e6e6e6"/><path d="M223 12 227 16 231 12" fill="none" stroke="#777"/><text x="6" y="19">新規図面4</text>
      <path d="M16 44V88H30 M16 58H30 M16 73H30" fill="none" stroke="#a2a2a2" strokeDasharray="1 2"/>
      <path d="M10 32 18 29 21 33 20 41 10 44Z" fill="#edc96c" stroke="#7d774b"/>
      <text x="25" y="40">新規図面4</text>
      <path d="M29 47 34 45 37 49 33 52Z" fill="#cb342a"/><path d="M31 50 36 53V58H31Z" fill="#bd3b31"/>
      <text x="42" y="56" fill="#143ae0" textDecoration="underline">新規図面4</text>
      {[64,80].map(y=><g key={y}><rect x="29" y={y} width="13" height="12" fill="#dce8e9" stroke="#799697"/><path d={`M34 ${y}V${y+12}`} stroke="#799697"/></g>)}
      <text x="48" y="74">正面図</text><text x="48" y="90">グローバル</text>
    </> : index===4 ? <>
      <rect x="1" y="1" width="498" height="238" fill={`url(#${id}pink)`} stroke="#999"/>
      <text x="93" y="18" fill="white">ユーザビュー 1</text>
      <path d="M56 66V28" stroke="#1636ce" strokeWidth="6"/><path d="M56 23 49 38H63Z" fill="#1636ce"/>
      <path d="M56 66 91 86" stroke="#ce1b2c" strokeWidth="6"/><path d="M99 91 81 87 88 78Z" fill="#ce1b2c"/>
      <path d="M56 66 23 84" stroke="#ffeb00" strokeWidth="6"/><path d="M15 90 32 86 25 77Z" fill="#ffeb00"/>
      <text x="54" y="23" fill="#322596">Y</text><text x="104" y="97" fill="#9b343d">X</text><text x="9" y="99" fill="#ffff2e">Z</text>
    </> : index===5 ? <>
      <rect x="1" y="1" width="171" height="363" fill="#efefef" stroke="#858585"/>
      {['形状配置▼','2D作図▼','2Dから立体化▼','集合演算▼','伸縮･整形･切断▼','移動コピー削除▼','要素内移動コピー削除▼'].map((label,n)=><g key={label}><rect x="4" y={4+n*49} width="128" height="18" fill={gray}/><text x="7" y={17+n*49} fontSize={n===6?10:12}>{label}</text></g>)}
      {cylinder(10,26)}
      {highlightBox && <rect x="39" y="24" width="28" height="29" fill="none" stroke="#0087ef" strokeWidth="2"/>}
      <path d="M42 34 52 27 64 35 53 45Z M42 34V39L53 49 64 41V35L53 45" fill="#b1c4d7" stroke="#697d96"/>
      <path d="M74 29 84 26 91 31V45L83 51 74 46Z" fill={metal} stroke="#697d96"/>
      <path d="M106 49 112 27H122L129 49 118 52Z" fill={metal} stroke="#697d96"/>
      <path d="M11 78 28 96 M40 97H62L49 81V92 M53 92 62 97 55 100" stroke="#343434" strokeWidth="2" fill="none"/>
      {[84,115].map(x=><g key={x} stroke="#333" fill="none"><circle cx={x} cy="88" r="10"/><path d={`M${x-3} 85l6 7 M${x+3} 85l-6 7 M${x+5} 97h7 M${x+9} 93v8`}/></g>)}
      <path d="M18 145V123 M18 123 13 131H23Z M8 145 18 149 29 145" fill="#648ec0" stroke="#6481a4"/>
      <path d="M40 145C35 130 49 121 56 132L62 128V142H47L52 137C47 132 43 138 46 144" fill="#608ac0"/>
      {[74,106].map(x=><g key={x}><rect x={x} y="128" width="18" height="18" fill={metal} stroke="#687b8f"/><path d={`M${x-3} 149V128Q${x-3} 122 ${x+5} 123H${x+20}`} stroke="#5487b9" strokeWidth="3" fill="none"/></g>)}
      {[0,1,2,3].map(n=><g key={n} transform={`translate(${11+n*32} 180)`}><path d="M0 11 10 3 22 11 11 19Z M0 11V16L11 25 22 17V11L11 19" fill={n===3?'#a4d9b7':'#00bb68'} stroke="#439779"/>{n===0?<path d="M8 9V0H14V9" fill="#00b469"/>:n<3?<ellipse cx="11" cy="12" rx="4" ry="3" fill={n===1?'#efefef':'#42da97'} stroke="#168f59"/>:<path d="M11 3V23" stroke="#777"/>}</g>)}
      {[0,1,2,3].map(n=><g key={n} transform={`translate(${11+n*32} 230)`}><path d="M1 5 12 0 23 7 20 23 8 20Z" fill={n<2?'#25ba72':'#e6eeee'} stroke="#7a8c83"/><path d="M1 5 12 11 23 7 M12 11 8 20" fill="none" stroke="#7a8c83"/>{n<2?<path d="M12 15V-3 M8 1 12-3 16 1" stroke="#2b9871" strokeWidth="3" fill="none"/>:<path d="M2 5 12 1 19 6 8 11Z" fill="#20c077"/>}</g>)}
      {box(8,276)}{box(42,276)}<path d="M7 306H29 M7 306l5-3 M29 306l-5-3" stroke="#5879a4"/><circle cx="61" cy="278" r="5" fill="white" stroke="#6383a5"/><path d="M58 278H64 M61 275V281" stroke="#6383a5"/>
      <g stroke="#566975"><rect x="76" y="275" width="19" height="13" fill="#d9e3ec"/><rect x="82" y="291" width="19" height="13" fill="#d9e3ec"/>{[0,1,2].map(n=><path key={n} d={`M${79+n*5} 278v5 M${85+n*5} 294v5`}/>)}</g>
      <path d="M108 280 124 297 M124 280 108 297" stroke="#db1616" strokeWidth="5"/>
      {[0,1,2,3].map(n=><g key={n} transform={`translate(${10+n*32} 326)`}><path d="M1 19 8 2 22 2 16 19Z" fill="#13bf75" stroke="#559f82"/>{n<3&&<path d="M2 11H9 M6 7V15" stroke="#42649d" strokeWidth="2"/>}</g>)}
      <path d="M135 3H170V49H135V365" fill="none" stroke="#8b8b8b"/>
      {['基本','応用','パーツ','動作設計','検証','製造情報','図面作成','製図','ツール'].map((label,n)=><text key={label} x="153" y={n===0?18:64+(n-1)*39} textAnchor="middle" fontSize="11">{[...label].map((c,j)=><tspan key={j} x="153" dy={j?'10':0}>{c}</tspan>)}</text>)}
    </> : index===6 ? <>
      <rect x="1" y="1" width="308" height="30" fill="#ececec" stroke="#969696"/>
      <text x="6" y="20">直径</text><rect x="41" y="5" width="97" height="22" fill="white" stroke="#888"/><rect x="44" y="7" width="59" height="18" fill="#1479bc"/><text x="46" y="20" fill="white">10.0000</text><rect x="126" y="6" width="11" height="20" fill={gray}/><path d="M129 15 132 19 135 15"/>
      <text x="152" y="20">高さ</text><rect x="190" y="5" width="110" height="22" fill="white" stroke="#888"/><text x="195" y="20">10.0000</text><rect x="288" y="6" width="11" height="20" fill={gray}/><path d="M291 15 294 19 297 15"/>
    </> : index===7 ? <>
      <rect x="1" y="1" width="488" height="30" fill="#e5e5e5" stroke="#969696"/><rect x="6" y="5" width="478" height="22" fill="white" stroke="#929292"/><path d="M472 13 476 17 480 13" fill="none" stroke="#737373"/>
    </> : <>
      <rect x="1" y="1" width="328" height="22" fill="#eee" stroke="#8d8d8d"/><path d="M3 3H327" stroke="white"/><text x="6" y="16">配置位置　ＧＯ＜消去＞</text>
    </>}
  </svg>;
}
