import { LessonVideoStep } from './types';

export const ORIGIN_AXES_VIDEO_STEPS: LessonVideoStep[] = [
  {
    id: 'origin-video-intro',
    title: '原点と座標軸の実演',
    customText: '原点 (0, 0, 0) と X、Y、Z 軸が3D空間においてどのように座標系を確立するかを確認します。',
    videoStart: 0,
    videoEnd: 5,
  },
  {
    id: 'origin-video-inspect',
    title: '座標系の向き',
    customText: '視点が回転するにつれて、各座標軸がモデルの向きをどのように示し続けるかに注目してください。',
    videoStart: 5,
    videoEnd: 10,
    holdVideo: true,
  },
];

export default ORIGIN_AXES_VIDEO_STEPS;
