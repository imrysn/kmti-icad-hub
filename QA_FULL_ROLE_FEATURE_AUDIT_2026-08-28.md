# KMTI Training Hub — Full Role Feature Audit

**Audit date:** 2026-08-28  
**Audited branch:** `emji-update-backup`  
**Environment:** Desktop deployment at `http://127.0.0.1:5173`, backend at `http://127.0.0.1:3001`, MySQL mode, NAS reachable  
**Audit method:** Automated frontend/backend tests, production-build verification, live read-only browser walkthroughs, API health checks, console-log review, and targeted source inspection.

## Executive verdict

**NO-GO for an unconditional “all features work without errors” sign-off.**

The application is running and its core Employee, Mentor-view, and Admin read-only screens are usable. All existing automated tests pass. However, this audit found release-blocking gaps and confirmed runtime defects:

1. The supplied Trainee test account cannot authenticate, so a complete live Trainee workflow audit could not be performed.
2. Admin Performance produces repeated HTTP 403 errors while fetching user roles.
3. The normal production build cannot replace the active desktop app's locked `dist/assets` output.
4. Several important backend areas have very low automated coverage; the total measured backend coverage is 37%.
5. Admin sidebar controls are unnamed to assistive technology.

This report therefore does **not** certify that every feature for every role is error-free.

## Test results summary

| Area | Result | Evidence |
|---|---:|---|
| Frontend automated tests | PASS | 9 test files, 63 tests passed |
| Backend automated tests | PASS | 103 tests passed; 16 warnings |
| Backend measured coverage | RISK | 37% overall |
| Frontend TypeScript compilation | PASS | Completed before the packaging/output step |
| Production build to normal `dist` | FAIL | `EPERM` while replacing locked `frontend/dist/assets` |
| Production build to isolated audit folder | PASS | Vite compiled 2,560 modules into `frontend/dist-audit` |
| Backend health | PASS | Status `online`, database mode `mysql`, NAS reachable |
| Employee login | PASS | `employee` account authenticated and loaded the employee experience |
| Admin login | PASS | `admin` account authenticated and loaded the admin experience |
| Trainee login | BLOCKED | Supplied `trainee` credentials returned HTTP 401 despite an active user record |

## Role-by-role audit

### Employee

**Result: PARTIAL PASS**

Verified live:

- Authentication and landing page.
- iCAD and SOLIDWORKS top-level navigation.
- iCAD 3D Modeling module launch.
- Lesson sidebar and 26-lesson curriculum rendering.
- Lesson content, image, Read Lesson, Play, step controls, full-screen control, Previous, and Next Lesson controls rendered.
- Next Lesson changed the active lesson from ICAD Interface to Tool Bars.
- SOLIDWORKS landing rendered Introduction, 3D Operation, and 2D Operation modules.

Not fully exercised:

- Every individual lesson and hotspot.
- Completion writes, quiz submissions, assessment uploads, downloads, printing, spreadsheet export, quotations, notifications, CAD executable launch, offline recovery, and multi-window behavior.

### Mentor / trainer experience

**Result: PARTIAL PASS**

There is no separate `mentor` role in the current role model. Mentor/trainer features are exposed to an `employee` through **Trainee Overview**. This should be confirmed as intentional product design.

Verified live:

- Trainee Overview navigation.
- Practical Submissions list and pending submission cards.
- Trainee Progress Tracker.
- Trainee detail view, roadmap, curriculum progress, mastery score, attempts, and action controls rendering.

Not exercised because these change production data:

- Review/grade submission.
- Reopen/reset progress.
- Trainer assignment changes.
- Submission deletion and other destructive controls.

### Admin

**Result: PARTIAL PASS WITH CONFIRMED ERROR**

Verified live:

- Authentication.
- System Analytics, live metrics, system status, and Broadcast control rendering.
- User Management table, search/filter, role/status data, and edit/revoke/delete controls rendering.
- Performance Directory and trainee cards rendering.
- Assessment Management and assessment catalog rendering.
- Training Sets and unit/task table rendering.
- Security Audit log rendering.

Confirmed runtime defect:

- Opening Performance Directory generated repeated `403 Forbidden` responses from `authService.getUsers()` in `PerformanceDirectory.tsx`. The page still displays progress data, but its user-role enrichment request fails, so this workflow is not fully correct.

Accessibility defect:

- All six Admin sidebar buttons expose no accessible name. Their labels exist only as `data-tooltip`, which is not an accessible label. Keyboard/screen-reader users cannot reliably identify Analytics, Users, Performance, Quizzes, Training Set, and Audit Logs.

Not exercised because these mutate production data:

