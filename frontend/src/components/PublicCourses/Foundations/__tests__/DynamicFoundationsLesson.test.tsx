import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { LessonVideoStep, TutorialOverlay } from '../../../../types/tutorial';
import DynamicFoundationsLesson from '../DynamicFoundationsLesson';

const viewerSpy = vi.fn();

vi.mock('../../../3D_Modeling/VideoTutorialViewer', () => ({
  default: (props: { steps: Array<{ text: string; customText?: string; overlays?: TutorialOverlay[] }>; muteSourceVideoAudio?: boolean }) => {
    viewerSpy(props);
    return <div data-testid="video-tutorial-viewer" />;
  },
}));

vi.mock('../../../../hooks/useLessonCore', () => ({
  useLessonCore: () => ({
    scrollProgress: 0,
    containerRef: { current: null },
    speak: vi.fn(),
    stop: vi.fn(),
    isSpeaking: false,
    currentIndex: -1,
    currentCharIndex: 0,
    registerText: vi.fn(),
  }),
}));

vi.mock('../../../../hooks/useTTSAutoplay', () => ({ useTTSAutoplay: vi.fn() }));

describe('DynamicFoundationsLesson', () => {
  beforeEach(() => viewerSpy.mockClear());

  it('passes configured overlays to VideoTutorialViewer', () => {
    const overlays: TutorialOverlay[] = [
      {
        id: 'standard-views-recap',
        type: 'recap',
        startTime: 19,
        endTime: 20,
        recapData: { title: '3D View', items: ['Select a standard orientation.'] },
      },
    ];

    render(
      <DynamicFoundationsLesson
        lessonId="lesson-4-1"
        title="3D View"
        content={['Inspect the model from standard directions.']}
        videoId="lesson4.1"
        videoOverlays={overlays}
      />,
    );

    expect(screen.getByTestId('video-tutorial-viewer')).toBeInTheDocument();
    expect(viewerSpy).toHaveBeenCalled();
    const renderedStep = viewerSpy.mock.calls.at(-1)?.[0].steps[0];
    expect(renderedStep.overlays).toBe(overlays);
    expect(renderedStep.text).toBe('Inspect the model from standard directions.');
    expect(renderedStep.customText).toBe(renderedStep.text);
  });

  it('falls back to the lesson title when content has no narratable text', () => {
    render(
      <DynamicFoundationsLesson
        lessonId="lesson-4-1"
        title="3D View"
        content={['Learning Objective:']}
        videoId="lesson4.1"
      />,
    );

    const renderedStep = viewerSpy.mock.calls.at(-1)?.[0].steps[0];
    expect(renderedStep.text).toBe('3D View');
  });

  it('passes synchronized narration steps and source-audio muting to the viewer', () => {
    const videoSteps: LessonVideoStep[] = [{
      id: 'standard-view-directions',
      title: 'Choose a standard direction',
      customText: 'Select a standard view.',
      videoStart: 0,
      videoEnd: 4.45,
    }];

    render(
      <DynamicFoundationsLesson
        lessonId="lesson-4-1"
        title="3D View"
        content={['Use standard engineering views.']}
        videoId="lesson4.1"
        videoSteps={videoSteps}
        muteSourceVideoAudio
      />,
    );

    const viewerProps = viewerSpy.mock.calls.at(-1)?.[0];
    expect(viewerProps.muteSourceVideoAudio).toBe(true);
    expect(viewerProps.steps[0]).toMatchObject({
      customText: 'Select a standard view.',
      text: 'Select a standard view.',
      videoStart: 0,
      videoEnd: 4.45,
    });
  });

  it('renders Move lesson (lesson-6-1) with accurate written tutorial and video steps', () => {
    render(
      <DynamicFoundationsLesson
        lessonId="lesson-6-1"
        title="Move"
        content={[
          'Learning Objective: Identify guidance prompts, select 3D geometry, confirm selections with GO, and move components in iCAD SX.',
          'Before you can move, copy, or edit a part in iCAD SX, you must select it. The Move command demonstrates this essential selection workflow.',
          'Step 1: Select Move from the right icon menu under Move / Copy / Delete.',
          'Step 2: Check the guidance prompt at the bottom: "Target Element: GO".',
          'Step 3: Move your cursor over the 3D part and check the yellow highlight outline.',
          'Step 4: Left-click the highlighted part to select it.',
          'Step 5: Click GO (or press Enter) to finish selecting.',
          'Step 6: Enter the movement distance (X, Y, Z) and press Enter to complete the move.',
        ]}
        videoId="basicMove"
        muteSourceVideoAudio
      />,
    );

    // Verify written tutorial content
    expect(screen.getByText(/command is used to change the position of a 3D object without changing its size or shape/)).toBeInTheDocument();
    expect(screen.getByText('By the end of this lesson, you will be able to select 3D geometry, confirm your selection with GO, and move components using the Move tool in iCAD SX.')).toBeInTheDocument();
    expect(screen.getAllByText('Select Move Tool').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Select the Object').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Enter Movement Distance').length).toBeGreaterThanOrEqual(1);

    // Verify video tutorial viewer received SELECTING_GEOMETRY_VIDEO_STEPS and introPanel
    const viewerProps = viewerSpy.mock.calls.at(-1)?.[0];
    expect(viewerProps.muteSourceVideoAudio).toBe(true);
    expect(viewerProps.introPanel.title).toBe('Move');
    expect(viewerProps.introPanel.description).toContain('command is used to change the position of a 3D object');
    expect(viewerProps.steps).toHaveLength(7);
    expect(viewerProps.steps[0].title).toBe('Move Introduction');
    expect(viewerProps.steps[1].title).toBe('1. Select Move Tool');
    expect(viewerProps.steps[2].title).toBe('2. Select the Object');
    expect(viewerProps.steps[3].title).toBe('Knowledge Check: Selection Confirmation');
    expect(viewerProps.steps[4].title).toBe('3. Enter Movement Distance');
    expect(viewerProps.steps[5].title).toBe('4. Confirm & Verify Movement');
    expect(viewerProps.steps[6].title).toBe('Move Recap');
  });

  it('renders Rotate lesson (lesson-6-2) with accurate written tutorial and video steps', () => {
    render(
      <DynamicFoundationsLesson
        lessonId="lesson-6-2"
        title="Rotate"
        content={[
          'Learning Goal: By the end of this lesson, you will be able to rotate a 3D object to the desired angle in iCAD SX.',
          'The Rotate command is used to turn a 3D object around a selected axis without changing its size or shape.',
          'Step 1: Select Rotate from the Icon Menu.',
          'Step 2: Left-click the object you want to rotate.',
          'Step 3: Select 2 points to define the axis where the object will rotate.',
          'Step 4: In the Item Entry, enter the desired rotation angle (Example: 90°) and press Enter to complete the rotation.',
        ]}
        videoId="basicRotate"
        muteSourceVideoAudio
      />,
    );

    // Verify written tutorial content
    expect(screen.getByText('command is used to turn a 3D object around a selected axis without changing its size or shape.')).toBeInTheDocument();
    expect(screen.getByText('By the end of this lesson, you will be able to rotate a 3D object to the desired angle in iCAD SX.')).toBeInTheDocument();
    expect(screen.getByText('How to Rotate an Object')).toBeInTheDocument();
    expect(screen.getAllByText('Select Rotate').length).toBeGreaterThanOrEqual(2);
    expect(screen.getByText('From the Icon Menu, select Rotate.')).toBeInTheDocument();
    expect(screen.getAllByText('Select the Object').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('Left-click the object you want to rotate.')).toBeInTheDocument();
    expect(screen.getAllByText('Set the Rotation Axis').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('Select 2 points to define the axis where the object will rotate.')).toBeInTheDocument();
    expect(screen.getByText('Enter the Rotation Angle')).toBeInTheDocument();
    expect(screen.getByText('When to Use Rotate')).toBeInTheDocument();

    // Verify video tutorial viewer received ROTATE_VIDEO_STEPS and introPanel
    const viewerProps = viewerSpy.mock.calls.at(-1)?.[0];
    expect(viewerProps.muteSourceVideoAudio).toBe(true);
    expect(viewerProps.introPanel.title).toBe('Rotate');
    expect(viewerProps.introPanel.description).toBe('The Rotate command is used to turn a 3D object around a selected axis without changing its size or shape.');
    expect(viewerProps.steps).toHaveLength(8);
    expect(viewerProps.steps[0].title).toBe('Rotate Introduction');
    expect(viewerProps.steps[0].customText).toContain('The Rotate command is used to turn a 3D object around a selected axis');
    expect(viewerProps.steps[1].title).toBe('1. Select Rotate');
    expect(viewerProps.steps[2].title).toBe('2. Select the Object');
    expect(viewerProps.steps[3].title).toBe('3. Set the Rotation Axis');
    expect(viewerProps.steps[4].title).toBe('Knowledge Check: Rotation Axis');
    expect(viewerProps.steps[5].title).toBe('4. Enter the Rotation Angle');
    expect(viewerProps.steps[6].title).toBe('5. Verify Rotated Object');
    expect(viewerProps.steps[7].title).toBe('Rotate Recap');
  });

  it('renders Mirror lesson (lesson-6-3) with accurate written tutorial and video steps', () => {
    render(
      <DynamicFoundationsLesson
        lessonId="lesson-6-3"
        title="Mirror"
        content={[
          'Learning Goal: By the end of this lesson, you will be able to mirror a 3D object to the opposite side in iCAD SX.',
          'The Mirror command is used to create a mirrored copy of a 3D object across a selected plane.',
          'Step 1: Select Mirror from the Icon Menu.',
          'Step 2: Left-click the object you want to mirror.',
          'Step 3: Select 3 points to define the plane where the object will be mirrored (or left-click a face to use that face as the mirror plane).',
          'Step 4: Confirm the selection to create the mirrored result.',
        ]}
        videoId="basicMirror"
        muteSourceVideoAudio
      />,
    );

    // Verify written tutorial content
    expect(screen.getByText('command is used to create a mirrored copy of a 3D object across a selected plane.')).toBeInTheDocument();
    expect(screen.getByText('By the end of this lesson, you will be able to mirror a 3D object to the opposite side in iCAD SX.')).toBeInTheDocument();
    expect(screen.getByText('How to Mirror an Object')).toBeInTheDocument();
    expect(screen.getAllByText('Select Mirror').length).toBeGreaterThanOrEqual(2);
    expect(screen.getByText('From the Icon Menu, select Mirror.')).toBeInTheDocument();
    expect(screen.getAllByText('Select the Object').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('Left-click the object you want to mirror.')).toBeInTheDocument();
    expect(screen.getByText('Set the Mirror Plane')).toBeInTheDocument();
    expect(screen.getByText('When to Use Mirror')).toBeInTheDocument();

    // Verify video tutorial viewer received MIRROR_VIDEO_STEPS and introPanel
    const viewerProps = viewerSpy.mock.calls.at(-1)?.[0];
    expect(viewerProps.muteSourceVideoAudio).toBe(true);
    expect(viewerProps.introPanel.title).toBe('Mirror');
    expect(viewerProps.introPanel.description).toBe('The Mirror command is used to create a mirrored copy of a 3D object across a selected plane.');
    expect(viewerProps.steps).toHaveLength(7);
    expect(viewerProps.steps[0].title).toBe('Mirror Introduction');
    expect(viewerProps.steps[0].customText).toContain('The Mirror command is used to create a mirrored copy');
    expect(viewerProps.steps[1].title).toBe('1. Select Mirror');
    expect(viewerProps.steps[2].title).toBe('2. Select the Object');
    expect(viewerProps.steps[3].title).toBe('3. Set the Mirror Plane');
    expect(viewerProps.steps[4].title).toBe('Knowledge Check: Mirror Plane');
    expect(viewerProps.steps[5].title).toBe('4. Confirm & Verify');
    expect(viewerProps.steps[6].title).toBe('Mirror Recap');
  });

  it('renders Copy lesson (lesson-6-4) with accurate written tutorial and video steps', () => {
    render(
      <DynamicFoundationsLesson
        lessonId="lesson-6-4"
        title="Copy"
        content={[
          'Learning Goal: By the end of this lesson, you will be able to copy a 3D object and place the copies at a specified distance.',
          'The Copy command is used to create one or more duplicates of a 3D object while keeping the original object.',
          'Step 1: From the Icon Menu, select Copy.',
          'Step 2: Left-click the object you want to copy.',
          'Step 3: In the Item Entry, enter the movement distance for X-axis, Y-axis, Z-axis, then enter the number of copies and press Enter to complete the command.',
        ]}
        videoId="basicCopy"
        muteSourceVideoAudio
      />,
    );

    // Verify written tutorial content
    expect(screen.getByText('command is used to create one or more duplicates of a 3D object while keeping the original object.')).toBeInTheDocument();
    expect(screen.getByText('By the end of this lesson, you will be able to copy a 3D object and place the copies at a specified distance.')).toBeInTheDocument();
    expect(screen.getByText('How to Use Copy')).toBeInTheDocument();
    expect(screen.getAllByText('Select Copy').length).toBeGreaterThanOrEqual(2);
    expect(screen.getByText('From the Icon Menu, select Copy.')).toBeInTheDocument();
    expect(screen.getAllByText('Select the Object').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('Left-click the object you want to copy.')).toBeInTheDocument();
    expect(screen.getByText('Enter the Copy Distance')).toBeInTheDocument();
    expect(screen.getByText('When to Use Copy')).toBeInTheDocument();

    // Verify video tutorial viewer received COPY_VIDEO_STEPS and introPanel
    const viewerProps = viewerSpy.mock.calls.at(-1)?.[0];
    expect(viewerProps.muteSourceVideoAudio).toBe(true);
    expect(viewerProps.introPanel.title).toBe('Copy');
    expect(viewerProps.introPanel.description).toBe('The Copy command is used to create one or more duplicates of a 3D object while keeping the original object.');
    expect(viewerProps.steps).toHaveLength(7);
    expect(viewerProps.steps[0].title).toBe('Copy Introduction');
    expect(viewerProps.steps[0].customText).toContain('The Copy command is used to create one or more duplicates');
    expect(viewerProps.steps[1].title).toBe('1. Select Copy');
    expect(viewerProps.steps[2].title).toBe('2. Select the Object');
    expect(viewerProps.steps[3].title).toBe('3. Enter the Copy Distance');
    expect(viewerProps.steps[4].title).toBe('Knowledge Check: Copy Command');
    expect(viewerProps.steps[5].title).toBe('4. Verify Duplicate Copies');
    expect(viewerProps.steps[6].title).toBe('Copy Recap');
  });

  it('renders Rotate Copy lesson (lesson-6-5) with accurate written tutorial and video steps', () => {
    render(
      <DynamicFoundationsLesson
        lessonId="lesson-6-5"
        title="Rotate Copy"
        content={[
          'Learning Goal: By the end of this lesson, you will be able to create a rotated copy of a 3D object in iCAD SX.',
          'The Rotate Copy command works like the Rotate tool, but it creates a rotated duplicate while keeping the original object.',
          'Step 1: From the Icon Menu, select Rotate Copy.',
          'Step 2: Left-click the object you want to copy and rotate.',
          'Step 3: Select 2 points to define the axis of rotation.',
          'Step 4: In the Item Entry, enter the desired angle (Example: 90°) and press Enter to create the rotated copy.',
        ]}
        videoId="basicRotateCopy"
        muteSourceVideoAudio
      />,
    );

    // Verify written tutorial content
    expect(screen.getByText('command works like the Rotate tool, but it creates a rotated duplicate while keeping the original object.')).toBeInTheDocument();
    expect(screen.getByText('By the end of this lesson, you will be able to create a rotated copy of a 3D object in iCAD SX.')).toBeInTheDocument();
    expect(screen.getByText('How to Use Rotate Copy')).toBeInTheDocument();
    expect(screen.getAllByText('Select Rotate Copy').length).toBeGreaterThanOrEqual(2);
    expect(screen.getByText('From the Icon Menu, select Rotate Copy.')).toBeInTheDocument();
    expect(screen.getAllByText('Select the Object').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('Left-click the object you want to copy and rotate.')).toBeInTheDocument();
    expect(screen.getAllByText('Set the Rotation Axis').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('Select 2 points to define the axis of rotation.')).toBeInTheDocument();
    expect(screen.getByText('Enter the Rotation Angle')).toBeInTheDocument();
    expect(screen.getByText('When to Use Rotate Copy')).toBeInTheDocument();

    // Verify video tutorial viewer received ROTATE_COPY_VIDEO_STEPS and introPanel
    const viewerProps = viewerSpy.mock.calls.at(-1)?.[0];
    expect(viewerProps.muteSourceVideoAudio).toBe(true);
    expect(viewerProps.introPanel.title).toBe('Rotate Copy');
    expect(viewerProps.introPanel.description).toBe('The Rotate Copy command works like the Rotate tool, but it creates a rotated duplicate while keeping the original object.');
    expect(viewerProps.steps).toHaveLength(8);
    expect(viewerProps.steps[0].title).toBe('Rotate Copy Introduction');
    expect(viewerProps.steps[0].customText).toContain('The Rotate Copy command works like the Rotate tool');
    expect(viewerProps.steps[1].title).toBe('1. Select Rotate Copy');
    expect(viewerProps.steps[2].title).toBe('2. Select the Object');
    expect(viewerProps.steps[3].title).toBe('3. Set the Rotation Axis');
    expect(viewerProps.steps[4].title).toBe('4. Enter the Rotation Angle');
    expect(viewerProps.steps[5].title).toBe('Knowledge Check: Rotate Copy');
    expect(viewerProps.steps[6].title).toBe('5. Verify Rotated Copies');
    expect(viewerProps.steps[7].title).toBe('Rotate Copy Recap');
  });

  it('renders Mirror Copy lesson (lesson-6-6) with accurate written tutorial and video steps', () => {
    render(
      <DynamicFoundationsLesson
        lessonId="lesson-6-6"
        title="Mirror Copy"
        content={[
          'Learning Goal: By the end of this lesson, you will be able to create a mirrored copy of a 3D object in iCAD SX.',
          'The Mirror Copy command works like the Mirror tool, but it creates a mirrored duplicate while keeping the original object.',
          'Step 1: From the Icon Menu, select Mirror Copy.',
          'Step 2: Left-click the object you want to copy and mirror.',
          'Step 3: Select 3 points to define the mirror plane (or select a face to use as the mirror plane).',
          'Step 4: Confirm the selection to create the mirrored copy.',
        ]}
        videoId="basicMirrorCopy"
        muteSourceVideoAudio
      />,
    );

    // Verify written tutorial content
    expect(screen.getByText('command works like the Mirror tool, but it creates a mirrored duplicate while keeping the original object.')).toBeInTheDocument();
    expect(screen.getByText('By the end of this lesson, you will be able to create a mirrored copy of a 3D object in iCAD SX.')).toBeInTheDocument();
    expect(screen.getByText('How to Use Mirror Copy')).toBeInTheDocument();
    expect(screen.getAllByText('Select Mirror Copy').length).toBeGreaterThanOrEqual(2);
    expect(screen.getByText('From the Icon Menu, select Mirror Copy.')).toBeInTheDocument();
    expect(screen.getAllByText('Select the Object').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('Left-click the object you want to copy and mirror.')).toBeInTheDocument();
    expect(screen.getByText('Set the Mirror Plane')).toBeInTheDocument();
    expect(screen.getByText('When to Use Mirror Copy')).toBeInTheDocument();

    // Verify video tutorial viewer received MIRROR_COPY_VIDEO_STEPS and introPanel
    const viewerProps = viewerSpy.mock.calls.at(-1)?.[0];
    expect(viewerProps.muteSourceVideoAudio).toBe(true);
    expect(viewerProps.introPanel.title).toBe('Mirror Copy');
    expect(viewerProps.introPanel.description).toBe('The Mirror Copy command works like the Mirror tool, but it creates a mirrored duplicate while keeping the original object.');
    expect(viewerProps.steps).toHaveLength(7);
    expect(viewerProps.steps[0].title).toBe('Mirror Copy Introduction');
    expect(viewerProps.steps[0].customText).toContain('The Mirror Copy command works like the Mirror tool');
    expect(viewerProps.steps[1].title).toBe('1. Select Mirror Copy');
    expect(viewerProps.steps[2].title).toBe('2. Select the Object');
    expect(viewerProps.steps[3].title).toBe('3. Set the Mirror Plane');
    expect(viewerProps.steps[4].title).toBe('Knowledge Check: Mirror Copy');
    expect(viewerProps.steps[5].title).toBe('4. Confirm Mirrored Copy');
    expect(viewerProps.steps[6].title).toBe('Mirror Copy Recap');
  });

  it('renders Delete lesson (lesson-6-7) with accurate written tutorial and video steps', () => {
    render(
      <DynamicFoundationsLesson
        lessonId="lesson-6-7"
        title="Delete"
        content={[
          'Learning Goal: By the end of this lesson, you will be able to delete a selected object in iCAD SX.',
          'The Delete command is used to remove an unwanted object from the 3D model.',
          'Step 1: From the Icon Menu, select Delete.',
          'Step 2: Left-click the object you want to remove.',
          'Step 3: Confirm the selection to delete the object.',
        ]}
        videoId="basicDelete"
        muteSourceVideoAudio
      />,
    );

    // Verify written tutorial content
    expect(screen.getByText('command is used to remove an unwanted object from the 3D model.')).toBeInTheDocument();
    expect(screen.getByText('By the end of this lesson, you will be able to delete a selected object in iCAD SX.')).toBeInTheDocument();
    expect(screen.getByText('How to Use Delete')).toBeInTheDocument();
    expect(screen.getAllByText('Select Delete').length).toBeGreaterThanOrEqual(2);
    expect(screen.getByText('From the Icon Menu, select Delete.')).toBeInTheDocument();
    expect(screen.getAllByText('Select the Object').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('Left-click the object you want to remove.')).toBeInTheDocument();
    expect(screen.getByText('Confirm the selection to delete the object.')).toBeInTheDocument();
    expect(screen.getByText('When to Use Delete')).toBeInTheDocument();

    // Verify video tutorial viewer received DELETE_VIDEO_STEPS and introPanel
    const viewerProps = viewerSpy.mock.calls.at(-1)?.[0];
    expect(viewerProps.muteSourceVideoAudio).toBe(true);
    expect(viewerProps.introPanel.title).toBe('Delete');
    expect(viewerProps.introPanel.description).toBe('The Delete command is used to remove an unwanted object from the 3D model.');
    expect(viewerProps.steps).toHaveLength(6);
    expect(viewerProps.steps[0].title).toBe('Delete Introduction');
    expect(viewerProps.steps[0].customText).toContain('The Delete command is used to remove an unwanted object');
    expect(viewerProps.steps[1].title).toBe('1. Select Delete');
    expect(viewerProps.steps[2].title).toBe('2. Select the Object');
    expect(viewerProps.steps[3].title).toBe('Knowledge Check: Delete Confirmation');
    expect(viewerProps.steps[4].title).toBe('3. Confirm & Verify Deletion');
    expect(viewerProps.steps[5].title).toBe('Delete Recap');
  });
});

