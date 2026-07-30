# Deployment configuration

## Release artifacts

Build artifacts must not contain a populated `.env`, database credentials,
JWT signing keys, uploaded user files, or generated TTS cache. Build from a
clean, reviewed commit/tag and record artifact checksums.

## Backend configuration

1. Copy `backend/.env.example` to `.env` on the protected API server.
2. Replace every placeholder with deployment-specific values.
3. Generate a unique `SECRET_KEY` with at least 32 random bytes. Never reuse a
   development or test key and never write the value to logs.
4. Use a least-privileged MySQL service account.
5. Set `ENVIRONMENT=production` and set `CORS_ORIGINS` to the exact approved
   browser origins, for example `https://training.example.jp`. Do not include
   `localhost`, private network ranges, `null`, or `file://` in production.
6. Restrict filesystem permissions so only the backend service account and
   authorized administrators can read `.env`.

If a signing key was ever printed by an earlier build, rotate it before the
next deployment. Rotation invalidates existing access tokens, so users must
sign in again.

## Frontend configuration

Copy `frontend/.env.example` to `frontend/.env.production` and set
`VITE_API_URL` to the public HTTPS API address before building. Validate HTTP
API calls, file downloads, Socket.IO, and WebSockets from a representative
browser client.

Use HTTPS when traffic can cross an untrusted network. If plain HTTP is kept on
an isolated LAN, record the approved network threat model and firewall rules.

## Runtime data

The backend creates TTS cache at runtime. Back up and retain only business data
required by policy: MySQL, uploads, knowledge-base sources/index inputs, and
approved quotation records. Runtime cache must not be treated as source code.

## Required preflight

Run these commands from a clean release checkout:

```powershell
cd frontend
npm ci
npm run typecheck
npm run test:run
npm audit --audit-level=high
npm run package -- --dir

cd ..
backend\venv\Scripts\python.exe -m pytest backend/tests -q
backend\venv\Scripts\python.exe -m pip check
```

After automated validation, perform the manual and production-equivalent gates
in `QA_PRE_DEPLOYMENT_CHECKLIST.md` before signing the installer.
