# KMTI iCAD Hub — Pre-Deployment QA Checklist

Use this checklist against the exact release candidate that will be packaged and deployed. Record the tester, date, build/version, environment, database, and evidence for every failed or blocked item.

## Release record

- [ ] Release version/build: ____________________
- [ ] Git commit/tag: ____________________
- [ ] Tester(s): ____________________
- [ ] Test date: ____________________
- [ ] Windows version and architecture: ____________________
- [ ] Backend host and API URL: ____________________
- [ ] Database mode and schema version: ____________________
- [ ] NAS/upload storage location: ____________________
- [ ] Test accounts prepared: Admin / Employee-Mentor / Trainee / Inactive user
- [ ] Test evidence and defect links are attached to this release record.

## 1. Mandatory release gates

- [ ] All P0 and P1 defects are closed and retested.
- [ ] Frontend production build completes with no errors: `npm.cmd run build`.
- [ ] Frontend automated suite passes: `npm.cmd run test:run`.
- [ ] Backend suite completes with zero failures and zero setup errors: `backend\venv\Scripts\python.exe -m pytest backend/tests -q`.
- [ ] Backend test fixture supports the Socket.IO-wrapped ASGI application; `dependency_overrides` setup errors are resolved.
- [ ] Backend coverage is reviewed and an explicit release decision is recorded for security- and data-critical modules.
- [ ] Database migrations are tested on a production-like backup, including rollback/recovery.
- [ ] The packaged Electron installer and portable build both install/start on a clean workstation.
- [ ] Smoke testing passes against the production-equivalent MySQL/NAS environment, not only SQLite or mocked APIs.
- [ ] Backup and restore of the production database, uploads, knowledge base, and quotation data are proven.
- [ ] Release owner signs off: ____________________ Date: __________

## 2. Build, packaging, and startup

- [ ] Install frontend dependencies from a clean checkout without unresolved peer/dependency errors.
- [ ] Install backend requirements in a clean Python 3.10+ environment.
- [ ] Run the backend from the supported launcher and confirm port `3001` (or configured `SERVER_PORT`) is listening.
- [ ] Open `/` and `/api/v1/system/status`; verify status, database mode, NAS reachability, and version are accurate.
- [ ] Start the Vite development client on port `5173` and verify strict-port behavior is understood.
- [ ] Build the web assets and verify no missing chunks, images, fonts, or source maps required at runtime.
- [ ] Produce NSIS and portable Electron artifacts and verify their filenames/version metadata/icons.
- [ ] Install, upgrade over the previous version, uninstall, and reinstall without losing user data unexpectedly.
- [ ] Confirm the packaged app loads `dist/index.html` and does not depend on the Vite server.
- [ ] Confirm only one set of Electron IPC handlers is registered after reload/reopen.
- [ ] Verify minimize, maximize/restore, close, reload, and window drag controls.
- [ ] Verify app startup with backend available, unavailable, slow, and returning an error.
- [ ] Verify graceful shutdown; no orphaned backend/Electron processes remain.

## 3. Configuration and environment

