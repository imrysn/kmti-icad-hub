# KMTI iCAD Hub — Release Readiness Audit

**Audit date:** 2026-07-23  
**Branch:** `emji`  
**Audited commit:** `2ebc752` plus the current uncommitted working-tree changes  
**Checklist:** `QA_PRE_DEPLOYMENT_CHECKLIST.md`  
**Verdict:** **NO-GO for deployment**  
**Build mechanics:** **PASS with warnings**

The current source can produce a frontend bundle and an unpacked Electron application, but it does not satisfy the mandatory pre-deployment gates. Resolve every P0 and P1 item below, freeze a clean release commit, and complete the blocked manual/environment tests before producing a deployable installer.

## Executive summary

| Area | Status | Evidence |
|---|---|---|
| Frontend production build | PASS | Vite built 2,267 modules successfully |
| Unpacked Electron packaging | PASS WITH WARNINGS | `electron-builder --dir` completed for Windows x64 |
| Frontend automated tests | PASS | 7 files, 58 tests passed |
| TypeScript validation | FAIL | 52 compiler errors |
| Backend automated tests | PASS | 98 tests passed |
| Backend Python compilation | PASS | `compileall` passed |
| Backend dependency consistency | PASS | `pip check` found no broken requirements |
| Backend test coverage | RISK ACCEPTANCE REQUIRED | 37% total coverage |
| Model-to-MySQL schema check | PASS | MySQL connected; 27 model tables; no missing tables or columns |
| Local live system status | PASS | Online, MySQL mode, NAS reported reachable |
| Configured production API host | FAIL/BLOCKED | `192.168.200.105:3001` was unreachable from the audit workstation |
| npm vulnerability audit | FAIL | 25 findings: 2 critical, 16 high, 5 moderate, 2 low |
| Release-candidate hygiene | FAIL | Dirty tree plus runtime/generated files |
| Installer/signing/install/upgrade test | NOT VERIFIED | Only unpacked packaging was performed |
| Full role-based manual regression | NOT VERIFIED | Requires controlled test accounts and live UI execution |

## P0 — mandatory blockers

### 1. Production secret is written to logs

`backend/auth/security.py` prints the complete `SECRET_KEY` during import/startup. Anyone with console or log access can obtain the JWT signing secret and forge authentication tokens.

Required before release:

- [ ] Remove the secret-value log immediately.
- [ ] Rotate the current production signing key because it may already exist in logs.
- [ ] Search historical logs and build output for the exposed key and securely remove affected logs.
- [ ] Add a test or static check that prevents secret values from being logged.

### 2. Critical and high npm vulnerabilities

The registry audit reported:

- 2 critical
- 16 high
- 5 moderate
- 2 low
- 25 total

Critical dependency paths include `shell-quote` and `tar`. High findings include direct dependencies `axios`, `electron`, `electron-builder`, `react-router-dom`, and `vite`, plus transitive packages such as `@xmldom/xmldom`, `form-data`, `js-yaml`, `lodash`, `tmp`, and `undici`.

Required before release:

- [ ] Upgrade and retest direct dependencies with critical/high affected paths.
- [ ] Document any finding that is provably build-time-only and formally accept the remaining risk.
- [ ] Rerun `npm audit --audit-level=high`; target zero unaccepted critical/high findings.
- [ ] Rebuild and rerun frontend tests, TypeScript validation, Electron packaging, and manual smoke tests after upgrades.

## P1 — release blockers

### 3. TypeScript validation fails with 52 errors

The production bundle succeeds because Vite transpiles without enforcing a clean TypeScript check. `npx tsc --noEmit` reports:

| Code | Count | Main affected areas |
|---|---:|---|
| TS2322 | 40 | 2D/3D lesson button handlers and other assignments |
| TS2353 | 2 | Practical Assessment confirmation options |
| TS2740 | 2 | ExcelJS image anchor typing |
| TS7016 | 2 | Missing `file-saver` declarations |
| TS2554 | 2 | Quotation file-operation call signatures |
| TS2741 | 2 | Practical task download metadata |
| TS2339 | 1 | Promise/User misuse in Practical Assessment |
| TS18048 | 1 | Possibly undefined feedback object |

