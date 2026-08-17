# KMTI Training Hub — Access Foundation Implementation Plan and Checklist

**Branch:** `codex/lms-access-foundation`  
**Prepared:** 2026-08-17  
**Status:** Implementation in progress  
**Scope owner:** KMTI  

## 1. Purpose

This document is the implementation guide and working checklist for the first LMS foundation release of KMTI Training Hub. It converts the agreed product direction into buildable work:

- One KMTI-operated platform
- Two controlled account-entry paths: public learner self-registration and administrator-issued invitations
- Email verification followed by KMTI administrator approval
- Controlled creation of privileged accounts
- Three platform roles with permission-controlled Admin Panel areas
- Three configurable learning-access plans
- Administrative approval, plan assignment, and audit history

This phase establishes identity and access. Course completion, advanced grading, payments, subscriptions, and content-authoring modernization will follow after this foundation is stable.

## 2. Agreed product decisions

### 2.1 Company model

The initial platform is **single-company** and operated by KMTI.

- KMTI controls users, plans, courses, instructors, and platform policies.
- External trainees and learners in Japan may register; they remain users of the KMTI platform.
- Departments, locations, client groups, and training batches are not separate tenants.
- The data model should leave a low-cost migration path to multi-company support, but tenant administration and tenant-specific branding are not part of this release.

### 2.2 Account model

The platform supports **both self-registration and invitation-only onboarding**. The two paths serve different needs but create accounts in the same identity system.

#### Path A — Public learner self-registration

Learners may apply from a public link on KMTI company websites. Self-registration never grants immediate access or the Instructor/Admin roles.

```text
Registration submitted
→ Email verification required
→ Pending administrator approval
→ Administrator assigns/approves access plan
→ Account activated
→ Learner can sign in and access entitled training
```

#### Path B — Administrator invitation

An authorized administrator may invite a known learner, instructor, or administrator. The administrator selects the role, access plan where applicable, permitted Admin Panel areas for an administrator, and optional access dates before sending the invitation.

```text
Administrator creates invitation
→ Role and learner plan are predetermined
→ Recipient receives a single-use invitation link
→ Recipient verifies email, accepts policies, and creates a password
→ Account activates with the approved role and access
```

Invited learners normally do not require a second approval because the invitation itself is the administrator's approval. KMTI may enable an optional second-review policy for specific plans or external domains.

Public applicants can request only the Learner role. Instructor and Admin roles cannot be requested through self-registration. Access to the Platform area of the Admin Panel must be granted by an existing administrator who already has Platform user-management permission, after strong re-authentication.

Both paths must prevent duplicate accounts, verify email ownership, record policy consent, use expiring single-use links, create audit events, and produce the same normalized user, role, plan, and session records.

### 2.3 Roles 

| Role | Responsibility |
|---|---|
| Learner | Access assigned training, take quizzes, download tasks, submit work, and receive feedback |
| Instructor | Monitor assigned learners, review submissions, give feedback, and view class-level progress |
| Admin | Perform authorized content, organization, and/or platform administration through the Admin Panel |

The Admin role is one role, but it does not automatically grant every administrative action. Each Admin receives one or more permission-controlled Admin Panel areas:

| Admin Panel area | Purpose |
|---|---|
| Content Editor | Create and revise courses, lessons, quizzes, media, and translations; publish only when the Admin also has publishing permission |
| Organization | Review registrations, send invitations, manage users, plans, courses, classes, instructors, reports, and business settings |
| Platform | Manage technical configuration, security operations, audit access, integrations, storage, monitoring, and recovery |

An Admin may have access to one, two, or all three areas. Page visibility is a convenience; the backend must enforce the corresponding permissions for every operation. Platform-area permissions are the most sensitive and must be assigned to the minimum number of administrators.

### 2.4 Access plans

Plans control **what learning content and services a learner may access**. Roles control **what actions a user may perform**.

Provisional names:

| Plan | Intended access |
|---|---|
| iCAD Foundations | Beginner lessons, quizzes, and selected basic practical tasks |
| iCAD Professional | Foundations plus intermediate content, additional practical sets, and configured trainer services |
| iCAD Complete | All entitled current training levels, practical sets, assessments, and configured trainer services |

Plan names, descriptions, displayed features, included courses, and included practical sets must be configurable by administrators. They must not be hardcoded into lesson components.

These are initially **access plans**, not paid subscriptions. The model will include start/end dates and history so payments and recurring subscriptions can be added later without redesigning access control.

## 3. Scope boundaries

### Included

- Public learner registration page and API
- Administrator invitation creation, resend, cancellation, expiration, and acceptance
- Invitations for learners, instructors, and permission-scoped administrators
- Email ownership verification
- Administrator approval/rejection queue
- Explicit account lifecycle statuses
- Secure sign-in and session lifecycle improvements needed by public registration
- Three roles and server-enforced permissions
- Permission-controlled Content Editor, Organization, and Platform Admin Panel areas
- Three configurable access plans
- Plan entitlements for courses, practical sets, assessments, and selected features
- Requested plan and administrator-assigned plan
- Plan start date, expiration date, upgrade/downgrade, suspension, and history
- Registration, approval, role, and plan audit events
- Transactional email for registration and approval events
- Admin reporting/filtering for applicants and active learners
- Migration of current `trainee`, `employee`, and `admin` users
- Automated tests and production-readiness checks for this scope

### Not included in this phase

