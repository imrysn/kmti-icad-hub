# Foundations course expansion

Reuse P7–P13 as F9–F15 through sourceProfessionalLessonId references. Keep Professional source data and assets intact. Keep F1–F8 byte-for-byte unchanged. Remove the former F9 from current navigation. Rename Review F10 to F16, including its two lessons and final assessment.

Frontend and backend resolve the references against the same Professional registry. Rendering uses the original presentation IDs internally; navigation uses the new F IDs. All videos, interactive renderers, content and questions stay with their source.

Completion records for imported lessons use foundations-v3:F IDs to prevent collisions with retired F9/F10 records. Review accepts its original F10 completion IDs. Previous equivalent shape/operation completion aliases remain credited. Existing ambiguous F9/F10 URLs now address the current curriculum; unambiguous legacy renderer aliases remain supported. No historical score rows are rewritten.

Files: data/foundations-curriculum.json; frontend curriculum adapters, FoundationReadingLesson, knowledgeCheck, finalKnowledgeCheck, LessonViewer, MentorMode, course-visual-audit; backend foundations_curriculum and auth submission; affected frontend/backend tests.

Validation: module/lesson order; content and renderer identity; F1–F8 unchanged; assessment parity; route uniqueness; old/new completion collision isolation; all migrated lesson render paths; bilingual typecheck and backend API tests.

Implemented: Professional source lessons remain available unchanged. Their completion records (including former Resize/Shape Steel aliases) are projected read-only into Foundations. Saved Foundation sessions carry curriculum version 3 so old Review sessions restore to F16. Text projection renumbers course references only; geometric point labels P1/P2/P3 remain unchanged.
