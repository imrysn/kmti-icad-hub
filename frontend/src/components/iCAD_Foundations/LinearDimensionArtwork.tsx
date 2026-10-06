import AnnotationStepPreview from './AnnotationStepPreview';
import AnnotationCommandIcon from './AnnotationCommandIcon';
import command from '../../assets/icad-foundations/annotation/annotation-command-interface.png';
import selected from '../../assets/icad-foundations/annotation/linear-dimension-selected.png';
import result from '../../assets/icad-foundations/annotation/linear-dimension-result.png';

export function LinearDimensionIcon({ title }: { title?: string }) {
  return <AnnotationCommandIcon command="linear-dimension" title={title} reference="linear-dimension" />;
}

export default function LinearDimensionArtwork({ step, japanese }: { step: number; japanese: boolean }) {
  const titles = japanese
    ? ['長さ寸法アイコンを選択', '測定するエッジを選択', '寸法の位置を指定', '完了結果の確認']
    : ['Select the Linear Dimension Icon', 'Select the Edges to be Measured', 'Position the Dimension', 'Check the Final Result'];

  const screens = [command, selected, result, result];
  const bounds: [number, number, number, number] = step === 0
    ? [1750, 157, 43, 67]
    : step === 1
    ? [820, 360, 420, 520]
    : [800, 210, 460, 640];

  return <AnnotationStepPreview step={step} japanese={japanese} title={titles[step] || titles[0]}
    screen={screens[step] || screens[0]} bounds={bounds} command="linear-dimension"
    icon={<LinearDimensionIcon title={titles[0]} />} />;
}