- Add/edit/revoke/delete user.
- Create/edit/delete assessment.
- Sync, create, edit, or delete training units/tasks.
- Broadcast submission.
- Assignment and configuration changes.

### Trainee

**Result: BLOCKED FOR LIVE END-TO-END TESTING**

The active `trainee` user exists, but the supplied `trainee/trainee123` credentials returned HTTP 401. No password reset or account mutation was performed during this audit.

Automated backend tests did pass for authentication rules, quiz scoring/pass/fail behavior, best-score handling, progress isolation, assigned tasks, submissions, and related API behavior. Those tests reduce risk but do not replace a live Trainee UI walkthrough.

## Confirmed findings

### AUD-01 — Trainee live audit blocked by credential mismatch

- **Severity:** High
- **Impact:** Trainee login and all role-specific live workflows cannot be certified.
- **Evidence:** HTTP 401 for the supplied test credential while the user record is active.
- **Recommendation:** Provide a known-good disposable Trainee audit account or explicitly authorize resetting a dedicated test account, then rerun the full Trainee journey.

### AUD-02 — Admin Performance user-role request returns 403

- **Severity:** High
- **Impact:** Role metadata in Performance Directory may be missing or stale; the browser records repeated application errors.
- **Evidence:** `PerformanceDirectory.tsx` calls `authService.getUsers()` and logs repeated HTTP 403 failures.
- **Recommendation:** Align the endpoint authorization with Admin access, verify the token/role guard, and add an integration test that loads Performance Directory as Admin with no console or network errors.

### AUD-03 — Active desktop deployment locks the normal build output

- **Severity:** High for deployment; Low for source compilation
- **Impact:** A normal production build cannot refresh the deployed `dist` folder while the desktop process owns its files.
- **Evidence:** Build failed with `EPERM` on `frontend/dist/assets`; the same source built successfully to a separate output folder.
- **Recommendation:** Stop the desktop/runtime process before packaging, or build into a versioned staging folder and atomically switch releases after the application exits.

### AUD-04 — Critical backend paths have insufficient automated coverage

- **Severity:** Medium/High
- **Impact:** Passing tests do not strongly validate several production-critical features.
- **Evidence:** 37% overall coverage. Approximate module coverage: storage 17%, notifications 21%, admin users 22%, admin knowledge base 23%, admin assessments 24%, TTS 25%, assessments 27%, quotations 31%.
- **Recommendation:** Prioritize API integration tests for authorization, CRUD validation, uploads/storage, notifications, assessments, quotations, TTS, and failure/recovery cases.

### AUD-05 — Admin sidebar buttons lack accessible names

- **Severity:** Medium
- **Impact:** Screen-reader and voice-control users cannot identify the six Admin destinations; tooltip-only labeling is insufficient.
- **Evidence:** Accessibility snapshot shows six unnamed buttons; source uses `data-tooltip` without `aria-label` or visible button text.
- **Recommendation:** Add `aria-label={item.label}` (and preferably a semantic visible label in expanded mode), preserve focus styling, and add an accessibility regression test.

### AUD-06 — Test/dependency warnings require cleanup

- **Severity:** Low/Medium
- **Impact:** Future dependency upgrades may turn warnings into failures.
- **Evidence:** Pydantic v2 class-config deprecations, unknown pytest `asyncio_mode`, Starlette/httpx deprecation, and invalid escape-sequence warnings.
- **Recommendation:** Migrate to `ConfigDict`, install/configure the intended asyncio pytest plugin, update deprecated test-client usage, and correct banner string escapes.

## What remains before release sign-off

1. Restore a disposable Trainee login and execute the complete Trainee journey.
2. Fix and retest the Admin Performance 403 error.
3. Run a clean production package with the desktop process stopped.
4. Test every state-changing role workflow against disposable audit data, including create/edit/delete, grading, reopen/reset, task assignment, submissions, broadcasts, and notifications.
5. Test file upload/download, print/PDF, spreadsheet export, quotation, CAD launch, TTS, offline/reconnect, NAS loss/recovery, and multi-client presence.
6. Run keyboard-only, screen-reader-name, responsive/full-screen, and light/dark theme checks.
7. Re-run automated tests, capture network/console logs, and require zero unexplained errors before release approval.

## Final conclusion

The current `emji-update-backup` build demonstrates a working core and a healthy live backend/database/NAS connection. Employee learning, employee-based mentor views, and the six Admin sections render and support basic navigation. Nevertheless, the audit is **incomplete and currently NO-GO** because the Trainee role cannot be live-tested, Admin Performance emits authorization errors, and the active desktop deployment prevents a normal production build. A focused remediation and second audit are required before claiming all role features function correctly without errors.
