import AnnotationStepPreview from './AnnotationStepPreview';
import AnnotationCommandIcon from './AnnotationCommandIcon';
import command from '../../assets/icad-foundations/annotation/annotation-command-interface.png';
import selected from '../../assets/icad-foundations/annotation/angular-dimension-selected.png';
import result from '../../assets/icad-foundations/annotation/angular-dimension-result.png';

export function AngularDimensionIcon({ title }: { title?: string }) {
  return <AnnotationCommandIcon command="angular-dimension" title={title} reference="angular-dimension" />;
}

export default function AngularDimensionArtwork({ step, japanese }: { step: number; japanese: boolean }) {
  const titles = japanese
    ? ['\u89d2\u5ea6\u5bf8\u6cd5\u30a2\u30a4\u30b3\u30f3\u3092\u9078\u629e', '\u6e2c\u5b9a\u3059\u308b\u30a8\u30c3\u30b8\u3092\u9078\u629e', '\u89d2\u5ea6\u5bf8\u6cd5\u306e\u4f4d\u7f6e\u3092\u6307\u5b9a', '\u5b8c\u4e86\u7d50\u679c\u306e\u78ba\u8a8d']
    : ['Select the Angular Dimension Icon', 'Select the Edges to be Measured', 'Position the Angular Dimension', 'Check the Final Result'];

  const screens = [command, selected, result, result];
  const bounds: [number, number, number, number] = step === 0
    ? [1785, 157, 46, 67]
    : [800, 210, 460, 640];

  return <AnnotationStepPreview step={step} japanese={japanese} title={titles[step] || titles[0]}
    screen={screens[step] || screens[0]} bounds={bounds} command="angular-dimension"
    icon={<AngularDimensionIcon title={titles[0]} />} />;
}
