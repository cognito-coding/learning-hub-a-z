# Auth Skeleton — GitHub OAuth (Day 2)

## Context
Auth in **Cognito Coding Learning Hub** will use GitHub OAuth for student sign-in (Google later).  
Day 2 goal: add a minimal FastAPI router that exposes GitHub OAuth entry/callback routes (no tokens yet).

---

## What We Added
**Files**
- `backend/routes/auth.py` — `/auth` router with two endpoints
- `backend/main.py` — registers the auth router and CORS

**Endpoints**
- `GET /auth/github` → placeholder that will redirect to GitHub authorize URL
- `GET /auth/github/callback?code=...` → placeholder that will exchange `code` for a token

**CORS**
Enabled permissive CORS for development so the React frontend can call the API.

---

## Test Steps
1. Start API:
   ```bash
   source .venv/bin/activate
   python -m uvicorn backend.main:app --host 0.0.0.0 --port 8000 --reload
   ```
2. Open in browser (via Ports panel) and verify:
   - `/ping` → `{"status":"ok"}`
   - `/auth/github` → `{"message":"GitHub OAuth start - not yet implemented"}`

---

## Next (Day 3/4)
- Create a GitHub OAuth App in org settings (callback URL: `/auth/github/callback`).
- Implement redirect to `https://github.com/login/oauth/authorize?...` with client_id + scopes.
- Handle callback:
  - Exchange `code` for access token (GitHub token endpoint).
  - Fetch user profile (`/user`) and primary email (`/user/emails`).
  - Start session (for now: signed cookie or in‑memory store).
- Add frontend button **“Sign in with GitHub”** that hits `/auth/github`.

---

## Notes
- Keep `allow_origins=["*"]` only during dev.
- Store client secrets in environment variables (Codespaces: **Repository Secrets → CODESPACES**).
