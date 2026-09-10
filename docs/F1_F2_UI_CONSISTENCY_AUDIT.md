# F1–F2 lesson UI consistency audit

Scope: F1.1–F1.6, F2.1, F2.9. Audit date: 2026-09-10.

## Verdict
All eight use a consistent outer lesson layout and end-of-lesson quiz flow. Their instructional content is intentionally presented in different visual formats. They are not fully consistent at the typography, supporting-section, and responsive-layout levels.

This was a source-code and component-test audit. No production content was changed. No authenticated desktop/mobile visual walkthrough or screen-reader test was performed; rendered clipping, contrast, and exact spacing remain unverified. The native dialog is mocked in the component tests, so passing tests do not independently prove real-browser focus trapping.

## Shared structure verified
- All eight route through FoundationReadingLesson. F2.1 and F2.9 additionally receive their preserved tutorial components.
- Shared course container, progress bar, single-column grid, and `lesson-card tab-content` wrapper.
- Shared WrittenTutorialPanel for lesson title, description, learning objective, and Quick Review.
- Shared card padding: 3rem by 3.5rem on desktop; 1.75rem by 1.5rem at 768px and below.
- Shared Previous and Start knowledge check footer controls. No standalone Read Aloud button in the adapter.
- F2 tutorials consistently appear after Quick Review and before footer navigation.
- All eight use one four-option Knowledge Check, shared answer feedback, retry flow, and save-before-advance behavior.
- Shared native full-screen modal, blurred backdrop, body scroll lock, and cancellation prevention. Background lesson content stays mounted and is made inert by showModal.
- Failed completion saves retain the quiz and expose Retry saving.

## Lesson-by-lesson comparison
| Lesson | Instructional layout | Shared page/quiz | Assessment |
|---|---|---|---|
| F1.1 | Plain authored sections | Yes | Baseline text layout |
| F1.2 | Six numbered icon cards; responsive columns | Yes | Intentional custom infographic |
| F1.3 | Five colored horizontal workflow cards and timeline | Yes | Intentional custom infographic |
| F1.4 | Four rising cards with icons | Yes | Shares component and styling with F1.5 |
| F1.5 | Four rising cards; reminder below | Yes | Reminder differs from F2.9 |
| F1.6 | Rising arrow ribbons; supporting bullet list | Yes | Desktop visually reads bottom-to-top; narrow view top-to-bottom, per supplied reference |
| F2.1 | Ten alternating blue curved numbered rows | Yes | Same 640px row styling as F2.9; displayed/narrated content mismatch |
| F2.9 | Thirteen alternating blue curved numbered rows | Yes | Same 640px row styling as F2.1 |

The different diagrams, colors, row widths, and staggered positions reflect explicit user requests. They should not be flattened into one design merely to claim consistency.

## Findings and recommended corrections

### 1. Medium: supporting sections do not share a standard heading/spacing component
F1.5 Important Reminder uses `written-tutorial-panel__quick-review`; F2.9 Important Reminder and F2.1 Why the Screen Layout is Important use a plain section. F1.6 When to Use Help has its own wrapper and typography. Some headings have only `section-title`, while the common major section headings also have `written-tutorial-panel__section-title` (1.4rem, different margins). This produces inconsistent hierarchy and spacing.
Recommendation: create one supporting-section treatment for reminders, explanations, and lists, with a deliberate reminder variant.
Evidence: FoundationReadingLesson.tsx; FoundationInterfaceContent.tsx; FoundationHelpSteps.tsx; WrittenTutorialPanel.css.

### 2. Medium: instructional typography is independently specified
Body copy ranges from 0.9rem in F1.2 to 0.95rem in F1.4–F1.6, 1rem in F2 rows, and 1.02rem in the default written steps. Heading sizes range from 0.95rem to 1.2rem. These are source CSS values, not measurements of a rendered page. Some compact-card variation may be useful, but there is no shared standard for when to use it.
Recommendation: define common body, compact-body, heading, and line-height tokens while retaining the requested diagrams.
Evidence: FoundationUsesCards.css, FoundationStartingSteps.css, FoundationHelpSteps.css, InterfaceNumberedRows.css, WrittenTutorialPanel.css.

### 3. Medium: responsive layouts use different sizing references
F1.2 and F1.6 use container queries; F1.4/F1.5 use viewport breakpoints at 900px/480px; F2 rows use 600px viewport breakpoints. A sidebar reduces the lesson's available width without reducing viewport width. Four rising cards may therefore remain active in a narrower content region than intended. This is a risk requiring browser measurement, not a confirmed overflow defect.
Recommendation: use available lesson-container width for content-layout changes and validate desktop with sidebar, tablet, and phone sizes.

### 4. Medium: F2.1 narration/search content does not match displayed Main Areas
The display deliberately uses the original ten entries (Title Bar through Message Pane) from the original written-tutorial files. `foundationReadingText` still reads the six-area curriculum JSON summary. This means the visible text and registered narration/search text are not generated from the same content.
Recommendation: keep the requested original ten displayed entries, and derive narration/search text from those same entries.
Evidence: FoundationInterfaceContent.tsx, FoundationReadingLesson.tsx, curriculum.ts, data/foundations-curriculum.json.

### 5. Low: quiz accessibility markup has nested modal declarations
FoundationQuizModal renders a native dialog, while LessonQuestionPanel inside it also declares role=dialog and aria-modal=true. The outer accessible label remains English even for Japanese lessons. This is common to all eight, so it is a shared accessibility issue rather than a difference between lessons.
Recommendation: expose one modal dialog to assistive technology, label it with the visible localized quiz heading, and test keyboard focus in a real browser.

### 6. Quiz lock has a lifecycle limitation
The modal blocks ordinary app clicks/keyboard interaction while mounted. Quiz state is local React state and resets on mounting or language/lesson changes; no quiz persistence or browser-navigation interception is implemented in these components. A reload is therefore not equivalent to remaining locked in an unfinished quiz.
Recommendation: if the requirement includes reloading or reopening, persist the unfinished quiz and resume it. Do not claim the existing modal alone enforces that requirement.

## Validation
Six existing test suites passed: 33 tests covering curriculum, reading/quiz behavior, routing, video completion, interface translations, and toolbar narration. These tests verify the shared structure and behavior indirectly; they do not certify pixel-level visual consistency or all responsive states.

## Suggested order
1. Align F2.1 narration with visible content.
2. Standardize supporting headings, typography tokens, and spacing.
3. Normalize responsive breakpoints and perform real-browser visual checks.
4. Resolve nested modal semantics and verify keyboard/screen-reader behavior.
5. Decide whether unfinished quizzes must survive reloads.

No lesson implementation was changed during this audit.
