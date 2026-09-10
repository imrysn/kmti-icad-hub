# F4–F10 UI consistency audit

## Implementation follow-up — 2026-09-10

The findings below describe the pre-change audit. Course-wide normalization has now been implemented:

- All 67 active Foundations lessons route through FoundationReadingLesson, including preserved tutorials.
- Shared 1rem body text / 1.7 line-height, section and card heading scales, section spacing and responsive card rules apply to F1–F10.
- Original written instructions for the eight legacy tutorial routes are carried into the shared reading panel in English and Japanese; original tutorial components remain embedded after Quick Review with their outer navigation suppressed.
- Generic lessons use their existing practice content instead of repeating the description under Understand. Original custom diagrams and ribbons remain.
- Every lesson ends in the native full-screen knowledge-check modal. Existing authored questions and the final five-question assessment remain. Previously unassessed lessons receive a topic-recognition question using existing translated lesson summaries; these are not newly authored technical procedure assessments.
- Completion is saved only after correct answers, with retry on save failure. Embedded tutorial navigation does not complete or advance the course.
- Validation: 294 frontend tests passed, followed by four new bilingual preservation/question-validity tests. TypeScript checked. A temporary browser fixture using the actual reading component verified 12 representative lessons at 1366px and 390px: 16px body text and no document/card horizontal overflow. Mobile quiz verified at 390 × 900, including Escape suppression. Fixture removed afterward. Full authenticated tutorial playback was not re-exercised.

Date: 2026-09-10. Reference: current F1–F3, including F3.1, F3.3, F3.5 and F3.6.

## Verdict

Partially consistent. Shared outer cards and typography infrastructure do not mean every lesson has the same detailed layout or completion experience. This is a source and automated-test audit, not a rendered desktop/mobile visual certification. No lesson content or styling was changed by this audit.

## Complete scope (55 lessons)

| Lessons | Rendering and consistency |
| --- | --- |
| F4.1 | Updated reading adapter and knowledge check, matching the F3 outer structure. Its ribbon/comparison cards intentionally differ; font sizes and section-heading treatment still differ. |
| F4.2, F4.7, F4.12 | Shared reading adapter with authored sections, but use recap rather than the updated knowledge-check flow. |
| F4.6 | Preserved User View tutorial through DynamicFoundationsLesson; shared written panel and card, original tutorial/recap sequence. |
| F5.1–F5.3, F5.5–F5.8 | Generic reading adapter with Understand / Try it sections and recap. |
| F5.4 | Preserved origin tutorial with shared written panel and illustration. |
| F6.1–F6.9 | Generic reading adapter with Understand / Try it sections and recap. |
| F7.1–F7.8 | Generic reading adapter with Understand / Try it sections and recap. |
| F8.1–F8.6 | Generic reading adapter with Understand / Try it sections and recap. |
| F9.1–F9.4, F9.8, F9.12–F9.13 | Generic reading adapter with Understand / Try it sections and recap. |
| F9.5–F9.7 | Preserved basic-operation components: box, cylinder and polygon. Shared card/written layout infrastructure, original tutorial flow. |
| F9.9–F9.11 | Preserved dynamic tutorials: move, copy and delete. Shared written layout, original tutorial/recap flow. |
| F10.1–F10.5 | Generic reading adapter with Understand / Try it sections and recap. |
| F10.6 | Generic reading structure, five-question knowledge check followed by recap. |

The 55 lessons comprise one updated special reading lesson, 46 ordinary reading-adapter lessons, and eight preserved component lessons. Of the 46 ordinary lessons, 43 lack authored sections and therefore receive the generic two-section fallback.

## Confirmed differences

1. **Section structure:** FoundationReadingLesson supplies generic Understand / Try it sections when content.sections is absent. It repeats the explanation in Understand and uses the practice text as both the objective and Try it. Quick Review falls back to the explanation when no dedicated quickReview exists. This differs from the explicitly authored F1–F3 structure.
2. **Completion UI:** Only F4.1 in the audited scope is included in the adapter's updated recap-replacement list. Ordinary reading lessons display Review lesson and a recap. F10.6 intentionally has a multi-question assessment plus recap. Preserved tutorials retain their own sequence. A uniform full-screen knowledge check cannot be claimed across F4–F10.
3. **Body sizes:** Shared written step text is 1.02rem / 1.7 line-height. F3 mouse-card descriptions are 0.95rem / 1.6; F3 reminders are 1rem / 1.6. F4.1 ribbon descriptions are 0.95rem / 1.6, but comparison descriptions are 1rem / 1.6. Shared Quick Review is 1.05rem / 1.8. These are stylesheet declarations, not browser-measured pixel sizes.
4. **Heading hierarchy:** Default written step headings are 1.15rem; shared procedure headings are 1.4rem. F3 card headings are 1rem; F4.1 ribbon/comparison headings are 1.05rem. F4.1 uses default written sections where F3.6 uses custom section-title headings. Matching outer structure does not equal matching heading hierarchy.
5. **Spacing and width:** Shared cards use 3rem by 3.5rem padding, reduced on mobile, and shared reading layout uses a 2.5rem gap. Custom cards add their own widths, margins and breakpoints. F3 zoom and F4.1 comparison cards are constrained to 640px, while other diagrams use available width. These topic-specific layouts are intentional, but text and spacing rules are not fully standardized.
6. **Reference itself varies:** F1–F3 already mix custom card body sizes and responsive rules. They are a common visual family rather than a single exact typography specification.

## What is shared

- The audited rendering paths use lesson-card.tab-content outer cards.
- Reading and preserved tutorial layouts reuse the written tutorial panel infrastructure.
- The app defines Inter / Noto Sans JP for primary text and Outfit / Noto Sans JP for headings.
- Shared objective, written-content and navigation styling provides a recognizable course-wide design.

## Recommended normalization

First define shared body, compact-card body, heading, paragraph-spacing and section-spacing rules. Apply these while preserving the requested ribbons, mouse diagrams and original tutorials. Then bring generic lessons into an authored section structure and explicitly decide which lessons require knowledge checks. Assessment content should be reviewed separately from cosmetic changes. Finally compare rendered desktop and narrow layouts, including Japanese text and tutorial/quiz states.

## Evidence and validation

- data/foundations-curriculum.json: every active lesson inventoried.
- frontend/src/views/mentor/components/LessonViewer.tsx: canonical renderer dispatch and special adapter routes.
- frontend/src/components/iCAD_Foundations/FoundationReadingLesson.tsx: shared layout, section fallback, recap and quiz conditions.
- frontend/src/components/PublicCourses/Foundations/DynamicFoundationsLesson.tsx and frontend/src/components/3D_Modeling/3D_BasicOperation.tsx: preserved lesson paths.
- frontend/src/styles/iCAD_Foundations/WrittenTutorial/WrittenTutorialPanel.css and the FoundationMouseControls, FoundationViewExamples and FoundationViewComparison stylesheets: detailed typography declarations.
- frontend/src/index.css: font-family tokens.
- Ran FoundationReadingLesson.test, curriculum.test and FoundationRouting.test: **28 tests passed in three files**. These validate routing/behavior; they do not prove visual equivalence.
