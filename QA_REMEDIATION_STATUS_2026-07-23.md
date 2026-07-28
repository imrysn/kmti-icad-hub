# KMTI iCAD Hub — QA Remediation Status

**Date:** 2026-07-23  
**Status:** Ready to create an internal release-candidate build; production deployment still requires the operational and manual gates below.

## Remediation completed

- Removed logging of the JWT `SECRET_KEY` and environment path.
- Removed `.env` and generated TTS cache from backend build artifacts.
- Added safe backend/frontend environment templates and deployment guidance.
- Added TTS runtime cache to `.gitignore` for new files.
- Resolved all 52 TypeScript errors.
- Added mandatory `npm run typecheck` execution before production builds.
- Upgraded Electron, electron-builder, Vite, and affected frontend dependencies.
- Added a targeted secure UUID override compatible with ExcelJS.
- Reduced npm audit results from 25 findings to zero.
- Restored Electron sandboxing and disabled DevTools/reload shortcuts in packaged builds.
- Replaced CAD shell command construction with fixed executable/argument process launching.
- Restricted Electron download URLs to HTTP(S) on approved local/private hosts.
- Enforced resolved-path containment for draft/download operations.
- Removed the unused duplicate Electron `main.ts` source.
- Repaired invalid UTF-8 in the 3D Material Setting Japanese pipe label.
- Upgraded backend dependencies with published vulnerability fixes.
- Reduced Python audit results from 51 findings to two no-fix advisories.
- Normalized `backend/requirements.txt` from UTF-16 to UTF-8.

## Final automated results

| Gate | Result |
|---|---|
| Frontend TypeScript | PASS — 0 errors |
| Frontend tests | PASS — 58/58 |
| Frontend npm audit | PASS — 0 vulnerabilities |
| Vite 8 production build | PASS — 2,248 modules |
| Electron 43 Windows x64 unpacked package | PASS |
| Excel quotation export regression | PASS — 3/3 |
| Backend tests after dependency upgrades | PASS — 98/98 |
| Backend dependency consistency | PASS |
| Backend Python compilation | PASS |
| MySQL model/schema comparison | PASS — no missing modeled tables/columns |
| Secret/no-sandbox/shell-exec scan | PASS |
| Build artifact `.env` scan | PASS — none found |
| Git diff formatting check | PASS |

Generated validation artifact:

`frontend/dist-electron/win-unpacked/KMTI Training Hub.exe`

This unpacked executable is a test artifact, not the approved production installer.

## Remaining dependency risk acceptance

Python audit reports two advisories with no published fixed version:

1. `chromadb==1.5.9` — `PYSEC-2026-311`
2. `ecdsa==0.19.2` — `PYSEC-2026-1325`

ECDSA is not used by the configured HS256 JWT algorithm. ChromaDB is used for local RAG. The release owner must document temporary acceptance, monitor upstream releases, and upgrade when fixes become available.

## Required before production deployment

- [ ] Rotate the JWT signing key securely in the protected deployment `.env`; do not place it in source or chat/log output.
- [ ] Set the exact production `CORS_ORIGINS` allowlist in the protected backend `.env`.
- [ ] Verify the configured production API address from representative KMTI workstations.
- [ ] Decide whether plain HTTP is acceptable on the isolated LAN or deploy TLS.
- [ ] Review all existing uncommitted changes and freeze a clean release commit/tag.
- [ ] Keep runtime uploads, feedback files, and generated cache out of the release commit.
- [ ] Record formal risk acceptance for the two no-fix Python advisories.
- [ ] Perform clean-machine NSIS/portable install, upgrade, uninstall, and Authenticode verification.
- [ ] Complete role-based Admin, Employee/Mentor, Trainee, and inactive-user manual regression.
- [ ] Complete packaged-app quotation Save/History/Restore/Tutorial/TTS/Print/PDF/Excel regression.
- [ ] Test assessment upload/download/CAD launch, notifications, broadcasts, WebSockets, NAS interruption, and recovery.
- [ ] Visually verify light/dark modes, accessibility, Windows scaling, approved Excel templates, and printer/PDF output.
- [ ] Prove database/file backup restoration and migration rollback before rollout.

## Verdict

The application now passes the automated build-readiness gates and can be used to create an internal release candidate. It is not approved for production deployment until signing-key rotation, production network/CORS configuration, clean release-source control, no-fix dependency risk acceptance, and the manual production-equivalent QA gates are completed.
