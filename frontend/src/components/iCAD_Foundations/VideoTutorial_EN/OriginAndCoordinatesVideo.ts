import { LessonVideoStep } from './types';

export const ORIGIN_AXES_VIDEO_STEPS: LessonVideoStep[] = [
  {
    id: 'origin-video-intro',
    title: 'The Origin & Axes Demonstration',
    customText: 'Observe how the Origin (0, 0, 0) and the X, Y, and Z axes establish coordinates in 3D space.',
    videoStart: 0,
    videoEnd: 5,
  },
  {
    id: 'origin-video-inspect',
    title: 'Coordinate Orientation',
    customText: 'As the view rotates, note how the axes indicate model orientation.',
    videoStart: 5,
    videoEnd: 10,
    holdVideo: true,
  },
];

export default ORIGIN_AXES_VIDEO_STEPS;