Required before release:

- [ ] Resolve all 52 errors.
- [ ] Add `typecheck` to `package.json`.
- [ ] Make `typecheck` a mandatory step before `build` and packaging.

### 4. Release candidate is not frozen or clean

The audit ran against commit `2ebc752` plus many modified/untracked files. The tree includes source changes, tests, the QA documents, generated TTS WAV files, and an uploaded feedback workbook.

Required before release:

- [ ] Review every changed source file and include only intended changes.
- [ ] Remove runtime/user data from the release source tree or move it to managed runtime storage.
- [ ] Freeze a clean commit/tag and build exclusively from that identifier.
- [ ] Record checksums of final artifacts.

### 5. TTS cache is treated as source/build content

The repository currently tracks approximately 789 WAV cache files and has another 42 untracked cache files. The full build orchestration copies the entire cache into the backend distribution. This creates size, privacy, reproducibility, and stale-content risks.

Required before release:

- [ ] Decide whether any voice assets are required immutable application assets or disposable runtime cache.
- [ ] Exclude disposable cache from Git and release artifacts.
- [ ] Package only explicitly approved model/voice assets.
- [ ] Verify cache cleanup and regeneration on a clean workstation.

### 6. Build orchestration copies `.env` into the backend distribution

`frontend/build-all.js` copies `backend/.env` to `backend/dist/.env`. This risks distributing database credentials, signing keys, and infrastructure details as part of a reusable artifact.

Required before release:

- [ ] Remove secrets from generic build artifacts.
- [ ] Inject environment-specific secrets during controlled deployment or use a protected external configuration store.
- [ ] Verify packaged installers/archives do not contain `.env`, credentials, or secret values.

### 7. Electron security posture needs remediation

Observed concerns:

- Chromium is launched with `--no-sandbox`.
- DevTools shortcuts remain enabled in packaged builds.
- CAD launching constructs shell commands and executes them with `child_process.exec`.
- The active implementation is `electron/main.js` at roughly 458 lines while `electron/main.ts` is roughly 55 lines, creating source-of-truth divergence.

Required before release:

- [ ] Remove `--no-sandbox` unless a documented, approved platform constraint requires it.
- [ ] Disable DevTools shortcuts in production builds or restrict them to authorized diagnostics.
- [ ] Replace shell-string execution with `spawn`/`execFile` and fixed executable/argument arrays.
- [ ] Revalidate filenames and paths at the final IPC boundary using resolved containment checks.
- [ ] Establish one authoritative Electron main-process source and a repeatable compile step.
- [ ] Conduct an Electron IPC/path traversal/command injection security test.

### 8. Production network configuration is not verified

The production frontend points to `http://192.168.200.105:3001`. That endpoint was unreachable from the audit workstation, while `http://127.0.0.1:3001` was healthy and reported MySQL/NAS online.

Required before release:

- [ ] Verify the intended deployment topology and production server address from an actual client workstation.
- [ ] Verify firewall, routing, CORS, WebSocket/Socket.IO, downloads, and uploads using that address.
- [ ] Prefer authenticated TLS; otherwise formally document and approve the isolated-LAN threat model.

### 9. Production CORS is not explicitly configured

`CORS_ORIGINS` is absent, so the server uses fallback origins plus a regex that permits localhost, loopback, and any `192.168.x.x` origin with credentials.

Required before release:

- [ ] Set an explicit production `CORS_ORIGINS` allowlist.
- [ ] Narrow or disable the LAN regex in production.
- [ ] Retest authenticated API calls, downloads, and WebSockets from the approved Electron/browser origins.

### 10. Migration governance is incomplete

Only an initial Alembic migration is present, while startup also calls `create_all` and performs an inline `ALTER TABLE` for one column. The live schema currently matches models, but repeatable upgrade and rollback behavior is not demonstrated.

