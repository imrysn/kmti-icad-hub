# Browser KMTI iCAD Hub — Structure Improvement Implementation Plan

## 1. Purpose

Improve the repository so it is safer to operate, easier to navigate, simpler to test, and more consistent with the separation-of-concerns rules in `ARCHITECTURE.md`. This plan focuses on structural improvements; it does not change product behavior.

## 2. Current Structure Summary

```text
browser-kmti-icad-hub/
├── frontend/                 React, Vite, Electron, TypeScript
│   ├── electron/             Electron main-process code
│   └── src/
│       ├── components/       Shared and lesson UI
│       ├── views/            Admin, mentor, trainee, assistant views
│       ├── hooks/            State and workflow logic
│       ├── services/         API clients
│       ├── context/          Global React state
│       ├── config/           API and translation configuration
│       ├── styles/           Global/component styles
│       ├── types/            Shared TypeScript types
│       └── test/             Test setup and mocks
├── backend/                  FastAPI and SQLAlchemy
│   ├── routers/              HTTP endpoints
│   ├── services/             Business logic
│   ├── auth/                 Authentication and authorization
│   ├── alembic/              Database migrations
│   ├── scripts/              Data and curriculum utilities
│   └── tests/                Backend tests
├── knowledge_base/           Knowledge source files
├── master_units/             CAD reference files
├── uploads/                  User submissions and feedback
├── scratch/                  Diagnostics and experiments
└── root scripts/docs         Setup, migration, repair, and release files
```

The intended frontend and backend layer boundaries are present, but several large modules, tracked runtime files, and scattered scripts weaken those boundaries.

## 3. Key Findings

### P0 — Repository and data safety

- `backend/.env.lms-development` is tracked. It must be treated as potentially sensitive even if it currently contains development-only values.
- User uploads and feedback are tracked alongside source code. These files may contain personal, proprietary, or operational data and make cloning and reviewing the repository expensive.
- Generated files such as `frontend/tsconfig.tsbuildinfo`, `output.bin`, logs, and scratch artifacts are tracked.
- `.gitignore` contains a malformed null-byte/UTF-16-looking entry, which can make ignore behavior unreliable.
- Git LFS status currently fails because `.git/lfs/tmp` is not writable. This blocks dependable repository checks.

### P1 — Maintainability and architecture

- Several frontend files exceed 1,000 lines, including `3D_BasicOperation.tsx`, `PracticalTrainerDashboard.tsx`, `PracticalManagement.tsx`, and `mentorConstants.ts`.
- `backend/routers/assessments.py` exceeds 1,200 lines. A router of this size likely mixes endpoint parsing, queries, validation, and workflow logic.
- `backend/models.py` and `backend/schemas.py` are central monoliths. As domains grow, merge conflicts and unclear ownership will increase.
- Root-level repair, migration, translation, ingestion, and debugging scripts do not have a consistent lifecycle or location.
- The architecture document calls for a repository/data layer, but the backend does not expose a consistent `repositories/` package.

### P1 — Quality gates

- There are backend and frontend tests, but no repository CI workflow is present.
- Frontend tests cover only a small part of a large UI surface.
- No standard lint or formatting commands are declared for TypeScript or Python.
- Build, migration, packaged-Electron, and production configuration checks are not unified into one repeatable verification command.

### P2 — Developer experience and documentation

- Multiple implementation plans and deployment documents exist without a single index or status convention.
- Setup is split across several batch/PowerShell scripts, increasing the chance that documented and actual setup diverge.
- Runtime data, seed/reference data, source assets, and developer scratch data are visually mixed at the repository root.

## 4. Target Structure

```text
browser-kmti-icad-hub/
├── apps/
│   ├── desktop/              Existing frontend/Electron application
│   └── api/                  Existing FastAPI application
├── data/
│   ├── fixtures/             Small, sanitized, versioned test/seed data
│   └── README.md             External storage and restore instructions
├── docs/
│   ├── architecture/
│   ├── deployment/
│   ├── plans/
│   └── operations/
├── scripts/
│   ├── setup/
│   ├── migrations/
│   ├── maintenance/
│   └── diagnostics/
├── tests/                    Cross-application smoke/end-to-end tests
└── README.md
```