- Online payment processing
- Recurring billing, invoices, tax, refunds, or coupons
- Public instructor or content-editor registration
- Multi-company tenant administration
- Full course-authoring migration
- Redesigned course-completion and certificate rules
- Community discussion forums or live classes
- Browser-hosted CAD software
- Replacement of the existing practical assessment workflow except where entitlement checks are required

## 4. Functional workflows

### 4.1 Public learner registration

1. Visitor opens the registration page from a KMTI website.
2. Visitor enters required information and requests an access plan.
3. Visitor accepts the current privacy notice and terms.
4. Server validates the request, performs abuse checks, and creates a pending registration.
5. Platform sends a single-use verification link to the submitted email.
6. Visitor verifies the address before the configured expiration time.
7. Account changes to `pending_approval` and appears in the admin queue.
8. Administrators receive an in-app notification; optional email digest may also be sent.
9. Administrator reviews the application, confirms or changes the plan, and approves or rejects it.
10. Approved learner receives an activation email and can sign in.
11. Rejected applicant receives a neutral result email without internal notes.

### 4.2 Administrator approval

The approval screen must show:

- Applicant name and verified email
- Company/organization, department, position, country/location
- Preferred language
- Registration reason
- Requested plan
- Consent timestamps and policy versions
- Submission and verification timestamps
- Duplicate or risk indicators
- Existing matching users or prior applications

Administrator actions:

- Approve with selected plan and optional start/end date
- Reject with internal reason and optional applicant-facing message
- Request clarification
- Mark as duplicate
- Resend verification email
- Cancel an abusive/fraudulent request
- Assign training batch or instructor later, outside the minimum approval transaction

Approval must be transactional: activate the account, create plan assignment, record audit events, and queue the email together or leave all business data unchanged.

### 4.3 Administrator invitation workflow

1. Administrator selects the account type and enters the recipient's name and email.
2. Administrator assigns the Learner, Instructor, or Admin role. For Admin, the inviter also selects permitted Admin Panel areas and granular permissions.
3. For a learner, the administrator assigns an access plan, start date, and optional expiration.
4. Server checks for an existing account, pending application, or active invitation.
5. Platform creates a hashed, single-use invitation token and sends a localized email.
6. Recipient opens the link, confirms the expected email, accepts current policies, and creates a password.
7. Platform marks the invitation accepted and activates the account with the predetermined access.
8. Administrator and recipient receive confirmation.

Administrator invitation actions:

- Create an individual invitation
- Bulk invite learners from a validated CSV
- Resend an unexpired or replacement invitation
- Cancel an unused invitation
- View pending, accepted, expired, and cancelled invitations
- Correct a recipient name or plan before acceptance
- Never silently change the invited email; cancel and issue a replacement

Invitation statuses:

- `pending`
- `accepted`
- `expired`
- `cancelled`
- `superseded`

### 4.4 Admin account and area access

- Authorized Organization-area admins may invite instructors and Admins with Content Editor access.
- Only an Admin with Platform user-management permission may grant or revoke Platform-area access.
- Admins cannot grant themselves additional areas or permissions.
- Admin invitations use single-use, expiring links and explicitly list the granted areas.
- MFA is required for every Admin with Platform-area access and configurable/strongly recommended for all Admins.
- Every Admin role, area, or permission change requires re-authentication, a reason, and an audit event.

### 4.5 Plan assignment and changes

1. Administrator selects an approved learner.
2. Administrator selects a plan, start date, optional expiration, and reason.
3. Server closes the current assignment at the change boundary and creates a new immutable history entry.
4. Effective entitlements are recalculated.
5. User receives a localized notification.

Rules:

- Upgrades normally take effect immediately or on a chosen future date.
- Downgrades must never delete learning records or submissions.
- Expiration removes access to plan-protected content but preserves history and admin reporting.
- Suspending the account overrides plan access.
- Removing a course from a plan does not erase prior progress.
- Administrators can grant a time-limited exception entitlement with reason and audit trail.

### 4.6 Sign-in outcomes by account status

| Account status | Sign-in result |
|---|---|
| `email_verification_pending` | Blocked; offer verification resend |
| `pending_approval` | Blocked; show application-under-review message |
| `clarification_required` | Blocked; show safe instructions for next action |
| `active` | Allowed when an effective learner plan or Instructor/Admin permission permits access |
| `rejected` | Blocked; show neutral support message |
| `suspended` | Blocked; show support instructions |
| `deactivated` | Blocked; show support instructions |

Do not reveal whether an arbitrary email address has an account in password-reset, resend, or sign-in error responses.

## 5. Permission model

Use named permissions and role-to-permission mappings. Backend policies must also enforce ownership, assigned-course/class scope, and account/plan status.

| Permission area | Learner | Instructor | Admin: Content Editor | Admin: Organization | Admin: Platform |
|---|:---:|:---:|:---:|:---:|:---:|
| View entitled published courses | ✓ | ✓ | Preview | ✓ | ✓ |
| View own learning records | ✓ | — | — | ✓ | ✓ |
| View assigned learner records | — | ✓ | — | ✓ | ✓ |
| Submit own practical work | ✓ | — | — | — | — |
| Review assigned submissions | — | ✓ | — | ✓ | ✓ |
| Edit draft content | — | Optional | ✓ | Optional | Optional |
| Publish content | — | — | Separate permission | ✓ | Optional |
| Review registration requests | — | — | — | ✓ | Optional |
| Manage learners/instructors/admins | — | — | — | ✓ | ✓ |
| Configure access plans | — | — | — | ✓ | Optional |
| View business reports | Own only | Assigned only | Content only | ✓ | Optional |
| View security audit records | — | — | — | Limited | ✓ |
| Manage integrations/security/storage | — | — | — | — | ✓ |
| Grant Platform-area access | — | — | — | — | Separate high-risk permission |

