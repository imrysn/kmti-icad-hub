# iCAD Foundations curriculum migration — implementation plan

## Source and acceptance criteria

The supplied request transcribes the tracker: F1–F10, with 6/15/10/13/8/9/8/6/13/6 items (94 total). No curriculum Excel workbook was attached. Use that exact ordered transcription; do not infer curriculum from the legacy list. Nothing will be committed. Preserve all existing video files, bilingual tutorial data, timing, overlays, TTS, subtitle and recap engines.

## Audit findings (before code changes)

- `frontend/src/views/mentor/mentorConstants.ts` exports the active Foundations tree, objectives, and other courses. The actual current tree has 30 leaves and additional toolbar/basic-shape/part-layout groups beyond the numbered 13 modules.
- `MentorMode.tsx` chooses this tree, flattens its leaves for next/previous, restores the active lesson and expanded modules from user-scoped localStorage, and loads completion records from `/auth/progress/{course}`. Default entry is hardcoded to `lesson-1-1`.
- `LessonViewer.tsx` routes legacy IDs to specialized interface, toolbar, mouse, origin and shape components, or to `DynamicFoundationsLesson`. Completion uses `/auth/submit-quiz`. Several ordinary Next paths currently do not persist individual reading completion.
- `DynamicFoundationsLesson.tsx` selects bilingual written/video configurations by legacy ID. It uses the existing shared reading/video layout, karaoke/TTS, and fallback or embedded recap. Preserve those engines; add a curriculum adapter rather than duplicating them.
- `MentorSidebar.tsx` renders the supplied lesson hierarchy, translates legacy keys, and calculates per-module completion from child IDs. Course navigation is state based, not a separate URL per lesson; compatibility must cover saved state and the lesson router.
- Backend `QuizScore` stores string lesson IDs and both stable and numeric course identifiers. `/auth/progress` already reads both course representations. `/auth/submit-quiz` only allows missing database lesson rows for `lesson-N-N` Foundations IDs, so canonical IDs require validation against the registry.
- `course_service.py` serves database lesson lists and stored aggregate progress; `progress_service.py` calculates progress using quiz counts. Both need a Foundations-specific registry-backed projection without destructive database reseeding.
- Existing tests explicitly expect 30 leaves in recap/narration inventory tests. Keep their behavioral assertions and update curriculum assumptions. Add tests for canonical ordering, scope, bilingual metadata/content, aliases, progress, renderer mappings and completion.
- `.agents/rules/icad_lesson_guidelines.md` requires one narrated recap path per lesson. Reused players already implement the interactive flows. New reading lessons must use the existing written panel and shared narrated recap. F10.6 needs a beginner knowledge check, with no certificate.

## Migration table

