import AnnotationStepPreview from './AnnotationStepPreview';
import AnnotationCommandIcon from './AnnotationCommandIcon';
import command from '../../assets/icad-foundations/annotation/annotation-command-interface.png';
import selected from '../../assets/icad-foundations/annotation/diameter-dimension-selected.png';
import result from '../../assets/icad-foundations/annotation/diameter-dimension-result.png';

export function DiameterDimensionIcon({ title }: { title?: string }) {
  return <AnnotationCommandIcon command="diameter-dimension" title={title} reference="diameter-dimension" />;
}

export default function DiameterDimensionArtwork({ step, japanese }: { step: number; japanese: boolean }) {
  const titles = japanese
    ? ['直径寸法アイコンを選択', '円のエッジを選択', '円寸法の位置を指定', '完了結果の確認']
    : ['Select the Diameter Dimension Icon', 'Select the Edge of the Circle', 'Position the Circular Dimension', 'Check the Final Result'];

  const screens = [command, selected, result, result];
  const bounds: [number, number, number, number] = step === 0
    ? [1788, 157, 41, 67]
    : [800, 210, 460, 640];

  return <AnnotationStepPreview step={step} japanese={japanese} title={titles[step] || titles[0]}
    screen={screens[step] || screens[0]} bounds={bounds} command="diameter-dimension"
    icon={<DiameterDimensionIcon title={titles[0]} />} />;
}