Final permission names should be constants such as:

```text
registration.review
registration.approve
user.read
user.manage
role.assign
admin.area.content.access
admin.area.organization.access
admin.area.platform.access
admin.area.platform.assign
plan.read
plan.manage
plan.assign
course.view_entitled
content.edit
content.publish
submission.create_own
submission.review_assigned
audit.read_security
platform.configure
```

## 6. Data model changes

### 6.1 User and identity

Modify `users`:

- Keep stable numeric `id` for compatibility.
- Add `account_status` enum/string with an indexed constraint.
- Add `email_verified_at`.
- Add `approved_at`, `approved_by_user_id`.
- Add `rejected_at`, `suspended_at`, `deactivated_at` as needed.
- Keep `is_active` temporarily as a compatibility projection; remove only in a later migration.
- Add `preferred_language`, `timezone`, and normalized email.
- Stop treating a single `role` column as the long-term authority.

Add:

- `roles(id, code, name, description, is_system)`
- `permissions(id, code, description)`
- `role_permissions(role_id, permission_id)`
- `user_roles(user_id, role_id, granted_at, granted_by, revoked_at, reason)`
- `admin_area_grants(user_id, area_code, granted_at, granted_by, revoked_at, reason)` where `area_code` is `content`, `organization`, or `platform`
- `user_permission_grants(user_id, permission_id, effect, granted_at, granted_by, revoked_at, reason)` for granular allow/deny exceptions within an assigned Admin area
- `user_sessions(id, user_id, refresh_token_hash, device, ip_metadata, expires_at, revoked_at)`
- `email_verification_tokens(id, user_id/application_id, token_hash, expires_at, used_at)`
- `password_reset_tokens(id, user_id, token_hash, expires_at, used_at)`
- `account_invitations(id, email_normalized, full_name, preferred_language, status, token_hash, invited_by_user_id, expires_at, accepted_at, cancelled_at, superseded_by_id, created_at)`
- `account_invitation_roles(invitation_id, role_id)`
- `account_invitation_plan(invitation_id, plan_id, starts_at, ends_at)`

Store only hashes of verification, reset, invitation, and refresh tokens.

Invitation acceptance must create or activate the user, grant the predetermined roles, assign the predetermined learner plan, accept policy versions, consume the token, and write audit events in one transaction. An invitation must not overwrite an existing active account automatically; it should instead direct an administrator to manage that account.

### 6.2 Registration applications

Add `registration_applications`:

- `id`
- `email_normalized`
- `full_name`
- `company_name`
- `department`
- `job_title`
- `country_code`
- `preferred_language`
- `reason_for_access`
- `requested_plan_id`
- `status`
- `risk_flags_json`
- `email_verified_at`
- `submitted_at`
- `reviewed_at`
- `reviewed_by_user_id`
- `internal_review_notes`
- `applicant_message`
- `privacy_policy_version`, `privacy_consented_at`
- `terms_version`, `terms_accepted_at`
- timestamps and optimistic concurrency/version field

Prefer creating the login-capable `User` only after email verification or approval. If implementation simplicity requires an early user record, it must remain unusable and excluded from ordinary user lists until approved.

### 6.3 Plans and entitlements

Add:

- `access_plans(id, code, name, description, display_order, is_active, is_publicly_requestable)`
- `plan_entitlements(id, plan_id, resource_type, resource_id, permission_code, limits_json)`
- `user_plan_assignments(id, user_id, plan_id, starts_at, ends_at, status, assigned_by, reason, created_at)`
- `user_entitlement_overrides(id, user_id, resource_type, resource_id, effect, starts_at, ends_at, granted_by, reason)`

Constraints:

- Stable, unique plan `code` values.
- At most one active primary learner plan per user at an instant unless product rules later permit stacking.
- Date ranges must be valid.
- History rows should not be physically overwritten.
- Entitlement resources must resolve to existing supported resources.

### 6.4 Audit

Add append-only `audit_events`:

- `id`, `occurred_at`
- `actor_user_id` or system actor
- `action`
- `target_type`, `target_id`
- `organization_id` reserved for future use
- `request_id`
- safe IP/device context
- `result`
- structured before/after metadata with secrets and sensitive fields removed

Audit at minimum:

- Registration submission and email verification
- Approval, rejection, clarification, duplicate, and cancellation decisions
- Account activation, suspension, and deactivation
- Role grant/revoke and every Admin area/permission grant or revocation
- Plan create/update/deactivate and entitlement changes
- Plan assignment, upgrade, downgrade, expiration, and override
- Authentication success/failure thresholds, password reset, session revoke

## 7. API design

Illustrative endpoints; confirm naming before implementation.

### Public

```text
POST /api/v1/registrations
POST /api/v1/registrations/verify-email
POST /api/v1/registrations/resend-verification
GET  /api/v1/public/access-plans
POST /api/v1/auth/login
POST /api/v1/auth/refresh
POST /api/v1/auth/forgot-password
POST /api/v1/auth/reset-password
POST /api/v1/invitations/accept
GET  /api/v1/invitations/validate
```

### Current user

```text
GET    /api/v1/me
GET    /api/v1/me/roles
GET    /api/v1/me/entitlements
GET    /api/v1/me/admin-areas
GET    /api/v1/me/sessions
DELETE /api/v1/me/sessions/{session_id}
```

### Admin APIs