| Existing content / IDs | New target | Action / completion policy |
|---|---|---|
| Getting Started / lesson-1-1 | F1.1–F1.3 | Split relevant concepts; credit only F1.1 for the legacy completion |
| Interface / lesson-2-1 | F2.1; selected concepts F2.2–F2.15 | Reuse full verified interface tour at F2.1; new focused reading lessons; credit only F2.1 |
| Tool Bars / toolbars | F2.9 | Reuse bilingual tutorial and video; direct credit |
| Zoom / lesson-3-1 | F3.3–F3.4 | Reuse combined verified tour in both contexts; legacy completion covers both zoom directions |
| Pan / lesson-3-2 | F3.5 | Reuse; direct credit |
| View rotation / lesson-3-3 | F3.6 | Reuse navigation; direct credit |
| Standard Views / lesson-4-1 | F4.1, focused reading F3.9 and F4.2–F4.5 | Reuse full tour at F4.1; conservative credit F4.1 only |
| User View / lesson-4-2 | F4.6; new F4.7–F4.11 | Reuse overview; credit F4.6 only, never auto-credit registration/edit/delete |
| Origin / origin-projections, lesson-5-1 | F5.4; concepts F5.3/F5.5 | Reuse origin lesson; direct credit F5.4 only |
| Change 3D Part Layout / origin-layout, lesson-5-2 | Professional preserved material | Remove from Foundations; relocation is not basic coordinate input |
| Box/Cylinder/Polygon / basic-op-* | F9.5/F9.6/F9.7 | Reuse written, video, timing and overlays; direct credit |
| Cone/Torus | Professional preserved material | Remove from Foundations; retain source files and assets |
| Move/Copy/Delete / lesson-6-1/4/7, move/copy/delete | F9.9/F9.10/F9.11 | Reuse beginner tutorials; direct credit |
| Rotate/Mirror/Rotate Copy/Mirror Copy | Professional preserved material | Remove from Foundations; retain implementation |
| Basic 2D Geometry / lesson-7-1/2 | Professional preserved material | Preserve procedures; author conceptual F7.7/F7.8; no completion credit |
| Introduction to 3D / lesson-8-1 | Concepts in F7/F9 | Do not import profile/extrusion procedure into Foundations; no automatic credit |
| Inspect model / lesson-9-1 | Concepts in F4/F9.13/F10 | Reuse beginner concepts only; no blanket completion credit |
| Saving / lesson-10-1 | F8.3; focused F8.1–F8.6 | Split file operations; credit Save only |
| Troubleshooting / lesson-11-1 | Retained support/reference source | Remove core entry, retain content; no Foundations credit |
| Guided exercise / lesson-12-1 | Professional practical assignments source | Preserve source, remove core entry and progress credit |
| Practical assessment / lesson-13-1 | Complete assessment source | Preserve source, remove core entry; F10 is not certification |
| No existing direct equivalent | Remaining tracker items | Create focused bilingual written lessons and review; no invented video assets or completion credit |

## Ordered implementation phases

1. Capture baseline build/typecheck and full Vitest results. Preserve unrelated work (working tree initially clean).
2. Introduce one language-neutral JSON registry with canonical IDs, English/Japanese titles, content references, explicit route aliases and separate completion equivalences. Both frontend and backend consume it; no duplicated ordering/count tables.
3. Retain legacy curriculum as an explicitly archived content catalog. Build the active `Lesson[]` projection from the registry. Add focused bilingual reading content, objectives, quick reviews and completion messages. Reuse existing specialized components for compatible full tours; do not pass canonical IDs into engines expecting legacy IDs.
4. Add a Foundations-only router adapter. Reject or show a clear retirement notice for removed legacy IDs instead of routing to advanced content. Keep original IDs inside reused players while completion remains canonical. Resolve saved aliases without overwriting old score rows.
5. Use the registry for sidebar, entry point, next/previous and progress. Read legacy completion equivalences, deduplicate canonical completions, divide by 94, and never count removed lessons. Save canonical completion only after the recap action. Surface persistence failure with retry rather than advancing silently.
6. Backend validates canonical IDs and permitted legacy aliases, projects the same curriculum in the lesson API, and computes Foundations aggregate progress directly from eligible best-score records. No data deletion, destructive migration, or certificate logic.
7. Verify bilingual rendering and one intended recap path. Flag unverified terminology/content in the final content-gap inventory rather than claiming expert review. Record every reused video mapping and every item without an asset.
8. Add structural, compatibility, renderer, progress and API tests; run full Vitest, TypeScript and production build. Fix migration regressions. Provide a report with created/modified files, all 94 item actions, preserved assets, missing videos, language status, test evidence and remaining risks.

## Risks and verification boundaries

Old completion of a broad tour is not evidence for every new focused lesson. Route aliases and completion equivalences must remain separate. Existing broad tours can demonstrate related beginner topics but must not expose professional lesson navigation. New user-view and selection instructions should use established repository vocabulary and avoid unverified shortcut/menu sequences. Existing assets and timing remain unchanged. Japanese content can have structural parity without a native iCAD instructor review; document that distinction. No live trainee database changes or commits are needed.