- [ ] Production `.env` exists outside source control and contains no placeholder values.
- [ ] `SECRET_KEY` is strong, unique, and not the test key.
- [ ] Review the configured token lifetime; confirm it matches the security policy (the code default is unusually long).
- [ ] Verify `USE_MYSQL`, `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, and `DB_PASSWORD` against production.
- [ ] Verify `UPLOAD_DIR`, `STATIC_ASSETS_PATH`, `VECTOR_DB_PATH`, and `TTS_MODEL_DIR` paths exist and are writable where required.
- [ ] Verify `CORS_ORIGINS` contains only approved origins; test Electron and approved LAN clients.
- [ ] Verify `VITE_API_URL` or the saved API URL points to the correct backend and survives restart.
- [ ] Verify `GOOGLE_API_KEY` and `GEMINI_MODEL` behavior when configured, invalid, rate-limited, and absent.
- [ ] Confirm secrets, tokens, database credentials, and personal data are absent from logs and packaged assets.
- [ ] Confirm system date/time/timezone are correct on server and clients.

## 4. Database, migrations, and storage

- [ ] Take a verified database and file-storage backup before migration/deployment.
- [ ] Apply migrations to a production-sized copy and record duration and errors.
- [ ] Confirm required tables, columns, indexes, constraints, and foreign keys exist after migration.
- [ ] Confirm startup auto-migration does not conflict with formal migrations or run partially.
- [ ] Verify existing users, progress, quizzes, assessments, quotations, history, notifications, and settings remain intact.
- [ ] Verify Unicode/Japanese filenames and quotation text round-trip correctly through MySQL, APIs, exports, and storage.
- [ ] Verify transaction rollback after intentional failures; no partial records or orphaned files remain.
- [ ] Test MySQL/NAS temporary disconnection and reconnection without data corruption.
- [ ] Test storage-full, permission-denied, missing-directory, duplicate-name, and locked-file conditions.
- [ ] Verify upload/download paths cannot escape the approved storage directories.
- [ ] Verify retention and cleanup rules for deleted submissions, feedback, TTS cache, histories, logs, and temporary files.
- [ ] Restore the backup into a clean environment and confirm the app can use it.

## 5. Authentication, authorization, and sessions

- [ ] Valid Admin, Employee/Mentor, and Trainee accounts can sign in and land on the correct mode.
- [ ] Invalid username/password returns a clear error without revealing which credential was wrong.
- [ ] Inactive users cannot sign in; reactivated users can sign in.
- [ ] Role mismatch and direct URL navigation cannot expose unauthorized screens or APIs.
- [ ] Public registration cannot create Admin or Employee privileges.
- [ ] Duplicate username/email and short/invalid credentials are rejected consistently.
- [ ] `/auth/me` works with a valid token and rejects missing, expired, malformed, and tampered tokens.
- [ ] Logout clears session data and prevents Back/navigation from restoring protected content.
- [ ] Remember-me stores only the intended username, never the password or bearer token.
- [ ] Forgot-password behavior, messaging, abuse protection, and recovery path are verified.
- [ ] Admin cannot accidentally disable/delete their own only administrator account.
- [ ] User activity/last-seen reporting is accurate and does not leak sensitive details.
- [ ] Multiple simultaneous sessions behave according to policy.

## 6. Global navigation and shared UI

- [ ] Hash routes work from a cold start, refresh, deep link, and Back/Forward navigation.
- [ ] Role-specific header tabs and mode switching show only permitted destinations.
- [ ] Loading, empty, offline, validation, permission, and server-error states are understandable.
- [ ] Confirmation dialogs appear before destructive actions and Cancel leaves data unchanged.
- [ ] Toasts/banners do not cover controls and accurately describe success/failure.
- [ ] Light and dark themes have readable text, borders, hover, focus, selected, and disabled states.
- [ ] Keyboard navigation, visible focus, Escape-to-close, Enter/Space activation, and sensible tab order work.
- [ ] Screen reader labels exist for icon-only buttons, dialogs, forms, tables, and status changes.
- [ ] UI works at 100%, 125%, and 150% Windows scaling and common resolutions from 1280×720 upward.
- [ ] Long names, Japanese text, large values, and empty fields do not overlap or truncate critical information.
- [ ] No unexpected console errors, unhandled promise rejections, React warnings, or repeated API requests occur.

## 7. Trainee learning and manuals

- [ ] Course list, lesson list, lesson content, images, video, and interactive content load correctly.
- [ ] 2D Drawing and 3D Modeling modules open every available lesson without missing assets.
- [ ] Lesson progress is saved for the correct trainee and remains after logout/restart.
- [ ] Progress is isolated between users and courses.
- [ ] Locked/unlocked lesson rules and completion indicators are correct.
- [ ] Quizzes display all question types, accept answers, calculate scores, and apply the 80% pass rule.
- [ ] Best score, attempts, lockout/reopen, and completion state match backend records.
- [ ] KMTI Sensei/TTS loads available voices, speaks once, displays active state, stops cleanly, and auto-advances only after narration finishes.
- [ ] TTS handles rapid play/pause/next/close without `play()` interruption errors or overlapping audio.
- [ ] TTS failure, missing model, offline backend, and unsupported browser voice have a usable fallback.

## 8. Assessments and file workflows

- [ ] Trainee sees only tasks and set mappings assigned to them.
- [ ] Task ordering, set names, assessment type (2D/3D), instructions, and master files are correct.
- [ ] Single and bulk master-file downloads preserve filenames and expected folder structure.
- [ ] Open-in-iCAD/IJCAD/nanoCAD/SolidWorks works when installed and falls back safely when unavailable.
- [ ] Upload valid DWG, DXF, ICD, ZIP, XLS/XLSX, and other permitted formats at expected size limits.
- [ ] Reject disallowed extensions, spoofed content, empty files, oversized files, and unsafe filenames.
- [ ] Submission retry does not create unintended duplicates.
- [ ] Trainee sees only their submissions, statuses, feedback, and replies.
- [ ] Soft delete, Trash, Restore, Empty Trash, and permanent delete behave exactly as labeled.
- [ ] Employee/Mentor sees only assigned trainees unless their role explicitly allows more.
- [ ] Feedback upload/download/reply preserves files and audit ownership.
- [ ] Admin task create/edit/reorder/bulk-create/delete and folder/file management work.
- [ ] Trainer assignment/unassignment and trainee set mappings immediately update affected views.
- [ ] Concurrent edits/deletes produce a conflict or refresh rather than silent data loss.

## 9. Mentor and practical training

- [ ] Mentor manual/course selection, lesson viewer, roadmap, and navigation work.
- [ ] Practical dashboard tabs, trainee filtering, pagination, sorting, and refresh work.
- [ ] Stopwatch/start/stop/reset and recorded time remain accurate across navigation and restart.
- [ ] Practical assessment scoring, comments, status transitions, and reopen behavior are correct.
- [ ] Submission timeline displays events in chronological order with correct author/time.
- [ ] Feedback panel saves, reloads, and handles attachments/errors.
- [ ] Trainee telemetry and progress show the selected trainee only.
- [ ] Notification actions route to the correct trainee/submission/task.

## 10. Admin operations

- [ ] Overview/system analytics numbers match database samples.
- [ ] User create/edit/activate/deactivate/delete validates roles and protects referenced data.
- [ ] Progress directory, trainee details, assessment views, filters, and exports are accurate.
- [ ] Quiz/course/lesson/question create, edit, reorder, and delete update trainee content correctly.
- [ ] Reopen one/all and close-all assessments affect the intended users only.
- [ ] Practical task and assignment management works for both 2D and 3D.
- [ ] Knowledge-base upload, preview, download, delete, and reindex work for supported file types.
- [ ] Reindex failure leaves the previous searchable index usable.
- [ ] Broadcast create/display/expire/delete works across connected clients.
- [ ] Audit logs contain the expected actor, action, target, timestamp, and outcome.
- [ ] Admin-only APIs return 401/403 for Trainee, Employee, and anonymous callers.

## 11. Assistant/search/RAG

- [ ] Search returns relevant results for known 2D, 3D, standards, and uploaded knowledge-base queries.
- [ ] Result links, highlighted text, images, and media open the correct source.
- [ ] Empty, long, Japanese, special-character, and adversarial queries do not crash the service.
- [ ] Missing/invalid Gemini configuration produces a clear fallback instead of a blank response.
- [ ] RAG answers distinguish sourced facts from generated content and do not expose unauthorized files.
- [ ] Cache behavior, cache expiry, reindexing, and stale-result invalidation are verified.
- [ ] Concurrent searches and production-size knowledge bases meet the agreed response-time target.

## 12. Quotation lobby and workspace

- [ ] Quotation access is role-appropriate and the lobby loads active workspaces accurately.
- [ ] Start New Workspace creates exactly one session; Cancel/Exit removes training-only sessions as designed.
- [ ] Open Quotation Library lists, searches, previews, opens, and deletes only permitted records.
- [ ] Standard, KEMCO, and Special variants display the correct active color and layout.
- [ ] Company, client, quotation details, base rates, task rows, percentages, types, signatures, and comments save correctly.
- [ ] Add/edit/delete/reorder rows and assemblies recalculate values correctly.
- [ ] Currency, rounding, negative leasing fee, totals, blank values, zero, and large values are correct.
- [ ] Autosave, manual Save, verification, and submit-to-admin show accurate status and recover from API failure.
- [ ] Concurrent workspace updates/Socket.IO refresh do not overwrite newer local edits.
- [ ] Refresh/restart hydrates the latest saved record without duplicating rows.
- [ ] Tutorial hides the page header, highlights the correct targets, narrates, auto-advances, supports Back/Next/Exit/Escape, and completes only at Finish.
- [ ] Tutorial UI remains readable in light/dark modes and at supported scaling.

## 13. Quotation version history

- [ ] Every successful manual Save creates one history snapshot; failed saves create none.
- [ ] History sidebar opens with correct count, dates, author, grouping, background, and light/dark readability.
- [ ] Refresh loads new snapshots without duplicates.
- [ ] Preview displays the selected snapshot in a clearly read-only workspace.
- [ ] Read-only mode blocks every mutation, autosave, submit, and destructive keyboard action.
- [ ] Exit Preview restores the current working version without losing data.
- [ ] Restore requires confirmation, restores all quotation fields/rows/signatures, and persists after reload.
- [ ] Restore behavior creates an auditable new current version and does not destroy older snapshots.
- [ ] Unauthorized users cannot list, preview, create, or restore another user's history.
- [ ] Missing/deleted quotation or snapshot returns a recoverable message.

## 14. Print, PDF, and Excel export/import

- [ ] Print opens the native dialog; user cancellation is treated as cancellation, not an application error.
- [ ] Printed Standard, KEMCO, and Special quotations fit A4 with correct page breaks, margins, colors, and signatures.
- [ ] PDF Save supports Cancel and produces a readable A4 PDF with backgrounds, selectable filename, and correct data.
- [ ] Excel export opens without repair warnings in the supported Microsoft Excel version.
- [ ] Excel workbook contains the expected Quotation, Details, and Rank sheets and correct active sheet.
- [ ] KEMCO header logo, company title, quotation title, address, client block, document details, row 17 header, table borders, totals, and signature blocks match the approved template.
- [ ] Verify KEMCO widths A–H, required row heights, merged cells, fonts, alignment, number formats, and print area against the golden workbook.
- [ ] Verify Unit Code and Description columns display realistic longest values without corrupting adjacent columns.
- [ ] Standard and billing exports remain unchanged by KEMCO-specific formatting.
- [ ] Japanese text, currency, negative leasing fee, dates, percentages, and large values display correctly in Excel.
- [ ] Export with missing logo/template/API still uses the local fallback and remains complete.
- [ ] Excel import accepts valid supported workbooks and rejects malformed/wrong-template files without partial changes.
- [ ] Import/export round-trip preserves business data within defined formatting limitations.

## 15. Contacts, presets, and signatures

- [ ] Client and project-in-charge lists load, search, select, and populate quotation fields correctly.
- [ ] Creating presets validates required fields, avoids unintended duplicates, and appears immediately.
- [ ] API failure does not clear manually entered client/project data.
- [ ] Prepared by, Approved by, and Received by values appear in workspace, print, PDF, and Excel consistently.
- [ ] KEMCO Received by label/line/name occupy the approved F–H area.

## 16. Notifications, broadcasts, and real-time behavior

- [ ] WebSocket/Socket.IO connects after login and reconnects after backend/network interruption.
- [ ] Reconnection does not duplicate notifications or global-refresh handlers.
- [ ] Notification list, unread count, mark read, mark all read, delete, and clear all persist correctly.
- [ ] Notification redirects open the correct authorized destination.
- [ ] Global refresh occurs after successful mutations only and does not cause request loops.
- [ ] Multiple clients receive quotation, assessment, and broadcast changes within the agreed time.
- [ ] Unauthorized WebSocket connections and cross-user events are rejected/filtered.

## 17. Security and privacy

- [ ] Run dependency vulnerability scans for npm and Python; triage all high/critical findings.
- [ ] Verify SQL injection, stored/reflected XSS, command injection, path traversal, and malicious upload attempts are blocked.
- [ ] Verify all object-level authorization by changing user, quotation, submission, feedback, task, and history IDs.
- [ ] Verify destructive and admin endpoints enforce authentication and role checks server-side.
- [ ] Verify API validation rejects unexpected fields, invalid enums, overlong values, and malformed multipart bodies.
- [ ] Verify rate limiting or equivalent abuse controls for login, forgot password, search/AI, TTS, uploads, and broadcasts.
- [ ] Review Electron `no-sandbox`, DevTools shortcuts in packaged builds, IPC validation, external URL handling, and command execution before release.
- [ ] Confirm downloaded filenames/paths and selected CAD application names cannot inject shell commands.
- [ ] Verify secure transport or an approved isolated LAN threat model; bearer tokens must not traverse untrusted plaintext networks.
- [ ] Verify logs and exports follow company privacy and retention requirements.
- [ ] Confirm error responses do not expose stack traces, filesystem paths, SQL, credentials, or internal network details.

## 18. Performance, resilience, and recovery

- [ ] Define and meet targets for startup, login, lesson load, search, quotation save, export, and large file transfer.
- [ ] Test representative production data volume for users, tasks, submissions, history, notifications, and knowledge-base files.
- [ ] Test two or more simultaneous active users per role and expected peak concurrency.
- [ ] Monitor CPU, memory, disk, database connections, WebSocket count, and Electron memory during a sustained session.
- [ ] Verify repeated modal open/close, tutorial narration, exports, and navigation do not leak memory or duplicate listeners.
- [ ] Simulate backend restart, MySQL restart, NAS outage, slow network, dropped WebSocket, and client sleep/wake.
- [ ] Verify retry behavior is bounded and never creates duplicate submissions, saves, broadcasts, or history snapshots.
- [ ] Verify recovery point and recovery time objectives using an actual restore drill.

## 19. Compatibility and visual regression

- [ ] Test supported Windows versions, display scaling, resolutions, and multi-monitor movement.
- [ ] Test the packaged Electron app and supported browser fallback, if browser use is permitted.
- [ ] Test with Microsoft Excel versions used by KMTI, including Protected View behavior.
- [ ] Test printing with at least one physical/virtual printer and PDF driver.
- [ ] Test installed and missing CAD applications used by open-with workflows.
- [ ] Compare key screens in light/dark mode against approved screenshots: login, manuals, assessments, admin, quotation lobby/workspace/history/tutorial/print preview.
- [ ] Compare all three quotation Excel variants against approved golden workbooks.

## 20. Final deployment and post-deployment smoke test

- [ ] Freeze the approved commit and regenerate artifacts from that exact commit.
- [ ] Record artifact checksums and scan installers for malware.
- [ ] Confirm deployment window, user communication, rollback owner, and support contact.
- [ ] Back up production data and verify backup completion before rollout.
- [ ] Deploy backend/configuration/migrations in the documented order.
- [ ] Deploy/install the signed frontend package and verify version display.
- [ ] Sign in once as Admin, Employee/Mentor, and Trainee.
- [ ] Open one manual lesson, submit one test quiz, and verify progress.
- [ ] Download and upload one assessment file and verify mentor visibility.
- [ ] Create/save a test quotation, preview history, restore it, and export Print/PDF/Excel.
- [ ] Verify TTS, search/RAG, notifications, broadcasts, MySQL, and NAS access.
- [ ] Review backend/client logs and monitoring for new errors after smoke testing.
- [ ] Remove or clearly label test production records.
- [ ] Final go/no-go decision recorded with owner and timestamp.
- [ ] Rollback procedure is ready and has not been invalidated by irreversible migrations.

## Current audit snapshot (2026-07-23)

- [x] Frontend production build passed.
- [x] Frontend automated tests passed: 7 files, 58 tests.
- [x] Backend suite passed after exposing the inner FastAPI app for dependency overrides: 97 tests passed.
- [x] CORS is applied at the outer ASGI boundary so Socket.IO and late file-response errors retain browser-readable CORS headers.
- [ ] Raise or explicitly accept backend coverage; current measured total is approximately 37%, with especially low route coverage in assessments, quotations, TTS, notifications, and admin APIs.
- [ ] Add end-to-end coverage for Electron packaging, MySQL/NAS, WebSockets, uploads/downloads, quotation Print/PDF/Excel, and role-based workflows.
- [ ] Review Vite deprecation and large-chunk warnings before the next dependency/toolchain upgrade.

## Exit criteria

Deployment is approved only when every Mandatory release gate is checked, all P0/P1 defects are closed, unresolved P2/P3 risks are documented and accepted by the release owner, backups and rollback are proven, and the post-deployment smoke-test owner is assigned.