```text
GET  /api/v1/admin/registration-applications
GET  /api/v1/admin/registration-applications/{id}
POST /api/v1/admin/registration-applications/{id}/approve
POST /api/v1/admin/registration-applications/{id}/reject
POST /api/v1/admin/registration-applications/{id}/request-clarification
POST /api/v1/admin/registration-applications/{id}/mark-duplicate

GET  /api/v1/admin/access-plans
POST /api/v1/admin/access-plans
PATCH /api/v1/admin/access-plans/{id}
PUT  /api/v1/admin/access-plans/{id}/entitlements
POST /api/v1/admin/users/{id}/plan-assignments
GET  /api/v1/admin/users/{id}/plan-history

GET    /api/v1/admin/users/{id}/roles
POST   /api/v1/admin/users/{id}/roles
DELETE /api/v1/admin/users/{id}/roles/{role_id}
GET    /api/v1/admin/users/{id}/admin-access
PUT    /api/v1/admin/users/{id}/admin-access

GET    /api/v1/admin/invitations
POST   /api/v1/admin/invitations
GET    /api/v1/admin/invitations/{id}
POST   /api/v1/admin/invitations/{id}/resend
POST   /api/v1/admin/invitations/{id}/cancel
POST   /api/v1/admin/invitations/bulk
```

### API rules

- Use generic public responses that do not disclose account existence.
- Validate authorization and resource scope on every request.
- Paginate every admin list and support stable filtering/sorting.
- Use idempotency keys for registration and approval actions.
- Reject stale concurrent admin decisions using version/ETag checks.
- Use consistent machine-readable error codes plus localized UI messages.
- Never return token hashes, password hashes, internal risk details, or private review notes to applicants.

## 8. User-interface work

### Public registration

- Responsive registration page matching KMTI branding
- Public plan comparison sourced from the API
- English/Japanese localization
- Field validation and accessible error summary
- Password strength guidance
- Privacy and terms links with recorded policy versions
- CAPTCHA/bot protection
- Success page that does not expose whether an email already exists
- Verification success, expired-link, and resend states
- Pending-approval status page

### Invitation acceptance

- Localized invitation email and acceptance route
- Safe invitation validation without exposing internal role or account data unnecessarily
- Display of the inviting organization, assigned learner plan, and permitted role summary
- Policy acceptance and password creation
- Clear expired, cancelled, superseded, already-used, and existing-account states
- Invitation success page and sign-in link
- No administrator approval step after acceptance unless the invitation explicitly carries a second-review requirement

### Sign-in and account recovery

- Status-specific safe messages
- Forgot/reset password pages
- Session-expired handling without losing intended destination
- Verification resend
- Optional “remember this device” backed by secure refresh sessions

### Admin Panel structure

The Admin Panel has three top-level pages. An Admin sees only pages granted to their account.

```text
Admin Panel
├── Content Editor
│   ├── Courses and lessons
│   ├── Quizzes and assessments
│   ├── Media and translations
│   └── Review and publishing (permission-controlled)
├── Organization
│   ├── Registration approvals and invitations
│   ├── Users, instructors, plans, and access
│   ├── Classes, reports, and announcements
│   └── Business settings
└── Platform
    ├── Security and audit
    ├── Integrations and email
    ├── Storage, backups, and system health
    └── Technical configuration
```

Direct navigation to an ungranted page must return an access-denied view, and its APIs must return `403`.

### Admin approval center (Organization page)

- Pending count and filters: unverified, pending, clarification, approved, rejected, duplicate
- Search by name/email/company
- Application details and plan comparison
- Duplicate warnings and prior-history panel
- Approve/reject/clarification dialogs with confirmation
- Bulk rejection of obvious abuse only; bulk approval should be disabled initially
- Audit timeline
- Pagination and empty/loading/error states

### Admin invitation center (Organization page)

- Create learner or privileged invitation according to permission
- Assign learner plan and optional access dates before sending
- Assign permitted roles before sending
- CSV bulk learner invitations with validation preview and row-level errors
- Search/filter by recipient, role, plan, inviter, status, and date
- Resend, cancel, and replace actions
- Expiration visibility and audit timeline
- Duplicate application/account/invitation warnings

### Plan management

- Create/edit/archive plan metadata
- Configure course, practical-set, assessment, and feature entitlements
- Preview effective access
- Prevent unsafe plan deletion when assigned
- Learner plan assignment and history
- Upgrade/downgrade scheduling
- Expiration and temporary overrides

### Learner experience

- Show current plan, access period, and status
- Display locked content with a clear plan explanation, without leaking protected lesson data
- Hide actions the learner cannot use, while preserving server enforcement
- Provide contact/upgrade-request path if KMTI wants one

## 9. Security and privacy requirements

- HTTPS only in staging and production.
- Exact CORS allowlist for KMTI sites and the training application.
- Secure, HttpOnly, SameSite cookies for refresh/session credentials; keep short-lived access credentials out of persistent JavaScript storage where practical.
- Refresh-token rotation and reuse detection.
- Rate limits for registration, login, verification resend, password reset, and admin decisions.
- CAPTCHA or equivalent risk control for public forms.
- Normalized case-insensitive email uniqueness.
- Password breach/strength checks and secure hashing.
- MFA for every Admin with Platform-area access.
- CSRF protection when cookie-authenticated state-changing endpoints are used.
- Content Security Policy, frame restrictions, secure headers, and safe redirect allowlists.
- Secrets provided through protected deployment configuration.
- Data minimization and configured retention for rejected/abandoned applications.
- Consent version history and documented privacy-contact process.
- Redaction of passwords, tokens, full form contents, and sensitive notes from logs and analytics.
- Alerting for repeated login failures, privileged-role changes, unusual approvals, and session-token reuse.

