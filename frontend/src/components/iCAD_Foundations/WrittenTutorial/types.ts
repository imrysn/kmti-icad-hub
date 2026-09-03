export interface WrittenTutorialStep {
  id: string | number;
  title: string;
  text: string;
  preserveText?: boolean;
}

export interface WrittenTutorialCopy {
  moduleLabel: string;
  procedureTitle: string;
  completionText: string;
  title: string;
}

export interface WrittenTutorialModule {
  id: string;
  title: string;
  copy: WrittenTutorialCopy;
  steps: WrittenTutorialStep[];
}
