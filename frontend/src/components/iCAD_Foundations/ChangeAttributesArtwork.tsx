import AnnotationStepPreview from './AnnotationStepPreview';
import AnnotationCommandIcon from './AnnotationCommandIcon';
import command from '../../assets/icad-foundations/annotation/annotation-command-interface.png';
import selectedGo from '../../assets/icad-foundations/annotation/change-attributes-selected-go.png';
import propertiesWindow from '../../assets/icad-foundations/annotation/change-attributes-properties-window.png';
import result from '../../assets/icad-foundations/annotation/change-attributes-result.png';

export function ChangeAttributesIcon({ title }: { title?: string }) {
  return <AnnotationCommandIcon command="change-attributes" title={title} reference="change-drafting-entity-attributes" />;
}

export default function ChangeAttributesArtwork({ step, japanese }: { step: number; japanese: boolean }) {
  const titles = japanese
    ? [
        '製図要素属性変更アイコンを選択',
        '製図要素を選択',
        '属性を変更',
        '変更を確定'
      ]
    : [
        'Select the Change Drafting Entity Attributes Icon',
        'Select the Drafting Entity',
        'Change the Properties',
        'Confirm the Changes'
      ];

  const screens = [command, selectedGo, propertiesWindow, result];
  const bounds: [number, number, number, number] = step === 0
    ? [1745, 270, 50, 70]
    : step === 1
    ? [740, 230, 540, 560]
    : step === 2
    ? [130, 320, 620, 560]
    : [740, 230, 540, 560];

  return <AnnotationStepPreview step={step} japanese={japanese} title={titles[step] || titles[0]}
    screen={screens[step] || screens[0]} bounds={bounds} command="change-attributes"
    icon={<ChangeAttributesIcon title={titles[0]} />} />;
}