## 10. Email requirements

Templates in English and Japanese:

- Verify your email
- Verification link expired/resend
- Registration pending review
- Clarification requested
- Registration approved
- Registration rejected/closed
- Learner invitation
- Password reset
- Password changed
- Privileged invitation
- Role changed
- Plan assigned/upgraded/downgraded/expiring/expired
- Account suspended/reactivated

Operational requirements:

- Use a transactional provider and verified KMTI sender domain.
- Configure SPF, DKIM, and DMARC.
- Queue sends asynchronously with retry and dead-letter visibility.
- Record delivery state without storing secret link tokens.
- Links use the configured public web URL and expire.
- Email send failure must not corrupt the underlying approval transaction; use a transactional outbox.

## 11. Migration strategy

### Existing-role mapping

| Existing role | New default mapping |
|---|---|
| `trainee` | Learner |
| `employee` | Instructor; review exceptional users for the Admin role with Content Editor area |
| `admin` | Admin with Organization area by default; explicitly grant Content Editor and Platform areas only where required |

### Existing-user migration

1. Back up and clone production-like data for rehearsal.
2. Add new tables and nullable compatibility columns through Alembic.
3. Seed the three system roles, permissions, three Admin area definitions, and three plan records.
4. Normalize existing email addresses and produce a duplicate/invalid-email report.
5. Create `user_roles` and Admin area grants from current role values and an approved exception list.
6. Mark approved existing active users as `active`; map inactive users after manual review.
7. Create plan assignments using an approved mapping rule. Do not assume all existing learners receive Complete access without KMTI confirmation.
8. Run reconciliation reports for user counts, roles, account states, and access.
9. Switch application reads to the new permission/plan service while dual-writing the legacy role/status fields temporarily.
10. Observe one release, then remove dual writes and later remove obsolete fields in a separate migration.

### Rollback

- Schema additions remain backward compatible during the first release.
- Feature flags can disable public registration, approval UI, and entitlement enforcement independently.
- Preserve existing user role/status fields until the new model has completed a stable release.
- Never roll back by deleting registration, role, plan, or audit history.

## 12. Delivery phases

### Phase A — Decisions and technical design (1 week)

- Finalize required registration fields.
- Approve public plan names and contents.
- Approve role-permission matrix.
- Choose email provider, CAPTCHA provider, public domains, and session approach.
- Decide retention periods and administrators authorized to approve accounts.
- Write database diagram, API contract, status transitions, and threat model.

**Exit:** Product, privacy, and technical owners sign off on the above decisions.

### Phase B — Identity schema and permission foundation (1–2 weeks)

- Create Alembic migrations for statuses, three roles, permissions, Admin area grants, sessions, and audit events.
- Implement permission policies and compatibility mapping.
- Update authentication to check status and permissions.
- Add refresh sessions, revocation, throttling, and Admin-area escalation safeguards.
- Add migration/reconciliation tests.

**Exit:** Existing users can sign in with equivalent access; permission tests pass; no public registration yet.

### Phase C — Registration, verification, and approval (2–3 weeks)

- Add registration application schema and APIs.
- Add invitation schema, creation/management APIs, and atomic acceptance service.
- Build public registration and verification pages.
- Build invitation acceptance and administrator invitation-center pages.
- Integrate CAPTCHA and transactional email.
- Build admin approval queue and detail view.
- Add approval/rejection/clarification emails and audit events.
- Add browser end-to-end tests.

**Exit:** A public applicant can register, verify, be approved, and sign in as a learner; an invited learner or permitted privileged user can accept an invitation and sign in with predetermined access in staging.

### Phase D — Plans and entitlements (2–3 weeks)

- Add plan, entitlement, assignment, and override schema/APIs.
- Seed and configure three plans.
- Build plan-management and learner-assignment UI.
- Enforce entitlement policies on course, lesson, quiz, assessment, task download, and submission APIs.
- Add locked-content and current-plan UI.
- Add upgrade/downgrade/expiration notifications and history.

**Exit:** Each plan exposes only configured resources; direct API access cannot bypass restrictions.

### Phase E — Migration, hardening, and pilot (2 weeks)

- Rehearse existing-user migration and approve exception reports.
- Complete abuse, authorization, accessibility, localization, and load tests.
- Validate email deliverability and recovery procedures.
- Deploy staging and run KMTI acceptance tests.
- Pilot with a small group across all three plans.
- Fix launch-blocking issues and record go/no-go approval.

**Exit:** Pilot success criteria are met and operations/support owners approve rollout.

## 13. Master implementation checklist

Use this as the durable project tracker. Check an item only after implementation, review, tests, and documentation are complete.

### Product decisions

- [ ] Confirm final names for all three plans.
- [ ] Define the exact courses, practical sets, assessments, and services included in each plan.
- [ ] Decide whether applicants choose a requested plan or only describe their needs.
- [ ] Confirm required and optional registration fields.
- [ ] Confirm whether non-KMTI/company email domains are allowed.
- [ ] Confirm who can approve/reject applicants.
- [ ] Confirm which Admin permissions allow invitations for Learners, Instructors, and other Admins.
- [ ] Confirm invitation expiration period and whether selected invitations require a second review.
- [ ] Confirm CSV format and maximum batch size for bulk learner invitations.
- [ ] Confirm who can assign or change plans.
- [ ] Confirm which Admin permissions are granted by default within Content Editor, Organization, and Platform areas.
- [ ] Confirm who may invite an Admin with Content Editor or Organization access.
- [ ] Confirm the small set of users authorized to grant Platform-area access.
- [ ] Confirm account, application, audit, and consent retention periods.
- [ ] Confirm supported languages, timezones, and countries for launch.
- [ ] Confirm whether plans expire by default.
- [ ] Confirm whether learners can request upgrades.

