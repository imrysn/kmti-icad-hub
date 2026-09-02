# iCAD Foundations Written Tutorial Instructions

Apply the same video-and-written-tutorial implementation used in **Understanding the iCAD Interface** to **[LESSON NAME]**.

## Lesson Information

- Lesson name: **[LESSON NAME]**
- Lesson file: **[FILE PATH]**
- Written-tutorial content: **[PASTE CONTENT HERE]**

## 1. Written Tutorial Placement

- Add the written tutorial to the right side of the video.
- Keep the video tutorial at its current `1000 × 562.5px` size.
- Do not reduce or stretch the video.
- Keep a `24px` gap between the video and written tutorial.
- Make the written tutorial the same height as the video.
- Make the written tutorial vertically scrollable.
- On smaller screens, place the written tutorial below the video.

## 2. Editable Lesson Content

Keep the shared `WrittenTutorialPanel` responsible only for layout, styling, and reusable behavior.

Move all editable written-tutorial text into the lesson's own `.tsx` file.

Create a clearly named object:

```ts
[LESSON]_WRITTEN_TUTORIAL_COPY
```

It must contain:

- `title`
- `moduleLabel`
- `procedureTitle`
- `completionText`

Create a clearly named procedure array:

```ts
[LESSON]_WRITTEN_TUTORIAL_STEPS
```

Each procedure step must contain:

```ts
{
  id: 'unique-step-id',
  title: 'Short step title',
  text: 'Simple instruction.',
  preserveText: true
}
```

Connect both objects to `FoundationsVideoReadingLayout`.

## 3. Written Module Structure

Display the content in this order:

1. `About the Lesson` label
2. A short sentence explaining what the lesson covers
3. Numbered procedure
4. Completion message

Display the completion message as text only. Do not place an icon beside `completionText`.

Use the panel header for the About the Lesson description. Do not add a separate introduction, Purpose section, or Learning Goal card inside the written tutorial panel.

## 4. Procedure-Writing Rules

- Make the procedure a real step-by-step module tutorial.
- Keep every instruction short, simple, and easy to understand.
- Use direct, action-focused wording.
- Present steps in the correct working order.
- Do not copy long narration paragraphs into the procedure.
- Do not shorten or automatically rewrite text marked with `preserveText: true`.
- Keep technical names, menu names, values, and coordinates accurate.
- Do not include introductions or conclusions as numbered procedure steps.
- Do not include Knowledge Check, Review, or Recap steps.
- Do not display all related instructions simultaneously when they should appear sequentially.

## 5. Separation from the Video Tutorial

Keep the written tutorial separate from:

- Video subtitles
- TTS narration
- Video timestamps
- Spotlight timing
- Highlight overlays
- Knowledge checks
- Review and recap panels

Changing the written module must not change the video tutorial.

Changing video narration must not automatically change the written procedure.

## 6. Video Subtitles and Narration

- Keep the original video subtitle text unless a subtitle change is explicitly requested.
- Keep the video tutorial data as the source of subtitle text.
- TTS must narrate only the step text.
- TTS must not narrate the visible step title.
- Keep subtitle timing synchronized with the related video selection or action.
- Do not advance to the next step before narration or typing finishes.

## 7. Highlights and Spotlights

- Show highlights in the same sequence as the spoken subtitle.
- Highlight only the item currently being mentioned.
- Do not show several highlights simultaneously unless explicitly required.
- Keep the latest named-item spotlight visible through connecting words.
- Do not flash the parent menu or full toolbar between individual item spotlights.
- Example: use `Window → Help`, not `Window → Menu Bar → Help`.
- Remove any unintended full-area spotlight after the final named item.

## 8. Video Controls

For every iCAD Foundations video tutorial:

- Hide `kmti-native-video-controls` while the tutorial is playing.
- Show the controls only when the cursor reaches the bottom control-bar position.
- Do not show the controls when the cursor is in the middle or elsewhere in the video.
- Keep the controls visible while the video is paused.
- Reveal the controls when they receive keyboard focus.
- Ensure the controls do not cover subtitles or bottom workspace fields.

## 9. Knowledge-Check Navigation Lock

While a Knowledge Check is active:

- Disable Previous Lesson.
- Disable the internal Previous Step control.
- Block keyboard back navigation.
- Restore navigation only after the Knowledge Check is completed.

## 10. Lesson Navigation

- Make the navigation divider and buttons span the complete video-and-written-module width.
- Do not restrict navigation to the `1000px` video width.
- Use consistent spacing, margins, and button alignment.
- Keep Previous on the left and Next or Next Lesson on the right.
- Match the standard navigation style used by Understanding the iCAD Interface.

## 11. Lesson Layout Consistency

- Match the standard iCAD Foundations `lesson-content-body` layout.
- Keep the learning objective, divider, video/module row, and navigation consistently aligned.
- Use the standard `lesson-intro-panel` dimensions, spacing, margins, and position.
- Use a lesson-specific icon.
- Keep the same transition effect used by the standard iCAD Foundations lessons.
- Do not add duplicate `lesson-intro` or `lesson-card` wrappers.
- Do not add a `lesson-progress` indicator when the matching standard lesson does not use one.

## 12. Validation

After implementation:

- Run TypeScript validation.
- Run the relevant focused tests.
- Check the lesson beside Understanding the iCAD Interface or Cylinder.
- Confirm the video width did not change.
- Confirm the written panel scrolls vertically.
- Confirm navigation spans the full combined layout.
- Confirm written-module changes do not affect video subtitles or TTS.
- Confirm Knowledge Check and Review content are absent from the written procedure.
- Report the modified files and validation results.
