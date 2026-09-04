import { WrittenTutorialCopy, WrittenTutorialStep } from './types';

export const SAVING_WORK_WRITTEN_TUTORIAL_COPY: WrittenTutorialCopy = {
  title: 'Save training work following proper file naming conventions and folder structures.',
  moduleLabel: 'About the Lesson',
  procedureTitle: 'Procedure',
  quickReviewTitle: 'Quick Review',
  quickReviewText:
    '<b>File Menu</b> → <b>Save As</b> → <b>Enter File Name</b> → <b>Confirm & Verify Title Bar</b>',
  completionText: 'Great job! You have completed the Saving Your Work lesson.',
};

export const SAVING_WORK_WRITTEN_TUTORIAL_STEPS: WrittenTutorialStep[] = [
  {
    id: 'save-step-1',
    title: 'Open File Menu',
    text: 'Click File on the top menu bar or use the dedicated save icon in the toolbar.',
    preserveText: true,
  },
  {
    id: 'save-step-2',
    title: 'Select Save As',
    text: 'Choose Save As to specify a designated training destination folder.',
    preserveText: true,
  },
  {
    id: 'save-step-3',
    title: 'Enter File Name',
    text: 'Enter the designated practice filename following standards (e.g. ICAD_FOUNDATION_PRACTICE_01).',
    preserveText: true,
  },
  {
    id: 'save-step-4',
    title: 'Confirm and Verify Save',
    text: 'Click Save and verify that the updated file name appears in the application Title Bar.',
    preserveText: true,
  },
];