### Architecture and setup

- [ ] Approve the status-transition diagram.
- [ ] Approve the role-permission matrix.
- [ ] Approve the plan-entitlement model.
- [ ] Approve API naming and error-code conventions.
- [ ] Choose transactional email provider.
- [ ] Choose CAPTCHA/bot-protection provider.
- [ ] Define staging and production public URLs.
- [ ] Define feature flags for registration, approval, and entitlement enforcement.
- [ ] Create an architecture decision record for session/token handling.
- [ ] Create a threat model for public registration and privileged administration.

### Database and migrations

- [ ] Make Alembic the required migration path for these changes.
- [x] Add user account-status and approval fields.
- [x] Add roles and permissions tables.
- [x] Add user-role grant/revoke history.
- [x] Add Admin area grant/revoke history.
- [x] Add granular Admin permission allow/deny records.
- [x] Add refresh-session records.
- [x] Add email verification tokens.
- [x] Add password reset tokens.
- [x] Add account invitations, invited roles, and invited learner-plan records.
- [x] Add registration applications.
- [x] Add access plans.
- [x] Add plan entitlements.
- [x] Add user plan assignments.
- [x] Add entitlement overrides.
- [x] Add append-only audit events.
- [x] Add initial indexes and role/area/effect constraints.
- [x] Add seed migration for system roles/permissions.
- [x] Add seed/configuration migration for three plans.
- [ ] Create migration upgrade/downgrade tests.
- [ ] Create data reconciliation reports.
- [ ] Rehearse migration on a production-like copy.

### Backend identity and security

- [~] Replace single-role authorization with permission policies. (Normalized user role/area/status administration plus knowledge/content, analytics, audit, heatmap, and broadcast APIs migrated; remaining assessment/settings routes follow incrementally.)
- [ ] Enforce account status during authentication and token refresh. (Sign-in and bearer authentication complete; refresh sessions are a later slice.)
- [x] Implement short-lived access sessions and rotating refresh sessions.
- [ ] Hash stored verification, reset, invitation, and refresh tokens.
- [x] Add session revocation and logout-all-devices.
- [x] Add refresh-token reuse detection.
- [ ] Add generic public authentication/recovery responses.
- [ ] Add login and registration rate limits.
- [ ] Add verification/reset resend limits. (Verification resend is limited; password-reset limits follow.)
- [ ] Add CAPTCHA verification.
- [ ] Add normalized email uniqueness.
- [ ] Add MFA requirement for Admins with Platform-area access.
- [ ] Add re-authentication for Admin role, area, and permission changes.
- [ ] Prevent Admins from expanding their own access.
- [ ] Prevent Organization-area Admins from granting Platform-area access.
- [ ] Add security event alerts.

### Registration backend

- [x] Implement public plan-list endpoint.
- [x] Implement registration submission endpoint.
- [x] Validate consent versions and timestamps.
- [x] Add duplicate and existing-account handling.
- [x] Implement email verification endpoint.
- [x] Implement verification resend endpoint.
- [x] Implement application status transitions. (Submission, verification, approval, and rejection complete; clarification and cancellation follow.)
- [ ] Implement paginated admin application list/detail. (List/detail endpoints complete; pagination follows.)
- [x] Implement approve transaction.
- [x] Implement reject transaction.
- [ ] Implement clarification workflow.
- [ ] Implement duplicate/cancel actions.
- [x] Add optimistic concurrency for simultaneous reviews.
- [ ] Add idempotency for submission and approval.
- [ ] Add all required audit events.

### Invitation backend

- [ ] Implement invitation list/detail endpoints. (List endpoint complete; dedicated detail endpoint follows.)
- [x] Implement individual learner invitation.
- [x] Implement Instructor and permission-scoped Admin invitations.
- [ ] Implement CSV bulk learner invitations with dry-run validation.
- [ ] Validate inviter permissions for every requested role.
- [ ] Prevent Platform-area access through ordinary invitations unless the inviter has the explicit high-risk grant permission.
- [ ] Add duplicate account/application/invitation detection. (Existing accounts and pending invitations complete; pending registration cross-check follows.)
- [x] Implement hashed single-use invitation tokens.
- [x] Implement invitation validation and atomic acceptance.
- [x] Implement resend/replacement behavior.
- [x] Implement cancellation and expiration processing.
- [ ] Implement optional second-review flag if approved.
- [ ] Add invitation-created, sent, accepted, expired, cancelled, and superseded audit events.

### Plans and entitlements backend

- [x] Implement plan CRUD with archive rather than unsafe deletion.
- [x] Implement entitlement configuration.
- [x] Implement plan assignment/change/expiration.
- [x] Implement temporary entitlement overrides.
- [x] Implement effective-entitlement calculation service.
- [x] Enforce entitlement checks on course lists/details.
- [x] Enforce entitlement checks on lessons and media metadata.
- [x] Enforce entitlement checks on quizzes.
- [x] Enforce entitlement checks on practical task lists/downloads.
- [~] Enforce entitlement checks on submissions and trainer services. (New learner submissions require plan access; historical submissions remain available; trainer-service feature entitlements pending.)
- [ ] Preserve access history when a plan changes.
- [ ] Add scheduled expiration processing.
- [ ] Add plan-change audit and notifications.

