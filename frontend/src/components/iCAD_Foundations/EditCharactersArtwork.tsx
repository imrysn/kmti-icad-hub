import AnnotationStepPreview from './AnnotationStepPreview';
import AnnotationCommandIcon from './AnnotationCommandIcon';
import command from '../../assets/icad-foundations/annotation/annotation-command-interface.png';
import selectedGo from '../../assets/icad-foundations/annotation/edit-characters-selected-go.png';
import editWindow from '../../assets/icad-foundations/annotation/edit-characters-edit-window.png';
import result from '../../assets/icad-foundations/annotation/edit-characters-result.png';

export function EditCharactersIcon({ title }: { title?: string }) {
  return <AnnotationCommandIcon command="edit-characters" title={title} reference="edit-drafting-entity-characters" />;
}

export default function EditCharactersArtwork({ step, japanese }: { step: number; japanese: boolean }) {
  const titles = japanese
    ? [
        '製図要素文字編集アイコンを選択',
        '製図要素を選択',
        '寸法文字を編集',
        '変更を確定'
      ]
    : [
        'Select the Edit Drafting Entity Characters Icon',
        'Select the Drafting Entity',
        'Edit the Dimension Characters',
        'Confirm the Changes'
      ];

  const screens = [command, selectedGo, editWindow, result];
  const bounds: [number, number, number, number] = step === 0
    ? [1745, 235, 50, 70]
    : step === 1
    ? [750, 230, 520, 550]
    : step === 2
    ? [15, 40, 735, 710]
    : [750, 230, 520, 550];

  return <AnnotationStepPreview step={step} japanese={japanese} title={titles[step] || titles[0]}
    screen={screens[step] || screens[0]} bounds={bounds} command="edit-characters"
    icon={<EditCharactersIcon title={titles[0]} />} />;
}
