import AnnotationStepPreview from './AnnotationStepPreview';
import AnnotationCommandIcon from './AnnotationCommandIcon';
import command from '../../assets/icad-foundations/annotation/annotation-command-interface.png';
import selected from '../../assets/icad-foundations/annotation/notes-leader-lines-selected.png';
import position from '../../assets/icad-foundations/annotation/notes-leader-lines-position.png';
import entryWindow from '../../assets/icad-foundations/annotation/notes-leader-lines-entry-window.png';
import entry from '../../assets/icad-foundations/annotation/notes-leader-lines-entry.png';

export function NotesLeaderLinesIcon({ title }: { title?: string }) {
  return <AnnotationCommandIcon command="notes-leader-lines" title={title} reference="notes-leader-lines" />;
}

export default function NotesLeaderLinesArtwork({ step, japanese }: { step: number; japanese: boolean }) {
  const titles = japanese
    ? [
        '引出線付き注記アイコンを選択',
        'エンティティのエッジを選択',
        '注記文字列入力ウィンドウを表示',
        '注記を入力',
        '注記を配置'
      ]
    : [
        'Select the Notes with Leader Lines Icon',
        'Select an Edge of the Entity',
        'Open the Note String Entry Window',
        'Enter the Note',
        'Place the Note'
      ];

  const screens = [command, selected, entryWindow, entry, position];
  const bounds: [number, number, number, number] = step === 0
    ? [1750, 155, 45, 65]
    : step === 3
    ? [120, 140, 650, 480]
    : [800, 200, 480, 560];

  return <AnnotationStepPreview step={step} japanese={japanese} title={titles[step] || titles[0]}
    screen={screens[step] || screens[0]} bounds={bounds} command="notes-leader-lines"
    icon={<NotesLeaderLinesIcon title={titles[0]} />} />;
}
