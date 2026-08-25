export interface InteractiveVideoChoice {
  id: string;
  label: string;
  isCorrect: boolean;
  feedback: string;
}

export interface InteractiveVideoQuestion {
  id: string;
  prompt: string;
  choices: InteractiveVideoChoice[];
}

export interface InteractiveVideoNarrationCue {
  at: number;
  narration: string;
  overlayText?: string;
  pauseVideo?: boolean;
  showSubtitle?: boolean;
}

export interface InteractiveVideoSegment {
  id: string;
  label: string;
  startAt: number;
  endAt: number;
  narration: string[];
  overlayText: string;
  narrationCues?: InteractiveVideoNarrationCue[];
  checkpoint: InteractiveVideoQuestion;
}

export interface InteractiveVideoLessonConfig {
  id: string;
  title: string;
  objective: string;
  videoSrc: string;
  videoLabel: string;
  introSupportingText: string;
  introNarration: string;
  segments: InteractiveVideoSegment[];
  conceptCheck: InteractiveVideoQuestion;
  recapNarration: string;
  recapItems: Array<{ action: string; result: string }>;
  completionText: string;
}
