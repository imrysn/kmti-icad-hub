import FoundationCreationCommandIcon from './FoundationCreationCommandIcon';
import { useId } from 'react';
import profile from '../../assets/icad-foundations/modeling/work-plane-revolve-profile.png';
import axis from '../../assets/icad-foundations/modeling/work-plane-revolve-axis.png';
import dialog from '../../assets/icad-foundations/modeling/work-plane-revolve-dialog.png';
import result from '../../assets/icad-foundations/modeling/work-plane-revolve-result.png';
import toolbar from '../../assets/icad-foundations/modeling/work-plane-command-interface.png';
import InterfaceIconPreview from './InterfaceIconPreview';
import FoundationUsesCards from './FoundationUsesCards';
import { renderFormattedText } from './WrittenTutorial_EN/WrittenTutorialPanel';
import './FoundationWorkPlaneRevolve.css';

export default function FoundationWorkPlaneRevolve({ text, index, japanese = false }: { text: string; index: number; japanese?: boolean }) {
  const clipPrefix = useId();
  if (index === 0) {
    const titles = japanese ? ['Revolve', '閉じた断面の選択', '回転軸'] : ['Revolve', 'Pick an edge to be revolved', 'Axis of rotation'];
    const screens = [toolbar, profile, axis];
    const sizes: [number, number][] = [[1920,1080],[208,259],[153,284]];
    const icons = screens.map((screen, step) => {
      const bounds: [number,number,number,number] = step === 0 ? [1784,264,28,30] : [0,0,1920,1080];
      const crop = step === 0 ? '1784 264 28 30' : `0 0 ${sizes[step].join(' ')}`;
      const clipId = `${clipPrefix}-${step}`;
      const [x,y,w,h] = crop.split(' ').map(Number);
      const artwork = step===0?<FoundationCreationCommandIcon command="sectionRevolve" title={titles[step]}/>:<svg className={step === 0 ? 'work-plane-revolve-command' : undefined} viewBox={crop} role="img" aria-label={titles[step]}>
        <defs><clipPath id={clipId}><rect x={x} y={y} width={w} height={h}/></clipPath></defs>
        <image clipPath={`url(#${clipId})`} href={screen} width={sizes[step][0]} height={sizes[step][1]} />
      </svg>;
      return <InterfaceIconPreview key={step} index={step} toolbar={false} title={titles[step]} japanese={japanese} custom={{artwork,artworkOnly:step!==0, screen, screenSize: step === 0 ? undefined : sizes[step], region:{bounds,landing:bounds}, highlightColor:step === 0 ? '#0087ef' : 'transparent'}} />;
    });
    return <div className="work-plane-revolve-steps"><FoundationUsesCards text={text} customIcons={icons} /></div>;
  }
  return <div className="work-plane-revolve-detail">
    <p>{renderFormattedText(text)}</p>
    <img src={index === 1 ? dialog : result} alt={index === 1 ? (japanese ? '作業平面の削除確認' : 'Work Plane deletion prompt with OK and Cancel') : (japanese ? '完成した回転体' : 'Completed revolved solid with wider and narrower sections')} />
  </div>;
}
