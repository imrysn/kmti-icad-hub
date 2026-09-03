import { WrittenTutorialCopy, WrittenTutorialStep } from './types';

export const INTERFACE_WRITTEN_TUTORIAL_COPY: WrittenTutorialCopy = {
  title: 'iCAD SX Interface',
  description: 'is the main screen where you create and edit 2D drawings and 3D models. Understanding each part makes it easier to find tools and work efficiently.',
  moduleLabel: '',
  procedureTitle: 'ivl-objective',
  objective: 'By the end of this lesson, you will be able to identify the main parts of the iCAD interface and understand their basic functions.',
  completionText: 'Great job! You have completed the iCAD Interface lesson.',
  hideStepNumbers: false,
  inlineHeader: true,
  renderAsObjective: true,
};

export const INTERFACE_WRITTEN_TUTORIAL_STEPS: WrittenTutorialStep[] = [
  {
    id: 'interface-title-bar',
    title: 'Title Bar',
    text: 'Displays the name of the program and typically the name of the currently active document.',
    preserveText: true,
  },
  {
    id: 'interface-menu-bar',
    title: 'Menu Bar',
    text: 'Contains drop-down menus such as File, View, Information, Set, Tool, Window, and Help.',
    preserveText: true,
  },
  {
    id: 'interface-command-menu',
    title: 'Command Menu',
    text: 'Contains sets of available commands associated with different functions. Preferably used in 2D.',
    preserveText: true,
  },
  {
    id: 'interface-tree-view',
    title: 'Tree View',
    text: 'Displays the 3D parts and groups for the drawing currently being worked on.',
    preserveText: true,
  },
  {
    id: 'interface-workspace',
    title: 'Workspace',
    text: 'Area where 3D Modeling and Assembly operations are done.',
    preserveText: true,
  },
  {
    id: 'interface-icon-menu',
    title: 'Icon Menu',
    text: 'Contains commands for performing 3D Modeling operations. Other options can be found in the Command Menu.',
    preserveText: true,
  },
  {
    id: 'interface-item-entry',
    title: 'Item Entry',
    text: 'Used for entering the values and characters necessary for command execution.',
    preserveText: true,
  },
  {
    id: 'interface-key-entry',
    title: 'Key Entry',
    text: 'Used for direct numerical coordinate input (X, Y, Z) and keyboard values.',
    preserveText: true,
  },
  {
    id: 'interface-tool-bar',
    title: 'Tool Bar',
    text: 'Provides shorcuts to commonly used tools.',
    preserveText: true,
  },
  {
    id: 'interface-message-pane',
    title: 'Message Pane',
    text: 'Displays operational messages, warnings, and error prompts from iCAD during command execution.',
    preserveText: true,
  },
];
