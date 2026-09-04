import { WrittenTutorialCopy, WrittenTutorialStep } from './types';

export const PRACTICAL_ASSESSMENT_WRITTEN_TUTORIAL_COPY: WrittenTutorialCopy = {
  title: 'Demonstrate independent mastery of the iCAD environment, tools, and modeling workflows.',
  moduleLabel: 'About the Lesson',
  procedureTitle: 'Assessment Checklist',
  quickReviewTitle: 'Quick Review',
  quickReviewText:
    '<b>Interface Identification</b> → <b>View Navigation</b> → <b>2D & 3D Modeling</b> → <b>Inspection & Standard Save</b>',
  completionText: 'Congratulations! You have completed the iCAD Foundations Practical Assessment.',
};

export const PRACTICAL_ASSESSMENT_WRITTEN_TUTORIAL_STEPS: WrittenTutorialStep[] = [
  {
    id: 'assess-step-1',
    title: 'Part A — Interface Identification',
    text: 'Identify Title Bar, Menu Bar, Command Menu, Workspace, Tree View, Item Entry, and Key Entry.',
    preserveText: true,
  },
  {
    id: 'assess-step-2',
    title: 'Part B — View & Navigation',
    text: 'Demonstrate fluent Zoom, Pan, View Rotate, and standard engineering projections.',
    preserveText: true,
  },
  {
    id: 'assess-step-3',
    title: 'Part C — Geometry & Modeling',
    text: 'Create designated 2D sketches and build the 3D model according to instructor specifications.',
    preserveText: true,
  },
  {
    id: 'assess-step-4',
    title: 'Part D — Inspection & Save',
    text: 'Inspect the resulting model in User View and save using the official naming convention.',
    preserveText: true,
  },
];
