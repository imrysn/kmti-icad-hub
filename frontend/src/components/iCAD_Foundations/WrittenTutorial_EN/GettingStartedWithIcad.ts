import { WrittenTutorialCopy, WrittenTutorialStep } from './types';

export const GETTING_STARTED_WRITTEN_TUTORIAL_COPY: WrittenTutorialCopy = {
  title: 'iCAD SX Tutorial: Getting Started with iCAD',
  moduleLabel: 'About the Lesson',
  description:
    'Different design objects require different software for optimal design. Many 3D design software programs excel at handling complex shapes and surfaces, but struggle with large assemblies. iCAD SX is a 3D design software developed for machine and equipment design, focusing on processes with thousands or tens of thousands of components. iCAD SX is a 3D CAD tool that processes data 200 times faster than other 3D software. This 3D design software can process 1 million parts in just 0.2 seconds.',
  description2:
    'Thanks to the digitization of design information, we can now easily verify safety, examine the assembly of entire components, confirm user operation of the machine, and estimate the cost and machining method of a component using iCAD SX, before the machine is actually manufactured. iCAD SX integrates mechanical, electrical, and control design into a single software. This creates a unified design environment, centralizes design information, links data, allows simultaneous review and use of the latest information from each other, and improves design performance and efficiency.',
  procedureTitle: 'Engineering Workflow',
  objective: 'Understand what iCAD is and how it is used in machine and equipment engineering design.',
  quickReviewTitle: 'Quick Review',
  quickReviewText: '<b>Machine & Equipment Focus</b> → <b>1M Parts in 0.2s (200x Faster)</b> → <b>Digital Pre-Verification</b> → <b>Unified Mech / Elec / Control</b>',
  completionText: 'Great job! You have completed the Getting Started with iCAD lesson.',
};

export const GETTING_STARTED_WRITTEN_TUTORIAL_STEPS: WrittenTutorialStep[] = [
  {
    id: 'start-step-1',
    title: 'Machine & Equipment Specialization',
    text: 'While many 3D CAD programs excel at complex curved surfaces, they struggle with large assemblies. iCAD SX is specifically engineered for machine and equipment design with thousands or tens of thousands of parts.',
    preserveText: true,
  },
  {
    id: 'start-step-2',
    title: 'Ultra-Fast 3D Processing Performance',
    text: 'iCAD SX processes data 200 times faster than other 3D software, capable of processing 1 million parts in just 0.2 seconds.',
    preserveText: true,
  },
  {
    id: 'start-step-3',
    title: 'Pre-Manufacturing Digital Verification',
    text: 'Digitization of design information allows engineers to verify safety, examine assembly of entire components, confirm user operation of the machine, and estimate component costs and machining methods before manufacturing.',
    preserveText: true,
  },
  {
    id: 'start-step-4',
    title: 'Unified Mechanical, Electrical & Control Design',
    text: 'iCAD SX integrates mechanical, electrical, and control design into a single software platform. This centralizes design information, links data, allows simultaneous review, and improves design performance and efficiency.',
    preserveText: true,
  },
  {
    id: 'start-step-5',
    title: 'Create or Open Drawing',
    text: 'Start a new project or open an existing CAD document from the training directory. The basic workflow proceeds: Create/Open Drawing → 2D Sketch → 3D Model → Assembly → 2D Drawing → Review & Save.',
    preserveText: true,
  },
  {
    id: 'start-step-6',
    title: 'Guide Notice & Translation (V7)',
    text: 'This guide is translated from the tutorial for iCAD SX version V7. Due to the urgency of learning the software, coupled with language limitations and limited user experience, some inaccuracies may occur during the compilation process. Please send any feedback to your training lead or CAD administrator.',
    preserveText: true,
  },
];
