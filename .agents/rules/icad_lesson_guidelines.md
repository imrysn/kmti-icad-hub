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
