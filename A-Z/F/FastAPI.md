# FastAPI — Backend Framework

## Context in Cognito Coding Learning Hub
FastAPI is our **Python web framework** for the backend API. We use it to:
- Serve assignment data (JSON/YAML) to the frontend
- Handle auth flows (GitHub OAuth stub → sessions → tokens later)
- Run code-generation services (e.g., Blockly → Lua/Python/JS) where needed
- Provide REST endpoints + automatic docs for educators and tools

---

## Why FastAPI?
- **Speed & typing-first**: async by default, Pydantic models for clear schemas
- **Automatic docs**: OpenAPI + Swagger UI at `/docs`
- **Great with JSON**: perfect for assignment definitions and results
- **Easy CORS control**: needed for browser-based frontend during dev

---

## What we set up (Day 2)
- Created `backend/` with a minimal app and CORS enabled (dev-only `*`)
- Running server on **Port 8000** in Codespaces
- Health endpoint: `GET /ping → {"status": "ok"}`

**Files**
```
backend/
├─ main.py
├─ routes/          # (next: split endpoints here)
├─ models/          # Pydantic schemas live here
└─ requirements.txt
```

**Run (in Codespaces terminal):**
```bash
source .venv/bin/activate
python -m uvicorn backend.main:app --host 0.0.0.0 --port 8000 --reload
```

**Dev URLs**
- Health: `/ping`
- API docs: `/docs`
- OpenAPI JSON: `/openapi.json`

---

## How we’ll use it next
1. **Auth Skeleton (Step 4 in Day 2 plan)**
   - Route: `GET /auth/github/start` → redirect to GitHub OAuth
   - Route: `GET /auth/github/callback` → exchange code for token (dev: in-memory session)
2. **Assignments API (Step 5)**
   - Route: `GET /assignments` → list
   - Route: `GET /assignments/{id}` → detail (loads from `assignments-library` repo)
3. **Code Generation (Day 3+)**
   - Route: `POST /generate` with Blockly AST/code → returns Lua/Python/JS text
4. **Logging & Telemetry**
   - Request IDs, timing, and minimal logs for debugging

---

## Security & CORS (dev vs prod)
- **Dev**: `allow_origins=["*"]` so Vite can call the API
- **Prod**: restrict to `https://app.cognitocoding.com`, set proper cookies (HttpOnly, Secure), CSRF where needed

---

## Notes
- Keep routes small and move logic into services where possible
- Validate all inputs with Pydantic models
- Prefer async endpoints for I/O (HTTP requests, file access)
