import { WrittenTutorialCopy, WrittenTutorialStep } from './types';

export const TROUBLESHOOTING_WRITTEN_TUTORIAL_COPY: WrittenTutorialCopy = {
  title: 'Recognize and quickly resolve common beginner issues in navigation, selection, and commands.',
  moduleLabel: 'About the Lesson',
  procedureTitle: 'Troubleshooting Guide',
  quickReviewTitle: 'Quick Review',
  quickReviewText:
    '<b>Lost Model</b> (Fit to Screen) → <b>Stuck View</b> (Check Viewport) → <b>Wrong Entity</b> (Esc / Undo) → <b>Awaiting Input</b> (Check Message Pane)',
  completionText: 'Great job! You have completed the Beginner Troubleshooting lesson.',
};

export const TROUBLESHOOTING_WRITTEN_TUTORIAL_STEPS: WrittenTutorialStep[] = [
  {
    id: 'trouble-step-1',
    title: 'Model Disappeared from View',
    text: 'If you panned or zoomed away, click Fit / Fit to Screen on the toolbar to bring the model back to center.',
    preserveText: true,
  },
  {
    id: 'trouble-step-2',
    title: 'Cannot Rotate Model',
    text: 'Ensure the cursor is within the workspace viewport and that no conflicting command modal is active.',
    preserveText: true,
  },
  {
    id: 'trouble-step-3',
    title: 'Wrong Geometry Selected',
    text: 'Press Escape to deselect, or use Undo (Ctrl+Z) if an unintended modification occurred.',
    preserveText: true,
  },
  {
    id: 'trouble-step-4',
    title: 'System Waiting on Command',
    text: 'Check the Message Pane and Item Entry area to see what input (Point, Value, Selection) iCAD requires next.',
    preserveText: true,
  },
];
