export type TutorialOverlayType =
  | 'highlight'
  | 'callout'
  | 'arrow'
  | 'dimensionAnnotation'
  | 'polygonOutline'
  | 'quiz'
  | 'recap';

export interface NormalizedPoint {
  x: number;
  y: number;
}

export interface NormalizedRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface TutorialOverlay {
  id: string;
  type: TutorialOverlayType;
  startTime: number;
  endTime: number;
  target?: NormalizedRect;
  label?: string;
  labelPosition?: 'top' | 'bottom' | 'left' | 'right';
  labelOffset?: { x: number; y: number };
  animation?: 'none' | 'pulse' | 'flash';
  narrate?: boolean;
  centerCaption?: boolean;
  captionPosition?: NormalizedPoint;
  line?: {
    start: NormalizedPoint;
    end: NormalizedPoint;
    controlPoint?: NormalizedPoint;
  };
  /** Elliptical arc used for angular or perimeter-style dimensions. Angles are in degrees. */
  arc?: {
    center: NormalizedPoint;
    radiusX: number;
    radiusY: number;
    startAngle: number;
    endAngle: number;
  };
  /** Ordered vertices for a closed polygon outline, using normalized video coordinates. */
  points?: NormalizedPoint[];
  dimensionType?: 'horizontal' | 'vertical' | 'diagonal' | 'arc';
  quizData?: {
    question: string;
    options: { text: string; isCorrect: boolean; feedback: string }[];
  };
  recapData?: {
    title: string;
    items: string[];
  };
}

export interface LessonVideoStep {
  id: string | number;
  title: string;
  customText: string;
  narrationText?: string;
  preserveText?: boolean;
  videoStart: number;
  videoEnd: number;
  holdVideo?: boolean;
  /** When enabled, narrate the step completely before starting its video segment. */
  waitForNarrationBeforeVideo?: boolean;
  /** Advance to the following lesson step when the source MP4 itself ends. */
  advanceOnSourceVideoEnd?: boolean;
  narrateTitle?: boolean;
  narrationEnabled?: boolean;
  quizData?: TutorialOverlay['quizData'];
  recapData?: TutorialOverlay['recapData'];
  overlays?: TutorialOverlay[];
}
