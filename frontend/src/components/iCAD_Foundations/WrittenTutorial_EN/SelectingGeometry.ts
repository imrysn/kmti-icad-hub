import { WrittenTutorialCopy, WrittenTutorialStep } from './types';

export const SELECTING_GEOMETRY_WRITTEN_TUTORIAL_COPY: WrittenTutorialCopy = {
  title: 'Selecting Geometry',
  moduleLabel: 'About the Lesson',
  description: 'In iCAD SX, geometry selection is required before modifying any part. Using the Move tool, you will practice identifying prompts, verifying the yellow highlight, and confirming selections.',
  procedureTitle: 'Procedure',
  objective: 'By the end of this lesson, you will be able to select 3D geometry and confirm your selection using the Move tool in iCAD SX.',
  quickReviewTitle: 'Quick Review',
  quickReviewText: '<b>Move Tool</b> → <b>Check Prompt</b> → <b>Hover Target (Yellow Outline)</b> → <b>Left-Click to Select</b> → <b>Confirm with GO</b>',
  completionText: 'Great job! You have mastered selecting geometry in iCAD SX.',
};

export const SELECTING_GEOMETRY_WRITTEN_TUTORIAL_STEPS: WrittenTutorialStep[] = [
  {
    id: 'select-step-1',
    title: 'Select Move Tool',
    text: 'Click 移動 (Move) under the 移動・コピー・削除 (Move / Copy / Delete) menu on the right toolbar.',
    preserveText: true,
  },
  {
    id: 'select-step-2',
    title: 'Check Guidance Prompt',
    text: 'Check the bottom guidance bar: 対象要素　GO<選択終了/一時グループ>. This indicates iCAD is waiting for you to pick an object.',
    preserveText: true,
  },
  {
    id: 'select-step-3',
    title: 'Hover to Verify Highlight',
    text: 'Move your cursor over the 3D block. The edges highlight in yellow, confirming which geometry will be selected.',
    preserveText: true,
  },
  {
    id: 'select-step-4',
    title: 'Left-Click to Select',
    text: 'Left-click the object. The outline changes color, showing the part is now selected.',
    preserveText: true,
  },
  {
    id: 'select-step-5',
    title: 'Confirm with GO',
    text: 'Click GO in the guidance prompt or press the Enter key to finish selecting.',
    preserveText: true,
  },
  {
    id: 'select-step-6',
    title: 'Enter Movement Distance',
    text: 'In the bottom item entry area, enter the movement distance (X, Y, Z) and press Enter to complete the move.',
    preserveText: true,
  },
];

export default SELECTING_GEOMETRY_WRITTEN_TUTORIAL_STEPS;
