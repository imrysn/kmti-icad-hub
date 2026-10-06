import { useId, type ReactNode } from 'react';
import InterfaceIconPreview from './InterfaceIconPreview';
import type { AnnotationCommand } from './AnnotationCommandIcon';
import sizes from './annotationScreenSizes.json';
import './AnnotationStepPreview.css';
import AnnotationModelPreview from './AnnotationModelPreview';

// Native capture coordinates, excluding adjacent toolbar commands.
const commandBounds: Record<AnnotationCommand, [number, number, number, number]> = {
  'linear-dimension': [1752, 158, 29, 30],
  'diameter-dimension': [1783, 158, 30, 30],
  'angular-dimension': [1815, 158, 30, 30],
  'notes-leader-lines': [1783, 262, 30, 30],
  'character-strings': [1752, 262, 29, 30],
  'edit-characters': [1783, 210, 30, 30],
  'change-attributes': [1815, 210, 30, 30],
  'change-position': [1752, 210, 29, 30],
};

export default function AnnotationStepPreview({ step, japanese, title, screen, bounds, command, icon }: {
  step: number; japanese: boolean; title: string; screen: string;
  bounds: [number, number, number, number]; command: AnnotationCommand; icon: ReactNode;
}) {
  const clipId = useId();
  // Vite may append a hash to asset URLs in production; match the original name's stem.
  const filename = Object.keys(sizes).sort((a,b)=>b.length-a.length).find(name => screen.includes(name.replace('.png', '')));
  const size = (filename ? sizes[filename as keyof typeof sizes] : [1024, 576]) as [number, number];
  let crop: [number, number, number, number] = step === 0 ? commandBounds[command]
    : [bounds[0] * size[0] / 1920, bounds[1] * size[1] / 1080,
      bounds[2] * size[0] / 1920, bounds[3] * size[1] / 1080];
  if (command === 'edit-characters' && step > 0) crop = step === 2 ? [7, 43, 733, 408] : [850, 275, 375, 600];
  if (command === 'change-attributes' && step > 0) crop = step === 2 ? [270, 375, 455, 370] : [850, 275, 375, 600];
  if (command === 'change-position' && step > 0) crop = [850, 295, 375, 580];
  if (command === 'character-strings' && step > 0) crop = step === 1 || step === 2 ? [12, 82, 642, 270] : [850, 275, 375, 600];
  if (command === 'linear-dimension' && step > 0) crop = step === 1 ? [905, 390, 305, 405] : [905, 300, 305, 495];
  if (command === 'diameter-dimension' && step > 0) crop = [905, 390, 310, 405];
  if (command === 'notes-leader-lines' && step > 0) crop = step === 2 || step === 3 ? [12, 82, 642, 270] : [905, 300, 315, 495];
  if (command === 'angular-dimension' && step > 0) crop = [630, 445, 1065, 320];
  const region: [number, number, number, number] = [crop[0] / size[0] * 1920,
    crop[1] / size[1] * 1080, crop[2] / size[0] * 1920, crop[3] / size[1] * 1080];
  const isDialog = (command === 'edit-characters' || command === 'change-attributes') && step === 2
    || command === 'notes-leader-lines' && (step === 2 || step === 3)
    || command === 'character-strings' && (step === 1 || step === 2);
  const artwork = step === 0 ? <div className="annotation-command-icon">{icon}</div>
    : !isDialog ? <AnnotationModelPreview command={command} step={step} title={title} />
    : <svg className="stretch-vector annotation-capture" viewBox={crop.join(' ')} role="img" aria-label={title}>
      <defs><clipPath id={clipId}><rect x={crop[0]} y={crop[1]} width={crop[2]} height={crop[3]} /></clipPath></defs>
      <image href={screen} width={size[0]} height={size[1]} clipPath={`url(#${clipId})`} />
    </svg>;
  return <span className="annotation-step-preview"><InterfaceIconPreview index={step} toolbar={false}
    title={title} japanese={japanese} custom={{ artwork, screen, screenSize: size, screenFit: 'viewport',
      region: { bounds: region, landing: region }, highlightColor: '#0087ef' }} /></span>;
}
