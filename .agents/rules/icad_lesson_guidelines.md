# iCAD Interactive Lesson Guidelines

This document serves as the Knowledge Base and standard requirements for all interactive video lessons within the iCAD Foundations curriculum. 

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
1. **Content and Narration Standard**: Every lesson must end with a comprehensive checklist reviewing what the learner accomplished. Use the `recap` overlay type at the very end of the video. The `recapData` must contain a lesson-specific `title` and a chronological list of `items`. The recap must be narrated. If `customText` or `text` is empty, narration MUST be generated from `recapData.title` followed by every `recapData.items` entry in visible order. Do not show a duplicate tutorial subtitle behind the recap panel.
2. **Visual and Completion Standard**: The **original Zoom In and Zoom Out lesson recap shown in the approved reference image** is the default global/shared presentation for every iCAD Foundations recap: a dark full-stage panel, green completion icon, blue uppercase `Lesson recap` eyebrow, a centered narration summary with no background and no border, generous vertical spacing, and bordered recap-item cards with blue action labels. Preserve the centered summary text and display the useful recap content with correct sentence capitalization, but remove the generic visible prefixes `Great work` and `Remember`; those phrases must remain in the audio narration. A lesson-specific title may be shown only when required and must use the same centered white heading treatment. The recap must remain visible after narration ends and must always provide one clear action button. Use **Next** when another lesson is available and **Close** when the recap ends the available lesson flow. The action must stop recap narration, save completion when required, exit full screen when required, and then advance or close without leaving the learner trapped on the recap.
3. **Behavioral Approach — Required for Every Lesson**: Applying recap CSS alone is not compliance. Every video, interactive, reading, exercise, and assessment lesson must route through a recap state before leaving the lesson. The normal lesson-ending event—video sequence completion, final quiz continuation, narration completion, or the learner selecting Next—must open the recap and start its complete narration instead of navigating immediately. The recap must use lesson-specific summary content and actionable review cards, remain open after narration finishes, suppress background subtitles and competing narration, and advance only through its own enabled Next or Close action. Do not add a second fallback recap when the lesson already contains an embedded recap. Automated coverage must prove that every iCAD Foundations leaf lesson has exactly one intended recap path.

## 5. Synchronized Narration
- **Requirement**: Every step must include spoken narration and subtitles.
- **Implementation**: Populate the `customText` property with clear, step-by-step instructions. Ensure `videoStart` and `videoEnd` timings perfectly match the action on the screen.
- **Exceptions**: Quiz and recap narration is audio-only while its panel is visible. A timed label explicitly designated as visual-only may omit narration. These exceptions must never create an empty TTS request.

## 6. Autostart in Full Screen
- **Requirement**: When the user initiates a lesson via the intro panel, the lesson must immediately launch into full screen mode for maximum immersion. Additionally, if the user exits full screen mode, the lesson must automatically close and return them to the `LessonIntroPanel`.
- **Implementation**: Ensure the `LessonIntroPanel`'s "Start lesson" button triggers full screen initialization when clicked. Attach a full-screen change listener to detect when full screen is exited, and reset the active lesson state accordingly to show the intro panel.

## 7. Native Video Controls Styling
- **Requirement**: The `kmti-native-video-controls` component must adapt its styling depending on the type of lesson being viewed.
- **Implementation**: 
    - **Step-by-Step Tutorial Lesson**: Use the native video controls styling found in the "Understanding the iCAD Screen" module.
    - **Video Tutorial Lesson**: Use the native video controls styling found in the "Box" lesson.

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
- **Correct Answer**: After the learner selects **Check Answer** with the correct choice, trigger a visible confetti celebration and narrate the selected correct option's complete configured `feedback` (for example, `Correct! The Key Entry Area is for precise coordinates.`). Use `Correct!` only when the correct option has no explanatory feedback.
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

## 13. Data-Backed Narration Fallbacks
- **Requirement**: Visible instructional content must never be silent merely because a tutorial step's `text` field is empty.
- **Quiz Fallback**: When a quiz step has empty `customText` and `text`, use `quizData.question` as the narrated question. Then narrate `Choose one answer.` and all `quizData.options` in order.
- **Recap Fallback**: When a recap step has empty `customText` and `text`, narrate `Let's review what you learned.`, the `recapData.title`, and every recap item in order.
- **Priority**: Resolve narration in this order: non-empty `customText`, non-empty `text`, structured quiz or recap data, then skip TTS safely.
- **Safety**: Trim the resolved text. Never call `/api/v1/tts/synthesize` with an empty `text` query parameter.

## 14. Translation-Key Integrity
- **Requirement**: Raw translation keys such as `tutorial.icad.12.text`, `.title`, or `.next` must never appear in the lesson UI or narration.
- **Coverage**: Every tutorial step ID must have the required English and Japanese `title` and `text` entries when localization is used.
- **Fallback**: If the translation function returns the key itself, use the configured tutorial step title or text instead of rendering the key.
- **Maintenance**: Whenever a step is added, removed, or renumbered, update all locale files in the same change.
- **Testing**: Add or update a test that iterates through every configured step and verifies that all required locale keys exist.

## 15. Lesson Intro Panel and Video-Only Layout
- **Structure**: Foundations intro panels must use a lesson-specific icon, an `Interactive ... tour` eyebrow, an `Explore ...` title, a concise `Take a guided tour...` description, and the standard `Start lesson` button.
- **Video-Only Lessons**: Do not wrap the dark `LessonIntroPanel` in an additional white document card. Use a transparent outer card with no border or shadow.
- **Duplicate Content**: Do not render a separate explanatory paragraph above a video-only intro panel when the same concept is already covered by the learning objective and intro description.
- **Scope**: Apply transparent video-only styling only to lessons explicitly configured for that layout; do not remove document-card styling from text-based lessons.

## 16. Shared Player Consistency
- **Requirement**: Standards must be implemented in every Foundations lesson player, not only in one lesson configuration.
- **Players**: Audit both `VideoTutorialViewer` and `InteractiveVideoLesson`, including static quiz steps, timeline-overlay quizzes, post-video quizzes, and recap stages.
- **Shared Logic**: Prefer shared narration and feedback helpers so wording and sequencing cannot diverge between lessons.
- **State Transitions**: Advancing from Quiz 1 to Quiz 2 must set the next step and explicitly restart narration. Advancing to the recap must likewise start recap narration.

## 17. Required Verification Checklist
Before considering a lesson complete, verify all of the following:
1. Video duration was measured and every `videoStart`, `videoEnd`, overlay, quiz, and recap timestamp is inside the real media duration.
2. Source-video audio and TTS audio do not overlap unintentionally.
3. Every ordinary step narrates non-empty text and its subtitle matches the active narration.
4. Every quiz narrates the knowledge-check introduction, full question, `Choose one answer.`, and all choices.
5. Quiz 2 and later quizzes narrate after the preceding **Continue** action.
6. Correct answers show confetti and narrate the complete configured correct-answer feedback, falling back to `Correct!` only when no explanation exists.
7. Incorrect answers narrate explanatory retry feedback without confetti and keep the quiz open.
8. No duplicate subtitle is visible behind quiz or recap panels.
9. The final recap narrates its title and every checklist item.
10. The final **Continue** action exits full screen, resets playback, and returns to the intro panel.
11. No raw localization key is visible or sent to TTS.
12. Type checking and the complete automated test suite pass.