Moving immediately to `apps/` is optional and should be done only after safety and test gates are established. The first refactors can retain `frontend/` and `backend/` to avoid high-churn path changes.

## 5. Phased Implementation

### Phase 0 — Establish a safe baseline

**Goal:** Make repository state trustworthy before moving or refactoring code.

1. Create a backup tag/branch and inventory all tracked binary, upload, database, log, environment, and generated files.
2. Review `backend/.env.lms-development` for secrets. Rotate exposed credentials before removing the file from tracking.
3. Replace it with a sanitized `.env.example` plus documented required/optional variables.
4. Rebuild `.gitignore` as valid UTF-8 and add explicit rules for:
   - `.env*` except approved examples
   - `uploads/` runtime content
   - databases and sidecar files
   - caches, logs, generated binaries, and `*.tsbuildinfo`
   - local scratch output
5. Decide whether versioned CAD reference files belong in Git LFS, an artifact store, or deployment storage. Document ownership, backup, and restore.
6. Remove generated/runtime files from the Git index without deleting required local copies.
7. Repair `.git/lfs/tmp` permissions and verify normal `git status`, LFS integrity, and fresh clone/checkout.

**Acceptance criteria**

- No secret-bearing environment file or user-generated upload is tracked.
- A clean checkout can be created without Git LFS errors.
- Required sample data is sanitized, intentionally versioned, and documented.
- `git status`, `git lfs fsck`, and ignore checks complete successfully.

### Phase 1 — Add repeatable quality gates

**Goal:** Protect behavior before structural refactoring.

1. Add frontend linting and formatting commands (ESLint and Prettier) with pinned configuration.
2. Add backend linting and formatting/type checks (Ruff plus the existing Pyright configuration, or a documented equivalent).
3. Define one root verification entry point that runs:
   - frontend typecheck, unit tests, and production build
   - backend tests and static checks
   - Alembic migration validation
   - secret/generated-file checks
4. Add CI with dependency caching and separate frontend/backend jobs.
5. Publish coverage reports and establish initial baselines rather than imposing arbitrary high thresholds immediately.
6. Add a smoke test for login, role routing, course loading, assessment submission, upload handling, and logout.

**Acceptance criteria**

- Pull requests cannot merge when typecheck, tests, lint, build, or migration checks fail.
- The same verification command works locally and in CI.
- Critical user journeys have automated smoke coverage.

### Phase 2 — Split backend by domain

**Goal:** Keep routers thin and make business rules independently testable.

1. Start with assessments because `backend/routers/assessments.py` is the largest router.
2. Extract assessment workflows into focused services such as submission, grading, task configuration, file handling, and reporting.
3. Introduce repositories for database access; services should not depend directly on request objects.
4. Split `models.py` and `schemas.py` into domain modules (`auth`, `accounts`, `courses`, `assessments`, `access`, `notifications`) while preserving compatibility exports during migration.
5. Centralize exception-to-HTTP-response mapping and transaction boundaries.
6. Apply the same pattern incrementally to the next largest/highest-change routers.

**Acceptance criteria**

- Routers perform request parsing, dependency injection, service calls, and response mapping only.
- Domain services and repositories have focused unit tests.
- Database migrations remain linear and pass upgrade/downgrade validation.
- Existing API contracts remain unchanged unless explicitly versioned.

### Phase 3 — Decompose frontend features

**Goal:** Reduce component complexity while preserving the user experience.

1. Organize code by feature (`assessment`, `mentor`, `admin`, `lessons`, `auth`) with local `components`, `hooks`, `services`, `types`, and tests.
2. Refactor the largest components first:
   - `3D_BasicOperation.tsx`
   - `PracticalTrainerDashboard.tsx`
   - `PracticalManagement.tsx`
   - `PracticalAssessment.tsx`
3. Move static lesson definitions from render components into typed content/config modules.
4. Move state machines, timers, uploads, API orchestration, and derived state into feature hooks.
5. Extract reusable UI patterns only after two or more concrete uses exist.
6. Replace the large mentor constants module with domain-specific typed modules.
7. Add route-level lazy loading for admin, mentor, assistant, and heavy 3D lesson bundles.