### Transactional email

- [ ] Configure verified sender domain, SPF, DKIM, and DMARC.
- [x] Implement transactional outbox.
- [x] Implement background delivery and retries. (SMTP adapter is disabled until verified sender credentials are configured.)
- [x] Create English templates. (Email verification complete; remaining event templates follow.)
- [x] Create Japanese templates. (Email verification complete; remaining event templates follow.)
- [x] Implement safe expiring links.
- [x] Record delivery states and provider message IDs.
- [ ] Add bounce/complaint handling.
- [ ] Test Gmail, Outlook, and target company mail systems.
- [ ] Add operations view for failed messages.

### Public frontend

- [x] Create public registration route.
- [x] Create API-driven three-plan comparison.
- [ ] Create accessible bilingual registration form. (Responsive English form complete; Japanese localization and accessibility review follow.)
- [x] Add privacy/terms display and consent controls.
- [ ] Add CAPTCHA integration.
- [x] Add safe submission confirmation.
- [x] Create email-verification result pages.
- [x] Create resend-verification flow.
- [x] Create pending-approval page.
- [ ] Create clarification flow if approved for phase scope.
- [x] Create forgot/reset password pages.
- [ ] Add safe status-specific sign-in messages.
- [ ] Validate mobile, tablet, and desktop layouts.
- [x] Create invitation acceptance route and form.
- [x] Show predetermined plan/role summary safely.
- [x] Create expired/cancelled/used/superseded invitation states.
- [x] Create invitation acceptance success page.

### Administration frontend

- [ ] Create approval-center navigation and pending badge. (Navigation complete; live pending badge follows.)
- [ ] Create paginated/filterable application queue. (Pending queue complete; pagination and filters follow.)
- [x] Create application detail view.
- [x] Show requested and assignable plans.
- [ ] Show duplicate/prior-application warnings.
- [x] Create approve confirmation flow.
- [x] Create reject/internal-note flow.
- [ ] Create clarification request flow.
- [ ] Show application audit timeline.
- [ ] Create role-management interface.
- [ ] Create Admin area and granular permission-management interface.
- [ ] Protect Platform-area access controls with re-authentication and MFA.
- [x] Create separate Content Editor, Organization, and Platform Admin Panel pages.
- [x] Hide ungranted Admin pages and show access denied on direct navigation.
- [x] Add current-user roles, Admin areas, and effective-permissions API.
- [x] Create access-plan management interface.
- [~] Create entitlement editor and effective-access preview. (Course entitlement editor and current-user effective-access API complete; admin preview pending.)
- [x] Create learner plan assignment/history interface.
- [ ] Create upgrade/downgrade/expiration flow.
- [ ] Create temporary override flow.
- [ ] Create invitation-center navigation and status badge. (Navigation complete; pending status badge follows.)
- [x] Create individual invitation form with permission-aware roles.
- [ ] Add learner plan and access-date selection to invitations.
- [ ] Create bulk learner CSV import and validation preview.
- [ ] Create invitation list with search/status filters. (Invitation list complete; search and filters follow.)
- [x] Create resend, cancel, and replace actions.
- [x] Show duplicate account/application/invitation warnings.
- [ ] Show invitation audit timeline.

### Learner frontend

- [x] Show current plan and effective access dates.
- [x] Filter course catalog by server-provided entitlement.
- [ ] Show accessible locked-content explanation where appropriate.
- [ ] Prevent protected content details from being embedded in unauthorized responses.
- [ ] Show upcoming expiration notice.
- [ ] Show plan-change history or latest change notice.
- [ ] Provide KMTI support contact path.

### Migration and compatibility

- [ ] Map all existing trainee users to Learner.
- [ ] Map employee users to Instructor and review exceptions for Admin Content Editor access.
- [ ] Map admin users to Admin with Organization-area access.
- [ ] Explicitly grant Content Editor access only where required.
- [ ] Explicitly designate the minimal Admins with Platform-area access.
- [ ] Resolve duplicate/invalid existing emails.
- [ ] Decide default plan mapping for existing learners.
- [ ] Create compatibility reads/writes for legacy role and `is_active` fields.
- [ ] Run role/status/plan reconciliation.
- [ ] Verify existing lesson, quiz, assessment, and trainer workflows after migration.
- [ ] Document rollback and feature-flag procedures.

### Automated testing

- [ ] Unit-test every account status transition. (`pending_approval` sign-in blocking is complete; remaining transitions follow registration.)
- [x] Unit-test legacy role mapping and independent Admin-area behavior.
- [x] Unit-test effective permission allow/deny behavior.
- [ ] Unit-test plan date boundaries and timezone behavior.
- [x] Unit-test effective entitlements and overrides.
- [x] Integration-test registration and verification.
- [ ] Integration-test approval/rejection/clarification. (Approval/rejection decisions and safe learner emails are tested; clarification follows.)
- [x] Integration-test duplicate and concurrent decisions.
- [ ] Integration-test role escalation prevention.
- [ ] Integration-test plan CRUD and assignment history.
- [x] Integration-test direct API entitlement bypass attempts.
- [ ] Integration-test session refresh/revoke/reuse detection.
- [ ] End-to-end test public registration to first sign-in.
- [ ] End-to-end test invited learner acceptance to first sign-in.
- [ ] End-to-end test invited instructor/content-editor acceptance.
- [ ] End-to-end test expired, cancelled, reused, and replaced invitations.
- [ ] End-to-end test bulk invitation validation and partial failures.
- [ ] End-to-end test all three plans.
- [ ] End-to-end test privileged invitation and role restrictions.
- [ ] End-to-end test password recovery.
- [ ] Add accessibility automation and manual keyboard tests.
- [ ] Add abuse/rate-limit tests.
- [ ] Add email template/link tests.
- [ ] Add migration and rollback rehearsal tests.