Required before release:

- [ ] Generate/review formal migrations for every production schema change.
- [ ] Test upgrade from the currently deployed schema on a backup copy.
- [ ] Test rollback or document irreversible steps and recovery procedure.
- [ ] Avoid depending on startup auto-mutation for production schema governance.

## P2 — important quality risks

- [ ] Increase or formally accept 37% backend coverage. Assessment, quotation, TTS, notification, storage, and admin route coverage remains limited.
- [ ] Add frontend coverage reporting and define a minimum threshold; current execution verifies 58 tests but not broad UI coverage.
- [ ] Resolve Vite deprecated configuration warnings.
- [ ] Review the approximately 2.8 MB main JavaScript chunk and large bundled media; define acceptable startup/memory targets.
- [ ] Add package metadata (`description`, `author`) reported missing by electron-builder.
- [ ] Add code signing and verify SmartScreen/installer trust requirements.
- [ ] Remove the request-validation handler's write to `scratch/error_log.txt` or replace it with controlled structured logging and retention.
- [ ] Remove environment-path debug logs after configuration troubleshooting.
- [ ] Address Pydantic v2 deprecation warnings and the unknown pytest `asyncio_mode` option before future upgrades.
- [ ] Run a Python vulnerability scanner; `pip check` validates consistency but does not identify known CVEs.

## Passed automated gates

- [x] Frontend dependencies resolve with `npm ls --depth=0`.
- [x] Frontend automated tests: 58/58 passed.
- [x] Vite production bundle completed successfully.
- [x] Windows x64 unpacked Electron package completed successfully.
- [x] Backend automated tests: 98/98 passed.
- [x] CORS regression test for authenticated submission download passed.
- [x] Backend Python compilation passed.
- [x] Installed Python dependencies have no broken requirements.
- [x] Local system-status API responded online in MySQL mode with NAS reported reachable.
- [x] Direct model-to-MySQL comparison found 27 modeled tables and no missing tables or columns.
- [x] Production signing-key length and token lifetime are explicitly configured rather than using the insecure long-lived fallback.
- [x] Frontend and backend `.env` files are ignored by Git.

## Blocked or manual gates

These items cannot be marked passed from static/automated inspection alone:

- [ ] Clean-machine NSIS installer and portable build creation.
- [ ] Installer signing, install, upgrade, uninstall, reinstall, and rollback.
- [ ] Admin, Employee/Mentor, Trainee, and inactive-user end-to-end scenarios.
- [ ] Production API/NAS/MySQL connectivity from representative client workstations.
- [ ] Backup restoration and migration rollback drill.
- [ ] Real CAD application open/download workflows.
- [ ] Physical/virtual printer output and canceled-print behavior.
- [ ] PDF output visual comparison.
- [ ] Microsoft Excel comparison of Standard, KEMCO, and Special workbooks against approved golden files.
- [ ] Quotation save, history preview/restore, tutorial/TTS, concurrent editing, Print/PDF/Excel, and failure recovery in the packaged app.
- [ ] WebSocket reconnect, broadcasts, notifications, and multi-client refresh under network interruption.
- [ ] Light/dark visual regression, accessibility, keyboard navigation, Windows scaling, and multi-monitor behavior.
- [ ] Performance, sustained memory, concurrency, storage-full, NAS outage, and recovery tests.

## Required go/no-go sequence

1. Fix the P0 secret exposure and rotate the signing key.
2. Remediate/triage critical and high dependency vulnerabilities.
3. Resolve all TypeScript errors and enforce type checking in builds.
4. Harden Electron, build configuration, CORS, and secret injection.
5. Clean and freeze the release candidate commit/tag.
6. Re-run all automated gates on the frozen commit.
7. Build signed installer and portable artifacts from that commit.
8. Complete every relevant blocked/manual gate in a production-equivalent environment.
9. Record defect disposition, backup/rollback evidence, and release-owner sign-off.

The project is ready for continued internal build testing, but **it is not ready for a production deployment build** until the P0/P1 gates are closed.