**Acceptance criteria**

- Page components primarily compose feature components and hooks.
- No new direct API calls are added to view components.
- Refactored workflows retain behavior through component/integration tests.
- Production bundle analysis confirms heavy 3D/admin modules are loaded only when needed.

### Phase 4 — Rationalize scripts, data, and documentation

**Goal:** Make every non-application file easy to classify and maintain.

1. Classify scripts as supported operations, migrations, diagnostics, one-time scripts, or obsolete.
2. Move supported scripts under `scripts/` and require a help description, safe defaults, and explicit target environment.
3. Retire obsolete one-time scripts after recording their outcome in migration/history documentation.
4. Move scratch work outside tracked source or retain only sanitized, reusable diagnostic tools.
5. Consolidate setup scripts behind one supported Windows entry point and one documented manual path.
6. Create `docs/README.md` indexing active architecture, setup, deployment, QA, and implementation documents.
7. Add status metadata to plans: owner, created date, status, prerequisites, and superseded-by link.

**Acceptance criteria**

- Each root-level file has an obvious purpose; unsupported artifacts are archived or removed.
- Operational scripts are idempotent where practical and refuse ambiguous destructive actions.
- Documentation has one discoverable entry point and no conflicting setup instructions.

### Phase 5 — Production hardening and observability

**Goal:** Make desktop/API deployment diagnosable and recoverable.

1. Add structured logs with request/correlation IDs and redaction of tokens, passwords, and personal data.
2. Add health/readiness checks for database, storage, background sync, and required model/provider configuration.
3. Define upload size/type limits, quarantine/scanning policy, retention, and cleanup jobs.
4. Validate Electron security defaults: context isolation, sandboxing where compatible, narrow preload APIs, navigation restrictions, and Content Security Policy.
5. Add backup/restore procedures and test restoration of database, knowledge sources, and required CAD assets.
6. Document release rollback for API, migrations, and desktop builds.

**Acceptance criteria**

- Operators can distinguish configuration, dependency, storage, database, and application failures.
- Sensitive values are redacted from logs and error responses.
- Backup restoration and release rollback are tested and documented.

## 6. Recommended Delivery Order

| Iteration | Scope | Expected outcome |
|---|---|---|
| 1 | Phase 0 inventory, secrets, ignore rules, LFS repair | Safe and trustworthy repository |
| 2 | Local verification command and CI | Refactor safety net |
| 3 | Assessment backend vertical slice | Proven backend domain pattern |
| 4 | Practical assessment/mentor frontend slice | Proven frontend feature pattern |
| 5 | Remaining large modules and models/schemas | Reduced coupling and file size |
| 6 | Script/docs cleanup and production hardening | Sustainable operations |

Each iteration should be a small, reviewable change. Avoid combining file relocation, behavior changes, dependency upgrades, and formatting of the whole repository in one pull request.

## 7. Success Metrics

- Zero tracked secrets, user uploads, runtime databases, logs, or generated build metadata.
- Clean clone and Git LFS verification succeed on a new workstation.
- All merges pass frontend build/typecheck/tests and backend tests/static checks.
- Critical workflows have integration or smoke tests.
- Largest router/view modules shrink through cohesive extraction, with a practical target of under 400–600 lines rather than a rigid line limit.
- Setup and full verification can each be launched through one documented entry point.
- Production incidents can be traced using structured, redacted logs and health checks.

## 8. First Implementation Ticket

**Repository safety and reproducibility audit**

1. Inventory tracked files by type and size.
2. Review and rotate any credentials in the tracked development environment file.
3. Define which CAD/reference assets are source-controlled and which are externally stored.
4. Correct `.gitignore` encoding and rules.
5. Stop tracking runtime/generated/user files while preserving required local data and backups.
6. Repair Git LFS permissions.
7. Verify a clean clone, setup, test, and build using documented commands.

This ticket should be completed before large module refactoring because it reduces data-loss, credential, and reproducibility risk.
