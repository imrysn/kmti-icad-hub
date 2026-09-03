# Foundations subtitle style audit

Reference: iCAD SX Interface. Audited September 3, 2026.

## Coverage and findings

| Lesson | Rendering path | Finding and change |
| --- | --- | --- |
| iCAD SX Interface | VideoTutorialViewer | Reference; bottom captions now delegate to the shared component. Spotlight cards retained. |
| Zoom In and Zoom Out | InteractiveVideoLesson | Smaller font and asymmetric/lower placement replaced with reference layout. |
| Pan | InteractiveVideoLesson | Same correction as Zoom. |
| Rotate the 3D View | InteractiveVideoLesson | Same correction as Zoom. |
| iCAD SX Tool Bars | VideoTutorialViewer | Uses shared reference captions; spotlight cards retained. |
| 3D View | DynamicFoundationsLesson → VideoTutorialViewer | Uses shared reference captions. Direction labels remain action overlays, not narration subtitles. |
| User View | DynamicFoundationsLesson → VideoTutorialViewer | Uses shared reference captions. |
| Cylinder, Box, Polygon, Cone, Torus | 3D_BasicOperation → VideoTutorialViewer | All five use shared reference captions. |

Mouse Controls and Model Navigation, Standard Views, and Creating Basic Shapes are lesson groups. Their child lessons are covered above; the group labels do not define separate caption styles.

## Shared caption standard

- Source: `frontend/src/components/LessonVideoSubtitle.css`.
- Inter/system sans-serif; 1.35rem font, 600 weight, 1.5 line height.
- Centered horizontally; 90% width capped at 750px; 120px from the bottom.
- Transparent background; no title, card, padding, or border.
- Black outline/shadow with white spoken words, blue active word, and gray upcoming words, as in the reference lesson.
- Small-screen fallback at 720px and below: 1rem text and 48px bottom clearance for all caption consumers.
- Spotlight instruction cards retain their existing shared styles and their intentional control-relative positions.

No lesson wording, narration generation, video timings, quiz sequencing, or spotlight timing was changed in this style pass.

## Verification limits

This is a source-code and component-test audit. Actual inline/fullscreen playback, long subtitles, and small-screen clearance require a live visual review in the signed-in app; passing component and timing tests does not establish pixel-perfect rendering.
