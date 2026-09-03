export interface WrittenTutorialStep {
  id: string | number;
  title: string;
  text: string;
  preserveText?: boolean;
  hideStepNumber?: boolean;
}

export interface WrittenTutorialCopy {
  moduleLabel?: string;
  procedureTitle: string;
  completionText: string;
  title: string;
  description?: string;
  hideStepNumbers?: boolean;
  hideTitleBorder?: boolean;
  useStepHeaderTitle?: boolean;
  inlineHeader?: boolean;
  renderAsObjective?: boolean;
  objective?: string;
  objectiveLabel?: string;
}

export interface WrittenTutorialModule {
  id: string;
  title: string;
  copy: WrittenTutorialCopy;
  steps: WrittenTutorialStep[];
}
