# Unused file cleanup audit

Audited 2,165 tracked files and checked references across 892 source/configuration files. Removed only files with no external filename or module-name references. Dynamic asset loading patterns were also reviewed.

## Protected courses

iCAD Foundations, iCAD Professional, and iCAD Complete were preserved, including legacy 2D/3D lesson assets and shared dependencies. SHA-256 verification confirmed all 1,109 protected files unchanged from the start of this cleanup. Existing course edits were preserved.

No lesson files were deleted: the unreferenced lesson candidates were inside protected course directories. Tests, declarations, runtime data, tools, and uncertain candidates were retained.

## Removed files

- `frontend/src/components/Login3DModel.tsx`
- `frontend/src/components/ModalContext.tsx`
- `frontend/src/hooks/useDebounce.ts`
- `frontend/src/utils/nameUtils.ts`
- `frontend/src/views/assistant/components/MediaModal.tsx`
- `frontend/src/views/assistant/components/SearchSpotlight.tsx`
- `frontend/src/views/mentor/components/AnalyticsCard.tsx`
- `frontend/src/views/mentor/components/FeedbackPanel.tsx`
- `frontend/src/views/mentor/components/SubmissionTimeline.tsx`
- `frontend/src/views/mentor/components/TraineeListGroup.tsx`
- `frontend/src/assets/logo/footer_KMTI_logo.png`

Total: 11 files; 76,096 bytes.

## Validation

Protected-file hash comparison: passed. Production build (including TypeScript): passed. Vite reported a non-failing bundle-size warning.

This is a conservative static-reference audit; absence of imports alone was not used to remove runtime-discovered files or protected content.

## Follow-up safety pass

Extended the reference scan to remaining frontend stylesheets and repeated the source/image checks. Removed `frontend/src/views/admin/components/KnowledgeManagement.css`: no imports or dynamic stylesheet discovery references were found, and its corresponding component is absent. No additional lesson or image files were safe to remove outside the protected scope. All 1,109 protected file hashes still match the pre-cleanup baseline.
