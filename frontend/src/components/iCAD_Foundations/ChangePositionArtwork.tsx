import AnnotationStepPreview from './AnnotationStepPreview';
import AnnotationCommandIcon from './AnnotationCommandIcon';
import command from '../../assets/icad-foundations/annotation/annotation-command-interface.png';

import result from '../../assets/icad-foundations/annotation/change-position-result.png';

export function ChangePositionIcon({ title }: { title?: string }) {
  return <AnnotationCommandIcon command="change-position" title={title} reference="change-drafting-entity-position" />;
}

export default function ChangePositionArtwork({ step, japanese }: { step: number; japanese: boolean }) {
  const titles = japanese
    ? ['製図要素位置変更アイコンを選択', '寸法文字の位置変更例']
    : ['Select the Change Drafting Entity Position Icon', 'Repositioned Dimension Text Example'];

  const screens = [command, result];
  const bounds: [number, number, number, number] = [1745, 305, 50, 70];

  return <AnnotationStepPreview step={step} japanese={japanese} title={titles[step] || titles[0]}
    screen={screens[step] || screens[0]} bounds={bounds} command="change-position"
    icon={<ChangePositionIcon title={titles[0]} />} />;
}
