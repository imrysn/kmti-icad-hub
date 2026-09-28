import profile from '../../assets/icad-foundations/modeling/work-plane-revolve-profile.png';
import axis from '../../assets/icad-foundations/modeling/work-plane-revolve-axis.png';
import dialog from '../../assets/icad-foundations/modeling/work-plane-revolve-dialog.png';
import result from '../../assets/icad-foundations/modeling/work-plane-revolve-result.png';
import toolbar from '../../assets/icad-foundations/modeling/work-plane-solid-toolbar.png';
import FoundationUsesCards from './FoundationUsesCards';
import { renderFormattedText } from './WrittenTutorial_EN/WrittenTutorialPanel';
import './FoundationWorkPlaneRevolve.css';

export default function FoundationWorkPlaneRevolve({ text, index, japanese = false }: { text: string; index: number; japanese?: boolean }) {
  if (index === 1) {
    const titles = japanese ? ['回転投影', '閉じた断面の選択', '回転軸'] : ['Revolve', 'Select the closed cross-section', 'Axis of rotation'];
    const icons = [
      <svg key="command" className="work-plane-revolve-command" viewBox="38 133 30 27" role="img" aria-label={titles[0]}><image href={toolbar} width="174" height="160" /></svg>,
      <img key="profile" src={profile} alt={titles[1]} />,
      <img key="axis" src={axis} alt={titles[2]} />,
    ];
    return <div className="work-plane-revolve-steps"><FoundationUsesCards text={text} customIcons={icons} /></div>;
  }
  return <div className="work-plane-revolve-detail">
    <p>{renderFormattedText(text)}</p>
    <img src={index === 2 ? dialog : result} alt={index === 2 ? (japanese ? '作業平面の削除確認' : 'Work Plane deletion prompt with OK and Cancel') : (japanese ? '完成した回転体' : 'Completed revolved solid with wider and narrower sections')} />
  </div>;
}
