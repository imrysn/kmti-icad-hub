# iCAD SX Interactive Lesson Guidelines

This document serves as the Knowledge Base and standard requirements for all interactive video lessons within the iCAD SX Foundations curriculum. 

When creating or modifying an interactive lesson configuration (e.g., `TutorialStep[]`), you MUST ensure that **all** of the following core features are present to maintain the highest quality standard for user engagement:

## 1. Interactive Overlays & Highlights
- **Requirement**: Any time a user is instructed to click an icon, select a menu option, or enter data, you must provide a visual highlight overlay.
- **Implementation**: Use the `highlight` overlay type. Always include `animation: "pulse"` to draw the user's eye. Include a descriptive `label` indicating what the UI element is (e.g., "Shape Placement").

## 2. Knowledge Check Quizzes
- **Requirement**: Lessons must not be purely passive. You must insert targeted questions to verify the user understands the tools, orientations, or parameters being discussed.
- **Implementation**: Use the `quiz` overlay type. Include at least 2-3 quizzes per lesson. Each quiz must provide 1 correct answer and 2 plausible distractors, along with helpful `feedback` explaining why an answer is right or wrong.

## 3. Dimension & Parameter Annotations
- **Requirement**: When physical dimensions or structural parameters are defined (e.g., entering Width, Depth, Height, Diameter, etc.), visually map these values onto the 3D model on screen.
- **Implementation**: Use the `dimensionAnnotation` overlay type. Specify whether it is `horizontal` or `vertical`, and provide precise line coordinates (`start` and `end`) that trace the dimension on the screen.

## 4. Final Lesson Recap
- **Requirement**: Every lesson must end with a comprehensive checklist reviewing what the user just accomplished.
- **Implementation**: Use the `recap` overlay type at the very end of the video. The `recapData` should contain a `title` (e.g., "Creating a Box — Review") and a chronological list of `items` representing the steps taken during the lesson.

## 5. Synchronized Narration
- **Requirement**: Every step must include spoken narration and subtitles.
- **Implementation**: Populate the `customText` property with clear, step-by-step instructions. Ensure `videoStart` and `videoEnd` timings perfectly match the action on the screen.

## 6. Autostart in Full Screen
- **Requirement**: When the user initiates a lesson via the intro panel, the lesson must immediately launch into full screen mode for maximum immersion. Additionally, if the user exits full screen mode, the lesson must automatically close and return them to the `LessonIntroPanel`.
- **Implementation**: Ensure the `LessonIntroPanel`'s "Start lesson" button triggers full screen initialization when clicked. Attach a full-screen change listener to detect when full screen is exited, and reset the active lesson state accordingly to show the intro panel.

## 7. Native Video Controls Styling
- **Requirement**: The `kmti-native-video-controls` component must adapt its styling depending on the type of lesson being viewed.
- **Implementation**: 
    - **Step-by-Step Tutorial Lesson**: Use the native video controls styling found in the "Understanding the iCAD SX Screen" module.
    - **Video Tutorial Lesson**: Use the native video controls styling found in the "Create Box" lesson.

## 8. Quiz Narration Sequence
- **Requirement**: Every knowledge check must be fully understandable without relying only on visible text.
- **Implementation**: When a quiz opens, narrate the following content in this exact order:
    1. `Now, let's do a knowledge check.`
    2. The complete quiz question.
    3. `Choose one answer.`
    4. Every available choice, prefixed with its sequence number (for example, `Choice 1`, `Choice 2`, and `Choice 3`).
- **Continuation**: Moving from one quiz to the next must explicitly restart narration so Quiz 2 and later questions are never silent.
- **Display**: Quiz narration is audio-only while the question panel is open. Do not render a duplicate subtitle behind the quiz or recap panel.

## 9. Correct and Incorrect Answer Feedback
- **Correct Answer**: After the learner selects **Check Answer** with the correct choice, trigger a visible confetti celebration and narrate `Correct.`
- **Incorrect Answer**: Do not show confetti. Narrate `Not quite.`, followed by the selected choice's explanatory feedback, and finish with `Please try again.`
- **Retry State**: Keep the quiz open after an incorrect answer and allow the learner to retry. Continue only after the correct answer is confirmed.
- **Consistency**: Apply this behavior to post-video quizzes, timeline-overlay quizzes, and quizzes in `InteractiveVideoLesson`.

## 10. Post-Video Quiz and Recap Flow
- **Requirement**: A lesson must not close or reset when its demonstration footage ends if quizzes or a recap remain.
- **Implementation**: Freeze the video on the configured final frame, then present Quiz 1, Quiz 2, and the final recap as sequential stages.
- **Completion**: The final recap's **Continue** button must stop narration, reset the lesson, exit full screen, and return to the `LessonIntroPanel`.

## 11. Source Audio and TTS Separation
- **Requirement**: When a lesson uses generated narration, the recording's original audio must be independently configurable so it cannot conflict with TTS.
- **Implementation**: Use `muteSourceVideoAudio` for narrated recordings. This must mute only the source video track; the learner's mute and volume controls must continue to control narration correctly.
- **Safety**: Never send an empty string to the TTS synthesis endpoint. Trim narration text and skip synthesis when no narratable text exists.

## 12. Timed Labels and Configurable Positioning
- **Requirement**: Short direction or state labels synchronized to the recording must use the exact action timestamps and must not be replaced by a generic persistent subtitle.
- **Implementation**: Use a pulsing `highlight` overlay for the selected icon and a concise centered caption when required. Configure the centered caption with normalized coordinates:
    - `captionPosition.x`: horizontal position from `0` (left) to `1` (right).
    - `captionPosition.y`: vertical position from `0` (top) to `1` (bottom).
- **Narration**: Use `narrate: true` only when the timed label must be spoken. A label explicitly designated as visual-only must use `centerCaption: true` without `narrate`.