### Production readiness

- [ ] Configure exact production CORS origins.
- [ ] Configure HTTPS and secure response headers.
- [ ] Configure production secrets and rotation procedures.
- [ ] Configure email and CAPTCHA production credentials.
- [ ] Configure structured logs, metrics, errors, and alerts.
- [ ] Redact sensitive registration and token data from logs.
- [ ] Configure database backups and prove restore.
- [ ] Document account-approval support procedures.
- [ ] Document lost-email and duplicate-account procedures.
- [ ] Document privileged-account incident response.
- [ ] Complete security/privacy review.
- [ ] Complete English/Japanese copy review.
- [ ] Complete performance/load test.
- [ ] Complete production-like acceptance test.
- [ ] Pilot with learners on each plan.
- [ ] Record owner sign-off and launch decision.

## 14. Acceptance scenarios

The phase is complete only when all scenarios pass in a production-like staging environment.

### Scenario 1 — Approved Foundations learner

- A visitor selects Foundations, registers, verifies email, and remains unable to sign in while pending.
- An Admin with Organization-area approval permission approves the application without changing the plan.
- The learner signs in and sees only Foundations-entitled courses and practical tasks.
- Attempts to call Professional/Complete APIs directly return a safe authorization response.

### Scenario 2 — Administrator changes requested plan

- A visitor requests Complete.
- The administrator approves the learner for Professional with a recorded reason.
- The learner receives the correct localized notification and Professional access only.
- The requested plan and assigned plan remain visible in audit/history.

### Scenario 3 — Invited learner

- An Admin with Organization-area invitation permission invites a known learner with the Professional plan and defined access dates.
- The recipient accepts the single-use link, verifies ownership, accepts policies, and creates a password.
- No second approval is required under the default policy.
- The learner signs in with Professional access, and the invitation, role grant, plan assignment, and consent are linked in the audit trail.

### Scenario 4 — Invited instructor or Admin

- An authorized Admin invites an Instructor or an Admin with Content Editor access.
- The recipient receives only the predetermined role and Admin Panel areas.
- An Organization-area Admin cannot include Platform-area access without the explicit high-risk grant permission.
- Expired, cancelled, replaced, and reused invitation links fail safely.

### Scenario 5 — Upgrade and downgrade

- A Foundations learner is upgraded to Complete and receives access immediately.
- Existing progress remains unchanged.
- A future Professional downgrade takes effect on schedule.
- Complete-only content becomes inaccessible without deleting its historical progress.

### Scenario 6 — Public abuse resistance

- Repeated automated submissions are throttled/challenged.
- Existing-email and unknown-email public responses are indistinguishable.
- Expired or reused verification links fail safely.
- No applicant can request or self-assign the Instructor/Admin roles or any Admin Panel area.

### Scenario 7 — Admin area separation

- A Content Editor Admin can open the Content Editor page but not Organization or Platform pages.
- An Organization Admin can manage registrations, invitations, users, and plans but cannot open Platform settings.
- A Platform Admin can open technical/security pages.
- Platform-area access can be granted only by an authorized Platform Admin after MFA/re-authentication and a recorded reason.
- An Admin cannot expand their own areas or permissions.
- All changes are visible in the security audit trail.

### Scenario 8 — Existing-user compatibility

- Migrated trainees retain learning progress and submission history.
- Migrated instructors retain assigned trainee access.
- Migrated administrators retain intended business administration access.
- Existing quiz, practical submission, feedback, notification, and reporting flows continue to work.

## 15. Pilot success criteria

- 100% of self-registered pilot accounts follow email verification and admin approval.
- 100% of invited pilot accounts use verified, single-use invitations with predetermined access.
- At least 95% of legitimate applicants complete registration without support intervention.
- No user can self-assign the Admin role, an Admin Panel area, or an administrative permission.
- Zero entitlement bypasses across course, lesson, quiz, task, file, and submission APIs.
- All three plans expose exactly the approved resource matrix.
- Existing-user migration reconciles with no unexplained missing users, roles, progress, or submissions.
- At least 95% of transactional emails reach target inboxes within the agreed time.
- No critical accessibility defects in registration, sign-in, approval, or plan-management journeys.
- Audit records exist for every approval, rejection, Admin role/area/permission change, and plan change.
- Backup restoration and rollback procedures meet the approved operational target.

## 16. Immediate next actions

1. KMTI approves the final plan names and exact content/features included in each plan.
2. KMTI confirms registration fields, eligible email domains, approval owners, invitation permissions/expiration, and retention rules.
3. Engineering turns the role table into a precise permission matrix against current API endpoints.
4. Engineering designs the migrations and compatibility strategy for existing users.
5. KMTI selects email and CAPTCHA providers and supplies staging domain configuration.
6. Implementation begins with Phase B behind disabled feature flags; public registration is not exposed until Phase C acceptance tests pass.

## 17. Change log

| Date | Change | Author/approver |
|---|---|---|
| 2026-08-17 | Initial focused implementation plan created from agreed access model | Pending KMTI review |
