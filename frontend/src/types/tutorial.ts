export type TutorialOverlayType =
  | 'highlight'
  | 'callout'
  | 'dimensionAnnotation'
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
  };
  dimensionType?: 'horizontal' | 'vertical' | 'diagonal';
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
  videoStart: number;
  videoEnd: number;
  holdVideo?: boolean;
  narrationEnabled?: boolean;
  quizData?: TutorialOverlay['quizData'];
  recapData?: TutorialOverlay['recapData'];
  overlays?: TutorialOverlay[];
}
