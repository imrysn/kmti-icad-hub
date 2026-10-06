import AnnotationStepPreview from './AnnotationStepPreview';
import AnnotationCommandIcon from './AnnotationCommandIcon';
import command from '../../assets/icad-foundations/annotation/annotation-command-interface.png';
import entryWindow from '../../assets/icad-foundations/annotation/character-strings-entry-window.png';
import enterText from '../../assets/icad-foundations/annotation/character-strings-enter-text.png';
import placed from '../../assets/icad-foundations/annotation/character-strings-placed-result.png';

export function CharacterStringsIcon({ title }: { title?: string }) {
  return <AnnotationCommandIcon command="character-strings" title={title} reference="character-strings" />;
}

export default function CharacterStringsArtwork({ step, japanese }: { step: number; japanese: boolean }) {
  const titles = japanese
    ? [
        '文字列アイコンを選択',
        '文字列入力ウィンドウを表示',
        '文字列を入力',
        '文字列を配置',
        '完了結果の確認'
      ]
    : [
        'Select the Character Strings Icon',
        'Open the Text Entry Window',
        'Enter the Text',
        'Place the Text',
        'Check the Final Result'
      ];

  const screens = [command, entryWindow, enterText, placed, placed];
  const bounds: [number, number, number, number] = step === 0
    ? [1750, 155, 45, 65]
    : step === 1 || step === 2
    ? [120, 140, 650, 480]
    : [780, 200, 500, 560];

  return <AnnotationStepPreview step={step} japanese={japanese} title={titles[step] || titles[0]}
    screen={screens[step] || screens[0]} bounds={bounds} command="character-strings"
    icon={<CharacterStringsIcon title={titles[0]} />} />;
}
